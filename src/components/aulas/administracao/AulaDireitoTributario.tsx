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
 */

import { useState } from "react";
import { AulaProps } from "../shared";
import ModuleConsolidation from "@/components/aulas/shared/ModuleConsolidation";
import ContentAccordion from "@/components/aulas/shared/ContentAccordion";
import CardCarousel from "@/components/aulas/shared/CardCarousel";
import QuizInterativo from "@/components/aulas/shared/QuizInterativo";
import ModuleBanner from "@/components/aulas/shared/ModuleBanner";
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

export default function AulaDireitoTributario({ topicoId }: AulaProps) {
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
      <ModuleBanner module={1} title="Fundamentos de Direito Tributário" />
      <ModuleConsolidation
        cards={[
          { title: "Definição", content: "Direito que estuda relação entre fisco e contribuinte", variant: getModuleVariant(1) },
          { title: "Fontes", content: "Lei, decretos, resoluções, jurisprudência, costumes", variant: getModuleVariant(1) },
          { title: "Princípios", content: "Legalidade, irretroatividade, segurança jurídica", variant: getModuleVariant(1) },
          { title: "Código Tributário Nacional", content: "Lei 5.172/66 - marco regulatório brasileiro", variant: getModuleVariant(1) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "O que é Direito Tributário?",
            content: "Ramo do direito que estuda a relação jurídica entre o fisco (Estado) e o contribuinte sobre arrecadação de tributos. Aborda obrigações de pagar impostos, direitos do contribuinte, procedimentos de cobrança, e garantias legais."
          },
          {
            title: "Princípios Constitucionais Tributários",
            content: "Legalidade: imposto só pode ser cobrado por lei (não por decreto). Irretroatividade: não cobra imposto com efeito retroativo. Igualdade: mesmas condições para contribuintes em situação similar. Capacidade Contributiva: imposto considerando renda/patrimônio. Segurança Jurídica: regras claras e previsíveis."
          },
          {
            title: "Código Tributário Nacional (CTN)",
            content: "Lei 5.172/66 é a lei geral tributária brasileira. Define conceitos de tributo, impostos, taxas, contribuições. Estabelece obrigações principais (pagar imposto) e acessórias (informar dados ao fisco). Base para interpretação de todas leis tributárias posteriores."
          },
          {
            title: "Tributo: Conceito Jurídico",
            content: "Segundo CTN: prestação pecuniária compulsória (obrigatória), instituída por lei, cobrada pela administração tributária. Características: legalidade, obrigatoriedade, natureza arrecadatória, interesse público."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Aplicação</h3>
        <CardCarousel
          cards={[
            {
              emoji: "⚖️",
              title: "Legalidade em Ação",
              description: "Governo tenta cobrar novo imposto por decreto. Contribuinte recorre: inconstitucional (viola princípio da legalidade). Tribunal cancela cobrança."
            },
            {
              emoji: "📋",
              title: "Obrigação Acessória",
              description: "Petrobras é obrigada a manter registros de operações, fornecer relatórios ao fisco mensalmente (obrigação acessória = informar)."
            },
            {
              emoji: "💰",
              title: "Capacidade Contributiva",
              description: "Empresa com lucro R$ 1 milhão paga mais imposto que empresa com lucro R$ 100 mil. Proporcional à capacidade de pagar."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-1"]}
        onComplete={(score) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner module={2} title="Tributos Federais: Impostos" />
      <ModuleConsolidation
        cards={[
          { title: "IR (Imposto de Renda)", content: "Sobre renda e proventos de qualquer natureza", variant: getModuleVariant(2) },
          { title: "IPI (Imposto sobre Produtos)", content: "Tributo seletivo sobre industrialização", variant: getModuleVariant(2) },
          { title: "Tabela Progressiva", content: "Alíquota aumenta conforme renda (20% até 45%)", variant: getModuleVariant(2) },
          { title: "Deduções", content: "Abatimentos permitidos (dependentes, contribuição)", variant: getModuleVariant(2) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Imposto de Renda (IR)",
            content: "Tributo federal sobre renda, proventos de qualquer natureza. Incide sobre salários, aluguéis, lucros, ganhos de capital. Tabela progressiva: quanto maior renda, maior alíquota. Pessoas físicas: alíquota de 0% até 45%. Pessoas jurídicas: alíquota fixa (15% + adicional)."
          },
          {
            title: "Cálculo do IR Pessoa Física",
            content: "Base: renda bruta - deduções legais = base de cálculo. Deduções: dependentes (R$ 2.275/ano), contribuição a previdência, instrução. Aplicar tabela progressiva progressivamente. Exemplos: ganho até R$ 2.112 = isento; de R$ 2.112-2.826 = 7,5%; acima = até 45%."
          },
          {
            title: "IPI (Imposto sobre Produtos Industrializados)",
            content: "Tributo federal seletivo (alíquota varia por produto). Objetivo: tributar mais produtos prejudiciais (bebidas alcoólicas, cigarros). Menos tributo em produtos essenciais. Incide na saída de produto industrializado da fábrica. Crédito tributário: empresa que compra produto com IPI pode abater."
          },
          {
            title: "IR em Petrobras",
            content: "Petrobras (pessoa jurídica) paga IRPJ (Imposto de Renda Pessoa Jurídica) sobre lucro: Lucro Real = resultado contábil com ajustes. Alíquota: 15% + adicional de 10% sobre lucro superior a R$ 20 mil/mês. Lucro presumido: presunção legal de lucro (8% da receita para refino)."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Cálculo</h3>
        <CardCarousel
          cards={[
            {
              emoji: "💼",
              title: "IR Pessoa Física",
              description: "Salário R$ 5.000 + aluguel R$ 1.000 = R$ 6.000. Deduções R$ 500. Base R$ 5.500. Alíquota 22,5% = IR R$ 1.237,50."
            },
            {
              emoji: "🏭",
              title: "IPI em Produto",
              description: "Fábrica produz bebida alcoólica. Custa R$ 10 para produzir. IPI 30% = R$ 3. Vende por R$ 15 (inclui IPI)."
            },
            {
              emoji: "🛢️",
              title: "IRPJ Petrobras",
              description: "Lucro Real de R$ 1 bilhão. IRPJ: 15% = R$ 150 milhões. Adicional 10% sobre R$ 980 milhões = R$ 98 milhões. Total: R$ 248 milhões."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-2"]}
        onComplete={(score) => handleQuizComplete("modulo-2", score)}
      />
    </div>
  );

  const renderModulo3 = () => (
    <div className="space-y-6">
      <ModuleBanner module={3} title="Tributos sobre Consumo" />
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
            title: "ICMS (Imposto sobre Circulação de Mercadorias)",
            content: "Tributo estadual (legislado por cada estado, mas direito comum). Incide sobre operação de circulação de mercadoria ou prestação de serviço de transporte. Alíquota varia: 7-18% dependendo estado e produto. Sistema de crédito/débito: empresa que compra ICMS pode abater na venda."
          },
          {
            title: "ISS (Imposto sobre Serviços)",
            content: "Tributo municipal (cada município fixa alíquota). Incide sobre prestação de serviços (consultoria, limpeza, reparos, etc). Alíquota de 2% a 5% (município específico). Obrigação de reter na fonte: quem contrata retém ISS e repassa à prefeitura."
          },
          {
            title: "PIS e COFINS",
            content: "Contribuições Federais sobre Receita Bruta. PIS (Programa de Integração Social): 1,65% sobre faturamento. COFINS (Contribuição para Financiamento da Seguridade Social): 7,65% sobre faturamento. Algumas empresas apuram por regime de caixa (quando recebe)."
          },
          {
            title: "Tributos sobre Consumo em Petrobras",
            content: "ICMS: sobre venda de combustíveis (gasolina, diesel) em cada estado. ISS: em contratos de serviços. PIS/COFINS: sobre receita de vendas de óleo e derivados. Cálculo integrado: esses tributos são custos que Petrobras repassa ao preço final do produto ao consumidor."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Incidência</h3>
        <CardCarousel
          cards={[
            {
              emoji: "⛽",
              title: "ICMS em Combustível",
              description: "Diesel custa R$ 5,00 na refinaria. ICMS 18% (SP) = R$ 0,90. Preço ao distribuidor: R$ 5,90. Carga tributária visível."
            },
            {
              emoji: "🔧",
              title: "ISS em Serviço",
              description: "Petrobras contrata consultoria por R$ 100 mil. ISS 2,5% (Rio de Janeiro) = R$ 2.500. Empresa de consultoria recebe R$ 97.500."
            },
            {
              emoji: "📊",
              title: "PIS/COFINS em Receita",
              description: "Faturamento R$ 1 milhão. PIS 1,65% = R$ 16.500. COFINS 7,65% = R$ 76.500. Total de contribuições = R$ 93 mil (9,3%)."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-3"]}
        onComplete={(score) => handleQuizComplete("modulo-3", score)}
      />
    </div>
  );

  const renderModulo4 = () => (
    <div className="space-y-6">
      <ModuleBanner module={4} title="Contribuições Sociais" />
      <ModuleConsolidation
        cards={[
          { title: "INSS", content: "Previdência social (empregado 8-11%, empregador 20%)", variant: getModuleVariant(4) },
          { title: "FGTS", content: "Fundo Garantia Tempo Serviço (empregador 8% de folha)", variant: getModuleVariant(4) },
          { title: "Contribuição Sindical", content: "Sindicato de categoria (1 dia de salário anual)", variant: getModuleVariant(4) },
          { title: "Encargos Sociais", content: "Totalizam 25-35% do custo da folha de pagamento", variant: getModuleVariant(4) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "INSS (Instituto Nacional Seguridade Social)",
            content: "Contribuição à previdência social. Empregado: desconto de 8-11% do salário (progressivo). Empregador: alíquota de 20% sobre folha. Autônomo: 20% de sua receita. Garante direito a aposentadoria, auxílio-doença, pensão por morte."
          },
          {
            title: "FGTS (Fundo Garantia Tempo Serviço)",
            content: "Contribuição do empregador de 8% do salário mensal do empregado. Acumulado em conta individual do trabalhador. Saque permitido: demissão sem justa causa, aposentadoria, compra de imóvel, doença grave. Representa direito trabalhista importante."
          },
          {
            title: "Contribuição Sindical e Encargos",
            content: "Contribuição Sindical: equivalente a 1 dia de trabalho anual (descontado uma vez). Encargos Sociais: soma de INSS + FGTS + contribuições = 25-35% do salário bruto. Custo total da folha para empresa é salário + encargos."
          },
          {
            title: "Encargos em Folha de Petrobras",
            content: "Petrobras paga salário + 25-35% em encargos sociais. Exemplo: salário R$ 10.000, encargos R$ 2.500-3.500. Custo total para empresa: R$ 12.500-13.500. Importante para cálculo de custos de pessoal."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Cálculo</h3>
        <CardCarousel
          cards={[
            {
              emoji: "👤",
              title: "Desconto INSS Empregado",
              description: "Salário R$ 3.000. INSS 10% = R$ 300. Salário líquido: R$ 2.700 (perde R$ 300 mensal)."
            },
            {
              emoji: "🏢",
              title: "FGTS Empresa",
              description: "Folha de R$ 100 mil com 10 funcionários (média R$ 10 mil cada). FGTS 8% = R$ 8 mil (custo da empresa)."
            },
            {
              emoji: "📊",
              title: "Custo Total Folha",
              description: "Salário R$ 10 mil. INSS (10%) R$ 1 mil. FGTS (8%) R$ 800. Contribuição Sindical ~R$ 100. Custo total: ~R$ 11.900 para empresa."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-4"]}
        onComplete={(score) => handleQuizComplete("modulo-4", score)}
      />
    </div>
  );

  const renderModulo5 = () => (
    <div className="space-y-6">
      <ModuleBanner module={5} title="Obrigações Tributárias" />
      <ModuleConsolidation
        cards={[
          { title: "Obrigação Principal", content: "Pagar tributo (obrigação de dar)", variant: getModuleVariant(5) },
          { title: "Obrigação Acessória", content: "Registrar, informar dados (obrigação de fazer)", variant: getModuleVariant(5) },
          { title: "Responsabilidade", content: "Solidária, subsidiária ou pessoal por infração", variant: getModuleVariant(5) },
          { title: "Sujeito Ativo e Passivo", content: "Ativo = fisco (Estado), Passivo = contribuinte", variant: getModuleVariant(5) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Obrigação Tributária Principal",
            content: "Obrigação de pagar o tributo. Surge quando ocorre fato gerador (evento que gera direito de tributar). Exemplo: fato gerador de IR = auferição de renda. Fato gerador de ICMS = saída de mercadoria. Obrigação é pessoal de quem sofreu o fato gerador."
          },
          {
            title: "Obrigação Tributária Acessória",
            content: "Obrigações de fazer (registrar, informar, manter documentos). Exemplos: escrituração de livros, emissão de notas fiscais, declarações de renda, informações ao fisco. Infrações a obrigações acessórias geram multas ainda que não haja imposto a pagar."
          },
          {
            title: "Responsabilidade Tributária",
            content: "Solidária: responsável junto com o devedor original. Subsidiária: responsável se devedor original não pagar. Pessoal: por infração da lei tributária (diretor, sócio que cometeu fraude). Permite fisco cobrar de terceiros se devedor não paga."
          },
          {
            title: "Sujeitos da Obrigação Tributária",
            content: "Sujeito Ativo: fisco (União, estados, municípios) que cobra. Sujeito Passivo: contribuinte que paga (pessoa física ou jurídica sobre quem incide tributo). Pode haver responsável tributário que não é contribuinte original."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Obrigações</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📋",
              title: "Obrigação Principal",
              description: "Pessoa ganha renda (fato gerador). Surge obrigação de pagar IR. Estado (sujeito ativo) cobra da pessoa (sujeito passivo)."
            },
            {
              emoji: "🗂️",
              title: "Obrigação Acessória",
              description: "Empresa obrigada a manter nota fiscal, registro de venda, declaração mensal. Infração: multa por falta de nota fiscal (mesmo sem imposto não pago)."
            },
            {
              emoji: "⚖️",
              title: "Responsabilidade Solidária",
              description: "Sócio que aprovou fraude tributária é responsável solidário. Estado cobra imposto + multa do sócio se empresa não pagar."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-5"]}
        onComplete={(score) => handleQuizComplete("modulo-5", score)}
      />
    </div>
  );

  const renderModulo6 = () => (
    <div className="space-y-6">
      <ModuleBanner module={6} title="Fiscalização e Multas" />
      <ModuleConsolidation
        cards={[
          { title: "Auditoria Fiscal", content: "Procedimento que fisco verifica documentos e registros", variant: getModuleVariant(6) },
          { title: "Autos de Infração", content: "Documento que fisco lavra ao encontrar irregularidade", variant: getModuleVariant(6) },
          { title: "Multa por Infração", content: "Penalidade proporcional à infração (até 150% do imposto)", variant: getModuleVariant(6) },
          { title: "Recurso Administrativo", content: "Direito de recorrer de decisão do fisco", variant: getModuleVariant(6) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Processo de Fiscalização",
            content: "Fisco escolhe empresas para auditoria (por sorteio, risco ou denúncia). Auditor analisa livros, notas fiscais, documentos. Se encontra irregularidade, lavra Auto de Infração. Contribuinte tem direito de defesa antes de decisão final."
          },
          {
            title: "Multas Tributárias",
            content: "Multa de Ofício: por não pagar imposto (0,5% ao mês, máximo 20%). Multa por Infração: por infração de obrigação acessória (até R$ 20 mil ou percentual). Multa por Fraude: aumentada (75-150% do imposto). Multas são receita do tesouro, não têm fins punitivos apenas."
          },
          {
            title: "Prazos de Cobrança e Prescrição",
            content: "Prazo para fisco cobrar: 5 anos. Após 5 anos sem ação do fisco, prescreve. Porém, se contribuinte entra em concordata/falência, prazo interrompe. Contribuinte também tem prazo de defesa."
          },
          {
            title: "Auditoria em Petrobras",
            content: "Petrobras é auditada regularmente pela Receita Federal e auditorias internas. Registros de transações bilionárias exigem conformidade total. Multas de Petrobras podem ser altas (milhões de reais) se irregularidade detectada."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Fiscalização</h3>
        <CardCarousel
          cards={[
            {
              emoji: "🔍",
              title: "Auditoria Fiscal Descoberta",
              description: "Fisco constata que empresa não emitiu nota em venda. Auto de Infração: multa por obrigação acessória (omissão de informação)."
            },
            {
              emoji: "⚠️",
              title: "Cálculo de Multa",
              description: "Imposto não pago: R$ 100 mil. Multa de ofício 20% = R$ 20 mil. Juros de mora + multa totalizam R$ 35 mil a pagar."
            },
            {
              emoji: "📜",
              title: "Recurso de Defesa",
              description: "Empresa contesta auto de infração. Apresenta documentos mostrando que pagou imposto via compensação. Junta recurso administrativo ao fisco."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={DIREITO_TRIBUTARIO_QUIZZES["modulo-6"]}
        onComplete={(score) => handleQuizComplete("modulo-6", score)}
      />
    </div>
  );

  const renderModulo7 = () => (
    <div className="space-y-6">
      <ModuleBanner module={7} title="Normas de Incidência Tributária" />
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
        onComplete={(score) => handleQuizComplete("modulo-7", score)}
      />
    </div>
  );

  const renderModulo8 = () => (
    <div className="space-y-6">
      <ModuleBanner module={8} title="Tributos em Operações Petrobras" />
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
        onComplete={(score) => handleQuizComplete("modulo-8", score)}
      />
    </div>
  );

  const renderModulo9 = () => (
    <div className="space-y-6">
      <ModuleBanner module={9} title="Planejamento Tributário Lícito" />
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
        onComplete={(score) => handleQuizComplete("modulo-9", score)}
      />
    </div>
  );

  const renderModulo10 = () => (
    <div className="space-y-6">
      <ModuleBanner module={10} title="Simulado Mestre - Direito Tributário" />
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
        onComplete={(score) => handleQuizComplete("modulo-10", score)}
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
