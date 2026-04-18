import { GoogleGenerativeAI } from "@google/generative-ai";
import { Questao } from "@/lib/types";
import { AIProvider, AIProviderOptions } from "./base-provider";

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não configurada");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Gemini 2.5 Flash: estável, Free Tier generoso (250 RPD, 250K TPM)
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    const { materia, dificuldade, assunto, contexto, questoesAnteriores } = options;

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.

INSTRUÇÕES CRÍTICAS:
1. Crie UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ""} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ""} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ""}
2. Dificuldade: ${dificuldade || "Média"}
3. Estilo CESGRANRIO: enunciado CURTO (2-3 linhas), objetivo, direto.
4. 5 alternativas plausíveis e distintas entre si.
5. PROIBIDO: Não inclua NUNCA letras (A, B, C, D, E), números ou prefixos decorativos no início das alternativas. O JSON deve conter apenas o texto puro da opção.

⚠️ REGRA ABSOLUTA DE CONSISTÊNCIA MATEMÁTICA E LÓGICA:
- Primeiro, defina o problema e REALIZE O CÁLCULO PASSO A PASSO na sua explicação.
- A alternativa marcada como CORRETA (índice 0, 1, 2, 3 ou 4) DEVE, SEM EXCEÇÃO, ser o índice exato da string no array "alternativas" que contém a resposta comprovada pela sua explicação.
- Verificação final: Antes de fechar o JSON, confirme se alternativas[correta] === resultado_da_explicacao.
- DISTRIBUA a resposta correta aleatoriamente entre os índices 0, 1, 2, 3 e 4. NÃO coloque sempre no índice 0.

Retorne APENAS um JSON válido seguindo este formato:
{
  "enunciado": "texto da questão",
  "alternativas": ["opção A", "opção B", "opção C", "opção D", "opção E"],
  "correta": 0,
  "explicacao": "Explicação detalhada com o passo a passo matemático exato",
  "assunto": "${assunto || "Geral"}",
  "dificuldade": "${dificuldade || "Média"}"
}

