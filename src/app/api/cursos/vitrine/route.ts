import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { createClient } from "@/lib/supabase/server";

// Mapeamento oficial de níveis de escolaridade dos concursos
const CONCURSO_NIVEIS_MAP: Record<string, string[]> = {
  petrobras: ["médio", "técnico", "superior"],
  caixa: ["médio", "superior"],
  // BB 2022: somente Escriturário (nível médio) — Agente Comercial e Agente de Tecnologia
  bb: ["médio"],
  "banco-do-brasil": ["médio"],
  correios: ["médio", "técnico", "superior"],
  ibge: ["médio", "superior"],
  inss: ["médio", "superior"],
  "ata-mf": ["médio"],
  prf: ["superior"],
  "pf-adm": ["médio", "superior"],
  tjsp: ["médio", "superior"],
  "tre-unificado": ["médio", "superior"],
};

/**
 * GET /api/cursos/vitrine
 * Endpoint público consumido pela Landing Page (CourseShowcase) e Painel Admin.
 * Retorna todos os concursos ativos conectando dinamicamente matérias, aulas, níveis e status do edital do Supabase.
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: cursos, error } = await supabase
      .from("concursos")
      .select(`
        id, nome, slug, orgao, cargo, nivel, dificuldade, horas_estimadas, descricao, gradient_color, href, logo_url, ordem, active, status_edital, ano_edital_base,
        cargos (id, nivel, materias_basicas, materias_especificas),
        lessons (id)
      `)
      .eq("active", true)
      .order("ordem", { ascending: true });

    if (error) {
      console.error("[GET /api/cursos/vitrine] Erro:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formattedCursos = (cursos || []).map((c: any) => {
      const niveisSet = new Set<string>();
      const materiasSet = new Set<string>();

      if (c.cargos && Array.isArray(c.cargos) && c.cargos.length > 0) {
        c.cargos.forEach((cg: any) => {
          if (cg.nivel) niveisSet.add(cg.nivel.toLowerCase());
          if (cg.materias_basicas && Array.isArray(cg.materias_basicas)) {
            cg.materias_basicas.forEach((m: string) => materiasSet.add(m));
          }
          if (cg.materias_especificas && Array.isArray(cg.materias_especificas)) {
            cg.materias_especificas.forEach((m: string) => materiasSet.add(m));
          }
        });
      }

      // Adicionar fallback do mapeamento por concurso
      const mappedNiveis = CONCURSO_NIVEIS_MAP[c.slug];
      if (mappedNiveis) {
        mappedNiveis.forEach((n) => niveisSet.add(n));
      } else if (c.nivel) {
        niveisSet.add(c.nivel.toLowerCase());
      }

      const orderMap: Record<string, number> = { "médio": 1, "medio": 1, "técnico": 2, "tecnico": 2, "superior": 3 };
      const niveisList = Array.from(niveisSet).sort((a, b) => (orderMap[a] || 99) - (orderMap[b] || 99));

      let countAulasReal = c.lessons && Array.isArray(c.lessons) ? c.lessons.length : 0;
      if (c.slug === "petrobras" && countAulasReal === 0) {
        countAulasReal = 436; // Aulas hardcoded em .tsx
      }
      const countMateriasReal = materiasSet.size > 0 ? materiasSet.size : 6;

      return {
        id: c.id,
        nome: c.nome,
        slug: c.slug,
        orgao: c.orgao,
        cargo: c.cargo,
        nivel: c.nivel,
        niveis: niveisList.length > 0 ? niveisList : ["médio"],
        dificuldade: c.dificuldade,
        horas_estimadas: c.horas_estimadas || 90,
        total_materias: countMateriasReal,
        total_aulas: countAulasReal,
        descricao: c.descricao,
        gradient_color: c.gradient_color,
        href: c.href,
        logo_url: c.logo_url,
        ordem: c.ordem,
        active: c.active,
        status_edital: c.status_edital || "PRE_EDITAL",
        ano_edital_base: c.ano_edital_base || "2022",
      };
    });

    return NextResponse.json({ cursos: formattedCursos });
  } catch (err: any) {
    console.error("[GET /api/cursos/vitrine] Erro genérico:", err);
    return NextResponse.json({ error: err.message || "Erro interno." }, { status: 500 });
  }
}
