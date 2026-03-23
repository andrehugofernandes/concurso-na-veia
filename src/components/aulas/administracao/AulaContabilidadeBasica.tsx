"use client";

/**
 * AulaContabilidadeBasica
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
import { CONTABILIDADE_BASICA_QUIZZES } from "@/data/quizzes/contabilidade-basica-quizzes";
import { getModuleVariant } from "@/lib/moduleColors";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos de Contabilidade" },
  { id: "modulo-2", label: "Módulo 2", title: "Equação Contábil Fundamentals" },
  { id: "modulo-3", label: "Módulo 3", title: "Plano de Contas" },
  { id: "modulo-4", label: "Módulo 4", title: "Lançamentos Contábeis" },
  { id: "modulo-5", label: "Módulo 5", title: "Balancete de Verificação" },
  { id: "modulo-6", label: "Módulo 6", title: "Demonstrações Contábeis" },
  { id: "modulo-7", label: "Módulo 7", title: "Análise de Demonstrações" },
  { id: "modulo-8", label: "Módulo 8", title: "Contabilidade de Custos" },
  { id: "modulo-9", label: "Módulo 9", title: "Contabilidade na Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaContabilidadeBasica({ onComplete }: AulaProps) {
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
      <ModuleBanner module={1} title="Fundamentos de Contabilidade" />
      <ModuleConsolidation
        cards={[
          { title: "Definição", content: "Ciência social que estuda o patrimônio das empresas", variant: getModuleVariant(1) },
          { title: "Objetivo", content: "Fornecer informações para decisões gerenciais", variant: getModuleVariant(1) },
          { title: "Usuários", content: "Sócios, credores, governo, fornecedores, clientes", variant: getModuleVariant(1) },
          { title: "Princípios", content: "Competência, periodicidade, continuidade, oportunidade", variant: getModuleVariant(1) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "O que é Contabilidade?",
            content: "A contabilidade é a ciência social que estuda e pratica as funções de orientação, controle e registro dos atos e fatos administrativos de uma entidade. Ela controla o patrimônio das empresas através de técnicas e procedimentos específicos."
          },
          {
            title: "Usuários da Contabilidade",
            content: "Os usuários internos incluem gerentes, diretores e proprietários que usam informações contábeis para tomar decisões. Usuários externos incluem sócios, bancos, governo, fornecedores e clientes que precisam de informações financeiras para suas decisões."
          },
          {
            title: "Princípios Fundamentais",
            content: "Princípio da Competência: despesas e receitas registradas quando ocorrem. Princípio da Continuidade: pressupõe que a empresa continua operando. Princípio da Oportunidade: registro oportuno dos fatos. Princípio da Periodicidade: informações em períodos regulares."
          },
          {
            title: "Técnicas de Contabilidade",
            content: "Escrituração: registrar as operações em livros contábeis. Demonstrações: apresentar informações através de demonstrações financeiras. Análise: interpretar dados contábeis. Auditoria: verificar a fidelidade dos registros."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Aplicação</h3>
        <CardCarousel
          cards={[
            {
              emoji: "🏢",
              title: "Petrobras Exploração",
              description: "Contabilidade registra todos os gastos com perfuração, produção e transporte de óleo, fornecendo informações para análise de rentabilidade por campo."
            },
            {
              emoji: "📊",
              title: "Decisão de Investimento",
              description: "Gerentes da Petrobras usam demonstrações contábeis para decidir se investir em novas plataformas ou modernizar refinarias."
            },
            {
              emoji: "🔍",
              title: "Conformidade Regulatória",
              description: "Governo fiscaliza os registros contábeis da Petrobras para garantir cumprimento de leis tributárias e regulatórias."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-1"]}
        onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner module={2} title="Equação Contábil Fundamentals" />
      <ModuleConsolidation
        cards={[
          { title: "Ativo", content: "Bens e direitos (recursos da empresa)", variant: getModuleVariant(2) },
          { title: "Passivo", content: "Obrigações (dívidas da empresa)", variant: getModuleVariant(2) },
          { title: "Patrimônio Líquido", content: "Capital dos sócios mais lucros retidos", variant: getModuleVariant(2) },
          { title: "Equação", content: "ATIVO = PASSIVO + PATRIMÔNIO LÍQUIDO", variant: getModuleVariant(2) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Estrutura Básica do Balanço",
            content: "O balanço patrimonial é representado pela equação fundamental: Ativo = Passivo + Patrimônio Líquido. Esta equação deve estar sempre em equilíbrio, representando que todos os recursos da empresa (ativo) são financiados por obrigações (passivo) ou capital dos sócios (patrimônio líquido)."
          },
          {
            title: "Ativo da Empresa",
            content: "O ativo compreende todos os bens e direitos da empresa. Bens incluem caixa, estoques, imóveis, equipamentos. Direitos incluem contas a receber, empréstimos a funcionários. O ativo é classificado em circulante (conversível em até um ano) e não-circulante (longo prazo)."
          },
          {
            title: "Passivo e Patrimônio Líquido",
            content: "Passivo representa obrigações (contas a pagar, empréstimos, salários). Patrimônio Líquido é a diferença entre ativo e passivo, representando o valor que sobra para os sócios. Aumenta com lucros e diminui com prejuízos."
          },
          {
            title: "Variações da Equação",
            content: "Em Petrobras: Ativo inclui plataformas, dutos, refinarias. Passivo inclui empréstimos para expansão. Patrimônio Líquido é afetado por dividendos pagos ao governo (acionista majoritário) e lucros retidos."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Aplicação</h3>
        <CardCarousel
          cards={[
            {
              emoji: "💰",
              title: "Empresa de Suprimentos",
              description: "Ativo: R$ 500 mil (estoques, máquinas). Passivo: R$ 200 mil (dívidas). Patrimônio: R$ 300 mil (capital dos sócios)."
            },
            {
              emoji: "🏭",
              title: "Plataforma Petrobras",
              description: "Ativo: R$ 2 bilhões (instalações). Passivo: R$ 800 milhões (empréstimos). Patrimônio: R$ 1,2 bilhão."
            },
            {
              emoji: "📈",
              title: "Impacto do Lucro",
              description: "Empresa com lucro de R$ 100 mil vê seu patrimônio aumentar de R$ 300 mil para R$ 400 mil sem novos investimentos."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-2"]}
        onComplete={(score: number) => handleQuizComplete("modulo-2", score)}
      />
    </div>
  );

  const renderModulo3 = () => (
    <div className="space-y-6">
      <ModuleBanner module={3} title="Plano de Contas" />
      <ModuleConsolidation
        cards={[
          { title: "Definição", content: "Estrutura hierárquica de contas para registrar operações", variant: getModuleVariant(3) },
          { title: "Conta", content: "Unidade mínima para registro de operações contábeis", variant: getModuleVariant(3) },
          { title: "Classe", content: "Agrupamento de contas por tipo (1-Ativo, 2-Passivo, etc.)", variant: getModuleVariant(3) },
          { title: "Cobrança", content: "Terceiro nível: detalhamento dentro de grupos", variant: getModuleVariant(3) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "O que é Plano de Contas?",
            content: "O plano de contas é um documento que lista e codifica todas as contas que uma empresa utilizará para registrar suas operações. Ele funciona como um índice de referência, organizando contas de forma hierárquica e facilitando a localização para lançamento."
          },
          {
            title: "Estrutura Hierárquica",
            content: "Classe (1º nível): 1-Ativo, 2-Passivo, 3-Patrimônio Líquido, 4-Receitas, 5-Despesas. Grupo (2º nível): especificações dentro da classe. Subgrupo (3º nível): detalhamento adicional. Conta (4º nível): unidade final para lançamentos."
          },
          {
            title: "Codificação de Contas",
            content: "Geralmente seguem padrão numérico. Primeira cifra indica classe. Demais cifras indicam nível hierárquico. Exemplo: 1.1.1.01 = Ativo Circulante > Caixa > Caixa - Geral > Caixa em Reais."
          },
          {
            title: "Plano de Contas em Petrobras",
            content: "Petrobras utiliza plano de contas padronizado para todas suas operações. Contas específicas para exploração de petróleo (custos de perfuração, produção), refino (custos de processamento), comercialização (vendas de derivados). Deve estar em conformidade com regulação internacional (IFRS)."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Contas</h3>
        <CardCarousel
          cards={[
            {
              emoji: "💼",
              title: "Ativo Circulante",
              description: "Caixa em Reais, Caixa em Dólares, Contas a Receber - Clientes, Contas a Receber - Governo."
            },
            {
              emoji: "📦",
              title: "Estoque",
              description: "Estoques de Matérias-Primas, Estoques de Produtos em Processo, Estoques de Produtos Acabados, Estoques de Combustíveis."
            },
            {
              emoji: "🏗️",
              title: "Ativo Imobilizado",
              description: "Edifícios, Máquinas e Equipamentos, Plataformas de Produção, Dutos de Transporte, Refinarias, Depreciacão Acumulada."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-3"]}
        onComplete={(score: number) => handleQuizComplete("modulo-3", score)}
      />
    </div>
  );

  const renderModulo4 = () => (
    <div className="space-y-6">
      <ModuleBanner module={4} title="Lançamentos Contábeis" />
      <ModuleConsolidation
        cards={[
          { title: "Método das Partidas Dobradas", content: "Cada operação afeta dois lados da equação", variant: getModuleVariant(4) },
          { title: "Débito", content: "Aumenta ativo e despesa; diminui passivo e receita", variant: getModuleVariant(4) },
          { title: "Crédito", content: "Diminui ativo e despesa; aumenta passivo e receita", variant: getModuleVariant(4) },
          { title: "Escrituração", content: "Processo de registrar lançamentos em livros contábeis", variant: getModuleVariant(4) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Método das Partidas Dobradas",
            content: "Fundamenta-se no princípio de que cada operação gera um débito e um crédito de igual valor. Garante que a equação contábil (Ativo = Passivo + Patrimônio Líquido) se mantenha em equilíbrio. É a base de toda a contabilidade moderna."
          },
          {
            title: "Débitos e Créditos",
            content: "Para contas de ATIVO: débito = aumento, crédito = diminuição. Para contas de PASSIVO: débito = diminuição, crédito = aumento. Para PATRIMÔNIO: débito = diminuição, crédito = aumento. Para RECEITAS: débito = diminuição, crédito = aumento. Para DESPESAS: débito = aumento, crédito = diminuição."
          },
          {
            title: "Exemplo de Lançamento",
            content: "Empresa compra equipamento por R$ 10.000 em dinheiro. Débito Máquinas e Equipamentos (ativo) R$ 10.000. Crédito Caixa (ativo) R$ 10.000. O ativo mantém R$ 10.000 no total, apenas mudou de forma (caixa para equipamento)."
          },
          {
            title: "Lançamentos em Petrobras",
            content: "Compra de tubulação para perfuração: Débito Ativo Imobilizado, Crédito Contas a Pagar. Venda de óleo por R$ 1 milhão: Débito Caixa, Crédito Receita de Vendas. Pagamento de salários: Débito Despesa de Pessoal, Crédito Caixa."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Lançamentos</h3>
        <CardCarousel
          cards={[
            {
              emoji: "🛢️",
              title: "Compra de Matéria-Prima",
              description: "Débito: Estoques de Matérias-Primas. Crédito: Contas a Pagar. Afeta ativo (estoque) e passivo (dívida) equilibradamente."
            },
            {
              emoji: "💵",
              title: "Recebimento de Cliente",
              description: "Débito: Caixa. Crédito: Contas a Receber. Ambos são ativos, apenas muda a forma de apresentação."
            },
            {
              emoji: "👷",
              title: "Pagamento de Folha",
              description: "Débito: Despesa de Pessoal. Crédito: Caixa. Diminui caixa e gera despesa que reduz resultado."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-4"]}
        onComplete={(score: number) => handleQuizComplete("modulo-4", score)}
      />
    </div>
  );

  const renderModulo5 = () => (
    <div className="space-y-6">
      <ModuleBanner module={5} title="Balancete de Verificação" />
      <ModuleConsolidation
        cards={[
          { title: "Definição", content: "Demonstração de saldos de todas as contas em período", variant: getModuleVariant(5) },
          { title: "Função", content: "Verificar se débitos = créditos e identificar erros", variant: getModuleVariant(5) },
          { title: "Elaboração", content: "Coleta saldos de todas contas do diário e razão", variant: getModuleVariant(5) },
          { title: "Período", content: "Geralmente mensal, durante e após o período contábil", variant: getModuleVariant(5) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "O que é Balancete?",
            content: "Balancete é uma demonstração contábil que lista o saldo de todas as contas abertas em determinada data. Serve como ferramenta de controle interno para verificar a integridade dos registros antes da elaboração das demonstrações financeiras."
          },
          {
            title: "Estrutura do Balancete",
            content: "Cabeçalho: nome da empresa, período. Coluna 1: código e nome da conta. Coluna 2: saldo devedor. Coluna 3: saldo credor. Linhas de total verificando se saldo devedor total = saldo credor total. A igualdade entre esses totais confirma que não há erros de lançamento."
          },
          {
            title: "Função de Auditoria Interna",
            content: "Identifica erros antes de publicar demonstrações financeiras. Verifica se todas as contas foram lançadas corretamente. Detecta contas com erro de digitação ou lançamentos invertidos. Permite correção de erros no período contábil ainda aberto."
          },
          {
            title: "Balancete em Petrobras",
            content: "Petrobras elabora balancetes mensais para cada unidade de negócio. Permite acompanhamento de performance operacional mensalmente. Identifica variações anormais em custos de produção antes do fechamento do período. Facilita elaboração de relatórios de gestão para diretoria."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplo de Balancete</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📋",
              title: "Verificação de Igualdade",
              description: "Empresa com débitos totais R$ 500.000 e créditos R$ 500.000. Balancete equilibrado indica que lançamentos duplos foram feitos corretamente."
            },
            {
              emoji: "⚠️",
              title: "Detecção de Erro",
              description: "Débitos R$ 510.000 e créditos R$ 500.000. Diferença de R$ 10.000 indica erro de lançamento que deve ser corrigido."
            },
            {
              emoji: "🔍",
              title: "Análise de Contas",
              description: "Balancete mostra que Caixa tem saldo devedor de R$ 50.000, indicando possível saque a descoberto não autorizado."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-5"]}
        onComplete={(score: number) => handleQuizComplete("modulo-5", score)}
      />
    </div>
  );

  const renderModulo6 = () => (
    <div className="space-y-6">
      <ModuleBanner module={6} title="Demonstrações Contábeis" />
      <ModuleConsolidation
        cards={[
          { title: "Balanço Patrimonial", content: "Posição financeira em determinada data", variant: getModuleVariant(6) },
          { title: "DRE", content: "Resultado de exercício (receitas menos despesas)", variant: getModuleVariant(6) },
          { title: "DMPL", content: "Mutações do patrimônio líquido no período", variant: getModuleVariant(6) },
          { title: "Fluxo de Caixa", content: "Movimentação de entrada e saída de dinheiro", variant: getModuleVariant(6) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Balanço Patrimonial",
            content: "Demonstra a posição financeira da empresa em determinada data, mostrando Ativo (recursos), Passivo (obrigações) e Patrimônio Líquido (capital dos sócios). Geralmente elaborado em 31 de dezembro e em 30 de junho (demonstrações intermediárias)."
          },
          {
            title: "Demonstração de Resultado (DRE)",
            content: "Mostra o resultado econômico da empresa em período (receitas menos despesas). Estrutura: Receitas Operacionais - Custos de Produção = Lucro Bruto. Lucro Bruto - Despesas Operacionais = Lucro Operacional. Lucro Operacional +/- Itens Extraordinários = Lucro Líquido."
          },
          {
            title: "Demonstração de Mutações do Patrimônio Líquido",
            content: "Mostra movimento do patrimônio durante período. Saldo inicial + Lucro Líquido - Dividendos = Saldo Final. Muito importante para análise de rentabilidade sobre o capital investido e política de distribuição de resultados."
          },
          {
            title: "Fluxo de Caixa",
            content: "Demonstra movimentação de numerário. Atividades Operacionais: geração de caixa da operação. Atividades de Investimento: compra/venda de ativos. Atividades de Financiamento: empréstimos, capital, dividendos. Saldo final = Caixa disponível para operação."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplo de Demonstrações</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📊",
              title: "Balanço Patrimonial Petrobras",
              description: "Ativo Total: R$ 800 bilhões. Passivo: R$ 400 bilhões. Patrimônio Líquido: R$ 400 bilhões. Estrutura reflete investimentos em infraestrutura."
            },
            {
              emoji: "📈",
              title: "DRE Petrobras 2024",
              description: "Receita de Vendas: R$ 500 bilhões. Custos: R$ 350 bilhões. Lucro Bruto: R$ 150 bilhões. Despesas: R$ 50 bilhões. Lucro Líquido: R$ 100 bilhões."
            },
            {
              emoji: "💵",
              title: "Fluxo de Caixa Operacional",
              description: "Atividades Operacionais: +R$ 120 bilhões. Investimentos: -R$ 80 bilhões. Financiamento: -R$ 30 bilhões. Caixa Final: +R$ 10 bilhões."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-6"]}
        onComplete={(score: number) => handleQuizComplete("modulo-6", score)}
      />
    </div>
  );

  const renderModulo7 = () => (
    <div className="space-y-6">
      <ModuleBanner module={7} title="Análise de Demonstrações" />
      <ModuleConsolidation
        cards={[
          { title: "Índices de Liquidez", content: "Capacidade de pagar dívidas curto prazo", variant: getModuleVariant(7) },
          { title: "Índices de Solvência", content: "Capacidade de pagar todas dívidas (curto+longo)", variant: getModuleVariant(7) },
          { title: "Índices de Rentabilidade", content: "Retorno sobre ativos e capital investido", variant: getModuleVariant(7) },
          { title: "Análise Horizontal e Vertical", content: "Comparação temporal e estrutural de contas", variant: getModuleVariant(7) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Índices de Liquidez",
            content: "Liquidez Corrente = Ativo Circulante / Passivo Circulante (superior a 1 indica liquidez). Liquidez Seca = (Ativo Circulante - Estoques) / Passivo Circulante (mais conservador). Liquidez Imediata = Caixa / Passivo Circulante (capacidade de pagar imediatamente)."
          },
          {
            title: "Índices de Solvência e Endividamento",
            content: "Solvência Geral = Ativo Total / Passivo Total (superior a 1 indica solvência). Endividamento = Passivo Total / Ativo Total (inferior a 50% é mais conservador). Cobertura de Juros = Lucro Operacional / Despesa de Juros."
          },
          {
            title: "Índices de Rentabilidade",
            content: "ROA (Retorno sobre Ativo) = Lucro Líquido / Ativo Total. ROE (Retorno sobre Patrimônio) = Lucro Líquido / Patrimônio Líquido. Margem Líquida = Lucro Líquido / Receita. Giro do Ativo = Receita / Ativo Total."
          },
          {
            title: "Análise de Tendência em Petrobras",
            content: "Análise Horizontal: comparação de contas entre períodos (2023 vs 2024). Análise Vertical: estrutura de balanço em percentuais (caixa é 5% do ativo?). Identifica concentração de riscos e eficiência operacional ao longo do tempo."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplo de Análise</h3>
        <CardCarousel
          cards={[
            {
              emoji: "💧",
              title: "Análise de Liquidez",
              description: "Empresa com LC = 2.0 tem bom desempenho. Para cada R$ 1 de dívida curto prazo, tem R$ 2 de ativo circulante."
            },
            {
              emoji: "🏦",
              title: "Endividamento Petrobras",
              description: "Petrobras com 40% endividamento é considerada conservadora na indústria de óleo e gás, permitindo investimentos."
            },
            {
              emoji: "📈",
              title: "Rentabilidade ROE",
              description: "ROE de 15% significa que para cada R$ 100 de patrimônio, a empresa gera R$ 15 de lucro ao ano. Acima da média é positivo."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-7"]}
        onComplete={(score: number) => handleQuizComplete("modulo-7", score)}
      />
    </div>
  );

  const renderModulo8 = () => (
    <div className="space-y-6">
      <ModuleBanner module={8} title="Contabilidade de Custos" />
      <ModuleConsolidation
        cards={[
          { title: "Custos de Produção", content: "Matéria-prima, mão-de-obra direta, CIF", variant: getModuleVariant(8) },
          { title: "Despesas Operacionais", content: "Custos fora de produção (administração, vendas)", variant: getModuleVariant(8) },
          { title: "Custo-Volume-Lucro", content: "Relação entre quantidade, custos e resultados", variant: getModuleVariant(8) },
          { title: "Método de Custeio", content: "Absorção e variável para análise de custos", variant: getModuleVariant(8) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Custos de Produção",
            content: "Matéria-Prima: material que entra no produto (aço em máquinas). Mão-de-Obra Direta: salários de quem produz o bem. Custos Indiretos de Fabricação (CIF): aluguel fábrica, energia produção, depreciação máquinas."
          },
          {
            title: "Diferença entre Custo e Despesa",
            content: "Custo: gasto com produção de bens (está no produto). Despesa: gasto que não entra no produto (salário gerente, propaganda). Custo de Produção = Matéria-Prima + Mão-de-Obra Direta + CIF. Despesa afeta diretamente o resultado do período."
          },
          {
            title: "Custo-Volume-Lucro (CVL)",
            content: "Análise integrada de custos, volume de produção e lucro resultante. Ponto de Equilíbrio (Break-Even): volume onde receita = custos totais. Margem de Contribuição: receita - custos variáveis (quanto cada unidade contribui para cobrir custos fixos)."
          },
          {
            title: "Custos em Petrobras",
            content: "Exploração: custos de perfuração, completação, produção. Refino: custos de processamento de óleo bruto. Distribuição: custos de transporte, logística. Custos fixos de infraestrutura (plataformas, refinarias). Análise crítica para decisão de produzir ou parar poços."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Custeio</h3>
        <CardCarousel
          cards={[
            {
              emoji: "🏭",
              title: "Custos de Refino",
              description: "Matéria-Prima: R$ 500/bbl de óleo. Mão-de-Obra: R$ 50/bbl. CIF: R$ 100/bbl. Custo Total: R$ 650/bbl. Receita: R$ 800/bbl."
            },
            {
              emoji: "📍",
              title: "Ponto de Equilíbrio",
              description: "Custos fixos R$ 1 milhão. Margem de contribuição R$ 100/barril. Equilíbrio = 10.000 barris por mês."
            },
            {
              emoji: "⚙️",
              title: "Decisão de Produção",
              description: "Preço do óleo caiu para R$ 600/bbl. Custo total R$ 650. Perda de R$ 50 por barril. Decisão: parar produção ou buscar redução de custos."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-8"]}
        onComplete={(score: number) => handleQuizComplete("modulo-8", score)}
      />
    </div>
  );

  const renderModulo9 = () => (
    <div className="space-y-6">
      <ModuleBanner module={9} title="Contabilidade na Petrobras" />
      <ModuleConsolidation
        cards={[
          { title: "Lei 13.303", content: "Empresa estatal segue contabilidade pública", variant: getModuleVariant(9) },
          { title: "IFRS", content: "International Financial Reporting Standards adotados", variant: getModuleVariant(9) },
          { title: "Conformidade", content: "Auditoria interna, externa e CVM (Comissão de Valores)", variant: getModuleVariant(9) },
          { title: "Disclosure", content: "Transparência em divulgação de informações financeiras", variant: getModuleVariant(9) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Regras de Contabilidade em Petrobras",
            content: "Petrobras é empresa estatal de capital aberto, sujeita a Lei 13.303 e regulação da CVM. Adota IFRS para apresentação de demonstrações financeiras. Segue normas de contabilidade pública para alguns aspectos. Auditoria externa independente obrigatória."
          },
          {
            title: "Normas IFRS em Petrobras",
            content: "IFRS 6 (Exploração e Avaliação de Recursos Minerais): para contabilização de atividades exploratórias. IFRS 16 (Arrendamentos): para contabilização de contratos de aluguel de equipamentos. Mensuração de ativos ao valor justo quando aplicável. Divulgação de informações por segmento de negócio."
          },
          {
            title: "Auditoria e Conformidade",
            content: "Auditoria Interna: equipe Petrobras que monitora conformidade. Auditoria Externa: Big 4 contratada pela Petrobras. Conselho Fiscal: órgão que opina sobre demonstrações financeiras. CVM: órgão regulador que fiscaliza divulgação de informações."
          },
          {
            title: "Divulgação e Transparência",
            content: "Petrobras divulga demonstrações financeiras trimestrais e anuais no site. Relatório Integrado inclui informações sociais e ambientais. Conference calls explicando resultados aos investidores. Atendimento a requisitos de governança corporativa e ESG (Environmental, Social, Governance)."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplo de Aplicação Petrobras</h3>
        <CardCarousel
          cards={[
            {
              emoji: "📊",
              title: "Demonstração de Resultados Trimestral",
              description: "Petrobras divulga resultados Q1 2024: Receita R$ 125 bilhões. Lucro Operacional R$ 35 bilhões. Lucro Líquido R$ 28 bilhões. Relatório explicativo em português e inglês."
            },
            {
              emoji: "🔍",
              title: "Auditoria de Estoque",
              description: "Auditores externos verificam estoques de óleo em terminais. Conferem quantidade física com registros contábeis. Emitem parecer sobre confiabilidade de informações de estoque (ativo importante)."
            },
            {
              emoji: "💼",
              title: "Compliance de Transações",
              description: "Conformidade com Lei 13.303: todas contratações acima de R$ 1 milhão exigem aprovação de áreas específicas. Auditoria interna monitora cumprimento."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-9"]}
        onComplete={(score: number) => handleQuizComplete("modulo-9", score)}
      />
    </div>
  );

  const renderModulo10 = () => (
    <div className="space-y-6">
      <ModuleBanner module={10} title="Simulado Mestre - Contabilidade" />
      <ModuleConsolidation
        cards={[
          { title: "Integração", content: "Questões combinam múltiplos conceitos de contabilidade", variant: getModuleVariant(10) },
          { title: "Cenários Realistas", content: "Casos práticos de Petrobras e empresas similares", variant: getModuleVariant(10) },
          { title: "Análise Crítica", content: "Demanda interpretação além da simples memorização", variant: getModuleVariant(10) },
          { title: "Meta de Aprovação", content: "70% de acerto valida competência em contabilidade", variant: getModuleVariant(10) },
        ]}
      />
      <ContentAccordion
        sections={[
          {
            title: "Estrutura do Simulado Mestre",
            content: "Contém 10 questões de alta complexidade que integram múltiplos módulos. Simula situações reais de análise contábil em Petrobras. Requer interpretação de informações e tomada de decisão. Avaliam profundidade de aprendizado e aplicabilidade prática."
          },
          {
            title: "Domínios de Conhecimento Avaliados",
            content: "Equação contábil e patrimônio: questões sobre variação de ativos/passivos. Lançamentos contábeis: aplicação de partidas dobradas em situações complexas. Demonstrações financeiras: interpretação integrada de múltiplas peças. Análise de custos: decisão operacional baseada em CVL."
          },
          {
            title: "Estratégia de Resolução",
            content: "Leia com atenção: muitos detalhes contam em questões de contabilidade. Identifique o ponto principal: qual é a interrogação real? Aplique conhecimento: use fórmulas e conceitos apropriados. Verifique a resposta: ela faz sentido no contexto?"
          },
          {
            title: "Preparação para Concurso",
            content: "Atingir 70% neste simulado prepara você para questões de prova. Demonstra que consegue aplicar contabilidade em contexto empresarial real. Indica competência de nível técnico/médio exigido. Promove confiança para avançar em disciplinas tributárias subsequentes."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Questões Integradas</h3>
        <CardCarousel
          cards={[
            {
              emoji: "🔄",
              title: "Ciclo Contábil Completo",
              description: "Dado balanço inicial, série de lançamentos (compra estoque, venda a prazo, pagamento despesa), calcule balanço final e resultado. Requer entendimento de equação contábil, lançamentos e DRE."
            },
            {
              emoji: "📊",
              title: "Análise de Demonstrações",
              description: "Apresentado balanço e DRE de empresa, calcule índices de liquidez, rentabilidade e compare com padrão do setor. Determine se empresa está saudável e recomende ações."
            },
            {
              emoji: "💡",
              title: "Decisão Operacional",
              description: "Plataforma de petróleo com custos fixos R$ 100 mi/ano e custos variáveis R$ 50/barril. Preço de venda R$ 80/barril. Determine ponto de equilíbrio e impacto de queda de preço para R$ 60."
            }
          ]}
        />
      </div>
      <QuizInterativo
        quiz={CONTABILIDADE_BASICA_QUIZZES["modulo-10"]}
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
          Contabilidade Básica
        </h1>
        <p className="text-muted-foreground mt-2">
          Fundamentos de contabilidade para técnico em suprimento - Administração
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
          <strong>💡 Dica:</strong> Complete cada módulo com pelo menos 70% de acerto para desbloquear o próximo. Ao final, você terá domínio completo de contabilidade básica.
        </p>
      </div>
    </div>
  );
}
