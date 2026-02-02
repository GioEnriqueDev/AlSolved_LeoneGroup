import { NextRequest, NextResponse } from "next/server";

// ============================================
// GOLDEN PATH DATA - Demo Links with Perfect Data
// ============================================
const GOLDEN_PATH_DATA: Record<string, {
    address: string;
    price: number;
    mq: number;
    image_url: string;
}> = {
    // Milano Centro - Luxury
    "https://www.immobiliare.it/annunci/98765432/": {
        address: "Via Monte Napoleone 12, Milano Centro",
        price: 485000,
        mq: 85,
        image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    },
    // Roma EUR - Investment
    "https://www.immobiliare.it/annunci/12345678/": {
        address: "Viale Europa 156, Roma EUR",
        price: 320000,
        mq: 110,
        image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    },
    // Torino Crocetta - Starter
    "https://www.idealista.it/immobile/12345678/": {
        address: "Corso Re Umberto 45, Torino Crocetta",
        price: 195000,
        mq: 75,
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    },
};

// ============================================
// INPUT VALIDATION
// ============================================
function isValidRealEstateUrl(url: string): { valid: boolean; error?: string } {
    try {
        const parsed = new URL(url);

        if (!parsed.protocol.startsWith("http")) {
            return { valid: false, error: "L'URL deve iniziare con https://" };
        }

        const allowedDomains = ["immobiliare.it", "idealista.it", "casa.it", "subito.it"];
        const isAllowedDomain = allowedDomains.some(domain => parsed.hostname.includes(domain));

        if (!isAllowedDomain) {
            return { valid: false, error: `Portale non supportato. Usa: ${allowedDomains.join(", ")}` };
        }

        return { valid: true };
    } catch {
        return { valid: false, error: "URL non valido. Inserisci un link completo." };
    }
}

// ============================================
// MAIN HANDLER
// ============================================
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { url } = body;

        // Validate input
        if (!url || typeof url !== "string" || url.trim() === "") {
            return NextResponse.json(
                { success: false, error: "Inserisci un URL valido" },
                { status: 400 }
            );
        }

        const trimmedUrl = url.trim();

        // Validate URL format and domain
        const validation = isValidRealEstateUrl(trimmedUrl);
        if (!validation.valid) {
            return NextResponse.json(
                { success: false, error: validation.error },
                { status: 400 }
            );
        }

        // Check Golden Path (Demo Links)
        const goldenData = GOLDEN_PATH_DATA[trimmedUrl];
        if (goldenData) {
            // Simulate network delay for realism
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log(`[Analyzer] Demo data returned for: ${trimmedUrl}`);
            return NextResponse.json({
                success: true,
                source: "verified",
                data: goldenData,
            });
        }

        // For non-demo links, return helpful error
        return NextResponse.json({
            success: false,
            error: "Questo link non è disponibile in modalità demo. Usa uno dei link demo predefiniti per vedere il sistema in azione.",
        }, { status: 422 });

    } catch (error) {
        console.error("[Analyzer] Error:", error);
        return NextResponse.json({
            success: false,
            error: "Errore interno del server",
        }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
