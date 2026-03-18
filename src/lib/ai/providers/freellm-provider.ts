import { Questao } from "@/lib/types";
import { AIProvider, AIProviderOptions } from "./base-provider";

export class FreeLLMProvider implements AIProvider {
  private apiKey: string;
  private endpoint: string;
  private model: string = "apifreellm";

  constructor() {
    this.apiKey = process.env.FREE_LLM_API_KEY || "";
    this.endpoint = process.env.FREE_LLM_URL || "https://apifreellm.com/api/v1/chat";
    
    // Garantir que o endpoint termine corretamente para o fetch se for configurado via env
    if (!this.endpoint.endsWith('/chat')) {
        this.endpoint = this.endpoint.replace(/\/$/, '') + '/chat';
    }

    console.log(`[FreeLLM] Inicializado com endpoint: ${this.endpoint}`);

    if (!this.apiKey || this.apiKey === "YOUR_FREE_LLM_API_KEY_HERE") {
      throw new Error("FREE_LLM_API_KEY não configurada. Pegue sua chave em https://apifreellm.com");
    }
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    const { materia, dificuldade, assunto, contexto, questoesAnteriores } = options;

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.

INSTRUÇÕES CRÍTICAS:
1. Crie UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
2. Dificuldade: ${dificuldade || 'Média'}
3. Estilo CESGRANRIO: enunciado CURTO (2-3 linhas), objetivo, direto.
4. 5 alternativas plausíveis e distintas entre si. PROIBIDO criar opções idênticas. Todas as 5 alternativas devem ser únicas.
5. PROIBIDO: NUNCA inclua letras (A, B, C, D, E), números ou prefixos no início das alternativas. O JSON deve conter apenas o texto puro da opção.

⚠️ REGRA ABSOLUTA DE CONSISTÊNCIA MATEMÁTICA E LÓGICA:
- Primeiro, defina o problema e REALIZE O CÁLCULO PASSO A PASSO na sua explicacao.
- A alternativa marcada como CORRETA (índice 0, 1, 2, 3 ou 4) DEVE, SEM EXCEÇÃO, ser o índice exato da string no array "alternativas" que contém a resposta comprovada pela sua explicação.
- Verificação final: Antes de fechar o JSON, confirme mentalmente se alternativas[correta] === resultado_da_explicacao.
- DISTRIBUA a resposta correta aleatoriamente entre os índices 0, 1, 2, 3 e 4. NÃO coloque sempre no índice 0.

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
- COERÊNCIA TOTAL: Se o enunciado pede um conceito (ex: Pronome), as alternativas devem ser desse conceito.
- Use tags HTML para destaque visual: <b>negrito</b>, <u>sublinhado</u>, <i>itálico</i>.
- NÃO use Markdown no texto.`;

    const start = Date.now();
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          message: prompt,
          model: this.model,
        }),
      });

      const duration = Date.now() - start;
      console.log(`[FreeLLM] Resposta recebida em ${duration}ms`);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Limite de taxa da ApiFreeLLM atingido (1 req a cada 25s). Por favor, aguarde alguns instantes.");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erro na API ApiFreeLLM: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(`ApiFreeLLM retornou erro: ${JSON.stringify(data)}`);
      }

      return this.parseResponse(data.response, options);
    } catch (error: any) {
      console.error("[FreeLLM] Erro na requisição:", error);
      throw error;
    }
  }

  async generateQuestionsBatch(options: AIProviderOptions, quantity: number): Promise<Questao[]> {
    const { materia, dificuldade, assunto, contexto } = options;
    
    // Limitar o lote para não estourar contexto ou tempo de resposta da API Free
    const batchSize = Math.min(quantity, 5);

    // Mapeamento de matérias específicas por cargo para orientar a IA
    const materiasPorCargo: Record<string, string> = {
      'Suprimentos/Administração': 'Logística, Gestão de Estoques, Licitações e Contratos, Noções de Administração',
      'Técnico de Operação': 'Física, Química, Termodinâmica, Instrumentação Industrial',
      'Manutenção Mecânica': 'Metrologia, Elementos de Máquinas, Resistência dos Materiais, Hidráulica e Pneumática',
      'Manutenção Elétrica': 'Circuitos Elétricos, Máquinas Elétricas, Instalações Elétricas, NR-10',
      'Segurança do Trabalho': 'Normas Regulamentadoras, EPIs e EPCs, Análise de Riscos, Higiene Ocupacional',
      'Engenheiro de Petróleo': 'Geologia do Petróleo, Engenharia de Reservatórios, Perfuração, Elevação e Escoamento',
      'Engenheiro Mecânico': 'Resistência dos Materiais, Termodinâmica, Mecânica dos Fluidos, Transferência de Calor',
      'Analista de Sistemas': 'Desenvolvimento de Software, Banco de Dados, Engenharia de Software, Infraestrutura e Redes',
    };

    const isEspecificas = materia.toLowerCase().includes('espec');
    const materiasDoCargoStr = contexto?.cargo ? materiasPorCargo[contexto.cargo] : null;
    const getOrientacaoMateria = () => {
      if (!isEspecificas || !contexto?.cargo) return "";
      
      if (contexto.cargo === 'Suprimentos/Administração') {
        if (materia.includes('Bloco I')) return '\n    FOCO: Bloco I - Noções de Administração, Teoria Geral da Administração, Organização e Planejamento.';
        if (materia.includes('Bloco II')) return '\n    FOCO: Bloco II - Logística, Gestão de Materiais, Gestão de Estoques e Recebimento.';
        if (materia.includes('Bloco III')) return '\n    FOCO: Bloco III - Licitações (Lei 14.133), Contratos Administrativos e Ética.';
        return `\n    IMPORTANTE: Para "${materia}", as matérias são: ${materiasPorCargo[contexto.cargo]}.`;
      }
      
      const materiasDoCargoStr = materiasPorCargo[contexto.cargo];
      return materiasDoCargoStr ? `\n    IMPORTANTE: Para Conhecimentos Específicos do cargo "${contexto?.cargo}", as matérias são: ${materiasDoCargoStr}. Distribua as questões entre esses tópicos.` : '';
    };

    const orientacaoEspecificas = getOrientacaoMateria();

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.
    
    INSTRUÇÕES:
    1. Crie EXATAMENTE ${batchSize} questões de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} para candidato a ${contexto?.cargo || 'Geral'} nível ${contexto?.nivel || 'médio'}.${orientacaoEspecificas}
    2. Estilo CESGRANRIO: enunciado direto, 5 alternativas.
    3. PROIBIDO: Todas as 5 alternativas DEVEM ser diferentes entre si na mesma questão. Nunca repita uma opção. Todas as 5 opções devem ser únicas.
    4. PROIBIDO: NUNCA inclua letras (A, B, C, D, E), números ou prefixos no início das alternativas. O JSON deve conter apenas o texto puro da opção.
    5. UNICIDADE: Cada questão deste lote deve ter enunciado COMPLETAMENTE diferente das demais. PROIBIDO repetir o mesmo trecho no enunciado de duas questões.
    6. COERÊNCIA: O enunciado e as alternativas devem tratar rigorosamente do mesmo conceito.
    7. REGRA ABSOLUTA DE GABARITO: O índice informado no campo "correta" (0 a 4) DEVE corresponder EXATAMENTE à posição dentro do array "alternativas". Omitir essa checagem causará erro de gabarito para os alunos.
    8. Retorne APENAS um JSON que seja um ARRAY de objetos.
    9. NÃO adicione texto explicativo fora do JSON.

    Formato esperado:
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
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          message: prompt,
          model: this.model,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Limite de taxa da ApiFreeLLM atingido. Aguarde 25 segundos.");
        }
        throw new Error(`Erro API: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) throw new Error("Erro na resposta da API");

