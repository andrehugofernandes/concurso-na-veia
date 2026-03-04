"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  QuizQuestion,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  LessonTabs,
  ModuleSummaryCarouselNew,
  MusicPlayerCard,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import { LuBookOpen, LuMusic } from "react-icons/lu";
import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_OPERACOES,
  QUIZ_M3_NUMERICOS,
  QUIZ_M4_VENN,
  QUIZ_M5_FINAL,
} from "./data/conjuntos-quizzes";

// Quizzes agora importados de ./data/conjuntos-quizzes.ts
// (35 questões premium estilo CESGRANRIO)

const _QUIZ_POOLS_IMPORTED = [
  {
    id: 101,
    pergunta: "Em Matemática, um 'conjunto' é fundamentalmente definido como:",
    opcoes: [
      { label: "A", valor: "Uma operação algébrica entre variáveis." },
      { label: "B", valor: "Um número específico na reta real." },
      { label: "C", valor: "Uma coleção de elementos bem definidos." },
      { label: "D", valor: "Uma função de primeiro grau." },
      { label: "E", valor: "Uma equação sem solução." },
    ],
    correta: "C",
    explicacao:
      "Um conjunto é uma coleção de elementos. Pense como um grupo de profissionais da Petrobras (ex: conjunto de operadores).",
  },
  {
    id: 102,
    pergunta:
      "Se A = {2, 4, 6, 8}, qual afirmação é VERDADEIRA sobre pertinência?",
    opcoes: [
      { label: "A", valor: "2 ⊂ A" },
      { label: "B", valor: "4 ∈ A" },
      { label: "C", valor: "{6} ∈ A" },
      { label: "D", valor: "8 ∉ A" },
      { label: "E", valor: "10 ∈ A" },
    ],
    correta: "B",
    explicacao:
      "O símbolo ∈ (pertence) relaciona um ELEMENTO a um CONJUNTO. Como 4 está no conjunto A, dizemos que 4 ∈ A. O item A usa ⊂, que é para subconjuntos.",
  },
  {
    id: 103,
    pergunta:
      "O conjunto A das vogais da palavra 'PETROBRAS' é descrito por extensão como:",
    opcoes: [
      { label: "A", valor: "{P, T, R, B, S}" },
      { label: "B", valor: "{E, O, A}" },
      { label: "C", valor: "{E, O, A, A}" },
      { label: "D", valor: "{P, E, T, R, O, B, A, S}" },
      { label: "E", valor: "{E, T, O, A}" },
    ],
    correta: "B",
    explicacao:
      "Vogais presentes: E, O, A. Em conjuntos, não repetimos os elementos na notação por extensão.",
  },
  {
    id: 104,
    pergunta:
      "Seja P o conjunto de plataformas de petróleo do campo de Búzios. Se a plataforma P-74 pertence a este campo, a notação correta é:",
    opcoes: [
      { label: "A", valor: "P-74 ⊂ P" },
      { label: "B", valor: "P-74 = P" },
      { label: "C", valor: "P-74 ∈ P" },
      { label: "D", valor: "P ⊂ P-74" },
      { label: "E", valor: "P = {P-74}" },
    ],
    correta: "C",
    explicacao:
      "A relação entre um elemento (a plataforma P-74) e o conjunto que o contém (P) é de pertinência (∈).",
  },
  {
    id: 105,
    pergunta:
      "Dado o conjunto A = {x | x é um mês do ano com 32 dias}, classifique este conjunto.",
    opcoes: [
      { label: "A", valor: "Unitário" },
      { label: "B", valor: "Infinito" },
      { label: "C", valor: "Vazio" },
      { label: "D", valor: "Universal" },
      { label: "E", valor: "Finito com 12 elementos" },
    ],
    correta: "C",
    explicacao:
      "Nenhum mês possui 32 dias, logo é um conjunto sem elementos (Vazio, denotado por ∅).",
  },
  {
    id: 106,
    pergunta:
      "Se B é o conjunto de todos os subconjuntos de A = {x, y, z}, qual a quantidade de elementos de B?",
    opcoes: [
      { label: "A", valor: "3" },
      { label: "B", valor: "6" },
      { label: "C", valor: "8" },
      { label: "D", valor: "9" },
      { label: "E", valor: "12" },
    ],
    correta: "C",
    explicacao:
      "B é o conjunto das partes de A. A fórmula é 2^n. Como n = 3, 2³ = 8 subconjuntos.",
  },
];

