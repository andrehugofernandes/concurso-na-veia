
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { materia, dificuldade, assunto, contexto, questoesAnteriores } = await request.json();

    // Prompt reformulado para garantir consistência absoluta
    const promptBase = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.

TAREFA: Criar UMA questão de ${materia} ${assunto ? `(Assunto Específico: ${assunto})` : ''} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
${dificuldade ? `Dificuldade: ${dificuldade}` : ''}

REGRAS OBRIGATÓRIAS:
1. Estilo CESGRANRIO: enunciado CURTO (2-3 linhas), objetivo, direto.
2. Contexto Industrial: Use cenários de óleo e gás (plataformas, refinarias, dutos).
3. 5 alternativas plausíveis e próximas entre si.

⚠️ REGRA CRÍTICA DE CONSISTÊNCIA MATEMÁTICA:
- Primeiro, defina o problema e REALIZE O CÁLCULO PASSO A PASSO.
- A alternativa marcada como CORRETA (através do campo "correta") deve ser EXATAMENTE o resultado do cálculo final.
- A explicação DEVE demonstrar o cálculo/raciocínio que leva EXATAMENTE ao valor da alternativa correta.
- Se você calculou "32.400", então UMA das alternativas DEVE ser "32.400" e o campo "correta" deve apontar para ela.
- JAMAIS marque uma alternativa como correta se o valor for diferente do demonstrado na explicação.

PROCESSO DE AUTO-VERIFICAÇÃO:
1. Calcule o valor final.
2. Crie as alternativas, garantindo que o valor calculado esteja presente.
3. Verifique: "O valor em alternativas[correta] é IGUAL ao valor final da explicação?" Se não for, corrija antes de enviar.

Retorne APENAS um JSON válido:
{
  "enunciado": "texto da questão",
  "alternativas": ["valor A", "valor B", "valor C", "valor D", "valor E"],
  "correta": <índice 0-4 da alternativa correta>,
  "explicacao": "Explicação passo a passo demonstrando como chegar ao resultado exato de alternativas[correta]",
  "assunto": "${assunto || 'Geral'}",
  "dificuldade": "Fácil|Média|Difícil"
}

REGRAS DE FORMATAÇÃO HTML:
- Use tags HTML para destaque visual: <b>negrito</b>, <u>sublinhado</u>, <i>itálico</i>.
- NÃO use Markdown.
${questoesAnteriores && questoesAnteriores.length > 0 ? `
DIVERSIDADE:
- Evite temas similares a: ${questoesAnteriores.join(' | ')}
` : ''}`;

    console.log(`[Claude] Gerando questão de ${materia} (${dificuldade || 'auto'})`);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        system: `Você é um gerador de questões de concurso INFALÍVEL em lógica e matemática. 
SUA PRIORIDADE MÁXIMA É A CONSISTÊNCIA: O valor final da sua 'explicacao' DEVE ser rigorosamente igual ao valor presente na alternativas[correta].
Antes de gerar o JSON, faça as contas duas vezes mentalmente.`,
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
