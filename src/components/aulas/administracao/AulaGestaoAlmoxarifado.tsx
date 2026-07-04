"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import { AulaProps, QuizQuestion ,
  QuestaoResolvidaStepByStep} from "../shared";
import {
  ModuleConsolidation,
  ContentAccordion,
  QuizInterativo,
  ModuleBanner,
  ModuleSectionHeader,
  AulaTemplate,
  AlertBox,
} from "../shared";
import { LuPackageSearch, LuWarehouse, LuBoxes, LuArrowRightLeft } from "react-icons/lu";
import { AlertTriangle } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

const QUIZ_ALMOXARIFADO: Record<string, { questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[] }> = {
  "modulo-1": {
    questions: [
      {
        id: 1,
        question: "Qual é a função primordial de um almoxarifado em uma organização moderna?",
        options: [
          "Servir apenas como um depósito improvisado de longo prazo para itens sem utilidade.",
          "Garantir que o material adequado esteja, em sua quantidade devida, no local correto e quando se fizer necessário.",
          "Atuar exclusivamente como um centro de devoluções de mercadorias defeituosas.",
          "Manter a maior quantidade possível de estoque para evitar qualquer risco de falta, independente do custo.",
        ],
        correct: 1,
        explanation: "O almoxarifado evoluiu de um simples depósito para o setor responsável por garantir que o material adequado esteja no local e momento certos, preservando a qualidade e evitando divergências ou desvios.",
      },
      {
        id: 2,
        question: "O recebimento de materiais dispõe de quatro etapas principais. Qual é a sequência correta?",
        options: [
          "Regularização, Entrada, Conferência qualitativa, Conferência quantitativa.",
          "Conferência qualitativa, Regularização, Entrada, Conferência quantitativa.",
          "Entrada de materiais, Conferência quantitativa, Conferência qualitativa, Regularização.",
          "Conferência quantitativa, Entrada de materiais, Regularização, Conferência qualitativa.",
        ],
        correct: 2,
        explanation: "O recebimento segue a sequência lógica: 1º Entrada dos materiais (recepção física); 2º Conferência quantitativa (contar volumes/unidades); 3º Conferência qualitativa (verificar se atende especificações/estado); 4º Regularização (dar entrada no sistema contábil/físico).",
      },
      {
        id: 3,
        question: "No contexto da administração de materiais, a atividade encarregada da guarda física, preservação, embalagem, recepção e expedição de insumos é de responsabilidade da(o):",
        options: [
          "Gestão Econômica de Estoques.",
          "Subsistema de Compras e Aquisições.",
          "Gestão Física de Estoques (Almoxarifado).",
          "Setor de Planejamento e Controle da Produção (PCP).",
        ],
        correct: 2,
        explanation: "A guarda física, preservação, movimentação interna e recebimento de materiais são atribuições operacionais do Almoxarifado (Gestão Física). O planejamento de níveis de estoque e ressuprimento cabem à Gestão Econômica.",
      },
      {
        id: 4,
        question: "O que caracteriza o estoque de proteção (ou isolador)?",
        options: [
          "Estoque mantido para evitar furtos na empresa.",
          "Estoque exclusivo de Equipamentos de Proteção Individual (EPIs).",
          "Estoque extra para garantir a disponibilidade diante de greves, alta de preços ou súbita elevação de demanda.",
          "Estoque de produtos com defeito aguardando devolução ao fornecedor.",
        ],
        correct: 2,
        explanation: "O estoque de proteção objetiva proteger as vendas e a produção contra situações desfavoráveis excepcionais do mercado (greves, atrasos críticos, disparada de preços).",
      },
      {
        id: 4,
        question: "A atividade de agrupar volumes menores em uma unidade maior de carga (como paletizar caixas para movimentação com empilhadeira) é denominada:",
        options: [
          "Inventarição de materiais.",
          "Unitização de carga.",
          "Fracionamento de lote.",
          "Cross-docking de prateleiras.",
        ],
        correct: 1,
        explanation: "A unitização (ou unitarização) é o agrupamento de volumes menores em uma unidade maior (ex: palete, container) para facilitar a movimentação mecânica, reduzir avarias e diminuir o custo de transporte por unidade.",
      },
    ],
  },
  "modulo-2": {
    questions: [
      {
        id: 1,
        question: "A curva ABC (Princípio de Pareto) é uma ferramenta clássica na gestão de estoques. O que caracteriza os itens da Classe A?",
        options: [
          "São a grande maioria dos itens do estoque (80%), mas representam baixo valor (20%).",
          "São itens de baixo giro que devem ser descartados.",
          "São a minoria dos itens (aproximadamente 20%), mas representam o maior impacto ou valor para a empresa (cerca de 80%).",
          "São itens de consumo diário, como material de escritório.",
        ],
        correct: 2,
        explanation: "Os itens de Classe A são aqueles de maior importância, valor ou criticidade. Eles correspondem a cerca de 20% da quantidade total de itens, mas representam cerca de 80% do valor ou impacto do estoque, exigindo controles rigorosos.",
      },
      {
        id: 2,
        question: "No Lote Econômico de Compras (LEC), o custo total mínimo de estocagem é obtido graficamente na intersecção onde:",
        options: [
          "o custo de armazenagem supera o custo de falta de material.",
          "o custo de emissão de pedidos iguala-se ao custo de carregar estoques (posse).",
          "o lote de compras atinge a capacidade máxima de carga útil do caminhão.",
          "o estoque de segurança é reduzido a zero pelo consumo.",
        ],
        correct: 1,
        explanation: "Matematicamente, o Lote Econômico de Compras (LEC) representa o equilíbrio perfeito que minimiza os custos totais. Graficamente, isso se dá no ponto onde o custo de pedir iguala-se ao custo de carregar estoques.",
      },
      {
        id: 3,
        question: "Por que a 'Contagem Cíclica' (inventário rotativo) é vantajosa em relação ao inventário geral anual?",
        options: [
          "Porque dispensa o uso de sistemas informatizados de controle.",
          "Porque gera menor interrupção nas operações do armazém, garantindo correção de erros de forma contínua ao longo do ano.",
          "Porque permite que o Fisco não aplique multas, mesmo se houver fraudes.",
          "Porque conta apenas a quantidade de dinheiro, ignorando as mercadorias.",
        ],
        correct: 1,
        explanation: "A contagem cíclica é feita periodicamente (diária, semanal) em parcelas do estoque. Isso evita a necessidade de paralisar toda a operação da empresa (como ocorre no inventário geral anual) e mantém a precisão do sistema continuamente ajustada.",
      },
      {
        id: 4,
        question: "Pelo critério contábil aplicável à classificação de materiais, um material é classificado como de CONSUMO se:",
        options: [
          "durar mais de 10 anos em uso ininterrupto.",
          "em uso normal ele perde ou tem reduzidas as suas condições de funcionamento num prazo máximo estabelecido (geralmente 2 anos).",
          "for adquirido exclusivamente para ser revendido sem alterações.",
          "não quebrar nem sofrer qualquer tipo de depreciação física.",
        ],
        correct: 1,
        explanation: "Material de consumo é aquele que, em razão de seu uso normal, perde sua identidade física ou tem sua utilização limitada a um curto período de tempo (geralmente fixado em 2 anos).",
      },
    ],
  },
};