const QUIZ_OPERACOES_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "A operação que une dois conjuntos formando um novo conjunto com todos os elementos de ambos, sem repetições, é a:",
    opcoes: [
      { label: "A", valor: "Interseção (∩)" },
      { label: "B", valor: "União (∪)" },
      { label: "C", valor: "Diferença (-)" },
      { label: "D", valor: "Complementar (C)" },
      { label: "E", valor: "Pertinência (∈)" },
    ],
    correta: "B",
    explicacao:
      "A União (A ∪ B) consiste em somar todos os elementos distintos de A e de B.",
  },
  {
    id: 202,
    pergunta:
      "Uma equipe T tem técnicos A = {1, 3, 5} e engenheiros B = {2, 3, 4, 5}. Qual é o conjunto dos funcionários que são tanto técnicos quanto engenheiros?",
    opcoes: [
      { label: "A", valor: "{1, 2, 3, 4, 5}" },
      { label: "B", valor: "{1, 4}" },
      { label: "C", valor: "{3, 5}" },
      { label: "D", valor: "∅" },
      { label: "E", valor: "{1, 2, 4}" },
    ],
    correta: "C",
    explicacao:
      "Queremos a Interseção (A ∩ B), ou seja, quem está nos dois grupos. Os números 3 e 5 aparecem em ambos.",
  },
  {
    id: 203,
    pergunta:
      "Seja X = {a, b, c, d} e Y = {c, d, e, f}. Qual é a diferença X - Y?",
    opcoes: [
      { label: "A", valor: "{a, b}" },
      { label: "B", valor: "{e, f}" },
      { label: "C", valor: "{c, d}" },
      { label: "D", valor: "{a, b, c, d, e, f}" },
      { label: "E", valor: "∅" },
    ],
    correta: "A",
    explicacao:
      "X - Y significa 'o que tem em X que NÃO tem em Y'. Os elementos 'c' e 'd' estão em Y, sobram apenas 'a' e 'b'.",
  },
  {
    id: 204,
    pergunta:
      "Em um setor de manutenção, M é o conjunto de ferramentas elétricas e N é o conjunto de furadeiras. Sabemos que N ⊂ M. Logo, a interseção M ∩ N é:",
    opcoes: [
      { label: "A", valor: "M" },
      { label: "B", valor: "N" },
      { label: "C", valor: "∅" },
      { label: "D", valor: "M - N" },
      { label: "E", valor: "M ∪ N" },
    ],
    correta: "B",
    explicacao:
      "Se N está totalmente dentro de M (N é subconjunto de M), a interseção entre eles será o próprio conjunto menor, que é N.",
  },
  {
    id: 205,
    pergunta:
      "Pelas Leis de De Morgan, o complementar da interseção de dois conjuntos (A ∩ B)ᶜ é igual a:",
    opcoes: [
      { label: "A", valor: "Aᶜ ∩ Bᶜ" },
      { label: "B", valor: "Aᶜ ∪ Bᶜ" },
      { label: "C", valor: "A ∪ B" },
      { label: "D", valor: "A - B" },
      { label: "E", valor: "∅" },
    ],
    correta: "B",
    explicacao:
      "Pela Lei de De Morgan, o complementar 'distribui' mudando o sinal de interseção para união: (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ.",
  },
  {
    id: 206,
    pergunta:
      "Numa bateria de testes, os testes de válvulas são o conjunto V e de dutos são D. Se V e D são conjuntos DISJUNTOS, então V ∩ D é igual a:",
    opcoes: [
      { label: "A", valor: "V ∪ D" },
      { label: "B", valor: "V" },
      { label: "C", valor: "D" },
      { label: "D", valor: "∅" },
      { label: "E", valor: "1" },
    ],
    correta: "D",
    explicacao:
      "Conjuntos disjuntos não possuem nenhum elemento em comum. Logo, a interseção é o conjunto vazio (∅).",
  },
];

