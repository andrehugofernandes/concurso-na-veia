import { NextRequest, NextResponse } from "next/server";

// Keywords que indicam o início do Conteúdo Programático nos editais brasileiros
const CONTENT_START_KEYWORDS = [
  "CONHECIMENTOS BÁSICOS",
  "CONTEÚDO PROGRAMÁTICO",
  "CONTEÚDOS PROGRAMÁTICOS",
  "CONHECIMENTOS GERAIS",
  "PROGRAMA DAS PROVAS",
  "PROGRAMAS DAS PROVAS",
  "OBJETOS DE AVALIAÇÃO",
];

// Keywords que indicam o FIM do Conteúdo Programático
const CONTENT_END_KEYWORDS = [
  "CRONOGRAMA",
  "FORMULÁRIO",
  "REQUERIMENTO",
  "DECLARAÇÃO",
  "ATESTADO MÉDICO",
  "MODELO DE",
];

/**
 * Extrai a seção de Conteúdo Programático do texto completo do edital.
 * Usa heurísticas baseadas em keywords comuns em editais brasileiros.
 */
function extractConteudoProgramatico(fullText: string): string | null {
  const upperText = fullText.toUpperCase();

  let startIndex = -1;
  let matchedKeyword = "";

  // Procura a primeira keyword de início encontrada
  for (const keyword of CONTENT_START_KEYWORDS) {
    const idx = upperText.indexOf(keyword);
    if (idx !== -1 && (startIndex === -1 || idx < startIndex)) {
      startIndex = idx;
      matchedKeyword = keyword;
    }
  }

  if (startIndex === -1) {
    console.warn("[pdf/extract-text] Não encontrou nenhuma keyword de conteúdo programático no texto.");
    return null;
  }

  console.log(`[pdf/extract-text] Conteúdo programático encontrado via keyword "${matchedKeyword}" na posição ${startIndex}`);

  // Procura o fim do conteúdo programático
  let endIndex = fullText.length;
  const searchAfterStart = upperText.substring(startIndex + matchedKeyword.length + 500); // Pula 500 chars depois do início

  for (const endKeyword of CONTENT_END_KEYWORDS) {
    const idx = searchAfterStart.indexOf(endKeyword);
    if (idx !== -1) {
      const absoluteIdx = startIndex + matchedKeyword.length + 500 + idx;
      if (absoluteIdx < endIndex) {
        endIndex = absoluteIdx;
        console.log(`[pdf/extract-text] Fim do conteúdo programático detectado via "${endKeyword}" na posição ${absoluteIdx}`);
      }
    }
  }

  const extracted = fullText.substring(startIndex, endIndex).trim();
  console.log(`[pdf/extract-text] Seção extraída: ${extracted.length} caracteres (de ${startIndex} até ${endIndex})`);

  return extracted;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: "Nenhum arquivo PDF foi enviado." },
        { status: 400 }
      );
    }

    console.log(`[pdf/extract-text] Processando arquivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

    const buffer = Buffer.from(await file.arrayBuffer());

    let extractedText = "";

    // 1. Tenta extrair usando pdf2json (mais robusto no Next.js server)
    try {
      const PDFParser = require("pdf2json");
      extractedText = await new Promise<string>((resolve, reject) => {
        const pdfParser = new PDFParser(null, 1);
        pdfParser.on("pdfParser_dataError", (errData: any) => {
          console.error("[pdf/extract-text] Erro no pdf2json:", errData);
          resolve("");
        });
        pdfParser.on("pdfParser_dataReady", () => {
          const raw = pdfParser.getRawTextContent();
          resolve(raw || "");
        });
        pdfParser.parseBuffer(buffer);
      });
      if (extractedText) {
        // pdf2json gera URI component encoding em alguns caracteres especiais
        try {
          extractedText = decodeURIComponent(extractedText);
        } catch (_) {}
        console.log(`[pdf/extract-text] pdf2json extraiu ${extractedText.length} caracteres`);
      }
    } catch (pdf2jsonErr: any) {
      console.warn("[pdf/extract-text] Erro ao carregar pdf2json:", pdf2jsonErr.message);
    }

    // 2. Fallback para pdf-parse caso pdf2json não retorne texto
    if (!extractedText || extractedText.trim().length < 50) {
      try {
        const pdfParse = require("pdf-parse");
        const pdfData = await pdfParse(buffer);
        if (pdfData && pdfData.text) {
          extractedText = pdfData.text;
          console.log(`[pdf/extract-text] pdf-parse fallback extraiu ${extractedText.length} caracteres`);
        }
      } catch (parseErr: any) {
        console.error("[pdf/extract-text] Erro no pdf-parse fallback:", parseErr.message);
      }
    }

    // Se o PDF for escaneado ou a extração do pdf-parse falhar
    if (!extractedText || extractedText.trim().length < 100) {
      console.warn("[pdf/extract-text] Extração falhou ou texto muito curto. Usando fallback.");
      return NextResponse.json({
        success: false,
        error: "Não foi possível extrair texto do PDF. O arquivo pode ser uma imagem escaneada. Tente colar o texto do edital manualmente.",
      }, { status: 422 });
    }

    // Limpar quebras de linha excessivas para deixar um texto corrido fluido
    const cleanedText = extractedText
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    // Extrair inteligentemente o Conteúdo Programático
    const conteudoProgramatico = extractConteudoProgramatico(cleanedText);

    console.log(`[pdf/extract-text] Resultado final — Texto total: ${cleanedText.length} chars | Conteúdo Programático: ${conteudoProgramatico ? conteudoProgramatico.length + ' chars' : 'NÃO ENCONTRADO'}`);

    return NextResponse.json({
      success: true,
      filename: file.name,
      characterCount: cleanedText.length,
      text: cleanedText,
      // Campo novo: conteúdo programático já filtrado para a IA
      conteudoProgramatico: conteudoProgramatico || null,
      conteudoProgramaticoLength: conteudoProgramatico?.length || 0,
    });
  } catch (err: any) {
    console.error("[pdf/extract-text] Erro interno:", err);
    return NextResponse.json(
      { error: err.message || "Erro ao processar o arquivo PDF." },
      { status: 500 }
    );
  }
}
