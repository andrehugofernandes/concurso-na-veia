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

// ── QUIZ POOLS (Matemática: Razão e Proporção) ──────────────────────────────

const QUIZ_CONCEITOS_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "Em uma planta de refinaria na escala 1:100, um duto que mede 5 cm no desenho terá quantos metros na realidade?",
    opcoes: [
      { label: "A", valor: "5 metros" },
      { label: "B", valor: "50 metros" },
      { label: "C", valor: "0,5 metro" },
      { label: "D", valor: "500 metros" },
      { label: "E", valor: "5000 metros" },
    ],
    correta: "A",
    explicacao:
      "Razão de escala 1:100 significa que 1 unidade no papel vale 100 na realidade. 5 cm × 100 = 500 cm = 5 metros.",
  },
  {
    id: 102,
    pergunta:
      "A razão entre a quantidade de óleo (O) e a quantidade de gás (G) produzidos em um poço é de 3 para 2 (3/2). Se foram produzidos 600 barris de óleo, qual a produção de gás em barris equivalentes?",
    opcoes: [
      { label: "A", valor: "200" },
      { label: "B", valor: "300" },
      { label: "C", valor: "400" },
      { label: "D", valor: "500" },
      { label: "E", valor: "900" },
    ],
    correta: "C",
    explicacao:
      "O/G = 3/2. Se O = 600, então 600/G = 3/2 -> 3G = 1200 -> G = 400.",
  },
  {
    id: 103,
    pergunta:
      "Em uma liga metálica usada em braços de carregamento, a proporção de cobre para zinco é de 7:3. Se temos 21 kg de cobre, quanto de zinco deve ser adicionado?",
    opcoes: [
      { label: "A", valor: "6 kg" },
      { label: "B", valor: "9 kg" },
      { label: "C", valor: "12 kg" },
      { label: "D", valor: "14 kg" },
      { label: "E", valor: "21 kg" },
    ],
    correta: "B",
    explicacao: "7/3 = 21/x -> 7x = 63 -> x = 9 kg.",
  },
  {
    id: 104,
    pergunta: "Qual a propriedade fundamental de uma proporção (a/b = c/d)?",
    opcoes: [
      {
        label: "A",
        valor: "A soma dos numeradores é igual à dos denominadores.",
      },
      {
        label: "B",
        valor: "O produto dos meios é igual ao produto dos extremos (ad = bc).",
      },
      { label: "C", valor: "Todas as razões devem ser iguais a 1." },
      { label: "D", valor: "O numerador é sempre maior que o denominador." },
      { label: "E", valor: "Não há relação fixa entre os termos." },
    ],
    correta: "B",
    explicacao: "Fundamental: a/b = c/d ↔ a × d = b × c.",
  },
  {
    id: 105,
    pergunta:
      "A densidade demográfica de uma região administrativa da Petrobras é a razão entre população e área. Se há 2000 funcionários em 40 km², qual a densidade em func/km²?",
    opcoes: [
      { label: "A", valor: "5" },
      { label: "B", valor: "50" },
      { label: "C", valor: "500" },
      { label: "D", valor: "20" },
      { label: "E", valor: "40" },
    ],
    correta: "B",
    explicacao: "Densidade = 2000 / 40 = 50 funcionários por km².",
  },
  {
    id: 106,
    pergunta: "Se x/5 = 8/10, qual o valor de x?",
    opcoes: [
      { label: "A", valor: "3" },
      { label: "B", valor: "4" },
      { label: "C", valor: "5" },
      { label: "D", valor: "8" },
      { label: "E", valor: "10" },
    ],
    correta: "B",
    explicacao: "10x = 40 -> x = 4.",
  },
];

