/**
 * Audio Aula — Text Extractor
 *
 * Extrai o conteúdo textual de cada componente de um módulo de aula,
 * concatenando na ordem pedagógica correta para geração de áudio narrado.
 *
 * Ordem de extração:
 * 1. ModuleBanner (titulo + descricao)
 * 2. ModuleSectionHeader INTRO (title + description)
 * 3. Parágrafos da RichIntro (texto corrido)
 * 4. CardCarousel (titulo + descricao de cada card)
 * 5. ModuleSectionHeader seção 2 (title + description)
 * 6. ContentAccordion (titulo + conteúdo textual de cada slide)
 * 7. ModuleSectionHeader seção 3 (title + description)
 * 8. Cards de exemplo (titulo + texto)
 * 9. QuestaoResolvidaStepByStep (enunciado + passos)
 * 10. ModuleConsolidation (sinteseEstrategica)
 * 
 * NÃO extrai: QuizInterativo (interativo, não faz sentido em áudio)
 */

// ── Types ────────────────────────────────────────────────────────────────

export interface ModuleBannerData {
  numero: number;
  titulo: string;
  descricao: string;
}

export interface SectionHeaderData {
  index: string | number;
  title: string;
  description: string;
}

export interface CardCarouselData {
  cards: { titulo: string; descricao: string }[];
}

export interface AccordionSlideData {
  titulo: string;
  conteudoTexto: string; // Texto plano extraído do JSX
}

export interface ExemploCardData {
  titulo: string;
  texto: string;
}

export interface QuestaoResolvidaData {
  enunciado: string;
  alternativas: { letra: string; texto: string; correta: boolean }[];
  passos: { titulo: string; conteudo: string }[];
  dicaEstrategica?: string;
}

export interface SinteseEstrategicaData {
  title: string;
  contentTexto: string; // Texto plano extraído do JSX
}

export interface ModuleContentData {
  banner: ModuleBannerData;
  introSection?: SectionHeaderData;
  introParágrafos?: string[]; // Array de parágrafos
  cardCarousel?: CardCarouselData;
  sections?: {
    header: SectionHeaderData;
    accordionSlides?: AccordionSlideData[];
    exemploCards?: ExemploCardData[];
  }[];
  questaoResolvida?: QuestaoResolvidaData;
  sinteseEstrategica?: SinteseEstrategicaData;
}

// ── Main Extractor ──────────────────────────────────────────────────────

/**
 * Converte os dados estruturados de um módulo em texto plano
 * otimizado para narração em TTS.
 */
export function extractModuleText(data: ModuleContentData): string {
  const parts: string[] = [];

  // 1. Banner do módulo (Título e Descrição)
  if (data.banner) {
    if (data.banner.titulo) parts.push(cleanTextForTTS(data.banner.titulo) + ".");
    if (data.banner.descricao) parts.push(cleanTextForTTS(data.banner.descricao) + ".");
    parts.push("");
  }

  // 2. Seção de introdução (Título e Descrição)
  if (data.introSection) {
    if (data.introSection.title) parts.push(cleanTextForTTS(data.introSection.title) + ".");
    if (data.introSection.description) parts.push(cleanTextForTTS(data.introSection.description) + ".");
    parts.push("");
  }

  // 3. Parágrafos da introdução rica (Teoria C.E.D.E.A)
  if (data.introParágrafos && data.introParágrafos.length > 0) {
    for (const paragrafo of data.introParágrafos) {
      const cleaned = cleanTextForTTS(paragrafo);
      if (cleaned.length > 5) {
        parts.push(cleaned);
      }
    }
    parts.push("");
  }

  // 4. Cards do Carrossel (Título e Descrição do conteúdo)
  if (data.cardCarousel && data.cardCarousel.cards.length > 0) {
    for (const card of data.cardCarousel.cards) {
      if (card.titulo) parts.push(cleanTextForTTS(card.titulo) + ".");
      if (card.descricao) parts.push(cleanTextForTTS(card.descricao) + ".");
    }
    parts.push("");
  }

  // 5. Seções de conteúdo (Accordion e Cards de Exemplo)
  if (data.sections && data.sections.length > 0) {
    for (const section of data.sections) {
      if (section.header?.title) parts.push(cleanTextForTTS(section.header.title) + ".");
      if (section.header?.description) parts.push(cleanTextForTTS(section.header.description) + ".");

      if (section.accordionSlides && section.accordionSlides.length > 0) {
        for (const slide of section.accordionSlides) {
          if (slide.titulo) parts.push(cleanTextForTTS(slide.titulo) + ".");
          if (slide.conteudoTexto) parts.push(cleanTextForTTS(slide.conteudoTexto) + ".");
        }
      }

      if (section.exemploCards && section.exemploCards.length > 0) {
        for (const card of section.exemploCards) {
          if (card.titulo) parts.push(cleanTextForTTS(card.titulo) + ".");
          if (card.texto) parts.push(cleanTextForTTS(card.texto) + ".");
        }
      }

      parts.push("");
    }
  }

  // 6. Questão resolvida (Enunciado + Resposta)
  if (data.questaoResolvida) {
    if (data.questaoResolvida.enunciado) parts.push(cleanTextForTTS(data.questaoResolvida.enunciado) + ".");

    const correta = data.questaoResolvida.alternativas?.find((a) => a.correta);
    if (correta) {
      parts.push(`Alternativa correta ${correta.letra}: ${cleanTextForTTS(correta.texto)}.`);
    }

    if (data.questaoResolvida.passos) {
      for (const passo of data.questaoResolvida.passos) {
        if (passo.titulo) parts.push(cleanTextForTTS(passo.titulo) + ".");
        if (passo.conteudo) parts.push(cleanTextForTTS(passo.conteudo) + ".");
      }
    }

    if (data.questaoResolvida.dicaEstrategica) {
      parts.push(cleanTextForTTS(data.questaoResolvida.dicaEstrategica) + ".");
    }
    parts.push("");
  }

  // 7. Síntese estratégica (Consolidação)
  if (data.sinteseEstrategica) {
    if (data.sinteseEstrategica.title) parts.push(cleanTextForTTS(data.sinteseEstrategica.title) + ".");
    if (data.sinteseEstrategica.contentTexto) parts.push(cleanTextForTTS(data.sinteseEstrategica.contentTexto) + ".");
    parts.push("");
  }

  return parts.join("\n").trim();
}

