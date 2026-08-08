import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAIProvider } from "@/lib/ai/provider";
import { getBancaHackerContext } from "@/lib/banca-intelligence";

function parseJSONSafely(text: string) {
  try {
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, text];
    const cleanedText = (jsonMatch[1] || text).trim();
    return JSON.parse(cleanedText);
  } catch (e) {
    console.error("[gerar-lingo] Erro ao parsear JSON:", e);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Auth Check
    if (process.env.NODE_ENV === "production") {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (!profile || (profile.role !== "admin" && profile.role !== "sysadmin")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const { concursoId, tituloCurso, cargo, banca } = await request.json();

    if (!concursoId || !tituloCurso) {
      return NextResponse.json({ error: "Faltam parâmetros obrigatórios (concursoId, tituloCurso)." }, { status: 400 });
    }

    console.log(`[gerar-lingo] Iniciando geração do NaVeiaLingo para ${tituloCurso} (${banca})`);

    const bancaContextoHacker = getBancaHackerContext(banca || "padrao");
    const aiProvider = getAIProvider();

    const systemPrompt = `Você é um Engenheiro Pedagógico sênior. 
Sua tarefa é gerar uma trilha de estudos gamificada de INGLÊS TÉCNICO (estilo Duolingo) chamada NaVeiaLingo, mas 100% moldada para o contexto do concurso fornecido.
O cargo/concurso alvo é: ${tituloCurso} - ${cargo || "Nível Médio/Superior"}.
A banca organizadora é: ${banca || "Desconhecida"}.

PERFIL DA BANCA PARA HACKEAMENTO DA PROVA DE INGLÊS:
${bancaContextoHacker}

OBJETIVO:
Gere EXATAMENTE 6 unidades temáticas de inglês técnico para este concurso.
Para cada unidade, gere exatos 5 exercícios (compostos por cloze, múltipla escolha, tradução e análise de falso cognato/sinônimos da área).
A temática das frases em inglês DEVE refletir o trabalho real do cargo (ex: finanças se for banco, direito se for tribunal, operações se for Petrobras).

O formato de saída DEVE ser um JSON estrito, sem markdown, contendo a chave "units" como um array. Siga o modelo:
{
  "units": [
    {
      "unit_id": "lingo-u1",
      "title": "Nome Criativo em Inglês (ex: The Financial Matrix)",
      "subtitle": "Gramática ou Foco (ex: Falsos Cognatos Bancários)",
      "icon": "LuLink",
      "color": "emerald",
      "ordem": 1,
      "exercises": [
        {
          "id": "u1-e1",
          "type": "cloze",
          "portuguese": "A inflação aumentou ontem.",
          "english": ["Inflation", "rose", "yesterday."],
          "options": ["rose", "fall", "keep", "decreased"],
          "explanation": "Explicação curta com dica matadora da banca."
        }
      ]
    }
  ]
}

Regras JSON de exercises:
- type pode ser "cloze", "listening", ou "reading" (evite type reading complexo para economizar tokens, prefira cloze ou tradução direta onde english é um array de palavras para o aluno montar a frase).
- "english" sempre é um array de palavras que formam a frase correta.
- Retorne EXATAMENTE 6 unidades, e em cada unidade EXATOS 5 exercícios.
- Responda APENAS com o JSON.`;

    const prompt = `Gere a trilha NaVeiaLingo para o concurso: ${tituloCurso} | Cargo: ${cargo || "Geral"}`;

    if (!aiProvider.generateResponse) throw new Error("AI Provider missing generateResponse");

    const response = await aiProvider.generateResponse(prompt, systemPrompt);
    const parsed = parseJSONSafely(response);

    if (!parsed || !parsed.units || !Array.isArray(parsed.units)) {
      throw new Error("IA retornou JSON inválido para a trilha Lingo.");
    }

    // Usar o service role bypass para salvar as unidades
    const adminSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const adminSupabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    
    let dbClient = supabase;
    if (adminSupabaseUrl && adminSupabaseKey) {
      const { createClient: createAdminClient } = require("@supabase/supabase-js");
      dbClient = createAdminClient(adminSupabaseUrl, adminSupabaseKey, { auth: { persistSession: false } });
    }

    // Delete existing se houver (para recriar)
    await dbClient.from("lingo_modules").delete().eq("concurso_id", concursoId);

    const inserts = parsed.units.map((u: any, idx: number) => ({
      concurso_id: concursoId,
      unit_id: u.unit_id || `lingo-u${idx+1}`,
      title: u.title,
      subtitle: u.subtitle,
      icon: u.icon || "LuSearch",
      color: u.color || "blue",
      total_levels: u.exercises.length,
      exercises: u.exercises,
      ordem: u.ordem || idx + 1
    }));

    const { error: insertError } = await dbClient.from("lingo_modules").insert(inserts);

    if (insertError) {
      console.error("[gerar-lingo] Erro ao inserir no banco:", insertError);
      throw insertError;
    }

    return NextResponse.json({ success: true, count: inserts.length });

  } catch (error: any) {
    console.error("[gerar-lingo] Falha geral:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
