import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nqqyetymjvgstsbsxdkq.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      titulo, slug, imagem_capa, modulos,
      // Campos de vitrine (opcionais)
      cargo, nivel, dificuldade, horas_estimadas, descricao, 
      gradient_color, ordem 
    } = body;

    if (!titulo || !slug) {
      return NextResponse.json({ error: "Título e Slug são obrigatórios." }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    const adminSupabase = getServiceClient();

    // 1. Inserir ou atualizar na tabela `concursos` (incluindo metadados de vitrine)
    const { data: concurso, error: dbError } = await adminSupabase
      .from("concursos")
      .upsert({
        nome: titulo,
        slug: cleanSlug,
        orgao: titulo,
        // logo_url removido para não sobrescrever o avatar com a imagem_capa gerada pela IA
        primary_color: "#0037C1",
        secondary_color: "#008C32",
        active: true,
        // Metadados de vitrine
        cargo: cargo || null,
        nivel: nivel || "médio",
        dificuldade: dificuldade || "Médio",
        horas_estimadas: horas_estimadas || 80,
        descricao: descricao || `Prepare-se para o concurso ${titulo} com conteúdo completo e atualizado.`,
        gradient_color: gradient_color || "from-blue-500 to-blue-700",
        href: `/cursos/${cleanSlug}`,
        ordem: ordem || 99,
        students: 0,
        success_rate: "0%"
      }, { onConflict: "slug" })
      .select()
      .single();


    if (dbError) {
      console.error("[salvar-wizard] Erro em concursos:", dbError);
      return NextResponse.json({ error: dbError.message || "Erro ao salvar concurso no banco de dados." }, { status: 500 });
    }

    // 2. Inserir/Atualizar cargo correspondente na tabela `cargos` para alimentar a Vitrine Pública
    const basicasSet = new Set<string>();
    const especificasSet = new Set<string>();

    if (modulos && Array.isArray(modulos)) {
      modulos.forEach((m: any) => {
        const matNome = m.materia_nome || m.materia_id || "";
        if (!matNome) return;
        const lower = matNome.toLowerCase();
        if (
          lower.includes("portugu") ||
          lower.includes("ingl") ||
          lower.includes("matemát") ||
          lower.includes("racioc") ||
          lower.includes("atualidade") ||
          lower.includes("básico") ||
          (m.peso && String(m.peso).toLowerCase().includes("básico"))
        ) {
          basicasSet.add(matNome);
        } else {
          especificasSet.add(matNome);
        }
      });
    }

    const materiasBasicas = Array.from(basicasSet);
    const materiasEspecificas = Array.from(especificasSet);

    if (materiasBasicas.length === 0 && materiasEspecificas.length === 0) {
      materiasBasicas.push("Língua Portuguesa", "Língua Inglesa", "Matemática", "Atualidades do Mercado Financeiro");
      materiasEspecificas.push("Conhecimentos Bancários", "Tecnologia da Informação", "Probabilidade e Estatística");
    }

    const cargoNome = cargo || `${titulo} - Escriturário`;
    const cargoSlug = `${cleanSlug}-escriturario`;

    const { error: cargoError } = await adminSupabase
      .from("cargos")
      .upsert({
        concurso_id: concurso.id,
        nome: cargoNome,
        slug: cargoSlug,
        nivel: nivel || "médio",
        descricao: descricao || `Preparação completa para o cargo de ${cargoNome} cobrindo todas as disciplinas do edital.`,
        materias_basicas: materiasBasicas,
        materias_especificas: materiasEspecificas,
      }, { onConflict: "slug" });

    if (cargoError) {
      console.error("[salvar-wizard] Erro em cargos:", cargoError);
    }

    // 2. Vincular as Aulas de TODAS as disciplinas à tabela `lessons`
    if (modulos && Array.isArray(modulos) && modulos.length > 0 && concurso) {
      // Limpa edições anteriores se houver reinserção
      await adminSupabase.from("lessons").delete().eq("concurso_id", concurso.id);

      const lessonPayloads = modulos.map((modulo: any, index: number) => ({
        concurso_id: concurso.id,
        materia_id: modulo.materia_id || "geral",
        topico_id: `modulo-${modulo.numero || index + 1}`,
        titulo: modulo.titulo || `Módulo ${index + 1}`,
        duracao: "45 min",
        ordem: index + 1,
        conteudo_json: modulo
      }));

      const { error: lessonError } = await adminSupabase
        .from("lessons")
        .insert(lessonPayloads);

      if (lessonError) {
        console.error("[salvar-wizard] Erro em lessons:", lessonError);
      }
    }

    return NextResponse.json({
      success: true,
      concursoId: concurso.id,
      slug: cleanSlug
    });

  } catch (err: any) {
    console.error("[salvar-wizard] Erro genérico:", err);
    return NextResponse.json({ error: err.message || "Erro interno ao publicar o curso." }, { status: 500 });
  }
}
