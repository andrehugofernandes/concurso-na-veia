import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAIProvider } from "@/lib/ai/provider";
import { identifyBancaFromText, getBancaHackerContext } from "@/lib/banca-intelligence";

function parseJSONSafely(text: string) {
  try {
    // Remove markdown code fences se existirem
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, text];
    const cleanedText = (jsonMatch[1] || text).trim();
    return JSON.parse(cleanedText);
  } catch (e) {
    console.error("[gerar-wizard] Erro ao parsear JSON da resposta de IA:", e);
    console.error("[gerar-wizard] Texto recebido (primeiros 500 chars):", text.substring(0, 500));
    return null;
  }
}

/**
 * Tenta localizar o conteúdo programático no texto do edital via heurística.
 * Fallback caso o frontend não envie o campo `conteudoProgramatico` pré-extraído.
 */
function findConteudoProgramatico(editalText: string): string {
  const keywords = [
    "ANEXO III",
    "ANEXO IV",
    "ANEXO II",
    "CONTEÚDO PROGRAMÁTICO",
    "CONTEÚDOS PROGRAMÁTICOS",
    "CONHECIMENTOS BÁSICOS",
    "PROGRAMA DAS PROVAS",
    "OBJETOS DE AVALIAÇÃO",
  ];

  const upperText = editalText.toUpperCase();

  // 1. Tenta encontrar primeiro a partir de ANEXO III ou CONTEÚDO PROGRAMÁTICO (onde a lista real fica)
  for (const keyword of keywords) {
    const idx = upperText.lastIndexOf(keyword);
    if (idx !== -1 && idx > 5000) { // Garante que pegou o anexo no corpo/final do edital e não menções na introdução
      const extracted = editalText.substring(idx, idx + 60000);
      console.log(`[gerar-wizard] Conteúdo programático localizado via "${keyword}" no índice ${idx} (${extracted.length} chars extraídos)`);
      return extracted;
    }
  }

  // 2. Se não achou via lastIndexOf, tenta a primeira ocorrência
  for (const keyword of keywords) {
    const idx = upperText.indexOf(keyword);
    if (idx !== -1) {
      const extracted = editalText.substring(idx, idx + 60000);
      console.log(`[gerar-wizard] Conteúdo programático localizado via "${keyword}" (posição inicial ${idx}) (${extracted.length} chars extraídos)`);
      return extracted;
    }
  }

  console.warn("[gerar-wizard] Não encontrou keywords específicas. Enviando os últimos 40.000 chars do edital.");
  return editalText.slice(-40000);
}