REGRAS DE FORMATAÇÃO E COERÊNCIA:
- COERÊNCIA TOTAL: O que for pedido no enunciado DEVE estar presente nas alternativas.
- PORTUGUÊS: Use terminologia gramatical correta.
- Use tags HTML para destaque visual: <b>negrito</b>, <u>sublinhado</u>, <i>itálico</i>.
- NÃO use Markdown no texto.
- ⚠️ SUBLINHADO: NUNCA use underscores (_texto_) para sublinhar. Use EXCLUSIVAMENTE a tag HTML <u>texto</u>.
- ⚠️ COERÊNCIA LINGUÍSTICA: Se o enunciado pede "a PALAVRA sublinhada", sublinhe UMA ÚNICA PALAVRA e garanta que ELA, isoladamente, pertença à classe gramatical pedida. Se o destaque for uma LOCUÇÃO (2+ palavras como "com dedicação"), use "a EXPRESSÃO sublinhada" ou "o TRECHO sublinhado" no enunciado, NUNCA "a palavra sublinhada".
${
  questoesAnteriores && questoesAnteriores.length > 0
    ? `
DIVERSIDADE:
- Evite temas similares a: ${questoesAnteriores.join(" | ")}
`
    : ""
}`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return this.parseResponse(text, options);
  }

  async generateQuestionsBatch(
    options: AIProviderOptions,
    quantity: number,
  ): Promise<Questao[]> {
    const { materia, dificuldade, assunto, contexto } = options;

    // Mapeamento de matérias específicas por cargo para orientar a IA
    const materiasPorCargo: Record<string, string> = {
      "Suprimentos/Administração":
        "Logística, Gestão de Estoques, Licitações e Contratos, Noções de Administração",
      "Técnico de Operação":
        "Física, Química, Termodinâmica, Instrumentação Industrial",
      "Manutenção Mecânica":
        "Metrologia, Elementos de Máquinas, Resistência dos Materiais, Hidráulica e Pneumática",
      "Manutenção Elétrica":
        "Circuitos Elétricos, Máquinas Elétricas, Instalações Elétricas, NR-10",
      "Segurança do Trabalho":
        "Normas Regulamentadoras, EPIs e EPCs, Análise de Riscos, Higiene Ocupacional",
      "Engenheiro de Petróleo":
        "Geologia do Petróleo, Engenharia de Reservatórios, Perfuração, Elevação e Escoamento",
      "Engenheiro Mecânico":
        "Resistência dos Materiais, Termodinâmica, Mecânica dos Fluidos, Transferência de Calor",
      "Analista de Sistemas":
        "Desenvolvimento de Software, Banco de Dados, Engenharia de Software, Infraestrutura e Redes",
    };

    const isEspecificas = materia.toLowerCase().includes("espec");
    const materiasDoCargoStr = contexto?.cargo
      ? materiasPorCargo[contexto.cargo]
      : null;
    const getOrientacaoMateria = () => {
      if (!isEspecificas || !contexto?.cargo) return "";
      
      if (contexto.cargo === "Suprimentos/Administração") {
        if (materia.includes("Bloco I")) return "\n    FOCO: Bloco I - Noções de Administração, Teoria Geral da Administração, Organização e Planejamento.";
        if (materia.includes("Bloco II")) return "\n    FOCO: Bloco II - Logística, Gestão de Materiais, Gestão de Estoques e Recebimento.";
        if (materia.includes("Bloco III")) return "\n    FOCO: Bloco III - Licitações (Lei 14.133), Contratos Administrativos e Ética.";
        return `\n    IMPORTANTE: Para "${materia}", as matérias são: ${materiasPorCargo[contexto.cargo]}.`;
      }
      
      const materiasDoCargoStr = materiasPorCargo[contexto.cargo];
      return materiasDoCargoStr ? `\n    IMPORTANTE: Para Conhecimentos Específicos do cargo "${contexto?.cargo}", as matérias são: ${materiasDoCargoStr}. Distribua as questões entre esses tópicos.` : "";
    };

    const orientacaoEspecificas = getOrientacaoMateria();

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.
    
    INSTRUÇÕES:
    1. Crie EXATAMENTE ${quantity} questões de ${materia} ${assunto ? `(Assunto: ${assunto})` : ""} para candidato a ${contexto?.cargo || "Geral"} nível ${contexto?.nivel || "médio"}.${orientacaoEspecificas}
    2. Estilo CESGRANRIO: enunciado direto, 5 alternativas.
    3. PROIBIDO: NUNCA inclua letras (A, B, C, D, E), números ou prefixos no início das alternativas.
    4. Dificuldade média geral: ${dificuldade || "Média"}
    5. UNICIDADE: Cada questão deste lote deve ter enunciado COMPLETAMENTE diferente das demais. PROIBIDO repetir o mesmo trecho ou contexto no enunciado de duas questões.
    6. REGRA ABSOLUTA DE GABARITO: O índice informado no campo "correta" (0 a 4) DEVE corresponder EXATAMENTE à posição, dentro do array "alternativas", do valor que você validou na "explicacao".
    7. Antes de escrever a propriedade "correta", faça a verificação em "alternativas" e garanta que o índice bate. Omitir essa checagem causará erro de gabarito para os alunos.

    Retorne APENAS um JSON que seja um ARRAY de objetos seguindo este formato:
    [
      {
        "enunciado": "...",
        "alternativas": ["...", "...", "...", "...", "..."],
        "correta": 0,
        "explicacao": "...",
        "assunto": "${assunto || "Geral"}",
        "dificuldade": "${dificuldade || "Média"}"
      }
    ]`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const data = JSON.parse(jsonStr);

      if (!Array.isArray(data)) {
        return [this.parseResponse(text, options)];
      }

      return data.map((q) => {
        // Sanitizar Markdown → HTML no enunciado e explicação
        q.enunciado = this.sanitizeMarkdown(q.enunciado);
        q.explicacao = this.sanitizeMarkdown(q.explicacao);

        const alternativasLimpas = q.alternativas.map((alt: string) =>
          this.sanitizeMarkdown(alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim()),
        );

        const originalCorretaText = q.alternativas[q.correta];
        const shuffled = [...alternativasLimpas];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const newCorreta = shuffled.indexOf(
          this.sanitizeMarkdown(originalCorretaText.replace(/^[A-Ea-e][\s).:-]+/, "").trim()),
        );

        return {
          ...q,
          alternativas: shuffled,
          correta: newCorreta,
          id: Date.now() + Math.random(),
          materia: options.materia,
          banca: "CESGRANRIO",
          geradaPorIA: true,
          provider: "gemini",
        };
      });
    } catch (error: any) {
      const errorMessage = error.message || "Erro desconhecido";
      console.error("[Gemini-Batch] Erro Crítico:", errorMessage);

      if (
        errorMessage.includes("429") ||
        errorMessage.toLowerCase().includes("rate limit")
      ) {
        throw new Error(
          `[Rate Limit] Gemini atingiu o limite de requisições. ${errorMessage}`,
        );
      }

      throw new Error(
        `Falha ao gerar lote de questões com Gemini: ${errorMessage}`,
      );
    }
  }

  /**
   * Sanitiza texto gerado pela IA: converte Markdown residual para HTML.
   * - _texto_ → <u>texto</u>
   * - *texto* → <b>texto</b>  
   * - **texto** → <b>texto</b>
   */
  private sanitizeMarkdown(text: string): string {
    if (!text) return text;
    // **bold** → <b>bold</b>
    let result = text.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    // *italic* → <i>italic</i> (only single asterisks, not already processed bold)
    result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<i>$1</i>');
    // _underline_ → <u>underline</u> (handles _text_ pattern from AI)
    result = result.replace(/(?<![\w])_([^_]+)_(?![\w])/g, '<u>$1</u>');
    return result;
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      let jsonStr = text.trim();
      const jsonMatch =
        text.match(/\{[\s\S]*\}/) || text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }

      const data = JSON.parse(jsonStr);

      // Sanitizar Markdown → HTML no enunciado e explicação
      data.enunciado = this.sanitizeMarkdown(data.enunciado);
      data.explicacao = this.sanitizeMarkdown(data.explicacao);

      const alternativasLimpas = data.alternativas.map((alt: string) =>
        this.sanitizeMarkdown(alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim()),
      );

      const originalCorretaText = data.alternativas[data.correta];
      const shuffled = [...alternativasLimpas];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const newCorreta = shuffled.indexOf(
        this.sanitizeMarkdown(originalCorretaText.replace(/^[A-Ea-e][\s).:-]+/, "").trim()),
      );

      return {
        ...data,
        alternativas: shuffled,
        correta: newCorreta,
        id: Date.now() + Math.random(),
        materia: options.materia,
        banca: "CESGRANRIO",
        geradaPorIA: true,
        provider: "gemini",
      };
    } catch (error: any) {
      console.error(
        "[Gemini] Erro ao parsear JSON. Texto recebido:",
        text.substring(0, 200) + "...",
      );
      throw new Error(
        `Falha ao processar resposta do Gemini: ${error.message}`,
      );
    }
  }
}
