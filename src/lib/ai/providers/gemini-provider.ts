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
    // Usando Gemini 3.1 Pro Preview (GA em Fevereiro 2026) 
    // Suporta nativamente Respostas Estruturadas, Batch API e Execução de Código
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-3.1-pro-preview",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
  }




  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    const { materia, dificuldade, assunto, contexto, questoesAnteriores } = options;

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.

INSTRUÇÕES CRÍTICAS:
1. Crie UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
2. Dificuldade: ${dificuldade || 'Média'}
3. Estilo CESGRANRIO: enunciado CURTO (2-3 linhas), objetivo, direto.
4. 5 alternativas plausíveis e distintas entre si.
5. PROIBIDO: Não crie alternativas idênticas ou repetidas. Todas as 5 opções devem ser únicas.

⚠️ REGRA ABSOLUTA DE CONSISTÊNCIA E RANDOMIZAÇÃO:
- Primeiro, defina o problema e REALIZE O CÁLCULO PASSO A PASSO.
- A alternativa marcada como CORRETA (índice 0-4) deve ser EXATAMENTE o resultado do seu cálculo.
- DISTRIBUA a resposta correta aleatoriamente entre os índices 0, 1, 2, 3 e 4. NÃO coloque sempre no índice 0.
- A explicação DEVE demonstrar o rastro do cálculo que leva ao valor da alternativa correta.

Retorne APENAS um JSON válido seguindo este formato:
{
  "enunciado": "texto da questão",
  "alternativas": ["opção A", "opção B", "opção C", "opção D", "opção E"],
  "correta": 0,
  "explicacao": "Explicação detalhada com o passo a passo matemático exato",
  "assunto": "${assunto || 'Geral'}",
  "dificuldade": "${dificuldade || 'Média'}"
}

REGRAS DE FORMATAÇÃO E COERÊNCIA:
- COERÊNCIA TOTAL: O que for pedido no enunciado DEVE estar presente nas alternativas. (Ex: se pedir um adjetivo, todas as alternativas devem ser adjetivos).
- PORTUGUÊS: Use terminologia gramatical correta (ex: não confunda Colocação Pronominal com Pronomes Relativos).
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

  async generateQuestionsBatch(options: AIProviderOptions, quantity: number): Promise<Questao[]> {
    const { materia, dificuldade, assunto, contexto } = options;

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.
    
    INSTRUÇÕES:
    1. Crie EXATAMENTE ${quantity} questões de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} 
    2. Estilo CESGRANRIO: enunciado direto, 5 alternativas.
    3. PROIBIDO: Todas as 5 alternativas DEVEM ser diferentes entre si na mesma questão. Nunca repita uma opção.
    4. Dificuldade média geral: ${dificuldade || 'Média'}
    5. Cargo: ${contexto?.cargo || 'Geral'}, Nível: ${contexto?.nivel || 'médio'}

    Retorne APENAS um JSON que seja um ARRAY de objetos seguindo este formato:
    [
      {
        "enunciado": "...",
        "alternativas": ["...", "...", "...", "...", "..."],
        "correta": 0,
        "explicacao": "...",
        "assunto": "${assunto || 'Geral'}",
        "dificuldade": "${dificuldade || 'Média'}"
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

      return data.map(q => {
        // Randomizar as alternativas programmaticamente para garantir variedade total
        const originalCorretaText = q.alternativas[q.correta];
        const shuffled = [...q.alternativas];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const newCorreta = shuffled.indexOf(originalCorretaText);

        return {
          ...q,
          alternativas: shuffled,
          correta: newCorreta,
          id: Date.now() + Math.random(),
          materia: options.materia,
          banca: 'CESGRANRIO',
          geradaPorIA: true,
          provider: 'gemini'
        };
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Erro desconhecido';
      console.error("[Gemini-Batch] Erro Crítico:", errorMessage);
      
      // Preserva o código 429 ou a mensagem de Rate Limit para que a Action possa retentar
      if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('rate limit')) {
        throw new Error(`[Rate Limit] Gemini atingiu o limite de requisições. ${errorMessage}`);
      }
      
      throw new Error(`Falha ao gerar lote de questões com Gemini: ${errorMessage}`);
    }
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      // Tenta extrair apenas o conteúdo JSON caso o modelo tenha retornado texto extra
      let jsonStr = text.trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/) || text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }

      const data = JSON.parse(jsonStr);

      // Randomização programática extra para garantir que a resposta correta não esteja sempre na mesma posição
      const originalCorretaText = data.alternativas[data.correta];
      const shuffled = [...data.alternativas];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const newCorreta = shuffled.indexOf(originalCorretaText);

      return {
        ...data,
        alternativas: shuffled,
        correta: newCorreta,
        id: Date.now() + Math.random(),
        materia: options.materia,
        banca: 'CESGRANRIO',
        geradaPorIA: true,
        provider: 'gemini'
      };
    } catch (error: any) {
      console.error("[Gemini] Erro ao parsear JSON. Texto recebido:", text.substring(0, 200) + "...");
      throw new Error(`Falha ao processar resposta do Gemini: ${error.message}`);
    }
  }
}
