"use client";

import { use, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getMateriaById,
  getTopicoById,
  getNextTopico,
  getPrevTopico,
} from "@/data/conteudo";
import { notFound } from "next/navigation";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { AulaProps } from "@/components/aulas/shared";
import { useSetPageTitle } from "@/contexts/UIContext";

// Dynamic import para evitar hydration mismatch dos componentes Radix UI (Dialog, Accordion, Tabs)
const AulaInterpretacaoTexto = dynamic(
  () => import("@/components/aulas/AulaInterpretacaoTexto"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaConcordancia = dynamic(
  () => import("@/components/aulas/AulaConcordancia"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaReescritaFrases = dynamic(
  () => import("@/components/aulas/AulaReescritaFrases"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaCoesaoCoerencia = dynamic<AulaProps>(
  () => import("@/components/aulas/AulaCoesaoCoerencia"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaCrase = dynamic<AulaProps>(
  () => import("@/components/aulas/AulaCrase"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaPontuacao = dynamic<AulaProps>(
  () => import("@/components/aulas/AulaPontuacao"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaRegencia = dynamic<AulaProps>(
  () => import("@/components/aulas/AulaRegencia"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaSintaxe = dynamic<AulaProps>(
  () => import("@/components/aulas/AulaSintaxe"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaClassesPalavras = dynamic<AulaProps>(
  () => import("@/components/aulas/AulaClassesPalavras"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaTiposTextuais = dynamic<AulaProps>(
  () => import("@/components/aulas/AulaTiposTextuais"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaOrtografia = dynamic<AulaProps>(
  () => import("@/components/aulas/AulaOrtografia"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

interface PageProps {
  params: Promise<{ materia: string; topico: string }>;
}

// Conteúdo das aulas (em produção viria de um CMS ou banco de dados)
const CONTEUDO_AULAS: Record<
  string,
  Record<
    string,
    { titulo: string; secoes: { subtitulo: string; texto: string }[] }
  >
> = {
  portugues: {
    interpretacao: {
      titulo: "Interpretação de Texto",
      secoes: [
        {
          subtitulo: "O que é Interpretação de Texto?",
          texto: `A interpretação de texto é a habilidade de compreender o significado de um texto, identificando suas ideias principais, secundárias e implícitas. Nas provas da CESGRANRIO, essa competência é fundamental e representa uma grande parte das questões de Língua Portuguesa.

Para interpretar corretamente um texto, você precisa ir além da leitura superficial. É necessário identificar o que o autor quis dizer, mesmo quando ele não expressa diretamente suas ideias.`,
        },
        {
          subtitulo: "Técnicas de Leitura Eficiente",
          texto: `**Leitura Prévia (Skimming):** Passe os olhos rapidamente pelo texto para ter uma ideia geral do assunto. Observe título, subtítulos, primeiro e último parágrafo.

**Leitura Detalhada (Scanning):** Leia com atenção, buscando informações específicas. Sublinhe palavras-chave e ideias importantes.

**Releitura Crítica:** Após a primeira leitura, releia os trechos mais importantes fazendo perguntas: "O que o autor quis dizer?", "Qual a intenção do texto?"`,
        },
        {
          subtitulo: "Identificando a Ideia Central",
          texto: `A ideia central é o tema principal do texto. Para identificá-la:

1. **Pergunte-se:** "Sobre o que o texto fala?"
2. **Observe o título:** Geralmente indica o assunto principal
3. **Analise o primeiro parágrafo:** Costuma apresentar o tema
4. **Verifique a conclusão:** Retoma a ideia central

**Dica CESGRANRIO:** Questões sobre ideia central costumam usar termos como "tema principal", "assunto central", "o texto trata principalmente de".`,
        },
        {
          subtitulo: "Informações Explícitas vs. Implícitas",
          texto: `**Informações Explícitas:** Estão claramente escritas no texto. Basta localizá-las.

**Informações Implícitas:** Não estão escritas diretamente, mas podem ser deduzidas. Requerem inferência do leitor.

Exemplo:
> "João saiu correndo quando ouviu o trovão."

- **Explícito:** João saiu correndo.
- **Implícito:** João tem medo de trovão ou de tempestade.

**Atenção:** A CESGRANRIO frequentemente cobra inferências. Cuidado para não confundir com sua opinião pessoal!`,
        },
        {
          subtitulo: "Resumo e Pontos-Chave",
          texto: `✅ **Lembre-se para a prova:**

• Leia o texto inteiro antes de responder
• Identifique o tema central e as ideias secundárias
• Diferencie fatos de opiniões do autor
• Cuidado com alternativas que contradizem o texto
• Questões com "segundo o texto" pedem informações explícitas
• Questões com "pode-se inferir" pedem informações implícitas

🎯 **Padrão CESGRANRIO:**
As questões costumam ser diretas, sem pegadinhas. A resposta correta é aquela que melhor representa o que está no texto.`,
        },
      ],
    },
    concordancia: {
      titulo: "Concordância Verbal e Nominal",
      secoes: [
        {
          subtitulo: "Regras Básicas de Concordância Verbal",
          texto: `A concordância verbal é a relação entre o verbo e o sujeito da oração. O verbo deve concordar com o sujeito em número (singular/plural) e pessoa (1ª, 2ª, 3ª).

**Regra Geral:** O verbo concorda com o núcleo do sujeito.

Exemplos:
• "Os alunos **estudam** todos os dias." (sujeito plural → verbo plural)
• "O professor **explica** a matéria." (sujeito singular → verbo singular)`,
        },
        {
          subtitulo: "Casos Especiais",
          texto: `**Sujeito Composto:**
• Antes do verbo → verbo no plural: "Pedro e Maria **viajaram**."
• Depois do verbo → pode concordar com o mais próximo: "**Viajou** Pedro e Maria." ou "**Viajaram** Pedro e Maria."

**Expressões Partitivas:**
"A maioria dos alunos", "grande parte de", "a maior parte de" → verbo no singular ou plural:
• "A maioria dos alunos **faltou**." (mais formal)
• "A maioria dos alunos **faltaram**." (aceito)

**Pronome Relativo "QUE":**
O verbo concorda com o antecedente:
• "Fui eu **que fiz**."
• "Fomos nós **que fizemos**."`,
        },
      ],
    },
  },
  matematica: {
    porcentagem: {
      titulo: "Porcentagem",
      secoes: [
        {
          subtitulo: "O que é Porcentagem?",
          texto: `Porcentagem é uma razão centesimal, ou seja, uma fração com denominador 100. O símbolo % significa "por cento" ou "dividido por 100".

**Exemplos:**
• 25% = 25/100 = 0,25
• 50% = 50/100 = 0,50 = 1/2
• 100% = 100/100 = 1 (o todo)

**Conversões importantes:**
• Porcentagem → Decimal: divida por 100
• Decimal → Porcentagem: multiplique por 100`,
        },
        {
          subtitulo: "Calculando Porcentagens",
          texto: `**Fórmula básica:** Valor = Porcentagem × Base

**Exemplo:** Quanto é 15% de 200?
• 15% de 200 = 0,15 × 200 = 30

**Dica rápida:** Para calcular 10%, basta dividir por 10:
• 10% de 350 = 35
• 5% de 350 = 17,5 (metade de 10%)
• 15% de 350 = 35 + 17,5 = 52,5`,
        },
        {
          subtitulo: "Aumentos e Descontos",
          texto: `**Aumento de X%:** Multiplique por (1 + X/100)
• Preço com 20% de aumento: P × 1,20

**Desconto de X%:** Multiplique por (1 - X/100)
• Preço com 20% de desconto: P × 0,80

**Exemplo Prático:**
Um produto custa R$ 150. Com desconto de 30%, quanto passa a custar?
• Novo preço = 150 × 0,70 = R$ 105,00`,
        },
        {
          subtitulo: "Aumentos Sucessivos",
          texto: `Quando há aumentos ou descontos sucessivos, multiplicamos os fatores:

**Exemplo:** Um produto teve aumento de 10% e depois mais 20%.
• Fator total = 1,10 × 1,20 = 1,32
• Aumento total = 32% (e não 30%!)

**Pegadinha comum:** Aumentar 50% e depois diminuir 50% NÃO volta ao valor original!
• 100 × 1,50 = 150
• 150 × 0,50 = 75 (você perdeu 25%!)`,
        },
      ],
    },
  },
  fisica: {
    termodinamica: {
      titulo: "Termodinâmica",
      secoes: [
        {
          subtitulo: "Conceitos Fundamentais",
          texto: `A Termodinâmica estuda as relações entre calor, trabalho e energia. É essencial para técnicos de operação que trabalham com processos industriais.

**Conceitos-chave:**
• **Calor (Q):** Energia transferida devido à diferença de temperatura
• **Trabalho (W):** Energia transferida por força através de deslocamento
• **Energia Interna (U):** Energia total das partículas do sistema`,
        },
        {
          subtitulo: "Primeira Lei da Termodinâmica",
          texto: `A energia não pode ser criada nem destruída, apenas transformada.

**Equação:** ΔU = Q - W

Onde:
• ΔU = variação da energia interna
• Q = calor fornecido ao sistema
• W = trabalho realizado pelo sistema

**Convenções:**
• Q > 0: sistema recebe calor
• Q < 0: sistema perde calor
• W > 0: sistema realiza trabalho
• W < 0: trabalho realizado sobre o sistema`,
        },
        {
          subtitulo: "Segunda Lei da Termodinâmica",
          texto: `O calor flui espontaneamente apenas do corpo mais quente para o mais frio.

**Implicações:**
• É impossível construir uma máquina térmica com 100% de eficiência
• A entropia (desordem) do universo sempre aumenta
• Processos naturais são irreversíveis

**Rendimento de máquinas térmicas:**
η = W/Q_quente = 1 - Q_frio/Q_quente

O rendimento máximo teórico é dado pelo Ciclo de Carnot:
η_max = 1 - T_frio/T_quente (temperaturas em Kelvin)`,
        },
      ],
    },
  },
};

export default function TopicoPage({ params }: PageProps) {
  const { materia: materiaId, topico: topicoId } = use(params);
  const materia = getMateriaById(materiaId);
  const topico = getTopicoById(materiaId, topicoId);
  const nextTopico = getNextTopico(materiaId, topicoId);
  const prevTopico = getPrevTopico(materiaId, topicoId);

  // Definir título da página no cabeçalho
  useSetPageTitle(topico?.titulo || "");

  // Hook de persistência de progresso
  const { progress, completed, loading, updateProgress, completeAula } =
    useAulaProgress(materiaId, topicoId);
  const [isCompleted, setIsCompleted] = useState(false);
  const [xpGanho, setXpGanho] = useState(0);

  // Sincronizar estado local com o do banco
  useEffect(() => {
    setIsCompleted(completed);
  }, [completed]);

  if (!materia || !topico) {
    notFound();
  }

  // Get content or show placeholder
  const conteudo = CONTEUDO_AULAS[materiaId]?.[topicoId];

  const handleCompleteAula = async () => {
    const result = await completeAula();
    if (result.success) {
      setIsCompleted(true);
      setXpGanho(result.xp_awarded);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="container mx-auto px-6 py-4 max-w-6xl">
        <div className="bg-card/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl p-3 border border-border dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <Link
                href={`/aulas/${materiaId}`}
                className="px-3 py-1.5 rounded-lg bg-secondary/80 dark:bg-slate-700 text-secondary-foreground dark:text-slate-200 hover:bg-secondary transition flex items-center gap-2 font-medium border border-border/50"
              >
                <span className="text-lg leading-none">←</span> {materia.nome}
              </Link>
              <span className="text-muted-foreground/40 font-light text-xl">
                /
              </span>
              <span className="text-foreground font-semibold truncate max-w-[150px] md:max-w-none">
                {topico.titulo}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {prevTopico && (
                <Link
                  href={`/aulas/${materiaId}/${prevTopico.id}`}
                  className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-bold flex items-center gap-2 shadow-sm border border-border/50 text-xs"
                  title={prevTopico.titulo}
                >
                  Anterior
                </Link>
              )}
              {nextTopico && (
                <Link
                  href={`/aulas/${materiaId}/${nextTopico.id}`}
                  className="px-4 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-bold flex items-center gap-2 shadow-sm border border-border/50 text-xs"
                >
                  Próximo
                  <span className="hidden md:inline">
                    : {nextTopico.titulo}
                  </span>{" "}
                  <span className="text-lg leading-none">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full py-0">
        {/* Title - Ocultado para Aulas Premium que já possuem cabeçalho próprio */}
        {![""].includes(topicoId) && (
          <div className="max-w-6xl mx-auto px-6 pt-8 pb-0">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${materia.cor} text-white`}
              >
                {materia.nome}
              </span>
              <span className="text-gray-500 text-sm">⏱️ {topico.duracao}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {topico.titulo}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg leading-relaxed max-w-2xl">
              {topico.descricao}
            </p>
          </div>
        )}

        {/* Global Progress Indicator handled inside each lesson via AulaTemplate */}

        {/* Article Content */}
        <article className="w-full">
          {materiaId === "portugues" && topicoId === "interpretacao" ? (
            <AulaInterpretacaoTexto
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "concordancia" ? (
            <AulaConcordancia
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "reescrita-frases" ? (
            <AulaReescritaFrases
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "coesao-coerencia" ? (
            <AulaCoesaoCoerencia
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "crase" ? (
            <AulaCrase
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "pontuacao" ? (
            <AulaPontuacao
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "regencia" ? (
            <AulaRegencia
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "sintaxe" ? (
            <AulaSintaxe
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "classes-palavras" ? (
            <AulaClassesPalavras
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "tipos-textuais" ? (
            <AulaTiposTextuais
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : materiaId === "portugues" && topicoId === "ortografia" ? (
            <AulaOrtografia
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
            />
          ) : conteudo ? (
            conteudo.secoes.map((secao, index) => (
              <section key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  {secao.subtitulo}
                </h2>
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                  {secao.texto.split("\n\n").map((paragrafo, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-gray-300 mb-4 last:mb-0 whitespace-pre-line leading-relaxed"
                    >
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="max-w-6xl mx-auto px-6 py-8">
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 text-center">
                <span className="text-6xl mb-4 block">🚧</span>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Conteúdo em Desenvolvimento
                </h2>
                <p className="text-gray-400">
                  Esta aula está sendo preparada. Em breve você terá acesso ao
                  conteúdo completo!
                </p>
              </div>
            </div>
          )}
        </article>

        {/* Completion CTA — only for generic lessons (interpretacao has its own) */}
        {!(materiaId === "portugues" && topicoId === "interpretacao") && (
          <div className="max-w-6xl mx-auto px-6">
            <div className="mt-12 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border border-yellow-500/30 text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {isCompleted ? "✅ Aula Concluída!" : "📖 Termine a leitura"}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 mb-4">
                {isCompleted
                  ? `Parabéns! Você ganhou +${xpGanho || 50} XP`
                  : "Role até o final para marcar esta aula como concluída e ganhar XP"}
              </p>
              <button
                onClick={handleCompleteAula}
                disabled={isCompleted || loading}
                className={`px-6 py-3 rounded-xl font-bold transition ${
                  isCompleted
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : loading
                      ? "bg-gray-600 text-gray-400 cursor-wait"
                      : "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:shadow-lg hover:shadow-orange-500/25"
                }`}
              >
                {isCompleted
                  ? "🏆 +50 XP Conquistados!"
                  : loading
                    ? "Carregando..."
                    : "Marcar como Concluída"}
              </button>
            </div>
          </div>
        )}

        {/* Navigation Footer (Duplicado do Header) */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="mt-16 pt-8 border-t border-border">
            <div className="bg-card/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl p-4 border border-border dark:border-slate-700/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-muted-foreground font-medium text-sm">
                Próximo passo:
              </span>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                {prevTopico && (
                  <Link
                    href={`/aulas/${materiaId}/${prevTopico.id}`}
                    className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-bold flex items-center gap-2 shadow-sm border border-border/50 text-sm"
                    title={prevTopico.titulo}
                  >
                    Anterior
                  </Link>
                )}
                {nextTopico && (
                  <Link
                    href={`/aulas/${materiaId}/${nextTopico.id}`}
                    className="px-6 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-bold flex items-center gap-2 shadow-sm border border-border/50 text-sm"
                  >
                    Próximo
                    <span className="hidden md:inline">
                      : {nextTopico.titulo}
                    </span>{" "}
                    <span className="text-lg leading-none">→</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
