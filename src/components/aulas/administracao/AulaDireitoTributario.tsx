"use client";

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

import { useState } from "react";
import { AulaProps } from "../shared";
import {
  ModuleConsolidation,
  ContentAccordion,
  CardCarousel,
  QuizInterativo,
  ModuleBanner,
  ModuleSectionHeader
} from "../shared";
import { DIREITO_TRIBUTARIO_QUIZZES } from "@/data/quizzes/direito-tributario-quizzes";
import { getModuleVariant } from "@/lib/moduleColors";

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
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaDireitoTributario({ onComplete }: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  const handleQuizComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      setCompletedModules((prev) => new Set([...prev, moduleId]));
    }
  };

  const isModuleUnlocked = (moduleId: string) => {
    const moduleIndex = MODULE_DEFS.findIndex((m) => m.id === moduleId);
    if (moduleIndex === 0) return true;
    const prevModuleId = MODULE_DEFS[moduleIndex - 1].id;
    return completedModules.has(prevModuleId);
  };

  const renderModulo1 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={1}
        titulo="Fundamentos e Competência Tributária"
        descricao="A base do Sistema Tributário Nacional e o poder de tributar dos entes federativos."
        variant="indigo"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={1}
          title="O Sistema Tributário Nacional"
          description="Entenda como a Constituição Federal organiza o poder de tributar no Brasil."
          variant="indigo"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            O <strong>Direito Tributário</strong> é um ramo do direito público que regula a relação jurídica entre o Estado (fisco) e o cidadão (contribuinte) no tocante à arrecadação de tributos. Diferentemente do direito privado, que busca equilíbrio entre partes iguais, o direito tributário existe numa relação desigual: o Estado tem autoridade para cobrar, e o contribuinte tem obrigação de pagar. Mas essa desigualdade não é arbitrária — ela é limitada por princípios constitucionais rigorosos que protegem os direitos do cidadão contra abuso estatal.
          </p>
          <p>
            Por que estudamos Direito Tributário? Porque todo movimento de dinheiro numa empresa gera consequências tributárias. Quando você vende um produto, há imposto. Quando paga funcionário, há contribuições sociais. Como técnico em suprimento de Petrobras, você contratará serviços, negociará preços e precisará entender o impacto fiscal dessas decisões. A ignorância tributária custa milhões às empresas e pode resultar em multas severas ao responsável pela operação.
          </p>
          <p>
            A base legal brasileira é o <strong>Código Tributário Nacional (CTN)</strong>, Lei 5.172 de 1966. O CTN é a lei fundamental que define o que é tributo, como surge a obrigação tributária, quem pode cobrar, e quais são os direitos e deveres de contribuintes e Estado. Toda lei tributária posterior (IRPJ, ICMS, COFINS, etc.) está subordinada aos princípios do CTN. Conhecer o CTN é fundamental porque qualquer violação a seus princípios torna a lei tributária inconstitucional.
          </p>
          <p>
            A Constituição Federal de 1988 estabelece <strong>princípios tributários intocáveis</strong>: (1) Legalidade — imposto só é cobrado se uma lei específica autoriza; (2) Irretroatividade — não se cobra imposto com efeito para trás; (3) Igualdade — situações iguais recebem tratamento igual; (4) Capacidade Contributiva — imposto respeita a capacidade de pagar do cidadão; (5) Segurança Jurídica — regras são claras e previsíveis. Esses princípios são a defesa legal do contribuinte contra abusos.
          </p>
          <p>
            Neste módulo, você aprenderá a estrutura fundamental: conceito de tributo (que não inclui multas ou taxas de serviço específico), diferença entre impostos/taxas/contribuições, e como a obrigação tributária nasce quando um fato previsto em lei ocorre. Você entenderá também o papel do CTN e como princípios constitucionais limitam o poder de tributar, criando equilíbrio entre interesse público (arrecadação) e direitos individuais (proteção do patrimônio).
          </p>

          <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-2">⚖️ Pilares Fundamentais</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Tributo é receita pública derivada (compulsória, por lei, não retributiva)</li>
              <li>✓ CTN é a lei geral, fonte de todos os princípios tributários</li>
              <li>✓ Princípios constitucionais são intocáveis (legalidade, igualdade, capacidade)</li>
              <li>✓ Fato gerador é the evento que gera a obrigação de pagar</li>
              <li>✓ Contribuinte é quem sofre o fato gerador; fisco é quem cobra</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={1}
        variant="indigo"
        video={{
          videoId: "tributario-m1",
          title: "Competência Tributária",
          duration: "12:30"
        }}
        resumoVisual={{
          moduloNome: "Módulo 1",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Hierarquia Legal", type: "Diagrama", placeholderColor: "bg-indigo-500/20" },
            { title: "Entes Federativos", type: "Mapa Mental", placeholderColor: "bg-indigo-500/20" },
          ],
        }}
        maceteVisual={{
          title: "O Pulo do Gato",
          content: <p className="text-sm italic">{"Competência é indelegável. O que é meu, é meu e ninguém tasca (só posso delegar a capacidade de arrecadar)."}</p>
        }}
        audio={{
          audioUrl: "#",
          titulo: "Podcast: Fundamentos Tributários",
          artista: "Prof. Direito"
        }}
      />
      <ContentAccordion
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
              corFundo: "bg-indigo-100 dark:bg-indigo-900/30"
            },
            {
              title: "Taxas de Fiscalização",
              descricao: "A ANP cobra taxas de fiscalização para monitorar as atividades de exploração e produção de petróleo.",
              corFundo: "bg-indigo-100 dark:bg-indigo-900/30"
            },
            {
              title: "Contribuições Sociais",
              descricao: "A Petrobras, como empregadora, é um dos maiores contribuintes da Seguridade Social no Brasil.",
              corFundo: "bg-indigo-100 dark:bg-indigo-900/30"
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Fundamentos Tributários"
        numero={1}
        variant="indigo"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-1"].questions}
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
        variant="indigo"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={2}
          title="IRPJ, CSLL e Impostos de Comércio Exterior"
          description="Os tributos que incidem diretamente sobre o lucro e as operações internacionais."
          variant="indigo"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            A União detém a competência para os impostos que mais pesam no caixa das grandes corporações. O <strong>Imposto de Renda Pessoa Jurídica (IRPJ)</strong> e a <strong>Contribuição Social sobre o Lucro Líquido (CSLL)</strong> incidem sobre o resultado financeiro positivo da empresa. Para a Petrobras, que opera com bilhões em lucro, o planejamento tributário correto nessas áreas é vital para a sustentabilidade do negócio.
          </p>
          <p>
            Além do lucro, a União tributa o comércio internacional. O <strong>Imposto de Importação (II)</strong> incide quando a Petrobras traz tecnologia ou equipamentos do exterior. Já o <strong>Imposto sobre Exportação (IE)</strong> pode incidir na saída de petróleo bruto, dependendo das políticas de mercado do governo federal. Esses tributos são extrafiscais, ou seja, servem mais para regular a economia do que propriamente para arrecadar dinheiro.
          </p>
        </div>
      </section>

      <ModuleConsolidation
        index={2}
        variant="indigo"
        video={{
          videoId: "tributario-m2",
          title: "Impostos Federais em Detalhes",
          duration: "10:30"
        }}
        resumoVisual={{
          titulo: "Principais Tributos Federais",
          itens: [
            "IRPJ: 15% + 10% de adicional sobre o lucro",
            "CSLL: 9% sobre o lucro líquido",
            "II/IE: Regulação do fluxo internacional"
          ]
        }}
        maceteVisual={{
          titulo: "Dica de Mestre",
          texto: "Federais = Lucro e Fronteira (IRPJ e Comércio Exterior)"
        }}
        audio={{
          url: "/audio/tributario-m2.mp3",
          titulo: "Resumo Módulo 2",
          artista: "Especialista Tributário"
        }}
      />

      <ContentAccordion
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
            corFundo: "bg-violet-100 dark:bg-violet-900/30"
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
        variant="indigo"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-2"].questions}
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
        variant="emerald"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={3}
        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            Os <strong>tributos sobre consumo</strong> são aqueles que incidem sobre a circulação de mercadorias e a prestação de serviços. Diferem de impostos sobre renda (que afetam a pessoa que ganha) — esses atingem o ato de comercializar. São chamados "indiretos" porque o fabricante/prestador paga ao fisco, mas repassa o custo ao consumidor final via preço. Não há escapatória: qualquer produto que você compra tem múltiplos tributos sobre consumo embutidos no preço.
          </p>
          <p>
            O <strong>ICMS (Imposto sobre Circulação de Mercadorias e Serviços)</strong> é o maior tributo sobre consumo do Brasil. É estadual (cada estado legisla sua alíquota), com alíquotas variando de 7% a 18% dependendo do estado e do produto. Sistema de crédito/débito: quando uma empresa compra insumo com ICMS, ela abate esse ICMS da venda — não paga ICMS em cascata. Combustível, por exemplo, tem alta alíquota de ICMS (14-18%) porque estados dependem dessa arrecadação.
          </p>
          <p>
            O <strong>ISS (Imposto sobre Serviços)</strong> é municipal — cada prefeitura define alíquota entre 2% e 5%. Incide sobre prestação de serviços (consultoria, limpeza, reparos, trabalhos técnicos). Obrigação de reter na fonte: quem contrata um serviço retém o ISS e repassa à prefeitura. Isso protege o município de fraude. Petrobras, ao contratar serviços em diferentes cidades, enfrenta ISS em várias alíquotas.
          </p>
          <p>
            <strong>PIS e COFINS</strong> são contribuições federais sobre a receita bruta. PIS (Programa de Integração Social): 1,65% de faturamento. COFINS (Contribuição para Financiamento da Seguridade Social): 7,65% de faturamento. Juntas, somam 9,3% sobre receita — não há crédito total. Essas contribuições financiam benefícios sociais e programas de integração. Todas as empresas pagam (salvo muito pequenas) independentemente de lucro.
          </p>
          <p>
            Neste módulo, você compreenderá a cascata tributária: produto sai da refinaria com ICMS, passa por distribuidor com mais ICMS, chega ao posto de gasolina com ICMS, e o consumidor final paga tudo isso embutido no preço. Verá exemplos práticos: quando Petrobras vende combustível ao distribuidor, incide ICMS; quando distribuidor revende, incide mais ICMS (mas pode abater o anterior). Compreenderá também como Petrobras, em suas operações internas, negocia ISS em serviços contratados em diferentes estados.
          </p>

          <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-2">🛒 Tributos sobre Consumo</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ ICMS: Estadual, 7-18%, sistema de crédito/débito, não cascata</li>
              <li>✓ ISS: Municipal, 2-5%, retenção na fonte em serviços</li>
              <li>✓ PIS: Federal, 1,65% sobre faturamento bruto</li>
              <li>✓ COFINS: Federal, 7,65% sobre faturamento bruto</li>
              <li>✓ Cascata: produto passa por múltiplos tributos até chegar ao consumidor final</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        cards={[
          { title: "ICMS", content: "Imposto sobre Circulação de Mercadorias e Serviços (estadual)", variant: getModuleVariant(3) },
          { title: "ISS", content: "Imposto sobre Serviços de Qualquer Natureza (municipal)", variant: getModuleVariant(3) },
          { title: "PIS/COFINS", content: "Contribuições sobre receita bruta (federal)", variant: getModuleVariant(3) },
          { title: "Alíquota Média", content: "ICMS 7-18% (varia por estado e produto)", variant: getModuleVariant(3) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
        titulo="Tributos sobre Consumo"
        numero={3}
        variant="emerald"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-3"].questions}
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
        variant="violet"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={4}
          title="Financiamento da Seguridade e Intervenção Econômica"
          description="O impacto do PIS e da COFINS no faturamento e a incidência da CIDE-Combustíveis."
          variant="violet"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            As contribuições sociais (PIS/PASEP e COFINS) incidem sobre a receita bruta das empresas e são fundamentais para o financiamento da seguridade social (Saúde, Previdência e Assistência Social). Para uma empresa do porte da Petrobras, essas contribuições representam volumes gigantescos de recursos.
          </p>
          <p>
            Existe ainda a <strong>CIDE-Combustíveis</strong> (Contribuição de Intervenção no Domínio Econômico), que incide sobre a importação e a comercialização de petróleo e derivados. Ela tem finalidade extrafiscal, servindo para ajustar preços de mercado e financiar subsídios ao transporte e projetos ambientais.
          </p>
        </div>
      </section>

      <ModuleConsolidation
        index={4}
        variant="violet"
        video={{
          videoId: "tributario-m4",
          title: "PIS/COFINS e CIDE",
          duration: "09:20"
        }}
        resumoVisual={{
          titulo: "Principais Contribuições",
          itens: [
            "PIS/COFINS: Sobre faturamento ou importação",
            "CIDE-Combustíveis: Incidência específica no setor",
            "Não-Cumulatividade: Essencial para cálculos industriais"
          ]
        }}
        maceteVisual={{
          titulo: "Dica de Mestre",
          texto: "CIDE = Intervenção (Governo usando imposto para regular o preço do óleo)."
        }}
        audio={{
          url: "/audio/tributario-m4.mp3",
          titulo: "Resumo Módulo 4",
          artista: "Especialista Tributário"
        }}
      />

      <ContentAccordion
        titulo="Detalhamento das Contribuições"
        slides={[
          {
            title: "PIS/COFINS Cumulativo vs Não-Cumulativo",
            content: "Diferença entre regimes de incidência conforme o enquadramento tributário da operação."
          },
          {
            title: "CIDE-Combustíveis",
            content: "Tributo destinado ao ajuste de preços e financiamento de infraestrutura de transportes."
          }
        ]}
      />

      <CardCarousel
        cards={[
          {
            title: "Faturamento Bruto",
            descricao: "Cálculo mensal de PIS e COFINS sobre as vendas de derivados.",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "Importação de Gás",
            descricao: "Incidência de PIS/COFINS-Importação na entrada de GLP internacional.",
            corFundo: "bg-violet-100 dark:bg-violet-900/30"
          },
          {
            title: "Recursos da CIDE",
            descricao: "Monitoramento do destino legal da contribuição para projetos do setor.",
            corFundo: "bg-amber-100 dark:bg-amber-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Contribuições e CIDE"
        numero={4}
        variant="violet"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-4"].questions}
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
        variant="amber"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={5}
          title="Fato Gerador e Lançamento"
          description="A jornada desde a ocorrência do fato até a constituição definitiva do crédito."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            A <strong>obrigação tributária</strong> nasce com o <strong>Fato Gerador</strong>: uma situação prevista em lei que, ao ocorrer, obriga o pagamento do tributo. Por exemplo, vender gasolina é o fato gerador do ICMS. Uma vez ocorrido, o tributo deve ser quantificado e formalizado através do <strong>Lançamento</strong>.
          </p>
          <p>
            O <strong>crédito tributário</strong> é o direito do Estado de receber o valor. Ele pode ser extinto pelo pagamento, mas também por compensação, anistia ou decisão judicial. Entender esses processos é crucial para evitar a inadimplência fiscal, que traz multas pesadíssimas e impede a empresa de contratar com o Poder Público.
          </p>
        </div>
      </section>

      <ModuleConsolidation
        index={5}
        variant="amber"
        video={{
          videoId: "tributario-m5",
          title: "Crédito e Obrigação Tributária",
          duration: "11:10"
        }}
        resumoVisual={{
          titulo: "Fluxo Tributário",
          itens: [
            "Fato Gerador: Ação que cria o dever de pagar",
            "Lançamento: Procedimento administrativo de cobrança",
            "Extinção: Pagamento ou alternativas legais"
          ]
        }}
        maceteVisual={{
          titulo: "Dica de Mestre",
          texto: "Fato Gerador ocorreu? Dívida nasceu! Lançamento formalizou? Cobrança começou!"
        }}
        audio={{
          url: "/audio/tributario-m5.mp3",
          titulo: "Resumo Módulo 5",
          artista: "Especialista Tributário"
        }}
      />

      <ContentAccordion
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
            corFundo: "bg-violet-100 dark:bg-violet-900/30"
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
        variant="amber"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-5"].questions}
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
        variant="rose"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={6}
          title="Poder de Império e Garantias do Contribuinte"
          description="Como ocorrem os procedimentos fiscais e quais os limites da autoridade tributária."
          variant="rose"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            O Fisco tem o poder de fiscalizar permanentemente todos os atos dos contribuintes. Isso inclui o acesso a livros contábeis, extratos bancários e sistemas eletrônicos. No entanto, esse poder não é absoluto; o fiscal deve seguir ritos legais e respeitar o sigilo de dados não tributários.
          </p>
          <p>
            As infrações podem ser por falta de pagamento ou por erro em obrigações acessórias. As <strong>multas</strong> podem ser moratórias (por atraso) ou punitivas (pelo descumprimento legal), chegando em alguns casos a 150% do valor do imposto. A regularidade fiscal é um pilar da governança corporativa da Petrobras.
          </p>
        </div>
      </section>

      <ModuleConsolidation
        index={6}
        variant="rose"
        video={{
          videoId: "tributario-m6",
          title: "Fiscalização e Multas",
          duration: "07:50"
        }}
        resumoVisual={{
          titulo: "Combate à Evasão",
          itens: [
            "Fiscalização: Verificação sistemática de conformidade",
            "Auto de Infração: Documento que formaliza a multa",
            "Defesa Administrativa: Direito de contestar no CARF"
          ]
        }}
        maceteVisual={{
          titulo: "Dica de Mestre",
          texto: "Multa não é tributo! Tributo é obrigação, multa é punição."
        }}
        audio={{
          url: "/audio/tributario-m6.mp3",
          titulo: "Resumo Módulo 6",
          artista: "Especialista Tributário"
        }}
      />

      <ContentAccordion
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
            corFundo: "bg-violet-100 dark:bg-violet-900/30"
          },
          {
            title: "Denúncia Espontânea",
            descricao: "Pagar o erro antes de ser fiscalizado livra a empresa da multa punitiva.",
            corFundo: "bg-amber-100 dark:bg-amber-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Fiscalização e Multas"
        numero={6}
        variant="rose"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-6"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-6", score)}
      />
    </div>
  );

  const renderModulo7 = () => (
    <div className="space-y-6">
      <ModuleBanner module={7} title="Normas de Incidência Tributária" />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={7}
          title="Normas de Incidência Tributária"
          description="Compreenda como o imposto é calculado: fato gerador, base e alíquota."
          variant="rose"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            A <strong>Norma de Incidência Tributária</strong> é a regra que estrutura como um imposto é cobrado. Toda norma tributária tem três componentes essenciais: (1) <strong>Fato Gerador</strong> — situação de fato ou jurídica que origina obrigação; (2) <strong>Base de Cálculo</strong> — valor sobre qual a alíquota incide; (3) <strong>Alíquota</strong> — percentual que se aplica. Entender essa estrutura é fundamental para calcular qualquer imposto corretamente.
          </p>
          <p>
            O <strong>Fato Gerador</strong> é o evento que "dispara" a obrigação tributária. Momento de ocorrência é crítico — é quando nasce obrigação de pagar. Para IR, fato gerador é "auferição de renda" — quando você recebe dinheiro. Para ICMS, é "saída de mercadoria da empresa" — quando produto sai do estabelecimento. Para Taxa, é "exercício de atividade estatal" — quando governo oferece um serviço. Sem fato gerador, não há obrigação.
          </p>
          <p>
            A <strong>Base de Cálculo</strong> é o valor sobre qual se aplica a alíquota. Para IR, a base é a renda auferida menos deduções (salário - deduções = base). Para ICMS, é o preço da operação (valor da mercadoria). Para IPI, é o valor da industrialização. A base é definida por lei — não é o quanto você acha que "merecia" pagar, mas o que a lei estabelece como valor tributável. Calcular errado a base é uma das infrações mais comuns.
          </p>
          <p>
            A <strong>Alíquota Tributária</strong> é o percentual aplicado à base. Pode ser: Fixa (mesmo percentual para todos), Progressiva (aumenta conforme cresce a base — como IR pessoa física), Regressiva (diminui conforme cresce — raro), ou Seletiva (diferente por tipo de bem/serviço — como IPI). A alíquota é definida em lei e não muda arbitrariamente. Lei de 2024 não pode retroagir e aumentar alíquota para 2023. Alíquota é previsível — segurança jurídica ao contribuinte.
          </p>
          <p>
            Neste módulo, você aprenderá a estrutura completa de qualquer imposto: identificar qual é o fato gerador (quando nasce obrigação), qual é a base de cálculo (valor tributável), qual é a alíquota (percentual). Verá exemplos práticos de Petrobras: quando vende gasolina, fato gerador é saída da mercadoria, base é preço de venda, alíquota é 18% (ICMS em SP) — resultado é R$ 5 × 18% = R$ 0,90 por litro. Compreenderá também que muitas infrações tributárias vêm de erro de cálculo — base mal calculada ou alíquota mal interpretada.
          </p>

          <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-2">📐 Estrutura da Incidência</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Fato Gerador: Evento que origina obrigação (quando nasce dever de pagar)</li>
              <li>✓ Base de Cálculo: Valor sobre qual incide alíquota (definido por lei)</li>
              <li>✓ Alíquota: Percentual (fixa, progressiva, regressiva ou seletiva)</li>
              <li>✓ Fórmula: Base × Alíquota = Valor do Tributo</li>
              <li>✓ Segurança: Todos componentes definidos em lei, sem arbitrariedade</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        cards={[
          { title: "Fato Gerador", content: "Situação legal que origina obrigação tributária", variant: getModuleVariant(7) },
          { title: "Base de Cálculo", content: "Valor sobre qual se aplica alíquota (renda, preço venda)", variant: getModuleVariant(7) },
          { title: "Alíquota", content: "Percentual aplicado à base (taxa tributária)", variant: getModuleVariant(7) },
          { title: "Valor do Tributo", content: "Base de Cálculo × Alíquota = Valor final", variant: getModuleVariant(7) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Fato Gerador da Obrigação",
            content: "Definição legal: situação de fato ou jurídica que origina obrigação tributária. Momento de ocorrência é crítico (quando nasce obrigação). Exemplos: IR = auferição de renda (fato), ICMS = saída de mercadoria (fato), Taxa = exercício de atividade estatal (fato jurídico)."
          },
          {
            title: "Base de Cálculo",
            content: "Valor sobre qual alíquota incide. IR: renda auferida (base). ICMS: preço da operação (base). IPI: valor da industrialização (base). Pode ser quantificado em dinheiro, quantidade ou valor patrimonial."
          },
          {
            title: "Alíquota Tributária",
            content: "Percentual fixado por lei para aplicação sobre base. Pode ser: fixa (mesmo percentual), progressiva (aumenta conforme base - IR), regressiva (diminui), seletiva (diferente por produto). Definida no momento da lei, não pode mudar arbitrariamente."
          },
          {
            title: "Incidência em Operações Petrobras",
            content: "Exemplo venda de gasolina: Fato Gerador = saída de combustível da refinaria. Base = preço de venda R$ 5,00. ICMS alíquota 18%. Tributo = R$ 5,00 × 18% = R$ 0,90 por litro."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Cálculo de Incidência</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📊",
              title: "IR Pessoa Física",
              description: "Fato Gerador: ganho de renda R$ 5.000. Base: R$ 5.000 - deduções R$ 500 = R$ 4.500. Alíquota: 22,5%. Tributo: R$ 1.012,50."
            },
            {
              emoji: "🏭",
              title: "ICMS em Produto",
              description: "Fato Gerador: saída de pneu da fábrica. Base: R$ 100 (preço). Alíquota: 12%. ICMS: R$ 12 por pneu."
            },
            {
              emoji: "💼",
              title: "PIS em Faturamento",
              description: "Fato Gerador: faturamento de R$ 1 milhão. Base: R$ 1 milhão. Alíquota: 1,65%. PIS: R$ 16.500."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-7"]}
        onComplete={(score: number) => handleQuizComplete("modulo-7", score)}
      />
    </div>
  );

  const renderModulo8 = () => (
    <div className="space-y-6">
      <ModuleBanner module={8} title="Tributos em Operações Petrobras" />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={8}
          title="Tributos em Operações Petrobras"
          description="Explore a estrutura tributária específica da indústria de óleo e gás brasileiro."
          variant="rose"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            A <strong>tributação de Petrobras</strong> é mais complexa que empresa comum porque envolve tributos específicos do setor de óleo e gás. Além dos impostos convencionais (IRPJ, ICMS, COFINS), Petrobras paga Royalties (compensação ao Estado por exploração de recurso natural), Participações Especiais (quando campo é super-lucrativo), e enfrenta regimes especiais de tributação. Entender essa estrutura é essencial para técnico em suprimento que negocia com Petrobras — qualquer contrato tem implicações tributárias.
          </p>
          <p>
            Os <strong>Royalties</strong> são tributo específico de setor petrolífero. Petrobras, como concessionária que explora reserva de petróleo (que pertence ao povo/Estado), obrigadamente paga percentual mínimo de 5% da produção mensal ao Estado. Calculado sobre "preço de referência" (tipicamente preço do Brent no mercado internacional). Exemplo: campo produz 100 mil barris/mês, Brent está R$ 80/barril, Royalties = 5 mil barris × R$ 80 = R$ 400 mil ao mês para o Estado.
          </p>
          <p>
            As <strong>Participações Especiais (PE)</strong> são contribuição extraordinária cobrada em campos super-lucrativos. Função: quando campo gera lucros extraordinários, Estado participa desse lucro anormal. Cálculo: quando receita líquida ultrapassa certos patamares, alíquota de PE aumenta progressivamente (até 40% do lucro). Isso significa que em anos muito bons (preço do petróleo alto), Estado recebe mais. Em anos ruins, PE pode ser zero. Essa estrutura busca repartir benefícios extraordinários.
          </p>
          <p>
            A <strong>Estrutura da Cadeia Tributária</strong> em Petrobras funciona assim: Exploração (Royalties + PE), Refino (IRPJ sobre lucro de refino), Distribuição (ICMS estadual em cada transferência), Varejo (ICMS + PIS/COFINS ao consumidor). Cada elo tem seus tributos. Petrobras estrategicamente tenta otimizar essa cascata — usar créditos de ICMS em distribuição para abater em refino, compensar prejuízos em um elo com lucros em outro.
          </p>
          <p>
            Neste módulo, você compreenderá a estrutura completa: Royalties como compensação ao Estado pela exploração de recurso, Participações Especiais em anos de lucro extraordinário, IRPJ aplicado a cada elo (exploração, refino, distribuição), ICMS em cada estado (alíquota varia), PIS/COFINS sobre receita. Verá exemplos práticos: produção de 1 milhão de barris/mês, cada tributo aplicado, carga tributária total. Entenderá também como negociações de suprimento em Petrobras consideram "preço com/sem tributo" — sempre há implicação fiscal.
          </p>

          <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-2">🛢️ Tributos Petrobras</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Royalties: Mínimo 5% produção mensal, sobre preço de referência</li>
              <li>✓ Participações Especiais: Até 40% quando campo é super-lucrativo</li>
              <li>✓ IRPJ: 15-25% sobre lucro de cada atividade (exploração, refino, distribuição)</li>
              <li>✓ ICMS: Estadual em cada venda (7-18% conforme estado e produto)</li>
              <li>✓ PIS/COFINS: 9,3% sobre receita de venda de produtos finais</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        cards={[
          { title: "Royalties", content: "Tributo por exploração de petróleo (mínimo 5% da produção)", variant: getModuleVariant(8) },
          { title: "Participações Especiais", content: "Contribuição adicional quando campos são lucrativos", variant: getModuleVariant(8) },
          { title: "IRPJ", content: "Imposto renda de pessoa jurídica sobre lucro (15-25%)", variant: getModuleVariant(8) },
          { title: "Tributos Indiretos", content: "ICMS, COFINS, PIS em venda de combustíveis", variant: getModuleVariant(8) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Royalties de Petróleo",
            content: "Tributo específico de setor de óleo e gás. Petrobras (concessionária) paga ao Estado (proprietário da reserva) percentual mínimo de 5% da produção mensal. Calculado sobre valor de referência (preço do Brent). Garante compensação ao Estado pela exploração de recurso natural."
          },
          {
            title: "Participações Especiais (PE)",
            content: "Contribuição extraordinária cobrada quando campo de petróleo é super-lucrativo. Cálculo: quando receita líquida ultrapassa certos patamares, alíquota de PE aumenta progressivamente (até 40% do lucro). Objetivo: Estado participa de lucros extraordinários de campos rentáveis."
          },
          {
            title: "IRPJ em Petrobras",
            content: "Petrobras (PJ) paga IRPJ sobre lucro real. Alíquota 15% + adicional 10% sobre lucro > R$ 20 mil/mês. Lucro Real: resultado contábil com ajustes fiscais. Abatimentos: royalties, participações especiais, despesas operacionais."
          },
          {
            title: "Tributos na Cadeia de Distribuição",
            content: "Refino: IRPJ + tributos sobre venda. Distribuição: ICMS estadual sobre transferência para distribuidoras. Varejo: ICMS + PIS/COFINS cobrado ao consumidor final. Estrutura integrada de tributação em toda cadeia."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplo de Tributação em Petrobras</h3>
        <CardCarousel
          cards={[
            {
              emoji: "⛰️",
              title: "Royalties de Campo",
              description: "Campo produz 100 mil barris/mês. Preço Brent R$ 80/barril. Royalties 5% = 5 mil barris × R$ 80 = R$ 400 mil/mês ao governo."
            },
            {
              emoji: "💰",
              title: "Participação Especial",
              description: "Campo super-lucrativo: receita R$ 100 milhões, custos R$ 20 milhões, lucro R$ 80 milhões. PE 30% = R$ 24 milhões ao governo."
            },
            {
              emoji: "🛢️",
              title: "Carga Tributária Combustível",
              description: "Gasolina: custo refino R$ 3,50 + royalties/PE R$ 0,30 + IRPJ R$ 0,20 + ICMS R$ 0,90 + COFINS R$ 0,30 = R$ 6,20 ao consumidor."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-8"]}
        onComplete={(score: number) => handleQuizComplete("modulo-8", score)}
      />
    </div>
  );

  const renderModulo9 = () => (
    <div className="space-y-6">
      <ModuleBanner module={9} title="Planejamento Tributário Lícito" />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={9}
          title="Planejamento Tributário Lícito"
          description="Conheça estratégias legais de otimização tributária e os limites éticos do planejamento."
          variant="rose"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            O <strong>Planejamento Tributário</strong> é a atividade de organizar estrutura jurídica/contratual de negócios para minimizar carga tributária, sempre permanecendo dentro da lei. Não é fraude — é uso legal da lei para reduzir impostos. Exemplo: empresa pequena pode escolher "regime simplificado" (alíquota menor) em vez de "lucro real" (alíquota maior). Ambas são legais, mas uma reduz imposto. Isso é planejamento tributário lícito.
          </p>
          <p>
            Há uma distinção crucial: <strong>Elisão Fiscal</strong> é redução legal de imposto usando brechas/interpretações da lei. É permitida. Exemplo: empresa resgata dividendo (não tributado) em vez de distribuir lucro (tributado). Tecnicamente legal, reduz carga. Diferente é <strong>Evasão Fiscal</strong> — violação da lei através de fraude, falsificação, ocultação. Evasão é crime. Administrador que autoriza evasão pode ir preso, sofrer bloqueio de bens, responder criminalmente.
          </p>
          <p>
            <strong>Estratégias legítimas</strong> incluem: (1) Escolha de regime tributário — Simple, Presumido ou Real conforme negócio; (2) Aproveitamento de incentivos legais — Lei oferece abatimentos para investimento em P&D, por exemplo; (3) Estruturação contratual — forma como contrato é redigido influencia tributação (exemplo: fazer em várias parcelas vs. uma única pode gerar IRPJ diferente); (4) Timing de operações — realizar dentro de período tributário vantajoso.
          </p>
          <p>
            Há limite ético: STJ criou conceito de "Abuso de Direito" — mesmo que tecnicamente dentro da lei, se operação foi feita com propósito **exclusivo** de fraude e contra a "substância econômica", fisco pode desconhecer. Exemplo: empresa cria 50 filiais apenas para fragmentar faturamento e usar alíquota de Simple — isso pode ser considerado abuso mesmo sendo tecnicamente legal. Planejamento tributário responsável busca reduzir imposto mantendo propósito econômico real.
          </p>
          <p>
            Neste módulo, você entenderá a diferença entre Elisão (legal) e Evasão (crime), aprenderá estratégias legítimas que Petrobras usa (abatimento de royalties em IRPJ, compensação de prejuízos), e compreenderá os limites: onde termina "planejamento criativo" e começa "fraude". Verá exemplos práticos: escolher regime tributário adequado, estruturar contratos de forma vantajosa, aproveitar incentivos legais. Aprenderá também responsabilidade: se você, como técnico, participa de fraude tributária, você pode responder solidariamente junto com empresa.
          </p>

          <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-2">⚖️ Planejamento Tributário Ético</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Elisão Fiscal: Legal, usa brechas/interpretações da lei</li>
              <li>✓ Evasão Fiscal: Ilegal, fraude, falsificação, ocultação</li>
              <li>✓ Estratégias: Regime tributário, incentivos, estrutura contratual, timing</li>
              <li>✓ Limite: Não pode ser abuso de direito (propósito exclusivo de fraude)</li>
              <li>✓ Responsabilidade: Administrador pode responder criminalmente por fraude</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        cards={[
          { title: "Distinção", content: "Planejamento lícito ≠ Evasão de impostos (fraude)", variant: getModuleVariant(9) },
          { title: "Elisão Fiscal", content: "Redução legal de impostos usando brechas da lei", variant: getModuleVariant(9) },
          { title: "Otimização", content: "Escolha de estrutura jurídica/contratual legal", variant: getModuleVariant(9) },
          { title: "Responsabilidade", content: "Empresa responsável por planejamento ético e legal", variant: getModuleVariant(9) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Planejamento Tributário Lícito",
            content: "É permitido ao contribuinte organizar seus negócios para minimizar carga tributária, desde que permaneça dentro da lei. Exemplo: escolher regime tributário (simples, lucro presumido, lucro real) que menor tributo gera. Diferente de fraude/evasão que viola lei."
          },
          {
            title: "Elisão Fiscal vs. Evasão",
            content: "Elisão (Legal): uso inteligente de brechas legais para reduzir imposto. Exemplo: empresa pode escolher distribuir lucro via dividendo (não tributado) ou reter (tributado). Evasão (Ilegal): fraude, ocultação de informações, falsificação de documentos. Fisco pune evasão com multas e até processo criminal."
          },
          {
            title: "Estratégias Legítimas",
            content: "Escolha de regime tributário: simple (micro/PME) vs lucro real (grandes). Aproveitamento de incentivos legais: dedução de investimentos em pesquisa/desenvolvimento. Estruturação de contratos: forma jurídica adequada ao negócio. Timing de operações: realizar dentro de período tributário vantajoso."
          },
          {
            title: "Planejamento em Petrobras",
            content: "Petrobras realiza planejamento complexo: abatimento de royalties/participações no cálculo de IRPJ, aproveitamento de compensação de prejuízos, estrutura de contratos internacionais. Tudo dentro de conformidade regulatória máxima (auditoria, CVM)."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Planejamento Lícito</h3>
        <CardCarousel
          cards={[
            {
              emoji: "✅",
              title: "Escolha de Regime",
              description: "Consultoria pode faturar R$ 300 mil/ano. Simples: imposto ~18% = R$ 54 k. Lucro Presumido: 8% presumido + impostos = R$ 35 k. Planejamento: usar Presumido se viável legalmente."
            },
            {
              emoji: "📊",
              title: "Aproveitamento de Incentivos",
              description: "Empresa investe em tecnologia/P&D. Lei permite abatimento de 50% do investimento do IRPJ. Investimento R$ 1 milhão, abatimento R$ 500 mil × 25% taxa = economia R$ 125 mil."
            },
            {
              emoji: "⚖️",
              title: "Fraude vs. Planejamento",
              description: "Lícito: empresa escolhe regime tributário legal e estrutura contrato corretamente. Ilícito: empresa emite nota fiscal falsa para reduzir imposto (fraude processável criminalmente)."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-9"]}
        onComplete={(score: number) => handleQuizComplete("modulo-9", score)}
      />
    </div>
  );

  const renderModulo10 = () => (
    <div className="space-y-6">
      <ModuleBanner module={10} title="Simulado Mestre - Direito Tributário" />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={10}
          title="Simulado Mestre - Direito Tributário"
          description="Consolidação final: teste sua compreensão com questões integradas sobre todo o conteúdo."
          variant="rose"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            O <strong>Simulado Mestre</strong> é avaliação final que integra conhecimento de todos os 9 módulos anteriores. Não é apenas revisão — exige que você combine conceitos. Questões podem pedir: calcular IRPJ considerando royalties (módulos 2 + 8), analisar conformidade de documentação (módulo 5), identificar tipo de multa em auditoria (módulo 6), escolher regime tributário melhor (módulo 9). Alcançar 70% nesse simulado prova que você compreendeu direito tributário em nível técnico de suprimento Petrobras.
          </p>
          <p>
            O simulado avalia <strong>múltiplos domínios</strong>. Conceitual: você entende definições de tributo, fato gerador, base de cálculo? Calculista: consegue calcular incidência corretamente, aplicar alíquota, considerar deduções? Operacional: como seu trabalho em suprimento interage com tributação? Conformidade: conhece obrigações acessórias, prazos, documentação exigida? Meta é não apenas saber teoria, mas aplicar em situações reais de negócios.
          </p>
          <p>
            As questões são <strong>realistas e contextualizadas em Petrobras</strong>. Exemplo: "Petrobras contrata serviço de consultoria em São Paulo por R$ 500 mil. Qual ISS incide? Como registrar em nota? Como considerar na formação de preço?" Ou: "Campo de petróleo produz 50 mil barris/mês, preço Brent R$ 100. Calcule Royalties totais ao ano." Ou: "Auditoria Receita Federal encontra omissão de informação. Qual multa? Qual prazo para defesa?" Contexto Petrobras é intencional — você já está em ambiente real de trabalho.
          </p>
          <p>
            <strong>Estratégia de Resolução</strong> para o simulado: (1) Leia questão completa, não responda apressado; (2) Identifique qual módulo a questão toca (é sobre impostos federais? Sobre ICMS? Sobre planejamento?); (3) Relembre regra específica daquele módulo; (4) Aplique a regra ao caso específico da questão; (5) Calcule (se necessário) e verifique se resultado faz sentido. Erros comuns: ler errado, confundir alíquota entre tributos, esquecer que múltiplos tributos incidem juntos.
          </p>
          <p>
            Este é o módulo de consolidação. Você aprendeu estrutura de direito tributário brasileiro (CTN, princípios, tributos), entendeu tributos específicos (IR, ICMS, contribuições), compreendeu operações em Petrobras (royalties, IRPJ, cadeia tributária), e conhece processos (fiscalização, multas, planejamento). O simulado testa integração. Atingir 70% não é "conhecimento mínimo" — é comprova competência técnica para operar em suprimento Petrobras com consciência de impacto tributário. Você está pronto para lidar com negociações, contratos, e operações sabendo exatamente qual a carga tributária envolvida.
          </p>

          <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-2">🎯 Domínios do Simulado</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Conceitual: Definições, princípios, estrutura tributária</li>
              <li>✓ Calculista: Cálculos de incidência, alíquotas, deduções</li>
              <li>✓ Operacional: Impacto em negociações de suprimento</li>
              <li>✓ Conformidade: Obrigações, prazos, documentação</li>
              <li>✓ Meta: 70% = Competência técnica verificada em direito tributário</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        cards={[
          { title: "Integração", content: "Questões combinam conceitos de múltiplos módulos", variant: getModuleVariant(10) },
          { title: "Análise Crítica", content: "Demanda compreensão profunda, não simples memorização", variant: getModuleVariant(10) },
          { title: "Cenários Realistas", content: "Casos práticos de Petrobras e indústria", variant: getModuleVariant(10) },
          { title: "Meta de Aprovação", content: "70% de acerto valida competência em direito tributário", variant: getModuleVariant(10) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Estrutura do Simulado",
            content: "Contém 10 questões complexas que exigem integração de conhecimento. Tópicos: princípios constitucionais, tributos específicos (IR, ICMS, IRPJ), cálculos de incidência, obrigações acessórias, processos de fiscalização, planejamento tributário."
          },
          {
            title: "Domínios Avaliados",
            content: "Conceitos: definição de tributo, fato gerador, base de cálculo. Cálculos: incidência de alíquota, multas, valores de contribuições. Operações: análise de situações reais e impacto tributário. Conformidade: obrigações do contribuinte, prazos, responsabilidades."
          },
          {
            title: "Estratégia de Resolução",
            content: "Leia com atenção: detalhes de fatos mudam resposta. Identifique fato gerador: qual é a base de incidência? Aplique regra: qual lei/alíquota se aplica? Calcule: se pede valor, faça cálculo preciso. Verifique: resultado faz sentido no contexto?"
          },
          {
            title: "Preparação para Concurso Petrobras",
            content: "Atingir 70% neste simulado demonstra competência de nível técnico/médio em direito tributário. Prepara para questões de prova sobre compliance tributário, operações de suprimento com impacto fiscal, análise de custos e margens."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Questões Integradas</h3>
        <CardCarousel
          cards={[
            {
              emoji: "🔢",
              title: "Cálculo Integrado",
              description: "Empresa fatura R$ 2 milhões. Custos 50%, despesas 15%. IRPJ 25%, COFINS 7,65%, PIS 1,65%. Calcule valor total de impostos e alíquota efetiva sobre faturamento."
            },
            {
              emoji: "⚖️",
              title: "Análise de Conformidade",
              description: "Petrobras recebe autos de infração por omissão de informação em declaração. Qual o impacto? Multa por infração acessória? Prazo para defesa? Possibilidade de prescrição?"
            },
            {
              emoji: "💼",
              title: "Planejamento Operacional",
              description: "Técnico de Suprimento negocia contrato de serviço R$ 500 mil. Identifique: ISS aplicável? Retenção na fonte? Qual cidade influencia alíquota? Como estruturar contrato?"
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-10"]}
        onComplete={(score: number) => handleQuizComplete("modulo-10", score)}
      />
    </div>
  );

  const renderModule = () => {
    switch (activeTab) {
      case "modulo-1":
        return renderModulo1();
      case "modulo-2":
        return renderModulo2();
      case "modulo-3":
        return renderModulo3();
      case "modulo-4":
        return renderModulo4();
      case "modulo-5":
        return renderModulo5();
      case "modulo-6":
        return renderModulo6();
      case "modulo-7":
        return renderModulo7();
      case "modulo-8":
        return renderModulo8();
      case "modulo-9":
        return renderModulo9();
      case "modulo-10":
        return renderModulo10();
      default:
        return renderModulo1();
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          Direito Tributário
        </h1>
        <p className="text-muted-foreground mt-2">
          Sistema tributário brasileiro para técnico em suprimento - Administração
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {MODULE_DEFS.map((mod) => {
          const isUnlocked = isModuleUnlocked(mod.id);
          const isCompleted = completedModules.has(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => isUnlocked && setActiveTab(mod.id)}
              disabled={!isUnlocked}
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                isCompleted
                  ? "bg-green-500/20 border-2 border-green-500 text-green-700 dark:text-green-300"
                  : activeTab === mod.id
                    ? "bg-primary/20 border-2 border-primary text-primary"
                    : isUnlocked
                      ? "bg-card border border-border hover:border-primary text-foreground"
                      : "bg-muted border border-border text-muted-foreground opacity-50 cursor-not-allowed"
              }`}
            >
              {isCompleted && "✓ "}
              {mod.label}
            </button>
          );
        })}
      </div>

      {renderModule()}

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>💡 Dica:</strong> Direito tributário é complexo mas lógico. Entenda o fato gerador e a estrutura de incidência. Complete cada módulo com 70%+ para desbloquear o próximo e consolidar aprendizado.
        </p>
      </div>
    </div>
  );
}
