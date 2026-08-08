import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabaseServer = await createServerClient();
    const { data: { session } } = await supabaseServer.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Verify if caller is sysadmin/admin
    const { data: callerProfile } = await supabaseServer
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (callerProfile?.role !== "sysadmin" && callerProfile?.role !== "admin") {
      return NextResponse.json({ error: "Permissão negada" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, updates } = body;

    if (!userId || !updates) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // Use Service Role to bypass RLS
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({
        nome: updates.nome,
        username: updates.username ? updates.username.toLowerCase().trim() : null,
        email: updates.email,
        role: updates.role,
        plan: updates.plan,
        cargo: updates.cargo || null,
        concurso_id: updates.concurso_id || null,
      })
      .eq("id", userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Se uma nova senha for fornecida, atualizar na autenticação do Supabase
    if (updates.password && updates.password.trim() !== "") {
      const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        { password: updates.password.trim() }
      );
      
      if (authError) {
        return NextResponse.json({ error: `Perfil atualizado, mas falhou ao resetar senha: ${authError.message}` }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[UpdateUserAPI] Error:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
