import { NextRequest, NextResponse } from "next/server";

const CAPA_THEMES: Record<string, string[]> = {
  fazenda: [
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80", // Ministério da Fazenda / Finanças / Economia
    "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
  ],
  petrobras: [
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80", // Plataforma offshore Petrobras
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
  ],
  banco: [
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80", // Financial District / Banco
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80"
  ],
  ti: [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80", // Tech Cyber Matrix
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
  ],
  default: [
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80", // Estudo Didático Premium
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
  ]
};

export async function POST(req: NextRequest) {
  try {
    const { titulo, slug } = await req.json();

    const textToMatch = `${titulo || ""} ${slug || ""}`.toLowerCase();

    let themeKey = "default";
    let baseContext = "diverse team of Brazilian professionals working collaboratively in a modern office environment";

    if (textToMatch.includes("fazenda") || textToMatch.includes("financas") || textToMatch.includes("receita") || textToMatch.includes("tribut")) {
      themeKey = "fazenda";
      baseContext = "professional auditors and tax analysts working together with modern laptops and financial charts in a sleek government office";
    } else if (textToMatch.includes("petrobras") || textToMatch.includes("refinaria") || textToMatch.includes("offshore") || textToMatch.includes("operacao")) {
      themeKey = "petrobras";
      baseContext = "proud Petrobras Brazilian oil engineers and operators wearing bright orange overalls and safety hardhats smiling on a modern offshore oil platform";
    } else if (textToMatch.includes("banco") || textToMatch.includes("bb") || textToMatch.includes("caixa") || textToMatch.includes("cef") || textToMatch.includes("financeiro")) {
      themeKey = "banco";
      baseContext = "friendly Brazilian bank managers and bank tellers in professional suits and formal attire serving customers in a modern bright bank branch with blue and yellow accents";
    } else if (textToMatch.includes("ti") || textToMatch.includes("software") || textToMatch.includes("sistema") || textToMatch.includes("dados") || textToMatch.includes("tecnologia")) {
      themeKey = "ti";
      baseContext = "diverse software engineers and IT professionals collaborating in front of glowing code monitors in a high-tech modern office";
    }

    const titleStr = titulo ? titulo : "Concurso Público";
    // Construct a highly specific prompt focusing on human beings in action
    const promptKeywords = `Cinematic photo of ${baseContext}, highly realistic people, expressive confident faces, warm studio lighting, professional corporate photography, 8k resolution, photorealistic, 16:9 aspect ratio`;

    // Gera imagem dinâmica via Pollinations AI com seed aleatória
    const seed = Math.floor(Math.random() * 1000000);
    const encodedPrompt = encodeURIComponent(promptKeywords);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=1200&height=675&nologo=true&model=flux`;

    const availableImages = CAPA_THEMES[themeKey] || CAPA_THEMES.default;
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const fallbackUrl = availableImages[randomIndex];

    return NextResponse.json({
      success: true,
      theme: themeKey,
      imageUrl: pollinationsUrl,
      fallbackUrl: fallbackUrl,
      promptUsed: `Nano Banana AI - ${promptKeywords}`
    });

  } catch (err: any) {
    console.error("[gerar-capa-ia] Erro:", err);
    return NextResponse.json({ error: err.message || "Erro ao gerar capa com IA." }, { status: 500 });
  }
}