const QUIZ_GRANDEZAS_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "Se dobrarmos a velocidade de um navio petroleiro, o tempo de viagem entre dois portos cairá pela metade. Essas grandezas são:",
    opcoes: [
      { label: "A", valor: "Diretamente Proporcionais" },
      { label: "B", valor: "Inversamente Proporcionais" },
      { label: "C", valor: "Não Proporcionais" },
      { label: "D", valor: "Logarítmicas" },
      { label: "E", valor: "Exponenciais" },
    ],
    correta: "B",
    explicacao:
      "Velocidade e Tempo são inversamente proporcionais: quanto maior a velocidade, menor o tempo.",
  },
  {
    id: 202,
    pergunta:
      "A quantidade de tinta necessária para pintar um tanque é proporcional à sua área de superfície. Essas grandezas são:",
    opcoes: [
      { label: "A", valor: "Diretamente Proporcionais" },
      { label: "B", valor: "Inversamente Proporcionais" },
      { label: "C", valor: "Disjuntas" },
      { label: "D", valor: "De sinal oposto" },
      { label: "E", valor: "Invariantes" },
    ],
    correta: "A",
    explicacao:
      "Quanto MAIOR a área, MAIOR a quantidade de tinta. Comportamento direto.",
  },
  {
    id: 203,
    pergunta:
      "Divida o número 100 em partes diretamente proporcionais a 2 e 3. Quais são os números?",
    opcoes: [
      { label: "A", valor: "20 e 80" },
      { label: "B", valor: "50 e 50" },
      { label: "C", valor: "40 e 60" },
      { label: "D", valor: "30 e 70" },
      { label: "E", valor: "10 e 90" },
    ],
    correta: "C",
    explicacao:
      "2k + 3k = 100 -> 5k = 100 -> k = 20. Assim: 2(20)=40 e 3(20)=60.",
  },
  {
    id: 204,
    pergunta:
      "Um bônus de R$ 3000 será dividido entre dois técnicos de manutenção inversamente proporcional às faltas de cada um. O técnico A teve 2 faltas e o B teve 3 faltas. Qual o valor para o técnico A?",
    opcoes: [
      { label: "A", valor: "R$ 1500" },
      { label: "B", valor: "R$ 1200" },
      { label: "C", valor: "R$ 1800" },
      { label: "D", valor: "R$ 1000" },
      { label: "E", valor: "R$ 2000" },
    ],
    correta: "C",
    explicacao:
      "Constante k: k/2 + k/3 = 3000 -> 5k/6 = 3000 -> 5k = 18000 -> k = 3600. A recebe 3600/2 = 1800.",
  },
  {
    id: 205,
    pergunta:
      "O consumo de combustível de uma frota de caminhões em relação à distância percorrida (mantendo carga constante) é uma grandeza:",
    opcoes: [
      { label: "A", valor: "Inversamente proporcional" },
      { label: "B", valor: "Diretamente proporcional" },
      { label: "C", valor: "Não existe relação" },
      { label: "D", valor: "Independente" },
      { label: "E", valor: "Constante" },
    ],
    correta: "B",
    explicacao: "Mais distância exige mais combustível.",
  },
];

const QUIZ_REGRA3S_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "Se 5 máquinas produzem 200 peças por hora, quantas peças produzirão 8 máquinas similares?",
    opcoes: [
      { label: "A", valor: "300" },
      { label: "B", valor: "320" },
      { label: "C", valor: "350" },
      { label: "D", valor: "400" },
      { label: "E", valor: "420" },
    ],
    correta: "B",
    explicacao: "5/200 = 8/x -> 5x = 1600 -> x = 320. Grandezas diretas.",
  },
  {
    id: 302,
    pergunta:
      "Uma equipe de 12 operários realiza a manutenção de um duto em 6 dias. Para fazer o mesmo serviço em 4 dias, quantos operários seriam necessários (considerando o mesmo ritmo)?",
    opcoes: [
      { label: "A", valor: "8" },
      { label: "B", valor: "16" },
      { label: "C", valor: "18" },
      { label: "D", valor: "20" },
      { label: "E", valor: "24" },
    ],
    correta: "C",
    explicacao:
      "Operários e Dias são INVERSOS. 12 operários --- 6 dias | x operários --- 4 dias. 12 × 6 = 4x -> 72 = 4x -> x = 18.",
  },
  {
    id: 303,
    pergunta:
      "Com 40 litros de combustível, um veículo de inspeção percorre 480 km. Quantos litros consumirá para percorrer 600 km?",
    opcoes: [
      { label: "A", valor: "45" },
      { label: "B", valor: "50" },
      { label: "C", valor: "55" },
      { label: "D", valor: "60" },
      { label: "E", valor: "65" },
    ],
    correta: "B",
    explicacao: "40/480 = x/600 -> 480x = 24000 -> x = 2400/48 = 50 litros.",
  },
  {
    id: 304,
    pergunta:
      "Uma bomba d'água enche um reservatório de 5.000 litros em 2 horas. Se usarmos duas bombas idênticas, o tempo para encher o mesmo reservatório será de:",
    opcoes: [
      { label: "A", valor: "1 hora" },
      { label: "B", valor: "4 horas" },
      { label: "C", valor: "30 minutos" },
      { label: "D", valor: "1 hora e 30 minutos" },
      { label: "E", valor: "15 minutos" },
    ],
    correta: "A",
    explicacao:
      "Dobrou a capacidade de vazão (bombas), o tempo cai pela metade. 2h / 2 = 1h.",
  },
  {
    id: 305,
    pergunta:
      "Na dosagem de um anticorrosivo, usa-se 300ml para cada 1500 litros de petróleo. Para tratar 10.000 litros, qual a dosagem necessária?",
    opcoes: [
      { label: "A", valor: "1,5 L" },
      { label: "B", valor: "2,0 L" },
      { label: "C", valor: "2,5 L" },
      { label: "D", valor: "3,0 L" },
      { label: "E", valor: "5,0 L" },
    ],
    correta: "B",
    explicacao:
      "300 / 1500 = x / 10000 -> 1/5 = x / 10000 -> 5x = 10000 -> x = 2000 ml = 2 Litros.",
  },
];

