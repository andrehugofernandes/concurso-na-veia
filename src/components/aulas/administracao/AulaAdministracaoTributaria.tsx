"use client";

/**
 * AulaAdministracaoTributaria
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
import { 
  ModuleConsolidation, 
  ContentAccordion, 
  CardCarousel, 
  QuizInterativo, 
  ModuleBanner 
} from "../shared";
import { ADMINISTRACAO_TRIBUTARIA_QUIZZES } from "@/data/quizzes/administracao-tributaria-quizzes";
import { getModuleVariant } from "@/lib/moduleColors";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Administração Tributária: Conceitos" },
  { id: "modulo-2", label: "Módulo 2", title: "Órgãos Arrecadadores" },
  { id: "modulo-3", label: "Módulo 3", title: "Registros e Documentos Fiscais" },
  { id: "modulo-4", label: "Módulo 4", title: "Declarações Tributárias" },
  { id: "modulo-5", label: "Módulo 5", title: "Prazos e Obrigações Acessórias" },
  { id: "modulo-6", label: "Módulo 6", title: "Gestão de Impostos" },
  { id: "modulo-7", label: "Módulo 7", title: "Controle de Créditos Tributários" },
  { id: "modulo-8", label: "Módulo 8", title: "Sistemas de Informação Tributária" },
  { id: "modulo-9", label: "Módulo 9", title: "Administração Tributária em Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaAdministracaoTributaria({ onComplete }: AulaProps) {
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
      <ModuleBanner module={1} title="Administração Tributária: Conceitos" />
      <ModuleConsolidation
        cards={[
          { title: "Definição", content: "Disciplina que estuda gestão de tributos na empresa", variant: getModuleVariant(1) },
          { title: "Objetivo", content: "Otimizar cumprimento de obrigações, reduzir custos, evitar penalidades", variant: getModuleVariant(1) },
          { title: "Escopo", content: "Federal, estadual, municipal - múltiplos tributos simultaneamente", variant: getModuleVariant(1) },
          { title: "Competência", content: "Analista tributário ou departamento fiscal da empresa", variant: getModuleVariant(1) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "O que é Administração Tributária?",
            content: "Disciplina de gestão que estuda como a empresa administra suas obrigações tributárias. Envolve planejamento, registro, cumprimento de prazos, controle de créditos, e conformidade. Objetivo: cumprir lei e otimizar custos tributários."
          },
          {
            title: "Desafios da Administração Tributária",
            content: "Múltiplos tributos (IR, ICMS, ISS, IPI, PIS, COFINS, INSS, FGTS). Múltiplas jurisdições (federal, estadual, municipal). Prazos diferentes (mensal, trimestral, anual). Mudanças frequentes na legislação. Necessidade de conformidade e segurança jurídica."
          },
          {
            title: "Papéis e Responsabilidades",
            content: "Gerente Tributário/Analista: planeja e monitora tributos. Contador: registra e prepara declarações. Departamento Fiscal: cumpre obrigações acessórias. CEO/Diretor: responsável final perante fisco. Todos têm papel importante."
          },
          {
            title: "Benefícios de Boa Administração Tributária",
            content: "Evita multas e juros (economia significativa). Melhora liquidez (planejamento de fluxos). Reduz riscos (conformidade lega). Permite planejamento estratégico (otimização de estrutura). Melhora reputação (confiança com credores/investidores)."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Aplicação</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📊",
              title: "Planejamento Anual",
              description: "Empresa elabora calendar de obrigações tributárias: IR (mês 4), ICMS (mensal), ISS (conforme município), INSS (mensal). Evita atrasos."
            },
            {
              emoji: "⚠️",
              title: "Risco de Não-Conformidade",
              description: "Empresa não documenta ISS retido. Prefeitura cobra multa + juros. Impacto: R$ 50 mil em multa (poderia ser evitado)."
            },
            {
              emoji: "✅",
              title: "Otimização Bem Executada",
              description: "Empresa identifica crédito de ICMS não aproveitado. Resgata R$ 100 mil em compensação. Melhora liquidez."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-1"]}
        onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner module={2} title="Órgãos Arrecadadores" />
      <ModuleConsolidation
        cards={[
          { title: "Receita Federal do Brasil (RFB)", content: "Órgão federal que arrecada IR, IPI, COFINS, PIS", variant: getModuleVariant(2) },
          { title: "SEFAZ Estadual", content: "Secretaria de Fazenda estadual - arrecada ICMS", variant: getModuleVariant(2) },
          { title: "Prefeitura Municipal", content: "Arrecada ISS, IPTU, impostos municipais", variant: getModuleVariant(2) },
          { title: "INSS/FGTS", content: "Institutos que arrecadam contribuições sociais", variant: getModuleVariant(2) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Receita Federal do Brasil (RFB)",
            content: "Órgão federal subordinado ao Ministério da Fazenda. Responsável por: arrecadar IR, IPI, impostos federais; fiscalizar cumprimento de obrigações; coibir evasão fiscal; processar declarações (ECF, DIPJ, ECD)."
          },
          {
            title: "SEFAZ (Secretarias de Fazenda Estaduais)",
            content: "Órgão estadual que arrecada ICMS (imposto mais importante para estados). Mantém sistemas de informação (SPED, NF-e). Realiza fiscalização estadual. Cada estado tem sua SEFAZ (SP, RJ, MG, etc)."
          },
          {
            title: "Prefeituras Municipais",
            content: "Órgão municipal responsável por: ISS (imposto sobre serviços); IPTU (imposto sobre propriedade); impostos municipais específicos. Geralmente departamento de Receita Municipal."
          },
          {
            title: "INSS e FGTS",
            content: "INSS: Instituto Nacional Seguridade Social - arrecada contribuições de INSS (previdência). FGTS: Caixa Econômica Federal - gerencia contas de FGTS. Ambos têm sistemas próprios de informação."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Estrutura de Órgãos</h3>
        <CardCarousel
          cards={[
            {
              emoji: "🏛️",
              title: "Hierarquia Tributária",
              description: "RFB (federal) > SEFAZ (estadual) > Prefeitura (municipal). Cada nível cobra seus tributos. Dados compartilhados via sistemas."
            },
            {
              emoji: "💻",
              title: "Sistemas de Informação",
              description: "RFB: ECF, DIPJ, ECD online. SEFAZ: SPED, NF-e. INSS: CAGED, GPS. Empresas enviam dados via internet para órgãos."
            },
            {
              emoji: "📋",
              title: "Documentação Necessária",
              description: "Manter RPA (Recibos de Pagamento), Comprovantes de Recolhimento, Declarações. Órgãos verificam se pagamentos foram feitos corretamente."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-2"]}
        onComplete={(score: number) => handleQuizComplete("modulo-2", score)}
      />
    </div>
  );

  const renderModulo3 = () => (
    <div className="space-y-6">
      <ModuleBanner module={3} title="Registros e Documentos Fiscais" />
      <ModuleConsolidation
        cards={[
          { title: "Nota Fiscal (NF-e)", content: "Documento eletrônico obrigatório para circulação de mercadoria", variant: getModuleVariant(3) },
          { title: "Recibo de Pagamento Autônomo (RPA)", content: "Documento para prestação de serviço por autônomo", variant: getModuleVariant(3) },
          { title: "Livro de Apuração ICMS", content: "Registro de ICMS débito (venda) e crédito (compra)", variant: getModuleVariant(3) },
          { title: "Escrituração Contábil Digital (ECD)", content: "Livro diário e razão em formato digital enviado à RFB", variant: getModuleVariant(3) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Nota Fiscal Eletrônica (NF-e)",
            content: "Documento obrigatório para circulação de mercadoria. Emitido eletronicamente com código de segurança (DANFE - documento auxiliar). Informações: dados do vendedor, comprador, produto, quantidade, preço, impostos. Gera obrigações acessórias (registros, pagamento de impostos)."
          },
          {
            title: "Documentos de Prestação de Serviço",
            content: "Recibo de Pagamento Autônomo (RPA): para autônomo que presta serviço ocasional. Recibo de Serviços: documento simples. NFS-e (Nota Fiscal de Serviço): em alguns municípios é eletrônica. Comprovante de ISS retido (importante para documentação)."
          },
          {
            title: "Livros Fiscais Obrigatórios",
            content: "Livro de Apuração ICMS: registro diário de operações (saídas = débitos, entradas = créditos). Livro de Imposto de Renda: registro de receitas e despesas. Livro de Entrada de Mercadoria: controle de compras. Livro de Saída de Mercadoria: controle de vendas."
          },
          {
            title: "Escrituração Contábil Digital (ECD)",
            content: "Sistema de transmissão de livros contábeis (diário e razão) à Receita Federal. Obrigatório para empresas acima de certo faturamento. Formato digital XML. Garante conformidade contábil e rastreabilidade de operações."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Documentos</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📄",
              title: "Nota Fiscal de Venda",
              description: "Petrobras vende 1.000 barris de óleo. NF-e: produto descrição, quantidade, preço unitário, valor total, tributos (ICMS, COFINS, PIS), emitida eletronicamente."
            },
            {
              emoji: "💼",
              title: "RPA de Consultor",
              description: "Consultor presta serviço R$ 5.000. Emite RPA: descrição do serviço, valor, base INSS 11%, retém ISS ~3%. Entrega RPA à empresa."
            },
            {
              emoji: "📊",
              title: "Livro de ICMS",
              description: "Mês julho: Entradas (compras) ICMS crédito R$ 50 mil. Saídas (vendas) ICMS débito R$ 80 mil. ICMS a pagar = 80 - 50 = R$ 30 mil."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-3"]}
        onComplete={(score: number) => handleQuizComplete("modulo-3", score)}
      />
    </div>
  );

  const renderModulo4 = () => (
    <div className="space-y-6">
      <ModuleBanner module={4} title="Declarações Tributárias" />
      <ModuleConsolidation
        cards={[
          { title: "DIPJ", content: "Declaração Imposto Pessoa Jurídica (anual)", variant: getModuleVariant(4) },
          { title: "ECF", content: "Escrituração Contábil Fiscal (mensal), com bases de cálculo", variant: getModuleVariant(4) },
          { title: "DACON", content: "Declaração de Compensação (créditos a compensar)", variant: getModuleVariant(4) },
          { title: "SPED", content: "Sistema Público Escrituração Digital (EFD)", variant: getModuleVariant(4) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "DIPJ (Declaração de Imposto Pessoa Jurídica)",
            content: "Declaração anual de IR. Apresenta: receitas brutas, custos, despesas, lucro. Informações: bases de cálculo (lucro real ou presumido), IR calculado, já recolhido (estimativas), saldo a pagar ou restituição. Prazo: até mês 4 do ano seguinte."
          },
          {
            title: "ECF (Escrituração Contábil Fiscal)",
            content: "Declaração mensal (por período de apuração). Apresenta: bases para cálculo de IR, CSLL, PIS, COFINS. Informações: receitas, custos, despesas, ajustes fiscais, bases e alíquotas. Obrigatória para empresas sob lucro real."
          },
          {
            title: "DACON (Declaração de Compensação)",
            content: "Quando empresa tem crédito tributário (ICMS, IR, PIS, COFINS) e quer compensar (abater) de futura dívida. Apresenta: crédito disponível, quanto quer compensar, em qual tributo. Garante fisco monitor de compensações."
          },
          {
            title: "SPED (Sistema Público Escrituração Digital)",
            content: "Plataforma integrada de transmissão de informações fiscais e contábeis. Módulos: EFD-ICMS/IPI (ICMS), EFD-Contribuições (PIS/COFINS), ECF (contábil). Transmissão: via certificado digital, prazo até dia 15 do mês seguinte."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Declarações</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📋",
              title: "DIPJ Anual",
              description: "Empresa com faturamento R$ 10 milhões. Receita Bruta R$ 10 mi. IR devido: calculado sobre lucro (exemplo R$ 1 mi) = R$ 250 k. DIPJ declara: estimativas pagas R$ 200k, saldo de IR: R$ 50k a pagar."
            },
            {
              emoji: "📊",
              title: "ECF Mensal",
              description: "Maio: Receita R$ 1 milhão. Custos R$ 600k. Despesas R$ 200k. Lucro R$ 200k. Base IR: 200k × 25% = R$ 50k em imposto."
            },
            {
              emoji: "💳",
              title: "DACON de Compensação",
              description: "Empresa tem crédito ICMS de R$ 100k por compra de máquina (não aproveitado em período). Usa DACON para compensar contra ICMS futuro de R$ 100k."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-4"]}
        onComplete={(score: number) => handleQuizComplete("modulo-4", score)}
      />
    </div>
  );

  const renderModulo5 = () => (
    <div className="space-y-6">
      <ModuleBanner module={5} title="Prazos e Obrigações Acessórias" />
      <ModuleConsolidation
        cards={[
          { title: "Prazos de Recolhimento", content: "ICMS, PIS, COFINS: até dia 15. IR: até 21º. INSS: até dia 15. ISS: varia por município", variant: getModuleVariant(5) },
          { title: "Prazos de Declaração", content: "DIPJ: até 30 de abril. ECF/SPED: até dia 15 mês seguinte", variant: getModuleVariant(5) },
          { title: "Obrigações de Registro", content: "Manter NF, livros fiscais, RPA, comprovantes de pagamento", variant: getModuleVariant(5) },
          { title: "Consequências de Atraso", content: "Multa por atraso de recolhimento, multa por falta de declaração, juros de mora", variant: getModuleVariant(5) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Calendário de Prazos Federais",
            content: "ICMS: até dia 15 (estadual, varia). PIS/COFINS: até dia 15. IR: até dia 21. Estimativas de IR: até dia 21 (trimestral). DIPJ: até 30 de abril. Prazo = data-limite para recolher/declarar. Atraso = multa + juros de mora."
          },
          {
            title: "Prazos por Tipo de Tributo",
            content: "Tributos Mensais: ICMS (dia 15), PIS/COFINS (dia 15), INSS (dia 15), FGTS (dia 7-8 mês seguinte). Tributos Trimestrais: Estimativas IR (dias 21). Tributos Anuais: DIPJ (30 de abril), CAGED (até dia 10 mês seguinte)."
          },
          {
            title: "Obrigações Acessórias Contínuas",
            content: "Emitir NF para toda venda. Manter livros contábeis e fiscais. Registrar operações corretamente. Manter comprovantes de pagamento. Guardar documentos por 5 anos (prazo de prescrição)."
          },
          {
            title: "Penalidades por Atraso",
            content: "Multa de Ofício: 0,5% ao mês (máximo 20%). Juros de Mora: SELIC (taxa básica de juros). Multa por Declaração Tardia: até 20% do imposto. Multa por Omissão de Informação: até R$ 20 mil. Multa agravada em caso de fraude."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Prazos</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📅",
              title: "Calendário Mensal",
              description: "Dia 7: FGTS vencido. Dia 15: ICMS, PIS, COFINS, INSS. Dia 21: IR (se apuração mensal). Empresa segue rigorosamente."
            },
            {
              emoji: "⚠️",
              title: "Atraso de ICMS",
              description: "ICMS de R$ 50 mil venceu dia 15. Recolhido dia 22 (7 dias atraso). Multa: 50k × 0,5% × 7 = R$ 1.750. Juros SELIC: ~R$ 500. Total: R$ 52.250."
            },
            {
              emoji: "📋",
              title: "Falta de Declaração",
              description: "Empresa não apresenta DIPJ. RFB emite auto de infração: multa por omissão ~20% do imposto (poderia ser R$ 50 mil). Evitável com disciplina."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-5"]}
        onComplete={(score: number) => handleQuizComplete("modulo-5", score)}
      />
    </div>
  );

  const renderModulo6 = () => (
    <div className="space-y-6">
      <ModuleBanner module={6} title="Gestão de Impostos" />
      <ModuleConsolidation
        cards={[
          { title: "Planejamento Tributário", content: "Analisar operações e estruturar para minimizar imposto", variant: getModuleVariant(6) },
          { title: "Controle de Fluxo de Caixa", content: "Prever pagamentos de impostos para manter liquidez", variant: getModuleVariant(6) },
          { title: "Aproveitamento de Créditos", content: "Usar ICMS, COFINS, PIS créditos para reduzir débito", variant: getModuleVariant(6) },
          { title: "Compensação e Restituição", content: "Compensar créditos contra débitos ou solicitar restituição", variant: getModuleVariant(6) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Planejamento Tributário Integrado",
            content: "Análise estruturada: qual operação gera menos imposto? Exemplo: compra de máquina (gera ICMS) vs aluguel (gera ISS). Qual é mais vantajoso? Análise permite decisão com base em carga tributária total, não apenas operacional."
          },
          {
            title: "Fluxo de Caixa Tributário",
            content: "Previsão mensal: qual será o imposto a pagar? Quando é o vencimento? Isso afeta caixa? Exemplo: ICMS vencimento dia 15, IR vencimento dia 21. Empresa previne falta de liquide"
          },
          {
            title: "Aproveitamento de Créditos",
            content: "ICMS Crédito: gera direito de abater em ICMS futuro. PIS/COFINS Crédito: abate em débito futuro. Importante: documentação correta (NF, recibos) para comprovação do crédito."
          },
          {
            title: "Compensação e Restituição",
            content: "Compensação: usar crédito para abater débito (economia imediata). Restituição: pedir ao fisco devolver crédito em dinheiro (líquida menos). Ambas estratégias legítimas de gestão."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Gestão</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📊",
              title: "Planejamento de Compra",
              description: "Compra de máquina: custo R$ 100k + ICMS R$ 18k = R$ 118k. Empresa aproveita ICMS crédito R$ 18k para abater em vendas futuras. Efetivo: máquina custa R$ 100k."
            },
            {
              emoji: "💰",
              title: "Fluxo de Caixa Anual",
              description: "Empresa com vendas sazonais (60% Q1, 40% Q2-Q4). Imposto: Q1 alto, Q2-Q4 baixo. Gestão: separar caixa em Q1 para cobrir picos de imposto em Q2."
            },
            {
              emoji: "✅",
              title: "Restituição de Crédito",
              description: "Exportadora tem crédito ICMS de R$ 200k (operações isentas, sem débito). Solicita restituição. Governo restitui R$ 200k (melhora caixa em situação específica)."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-6"]}
        onComplete={(score: number) => handleQuizComplete("modulo-6", score)}
      />
    </div>
  );

  const renderModulo7 = () => (
    <div className="space-y-6">
      <ModuleBanner module={7} title="Controle de Créditos Tributários" />
      <ModuleConsolidation
        cards={[
          { title: "Crédito ICMS", content: "Direito de abater ICMS de compra em ICMS de venda", variant: getModuleVariant(7) },
          { title: "Crédito PIS/COFINS", content: "Direito de abater PIS/COFINS de entrada em saída", variant: getModuleVariant(7) },
          { title: "Documentação de Crédito", content: "NF, RPA, recibo - prova de direito ao crédito", variant: getModuleVariant(7) },
          { title: "Aproveitamento Tempestivo", content: "Usar crédito dentro do prazo legal para não prescrever", variant: getModuleVariant(7) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Sistema de Crédito em Cascata",
            content: "ICMS: débito na venda, crédito na compra. Diferença = ICMS a pagar. Evita tributação em cascata (cada etapa já foi tributada). Importante: manter registro correto de débitos/créditos."
          },
          {
            title: "Condições para Aproveitamento",
            content: "Para ICMS: operação deve ser típica da empresa (compra de insumo para revenda). Documentação: NF emitida corretamente, operação legal. Para PIS/COFINS: insumo para produção/comercialização."
          },
          {
            title: "Documentação Comprobatória",
            content: "Nota Fiscal: deve indicar produtos, quantidade, preço, ICMS. RPA/Recibo: deve indicar ISS retido. Comprovante de Pagamento: RPA, DARF mostrando recolhimento. Tudo necessário para fisco aceitar crédito."
          },
          {
            title: "Prescrição de Crédito",
            content: "Crédito ICMS prescreve em 5 anos se não aproveitado. Crédito PIS/COFINS pode ter prescrição diferente. Importante: acompanhar para não perder direito. Compensação antes de prescrever."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Controle</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📋",
              title: "Apuração ICMS Mensal",
              description: "Entrada (compra): NF de fornecedor R$ 10k + ICMS R$ 1.800 = crédito R$ 1.800. Saída (venda): NF própria R$ 15k + ICMS R$ 2.700 = débito R$ 2.700. Apuração: 2.700 - 1.800 = R$ 900 a pagar."
            },
            {
              emoji: "🔍",
              title: "Auditoria de Crédito",
              description: "Empresa apresenta crédito ICMS de R$ 50k. Fisco verifica documentação: NF sem assinatura digital = crédito rejeitado. Multa por crédito indevido aproveitado."
            },
            {
              emoji: "📊",
              title: "Demonstrativo de Crédito",
              description: "Controle mensal: Saldo Inicial R$ 20k + Créditos Novos R$ 30k - Débito Compensado R$ 25k = Saldo Final R$ 25k (para próximo mês)."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-7"]}
        onComplete={(score: number) => handleQuizComplete("modulo-7", score)}
      />
    </div>
  );

  const renderModulo8 = () => (
    <div className="space-y-6">
      <ModuleBanner module={8} title="Sistemas de Informação Tributária" />
      <ModuleConsolidation
        cards={[
          { title: "NF-e/NFS-e", content: "Nota Fiscal Eletrônica - sistema obrigatório de emissão", variant: getModuleVariant(8) },
          { title: "SPED", content: "Sistema Público Escrituração Digital - transmissão de dados", variant: getModuleVariant(8) },
          { title: "Certificado Digital", content: "Segurança: assinatura digital em NF-e e SPED", variant: getModuleVariant(8) },
          { title: "Validação de Dados", content: "Verificar corretude de informações antes de transmissão", variant: getModuleVariant(8) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "NF-e (Nota Fiscal Eletrônica)",
            content: "Sistema obrigatório desde 2006. Empresa emite NF-e eletronicamente (via software). Nota enviada para SEFAZ (autorização). Comprador recebe DANFE (documento auxiliar). Rastreamento: SEFAZ mantém histórico de todas as NF-e emitidas."
          },
          {
            title: "EFD-ICMS/IPI e EFD-Contribuições (SPED)",
            content: "EFD-ICMS: arquivo digital com todos lançamentos de ICMS/IPI mensais. EFD-Contrib: arquivo com PIS/COFINS mensais. Transmissão: até dia 15 do mês seguinte à RFB via certificado digital. Garante rastreabilidade de operações."
          },
          {
            title: "Certificado Digital (e-CPF, e-CNPJ)",
            content: "Segurança: assinatura digital que comprova autoria de NF-e e SPED. Válido por 1 ano (renovação necessária). Custo: ~R$ 300-500 por ano. Armazenamento seguro (token/smart card)."
          },
          {
            title: "Validação de Dados Antes de Transmissão",
            content: "Software de NF-e: valida antes de enviar (CNPJ existe? Produto tem NCM válido? Imposto foi calculado?). Evita rejeição da SEFAZ. Rejeição = empresa deve corrigir e reenviar (atraso na documentação)."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Sistemas</h3>
        <CardCarousel
          cards={[
            {
              emoji: "💻",
              title: "Emissão de NF-e",
              description: "Venda de produto: empresa emite NF-e em software. Sistema valida (CNPJ OK, NCM OK, impostos corretos). Envia a SEFAZ. SEFAZ valida e autoriza. Comprador pode visualizar em 2-3 minutos."
            },
            {
              emoji: "📊",
              title: "Envio de SPED",
              description: "Mês de maio finalizado. Empresa gera arquivo EFD-ICMS com todas operações de ICMS (150 saídas, 80 entradas). Assina digitalmente com certificado. Transmite até dia 15 de junho."
            },
            {
              emoji: "🔐",
              title: "Certificado Digital",
              description: "CNPJ 123.456.789/0001-00 renova certificado digital (vencimento: 31/03/2024). Novo certificado válido de 01/04/2024 a 31/03/2025. Custo R$ 400."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-8"]}
        onComplete={(score: number) => handleQuizComplete("modulo-8", score)}
      />
    </div>
  );

  const renderModulo9 = () => (
    <div className="space-y-6">
      <ModuleBanner module={9} title="Administração Tributária em Petrobras" />
      <ModuleConsolidation
        cards={[
          { title: "Complexidade", content: "Múltiplos estados, tributos em cascata, royalties e participações", variant: getModuleVariant(9) },
          { title: "Conformidade", content: "Auditoria interna, conformidade regulatória máxima, transparência", variant: getModuleVariant(9) },
          { title: "Área Especializada", content: "Departamento Tributário próprio com analistas sênior", variant: getModuleVariant(9) },
          { title: "Tecnologia", content: "Sistemas integrados, automação, BI para gestão tributária", variant: getModuleVariant(9) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Desafios Tributários em Petrobras",
            content: "Operações em múltiplos estados: cada estado tem ICMS diferente. Múltiplos tributos: IRPJ, ICMS, PIS, COFINS, royalties, PE, INSS. Transações bilionárias: volume gera complexidade. Integração vertical: exploração → refino → distribuição (múltiplas jurisdições e tributos)."
          },
          {
            title: "Estrutura de Conformidade",
            content: "Departamento Tributário (Unidades de Negócio): monitora ICMS por estado. RFB: cumpre IRPJ, PIS, COFINS (federal). Auditoria Interna: valida conformidade contábil/fiscal. Conformidade Corporativa: garante Lei 13.303 (empresa estatal)."
          },
          {
            title: "Gestão de Royalties e Participações",
            content: "Cada campo tem contrato de concessão (define royalties, PE). Administração: calcular corretamente (produção × preço × alíquota). Monitoramento: valor repassado ao governo (verificar exatidão). Registros: documentar tudo para auditoria."
          },
          {
            title: "Sistemas de Informação em Petrobras",
            content: "ERP Integrado: dados de vendas, custos, posição tributária em tempo real. BI Tributário: dashboards de ICMS por estado, tendências de imposto. Automação: cálculos de tributos sem erro humano. Inteligência Artificial: previsão de imposto baseada em histórico."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplo de Administração Petrobras</h3>
        <CardCarousel
          cards={[
            {
              emoji: "⛽",
              title: "Vendas de Combustível",
              description: "Petrobras vende gasolina em 5 estados. Cada estado tem ICMS diferente (SP 18%, RJ 20%, MG 12%). Administração: apurar ICMS por estado, pagar para cada SEFAZ. Garantir conformidade em cada uma."
            },
            {
              emoji: "🛢️",
              title: "Royalties de Produção",
              description: "Campo de petróleo produz 50k bbl/dia. Royalties 5% = 2.500 bbl/dia. Preço Brent flutua: R$ 300 mi/mês. Administração: calcular royalties diários, repassar mensalmente ao governo. Auditoria: verificar se cálculo está correto."
            },
            {
              emoji: "📊",
              title: "Relatório Tributário Trimestral",
              description: "Petrobras consolida ICMS (5 estados): R$ 2 bilhões. IRPJ: R$ 1 bilhão. Royalties/PE: R$ 800 milhões. Total tributário: R$ 3,8 bilhões trimestral. Relatório para diretoria e CVM (transparência)."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-9"]}
        onComplete={(score: number) => handleQuizComplete("modulo-9", score)}
      />
    </div>
  );

  const renderModulo10 = () => (
    <div className="space-y-6">
      <ModuleBanner module={10} title="Simulado Mestre - Administração Tributária" />
      <ModuleConsolidation
        cards={[
          { title: "Integração", content: "Questões combinam múltiplos conceitos de administração", variant: getModuleVariant(10) },
          { title: "Cenários Realistas", content: "Casos práticos de operações e gestão tributária", variant: getModuleVariant(10) },
          { title: "Análise Crítica", content: "Demanda compreensão de procedimentos e prazos", variant: getModuleVariant(10) },
          { title: "Meta de Aprovação", content: "70% de acerto valida competência em administração tributária", variant: getModuleVariant(10) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Estrutura do Simulado",
            content: "Contém 10 questões que integram conhecimento de múltiplos módulos. Tópicos: órgãos arrecadadores, documentos fiscais, declarações, prazos, gestão de créditos, sistemas de informação, procedimentos administrativos."
          },
          {
            title: "Domínios Avaliados",
            content: "Conhecimento: quem é o órgão arrecadador? Qual é o prazo? Qual documentação é necessária? Procedimentos: como registrar operação? Como aproveitar crédito? Como fazer declaração? Gestão: como otimizar fluxo tributário? Como evitar multas?"
          },
          {
            title: "Estratégia de Resolução",
            content: "Leia situação com atenção: qual é o tributo em questão? Qual é o prazo aplicável? Identifique órgão responsável: RFB, SEFAZ, Prefeitura? Aplique procedimento: qual é o passo-a-passo correto? Verifique: resposta está coerente com Lei?"
          },
          {
            title: "Preparação para Concurso Petrobras",
            content: "Atingir 70% neste simulado demonstra competência de técnico/médio em administração tributária. Prepara para questões de prova sobre: gestão de impostos, conformidade, prazos, sistemas, procedimentos administrativos em contexto real."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Questões Integradas</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📅",
              title: "Gestão de Prazos",
              description: "Identifique os prazos: ICMS vencimento dia 15, INSS dia 15, IR dia 21, FGTS dia 7. Se vencimento cai em domingo, quando deve ser pago? Qual é a ordem de prioridade de caixa?"
            },
            {
              emoji: "📋",
              title: "Procedimento Correto",
              description: "Empresa tem crédito ICMS de R$ 500k (compra de insumo). Qual é o procedimento correto? Emitir DACON? Compensar contra ICMS de próximo mês? Qual é a documentação necessária?"
            },
            {
              emoji: "💼",
              title: "Gestão em Petrobras",
              description: "Campo de petróleo produz 10k bbl/dia. Royalties 5% = 500 bbl. Preço Brent R$ 100/bbl. Qual é o valor mensal de royalties a repassar ao governo? Como registrar corretamente?"
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={ADMINISTRACAO_TRIBUTARIA_QUIZZES["modulo-10"]}
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
          Administração Tributária
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestão de tributos para técnico em suprimento - Administração
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
          <strong>💡 Dica:</strong> Administração Tributária é prática: prazos, procedimentos, sistemas. Domine os calendários, documentação e fluxos. Complete cada módulo com 70%+ para desbloquear o próximo e consolidar competência em gestão tributária.
        </p>
      </div>
    </div>
  );
}
