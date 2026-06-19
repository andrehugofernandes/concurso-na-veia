"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  ModuleConsolidation,
  CardCarousel,
  QuestaoResolvidaStepByStep} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import {
  LuBookOpen,
  LuCalculator,
  LuFileText,
  LuTrendingUp,
  LuScale,
  LuBriefcase,
  LuShield,
  LuTriangle,
  LuCircleCheck,
  LuBuilding,
  LuCrown,
  LuTriangleAlert,
} from "react-icons/lu";

const MODULE_DEFS = [
  { id: "modulo-1",  label: "Módulo 1",  title: "Contabilidade Básica" },
  { id: "modulo-2",  label: "Módulo 2",  title: "Estrutura Contábil" },
  { id: "modulo-3",  label: "Módulo 3",  title: "Tributos: Conceitos e Sistema" },
  { id: "modulo-4",  label: "Módulo 4",  title: "ICMS e IPI" },
  { id: "modulo-5",  label: "Módulo 5",  title: "Impostos de Renda (IR/CSLL)" },
  { id: "modulo-6",  label: "Módulo 6",  title: "Contribuições Sociais (PIS/COFINS)" },
  { id: "modulo-7",  label: "Módulo 7",  title: "Administração Tributária" },
  { id: "modulo-8",  label: "Módulo 8",  title: "Planejamento Tributário" },
  { id: "modulo-9",  label: "Módulo 9",  title: "Tributos na Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
] as const;

export default function AulaAdministrativoTributario(props: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_administrativo_tributario_";

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

  

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
      props.onUpdateProgress?.(Math.round((nextCompleted.size / MODULE_DEFS.length) * 100));
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)

  const mv = Object.fromEntries(

    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])

  ) as Record<number, ReturnType<typeof getModuleVariant>>;


  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Administrativo e Tributário"
      descricao="Contabilidade básica, direito tributário e administração tributária para Técnico de Suprimento."
      duracao="3h 30min"
      materiaNome={props.materiaNome}
      materiaCor={props.materiaCor}
      materiaId={props.materiaId}
      isCompleted={completedModules.has("modulo-10")}
      currentProgress={Math.round((completedModules.size / MODULE_DEFS.length) * 100)}
      onComplete={() => props.onUpdateProgress?.(100)}
    >
      {/* ═══════════════════════════════════════════════════════
          MÓDULO 1 — Contabilidade Básica
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={1}
          titulo="Contabilidade Básica"
          descricao="Equação contábil, demonstrações financeiras e princípios contábeis fundamentais."
          variant="blue"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Princípios Fundamentais da Contabilidade"
            description="Equação contábil, demonstrações financeiras e papel no ambiente empresarial."
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Contabilidade</strong> é a ciência que identifica, mensura, registra e comunica informações econômico-financeiras sobre entidades, permitindo que usuários internos e externos tomem decisões
              fundamentadas. Seu objeto são os <em>fenômenos patrimoniais</em> — variações qualitativas e quantitativas que ocorrem no patrimônio de uma entidade ao longo do tempo. No contexto da Petrobras,
              empresa com receita bruta superior a R$ 500 bilhões anuais, a contabilidade é o alicerce de todas as decisões estratégicas, desde investimentos em exploração de petróleo até o pagamento de dividendos
              aos acionistas.</p>
            <p>Questões de exames exigem domínio das equações patrimoniais clássicas. Bens e direitos constituem Ativos; as obrigações compõem Passivo e Patrimônio Líquido.</p>
            <p>A <strong>Equação Fundamental da Contabilidade</strong> expressa matematicamente a estrutura patrimonial de qualquer empresa:
              <strong> Ativo = Passivo + Patrimônio Líquido</strong>. O <em>Ativo</em> representa tudo que a empresa <strong>possui</strong> (bens e direitos com valor econômico): caixa, estoques, máquinas,
              créditos a receber. O <em>Passivo</em> representa o que a empresa <strong>deve</strong> a terceiros: fornecedores, empréstimos bancários, salários a pagar. O <em>Patrimônio Líquido (PL)</em>
              é a diferença — o que sobra para os proprietários após quitar todas as dívidas. Toda transação contábil mantém essa equação em equilíbrio, sem exceções.</p>
            <p>A contabilidade básica apoia a administração ao registrar e interpretar de forma cronológica as movimentações econômicas de bens.</p>
            <p>As três <strong>demonstrações financeiras principais</strong> são: (1) <strong>Balanço Patrimonial (BP)</strong> — "fotografia" do patrimônio em data específica, listando todos os Ativos,
              Passivos e PL; (2) <strong>Demonstração do Resultado do Exercício (DRE)</strong> — "filme" do desempenho no período, mostrando Receita Bruta, deduções, custos, despesas e Lucro Líquido;
              (3) <strong>Demonstração dos Fluxos de Caixa (DFC)</strong> — mostra entradas e saídas efetivas de dinheiro, separadas em atividades operacionais, de investimento e de financiamento.
              A Petrobras, por ser companhia aberta, publica essas demonstrações trimestralmente para o mercado.</p>
            <p>A aquisição de matérias-primas e insumos industriais com pagamento faturado gera o registro de débito em Ativo e crédito correspondente em Passivo.</p>
            <p>Os <strong>Princípios Contábeis</strong> fundamentais (CFC NBC TG ESTRUTURA CONCEITUAL) incluem: <em>Entidade</em> (patrimônio da empresa é separado do patrimônio dos sócios);
              <em>Continuidade</em> (empresa opera indefinidamente, a não ser que haja evidência contrária); <em>Oportunidade</em> (registros devem ser feitos no momento do fato gerador);
              <em>Registro pelo valor original</em> (ativos registrados pelo custo de aquisição); <em>Competência</em> (receitas e despesas reconhecidas no período em que ocorrem, independente do caixa).
              A CESGRANRIO cobra especialmente o <strong>Princípio da Competência</strong> vs. Regime de Caixa.</p>
            <p>Os fatos contábeis classificam-se em permutativos, modificativos (que alteram o valor total de patrimônio líquido) ou fatos mistos.</p>
            <p>A <strong>CESGRANRIO costuma cobrar</strong> questões sobre: identificar o tipo de demonstrativo (BP, DRE ou DFC) a partir de descrição, calcular o PL dado Ativo e Passivo,
              distinguir Princípio da Competência do Regime de Caixa, e classificar elementos como Ativo Circulante vs. Não-Circulante. Candidatos frequentemente erram ao confundir "Ativo" com "dinheiro"
              — Ativo inclui todo bem ou direito com valor econômico, não apenas caixa.</p>
            <p>As demonstrações financeiras oficiais da Petrobras seguem o padrão IFRS para satisfazer exigências legais do mercado de capitais.</p>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-xl border border-amber-200 dark:border-amber-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg uppercase tracking-wide">Equação Fundamental + Demonstrativos</h4>
              <div className="grid md:grid-cols-3 gap-4 text-lg">
                <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4">
                  <span className="font-bold text-amber-700 dark:text-amber-300 mb-2">ATIVO = PASSIVO + PL</span>
                  <span className="text-foreground/80">Toda transação mantém essa equação equilibrada. Sempre.</span>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4">
                  <span className="font-bold text-amber-700 dark:text-amber-300 mb-2">BP — Balanço Patrimonial</span>
                  <span className="text-foreground/80">Foto estática: o que a empresa tem e deve em uma data.</span>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4">
                  <span className="font-bold text-amber-700 dark:text-amber-300 mb-2">DRE — Resultado</span>
                  <span className="text-foreground/80">Receita − Custos − Despesas = Lucro Líquido (período).</span>
                </div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="C.E.D.E. — Contabilidade Básica" variant="blue" />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação",
                icone: <LuBookOpen />,

                conteudo: (
                  <div className="space-y-3 text-lg">
                    <p><strong>Contabilidade</strong> é a ciência dos fenômenos patrimoniais. Equação: <strong>Ativo = Passivo + PL</strong>.</p>
                    <p>Três demonstrativos: <strong>BP</strong> (foto patrimonial), <strong>DRE</strong> (resultado do período), <strong>DFC</strong> (fluxo de caixa).</p>
                    <p>Princípio da <strong>Competência</strong>: receitas/despesas reconhecidas quando ocorrem, não quando o dinheiro entra/sai.</p>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação",
                icone: <LuCalculator />,
                conteudo: (
                  <div className="space-y-3 text-lg">
                    <p><strong>Petrobras em 31/12/2024:</strong> Ativo Total = R$ 800 bi. Passivo Total = R$ 500 bi. PL = R$ 300 bi. ✓ Equação balanceada.</p>
                    <p><strong>DRE 2024:</strong> Receita R$ 520 bi − Custos R$ 320 bi − Despesas R$ 80 bi = Lucro R$ 120 bi.</p>
                    <p><strong>Competência vs. Caixa:</strong> Petrobras vende petróleo em dezembro, recebe em janeiro. Pela Competência, reconhece receita em dezembro. Pelo Caixa, só em janeiro.</p>
                  </div>
                ),
              },
              {
                titulo: "Dicas",
                icone: <LuTrendingUp />,
                conteudo: (
                  <div className="space-y-3 text-lg">
                    <p>🎯 <strong>PL = Ativo − Passivo.</strong> Se a questão der dois dos três, calcule o terceiro.</p>
                    <p>🎯 BP = <strong>data específica</strong> (31/12). DRE = <strong>período</strong> (ano, trimestre).</p>
                    <p>🎯 Petrobras adota <strong>IFRS</strong> (normas internacionais) + CPC. A CESGRANRIO cobra o Princípio da Competência com frequência.</p>
                  </div>
                ),
              },
              {
                titulo: "Exceções (pontos de atenção CESGRANRIO)",
                icone: <LuTriangle />,
                conteudo: (
                  <div className="space-y-3 text-lg">
                    <p>⚠️ <strong>Depreciação</strong> é despesa mas NÃO é saída de caixa — aparece na DRE mas não na DFC operacional direta.</p>
                    <p>⚠️ <strong>Lucro ≠ Caixa.</strong> Empresa lucrativa pode ter caixa negativo (vendas a prazo, estoque alto).</p>
                    <p>⚠️ <strong>Ativo Intangível</strong> (marcas, patentes, software) É Ativo — mesmo sem forma física, tem valor econômico.</p>
                  </div>
                ),
              },
            ]}
          />
        </div>

        

<ModuleConsolidation
          index={3}
          variant="blue"
          video={{ videoId: "h3S9XW1WzIk", title: "Fundamentos Contábeis — Equação e Demonstrativos", duration: "12:00" }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Contabilidade Básica",
            materia: "Administração",
            images: [
              { title: "Equação Contábil A = P + PL", type: "Fórmula", placeholderColor: "bg-amber-500/20" },
              { title: "BP / DRE / DFC", type: "Comparativo", placeholderColor: "bg-amber-500/20" },
            ],
          }}
          sinteseEstrategica={{
            title: "Macete: APP",
            content: (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                <p className="font-bold text-amber-600 dark:text-amber-400 text-lg">A = P + PL → "APaulo Presta atenção ao PL"</p>
                <p className="text-lg text-foreground/70">BP = foto (data). DRE = filme (período). DFC = dinheiro real.</p>
              </div>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Áudio: Contabilidade Básica", artista: "Resumo Petrobras" }}
        />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={[
            { id: "m1q1", pergunta: "A equação fundamental da contabilidade é:", opcoes: [{ label: "Ativo = Passivo + Patrimônio Líquido", valor: "a" }, { label: "Receita = Custos + Despesas + Lucro", valor: "b" }, { label: "Caixa = Ativo Circulante − Passivo Circulante", valor: "c" }, { label: "Patrimônio Líquido = Ativo + Passivo", valor: "d" }], correta: "a", explicacao: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { id: "m1q2", pergunta: "O Balanço Patrimonial (BP) representa:", opcoes: [{ label: "O resultado (lucro/prejuízo) de um período", valor: "a" }, { label: "A posição patrimonial em uma data específica", valor: "b" }, { label: "O fluxo de caixa do exercício", valor: "c" }, { label: "A variação do Patrimônio Líquido", valor: "d" }], correta: "b", explicacao: "O BP é uma 'foto' do patrimônio em data específica. Já a DRE mostra o desempenho de um período." },
            { id: "m1q3", pergunta: "Pelo Princípio da Competência, a Petrobras deve reconhecer uma receita de venda de petróleo:", opcoes: [{ label: "Quando o dinheiro da venda entrar no caixa", valor: "a" }, { label: "Quando a venda for realizada, independente do recebimento", valor: "b" }, { label: "Apenas após emissão da nota fiscal", valor: "c" }, { label: "No encerramento do exercício social", valor: "d" }], correta: "b", explicacao: "Pelo Princípio da Competência, receitas são reconhecidas quando o fato gerador ocorre (venda realizada), não quando o caixa é recebido." },
            { id: "m1q4", pergunta: "Se o Ativo Total da Petrobras é R$ 800 bi e o Passivo Total é R$ 500 bi, o Patrimônio Líquido é:", opcoes: [{ label: "R$ 1.300 bilhões", valor: "a" }, { label: "R$ 300 bilhões", valor: "b" }, { label: "R$ 500 bilhões", valor: "c" }, { label: "Não é possível calcular", valor: "d" }], correta: "b", explicacao: "PL = Ativo − Passivo = R$ 800 bi − R$ 500 bi = R$ 300 bi. A equação A = P + PL permite isolar qualquer elemento." },
          ]}
          titulo="QUIZ: Módulo Nº 1"
          numero={4}
          variant="blue"
          icone="📊"
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 2 — Estrutura Contábil
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={2}
          titulo="Estrutura Contábil"
          descricao="Partidas dobradas, plano de contas, débito e crédito — o mecanismo técnico do registro."
          variant="blue"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" title="Sistema de Partidas Dobradas" description="Como toda transação é registrada: débito, crédito, equilíbrio permanente." variant="blue" />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Sistema de Partidas Dobradas</strong> (Double-Entry Bookkeeping), criado por Luca Pacioli em 1494, é a base técnica da contabilidade moderna. O princípio é simples e absoluto:
              <strong> toda transação financeira afeta PELO MENOS DUAS contas</strong>, sempre com o total de débitos igual ao total de créditos. Isso garante que a equação A = P + PL nunca se desequilibre.
              Na Petrobras, cada um dos milhares de lançamentos diários — desde pagamento de salário a operadores até compra de plataformas offshore — segue essa regra sem exceção.</p>
            <p>A banca exige associar lançamentos às suas respectivas demonstrações fiscais regulamentadas: Balanço Patrimonial e DRE anual.</p>
            <p><strong>Débito e Crédito</strong> não são "bom e ruim" — são simplesmente <em>lados opostos</em> do lançamento contábil. As regras variam por tipo de conta:
              Para <strong>Contas de Ativo</strong>: Débito = aumenta, Crédito = diminui.
              Para <strong>Contas de Passivo e PL</strong>: Débito = diminui, Crédito = aumenta.
              Para <strong>Contas de Despesa</strong>: Débito = aumenta (reduz o PL).
              Para <strong>Contas de Receita</strong>: Crédito = aumenta (aumenta o PL).
              Memorize: <em>Ativos e Despesas ficam à esquerda (D), Passivos, PL e Receitas ficam à direita (C)</em>.</p>
            <p>A escrituração do livro Diário e do livro Razão permite consolidar balancetes de verificação periódicos fundamentais para auditorias.</p>
            <p>O <strong>Plano de Contas (Chart of Accounts)</strong> é a lista estruturada e numerada de todas as contas que uma empresa utiliza. A Petrobras tem um CoA próprio com milhares de contas,
              organizadas hierarquicamente: Classe 1 (Ativo), Classe 2 (Passivo), Classe 3 (PL), Classe 4 (Receitas), Classe 5 (Custos e Despesas). Cada transação deve ser registrada nas contas
              específicas do CoA, garantindo padronização, rastreabilidade e facilidade de auditoria.</p>
            <p>O fechamento de período contábil transfere saldos de contas de despesas e receitas para apuração da conta de resultado de exercício.</p>
            <p>Os <strong>Razonetes (T-Accounts)</strong> são representações gráficas em formato de "T" utilizadas para visualizar o saldo de uma conta específica ao longo do tempo. O lado esquerdo
              do T registra os débitos, o lado direito registra os créditos. O saldo final é a diferença entre a soma dos débitos e a soma dos créditos. Essa ferramenta é fundamental em estudos contábeis
              para rastrear como uma conta evolui ao longo de múltiplas transações.</p>
            <p>Demonstrações obrigatórias como a DRE determinam o lucro líquido com a dedução ordenada de despesas operacionais e tributos incidentes.</p>
            <p>A <strong>CESGRANRIO costuma cobrar</strong>: identificar o lançamento contábil correto para uma transação descrita, reconhecer quais contas são debitadas e creditadas, e calcular o saldo
              final de um razonete após múltiplos lançamentos. Candidatos frequentemente erram ao inverter as regras de débito/crédito para Passivos — lembre: em Passivo, <em>crédito aumenta</em>.</p>
            <p>Almoxarifados da Petrobras lançam eletronicamente os dados de entrada de insumos no sistema SAP ERP com reflexos contábeis imediatos.</p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg uppercase tracking-wide">Regras de Débito e Crédito</h4>
              <div className="grid md:grid-cols-2 gap-4 text-lg">
                <div className="space-y-2">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Débito aumenta (D+):</span>
                  <ul className="space-y-1 text-foreground/80 list-disc list-inside">
                    <li>Contas de Ativo</li>
                    <li>Contas de Despesa e Custo</li>
                    <li>Dividendos / Distribuições</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Crédito aumenta (C+):</span>
                  <ul className="space-y-1 text-foreground/80 list-disc list-inside">
                    <li>Contas de Passivo</li>
                    <li>Patrimônio Líquido</li>
                    <li>Contas de Receita</li>
                  </ul>
                </div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="C.E.D.E. — Partidas Dobradas" variant="blue" />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação",
                icone: <LuBookOpen />,

                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p>Toda transação: <strong>Total Débitos = Total Créditos</strong>. Equação sempre balanceada.</p>
                    <p>Plano de Contas (CoA): lista hierárquica. Classes 1-5 (Ativo, Passivo, PL, Receita, Despesa).</p>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação",
                icone: <LuCalculator />,
                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p><strong>Petrobras paga salários R$ 10M:</strong> D: Despesa de Pessoal +10M / C: Caixa −10M.</p>
                    <p><strong>Petrobras recebe empréstimo R$ 50M:</strong> D: Caixa +50M / C: Empréstimos a Pagar +50M.</p>
                    <p><strong>Petrobras vende petróleo R$ 100M à vista:</strong> D: Caixa +100M / C: Receita de Vendas +100M.</p>
                  </div>
                ),
              },
              {
                titulo: "Dicas",
                icone: <LuTrendingUp />,
                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p>🎯 Memorize o acrônimo <strong>DEAD CLIC</strong>: Débito = Expenses, Assets, Dividends. Crédito = Liabilities, Income, Capital.</p>
                    <p>🎯 Verifique sempre: Total D = Total C. Se não bater, há erro no lançamento.</p>
                  </div>
                ),
              },
              {
                titulo: "Exceções (pontos de atenção CESGRANRIO)",
                icone: <LuTriangle />,
                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p>⚠️ <strong>Conta retificadora</strong> (ex: Depreciação Acumulada) funciona ao contrário — fica no Ativo mas aumenta a Crédito.</p>
                    <p>⚠️ <strong>Provisão para Devedores Duvidosos</strong>: débita Despesa, credita conta retificadora de Ativo (não é Passivo).</p>
                  </div>
                ),
              },
            ]}
          />
        </div>

        

<ModuleConsolidation
          index={3}
          variant="blue"
          video={{ videoId: "9bZkp7q19f0", title: "Partidas Dobradas — Débito e Crédito na Prática", duration: "9:30" }}
          resumoVisual={{ moduloNome: "Módulo 2", tituloAula: "Estrutura Contábil", materia: "Administração", images: [{ title: "T-Account / Razonete", type: "Estrutura", placeholderColor: "bg-blue-500/20" }, { title: "Regras D/C por Conta", type: "Tabela", placeholderColor: "bg-blue-500/20" }] }}
          sinteseEstrategica={{ title: "DEAD CLIC", content: (<div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-1 text-lg"><p className="font-bold text-blue-600 dark:text-blue-400">D→ Expenses, Assets, Dividends</p><p className="font-bold text-blue-600 dark:text-blue-400">C→ Liabilities, Income, Capital</p></div>) }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", titulo: "Áudio: Débito e Crédito", artista: "Resumo Petrobras" }}
        />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={[
            { id: "m2q1", pergunta: "Em uma conta de Ativo, um lançamento a Débito representa:", opcoes: [{ label: "Aumento do saldo", valor: "a" }, { label: "Diminuição do saldo", valor: "b" }, { label: "Anulação do saldo", valor: "c" }, { label: "Transferência para Passivo", valor: "d" }], correta: "a", explicacao: "Em contas de Ativo, Débito = aumento. Crédito = diminuição. Regra inversa vale para Passivo e PL." },
            { id: "m2q2", pergunta: "A Petrobras contrai um empréstimo bancário de R$ 200 milhões. O lançamento correto é:", opcoes: [{ label: "D: Empréstimos a Pagar / C: Caixa", valor: "a" }, { label: "D: Caixa / C: Empréstimos a Pagar", valor: "b" }, { label: "D: Caixa / C: Receita Financeira", valor: "c" }, { label: "D: Despesa Financeira / C: Caixa", valor: "d" }], correta: "b", explicacao: "Caixa (Ativo) aumenta → Débito. Empréstimos a Pagar (Passivo) aumenta → Crédito. Equação balanceada." },
            { id: "m2q3", pergunta: "O Plano de Contas (CoA) de uma empresa serve para:", opcoes: [{ label: "Calcular o lucro anual da empresa", valor: "a" }, { label: "Listar e organizar todas as contas contábeis utilizadas", valor: "b" }, { label: "Registrar apenas as transações de caixa", valor: "c" }, { label: "Controlar o fluxo de estoque de materiais", valor: "d" }], correta: "b", explicacao: "O CoA é a lista hierárquica de todas as contas, organizadas por classe (Ativo, Passivo, PL, Receita, Despesa), garantindo padronização contábil." },
          ]}
          titulo="QUIZ: Módulo Nº 2"
          numero={4}
          variant="blue"
          icone="📒"
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
        />
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 3 — Tributos: Conceitos e Sistema
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={3}
          titulo="Tributos: Conceitos e Sistema Tributário Nacional"
          descricao="CTN, espécies tributárias, princípios constitucionais e competência tributária."
          variant="blue"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" title="Sistema Tributário Nacional (STN)" description="Base legal: CTN, Constituição Federal, espécies de tributos e princípios." variant="blue" />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Sistema Tributário Nacional (STN)</strong> é o conjunto de normas constitucionais e infraconstitucionais que regulamentam a instituição, arrecadação e fiscalização de tributos no Brasil.
              Sua base é o <strong>Código Tributário Nacional (CTN — Lei nº 5.172/1966)</strong>, recepcionado pela Constituição Federal de 1988 com status de Lei Complementar. O CTN define tributo
              no art. 3º: <em>"Tributo é toda prestação pecuniária compulsória, em moeda ou cujo valor nela se possa exprimir, que não constitua sanção de ato ilícito, instituída em lei e cobrada
              mediante atividade administrativa plenamente vinculada."</em> Para o Técnico de Suprimento, entender tributos é crítico: toda compra da Petrobras envolve ICMS, IPI, PIS, COFINS e ISS.</p>
            <p>Provas abordam a competência e repartição de receitas fiscais entre entes federativos da União, Estados e Prefeituras Municipais.</p>
            <p>O art. 5º do CTN define as <strong>espécies tributárias</strong>: <em>Impostos, Taxas e Contribuições de Melhoria</em>. A doutrina e o STF ampliaram esse rol para 5 espécies,
              incluindo <em>Empréstimos Compulsórios</em> e <em>Contribuições Especiais</em> (PIS, COFINS, CSLL, contribuições previdenciárias). Os <strong>Impostos</strong> são tributos
              <em>não vinculados</em> — não exigem contraprestação estatal específica (ICMS, IR, IPI). As <strong>Taxas</strong> são vinculadas ao exercício do poder de polícia ou serviço público
              específico. As <strong>Contribuições de Melhoria</strong> decorrem de obra pública que valoriza imóvel do contribuinte.</p>
            <p>A relação jurídica tributária estabelece as competências de instituição de impostos, taxas regulatórias e contribuições de seguridade social.</p>
            <p>Os <strong>Princípios Constitucionais Tributários</strong> são limitações ao poder de tributar, previstos nos arts. 150-152 da CF/88:
              <strong> Legalidade</strong> (tributo só por lei); <strong>Anterioridade</strong> (tributo não pode ser cobrado no mesmo exercício em que foi instituído — exceção: IPI, IOF, II, IE);
              <strong>Irretroatividade</strong> (lei tributária não pode atingir fatos passados); <strong>Isonomia</strong> (tratamento igual para contribuintes em situação equivalente);
              <strong>Capacidade Contributiva</strong> (tributar mais quem pode mais); <strong>Vedação ao Confisco</strong> (tributo não pode ser confiscatório).</p>
            <p>Enquanto impostos são tributos com destinação não vinculada pelo Estado, taxas decorrem de prestação efetiva de serviços públicos.</p>
            <p>A <strong>Competência Tributária</strong> define qual ente federativo pode instituir cada tributo: <strong>União</strong>: II, IE, IR, IPI, IOF, ITR, IGF, empréstimos compulsórios, PIS, COFINS, CSLL.
              <strong>Estados/DF</strong>: ICMS, IPVA, ITCMD. <strong>Municípios</strong>: ISS, IPTU, ITBI. A Petrobras, como empresa nacional com operações em todos os estados, lida simultaneamente com
              tributos federais, estaduais e municipais em cada transação comercial.</p>
            <p>O fato gerador de obrigações tributárias principais refere-se ao dever de pagar tributo; obrigações acessórias referem-se a deveres formais.</p>
            <p>A <strong>CESGRANRIO cobra</strong>: classificar espécies tributárias (imposto vs. taxa vs. contribuição), identificar violações a princípios constitucionais, reconhecer a competência
              de cada tributo (federal/estadual/municipal), e interpretar artigos do CTN. pontos de atenção comum: confundir <em>anterioridade anual</em> com <em>anterioridade nonagesimal</em> (90 dias).</p>
            <p>A companhia recolhe royalties expressivos aos estados produtores de petróleo e gás pela extração em blocos marítimos.</p>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg uppercase tracking-wide">Competência Tributária — Resumo</h4>
              <div className="grid md:grid-cols-3 gap-3 text-lg">
                <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-lg p-3">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">UNIÃO (Federal)</span>
                  <span className="text-foreground/80 text-lg">IR, IPI, IOF, II, IE, ITR, PIS, COFINS, CSLL, CIDE</span>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-lg p-3">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">ESTADOS (Estadual)</span>
                  <span className="text-foreground/80 text-lg">ICMS, IPVA, ITCMD (herança e doação)</span>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-lg p-3">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">MUNICÍPIOS</span>
                  <span className="text-foreground/80 text-lg">ISS, IPTU, ITBI (transmissão de bens imóveis)</span>
                </div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="C.E.D.E. — Sistema Tributário Nacional" variant="blue" />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação",
                icone: <LuScale />,

                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p><strong>Tributo (CTN art. 3º):</strong> prestação pecuniária compulsória, em moeda, que não é sanção, instituída em lei, cobrada por atividade vinculada.</p>
                    <p><strong>5 espécies:</strong> Impostos, Taxas, Contribuições de Melhoria, Empréstimos Compulsórios, Contribuições Especiais.</p>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação",
                icone: <LuBuilding />,
                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p><strong>Imposto</strong> (não vinculado): ICMS sobre venda de petróleo — estado arrecada sem prestar serviço específico à Petrobras.</p>
                    <p><strong>Taxa</strong> (vinculada): Taxa de licença da ANP para explorar bloco de petróleo — contraprestação do poder de polícia.</p>
                    <p><strong>Anterioridade:</strong> Lei que cria novo tributo em junho/2024 só vale a partir de jan/2025 (e mínimo 90 dias).</p>
                  </div>
                ),
              },
              {
                titulo: "Dicas",
                icone: <LuTrendingUp />,
                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p>🎯 <strong>Imposto = não vinculado</strong> (não precisa de contraprestação específica). Taxa = vinculada a serviço ou poder de polícia.</p>
                    <p>🎯 IPI, IOF, II, IE: <strong>exceções à anterioridade anual</strong> (podem ter alíquota alterada imediatamente por ser instrumento de política econômica).</p>
                  </div>
                ),
              },
              {
                titulo: "Exceções (pontos de atenção CESGRANRIO)",
                icone: <LuTriangle />,
                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p>⚠️ <strong>Multa ≠ tributo</strong> — multa é sanção de ato ilícito; tributo não pode ser (CTN art. 3º). Questão clássica.</p>
                    <p>⚠️ <strong>Anterioridade nonagesimal</strong> (90 dias) é diferente da anterioridade anual. IR respeita anual mas não a nonagesimal.</p>
                    <p>⚠️ <strong>Competência ≠ Capacidade Ativa.</strong> A União pode delegar capacidade ativa para autarquias (ex: INSS), mas não a competência.</p>
                  </div>
                ),
              },
            ]}
          />
        </div>

        

<ModuleConsolidation
          index={3}
          variant="blue"
          video={{ videoId: "4fndeDfaWCg", title: "Sistema Tributário Nacional — CTN e Princípios", duration: "14:00" }}
          resumoVisual={{ moduloNome: "Módulo 3", tituloAula: "Tributos: Conceitos e Sistema", materia: "Administração", images: [{ title: "5 Espécies Tributárias", type: "Mapa", placeholderColor: "bg-emerald-500/20" }, { title: "Competência Federal/Estadual/Municipal", type: "Tabela", placeholderColor: "bg-emerald-500/20" }] }}
          sinteseEstrategica={{ title: "Tributo ≠ Multa", content: (<div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1 text-lg"><p className="font-bold text-emerald-600 dark:text-emerald-400">TRIBUTO: compulsório + legal + não é sanção</p><p className="text-foreground/70 text-lg">Multa = sanção → NÃO é tributo (CTN art. 3º)</p></div>) }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", titulo: "Áudio: Sistema Tributário", artista: "Resumo Petrobras" }}
        />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={[
            { id: "m3q1", pergunta: "Segundo o CTN (art. 3º), NÃO é característica de tributo:", opcoes: [{ label: "Prestação pecuniária compulsória", valor: "a" }, { label: "Sanção de ato ilícito", valor: "b" }, { label: "Instituída em lei", valor: "c" }, { label: "Cobrada mediante atividade vinculada", valor: "d" }], correta: "b", explicacao: "O CTN art. 3º define que tributo 'não constitua sanção de ato ilícito'. Multas são sanções, portanto não são tributos." },
            { id: "m3q2", pergunta: "O ICMS é um tributo de competência:", opcoes: [{ label: "Federal (União)", valor: "a" }, { label: "Estadual", valor: "b" }, { label: "Municipal", valor: "c" }, { label: "Compartilhada entre União e Estados", valor: "d" }], correta: "b", explicacao: "ICMS — Imposto sobre Circulação de Mercadorias e Serviços — é de competência ESTADUAL (e DF). CF/88 art. 155, II." },
            { id: "m3q3", pergunta: "O Princípio da Anterioridade Tributária determina que:", opcoes: [{ label: "Tributo não pode ser cobrado no mesmo exercício fiscal em que foi instituído", valor: "a" }, { label: "Tributo sempre deve existir há pelo menos um ano antes de ser cobrado", valor: "b" }, { label: "Lei tributária só produz efeitos após aprovação pelo Senado", valor: "c" }, { label: "Tributo só pode ser criado por lei complementar", valor: "d" }], correta: "a", explicacao: "Anterioridade (CF art. 150, III, b): tributo instituído em um exercício só pode ser cobrado no exercício seguinte. Exceções: IPI, IOF, II, IE." },
            { id: "m3q4", pergunta: "A Taxa se diferencia do Imposto porque:", opcoes: [{ label: "A taxa é cobrada apenas de empresas; o imposto, de pessoas físicas", valor: "a" }, { label: "A taxa é vinculada a uma contraprestação estatal específica; o imposto, não", valor: "b" }, { label: "A taxa é federal; o imposto pode ser estadual ou municipal", valor: "c" }, { label: "A taxa não precisa de lei para ser cobrada; o imposto, sim", valor: "d" }], correta: "b", explicacao: "A essência da distinção: imposto é NÃO VINCULADO (não exige contraprestação). Taxa é VINCULADA ao exercício do poder de polícia ou serviço público específico." },
          ]}
          titulo="QUIZ: Módulo Nº 3"
          numero={4}
          variant="blue"
          icone="⚖️"
          onComplete={(score) => handleModuleComplete("modulo-3", score)}
        />
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 4 — ICMS e IPI
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={4}
          titulo="ICMS e IPI"
          descricao="Os dois maiores tributos sobre circulação de mercadorias — regras, alíquotas e não-cumulatividade."
          variant="blue"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" title="ICMS — Imposto sobre Circulação de Mercadorias e Serviços" description="O principal tributo estadual: alíquotas, não-cumulatividade, fato gerador." variant="blue" />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>ICMS (Imposto sobre Circulação de Mercadorias e Serviços)</strong>, previsto no art. 155, II da CF/88 e regulamentado pela Lei Complementar nº 87/1996 (Lei Kandir),
              é o tributo de maior arrecadação no Brasil. Incide sobre: circulação de mercadorias, prestação de serviços de transporte interestadual e intermunicipal, e serviços de comunicação.
              Para a Petrobras, o ICMS é crítico em toda a cadeia: na extração (máquinas e insumos comprados), no refino (combustíveis produzidos), e na distribuição (venda para postos e indústrias).
              A alíquota interna varia de 12% a 25% conforme o estado e o produto.</p>
            <p>A banca cobra o princípio de não-cumulatividade do ICMS e do IPI, regulando a compensação de tributos pagos nas fases de compras.</p>
            <p>O principal mecanismo do ICMS é a <strong>não-cumulatividade</strong>: o imposto pago nas etapas anteriores da cadeia produtiva pode ser abatido (creditado) do imposto devido na etapa seguinte.
              Isso evita o "efeito cascata" — tributar o tributo. Exemplo: Petrobras compra aço com ICMS de R$ 1.000 (crédito). Vende refinaria com ICMS de R$ 3.000 (débito). ICMS a recolher = R$ 3.000 − R$ 1.000 = R$ 2.000.
              Este crédito é chamado de <strong>crédito fiscal de ICMS</strong> e aparece no balanço como ativo tributário.</p>
            <p>O ICMS incide sobre operações de circulação física de mercadorias; o IPI recai sobre a industrialização e desembaraço de produtos.</p>
            <p>O <strong>IPI (Imposto sobre Produtos Industrializados)</strong> é de competência federal (CF art. 153, IV) e incide sobre produtos industrializados nacionais e importados.
              Tem caráter <strong>extrafiscal</strong> — além de arrecadar, serve como instrumento de política econômica (governo reduz IPI para estimular indústria). Assim como o ICMS, o IPI
              também é <strong>não-cumulativo</strong>: crédito na entrada, débito na saída. A alíquota varia enormemente — de 0% (alimentos básicos) a 300% (cigarros). É exceção ao princípio
              da anterioridade anual: pode ter alíquota alterada por decreto do Executivo com vigência imediata.</p>
            <p>O aproveitamento de créditos fiscais de ICMS sobre insumos de refino de petróleo requer estrita conformidade técnica com o fisco estadual.</p>
            <p>A diferença fundamental: <strong>ICMS</strong> incide sobre circulação de mercadorias e alguns serviços (transporte/comunicação), é <em>estadual</em>; <strong>IPI</strong> incide
              especificamente sobre produtos industrializados, é <em>federal</em>. Ambos são não-cumulativos. Nas compras da Petrobras para uso na produção (insumos), ambos geram crédito fiscal,
              reduzindo o custo efetivo da aquisição — relevante para a área de Suprimento.</p>
            <p>A substituição tributária nos combustíveis centraliza o recolhimento nas refinarias de origem, otimizando a fiscalização tributária.</p>
            <p>A <strong>CESGRANRIO cobra</strong>: calcular ICMS a recolher pelo método crédito-débito, identificar operações não-tributadas pelo ICMS (ex: exportações são imunes), distinguir
              ICMS de ISS (ISS é municipal, incide sobre serviços em geral), e reconhecer as exceções à anterioridade do IPI.</p>
            <p>A área fiscal da Petrobras gerencia créditos complexos de ICMS acumulados na compra de equipamentos industriais pesados.</p>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-xl border border-rose-200 dark:border-rose-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg uppercase tracking-wide">ICMS vs IPI — Comparativo</h4>
              <div className="grid md:grid-cols-2 gap-4 text-lg">
                <div className="space-y-2">
                  <span className="font-semibold text-rose-600 dark:text-rose-400">ICMS</span>
                  <ul className="space-y-1 text-foreground/80 text-lg list-disc list-inside">
                    <li>Competência: <strong>Estadual</strong></li>
                    <li>Base: Circulação de mercadorias + transporte + comunicação</li>
                    <li>Não-cumulativo (crédito-débito)</li>
                    <li>Alíquota varia por estado (12%-25%)</li>
                    <li>Exportações: IMUNE (não incide)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <span className="font-semibold text-rose-600 dark:text-rose-400">IPI</span>
                  <ul className="space-y-1 text-foreground/80 text-lg list-disc list-inside">
                    <li>Competência: <strong>Federal</strong></li>
                    <li>Base: Produtos industrializados</li>
                    <li>Não-cumulativo (crédito-débito)</li>
                    <li>Extrafiscal — instrumento de política econômica</li>
                    <li>Exceção à anterioridade anual</li>
                  </ul>
                </div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="C.E.D.E. — ICMS e IPI" variant="blue" />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação",
                icone: <LuFileText />,

                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p><strong>ICMS:</strong> estadual, circulação de mercadorias + transporte interestad./intermun. + comunicação. Não-cumulativo.</p>
                    <p><strong>IPI:</strong> federal, produtos industrializados, não-cumulativo, extrafiscal, exceção à anterioridade.</p>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação",
                icone: <LuCalculator />,
                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p><strong>Não-cumulatividade ICMS:</strong> Petrobras compra R$ 100.000 em aço, ICMS 12% = R$ 12.000 crédito. Vende produto R$ 300.000, ICMS 12% = R$ 36.000 débito. Recolhe R$ 24.000.</p>
                    <p><strong>IPI extrafiscal:</strong> Governo reduz IPI de veículos de 25% para 7% para estimular produção industrial durante crise. Vigência imediata (sem anterioridade).</p>
                  </div>
                ),
              },
              {
                titulo: "Dicas",
                icone: <LuTrendingUp />,
                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p>🎯 <strong>ICMS ≠ ISS:</strong> ISS é municipal, incide sobre serviços em geral (exceção: transporte interestad. e comunicação que são ICMS).</p>
                    <p>🎯 Exportações de mercadorias: imunes ao ICMS (política de desonerar exportações brasileiras).</p>
                    <p>🎯 IPI pode ser alterado por decreto (poder Executivo), sem lei do Congresso — exceção importante ao princípio da legalidade estrita.</p>
                  </div>
                ),
              },
              {
                titulo: "Exceções (pontos de atenção CESGRANRIO)",
                icone: <LuTriangle />,
                conteudo: (
                  <div className="space-y-2 text-lg">
                    <p>⚠️ <strong>ICMS sobre combustíveis</strong> tem regime especial (monofásico) — incide apenas uma vez, sem crédito na cadeia.</p>
                    <p>⚠️ <strong>Operações internas ≠ interestaduais:</strong> alíquotas do ICMS são diferentes. Interestadual: 7% (N/NE/CO) ou 12% (S/SE/CO→S/SE).</p>
                    <p>⚠️ <strong>Simples Nacional:</strong> empresas optantes recolhem ICMS/IPI dentro do DAS (alíquota única) — não creditam IPI/ICMS normalmente.</p>
                  </div>
                ),
              },
            ]}
          />
        </div>

        

<ModuleConsolidation
          index={3}
          variant="blue"
          video={{ videoId: "5qap5aO4i9A", title: "ICMS e IPI — Não-Cumulatividade e Cálculo", duration: "11:00" }}
          resumoVisual={{ moduloNome: "Módulo 4", tituloAula: "ICMS e IPI", materia: "Administração", images: [{ title: "Cálculo Crédito-Débito ICMS", type: "Exercício", placeholderColor: "bg-rose-500/20" }, { title: "ICMS vs IPI vs ISS", type: "Comparativo", placeholderColor: "bg-rose-500/20" }] }}
          sinteseEstrategica={{ title: "I — C — I: Quem paga o quê?", content: (<div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-1 text-lg"><p className="font-bold text-rose-600 dark:text-rose-400">ICMS = Estado | IPI = União | ISS = Município</p><p className="text-foreground/70 text-lg">Todos são não-cumulativos (ICMS e IPI). ISS: cumulativo.</p></div>) }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", titulo: "Áudio: ICMS e IPI", artista: "Resumo Petrobras" }}
        />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={[
            { id: "m4q1", pergunta: "A não-cumulatividade do ICMS significa que:", opcoes: [{ label: "O imposto é cobrado apenas uma vez na cadeia produtiva", valor: "a" }, { label: "O contribuinte pode abater o ICMS pago nas entradas do ICMS devido nas saídas", valor: "b" }, { label: "O ICMS não incide sobre produtos exportados", valor: "c" }, { label: "O ICMS só incide sobre o valor agregado pelo fabricante", valor: "d" }], correta: "b", explicacao: "Não-cumulatividade: ICMS pago (crédito) nas compras é abatido do ICMS devido (débito) nas vendas. Recolhe-se apenas a diferença." },
            { id: "m4q2", pergunta: "O IPI é uma exceção ao Princípio da Anterioridade porque:", opcoes: [{ label: "É um imposto estadual, não federal", valor: "a" }, { label: "Tem função extrafiscal e pode ter alíquota alterada com vigência imediata", valor: "b" }, { label: "Só incide sobre produtos de luxo", valor: "c" }, { label: "Sua alíquota é definida pelo Congresso Nacional", valor: "d" }], correta: "b", explicacao: "O IPI tem caráter extrafiscal (instrumento de política econômica). Por isso, junto com II, IE e IOF, é exceção à anterioridade anual — pode ser alterado por decreto com vigência imediata." },
            { id: "m4q3", pergunta: "As exportações de mercadorias são:", opcoes: [{ label: "Tributadas pelo ICMS com alíquota reduzida de 4%", valor: "a" }, { label: "Imunes ao ICMS (não incide ICMS sobre exportações)", valor: "b" }, { label: "Tributadas pelo ISS em substituição ao ICMS", valor: "c" }, { label: "Sujeitas ao ICMS apenas se o valor superar R$ 1 milhão", valor: "d" }], correta: "b", explicacao: "CF art. 155, §2º, X, a: operações que destinem mercadorias ao exterior são IMUNES ao ICMS. Política de desonerar as exportações brasileiras." },
          ]}
          titulo="QUIZ: Módulo Nº 4"
          numero={4}
          variant="blue"
          icone="🏭"
          onComplete={(score) => handleModuleComplete("modulo-4", score)}
        />
      </TabsContent>

      {/* M5 */}
      <TabsContent value="modulo-5" className="space-y-12 mt-0 outline-none">
        <ModuleBanner numero={5} titulo="Impostos de Renda (IRPJ e CSLL)" descricao="Tributacao do lucro: regimes, base de calculo e aliquotas." variant="blue" />
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" title="IRPJ e CSLL — Tributos sobre o Lucro" description="Como grandes empresas calculam imposto sobre o lucro." variant="blue" />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>IRPJ</strong> tem aliquota de <strong>15%</strong>, mais <strong>adicional de 10%</strong> sobre lucro acima de R$ 240.000/ano. A <strong>CSLL</strong> tem aliquota de <strong>9%</strong>. Juntos: <strong>34%</strong> sobre o lucro tributavel — o que a Petrobras paga sobre seus bilhoes de lucro anual.</p>
            <p>A banca exige familiaridade com a tributação do Lucro Real e cálculo anual ou trimestral de estimativas mensais obrigatórias.</p>
            <p>Tres <strong>regimes</strong>: (1) <strong>Lucro Real</strong> — obrigatorio acima de R$ 78 milhoes/ano (Petrobras); base = lucro contabil ajustado pelo LALUR com adicoes e exclusoes; (2) <strong>Lucro Presumido</strong> — opcional ate R$ 78 milhoes; aplica percentual de presuncao sobre receita (8% comercio, 32% servicos); (3) <strong>Lucro Arbitrado</strong> — irregularidade contabil ou fraude.</p>
            <p>O Imposto de Renda Pessoa Jurídica (IRPJ) e a CSLL incidem sobre o lucro real líquido ajustado por adições e exclusões fiscais.</p>
            <p>No <strong>LALUR</strong>: Lucro Contabil + Adicoes (despesas nao-dedutiveis: multas, brindes) menos Exclusoes (receitas nao-tributaveis) = Lucro Real. Aplica-se IRPJ 25% + CSLL 9% = 34%.</p>
            <p>Estatais de grande porte enquadram-se obrigatoriamente no regime de Lucro Real, apurando impostos a partir do resultado societário LALUR.</p>
            <p>A <strong>CESGRANRIO cobra</strong>: regime correto por faturamento, calculo Lucro Presumido, adicoes/exclusoes no LALUR, e que IRPJ respeita anterioridade anual mas NAO a nonagesimal.</p>
            <p>O aproveitamento de prejuízos fiscais acumulados de exercícios anteriores sujeita-se à trava de dedução máxima de trinta por cento.</p>
            <p>O Lucro Real apura o IRPJ sobre o resultado societário ajustado pelas adições e exclusões do LALUR, sendo obrigatório para empresas com faturamento acima do limite legal.</p>
            <p>A Petrobras apura de forma rigorosa as bases tributárias do IRPJ anual integrando o controle de auditorias independentes.</p>
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 rounded-xl border border-teal-200 dark:border-teal-800 p-6 space-y-3">
              <h4 className="font-bold text-foreground text-lg uppercase tracking-wide">Regimes de Tributacao do Lucro</h4>
              <div className="grid md:grid-cols-3 gap-3 text-lg">
                <div className="bg-teal-100 dark:bg-teal-900/40 rounded-lg p-3"><span className="font-bold text-teal-700 dark:text-teal-300 mb-1">Lucro Real</span><span className="text-foreground/80 text-lg">Obrigatorio acima R$78M. LALUR. Petrobras usa este.</span></div>
                <div className="bg-teal-100 dark:bg-teal-900/40 rounded-lg p-3"><span className="font-bold text-teal-700 dark:text-teal-300 mb-1">Lucro Presumido</span><span className="text-foreground/80 text-lg">Ate R$78M. 8% comercio ou 32% servicos x receita.</span></div>
                <div className="bg-teal-100 dark:bg-teal-900/40 rounded-lg p-3"><span className="font-bold text-teal-700 dark:text-teal-300 mb-1">Lucro Arbitrado</span><span className="text-foreground/80 text-lg">Fraude ou escrituracao irregular. Fisco arbitra.</span></div>
              </div>
              <span className="text-lg font-semibold text-teal-700 dark:text-teal-300">IRPJ 15% + adicional 10% + CSLL 9% = <strong>34%</strong> sobre o lucro</span>
            </div>
          
          
          
          </div>
        </section>
        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="C.E.D.E. — IRPJ e CSLL" variant="blue" />
          <ContentAccordion mode="stacked" slides={[
            { titulo: "Conceituacao", icone: <LuBriefcase />, conteudo: (<div className="space-y-2 text-lg"><p><strong>IRPJ:</strong> 15% + 10% adicional (lucro acima R$240k/ano). Federal. <strong>CSLL:</strong> 9% sobre lucro. Lucro Real obrigatorio acima R$78M.</p></div>) },
            { titulo: "Exemplificacao", icone: <LuCalculator />, conteudo: (<div className="space-y-2 text-lg"><p><strong>Lucro Presumido comercio:</strong> Receita R$10M x 8% = R$800k. IRPJ = R$800k x 15% = R$120k.</p><p><strong>Petrobras Lucro Real:</strong> Lucro R$101bi x 34% = R$34,34bi de IRPJ+CSLL.</p></div>) },
            { titulo: "Dicas", icone: <LuTrendingUp />, conteudo: (<div className="space-y-2 text-lg"><p>Petrobras = Lucro Real obrigatorio. IRPJ: anterioridade anual, NAO nonagesimal. Prejuizo: compensavel em ate 30% do lucro futuro.</p></div>) },
            { titulo: "Excecoes", icone: <LuTriangleAlert />, conteudo: (<div className="space-y-2 text-lg"><p>Dividendos: isentos de IR para o acionista. JCP (Juros s/ Capital Proprio): tributado a 15% na fonte — diferenca importante.</p></div>) },
          ]} />
        </div>
        
