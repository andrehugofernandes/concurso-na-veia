
import { NextRequest, NextResponse } from 'next/server';

// Gemini API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function POST(request: NextRequest) {
    try {
        const { materia, dificuldade, contexto, questoesAnteriores } = await request.json();

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'GEMINI_API_KEY não configurada' },
                { status: 500 }
            );
        }

        const promptBase = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.

INSTRUÇÕES CRÍTICAS:
1. Crie UMA questão de ${materia} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
2. Dificuldade: ${dificuldade || 'Média'}
3. Estilo CESGRANRIO: enunciado CURTO (2-3 linhas), objetivo, direto
4. 5 alternativas plausíveis e próximas
5. EVITE textos longos ou complexos desnecessários
6. Contexto Industrial: Sempre que possível, use cenários reais da indústria de óleo e gás

Retorne APENAS um JSON válido (sem markdown, sem explicações extras):
{
  "enunciado": "texto da questão",
  "alternativas": ["opção A", "opção B", "opção C", "opção D", "opção E"],
  "correta": 0,
  "explicacao": "explicação pedagógica detalhada",
  "assunto": "nome do assunto específico abordado",
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

        console.log(`[Gemini] Gerando questão de ${materia} (${dificuldade || 'auto'}) para ${contexto?.cargo || 'Geral'}`);

        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: promptBase }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[Gemini] Erro na API:', response.status, errorText);
            return NextResponse.json(
                { error: `Erro na API Gemini: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Extrair texto da resposta do Gemini
        const textoResposta = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textoResposta) {
            console.error('[Gemini] Resposta vazia:', data);
            return NextResponse.json(
                { error: 'Resposta vazia do Gemini' },
                { status: 500 }
            );
        }

        // Extrair JSON do texto com regex mais robusta
        let jsonTexto = textoResposta;

        // Tentar encontrar json block ```json ... ```
        const jsonBlockMatch = textoResposta.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonBlockMatch) {
            jsonTexto = jsonBlockMatch[1];
        } else {
            // Tentar encontrar block generico ``` ... ```
            const codeBlockMatch = textoResposta.match(/```\s*([\s\S]*?)\s*```/);
            if (codeBlockMatch) {
                jsonTexto = codeBlockMatch[1];
            } else {
                // Tentar encontrar apenas o objeto JSON { ... }
                const objectMatch = textoResposta.match(/\{[\s\S]*\}/);
                if (objectMatch) {
                    jsonTexto = objectMatch[0];
                }
            }
        }

        // Limpeza de caracteres invisíveis e problemáticos
        jsonTexto = jsonTexto.trim().replace(/[\u0000-\u0019]+/g, "");

        let questao;
        try {
            questao = JSON.parse(jsonTexto);
        } catch (e) {
            console.error('[Gemini] Falha ao fazer parse do JSON:', jsonTexto);
            // Tentar corrigir JSON mal formatado simples (ex: vírgula extra)
            try {
                const fixedJson = jsonTexto.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
                questao = JSON.parse(fixedJson);
            } catch (e2) {
                throw new Error('Falha ao processar resposta da IA: JSON inválido');
            }
        }

        // Validar estrutura
        if (!questao.enunciado || !questao.alternativas || questao.alternativas.length < 2) {
            throw new Error('Resposta da IA incompleta ou fora do formato esperado');
        }

        // Adicionar metadados
        const questaoFormatada = {
            ...questao,
            materia: materia,
            banca: 'CESGRANRIO',
            geradaPorIA: true,
            id: Date.now() + Math.random(),
            provider: 'gemini',
            // Garantir que correta seja indice numérico
            correta: typeof questao.correta === 'string' ?
                (questao.alternativas.findIndex((a: string) => a.toLowerCase().startsWith(questao.correta.toLowerCase())) !== -1
                    ? questao.alternativas.findIndex((a: string) => a.toLowerCase().startsWith(questao.correta.toLowerCase()))
                    : 0)
                : Number(questao.correta)
        };

        console.log(`[Gemini] Questão gerada com sucesso: ${questaoFormatada.assunto}`);
        return NextResponse.json(questaoFormatada);
    } catch (error: any) {
        console.error('[Gemini] Erro ao gerar questão:', error);
        return NextResponse.json(
            { error: error.message || 'Erro ao gerar questão' },
            { status: 500 }
        );
    }
}