const QUIZ_VENN_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "Em uma base operacional da Petrobras, há 50 funcionários. 30 possuem curso de NR-10 e 25 possuem NR-13. Se todos possuem pelo menos um dos cursos, quantos possuem ambos?",
    opcoes: [
      { label: "A", valor: "5" },
      { label: "B", valor: "10" },
      { label: "C", valor: "15" },
      { label: "D", valor: "20" },
      { label: "E", valor: "25" },
    ],
    correta: "A",
    explicacao:
      "Fórmula: n(A∪B) = n(A) + n(B) - n(A∩B) -> 50 = 30 + 25 - Interseção. 50 = 55 - Interseção -> Interseção = 5.",
  },
  {
    id: 302,
    pergunta:
      "Num grupo de 100 candidatos a operador, 60 falam inglês e 40 falam espanhol. Se 15 falam ambos os idiomas, quantos NÃO falam nenhum dos dois?",
    opcoes: [
      { label: "A", valor: "10" },
      { label: "B", valor: "15" },
      { label: "C", valor: "20" },
      { label: "D", valor: "25" },
      { label: "E", valor: "85" },
    ],
    correta: "B",
    explicacao:
      "Total que falam algo: 60 + 40 - 15 = 85. Como são 100 candidatos, 100 - 85 = 15 não falam nenhum.",
  },
  {
    id: 303,
    pergunta:
      "Em um diagrama de Venn com três conjuntos A, B e C, para calcular o número total de elementos n(A∪B∪C), qual termo deve ser SOMADA ao final no Princípio da Inclusão-Exclusão?",
    opcoes: [
      { label: "A", valor: "n(A ∩ B)" },
      { label: "B", valor: "n(B ∩ C)" },
      { label: "C", valor: "n(A ∩ B ∩ C)" },
      { label: "D", valor: "n(A ∪ B ∪ C)" },
      { label: "E", valor: "n(A) + n(B) + n(C)" },
    ],
    correta: "C",
    explicacao:
      "Ao subtrairmos as três interseções duplas, acabamos subtraindo a tripla interseção em excesso. Por isso, somamos n(A ∩ B ∩ C) no final.",
  },
  {
    id: 304,
    pergunta:
      "A área preenchida ao colorir apenas o círculo de A em um diagrama de Venn representando A e B indica:",
    opcoes: [
      { label: "A", valor: "A ∪ B" },
      { label: "B", valor: "A ∩ B" },
      { label: "C", valor: "A - B" },
      { label: "D", valor: "Os elementos do conjunto A" },
      { label: "E", valor: "B - A" },
    ],
    correta: "D",
    explicacao:
      "Se você colorir todo o círculo A, representa o próprio conjunto A, incluindo a parte que faz interseção com B.",
  },
  {
    id: 305,
    pergunta:
      "Para resolver um problema de Venn com interseções cruzadas de 3 conjuntos, qual região do diagrama deve ser preenchida primeiro?",
    opcoes: [
      {
        label: "A",
        valor: "O conjunto universo (os que não fazem parte de nenhum dos 3)",
      },
      { label: "B", valor: "As áreas exclusivas de cada conjunto" },
      { label: "C", valor: "As interseções entre 2 conjuntos apenas" },
      {
        label: "D",
        valor: "A interseção central (que pertence aos 3 conjuntos)",
      },
      { label: "E", valor: "Sempre o primeiro conjunto mencionado no texto" },
    ],
    correta: "D",
    explicacao:
      "A DICA DE OURO para Diagramas de Venn é resolver sempre 'de dentro para fora', começando pela interseção central (os 3 ao mesmo tempo) e subtraindo este valor das interseções duplas.",
  },
  {
    id: 306,
    pergunta:
      "Uma pesquisa na refinaria apontou: 70 leem o jornal A, 50 leem o B e 20 leem as revistas A e B. O total de entrevistados é 120. Quantos não leem NENHUM dos dois jornais?",
    opcoes: [
      { label: "A", valor: "0" },
      { label: "B", valor: "10" },
      { label: "C", valor: "20" },
      { label: "D", valor: "30" },
      { label: "E", valor: "40" },
    ],
    correta: "C",
    explicacao:
      "Total que lê: 70 + 50 - 20 (ambos) = 100. Se há 120 entrevistados: 120 - 100 = 20 pessoas não leem nenhum.",
  },
];

