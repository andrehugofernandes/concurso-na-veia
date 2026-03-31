"use client";

import { useState } from "react";
import { AulaProps, QuizQuestion } from "../shared";
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
import { COMPRAS_QUIZZES } from "@/data/quizzes/compras-quizzes";

function toQQ(
  quiz:
    | {
        questions: {
          id: number;
          question: string;
          options: string[];
          correct: number;
          explanation: string;
        }[];
      }
    | undefined,
): QuizQuestion[] {
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
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos de Compras" },
  { id: "modulo-2", label: "Módulo 2", title: "Processo de Compras" },
  { id: "modulo-3", label: "Módulo 3", title: "Seleção de Fornecedores" },
  { id: "modulo-4", label: "Módulo 4", title: "Negociação" },
  { id: "modulo-5", label: "Módulo 5", title: "Tipos de Compras" },
  { id: "modulo-6", label: "Módulo 6", title: "Gestão de Contratos" },
  { id: "modulo-7", label: "Módulo 7", title: "e-Procurement" },
  { id: "modulo-8", label: "Módulo 8", title: "Ética e Compliance" },
  { id: "modulo-9", label: "Módulo 9", title: "Compras na Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaComprasSuprimento(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const handleQuizComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      setCompletedModules((prev) => new Set([...prev, moduleId]));
      const progress = Math.round(
        (completedModules.size / (MODULE_DEFS.length - 1)) * 100,
      );
      props.onUpdateProgress?.(progress);
      if (moduleId === "modulo-10") {
        props.onComplete?.();
      }
    }
  };

  const getModuleVariant = (num: number) => {
    const variants = ["indigo", "emerald", "amber", "rose", "violet"] as const;
    return variants[(num - 1) % variants.length];
  };

  const renderModulo1 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={1}
        titulo="Fundamentos de Compras"
        descricao="Conceitos básicos, evolução e a importância estratégica da função."
        variant={getModuleVariant(1)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={1}
          title="A Base do Suprimento Estratégico"
          description="Entenda por que compras é o coração financeiro da indústria."
          variant={getModuleVariant(1)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
          <p>
            A função de <strong>Compras</strong> deixou de ser uma atividade puramente burocrática e reativa para se tornar um pilar estratégico nas organizações. Em indústrias de capital intensivo como a Petrobras, o custo de materiais e serviços adquiridos pode representar de 40% a 70% do faturamento total. Isso significa que qualquer economia gerada em compras tem impacto direto e massivo no lucro operacional da empresa, muito maior do que um aumento equivalente nas vendas.
          </p>
          <p>
            O objetivo central da área de suprimentos é magistralmente resumido no princípio dos <strong>5 Certos (5Rs)</strong>: garantir que a empresa adquira a <strong>Qualidade</strong> certa, na <strong>Quantidade</strong> certa, no <strong>Tempo</strong> certo, pelo <strong>Preço</strong> certo (considerando o Custo Total de Propriedade - TCO), através da <strong>Fonte</strong> (fornecedor) certa. Falhar em apenas um desses "certos" pode comprometer toda a cadeia produtiva e gerar prejuízos incalculáveis.
          </p>
          <p>
            Na evolução histórica, o setor passou de um simples "departamento de pedidos" (operacional e passivo, focado apenas no menor preço de face) para o nível de <em>Supply Management</em> estratégico. No modelo moderno, o comprador atua como gestor de relacionamentos, focando em desenvolvimento de fornecedores, análise de riscos da cadeia de suprimentos e inteligência de mercado. A área de compras agora é proativa, antecipando demandas em vez de apenas reagir a solicitações de emergência.
          </p>
          <p>
            O <strong>Custo Total de Propriedade (TCO - Total Cost of Ownership)</strong> é a lente através da qual as decisões modernas de compras são tomadas. Em vez de focar no menor Preço de Aquisição, o TCO contabiliza fretes, impostos, custos de instalação, treinamento, manutenção, consumo de energia e até o descarte. Um equipamento 20% mais barato pode ter um TCO 40% maior devido a quebras frequentes, o que justifica a escolha técnica por fornecedores mais confiáveis, mesmo com valor de face superior.
          </p>
          <p>
            No contexto da Petrobras (e provas da CESGRANRIO), a continuidade operacional é o mantra absoluto. Uma plataforma offshore (E&P) ou refinaria não pode parar por falta de uma válvula crítica. Portanto, o <em>Lead Time</em> (tempo desde a emissão do pedido até o recebimento) e a confiabilidade do fornecedor muitas vezes superam a guerra por centavos. O suprimento na estatal atua para garantir a segurança da operação, equilibrando austeridade financeira com a garantia de excelência em segurança e meio ambiente (SMS).
          </p>

          <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg mb-2">💡 Fundamentos de Ouro</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Os 5 Certos:</strong> Qualidade, Quantidade, Tempo, Preço e Fonte.</li>
              <li>✓ <strong>TCO:</strong> Custo Total de Propriedade (vai muito além do preço na nota fiscal).</li>
              <li>✓ <strong>Evolução:</strong> De Operacional/Burocrático para Estratégico/Supply Management.</li>
              <li>✓ <strong>Lead Time:</strong> Tempo total do ciclo do pedido (emissão ao recebimento).</li>
              <li>✓ <strong>Continuidade Operacional:</strong> Foco absoluto na Petrobras para evitar lucros cessantes.</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={1}
        variant={getModuleVariant(1)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "Os 5 Certos em Compras",
          duration: "10:30",
        }}
        resumoVisual={{
          moduloNome: "Módulo 1",
          tituloAula: "Gestão de Compras",
          materia: "Suprimento",
          images: [
            { title: "Os 5 Certos", type: "Diagrama", placeholderColor: "bg-indigo-500/20" },
            { title: "Evolução do Setor", type: "Mapa Mental", placeholderColor: "bg-indigo-500/20" },
          ],
        }}
        maceteVisual={{
          title: "A Regra Mnemônica",
          content: <p className="text-lg italic text-center">"Q² T P F: Quem Quer Ter Preço Forte (Qualidade, Quantidade, Tempo, Preço, Fonte)"</p>,
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          titulo: "Podcast: O Coração do Suprimento",
          artista: "Prof. Administração",
        }}
      />

      <ContentAccordion
        titulo="📖 C.E.D.E."
        icone="⚖️"
        slides={[
          { title: "O Modelo Passivo vs Ativo", content: "O modelo passivo age como 'tirador de pedidos', focando em burocracia. O modelo ativo (estratégico) influencia a especificação técnica e estuda o mercado fornecedor antes da necessidade formal." },
          { title: "Centralização vs Descentralização", content: "Centralizada: ganhos de escala e padronização. Descentralizada: Agilidade e autonomia local. O modelo híbrido é o preferido em grandes corporações como a Petrobras." },
          { title: "Definição de TCO", content: "Preço de Compra + Custos de Aquisição (frete, impostos) + Custos de Posse (estoque, seguros) + Custos de Operação (manutenção, energia) = TCO." },
        ]}
      />

      <QuizInterativo
        titulo="Fundamentos de Compras"
        numero={1}
        variant={getModuleVariant(1)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-1"])}
        onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={2}
        titulo="Processo de Compras"
        descricao="As etapas sequenciais: requisição, cotação, aprovações e ciclo do pedido."
        variant={getModuleVariant(2)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={2}
          title="O Ciclo do Pedido Analisado"
          description="Do surgimento da necessidade até o pagamento e encerramento (P2P)."
          variant={getModuleVariant(2)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
          <p>
            O <strong>Ciclo de Compras</strong> é a espinha dorsal de qualquer departamento de suprimentos estruturado. Ele tem início não com o comprador, mas com a <strong>Requisição de Compras (RC)</strong> emitida pela área usuária (produção, manutenção, engenharia). A RC documenta a necessidade, especificando características técnicas do material ou serviço requeridos e a data limite em que o item precisa estar disponível na instalação operante.
          </p>
          <p>
            Após a emissão e aprovação gerencial da Requisição, entra em cena a fase de <em>Sourcing</em> ou Pesquisa de Mercado. O comprador analisa seu portfólio de fornecedores homologados e lança uma <strong>Request for Quotation (RFQ)</strong>, chamando o mercado à disputa. Diferente de um contrato definitivo, a RFQ é uma consulta formal. É vital que as especificações estejam perfeitamente delineadas para assegurar a isonomia, de forma que as diferentes propostas comerciais (maçãs com maçãs) possam ser comparadas objetivamente.
          </p>
          <p>
            A emissão do <strong>Pedido de Compras (Purchase Order - PO)</strong> marca a consolidação comercial. O PO não é mais uma consulta; é um documento com valor legal e financeiro que formaliza o compromisso de compra frente ao fornecedor escolhido. No PO constam as condições pactuadas: preço acordado, impostos incidentes, incoterms para transporte, penalidades por atraso e cronograma de medições ou entregas físicas do material.
          </p>
          <p>
            As <strong>Alçadas de Aprovação</strong> constituem o principal mecanismo antifraude no processo de compras. O comprador opera e negocia, mas a liberação sistêmica financeira depende do nível de delegação (<em>DoA - Delegation of Authority</em>). Um analista pode ter aprovação sistêmica liberada para pedidos de até R$ 50.000,00, mas ordens que chegam a dezenas de milhões exigem assinaturas duplas ou aprovação de diretores das áreas envolvidas.
          </p>
          <p>
            O clímax operacional ocorre na etapa de Recebimento. O setor de recebimento ou almoxarifado não é apenas um depósito de descarregamento de caixa; ele realiza o <em>Three-Way Match</em> (Conciliação a 3 Vias): compara a quantidade e integridade física da carga com o descrito na Nota Fiscal e, crucialmente, verifica se a nota fiscal reflete perfeitamente os valores fechados no Pedido de Compra (PO) inicialmente, destravando a engrenagem do faturamento no ecossistema ERP.
          </p>

          <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">📦 Fluxo Padrão</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>RC (Requisição):</strong> Gatilho interno gerado pela área usuária para pedir o suprimento.</li>
              <li>✓ <strong>RFQ (Cotação):</strong> Convite para propostas enviado a fornecedores homologados.</li>
              <li>✓ <strong>PO (Pedido):</strong> Documento contratual formalizando obrigações e preços (Aceite/Envio).</li>
              <li>✓ <strong>Three-Way Check:</strong> PO + Nota Fiscal + Conferência Física garantem a integridade do processo para pagamento.</li>
              <li>✓ <strong>Alçada:</strong> Governança (compliance) que divide poderes por valores financeiros.</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={2}
        variant={getModuleVariant(2)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "O Ciclo do Pedido",
          duration: "14:15",
        }}
        resumoVisual={{
          moduloNome: "Módulo 2",
          tituloAula: "Processo de Compras",
          materia: "Suprimento",
          images: [
            { title: "Fluxo P2P (Procure-to-Pay)", type: "Fluxograma", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        maceteVisual={{
          title: "A Santíssima Trindade do Recebimento",
          content: <p className="text-lg italic text-center">"O Triplo Check P-R-N: Pedido, Recebimento e Nota."</p>,
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          titulo: "Podcast: Desvendando o P2P",
          artista: "Prof. Administração",
        }}
      />

      <QuizInterativo
        titulo="Processo de Compras"
        numero={2}
        variant={getModuleVariant(2)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-2"])}
        onComplete={(score: number) => handleQuizComplete("modulo-2", score)}
      />
    </div>
  );

  const renderModulo3 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={3}
        titulo="Seleção e Avaliação de Fornecedores"
        descricao="Cadeias produtivas, desenvolvimento e modelagem da decisão Make or Buy."
        variant={getModuleVariant(3)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={3}
          title="Gestão da Base de Fornecedores"
          description="Critérios de qualificação técnica, saúde financeira e homologação."
          variant={getModuleVariant(3)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
          <p>
            A <strong>Gestão Estratégica de Fornecedores (Supplier Relationship Management - SRM)</strong> é o diferenciador central de empresas prósperas. A base de fornecedores de uma estatal de grande porte não aceita "aventureiros". Para fornecer à Petrobras, a empresa precisa passar por um rigoroso processo de <em>Homologação (Qualificação)</em>. A homologação previne falhas graves analisando retrospecto técnico operante, balanço financeiro, e garantindo que não existem débitos estatais, sanções de órgãos de controle administrativo e passivos trabalhistas ocultos.
          </p>
          <p>
            Dentro das dinâmicas de <em>sourcing</em> (suprimento), destacam-se estratégias pontuais dependendo da criticidade do material. <strong>Single Sourcing (Fonte Única)</strong> consiste numa escolha intencional de um único parceiro para um serviço, a fim de alinhar engenharias conjuntas e alavancar profundas economias de escala, assumindo conscientemente o enorme risco do desabastecimento. Diferencia-se de parceiros monopolistas vitais, o <strong>Sole Sourcing (Fonte Exclusiva)</strong>, uma condição fatal imposta pelos agentes externos, onde não existem concorrentes globais por conta de barreiras tecnológicas ou de propriedade patentes intelectuais exclusivas de empresas transnacionais.
          </p>
          <p>
            O <strong>Scorecard (Índice de Qualificidade do Fornecimento)</strong> é o placar vivo da gestão contratual e tem sigla em destaque nas corporações globais de engenharia: <strong>QPCD (Quality, Price/Cost, Delivery)</strong>. Esse instrumento acompanha, pós-contratação, as porcentagens milimétricas de atrasos da frota de recebimento, as porcentagens de lotes defeituosos na qualidade final operante e mensura pontualmente todo aditivo renegociado. Punições no <em>scorecard</em> acarretam rebaixamento do selo de homologação do fornecedor, podendo enviá-lo à restrição em futuras chamadas.
          </p>
          <p>
            A Petrobras possui, estatutariamente e legalmente, robustos cadernos de <strong>Desenvolvimento de Fornecedores e Fomento da Indústria Nacional (Conteúdo Local)</strong>. O desenvolvimento baseia-se em missões integrativas de engenheiros nas plantas das siderúrgicas parceiras, capacitação maciça conjunta em gestão de portfólio de SMS e auxílio consultivo. O objetivo dessas "infiltrações" técnicas benéficas é transformar o fornecedor não-capacitado em um competidor robusto capaz de produzir nacionalmente equipamentos complexos, visando proteção às oscilações geopolíticas da cadeira do petróleo bruto.
          </p>
          <p>
            Constantemente deparamos na malha decisória do Planejamento Integrado Estratégico a clássica decisão da Fronteira Operante: a avaliação binária primária do chamado <strong>Make or Buy (Fazer Internamente ou Comprar no Mercado Externo)</strong>. Essa modelagem matemática deve precificar os ativos da mão de obra engessada, flexibilidade contratual reativa das oscilações, sigilo intelectual industrial e qual é de fato o <em>Core Competence</em> inalienável intrínseco aos valores fundadores do planejamento master corporativista base.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">🤝 Sourcing e Homologação</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Make or Buy:</strong> O dilema estratégico entre a produção própria (core business) e a terceirização externa competitiva.</li>
              <li>✓ <strong>Qualificação Previa:</strong> Compliance vital de atestados tributários impeditivos antes da habilitação na concorrência técnica.</li>
              <li>✓ <strong>Sole vs Single:</strong> Sole (obrigado compulsoriamente); Single (voluntariado metodologicamente em prol de parceria).</li>
              <li>✓ <strong>QPCD (IQF):</strong> Quality, Price/Cost, Delivery. (Indicadores do sucesso de entrega temporal e de calibração unitária).</li>
              <li>✓ <strong>Conteúdo Local Nacional:</strong> Programa de aceleração massiva da resiliência interna para proteção geopolítica e cambial sistêmica.</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={3}
        variant={getModuleVariant(3)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "Homologação de Fornecedores",
          duration: "16:20",
        }}
        resumoVisual={{
          moduloNome: "Módulo 3",
          tituloAula: "Seleção de Fornecedores",
          materia: "Suprimento",
          images: [
            { title: "Matriz Make | Buy", type: "Quadro Comparativo", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        maceteVisual={{
          title: "A Diferença Crucial",
          content: <p className="text-lg italic text-center">"SOLE = Solo (Sozinho no Mundo). SINGLE = Escolha Singela do Coração."</p>,
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          titulo: "Podcast: O Dilema Make or Buy",
          artista: "Prof. Administração",
        }}
      />

      <ContentAccordion
        titulo="📖 Critérios Exame CESGRANRIO"
        icone="⚖️"
        slides={[
          { title: "Índice de Qualidade do Fornecedor (IQF)", content: "É o termômetro. Pontua atrasos, qualidade da entrega e devoluções. Se baixar da meta, o fornecedor perde a chance de ser convidado para novas rodadas de RFQs." },
          { title: "Sourcing Estratégico Global", content: "Mapeamento além-fronteiras que analisa tendências de commodities transnacionais, risco de logística em mares globais (navios cargueiros engastalhados no Canal de Suez), câmbio futuro indexado via hedges protetivos atrelados às tabelas do Banco Central da conversão de balanças importativas." },
        ]}
      />

      <QuizInterativo
        titulo="Seleção de Fornecedores"
        numero={3}
        variant={getModuleVariant(3)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-3"])}
        onComplete={(score: number) => handleQuizComplete("modulo-3", score)}
      />
    </div>
  );

  const renderModulo4 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={4}
        titulo="Negociação"
        descricao="ZOPA, BATNA e as dimensões cooperativas x competitivas."
        variant={getModuleVariant(4)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={4}
          title="Negociação Cooperativa e Competitiva"
          description="A maestria diplomática na mesa de barganha no suprimento moderno."
          variant={getModuleVariant(4)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
          <p>
            A premissa da doutrina acadêmica focada em negociações modernas dita que, em licitações privadas ou em processos isentos em Suprimentos Estatais, deve-se imperativamente realizar separações contextuais baseadas em volume mercantilista transicionado, ditando os rumos das abordagens de confrontação <strong>Distributiva versus Integrativa</strong> em reuniões acaloradas com fornecedores de maquinários ultra importados ou massivos estoques de commoditization básica em galpões regionais pulverizados nacionalmente.
          </p>
          <p>
            Negociações puramente <strong>Distributivas</strong>, também apelidadas pelas premissas "ganha-perde" ou jogo de soma zero absoluto matematicamente comprovado em matriz, retratam barganhas pontuais de transações isoladas onde não interessa em esferas operacionais do fomento paritário amigável de relações vitalícias futuras, focando no ardor canibalista do preço instantâneo final (premissa muito usada em leilões isolados não-recorrentes com peças singulares esporádicas de baixo perfil mantenedor posterior operacional).
          </p>
          <p>
            Ao revés, grandes licitações de empreiteiras especializadas e empresas multinacionais que prestam contratos "guarda-chuvas" (terceirizações imensas da integridade estrutural e pintura da corrosão embarcada do casco vital de plataformas flutuantes off-shore e navios ancorados do terminal) evocam impositivamente <strong>Negociações Integrativas (Ganha-Ganha)</strong>, baseando-se que parcerias vitalícias de longo lastro se estilhaçariam via pressões esmagadoras focadas numa guerra tarifária cega instantânea de margem espremida desonradamente e predatoriamente em detrimento impositivo.
          </p>
          <p>
            Conceitos mandatórios de Harvard: o <strong>BATNA (Best Alternative to a Negotiated Agreement)</strong> configura o poderio de levantamento bélico diplomático dos atores. A "Saída de Incêndio" invisível antes de engajamento do salão oval da tratativa precificadora. Se o fornecedor "X" é o único dono dos chips controladores, seu BATNA tratora a Petrobras implacavelmente. Caso a Petrobras fomente o mercado competitivo plural com a massificação paralela da empresa "Y" e homologando novos atuantes satélites orientais, ergue suas muralhas do "Melhor Alternativa Confortável" em reações futuras caso rompida a pacificação negocial contratual prévia.
          </p>
          <p>
            O fechamento comercial só atinge os assinadores de contratos lúdicos via <strong>ZOPA (Zone of Possible Agreement)</strong>. A intersecção geométrica invisível das margens de suportabilidade respirável do mercado onde reside o aceite (O fornecedor "Z" implora secretamente para fechar entre R$ 821,00 a R$ 900,00 de lucros enquanto as estimativas balizadoras da Estatal ditam aceitação de compras balizadas entre R$ 800,00 limitadas pela linha vermelha rigorosa do teto matemático indexador de R$ 860,00 engessadas em edital). É o cruzamento áureo que abençoa negócios bilionários em corporações transnacionais petrolíferas de suprimentos estratégicos globais interconectados com fluidez.
          </p>

          <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-lg mb-2">🤝 Dicionário do Negociador</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Integrativa:</strong> As partes aumentam juntas o bolo colaborando. Negociações a longo prazo em contratos vitais.</li>
              <li>✓ <strong>Distributiva:</strong> Divisão cruel do bolo engessado, foco excludente total fixado cruamente nas reduções unitárias absolutas preteritamente amarradas no instante exato e singular temporal desprovida da relacional humanidade subjacente integrativa.</li>
              <li>✓ <strong>ZOPA:</strong> Janela restrita matemática do cruzamento limite de margens operante no lucro limítrofe das cotações viabilizáveis e balizadas nas partes e que intercedem pacificamente mutuamente sem rompantes unilaterais traumáticos desestimulantes ou inviabilizadores da entrega contínua subseqüente.</li>
              <li>✓ <strong>BATNA:</strong> Minha saída digna alternativa caso o jogo atual encerre melancolicamente as tratativas.</li>
              <li>✓ <strong>Ancoragem (Viés):</strong> Ditar inicialmente o referencial (número psicológico) gravando magnetismo forte orientador no rumo das reações gravitacionais opostas balizadas pelo interlocutor estupefato em desvantagem cronológica surpresa posicional.</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={4}
        variant={getModuleVariant(4)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "Negociação na Prática",
          duration: "13:30",
        }}
        resumoVisual={{
          moduloNome: "Módulo 4",
          tituloAula: "Negociação",
          materia: "Suprimento",
          images: [
            { title: "Gráfico de ZOPA", type: "Gráfico X-Y", placeholderColor: "bg-rose-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Bate na Zopa!",
          content: <p className="text-lg italic text-center">"O BATNA protege (Alternativa). A ZOPA permite fechar acordo (Zona)."</p>,
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          titulo: "Podcast: O Bote do Ancoramento",
          artista: "Prof. Administração",
        }}
      />

      <QuizInterativo
        titulo="Negociação"
        numero={4}
        variant={getModuleVariant(4)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-4"])}
        onComplete={(score: number) => handleQuizComplete("modulo-4", score)}
      />
    </div>
  );

  const renderModulo5 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={5}
        titulo="Tipos de Compras e Contratação"
        descricao="Abordagens específicas: de commodities e compras SPOT a acordos plurianuais Kanban."
        variant={getModuleVariant(5)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={5}
          title="O Portfólio de Aquisições"
          description="Estratégias emergenciais, descentralizadas, Consignações industriais flexíveis e sistemas Pull/Push adaptáveis e ágeis corporativamente operantes nas frentes estatais."
          variant={getModuleVariant(5)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
          <p>
            A modelagem transacional dos <strong>Tipos de Compras</strong> diferencia-se radicalmente conforme a essência da categoria dos bens suprimentares manipulados logísticos ou operantes (commodities brutas voláteis transacionadas no mar do câmbio internacional spot-fórum via importativas navios tanques graneleiros até requisições triviais singelas unitárias fragmentadas compradas localmente do mercadinho varejista adjacente descentralizadamente regional nas extremidades dos postinhos rodoviários em terras distantes interioranas dos ramais distantes rurais da rede corporativa estatal ramificada nas veias do país infraestrutural vitalmente pujante).
          </p>
          <p>
            <strong>Compras SPOT</strong> consubstanciam as investidas transacionais ágeis esporádicas momentâneas não pautadas no rigor relacional apegado de longo escopo vitalício das premissas contratuais firmes do suprimento (compra no momento x, liquida e encerra transação isolada de commodity oscilante aproveitando "gap" da alta favorável num "canyon" de queda pontual no gráfico financeiro para o favorecimento monetário). E as compras <strong>Emergenciais</strong> revelam o calcanhar da infraestrutura defeituosa da prevenção não acurada programada do planejamento integrado logado ou que não mapeou acidentes fortuitos com quebras intermitentes surpresas estourando pressupostos orçamentários vitais urgentes não regrados via preços exorbitantes punitivos taxativos do frete imediato noturno supertarifado na madrugada dos prestadores heróicos de socorro estressante caros.
          </p>
          <p>
            No panteão da excelência enxuta transborda o modelo do <strong>Kanban em Compras e o JIT (Just in Time)</strong>, filosofias onde o repuxo puxado do chão de fábrica alavanca sistemicamente eletronicamente gatilhos virtuais automatizados de reposição direta da prateleira na doca sem a mão pesada burocrática engessante das canetas de diretores, otimizando os armazéns corporativistas estatais diminuindo galpões inúteis engessados pelo capital afundado inativo em peças inertes empilhadas no teto enferrujando tristemente contabilizadas depreciativas custosamente.
          </p>
          <p>
            No formato relacional "Asset Light", o modal da repactuação de compras por <strong>Consignação</strong> delega impositivamente o encargo da subscrição da posse temporária de estocagem ao bolso inegociável penalizador mantenedor fiscalizador do fornecedor titular parceiro do lote mantido nas nossas instalações (A Petrobras só desembolsa faturas monetárias pontualmente singulares no exato intercurso microscópico temporal da retirada efetiva do rolamento catalogado do caixote fornecido pelo produtor terceiro acomodado graciosamente no galpão oficial da estatal).
          </p>
          <p>
            Por fim, temos os venerados <strong>Acordos-Quadro (Master Agreements)</strong>, emulações geniais de previsibilidade estanque tranquilizadora contábil-legalística onde a empresa fecha a tarifação base do insumo de amplo largo fluxo ininterrupto de consumo rotineiro para o ano letivo das estações corporativas, e as bases distritais das gerências operacionais executam pedidos filhotes ágeis ("Call-Offs") consumindo o guarda-chuva mestre negociado ferozmente centralizada na matriz sem se importar burocraticamente com as aprovações repetitivas tediosas exaustivas que abarrotem ineficientemente corredores de papel das diretorias homologatórias centrais ineficientemente em Brasília das licitações operantes legais governamentais vigentes estatais protocolares do país da amarra pública travadora institucionalizada legislada pormenorizada pesadamente engessadora restritiva burocrática limitativa punitiva regulamentar estrita cautelosa fiscalizadora do erário.
          </p>

          <div className="bg-violet-500/10 border-l-4 border-violet-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-violet-600 dark:text-violet-400 text-lg mb-2">🏷️ Modalidades e Execução</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Kanban / JIT:</strong> Foco brutal no desengessamento da ociosidade dos milhões parados inutilmente acumulados juntando pó na armazenagem das valas de manutenção sub-operantes sem visão puxada sincronizada veloz imediata e fluida do Lean metodológico automotivo transposto para estatais gigantes logísticas operacionais infraestruturais.</li>
              <li>✓ <strong>Emergencial vs SPOT:</strong> Emergencial transborda dor, atraso produtivo caríssimo reativo (manutenção curativa extrema). O SPOT é apenas uma modalidade desapegada livre pontual comercial oportuna mercantilista de preços voláteis ágil do comprador sem vínculo perpétuo com os ofertantes flutuantes na maré viva da flutuação da bolsa monetária mercantil global.</li>
              <li>✓ <strong>Consignação de Repouso Terceiro Fiduciário:</strong> Mantido conosco no solo matricial estatal operante mas o CPF/CNPJ patrimonial indexado remete ao credor parceiro que só envia os carnês cobradores faturamento no giro temporal estrito das saques da engenharia em caso de incidentes vitais trocos nas refinarias manutenções contínuas operantes interruptas vitais das plantas matrizes complexas das operações pesadas brasileiras off/on-shores da atividade núcleo e central base focal petrolífera nacionalmente relevante estratégica essencial sistêmica pátria.</li>
              <li>✓ <strong>Acordos-Quadrão Plurianuais Simplificados Rápidos Ligeiros:</strong> Fechamentos longos predeterminantes das tarifas contratuais master unindo base nacional (Call-offs gerados pelas bordas pontuais das instalações independentes capilares).</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={5}
        variant={getModuleVariant(5)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "Tipos de Compras e ERP",
          duration: "11:20",
        }}
        resumoVisual={{
          moduloNome: "Módulo 5",
          tituloAula: "Tipos de Compras",
          materia: "Suprimento",
          images: [
            { title: "Matriz Portfólio de Compras", type: "Tabela", placeholderColor: "bg-violet-500/20" },
          ],
        }}
        maceteVisual={{
          title: "A Pirâmide da Decisão",
          content: <p className="text-lg italic text-center">"Da prateleira do JIT à Cadeira do Acordo-Quadro. Fuja da Emergencial!"</p>,
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          titulo: "Podcast: Consignados da Empresa",
          artista: "Prof. Administração",
        }}
      />

      <QuizInterativo
        titulo="Tipos de Compras"
        numero={5}
        variant={getModuleVariant(5)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-5"])}
        onComplete={(score: number) => handleQuizComplete("modulo-5", score)}
      />
    </div>
  );

  const renderModulo6 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={6}
        titulo="Gestão de Contratos de Fornecimento"
        descricao="Administração contratual, SLA, penalidades e reajustes."
        variant={getModuleVariant(6)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={6}
          title="Fase de Execução e Controle Contratual"
          description="Onde a estratégia de compras se transforma em entregas reais medidas."
          variant={getModuleVariant(6)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
          <p>
            A ilusão dos compradores amadores é acreditar que o sucesso do suprimento se encerra com a belíssima assinatura da ordem formal de compra. No mercado de capitais pesados, a <strong>Gestão de Contratos (Post-Award Management)</strong> é, em verdade, o autêntico coração operacional: a arte de assegurar que centenas de variáveis negociadas na mesa de barganha virem resultados entregues nos canteiros da Petrobras.
          </p>
          <p>
            O dispositivo legal controlador fundamental é o <strong>SLA (Service Level Agreement - Acordo de Nível de Serviço)</strong>. Essa métrica, ao invés de usar terminologias subjetivas ("fornecer boa limpeza industrial"), parametriza quantitativamente e inequivocamente ("manter nível bacteriológico da praça refeitório em padrão ISO-A com 99% de conformidade auferida mensalmente"). O SLA quantifica métricas abstratas, travando a régua exigida para pagamentos dos faturamentos mensais. Se a métrica afundar, os descontos diretos na fatura (glosas) atuam compulsoriamente como remédio de equalização da falha.
          </p>
          <p>
            Os <strong>Reajustes Econômico-Financeiros (Revisão Contratual)</strong> são salvaguardas cruciais do equilíbrio do pacto. Num contrato plurianual duradouro estático nominalmente de fornecimento logístico naval para as Bacias de Campos, por exemplo, como o dono dos rebocadores sobreviverá e manterá o barco rodando por 4 anos sem ser pulverizado pela inflação do diesel naval e pela variação do câmbio na cotação de manutenção globalizada marítima do mercado? Eis os Índices de Reajuste atrelados por fórmulas matemáticas (INPCA, FGV, Diesel Índice), que readéquam automaticamente anualmente as taxas transacionais.
          </p>
          <p>
            As execuções demandam pulso firme por meio dos fiscais de contrato da empresa contratante operante para o fiel rigor de <strong>Penalidades e Multas Moratórias</strong>. O contrato estatal assinado sob a ótica rígida (Regulamento de Licitações - RLCP) expede sansões implacáveis antecipadas. Atraso gerará retenção da garantia exigida, ou glosa no faturamento (Ex: redução linear no boletim de medição mensal em montante proporcional a 2% a cada 10 dias rompidos dos prazos).
          </p>
          <p>
            Finalmente, a administração lida incansavelmente contra o "Scope Creep" ou Desvio Infeccioso do Escopo Contratual original projetado. Fornecedores espertos muitas vezes aceitam margens "zeradas" e esmagadas na licitação visando posteriormente encher a área contratante de solicitações aditivas extorsivas baseadas em ambiguidades descritas no memorial do contrato para "recuperarem o prejuízo" da disputa no preço original. A engenharia dos fiscais e as blindagens contratuais dos editais são o escudo anti-aditivos parasitários injustificados contra a Petrobras transnacional exploradora.
          </p>

          <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-indigo-600 dark:text-indigo-400 text-lg mb-2">📜 Mecanismos Vivos Contratuais</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>SLA (Acordo Funcional Nivelado):</strong> Transmuta objetivos abstratos em porcentagens concretas medíveis operacionais inquestionáveis mensais.</li>
              <li>✓ <strong>Eqüidade Econômica:</strong> A proteção indexada tarifada matemática para rebater externalidades cambiais inflacionárias corroedoras temporais de longo termo nos acordos fixos iniciais e manter o prestador respirando na operação ininterrupta.</li>
              <li>✓ <strong>Aditivos (Scope Creep):</strong> Tentáculos que aumentam sorrateiramente o preço fixado ou prazos dilatados exigindo readequações da planilha matriz inicial; os bons contratos blindam esses furos iniciais hermeneuticamente e proíbem aditivações superfaturadas maliciosas perigosas na fiscalização.</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={6}
        variant={getModuleVariant(6)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "SLA, Multas e Gestão Corretiva Contratual Corporativa Integrada e Segura",
          duration: "13:45",
        }}
        resumoVisual={{
          moduloNome: "Módulo 6",
          tituloAula: "Gestão Contratual",
          materia: "Suprimento",
          images: [
            { title: "SLA x Pagamentos Mensais Glosados", type: "Fluxograma", placeholderColor: "bg-indigo-500/20" },
          ],
        }}
        maceteVisual={{
          title: "SLA não perdoa",
          content: <p className="text-lg italic text-center">"O SLA é o juiz cego. Bateu a métrica ganha. Falhou, leva glosa mensal na cabeça financeira corporativamente faturada pela fiscalização implacável rígida estatal fiscalizadora."</p>,
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          titulo: "Podcast: As Armadilhas Fiscais",
          artista: "Prof. Administração",
        }}
      />

      <QuizInterativo
        titulo="Gestão de Contratos de Fornecimento"
        numero={6}
        variant={getModuleVariant(6)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-6"])}
        onComplete={(score: number) => handleQuizComplete("modulo-6", score)}
      />
    </div>
  );

  const renderModulo7 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={7}
        titulo="Compras Eletrônicas e e-Procurement"
        descricao="A digitalização radical: Catálogos internos, Leilões Reversos e Portais Petronect."
        variant={getModuleVariant(7)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={7}
          title="Digitalização Integrada das Aquisições B2B"
          description="A velocidade digital aniquilando a barreira burocrática física no chão e na nuvem do ecossistema ERP SAP-Ariba-Petronect conectado em teia."
          variant={getModuleVariant(7)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
          <p>
            O paradigma burocrático de envelopes pardos lacrados com cera, pregoeiros berrando em salas apertadas enfumaçadas e contratos pesando toneladas em armários metálicos foi pulverizado pelo <strong>E-Procurement</strong>. A essência do Electronic Procurement é transmutar 100% da relação comprador-fornecedor em rotas criptografadas auditáveis on-line interligadas ponta a ponta sem interferimento analógico ou físico, varrendo o risco do conluio presencial e da lerdeza temporal insuportável no comércio logístico.
          </p>
          <p>
            O <strong>Catálogo Eletrônico (Punch-out / e-Catalog)</strong> trouxe a experiência intuitiva limpa varejista (estilo "clica e arrasta carrinho supermercado on-line livremente") para compras industriais massivamente complexas. Um técnico da plataforma entra no portal interno, visualiza macacões nomex, EPIs e conexões estatais já homologados pré-contratualmente, insere no carrinho o quantitativo, preenche o centro de custo local e dá "enter". A compra já rola automatizada pelo sistema puxado Kanban diretamente enviada ao fornecedor matriz logístico remoto interligado imediatamente via nuvens da SAP sem engarrafar analistas centrais preciosos da corporação mestre.
          </p>
          <p>
            No teatro operacional da concorrência brutal de preço mercadológica brilha reluzente em neônio ofuscante a ágora do <strong>Eletronic Reverse Auction (Leilão Reverso Digitalizado Eletrônico Instantâneo)</strong>. É aqui onde o modelo tradicional se inverte agressivamente para baixo em degraus descendentes compulsórios num ringue livre onde lances competitivos barateiam a cotação a níveis mínimos exatos sustentáveis pela engenharia industrial. Ideal para commodities de pura guerra de preço (aço, chapas homogêneas, cimentos unificados). Não adequado para serviços super intelectuais arquitetônicos obscuros difíceis de metrificação pura unitária.
          </p>
          <p>
            A auditoria do Tribunal de Contas (TCU) e da CGU endeusam profundamente no Estado Brasileiro as virtudes infalíveis dos <strong>Portais Unificados de Compras Públicas</strong> (como as plataformas ComprasNET e a gigantesca transnacional <strong>Petronect</strong> exclusiva das contradições do Sistema Petrobras). Todo e qualquer movimento digital (hora do clique emissor da RFQ, tempo das respostas de cotação das emrpesas, as quedas microscópicas de cada lance reverso) fica fossilizado no blockchain de banco de dados ERP, rastreável e impassível de adulteração das mãos mal-intencionadas nas esferas coruptivas das licitações antigas escusas e veladas nos porões obscuros dos trâmites físicos cartorários em papel rasurável rasurável.
          </p>
          <p>
            O fluxo B2B eletrônico exige integração profunda <strong>EDI (Electronic Data Interchange)</strong> e APIS ativas. O fornecedor insere NF (Nota Fiscal Eletrônica governamental homologativa fiscal do Sintegra logístico) e o sistema lê sem toque humano digitativo e cruza perfeitamente com o Pedido PO matriz eletrônico fechado meses trás na Petronect acoplando harmonicamente os dígitos. Se o cruzamento der "ok completo triplo", a liberação cai na tesouraria do SAP corporativo emulando transfer bancária na sexta-feira à tarde tranquilamente pontualmente fluidamente sem engastes.
          </p>

          <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">🌐 O Arsenal do E-Procurement</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Catálogos Punch-Out:</strong> Compra pulverizada local nas pontas como "e-commerce" interno, atrelado aos acordos matrizes guarda-chuvas negociados.</li>
              <li>✓ <strong>Leilão Reverso Eletrônico:</strong> Dinâmica veloz para commodities e itens homogêneos descritíveis em que foca única e brutalmente no achatamento máximo agressivo reativo de preço e margens entre licitantes habilitados técnicos escondidos em sigilo digital virtual sem rosto nem combinações de carteis ilegais em praça pública física coniventes e suspeitos flagrantemente espúrios operantes fraudulentos.</li>
              <li>✓ <strong>Petronect:</strong> O portal unificado monolítico governamental da holding para homologação, cotação, negociação e faturamento sistêmico imutável auditável interativo para transparência do cidadão observador vigilante na pátria mãe gentil e forte da indústria base petrolífera produtora energética sustentaculadora financeira arrecadatória impositiva massiva pesada colossal brasileira âncora soberana nacionalista forte estatal ativa gigantesca viva gigante colossal pilar gigante!</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={7}
        variant={getModuleVariant(7)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "Leilão Reverso e Portais Eletrônicos em Ação Visceral",
          duration: "09:50",
        }}
        resumoVisual={{
          moduloNome: "Módulo 7",
          tituloAula: "e-Procurement B2B",
          materia: "Suprimento",
          images: [
            { title: "Arquitetura Petronect e SAP B2B EDI", type: "Esquema Digital de API", placeholderColor: "bg-emerald-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Sem papel. Sem Miguel.",
          content: <p className="text-lg italic text-center">"O digital rastreia e barateia. Catálogo para agilidade, Leilão Reverso para Commodities e Preço. Integração total no ERP."</p>,
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          titulo: "Podcast: Petronect Desvendado e a revolução digital",
          artista: "Prof. Administração",
        }}
      />

      <QuizInterativo
        titulo="e-Procurement"
        numero={7}
        variant={getModuleVariant(7)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-7"])}
        onComplete={(score: number) => handleQuizComplete("modulo-7", score)}
      />
    </div>
  );

  const renderModulo8 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={8}
        titulo="Ética, Sustentabilidade e Compliance em Compras"
        descricao="Cadeia limpa sustentável e blindada contra corrupções ou práticas desonrosas espúrias de suborno inaceitável nas contratações."
        variant={getModuleVariant(8)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={8}
          title="O Escudo de Compliance Inquebrável"
          description="A integridade suprema que rege as interações com entes terceirizados e a proibição ao favorecimento cartelizado em cadeias sensíveis de compras bilionárias."
          variant={getModuleVariant(8)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
          <p>
            A relação entre <strong>Compradores e Fornecedores</strong> corporativos transnacionais representa o segmento topograficamente mais sensível à erosão corrompedora financeira e aos colapsos corporativos e escândalos governamentais na crônica mundial moderna recente penal e administrativa estatal midiática. Por movimentarem fatias monstruosas bilionárias e transacionais do orçamento, os agentes envolvidos ficam sujeitos a pressões inauditas da sedução corruptiva lobista tentadora contínua sorrateira persistente ininterrupta em favores ofertados ocultamente ilegitimamente ilícitas antiéticas no seio corporativo transacional de negócios velados e propostas escuras não auditáveis.
          </p>
          <p>
            O <strong>Compliance</strong> impõe a separação abissal irrevogável restritiva. O comprador de estatais reza a cartilha sagrada do Código de Conduta Integrada inviolável e rigorosamente implacável da ouvidoria blindada. Nenhuma ceia exótica desnecessária deve ser custeada amigavelmente pela prestadora transacional participante do pleito licitatório competitivo. <strong>Brindes de baixíssima monta temporal ou brindes insignificantes triviais (canetas sem valor substancial) num contexto puramente técnico isento mercadologicamente livre de coações sutis não configuram conflito</strong>, mas hospedagens suntuosas recreativas obscuras pagas discretamente por fornecedores alijam imediatamente por total irregularidade infrações gravíssimas expurgatórias demissionárias rescisórias imediatas punitivas penais o gestor do assento gerencial outorgado estatutariamente público no departamento executivo!
          </p>
          <p>
            A ótica expansiva abrange a <strong>Sustentabilidade Sócio-Ambiental e o ESG moderno logístico em cadeias produtivas globais complexas ramificadas pulverizadoras</strong>. O suprimento na Petrobras não visa meramente fechar torneiras monetárias e amealhar caixas em superávits anuais, ele opera como agente transformador impulsionador indutor vigilante estatal forte ambiental na pátria provedora de negócios virtuosos operantes nas regiões. A empresa bloqueia impiedosamente fornecedores listados tacitamente negativamente sujos em fiscalizações do trabalho análogo ao modelo escravagista em canteiros obscuros nas confecções remotas não documentadas ou nas frentes destrutivas florestais das queimadas ilícitas descontroladas danosas climáticas planetárias graves irresponsáveis operantes negligentes criminosas devastadoras regionais agressoras e predatórias ao solo biológico local.
          </p>
          <p>
            Políticas de <strong>Compras Verdes (Green Purchasing) e Respeito Humano Decente (Social Sourcing)</strong> obrigam que a matriz Ponderadora Qualidade x Preço embute o peso da credencial de certificações florestais autênticas homologadas. Madeiras compensadas para andaimes de pintura naval exigem atestados "selo verde" originais da exploração compensatória florestal não devastadoras criminosas fátuas indevidas invasivas em unidades protetivas preservativas originárias territoriais indígenas do interior amazônico ribeirinho em faixas protegidas. O barato sem certificação lícita provada vira caro numa autuação internacional na bacia manchada na logomarca sustentável exportadora. É vetado peremptoriamente compras dessas matizes marginais poluidoras perigosas degradantes agressoras sem compliance verde provado!
          </p>
          <p>
            <strong>Conflito de Interesses e Conluios de Cartelização Engessada.</strong> Operações de auditoria pente fino revistam se irmãos, esposas ou prepostos gerenciais dos diretores decisores operacionais da estatal em compras detém o capital acionário obscuro sigiloso rentável fantasma daquelas entidades licitantes cadastradas proponentes vitoriosas do certame competitivo concorrido supostamente equitativo que fora emuladamente forjado de fachada lúdica legal dissimuladora fraudada lesiva concorrência simulada. Essas ramificações espúrias antiéticas sangram silenciosamente os cofres ineficientemente corrompedoramente asfixiantemente penalmente criminalmente severamente! Bloqueios do portal compliance barram isso automatizado no CPF/CNPJ.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">⚖️ Pilares Éticos do Suprimento</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Brindes e Hospitalidade (Gifts & Entertainment):</strong> Regrada rigorosamente milimetricamente em valores nominais. Tolerância zero para vantagens obscuras manipuladoras influenciadoras direcionais das decisões contratuais matrizes estratégicas operantes nas planilhas e compras unitárias licitadas dos cofres centrais estatais estritos rigorosos normatizados regulamentados balizados auditáveis legalistas do órgão fiscal controlador soberano restritivo do gasto livre alheio desregrado governamental inconseqüente corrupto.</li>
              <li>✓ <strong>Cadeia Sucja (Trabalho Indigno/Escravagista):</strong> É banimento eterno, suspensão eterna inegociável moral irreversível do Cadastro Petronect e da Receita homologatória limpa e das faturas limpas de concorrências. Sustentabilidade e humanidade prevalecem invariavelmente impiedosamente intocáveis.</li>
              <li>✓ <strong>Conflito de Interesse e Nepotismo Transacional Corporativo Direcional Lesivo:</strong> Impedimento sistêmico de homologação técnica de ofertantes vinculados ao grau familiar diretivo dos empregados chaves decisórios manipulativos tendenciosos internos concursados emprestados ou em postos transacionais mandatórios do comando contratual vigente. Ficha limpa dupla matriz na hierarquia isonômica de mercado livre impoluto!</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={8}
        variant={getModuleVariant(8)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "Ética nas Compras Corporativas: Cortando o Mal",
          duration: "20:05",
        }}
        resumoVisual={{
          moduloNome: "Módulo 8",
          tituloAula: "Ética e Compliance",
          materia: "Suprimento",
          images: [
            { title: "Matriz Sustentabilidade ESG x Lucratividade na Contratação", type: "Fluxograma de Balança", placeholderColor: "bg-amber-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Brinde, Cartel e Ambiente Sustentável",
          content: <p className="text-lg italic text-center">"Amigo secreto de 1 milhão? Corrupção! Compre do melhor e fiscalize como ele fabrica."</p>,
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          titulo: "Podcast: As Fronteiras de Ouro e Regras Verdes Legais da Ética Indiscutível",
          artista: "Prof. Administração",
        }}
      />

      <QuizInterativo
        titulo="Ética e Compliance em Compras"
        numero={8}
        variant={getModuleVariant(8)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-8"])}
        onComplete={(score: number) => handleQuizComplete("modulo-8", score)}
      />
    </div>
  );

  const renderModulo9 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={9}
        titulo="Compras na Petrobras: Prática e Leis (RLCP)"
        descricao="Normas Estatais, Lei das Estatais e as engrenagens de aquisição exclusivas da Logística Brasileira."
        variant={getModuleVariant(9)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index={9}
          title="Regulamento de Licitações (RLCP) e Regras Excepcionais"
          description="Quando o mercado petrolífero exige agilidade legal perante a concorrência brutal privada internacional fluida sem barreiras pesadas governamentais burocráticas letárgicas estatais."
          variant={getModuleVariant(9)}
        />

        <div className="space-y-6 text-lg leading-relaxed text-foreground prose-invert">
          <p>
            No desbravamento mercadológico brasileiro, compras para o aparato do Estado travam sob os auspícios engessantes monolíticos imensos herméticos burocráticos arrastados paralisantes trituradores temporais das famosas <strong>"Licitatórias" Clássicas Antigovernamentais Generalizadas da extinta mas imorredoura culturalmente operante lei geral nacional amarrada a órgãos letárgicos paquidérmicos protocolares longos ineficientes de meses arrastados até um prego na porta das obras viárias estancadas paralisadas apodrecidas nos anos esquecidos das intempéries.</strong>
          </p>
          <p>
            Mas a <strong>Petrobras opera incrustada ferozmente e implacavelmente no mercado competitivo hiper-ágil globalizado transnacional petrolífero internacional contra mega-corporações privadas colossais leves fluidas ultra ágeis do Oriente Médio, Ásia e ocidentais globais ávidas.</strong> Sujeitar as refinarias dinâmicas logísticas brutais off-shore bilionárias marítimas diárias naquelas mesmas metodologias travadas paquidérmicas da repartição prefeitural burocrática faria a holding naufragar estruturalmente, falindo em competições frente às multinacionais concorrentes transnacionais imbatíveis ágeis ligeiras vorazes e tubarões livres burocráticos globais capitalistas predatórios! Essa a essência basilar!
          </p>
          <p>
            Surge o farol libertador legal: A inovadora revolucionária <strong>Lei das Estatais (Lei nº 13.303/2016) e o instrumento magno flexibilizador operante das compras do sistema chamado: "RLCP" (Regulamento de Licitações e Contratos da Petrobras Misto Ágil Integrado Híbrido Competitivo Flexível Rápido Específico Adaptativo Focado Setorial Direcional Direto Privatista de Dinâmicas Comerciais)</strong>. Ele destrava a companhia. Instala modalidades competitivas híbridas enxutas aceleradas ágeis. Mantém controle probatório fiscal anti-corruptivo forte, porém gira e homologa aquisições vitais velozmente desobstruindo compras pesadas num rito mais paralelo aos dos preceitos fluidos flexíveis privatizados corporativistas da bolsa livre sem perder o pendor estatal probatório austero responsável publicamente impoluto zeloso do erário financeiro amealhado.
          </p>
          <p>
            <strong>Dispensa e Inexigibilidade Flexibilizadas Excepcionais Específicas Dinâmicas Permissíveis Criteriosamente Pautadas Baseadas Tecnicamente Comprobatórias Emergenciais Rápidas Singulares Únicas Notáveis Patenteadas Focais Locais Raras Necessárias</strong>. O RLCP detalhou hipóteses ágeis seguras para contratações super emergenciais (plataformas em chamas, refinaria vazando óleo tóxico mortal diário não podem aguardar prazos longos editalícios licitatórios). Além disso previu inteligentemente o uso do Conteúdo Local com direcionamento legalista aprovos focados em incentivar o produtor regional estaleiro construtor nacional fornecedor base para fomentar o PIB tecnológico complexo industrial tupiniquim, mesmo que o mercado em terras longínquas despeje navios na metade do preço construído em subsidiárias de mão de obra barateadas distantes do globo doentias aviltantes obscuras sem frete verde e de aço barato sem matriz social protetiva garantidora vital protetiva.
          </p>
          <p>
            Por tudo isso a CESGRANRIO exige que o estudante devore o entendimento vital macro desta balança híbrida complexa maravilhosa equilibrada oscilante: A Petrobras compra respeitando o dinheiro público da união soberana arrecadadora impoluta, mas exige a eficiência operante ágil fluida flexível e veloz capitalista feroz da máquina produtiva off-shore profunda exploratória competitiva multinacional agressora mercadológica para bater recordes de barris produtivos perfurantes de margens gigantes em solos azuis profundos marítimos pré-salinos bilionários pujantes. Essa equação mágica opera no balizar das negociações técnicas homologadas normatizadas diárias e noturnas da estatal amada brasileira corporativa transnacional energética pilar fundadora!
          </p>

          <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
            <p className="font-bold text-rose-600 dark:text-rose-400 text-lg mb-2">🔰 As Ferramentas do Estado Empreendedor</p>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Lei 13.303 e o Regulamento Próprio RLCP (Regulamento de Licitações da Petrobras):</strong> O passaporte da agilidade mitigadora travadora burocrática arcaica que a companhia ganhou legitimamente do congresso para competir bravamente contra as super potências multinacionais privadas velozes que navegam os oceanos petrolíferos globais agressivos capitalistas soltos.</li>
              <li>✓ <strong>Inexigibilidade Notória:</strong> Quando há inviabilidade total e fatal absoluta indiscutível de concorrência por exclusividade cabal irrefutável (Patente gringa trancada e única homologadora mantenedora segura confiável da turbina suíça giratória submarina vital única global inimitável patenteada sem cópias locais ou globais viáveis técnicas toleráveis seguras do equipamento master no leito oceânico profundo pressórico gigacalórico termal inabitável).</li>
              <li>✓ <strong>Políticas Sociais Conteúdista Locais:</strong> Um misto legal que engessa parcialmente o preço super barato focado para fortalecer e criar gigantescas molas indutoras tecnológicas na indústria brasileira basal forjada naval fornecedora que gerará divisas pátrias e blindará geopoliticamente a nação isolada da matriz energética soberana provedora inquebrável pátria verde e amarela continental gigantesca estruturada próspera soberana pujante.</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={9}
        variant={getModuleVariant(9)}
        video={{
          videoId: "dQw4w9WgXcQ",
          title: "A Lei 13.303 e o RLCP Desbravado Profundo Prático Ágil",
          duration: "25:10",
        }}
        resumoVisual={{
          moduloNome: "Módulo 9",
          tituloAula: "Compras Petrobras",
          materia: "Suprimento",
          images: [
            { title: "Balança da Estata: Dinheiro Público vs Agilidade Privada", type: "Equação Dinâmica Ilustratória Gráfica Visual", placeholderColor: "bg-rose-500/20" },
          ],
        }}
        maceteVisual={{
          title: "Rigidez Moral com Agilidade Funcional Comercial Operante Eficiente Otimizada Veloz Rápida Inteligente Lucrativa Competitiva Sustentável Robusta",
          content: <p className="text-lg italic text-center">"O RLCP é o carro blindado com motor de Fórmula 1 e pneus de tração pesada sustentável aderente."</p>,
        }}
        audio={{
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          titulo: "Podcast: O Monstro Híbrido Estata e Privado Foco Competitivo",
          artista: "Prof. Administração",
        }}
      />

      <QuizInterativo
        titulo="Compras na Petrobras"
        numero={9}
        variant={getModuleVariant(9)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-9"])}
        onComplete={(score: number) => handleQuizComplete("modulo-9", score)}
      />
    </div>
  );

  const renderModulo10 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={10}
        titulo="Simulado Mestre"
        descricao="Teste final abrangente. Aprovação destrava a XP completa da Missão Geração Ouro da CESGRANRIO focada em concursos Petrobras logísticos."
        variant={getModuleVariant(10)}
      />
      <QuizInterativo
        titulo="Simulado Final: Gestão de Compras"
        numero={10}
        variant={getModuleVariant(10)}
        questoes={toQQ(COMPRAS_QUIZZES["modulo-10"])}
        onComplete={(score: number) => handleQuizComplete("modulo-10", score)}
      />
    </div>
  );

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const previousModule = MODULE_DEFS[index - 1];
    return completedModules.has(previousModule.id);
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      modules={MODULE_DEFS}
      isCompleted={props.isCompleted}
      loading={props.loading}
      xpGanho={props.xpGanho}
      currentProgress={props.currentProgress}
      onComplete={props.onComplete}
      titulo={props.titulo}
      descricao={props.descricao}
      duracao={props.duracao}
      materiaNome={props.materiaNome}
      materiaCor={props.materiaCor}
      materiaId={props.materiaId}
      prevTopico={props.prevTopico}
      nextTopico={props.nextTopico}
    >
      <TabsContent value="modulo-1">{renderModulo1()}</TabsContent>
      <TabsContent value="modulo-2">{renderModulo2()}</TabsContent>
      <TabsContent value="modulo-3">{renderModulo3()}</TabsContent>
      <TabsContent value="modulo-4">{renderModulo4()}</TabsContent>
      <TabsContent value="modulo-5">{renderModulo5()}</TabsContent>
      <TabsContent value="modulo-6">{renderModulo6()}</TabsContent>
      <TabsContent value="modulo-7">{renderModulo7()}</TabsContent>
      <TabsContent value="modulo-8">{renderModulo8()}</TabsContent>
      <TabsContent value="modulo-9">{renderModulo9()}</TabsContent>
      <TabsContent value="modulo-10">{renderModulo10()}</TabsContent>
    </AulaTemplate>
  );
}
