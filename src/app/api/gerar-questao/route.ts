
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { materia, dificuldade, assunto, contexto, questoesAnteriores } = await request.json();

    // Prompt reformulado para garantir consistência
    const promptBase = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.

TAREFA: Criar UMA questão de ${materia} ${assunto ? `(Assunto Específico: ${assunto})` : ''} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
${dificuldade ? `Dificuldade: ${dificuldade}` : ''}

REGRAS OBRIGATÓRIAS:
1. Estilo CESGRANRIO: enunciado CURTO (2-3 linhas), objetivo, direto
2. Contexto Industrial: Use cenários de óleo e gás (plataformas, refinarias, dutos)
3. 5 alternativas plausíveis

⚠️ REGRA CRÍTICA DE CONSISTÊNCIA:
- A alternativa CORRETA deve ser a que está no índice informado no campo "correta"
- A explicação DEVE demonstrar o cálculo/raciocínio que leva EXATAMENTE ao valor da alternativa correta
- VERIFIQUE: se sua explicação calcula "42.000", a alternativa[correta] DEVE ser "42.000"
- NUNCA coloque um valor calculado que não exista como alternativa

PROCESSO OBRIGATÓRIO:
1. Primeiro, defina o problema e CALCULE a resposta correta
2. Depois, crie 4 alternativas incorretas (distratores plausíveis)
3. Coloque a resposta correta em uma posição aleatória (0, 1, 2, 3 ou 4)
4. Informe o índice correto no campo "correta"
5. Escreva a explicação que leva EXATAMENTE ao valor da alternativa correta

Retorne APENAS um JSON válido:
{
  "enunciado": "texto da questão",
  "alternativas": ["alternativa A", "alternativa B", "alternativa C", "alternativa D", "alternativa E"],
  "correta": <índice 0-4 da alternativa correta>,
  "explicacao": "explicação que demonstra o cálculo/raciocínio que resulta EXATAMENTE no valor de alternativas[correta]",
  "assunto": "${assunto || 'Geral'}",
  "dificuldade": "Fácil|Média|Difícil"
}

REGRAS DE FORMATAÇÃO HTML (CRÍTICO):
- Use tags HTML para destaque visual: <b>negrito</b>, <u>sublinhado</u>, <i>itálico</i>.
- NÃO use Markdown (como **negrito** ou _itálico_).
- REGRA ABSOLUTA SOBRE SUBLINHADO: Quando a questão pedir "o termo sublinhado" ou "a expressão sublinhada", a tag <u> DEVE envolver APENAS a palavra ou expressão curta que é o alvo da questão, NUNCA a frase inteira.
  - CORRETO: "Os procedimentos devem ser <u>revistos periodicamente</u> para garantir a eficácia."
  - ERRADO: "<u>Os procedimentos devem ser revistos periodicamente para garantir a eficácia.</u>"
- O trecho sublinhado deve corresponder exatamente ao que as alternativas substituem.
${questoesAnteriores && questoesAnteriores.length > 0 ? `
DIVERSIDADE OBRIGATÓRIA:
- Já foram geradas ${questoesAnteriores.length} questões neste simulado. Você DEVE criar uma questão COMPLETAMENTE DIFERENTE.
- NÃO repita o mesmo tipo de problema, cenário, ou estrutura.
- Use um ASSUNTO/TÓPICO diferente dos já abordados.
- Questões anteriores (resumo): ${questoesAnteriores.join(' | ')}
` : ''}`;

    console.log(`[Sonnet] Gerando questão de ${materia} (${dificuldade || 'auto'}) para ${contexto?.cargo || 'Geral'}`);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-20250514',
        max_tokens: 2000,
        system: `Você é um gerador de questões de concurso PRECISO e CONSISTENTE. 
REGRA ABSOLUTA: O valor calculado na explicação DEVE ser IDÊNTICO ao valor da alternativa marcada como correta.
Se você calcular 235.6 m³, a alternativa correta DEVE conter "235.6 m³" ou aproximação muito próxima.
NUNCA gere questões onde o cálculo da explicação não bate com a alternativa correta.
Faça os cálculos matemáticos com cuidado antes de definir as alternativas.`,
        messages: [
          {
            role: 'user',
            content: promptBase
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na API Anthropic:', response.status, errorText);
      return NextResponse.json(
        { error: `Erro na API: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const textoResposta = data.content[0].text;

    // Extrair JSON do texto com mais robustez
    let jsonTexto = textoResposta;
    if (textoResposta.includes('```json')) {
      jsonTexto = textoResposta.split('```json')[1].split('```')[0].trim();
    } else if (textoResposta.includes('```')) {
      jsonTexto = textoResposta.split('```')[1].split('```')[0].trim();
    }

    // Limpeza de caracteres invisíveis
    jsonTexto = jsonTexto.replace(/[\u0000-\u0019]+/g, "");

    const questao = JSON.parse(jsonTexto);

    // Validar estrutura básica
    if (!questao.alternativas || questao.alternativas.length !== 5) {
      throw new Error('Questão deve ter exatamente 5 alternativas');
    }

    // Garantir que correta é um número válido entre 0-4
    questao.correta = Math.floor(Number(questao.correta));
    if (isNaN(questao.correta) || questao.correta < 0 || questao.correta > 4) {
      console.warn('Índice correta inválido, definindo como 0');
      questao.correta = 0;
    }

    // EMBARALHAR as alternativas para que a correta não fique sempre na mesma posição
    const alternativaCorreta = questao.alternativas[questao.correta];

    // Criar array de objetos com índice original
    const alternativasComIndice = questao.alternativas.map((alt: string, idx: number) => ({
      texto: alt,
      eraCorreta: idx === questao.correta
    }));

    // Embaralhar usando Fisher-Yates
    for (let i = alternativasComIndice.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [alternativasComIndice[i], alternativasComIndice[j]] = [alternativasComIndice[j], alternativasComIndice[i]];
    }

    // Reconstruir array de alternativas e encontrar novo índice da correta
    questao.alternativas = alternativasComIndice.map((a: any) => a.texto);
    questao.correta = alternativasComIndice.findIndex((a: any) => a.eraCorreta);

    // Adicionar metadados
    questao.materia = materia;
    questao.banca = 'CESGRANRIO';
    questao.geradaPorIA = true;
    questao.id = Date.now() + Math.random();

    // Log para debug
    console.log(`Questão gerada: correta=${questao.correta} (${String.fromCharCode(65 + questao.correta)}), alternativa=${questao.alternativas[questao.correta]}`);

    return NextResponse.json(questao);
  } catch (error: any) {
    console.error('Erro ao gerar questão:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao gerar questão' },
      { status: 500 }
    );
  }
}