function toQQ(
  quiz: { questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[] } | undefined,
): QuizQuestion[] {
  if (!quiz) return [];
  return quiz.questions.map((q) => ({
    id: q.id,
    pergunta: q.question,
    opcoes: q.options.map((o) => ({ label: o, valor: o })),
    correta: q.options[q.correct] ?? "",
    explicacao: q.explanation,
  }));
}

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Operações de Almoxarifado e Estoque" },
  { id: "modulo-2", label: "Módulo 2", title: "Controle, Tipos e Inventário" },
] as const;

export default function AulaGestaoAlmoxarifado(props: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_gestao_almoxarifado_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  const handleQuizComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      updateCompletedModules(Array.from(newSet));
      const progress = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      props.onUpdateProgress?.(progress);
      if (moduleId === "modulo-2") {
        props.onComplete?.();
      }
    }
  };

  const getModuleVariant = (num: number) => {
    const variants = ["cyan", "emerald", "amber", "rose", "blue"] as const;
    return variants[(num - 1) % variants.length];
  };

  const renderModulo1 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={1}
        titulo="Operações de Almoxarifado"
        descricao="Funções do almoxarifado, processo de recebimento e tipos de estoque."
        variant={getModuleVariant(1)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="O Coração da Cadeia de Suprimentos"
          description="Do antigo 'depósito' caótico ao moderno centro de inteligência logística."
          variant={getModuleVariant(1)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
          <p>
            O termo <strong>almoxarifado</strong> tem origem árabe e significava &quot;depositar&quot;. Historicamente, era o pior e mais inadequado local da empresa. Hoje, tornou-se o setor vital responsável pela gestão física, com a função de <strong>guardar, preservar, receber e expedir materiais</strong> de forma eficiente.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Etapas do Recebimento de Materiais</h3>
          <p>O recebimento não é apenas assinar um papel. É um processo sistêmico de quatro fases, essencial em editais da CESGRANRIO:</p>
          
          <div className="flex flex-col space-y-3 mt-4 relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-border z-0"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0 border-4 border-card">1</div>
              <div className="pt-3">
                <h4 className="font-bold text-foreground">Entrada de materiais</h4>
                <p className="text-muted-foreground text-base">Ato físico da recepção do material (descarga no pátio ou doca). É o <em>Recebimento Provisório</em>.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0 border-4 border-card">2</div>
              <div className="pt-3">
                <h4 className="font-bold text-foreground">Conferência Quantitativa</h4>
                <p className="text-muted-foreground text-base">Verificação da quantidade física contra o que consta na Nota Fiscal.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0 border-4 border-card">3</div>
              <div className="pt-3">
                <h4 className="font-bold text-foreground">Conferência Qualitativa</h4>
                <p className="text-muted-foreground text-base">Inspeção técnica do bem (estado, validade, aderência à especificação). Só após isso ocorre o <em>Recebimento Definitivo</em>.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0 border-4 border-card">4</div>
              <div className="pt-3">
                <h4 className="font-bold text-foreground">Regularização</h4>
                <p className="text-muted-foreground text-base">Liberação da Nota Fiscal para pagamento (liquidação) e inserção do bem no sistema de controle do estoque.</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Tipos Estratégicos de Estoque</h3>
          <p>
            O almoxarifado pode comportar diferentes "reservas" gerenciais para mitigar riscos:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-muted border border-border rounded-xl">
              <h4 className="font-bold text-foreground flex items-center gap-2 mb-2"><LuWarehouse className="text-amber-500" /> Sazonal (Antecipação)</h4>
              <p className="text-base text-muted-foreground">Prepara a empresa para flutuações esperadas, como o aumento de vendas no Natal.</p>
            </div>
            <div className="p-4 bg-muted border border-border rounded-xl">
              <h4 className="font-bold text-foreground flex items-center gap-2 mb-2"><AlertTriangle className="text-rose-500" /> Proteção (Isolador)</h4>
              <p className="text-base text-muted-foreground">Prepara a empresa para cenários extremos: greves, crises repentinas ou falta de insumos (como a crise dos semicondutores).</p>
            </div>
            <div className="p-4 bg-muted border border-border rounded-xl">
              <h4 className="font-bold text-foreground flex items-center gap-2 mb-2"><LuBoxes className="text-blue-500" /> Segurança</h4>
              <p className="text-base text-muted-foreground">Reserva normal (ponto de ressuprimento) para cobrir atrasos rotineiros dos fornecedores ou aumento não planejado de consumo mensal.</p>
            </div>
            <div className="p-4 bg-muted border border-border rounded-xl">
              <h4 className="font-bold text-foreground flex items-center gap-2 mb-2"><LuArrowRightLeft className="text-emerald-500" /> Em Trânsito</h4>
              <p className="text-base text-muted-foreground">Mercadorias que já são da empresa, mas estão nos caminhões/navios em deslocamento.</p>
            </div>
          </div>

          <AlertBox tipo="info" titulo="Dica para Concursos">
            <strong>Proteção vs Segurança:</strong> Embora pareçam iguais, o de Proteção é para catástrofes de mercado (greves amplas), enquanto o de Segurança é para a variação estatística normal do dia a dia (ex: consumo aumentou 10% ou fornecedor atrasou 3 dias).
          </AlertBox>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Unitização e Preservação de Materiais</h3>
          <p>
            Cobrado pela CESGRANRIO com alta frequência em provas de Suprimento, a <strong>unitização de carga</strong> é a é o agrupamento de itens menores em uma unidade maior e padronizada de carga.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-muted border border-border rounded-xl">
              <h4 className="font-bold text-foreground mb-1">📦 Paletização</h4>
              <p className="text-xl text-foreground/85 leading-relaxed">Caixas agrupadas sobre um palete-padrão (PBR). Facilita movimentação mecânica com empilhadeiras, reduz avarias e mano amanipulação manual.</p>
            </div>
            <div className="p-4 bg-muted border border-border rounded-xl">
              <h4 className="font-bold text-foreground mb-1">🚢 Conteinerização</h4>
              <p className="text-xl text-foreground/85 leading-relaxed">Agrupamento em contêiner intermodal (ISO). Permite transporte multimodal (navio-caminhão-ferrovia) sem remanipulação da carga.</p>
            </div>
            <div className="p-4 bg-muted border border-border rounded-xl">
              <h4 className="font-bold text-foreground mb-1">🏷️ Bag/Big-Bag</h4>
              <p className="text-xl text-foreground/85 leading-relaxed">Embalagem rígida ou flexível de grande porte para produtos a granel (aréia, químicos). Muito usada em refinarias.</p>
            </div>
          </div>
          <AlertBox tipo="warning" titulo="Ponto de Prova CESGRANRIO">
            A unitização serve para <strong>reduzir o custo por unidade movimentada, diminuir avarias e aumentar a segurança operacional</strong>. A banca pode colocar como distrator a opção “armazenar mais itens no mesmo espaço”, que é uma consequência secundária, não o objetivo primário.
          </AlertBox>
        </div>
      </section>

      <ModuleConsolidation
        index={1}
        variant={getModuleVariant(1)}
        sinteseEstrategica={{
          title: "Fluxo Sem Interrupção",
          content: (
            <>
              <div className="text-6xl my-6 animate-pulse text-center">🔄 📦</div>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                &quot;Garantir o material certo, no local certo, na quantidade certa, na hora certa.&quot; Esse é o mantra do profissional de almoxarifado.
              </p>
            </>
          ),
        }}
      podcast={{
            aulaId: "gestaoalmoxarifado",
            aulaTitulo: "Gestao Almoxarifado",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <div className="space-y-6">
        <ModuleSectionHeader
          index={1}
          variant={getModuleVariant(1)}
          title="Análise C.E.D.E."
          description="Operações de Almoxarifado"
        />
        <ContentAccordion
          mode="stacked"
          slides={[
            {
              titulo: "Conceituação: Recebimento de Materiais",
              icone: <LuWarehouse />,
              conteudo: (
                <div className="space-y-4">
                  <p>O recebimento segue quatro fases estritas: entrada física, conferência quantitativa, conferência qualitativa e regularização sistêmica.</p>
                </div>
              ),
            },
            {
              titulo: "⚡ Raio-X CESGRANRIO — Gestão Física vs Econômica",
              icone: <LuWarehouse />,
              conteudo: (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    A banca CESGRANRIO adora testar se o candidato sabe a diferença conceitual e funcional das subdivisões da gestão de materiais:
                  </p>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-amber-700 dark:text-amber-300">
                      Almoxarifado = Gestão Física
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      Responsável estritamente pela **guarda, conservação, embalagem, recepção e expedição física** do material.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300">
                      Gestão de Estoque = Gestão Econômica
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      Responsável pelo planejamento econômico, previsão de consumo futuro, definição de níveis de segurança e reposição do capital imobilizado.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>

      <QuizInterativo
        titulo="Operações de Almoxarifado"
        numero={1}
        variant={getModuleVariant(1)}
        questoes={toQQ(QUIZ_ALMOXARIFADO["modulo-1"])}
        onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={2}
        titulo="Controle e Inventário"
        descricao="Ferramentas como Curva ABC e métodos de contagem cíclica."
        variant={getModuleVariant(2)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Métodos de Classificação e Inventário"
          description="Como otimizar a gestão usando dados e rotinas padronizadas."
          variant={getModuleVariant(2)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
          <h3 className="text-2xl font-bold text-foreground mb-4">Curva ABC (Princípio de Pareto)</h3>
          <p>
            Baseada na premissa de que 80% dos efeitos vêm de 20% das causas, a Curva ABC é a principal ferramenta para focar esforço onde realmente importa.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1 p-5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-center">
              <h4 className="text-3xl font-black text-rose-600 dark:text-rose-400 mb-2">Classe A</h4>
              <p className="text-lg font-bold text-foreground">~20% dos itens</p>
              <p className="text-xl mt-2 text-foreground/85 leading-relaxed"><strong>~80% do Valor:</strong> Alta prioridade, controle rigoroso (diário), contagem frequente.</p>
            </div>
            <div className="flex-1 p-5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center">
              <h4 className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-2">Classe B</h4>
              <p className="text-lg font-bold text-foreground">~30% dos itens</p>
              <p className="text-xl mt-2 text-foreground/85 leading-relaxed"><strong>~15% do Valor:</strong> Prioridade média, controle intermediário, contagem periódica.</p>
            </div>
            <div className="flex-1 p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
              <h4 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">Classe C</h4>
              <p className="text-lg font-bold text-foreground">~50% dos itens</p>
              <p className="text-xl mt-2 text-foreground/85 leading-relaxed"><strong>~5% do Valor:</strong> Baixa prioridade (parafusos, clipes), muito volume e pouco valor. Controle mais frouxo.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Critérios de Classificação (Consumo x Permanente)</h3>
          <p>
            A contabilidade pública precisa separar os bens em Material de Consumo e Bem Permanente. Segundo a lei, um material é <strong>de consumo</strong> se atender a um destes critérios:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Durabilidade:</strong> Perde utilidade normal em até 2 anos.</li>
            <li><strong>Fragilidade:</strong> Estrutura quebradiça (ex: vidrarias de laboratório).</li>
            <li><strong>Perecibilidade:</strong> Deteriora-se com o tempo (ex: alimentos, reagentes).</li>
            <li><strong>Incorporabilidade:</strong> Quando integrado, perde a identidade (ex: tijolo em uma parede).</li>
            <li><strong>Transformabilidade:</strong> Adquirido para ser transformado (ex: chapa de aço).</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Inventário Físico: Geral x Cíclico</h3>
          <p>
            O inventário serve para conciliar o "estoque físico" (o que tem na prateleira) com o "estoque contábil" (o que o sistema diz que tem).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-4 bg-muted rounded-lg border-l-4 border-l-blue-500">
              <h4 className="font-bold mb-2">Inventário Geral (Anual)</h4>
              <p className="text-xl text-foreground/85 leading-relaxed">Normalmente paralisa toda a operação da empresa (balanço). Alto risco de erro pelo cansaço da equipe e prejuízo pela interrupção logística.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg border-l-4 border-l-emerald-500">
              <h4 className="font-bold mb-2">Inventário Cíclico (Rotativo)</h4>
              <p className="text-xl text-foreground/85 leading-relaxed">Contagens programadas por amostra (ex: contar prateleira X na terça, classe A na sexta). Não interrompe a operação e corrige erros rapidamente.</p>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">FIFO vs FEFO</h3>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>PEPS/FIFO (Primeiro que Entra, Primeiro que Sai):</strong> Para materiais não perecíveis (eletrônicos). A primeira caixa a chegar no almoxarifado deve ser a primeira a ser usada, para evitar obsolescência/ferrugem.</li>
            <li><strong>PVPS/FEFO (Primeiro que Vence, Primeiro que Sai):</strong> Para materiais perecíveis (alimentos, químicos). A data de entrada não importa, importa a validade. O que vai vencer mais cedo, sai primeiro.</li>
          </ul>

        </div>
      </section>

      <ModuleConsolidation
        index={2}
        variant={getModuleVariant(2)}
        sinteseEstrategica={{
          title: "Inteligência Logística",
          content: (
            <>
              <div className="text-6xl my-6 animate-pulse text-center">📊 🧠</div>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                Sistemas e metodologias (Curva ABC, Inventário Cíclico) transformam o esforço braçal do estoquista em precisão contábil e operacional.
              </p>
            </>
          ),
        }}
      podcast={{
            aulaId: "gestaoalmoxarifado",
            aulaTitulo: "Gestao Almoxarifado",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <div className="space-y-6">
        <ModuleSectionHeader
          index={2}
          variant={getModuleVariant(2)}
          title="Análise C.E.D.E."
          description="Curva ABC e FIFO"
        />
        <ContentAccordion
          mode="stacked"
          slides={[
            {
              titulo: "Dicas: Codificação no Almoxarifado",
              icone: <LuPackageSearch />,
              conteudo: (
                <div className="space-y-4">
                  <p>O endereçamento (rua, módulo, prateleira) e a codificação (código de barras, RFID) são essenciais. Se o item não tem código, ele &quot;não existe&quot; sistemicamente no armazém.</p>
                </div>
              ),
            },
            {
              titulo: "⚡ Raio-X CESGRANRIO — O LEC, Inventários e Unitização",
              icone: <LuPackageSearch />,
              conteudo: (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Nas provas de Técnico de Suprimento da Petrobras, o Lote Econômico de Compras, contagem de inventário e unitização são muito explorados:
                  </p>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-amber-700 dark:text-amber-300">
                      🥇 Equilíbrio do Lote Econômico (LEC)
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      O LEC minimiza o custo total. Graficamente, o ponto mínimo ocorre na interseção entre o <strong>custo de emissão de pedidos</strong> e o <strong>custo de posse/armazenagem</strong>.
                    </p>
                    <p className="text-lg text-foreground/85 leading-relaxed">• Custo de posse sobe com lotes maiores | Custo de pedido cai com lotes maiores</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300">
                      🥈 Inventário Cíclico (Rotativo)
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      A contagem cíclica (inventário rotativo) garante a precisão de dados de forma permanente ao longo de todo o ano, **sem paralisar as operações comerciais da empresa** (ao contrário do inventário geral anual).
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-emerald-700 dark:text-emerald-300">
                      🥉 Unitização de Carga
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      Agrupamento de volumes menores em carga única (palete, container). Objetivo primário: <strong>reduzir custo de movimentação, diminuir avarias e otimizar o transporte</strong>.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border font-mono text-xl text-foreground/85 leading-relaxed">
                    <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">🧠 Macete de Código:</p>
                    <p className="text-gray-600 dark:text-gray-400">CLASSE A → controle rigoroso, inventário frequente, menor estoque de segurança</p>
                    <p className="text-gray-600 dark:text-gray-400">CUSTO DE POSSE = CUSTO DE PEDIDO → ponto do LEC (custo mínimo)</p>
                    <p className="text-gray-600 dark:text-gray-400">UNITIZAÇÃO → palete agrupa cargas, não é armazenagem &quot;compacta&quot;</p>
                  </div>
                </div>
              ),
            },
          ]}
        />
        <QuizInterativo
          titulo="Controle e Inventário"
          numero={2}
          variant={getModuleVariant(2)}
          questoes={toQQ(QUIZ_ALMOXARIFADO["modulo-2"])}
          onComplete={(score: number) => handleQuizComplete("modulo-2", score)}
        />
      </div>
    </div>
  );

  return (
    <AulaTemplate
      {...props}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la.">
      <TabsContent value="modulo-1" className="mt-0">
        {renderModulo1()}
      </TabsContent>
      <TabsContent value="modulo-2" className="mt-0">
        {renderModulo2()}
      </TabsContent>
    </AulaTemplate>
  );
}
