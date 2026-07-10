import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/vitrine
 * Endpoint público consumido pela Landing Page. Retorna apenas cursos públicos de venda direta B2C,
 * ocultando completamente qualquer ementa ou curso customizado vinculado a órgãos públicos (GovTech).
 */
export async function GET() {
  try {
    const supabase = await createClient();

    // Query estrita garantindo apenas cursos B2C (públicos e sem associação de tenant)
    const { data: cursos, error } = await supabase
      .from("cursos")
      .select("id, titulo, slug, imagem_capa, materia_id, preco, stripe_price_id")
      .eq("is_public", true)
      .is("tenant_id", null);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data: cursos || [] });
  } catch (error: any) {
    console.error("[GET /api/vitrine]", error);
    return NextResponse.json({ error: "Falha ao obter os dados da vitrine" }, { status: 500 });
  }
}
