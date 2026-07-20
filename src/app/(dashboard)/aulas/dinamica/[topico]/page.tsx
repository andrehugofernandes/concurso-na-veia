import { z } from "zod";

// Re-declarando o schema Zod para garantir integridade e isolamento em runtime do Server Component
const QuizQuestionSchema = z.object({
  id: z.string(),
  pergunta: z.string(),
  alternativas: z.array(z.string()).length(5),
  respostaCorreta: z.enum(["A", "B", "C", "D", "E"]),
  explicacaoStepByStep: z.array(z.string()),
});

const FlipCardSchema = z.object({
  id: z.string(),
  icon: z.string(),
  frontTitle: z.string(),
  backContent: z.string(),
});

const ModuloSchema = z.object({
  numero: z.number(),
  titulo: z.string(),
  introducaoCEDEA: z.array(z.string()),
  laboratorioTexto: z.string().optional(),
  flipCards: z.array(FlipCardSchema).length(6),
  quiz: z.array(QuizQuestionSchema),
});

const AulaConteudoSchema = z.object({
  modulos: z.array(ModuloSchema),
});

type AulaConteudo = z.infer<typeof AulaConteudoSchema>;

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AulaPremiumDataEngine from "@/components/aulas/shared/AulaPremiumDataEngine";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Server Component do Renderizador Dinâmico de Aulas baseadas em JSON do Supabase.
 * Rota: /dashboard/aulas/[id]
 */
export default async function DynamicAulaPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Buscar aula pelo ID ou slug no Supabase
  const { data: aula, error } = await supabase
    .from("aulas")
    .select("*")
    .or(`id.eq.${id},slug.eq.${id}`)
    .single();

  if (error || !aula) {
    return notFound();
  }

  // Realizar o parse seguro usando Zod para garantir que dados malformados ou corrompidos não quebrem o app
  const parsedConteudo = AulaConteudoSchema.safeParse(aula.conteudo);
  if (!parsedConteudo.success) {
    console.error(`[DynamicAulaPage] Falha na validação do schema da aula ${id}:`, parsedConteudo.error.format());
    return (
      <div className="p-8 max-w-2xl mx-auto mt-20 text-center bg-red-500/10 border border-red-500/30 rounded-2xl">
        <h2 className="text-xl font-bold text-red-500 mb-2">Erro de Carregamento</h2>
        <p className="text-muted-foreground text-sm">
          Este conteúdo educacional não pôde ser renderizado por incompatibilidade de layout. Entre em contato com o suporte.
        </p>
      </div>
    );
  }

  // Mapear os dados dinâmicos do banco para a interface que o AulaPremiumDataEngine consome
  const engineData = {
    id: aula.id,
    titulo: aula.titulo,
    descricao: aula.metadata?.descricao || "",
    duracao: aula.metadata?.duracao || "2h",
    materiaNome: aula.materia_id, // Nome da matéria mapeado ou dinâmico
    materiaCor: aula.metadata?.materiaCor || "from-blue-500 to-cyan-500",
    materiaId: aula.materia_id,
    modulos: parsedConteudo.data.modulos.map((m) => ({
      id: `modulo-${m.numero}`,
      label: `MÓDULO ${String(m.numero).padStart(2, "0")}`,
      title: m.titulo,
      subtitle: `Metodologia didática aplicada à banca Cesgranrio`,
      duration: "15 min",
      quiz: m.quiz.map((q, idx) => ({
        id: idx + 1,
        question: q.pergunta,
        options: q.alternativas,
        correct: ["A", "B", "C", "D", "E"].indexOf(q.respostaCorreta),
        explanation: q.explicacaoStepByStep.join("\n\n"),
      })),
      sections: [
        {
          tipo: "header" as const,
          titulo: m.titulo,
          descricao: `Módulo ${m.numero}`,
        },
        {
          tipo: "texto" as const,
          conteudo: (
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              {m.introducaoCEDEA.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          ),
        },
        // Injetar FlipCards através de um bloco HTML adaptado no motor
        {
          tipo: "texto" as const,
          conteudo: (
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h4 className="font-bold text-foreground text-xl">Cards de Memorização Ativa</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {m.flipCards.map((card) => {
                  // Renderizar dinamicamente o FlipCard importado de shared
                  const FlipCard = require("@/components/aulas/shared").FlipCard;
                  const Icon = require("react-icons/lu")[card.icon] || require("react-icons/lu").LuBrain;
                  
                  return (
                    <FlipCard
                      key={card.id}
                      categoria={m.titulo}
                      frente={
                        <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                          <div className="p-4 bg-primary/10 rounded-full shadow-inner ring-1 ring-primary/20">
                            <Icon className="w-12 h-12 text-primary" />
                          </div>
                          <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                            {card.frontTitle}
                          </span>
                        </div>
                      }
                      verso={
                        <div className="space-y-4 p-4 flex flex-col justify-center h-full text-left">
                          <div className="flex items-center gap-2 text-primary font-bold border-b border-primary/10 pb-3">
                            <span className="tracking-widest uppercase text-xs">Verso do Card</span>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                            {card.backContent}
                          </p>
                        </div>
                      }
                    />
                  );
                })}
              </div>
            </div>
          ),
        },
        {
          tipo: "consolidation" as const,
          sinteseEstrategica: {
            title: "Resumo Estratégico",
            content: `Síntese dos tópicos aprendidos no Módulo ${m.numero}.`,
          },
        },
      ],
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AulaPremiumDataEngine
        data={engineData}
        isCompleted={false}
        loading={false}
        onComplete={async () => {
          "use server";
          console.log(`Aula ${id} marcada como concluída.`);
        }}
        titulo={engineData.titulo}
        descricao={engineData.descricao}
        duracao={engineData.duracao}
        materiaNome={engineData.materiaNome}
        materiaCor={engineData.materiaCor}
        materiaId={engineData.materiaId}
      />
    </div>
  );
}
