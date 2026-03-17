"use client";

import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  CardCarousel,
  ModuleConsolidation,
} from "../shared";
import {
  LuBookOpen,
  LuScale,
  LuHandshake,
  LuShield,
  LuInfo,
  LuBuilding,
  LuAward,
  LuCheck,
  LuUsers,
  LuFileCheck,
  LuSearch,
  LuBriefcase,
  LuChartLine,
  LuFileText,
  LuLayoutGrid,
  LuShieldAlert,
  LuBrain,
  LuClipboardCheck,
  LuHistory,
  LuLock,
  LuEye,
  LuFingerprint,
  LuActivity,
  LuLayers,
  LuMessageSquare,
  LuExternalLink,
  LuTimer,
  LuSquareKanban,
  LuTriangleAlert,
  LuChartBar,
  LuCrown,
} from "react-icons/lu";
import { QUIZ_LEI_13303 } from "@/data/quizzes/lei-13303-quizzes";
const BANNER_VARIANTS: Record<number, "indigo" | "emerald" | "violet" | "amber" | "rose" | "cyan"> = {
  1: "indigo", 2: "emerald", 3: "violet", 4: "amber", 5: "rose",
  6: "cyan", 7: "indigo", 8: "emerald", 9: "violet", 10: "amber"
};
const getBannerVariant = (n: number) => BANNER_VARIANTS[n] || "indigo";

const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "Módulo 1",
    title: "Conceitos Fundamentais da Lei 13.303",
  },
  { id: "modulo-2", label: "Módulo 2", title: "Empresa Estatal: Definições" },
  {
    id: "modulo-3",
    label: "Módulo 3",
    title: "Direitos e Deveres dos Acionistas",
  },
  { id: "modulo-4", label: "Módulo 4", title: "Órgãos de Governança" },
  {
    id: "modulo-5",
    label: "Módulo 5",
    title: "Assembleia Geral de Acionistas",
  },
  { id: "modulo-6", label: "Módulo 6", title: "Conselho de Administração" },
  {
    id: "modulo-7",
    label: "Módulo 7",
    title: "Diretoria e Conselho Fiscal",
  },
  { id: "modulo-8", label: "Módulo 8", title: "Conflito de Interesses" },
  { id: "modulo-9", label: "Módulo 9", title: "Lei 13.303 na Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
];

