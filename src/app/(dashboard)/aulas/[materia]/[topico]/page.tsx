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
import { LuClock, LuCheck } from "react-icons/lu";

// Dynamic import para evitar hydration mismatch dos componentes Radix UI (Dialog, Accordion, Tabs)
const AulaInterpretacaoTexto = dynamic(
  () => import("@/components/aulas/portugues/AulaInterpretacaoTexto"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaConcordancia = dynamic(
  () => import("@/components/aulas/portugues/AulaConcordancia"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaReescritaFrases = dynamic(
  () => import("@/components/aulas/portugues/AulaReescritaFrases"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaCoesaoCoerencia = dynamic<AulaProps>(
  () => import("@/components/aulas/portugues/AulaCoesaoCoerencia"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaCrase = dynamic<AulaProps>(
  () => import("@/components/aulas/portugues/AulaCrase"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaPontuacao = dynamic<AulaProps>(
  () => import("@/components/aulas/portugues/AulaPontuacao"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaRegencia = dynamic<AulaProps>(
  () => import("@/components/aulas/portugues/AulaRegencia"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaSintaxe = dynamic<AulaProps>(
  () => import("@/components/aulas/portugues/AulaSintaxe"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaClassesPalavras = dynamic<AulaProps>(
  () => import("@/components/aulas/portugues/AulaClassesPalavras"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaTiposTextuais = dynamic<AulaProps>(
  () => import("@/components/aulas/portugues/AulaTiposTextuais"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaOrtografia = dynamic<AulaProps>(
  () => import("@/components/aulas/portugues/AulaOrtografia"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaConjuntos = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaConjuntos"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaRazaoProporcao = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaRazaoProporcao"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaPorcentagem = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaPorcentagem"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaEquacoes1Grau = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaEquacoes1Grau"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaEquacoes2Grau = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaEquacoes2Grau"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaFuncoesAfimQuadratica = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaFuncoesAfimQuadratica"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaFuncoesExponenciais = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaFuncoesExponenciais"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaProbabilidade = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaProbabilidade"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaFuncoesLogaritmicas = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaFuncoesLogaritmicas"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaProgressoesPa = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaProgressoesPa"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaProgressoesPg = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaProgressoesPg"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaMatrizesDeterminantes = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaMatrizesDeterminantes"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaAnaliseCombinatoria = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaAnaliseCombinatoria"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaTrigonometria = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaTrigonometria"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaGeometriaPlana = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaGeometriaPlana"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaGeometriaEspacial = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaGeometriaEspacial"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaGeometriaAnalitica = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaGeometriaAnalitica"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaMatematicaFinanceira = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaMatematicaFinanceira"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaSistemasLineares = dynamic<AulaProps>(
  () => import("@/components/aulas/matematica/AulaSistemasLineares"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

// ===== ADMINISTRAÇÃO - BLOCO I: GESTÃO ESTRATÉGICA =====
const AulaPlanejamentoEstrategico = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaPlanejamentoEstrategico"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaGestaoProcessos = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaGestaoProcessos"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaGestaoProjetos = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaGestaoProjetos"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaGovernancaCorporativa = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaGovernancaCorporativa"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaGestãoDePessoas = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaGestãoDePessoas"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaGestãoDeRecursosHumanos = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaGestãoDeRecursosHumanos"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaMarketingGerencial = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaMarketingGerencial"),
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
    "interpretacao-texto": {
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
      {/* Main Content */}
      <main className="w-full">
        {/* Article Content */}
        <article className="w-full">
          {materiaId === "portugues" && topicoId === "interpretacao-texto" ? (
            <AulaInterpretacaoTexto
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "concordancia" ? (
            <AulaConcordancia
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "reescrita-frases" ? (
            <AulaReescritaFrases
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "coesao-coerencia" ? (
            <AulaCoesaoCoerencia
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "crase" ? (
            <AulaCrase
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "pontuacao" ? (
            <AulaPontuacao
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "regencia" ? (
            <AulaRegencia
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "sintaxe" ? (
            <AulaSintaxe
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "classes-palavras" ? (
            <AulaClassesPalavras
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "tipos-textuais" ? (
            <AulaTiposTextuais
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "portugues" && topicoId === "ortografia" ? (
            <AulaOrtografia
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "conjuntos" ? (
            <AulaConjuntos
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "razao-proporcao" ? (
            <AulaRazaoProporcao
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "porcentagem" ? (
            <AulaPorcentagem
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "equacoes-1grau" ? (
            <AulaEquacoes1Grau
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "equacoes-2grau" ? (
            <AulaEquacoes2Grau
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" &&
            topicoId === "funcoes-afim-quadratica" ? (
            <AulaFuncoesAfimQuadratica
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" &&
            topicoId === "funcoes-exponenciais" ? (
            <AulaFuncoesExponenciais
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" &&
            topicoId === "funcoes-logaritmicas" ? (
            <AulaFuncoesLogaritmicas
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "progressoes-pa" ? (
            <AulaProgressoesPa
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "progressoes-pg" ? (
            <AulaProgressoesPg
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "probabilidade" ? (
            <AulaProbabilidade
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "matrizes-determinantes" ? (
            <AulaMatrizesDeterminantes
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "analise-combinatoria" ? (
            <AulaAnaliseCombinatoria
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "trigonometria" ? (
            <AulaTrigonometria
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "trigonometria" ? (
            <AulaTrigonometria
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "geometria-plana" ? (
            <AulaGeometriaPlana
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "geometria-espacial" ? (
            <AulaGeometriaEspacial
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "geometria-analitica" ? (
            <AulaGeometriaAnalitica
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "matematica-financeira" ? (
            <AulaMatematicaFinanceira
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "matematica" && topicoId === "sistemas-lineares" ? (
            <AulaSistemasLineares
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "especifica-bloco-i-gestao-estrategica" && topicoId === "planejamento-estrategico" ? (
            <AulaPlanejamentoEstrategico
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "especifica-bloco-i-gestao-estrategica" && topicoId === "gestao-de-processos" ? (
            <AulaGestaoProcessos
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "especifica-bloco-i-gestao-estrategica" && topicoId === "gestao-de-projetos-pmbok" ? (
            <AulaGestaoProjetos
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "especifica-bloco-i-gestao-estrategica" && topicoId === "governanca-corporativa" ? (
            <AulaGovernancaCorporativa
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "especifica-bloco-ii-gestao-de-pessoas-e-marketing" && topicoId === "gestao-pessoas" ? (
            <AulaGestãoDePessoas
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "especifica-bloco-ii-gestao-de-pessoas-e-marketing" && topicoId === "gestao-recursos-humanos" ? (
            <AulaGestãoDeRecursosHumanos
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : materiaId === "especifica-bloco-ii-gestao-de-pessoas-e-marketing" && topicoId === "marketing-gerencial" ? (
            <AulaMarketingGerencial
              onComplete={handleCompleteAula}
              isCompleted={isCompleted}
              loading={loading}
              xpGanho={xpGanho}
              currentProgress={progress}
              onUpdateProgress={updateProgress}
              titulo={topico.titulo}
              descricao={topico.descricao}
              duracao={topico.duracao}
              materiaNome={materia.nome}
              materiaCor={materia.cor}
              materiaId={materiaId}
              prevTopico={prevTopico}
              nextTopico={nextTopico}
            />
          ) : conteudo ? (
            conteudo.secoes.map((secao, index) => (
              <section
                key={index}
                className="mb-12 max-w-7xl mx-auto px-6 pt-12"
              >
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
            <div className="max-w-7xl mx-auto px-6 py-8">
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

        {/* Completion CTA — only for generic lessons */}
        {conteudo &&
          ![
            "interpretacao-texto",
            "concordancia",
            "reescrita-frases",
            "coesao-coerencia",
            "crase",
            "pontuacao",
            "regencia",
            "sintaxe",
            "classes-palavras",
            "tipos-textuais",
            "ortografia",
            "conjuntos",
            "razao-proporcao",
            "porcentagem",
            "equacoes-1grau",
            "equacoes-2grau",
            "funcoes-afim-quadratica",
            "funcoes-exponenciais",
            "funcoes-logaritmicas",
            "progressoes-pa",
            "progressoes-pg",
            "probabilidade",
            "matrizes-determinantes",
            "analise-combinatoria",
            "trigonometria",
            "geometria-plana",
            "geometria-espacial",
            "geometria-analitica",
            "matematica-financeira",
            "sistemas-lineares",
            "trigonometria",
            "planejamento-estrategico",
            "gestao-de-processos",
            "gestao-de-projetos-pmbok",
            "governanca-corporativa",
            "gestao-pessoas",
            "gestao-recursos-humanos",
            "marketing-gerencial",
          ].includes(topicoId) && (
            <div className="max-w-7xl mx-auto px-6 pb-32">
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
      </main>
    </div>
  );
}