const QUIZ_REGRA3C_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Em uma fábrica, 10 operários trabalhando 8 horas por dia produzem 2000 unidades em 5 dias. Quantas unidades 12 operários produzirão em 10 dias, trabalhando 6 horas por dia?",
    opcoes: [
      { label: "A", valor: "3000" },
      { label: "B", valor: "3600" },
      { label: "C", valor: "4000" },
      { label: "D", valor: "4200" },
      { label: "E", valor: "4800" },
    ],
    correta: "B",
    explicacao:
      "Unidades(x) / Base(2000) = (12/10) × (10/5) × (6/8) -> x/2000 = 1,2 × 2 × 0,75 = 1,8 -> x = 3600.",
  },
  {
    id: 402,
    pergunta:
      "Se 6 impressoras imprimem 3000 panfletos em 40 minutos, em quanto tempo 4 impressoras imprimiriam 2000 panfletos?",
    opcoes: [
      { label: "A", valor: "20 min" },
      { label: "B", valor: "30 min" },
      { label: "C", valor: "40 min" },
      { label: "D", valor: "50 min" },
      { label: "E", valor: "60 min" },
    ],
    correta: "C",
    explicacao:
      "Tempo(x)/40 = (2000/3000) [Direta] × (6/4) [Inversa] = (2/3) × (3/2) = 1. Logo x = 40 min.",
  },
  {
    id: 403,
    pergunta:
      "8 digitadores preparam um edital em 5 dias de 6 horas. Quantos dias de 4 horas seriam necessários para 12 digitadores prepararem o mesmo edital?",
    opcoes: [
      { label: "A", valor: "3 dias" },
      { label: "B", valor: "4 dias" },
      { label: "C", valor: "5 dias" },
      { label: "D", valor: "6 dias" },
      { label: "E", valor: "8 dias" },
    ],
    correta: "C",
    explicacao:
      "Dias(x)/5 = (8/12) [Inversa] × (6/4) [Inversa] = (2/3) × (1,5) = 1. Logo x = 5 dias.",
  },
  {
    id: 404,
    pergunta:
      "Na regra de três composta, quando analisamos a relação das variáveis com a incógnita, se a incógnita 'Dias de Trabalho' aumenta conforme 'Volume de Serviço' aumenta, dizemos que a relação entre elas é:",
    opcoes: [
      { label: "A", valor: "Direta" },
      { label: "B", valor: "Inversa" },
      { label: "C", valor: "Nula" },
      { label: "D", valor: "Transposta" },
      { label: "E", valor: "Côncava" },
    ],
    correta: "A",
    explicacao: "Se as duas aumentam juntas, a relação é direta.",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Uma bomba de extração recalca 1.200 m³ de petróleo em 4 horas. Se houver uma falha e a vazão cair para 2/3 da original, quanto tempo levará para recalcar os mesmos 1.200 m³?",
    opcoes: [
      { label: "A", valor: "5 horas" },
      { label: "B", valor: "6 horas" },
      { label: "C", valor: "7 horas" },
      { label: "D", valor: "8 horas" },
      { label: "E", valor: "10 horas" },
    ],
    correta: "B",
    explicacao:
      "Vazão e Tempo são inversos. v --- 4h | (2/3)v --- xh. v*4 = (2/3)v*x -> 4 = 2x/3 -> 12 = 2x -> x = 6.",
  },
  {
    id: 502,
    pergunta:
      "Três reservatórios idênticos levam 15 horas para serem preenchidos por 5 torneiras de mesma vazão. Para preencher 5 reservatórios idênticos em 10 horas, seriam necessárias quantas torneiras similares?",
    opcoes: [
      { label: "A", valor: "10 torneiras" },
      { label: "B", valor: "12 torneiras" },
      { label: "C", valor: "13 torneiras" },
      { label: "D", valor: "15 torneiras" },
      { label: "E", valor: "18 torneiras" },
    ],
    correta: "C",
    explicacao:
      "Torneiras(x)/5 = (5/3)[Reserv - Dir] × (15/10)[Tempo - Inv] = 1,66.. × 1,5 = 2,5. x = 5 * 2,5 = 12,5 -> Arredondando p/ cima p/ suprir: 13 torneiras.",
  },
  {
    id: 503,
    pergunta:
      "Em um mapa logístico, 4cm representam 200km. Qual a distância real entre duas bases que no mapa distam 7,5cm?",
    opcoes: [
      { label: "A", valor: "325 km" },
      { label: "B", valor: "350 km" },
      { label: "C", valor: "375 km" },
      { label: "D", valor: "400 km" },
      { label: "E", valor: "450 km" },
    ],
    correta: "C",
    explicacao: "4 / 200 = 7,5 / x -> 4x = 1500 -> x = 375.",
  },
  {
    id: 504,
    pergunta:
      "A proporção entre oxigênio e acetileno para uma solda específica é 1,1:1 (Razão O/A). Se o cilindro de acetileno forneceu 50 litros, quantos litros de oxigênio foram consumidos?",
    opcoes: [
      { label: "A", valor: "45 litros" },
      { label: "B", valor: "50 litros" },
      { label: "C", valor: "55 litros" },
      { label: "D", valor: "60 litros" },
      { label: "E", valor: "110 litros" },
    ],
    correta: "C",
    explicacao: "O / 50 = 1,1 / 1 -> O = 50 × 1,1 = 55.",
  },
];

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaRazaoProporcao({
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

  const [quizConceitos] = useState(() =>
    getRandomQuestions(QUIZ_CONCEITOS_POOL, 6),
  );
  const [quizGrandezas] = useState(() =>
    getRandomQuestions(QUIZ_GRANDEZAS_POOL, 5),
  );
  const [quizRegra3S] = useState(() =>
    getRandomQuestions(QUIZ_REGRA3S_POOL, 5),
  );
  const [quizRegra3C] = useState(() =>
    getRandomQuestions(QUIZ_REGRA3C_POOL, 4),
  );
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_FINAL_POOL, 4));

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
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos de Razão" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Grandezas e Escalas" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Regra de Três Simples" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Regra de Três Composta" },
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
      {/* ═══ MÓDULO 1: CONCEITOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Conceitos de Razão e Proporção"
          descricao="A base para entender escalas, misturas e produtividade operacional."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é Razão?"
              description="Simplificando comparações entre duas grandezas."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Definição e Aplicações"
              icone="⚖️"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Conceito",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Uma <strong>razão</strong> é a comparação entre dois
                        números através de uma divisão. Representamos como{" "}
                        <em>a/b</em> ou <em>a:b</em>.
                      </p>
                      <AlertBox tipo="info" titulo="Uso prático">
                        Na Petrobras, razões são usadas para densidade de
                        fluidos, escalas de plantas industriais e proporção de
                        componentes em misturas químicas.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceitos}
              titulo="Quiz - Conceitos de Razão"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: GRANDEZAS ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Grandezas e Proporcionalidade"
          descricao="Saiba quando uma variável ajuda ou atrapalha a outra."
          gradiente="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Direta vs Inversa"
              variant="emerald"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Diretamente Proporcional",
                  descricao: "Se uma dobra, a outra dobra. Ex: Área e Tinta.",
                  icone: "📈",
                },
                {
                  titulo: "Inversamente Proporcional",
                  descricao:
                    "Se uma dobra, a outra cai pela metade. Ex: Velocidade e Tempo.",
                  icone: "📉",
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizGrandezas}
              titulo="Quiz - Grandezas e Escalas"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: REGRA DE 3 SIMPLES ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Regra de Três Simples"
          descricao="A ferramenta mais utilizada no dia a dia do técnico."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Matemática do Dia a Dia"
              variant="amber"
              className="mb-6"
            />
            <AlertBox tipo="warning" titulo="Dica de Ouro">
              Antes de multiplicar cruzado, verifique SEMPRE se as grandezas são
              diretas ou inversas. Se forem inversas, você deve inverter uma das
              razões!
            </AlertBox>
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizRegra3S}
              titulo="Quiz - Regra de Três Simples"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: REGRA DE 3 COMPOSTA ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Regra de Três Composta"
          descricao="Lidando com múltiplas variáveis simultaneamente."
          gradiente="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Resumo Visual"
              variant="violet"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Tabela de Variáveis",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Método das Flechas",
                          type: "Diagrama",
                          placeholderColor:
                            "bg-fuchsia-100 dark:bg-fuchsia-900/30",
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
              questoes={quizRegra3C}
              titulo="Quiz - Regra de Três Composta"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: DESAFIO FINAL ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final: Produtividade e Cálculo"
          descricao="Problemas mistos de concursos anteriores."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Razão e Proporção"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  🎓
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  CERTIFICADO DE CONCLUSAO
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Você dominou Razão e Proporção! Este é um dos temas mais
                  recorrentes na prova da Petrobras.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
