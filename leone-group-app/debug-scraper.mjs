/**
 * Debug script per analizzare la struttura HTML di Immobiliare.it
 * Esegui con: node debug-scraper.mjs
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const TEST_URL = 'https://www.immobiliare.it/annunci/118036889/';

async function debugScrape() {
    console.log('🚀 Avvio browser...');

    const browser = await puppeteer.launch({
        headless: false, // FALSE = mostra il browser per vedere cosa succede
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
        ],
    });

    try {
        const page = await browser.newPage();

        // Nascondi che siamo un bot
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });

        await page.setViewport({ width: 1920, height: 1080 });
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        );

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'it-IT,it;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        });

        console.log('📄 Navigando a:', TEST_URL);
        await page.goto(TEST_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // Aspetta 5 secondi per eventuali challenge Cloudflare
        console.log('⏳ Attendo 5 secondi per il rendering...');
        await new Promise(r => setTimeout(r, 5000));

        // Salva screenshot
        await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
        console.log('📸 Screenshot salvato: debug-screenshot.png');

        // Salva HTML
        const html = await page.content();
        fs.writeFileSync('debug-page.html', html);
        console.log('📄 HTML salvato: debug-page.html');

        // Prova a estrarre dati
        const data = await page.evaluate(() => {
            const results = {
                title: null,
                price: null,
                address: null,
                mq: null,
                allPriceElements: [],
                allH1Elements: [],
                bodySnippet: document.body?.innerText?.substring(0, 500) || 'N/A',
            };

            // Cerca tutti gli elementi con "€"
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                const text = el.textContent || '';
                if (text.includes('€') && text.length < 50 && !text.includes('\n')) {
                    results.allPriceElements.push(text.trim());
                }
            });

            // Tutti gli H1
            document.querySelectorAll('h1').forEach(el => {
                results.allH1Elements.push(el.textContent?.trim() || '');
            });

            // Trova titolo pagina
            results.title = document.title;

            return results;
        });

        console.log('\n========== RISULTATI DEBUG ==========');
        console.log('📌 Titolo pagina:', data.title);
        console.log('\n🏷️ Elementi H1 trovati:', data.allH1Elements);
        console.log('\n💰 Elementi con € trovati:', data.allPriceElements.slice(0, 10));
        console.log('\n📝 Snippet body:\n', data.bodySnippet);
        console.log('======================================\n');

        // Tieni il browser aperto per 30 secondi per ispezionare
        console.log('🔍 Browser aperto per 30 secondi. Ispeziona la pagina...');
        await new Promise(r => setTimeout(r, 30000));

    } finally {
        await browser.close();
        console.log('✅ Browser chiuso');
    }
}

debugScrape().catch(console.error);
