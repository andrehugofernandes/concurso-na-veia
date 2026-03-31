"use client";

import { use, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  getMateriaById,
  getTopicoById,
  getNextTopico,
  getPrevTopico,
  MateriaConteudo,
  Topico,
} from "@/data/conteudo";
import { getProgramaDeEstudos } from "@/data/programa-estudos";
import { PROFISSOES } from "@/lib/profissoes-edital";
import { notFound } from "next/navigation";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { AulaProps } from "@/components/aulas/shared";
import { useSetPageTitle } from "@/contexts/UIContext";
import { HeaderStateProvider } from "@/contexts/HeaderStateContext";
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

const AulaReadingStrategies = dynamic<AulaProps>(
  () => import("@/components/aulas/ingles/AulaReadingStrategies"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaVerbTenses = dynamic<AulaProps>(
  () => import("@/components/aulas/ingles/AulaVerbTenses"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaConnectors = dynamic<AulaProps>(
  () => import("@/components/aulas/ingles/AulaConnectors"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaVocabulary = dynamic<AulaProps>(
  () => import("@/components/aulas/ingles/AulaVocabulary"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaFalseCognates = dynamic<AulaProps>(
  () => import("@/components/aulas/ingles/AulaFalseCognates"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaTextComprehension = dynamic<AulaProps>(
  () => import("@/components/aulas/ingles/AulaTextComprehension"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const PetroLingoMain = dynamic(
  () => import("@/components/aulas/ingles/PetroLingoMain"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-screen bg-background" />,
  },
);

// ===== OPERAÇÃO - BLOCO I: FUNDAMENTOS =====
const AulaTermodinamica = dynamic<AulaProps>(
  () => import("@/components/aulas/operacao/AulaTermodinamica"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaMecanicaFluidos = dynamic<AulaProps>(
  () => import("@/components/aulas/operacao/AulaMecanicaFluidos"),
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

const AulaLei13303 = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaLei13303"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaRLCP = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaRLCP"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaAdministrativoTributario = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaAdministrativoTributario"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaContabilidadeBasica = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaContabilidadeBasica"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaDireitoTributario = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaDireitoTributario"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaAdministracaoTributaria = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaAdministracaoTributaria"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaAdministracaoGeralSuprimento = dynamic<AulaProps>(
  () =>
    import("@/components/aulas/administracao/AulaAdministracaoGeralSuprimento"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaGestaoQualidadeSuprimento = dynamic<AulaProps>(
  () =>
    import("@/components/aulas/administracao/AulaGestaoQualidadeSuprimento"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaLogisticaSuprimento = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaLogisticaSuprimento"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaComprasSuprimento = dynamic<AulaProps>(
  () => import("@/components/aulas/administracao/AulaComprasSuprimento"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaEngenhariaSoftware = dynamic<AulaProps>(
  () => import("@/components/aulas/ti/AulaEngenhariaSoftware"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

// ===== SEGURANÇA E NRs =====
const AulaNr10 = dynamic<AulaProps>(
  () => import("@/components/aulas/seguranca/AulaNr10"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaNr35 = dynamic<AulaProps>(
  () => import("@/components/aulas/seguranca/AulaNr35"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

// ===== MANUTENÇÃO INDUSTRIAL =====
const AulaMetrologia = dynamic<AulaProps>(
  () => import("@/components/aulas/manutencao/AulaMetrologia"),
  {
    ssr: false,
    loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
  },
);

const AulaDesenhoTecnico = dynamic<AulaProps>(
  () => import("@/components/aulas/manutencao/AulaDesenhoTecnico"),
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
  "especifica-bloco-ii-legislacao-tributos": {
    "lei-13303": {
      titulo: "Lei 13.303 - Empresa Estatal",
      secoes: [],
    },
    rlcp: {
      titulo: "RLCP - Regulamento de Licitações Petrobras",
      secoes: [],
    },
    "administrativo-tributario": {
      titulo: "Administrativo e Tributário",
      secoes: [],
    },
  },
};

export default function TopicoPage({ params }: PageProps) {
  const { materia: materiaId, topico: topicoId } = use(params);
  // Resolve Materia and Topic (including dynamic ones)
  const [materia, setMateria] = useState<MateriaConteudo | null>(null);
  const [topico, setTopico] = useState<Topico | null>(null);
  const [nextTopico, setNextTopico] = useState<Topico | undefined>(undefined);
  const [prevTopico, setPrevTopico] = useState<Topico | undefined>(undefined);
  const [isResolving, setIsResolving] = useState(true);

  useEffect(() => {
    let resolvedMateria = getMateriaById(materiaId);
    let resolvedTopico = getTopicoById(materiaId, topicoId);

    // Se é uma matéria específica, buscar nos programas de estudo das profissões
    if (!resolvedMateria && materiaId.startsWith("especifica-")) {
      for (const p of PROFISSOES) {
        const programa = getProgramaDeEstudos(p.id);
        const match = programa.find((m) => m.id === materiaId);
        if (match) {
          resolvedMateria = match;
          resolvedTopico = match.topicos.find((t) => t.id === topicoId);
          break;
        }
      }
    }

    if (resolvedMateria) {
      setMateria(resolvedMateria);
      setTopico(resolvedTopico || null);

      // Resolve Next/Prev for dynamic materia
      const currentIndex = resolvedMateria.topicos.findIndex(
        (t) => t.id === topicoId,
      );
      if (currentIndex !== -1) {
        setNextTopico(resolvedMateria.topicos[currentIndex + 1]);
        setPrevTopico(resolvedMateria.topicos[currentIndex - 1]);
      } else {
        // Fallback for non-dynamic lessons
        setNextTopico(getNextTopico(materiaId, topicoId));
        setPrevTopico(getPrevTopico(materiaId, topicoId));
      }
    }
    setIsResolving(false);
  }, [materiaId, topicoId]);

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

  if (isResolving) {
    return <div className="animate-pulse h-screen bg-background" />;
  }

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
    <HeaderStateProvider>
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
            ) : materiaId === "matematica" &&
              topicoId === "matrizes-determinantes" ? (
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
            ) : materiaId === "matematica" &&
              topicoId === "analise-combinatoria" ? (
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
            ) : materiaId === "matematica" &&
              topicoId === "geometria-espacial" ? (
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
            ) : materiaId === "matematica" &&
              topicoId === "geometria-analitica" ? (
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
            ) : materiaId === "matematica" &&
              topicoId === "matematica-financeira" ? (
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
            ) : materiaId === "matematica" &&
              topicoId === "sistemas-lineares" ? (
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
            ) : materiaId === "ingles" && topicoId === "petrolingo" ? (
              <PetroLingoMain />
            ) : materiaId === "especifica-bloco-i-fundamentos" &&
              topicoId === "termodinamica" ? (
              <AulaTermodinamica
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
            ) : materiaId === "ingles" && topicoId === "reading-strategies" ? (
              <AulaReadingStrategies
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
            ) : materiaId === "ingles" && topicoId === "verb-tenses" ? (
              <AulaVerbTenses
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
            ) : materiaId === "ingles" && topicoId === "connectors" ? (
              <AulaConnectors
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
            ) : materiaId === "ingles" && topicoId === "vocabulary" ? (
              <AulaVocabulary
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
            ) : materiaId === "ingles" && topicoId === "false-cognates" ? (
              <AulaFalseCognates
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
            ) : materiaId === "ingles" && topicoId === "comprehension" ? (
              <AulaTextComprehension
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
            ) : materiaId === "especifica-bloco-i-gestao-estrategica" &&
              topicoId === "planejamento-estrategico" ? (
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
            ) : materiaId === "especifica-bloco-i-gestao-estrategica" &&
              topicoId === "gestao-de-processos" ? (
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
            ) : materiaId === "especifica-bloco-i-gestao-estrategica" &&
              topicoId === "gestao-de-projetos-pmbok" ? (
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
            ) : materiaId === "especifica-bloco-i-gestao-estrategica" &&
              topicoId === "governanca-corporativa" ? (
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
            ) : materiaId ===
                "especifica-bloco-ii-gestao-de-pessoas-e-marketing" &&
              topicoId === "gestao-pessoas" ? (
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
            ) : materiaId ===
                "especifica-bloco-ii-gestao-de-pessoas-e-marketing" &&
              topicoId === "gestao-recursos-humanos" ? (
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
            ) : materiaId ===
                "especifica-bloco-ii-gestao-de-pessoas-e-marketing" &&
              topicoId === "marketing-gerencial" ? (
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
            ) : materiaId === "especifica-bloco-ii-legislacao-tributos" &&
              topicoId === "lei-13303" ? (
              <AulaLei13303
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
            ) : materiaId === "especifica-bloco-ii-legislacao-tributos" &&
              topicoId === "rlcp" ? (
              <AulaRLCP
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
            ) : materiaId === "especifica-bloco-ii-legislacao-tributos" &&
              topicoId === "administrativo-tributario" ? (
              <AulaAdministrativoTributario
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
            ) : materiaId === "especifica-bloco-iii-tributos-suprimento" &&
              topicoId === "contabilidade-basica-suprimento" ? (
              <AulaContabilidadeBasica
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
            ) : materiaId === "especifica-bloco-iii-tributos-suprimento" &&
              topicoId === "direito-tributario-suprimento" ? (
              <AulaDireitoTributario
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
            ) : materiaId === "especifica-bloco-iii-tributos-suprimento" &&
              topicoId === "administracao-tributaria-suprimento" ? (
              <AulaAdministracaoTributaria
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
            ) : materiaId === "especifica-bloco-i-administracao-suprimento" &&
              topicoId === "administracao-geral-suprimento" ? (
              <AulaAdministracaoGeralSuprimento
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
            ) : materiaId === "especifica-bloco-i-administracao-suprimento" &&
              topicoId === "gestao-qualidade-suprimento" ? (
              <AulaGestaoQualidadeSuprimento
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
            ) : materiaId === "especifica-bloco-i-administracao-suprimento" &&
              topicoId === "logistica-suprimento" ? (
              <AulaLogisticaSuprimento
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
            ) : materiaId === "especifica-bloco-i-administracao-suprimento" &&
              topicoId === "compras-suprimento" ? (
              <AulaComprasSuprimento
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
            ) : materiaId === "especifica-bloco-i-desenvolvimento" ||
              materiaId === "especifica-bloco-ii-engenharia-de-software" ||
              materiaId === "especifica-bloco-iii-arquitetura-e-bd" ? (
              <AulaEngenhariaSoftware
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
            ) : materiaId === "especifica-bloco-i-redes-e-comunicacao" ||
              materiaId === "especifica-bloco-ii-sistemas-operacionais" ||
              materiaId === "especifica-bloco-iii-gestao-e-nuvem" ? (
              <AulaEngenhariaSoftware
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
            ) : materiaId === "especifica-bloco-i-fundamentos" &&
              topicoId === "mecanica-fluidos" ? (
              <AulaMecanicaFluidos
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
            ) : materiaId === "nrs" && topicoId === "nr10" ? (
              <AulaNr10
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
            ) : materiaId === "nrs" && topicoId === "nr35" ? (
              <AulaNr35
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
            ) : materiaId === "manutencao" && topicoId === "metrologia" ? (
              <AulaMetrologia
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
            ) : materiaId === "manutencao" && topicoId === "desenho-tecnico" ? (
              <AulaDesenhoTecnico
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
              <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="relative overflow-hidden bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-16 text-center group">
                  {/* Decorative background glow */}
                  <div
                    className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${materia.cor} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-700`}
                  />
                  <div
                    className={`absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-br ${materia.cor} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-700`}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${materia.cor} text-5xl mb-8 shadow-2xl shadow-primary/20 animate-bounce-subtle`}
                    >
                      {materia.icone}
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 uppercase tracking-tight">
                      {topico.titulo}
                    </h2>

                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent mb-8" />

                    <h3 className="text-xl md:text-2xl font-bold text-yellow-500 mb-6 flex items-center gap-3">
                      <span className="animate-pulse">🚧</span> Conteúdo em
                      Preparação Especial
                    </h3>

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-12">
                      O conteúdo desta aula está sendo finalizado pela nossa
                      equipe pedagógica para garantir a melhor experiência de
                      aprendizado focada no edital da{" "}
                      <span className="text-foreground font-bold italic">
                        Petrobras
                      </span>
                      . Em breve, vídeos, resumos e questões estarão disponíveis
                      aqui.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                      <Link
                        href={`/aulas/${materiaId}`}
                        className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-bold transition-all flex items-center gap-2 group/btn"
                      >
                        <span className="group-hover/btn:-translate-x-1 transition-transform">
                          ←
                        </span>
                        Voltar para a ementa
                      </Link>
                      <button
                        disabled
                        className="px-8 py-4 rounded-2xl bg-slate-800 text-slate-500 border border-slate-700 font-bold opacity-50 cursor-not-allowed"
                      >
                        Material em breve
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sugestão de matérias básicas */}
                <div className="mt-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Enquanto isso, que tal revisar os conhecimentos básicos?
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <Link
                      href="/aulas/portugues"
                      className="text-sm font-bold text-blue-400 hover:text-blue-300 transition underline underline-offset-4"
                    >
                      Português
                    </Link>
                    <Link
                      href="/aulas/matematica"
                      className="text-sm font-bold text-purple-400 hover:text-purple-300 transition underline underline-offset-4"
                    >
                      Matemática
                    </Link>
                  </div>
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
              "lei-13303",
              "rlcp",
              "administrativo-tributario",
              "reading-strategies",
              "administracao-geral-suprimento",
              "gestao-qualidade-suprimento",
              "logistica-suprimento",
              "compras-suprimento",
            ].includes(topicoId) && (
              <div className="max-w-7xl mx-auto px-6 pb-32">
                <div className="mt-12 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border border-yellow-500/30 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {isCompleted
                      ? "✅ Aula Concluída!"
                      : "📖 Termine a leitura"}
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
    </HeaderStateProvider>
  );
}
