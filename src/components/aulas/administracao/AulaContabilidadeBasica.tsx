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
  ModuleBanner,
  ModuleSectionHeader
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
      <ModuleBanner 
        numero={1} 
        titulo="Fundamentos de Contabilidade" 
        descricao="A base estratégica para gestão e tomada de decisão organizacional."
        variant="amber"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={1}
          title="Fundamentos de Contabilidade"
          description="Entenda por que a contabilidade é essencial para qualquer organização, especialmente em contexto Petrobras."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            A <strong>contabilidade</strong> é a ciência social que estuda e pratica as funções de orientação, controle e registro dos atos e fatos administrativos de uma entidade. Diferente do que muitos pensam, ela não é apenas um conjunto de cálculos financeiros, mas uma <strong>ferramenta estratégica de gestão</strong> que fornece informações essenciais para tomada de decisão. Em organizações como a Petrobras, a contabilidade rastreia não apenas caixa, mas operações complexas envolvendo exploração, refino, distribuição e comercialização de derivados de petróleo.
          </p>

          <p>
            A contabilidade serve a <strong>múltiplos usuários</strong>, cada um com necessidades específicas. Usuários internos como gerentes, diretores e proprietários precisam de informações frequentes (diárias, mensais) para decisões operacionais. Usuários externos como bancos, governo, fornecedores e investidores necessitam de informações consolidadas (anuais ou trimestrais) para avaliar saúde financeira. Na Petrobras, esse público é ainda mais amplo: acionistas (privados e governamentais), órgãos reguladores como CVM e IBAMA, credores internacionais e a sociedade civil que acompanha sustentabilidade corporativa.
          </p>

          <p>
            A contabilidade obedece a <strong>princípios fundamentais</strong> que garantem confiabilidade e comparabilidade das informações. O Princípio da Competência determina que receitas e despesas sejam reconhecidas quando ocorrem, não quando dinheiro entra ou sai. O Princípio da Continuidade pressupõe que a empresa continuará operando indefinidamente (não será liquidada). O Princípio da Oportunidade exige registro oportuno dos fatos contábeis. O Princípio da Periodicidade divide a operação em períodos regulares (meses, trimestres, anos) para fins de relatório. Esses princípios, consolidados nas normas IFRS (International Financial Reporting Standards) que a Petrobras adota, garantem que qualquer pessoa ao redor do mundo possa interpretar as demonstrações financeiras.
          </p>

          <p>
            A profissão contábil utiliza <strong>técnicas específicas</strong> para cumprir sua missão. A Escrituração registra cada operação em livros contábeis seguindo o método das partidas dobradas (veremos em detalhe depois). As Demonstrações consolidam essas informações em relatórios estruturados (balanço patrimonial, demonstração de resultado). A Análise interpreta esses dados através de índices e tendências. A Auditoria verifica a fidelidade dos registros, garantindo conformidade com normas. Juntas, essas técnicas criam um sistema de informação confiável.
          </p>

          <p>
            Para a <strong>Petrobras especificamente</strong>, a contabilidade desempenha papel estratégico. Como empresa de capital aberto e economia mista, deve seguir Lei 13.303, regulação da CVM e normas IFRS. Registra operações complexas: exploração de campos de petróleo (com custos variáveis por barril e amortização de investimentos), refino (com custos de processamento), armazenagem e distribuição. As informações contábeis impactam decisões de expansão, manutenção de poços, investimento em tecnologia de exploração e composição de portfólio energético.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Escopo da Contabilidade</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Controla o patrimônio através de técnicas de escrituração</li>
              <li>✓ Fornece informações para decisões gerenciais e de investimento</li>
              <li>✓ Atende usuários internos (gestores) e externos (credores, governo, investidores)</li>
              <li>✓ Segue princípios fundamentais (competência, continuidade, oportunidade, periodicidade)</li>
              <li>✓ Base para conformidade regulatória, especialmente em Petrobras (Lei 13.303, CVM, IFRS)</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={1}
        variant={getModuleVariant(1)}
        video={{ videoId: "cont-m1", title: "O que é Contabilidade", duration: "10:00" }}
        resumoVisual={{
          moduloNome: "Módulo 1",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Conceitos Fundamentais", type: "Conceito", placeholderColor: "bg-amber-500/20" },
            { title: "Princípios Contábeis", type: "Estrutura", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        maceteVisual={{
          title: "O Pulo do Gato",
          content: <p className="text-sm italic">{"A Contabilidade não é exata, é social. Ela conta a história da empresa através dos números."}</p>
        }}
        audio={{ audioUrl: "#", titulo: "Introdução à Contabilidade", artista: "Prof. Contabilidade" }}
      />
      <ContentAccordion
        slides={[
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
              title: "Petrobras Exploração",
              descricao: "Contabilidade registra todos os gastos com perfuração, produção e transporte de óleo, fornecendo informações para análise de rentabilidade por campo."
            },
            {
              title: "Decisão de Investimento",
              descricao: "Gerentes da Petrobras usam demonstrações contábeis para decidir se investir em novas plataformas ou modernizar refinarias."
            },
            {
              title: "Conformidade Regulatória",
              descricao: "Governo fiscaliza os registros contábeis da Petrobras para garantir cumprimento de leis tributárias e regulatórias."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Fundamentos da Profissão"
        numero={1}
        variant="amber"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-1"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner 
        numero={2} 
        titulo="Equação Contábil Fundamentals" 
        descricao="Entenda Ativo, Passivo e Patrimônio Líquido em perfeito equilíbrio."
        variant="emerald"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={2}
          title="Equação Contábil"
          description="A base matemática que sustenta toda a contabilidade: Ativo = Passivo + Patrimônio Líquido."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            A <strong>equação contábil fundamental</strong> é a espinha dorsal de toda a contabilidade: Ativo = Passivo + Patrimônio Líquido. Esta equação não é meramente teórica; é uma <strong>representação matemática da realidade econômica</strong> de qualquer empresa. Ela expressa que todos os recursos da empresa (ativo) têm origem em fontes de financiamento: obrigações com terceiros (passivo) ou capital investido pelos sócios (patrimônio líquido). Essa equação deve estar <strong>sempre em equilíbrio</strong>, uma propriedade fundamental que permite que a contabilidade detecte erros de registro.
          </p>

          <p>
            O <strong>Ativo</strong> compreende tudo que a empresa possui e tem direito a receber. Bens incluem caixa em espécie, contas bancárias, estoques de produtos, imóveis, máquinas e equipamentos. Direitos incluem contas a receber de clientes (ainda não recebidos), empréstimos concedidos a funcionários, depósitos em garantia. O ativo é organizado em dois grupos: Circulante (conversível em dinheiro dentro de até 12 meses) e Não-Circulante (longo prazo, como imóveis e equipamentos). Na Petrobras, o ativo é imenso: plataformas de exploração, dutos de transporte, refinarias, estoques de óleo e derivados, depósitos em dólar e outras moedas estrangeiras.
          </p>

          <p>
            O <strong>Passivo</strong> representa todas as obrigações da empresa com terceiros. Inclui contas a pagar a fornecedores (matéria-prima, serviços), empréstimos bancários para financiar operações, salários a pagar, impostos a recolher, aluguel de equipamentos. O passivo também se divide em Circulante (exigível em até 12 meses) e Não-Circulante (longo prazo, como empréstimos de longo prazo para expansão). Em Petrobras, isso inclui financiamentos para construção de novas plataformas, debêntures (títulos de dívida), e passivos ambientais relacionados à descontaminação de áreas exploradas.
          </p>

          <p>
            O <strong>Patrimônio Líquido</strong> é a diferença entre ativo e passivo, representando o valor que pertence aos sócios. Também chamado de "capital dos sócios", aumenta quando a empresa gera lucro e diminui quando sofre prejuízo. Divide-se em: Capital Social (aporte inicial dos sócios), Lucros ou Prejuízos Acumulados, e Reservas de Lucros (lucros retidos para futuras necessidades). Em Petrobras, o patrimônio líquido é afetado pelo pagamento de dividendos à União (controladora) e a acionistas privados, reduzindo patrimônio, assim como retenção de lucros que aumenta patrimônio.
          </p>

          <p>
            A <strong>variação da equação</strong> acontece continuamente conforme a empresa opera. Quando compra máquinas à vista, o ativo aumenta (máquinas) mas também diminui (caixa sai): mantém equilíbrio. Quando toma empréstimo, ativo aumenta (caixa entra) e passivo aumenta (dívida cresce): mantém equilíbrio. Quando empresa é lucrativa, patrimônio aumenta. Quando é deficitária, patrimônio diminui. A beleza dessa equação é que ela nos permite verificar se qualquer operação foi registrada corretamente: se equação desiquilibra, há erro de lançamento que deve ser identificado e corrigido antes de publicar demonstrações financeiras.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Estrutura da Equação Contábil</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Ativo = Bens + Direitos (recursos da empresa)</li>
              <li>✓ Passivo = Obrigações (financiamento de terceiros)</li>
              <li>✓ Patrimônio Líquido = Ativo - Passivo (capital dos sócios)</li>
              <li>✓ Equilíbrio obrigatório em toda operação contábil</li>
              <li>✓ Desequilíbrio indica erro de lançamento que deve ser corrigido</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={2}
        variant={getModuleVariant(2)}
        video={{ videoId: "cont-m2", title: "Equação Contábil", duration: "12:00" }}
        resumoVisual={{
          moduloNome: "Módulo 2",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Balança Contábil", type: "Estrutura", placeholderColor: "bg-amber-500/20" },
            { title: "A = P + PL", type: "Regra", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Mestre",
          content: <p className="text-sm italic">{"Pense no Ativo como o que você TEM e no Passivo como o que você DEVE. O PL é o que realmente é SEU."}</p>
        }}
        audio={{ audioUrl: "#", titulo: "Equação Patrimonial", artista: "Prof. Contabilidade" }}
      />
      <ContentAccordion
        slides={[
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
              title: "Empresa de Suprimentos",
              descricao: "Ativo: R$ 500 mil (estoques, máquinas). Passivo: R$ 200 mil (dívidas). Patrimônio: R$ 300 mil (capital dos sócios)."
            },
            {
              title: "Plataforma Petrobras",
              descricao: "Ativo: R$ 2 bilhões (instalações). Passivo: R$ 800 milhões (empréstimos). Patrimônio: R$ 1,2 bilhão."
            },
            {
              title: "Impacto do Lucro",
              descricao: "Empresa com lucro de R$ 100 mil vê seu patrimônio aumentar de R$ 300 mil para R$ 400 mil sem novos investimentos."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Desafio da Equação"
        numero={2}
        variant="emerald"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-2"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-2", score)}
      />
    </div>
  );

  const renderModulo3 = () => (
    <div className="space-y-6">
      <ModuleBanner 
        numero={3} 
        titulo="Plano de Contas" 
        descricao="O mapa estruturado e hierárquico das operações financeiras."
        variant="violet"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={3}
          title="Plano de Contas"
          description="O mapa estruturado que organiza todas as contas contábeis de uma empresa."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            O <strong>plano de contas</strong> é um documento normativo que lista e codifica todas as contas que uma empresa utilizará para registrar suas operações. Funciona como um <strong>índice de referência estruturado e hierárquico</strong>, facilitando a localização de contas para lançamento e garantindo uniformidade de registro. Sem plano de contas padronizado, diferentes áreas da empresa poderiam registrar mesma operação de formas distintas, tornando impossível consolidar informações para demonstrações financeiras confiáveis. O plano de contas garante que "Caixa" significa a mesma coisa em São Paulo, no Rio e em Houston (plataformas marítimas).
          </p>

          <p>
            A <strong>estrutura hierárquica</strong> do plano de contas é essencial para sua funcionalidade. O primeiro nível é a Classe: 1-Ativo, 2-Passivo, 3-Patrimônio Líquido, 4-Receitas, 5-Despesas. O segundo nível é Grupo, especificando dentro da classe: Ativo Circulante, Ativo Não-Circulante. O terceiro nível é Subgrupo: Caixa (dentro de Ativo Circulante), Estoques, Contas a Receber. O quarto nível é a Conta propriamente dita: Caixa em Reais, Caixa em Dólares, Caixa em Euros. Alguns planos vão além para um quinto nível de Subconta, permitindo segregação ainda maior. Essa hierarquia permite que demonstrações consolidem dados em níveis mais altos, oferecendo tanto detalhe operacional quanto síntese executiva.
          </p>

          <p>
            A <strong>codificação de contas</strong> segue padrão numérico que reflete a hierarquia. Tipicamente, primeira cifra indica classe (1=Ativo, 2=Passivo, 3=Patrimônio, 4=Receita, 5=Despesa). Cifras subsequentes indicam nível hierárquico. Exemplo: 1.1.1.01 = Classe 1 (Ativo) {'>'} Grupo 1 (Circulante) {'>'} Subgrupo 1 (Disponibilidades) {'>'} Conta 01 (Caixa em Reais). Essa codificação é tão importante que sistemas contábeis usam-na para validação automática: não é possível lançar em conta inexistente no plano. Um contador não precisa memorizar códigos; sistema contábil oferece dropdown com contas válidas filtradas por hierarquia.
          </p>

          <p>
            O <strong>plano de contas em Petrobras</strong> é particularmente complexo por natureza da operação. Petrobras mantém contas específicas para exploração (Custos de Perfuração, Custos de Completação de Poços, Custos de Operação de Plataforma), refino (Custo de Processamento de Óleo Bruto, Custos de Catalisadores, Custos de Manutenção de Refinaria), comercialização (Receita de Venda de Óleo, Receita de Venda de Derivados, Receita de Exportação). Deve estar em conformidade com regulação internacional IFRS, permitindo apresentação de demonstrações em padrão global reconhecido. Auditores internacionais verificam que plano de contas implementa corretamente normas contábeis aplicáveis ao segmento de óleo e gás.
          </p>

          <p>
            A <strong>manutenção do plano de contas</strong> é responsabilidade contínua. Conforme empresa evolui ou operações mudam, novas contas podem ser criadas (exemplo: conta para receita de energia eólica quando Petrobras entra nesse segmento). Contas obsoletas são inativadas (não apagadas, pois dados históricos precisam ser preservados para auditoria). Periódico (anual ou bienal), revisão garante que contas correspondem à realidade operacional, que estrutura hierárquica reflete como empresa realmente opera e gerencia, e que codificação é compreensível para novos contadores.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Estrutura do Plano de Contas</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Primeiro nível: Classe (1=Ativo, 2=Passivo, 3=Patrimônio, 4=Receita, 5=Despesa)</li>
              <li>✓ Segundo nível: Grupo (Circulante, Não-Circulante, etc)</li>
              <li>✓ Terceiro nível: Subgrupo (Caixa, Estoques, Imobilizado)</li>
              <li>✓ Quarto nível: Conta (Caixa em Reais, Caixa em Dólares)</li>
              <li>✓ Codificação numérica reflete hierarquia para facilitar consulta e validação</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={3}
        variant={getModuleVariant(3)}
        video={{
          videoId: "cont-m3",
          title: "Organizando as Contas",
          duration: "11:15"
        }}
        resumoVisual={{
          moduloNome: "Módulo 3",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Plano de Contas", type: "Estrutura", placeholderColor: "bg-violet-500/20" },
            { title: "Codificação", type: "Regra", placeholderColor: "bg-violet-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Macete de Código",
          content: <p className="text-sm italic">{"O primeiro dígito diz o que a conta representa. 1 é sempre Ativo, 2 é Passivo."}</p>
        }}
        audio={{
          audioUrl: "#",
          titulo: "Podcast: Plano de Contas",
          artista: "Prof. Contabilidade"
        }}
      />
      <ContentAccordion
        slides={[
          {
            title: "O que é um Plano de Contas?",
            content: "É o guia que orienta os registros contábeis, listando todas as contas que a empresa pode usar. Garante que os registros sejam uniformes em toda a Petrobras."
          },
          {
            title: "Codificação Numérica",
            content: "As contas são numeradas hierarquicamente (ex: 1.1.1.01). Isso facilita o processamento por sistemas e a consolidação de relatórios."
          },
          {
            title: "Classes Principais",
            content: "Dividimos em: 1-Ativo, 2-Passivo, 3-Patrimônio Líquido, 4-Receitas e 5-Despesas. Essa estrutura é a base para o Balanço e a DRE."
          },
          {
            title: "Aplicação na Petrobras",
            content: "Como empresa global, a Petrobras usa planos complexos que atendem tanto a legislação brasileira quanto as normas internacionais IFRS."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Contas</h3>
        <CardCarousel
          cards={[
            {
              title: "Ativo Circulante",
              descricao: "Caixa em Reais, Caixa em Dólares, Contas a Receber - Clientes, Contas a Receber - Governo."
            },
            {
              title: "Estoque",
              descricao: "Estoques de Matérias-Primas, Estoques de Produtos em Processo, Estoques de Produtos Acabados, Estoques de Combustíveis."
            },
            {
              title: "Ativo Imobilizado",
              descricao: "Edifícios, Máquinas e Equipamentos, Plataformas de Produção, Dutos de Transporte, Refinarias, Depreciacão Acumulada."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Mapeamento de Contas"
        numero={3}
        variant="violet"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-3"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-3", score)}
      />
    </div>
  );

  const renderModulo4 = () => (
    <div className="space-y-6">
      <ModuleBanner 
        numero={4} 
        titulo="Lançamentos Contábeis" 
        descricao="A prática do débito e crédito no dia a dia da Petrobras."
        variant="emerald"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={4}
          title="Lançamentos Contábeis"
          description="Como registrar operações através do método das partidas dobradas."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            O <strong>método das partidas dobradas</strong> é o fundamento da contabilidade moderna. Ele estabelece que cada operação gera um débito e um crédito de igual valor. Essa simetria não é coincidência; reflete que toda operação econômica tem duas dimensões: de onde vieram os recursos (fonte de financiamento) e para onde foram (aplicação). Quando você compra máquina à vista, máquina é a aplicação (débito em ativo) e caixa que sai é a fonte (crédito em ativo), mantendo equação balanceada. Quando toma empréstimo, caixa que entra é a aplicação e dívida que assume é a fonte, novamente balanceado.
          </p>

          <p>
            A mecânica de <strong>débitos e créditos</strong> segue regras simples mas críticas. Para contas de <strong>ATIVO</strong> (caixa, estoques, máquinas): débito aumenta, crédito diminui. Para contas de <strong>PASSIVO</strong> (contas a pagar, empréstimos): débito diminui, crédito aumenta. Para <strong>PATRIMÔNIO LÍQUIDO</strong> (capital, lucros acumulados): débito diminui, crédito aumenta. Para contas de <strong>RECEITA</strong> (vendas, rendimentos): débito diminui, crédito aumenta (receita é redução de passivo ou aumento de ativo). Para contas de <strong>DESPESA</strong> (custos, gastos): débito aumenta, crédito diminui (despesa é redução de receita potencial). Muitos aprendem mnemônico: "DEB Ativo", "CRE Passivo" para memorizar quando cada um aumenta.
          </p>

          <p>
            Um <strong>exemplo prático</strong> clarifica o método. Empresa compra equipamento por R$ 10.000 em dinheiro. Dois lançamentos: (1) Débito: Máquinas e Equipamentos (ativo) R$ 10.000. (2) Crédito: Caixa (ativo) R$ 10.000. Total débitos = Total créditos = R$ 10.000, equação mantém-se: ativo mudou de forma (caixa para máquina) mas valor total permanece. Outro exemplo: Venda de produto por R$ 50.000 a prazo. (1) Débito: Contas a Receber (ativo) R$ 50.000. (2) Crédito: Receita de Vendas (receita) R$ 50.000. Ativo aumenta (contas a receber) e receita é registrada, ambos aumentando patrimônio.
          </p>

          <p>
            Os <strong>lançamentos em Petrobras</strong> têm particularidades operacionais. Compra de tubulação para perfuração: Débito em Ativo Imobilizado (equipamento), Crédito em Contas a Pagar (dívida contraída). Venda de óleo por R$ 1 milhão: Débito em Caixa (dinheiro recebido), Crédito em Receita de Vendas (reconhecimento de venda). Pagamento de salários: Débito em Despesa de Pessoal, Crédito em Caixa ou Salários a Pagar (se a prazo). Cada operação, por complexa que seja, reduz-se a débito-crédito balanceado.
          </p>

          <p>
            A <strong>escrituração</strong> é o processo formal de registrar lançamentos em livros contábeis. Historicamente feito em livros físicos (Diário e Razão), hoje é realizado em sistemas contábeis integrados. O Diário registra cada lançamento cronologicamente (ordem de data). O Razão agrupa lançamentos por conta, mostrando todos os débitos e créditos de cada conta. Sistema contábil moderno gera automaticamente ambos a partir de lançamento único. Auditores analisam livros contábeis para verificar se todas as operações foram registradas corretamente e se equação mantém-se balanceada.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Regras de Débito e Crédito</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ ATIVO: Débito aumenta, Crédito diminui</li>
              <li>✓ PASSIVO: Débito diminui, Crédito aumenta</li>
              <li>✓ PATRIMÔNIO LÍQUIDO: Débito diminui, Crédito aumenta</li>
              <li>✓ RECEITA: Débito diminui, Crédito aumenta</li>
              <li>✓ DESPESA: Débito aumenta, Crédito diminui</li>
              <li>✓ Cada lançamento: Total Débitos = Total Créditos</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={4}
        variant={getModuleVariant(4)}
        video={{
          videoId: "contabilidade-m4",
          title: "Lançamentos na Prática",
          duration: "12:45"
        }}
        resumoVisual={{
          moduloNome: "Módulo 4",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Débito e Crédito", type: "Regra", placeholderColor: "bg-emerald-500/20" },
            { title: "Partidas Dobradas", type: "Estrutura", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Mnemônico",
          content: <p className="text-sm italic">{"O Ativo DEVE para a empresa, por isso aumenta no DÉBITO."}</p>
        }}
        audio={{
          audioUrl: "#",
          titulo: "PodQuest: Lançamentos",
          artista: "Prof. Contabilidade"
        }}
      />
      <ContentAccordion
        slides={[
          {
            title: "Método das Partidas Dobradas",
            content: "Cada operação contábil afeta pelo menos duas contas: um débito e um crédito de igual valor. Isso garante o equilíbrio constante da equação fundamental: Ativo = Passivo + PL."
          },
          {
            title: "Regra de Débito e Crédito",
            content: "Para contas de Ativo: Débito aumenta e Crédito diminui. Para contas de Passivo e PL: Débito diminui e Crédito aumenta. Receitas funcionam como PL (Crédito aumenta), Despesas diminuem PL (Débito aumenta)."
          },
          {
            title: "Escrituração Contábil",
            content: "Consiste no registro cronológico dos fatos administrativos em livros contábeis (Diário e Razão). Cada lançamento deve ter data, contas debitadas e creditadas, valor e um breve histórico da operação."
          },
          {
            title: "Exemplos de Lançamentos",
            content: "Compra à vista: Débito em Ativo (Equipamento) e Crédito em Ativo (Caixa). Venda a prazo: Débito em Ativo (Clientes) e Crédito em Receita."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Lançamentos</h3>
        <CardCarousel
          cards={[
            {
              title: "Compra de Matéria-Prima",
              descricao: "Débito: Estoques de Matérias-Primas. Crédito: Contas a Pagar. Afeta ativo (estoque) e passivo (dívida) equilibradamente."
            },
            {
              title: "Recebimento de Cliente",
              descricao: "Débito: Caixa. Crédito: Contas a Receber. Ambos são ativos, apenas muda a forma de apresentação."
            },
            {
              title: "Pagamento de Folha",
              descricao: "Débito: Despesa de Pessoal. Crédito: Caixa. Diminui caixa e gera despesa que reduz resultado."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Domine os Lançamentos"
        numero={4}
        variant="emerald"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-4"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-4", score)}
      />
    </div>
  );

  const renderModulo5 = () => (
    <div className="space-y-6">
      <ModuleBanner 
        numero={5} 
        titulo="Balancete de Verificação" 
        descricao="A segurança de que os débitos e créditos estão em perfeito equilíbrio."
        variant="amber"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={5}
          title="Balancete de Verificação"
          description="Ferramenta de auditoria interna que verifica integridade dos registros contábeis."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            O <strong>balancete de verificação</strong> é uma demonstração contábil que lista o saldo de todas as contas abertas em determinada data. Serve como <strong>ferramenta de controle interno</strong> para verificar a integridade dos registros contábeis antes da elaboração das demonstrações financeiras oficiais. Não é obrigatório publicar balancete (apenas balanço patrimonial, DRE, etc.), mas é imprescindível gerar internamente para auditoria. Um balancete desequilibrado (débitos ≠ créditos) sinaliza erro que deve ser encontrado e corrigido antes de publicar demonstrações.
          </p>

          <p>
            A <strong>estrutura do balancete</strong> é simples mas poderosa. Cabeçalho contém nome da empresa, período referente (exemplo: "31 de dezembro de 2024"), data de emissão. Primeira coluna lista código e nome de cada conta do plano de contas. Segunda coluna mostra saldo devedor (débitos acumulados). Terceira coluna mostra saldo credor (créditos acumulados). Linha de total verifica se soma de saldo devedor = soma de saldo credor. Igualdade entre esses totais confirma que não há erros grosseiros de lançamento (embora erros mais sutis possam ter ocorrido).
          </p>

          <p>
            O balancete funciona como <strong>função de auditoria interna</strong> contínua. Elaborado mensalmente em empresas bem estruturadas, identifica erros antes de publicar demonstrações. Quando débitos ≠ créditos, sinaliza que operação foi lançada incorretamente: talvez lançada em conta errada, ou débito registrado sem correspondente crédito. Equipe contábil analisa operações do mês, encontra erro (exemplo: lançamento de R$ 50.000 que deveria estar em Caixa foi lançado em Contas a Receber), faz lançamento de correção antes do fechamento do mês. Permite correção de erros no período contábil ainda aberto.
          </p>

          <p>
            O <strong>balancete em Petrobras</strong> tem particularidades operacionais importantes. Petrobras elabora balancetes mensais para cada unidade de negócio (Exploração, Refino, Distribuição, Internacional). Permite acompanhamento de performance operacional com frequência superior a relatórios trimestrais publicados. Identifica variações anormais em custos de produção antes do fechamento do período (exemplo: se custo de produção de uma plataforma subir 20% em um mês, balancete sinaliza para investigação antes de consolidar resultado). Facilita elaboração de relatórios de gestão para diretoria que precisam tomar decisões sobre alocação de recursos.
          </p>

          <p>
            O <strong>balancete também prepara dados</strong> para elaboração de demonstrações financeiras. Saldos de contas de ativo e passivo no balancete correspondem aos saldos no balanço patrimonial. Saldos de contas de receita e despesa correspondem aos valores na demonstração de resultado. Esse elo entre balancete e demonstrações garante que números publicados estão baseados em registros balanceados. Se empresa tem política de divulgar mensalmente demonstrações ao mercado (como Petrobras), balancete de cada mês é o ponto de partida.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Função do Balancete</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Verifica integridade matemática: débitos = créditos</li>
              <li>✓ Identifica erros de lançamento antes de publicar demonstrações</li>
              <li>✓ Permite correção de erros em período ainda aberto</li>
              <li>✓ Fornece saldos base para elaboração de demonstrações financeiras</li>
              <li>✓ Em Petrobras, elaborado mensalmente por unidade de negócio para acompanhamento operacional</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={5}
        variant={getModuleVariant(5)}
        video={{
          videoId: "cont-m5",
          title: "Auditoria via Balancete",
          duration: "10:20"
        }}
        resumoVisual={{
          moduloNome: "Módulo 5",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Balancete", type: "Estrutura", placeholderColor: "bg-amber-500/20" },
            { title: "Verificação", type: "Regra", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Dica de Segurança",
          content: <p className="text-sm italic">{"O balancete acusa erros matemáticos, mas não acusa se você debitou a conta errada!"}</p>
        }}
        audio={{
          audioUrl: "#",
          titulo: "Podcast Técnico",
          artista: "Prof. Contabilidade"
        }}
      />
      <ContentAccordion
        slides={[
          {
            title: "Conceito de Balancete",
            content: "É uma relação de contas extraídas do Livro Razão com seus respectivos saldos devedores ou credores. Serve para conferir se o método das partidas dobradas foi respeitado."
          },
          {
            title: "Objetivo da Verificação",
            content: "A principal função é detector erros técnicos de lançamento antes da elaboração das demonstrações financeiras definitivas, como o Balanço e a DRE."
          },
          {
            title: "Tipos de Balancete",
            content: "O mais comum é o de 2 colunas (saldos), mas existem balancetes de 4, 6 ou até 8 colunas, que detalham também os movimentos de débito e crédito do período."
          },
          {
            title: "Limitações",
            content: "O fato de o balancete 'fechar' não garante que não existam erros de classificação (ex: registrar uma despesa no ativo). Ele apenas garante o equilíbrio matemático."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplo de Balancete</h3>
        <CardCarousel
          cards={[
            {
              title: "Verificação de Igualdade",
              descricao: "Empresa com débitos totais R$ 500.000 e créditos R$ 500.000. Balancete equilibrado indica que lançamentos duplos foram feitos corretamente."
            },
            {
              title: "Detecção de Erro",
              descricao: "Débitos R$ 510.000 e créditos R$ 500.000. Diferença de R$ 10.000 indica erro de lançamento que deve ser corrigido."
            },
            {
              title: "Análise de Contas",
              descricao: "Balancete mostra que Caixa tem saldo devedor de R$ 50.000, indicando possível saque a descoberto não autorizado."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Desafio do Equilíbrio"
        numero={5}
        variant="amber"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-5"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-5", score)}
      />
    </div>
  );

  const renderModulo6 = () => (
    <div className="space-y-6">
      <ModuleBanner 
        numero={6} 
        titulo="Demonstrações Contábeis" 
        descricao="O espelho da saúde financeira da Petrobras para o mercado."
        variant="violet"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={6}
          title="Demonstrações Contábeis"
          description="As peças principais que comunicam situação financeira ao mercado e stakeholders."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            As <strong>demonstrações contábeis</strong> são relatórios estruturados que consolidam informações contábeis em formato padronizado, permitindo que qualquer pessoa ao redor do mundo compreenda posição financeira, performance operacional e fluxos de caixa de uma empresa. São mandatórias por lei (Lei das S.A., Lei 13.303 para estatais), normas contábeis (IFRS), regulação de mercado (CVM para empresas abertas) e são essenciais para que mercado de capitais funcione de forma informada. Sem demonstrações confiáveis, investidores não teriam informação para avaliar valor de uma ação, credores não saberiam avaliar risco de emprestar.
          </p>

          <p>
            O <strong>Balanço Patrimonial</strong> é a demonstração que retrata posição financeira da empresa em determinada data. Apresenta situação estática (como fotografia em um momento específico, tipicamente 31 de dezembro). Estrutura: lado esquerdo mostra Ativo (tudo que empresa possui), lado direito mostra Passivo (obrigações) e Patrimônio Líquido (capital dos sócios). A equação balanceia-se: Ativo = Passivo + Patrimônio. Balanço permite avaliação de solidez: empresa tem ativos suficientes para cobrir dívidas? Patrimônio cresceu ou encolheu em relação ao período anterior? Qual a proporção de financiamento por terceiros versus capital próprio?
          </p>

          <p>
            A <strong>Demonstração de Resultado do Exercício (DRE)</strong> é dinâmica: mostra performance em período (mês, trimestre, ano). Estrutura cascata: Receitas Operacionais (venda de produtos/serviços) menos Custos de Produção resulta em Lucro Bruto. Lucro Bruto menos Despesas Operacionais (administração, vendas, pesquisa) resulta em Lucro Operacional. Lucro Operacional mais/menos itens não-operacionais (juros, ganhos/perdas em câmbio) resulta em Lucro antes de Impostos. Lucro antes de Impostos menos Impostos (IR, CSLL) resulta em Lucro Líquido. Análise de DRE permite entender rentabilidade: qual a margem de lucro? Despesas operacionais estão controladas? Houve itens extraordinários que distorcem resultado normal?
          </p>

          <p>
            A <strong>Demonstração de Mutações do Patrimônio Líquido (DMPL)</strong> explica como patrimônio mudou durante período. Começa com saldo inicial de patrimônio, adiciona lucro gerado no período, subtrai dividendos pagos aos sócios, e resulta em saldo final. Muito importante para análise de rentabilidade sobre capital investido: se patrimônio aumentou de R$ 100 para R$ 115 graças a lucro de R$ 20 menos dividendos de R$ 5, entende-se que empresa foi lucrativa mas conservadora em distribuição de lucros. Em Petrobras, DMPL mostra impacto de dividendos pagos à União (controladora) e a acionistas privados.
          </p>

          <p>
            A <strong>Demonstração de Fluxo de Caixa</strong> rastreia movimento de dinheiro. Divide-se em Atividades Operacionais (caixa gerado pela operação normal), Atividades de Investimento (caixa gasto com aquisição de ativos, caixa recebido de venda de ativos), Atividades de Financiamento (caixa recebido de empréstimos, caixa gasto para pagamento de dívidas, dividendos). Fluxo de caixa operacional positivo significa empresa está gerando dinheiro de suas operações. Fluxo de investimento negativo é normal: empresa investe em crescimento. Fluxo de financiamento depende de política de distribuição de resultados. Juntos, esses fluxos explicam como caixa mudou de ano para ano.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Principais Demonstrações</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Balanço Patrimonial: posição estática (ativo, passivo, patrimônio)</li>
              <li>✓ DRE: performance dinâmica (receitas, custos, despesas, lucro)</li>
              <li>✓ DMPL: mudanças no patrimônio (inicial + lucro - dividendos = final)</li>
              <li>✓ Fluxo de Caixa: movimento de dinheiro (operacional, investimento, financiamento)</li>
              <li>✓ Todas obrigatórias para empresas abertas (CVM) e estatais (Lei 13.303)</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={6}
        variant={getModuleVariant(6)}
        video={{ videoId: "cont-m6", title: "Demonstrações Contábeis", duration: "16:00" }}
        resumoVisual={{
          moduloNome: "Módulo 6",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Balanço Patrimonial", type: "Estrutura", placeholderColor: "bg-violet-500/20" },
            { title: "DRE", type: "Resultado", placeholderColor: "bg-violet-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Mestre da DRE",
          content: <p className="text-sm italic">{"Receita - Custo - Despesa = Lucro. Siga o fluxo!"}</p>
        }}
        audio={{ audioUrl: "#", titulo: "Relatórios Contábeis", artista: "Prof. Contabilidade" }}
      />
      <ContentAccordion
        slides={[
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
              title: "Balanço Patrimonial Petrobras",
              descricao: "Ativo Total: R$ 800 bilhões. Passivo: R$ 400 bilhões. Patrimônio Líquido: R$ 400 bilhões. Estrutura reflete investimentos em infraestrutura."
            },
            {
              title: "DRE Petrobras 2024",
              descricao: "Receita de Vendas: R$ 500 bilhões. Custos: R$ 350 bilhões. Lucro Bruto: R$ 150 bilhões. Despesas: R$ 50 bilhões. Lucro Líquido: R$ 100 bilhões."
            },
            {
              title: "Fluxo de Caixa Operacional",
              descricao: "Atividades Operacionais: +R$ 120 bilhões. Investimentos: -R$ 80 bilhões. Financiamento: -R$ 30 bilhões. Caixa Final: +R$ 10 bilhões."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Mestre dos Relatórios"
        numero={6}
        variant="violet"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-6"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-6", score)}
      />
    </div>
  );

  const renderModulo7 = () => (
    <div className="space-y-6">
      <ModuleBanner 
        numero={7} 
        titulo="Análise de Demonstrações" 
        descricao="Transformando números brutos em insights estratégicos de gestão."
        variant="amber"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={7}
          title="Análise de Demonstrações"
          description="Interpretação de dados financeiros através de índices e tendências."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            A <strong>análise de demonstrações contábeis</strong> é a arte de extrair significado dos números brutos para compreender saúde financeira, performance operacional e perspectivas futuras de uma empresa. Números absolutos (Ativo Total R$ 800 bilhões) dizem pouco isolados; precisam ser contextualizados. Análise consegue isso através de índices (rácios) que comparam contas relacionadas, tendências que comparam períodos, e benchmarking que compara com concorrentes ou padrão de setor. Um gerente que lê apenas números brutos vê crise; um analista que calcula índices pode distinguir se é crise estrutural ou flutuação temporal.
          </p>

          <p>
            Os <strong>índices de liquidez</strong> medem capacidade da empresa de pagar dívidas de curto prazo. Liquidez Corrente = Ativo Circulante / Passivo Circulante: se resultado {'>'} 1, empresa tem mais ativo circulante que dívida circulante (bom). Liquidez Seca = (Ativo Circulante - Estoques) / Passivo Circulante: mais conservador, exclui estoques (que podem ser de difícil venda). Liquidez Imediata = Caixa e Equivalentes / Passivo Circulante: capacidade de pagar imediatamente (mais restritivo). Exemplo prático: se empresa tem LC=2.0, significa que para cada R$ 1 de dívida curto prazo, tem R$ 2 de ativo circulante — liquidez confortável.
          </p>

          <p>
            Os <strong>índices de solvência</strong> avaliam capacidade de pagar todas as dívidas (curto e longo prazo). Solvência Geral = Ativo Total / Passivo Total: se {'>'} 1, ativo excede passivo (solvente). Endividamento = Passivo Total / Ativo Total: percentual do ativo financiado por terceiros; inferior a 50% é conservador. Cobertura de Juros = Lucro Operacional / Despesa de Juros: quantas vezes lucro operacional cobre despesa com juros; superior a 3 é saudável. Esses índices interessam a credores: banco que vai emprestar quer garantia de que empresa conseguirá pagar.
          </p>

          <p>
            Os <strong>índices de rentabilidade</strong> medem quanto de lucro a empresa gera. ROA (Return on Assets) = Lucro Líquido / Ativo Total: quanto de lucro cada real de ativo gera. ROE (Return on Equity) = Lucro Líquido / Patrimônio Líquido: quanto de lucro cada real de capital dos sócios gera. Margem Líquida = Lucro Líquido / Receita Total: que porcentagem de cada venda vira lucro. Giro do Ativo = Receita Total / Ativo Total: quantas vezes ativo "roda" para gerar receita. Exemplo: empresa com ROE=15% significa que para cada R$ 100 de patrimônio, gera R$ 15 de lucro anualmente — acima da média é positivo.
          </p>

          <p>
            A <strong>análise de tendência em Petrobras</strong> é particularmente relevante. Análise Horizontal compara mesma conta entre períodos (2023 vs 2024): se receita cresceu 10%, custos cresceram 8%, margem bruta melhorou. Análise Vertical estrutura balanço em percentuais (caixa é 5% do ativo total, contas a receber é 20%): revela estrutura de aplicação de recursos. Identifica concentração de riscos (se 80% de receita vem de um cliente, risco é alto). Eficiência operacional ao longo do tempo (despesas operacionais diminuindo como % de receita = empresa ficando mais eficiente). Esses dados informam decisões estratégicas: deve Petrobras investir mais em refino (se margens estão caindo) ou exploração (se rentabilidade está melhor)?
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Principais Análises</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Índices de Liquidez: capacidade pagar dívidas curto prazo</li>
              <li>✓ Índices de Solvência: capacidade pagar todas dívidas</li>
              <li>✓ Índices de Rentabilidade: lucro gerado (ROA, ROE, Margem Líquida, Giro)</li>
              <li>✓ Análise Horizontal: comparação temporal (período a período)</li>
              <li>✓ Análise Vertical: estrutura percentual (composição de ativo, receita)</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={7}
        variant={getModuleVariant(7)}
        video={{
          videoId: "cont-m7",
          title: "Dominando os Índices",
          duration: "18:20"
        }}
        resumoVisual={{
          moduloNome: "Módulo 7",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Indicadores", type: "Análise", placeholderColor: "bg-amber-500/20" },
            { title: "Rácios Financeiros", type: "Regra", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Regra do 1.0",
          content: <p className="text-sm italic">{"Liquidez abaixo de 1.0 é sinal de alerta: a empresa deve mais do que tem disponível no ano."}</p>
        }}
        audio={{
          audioUrl: "#",
          titulo: "Debate: Saúde Financeira",
          artista: "Prof. Contabilidade"
        }}
      />
      <ContentAccordion
        slides={[
          {
            title: "Índices de Liquidez",
            content: "Medem a capacidade de honrar compromissos financeiros. Liquidez Corrente acima de 1 indica que a empresa tem recursos circulantes suficientes para suas dívidas imediatas."
          },
          {
            title: "Estrutura de Capital",
            content: "O índice de endividamento mostra quanto da empresa foi financiado por terceiros. Em estatais como a Petrobras, esse equilíbrio é vital para atrair investidores."
          },
          {
            title: "Rentabilidade (ROE e ROA)",
            content: "Indicam a eficiência da gestão em gerar lucro a partir dos ativos e do capital dos próprios sócios. É o que o mercado mais observa no longo prazo."
          },
          {
            title: "Análise Vertical e Horizontal",
            content: "Vertical foca na estrutura (quanto cada conta pesa no total). Horizontal foca na tendência (quanto a conta cresceu ou diminuiu ao longo dos anos)."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplo de Análise</h3>
        <CardCarousel
          cards={[
            {
              title: "Análise de Liquidez",
              descricao: "Empresa com LC = 2.0 tem bom desempenho. Para cada R$ 1 de dívida curto prazo, tem R$ 2 de ativo circulante."
            },
            {
              title: "Endividamento Petrobras",
              descricao: "Petrobras com 40% endividamento é considerada conservadora na indústria de óleo e gás, permitindo investimentos."
            },
            {
              title: "Rentabilidade ROE",
              descricao: "ROE de 15% significa que para cada R$ 100 de patrimônio, a empresa gera R$ 15 de lucro ao ano. Acima da média é positivo."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Raio-X Financeiro"
        numero={7}
        variant="amber"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-7"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-7", score)}
      />
    </div>
  );

  const renderModulo8 = () => (
    <div className="space-y-6">
      <ModuleBanner 
        numero={8} 
        titulo="Contabilidade de Custos" 
        descricao="A ciência da eficiência: rastreando cada centavo do processo produtivo."
        variant="emerald"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={8}
          title="Contabilidade de Custos"
          description="Análise de custos para otimizar operações e decisões de produção."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            A <strong>contabilidade de custos</strong> é especialização da contabilidade dedicada a acumular, analisar e interpretar custos de produção e operação. Diferente de contabilidade geral (que registra todas as transações), contabilidade de custos foca especificamente em custos: quanto custa produzir cada unidade? Qual é a margem de lucro por produto? Onde estão os maiores gastos? Essas informações são <strong>críticas para decisões operacionais</strong> que contabilidade geral não fornece. Um gerente de produção em Petrobras precisa saber custo por barril de óleo produzido para decidir se continua operação de um poço (se preço de mercado for menor que custo de produção, melhor parar).
          </p>

          <p>
            Os <strong>custos de produção</strong> dividem-se em três categorias. Matéria-Prima é material que entra no produto final (óleo bruto é matéria-prima para refino, aço é matéria-prima para máquinas). Mão-de-Obra Direta são salários de quem fabrica o produto (engenheiro na plataforma que opera equipamento é mão-de-obra direta). Custos Indiretos de Fabricação (CIF) são custos que não podem ser rastreados diretamente a um produto (aluguel da fábrica, depreciação de máquinas, energia elétrica da fábrica). Soma desses três = Custo de Produção. Diferente de Despesa, que são gastos fora de produção (salário de gerente administrativo, publicidade, seguros corporativos).
          </p>

          <p>
            A <strong>distinção entre custo e despesa</strong> é crítica. Custo entra no produto: quando você vende o produto, o custo sai do balanço (via COGS - Custo dos Produtos Vendidos) e afeta resultado. Se você produz 100 unidades mas vende apenas 50, custo das 50 não vendidas fica em estoque (ativo), esperando venda. Despesa não entra no produto: quando você incorre em despesa, ela imediatamente afeta resultado. Salário de vendedor é despesa de vendas, não custo de produção. Publicidade é despesa de marketing. Essa separação é essencial para que análise de resultado faça sentido: margens bruta vs operacional versus líquida.
          </p>

          <p>
            A <strong>análise Custo-Volume-Lucro (CVL)</strong> integra custos com volume de produção e resultado. Ponto de Equilíbrio (Break-Even) é volume onde receita total = custo total (lucro = zero). Abaixo disso, prejuízo; acima, lucro. Margem de Contribuição é receita menos custos variáveis — quanto cada unidade contribui para cobrir custos fixos e gerar lucro. Em Petrobras, se plataforma tem custos fixos de R$ 100 milhões/ano (aluguel, pessoal mínimo) e custos variáveis de R$ 50/barril, e preço é R$ 80/barril, margem de contribuição é R$ 30/barril. Ponto de equilíbrio = R$ 100 mi / R$ 30 per barrel = 3.33 milhões de barris. Se produzir menos, prejudicial; se mais, lucrativo.
          </p>

          <p>
            Os <strong>custos em Petrobras</strong> têm dimensões especiais. Exploração inclui custos de perfuração (construir poço), completação (preparar poço para produção), operação (manter poço produzindo). Refino inclui custos de processamento (energia, catalisadores, manutenção de equipamento). Distribuição inclui custos de logística, transporte, armazenagem. Custos fixos de infraestrutura (plataformas, refinarias) são depreciados ao longo de anos. Análise crítica de custos informa decisões estratégicas: se custo de óleo pesado na Bacia de Santos é R$ 60/barril e preço caiu para R$ 55/barril, é preferível parar produção (cortando custos operacionais variáveis) e manter apenas custos fixos, esperando recuperação de preço?
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Elementos de Custo</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Matéria-Prima: material que entra no produto</li>
              <li>✓ Mão-de-Obra Direta: salários de quem produz</li>
              <li>✓ Custos Indiretos de Fabricação: custos compartilhados</li>
              <li>✓ Custos Fixos: não variam com volume (aluguel, pessoal mínimo)</li>
              <li>✓ Custos Variáveis: variam com volume (matéria-prima, energia produção)</li>
              <li>✓ Análise CVL: Ponto de Equilíbrio e Margem de Contribuição</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={8}
        variant={getModuleVariant(8)}
        video={{
          videoId: "cont-m8",
          title: "Gestão de Custos",
          duration: "14:50"
        }}
        resumoVisual={{
          moduloNome: "Módulo 8",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Engenharia de Custos", type: "Conceito", placeholderColor: "bg-emerald-500/20" },
            { title: "MD + MOD + CIF", type: "Estrutura", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Custo vs Despesa",
          content: <p className="text-sm italic">{"Se faz falta na fábrica, é CUSTO. Se faz falta no escritório, é DESPESA."}</p>
        }}
        audio={{
          audioUrl: "#",
          titulo: "Papo de Engenheiro",
          artista: "Prof. Contabilidade"
        }}
      />
      <ContentAccordion
        slides={[
          {
            title: "Classificação de Custos",
            content: "Diretos são facilmente rastreados ao produto (ex: aço). Indiretos precisam de rateio (ex: energia). Fixos não mudam com o volume, Variáveis crescem com a produção."
          },
          {
            title: "Custo de Produção",
            content: "É a soma de Matérias-Primas + Mão de Obra + Custos Indiretos. Esse total define o valor do estoque no balanço até o momento da venda."
          },
          {
            title: "Análise CVL",
            content: "Estuda a relação entre Custo, Volume e Lucro. Ajuda a definir o preço de venda e o volume mínimo necessário para não ter prejuízo (Ponto de Equilíbrio)."
          },
          {
            title: "Aplicação no Refino",
            content: "Dada a escala da Petrobras, pequenos ajustes no custo unitário de processamento resultam em economias de bilhões no consolidado anual."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Custeio</h3>
        <CardCarousel
          cards={[
            {
              title: "Custos de Refino",
              descricao: "Matéria-Prima: R$ 500/bbl de óleo. Mão-de-Obra: R$ 50/bbl. CIF: R$ 100/bbl. Custo Total: R$ 650/bbl. Receita: R$ 800/bbl."
            },
            {
              title: "Ponto de Equilíbrio",
              descricao: "Custos fixos R$ 1 milhão. Margem de contribuição R$ 100/barril. Equilíbrio = 10.000 barris por mês."
            },
            {
              title: "Decisão de Produção",
              descricao: "Preço do óleo caiu para R$ 600/bbl. Custo total R$ 650. Perda de R$ 50 por barril. Decisão: parar produção ou buscar redução de custos."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Engenharia de Custos"
        numero={8}
        variant="emerald"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-8"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-8", score)}
      />
    </div>
  );

  const renderModulo9 = () => (
    <div className="space-y-6">
      <ModuleBanner 
        numero={9} 
        titulo="Contabilidade na Petrobras" 
        descricao="Transparência, Compliance e IFRS em uma gigante global de capital misto."
        variant="violet"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={9}
          title="Contabilidade na Petrobras"
          description="Aplicação prática de contabilidade em contexto de estatal de capital aberto."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            A <strong>Petrobras é empresa estatal de capital aberto</strong>, combinação que a submete a múltiplas camadas de regulação. Como estatal, segue Lei 13.303/2016 (Lei das Empresas Estatais), que estabelece regras rígidas de governança, auditoria e transparência. Como capital aberto (listada na B3 e NYSE), segue regulação da CVM (Comissão de Valores Mobiliários), que exige divulgação ampla de informações financeiras e não-financeiras. Como empresa privada, segue Lei das S.A. (6.404/76) e normas contábeis internacionais (IFRS). Essa confluência de regulações garante que Petrobras é uma das empresas mais auditadas e transparentes do Brasil, mas também a mais complexa contabilmente.
          </p>

          <p>
            A <strong>adoção de IFRS (International Financial Reporting Standards)</strong> é obrigatória para Petrobras. IFRS são normas de contabilidade aceitas globalmente que permitem que investidores em qualquer país entendam demonstrações financeiras com metodologia uniforme. IFRS 6 trata especificamente de Exploração e Avaliação de Recursos Minerais — relevantíssimo para Petrobras que precisa contabilizar poços explorados, descobertas e avaliação de recursos. IFRS 16 trata de Arrendamentos — Petrobras contabiliza muitos contratos de aluguel de equipamentos offshore. IFRS 9 trata de Instrumentos Financeiros — relevante para derivativos (hedge de risco de câmbio e preço de petróleo) que Petrobras utiliza. Mensuração de ativos ao valor justo é princípio IFRS que afeta como Petrobras avalia estoques de óleo e propriedades de exploração.
          </p>

          <p>
            A <strong>auditoria em Petrobras</strong> é processo robusto. Auditoria Interna é equipe de Petrobras que monitora conformidade contínua com políticas e normas. Auditoria Externa é contratada de firma independente (Big 4: Deloitte, EY, KPMG, PwC) que opina sobre fidedignidade das demonstrações financeiras. Conselho Fiscal é órgão colegiado (composto por acionistas) que opina sobre adequação das demonstrações e recomenda aprovação ou rejeição em assembleia. CVM monitora divulgação pública e fiscaliza se empresa está cumprindo regulação de mercado de capitais. Essa tríplice auditoria (interna, externa independente, regulatória) garante que números são confiáveis.
          </p>

          <p>
            A <strong>divulgação e transparência</strong> em Petrobras é extensa. Petrobras divulga demonstrações financeiras trimestrais (4 vezes ao ano) e anuais (1 vez ao ano) no site corporativo, em português e inglês. Relatório Integrado combina informações financeiras com informações sociais (pessoas, comunidades) e ambientais (emissões, impactos ecológicos), alinhado com padrões ESG. Conference calls trimestrais com analistas de mercado explicam resultados e respondem perguntas. Atendimento a requisitos de governança corporativa (Código Brasileiro de Governança Corporativa) e ESG (Environmental, Social, Governance) que investidores globais exigem. Essa transparência é possível apenas porque contabilidade está em ordem, auditada e confiável.
          </p>

          <p>
            A <strong>conformidade regulatória específica</strong> em Petrobras merece destaque. Lei 13.303 exige que contratações acima de certo valor sejam aprovadas por áreas específicas e auditadas internamente. SARBANES-OXLEY (lei americana que Petrobras adota voluntariamente por estar listada na NYSE) exige certificação de CFO e CEO sobre confiabilidade de informações financeiras — é responsabilidade pessoal do executivo, não apenas da área contábil. IFAC (International Federation of Accountants) standards de auditoria são seguidas. Adesão a Extractive Industries Transparency Initiative (EITI) exige divulgação de pagamentos feitos ao governo brasileiro (royalties, impostos), aumentando accountability por uso de recursos naturais.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Regulação Contábil em Petrobras</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ Lei 13.303/2016: Estatuto das Estatais (governança, transparência)</li>
              <li>✓ Lei 6.404/76: Lei das S.A. (direito societário)</li>
              <li>✓ IFRS: Normas Contábeis Internacionais (reconhecidas globalmente)</li>
              <li>✓ CVM: Regulação de Mercado de Capitais (divulgação pública)</li>
              <li>✓ Auditoria: Interna, Externa Independente, Conselho Fiscal, CVM</li>
              <li>✓ ESG: Environmental, Social, Governance (responsabilidade corporativa)</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={9}
        variant={getModuleVariant(9)}
        video={{ videoId: "cont-m9", title: "Contabilidade na Petrobras", duration: "15:00" }}
        resumoVisual={{
          moduloNome: "Módulo 9",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Regulação Contábil", type: "Conceito", placeholderColor: "bg-amber-500/20" },
            { title: "IFRS em Petrobras", type: "Estrutura", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Compliance é Lei",
          content: <p className="text-sm italic">{"Lei 13.303 + CVM + IFRS = Transparência total para acionistas e sociedade."}</p>
        }}
        audio={{ audioUrl: "#", titulo: "Petrobras Contábil", artista: "Prof. Contabilidade" }}
      />
      <ContentAccordion
        slides={[
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
              title: "Demonstração de Resultados Trimestral",
              descricao: "Petrobras divulga resultados Q1 2024: Receita R$ 125 bilhões. Lucro Operacional R$ 35 bilhões. Lucro Líquido R$ 28 bilhões. Relatório explicativo em português e inglês."
            },
            {
              title: "Auditoria de Estoque",
              descricao: "Auditores externos verificam estoques de óleo em terminais. Conferem quantidade física com registros contábeis. Emitem parecer sobre confiabilidade de informações de estoque (ativo importante)."
            },
            {
              title: "Compliance de Transações",
              descricao: "Conformidade com Lei 13.303: todas contratações acima de R$ 1 milhão exigem aprovação de áreas específicas. Auditoria interna monitora cumprimento."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="Elite e Compliance"
        numero={9}
        variant="violet"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-9"].questions}
        onComplete={(score: number) => handleQuizComplete("modulo-9", score)}
      />
    </div>
  );

  const renderModulo10 = () => (
    <div className="space-y-6">
      <ModuleBanner 
        numero={10} 
        titulo="Simulado Mestre - Contabilidade" 
        descricao="O desafio final: integre todos os conceitos e valide seu domínio."
        variant="rose"
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={10}
          title="Simulado Mestre"
          description="Avaliação integrada consolidando todos os conceitos de contabilidade básica."
          variant="amber"
        />

        <div className="space-y-6 text-base leading-relaxed text-foreground">
          <p>
            O <strong>Simulado Mestre é avaliação integradora</strong> que sintetiza tudo que você aprendeu em 9 módulos anteriores. Diferente de quizzes de cada módulo (que focam conceitos específicos), simulado combina múltiplos domínios em <strong>questões de alta complexidade</strong>. Uma questão pode começar descrevendo lançamento contábil, pedir cálculo de índice de liquidez da empresa, e então questionar implicações para decisão de investimento. Requer que você entenda não apenas "o que é", mas também "como funciona em contexto integrado". Simulado mestre em CESGRANRIO é tipicamente assim: questões exigem compreensão de múltiplos conceitos e capacidade de análise crítica, não simples memorização.
          </p>

          <p>
            O <strong>estrutura do simulado</strong> inclui 10 questões de múltipla escolha (formato de prova CESGRANRIO) que abrangem temas variados. Meta de aprovação é 70% (7 de 10 questões corretas), o mesmo padrão usado em todo curso para desbloquear módulos. Questões são progressivas em dificuldade: primeiras focam conceitos básicos com aplicação moderada, últimas exigem raciocínio integrado e análise crítica. Tempo recomendado é 30-40 minutos (3-4 minutos por questão), simulando pressão de tempo real de prova onde você não pode se demorar demais em uma questão.
          </p>

          <p>
            Os <strong>domínios de conhecimento avaliados</strong> abrangem toda trajetória do curso. Equação Contábil e Patrimônio: questões onde você precisa entender como operações afetam ativo, passivo e patrimônio. Lançamentos Contábeis: aplicação do método das partidas dobradas em situações complexas com múltiplos lançamentos. Demonstrações Financeiras: interpretação integrada de balanço, DRE, DMPL e fluxo de caixa para extrair conclusões. Análise de Custos: decisão operacional baseada em análise de custo-volume-lucro. Regulação em Petrobras: conhecimento de Lei 13.303, IFRS e conformidade aplicada a contexto real.
          </p>

          <p>
            A <strong>estratégia de resolução</strong> é crítica. Primeira, leia com atenção: muitos detalhes em questão contábil mudam a resposta (exemplo: "empresa vende à vista" vs "empresa vende a prazo" afeta quando receita é reconhecida). Segunda, identifique o ponto principal: qual é a interrogação real por trás de contexto? Terceira, aplique conhecimento: use fórmulas e conceitos apropriados ao problema específico. Quarta, verifique a resposta: ela faz sentido contextualmente? É ordem de magnitude apropriada? Muitos erros vêm de falta de senso crítico: se você calcula endividamento de 500%, provavelmente errou algo (endividamento máximo de 100%).
          </p>

          <p>
            A <strong>preparação para concurso real</strong> é objetivo deste simulado. Atingir 70% aqui demonstra que você consegue aplicar contabilidade em contexto empresarial real, não apenas reproduzir definições. Indica competência de nível técnico/médio exigido em seleções CESGRANRIO para técnico em suprimento. Promove confiança para avançar em disciplinas subsequentes (Tributos, Direito, etc) que se constroem sobre fundamento contábil. Além disso, feedback detalhado de cada questão (explicação de resposta correta e erradas) oferece diagnóstico de lacunas de conhecimento.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-2">📋 Estrutura do Simulado Mestre</p>
            <ul className="text-sm space-y-1 text-foreground">
              <li>✓ 10 questões de múltipla escolha integradas</li>
              <li>✓ Meta de aprovação: 70% (7 de 10 questões)</li>
              <li>✓ Tempo recomendado: 30-40 minutos (3-4 min por questão)</li>
              <li>✓ Abrange: Equação Contábil, Lançamentos, Demonstrações, Custos, Regulação Petrobras</li>
              <li>✓ Feedback detalhado: explicação de cada resposta correta e alternativas</li>
              <li>✓ Prepara para nível técnico/médio exigido em CESGRANRIO</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={10}
        variant="rose"
        video={{
          videoId: "cont-m10",
          title: "Dicas de Prova",
          duration: "20:00"
        }}
        resumoVisual={{
          moduloNome: "Simulado Final",
          tituloAula: "Contabilidade Básica",
          materia: "Administração",
          images: [
            { title: "Recap Final", type: "Revisão", placeholderColor: "bg-rose-500/20" },
            { title: "Flashcards", type: "Memorização", placeholderColor: "bg-rose-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Foco Total",
          content: <p className="text-sm italic">{"Respire fundo. A contabilidade é lógica. Se a conta não fechar, verifique a origem versus aplicação."}</p>
        }}
        audio={{
          audioUrl: "#",
          titulo: "Podcast: Sucesso no Concurso",
          artista: "Prof. Contabilidade"
        }}
      />
      <ContentAccordion
        slides={[
          {
            title: "Integração de Conceitos",
            content: "No simulado final, os problemas não vêm isolados. Você precisará de lançamentos para chegar no balanço e do balanço para calcular os índices."
          },
          {
            title: "Tempo e Estratégia",
            content: "Aprenda a gerenciar os 3-4 minutos por questão. Foque no que a questão REALMENTE pede antes de sair fazendo cálculos complexos."
          },
          {
            title: "Padrão CESGRANRIO",
            content: "A banca ama cobrar a aplicação prática de IFRS e o impacto de operações no Patrimônio Líquido. Esteja pronto para isso."
          },
          {
            title: "Validação de Competência",
            content: "Acertar mais de 70% aqui indica que você está pronto para atuar na área administrativa da Petrobras com domínio técnico."
          }
        ]}
      />
      <div>
        <h3 className="text-lg font-semibold mb-4">Exemplos de Questões Integradas</h3>
        <CardCarousel
          cards={[
            {
              title: "Ciclo Contábil Completo",
              descricao: "Dado balanço inicial, série de lançamentos (compra estoque, venda a prazo, pagamento despesa), calcule balanço final e resultado. Requer entendimento de equação contábil, lançamentos e DRE."
            },
            {
              title: "Análise de Demonstrações",
              descricao: "Apresentado balanço e DRE de empresa, calcule índices de liquidez, rentabilidade e compare com padrão do setor. Determine se empresa está saudável e recomende ações."
            },
            {
              title: "Decisão Operacional",
              descricao: "Plataforma de petróleo com custos fixos R$ 100 mi/ano e custos variáveis R$ 50/barril. Preço de venda R$ 80/barril. Determine ponto de equilíbrio e impacto de queda de preço para R$ 60."
            }
          ]}
        />
      </div>
      <QuizInterativo
        titulo="O Grande Final"
        numero={10}
        variant="rose"
        questoes={CONTABILIDADE_BASICA_QUIZZES["modulo-10"].questions}
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