const QUIZ_NUMERICOS_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Qual das afirmações sobre a hierarquia dos conjuntos numéricos é CORRETA?",
    opcoes: [
      { label: "A", valor: "O conjunto dos Racionais contém os Irracionais." },
      { label: "B", valor: "Todo número Inteiro é também Natural." },
      {
        label: "C",
        valor: "Os números Reais englobam os Racionais e Irracionais.",
      },
      {
        label: "D",
        valor: "A interseção entre Racionais e Irracionais é {0}.",
      },
      { label: "E", valor: "Os Inteiros não contêm os Naturais." },
    ],
    correta: "C",
    explicacao:
      "R = Q ∪ I. Os números reais são formados pela união completa de Racionais com Irracionais. A interseção entre eles é vazia.",
  },
  {
    id: 402,
    pergunta: "O intervalo fechado [2, 5] contém quais números inteiros?",
    opcoes: [
      { label: "A", valor: "3 e 4" },
      { label: "B", valor: "2, 3, 4" },
      { label: "C", valor: "3, 4, 5" },
      { label: "D", valor: "2, 3, 4, 5" },
      { label: "E", valor: "Nenhum" },
    ],
    correta: "D",
    explicacao:
      "Por ser fechado (colchetes normais), os extremos 2 e 5 estão contidos. Portanto, inclui 2, 3, 4 e 5.",
  },
  {
    id: 403,
    pergunta:
      "Uma pressão de segurança P deve ser estritamente maior que 10 e menor ou igual a 20. O intervalo de P é representado por:",
    opcoes: [
      { label: "A", valor: "[10, 20]" },
      { label: "B", valor: "]10, 20]" },
      { label: "C", valor: "[10, 20[" },
      { label: "D", valor: "]10, 20[" },
      { label: "E", valor: "{10, 20}" },
    ],
    correta: "B",
    explicacao:
      "'Estritamente maior' (não inclui) = Colchete invertido ] ou parênteses. 'Menor ou igual' (inclui) = Colchete normal ].",
  },
  {
    id: 404,
    pergunta:
      "A fração 3/4 e a dízima 0,333... pertencem a qual conjunto numérico mais restrito da lista?",
    opcoes: [
      { label: "A", valor: "Naturais (ℕ)" },
      { label: "B", valor: "Inteiros (ℤ)" },
      { label: "C", valor: "Racionais (ℚ)" },
      { label: "D", valor: "Irracionais (𝕀)" },
      { label: "E", valor: "Imaginários (ℂ)" },
    ],
    correta: "C",
    explicacao:
      "Ambos podem ser representados por fração (3/4 e 1/3 respectivamente). Frações e decimais exatos ou periódicos pertencem aos Racionais.",
  },
  {
    id: 405,
    pergunta:
      "O número Pi (π), comumente usado em cálculos tubulares da Petrobras, é um exemplo clássico de:",
    opcoes: [
      { label: "A", valor: "Número Racional Periodico" },
      { label: "B", valor: "Número Irracional" },
      { label: "C", valor: "Número Natural" },
      { label: "D", valor: "Número Inteiro" },
      { label: "E", valor: "Nenhuma das anteriores" },
    ],
    correta: "B",
    explicacao:
      "Pi (3,14159...) possui infinitas casas decimais sem nenhum padrão de repetição (dízima não-periódica), o que o define como número Irracional.",
  },
  {
    id: 406,
    pergunta:
      "Se x > 5, a representação em notação de intervalo infinito seria:",
    opcoes: [
      { label: "A", valor: "[5, +∞[" },
      { label: "B", valor: "]5, +∞[" },
      { label: "C", valor: "]5, +∞]" },
      { label: "D", valor: "]-∞, 5]" },
      { label: "E", valor: "]-∞, 5[" },
    ],
    correta: "B",
    explicacao:
      "Como é > 5 (aberto em 5) até o infinito positivo. O infinito sempre leva intervalo aberto: ]5, +∞[.",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Em um concurso da CESGRANRIO para a Petrobras, sobre a teoria dos conjuntos, analise: I - Se A ⊂ B e B ⊂ C, então A ⊂ C. II - O vazio é elemento de qualquer conjunto. III - A união de um conjunto com seu complementar forma o universo. Estão CORRETAS:",
    opcoes: [
      { label: "A", valor: "Apenas I" },
      { label: "B", valor: "Apenas II e III" },
      { label: "C", valor: "Apenas I e III" },
      { label: "D", valor: "I, II e III" },
      { label: "E", valor: "Apenas III" },
    ],
    correta: "C",
    explicacao:
      "I é transitividade (correto). II é FALSO (o vazio é subconjunto de tudo, não necessariamente elemento). III é correto (A ∪ A' = U). Logo, I e III.",
  },
  {
    id: 502,
    pergunta:
      "Uma equipe de perfuração possui 12 analistas. O número total de subequipes diferentes que podem ser formadas (incluindo a subequipe vazia) é igual à cardinalidade das Partes do conjunto. Este valor é:",
    opcoes: [
      { label: "A", valor: "144" },
      { label: "B", valor: "512" },
      { label: "C", valor: "1024" },
      { label: "D", valor: "2048" },
      { label: "E", valor: "4096" },
    ],
    correta: "E",
    explicacao:
      "Conjunto Potência ou das Partes é 2^n. Se n = 12, temos 2^12 = 4096. Um clássico da CEF e Petrobras aplicado pela CESGRANRIO.",
  },
  {
    id: 503,
    pergunta:
      "A diferença entre (A ∪ B) e (A ∩ B) resulta na região chamada de 'diferença simétrica', que contém exatamente:",
    opcoes: [
      { label: "A", valor: "Elementos que não pertencem nem a A nem a B." },
      {
        label: "B",
        valor: "Elementos que pertencem a A ou a B, mas não a ambos.",
      },
      { label: "C", valor: "Apenas os elementos da interseção." },
      { label: "D", valor: "Diferença tradicional A - B combinada o vazio." },
      { label: "E", valor: "A união do universo com a interseção." },
    ],
    correta: "B",
    explicacao:
      "Se você pega a união toda e tira apenas a interseção central, sobram os exclusivos de A e os exclusivos de B (ou A ou B, mas não ambos).",
  },
  {
    id: 504,
    pergunta:
      "Dado U = {0, 1, 2, 3, ..., 10}, A = {pares} e B = {primos}, todos dentro de U. Qual dos elementos a seguir pertence a (A ∩ B)?",
    opcoes: [
      { label: "A", valor: "0" },
      { label: "B", valor: "1" },
      { label: "C", valor: "2" },
      { label: "D", valor: "3" },
      { label: "E", valor: "4" },
    ],
    correta: "C",
    explicacao:
      "Queremos os pares que são primos. O número 2 é o único par e primo ao mesmo tempo, pertencendo a A ∩ B.",
  },
  {
    id: 505,
    pergunta:
      "Em relação ao conjunto M = {∅, 1, 2, {1, 2}}, qual proposição é VERDADEIRA?",
    opcoes: [
      { label: "A", valor: "∅ ∉ M" },
      { label: "B", valor: "{1, 2} ⊂ M e {1, 2} ∈ M" },
      { label: "C", valor: "1 ⊂ M" },
      { label: "D", valor: "{1} ∈ M" },
      { label: "E", valor: "O conjunto M possui 5 elementos" },
    ],
    correta: "B",
    explicacao:
      "O conjunto {1,2} é um elemento de M (pertence a M). Ao mesmo tempo, como 1 e 2 são elementos individuais do próprio M, agrupá-los em {1, 2} forma um subconjunto (está contido em M). Esta pegadinha é comum na Cesgranrio.",
  },
  {
    id: 506,
    pergunta:
      "Em uma plataforma offshore, 85 operadores fizeram treinamento de EPI, 65 de combate a incêndio e 30 fizeram ambos. Quantos operadores no total realizaram pelo menos um dos treinamentos?",
    opcoes: [
      { label: "A", valor: "120" },
      { label: "B", valor: "150" },
      { label: "C", valor: "180" },
      { label: "D", valor: "110" },
      { label: "E", valor: "85" },
    ],
    correta: "A",
    explicacao:
      "n(EPI ∪ Fogo) = n(EPI) + n(Fogo) - interseção = 85 + 65 - 30 = 150 - 30 = 120 operadores. A união indica quem fez pelo menos um.",
  },
];

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaConjuntos({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const [quizFundamentos] = useState(() =>
    getRandomQuestions(QUIZ_M1_CONCEITOS, 6),
  );
  const [quizOperacoes] = useState(() =>
    getRandomQuestions(QUIZ_M2_OPERACOES, 6),
  );
  const [quizVenn] = useState(() => getRandomQuestions(QUIZ_M4_VENN, 6));
  const [quizNumericos] = useState(() =>
    getRandomQuestions(QUIZ_M3_NUMERICOS, 6),
  );
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 6));

  const isModuleUnlocked = (index: number) => {
    return true; // DESBLOQUEADO PARA REVISÃO DO USUÁRIO
  };

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = [
        "modulo-1",
        "modulo-2",
        "modulo-3",
        "modulo-4",
        "modulo-5",
      ].findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 5) * 100);
      onUpdateProgress?.(pct);
      if (idx < 4) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 5);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Operações" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Diagramas de Venn" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Conjuntos Numéricos" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Desafio Final" },
  ];

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══ MÓDULO 1: FUNDAMENTOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos de Conjuntos"
          descricao="Domine os conceitos fundamentais: notação, pertinência, subconjuntos e propriedades."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é um Conjunto?"
              description="A pedra fundamental da Matemática para concursos."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Definição e Notação"
              icone="📐"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Conceito",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Um <strong>conjunto</strong> é uma coleção de elementos
                        bem definidos. Na Petrobras, pense como{" "}
                        <strong>equipes</strong>: cada operador pertence (ou
                        não) a uma equipe específica.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                          <p className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                            Notação por Extensão
                          </p>
                          <p className="text-sm">A = {"{1, 2, 3, 4, 5}"}</p>
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">
                            Notação por Compreensão
                          </p>
                          <p className="text-sm">{"A = {x ∈ ℕ | x ≤ 5}"}</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Pertinência (∈ e ∉)",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        O símbolo <strong>∈</strong> indica que um elemento{" "}
                        <strong>pertence</strong> ao conjunto.{" "}
                        <strong>∉</strong> indica que{" "}
                        <strong>não pertence</strong>.
                      </p>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Imagine A = equipe de operadores de caldeira. Se João
                        opera caldeira: João ∈ A. Se Maria opera turbina: Maria
                        ∉ A.
                      </AlertBox>
                      <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        <p className="font-bold text-red-700 dark:text-red-400">
                          ⚠️ Pegadinha
                        </p>
                        <p className="text-sm mt-1">
                          ∈ é para ELEMENTOS. ⊂ é para CONJUNTOS. Nunca
                          confunda!
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <ContentAccordion
              titulo="Conjunto Vazio e Unitário"
              icone="∅"
              corIndicador="bg-cyan-500"
              slides={[
                {
                  titulo: "Conjunto Vazio",
                  icone: "🕳️",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        O conjunto vazio <strong>∅</strong> não possui NENHUM
                        elemento. É subconjunto de QUALQUER conjunto.
                      </p>
                      <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400">
                          🚨 Cuidado!
                        </p>
                        <p className="text-sm mt-1">
                          ∅ ≠ {"{0}"} (contém zero). ∅ ≠ {"{∅}"} (contém o vazio
                          como elemento).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Conjunto Unitário",
                  icone: "1️⃣",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        Conjunto com <strong>exatamente 1 elemento</strong>. Se
                        A = {"{5}"}, P(A) = {"{∅, {5}}"} → 2 subconjuntos.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Subconjuntos e Conjunto Potência"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Inclusão e Igualdade"
              icone="⊂"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Subconjuntos (⊂)",
                  icone: "📦",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        A ⊂ B: <strong>todo</strong> elemento de A também
                        pertence a B.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <p className="text-sm">
                            ✅ {"{1, 2}"} ⊂ {"{1, 2, 3}"}
                          </p>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                          <p className="text-sm">
                            ❌ {"{1, 4}"} ⊄ {"{1, 2, 3}"}
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="success" titulo="Dupla Inclusão">
                        Se A ⊂ B e B ⊂ A, então A = B.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Conjunto Potência P(A)",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-3">
                      <p>P(A) = conjunto de TODOS os subconjuntos de A.</p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-bold mb-2">Fórmula: n(P(A)) = 2ⁿ</p>
                        <p className="text-sm">
                          A tem 5 elementos? P(A) tem 2⁵ = 32 subconjuntos.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              variant="indigo"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Mapa Mental: Notações",
                          type: "Mapa Mental",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                        },
                        {
                          title: "Tabela: Símbolos",
                          type: "Tabela",
                          placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                        },
                        {
                          title: "Infográfico: Potência",
                          type: "Infográfico",
                          placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon: LuMusic,
                  content: (
                    <div className="w-full flex justify-center py-4">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="#"
                          titulo="Fundamentos de Conjuntos"
                          artista="Prof. André"
                          capaUrl="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
                          lyrics={`(Verso 1)\nConjunto é coleção, de elementos definidos.\nCom chaves eu represento, os objetos reunidos!\n\n(Refrão)\nPertence é o E cortado, subconjunto é o C virado.\nVazio é o zen: sem nada, mas em todos está incluído!`}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizFundamentos}
              titulo="Quiz - Fundamentos de Conjuntos"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: OPERAÇÕES ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Operações com Conjuntos"
          descricao="União, interseção, diferença e complementar: as 4 operações que a CESGRANRIO adora cobrar."
          gradiente="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="União (∪) e Interseção (∩)"
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="União (A ∪ B)"
              icone="🤝"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Conceito",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>união</strong> junta TODOS os elementos, sem
                        repetir.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                          Exemplo Petrobras
                        </p>
                        <p className="text-sm">
                          Turno A = {"{João, Maria, Pedro}"}, Turno B ={" "}
                          {"{Pedro, Ana}"}
                        </p>
                        <p className="text-sm mt-1">
                          A ∪ B = {"{João, Maria, Pedro, Ana}"}
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <ContentAccordion
              titulo="Interseção (A ∩ B)"
              icone="🎯"
              corIndicador="bg-teal-500"
              slides={[
                {
                  titulo: "Conceito",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>interseção</strong> contém apenas os elementos
                        em AMBOS.
                      </p>
                      <AlertBox tipo="warning" titulo="Conjuntos Disjuntos">
                        Quando A ∩ B = ∅, não têm nada em comum.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Diferença e Complementar"
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Diferença e Complementar"
              icone="➖"
              corIndicador="bg-green-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Diferença (A − B)",
                  icone: "✂️",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        A − B: elementos em A <strong>mas NÃO</strong> em B. NÃO
                        comutativa!
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Complementar e De Morgan",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-3">
                      <p>Aᶜ = U − A.</p>
                      <AlertBox tipo="success" titulo="Lei de De Morgan">
                        (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ e (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              variant="emerald"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "4 Operações",
                          type: "Diagrama",
                          placeholderColor:
                            "bg-emerald-100 dark:bg-emerald-900/30",
                        },
                        {
                          title: "De Morgan",
                          type: "Card",
                          placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizOperacoes}
              titulo="Quiz - Operações com Conjuntos"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: VENN ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Diagramas de Venn e Cardinalidade"
          descricao="A ferramenta visual mais poderosa para conjuntos. Domine a fórmula da cardinalidade."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Diagramas de Venn"
              description="Transforme problemas complexos em simples."
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Como Construir"
              icone="⭕"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Passo a Passo",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-3">
                      <ol className="space-y-2 list-decimal pl-5 text-sm">
                        <li>Desenhe círculos dentro do retângulo (universo)</li>
                        <li>
                          Comece pela <strong>interseção</strong>
                        </li>
                        <li>Preencha partes exclusivas</li>
                        <li>Calcule quem está FORA</li>
                      </ol>
                      <AlertBox tipo="info" titulo="Dica CESGRANRIO">
                        SEMPRE comece pela interseção!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Fórmula da Cardinalidade"
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmulas"
              icone="📊"
              corIndicador="bg-purple-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "2 Conjuntos",
                  icone: "2️⃣",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 text-center">
                        <p className="text-lg font-bold text-violet-700 dark:text-violet-400">
                          n(A ∪ B) = n(A) + n(B) − n(A ∩ B)
                        </p>
                      </div>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-bold mb-2">
                          Exemplo: 80 NR-10, 60 NR-13, 30 ambos. Total: 120.
                        </p>
                        <p className="text-sm">
                          Pelo menos uma: 110. Nenhuma: <strong>10</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "3 Conjuntos",
                  icone: "3️⃣",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-center">
                        <p className="text-sm font-bold text-purple-700 dark:text-purple-400">
                          n(A∪B∪C) =
                          n(A)+n(B)+n(C)−n(A∩B)−n(A∩C)−n(B∩C)+n(A∩B∩C)
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              variant="violet"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Venn: 2 Conjuntos",
                          type: "Diagrama",
                          placeholderColor:
                            "bg-violet-100 dark:bg-violet-900/30",
                        },
                        {
                          title: "Venn: 3 Conjuntos",
                          type: "Diagrama",
                          placeholderColor:
                            "bg-purple-100 dark:bg-purple-900/30",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizVenn}
              titulo="Quiz - Diagramas de Venn"
              icone="🧠"
              numero={3}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: NUMÉRICOS ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Conjuntos Numéricos e Intervalos"
          descricao="ℕ, ℤ, ℚ, 𝕀, ℝ — a hierarquia dos números e intervalos na reta real."
          gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Os 5 Conjuntos Numéricos"
              variant="amber"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "ℕ — Naturais",
                  descricao: "{0, 1, 2, 3, ...}. Contagem.",
                  icone: "🌱",
                },
                {
                  titulo: "ℤ — Inteiros",
                  descricao: "{..., -2, -1, 0, 1, 2, ...}.",
                  icone: "❄️",
                },
                {
                  titulo: "ℚ — Racionais",
                  descricao:
                    "Fração p/q (q≠0). Decimais exatos e dízimas periódicas.",
                  icone: "🔢",
                },
                {
                  titulo: "𝕀 — Irracionais",
                  descricao: "√2, π, e. Dízimas não-periódicas.",
                  icone: "♾️",
                },
                {
                  titulo: "ℝ — Reais",
                  descricao: "ℚ ∪ 𝕀. Toda a reta numérica.",
                  icone: "📏",
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="Hierarquia">
              ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ e 𝕀 ⊂ ℝ, com ℚ ∩ 𝕀 = ∅.
            </AlertBox>
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Intervalos na Reta Real"
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Tipos de Intervalos"
              icone="📏"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Aberto, Fechado e Misto",
                  icone: "🔓",
                  conteudo: (
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <p className="font-bold text-sm">[a, b] — Fechado</p>
                        <p className="text-xs">a ≤ x ≤ b</p>
                      </div>
                      <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <p className="font-bold text-sm">]a, b[ — Aberto</p>
                        <p className="text-xs">
                          a {"<"} x {"<"} b
                        </p>
                      </div>
                      <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <p className="font-bold text-sm">[a, b[ — Misto</p>
                        <p className="text-xs">a ≤ x {"<"} b</p>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="font-bold text-sm">]a, +∞)</p>
                        <p className="text-xs">x {">"} a</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              variant="amber"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Hierarquia Numérica",
                          type: "Diagrama",
                          placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                        },
                        {
                          title: "Intervalos",
                          type: "Tabela",
                          placeholderColor:
                            "bg-orange-100 dark:bg-orange-900/30",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizNumericos}
              titulo="Quiz - Conjuntos Numéricos"
              icone="🔥"
              numero={4}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: LABORATÓRIO ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Laboratório CESGRANRIO"
          descricao="Simulado final e certificado de conclusão. A vaga é sua!"
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm text-center">
            <ModuleSectionHeader
              index="🎯"
              title="Missão Cumprida?"
              variant="rose"
              className="mb-8"
            />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Toda a Teoria dos Conjuntos percorrida. Desafio final em contexto
              Petrobras.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 min-w-[150px]">
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-70">
                  Questões
                </p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 min-w-[150px]">
                <p className="text-3xl font-bold text-emerald-600">85%</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-70">
                  Meta Elite
                </p>
              </div>
            </div>
          </section>
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Resumo Final"
              variant="rose"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Mapa Completo",
                          type: "Mapa Mental",
                          placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                        },
                        {
                          title: "Fórmulas",
                          type: "Tabela",
                          placeholderColor: "bg-pink-100 dark:bg-pink-900/30",
                        },
                        {
                          title: "Pegadinhas",
                          type: "Card",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Simulado Final - Teoria dos Conjuntos"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  🎓
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  CERTIFICADO DE ELITE
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Parabéns! Teoria dos Conjuntos dominada. Diagramas de Venn e
                  cardinalidade na ponta dos dedos.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