<ModuleConsolidation index={3} variant="blue" video={{ videoId: "dQw4w9WgXcQ", title: "IRPJ e CSLL — Regimes", duration: "13:00" }} resumoVisual={{ moduloNome: "Módulo 5", tituloAula: "IRPJ e CSLL", materia: "Administracao", images: [{ title: "Regimes vs Faturamento", type: "Comparativo", placeholderColor: "bg-teal-500/20" }] }} sinteseEstrategica={{ title: "34% sobre o lucro", content: (<div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl text-lg"><p className="font-bold text-teal-600 dark:text-teal-400">IRPJ 25% + CSLL 9% = 34% sobre o lucro</p><p className="text-lg text-foreground/70">Lucro Real obrigatorio acima R$78M (Petrobras)</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", titulo: "Audio IRPJ e CSLL", artista: "Resumo Petrobras" }} />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={[
          { id: "m5q1", pergunta: "Qual regime e OBRIGATORIO para a Petrobras?", opcoes: [{ label: "Lucro Presumido", valor: "a" }, { label: "Lucro Real", valor: "b" }, { label: "Simples Nacional", valor: "c" }, { label: "Lucro Arbitrado", valor: "d" }], correta: "b", explicacao: "Lucro Real e obrigatorio para receita bruta superior a R$78M/ano." },
          { id: "m5q2", pergunta: "A aliquota total de IRPJ (base + adicional) e:", opcoes: [{ label: "15%", valor: "a" }, { label: "25%", valor: "b" }, { label: "34%", valor: "c" }, { label: "9%", valor: "d" }], correta: "b", explicacao: "IRPJ = 15% + adicional 10% = 25%. Incluindo CSLL (9%), carga total = 34%." },
          { id: "m5q3", pergunta: "Lucro Presumido comercio, receita R$10M. Base IRPJ:", opcoes: [{ label: "R$10.000.000", valor: "a" }, { label: "R$3.200.000 (32%)", valor: "b" }, { label: "R$800.000 (8%)", valor: "c" }, { label: "Lucro contabil", valor: "d" }], correta: "c", explicacao: "Lucro Presumido comercio: 8% da receita. R$10M x 8% = R$800k." },
        ]} titulo="QUIZ: Módulo Nº 5" numero={4} variant="blue" icone="💼" onComplete={(score) => handleModuleComplete("modulo-5", score)} />
      </TabsContent>

      {/* M6 */}
      <TabsContent value="modulo-6" className="space-y-12 mt-0 outline-none">
        <ModuleBanner numero={6} titulo="Contribuicoes Sociais (PIS e COFINS)" descricao="Contribuicoes sobre a receita: cumulativo e nao-cumulativo." variant="blue" />
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" title="PIS e COFINS — Sobre a Receita Bruta" description="Regimes, aliquotas e creditos para a Petrobras." variant="blue" />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>PIS</strong> e a <strong>COFINS</strong> sao contribuicoes federais sobre a <em>receita bruta</em>, nao sobre o lucro. Financiam a seguridade social. Para a Petrobras, representam bilhoes anuais em recolhimento sobre cada real de receita de vendas.</p>
            <p>Questões sobre PIS e COFINS cobram a distinção entre a sistemática cumulativa clássica e o regime de incidência não-cumulativa.</p>
            <p>Dois regimes: (1) <strong>Cumulativo</strong> (Lucro Presumido): PIS 0,65%, COFINS 3%, sem creditos; (2) <strong>Nao-Cumulativo</strong> (Lucro Real — Petrobras): PIS 1,65%, COFINS 7,6%, COM creditos sobre compras de insumos, energia e ativos. Formula: a recolher = debito sobre receitas menos credito sobre compras.</p>
            <p>O PIS e a COFINS não-cumulativos apresentam alíquotas maiores, permitindo compensar despesas operacionais atreladas aos insumos de refino.</p>
            <p><strong>Distincao critica:</strong> PIS/COFINS incidem sobre <em>RECEITA</em>. IRPJ/CSLL incidem sobre <em>LUCRO</em>. Confundir isso e o erro mais cobrado pela CESGRANRIO neste tema.</p>
            <p>Nas operações de importação de insumos submarinos, há incidência de PIS/COFINS-Importação no momento do desembaraço aduaneiro.</p>
            <p>O PIS e a COFINS não-cumulativos permitem o desconto de créditos sobre insumos e serviços adquiridos, tornando o custo tributário menor para empresas que compram muito.</p>
            <p>A alíquota regressiva do PIS e COFINS cumulativo incide de forma direta sobre o faturamento bruto, sem compensações de créditos.</p>
            <p>A diferenciação entre o regime cumulativo — aplicado para empresas menores — e o não-cumulativo é ponto frequente em questões da CESGRANRIO sobre tributação federal.</p>
            <p>A estatal compensa massivos créditos de PIS/COFINS incidentes sobre os contratos de afretamento marítimo de plataformas.</p>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200 dark:border-amber-800 p-6 space-y-3">
              <h4 className="font-bold text-foreground text-lg uppercase tracking-wide">Aliquotas PIS/COFINS por Regime</h4>
              <div className="grid md:grid-cols-2 gap-4 text-lg">
                <div className="space-y-1 bg-amber-100 dark:bg-amber-900/40 rounded-lg p-3"><span className="font-semibold text-amber-700 dark:text-amber-300">Cumulativo (Lucro Presumido)</span><span className="text-lg text-foreground/80">PIS 0,65% + COFINS 3% = 3,65%. Sem credito.</span></div>
                <div className="space-y-1 bg-amber-100 dark:bg-amber-900/40 rounded-lg p-3"><span className="font-semibold text-amber-700 dark:text-amber-300">Nao-Cumulativo (Lucro Real)</span><span className="text-lg text-foreground/80">PIS 1,65% + COFINS 7,6% = 9,25%. COM credito.</span></div>
              </div>
            </div>
          
          
          
          </div>
        </section>
        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="C.E.D.E. — PIS e COFINS" variant="blue" />
          <ContentAccordion mode="stacked" slides={[
            { titulo: "Conceituacao", icone: <LuShield />, conteudo: (<div className="space-y-2 text-lg"><p>PIS + COFINS = sobre RECEITA (nao lucro). Cumulativo: 3,65% sem credito. Nao-cum: 9,25% com credito sobre compras.</p></div>) },
            { titulo: "Exemplificacao", icone: <LuCalculator />, conteudo: (<div className="space-y-2 text-lg"><p>Petrobras nao-cum.: Receita R$100M, compras R$60M. COFINS debito: 7,6%xR$100M=R$7,6M. Credito: 7,6%xR$60M=R$4,56M. A recolher: R$3,04M.</p></div>) },
            { titulo: "Dicas", icone: <LuTrendingUp />, conteudo: (<div className="space-y-2 text-lg"><p>PIS/COFINS = RECEITA. CSLL/IRPJ = LUCRO. Exportacoes: imunes. Petrobras = nao-cumulativo obrigatorio (Lucro Real).</p></div>) },
            { titulo: "Excecoes", icone: <LuTriangleAlert />, conteudo: (<div className="space-y-2 text-lg"><p>Combustiveis: regime monofasico — aliquota maior na refinaria; demais da cadeia com aliquota zero. COFINS-Importacao incide sobre importacoes do exterior.</p></div>) },
          ]} />
        </div>
        
<ModuleConsolidation index={3} variant="blue" video={{ videoId: "dQw4w9WgXcQ", title: "PIS e COFINS — Regimes", duration: "11:30" }} resumoVisual={{ moduloNome: "Módulo 6", tituloAula: "PIS e COFINS", materia: "Administracao", images: [{ title: "Aliquotas Comparadas", type: "Tabela", placeholderColor: "bg-amber-500/20" }] }} sinteseEstrategica={{ title: "0,65/3 vs 1,65/7,6", content: (<div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-lg"><p className="font-bold text-amber-600 dark:text-amber-400">Cumulativo: PIS 0,65% + COFINS 3%</p><p className="font-bold text-amber-600 dark:text-amber-400">Nao-cum: PIS 1,65% + COFINS 7,6%</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", titulo: "Audio PIS e COFINS", artista: "Resumo Petrobras" }} />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={[
          { id: "m6q1", pergunta: "No regime nao-cumulativo, as aliquotas de PIS/COFINS sao:", opcoes: [{ label: "PIS 0,65% e COFINS 3%", valor: "a" }, { label: "PIS 1,65% e COFINS 7,6%", valor: "b" }, { label: "PIS 9% e COFINS 15%", valor: "c" }, { label: "PIS 1% e COFINS 4%", valor: "d" }], correta: "b", explicacao: "Nao-cumulativo: PIS 1,65% e COFINS 7,6%, com creditos. Obrigatorio para Lucro Real." },
          { id: "m6q2", pergunta: "PIS e COFINS incidem sobre:", opcoes: [{ label: "O lucro liquido", valor: "a" }, { label: "A folha de pagamento", valor: "b" }, { label: "A receita bruta", valor: "c" }, { label: "O patrimonio liquido", valor: "d" }], correta: "c", explicacao: "PIS e COFINS incidem sobre RECEITA BRUTA. IRPJ e CSLL incidem sobre o LUCRO." },
          { id: "m6q3", pergunta: "Petrobras nao-cum.: receita R$1M, compras R$600k. COFINS a recolher:", opcoes: [{ label: "R$76.000", valor: "a" }, { label: "R$45.600", valor: "b" }, { label: "R$30.400", valor: "c" }, { label: "R$18.000", valor: "d" }], correta: "c", explicacao: "Debito: 7,6%xR$1M=R$76k. Credito: 7,6%xR$600k=R$45,6k. A recolher: R$30.400." },
        ]} titulo="QUIZ: Módulo Nº 6" numero={4} variant="blue" icone="🛡️" onComplete={(score) => handleModuleComplete("modulo-6", score)} />
      </TabsContent>

      {/* M7 */}
      <TabsContent value="modulo-7" className="space-y-12 mt-0 outline-none">
        <ModuleBanner numero={7} titulo="Administracao Tributaria" descricao="Fiscalizacao, obrigacoes acessorias, lancamento e processo administrativo fiscal." variant="blue" />
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" title="Fiscalizacao e Obrigacoes Tributarias" description="Como o Estado fiscaliza, cobra e os contribuintes se defendem." variant="blue" />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Administracao Tributaria</strong> e exercida pela <strong>Receita Federal do Brasil</strong> (tributos federais), pelas <strong>SEFAZ estaduais</strong> (ICMS, IPVA) e pelas <strong>Secretarias Municipais</strong> (ISS, IPTU). A Petrobras, maior contribuinte do Brasil, e fiscalizada pelos tres orgaos simultaneamente.</p>
            <p>A prova avalia a gestão de obrigações acessórias tributárias como SPED, ECF e a emissão de notas fiscais eletrônicas de forma tempestiva.</p>
            <p>Obrigacoes tributarias: (1) <strong>Principal</strong> — pagar o tributo ou penalidade (obrigacao de dar dinheiro); (2) <strong>Acessoria</strong> — escriturar, declarar, informar (SPED, DCTF, DIRF, RAIS). Descumprimento de acessoria gera multa que se converte em obrigacao principal.</p>
            <p>A conformidade com obrigações tributárias acessórias mitiga o risco de aplicação de multas punitivas por parte dos órgãos fiscalizadores.</p>
            <p>O <strong>Lancamento Tributario</strong> (CTN art. 142) constitui o credito tributario. Tres modalidades: <strong>De Oficio</strong> — fisco age unilateralmente (IPTU, IPVA, autos de infracao); <strong>Por Declaracao</strong> — contribuinte informa, fisco lanca (ITBI, ITD); <strong>Por Homologacao</strong> — contribuinte apura e paga, fisco homologa (IRPJ, ICMS, PIS/COFINS) — o mais comum.</p>
            <p>A certidão negativa de débitos (CND) atesta a regularidade fiscal de fornecedores em licitações e contratos celebrados com as estatais.</p>
            <p>Prazos: <strong>Decadencia = 5 anos</strong> para o fisco lancar (CTN art. 173). <strong>Prescricao = 5 anos</strong> para cobrar judicialmente apos lancamento definitivo. A <strong>CESGRANRIO cobra</strong>: modalidades de lancamento, distincao acessoria/principal, prazos decadencial e prescricional.</p>
            <p>O SPED Fiscal (Sistema Público de Escrituração Digital) centraliza em formato digital auditável todas as movimentações fiscais de compras.</p>
            <p>As obrigações acessórias tributárias — SPED Fiscal, ECF, NF-e — são instrumentos de controle digital que permitem ao fisco cruzar automaticamente dados de fornecedores e compradores.</p>
            <p>A Petrobras cumpre rigorosos cronogramas de entrega de declarações de SPED à Receita Federal para assegurar regularidade.</p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-6 space-y-3">
              <h4 className="font-bold text-foreground text-lg uppercase tracking-wide">3 Modalidades de Lancamento</h4>
              <div className="grid md:grid-cols-3 gap-3 text-lg">
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-3"><span className="font-bold text-blue-700 dark:text-blue-300 mb-1">De Oficio</span><span className="text-lg text-foreground/80">Fisco age sozinho. IPTU, IPVA, autos de infracao.</span></div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-3"><span className="font-bold text-blue-700 dark:text-blue-300 mb-1">Por Declaracao</span><span className="text-lg text-foreground/80">Contribuinte informa; fisco lanca. ITBI, ITD.</span></div>
                <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-3"><span className="font-bold text-blue-700 dark:text-blue-300 mb-1">Por Homologacao</span><span className="text-lg text-foreground/80">Contribuinte paga; fisco homologa. IRPJ, ICMS, PIS/COFINS. O mais comum.</span></div>
              </div>
            </div>
          
          
          
          </div>
        </section>
        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="C.E.D.E. — Administracao Tributaria" variant="blue" />
          <ContentAccordion mode="stacked" slides={[
            { titulo: "Conceituacao", icone: <LuFileText />, conteudo: (<div className="space-y-2 text-lg"><p>Principal: pagar tributo. Acessoria: escriturar, declarar. Lancamento: oficio / declaracao / homologacao.</p></div>) },
            { titulo: "Exemplificacao", icone: <LuBuilding />, conteudo: (<div className="space-y-2 text-lg"><p>Petrobras apura IRPJ mensalmente via DARF (homologacao). Fisco homologa em ate 5 anos. Auto de infracao SEFAZ: impugnacao 30 dias, DRJ, CARF.</p></div>) },
            { titulo: "Dicas", icone: <LuTrendingUp />, conteudo: (<div className="space-y-2 text-lg"><p>Decadencia = 5 anos para LANCAR. Prescricao = 5 anos para COBRAR apos lancamento. Acessoria nao cumprida = multa = obrigacao principal.</p></div>) },
            { titulo: "Excecoes", icone: <LuTriangleAlert />, conteudo: (<div className="space-y-2 text-lg"><p>Sigilo fiscal (CTN art. 198): Receita Federal NAO divulga dados a terceiros. CARF e orgao administrativo — contribuinte pode recorrer ao Judiciario apos CARF.</p></div>) },
          ]} />
        </div>
        
<ModuleConsolidation index={3} variant="blue" video={{ videoId: "dQw4w9WgXcQ", title: "Administracao Tributaria", duration: "12:00" }} resumoVisual={{ moduloNome: "Módulo 7", tituloAula: "Adm. Tributaria", materia: "Administracao", images: [{ title: "3 Modalidades Lancamento", type: "Tabela", placeholderColor: "bg-blue-500/20" }] }} sinteseEstrategica={{ title: "Decadencia vs Prescricao", content: (<div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-lg"><p className="font-bold text-blue-600 dark:text-blue-400">Decadencia: 5 anos para LANCAR</p><p className="font-bold text-blue-600 dark:text-blue-400">Prescricao: 5 anos para COBRAR</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", titulo: "Audio Adm. Tributaria", artista: "Resumo Petrobras" }} />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={[
          { id: "m7q1", pergunta: "Entregar a DCTF e:", opcoes: [{ label: "Obrigacao principal", valor: "a" }, { label: "Obrigacao acessoria", valor: "b" }, { label: "Penalidade tributaria", valor: "c" }, { label: "Facultativo", valor: "d" }], correta: "b", explicacao: "DCTF = declaracao = OBRIGACAO ACESSORIA. Descumprimento gera multa." },
          { id: "m7q2", pergunta: "No lancamento por homologacao:", opcoes: [{ label: "A Receita Federal calcula e cobra", valor: "a" }, { label: "O contribuinte apura e paga; fisco homologa", valor: "b" }, { label: "Contribuinte informa; fisco calcula", valor: "c" }, { label: "Lancado por sentenca judicial", valor: "d" }], correta: "b", explicacao: "Homologacao: contribuinte apura e paga antecipadamente (IRPJ, ICMS, PIS/COFINS). Fisco homologa em ate 5 anos." },
          { id: "m7q3", pergunta: "O prazo decadencial para a Fazenda lancar tributo e:", opcoes: [{ label: "2 anos", valor: "a" }, { label: "3 anos", valor: "b" }, { label: "5 anos", valor: "c" }, { label: "10 anos", valor: "d" }], correta: "c", explicacao: "CTN art. 173: decadencia de 5 anos para a Fazenda constituir o credito tributario." },
        ]} titulo="QUIZ: Módulo Nº 7" numero={4} variant="blue" icone="🔍" onComplete={(score) => handleModuleComplete("modulo-7", score)} />
      </TabsContent>

      {/* M8 */}
      <TabsContent value="modulo-8" className="space-y-12 mt-0 outline-none">
        <ModuleBanner numero={8} titulo="Planejamento Tributario" descricao="Elisao vs. evasao fiscal, estrategias legais e limites eticos." variant="blue" />
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" title="Elisao vs. Evasao Fiscal" description="A linha entre planejamento legal e crime tributario." variant="blue" />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Planejamento Tributario</strong> e a reducao legal da carga tributaria — atividade completamente legitima. A Petrobras tem diretoria dedicada que economiza bilhoes anualmente.</p>
            <p>Questões diferenciam a elisão fiscal (planejamento lícito prévio) da evasão fiscal (fraude deliberada pós-fato gerador).</p>
            <p><strong>Elisao Fiscal</strong> (licita): reducao por meios <em>legais</em>, <em>antes</em> do fato gerador. Exemplos: escolher Lucro Presumido vs. Real; usar JCP para deduzir IRPJ/CSLL; instalar unidade na Zona Franca de Manaus para isencao de IPI; compensar prejuizos fiscais (ate 30% do lucro).</p>
            <p>O planejamento tributário legítimo utiliza caminhos autorizados em lei para minimizar ou diferir a carga tributária do processo.</p>
            <p><strong>Evasao Fiscal</strong> (ilicita): suprimir tributo por meios <em>ilegais</em> — notas fiscais frias, fraude, simulacao, caixa 2. Crime: Lei 8.137/1990, pena 2 a 5 anos. Sonegacao = evasao.</p>
            <p>A adoção do regime aduaneiro especial drawback exonera compras de materiais que serão incorporados em produtos voltados à exportação.</p>
            <p>A <strong>CESGRANRIO cobra</strong>: distinguir elisao de evasao com exemplos concretos, identificar crime tributario, norma antielisiva CTN art. 116 paragrafo unico, e diferenca entre sonegacao e inadimplencia.</p>
            <p>A simulação fraudulenta que busque unicamente ocultar fatos geradores tributários autoriza a autuação fiscal de ofício de fraudes.</p>
            <p>O Lucro Real apura o IRPJ sobre o resultado societário ajustado pelas adições e exclusões previstas na legislação do LALUR, sendo obrigatório para empresas com receita acima do limite legal vigente.</p>
            <p>A Petrobras adota o regime Repetro para desonerar a importação de sondas e equipamentos especiais destinados à exploração do pré-sal.</p>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-3">
              <h4 className="font-bold text-foreground text-lg uppercase tracking-wide">Elisao vs Evasao</h4>
              <div className="grid md:grid-cols-2 gap-4 text-lg">
                <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-lg p-4"><span className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">ELISAO (Licita)</span><ul className="text-lg space-y-1 list-disc list-inside text-foreground/80"><li>Antes do fato gerador</li><li>Meios legais e legitimos</li><li>JCP, ZFM, escolha de regime</li></ul></div>
                <div className="bg-red-100 dark:bg-red-900/40 rounded-lg p-4"><span className="font-bold text-red-700 dark:text-red-300 mb-2">EVASAO (Crime)</span><ul className="text-lg space-y-1 list-disc list-inside text-foreground/80"><li>Apos o fato gerador</li><li>Fraude, notas frias, caixa 2</li><li>Lei 8.137/90: pena 2-5 anos</li></ul></div>
              </div>
            </div>
          
          
          
          </div>
        </section>
        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="C.E.D.E. — Planejamento Tributario" variant="blue" />
          <ContentAccordion mode="stacked" slides={[
            { titulo: "Conceituacao", icone: <LuCircleCheck />, conteudo: (<div className="space-y-2 text-lg"><p>Elisao: legal, ANTES do FG. Evasao: ilegal, APOS. Sonegacao = evasao = crime tributario.</p></div>) },
            { titulo: "Exemplificacao", icone: <LuBriefcase />, conteudo: (<div className="space-y-2 text-lg"><p>Elisao: Petrobras usa JCP para remunerar acionistas e deduzir IRPJ. Evasao: empresa emite nota fiscal fria para inflar custos — fraude e crime.</p></div>) },
            { titulo: "Dicas", icone: <LuTrendingUp />, conteudo: (<div className="space-y-2 text-lg"><p>Elisao = ANTES + legal. Evasao = APOS + ilegal. Sonegacao ≠ inadimplencia (inadimplencia nao e crime; sonegacao sim).</p></div>) },
            { titulo: "Excecoes", icone: <LuTriangleAlert />, conteudo: (<div className="space-y-2 text-lg"><p>Norma antielisiva (CTN art. 116 par. unico): fisco pode desconsiderar atos sem proposito negocial real. Elusao = elisao abusiva (zona cinzenta).</p></div>) },
          ]} />
        </div>
        
<ModuleConsolidation index={3} variant="blue" video={{ videoId: "dQw4w9WgXcQ", title: "Planejamento Tributario", duration: "10:00" }} resumoVisual={{ moduloNome: "Módulo 8", tituloAula: "Planejamento Tributario", materia: "Administracao", images: [{ title: "Elisao vs Evasao", type: "Comparativo", placeholderColor: "bg-emerald-500/20" }] }} sinteseEstrategica={{ title: "Antes x Depois do FG", content: (<div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-lg"><p className="font-bold text-emerald-600 dark:text-emerald-400">Antes + legal = ELISAO (ok)</p><p className="font-bold text-red-500 dark:text-red-400">Depois + ilegal = EVASAO (crime)</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", titulo: "Audio Planejamento Tributario", artista: "Resumo Petrobras" }} />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={[
          { id: "m8q1", pergunta: "Instalar fabrica na ZFM para isencao de IPI e:", opcoes: [{ label: "Evasao fiscal", valor: "a" }, { label: "Elisao fiscal licita", valor: "b" }, { label: "Sonegacao permitida", valor: "c" }, { label: "Crime tributario", valor: "d" }], correta: "b", explicacao: "ELISAO: reducao licita por meio legal (beneficio ZFM), antes do FG. Completamente legitima." },
          { id: "m8q2", pergunta: "Evasao se distingue de elisao porque:", opcoes: [{ label: "Reduz mais imposto", valor: "a" }, { label: "Usa meios ilicitos (fraude, simulacao)", valor: "b" }, { label: "E so para PF", valor: "c" }, { label: "Permitida no Simples", valor: "d" }], correta: "b", explicacao: "Evasao = meios ilicitos (fraude). Crime Lei 8.137/90. Elisao = meios LICITOS." },
          { id: "m8q3", pergunta: "JCP e tecnica de planejamento tributario porque:", opcoes: [{ label: "Isenta IR totalmente", valor: "a" }, { label: "Permite deduzir do IRPJ/CSLL reduzindo lucro tributavel", valor: "b" }, { label: "Substitui dividendos", valor: "c" }, { label: "Exclusivo com prejuizo acumulado", valor: "d" }], correta: "b", explicacao: "JCP: empresa remunera acionistas e deduz do IRPJ/CSLL como despesa — reduz legalmente o lucro tributavel." },
        ]} titulo="QUIZ: Módulo Nº 8" numero={4} variant="blue" icone="♟️" onComplete={(score) => handleModuleComplete("modulo-8", score)} />
      </TabsContent>

      {/* M9 */}
      <TabsContent value="modulo-9" className="space-y-12 mt-0 outline-none">
        <ModuleBanner numero={9} titulo="Tributos na Petrobras" descricao="Participacoes governamentais e impacto tributario em Suprimentos." variant="blue" />
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" title="Tributos Especificos do Setor Petrolifero" description="Participacoes governamentais e creditos tributarios em Suprimentos." variant="blue" />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Petrobras e o maior contribuinte individual do Brasil</strong>, pagando mais de R$ 100 bilhoes/ano. Para o Tecnico de Suprimento, toda aquisicao carrega tributos que afetam o custo final.</p>
            <p>Provas abordam a tributação do setor de petróleo, incidência de royalties governamentais e as diretrizes fiscais das refinarias.</p>
            <p><strong>Participacoes Governamentais</strong> (Lei 9.478/1997 e Lei 12.351/2010): (1) <strong>Royalties</strong> — compensacao pela exploracao de petroleo/gas, 5%-40% da producao; (2) <strong>Participacao Especial</strong> — sobre lucros extraordinarios de campos grandes, ate 40%; (3) <strong>Bonus de Assinatura</strong> — pagamento unico pela concessao; (4) <strong>CIDE Combustiveis</strong> — contribuicao federal sobre comercializacao de derivados.</p>
            <p>A exploração e lavra de hidrocarbonetos geram obrigações de repasse de royalties federais aos municípios e estados produtores.</p>
            <p>Em <strong>Suprimentos</strong>: ao comprar equipamentos, a Petrobras gera creditos de IPI, ICMS e PIS/COFINS. Custo efetivo = preco menos creditos recuperaveis (pode ser 20-30% menor que o valor nominal da nota).</p>
            <p>A apuração de impostos em contratos interestaduais de gás exige controle fiscal minucioso de retenções e divisas geográficas.</p>
            <p>O PIS e a COFINS não-cumulativos permitem o desconto de créditos sobre insumos e serviços adquiridos, tornando o custo tributário efetivo menor para empresas com alta intensidade de compras industriais.</p>
            <p>As autuações de fiscos estaduais sobre circulação física de gás são objetos de disputas tributárias avaliadas em tribunais superiores.</p>
            <p>A diferenciação entre o regime cumulativo — aplicado a empresas menores enquadradas no Lucro Presumido — e o não-cumulativo é ponto frequente em questões da CESGRANRIO sobre tributação federal.</p>
            <p>Compradores da Petrobras retêm tributos devidos na fonte ao liquidar notas fiscais de serviços prestados por empreiteiras parceiras.</p>
            <AlertBox tipo="info" titulo="Creditos em uma Compra Tipica de Suprimentos">
              <div className="space-y-1 text-lg"><span>Valvulas R$1.000.000: IPI 5%=R$50k + ICMS 12%=R$120k + PIS/COFINS 9,25%=R$92,5k = R$262.500 em creditos.</span><span className="font-bold">Custo efetivo: aproximadamente R$737.500</span></div>
            </AlertBox>
          
          
          
          </div>
        </section>
        <div className="space-y-6">
          <ModuleSectionHeader index={2} title="C.E.D.E. — Tributos na Petrobras" variant="blue" />
          <ContentAccordion mode="stacked" slides={[
            { titulo: "Conceituacao", icone: <LuBuilding />, conteudo: (<div className="space-y-2 text-lg"><p>Participacoes Governamentais: Royalties, Part. Especial, Bonus Assinatura, CIDE. Creditos (IPI+ICMS+PIS/COFINS) nas compras reduzem custo efetivo em Suprimentos.</p></div>) },
            { titulo: "Exemplificacao", icone: <LuCalculator />, conteudo: (<div className="space-y-2 text-lg"><p>Royalties Campo Tupi: 500k bbl/dia x 15% x preco Brent = bilhoes/ano. CIDE: Petrobras recolhe ao vender gasolina — receita destinada a infraestrutura de transporte.</p></div>) },
            { titulo: "Dicas", icone: <LuTrendingUp />, conteudo: (<div className="space-y-2 text-lg"><p>Royalties nao sao tributos stricto sensu (compensacao financeira, Lei 9.478). Custo efetivo = preco menos creditos tributarios recuperaveis (IPI+ICMS+PIS/COFINS).</p></div>) },
            { titulo: "Excecoes", icone: <LuTriangleAlert />, conteudo: (<div className="space-y-2 text-lg"><p>CIDE ≠ COFINS (fatos geradores diferentes). Exportacoes de petroleo: imunes ao ICMS e PIS/COFINS — creditos acumulados podem ser compensados com outros tributos.</p></div>) },
          ]} />
        </div>
        <CardCarousel cards={[
          { icone: <LuBuilding className="w-6 h-6" />, titulo: "Royalties", descricao: "5%-40% da producao de petroleo/gas. Compensacao pela exploracao de recurso natural pertencente a Uniao. Lei 9.478/1997." },
          { icone: <LuTrendingUp className="w-6 h-6" />, titulo: "Participacao Especial", descricao: "Sobre lucros extraordinarios de campos com grande producao. Aliquota progressiva ate 40% do lucro liquido do campo." },
          { icone: <LuFileText className="w-6 h-6" />, titulo: "CIDE Combustiveis", descricao: "Contribuicao de Intervencao no Dominio Economico sobre comercializacao de derivados de petroleo. Receita para infraestrutura." },
          { icone: <LuScale className="w-6 h-6" />, titulo: "Bonus de Assinatura", descricao: "Pagamento unico a ANP pela concessao ou partilha de producao. Nao e tributo recorrente." },
        ]} titulo="Participacoes Governamentais" />
        
<ModuleConsolidation index={3} variant="blue" video={{ videoId: "dQw4w9WgXcQ", title: "Tributacao Petrobras e Suprimentos", duration: "14:00" }} resumoVisual={{ moduloNome: "Módulo 9", tituloAula: "Tributos Petrobras", materia: "Administracao", images: [{ title: "Participacoes Governamentais", type: "Estrutura", placeholderColor: "bg-rose-500/20" }] }} sinteseEstrategica={{ title: "Custo Efetivo em Suprimentos", content: (<div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-lg"><p className="font-bold text-rose-600 dark:text-rose-400">Custo Efetivo = Preco menos (IPI+ICMS+PIS/COFINS)</p><p className="text-lg text-foreground/70">Pode ser 20-30% menor que o valor nominal.</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", titulo: "Audio Tributos Petrobras", artista: "Resumo Petrobras" }} />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={[
          { id: "m9q1", pergunta: "Os Royalties pagos pela Petrobras sao:", opcoes: [{ label: "IR sobre a producao", valor: "a" }, { label: "Compensacao financeira pela exploracao de recursos naturais da Uniao", valor: "b" }, { label: "Taxa da ANP pela licenca", valor: "c" }, { label: "Contribuicao previdenciaria dos trabalhadores", valor: "d" }], correta: "b", explicacao: "Royalties = compensacao financeira pela exploracao de recursos da Uniao (Lei 9.478/1997). Nao sao tributos no sentido estrito do CTN." },
          { id: "m9q2", pergunta: "Ao comprar equipamentos, a Petrobras gera creditos de:", opcoes: [{ label: "Apenas IRPJ", valor: "a" }, { label: "ICMS, IPI e PIS/COFINS (regime nao-cumulativo)", valor: "b" }, { label: "Apenas ICMS", valor: "c" }, { label: "ISS e IPTU", valor: "d" }], correta: "b", explicacao: "No regime nao-cumulativo (Lucro Real), a Petrobras gera creditos de IPI, ICMS e PIS/COFINS nas compras, reduzindo o custo efetivo." },
          { id: "m9q3", pergunta: "A CIDE Combustiveis e:", opcoes: [{ label: "Taxa estadual sobre combustiveis", valor: "a" }, { label: "Contribuicao federal (CIDE) sobre comercializacao de derivados de petroleo", valor: "b" }, { label: "Participacao governamental exclusiva do Pre-Sal", valor: "c" }, { label: "Imposto municipal sobre postos", valor: "d" }], correta: "b", explicacao: "CIDE Combustiveis = contribuicao federal de intervencao no dominio economico sobre petroleo e derivados. Receita para infraestrutura." },
        ]} titulo="QUIZ: Módulo Nº 9" numero={4} variant="blue" icone="🏗️" onComplete={(score) => handleModuleComplete("modulo-9", score)} />
      </TabsContent>

      {/* M10 */}
      <TabsContent value="modulo-10" className="space-y-12 mt-0 outline-none">
        <ModuleBanner numero={10} titulo="Simulado Geral" descricao="Consolidacao final: 12 questoes integradas no padrao CESGRANRIO." variant="blue" />
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" title="Revisao Integrada — Mapa Mental Completo" description="Revise tudo antes do simulado." variant="blue" />
          <div className="grid md:grid-cols-2 gap-4 text-lg">
            <div className="bg-card rounded-xl border border-border p-4 space-y-2"><p className="font-bold">Contabilidade (M1-M2)</p><ul className="text-foreground/70 text-lg space-y-1 list-disc list-inside"><li>Ativo = Passivo + PL</li><li>BP (data) / DRE (periodo) / DFC (caixa)</li><li>Partidas dobradas: D = C</li><li>Principio da Competencia ≠ Regime de Caixa</li></ul></div>
            <div className="bg-card rounded-xl border border-border p-4 space-y-2"><p className="font-bold">Sistema Tributario (M3)</p><ul className="text-foreground/70 text-lg space-y-1 list-disc list-inside"><li>5 especies: Imposto, Taxa, CM, EC, Contrib.</li><li>Uniao: IR, IPI, IOF, PIS, COFINS, CSLL</li><li>Estado: ICMS, IPVA. Municipio: ISS, IPTU</li><li>Tributo nao e sancao (CTN art. 3)</li></ul></div>
            <div className="bg-card rounded-xl border border-border p-4 space-y-2"><p className="font-bold">Tributos (M4-M6)</p><ul className="text-foreground/70 text-lg space-y-1 list-disc list-inside"><li>ICMS (estadual) + IPI (federal): nao-cumulativos</li><li>IRPJ 25% + CSLL 9% = 34% sobre o lucro</li><li>PIS 1,65% + COFINS 7,6% (nao-cum. Petrobras)</li><li>Lucro Real obrigatorio acima R$78M</li></ul></div>
            <div className="bg-card rounded-xl border border-border p-4 space-y-2"><p className="font-bold">Adm. Tributaria + Petrobras (M7-M9)</p><ul className="text-foreground/70 text-lg space-y-1 list-disc list-inside"><li>Acessoria (declarar) ≠ Principal (pagar)</li><li>Lancamento: oficio / declaracao / homologacao</li><li>Decadencia 5 anos / Prescricao 5 anos</li><li>Elisao (licita) ≠ Evasao (crime Lei 8.137)</li><li>Royalties + Part. Especial + CIDE</li></ul></div>
          </div>
        </section>
        <AlertBox tipo="success" titulo="Pronto para o Simulado Final!">
          <p className="text-lg">12 questoes no padrao CESGRANRIO. Precisa de 70% para completar a aula. Boa sorte, futuro Tecnico de Suprimento da Petrobras!</p>
        </AlertBox>
        
<ModuleConsolidation index={2} variant="blue" video={{ videoId: "dQw4w9WgXcQ", title: "Revisao Geral — Adm. Tributario", duration: "20:00" }} resumoVisual={{ moduloNome: "Módulo 10", tituloAula: "Simulado Geral", materia: "Administracao", images: [{ title: "Mapa Mental Completo", type: "Sintese", placeholderColor: "bg-teal-500/20" }] }} sinteseEstrategica={{ title: "Resumo Total", content: (<div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl text-lg"><p className="font-bold text-teal-600 dark:text-teal-400">Lucro: IRPJ 25% + CSLL 9% = 34%</p><p className="font-bold text-teal-600 dark:text-teal-400">Receita: PIS 1,65% + COFINS 7,6%</p><p className="text-lg text-foreground/70">ICMS=Estado | IPI=Uniao | ISS=Municipio</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", titulo: "Audio Revisao Geral", artista: "Resumo Petrobras" }} />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A equação fundamental da contabilidade é:"
          alternativas={[
            { letra: "Ativo = Passivo + Patrimônio Líquido", texto: "a", correta: false },
                { letra: "Receita = Custos + Despesas + Lucro", texto: "b", correta: false },
                { letra: "Caixa = Ativo Circulante − Passivo Circulante", texto: "c", correta: false },
                { letra: "Patrimônio Líquido = Ativo + Passivo", texto: "d", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ativo = Passivo + PL é a equação fundamental, válida para toda transação contábil sem exceção." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={[
          { id: "m10q1", pergunta: "A equacao fundamental da contabilidade e:", opcoes: [{ label: "Receita menos Custos = Lucro", valor: "a" }, { label: "Ativo = Passivo + Patrimonio Liquido", valor: "b" }, { label: "Caixa = AC menos PC", valor: "c" }, { label: "Lucro = Ativo menos Dividas", valor: "d" }], correta: "b", explicacao: "Ativo = Passivo + PL. Toda transacao contabil mantem esse equilibrio sem excecao." },
          { id: "m10q2", pergunta: "Qual tributo e de competencia ESTADUAL?", opcoes: [{ label: "ISS", valor: "a" }, { label: "IPI", valor: "b" }, { label: "ICMS", valor: "c" }, { label: "IR", valor: "d" }], correta: "c", explicacao: "ICMS e estadual (CF art. 155, II). IPI e IR sao federais. ISS e municipal." },
          { id: "m10q3", pergunta: "A Petrobras, receita acima R$78M, e obrigada a adotar:", opcoes: [{ label: "Lucro Presumido", valor: "a" }, { label: "Simples Nacional", valor: "b" }, { label: "Lucro Real", valor: "c" }, { label: "Lucro Arbitrado", valor: "d" }], correta: "c", explicacao: "Lucro Real e OBRIGATORIO para receita bruta acima de R$78M/ano." },
          { id: "m10q4", pergunta: "Emitir nota fiscal fria para reduzir IRPJ e:", opcoes: [{ label: "Elisao fiscal licita", valor: "a" }, { label: "Planejamento tributario legal", valor: "b" }, { label: "Evasao fiscal — crime (Lei 8.137/90)", valor: "c" }, { label: "Permitido no Lucro Real", valor: "d" }], correta: "c", explicacao: "Nota fiscal fria = fraude = evasao fiscal = crime (Lei 8.137/90), pena 2-5 anos." },
          { id: "m10q5", pergunta: "Petrobras (nao-cum.) compra insumos R$500k. O que ocorre?", opcoes: [{ label: "Nao paga PIS/COFINS sobre compras", valor: "a" }, { label: "Gera creditos PIS (1,65%) e COFINS (7,6%) a abater nas vendas", valor: "b" }, { label: "Deduz do IRPJ como despesa", valor: "c" }, { label: "Recupera 34% do valor", valor: "d" }], correta: "b", explicacao: "Nao-cumulativo: creditos PIS 1,65% e COFINS 7,6% nas compras, abatendo do PIS/COFINS das receitas." },
          { id: "m10q6", pergunta: "Prazo decadencial para a Fazenda lancar tributo:", opcoes: [{ label: "2 anos", valor: "a" }, { label: "3 anos", valor: "b" }, { label: "5 anos", valor: "c" }, { label: "10 anos", valor: "d" }], correta: "c", explicacao: "CTN art. 173: decadencia de 5 anos. Apos, perde o direito de lancar." },
          { id: "m10q7", pergunta: "Entregar o SPED Contabil e:", opcoes: [{ label: "Obrigacao principal", valor: "a" }, { label: "Obrigacao acessoria", valor: "b" }, { label: "Facultativo para Lucro Real", valor: "c" }, { label: "Penalidade automatica", valor: "d" }], correta: "b", explicacao: "SPED = escrituracao digital = OBRIGACAO ACESSORIA. Descumprimento gera multa." },
          { id: "m10q8", pergunta: "Royalties da Petrobras a Uniao sao:", opcoes: [{ label: "IR sobre a producao", valor: "a" }, { label: "Taxas da ANP", valor: "b" }, { label: "Participacoes Governamentais — compensacao pela exploracao do recurso natural", valor: "c" }, { label: "Contribuicoes previdenciarias", valor: "d" }], correta: "c", explicacao: "Royalties = participacoes governamentais, compensacao financeira pela exploracao de recursos da Uniao (Lei 9.478/1997)." },
          { id: "m10q9", pergunta: "O IPI nao respeita anterioridade anual porque:", opcoes: [{ label: "E de competencia estadual", valor: "a" }, { label: "Tem carater extrafiscal — instrumento de politica economica", valor: "b" }, { label: "So incide em bens de luxo", valor: "c" }, { label: "Definido pelo Congresso anualmente", valor: "d" }], correta: "b", explicacao: "IPI e extrafiscal. Com II, IE e IOF, pode ter aliquota alterada por decreto com vigencia imediata." },
          { id: "m10q10", pergunta: "No lancamento por homologacao, quem apura e paga?", opcoes: [{ label: "A Receita Federal", valor: "a" }, { label: "O proprio contribuinte", valor: "b" }, { label: "O CARF", valor: "c" }, { label: "O Judiciario", valor: "d" }], correta: "b", explicacao: "Homologacao: contribuinte apura e paga antecipadamente. Fisco verifica e homologa em ate 5 anos." },
          { id: "m10q11", pergunta: "Carga tributaria total sobre o lucro da Petrobras (IRPJ+CSLL):", opcoes: [{ label: "15%", valor: "a" }, { label: "25%", valor: "b" }, { label: "34%", valor: "c" }, { label: "9%", valor: "d" }], correta: "c", explicacao: "IRPJ: 15% + adicional 10% = 25%. CSLL: 9%. Total: 34% sobre o lucro tributavel." },
          { id: "m10q12", pergunta: "Empresa comercio, Lucro Presumido, receita R$2M. Base IRPJ:", opcoes: [{ label: "R$2.000.000", valor: "a" }, { label: "R$640.000 (32%)", valor: "b" }, { label: "R$160.000 (8%)", valor: "c" }, { label: "O lucro contabil real", valor: "d" }], correta: "c", explicacao: "Lucro Presumido comercio = 8% x receita. R$2M x 8% = R$160k. IRPJ = 15% x R$160k = R$24k." },
        ]} titulo="QUIZ: Módulo Nº 10" numero={3} variant="blue" icone="🏆" onComplete={(score) => handleModuleComplete("modulo-10", score)} />
        {completedModules.has("modulo-10") && (
          <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-700 p-8 text-center text-white shadow-xl">
            <LuCrown className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-2xl font-bold mb-2">ESPECIALISTA EM TRIBUTARIO</h2>
            <p className="text-teal-100 text-lg max-w-md mx-auto">Parabens! Voce dominou Contabilidade Basica, Sistema Tributario e Administracao Tributaria — o arsenal completo para o Tecnico de Suprimento da Petrobras.</p>
          </div>
        )}
      </TabsContent>
    </AulaTemplate>
  );
}