/**
 * POST /api/aulas/gerar-wizard
 * Mapeia automaticamente TODAS AS MATÉRIAS do edital e seus respectivos TÓPICOS (AULAS).
 * Esta etapa gera apenas a "Ementa" (Esqueleto) do curso.
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    
    // Em produção exige admin. Em desenvolvimento permite gerar para testes sem travar por timeout de sessão.
    if (process.env.NODE_ENV === "production") {
      if (!user) {
        return NextResponse.json({ error: "Sua sessão expirou. Por favor, faça login novamente." }, { status: 401 });
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || (profile.role !== "admin" && profile.role !== "sysadmin")) {
        return NextResponse.json({ error: "Permissão de administrador necessária." }, { status: 403 });
      }
    }

    const { editalText, conteudoProgramatico, tituloCurso } = await request.json();

    if (!editalText && !conteudoProgramatico) {
      return NextResponse.json({ error: "O texto do edital é obrigatório para a geração." }, { status: 400 });
    }

    console.log(`[gerar-wizard] Iniciando geração para "${tituloCurso}"`);
    console.log(`[gerar-wizard] editalText: ${editalText?.length || 0} chars | conteudoProgramatico: ${conteudoProgramatico?.length || 0} chars`);

    // Prioridade: conteudoProgramatico pré-extraído > busca inteligente no texto completo
    let textToSend: string;

    if (conteudoProgramatico && conteudoProgramatico.length > 200) {
      textToSend = conteudoProgramatico.slice(0, 60000);
      console.log(`[gerar-wizard] Usando conteúdo programático pré-extraído (${textToSend.length} chars)`);
    } else {
      textToSend = findConteudoProgramatico(editalText);
      console.log(`[gerar-wizard] Usando busca inteligente no texto completo (${textToSend.length} chars)`);
    }

    const aiProvider = getAIProvider();

    // Inteligência de Bancas
    const bancaIdentificada = identifyBancaFromText(textToSend);
    const bancaContextoHacker = getBancaHackerContext(bancaIdentificada);
    console.log(`[gerar-wizard] Banca identificada: ${bancaIdentificada}`);

    const systemPrompt = `Você é um Analista de Concursos Sênior especializado em editais brasileiros.
Sua missão é extrair o Conteúdo Programático do edital fornecido e transformá-lo em uma Ementa Estruturada de Aulas.

DIRETRIZES DA BANCA (${bancaIdentificada.toUpperCase()}):
${bancaContextoHacker}

ATENÇÃO: O texto a seguir contém a seção de CONTEÚDO PROGRAMÁTICO extraída do edital. Analise TODAS as disciplinas listadas.

O formato exigido é EXATAMENTE um JSON válido com a seguinte estrutura:
{
  "disciplinas": [
    {
      "id": "slug-da-disciplina", (ex: "lingua-portuguesa", "matematica", "conhecimentos-bancarios")
      "nome": "Nome da Disciplina", (ex: "Língua Portuguesa")
      "peso": "Conhecimentos Básicos ou Específicos"
    }
  ],
  "modulos": [
    {
      "titulo": "Nome da Disciplina: Nome do Tópico/Assunto", (ex: "Língua Portuguesa: Ortografia Oficial")
      "materia_id": "slug-da-disciplina-correspondente",
      "materia_nome": "Nome da Disciplina correspondente"
    }
  ]
}

Regras:
1. OBRIGATÓRIO: Extraia TODAS as disciplinas e matérias presentes no texto (ex: Língua Portuguesa, Língua Inglesa, Matemática, Atualidades do Mercado Financeiro, Probabilidade e Estatística, Conhecimentos Bancários, Tecnologia da Informação, Vendas e Negociação, etc). NUNCA pare apenas na primeira matéria.
2. Para CADA matéria/disciplina identificada, crie de 2 a 5 tópicos/aulas individuais cobrindo os assuntos listados.
3. Não invente tópicos que não estejam no edital.
4. O campo "id" da disciplina deve ser um slug em minúsculas com hífens (ex: "lingua-portuguesa", "conhecimentos-bancarios", "tecnologia-da-informacao").
5. Responda APENAS o JSON, sem markdown extra, sem explicações adicionais.`;

    const prompt = `CONTEÚDO PROGRAMÁTICO DO CONCURSO (${tituloCurso || "Público"}):\n\n${textToSend}`;

    console.log(`[gerar-wizard] Enviando ${prompt.length} chars para a IA...`);

    let disciplinasEdital: any[] = [];
    let temasGerados: any[] = [];

    try {
      if (aiProvider.generateResponse) {
        const response = await aiProvider.generateResponse(prompt, systemPrompt);
        console.log(`[gerar-wizard] Resposta da IA recebida (${response.length} chars)`);

        const parsed = parseJSONSafely(response);
        if (parsed && Array.isArray(parsed.disciplinas) && Array.isArray(parsed.modulos)) {
          disciplinasEdital = parsed.disciplinas;
          temasGerados = parsed.modulos;
          console.log(`[gerar-wizard] IA extraiu ${disciplinasEdital.length} disciplinas e ${temasGerados.length} módulos/aulas`);
        } else {
          console.error("[gerar-wizard] Estrutura JSON inválida. Parsed:", JSON.stringify(parsed).substring(0, 500));
          throw new Error("Estrutura JSON inválida retornada pela IA");
        }
      }
    } catch (aiErr: any) {
      console.error("[gerar-wizard] Erro ao chamar IA:", aiErr.message);
      return NextResponse.json({ 
        error: `Falha ao processar a extração do edital com a IA: ${aiErr.message}`,
        debug: {
          textSentLength: textToSend.length,
          textSentPreview: textToSend.substring(0, 300),
        }
      }, { status: 500 });
    }

    if (temasGerados.length === 0) {
      console.error("[gerar-wizard] Nenhum módulo gerado pela IA.");
      return NextResponse.json({ 
        error: "A IA não conseguiu extrair nenhuma matéria do edital. Verifique se o PDF contém o conteúdo programático.",
      }, { status: 422 });
    }

    const modulos = temasGerados.map((tema: any, index: number) => {
      const num = index + 1;
      return {
        numero: num,
        titulo: tema.titulo,
        materia_id: tema.materia_id,
        materia_nome: tema.materia_nome,
        // Marcador indicando que o conteúdo interno (10 Módulos CEDEA) não foi gerado ainda.
        status_conteudo: "PENDING", 
        // Os campos ricos estarão vazios até o usuário clicar em "Gerar Conteúdo"
        introducaoCEDEA: [],
        accordions: [],
        flipCards: [],
        quizzes: [],
        sinteseEstrategica: null
      };
    });

    console.log(`[gerar-wizard] ✅ Geração concluída: ${disciplinasEdital.length} disciplinas, ${modulos.length} módulos`);

    return NextResponse.json({
      success: true,
      data: {
        tituloCurso,
        banca: bancaIdentificada,
        totalDisciplinas: disciplinasEdital.length,
        disciplinas: disciplinasEdital,
        modulos
      }
    });

  } catch (error: any) {
    console.error("[gerar-wizard] Erro fatal:", error);
    return NextResponse.json({ error: error.message || "Erro ao processar o edital." }, { status: 500 });
  }
}