export default function AulaLei13303(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const getQuiz = (mod: string) => QUIZ_LEI_13303[mod] || [];

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      setCompletedModules((prev) => new Set([...prev, moduleId]));
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevModuleId = MODULE_DEFS[index - 1].id;
    return completedModules.has(prevModuleId);
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Lei 13.303 (Estatuto das Estatais)"
      descricao="Regras de governança, transparência e controle para empresas públicas e de economia mista."
      duracao="2h 30min"
      materiaNome="Administração"
      materiaCor="indigo"
      materiaId="administracao"
      isCompleted={completedModules.has("modulo-10")}
      currentProgress={Math.round((completedModules.size / (MODULE_DEFS.length)) * 100)}
      onComplete={() => props.onUpdateProgress?.(100)}
    >
      {/* ==================== MÓDULO 1 ==================== */}
      <TabsContent value="modulo-1" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={1}
          titulo="Conceitos Fundamentais"
          descricao="Introdução à Lei das Empresas Estatais, seus objetivos e campo de aplicação no cenário industrial."
          variant={getBannerVariant(1)}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={getBannerVariant(1)}
            title="Dossiê de Fundamentos"
            description="Entenda o porquê desta lei existir e a quem ela se aplica no contexto Petrobras."
          />
          <CardCarousel
            cards={[
              {
                titulo: "O Código de Governança",
                descricao: "A Lei 13.303/2016 surge como o principal estatuto jurídico das empresas públicas e sociedades de economia mista, unificando as regras de gestão.",
                icone: <LuBookOpen />,
                corFundo: "bg-indigo-500/10",
              },
              {
                titulo: "Regime Jurídico Híbrido",
                descricao: "As estatais possuem personalidade de direito privado, mas com fortes obrigações de direito público (licitações, concursos, transparência).",
                icone: <LuScale />,
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "Função Social",
                descricao: "Embora busquem lucro, sua existência deve ser justificada pelo interesse público ou imperativo de segurança nacional (Art. 173 da CF).",
                icone: <LuHandshake />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Limites de Atuação",
                descricao: "Aplica-se a qualquer estatal que explore atividade econômica de produção ou comercialização de bens ou de prestação de serviços.",
                icone: <LuShield />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Transparência Total",
                descricao: "Obrigação de divulgar informações financeiras e de governança de forma clara e acessível.",
                icone: <LuEye />,
                corFundo: "bg-amber-500/10",
              },
              {
                titulo: "Estabilidade Gestora",
                descricao: "Regras rígidas para evitar rotatividade política e garantir foco técnico de longo prazo.",
                icone: <LuTimer />,
                corFundo: "bg-rose-500/10",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={getBannerVariant(1)}
            title="Análise Técnica C.E.D.E."
            description="Explorando a profundidade pedagógica dos fundamentos da lei."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: A Gênese da Lei",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Lei das Estatais (13.303/2016) é o resultado de uma necessidade de blindar as empresas públicas contra interferências políticas indevidas e garantir que sua gestão fosse tão eficiente quanto a do setor privado.
                    </p>
                    <AlertBox tipo="info" titulo="Eixo Central">
                      Ela estabelece o **Estatuto Jurídico** da empresa pública, da sociedade de economia mista e de suas subsidiárias, abrangendo União, Estados, Distrito Federal e Municípios.
                    </AlertBox>
                  </div>
                ),
                icone: <LuInfo />,
              },
              {
                titulo: "Exemplificação: Aplicação na PETROBRAS",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Observe o caso da Petrobras: por ser uma Sociedade de Economia Mista (SEM), ela precisa equilibrar o retorno aos acionistas privados com a sua missão estratégica de suprimento de energia para o país.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2"><LuCheck className="text-emerald-500" /> Direito Privado</h5>
                        <p className="text-sm">Contratos comerciais, exploração de poços e concorrência no mercado de combustíveis.</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2"><LuCheck className="text-blue-500" /> Direito Público</h5>
                        <p className="text-sm">Realização de concursos internos para contratação de engenheiros e técnicos.</p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBuilding />,
              },
              {
                titulo: "Dicas Táticas: Questões Cesgranrio",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Fique atento à aplicação da lei em subsidiárias. A Cesgranrio costuma cobrar se a 13.303 se aplica a empresas de pequeno porte controladas pela União.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>A lei se aplica inclusive a **subsidiárias** de estatais.</li>
                      <li>Empresas com receita bruta inferior a R$ 90 milhões têm regime diferenciado mas **ainda seguem princípios da lei**.</li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Cuidado!",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Muitos candidatos acham que a Lei 13.303 revogou a Lei 6.404 (Lei das S.A.). **Erro fatal!**
                    </p>
                    <AlertBox tipo="danger" titulo="Não se engane">
                      As Sociedades de Economia Mista continuam sendo regidas pela Lei das S.A., e a Lei 13.303 funciona como uma **norma especial** que prevalece em caso de especificidades de governança estatal.
                    </AlertBox>
                  </div>
                ),
                icone: <LuTriangleAlert />,
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={1}
          variant={getBannerVariant(1)}
          video={{
            videoId: "mXWw_DLo83M",
            title: "Fundamentos da Lei 13.303",
            duration: "12:45"
          }}
          resumoVisual={{
            moduloNome: "Conceitos Fundamentais",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Arquitetura da Lei", type: "diagram", placeholderColor: "indigo" },
              { title: "Fluxo de Aplicação", type: "infographic", placeholderColor: "blue" }
            ]
          }}
          maceteVisual={{
            title: "O Pulo do Gato: Princípio da Especialidade",
            content: (
              <div className="space-y-3">
                <p>Para não esquecer a hierarquia:</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-bold text-indigo-400">
                    <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center">1</div>
                    CF/88 (Art. 173)
                  </div>
                  <div className="flex items-center gap-2 font-bold text-blue-400">
                    <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">2</div>
                    Lei 13.303 (Específica Estatais)
                  </div>
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center">3</div>
                    Lei 6.404 (Geral das S.A.)
                  </div>
                </div>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            titulo: "Podcast: A Origem do Estatuto",
            artista: "Prof. Gestão"
          }}
        />

        <QuizInterativo
          questoes={getQuiz("modulo-1")}
          titulo="Conceitos Fundamentais"
          numero={1}
          variant={getBannerVariant(1)}
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 2 ==================== */}
      <TabsContent value="modulo-2" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={2}
          titulo="Empresa Estatal: Definições"
          descricao="Aprofundando nas diferenças cruciais entre Empresas Públicas e Sociedades de Economia Mista."
          variant={getBannerVariant(2)}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={getBannerVariant(2)}
            title="Tipologia e Estrutura"
            description="Como o capital e a personalidade jurídica definem o destino da estatal."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Empresa Pública (EP)",
                descricao: "Capital 100% público. Pode ser unipessoal ou ter vários sócios, desde que todos sejam entes públicos.",
                icone: <LuBuilding />,
                corFundo: "bg-indigo-500/10",
              },
              {
                titulo: "Soc. Economia Mista (SEM)",
                descricao: "Capital dividido em ações. O governo detém a maioria das ações com direito a voto (ordinárias).",
                icone: <LuUsers />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Personalidade Jurídica",
                descricao: "Ambas são pessoas jurídicas de direito privado, operando sob a lógica de mercado sempre que possível.",
                icone: <LuFileCheck />,
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "Objeto Social",
                descricao: "Deverá ser definido de forma precisa e clara no estatuto social, proibindo atividades estranhas à sua missão.",
                icone: <LuLayoutGrid />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Subsidiárias",
                descricao: "Empresas criadas pela estatal para missões específicas, compartilhando a mesma cultura de governança.",
                icone: <LuLayers />,
                corFundo: "bg-amber-500/10",
              },
              {
                titulo: "Acionista Controlador",
                descricao: "Ente público que detém o poder de decisão e a maioria do capital votante.",
                icone: <LuCrown />,
                corFundo: "bg-rose-500/10",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={getBannerVariant(2)}
            title="Masterclass de Diferenciação"
            description="Entenda os detalhes técnicos que separam as entidades no concurso."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: A Origem do Capital",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A grande linha divisória é o **Capital Social**. Na Empresa Pública, não há espaço para investimento privado direto no capital. Na SEM, o Estado senta-se à mesa com investidores do mercado.
                    </p>
                    <div className="p-4 bg-muted border border-border rounded-xl">
                      <p className="text-sm font-bold border-b border-border pb-2 mb-2">Composição do Capital:</p>
                      <ul className="space-y-1 text-sm">
                        <li><strong>EP:</strong> 100% Público (União, Estados, Municípios).</li>
                        <li><strong>SEM:</strong> Público (+) Privado (Ações em Bolsa).</li>
                      </ul>
                    </div>
                  </div>
                ),
                icone: <LuSearch />,
              },
              {
                titulo: "Exemplificação: Comparativo Industrial",
                conteudo: (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-indigo-500/5 rounded-lg border border-indigo-500/20">
                        <h5 className="font-bold text-indigo-400">Exemplo EP</h5>
                        <p className="text-xs uppercase font-bold text-muted-foreground">Caixa Econômica Federal</p>
                        <p className="text-sm mt-2">Todo o patrimônio pertence à União. Atua como banco mas sem acionistas privados externos.</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                        <h5 className="font-bold text-emerald-400">Exemplo SEM</h5>
                        <p className="text-xs uppercase font-bold text-muted-foreground">Petróleo Brasileiro S.A.</p>
                        <p className="text-sm mt-2">A União controla, mas investidores de Nova York e São Paulo possuem fatias do capital.</p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBriefcase />,
              },
              {
                titulo: "Dicas de Prova: Acionistas Minoritários",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Cuidado com a expressão "maioria do capital". Para a Lei 13.303, o controle é exercido pela maioria do **Capital Votante**.
                    </p>
                    <AlertBox tipo="warning" titulo="O pulo do gato">
                      O governo não precisa ter 51% do capital TOTAL, mas sim a maioria das **Ações Ordinárias** (que dão direito a voto).
                    </AlertBox>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções: Subsidiárias e Coligadas",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Subsidiárias são empresas criadas pela estatal para fins específicos (ex: Transpetro). Coligadas são empresas onde a estatal tem influência mas não o controle total.
                    </p>
                    <p className="text-sm italic">
                      "A criação de subsidiárias depende de autorização legislativa, conforme o STF, mas essa autorização pode ser genérica (prevista na lei que criou a estatal)."
                    </p>
                  </div>
                ),
                icone: <LuTriangleAlert />,
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={2}
          variant={getBannerVariant(2)}
          video={{
            videoId: "7w6z0_L_L0M",
            title: "Diferença entre EP e SEM",
            duration: "08:20"
          }}
          resumoVisual={{
            moduloNome: "Definições Estatais",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Mapa Mental EP vs SEM", type: "visual_summary", placeholderColor: "emerald" },
              { title: "Tabela de Competências", type: "table", placeholderColor: "teal" }
            ]
          }}
          maceteVisual={{
            title: "Mnemônico de Ouro",
            content: (
              <div className="space-y-4">
                <p>Para diferenciar o Foro Judicial:</p>
                <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-lg">
                  <p className="font-black text-emerald-400">EP Federal = JUSTIÇA FEDERAL</p>
                  <p className="font-black text-cyan-400">SEM Federal = JUSTIÇA ESTADUAL</p>
                </div>
                <p className="text-xs text-muted-foreground">A Petrobras (SEM) é julgada na Justiça Estadual, apesar de ser federal!</p>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            titulo: "Podcast: O Foro e o Capital",
            artista: "Dra. Administrativo"
          }}
        />

        <QuizInterativo
          questoes={getQuiz("modulo-2")}
          titulo="Definições Estatais"
          numero={2}
          variant={getBannerVariant(2)}
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 3 ==================== */}
      <TabsContent value="modulo-3" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={3}
          titulo="Direitos e Deveres do Acionista"
          descricao="O papel do investidor na governança estatal: proteção, transparência e responsabilidades."
          variant={getBannerVariant(3)}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={3}
            variant={getBannerVariant(3)}
            title="O Estatuto do Investidor"
            description="Entenda como a lei equilibra o capital público e privado."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Direito ao Voto",
                descricao: "Fundamental para as ações ordinárias. O acionista participa das decisões máximas da companhia.",
                icone: <LuCheck />,
                corFundo: getBannerVariant(3),
              },
              {
                titulo: "Dividendos",
                descricao: "Parte dos lucros distribuídos proporcionalmente ao número de ações possuídas pelo investidor.",
                icone: <LuChartLine />,
                corFundo: getBannerVariant(3),
              },
              {
                titulo: "Fiscalização",
                descricao: "O acionista tem o dever e o direito de fiscalizar a gestão através dos relatórios e assembleias.",
                icone: <LuSearch />,
                corFundo: getBannerVariant(3),
              },
              {
                titulo: "Responsabilidade",
                descricao: "O acionista responde pelos danos causados por atos praticados com abuso de poder ou dolo.",
                icone: <LuScale />,
                corFundo: getBannerVariant(3),
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={3}
            variant={getBannerVariant(3)}
            title="Análise C.E.D.E. do Acionista"
            description="Explorando a relação capital-estado."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: A Natureza do Investimento",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Na Petrobras, o acionista não é apenas um investidor financeiro; ele é parte de um ecossistema que influencia a política energética nacional. A Lei 13.303 garante que o acionista privado não seja atropelado pelo interesse político momentâneo.
                    </p>
                    <AlertBox tipo="info" titulo="Proteção Legal">
                      O Artigo 28 da lei estabelece que a empresa estatal deve observar as regras de transparência e governança para proteger o mercado.
                    </AlertBox>
                  </div>
                ),
                icone: <LuShield />,
              },
              {
                titulo: "Exemplificação: O Direito de Recesso",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Imagine que a estatal decida mudar radicalmente seu ramo de atuação (ex: sair do petróleo para focar apenas em energia nuclear).
                    </p>
                    <div className="p-4 bg-muted border border-border rounded-lg">
                      <p className="text-sm italic">"O acionista dissidente tem o direito de se retirar da companhia, recebendo o valor de suas ações pelo valor patrimonial ou de mercado, conforme o estatuto."</p>
                    </div>
                  </div>
                ),
                icone: <LuExternalLink />,
              },
              {
                titulo: "Dicas Táticas: Abuso de Poder",
                conteudo: (
                  <div className="space-y-4">
                    <p>A Cesgranrio frequenta o tema do **Acionista Controlador**. O Estado não pode usar o controle para extrair vantagens indevidas da empresa.</p>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>O controlador responde civilmente por danos causados por abuso de poder.</li>
                      <li>Deve-se votar no melhor interesse da companhia, não apenas do governo da vez.</li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções: Ações Preferenciais",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Muitas ações da Petrobras são **Preferenciais (PETR4)**. Elas não dão direito a voto, mas dão prioridade no recebimento de dividendos.
                    </p>
                    <AlertBox tipo="warning" titulo="Exceção de Voto">
                      Mesmo a ação preferencial ganha direito a voto se a empresa ficar 3 exercícios consecutivos sem pagar os dividendos mínimos obrigatórios.
                    </AlertBox>
                  </div>
                ),
                icone: <LuLayoutGrid />,
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={3}
          variant={getBannerVariant(3)}
          video={{
            videoId: "xyz123",
            title: "Direitos dos Acionistas",
            duration: "10:30"
          }}
          resumoVisual={{
            moduloNome: "Acionistas",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Mapa de Direitos", type: "visual_summary", placeholderColor: "blue" },
              { title: "Tabela de Deveres", type: "table", placeholderColor: "indigo" }
            ]
          }}
          maceteVisual={{
            title: "V.I.D.A. do Acionista",
            content: (
              <div className="grid grid-cols-2 gap-2 text-sm font-bold">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded">Voto</div>
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded">Informação</div>
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded">Dividendo</div>
                <div className="p-2 bg-rose-500/20 text-rose-400 rounded">Accountability (Deveres)</div>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            titulo: "Podcast: O Investidor Ético",
            artista: "Dra. Finanças"
          }}
        />

        <QuizInterativo
          questoes={getQuiz("modulo-3")}
          titulo="Direitos e Deveres"
          numero={3}
          variant={getBannerVariant(3)}
          onComplete={(score) => handleModuleComplete("modulo-3", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 4 ==================== */}
      <TabsContent value="modulo-4" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={4}
          titulo="Órgãos de Governança"
          descricao="A arquitetura institucional das estatais: Assembleia, Conselho e Diretoria."
          variant={getBannerVariant(4)}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={4}
            variant={getBannerVariant(4)}
            title="Estrutura de Comando"
            description="Quem manda, quem executa e quem fiscaliza na Petrobras."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Assembleia Geral",
                descricao: "Órgão supremo onde os acionistas deliberam sobre a existência e os rumos da companhia.",
                icone: <LuUsers />,
                corFundo: getBannerVariant(4),
              },
              {
                titulo: "Conselho Adm.",
                descricao: "Define a estratégia, elege a diretoria e supervisiona a gestão sob uma ótica de longo prazo.",
                icone: <LuLayoutGrid />,
                corFundo: getBannerVariant(4),
              },
              {
                titulo: "Diretoria",
                descricao: "Responsável pela gestão executiva, implementando a estratégia e respondendo pelo dia a dia.",
                icone: <LuBriefcase />,
                corFundo: getBannerVariant(4),
              },
              {
                titulo: "Conselho Fiscal",
                descricao: "Órgão independente que fiscaliza as contas e os atos dos administradores.",
                icone: <LuClipboardCheck />,
                corFundo: getBannerVariant(4),
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={4}
            variant={getBannerVariant(4)}
            title="Dossiê C.E.D.E. de Órgãos Sociais"
            description="Entenda a intersecção entre os poderes da empresa."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: A Trindade da Governança",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A governança na Lei 13.303 segue o padrão da Lei das S.A., mas com amarras mais fortes de compliance. O objetivo é criar um sistema de **checks and balances** (pesos e contrapesos).
                    </p>
                    <AlertBox tipo="info" titulo="Independência">
                      Nenhum órgão pode ser esvaziado de suas funções por decisão unilateral do controlador.
                    </AlertBox>
                  </div>
                ),
                icone: <LuLayers />,
              },
              {
                titulo: "Exemplificação: Conflito de Alçada",
                conteudo: (
                  <div className="space-y-4">
                    <p>O que acontece se a Diretoria quiser fazer um investimento não previsto no plano estratégico?</p>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>O **Conselho de Administração** deve barrar o investimento.</li>
                      <li>Se o Conselho for omisso, o **Conselho Fiscal** deve denunciar o fato.</li>
                      <li>A **Assembleia Geral** pode, ao final, destituir os conselheiros por má gestão.</li>
                    </ul>
                  </div>
                ),
                icone: <LuHistory />,
              },
              {
                titulo: "Dicas de Prova: Composição e Mandato",
                conteudo: (
                  <div className="space-y-4">
                    <p>Fique atento aos prazos unificados pela Lei 13.303:</p>
                    <div className="p-4 bg-muted border border-border rounded-xl font-mono text-sm">
                      <p>Prazo de Gestão: Até 2 anos</p>
                      <p>Reconduções: Máximo 3 consecutivas</p>
                    </div>
                    <p className="text-xs mt-2 italic">Dica: A lei busca a oxigenação da gestão, evitando a perpetuação de diretores no cargo.</p>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções: Comitês de Assessoramento",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A estatal pode criar comitês para ajudar o Conselho (ex: Comitê de Auditoria, Comitê de Riscos).
                    </p>
                    <AlertBox tipo="success" titulo="Auditoria Estatuária">
                      O comitê de auditoria é **obrigatório** em estatais de grande porte e deve ser composto por membros independentes.
                    </AlertBox>
                  </div>
                ),
                icone: <LuShieldAlert />,
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={4}
          variant={getBannerVariant(4)}
          video={{
            videoId: "abc456",
            title: "Estrutura Institucional",
            duration: "13:45"
          }}
          resumoVisual={{
            moduloNome: "Órgãos de Governança",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Organograma Legal", type: "diagram", placeholderColor: "indigo" },
              { title: "Fluxo de Decisão", type: "infographic", placeholderColor: "blue" }
            ]
          }}
          maceteVisual={{
            title: "Pirâmide de Comando",
            content: (
              <div className="space-y-2 text-sm text-center">
                <div className="p-2 border border-border bg-indigo-500/10 rounded">ASSEMBLEIA (Dono)</div>
                <div className="p-2 border border-border bg-cyan-500/10 rounded">CONSELHO (Mente)</div>
                <div className="p-2 border border-border bg-emerald-500/10 rounded">DIRETORIA (Braço)</div>
                <div className="p-2 border border-border bg-rose-500/10 mt-4 rounded">FISCAL (Olho)</div>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            titulo: "Podcast: O Poder na Companhia",
            artista: "Prof. Alberto"
          }}
        />

        <QuizInterativo
          questoes={getQuiz("modulo-4")}
          titulo="Órgãos de Governança"
          numero={4}
          variant={getBannerVariant(4)}
          onComplete={(score) => handleModuleComplete("modulo-4", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 5 ==================== */}
      <TabsContent value="modulo-5" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={5}
          titulo="Assembleia Geral de Acionistas"
          descricao="O fórum soberano de decisão: competências, convocações e o poder do acionista."
          variant={getBannerVariant(5)}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={5}
            variant={getBannerVariant(5)}
            title="Assembleia: O Poder Supremo"
            description="Entenda como os donos da empresa exercem sua soberania."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Competência Exclusiva",
                descricao: "Somente a Assembleia pode alterar o estatuto, eleger conselheiros e aprovar as contas anuais.",
                icone: <LuSquareKanban />,
                corFundo: getBannerVariant(5),
              },
              {
                titulo: "AGO vs AGE",
                descricao: "AGO ocorre nos 4 primeiros meses do ano. AGE ocorre sempre que o interesse social exigir.",
                icone: <LuFileText />,
                corFundo: getBannerVariant(5),
              },
              {
                titulo: "Quórum de Instalação",
                descricao: "Exige a presença de acionistas que representem, no mínimo, 1/4 do capital com direito a voto.",
                icone: <LuUsers />,
                corFundo: getBannerVariant(5),
              },
              {
                titulo: "Publicidade",
                descricao: "Editais de convocação devem ser publicados com antecedência mínima de 15 a 30 dias.",
                icone: <LuInfo />,
                corFundo: getBannerVariant(5),
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={5}
            variant={getBannerVariant(5)}
            title="Mergulho C.E.D.E."
            description="A dinâmica das deliberações sociais."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: O Ritual Democrático",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Assembleia Geral é o órgão que manifesta a vontade da pessoa jurídica através do voto dos acionistas. É onde o Estado (controlador) e o Mercado (minoritários) se encontram formalmente.
                    </p>
                    <AlertBox tipo="info" titulo="O Voto do Estado">
                      Segundo a Lei 13.303, o Estado deve votar de forma a preservar o interesse público que justificou a criação da empresa, sem descurar da eficiência econômica.
                    </AlertBox>
                  </div>
                ),
                icone: <LuUsers />,
              },
              {
                titulo: "Exemplificação: Aprovação de Contas",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Todo ano, a Petrobras realiza sua AGO para que os acionistas examinem o balanço financeiro do ano anterior.
                    </p>
                    <div className="p-4 bg-muted border border-border rounded-lg">
                      <p className="text-sm">Se a Assembleia rejeita as contas, pode haver a destituição de administradores e o início de auditorias especiais. É o momento de maior 'stress' na governança.</p>
                    </div>
                  </div>
                ),
                icone: <LuChartBar />,
              },
              {
                titulo: "Dicas de Prova: Prazos e Convocação",
                conteudo: (
                  <div className="space-y-4">
                    <p>A Cesgranrio costuma cobrar os prazos de convocação da Lei das S.A. que se aplicam aqui:</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>1ª Convocação: 15 dias de antecedência (CVM requer 30 para abertas).</li>
                      <li>2ª Convocação: 8 dias de antecedência.</li>
                      <li>AGO: Obrigatória uma vez por ano.</li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções: O Direito de Retirada",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Se a Assembleia aprovar mudanças drásticas (como fusão ou mudança de objeto), o acionista dissidente pode exercer o **Direito de Recesso**.
                    </p>
                    <AlertBox tipo="danger" titulo="Atenção">
                      O acionista tem o direito de retirar-se da companhia recebendo o valor de suas ações, protegendo seu patrimônio contra decisões arbitrárias da maioria.
                    </AlertBox>
                  </div>
                ),
                icone: <LuTriangleAlert />,
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={5}
          variant={getBannerVariant(5)}
          video={{
            videoId: "9HnS-2vX060",
            title: "Funcionamento das Assembleias",
            duration: "11:15"
          }}
          resumoVisual={{
            moduloNome: "Assembleia Geral",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Roteiro da AGO", type: "infographic", placeholderColor: "amber" },
              { title: "Tabela de Quóruns", type: "table", placeholderColor: "orange" }
            ]
          }}
          maceteVisual={{
            title: "Regra das 4 Letras: AGOA",
            content: (
              <div className="space-y-2">
                <p>O que a AGO faz obrigatoriamente?</p>
                <div className="space-y-1 font-mono text-sm">
                  <p><strong>A</strong>provar contas</p>
                  <p><strong>G</strong>erenciar lucros (Destinação)</p>
                  <p><strong>O</strong>rdinar Admins (Eleger)</p>
                  <p><strong>A</strong>valiar remuneração</p>
                </div>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            titulo: "Podcast: A Voz do Acionista",
            artista: "Auditores Independentes"
          }}
        />

        <div className="space-y-8 mt-8">
          <h3 className="text-xl font-bold flex items-center gap-2 text-amber-500">
            <LuBrain /> Estudo de Caso: A Petrobras em 2018
          </h3>
          <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/20 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10">
              <LuHistory size={120} />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Em 2018, a Petrobras enfrentou uma AGE histórica para votar o acordo com o DOJ (Departamento de Justiça Americano). Esse evento demonstrou na prática o poder da Assembleia em decidir sobre acordos bilionários que afetam o futuro da companhia por décadas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-[10px] uppercase font-bold text-amber-400">Ponto Chave</span>
                <p className="text-xs mt-1">Soberania da Assembleia em transações críticas.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-[10px] uppercase font-bold text-amber-400">Transparência</span>
                <p className="text-xs mt-1">Divulgação massiva de informações prévias.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-[10px] uppercase font-bold text-amber-400">Resultado</span>
                <p className="text-xs mt-1">Aprovação por ampla maioria dos votos.</p>
              </div>
            </div>
          </div>
        </div>

        <QuizInterativo
          questoes={getQuiz("modulo-5")}
          titulo="Assembleia Geral"
          numero={5}
          variant={getBannerVariant(5)}
          onComplete={(score) => handleModuleComplete("modulo-5", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 6 ==================== */}
      <TabsContent value="modulo-6" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={6}
          titulo="Conselho de Administração"
          descricao="O guardião da estratégia: composição, requisitos e vedações da Lei das Estatais."
          variant={getBannerVariant(6)}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={6}
            variant={getBannerVariant(6)}
            title="O Cérebro da Estatal"
            description="Como se forma o colegiado que define os rumos da Petrobras."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Composição Híbrida",
                descricao: "Mínimo de 7 e máximo de 11 membros. Deve ter representantes dos empregados e de minoritários.",
                icone: <LuUsers />,
                corFundo: getBannerVariant(6),
              },
              {
                titulo: "Membros Independentes",
                descricao: "Pelo menos 25% (ou 1, se menor) devem ser conselheiros independentes, sem vínculo com o controlador.",
                icone: <LuShield />,
                corFundo: getBannerVariant(6),
              },
              {
                titulo: "Prazo de Gestão",
                descricao: "Unificado de até 2 anos. Permite-se no máximo 3 reconduções consecutivas.",
                icone: <LuFileCheck />,
                corFundo: getBannerVariant(6),
              },
              {
                titulo: "Responsabilidade Coletiva",
                descricao: "As decisões são tomadas por maioria de votos, e os membros respondem civilmente por atos irregulares.",
                icone: <LuScale />,
                corFundo: getBannerVariant(6),
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={6}
            variant={getBannerVariant(6)}
            title="Trilha C.E.D.E. de Gestão"
            description="Requisitos técnicos e vedações políticas."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: A Blindagem Política",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Lei 13.303 trouxe critérios rigorosos de **Ficha Limpa** e **Capacidade Técnica** para os conselheiros. O objetivo é evitar o uso da empresa como cabide de empregos políticos.
                    </p>
                    <AlertBox tipo="warning" titulo="Requisito Técnico">
                      O conselheiro deve ter experiência mínima de 10 anos na área de atuação da empresa ou 4 anos em cargos de chefia.
                    </AlertBox>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exemplificação: Vedações de Nomeação",
                conteudo: (
                  <div className="space-y-4">
                    <p>Quem NÃO pode ser conselheiro na Petrobras?</p>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>Ministros de Estado e Secretários.</li>
                      <li>Dirigentes de partidos políticos.</li>
                      <li>Pessoas com conflito de interesse no setor de petróleo.</li>
                      <li>Representantes de fornecedores ou clientes da estatal.</li>
                    </ul>
                  </div>
                ),
                icone: <LuTriangleAlert />,
              },
              {
                titulo: "Dicas Estratégicas: Quarentena",
                conteudo: (
                  <div className="space-y-4">
                    <p>Existe uma 'quarentena' de 36 meses para dirigentes partidários e detentores de cargos públicos em comissão assumirem o conselho.</p>
                    <p className="text-xs bg-muted p-2 rounded italic">"Este ponto é o mais atacado juridicamente e o que mais cai em provas da Cesgranrio."</p>
                  </div>
                ),
                icone: <LuShield />,
              },
              {
                titulo: "Exceções: Subsidiárias e Coligadas",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      O conselheiro da holding pode acumular cargo no conselho de uma subsidiária (ex: Petrobras e Transpetro).
                    </p>
                    <AlertBox tipo="success" titulo="Eficiência">
                      Essa acumulação visa garantir a unidade da estratégia do grupo econômico estatal, desde que não receba remuneração duplicada.
                    </AlertBox>
                  </div>
                ),
                icone: <LuHandshake />,
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={6}
          variant={getBannerVariant(6)}
          video={{
            videoId: "3rR_rW0e9A0",
            title: "O Conselho de Administração",
            duration: "14:50"
          }}
          resumoVisual={{
            moduloNome: "Conselho Estratégico",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Checklist de Elegibilidade", type: "infographic", placeholderColor: "rose" },
              { title: "Matriz de Competências", type: "diagram", placeholderColor: "red" }
            ]
          }}
          maceteVisual={{
            title: "Regra do 10-4-36",
            content: (
              <div className="space-y-2 text-sm">
                <p><strong>10</strong> anos de profissão ou</p>
                <p><strong>4</strong> anos de chefia ou</p>
                <p><strong>36</strong> meses de quarentena política.</p>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            titulo: "Podcast: Blindagem e Competência",
            artista: "Conselheiros Certificados"
          }}
        />

        <div className="space-y-8 mt-8">
          <h3 className="text-xl font-bold flex items-center gap-2 text-rose-500">
            <LuShield /> Firewall Institucional
          </h3>
          <p className="text-muted-foreground">O Conselho de Administração não pode ser apenas um espelho do governo; deve ser um escudo.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-rose-500/5 rounded-2xl border border-rose-500/20 space-y-4">
              <h4 className="font-bold flex items-center gap-2"><LuUsers /> Representatividade</h4>
              <p className="text-sm text-muted-foreground">O Art. 19 garante que empregados e acionistas minoritários tenham voz e voto, quebrando o monopólio de decisão do controlador.</p>
            </div>
            <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/20 space-y-4">
              <h4 className="font-bold flex items-center gap-2"><LuLayoutGrid /> Diversidade de Expertise</h4>
              <p className="text-sm text-muted-foreground">Membros devem ter competências complementares em finanças, engenharia de petróleo, direito e gestão de riscos.</p>
            </div>
          </div>
        </div>

        <QuizInterativo
          questoes={getQuiz("modulo-6")}
          titulo="Conselho de Admin."
          numero={6}
          variant={getBannerVariant(6)}
          onComplete={(score) => handleModuleComplete("modulo-6", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 7 ==================== */}
      <TabsContent value="modulo-7" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={7}
          titulo="Diretoria e Conselho Fiscal"
          descricao="A execução técnica e a vigilância financeira: os pilares operacionais da governança."
          variant={getBannerVariant(7)}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={7}
            variant={getBannerVariant(7)}
            title="Execução e Vigilância"
            description="Diferenciando o papel de quem faz do papel de quem vigia."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Diretoria Executiva",
                descricao: "Colegiado responsável pela gestão operacional. Deve seguir as diretrizes do Conselho de Administração.",
                icone: <LuBriefcase />,
                corFundo: getBannerVariant(7),
              },
              {
                titulo: "Conselho Fiscal",
                descricao: "Órgão de fiscalização permanente e obrigatório nas estatais abertas (como a Petrobras).",
                icone: <LuSearch />,
                corFundo: getBannerVariant(7),
              },
              {
                titulo: "Independência",
                descricao: "Conselheiros fiscais não podem ter sido administradores da empresa nos últimos 3 anos.",
                icone: <LuFileCheck />,
                corFundo: getBannerVariant(7),
              },
              {
                titulo: "Dever de Diligência",
                descricao: "Diretores respondem com seu patrimônio pessoal caso ajam com culpa ou dolo contra o estatuto.",
                icone: <LuScale />,
                corFundo: getBannerVariant(7),
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={7}
            variant={getBannerVariant(7)}
            title="Dossiê Técnico C.E.D.E."
            description="Prazos, mandatos e vedações operacionais."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: A Diretoria Colegiada",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Diferente de empresas privadas simples, a Diretoria da Estatal deve ser **Colegiada**. Decisões críticas não podem ser de um único homem, mas sim do grupo de diretores.
                    </p>
                    <AlertBox tipo="info" titulo="Mandato">
                      O prazo de gestão dos diretores também é de até 2 anos, permitindo-se 3 reconduções.
                    </AlertBox>
                  </div>
                ),
                icone: <LuBriefcase />,
              },
              {
                titulo: "Exemplificação: Atuação do Fiscal",
                conteudo: (
                  <div className="space-y-4">
                    <p>Imagine que a Petrobras vai comprar uma nova frota de navios. O que o Conselho Fiscal faz?</p>
                    <ol className="list-decimal pl-5 text-sm space-y-1">
                      <li>Examina se há verba no orçamento aprovado.</li>
                      <li>Denuncia erros ou irregularidades à Assembleia.</li>
                      <li>Opina sobre os relatórios anuais de desempenho.</li>
                    </ol>
                  </div>
                ),
                icone: <LuFileCheck />,
              },
              {
                titulo: "Dicas de Prova: Composição do Fiscal",
                conteudo: (
                  <div className="space-y-4">
                    <p>O Conselho Fiscal deve ter de 3 a 5 membros efetivos e igual número de suplentes.</p>
                    <p className="bg-rose-500/10 p-4 rounded text-xs font-bold">"IMPORTANTE: Um dos membros deve ser eleito pelos acionistas minoritários na SEM."</p>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Vedações Curiosas",
                conteudo: (
                  <div className="space-y-4">
                    <p>Pessoas que tenham parentesco até o **3º grau** com administradores NÃO podem integrar o Conselho Fiscal.</p>
                    <AlertBox tipo="danger" titulo="Sobriedade">
                      Isso garante que o fiscal não seja 'parceiro' de quem ele deve vigiar.
                    </AlertBox>
                  </div>
                ),
                icone: <LuUsers />,
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={7}
          variant={getBannerVariant(7)}
          video={{
            videoId: "vXWw_DLo83M",
            title: "Diretoria e Fiscalização",
            duration: "13:20"
          }}
          resumoVisual={{
            moduloNome: "Operação e Auditoria",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Ciclo de Responsabilidade", type: "diagram", placeholderColor: "blue" },
              { title: "Matriz Funcional", type: "table", placeholderColor: "indigo" }
            ]
          }}
          maceteVisual={{
            title: "Fiscal = Cão de Guarda",
            content: (
              <div className="text-center p-4 border-2 border-indigo-500/30 rounded-lg">
                <p className="italic">"O Fiscal morde (denuncia) | Não late (não manda) | Não dorme (fiscaliza sempre)"</p>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
            titulo: "Podcast: O Olhar do Fiscal",
            artista: "Controladores de Contas"
          }}
        />

        <QuizInterativo
          questoes={getQuiz("modulo-7")}
          titulo="Diretoria e Fiscal"
          numero={7}
          variant={getBannerVariant(7)}
          onComplete={(score) => handleModuleComplete("modulo-7", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 8 ==================== */}
      <TabsContent value="modulo-8" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={8}
          titulo="Conflito de Interesses e Impedimentos"
          descricao="A ética como pilar da governança: o que a lei proíbe para proteger a estatal."
          variant={getBannerVariant(8)}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={8}
            variant={getBannerVariant(8)}
            title="Integridade e Ética"
            description="As vedações que garantem a imparcialidade nas decisões."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Conflito Direto",
                descricao: "É proibido ao administrador participar de qualquer decisão onde tenha interesse pessoal conflitante com o da estatal.",
                icone: <LuTriangleAlert />,
                corFundo: getBannerVariant(8),
              },
              {
                titulo: "Uso de Informação",
                descricao: "Vedado o uso de informações privilegiadas para obter vantagem pessoal ou para terceiros (Insider Trading).",
                icone: <LuSearch />,
                corFundo: getBannerVariant(8),
              },
              {
                titulo: "Oportunidade Comercial",
                descricao: "O administrador não pode se aproveitar de oportunidades de negócio das quais tenha conhecimento em razão do cargo.",
                icone: <LuBriefcase />,
                corFundo: getBannerVariant(8),
              },
              {
                titulo: "Canal de Denúncias",
                descricao: "A estatal deve manter canais independentes para denúncia de atos irregulares e proteção ao denunciante.",
                icone: <LuShield />,
                corFundo: getBannerVariant(8),
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={8}
            variant={getBannerVariant(8)}
            title="Exame C.E.D.E. de Integridade"
            description="Transparência e reporte de conflitos."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: O Dever de Lealdade",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A lealdade do administrador é devida à **Companhia**, não ao governo que o nomeou ou ao partido político. O conflito de interesse ocorre quando o interesse privado "embaça" a visão do que é melhor para a empresa.
                    </p>
                    <AlertBox tipo="danger" titulo="Art. 154 da Lei 6.404">
                      O administrador deve exercer as atribuições que a lei e o estatuto lhe conferem para lograr os fins e no interesse da companhia.
                    </AlertBox>
                  </div>
                ),
                icone: <LuShield />,
              },
              {
                titulo: "Exemplificação: O Fornecedor Parente",
                conteudo: (
                  <div className="space-y-4">
                    <p>Cenário clássico: O conselho vai votar a contratação de uma empresa de logística cuja dona é esposa de um dos diretores.</p>
                    <div className="p-4 bg-muted border border-border rounded-lg">
                      <p className="text-sm"><strong>O que deve ser feito?</strong> O diretor deve declarar seu conflito, retirar-se da sala e não participar nem influenciar a deliberação.</p>
                    </div>
                  </div>
                ),
                icone: <LuUsers />,
              },
              {
                titulo: "Dicas de Prova: Registro e Ata",
                conteudo: (
                  <div className="space-y-4">
                    <p>A declaração de impedimento deve constar obrigatoriamente na **Ata da Reunião**.</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>O administrador que não declarar o conflito pode ser responsabilizado por perdas e danos.</li>
                      <li>A CVM (Comissão de Valores Mobiliários) fiscaliza rigorosamente esse ponto em estatais abertas.</li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções: Transações Corriqueiras",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Transações feitas em condições de mercado (Arm's Length) e que fazem parte do dia a dia da empresa podem ter procedimentos simplificados.
                    </p>
                    <AlertBox tipo="info" titulo="Comitê de Auditoria">
                      É este comitê que geralmente analisa as 'Partes Relacionadas' para garantir que não haja favorecimento.
                    </AlertBox>
                  </div>
                ),
                icone: <LuCheck />,
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={8}
          variant={getBannerVariant(8)}
          video={{
            videoId: "9HnS-2vX060",
            title: "Ética e Conflito de Interesses",
            duration: "09:45"
          }}
          resumoVisual={{
            moduloNome: "Integridade Corporativa",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Matriz de Conflitos", type: "infographic", placeholderColor: "rose" },
              { title: "Fluxo de Denúncia", type: "diagram", placeholderColor: "red" }
            ]
          }}
          maceteVisual={{
            title: "Regra do Espelho",
            content: (
              <div className="text-center p-4">
                <p className="italic font-bold">"Se você não pode contar o que fez para o jornal ou para sua mãe, então há um conflito de interesse!"</p>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
            titulo: "Podcast: A Ética do Administrador",
            artista: "Auditores de Compliance"
          }}
        />

        <QuizInterativo
          questoes={getQuiz("modulo-8")}
          titulo="Conflito de Interesses"
          numero={8}
          variant={getBannerVariant(8)}
          onComplete={(score) => handleModuleComplete("modulo-8", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 9 ==================== */}
      <TabsContent value="modulo-9" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={9}
          titulo="Lei 13.303 na Petrobras"
          descricao="Estudo de caso real: como o estatuto da maior estatal brasileira reflete a lei."
          variant={getBannerVariant(9)}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={9}
            variant={getBannerVariant(9)}
            title="Prática de Mercado"
            description="A Petrobras como modelo de aplicação de governança avançada."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Estatuto Social",
                descricao: "O documento mestre da Petrobras, que incorpora e detalha cada exigência da Lei das Estatais.",
                icone: <LuFileCheck />,
                corFundo: getBannerVariant(9),
              },
              {
                titulo: "Comitês de Apoio",
                descricao: "Comitês de Auditoria, Pessoas, Estratégia e Finanças que auxiliam o Conselho.",
                icone: <LuUsers />,
                corFundo: getBannerVariant(9),
              },
              {
                titulo: "Programa de Compliance",
                descricao: "O 'Petrobras Integra' é um dos mais robustos programas de integridade do mundo corporativo.",
                icone: <LuShield />,
                corFundo: getBannerVariant(9),
              },
              {
                titulo: "Relatório de Sustentabilidade",
                descricao: "Transparência total sobre impactos ambientais, sociais e de governança (ESG).",
                icone: <LuChartBar />,
                corFundo: getBannerVariant(9),
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={9}
            variant={getBannerVariant(9)}
            title="Dossiê Petrobras C.E.D.E."
            description="A realidade operacional da governança."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: O Acionista União",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Na Petrobras, a União exerce o controle através do Ministério de Minas e Energia. No entanto, as decisões devem seguir o rito da Lei 13.303 para evitar prejuízos aos minoritários.
                    </p>
                    <AlertBox tipo="info" titulo="Poder de Voto">
                      A União possui a maioria das ações ordinárias (PETR3), garantindo o controle estratégico.
                    </AlertBox>
                  </div>
                ),
                icone: <LuBuilding />,
              },
              {
                titulo: "Exemplificação: Nomeação de CEO",
                conteudo: (
                  <div className="space-y-4">
                    <p>Para o Presidente da Petrobras assumir, ele passa por um 'Double Check':</p>
                    <ol className="list-decimal pl-5 text-sm space-y-1">
                      <li>Nomeação pelo Governo Federal.</li>
                      <li>Avaliação de conformidade pelo Comitê de Elegibilidade da Petrobras (Compliance).</li>
                      <li>Eleição formal pelo Conselho de Administração.</li>
                    </ol>
                  </div>
                ),
                icone: <LuSearch />,
              },
              {
                titulo: "Dicas Práticas: O Edital do Concurso",
                conteudo: (
                  <div className="space-y-4">
                    <p>A Petrobras cobra em seu concurso não apenas a letra da lei, mas como sua governança é premiada no mercado.</p>
                    <p className="p-2 border border-border rounded text-xs">"Mencione sempre o Nível 2 de Governança Corporativa da B3 como diferencial da Petrobras."</p>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções: Acordos de Acionistas",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Existem acordos que definem como grupos de acionistas votam em bloco. Isso é legal e comum em SEMs de grande porte.
                    </p>
                    <AlertBox tipo="success" titulo="Transparência">
                      Tais acordos devem ser arquivados na sede da companhia para conhecimento de todos os interessados.
                    </AlertBox>
                  </div>
                ),
                icone: <LuHandshake />,
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={9}
          variant={getBannerVariant(9)}
          video={{
            videoId: "m9k8l7",
            title: "Petrobras e Governanca",
            duration: "15:10"
          }}
          resumoVisual={{
            moduloNome: "Estudo Petrobras",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Timeline de Evolução", type: "visual_summary", placeholderColor: "amber" },
              { title: "Arquitetura de Controle", type: "diagram", placeholderColor: "orange" }
            ]
          }}
          maceteVisual={{
            title: "Petrobras = 303 x 404",
            content: (
              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <p className="text-sm">A Petrobras é a maior aplicação prática da **Lei 13.303** operando nos trilhos da **Lei 6.404**.</p>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            titulo: "Podcast: O Case Petrobras",
            artista: "Analista de Mercado"
          }}
        />

        <div className="space-y-12 mt-12 bg-indigo-500/5 p-8 rounded-3xl border border-indigo-500/10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-indigo-400 flex items-center gap-3">
                <LuFingerprint className="text-3xl" /> A Cultura do Compliance
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A Lei 13.303 não é apenas uma lista de proibições; é um sistema vivo de integridade. Na Petrobras, isso se traduz no **Programa Petrobras de Prevenção da Corrupção (PPPC)**.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Canal de Denúncia", icon: <LuMessageSquare /> },
                  { label: "Due Diligence", icon: <LuSearch /> },
                  { label: "Treinamento Ético", icon: <LuBrain /> },
                  { label: "Monitoramento Contínuo", icon: <LuActivity /> }
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-bold text-indigo-300">
                    {tag.icon} {tag.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-64 h-64 bg-indigo-500/10 rounded-2xl flex items-center justify-center p-6 border border-indigo-500/20 shadow-2xl shadow-indigo-500/20">
              <div className="text-center space-y-3">
                <LuLock className="text-6xl text-indigo-400 mx-auto" />
                <p className="text-[10px] uppercase font-bold tracking-tighter text-indigo-300">Selagem de Segurança</p>
              </div>
            </div>
          </div>
        </div>

        <QuizInterativo
          questoes={getQuiz("modulo-9")}
          titulo="Petrobras e a Lei"
          numero={9}
          variant={getBannerVariant(9)}
          onComplete={(score) => handleModuleComplete("modulo-9", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 10 ==================== */}
      <TabsContent value="modulo-10" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={10}
          titulo="Simulado Mestre"
          descricao="Teste final integrado com o padrão Cesgranrio."
          variant={getBannerVariant(10)}
        />
        <QuizInterativo
          questoes={getQuiz("modulo-10")}
          titulo="Simulado Final"
          numero={10}
          variant={getBannerVariant(10)}
          onComplete={(score) => handleModuleComplete("modulo-10", score)}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
