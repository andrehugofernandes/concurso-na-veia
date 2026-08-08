import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { MateriaConteudo } from "@/data/conteudo";
import { getProgramaDeEstudos } from "@/data/programa-estudos";

const PREDEFINED_COLORS = [
  "from-blue-500 to-cyan-500",
  "from-indigo-500 to-purple-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-pink-500 to-rose-500",
  "from-teal-500 to-cyan-600",
];

const PREDEFINED_ICONS = ["📚", "🧠", "💼", "📈", "💻", "🔬", "⚖️"];

function hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function formatMateriaNome(id: string): string {
  if (id.toLowerCase() === "portugues") return "Língua Portuguesa";
  if (id.toLowerCase() === "rlm") return "Raciocínio Lógico-Matemático";
  if (id.toLowerCase() === "matematica") return "Matemática";
  if (id.toLowerCase() === "informatica") return "Informática";
  
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function useDynamicAulas(cargoSlug?: string) {
  const [programa, setPrograma] = useState<MateriaConteudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDynamic, setIsDynamic] = useState(false);

  useEffect(() => {
    async function fetchAulas() {
      if (!cargoSlug) {
        setPrograma([]);
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        
        const { data: cargos, error: cargoError } = await supabase
          .from("cargos")
          .select("concurso_id")
          .eq("slug", cargoSlug)
          .single();

        if (cargoError || !cargos?.concurso_id) {
          setPrograma(getProgramaDeEstudos(cargoSlug));
          setIsDynamic(false);
          setLoading(false);
          return;
        }

        const { data: lessons, error: lessonsError } = await supabase
          .from("lessons")
          .select("materia_id, topico_id, titulo, ordem")
          .eq("concurso_id", cargos.concurso_id)
          .order("ordem", { ascending: true });

        if (lessonsError || !lessons || lessons.length === 0) {
          setPrograma(getProgramaDeEstudos(cargoSlug));
          setIsDynamic(false);
          setLoading(false);
          return;
        }

        const materiaMap = new Map<string, MateriaConteudo>();
        
        lessons.forEach((lesson) => {
          const mId = lesson.materia_id || "geral";
          
          if (!materiaMap.has(mId)) {
            const hash = hashStringToNumber(mId);
            const cor = PREDEFINED_COLORS[hash % PREDEFINED_COLORS.length];
            const icone = PREDEFINED_ICONS[hash % PREDEFINED_ICONS.length];
            
            materiaMap.set(mId, {
              id: mId,
              nome: formatMateriaNome(mId),
              descricao: `Conteúdo de ${formatMateriaNome(mId)} gerado para seu cargo.`,
              icone,
              cor,
              requiredPlan: "Bronze",
              topicos: [],
            });
          }
          
          const materia = materiaMap.get(mId)!;
          materia.topicos.push({
            id: lesson.topico_id,
            titulo: lesson.titulo,
            descricao: "Módulo da disciplina.",
            duracao: "40 min",
            ordem: lesson.ordem,
          });
        });

        const dynamicPrograma = Array.from(materiaMap.values());
        setPrograma(dynamicPrograma);
        setIsDynamic(true);
      } catch (err) {
        console.error("Error fetching dynamic aulas:", err);
        setPrograma(getProgramaDeEstudos(cargoSlug));
        setIsDynamic(false);
      } finally {
        setLoading(false);
      }
    }

    fetchAulas();
  }, [cargoSlug]);

  return { programa, loading, isDynamic };
}
