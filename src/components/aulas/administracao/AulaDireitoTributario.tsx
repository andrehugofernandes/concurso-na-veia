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
          moduloNome: "Módulo 2",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Impostos sobre Lucro", type: "Tabela", placeholderColor: "bg-indigo-500/20" },
            { title: "Comércio Exterior", type: "Fluxograma", placeholderColor: "bg-indigo-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"Federais = Lucro e Fronteira (IRPJ e Comércio Exterior)"}</p>
        }}
        audio={{
          audioUrl: "/audio/tributario-m2.mp3",
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
          title="ICMS, ISS e Contribuições incidentes"
          description="A tributação indireta que afeta a circulação de bens e serviços."
          variant="emerald"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            Os <strong>tributos sobre consumo</strong> são aqueles que incidem sobre a circulação de mercadorias e a prestação de serviços. São chamados "indiretos" porque o fabricante/prestador paga ao fisco, mas repassa o custo ao consumidor final via preço.
          </p>
          <p>
            O <strong>ICMS</strong> é estadual e incide sobre circulação de mercadorias. Já o <strong>ISS</strong> é municipal e incide sobre serviços. Para a Petrobras, a substituição tributária no ICMS é um tema central, onde a empresa retém e paga o imposto por toda a cadeia.
          </p>
        </div>
      </section>

      <ModuleConsolidation
        index={3}
        variant="emerald"
        video={{
          videoId: "tributario-m3",
          title: "Tributos sobre Consumo",
          duration: "11:15"
        }}
        resumoVisual={{
          moduloNome: "Módulo 3",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Cadeia do ICMS", type: "Infográfico", placeholderColor: "bg-emerald-500/20" },
            { title: "Retenção de ISS", type: "Diagrama", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"Consumo = Indireto (Alguém paga, você sente no preço final)."}</p>
        }}
        audio={{
          audioUrl: "/audio/tributario-m3.mp3",
          titulo: "Resumo Módulo 3",
          artista: "Especialista Tributário"
        }}
      />

      <ContentAccordion
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
            corFundo: "bg-violet-100 dark:bg-violet-900/30"
          }
        ]}
      />

      <QuizInterativo
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
            As contribuições sociais (PIS/PASEP e COFINS) incidem sobre a receita bruta das empresas e são fundamentais para o financiamento da seguridade social. Para uma empresa do porte da Petrobras, essas contribuições representam volumes gigantescos de recursos.
          </p>
          <p>
            Existe ainda a <strong>CIDE-Combustíveis</strong>, que incide sobre a importação e a comercialização de petróleo e derivados. Ela tem finalidade extrafiscal, servindo para ajustar preços de mercado.
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
          moduloNome: "Módulo 4",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Financiamento Social", type: "Diagrama", placeholderColor: "bg-violet-500/20" },
            { title: "CIDE-Combustíveis", type: "Fluxograma", placeholderColor: "bg-violet-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"CIDE = Intervenção (Governo usando imposto para regular o preço do óleo)."}</p>
        }}
        audio={{
          audioUrl: "/audio/tributario-m4.mp3",
          titulo: "Resumo Módulo 4",
          artista: "Especialista Tributário"
        }}
      />

      <ContentAccordion
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
            corFundo: "bg-violet-100 dark:bg-violet-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Contribuições Sociais"
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
            O <strong>crédito tributário</strong> é o direito do Estado de receber o valor. Ele pode ser extinto pelo pagamento, mas também por compensação, anistia ou decisão judicial. Entender esses processos é crucial para evitar a inadimplência fiscal.
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
          moduloNome: "Módulo 5",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Nascimento do Crédito", type: "Diagrama", placeholderColor: "bg-amber-500/20" },
            { title: "Extinção do Crédito", type: "Fluxograma", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"Fato Gerador ocorreu? Dívida nasceu! Lançamento formalizou? Cobrança começou!"}</p>
        }}
        audio={{
          audioUrl: "/audio/tributario-m5.mp3",
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
            O Fisco tem o poder de fiscalizar permanentemente todos os atos dos contribuintes. No entanto, esse poder não é absoluto; o fiscal deve seguir ritos legais e respeitar o sigilo de dados não tributários.
          </p>
          <p>
            As infrações podem ser por falta de pagamento ou por erro em obrigações acessórias. As <strong>multas</strong> podem ser moratórias ou punitivas.
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
          moduloNome: "Módulo 6",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Tipos de Multas", type: "Tabela", placeholderColor: "bg-rose-500/20" },
            { title: "Rito de Punição", type: "Diagrama", placeholderColor: "bg-rose-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"Multa não é tributo! Tributo é obrigação, multa é punição."}</p>
        }}
        audio={{
          audioUrl: "/audio/tributario-m6.mp3",
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
          }
        ]}
      />

      <QuizInterativo
        titulo="Fiscalização e Infrações"
        numero={6}
        variant="rose"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-6"].questions}
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
        variant="amber"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={7}
          title="Normas de Incidência"
          description="A estrutura fundamental que define o nascimento e o valor da obrigação tributária."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            A <strong>Norma de Incidência Tributária</strong> é a regra que estrutura como um imposto é cobrado. Toda norma tributária tem três componentes essenciais: (1) <strong>Fato Gerador</strong>; (2) <strong>Base de Cálculo</strong>; (3) <strong>Alíquota</strong>.
          </p>
        </div>
      </section>

      <ModuleConsolidation
        index={7}
        variant="amber"
        video={{
          videoId: "tributario-m7",
          title: "Incidência Tributária",
          duration: "10:15"
        }}
        resumoVisual={{
          moduloNome: "Módulo 7",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Pilares da Incidência", type: "Diagrama", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"Fato Gerador é o gatilho; Base e Alíquota definem o tamanho do estrago no caixa."}</p>
        }}
        audio={{
          audioUrl: "/audio/tributario-m7.mp3",
          titulo: "Resumo Módulo 7",
          artista: "Especialista Tributário"
        }}
      />

      <ContentAccordion
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
            corFundo: "bg-violet-100 dark:bg-violet-900/30"
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
        variant="amber"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-7"].questions}
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
        variant="blue"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={8}
          title="Operações de Óleo e Gás"
          description="Do poço ao posto: como a Petrobras lida com a carga tributária do setor."
          variant="blue"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            A <strong>tributação da Petrobras</strong> envolve Royalties e Participações Especiais, além dos impostos convencionais. Os <strong>Royalties</strong> são uma compensação financeira pela exploração de recursos não renováveis.
          </p>
        </div>
      </section>

      <ModuleConsolidation
        index={8}
        variant="blue"
        video={{
          videoId: "tributario-m8",
          title: "Operações Petrobras",
          duration: "12:30"
        }}
        resumoVisual={{
          moduloNome: "Módulo 8",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Royalties e Taxas", type: "Diagrama", placeholderColor: "bg-blue-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"Royalties se paga pela produção; Imposto se paga pelo lucro."}</p>
        }}
        audio={{
          audioUrl: "/audio/tributario-m8.mp3",
          titulo: "Resumo Módulo 8",
          artista: "Especialista Tributário"
        }}
      />

      <ContentAccordion
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
            descricao: "Equipamentos importados sob regime d  const renderModulo9 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={9}
        titulo="Planejamento Tributário Lícito"
        descricao="Estratégias para otimização da carga tributária dentro da legalidade."
        variant="emerald"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={9}
          title="Elisão vs Evasão"
          description="A diferença entre reduzir impostos legalmente e cometer crime fiscal."
          variant="emerald"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
          <p>
            O <strong>Planejamento Tributário (Elisão)</strong> é o uso de meios lícitos para reduzir o ônus fiscal. A <strong>Evasão</strong>, por outro lado, é ilegal.
          </p>
        </div>
      </section>

      <ModuleConsolidation
        index={9}
        variant="emerald"
        video={{
          videoId: "tributario-m9",
          title: "Planejamento Tributário",
          duration: "09:45"
        }}
        resumoVisual={{
          moduloNome: "Módulo 9",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Elisão Fiscal", type: "Mapa Mental", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"Elisão = Lícita (Antes do fato gerador). Evasão = Crime (Depois do fato gerador)."}</p>
        }}
        audio={{
          audioUrl: "/audio/tributario-m9.mp3",
          titulo: "Resumo Módulo 9",
          artista: "Especialista Tributário"
        }}
      />

      <ContentAccordion
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
            corFundo: "bg-violet-100 dark:bg-violet-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Planejamento Tributário"
        numero={9}
        variant="emerald"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-9"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-9", score)}
      />
    </div>
  );

  const renderModulo10 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={10}
        titulo="Simulado Mestre"
        descricao="Teste seus conhecimentos em Direito Tributário com foco total Cesgranrio."
        variant="rose"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={10}
          title="Avaliação Final"
          description="Questões selecionadas para simular o nível de dificuldade do concurso."
          variant="rose"
        />
      </section>

      <ModuleConsolidation
        index={10}
        variant="rose"
        video={{
          videoId: "tributario-m10",
          title: "Revisão Geral",
          duration: "15:00"
        }}
        resumoVisual={{
          moduloNome: "Módulo 10",
          tituloAula: "Direito Tributário",
          materia: "Administração",
          images: [
            { title: "Resumo Global", type: "Diagrama", placeholderColor: "bg-rose-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"Leia o enunciado com calma. Identifique o tributo e a competência primeiro."}</p>
        }}
        audio={{
          audioUrl: "/audio/tributario-m10.mp3",
          titulo: "Resumo Módulo 10",
          artista: "Especialista Tributário"
        }}
      />

      <QuizInterativo
        titulo="Simulado Mestre"
        numero={10}
        variant="rose"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-10"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-10", score)}
      />
    </div>
  );
            descricao: "Elimine distrações. Este simulado reflete o nível das provas da CESGRANRIO.",
            corFundo: "bg-emerald-100 dark:bg-emerald-900/30"
          },
          {
            title: "Tempo",
            descricao: "Tente resolver cada questão em no máximo 3 minutos para treinar o ritmo.",
            corFundo: "bg-violet-100 dark:bg-violet-900/30"
          },
          {
            title: "Revisão",
            descricao: "Ao final, revise as questões que errou para entender a lógica das pegadinhas.",
            corFundo: "bg-amber-100 dark:bg-amber-900/30"
          }
        ]}
      />

      <QuizInterativo
        titulo="Simulado Mestre"
        numero={10}
        variant="rose"
        questoes={DIREITO_TRIBUTARIO_QUIZZES["modulo-10"].questions}
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