      return this.parseBatchResponse(data.response, options);
    } catch (error: any) {
      console.error("[FreeLLM-Batch] Erro:", error);
      throw error;
    }
  }

  private parseBatchResponse(text: string, options: AIProviderOptions): Questao[] {
    try {
      let cleanText = text.trim();
      if (cleanText.includes("```")) {
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
      }
      
      const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
      const jsonContent = jsonMatch ? jsonMatch[0] : cleanText;
      const data = JSON.parse(jsonContent);

      if (!Array.isArray(data)) {
        throw new Error("Resposta não é um array");
      }

      return data.map(q => {
        // Sanitização robusta das alternativas para remover "A) ", "a. ", "1 - ", etc.
        const alternativasLimpas = q.alternativas.map((alt: string) => 
          alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim()
        );

        // Randomização programática (Fisher-Yates) para garantir 0 bias
        const originalCorretaText = q.alternativas[q.correta];
        const shuffled = [...alternativasLimpas];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const newCorreta = shuffled.indexOf(originalCorretaText.replace(/^[A-Ea-e][\s).:-]+/, "").trim());

        return {
          ...q,
          alternativas: shuffled,
          correta: newCorreta,
          id: Date.now() + Math.random(),
          materia: options.materia,
          banca: 'CESGRANRIO',
          geradaPorIA: true,
          provider: 'freellm'
        };
      });
    } catch (error) {
      console.error("[FreeLLM-Batch] Erro no parse:", text);
      throw new Error("Falha ao processar lote de questões");
    }
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      console.log("[FreeLLM] Raw Response:", text);
      
      // Limpeza profunda de Markdown (removendo ```json e ```)
      let cleanText = text.trim();
      if (cleanText.includes("```")) {
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
      }
      
      // Tentar encontrar um bloco JSON {...} se houver texto extra
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      const jsonContent = jsonMatch ? jsonMatch[0] : cleanText;
      
      const data = JSON.parse(jsonContent);
      
      // Validação básica dos campos
      if (!data.enunciado || !data.alternativas || data.correta === undefined) {
        throw new Error("JSON retornado pela IA está incompleto ou em formato incorreto");
      }

      // Sanitização robusta das alternativas
      const alternativasLimpas = data.alternativas.map((alt: string) => 
        alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim()
      );

      // Randomização programática final
      const originalCorretaText = data.alternativas[data.correta];
      const shuffled = [...alternativasLimpas];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const newCorreta = shuffled.indexOf(originalCorretaText.replace(/^[A-Ea-e][\s).:-]+/, "").trim());

      return {
        ...data,
        alternativas: shuffled,
        correta: newCorreta,
        id: Date.now() + Math.random(),
        materia: options.materia,
        banca: 'CESGRANRIO',
        geradaPorIA: true,
        provider: 'freellm'
      };
    } catch (error) {
      console.error("[FreeLLM] Erro ao parsear JSON interno da IA:", text);
      throw new Error(`Falha ao processar conteúdo da questão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

}
