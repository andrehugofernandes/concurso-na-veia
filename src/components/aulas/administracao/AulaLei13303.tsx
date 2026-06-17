"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import React, { useState, useEffect } from "react";
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
  QuestaoResolvidaStepByStep} from "../shared";
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
const BANNER_VARIANTS: Record<number, "cyan" | "emerald" | "emerald" | "amber" | "rose" | "cyan"> = {
  1: "cyan", 2: "emerald", 3: "emerald", 4: "amber", 5: "rose",
  6: "cyan", 7: "cyan", 8: "emerald", 9: "emerald", 10: "amber"
};
const getBannerVariant = (n: number) => BANNER_VARIANTS[n] || "cyan";

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
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
];

export default function AulaLei13303(props: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_lei13303_";

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
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo={props.titulo}
      descricao={props.descricao}
      duracao={props.duracao}
      materiaNome={props.materiaNome}
      materiaCor={props.materiaCor}
      materiaId={props.materiaId}
      isCompleted={completedModules.has("modulo-10")}
      currentProgress={Math.round((completedModules.size / (MODULE_DEFS.length)) * 100)}
      onComplete={() => props.onUpdateProgress?.(100)}
    >
      {/* ==================== MÓDULO 1 ==================== */}
      {activeTab === "modulo-1" && (
      <TabsContent value="modulo-1" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={1}
          titulo="Conceitos Fundamentais"
          descricao="Introdução à Lei das Empresas Estatais, seus objetivos e campo de aplicação no cenário industrial."
          variant={getBannerVariant(1)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Fundamentos da Lei 13.303"
            description="A lei que rege as empresas públicas e de economia mista no Brasil."
            variant="cyan"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Lei 13.303/2016</strong>, conhecida como "Lei das Estatais" ou "Lei de Governança das Empresas Públicas",
              é o principal estatuto jurídico que disciplina o funcionamento das empresas públicas e das sociedades de economia mista
              brasileiras, incluindo a Petrobras. Promulgada em junho de 2016, ela consolidou regras de governança, transparência e
              controle que antes eram dispersas em diferentes normativas, criando um marco único de accountability.</p>
            <p>CESGRANRIO adora a aplicabilidade da Lei 13.303. Lembre-se: ela rege empresas públicas e sociedades de economia mista, abrangendo suas subsidiárias integrais.</p>
            <p>Por que essa lei importa para a Petrobras? Porque a empresa é <strong>sociedade de economia mista</strong> — significa
              que a União é controladora (mais de 50% das ações), mas há também acionistas privados. A Lei 13.303 obriga a Petrobras
              a manter padrões rigorosos de governança, mesmo tendo uma trajetória já consolidada. Na CESGRANRIO, essa lei é frequente
              em provas para cargos administrativos, pois define direitos e deveres que afetam toda operação interna.</p>
            <p>O estatuto jurídico estabelece o regime de concorrência com o mercado de capitais ao mesmo tempo em que preserva a função social pública das estatais.</p>
            <p>A lei se aplica a todas as empresas públicas federais (Caixa, BNDES, Correios, etc.) e sociedades de economia mista
              (Petrobras, Eletrobras, Banco do Brasil). Ela não aplica a empresas estaduais ou municipais — essas têm suas próprias leis.
              A Petrobras, como estatal federal em regime de economia mista, está 100% submetida a Lei 13.303 e suas regulamentações.</p>
            <p>Como exemplo prático, a Lei das Estatais unifica as diretrizes de governança societária e transparência a serem respeitadas por dirigentes nomeados.</p>
            <p>Os <strong>principais objetivos</strong> da lei são: (1) aumentar transparência das operações estatais; (2) melhorar a
              eficiência de gestão; (3) proteger o interesse público e da União; (4) assegurar direitos dos acionistas minoritários;
              (5) prevenir conflitos de interesse; (6) estabelecer mecanismos de fiscalização interna e externa.</p>
            <p>A lei veda qualquer tipo de intervenção lesiva de acionistas controladores na condução profissional da companhia em prol de interesses meramente políticos.</p>
            <p>Neste módulo, você aprenderá o contexto histórico (por que a lei foi criada em 2016), sua estrutura (10 capítulos principais),
              seu campo de aplicação (quem é obrigado a seguir), e como se relaciona com outras normas (Lei de Licitações, Lei de Acesso
              à Informação, Lei Sarbanes-Oxley). Vamos começar pelo porquê antes de nos aprofundar no como.</p>
            <p>A Petrobras incorporou as regras da Lei 13.303 em seu próprio estatuto social, implementando rigorosos controles prévios de conformidade corporativa.</p>
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">📋 Escopo da Lei 13.303</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ Aplicável a empresas públicas federais</li>
                <li>✓ Aplicável a sociedades de economia mista federais</li>
                <li>✓ Abrange governança, transparência, conflito de interesse</li>
                <li>✓ Não se aplica a empresas privadas ou estatais estaduais/municipais</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

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
                corFundo: "bg-cyan-500/10",
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
          <ContentAccordion mode="stacked" slides={[
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2"><LuCheck className="text-emerald-500" /> Direito Privado</h5>
                        <p className="text-lg">Contratos comerciais, exploração de poços e concorrência no mercado de combustíveis.</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2"><LuCheck className="text-blue-500" /> Direito Público</h5>
                        <p className="text-lg">Realização de concursos internos para contratação de engenheiros e técnicos.</p>
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
                titulo: "Exceções e pontos de atenção: Cuidado!",
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

        









        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={1}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A Lei 13.303/2016 disciplina o funcionamento de empresas públicas e de economia mista. Qual é o seu objetivo PRINCIPAL?"
          alternativas={[
              { letra: "A", texto: "A", correta: false },
              { letra: "B", texto: "Substituir completamente a Lei 6.404/76 para todas as sociedades anônimas.", correta: true },
              { letra: "C", texto: "B", correta: false },
              { letra: "D", texto: "Estabelecer regras de governança corporativa, garantindo eficiência, transparência e respeito aos acionistas em empresas estatais.", correta: false },
              { letra: "E", texto: "C", correta: false },
              { letra: "F", texto: "Eliminar a necessidade de Conselho de Administração nas empresas públicas.", correta: false },
              { letra: "G", texto: "D", correta: false },
              { letra: "H", texto: "Privatizar todas as empresas do setor público brasileiro.", correta: false },
              { letra: "I", texto: "E", correta: false },
              { letra: "J", texto: "Impedir que acionistas privados participem de economia mista.", correta: false }
            ]}
          dicaEstrategica="Petrobras segue rigorosamente estas normas."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Lei 13.303 estabelece normas específicas de governança para estatais: transparência, conformidade, responsabilidade." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={1}
          variant={getBannerVariant(1)}
          video={{
            videoId: "mXWw_DLo83M",
            title: "Fundamentos da Lei 13.303",
            duration: "12:45"
          }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Arquitetura da Lei", type: "diagram", placeholderColor: "cyan" },
              { title: "Fluxo de Aplicação", type: "infographic", placeholderColor: "blue" }
            ]
          }}
          sinteseEstrategica={{
            title: "Destaque Estratégico: Princípio da Especialidade",
            content: (
              <div className="space-y-3">
                <p>Para não esquecer a hierarquia:</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-bold text-cyan-400">
                    <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center">1</div>
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
          titulo="QUIZ: Conceitos Fundamentais da Lei 13.303"
          numero={2}
          variant={getBannerVariant(1)}
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 2 ==================== */}
      {activeTab === "modulo-2" && (
      <TabsContent value="modulo-2" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={2}
          titulo="Empresa Estatal: Definições"
          descricao="Aprofundando nas diferenças cruciais entre Empresas Públicas e Sociedades de Economia Mista."
          variant={getBannerVariant(2)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Tipologia de Empresas Estatais"
            description="Empresa Pública vs Sociedade de Economia Mista — estrutura de capital e implicações."
            variant="emerald"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A Lei 13.303 define <strong>dois tipos de empresas estatais</strong>: <strong>Empresa Pública (EP)</strong> e
              <strong> Sociedade de Economia Mista (SEM)</strong>. A diferença é exclusivamente no <strong>capital (estrutura de propriedade)</strong>.
              Empresa Pública tem capital 100% público; SEM tem capital dividido entre setor público (controlador) e setor privado (minoritários).
              Essa distinção afeta direitos dos acionistas, estrutura de votação, e estratégia de gestão.</p>
            <p>A banca exige discernir as estatais: Empresas Públicas possuem capital 100% público; Sociedades de Economia Mista são S.A. com maioria de voto público.</p>
            <p>A Petrobras é uma <strong>Sociedade de Economia Mista</strong>, específificamente uma S.A. (Sociedade Anônima) com mais de 50% das
              ações com direito a voto (ordinárias) pertencentes à União Federal. Isso significa que existem acionistas privados que possuem ações
              da Petrobras (preferenciais e ordinárias minoritárias). Essa estrutura mista é frequente em megaempresas: Eletrobras, Caixa (EP), BNDES (EP),
              Banco do Brasil (SEM), Correios (EP).</p>
            <p>As subsidiárias de empresas estatais também se submetem integralmente às regras de licitações e governança ditadas pela Lei das Estatais.</p>
            <p>Por que a Petrobras é SEM e não EP? Porque a Lei 13.303 permite que empresas estratégicas brasileiras captem capital privado (via bolsa)
              sem perder o controle estatal. Assim, a União mantém controle ({'>'}50%) mas também atrai investidores institucionais (fundos, bancos) que compram
              ações minoritárias. Isso diversifica riscos e aumenta a capitalização sem abrir mão do comando.</p>
            <p>Como demonstração prática, empresas públicas podem ser unipessoais, enquanto sociedades de economia mista adotam obrigatoriamente a forma de S.A.</p>
            <p>As implicações práticas são significativas: em uma EP pura (ex.: Caixa), não há votação de acionistas privados — decisões são 100% governamentais.
              Em uma SEM (Petrobras), há Assembleia Geral de Acionistas onde acionistas minoritários votam, exigem transparência, questionam dividendos. A Lei 13.303
              protege esses direitos minoritários — é a garantia que acionistas privados têm de que seus direitos não serão arbitrariamente suprimidos.</p>
            <p>A constituição de estatais e suas subsidiárias exige autorização legislativa expressa, delimitando o objeto social e a área de atuação econômica.</p>
            <p>Neste módulo, você aprenderá a diferenciar EP de SEM, entender a estrutura de capital da Petrobras, reconhecer as implicações para governança,
              e dominar a nomenclatura exata que aparece em provas CESGRANRIO. Será simples se você focar na distinção: <strong>capital 100% público = EP; capital dividido = SEM</strong>.</p>
            <p>A Transpetro, subsidiária integral da Petrobras, submete-se de forma idêntica à Lei 13.303 em todas as suas concorrências e contratos.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">🏢 Diferenças Principais</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>EP:</strong> Capital 100% público; Sem acionistas privados; Decisões 100% governamentais</li>
                <li>✓ <strong>SEM:</strong> Capital público ({'>'}50%) + privado ({'<'}50%); Tem acionistas privados; Assembleia Geral com votação</li>
                <li>✓ <strong>Petrobras:</strong> SEM (S.A.); União detém {'>'}50%; Ações negociadas em bolsa</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

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
                corFundo: "bg-cyan-500/10",
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
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: A Origem do Capital",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A grande linha divisória é o **Capital Social**. Na Empresa Pública, não há espaço para investimento privado direto no capital. Na SEM, o Estado senta-se à mesa com investidores do mercado.
                    </p>
                    <div className="p-4 bg-muted border border-border rounded-xl">
                      <p className="text-lg font-bold border-b border-border pb-2 mb-2">Composição do Capital:</p>
                      <ul className="space-y-1 text-lg">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
                        <h5 className="font-bold text-cyan-400">Exemplo EP</h5>
                        <p className="text-lg uppercase font-bold text-muted-foreground">Caixa Econômica Federal</p>
                        <p className="text-lg mt-2">Todo o patrimônio pertence à União. Atua como banco mas sem acionistas privados externos.</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                        <h5 className="font-bold text-emerald-400">Exemplo SEM</h5>
                        <p className="text-lg uppercase font-bold text-muted-foreground">Petróleo Brasileiro S.A.</p>
                        <p className="text-lg mt-2">A União controla, mas investidores de Nova York e São Paulo possuem fatias do capital.</p>
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
                    <AlertBox tipo="warning" titulo="Destaque Estratégico">
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
                    <p className="text-lg italic">
                      "A criação de subsidiárias depende de autorização legislativa, conforme o STF, mas essa autorização pode ser genérica (prevista na lei que criou a estatal)."
                    </p>
                  </div>
                ),
                icone: <LuTriangleAlert />,
              },
            ]}
          />
        </div>

        









        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual definição MELHOR descreve uma Empresa Estatal segundo Lei 13.303?"
          alternativas={[
              { letra: "A", texto: "A", correta: false },
              { letra: "B", texto: "Qualquer empresa que tenha acionistas privados.", correta: true },
              { letra: "C", texto: "B", correta: false },
              { letra: "D", texto: "Entidade criada para exercer atividade econômica, com patrimônio pertencente à União, Estados ou Municípios, sob controle estatal.", correta: false },
              { letra: "E", texto: "C", correta: false },
              { letra: "F", texto: "Uma cooperativa de trabalhadores do setor público.", correta: false },
              { letra: "G", texto: "D", correta: false },
              { letra: "H", texto: "Organização não-governamental que recebe financiamento público.", correta: false },
              { letra: "I", texto: "E", correta: false },
              { letra: "J", texto: "Uma filial de empresa estrangeira com sócio brasileiro.", correta: false }
            ]}
          dicaEstrategica="Petrobras é modelo: empresa pública que atua em exploração de petróleo, refino e distribuição."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Empresa Estatal é entidade de economia mista ou empresa pública que exerce atividade econômica." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={2}
          variant={getBannerVariant(2)}
          video={{
            videoId: "7w6z0_L_L0M",
            title: "Diferença entre EP e SEM",
            duration: "08:20"
          }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Mapa Mental EP vs SEM", type: "visual_summary", placeholderColor: "emerald" },
              { title: "Tabela de Competências", type: "table", placeholderColor: "teal" }
            ]
          }}
          sinteseEstrategica={{
            title: "Mnemônico de Ouro",
            content: (
              <div className="space-y-4">
                <p>Para diferenciar o Foro Judicial:</p>
                <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-lg">
                  <p className="font-black text-emerald-400">EP Federal = JUSTIÇA FEDERAL</p>
                  <p className="font-black text-cyan-400">SEM Federal = JUSTIÇA ESTADUAL</p>
                </div>
                <p className="text-lg text-muted-foreground">A Petrobras (SEM) é julgada na Justiça Estadual, apesar de ser federal!</p>
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
          titulo="QUIZ: Empresa Estatal: Definições"
          numero={3}
          variant={getBannerVariant(2)}
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 3 ==================== */}
      {activeTab === "modulo-3" && (
      <TabsContent value="modulo-3" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={3}
          titulo="Direitos e Deveres do Acionista"
          descricao="O papel do investidor na governança estatal: proteção, transparência e responsabilidades."
          variant={getBannerVariant(3)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Direitos e Proteção do Acionista"
            description="Voto, informação, fiscalização — o tripé de proteção dos investidores em empresas estatais."
            variant="emerald"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>Na Petrobras (SEM), existem dois tipos de acionistas: (1) <strong>União Federal</strong> (controladora, {'>'}50% das ordinárias);
              (2) <strong>Acionistas privados/minoritários</strong> (detêm ordinárias minoritárias e/ou preferenciais). A Lei 13.303 garante que
              acionistas minoritários não sejam arbitrariamente prejudicados por decisões do controlador. Essa proteção é fundamental para que
              investidores privados confiem em empresas estatais.</p>
            <p>Questões sobre minoritários abordam os canais de fiscalização societária e o direito de voto proporcional na eleição de conselheiros de administração.</p>
            <p>Os principais <strong>direitos do acionista</strong> são: (1) <strong>Direito de Voto</strong> — participar da Assembleia e votar em
              decisões estratégicas (ações ordinárias têm voto; preferenciais não); (2) <strong>Direito a Dividendos</strong> — receber parte dos lucros
              distribuídos proporcionalmente ao número de ações; (3) <strong>Direito de Fiscalização</strong> — acessar relatórios, questionar diretoria,
              pedir auditoria; (4) <strong>Direito à Informação</strong> — receber balanços, atas de reuniões, comunicados sobre fatos relevantes.</p>
            <p>A proteção de acionistas minoritários exige a ampla divulgação de atas de reuniões de conselho e informações relevantes em portais públicos.</p>
            <p>Na Petrobras, a proteção de minoritários é crítica porque a União é controladora. Se a Lei 13.303 não existisse, a União poderia:
              tomar dividendos sem retribuição, nomear diretores incompetentes, aprovar operações que beneficiam apenas interesses governamentais.
              A lei impede isso ao exigir: (1) quórum mínimo em Assembleias; (2) votação separada para assuntos que afetam minoritários; (3) conselho fiscal;
              (4) publicidade de fatos relevantes.</p>
            <p>A eleição de membros independentes para o Conselho de Administração resguarda a companhia contra decisões que privilegiem apenas o controlador público.</p>
            <p>Deveres do acionista também existem — não é tudo direito. O acionista deve: (1) honrar compromissos de integralização de capital;
              (2) respeitar as normas estatutárias; (3) não exercer voto de forma abusiva (votação que prejudica intencionalmente a empresa); (4) pagar
              taxas/contribuições se exigidas. Especificamente acionistas minoritários têm direito de <strong>aprovação separada</strong> em questões-chave
              (venda de ativos, mudança de estatuto, dissolução).</p>
            <p>O direito de fiscalizar a gestão contábil é exercido por meio do Conselho Fiscal e da comissão externa de auditoria de forma independente.</p>
            <p>Neste módulo, você aprenderá a diferença entre direitos e deveres, reconhecer situações de violação de direitos minoritários, dominar os
              mecanismos de proteção (Conselho Fiscal, Assembleia), e entender como esses direitos funcionam especificamente na Petrobras com base em seu
              Estatuto Social (que segue Lei 13.303).</p>
            <p>A Petrobras, como sociedade de economia mista com ações na Bolsa de Valores, atende a rígidos regulamentos da CVM de proteção aos minoritários.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">⚖️ Direitos vs Deveres</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Direitos:</strong> Voto (ordinárias), Dividendos, Fiscalização, Informação</li>
                <li>✓ <strong>Deveres:</strong> Integralizar capital, Respeitar estatuto, Não votar abusivamente</li>
                <li>✓ <strong>Proteção Minoritária:</strong> Votação separada, Conselho Fiscal, Publicidade</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

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
          <ContentAccordion mode="stacked" slides={[
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
                      <p className="text-lg italic">"O acionista dissidente tem o direito de se retirar da companhia, recebendo o valor de suas ações pelo valor patrimonial ou de mercado, conforme o estatuto."</p>
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
                    <ul className="list-disc pl-5 text-lg space-y-2">
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

        









        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Segundo Lei 13.303, qual é o direito PRINCIPAL de um acionista em Empresa Estatal?"
          alternativas={[
              { letra: "A", texto: "A", correta: false },
              { letra: "B", texto: "Aprovar pessoalmente todos os contratos da empresa.", correta: true },
              { letra: "C", texto: "B", correta: false },
              { letra: "D", texto: "Participar de Assembleia Geral, votar, receber dividendos conforme participação acionária.", correta: false },
              { letra: "E", texto: "C", correta: false },
              { letra: "F", texto: "Garantia de emprego na empresa para familiares.", correta: false },
              { letra: "G", texto: "D", correta: false },
              { letra: "H", texto: "Direito de modificar unilateralmente a estratégia da empresa.", correta: false },
              { letra: "I", texto: "E", correta: false },
              { letra: "J", texto: "Isenção de impostos por investir em empresa estatal.", correta: false }
            ]}
          dicaEstrategica="Lei 13.303 garante esses direitos."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Direitos acionistas: participar de decisões na Assembleia Geral, votar em eleições de conselheiros, receber dividendos proporcionais." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={3}
          variant={getBannerVariant(3)}
          video={{
            videoId: "xyz123",
            title: "Direitos dos Acionistas",
            duration: "10:30"
          }}
          resumoVisual={{
            moduloNome: "Módulo 3",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Mapa de Direitos", type: "visual_summary", placeholderColor: "blue" },
              { title: "Tabela de Deveres", type: "table", placeholderColor: "cyan" }
            ]
          }}
          sinteseEstrategica={{
            title: "V.I.D.A. do Acionista",
            content: (
              <div className="grid grid-cols-2 gap-2 text-lg font-bold">
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
          titulo="QUIZ: Direitos e Deveres dos Acionistas"
          numero={4}
          variant={getBannerVariant(3)}
          onComplete={(score) => handleModuleComplete("modulo-3", score)}
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 4 ==================== */}
      {activeTab === "modulo-4" && (
      <TabsContent value="modulo-4" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={4}
          titulo="Órgãos de Governança"
          descricao="A arquitetura institucional das estatais: Assembleia, Conselho e Diretoria."
          variant={getBannerVariant(4)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Estrutura Institucional de Governança"
            description="Assembleia Geral, Conselho de Administração, Diretoria — a hierarquia de poder e responsabilidades."
            variant="amber"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A Lei 13.303 estabelece uma <strong>estrutura de governança de três níveis</strong> para estatais: (1) <strong>Assembleia Geral de Acionistas</strong> —
              órgão supremo de decisão (poder legislativo corporativo); (2) <strong>Conselho de Administração</strong> — órgão de controle estratégico (poder executivo + fiscalização);
              (3) <strong>Diretoria Executiva</strong> — órgão de gestão operacional (poder administrativo). Essa tripartição segue o modelo de "checks and balances": nenhum órgão tem poder absoluto.</p>
            <p>CESGRANRIO cobra as atribuições dos órgãos de governança das estatais: Assembleia Geral, Conselho de Administração e a Diretoria Executiva formal.</p>
            <p>A <strong>Assembleia Geral</strong> é suprema porque reúne todos os acionistas (ou seus representantes) e aprova: alterações estatutárias, orçamentos anuais,
              distribuição de lucros, eleição do Conselho, temas estratégicos (venda de ativos, fusões). A Assembleia vota por maioria simples (exceto quando lei exige maioria qualificada).
              Acionistas minoritários têm direito de votação separada em temas que os prejudicariam (ex.: venda de divisão inteira).</p>
            <p>A governança corporativa exige a segregação de funções entre o Conselho de Administração (estratégico) e a Diretoria Executiva (gestão tática).</p>
            <p>O <strong>Conselho de Administração</strong> é a ponte entre acionistas e operação. Eleito pela Assembleia, o Conselho aprova estratégias, supervisiona diretores,
              monitora riscos. Na Petrobras, o Conselho é obrigatório (Lei 13.303) e tem entre 5 e 11 membros (depende do estatuto). A maioria deve ser independente (não é executiva).
              O presidente do Conselho geralmente não é o CEO — essa separação evita concentração de poder.</p>
            <p>O Comitê de Auditoria Estatutário assessora o conselho na fiscalização preventiva de fraudes e na revisão de relatórios contábeis oficiais.</p>
            <p>A <strong>Diretoria Executiva</strong> é indicada pelo Conselho e responsável pela operação do dia a dia. O CEO (Presidente Executivo) reporta-se ao Conselho e responde
              pelos resultados operacionais. Diferentemente do Conselho (que é de controle), a Diretoria é de ação. Lei 13.303 exige que Diretores assinem termos de responsabilidade
              e cumpram regras de conflito de interesse (não podem ter conflitos com a empresa).</p>
            <p>A gestão de riscos e controles internos é monitorada por área técnica independente que se reporta diretamente ao comitê consultivo estatutário.</p>
            <p>Neste módulo, você aprenderá a estrutura exata, as competências de cada órgão, a hierarquia de poder, os limites de autoridade, e como esses órgãos funcionam
              especificamente na Petrobras. Entender governança é entender o organograma do poder corporativo — essencial para qualquer cargo administrativo.</p>
            <p>Os conselheiros da Petrobras passam por crivo prévio de indicação técnica que atesta os anos de experiência e a idoneidade profissional.</p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">🏛️ Três Órgãos — Três Papéis</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Assembleia Geral:</strong> Suprema; Aprova estratégia, orçamento, dividendos; Elege Conselho</li>
                <li>✓ <strong>Conselho Admin:</strong> Controle estratégico; Supervisiona diretores; Maioria independente</li>
                <li>✓ <strong>Diretoria:</strong> Operação; Reporta ao Conselho; Responsável por resultados</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

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
          <ContentAccordion mode="stacked" slides={[
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
                    <ul className="list-disc pl-5 text-lg space-y-2">
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
                    <div className="p-4 bg-muted border border-border rounded-xl font-mono text-lg">
                      <p>Prazo de Gestão: Até 2 anos</p>
                      <p>Reconduções: Máximo 3 consecutivas</p>
                    </div>
                    <p className="text-lg mt-2 italic">Dica: A lei busca a oxigenação da gestão, evitando a perpetuação de diretores no cargo.</p>
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

        









        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Quantos órgãos de governança PRINCIPAIS uma Empresa Estatal deve ter conforme Lei 13.303?"
          alternativas={[
              { letra: "A", texto: "A", correta: false },
              { letra: "B", texto: "Um único órgão (Diretoria Geral).", correta: true },
              { letra: "C", texto: "B", correta: false },
              { letra: "D", texto: "Três: Assembleia Geral de Acionistas, Conselho de Administração e Diretoria.", correta: false },
              { letra: "E", texto: "C", correta: false },
              { letra: "F", texto: "Apenas Conselho e Diretoria; Assembleia é opcional.", correta: false },
              { letra: "G", texto: "D", correta: false },
              { letra: "H", texto: "Cinco: Assembleia, Conselho, Diretoria, Conselho Fiscal e Auditoria.", correta: false },
              { letra: "I", texto: "E", correta: false },
              { letra: "J", texto: "Lei 13.303 não define órgãos; cada empresa decide.", correta: false }
            ]}
          dicaEstrategica="Conselho Fiscal é opcional mas recomendado."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Lei 13.303: 3 órgãos obrigatórios: Assembleia Geral (decisões máximas), Conselho de Administração (governance), Diretoria (execução)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={4}
          variant={getBannerVariant(4)}
          video={{
            videoId: "abc456",
            title: "Estrutura Institucional",
            duration: "13:45"
          }}
          resumoVisual={{
            moduloNome: "Módulo 4",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Organograma Legal", type: "diagram", placeholderColor: "cyan" },
              { title: "Fluxo de Decisão", type: "infographic", placeholderColor: "blue" }
            ]
          }}
          sinteseEstrategica={{
            title: "Pirâmide de Comando",
            content: (
              <div className="space-y-2 text-lg text-center">
                <div className="p-2 border border-border bg-cyan-500/10 rounded">ASSEMBLEIA (Dono)</div>
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
          titulo="QUIZ: Órgãos de Governança"
          numero={5}
          variant={getBannerVariant(4)}
          onComplete={(score) => handleModuleComplete("modulo-4", score)}
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 5 ==================== */}
      {activeTab === "modulo-5" && (
      <TabsContent value="modulo-5" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={5}
          titulo="Assembleia Geral de Acionistas"
          descricao="O fórum soberano de decisão: competências, convocações e o poder do acionista."
          variant={getBannerVariant(5)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Assembleia Geral: Poder Supremo dos Acionistas"
            description="Competências, convocação, quórum, votação — regras do fórum soberano."
            variant="rose"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Assembleia Geral de Acionistas</strong> é o órgão supremo de qualquer empresa (Lei 6.404/76 — Lei de S.A.). Na Petrobras (SEM), a Assembleia reúne
              todos os acionistas (ou seus procuradores) para deliberar sobre questões estratégicas. Existem dois tipos: (1) <strong>Assembleia Ordinária</strong> — acontece
              obrigatoriamente uma vez por ano (até 4 meses após fim do ano fiscal) para aprovar contas e eleger conselheiros; (2) <strong>Assembleia Extraordinária</strong> —
              convocada quando há temas urgentes ou que não podem esperar (venda de ativos, fusões, mudança de estatuto).</p>
            <p>A prova aborda a soberania da Assembleia Geral de Acionistas e suas competências exclusivas de reforma estatutária e destituição de dirigentes.</p>
            <p>As <strong>competências da Assembleia</strong> (temas que APENAS ela pode decidir) incluem: (1) alterar o estatuto social; (2) eleger/destituir conselheiros;
              (3) aprovar demonstrações contábeis (balanço, DRE, fluxo de caixa); (4) deliberar sobre distribuição de dividendos; (5) autorizar venda de bens do ativo permanente
              (máquinas, prédios); (6) deliberar sobre fusão, cisão ou dissolução; (7) nomear/destituir auditores independentes. Nenhum outro órgão (nem Conselho, nem Diretoria)
              pode decidir esses temas — são do poder da Assembleia.</p>
            <p>A Assembleia Geral reúne ordinariamente os acionistas uma vez ao ano para julgar as contas dos administradores e aprovar a destinação de dividendos.</p>
            <p>A <strong>convocação da Assembleia</strong> é feita pelo Conselho de Administração (normalmente). O edital de convocação deve ser publicado em jornal de grande circulação
              e em site da empresa (para Petrobras, site da B3 também). Lei 13.303 exige que minoritários tenham acesso antecipado à documentação (relatórios, contas, propostas).
              O quórum (número mínimo para iniciar) é de 25% do capital com direito a voto (Lei 6.404). Se não atingir, a Assembleia é adiada por 15 dias e pode acontecer com qualquer número.</p>
            <p>A convocação de assembleias extraordinárias é prerrogativa do conselho ou de acionistas minoritários com percentuais mínimos de ações votantes.</p>
            <p>A <strong>votação em Assembleia</strong> segue princípio de uma ação = um voto (para ordinárias). Ações preferenciais não votam (salvo exceções de não-pagamento de dividendos).
              Lei 13.303 exige que acionistas minoritários tenham votação <strong>separada e específica</strong> em temas que os prejudicariam (ex.: venda de ativos). Decisões de interesse
              social requerem maioria simples; decisões de estatuto/dissolução requerem maioria de 2/3. A Lei 13.303 proíbe voto abusivo (votação que prejudica intencionalmente a empresa).</p>
            <p>As atas das assembleias gerais de sociedades de economia mista devem ser arquivadas no registro público mercantil e publicadas em jornais de grande circulação.</p>
            <p>Neste módulo, você aprenderá a estrutura de Assembleia, os temas que cabem a ela (vs. Conselho/Diretoria), os direitos de convocação (acionistas com 5%+ podem convocar),
              a mecânica de quórum e votação, e casos práticos de Assembleia na Petrobras. Será fundamental para entender como decisões estratégicas são tomadas na empresa.</p>
            <p>A Assembleia Geral de Acionistas da Petrobras decide anualmente a distribuição de resultados e elege representantes do Conselho de Administração.</p>
            <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-rose-600 dark:text-rose-400 text-lg mb-2">📋 Competências da Assembleia (EXCLUSIVAS)</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ Alterar estatuto social</li>
                <li>✓ Eleger/destituir conselheiros e auditores</li>
                <li>✓ Aprovar contas e balanço anual</li>
                <li>✓ Deliberar dividendos; autorizar venda de ativos permanentes</li>
                <li>✓ Deliberar fusão, cisão, dissolução</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

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
          <ContentAccordion mode="stacked" slides={[
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
                      <p className="text-lg">Se a Assembleia rejeita as contas, pode haver a destituição de administradores e o início de auditorias especiais. É o momento de maior 'stress' na governança.</p>
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
                    <ul className="list-disc pl-5 text-lg space-y-1">
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

        

        <div className="space-y-8 mt-8">
          <h3 className="text-xl font-bold flex items-center gap-2 text-amber-500">
            <LuBrain /> Estudo de Caso: A Petrobras em 2018
          </h3>
          <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/20 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10">
              <LuHistory size={120} />
            </div>
            <p className="text-lg leading-relaxed mb-4">
              Em 2018, a Petrobras enfrentou uma AGE histórica para votar o acordo com o DOJ (Departamento de Justiça Americano). Esse evento demonstrou na prática o poder da Assembleia em decidir sobre acordos bilionários que afetam o futuro da companhia por décadas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-[10px] uppercase font-bold text-amber-400">Ponto Chave</span>
                <p className="text-lg mt-1">Soberania da Assembleia em transações críticas.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-[10px] uppercase font-bold text-amber-400">Transparência</span>
                <p className="text-lg mt-1">Divulgação massiva de informações prévias.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-[10px] uppercase font-bold text-amber-400">Resultado</span>
                <p className="text-lg mt-1">Aprovação por ampla maioria dos votos.</p>
              </div>
            </div>
          </div>
        </div>









        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é a frequência MÍNIMA de reuniões da Assembleia Geral conforme Lei 13.303?"
          alternativas={[
              { letra: "A", texto: "A", correta: false },
              { letra: "B", texto: "Mensalmente.", correta: false },
              { letra: "C", texto: "B", correta: true },
              { letra: "D", texto: "Trimestralmente.", correta: false },
              { letra: "E", texto: "C", correta: false },
              { letra: "F", texto: "Uma vez por ano (obrigatória) + extraordinárias quando necessário.", correta: false },
              { letra: "G", texto: "D", correta: false },
              { letra: "H", texto: "Raramente; pode ficar anos sem se reunir.", correta: false },
              { letra: "I", texto: "E", correta: false },
              { letra: "J", texto: "Lei 13.303 não exige nenhuma reunião específica.", correta: false }
            ]}
          dicaEstrategica="Transparência obrigatória."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Lei 13.303: Assembleia ordinária anual (até 120 dias após encerramento do exercício) para aprova de contas." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Assembleias extraordinárias conforme necessidade." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={5}
          variant={getBannerVariant(5)}
          video={{
            videoId: "9HnS-2vX060",
            title: "Funcionamento das Assembleias",
            duration: "11:15"
          }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Roteiro da AGO", type: "infographic", placeholderColor: "amber" },
              { title: "Tabela de Quóruns", type: "table", placeholderColor: "orange" }
            ]
          }}
          sinteseEstrategica={{
            title: "Regra das 4 Letras: AGOA",
            content: (
              <div className="space-y-2">
                <p>O que a AGO faz obrigatoriamente?</p>
                <div className="space-y-1 font-mono text-lg">
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

                <QuizInterativo
          questoes={getQuiz("modulo-5")}
          titulo="QUIZ: Assembleia Geral de Acionistas"
          numero={6}
          variant={getBannerVariant(5)}
          onComplete={(score) => handleModuleComplete("modulo-5", score)}
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 6 ==================== */}
      {activeTab === "modulo-6" && (
      <TabsContent value="modulo-6" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={6}
          titulo="Conselho de Administração"
          descricao="O guardião da estratégia: composição, requisitos e vedações da Lei das Estatais."
          variant={getBannerVariant(6)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Conselho de Administração: Estrutura e Competências"
            description="Quem senta na mesa das decisões? Como são escolhidos? Que responsabilidades carregam?"
            variant="cyan"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Conselho de Administração</strong> é a "ponte" entre acionistas (via Assembleia) e gerência (Diretoria). Eleito pela Assembleia, o Conselho tem
              competências de <strong>supervisão estratégica, aprovação de investimentos e monitoramento de riscos</strong>. Na Petrobras, o Conselho é obrigatório (Lei 13.303)
              e tem entre 7 e 11 membros (sendo pelo menos um representante de empregados e um de acionistas minoritários). Mandatos duram até 2 anos (Lei 13.303).</p>
            <p>Questões sobre o Conselho de Administração focam em sua função de definir diretrizes estratégicas e fiscalizar preventivamente as ações da diretoria.</p>
            <p>A <strong>composição do Conselho</strong> segue regras rigorosas de Lei 13.303: (1) maioria deve ser <strong>conselheiros independentes</strong> (não são executivos,
              não têm conflitos com empresa); (2) pelo menos um representante de empregados (eleito via voto secreto); (3) pelo menos um representante de acionistas minoritários;
              (4) todos devem ter reputação ilibada, competência profissional e disponibilidade. Executivos podem estar no Conselho, mas não devem ser maioria.</p>
            <p>O Conselho de Administração de estatais deve possuir uma cota mínima de membros independentes qualificados para garantir a isenção de julgamentos.</p>
            <p><strong>Competências do Conselho:</strong> (1) aprovar estratégia de longo prazo e planos anuais; (2) aprovar investimentos acima de certo valor;
              (3) nomear/destituir Diretores-Executivos; (4) fiscalizar Diretoria (auditar, questionar, pedir explicações); (5) avaliar risco de corrupção, fraude, conflito de interesse;
              (6) aprovar políticas de compliance, remuneração executiva, relacionamento com stakeholders. O Conselho também ratifica decisões que afetam acionistas minoritários.</p>
            <p>O Conselho de Administração aprova orçamentos corporativos e marcos de investimentos anuais de exploração petrolífera estratégica.</p>
            <p><strong>Vedações e Incompatibilidades:</strong> Lei 13.303 proíbe conselheiros de: (1) ser fornecedor/cliente da empresa (conflito); (2) exercer cargos em concorrentes;
              (3) ter condenação criminal (reputação); (4) ter interesse pecuniário em decisões (conflito). Essas restrições existem para evitar que conselheiros usem a posição para
              benefício próprio em detrimento da empresa. Violações de vedações podem levar a responsabilização civil/criminal.</p>
            <p>A lei veda a nomeação para o conselho de dirigentes sindicais, ocupantes de cargos políticos ou pessoas com conflito de interesses mercantis.</p>
            <p>Neste módulo, você aprenderá a estrutura exata do Conselho da Petrobras, o processo de eleição, as vedações legais, as responsabilidades dos conselheiros,
              e como o Conselho funciona na prática (reuniões, aprovações, documentação). Essencial para entender o controle corporativo em empresas estatais.</p>
            <p>O Conselho de Administração da Petrobras orienta o plano de negócios e zela pela conformidade técnica de investimentos no refino.</p>
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">📊 Conselho de Administração (Lei 13.303)</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Tamanho:</strong> 7-11 membros; Maioria independentes</li>
                <li>✓ <strong>Representação:</strong> 1+ empregado; 1+ minoritário</li>
                <li>✓ <strong>Mandato:</strong> Até 2 anos</li>
                <li>✓ <strong>Competências:</strong> Estratégia, aprovação de investimentos, fiscalização de diretores</li>
                <li>✓ <strong>Vedações:</strong> Conflito de interesse, fornecimento, condenação criminal</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

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
          <ContentAccordion mode="stacked" slides={[
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
                    <ul className="list-disc pl-5 text-lg space-y-2">
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
                    <p className="text-lg bg-muted p-2 rounded italic">"Este ponto é o mais atacado juridicamente e o que mais cai em provas da Cesgranrio."</p>
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

        

        <div className="space-y-8 mt-8">
          <h3 className="text-xl font-bold flex items-center gap-2 text-rose-500">
            <LuShield /> Firewall Institucional
          </h3>
          <p className="text-muted-foreground">O Conselho de Administração não pode ser apenas um espelho do governo; deve ser um escudo.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-rose-500/5 rounded-2xl border border-rose-500/20 space-y-4">
              <h4 className="font-bold flex items-center gap-2"><LuUsers /> Representatividade</h4>
              <p className="text-lg text-muted-foreground">O Art. 19 garante que empregados e acionistas minoritários tenham voz e voto, quebrando o monopólio de decisão do controlador.</p>
            </div>
            <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/20 space-y-4">
              <h4 className="font-bold flex items-center gap-2"><LuLayoutGrid /> Diversidade de Expertise</h4>
              <p className="text-lg text-muted-foreground">Membros devem ter competências complementares em finanças, engenharia de petróleo, direito e gestão de riscos.</p>
            </div>
          </div>
        </div>









        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={6}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é o papel PRINCIPAL do Conselho de Administração em Empresa Estatal?"
          alternativas={[
              { letra: "A", texto: "A", correta: false },
              { letra: "B", texto: "Executar todas as operações da empresa diariamente.", correta: true },
              { letra: "C", texto: "B", correta: false },
              { letra: "D", texto: "Definir estratégia, supervisionar Diretoria, garantir conformidade com Lei 13.303 e melhor interesse da empresa.", correta: false },
              { letra: "E", texto: "C", correta: false },
              { letra: "F", texto: "Aprovar cada transação de compra ou venda da empresa.", correta: false },
              { letra: "G", texto: "D", correta: false },
              { letra: "H", texto: "Substituir Diretoria em qualquer momento.", correta: false },
              { letra: "I", texto: "E", correta: false },
              { letra: "J", texto: "Executar operações financeiras diretas.", correta: false }
            ]}
          dicaEstrategica="Funciona como"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Conselho define política estratégica, supervisiona Diretoria, verifica conformidade." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={6}
          variant={getBannerVariant(6)}
          video={{
            videoId: "3rR_rW0e9A0",
            title: "O Conselho de Administração",
            duration: "14:50"
          }}
          resumoVisual={{
            moduloNome: "Módulo 6",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Checklist de Elegibilidade", type: "infographic", placeholderColor: "rose" },
              { title: "Matriz de Competências", type: "diagram", placeholderColor: "red" }
            ]
          }}
          sinteseEstrategica={{
            title: "Regra do 10-4-36",
            content: (
              <div className="space-y-2 text-lg">
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

                <QuizInterativo
          questoes={getQuiz("modulo-6")}
          titulo="QUIZ: Conselho de Administração"
          numero={7}
          variant={getBannerVariant(6)}
          onComplete={(score) => handleModuleComplete("modulo-6", score)}
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 7 ==================== */}
      {activeTab === "modulo-7" && (
      <TabsContent value="modulo-7" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={7}
          titulo="Diretoria e Conselho Fiscal"
          descricao="A execução técnica e a vigilância financeira: os pilares operacionais da governança."
          variant={getBannerVariant(7)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Diretoria Executiva e Conselho Fiscal"
            description="Quem executa? Quem fiscaliza? Separação clara de responsabilidades."
            variant="cyan"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Diretoria Executiva (ou Diretoria)</strong> é responsável pela <strong>gestão operacional</strong> da Petrobras. Indicada pelo Conselho de Administração,
              a Diretoria implementa as estratégias aprovadas pelo Conselho, toma decisões do dia a dia, e reporta-se ao Conselho regularmente. Na Petrobras, a Diretoria é colegiada
              (múltiplos diretores) e é liderada pelo CEO/Presidente Executivo, que responde pessoalmente perante o Conselho pelos resultados e conformidade.</p>
            <p>A banca exige diferenciar a Diretoria Executiva (órgão de representação ativa) do Conselho Fiscal (órgão fiscalizador permanente de contas).</p>
            <p>Os <strong>Diretores</strong> Lei 13.303 definem como pessoas responsáveis pela representação legal e gestão. Devem ter: (1) reputação ilibada; (2) conhecimento
              específico na área (para diretor de operações, Petróleo; para diretor de finanças, Contabilidade); (3) disponibilidade para o cargo. Diretores assinam <strong>Termo de
              Responsabilidade</strong> confirmando que conhecem Lei 13.303, regras de compliance, conflito de interesse. Violações podem levar a responsabilidade civil/criminal.</p>
            <p>A Diretoria Executiva executa a gestão diária dos negócios sob a liderança do Presidente, prestando contas de metas de desempenho ao conselho.</p>
            <p>O <strong>Conselho Fiscal</strong> é órgão <strong>obrigatório e permanente</strong> em estatais abertas (Petrobras). Diferente do Conselho de Administração (que é
              estratégico), o Fiscal é <strong>especializad em auditoria e conformidade financeira</strong>. Tem 3 a 5 membros, todos independentes (não podem ser administradores há 3 anos).
              A Lei 13.303 exigiu a criação desse órgão para aumentar transparência financeira em estatais.</p>
            <p>O Conselho Fiscal avalia trimestralmente os balancetes contábeis e emite parecer técnico formal a ser submetido à Assembleia de Acionistas.</p>
            <p>As <strong>competências do Conselho Fiscal</strong> são: (1) examinar livros e registros contábeis; (2) verificar funcionamento de controles internos;
              (3) acompanhar auditoria independente; (4) opinião sobre relatórios financeiros; (5) denunciar fraude/irregularidade (obrigação legal). O Conselho Fiscal tem direito de
              acesso irrestrito a documentos, contatos com auditores, e participação em Assembleia (apenas para informar/responder, sem voto).</p>
            <p>Os membros da Diretoria Executiva respondem pessoalmente por atos praticados com manifesto abuso de poder ou violação direta de estatuto de lei.</p>
            <p>Neste módulo, você aprenderá a diferença crucial: Diretoria EXECUTA, Conselho Fiscal FISCALIZA. Essa separação (system of checks and balances) evita que executivos
              façam fraude sem supervisão. Você entenderá as responsabilidades de cada um, obrigações legais, e como funcionam na prática na Petrobras.</p>
            <p>A Diretoria Executiva da Petrobras lidera a implementação operacional do plano estratégico de sustentabilidade e refino em território nacional.</p>
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">⚖️ Diretoria vs Conselho Fiscal</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Diretoria:</strong> Executa, implementa estratégia, toma decisões operacionais</li>
                <li>✓ <strong>Conselho Fiscal:</strong> Fiscaliza, examina contas, denúncia fraude, obrigatório em estatais</li>
                <li>✓ <strong>Independência:</strong> Conselheiros fiscais não podem ter sido administradores há 3 anos</li>
                <li>✓ <strong>Responsabilidade:</strong> Diretores assinam Termo de Responsabilidade (Lei 13.303)</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

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
          <ContentAccordion mode="stacked" slides={[
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
                    <ol className="list-decimal pl-5 text-lg space-y-1">
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
                    <p className="bg-rose-500/10 p-4 rounded text-lg font-bold">"IMPORTANTE: Um dos membros deve ser eleito pelos acionistas minoritários na SEM."</p>
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

        









        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={7}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é a responsabilidade PRINCIPAL da Diretoria Executiva conforme Lei 13.303?"
          alternativas={[
              { letra: "A", texto: "A", correta: false },
              { letra: "B", texto: "Supervisionar o Conselho de Administração.", correta: true },
              { letra: "C", texto: "B", correta: false },
              { letra: "D", texto: "Executar estratégia aprovada pelo Conselho, gerir operações, responder perante Conselho e acionistas.", correta: false },
              { letra: "E", texto: "C", correta: false },
              { letra: "F", texto: "Eleger novos conselheiros.", correta: false },
              { letra: "G", texto: "D", correta: false },
              { letra: "H", texto: "Modificar estatuto da empresa.", correta: false },
              { letra: "I", texto: "E", correta: false },
              { letra: "J", texto: "Aprovar relatórios do Conselho Fiscal.", correta: false }
            ]}
          dicaEstrategica="Responde por violações à Lei 13.303."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Diretoria: órgão executivo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Implementa decisões do Conselho, gerencia dia a dia, reporta resultados." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Presidente é principal executivo." }
          ]}
        />

        <ModuleConsolidation
          index={7}
          variant={getBannerVariant(7)}
          video={{
            videoId: "vXWw_DLo83M",
            title: "Diretoria e Fiscalização",
            duration: "13:20"
          }}
          resumoVisual={{
            moduloNome: "Módulo 7",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Ciclo de Responsabilidade", type: "diagram", placeholderColor: "blue" },
              { title: "Matriz Funcional", type: "table", placeholderColor: "cyan" }
            ]
          }}
          sinteseEstrategica={{
            title: "Fiscal = Cão de Guarda",
            content: (
              <div className="text-center p-4 border-2 border-cyan-500/30 rounded-lg">
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
          titulo="QUIZ: Diretoria e Conselho Fiscal"
          numero={8}
          variant={getBannerVariant(7)}
          onComplete={(score) => handleModuleComplete("modulo-7", score)}
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 8 ==================== */}
      {activeTab === "modulo-8" && (
      <TabsContent value="modulo-8" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={8}
          titulo="Conflito de Interesses e Impedimentos"
          descricao="A ética como pilar da governança: o que a lei proíbe para proteger a estatal."
          variant={getBannerVariant(8)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Conflito de Interesses na Lei 13.303"
            description="Impedimentos, vedações e punições para proteger a integridade corporativa."
            variant="emerald"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Conflito de interesse</strong> é quando um administrador (conselheiro, diretor) tem interesse pessoal que entra em choque com o interesse da empresa.
              Exemplo: um Conselheiro que é sócio de uma fornecedora da Petrobras tem conflito ao votar sobre contratar essa fornecedora. Lei 13.303 proíbe essa situação porque
              o conselheiro tenderia a votar a favor da fornecedora (benefício pessoal) e não pelo melhor para a Petrobras (melhor preço, qualidade).</p>
            <p>Provas abordam a prevenção do conflito de interesses na indicação de administradores públicos e as restrições da Lei das Estatais.</p>
            <p>Lei 13.303 define <strong>impedimentos específicos</strong>: administrador NÃO PODE: (1) participar de deliberação onde tenha interesse pessoal (direto ou indireto);
              (2) usar informação privilegiada para ganho pessoal ou de terceiros (insider trading); (3) aproveitar oportunidade de negócio que conhece pelo cargo; (4) receber
              vantagem de terceiros para favorecer; (5) ter relacionamento de sócios/parentes com fornecedores sem divulgar. Essas proibições protegem a empresa de fraude.</p>
            <p>O conflito de interesses materializa-se quando o dirigente possui relações comerciais, familiares ou associativas com licitantes da companhia.</p>
            <p>O <strong>procedimento correto</strong> é: (1) administrador identifica conflito; (2) divulga para Conselho/Diretoria ("tenho conflito neste assunto"); (3) retira-se da sala
              e não participa nem influencia a deliberação; (4) fato consta na Ata da reunião. A Lei 13.303 exige que a divulgação e recusa de voto conste em registro formal — não é
              opcional, é obrigação legal.</p>
            <p>A exigência de quarentena impede que ex-ministros ou ocupantes de cargos em partidos políticos assumam diretorias de estatais de forma imediata.</p>
            <p><strong>Punições por violação:</strong> Lei 13.303 estabelece responsabilidades civil e administrativa. Administrador que viola pode ser: (1) responsabilizado por perdas
              e danos causados à empresa; (2) obrigado a devolver vantagem recebida indevidamente; (3) destituído do cargo (removido); (4) preso (em casos de fraude/peculato).
              A CVM (Comissão de Valores Mobiliários) fiscaliza rigorosamente conflitos em estatais abertas como Petrobras.</p>
            <p>O comitê de elegibilidade interno verifica a conformidade jurídica dos currículos de todos os candidatos indicados para cargos de liderança.</p>
            <p>Neste módulo, você aprenderá a identificar conflitos de interesse em cenários práticos, entender o procedimento correto de divulgação, reconhecer violações comuns,
              e dominar a jurisprudência de Lei 13.303 sobre conflito. Essencial para qualquer cargo de governança ou supervisão.</p>
            <p>Na Petrobras, conselheiros e diretores assinam termo de confidencialidade e declarações anuais de não-conflito para garantir impessoalidade.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">⚠️ Impedimentos Lei 13.303</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ Participar deliberação com interesse pessoal conflitante</li>
                <li>✓ Usar informação privilegiada (insider trading)</li>
                <li>✓ Aproveitar oportunidade de negócio do cargo</li>
                <li>✓ Receber vantagem indevida de terceiros</li>
                <li>✓ <strong>Procedimento:</strong> Divulgar, retirar-se, constar em Ata</li>
                <li>✓ <strong>Punição:</strong> Responsabilidade civil, destituição, prisão (fraude)</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

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
          <ContentAccordion mode="stacked" slides={[
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
                      <p className="text-lg"><strong>O que deve ser feito?</strong> O diretor deve declarar seu conflito, retirar-se da sala e não participar nem influenciar a deliberação.</p>
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
                    <ul className="list-disc pl-5 text-lg space-y-1">
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

        









        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={8}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é a definição de 'conflito de interesse' conforme Lei 13.303?"
          alternativas={[
              { letra: "A", texto: "A", correta: false },
              { letra: "B", texto: "Qualquer desacordo entre administrador e acionistas.", correta: true },
              { letra: "C", texto: "B", correta: false },
              { letra: "D", texto: "Situação em que administrador tem interesse pessoal/familiar que conflita com dever para com empresa.", correta: false },
              { letra: "E", texto: "C", correta: false },
              { letra: "F", texto: "Quando administrador trabalha em mais de uma empresa.", correta: false },
              { letra: "G", texto: "D", correta: false },
              { letra: "H", texto: "Não existe conflito de interesse em empresa estatal.", correta: false },
              { letra: "I", texto: "E", correta: false },
              { letra: "J", texto: "Lei 13.303 não define conflito de interesse.", correta: false }
            ]}
          dicaEstrategica="Ex: conselheiro votando em contrato com sua própria empresa."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Lei 13.303: conflito de interesse é situação onde dever profissional entra em conflito com interesse pessoal/familiar." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={8}
          variant={getBannerVariant(8)}
          video={{
            videoId: "9HnS-2vX060",
            title: "Ética e Conflito de Interesses",
            duration: "09:45"
          }}
          resumoVisual={{
            moduloNome: "Módulo 8",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Matriz de Conflitos", type: "infographic", placeholderColor: "rose" },
              { title: "Fluxo de Denúncia", type: "diagram", placeholderColor: "red" }
            ]
          }}
          sinteseEstrategica={{
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
          titulo="QUIZ: Conflito de Interesses"
          numero={9}
          variant={getBannerVariant(8)}
          onComplete={(score) => handleModuleComplete("modulo-8", score)}
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 9 ==================== */}
      {activeTab === "modulo-9" && (
      <TabsContent value="modulo-9" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={9}
          titulo="Lei 13.303 na Petrobras"
          descricao="Estudo de caso real: como o estatuto da maior estatal brasileira reflete a lei."
          variant={getBannerVariant(9)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Aplicação Prática na Petrobras"
            description="Da lei para a realidade corporativa: como Lei 13.303 funciona no dia a dia da maior empresa brasileira."
            variant="emerald"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A Petrobras é a <strong>maior empresa brasileira e uma das maiores do mundo</strong> em capitalização. Como Sociedade de Economia Mista federal, ela está 100% submetida
              à Lei 13.303. Seu <strong>Estatuto Social</strong> (documento máster de governança) incorpora todas as exigências da lei e as detalha em 10 artigos específicos. Entender
              Lei 13.303 é entender o funcionamento real da Petrobras.</p>
            <p>Questões sobre a Petrobras focam no seu modelo de integridade corporativa pós-Lei das Estatais e na fiscalização exercida pelo TCU.</p>
            <p>A <strong>estrutura de governança da Petrobras</strong> segue Lei 13.303: (1) Assembleia Geral (acionistas) — acontece anualmente em maio para aprovar contas e eleger
              Conselho; (2) Conselho de Administração — 9 membros (incluindo 1 representante de empregados, 1 de minoritários, 1 presidente independente); (3) Diretoria Executiva —
              5 diretores+ CEO, todos indicados pelo Conselho; (4) Conselho Fiscal — 3-5 auditores permanentes. Essa estrutura garante controle e transparência.</p>
            <p>A governança da Petrobras integra canais de denúncia externos e independentes com investigações internas corporativas rápidas de SMS.</p>
            <p>A Petrobras mantém <strong>Comitês de Apoio</strong> ao Conselho: Auditoria (supervisor de riscos financeiros), Gestão de Pessoas (remuneração/compliance), Estratégia
              (planos de longo prazo), Finanças (orçamento anual). Esses comitês ajudam o Conselho a direcionar a empresa complexa (centenas de plataformas, refinarias, terminais globais).
              Lei 13.303 não exige Comitês explicitamente, mas empresas grandes como Petrobras os criam para eficiência.</p>
            <p>A comissão de integridade avalia preventivamente todas as propostas comerciais de fornecimento estratégico para afastar riscos legais.</p>
            <p>Um ponto crítico é o <strong>Programa Petrobras Integra</strong> — programa de compliance (conformidade com leis). Lei 13.303 exige que estatais tenham canais de denúncia,
              treinamento anticorrupção, investigação de irregularidades. Petrobras Integra é um dos mais robustos do mundo: denúncias anônimas, investigação independente, proteção ao denunciante,
              relatório público anual. Isso protege a empresa de fraude e atrai investidores (confiança).</p>
            <p>O plano de integridade da estatal monitora a transparência em licitações e atesta a conformidade das contratações de engenharia submarina.</p>
            <p>Neste módulo, você estudará o Estatuto Social real da Petrobras, casos de controversias (conflito de interesse, voto de acionista minoritário, indicação de conselheiro),
              decisões reais de Assembleia e Conselho, e como Lei 13.303 funciona na prática. Será essencial para responder questões CESGRANRIO que citam contextos da Petrobras.</p>
            <p>A Petrobras divulga relatórios periódicos de sustentabilidade e governança para manter acionistas minoritários e o TCU informados de seus riscos.</p>
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">🏢 Petrobras: Modelo de Lei 13.303</span>
              <ul className="text-lg space-y-1 text-foreground">
                <li>✓ <strong>Assembleia Geral:</strong> Maio, aprova contas e elege Conselho</li>
                <li>✓ <strong>Conselho Admin:</strong> 9 membros; presidente independente; representantes empregados/minoritários</li>
                <li>✓ <strong>Diretoria:</strong> CEO + 5 diretores; reportam ao Conselho</li>
                <li>✓ <strong>Conselho Fiscal:</strong> 3-5 auditores; supervisa finanças permanentemente</li>
                <li>✓ <strong>Programa Integra:</strong> Compliance, denúncias anônimas, investigação independente</li>
              </ul>
            </div>
          
          
          
          </div>
        </section>

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
          <ContentAccordion mode="stacked" slides={[
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
                    <ol className="list-decimal pl-5 text-lg space-y-1">
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
                    <p className="p-2 border border-border rounded text-lg">"Mencione sempre o Nível 2 de Governança Corporativa da B3 como diferencial da Petrobras."</p>
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

        

        <div className="space-y-12 mt-12 bg-cyan-500/5 p-8 rounded-3xl border border-cyan-500/10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
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
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-lg font-bold text-cyan-300">
                    {tag.icon} {tag.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-64 h-64 bg-cyan-500/10 rounded-2xl flex items-center justify-center p-6 border border-cyan-500/20 shadow-2xl shadow-cyan-500/20">
              <div className="text-center space-y-3">
                <LuLock className="text-6xl text-cyan-400 mx-auto" />
                <p className="text-[10px] uppercase font-bold tracking-tighter text-cyan-300">Selagem de Segurança</p>
              </div>
            </div>
          </div>
        </div>









        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={9}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Como Lei 13.303 é aplicada em contexto ESPECÍFICO da Petrobras?"
          alternativas={[
              { letra: "A", texto: "A", correta: false },
              { letra: "B", texto: "Petrobras não precisa cumprir Lei 13.303.", correta: true },
              { letra: "C", texto: "B", correta: false },
              { letra: "D", texto: "Petrobras (empresa pública federal) segue rigorosamente Lei 13.303 em governança, estrutura de órgãos sociais, divulgação de informações.", correta: false },
              { letra: "E", texto: "C", correta: false },
              { letra: "F", texto: "Apenas parcialmente; particularidades de petróleo justificam exceções.", correta: false },
              { letra: "G", texto: "D", correta: false },
              { letra: "H", texto: "Lei 13.303 é supletiva; Petrobras pode ignorar.", correta: false },
              { letra: "I", texto: "E", correta: false },
              { letra: "J", texto: "Petrobras tem Lei própria que substitui Lei 13.303.", correta: false }
            ]}
          dicaEstrategica="Exemplar em governança corporativa."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Petrobras é empresa pública federal que cumpre Lei 13.303." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Tem Assembleia Geral, Conselho de Administração eleito democraticamente, Diretoria, Conselho Fiscal." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={9}
          variant={getBannerVariant(9)}
          video={{
            videoId: "m9k8l7",
            title: "Petrobras e Governanca",
            duration: "15:10"
          }}
          resumoVisual={{
            moduloNome: "Módulo 9",
            tituloAula: "Lei 13.303",
            materia: "Administração",
            images: [
              { title: "Timeline de Evolução", type: "visual_summary", placeholderColor: "amber" },
              { title: "Arquitetura de Controle", type: "diagram", placeholderColor: "orange" }
            ]
          }}
          sinteseEstrategica={{
            title: "Petrobras = 303 x 404",
            content: (
              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <p className="text-lg">A Petrobras é a maior aplicação prática da **Lei 13.303** operando nos trilhos da **Lei 6.404**.</p>
              </div>
            )
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            titulo: "Podcast: O Case Petrobras",
            artista: "Analista de Mercado"
          }}
        />

                <QuizInterativo
          questoes={getQuiz("modulo-9")}
          titulo="QUIZ: Lei 13.303 na Petrobras"
          numero={10}
          variant={getBannerVariant(9)}
          onComplete={(score) => handleModuleComplete("modulo-9", score)}
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 10 ==================== */}
      {activeTab === "modulo-10" && (
      <TabsContent value="modulo-10" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={10}
          titulo="Simulado Geral"
          descricao="Teste final integrado com o padrão Cesgranrio."
          variant={getBannerVariant(10)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Simulado Geral: Lei 13.303 Integrada"
            description="Consolidação de todos os 9 módulos em questões CESGRANRIO autênticas."
            variant="amber"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Você completou 9 módulos de Lei 13.303: conceitos fundamentais, empresa estatal, direitos de acionista, órgãos de governança, assembleia, conselho de administração,
              diretoria/fiscal, conflito de interesse, e aplicação na Petrobras. Agora é hora de <strong>consolidar tudo</strong> em um <strong>Simulado Geral</strong> que reflete
              o padrão de questões CESGRANRIO reais.
            </p>
            <p>
              Este simulado contém <strong>8 questões diversas</strong>, cada uma testando múltiplos módulos simultaneamente. Uma questão pode começar perguntando sobre a competência
              da Assembleia (M5), evoluir para um cenário de conflito de interesse de conselheiro (M8), e terminar perguntando o procedimento correto (Petrobras M9). Essa integração
              é exatamente como aparecem nas provas reais — Lei 13.303 não é testada em compartimentos estanques.
            </p>
            <p>
              <strong>Dicas para o Simulado:</strong> (1) Leia a questão 2 vezes — primeira para entender contexto, segunda para sublinhar o que é perguntado; (2) Identifique qual
              módulo é o NÚCLEO da questão (governança de SEM? Conflito de interesse? Direitos minoritários?); (3) Procure no seu conhecimento do módulo correspondente; (4) Verifique
              a resposta contra a Lei 13.303 (não apenas intuição); (5) Reflita em casos práticos Petrobras para validar.
            </p>
            <p>
              <strong>Mínimo de 75% (6 de 8)</strong> indica que você dominou Lei 13.303 adequadamente para o concurso. Abaixo disso, revise os módulos onde errou (há links de
              consolidação no feedback). Acima de 90%? Você está pronto para questões de Lei 6.404 (Lei Geral de S.A.) e combinações Lei 13.303 + RLCP (licitações).
            </p>
            <p>
              Um último detalhe: Lei 13.303 é <strong>lei complementar</strong> à Lei 6.404 (Lei das Sociedades Anônimas). Questões CESGRANRIO frequentemente misturam as duas leis.
              Lei 6.404 é a base (definições gerais de S.A.), Lei 13.303 é a especialidade (regras específicas para estatais). Você aprenderá essa integração ao resolver este simulado.
            </p>

            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
              <p className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">👑 Simulado Geral: 5-Step Strategy</p>
              <ol className="text-lg space-y-1 text-foreground list-decimal list-inside">
                <li><strong>Leia 2x:</strong> Contexto na primeira; Pergunta na segunda</li>
                <li><strong>Identifique módulo-núcleo:</strong> Qual conceito (M1-M9) é central?</li>
                <li><strong>Resolva em lei:</strong> Procure em Lei 13.303 (não adivinhe)</li>
                <li><strong>Valide em Petrobras:</strong> A resposta faz sentido na empresa?</li>
                <li><strong>Confira alternativas:</strong> Qual melhor reflete Lei 13.303?</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A Lei 13.303/2016 disciplina o funcionamento de empresas públicas e de economia mista. Qual é o seu objetivo PRINCIPAL?"
          alternativas={[
            { label: "A", valor: "Substituir completamente a Lei 6.404/76 para todas as sociedades anônimas." },
                { label: "B", valor: "Estabelecer regras de governança corporativa, garantindo eficiência, transparência e respeito aos acionistas em empresas estatais." },
                { label: "C", valor: "Eliminar a necessidade de Conselho de Administração nas empresas públicas." },
                { label: "D", valor: "Privatizar todas as empresas do setor público brasileiro." },
                { label: "E", valor: "Impedir que acionistas privados participem de economia mista." }
          ]}
          correta="B"
          passos={[
            "Lei 13.303 estabelece normas específicas de governança para estatais: transparência, conformidade, responsabilidade.",
            "Petrobras segue rigorosamente estas normas.",
            "Gabarito confirmado."
          ]}
        />
        <QuizInterativo
          questoes={getQuiz("modulo-10")}
          titulo="QUIZ: Simulado Geral"
          numero={11}
          variant={getBannerVariant(10)}
          onComplete={(score) => handleModuleComplete("modulo-10", score)}
        />
      </TabsContent>
      )}
    </AulaTemplate>
  );
}
