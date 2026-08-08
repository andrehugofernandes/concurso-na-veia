import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * DELETE /api/admin/cursos/[id]
 * Exclui permanentemente um concurso, seus cargos e suas aulas associadas.
 * Apenas usuários com permissão de administrador ou sysadmin podem executar.
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // 1. Verificar Autenticação
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    // 2. Verificar Role (SYSADMIN / ADMIN)
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isSysAdmin = profile?.role === "SYSADMIN" || profile?.role === "ADMIN" || user.email === "andrehugo.pe@gmail.com";

    if (!isSysAdmin) {
      return NextResponse.json({ error: "Acesso negado. Apenas SYSADMIN pode excluir cursos." }, { status: 403 });
    }

    // 3. Excluir Aulas associadas ao Concurso
    const { error: deleteLessonsErr } = await supabase
      .from("lessons")
      .delete()
      .eq("concurso_id", id);

    if (deleteLessonsErr) {
      console.error("[DELETE /api/admin/cursos/[id]] Erro ao excluir aulas:", deleteLessonsErr);
    }

    // 4. Excluir Cargos associados ao Concurso
    const { error: deleteCargosErr } = await supabase
      .from("cargos")
      .delete()
      .eq("concurso_id", id);

    if (deleteCargosErr) {
      console.error("[DELETE /api/admin/cursos/[id]] Erro ao excluir cargos:", deleteCargosErr);
    }

    // 5. Excluir o Concurso principal
    const { error: deleteConcursoErr } = await supabase
      .from("concursos")
      .delete()
      .eq("id", id);

    if (deleteConcursoErr) {
      console.error("[DELETE /api/admin/cursos/[id]] Erro ao excluir concurso:", deleteConcursoErr);
      return NextResponse.json({ error: deleteConcursoErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Curso e dependências excluídos com sucesso." });
  } catch (err: any) {
    console.error("[DELETE /api/admin/cursos/[id]] Erro genérico:", err);
    return NextResponse.json({ error: err.message || "Erro interno do servidor." }, { status: 500 });
  }
}

/**
 * PUT /api/admin/cursos/[id]
 * Atualiza todas as informações do concurso (nome, slug, órgão, nível, cores, descrição, status, etc.).
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const supabase = await createClient();

    // 1. Verificar Autenticação
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    // 2. Verificar Role (SYSADMIN / ADMIN)
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isSysAdmin = profile?.role === "SYSADMIN" || profile?.role === "ADMIN" || user.email === "andrehugo.pe@gmail.com";

    if (!isSysAdmin) {
      return NextResponse.json({ error: "Acesso negado. Apenas SYSADMIN pode editar cursos." }, { status: 403 });
    }

    const {
      nome,
      slug,
      orgao,
      cargo,
      nivel,
      horas_estimadas,
      primary_color,
      secondary_color,
      descricao,
      status_edital,
      ano_edital_base,
      href
    } = body;

    const updatePayload: Record<string, any> = {};
    if (nome !== undefined) updatePayload.nome = nome;
    if (slug !== undefined) updatePayload.slug = slug;
    if (orgao !== undefined) updatePayload.orgao = orgao;
    if (cargo !== undefined) updatePayload.cargo = cargo;
    if (nivel !== undefined) updatePayload.nivel = nivel;
    if (horas_estimadas !== undefined) updatePayload.horas_estimadas = Number(horas_estimadas);
    if (primary_color !== undefined) updatePayload.primary_color = primary_color;
    if (secondary_color !== undefined) updatePayload.secondary_color = secondary_color;
    if (descricao !== undefined) updatePayload.descricao = descricao;
    if (status_edital !== undefined) updatePayload.status_edital = status_edital;
    if (ano_edital_base !== undefined) updatePayload.ano_edital_base = ano_edital_base;
    if (href !== undefined) updatePayload.href = href;

    const { data: updatedConcurso, error: updateErr } = await supabase
      .from("concursos")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (updateErr) {
      console.error("[PUT /api/admin/cursos/[id]] Erro ao atualizar concurso:", updateErr);
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, concurso: updatedConcurso });
  } catch (err: any) {
    console.error("[PUT /api/admin/cursos/[id]] Erro genérico:", err);
    return NextResponse.json({ error: err.message || "Erro interno do servidor." }, { status: 500 });
  }
}
