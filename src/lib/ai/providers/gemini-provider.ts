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
    // Usando Gemini 1.5 Flash por ser mais rápido e ter um tier free melhor
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    const { materia, dificuldade, assunto, contexto, questoesAnteriores } = options;

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.

INSTRUÇÕES CRÍTICAS:
1. Crie UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
2. Dificuldade: ${dificuldade || 'Média'}
3. Estilo CESGRANRIO: enunciado CURTO (2-3 linhas), objetivo, direto.
4. 5 alternativas plausíveis e próximas entre si.

⚠️ REGRA ABSOLUTA DE CONSISTÊNCIA MATEMÁTICA:
- Primeiro, defina o problema e REALIZE O CÁLCULO PASSO A PASSO.
- A alternativa marcada como CORRETA (índice 0-4) deve ser EXATAMENTE o resultado do seu cálculo.
- A explicação DEVE demonstrar o rastro do cálculo que leva ao valor da alternativa correta.
- SE VOCÊ calcular "32.400", então "32.400" TEM que estar nas alternativas e ser a correta.

Retorne APENAS um JSON válido seguindo este formato:
{
  "enunciado": "texto da questão",
  "alternativas": ["opção A", "opção B", "opção C", "opção D", "opção E"],
  "correta": 0,
  "explicacao": "Explicação detalhada com o passo a passo matemático exato",
  "assunto": "${assunto || 'Geral'}",
  "dificuldade": "${dificuldade || 'Média'}"
}

REGRAS DE FORMATAÇÃO HTML:
- Use tags HTML para destaque visual: <b>negrito</b>, <u>sublinhado</u>, <i>itálico</i>.
- NÃO use Markdown no texto.
${questoesAnteriores && questoesAnteriores.length > 0 ? `
DIVERSIDADE:
- Evite temas similares a: ${questoesAnteriores.join(' | ')}
` : ''}`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return this.parseResponse(text, options);
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      // Limpeza básica de blocos de código
      const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const data = JSON.parse(jsonStr);

      return {
        ...data,
        id: Date.now() + Math.random(),
        materia: options.materia,
        banca: 'CESGRANRIO',
        geradaPorIA: true,
        provider: 'gemini'
      };
    } catch (error) {
      console.error("[Gemini] Erro ao parsear JSON:", text);
      throw new Error("Falha ao processar resposta do Gemini");
    }
  }
}