// ── Helpers ─────────────────────────────────────────────────────────────

/**
 * Limpa texto para uso em TTS:
 * - Remove tags HTML residuais
 * - Remove emojis (TTS não sabe ler)
 * - Remove caracteres especiais de formatação
 * - Normaliza espaços
 */
export function cleanTextForTTS(text: string): string {
  if (!text) return "";

  let cleaned = text
    // 1. Remove comentários HTML <!-- ... -->, comentários JSX {/* ... */} e tags HTML/scripts
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/<[^>]*>/g, " ")

    // 2. Remove emojis e caracteres Unicode visuais/decorativos
    .replace(/[\u{1F600}-\u{1F64F}]/gu, "")
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, "")
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, "")
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "")
    .replace(/[\u{2600}-\u{26FF}]/gu, "")
    .replace(/[\u{2700}-\u{27BF}]/gu, "")
    .replace(/[\u{FE00}-\u{FE0F}]/gu, "")
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, "")
    .replace(/[\u{200D}]/gu, "")

    // 3. Remove marcadores visuais, bullets e símbolos que forçam fala literal
    .replace(/[•●○◆◇▸▹►▻★☆✓✗✔✘→←↑↓⬆⬇⬅➡#]/g, " ")

    // 4. Remove metadados de rodapé/UI e artefatos de código TSX/React
    .replace(/Ref:\s*\d+-[A-Z.]+/gi, "")
    .replace(/©\s*Concurso\s*Na\s*Veia\s*System/gi, "")
    .replace(/Clique\s*para\s*revelar[^\n.]*/gi, "")
    .replace(/Dossiê\s*Técnico/gi, "")
    .replace(/\b(className|variant|props|export|import|const|function|return|useState|useEffect|useMemo|useCallback)\b[^.\n]*/gi, "")
    .replace(/[\{\}<>]/g, " ")

    // 5. Suprime pontos de siglas/acrónimos (ex: C.E.D.E.A -> CEDEA, P.O.D.C. -> PODC, B.P.O. -> BPO, E.S.G. -> ESG)
    .replace(/\b([A-Z])\.(?=[A-Z]\b|\.[A-Z]|(?:\.[A-Z])+)/g, "$1")
    .replace(/\b([A-Z]{2,})\./g, "$1")

    // 6. Expande abreviações comuns para evitar leitura literal do ponto
    .replace(/\bArt\.\s*/gi, "Artigo ")
    .replace(/\bInc\.\s*/gi, "Inciso ")
    .replace(/\bp\.?\s*ex\.\s*/gi, "por exemplo, ")
    .replace(/\bex\.\s*/gi, "exemplo, ")
    .replace(/\betc\.\s*/gi, "e assim por diante. ")
    .replace(/\bvs\.\s*/gi, "versus ")
    .replace(/\bN\.[ºo]\s*/gi, "número ")
    .replace(/\bn[ºo]\s*/gi, "número ")
    .replace(/\b([0-9]+)[ºª]\s*/g, "$1 ")

    // 7. Trata numeração de tópicos/listas (ex: "1. " ou "Módulo 1." -> "1, " ou "Módulo 1:")
    .replace(/(^|\n|\s)(\d+)\.\s+/g, "$1$2, ")

    // 8. Remove espaços ANTES de pontuação (ex: "palavra ." -> "palavra.")
    // Esse é o motivo principal do bug: quando há espaço antes do ponto, o TTS lê a palavra "PONTO"!
    .replace(/\s+([.,;:!?])/g, "$1")

    // 9. Garante espaço APÓS pontuação se seguida de texto (ex: "palavra.Outra" -> "palavra. Outra")
    // Se não houver espaço após o ponto, o TTS pensa que é uma URL/domínio e lê "palavra PONTO Outra"!
    .replace(/\.([a-zA-ZÁ-ú])/g, ". $1")

    // 10. Trata múltiplos pontos (ex: ".." ou "...") transformando em reticências
    .replace(/\.{2,}/g, "...")

    // 11. Remove aspas decorativas
    .replace(/[""'']/g, '"')

    // 12. Normalização final de espaços e quebras de linha
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return cleaned;
}

/**
 * Estima o tempo de leitura em minutos (velocidade média TTS: ~150 palavras/min)
 */
export function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  return Math.ceil(words / 150);
}

/**
 * Divide texto longo em chunks respeitando limites de caracteres.
 * O Edge TTS tem um limite prático de ~50.000 chars por requisição,
 * mas textos menores geram áudio mais rápido.
 */
export function chunkText(text: string, maxChars: number = 4000): string[] {
  if (text.length <= maxChars) return [text];

  const chunks: string[] = [];
  const paragraphs = text.split("\n\n");
  let current = "";

  for (const para of paragraphs) {
    if ((current + "\n\n" + para).length > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = para;
    } else {
      current = current ? current + "\n\n" + para : para;
    }
  }

  if (current.trim().length > 0) {
    chunks.push(current.trim());
  }

  return chunks;
}
