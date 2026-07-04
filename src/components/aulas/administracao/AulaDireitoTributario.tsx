"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

/**
 * AulaDireitoTributario
 *
 * Técnico de Suprimento de Bens e Serviços - Administração (Nível Técnico/Médio)
 * Bloco III - Tributos
 *
 * 10 módulos premium com padrão C.E.D.E.:
 * - Resumo (ModuleConsolidation)
 * - Explicação (ContentAccordion)
 * - Exemplos (CardCarousel com casos Petrobras)
 * - Prática (QuizInterativo)
 *
 * NOVO: Rich Intro Sections com ModuleSectionHeader e callout boxes
 */

import { useState, useEffect } from "react";
import { AulaProps, QuizQuestion,
  QuestaoResolvidaStepByStep} from "../shared";
import {
  ModuleConsolidation,
  ContentAccordion,
  CardCarousel,
  QuizInterativo,
  ModuleBanner,
  ModuleSectionHeader,
  AulaTemplate,
} from "../shared";
import { TabsContent } from "@/components/ui/tabs";
import { DIREITO_TRIBUTARIO_QUIZZES } from "@/data/quizzes/direito-tributario-quizzes";
import { getModuleVariant } from "@/lib/moduleColors";

function toQQ(quiz: { questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[] } | undefined): QuizQuestion[] {
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
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos de Direito Tributário" },
  { id: "modulo-2", label: "Módulo 2", title: "Tributos Federais: Impostos" },
  { id: "modulo-3", label: "Módulo 3", title: "Tributos sobre Consumo" },
  { id: "modulo-4", label: "Módulo 4", title: "Contribuições Sociais" },
  { id: "modulo-5", label: "Módulo 5", title: "Obrigações Tributárias" },
  { id: "modulo-6", label: "Módulo 6", title: "Fiscalização e Multas" },
  { id: "modulo-7", label: "Módulo 7", title: "Normas de Incidência" },
  { id: "modulo-8", label: "Módulo 8", title: "Tributos em Operações Petrobras" },
  { id: "modulo-9", label: "Módulo 9", title: "Planejamento Tributário Lícito" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
] as const;

export default function AulaDireitoTributario(props: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_direito_tributario_";

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
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
      const progress = Math.round(
        (nextCompleted.size / (MODULE_DEFS.length - 1)) * 100
      );
      props.onUpdateProgress?.(progress);
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const previousModule = MODULE_DEFS[index - 1];
    return completedModules.has(previousModule.id);
  };

  const renderModulo1 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={1}
        titulo="Fundamentos e Competência Tributária"
        descricao="A base do Sistema Tributário Nacional e o poder de tributar dos entes federativos."
        variant={getModuleVariant(1)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="O Sistema Tributário Nacional"
          description="Entenda como a Constituição Federal organiza o poder de tributar no Brasil."
          variant={getModuleVariant(1)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Direito Tributário</strong> é um ramo do direito público que regula a relação jurídica entre o Estado (fisco) e o cidadão (contribuinte) no tocante à arrecadação de tributos. Diferentemente do direito privado, que busca equilíbrio entre partes iguais, o direito tributário existe numa relação desigual: o Estado tem autoridade para cobrar, e o contribuinte tem obrigação de pagar. Mas essa desigualdade não é arbitrária — ela é limitada por princípios constitucionais rigorosos que protegem os direitos do cidadão contra abuso estatal.</p>
            <p>CESGRANRIO exige o entendimento dos limites constitucionais do poder de tributar e os princípios gerais do Direito Tributário Nacional.</p>
            <p>Por que estudamos Direito Tributário? Porque todo movimento de dinheiro numa empresa gera consequências tributárias. Quando você vende um produto, há imposto. Quando paga funcionário, há contribuições sociais. Como técnico em suprimento de Petrobras, você contratará serviços, negociará preços e precisará entender o impacto fiscal dessas decisões. A ignorância tributária custa milhões às empresas e pode resultar em multas severas ao responsável pela operação.</p>
            <p>A relação jurídica tributária vincula o sujeito ativo (entes estatais cobradores) ao sujeito passivo (contribuintes e responsáveis tributários).</p>
            <p>A base legal brasileira é o <strong>Código Tributário Nacional (CTN)</strong>, Lei 5.172 de 1966. O CTN é a lei fundamental que define o que é tributo, como surge a obrigação tributária, quem pode cobrar, e quais são os direitos e deveres de contribuintes e Estado. Toda lei tributária posterior (IRPJ, ICMS, COFINS, etc.) está subordinada aos princípios do CTN. Conhecer o CTN é fundamental porque qualquer violação a seus princípios torna a lei tributária inconstitucional.</p>
            <p>O princípio da legalidade estrita veda a instituição ou o aumento de qualquer modalidade de tributo sem lei formal prévia autorizativa.</p>
            <p>A Constituição Federal de 1988 estabelece <strong>princípios tributários intocáveis</strong>: (1) Legalidade — imposto só é cobrado se uma lei específica autoriza; (2) Irretroatividade — não se cobra imposto com efeito para trás; (3) Igualdade — situações iguais recebem tratamento igual; (4) Capacidade Contributiva — imposto respeita a capacidade de pagar do cidadão; (5) Segurança Jurídica — regras são claras e previsíveis. Esses princípios são a defesa legal do contribuinte contra abusos.</p>
            <p>O princípio da anterioridade anual e nonagesimal resguarda a segurança jurídica ao impedir a cobrança imediata de novos impostos instituídos.</p>
            <p>Neste módulo, você aprenderá a estrutura fundamental: conceito de tributo (que não inclui multas ou taxas de serviço específico), diferença entre impostos/taxas/contribuições, e como a obrigação tributária nasce quando um fato previsto em lei ocorre. Você entenderá também o papel do CTN e como princípios constitucionais limitam o poder de tributar, criando equilíbrio entre interesse público (arrecadação) e direitos individuais (proteção do patrimônio).</p>
            <p>A diretoria jurídica da Petrobras analisa preventivamente a constitucionalidade de novas leis estaduais que busquem tributar extrações.</p>
            <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-rose-600 dark:text-rose-400 text-lg mb-2">⚖️ Pilares Fundamentais</span>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ Tributo é receita pública derivada (compulsória, por lei, não retributiva)</li>
              <li>✓ CTN é a lei geral, fonte de todos os princípios tributários</li>
              <li>✓ Princípios constitucionais são intocáveis (legalidade, igualdade, capacidade)</li>
              <li>✓ Fato gerador é the evento que gera a obrigação de pagar</li>
              <li>✓ Contribuinte é quem sofre o fato gerador; fisco é quem cobra</li>
            </ul>
          </div>
        
          
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={1}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O Estado institui a cobrança compulsória de valores decorrentes do exercício do poder de polícia sobre a fiscalização de estabelecimentos comerciais. Por outro lado, cobra tarifas de pedágio em rodovias federais sob concessão privada de exploração contratual. Essas cobranças classificam-se, respectivamente, como:"
          alternativas={[
            { letra: "A", texto: "taxa (receita tributária) e preço público (receita não tributária)", correta: true },
              { letra: "B", texto: "imposto (receita tributária) e taxa (receita tributária)", correta: false },
              { letra: "C", texto: "contribuição (receita tributária) e imposto (receita tributária)", correta: false },
              { letra: "D", texto: "preço público (receita não tributária) e taxa (receita tributária)", correta: false },
              { letra: "E", texto: "tarifa (receita não tributária) e contribuição (receita tributária)", correta: false }
          ]}
          dicaEstrategica="O pedágio sob concessão contratual classifica-se como preço público/tarifa (natureza não tributária e contratual)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "A taxa decorrente do poder de polícia é tributo (compulsória e de direito público)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={1}
        variant={getModuleVariant(1)}
        resumoVisual={{
          moduloNome: "Módulo 1",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Hierarquia Legal", type: "Diagrama", placeholderColor: "bg-cyan-500/20" },
            { title: "Entes Federativos", type: "Mapa Mental", placeholderColor: "bg-cyan-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Destaque Estratégico",
          content: <p className="text-lg italic">{"Competência é indelegável. O que é meu, é meu e ninguém tasca (só posso delegar a capacidade de arrecadar)."}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />
      <ContentAccordion mode="stacked" 
        titulo="📖 Explicação Detalhada"
        icone="⚖️"
        slides={[
          {
            title: "O que é Tributo?",
            content: "Segundo o CTN (Art. 3º), tributo é toda prestação pecuniária compulsória, em moeda ou cujo valor nela se possa exprimir, que não constitua sanção de ato ilícito, instituída em lei e cobrada mediante atividade administrativa plenamente vinculada."
          },
          {
            title: "Competência vs Capacidade",
            content: "A competência tributária (poder de legislar) é indelegável. Já a capacidade tributária ativa (poder de cobrar e arrecadar) pode ser delegada de um ente para outro (ex: da União para o ITR)."
          },
          {
            title: "Espécies Tributárias",
            content: "A doutrina majoritária e o STF adotam a teoria pentapartida: Impostos, Taxas, Contribuições de Melhoria, Empréstimos Compulsórios e Contribuições Especiais."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <span>🎯</span> Exemplos e Casos Práticos
        </h3>
        <CardCarousel
          cards={[
            {
              title: "IPVA Petrobras",
              descricao: "A frota de veículos da Petrobras paga IPVA para os Estados onde estão licenciados, exemplificando a competência estadual.",
              corFundo: "bg-cyan-100 dark:bg-cyan-900/30"
            },
            {
              title: "Taxas de Fiscalização",
              descricao: "A ANP cobra taxas de fiscalização para monitorar as atividades de exploração e produção de petróleo.",
              corFundo: "bg-cyan-100 dark:bg-cyan-900/30"
            },
            {
              title: "Contribuições Sociais",
              descricao: "A Petrobras, como empregadora, é um dos maiores contribuintes da Seguridade Social no Brasil.",
              corFundo: "bg-cyan-100 dark:bg-cyan-900/30"
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Fundamentos Tributários"
        numero={1}
        variant={getModuleVariant(1)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-1"])}
        onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={2}
        titulo="Tributos Federais: Impostos"
        descricao="O detalhamento dos impostos de competência da União que afetam a Petrobras."
        variant={getModuleVariant(2)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="IRPJ, CSLL e Impostos de Comércio Exterior"
          description="Os tributos que incidem diretamente sobre o lucro e as operações internacionais."
          variant={getModuleVariant(2)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A União detém a competência para os impostos que mais pesam no caixa das grandes corporações. O <strong>Imposto de Renda Pessoa Jurídica (IRPJ)</strong> e a <strong>Contribuição Social sobre o Lucro Líquido (CSLL)</strong> incidem sobre o resultado financeiro positivo da empresa. Para a Petrobras, que opera com bilhões em lucro, o planejamento tributário correto nessas áreas é vital para a sustentabilidade do negócio.</p>
            <p>A banca exige discernimento de impostos federais da União. Lembre-se: imposto de importação (II) e exportação (IE) regulam o comércio externo.</p>
            <p>Além do lucro, a União tributa o comércio internacional. O <strong>Imposto de Importação (II)</strong> incide quando a Petrobras traz tecnologia ou equipamentos do exterior. Já o <strong>Imposto sobre Exportação (IE)</strong> pode incidir na saída de petróleo bruto, dependendo das políticas de mercado do governo federal. Esses tributos são extrafiscais, ou seja, servem mais para regular a economia do que propriamente para arrecadar dinheiro.</p>
            <p>O Imposto sobre Operações Financeiras (IOF) incide sobre transações de crédito, câmbio e seguros, operando como termômetro de liquidez.</p>
            <p>O princípio da legalidade tributária exige que todo tributo seja criado ou majorado exclusivamente por lei formal, vedando a delegação dessa competência ao Executivo.</p>
            <p>O Imposto de Renda Pessoa Jurídica (IRPJ) e a Contribuição Social (CSLL) incidem diretamente sobre a renda líquida e o lucro obtido.</p>
            <p>A irretroatividade tributária protege o contribuinte ao proibir a cobrança de tributos sobre fatos geradores anteriores à vigência da lei que os instituiu.</p>
            <p>A alíquota regressiva e progressiva é aplicada em impostos diretos federais para atender ao princípio constitucional da capacidade contributiva.</p>
            <p>O princípio da anterioridade anual garante que o tributo criado em determinado exercício só possa ser cobrado a partir do exercício fiscal subsequente completo.</p>
            <p>O Repetro simplifica o recolhimento de tributos federais incidentes sobre importação temporária de plataformas de perfuração da Petrobras.</p>
            
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
          enunciado="O Imposto de Renda (IR) incide sobre:"
          alternativas={[
            { letra: "A", texto: "Apenas salários", correta: false },
              { letra: "B", texto: "Renda e proventos de qualquer natureza (salários, aluguéis, lucros, ganhos)", correta: true },
              { letra: "C", texto: "Apenas pessoas jurídicas", correta: false },
              { letra: "D", texto: "Apenas vendas de produtos", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "IR tem campo amplo: renda (salários), proventos (aluguéis, dividendos), ganhos de capital (venda de imóvel), prêmios, heranças acima de certos valores." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={2}
        variant={getModuleVariant(2)}
        resumoVisual={{
          moduloNome: "Módulo 2",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Impostos sobre Lucro", type: "Tabela", placeholderColor: "bg-cyan-500/20" },
            { title: "Comércio Exterior", type: "Fluxograma", placeholderColor: "bg-cyan-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Dica de Mestre",
          content: <p className="text-lg italic">{"Federais = Lucro e Fronteira (IRPJ e Comércio Exterior)"}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <ContentAccordion mode="stacked" 
        titulo="Detalhamento Técnico"
        slides={[
          {
            title: "IRPJ e CSLL",
            content: "Incidência sobre o lucro das empresas. A Petrobras utiliza geralmente o regime de Lucro Real devido ao seu faturamento."
          },
          {
            title: "Comércio Exterior",
            content: "Impostos incidentes na entrada (II) e saída (IE) de bens. Essenciais para operações de prospecção com equipamentos importados."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Importação de Sondas",
            descricao: "O II incide na entrada de equipamentos de perfuração vindos de Singapura ou Noruega.",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "Exportação de Óleo",
            descricao: "A Petrobras monitora as alíquotas de IE na venda de barris para o mercado chinês.",
            corFundo: "bg-teal-100 dark:bg-teal-900/30"
          },
          {
            title: "Lucro da Holding",
            descricao: "O IRPJ é calculado de forma consolidada sobre o lucro operacional de todas as unidades.",
            corFundo: "bg-amber-100 dark:bg-amber-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Tributos Federais"
        numero={2}
        variant={getModuleVariant(2)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-2"])}
        onComplete={(score: number) => handleQuizComplete("modulo-2", score)}
      />
    </div>
  );

  const renderModulo3 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={3}
        titulo="Tributos sobre Consumo"
        descricao="ICMS, IPI e o papel da Petrobras como substituta tributária."
        variant={getModuleVariant(3)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="ICMS, ISS e Contribuições incidentes"
          description="A tributação indireta que afeta a circulação de bens e serviços."
          variant={getModuleVariant(3)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>Os <strong>tributos sobre consumo</strong> são aqueles que incidem sobre a circulação de mercadorias e a prestação de serviços. São chamados "indiretos" porque o fabricante/prestador paga ao fisco, mas repassa o custo ao consumidor final via preço.</p>
            <p>A banca cobra com frequência a incidência de tributos sobre consumo: ICMS (estadual), IPI (federal) e ISS (competência municipal).</p>
            <p>O <strong>ICMS</strong> é estadual e incide sobre circulação de mercadorias. Já o <strong>ISS</strong> é municipal e incide sobre serviços. Para a Petrobras, a substituição tributária no ICMS é um tema central, onde a empresa retém e paga o imposto por toda a cadeia.</p>
            <p>O ICMS incide sobre operações de circulação física de mercadorias e serviços de transporte interestadual, intermunicipal e comunicações.</p>
            <p>O fato gerador da obrigação tributária é a situação concreta prevista em lei que, ao se realizar, faz nascer o vínculo jurídico entre o sujeito ativo e o passivo.</p>
            <p>O ISS é de competência dos Municípios e do DF, incidindo sobre a prestação de serviços técnicos listados na Lei Complementar 116/03.</p>
            <p>A base de cálculo e a alíquota são os elementos quantitativos fundamentais que, aplicados conjuntamente, determinam o valor exato do tributo a recolher.</p>
            <p>A não-cumulatividade constitucional do ICMS assegura a compensação tributária do imposto cobrado em cada etapa anterior de transações.</p>
            <p>O lançamento tributário formaliza a exigência do crédito pelo Fisco, podendo ser de ofício, por declaração do contribuinte ou por homologação de autolançamento.</p>
            <p>Em refinarias da Petrobras, a circulação física interestadual de derivados de combustíveis exige cálculo fiscal preciso de retenções estaduais.</p>
            
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="ICMS (Imposto sobre Circulação de Mercadorias) é um tributo:"
          alternativas={[
            { letra: "A", texto: "Federal coletado pela Receita Federal", correta: false },
              { letra: "B", texto: "Estadual legislado por cada estado", correta: true },
              { letra: "C", texto: "Municipal coletado pela prefeitura", correta: false },
              { letra: "D", texto: "Internacional", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Arrecadação vai para o estado onde ocorre a operação."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "ICMS é tributo estadual." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Cada estado legisla sua alíquota (varia 7-18%)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={3}
        variant={getModuleVariant(3)}
        resumoVisual={{
          moduloNome: "Módulo 3",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Cadeia do ICMS", type: "Infográfico", placeholderColor: "bg-emerald-500/20" },
            { title: "Retenção de ISS", type: "Diagrama", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Dica de Mestre",
          content: <p className="text-lg italic">{"Consumo = Indireto (Alguém paga, você sente no preço final)."}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <ContentAccordion mode="stacked" 
        titulo="Detalhamento Técnico"
        slides={[
          {
            title: "ICMS e Substituição",
            content: "A Petrobras, como refinaria, recolhe o ICMS de toda a cadeia de combustíveis (ST)."
          },
          {
            title: "ISS nos Serviços",
            content: "Retenção na fonte em serviços tomados de terceiros, conforme a legislação municipal."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Gasolina no Posto",
            descricao: "O ICMS já foi pago pela Petrobras na refinaria através do regime de Substituição Tributária.",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "Consultoria Técnica",
            descricao: "A Petrobras retém o ISS do prestador e repassa à prefeitura da sede do serviço.",
            corFundo: "bg-teal-100 dark:bg-teal-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Tributos sobre Consumo"
        numero={3}
        variant={getModuleVariant(3)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-3"])}
        onComplete={(score: number) => handleQuizComplete("modulo-3", score)}
      />
    </div>
  );

  const renderModulo4 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={4}
        titulo="Contribuições Sociais e de Intervenção"
        descricao="PIS, COFINS e CIDE: a base do financiamento social e regulatório."
        variant={getModuleVariant(4)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Financiamento da Seguridade e Intervenção Econômica"
          description="O impacto do PIS e da COFINS no faturamento e a incidência da CIDE-Combustíveis."
          variant={getModuleVariant(4)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>As contribuições sociais (PIS/PASEP e COFINS) incidem sobre a receita bruta das empresas e são fundamentais para o financiamento da seguridade social. Para uma empresa do porte da Petrobras, essas contribuições representam volumes gigantescos de recursos.</p>
            <p>CESGRANRIO exige diferenciar contribuições de seguridade social (PIS/COFINS) de taxas estatais de serviços. Atente-se ao regime cumulativo e não-cumulativo.</p>
            <p>Existe ainda a <strong>CIDE-Combustíveis</strong>, que incide sobre a importação e a comercialização de petróleo e derivados. Ela tem finalidade extrafiscal, servindo para ajustar preços de mercado.</p>
            <p>O PIS e a COFINS destinam-se ao financiamento da seguridade social, recaindo diretamente sobre o faturamento de pessoas jurídicas.</p>
            <p>A responsabilidade tributária pode ser atribuída a terceiros por lei, como no caso dos administradores de empresas que respondem por infrações cometidas com excesso de poderes.</p>
            <p>O regime não-cumulativo do PIS e COFINS aplica alíquotas de 1,65% e 7,60%, respectivamente, autorizando créditos sobre insumos industriais.</p>
            <p>A solidariedade tributária vincula múltiplos devedores ao pagamento integral do crédito, sem benefício de ordem entre os coobrigados perante o Fisco.</p>
            <p>A CIDE-Combustíveis é a contribuição de intervenção no domínio econômico incidente sobre importação e comercialização de derivados de petróleo.</p>
            <p>A substituição tributária progressiva concentra a obrigação de recolhimento nas refinarias, simplificando a fiscalização ao longo de toda a cadeia de distribuição.</p>
            <p>A Petrobras calcula créditos fiscais de PIS e COFINS sobre contratos de afretamento marítimo de plataformas de exploração pré-sal.</p>
            
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="INSS (Instituto Nacional Seguridade Social) é uma contribuição de:"
          alternativas={[
            { letra: "A", texto: "Apenas empregador", correta: false },
              { letra: "B", texto: "Empregado e empregador", correta: true },
              { letra: "C", texto: "Apenas governo", correta: false },
              { letra: "D", texto: "Não é obrigatória", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Autônomo: 20% de sua renda."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "INSS: contribuição dupla." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Empregado: 8-11% do salário." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Empregador: 20% sobre folha." }
          ]}
        />

        <ModuleConsolidation
        index={4}
        variant={getModuleVariant(4)}
        resumoVisual={{
          moduloNome: "Módulo 4",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Financiamento Social", type: "Diagrama", placeholderColor: "bg-teal-500/20" },
            { title: "CIDE-Combustíveis", type: "Fluxograma", placeholderColor: "bg-teal-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Dica de Mestre",
          content: <p className="text-lg italic">{"CIDE = Intervenção (Governo usando imposto para regular o preço do óleo)."}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 4,
            moduloTitulo: "Módulo 4",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <ContentAccordion mode="stacked" 
        titulo="Detalhamento Técnico"
        slides={[
          {
            title: "PIS/COFINS",
            content: "Incidência sobre a receita bruta. Essencial entender o regime não-cumulativo."
          },
          {
            title: "CIDE-Combustíveis",
            content: "Contribuição específica para regulação do mercado de energia e combustíveis."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Receita Operacional",
            descricao: "O PIS/COFINS incide sobre cada venda de derivado realizada pela companhia.",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "Regulação de Preços",
            descricao: "A CIDE pode ser zerada ou aumentada pelo governo para estabilizar preços de bomba.",
            corFundo: "bg-teal-100 dark:bg-teal-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Contribuições Sociais"
        numero={4}
        variant={getModuleVariant(4)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-4"])}
        onComplete={(score: number) => handleQuizComplete("modulo-4", score)}
      />
    </div>
  );

  const renderModulo5 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={5}
        titulo="Obrigações e Crédito Tributário"
        descricao="O nascimento da dívida com o Fisco e como ela se extingue."
        variant={getModuleVariant(5)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Fato Gerador e Lançamento"
          description="A jornada desde a ocorrência do fato até a constituição definitiva do crédito."
          variant={getModuleVariant(5)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>obrigação tributária</strong> nasce com o <strong>Fato Gerador</strong>: uma situação prevista em lei que, ao ocorrer, obriga o pagamento do tributo. Por exemplo, vender gasolina é o fato gerador do ICMS. Uma vez ocorrido, o tributo deve ser quantificado e formalizado através do <strong>Lançamento</strong>.</p>
            <p>Questões sobre obrigações acessórias focam na sua finalidade instrumental de permitir que o fisco audite a apuração da obrigação tributária principal.</p>
            <p>O <strong>crédito tributário</strong> é o direito do Estado de receber o valor. Ele pode ser extinto pelo pagamento, mas também por compensação, anistia ou decisão judicial. Entender esses processos é crucial para evitar a inadimplência fiscal.</p>
            <p>A obrigação principal surge com o fato gerador e visa ao recolhimento do tributo; a obrigação acessória visa a obrigações formais.</p>
            <p>A exclusão do crédito tributário ocorre pela isenção — renúncia prévia em lei — e pela anistia — perdão das penalidades anteriores ao lançamento definitivo.</p>
            <p>A emissão e o armazenamento eletrônico de Notas Fiscais Eletrônicas (NF-e) constituem obrigações acessórias de observância obrigatória.</p>
            <p>A compensação extingue o crédito tributário quando o contribuinte possui créditos líquidos e certos reconhecidos em lei a serem confrontados com o débito existente.</p>
            <p>O descumprimento de prazos para entrega de declarações fiscais digitais (como SPED) enseja aplicação imediata de multas administrativas.</p>
            <p>A decadência extingue o direito do Fisco de lançar o tributo após cinco anos; a prescrição extingue o direito de ajuizar a execução fiscal do crédito já lançado.</p>
            <p>Técnicos de suprimentos da Petrobras conferem a regularidade formal de notas fiscais recebidas nas bases terrestres de estocagem.</p>
            
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A obrigação tributária principal é:"
          alternativas={[
            { letra: "A", texto: "Registrar operações", correta: false },
              { letra: "B", texto: "Pagar o tributo ao fisco", correta: true },
              { letra: "C", texto: "Informar dados", correta: false },
              { letra: "D", texto: "Manter documentos", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="É pessoal de quem sofreu o fato gerador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Obrigação Principal: dever de pagar tributo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Surge quando ocorre fato gerador (evento definido em lei)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={5}
        variant={getModuleVariant(5)}
        resumoVisual={{
          moduloNome: "Módulo 5",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Nascimento do Crédito", type: "Diagrama", placeholderColor: "bg-amber-500/20" },
            { title: "Extinção do Crédito", type: "Fluxograma", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Dica de Mestre",
          content: <p className="text-lg italic">{"Fato Gerador ocorreu? Dívida nasceu! Lançamento formalizou? Cobrança começou!"}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 5,
            moduloTitulo: "Módulo 5",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <ContentAccordion mode="stacked" 
        titulo="Processos Administrativos"
        slides={[
          {
            title: "Modalidades de Lançamento",
            content: "Lançamento por homologação (contribuinte declara/paga) vs Lançamento de ofício (fisco cobra)."
          },
          {
            title: "Suspensão do Crédito",
            content: "Situações onde a cobrança é pausada, como moratória ou liminar judicial."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Auto-Lançamento",
            descricao: "A Petrobras declara e paga seus próprios impostos mensalmente (homologação).",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "Parcelamento",
            descricao: "Uso de REFIS para regularizar débitos tributários antigos e suspender a cobrança.",
            corFundo: "bg-teal-100 dark:bg-teal-900/30"
          },
          {
            title: "Decadência",
            descricao: "Perda do prazo do Fisco para lançar o imposto (geralmente 5 anos).",
            corFundo: "bg-amber-100 dark:bg-amber-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Obrigações e Crédito"
        numero={5}
        variant={getModuleVariant(5)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-5"])}
        onComplete={(score: number) => handleQuizComplete("modulo-5", score)}
      />
    </div>
  );

  const renderModulo6 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={6}
        titulo="Fiscalização e Infrações"
        descricao="O poder de polícia do Fisco e as punições por descumprimento."
        variant={getModuleVariant(6)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Poder de Império e Garantias do Contribuinte"
          description="Como ocorrem os procedimentos fiscais e quais os limites da autoridade tributária."
          variant={getModuleVariant(6)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O Fisco tem o poder de fiscalizar permanentemente todos os atos dos contribuintes. No entanto, esse poder não é absoluto; o fiscal deve seguir ritos legais e respeitar o sigilo de dados não tributários.</p>
            <p>A prova cobra as modalidades de extinção do crédito tributário (pagamento, compensação, decadência, prescrição) e suspensão de exigibilidade.</p>
            <p>As infrações podem ser por falta de pagamento ou por erro em obrigações acessórias. As <strong>multas</strong> podem ser moratórias ou punitivas.</p>
            <p>A decadência tributária extingue o direito do fisco de constituir o crédito tributário após o decurso do prazo de cinco anos de lei.</p>
            <p>O ICMS — imposto de competência estadual — incide sobre circulação de mercadorias, prestações de serviço de comunicação e transporte interestadual e intermunicipal.</p>
            <p>A interposição de recurso administrativo ou a concessão de liminar judicial suspendem a exigibilidade de cobrança ativa de tributo.</p>
            <p>A guerra fiscal entre estados ocorre quando entes federativos concedem incentivos ilegais de ICMS para atrair investimentos ao arrepio das normas do CONFAZ.</p>
            <p>A execução fiscal é a ação judicial promovida pela Fazenda Pública para realizar a cobrança de Certidões de Dívida Ativa (CDA).</p>
            <p>O diferencial de alíquota do ICMS (DIFAL) regula as operações interestaduais com consumidor final não contribuinte, equilibrando a partilha entre estados de origem e destino.</p>
            <p>A diretoria tributária da Petrobras gerencia defesas fiscais contra autos de infração estaduais de ICMS cobrados indevidamente.</p>
            
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={6}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O processo de auditoria fiscal começa quando:"
          alternativas={[
            { letra: "A", texto: "Sempre que há operação", correta: false },
              { letra: "B", texto: "Fisco seleciona empresa para verificação de documentos e registros", correta: true },
              { letra: "C", texto: "Empresa solicita", correta: false },
              { letra: "D", texto: "Nunca ocorre", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Pode ser por sorteio, seleção de risco, ou denúncia."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Auditoria fiscal: fisco realiza verificação de livros, notas fiscais, documentos." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={6}
        variant={getModuleVariant(6)}
        resumoVisual={{
          moduloNome: "Módulo 6",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Tipos de Multas", type: "Tabela", placeholderColor: "bg-rose-500/20" },
            { title: "Rito de Punição", type: "Diagrama", placeholderColor: "bg-rose-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Dica de Mestre",
          content: <p className="text-lg italic">{"Multa não é tributo! Tributo é obrigação, multa é punição."}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 6,
            moduloTitulo: "Módulo 6",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <ContentAccordion mode="stacked" 
        titulo="Ritos de Fiscalização"
        slides={[
          {
            title: "O Procedimento Fiscal",
            content: "Termo de início de fiscalização e prazos para entrega de documentos ao auditor."
          },
          {
            title: "Espécies de Multas",
            content: "Multas isoladas (obrigações acessórias) vs Multas de ofício (falta de pagamento)."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Auditoria interna",
            descricao: "Equipes de compliance da Petrobras revisam os impostos antes do envio do SPED.",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "CARF",
            descricao: "Conselho onde a Petrobras discute administrativamente cobranças bilionárias da Receita.",
            corFundo: "bg-teal-100 dark:bg-teal-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Fiscalização e Infrações"
        numero={6}
        variant={getModuleVariant(6)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-6"])}
        onComplete={(score: number) => handleQuizComplete("modulo-6", score)}
      />
    </div>
  );

  const renderModulo7 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={7}
        titulo="Normas de Incidência Tributária"
        descricao="Compreenda como o imposto é calculado: fato gerador, base e alíquota."
        variant={getModuleVariant(7)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Normas de Incidência"
          description="A estrutura fundamental que define o nascimento e o valor da obrigação tributária."
          variant={getModuleVariant(7)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Norma de Incidência Tributária</strong> é a regra que estrutura como um imposto é cobrado. Toda norma tributária tem três componentes essenciais: (1) <strong>Fato Gerador</strong>; (2) <strong>Base de Cálculo</strong>; (3) <strong>Alíquota</strong>.</p>
            <p>A banca exige conhecimentos das normas de incidência tributária, isenções legais, imunidades constitucionais e hipóteses de não-incidência.</p>
            <p>O ISS é um tributo municipal que incide sobre a prestação de serviços definidos na Lei Complementar 116/2003, com alíquotas variando de 2% a 5% por município.</p>
            <p>As imunidades são vedações constitucionais absolutas de cobrança de impostos; as isenções são dispensas legais concedidas por lei ordinária.</p>
            <p>Os serviços de engenharia de manutenção prestados por empresas contratadas pela Petrobras estão sujeitos à retenção do ISS no município onde são executados.</p>
            <p>A importação temporária de máquinas para exploração petrolífera goza de suspensão ou isenção fiscal sob o regime especial Repetro.</p>
            <p>O conflito de competência entre ICMS e ISS surge nas chamadas operações mistas, em que há tanto fornecimento de mercadorias quanto prestação de serviços associados.</p>
            <p>A interpretação de isenções tributárias no Código Tributário Nacional (CTN) deve ser efetuada de forma literal e restritiva de lei.</p>
            <p>Os serviços de engenharia de manutenção prestados por empresas contratadas pela Petrobras estão sujeitos à retenção do ISS no município onde são efetivamente executados pelo contratado.</p>
            <p>A Petrobras usufrui de regimes especiais federais para desonerar a montagem e importação de componentes para sondas submarinas.</p>
            
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={7}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Fato Gerador é a situação legal/factual que:"
          alternativas={[
            { letra: "A", texto: "Cancela obrigação tributária", correta: false },
              { letra: "B", texto: "Origina direito do fisco de cobrar tributo", correta: true },
              { letra: "C", texto: "Reduz tributo", correta: false },
              { letra: "D", texto: "Não afeta tributação", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Momento de ocorrência é crítico (define qual ano/período é tributado)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Fato Gerador: evento definido em lei que gera direito de tributar." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={7}
        variant={getModuleVariant(7)}
        resumoVisual={{
          moduloNome: "Módulo 7",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Pilares da Incidência", type: "Diagrama", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Dica de Mestre",
          content: <p className="text-lg italic">{"Fato Gerador é o gatilho; Base e Alíquota definem o tamanho do estrago no caixa."}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 7,
            moduloTitulo: "Módulo 7",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <ContentAccordion mode="stacked" 
        titulo="Detalhamento Técnico"
        slides={[
          {
            title: "Modalidades de Alíquotas",
            content: "Fixas, progressivas, proporcionais ou ad rem (valor fixo por unidade)."
          },
          {
            title: "Quantificação da Base",
            content: "Como o valor da operação é definido para fins de tributação (valor comercial vs valor de pauta)."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Venda de Combustível",
            descricao: "Fato Gerador: Saída da Refinaria. Base: Valor de Venda. Alíquota: 18%.",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "Ganho de Capital",
            descricao: "Fato Gerador: Venda de ativo com lucro. Base: Lucro obtido. Alíquota: 15%.",
            corFundo: "bg-teal-100 dark:bg-teal-900/30"
          },
          {
            title: "Serviço Prestado",
            descricao: "Fato Gerador: Conclusão do serviço. Base: Valor da NF. Alíquota: 5%.",
            corFundo: "bg-amber-100 dark:bg-amber-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Normas de Incidência"
        numero={7}
        variant={getModuleVariant(7)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-7"])}
        onComplete={(score: number) => handleQuizComplete("modulo-7", score)}
      />
    </div>
  );

  const renderModulo8 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={8}
        titulo="Tributos em Operações Petrobras"
        descricao="Explore a estrutura tributária específica da indústria de óleo e gás brasileira."
        variant={getModuleVariant(8)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Operações de Óleo e Gás"
          description="Do poço ao posto: como a Petrobras lida com a carga tributária do setor."
          variant={getModuleVariant(8)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>tributação da Petrobras</strong> envolve Royalties e Participações Especiais, além dos impostos convencionais. Os <strong>Royalties</strong> são uma compensação financeira pela exploração de recursos não renováveis.</p>
            <p>Questões de tributos da Petrobras focam no Repetro-Sped e na incidência tributária complexa do setor de exploração de hidrocarbonetos.</p>
            <p>O planejamento tributário lícito — elisão fiscal — utiliza as lacunas e alternativas previstas em lei para reduzir a carga tributária antes da ocorrência do fato gerador.</p>
            <p>O setor de petróleo e gás submete-se a regime especial de recolhimento de royalties e incidência de participações especiais governamentais.</p>
            <p>A evasão fiscal é ato ilícito que ocorre após o fato gerador, mediante fraude, simulação ou omissão dolosa nas declarações apresentadas ao fisco competente.</p>
            <p>A apuração tributária de operações na Bacia de Campos exige controle fiscal estrito sobre a divisa física de águas territoriais estaduais.</p>
            <p>O abuso de forma e o propósito negocial são critérios adotados pela jurisprudência do CARF para desconsiderar operações de planejamento tributário agressivo.</p>
            <p>As autuações de ICMS por transporte interestadual de gás natural são objeto de disputas judiciais complexas entre estados produtores.</p>
            <p>A evasão fiscal é ato ilícito que ocorre após a materialização do fato gerador, mediante fraude, simulação ou omissão dolosa nas declarações apresentadas ao órgão fiscalizador competente.</p>
            <p>A Petrobras atua como substituta tributária e recolhe bilhões de reais em impostos retidos na comercialização nacional de combustíveis.</p>
            
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={8}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Royalties de petróleo em Petrobras são:"
          alternativas={[
            { letra: "A", texto: "Despesa operacional comum", correta: false },
              { letra: "B", texto: "Contribuição mínima de 5% da produção mensal ao Estado (proprietário da reserva)", correta: true },
              { letra: "C", texto: "Imposto de renda", correta: false },
              { letra: "D", texto: "Taxa de refino", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Calculado sobre produção valorizada."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Royalties: percentual mínimo da produção (5%) que Petrobras paga ao Estado pela exploração do recurso natural." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={8}
        variant={getModuleVariant(8)}
        resumoVisual={{
          moduloNome: "Módulo 8",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Royalties e Taxas", type: "Diagrama", placeholderColor: "bg-blue-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Dica de Mestre",
          content: <p className="text-lg italic">{"Royalties se paga pela produção; Imposto se paga pelo lucro."}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 8,
            moduloTitulo: "Módulo 8",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <ContentAccordion mode="stacked" 
        titulo="Detalhamento do Setor"
        slides={[
          {
            title: "O Funcionamento dos Royalties",
            content: "Base de cálculo sobre a produção bruta e repasse para Estados e Municípios."
          },
          {
            title: "REPETRO",
            content: "Regime que suspende tributos federais na importação de equipamentos para exploração."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Pré-Sal",
            descricao: "Campos gigantes que geram altas Participações Especiais para a União.",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "Navios-Sonda",
            descricao: "Equipamentos importados sob regime de suspensão tributária (REPETRO).",
            corFundo: "bg-teal-100 dark:bg-teal-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Operações Petrobras"
        numero={8}
        variant={getModuleVariant(8)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-8"])}
        onComplete={(score: number) => handleQuizComplete("modulo-8", score)}
      />
    </div>
  );

  const renderModulo9 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={9}
        titulo="Planejamento Tributário Lícito"
        descricao="Estratégias para otimização da carga tributária dentro da legalidade."
        variant={getModuleVariant(9)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Elisão vs Evasão"
          description="A diferença entre reduzir impostos legalmente e cometer crime fiscal."
          variant={getModuleVariant(9)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Planejamento Tributário (Elisão)</strong> é o uso de meios lícitos para reduzir o ônus fiscal. A <strong>Evasão</strong>, por outro lado, é ilegal.</p>
            <p>Provas abordam a legitimidade do planejamento tributário elisivo, distinguindo-o de simulações com abuso de formas jurídicas (fraude fiscal).</p>
            <p>O processo administrativo tributário federal assegura ao contribuinte o direito de impugnar o lançamento e recorrer em duas instâncias antes da inscrição em dívida ativa.</p>
            <p>A elisão fiscal legítima busca reestruturar operações para se enquadrar em regimes tributários que gozem de alíquotas ou bases reduzidas.</p>
            <p>A execução fiscal regida pela Lei 6.830/80 permite à Fazenda Pública cobrar judicialmente o crédito inscrito em Certidão de Dívida Ativa com presunção de certeza.</p>
            <p>A importação de peças industriais por drawback suspende tributos de insumos que serão exportados após acoplados na plataforma.</p>
            <p>A Súmula Vinculante e os Temas de Repercussão Geral do STF uniformizam a interpretação das normas tributárias, reduzindo a insegurança jurídica dos contribuintes.</p>
            <p>A desconsideração de negócios jurídicos pelo fisco ocorre quando identificada simulação que busque unicamente a sonegação tributária.</p>
            <p>A Súmula Vinculante e os Temas de Repercussão Geral do STF uniformizam a interpretação das normas tributárias em todo o território nacional, reduzindo a insegurança jurídica dos contribuintes.</p>
            <p>O comitê tributário interno da Petrobras estuda anualmente rotas logísticas mais eficientes para mitigar custos de ICMS de distribuição.</p>
            
          </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={9}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Planejamento Tributário Lícito é:"
          alternativas={[
            { letra: "A", texto: "Sempre ilegal", correta: false },
              { letra: "B", texto: "Organizar negócio legalmente para minimizar carga tributária", correta: true },
              { letra: "C", texto: "Fraude de impostos", correta: false },
              { letra: "D", texto: "Não é permitido", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Planejamento Lícito: uso inteligente de estrutura jurídica/contratual permitida por lei para reduzir imposto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Diferente de fraude (proibida)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
        index={9}
        variant={getModuleVariant(9)}
        resumoVisual={{
          moduloNome: "Módulo 9",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Elisão Fiscal", type: "Mapa Mental", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Dica de Mestre",
          content: <p className="text-lg italic">{"Elisão = Lícita (Antes do fato gerador). Evasão = Crime (Depois do fato gerador)."}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 9,
            moduloTitulo: "Módulo 9",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <ContentAccordion mode="stacked" 
        titulo="Detalhamento do Planejamento"
        slides={[
          {
            title: "Elisão Fiscal",
            content: "Organizar os negócios de forma a aproveitar as lacunas ou opções legais que reduzam o imposto."
          },
          {
            title: "Evasão Fiscal",
            content: "Crime de sonegação, ocultação de bens ou falsificação de documentos para não pagar."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Regime Tributário",
            descricao: "Escolher entre Lucro Real ou Presumido conforme a margem de lucro da operação.",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "Isenções Setoriais",
            descricao: "Uso de benefícios fiscais concedidos por lei para atividades de pesquisa e inovação.",
            corFundo: "bg-teal-100 dark:bg-teal-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Planejamento Tributário"
        numero={9}
        variant={getModuleVariant(9)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-9"])}
        onComplete={(score: number) => handleQuizComplete("modulo-9", score)}
      />
    </div>
  );

  const renderModulo10 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={10}
        titulo="Simulado Geral"
        descricao="Teste seus conhecimentos em Direito Tributário com foco total Cesgranrio."
        variant={getModuleVariant(10)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Avaliação Final"
          description="Questões selecionadas para simular o nível de dificuldade do concurso."
          variant={getModuleVariant(10)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
          <p>
            O <strong>Simulado Geral</strong> é a avaliação consolidada de todo o conteúdo de Direito Tributário. Este módulo reúne questões que abrangem todos os tópicos estudados: fundamentos do sistema tributário nacional, tributos federais, estaduais e municipais, obrigações tributárias, fiscalização, normas de incidência e planejamento tributário lícito. A dificuldade das questões reflete o padrão cobrado em concursos Cesgranrio para a posição de Técnico em Suprimento.
          </p>
          <p>
            Como técnico em suprimento na Petrobras, você será responsável por operações que geram consequências tributárias complexas. Este simulado valida sua capacidade de identificar rapidamente o tipo de tributo envolvido, a competência do ente tributante, a base de cálculo e as obrigações acessórias. Em situações reais, essa análise determina se a empresa fica em dia com suas obrigações ou incorre em multas severas e juros moratórios.
          </p>
          <p>
            Este módulo oferece uma oportunidade para testar seus conhecimentos antes do concurso real. Procure resolver as questões sem consultar o material, cronometrando seu tempo. Questões que você erra indicam tópicos para revisão final. A recomendação é: leia o enunciado com calma, identifique o fato gerador e o tributo envolvido, localize a base de cálculo na legislação e verifique se há isenções ou benefícios aplicáveis.
          </p>

          <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-lg mb-2">🎯 Dicas para o Simulado</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ Leia cada enunciado duas vezes antes de responder</li>
              <li>✓ Identifique o tributo e sua base de cálculo primeiro</li>
              <li>✓ Verifique se há isenções ou benefícios aplicáveis</li>
              <li>✓ Preste atenção em competência (federal, estadual, municipal)</li>
              <li>✓ Considere obrigações acessórias (informações, registros)</li>
              <li>✓ Contexto Petrobras: operações com derivados, importação, logística</li>
            </ul>
          </div>
        </div>
      </section>

              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={10}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Empresa fatura R$ 2 milhões. Lucro 20%. Incide IRPJ 25%, COFINS 7,65%, PIS 1,65%. Total de tributos ="
          alternativas={[
            { letra: "A", texto: "R$ 200 mil", correta: false },
              { letra: "B", texto: "R$ 400 mil", correta: false },
              { letra: "C", texto: "R$ 650 mil", correta: true },
              { letra: "D", texto: "R$ 1 milhão", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Opção mais próxima é R$ 650 (pode incluir outros tributos)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "IRPJ: 2.000k × 20% = 400k × 25% = 100k." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "COFINS: 2.000k × 7,65% = 153k. PIS: 2.000k × 1,65% = 33k." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Total = 286k." }
          ]}
        />

        <ModuleConsolidation
        index={10}
        variant={getModuleVariant(10)}
        resumoVisual={{
          moduloNome: "Módulo 10",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Resumo Global", type: "Diagrama", placeholderColor: "bg-rose-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Dica de Mestre",
          content: <p className="text-lg italic">{"Leia o enunciado com calma. Identifique o tributo e a competência primeiro."}</p>
        }}
        podcast={{
            aulaId: "direitotributario",
            aulaTitulo: "Direito Tributario",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 10,
            moduloTitulo: "Módulo 10",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <ContentAccordion mode="stacked" 
        titulo="Tópicos-Chave para Revisão"
        slides={[
          {
            title: "Sistema Tributário Nacional",
            content: "Estrutura de competência tributária entre União, Estados e Municípios. Impostos, taxas e contribuições. Princípios constitucionais e limitações ao poder de tributar."
          },
          {
            title: "Tributos Federais e Estaduais",
            content: "IRPJ, CSLL, IPI, ICMS, COFINS, PIS, IOF, Impostos sobre Propriedade. Bases de cálculo, alíquotas, isenções e benefícios fiscais em contexto Petrobras."
          },
          {
            title: "Obrigações Tributárias",
            content: "Obrigação principal (pagar tributo) e acessória (entregar informações, manter registros). Prazos, formas de pagamento, acessões (juros, multas), decadência e prescrição."
          },
          {
            title: "Planejamento e Evasão",
            content: "Elisão fiscal (lícita, antes do fato gerador) vs Evasão (crime, após fato gerador). Normas anti-elusão. Responsabilidade pessoal em operações tributárias irregulares."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Análise de Enunciados",
            descricao: "Em concursos, primeiro identifique: (1) tipo de operação, (2) tributo envolvido, (3) quem é o contribuinte, (4) base de cálculo. Ignore detalhes irrelevantes.",
            corFundo: "bg-rose-100 dark:bg-rose-900/30"
          },
          {
            title: "Contexto Petrobras",
            descricao: "Operações típicas: exploração de petróleo (ICMS sobre valor agregado), importação (II + ICMS), distribuição de derivados (ICMS estadual), venda ao consumidor (ICMS + PIS + COFINS).",
            corFundo: "bg-orange-100 dark:bg-orange-900/30"
          },
          {
            title: "Armadilhas Comuns",
            descricao: "Confundir competência (quem cobra), base de cálculo (sobre quanto) e alíquota (quanto cobra). Não considerar isenções. Esquecer obrigações acessórias (guias, informações).",
            corFundo: "bg-amber-100 dark:bg-amber-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Simulado Geral"
        numero={10}
        variant={getModuleVariant(10)}
        questoes={toQQ(DIREITO_TRIBUTARIO_QUIZZES["modulo-10"])}
        onComplete={(score: number) => handleQuizComplete("modulo-10", score)}
      />
    </div>
  );

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Direito Tributário"
      descricao="Sistema tributário brasileiro para técnico em suprimento - Administração"
      duracao="20h"
      materiaNome={props.materiaNome}
      materiaCor={props.materiaCor}
      materiaId={props.materiaId}
      isCompleted={completedModules.size >= MODULE_DEFS.length - 1}
      currentProgress={props.currentProgress}
      onComplete={props.onComplete}
      loading={props.loading}
    >
      <TabsContent value="modulo-1" className="space-y-12 mt-0">
        {renderModulo1()}
      </TabsContent>
      <TabsContent value="modulo-2" className="space-y-12 mt-0">
        {renderModulo2()}
      </TabsContent>
      <TabsContent value="modulo-3" className="space-y-12 mt-0">
        {renderModulo3()}
      </TabsContent>
      <TabsContent value="modulo-4" className="space-y-12 mt-0">
        {renderModulo4()}
      </TabsContent>
      <TabsContent value="modulo-5" className="space-y-12 mt-0">
        {renderModulo5()}
      </TabsContent>
      <TabsContent value="modulo-6" className="space-y-12 mt-0">
        {renderModulo6()}
      </TabsContent>
      <TabsContent value="modulo-7" className="space-y-12 mt-0">
        {renderModulo7()}
      </TabsContent>
      <TabsContent value="modulo-8" className="space-y-12 mt-0">
        {renderModulo8()}
      </TabsContent>
      <TabsContent value="modulo-9" className="space-y-12 mt-0">
        {renderModulo9()}
      </TabsContent>
      <TabsContent value="modulo-10" className="space-y-12 mt-0">
        {renderModulo10()}
      </TabsContent>
    </AulaTemplate>
  );
}
