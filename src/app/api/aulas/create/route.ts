import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { AulaConteudoSchema } from "@/shared/schemas/aula.schema";

/**
 * POST /api/aulas/create
 * Handler para o Form Wizard do admin criar ou atualizar (upsert) aulas híbridas baseadas em JSON.
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Validar se o usuário está autenticado e possui papel de admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Opcional: Validar se o usuário possui a role de administrador no JWT ou perfil
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Permissão de administrador necessária" }, { status: 403 });
    }

    const body = await request.json();
    const { id, slug, curso_id, titulo, materia_id, metadata, conteudo, tenant_id } = body;

    if (!slug || !titulo || !materia_id) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes (slug, titulo, materia_id)" }, { status: 400 });
    }

    // Validar a conformidade estrita da estrutura da aula com o Zod
    const validation = AulaConteudoSchema.safeParse(conteudo);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Erro de validação do conteúdo didático", details: validation.error.format() },
        { status: 400 }
      );
    }

    // Montar objeto de gravação
    const recordPayload = {
      slug,
      curso_id: curso_id || null,
      titulo,
      materia_id,
      metadata: metadata || {},
      conteudo: validation.data,
      tenant_id: tenant_id || null,
      updated_at: new Date().toISOString(),
    };

    let responseData;
    if (id) {
      // Atualização
      const { data, error } = await supabase
        .from("aulas")
        .update(recordPayload)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      responseData = data;
    } else {
      // Inserção
      const { data, error } = await supabase
        .from("aulas")
        .insert({
          ...recordPayload,
          id: undefined, // deixa o Supabase gerar o UUID
        })
        .select()
        .single();

      if (error) throw error;
      responseData = data;
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error: any) {
    console.error("[POST /api/aulas/create]", error);
    return NextResponse.json({ error: error.message || "Erro interno do servidor" }, { status: 500 });
  }
}
