"""
Leone Group AI - Scraper con Camoufox
Bypassa DataDome e altre protezioni anti-bot

Setup:
1. pip install camoufox flask flask-cors
2. python scraper_service.py
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
import json
import traceback

app = Flask(__name__)
CORS(app)

# Usa un event loop globale per evitare problemi
loop = None

def get_event_loop():
    global loop
    if loop is None or loop.is_closed():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    return loop


async def scrape_immobiliare(url: str) -> dict:
    """Scrape Immobiliare.it usando Camoufox"""
    from camoufox.async_api import AsyncCamoufox
    
    print(f"[Camoufox] Avvio browser per: {url}")
    
    try:
        async with AsyncCamoufox(headless=True) as browser:
            page = await browser.new_page()
            
            # Naviga alla pagina
            print("[Camoufox] Navigazione in corso...")
            await page.goto(url, wait_until="networkidle", timeout=60000)
            
            # Attendi che la pagina carichi completamente
            print("[Camoufox] Attendo rendering...")
            await asyncio.sleep(5)
            
            # Screenshot per debug
            await page.screenshot(path="last_scrape.png")
            print("[Camoufox] Screenshot salvato")
            
            # Estrai i dati
            print("[Camoufox] Estrazione dati...")
            data = await page.evaluate("""
                () => {
                    let price = null;
                    let address = null;
                    let mq = null;
                    let imageUrl = null;
                    
                    // === PREZZO ===
                    const allElements = document.querySelectorAll('*');
                    for (const el of allElements) {
                        const text = el.textContent || '';
                        // Cerca pattern prezzo come "€ 123.000" o "123.000 €"
                        if (text.includes('€') && text.length < 40 && !text.includes('\\n')) {
                            const cleanPrice = text.replace(/[^0-9]/g, '');
                            if (cleanPrice && cleanPrice.length >= 5 && cleanPrice.length <= 8) {
                                const num = parseInt(cleanPrice, 10);
                                if (num > 10000 && num < 50000000) {
                                    price = num;
                                    break;
                                }
                            }
                        }
                    }
                    
                    // === INDIRIZZO ===
                    const h1 = document.querySelector('h1');
                    if (h1) {
                        address = h1.textContent?.trim();
                    }
                    if (!address || address.length < 5) {
                        const titleParts = document.title?.split(' - ');
                        if (titleParts && titleParts.length > 0) {
                            address = titleParts[0]?.trim();
                        }
                    }
                    
                    // === SUPERFICIE ===
                    const bodyText = document.body?.innerText || '';
                    const mqPatterns = [
                        /(\\d+)\\s*m²/,
                        /(\\d+)\\s*mq/i,
                        /superficie[:\\s]+(\\d+)/i
                    ];
                    for (const pattern of mqPatterns) {
                        const match = bodyText.match(pattern);
                        if (match) {
                            const mqVal = parseInt(match[1], 10);
                            if (mqVal > 10 && mqVal < 10000) {
                                mq = mqVal;
                                break;
                            }
                        }
                    }
                    
                    // === IMMAGINE ===
                    const imgs = document.querySelectorAll('img[src*="pwm"], img[src*="immobiliare"]');
                    for (const img of imgs) {
                        if (img.src && img.width > 100) {
                            imageUrl = img.src;
                            break;
                        }
                    }
                    
                    return { 
                        price, 
                        address, 
                        mq, 
                        imageUrl,
                        pageTitle: document.title,
                        bodyLength: document.body?.innerText?.length || 0
                    };
                }
            """)
            
            print(f"[Camoufox] Dati estratti: {json.dumps(data, indent=2)}")
            
            return data
            
    except Exception as e:
        print(f"[Camoufox] Errore: {e}")
        traceback.print_exc()
        raise


@app.route('/scrape', methods=['POST'])
def scrape():
    """Endpoint API per lo scraping"""
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        print(f"[API] Richiesta scraping per: {url}")
        
        if not url:
            return jsonify({"success": False, "error": "URL mancante"}), 400
        
        # Valida URL
        if not ('immobiliare.it' in url or 'idealista.it' in url):
            return jsonify({"success": False, "error": "Portale non supportato"}), 400
        
        # Esegui scraping
        event_loop = get_event_loop()
        result = event_loop.run_until_complete(scrape_immobiliare(url))
        
        if not result.get('price') and not result.get('address'):
            return jsonify({
                "success": False,
                "error": f"Dati non estratti. Body length: {result.get('bodyLength', 0)}"
            }), 422
        
        return jsonify({
            "success": True,
            "source": "live",
            "data": {
                "address": result.get('address') or "Indirizzo non trovato",
                "price": result.get('price') or 0,
                "mq": result.get('mq') or 100,
                "image_url": result.get('imageUrl') or "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
            }
        })
        
    except Exception as e:
        print(f"[API] Errore: {e}")
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "camoufox-scraper"})


if __name__ == '__main__':
    print("=" * 50)
    print("🚀 Leone Group Scraper Service (Camoufox)")
    print("=" * 50)
    print("   Endpoint: http://localhost:5000/scrape")
    print("   Health:   http://localhost:5000/health")
    print("=" * 50)
    # Usa threaded=True per gestire più richieste
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
