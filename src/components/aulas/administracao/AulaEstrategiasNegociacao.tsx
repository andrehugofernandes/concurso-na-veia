"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import { AulaProps, QuizQuestion ,
  QuestaoResolvidaStepByStep} from "../shared";
import {
  ModuleConsolidation,
  ContentAccordion,
  QuizInterativo,
  ModuleBanner,
  ModuleSectionHeader,
  AulaTemplate,
  AlertBox,
} from "../shared";
import { LuBrain, LuBookOpen, LuFileText, LuSearch } from "react-icons/lu";
import { TabsContent } from "@/components/ui/tabs";

const QUIZ_NEGOCIACAO: Record<string, { questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[] }> = {
  "modulo-1": {
    questions: [
      {
        id: 1,
        question: "Qual a principal diferença entre a negociação integrativa e a distributiva?",
        options: [
          "A integrativa busca ganhos mútuos (ganha-ganha) expandindo as opções de valor, enquanto a distributiva divide recursos limitados (ganha-perde).",
          "A integrativa é mais rápida que a distributiva por dispensar a fase de propostas.",
          "A distributiva é sempre mais vantajosa para ambas as partes por focar exclusivamente no preço.",
          "Não existe diferença prática entre elas no contexto de compras corporativas.",
        ],
        correct: 0,
        explanation: "A negociação integrativa busca soluções de ganho mútuo, expandindo as variáveis negociáveis (prazo, qualidade, serviços), enquanto a distributiva é um jogo de soma zero focado na divisão de recursos fixos (como preço puro).",
      },
      {
        id: 2,
        question: "O conceito de BATNA (Melhor Alternativa para um Acordo Negociado) é crucial na preparação. Como ele afeta a negociação?",
        options: [
          "Ele define o teto máximo de preço que o vendedor aceita receber.",
          "Um BATNA forte aumenta o poder de barganha do negociador, permitindo-lhe rejeitar acordos desfavoráveis.",
          "Ele representa o ponto exato onde as propostas se cruzam na ZOPA.",
          "Ele elimina a necessidade de fazer propostas iniciais.",
        ],
        correct: 1,
        explanation: "O BATNA representa a alternativa viável caso a negociação atual falhe. Ter um BATNA forte (ex: múltiplos fornecedores prontos para atender) dá poder de barganha para recusar termos ruins.",
      },
      {
        id: 3,
        question: "Em uma negociação comercial, o que representa a ZOPA (Zona de Possível Acordo)?",
        options: [
          "O valor máximo de desconto que o fornecedor está autorizado a dar.",
          "A intersecção entre o preço máximo que o comprador aceita pagar e o preço mínimo que o vendedor aceita receber.",
          "A área geográfica onde as reuniões de negociação devem ocorrer.",
          "O prazo limite estabelecido no edital para a conclusão da negociação.",
        ],
        correct: 1,
        explanation: "A ZOPA é a faixa comum entre os limites de reserva das partes. Se o comprador aceita pagar até 100 e o vendedor aceita no mínimo 80, a ZOPA é de 80 a 100.",
      },
      {
        id: 4,
        question: "A tática de ancoragem em negociações comerciais consiste em:",
        options: [
          "Pressionar o fornecedor a manter o preço inalterado por 12 meses.",
          "Apresentar a primeira oferta para estabelecer um ponto de referência mental que influenciará as propostas seguintes.",
          "Aguardar que a outra parte defina o seu limite mínimo de lucro.",
          "Romper a negociação unilateralmente para buscar alternativas.",
        ],
        correct: 1,
        explanation: "Ancoragem é a apresentação do primeiro valor de referência, que funciona como uma âncora cognitiva, puxando os lances subsequentes para perto de si.",
      },
      {
        id: 5,
        question: "Qual fase é considerada a mais crítica para o sucesso de uma negociação empresarial?",
        options: [
          "A apresentação de propostas formais.",
          "A preparação prévia, contendo pesquisa de mercado, definição de limites e metas.",
          "O fechamento do contrato com assinatura física.",
          "A fase de concessões de última hora.",
        ],
        correct: 1,
        explanation: "A preparação prévia define o sucesso da negociação. É nela que são levantados os custos (TCO), limites, interesses e o BATNA, impedindo decisões precipitadas ou sob pressão.",
      },
    ],
  },
  "modulo-2": {
    questions: [
      {
        id: 1,
        question: "Nas licitações das empresas estatais regidas pela Lei nº 13.303/16, após a classificação das propostas, a negociação de preços com o primeiro colocado é:",
        options: [
          "uma mera faculdade do pregoeiro, aplicada raramente.",
          "um dever da administração com o objetivo de obter condições mais vantajosas para a estatal.",
          "vedada para garantir a isonomia entre os licitantes.",
          "permitida apenas para contratações emergenciais.",
        ],
        correct: 1,
        explanation: "A Lei 13.303/16 estabelece que o comprador/pregoeiro deve negociar com o licitante vencedor para obter termos ainda mais vantajosos, sob os princípios da economicidade e do interesse público.",
      },
      {
        id: 2,
        question: "Durante uma compra emergencial em uma refinaria da Petrobras, a peça crítica deve ser comprada imediatamente. Nessa situação, o poder de barganha do comprador é:",
        options: [
          "alto, devido ao porte financeiro da Petrobras.",
          "baixo, pois o BATNA é fraco em decorrência da urgência extrema de fornecimento.",
          "nulo, pois a lei proíbe qualquer tipo de negociação em emergências.",
          "igual ao de uma compra programada tradicional.",
        ],
        correct: 1,
        explanation: "Na emergência operacional, o tempo é o principal limitador. O comprador não tem alternativas viáveis de prazo (BATNA fraco), o que reduz drasticamente seu poder de barganha.",
      },
      {
        id: 3,
        question: "Qual critério de avaliação o comprador de suprimentos deve priorizar ao negociar contratos de equipamentos de grande porte?",
        options: [
          "Apenas o preço de aquisição imediato (valor de face).",
          "O Custo Total de Propriedade (TCO), englobando custos de aquisição, frete, manutenção e descarte.",
          "A reputação pessoal do gerente de contas do fornecedor.",
          "A localização geográfica exclusiva do fornecedor.",
        ],
        correct: 1,
        explanation: "O TCO (Total Cost of Ownership) avalia o impacto financeiro total do bem durante todo o seu ciclo de vida útil. Negociar menor TCO é mais estratégico do que focar apenas no preço nominal.",
      },
      {
        id: 4,
        question: "Ao negociar um contrato de fornecimento de longo prazo com reajuste periódico, o comprador deve vincular o reajuste a:",
        options: [
          "um percentual fixo arbitrado anualmente pelo fornecedor.",
          "um índice de preços oficial que reflita a variação real de custos do setor envolvido.",
          "taxas cambiais flutuantes sem limite máximo.",
          "critérios subjetivos definidos pela fiscalização do contrato.",
        ],
        correct: 1,
        explanation: "Para preservar o equilíbrio econômico-financeiro sem gerar custos abusivos, as cláusulas de reajuste devem ser atreladas a índices oficiais do setor (ex: IPCA, IGP-M ou índices de insumos específicos).",
      },
      {
        id: 5,
        question: "Em relação ao compliance nas negociações de estatais, qual das seguintes condutas é considerada de alta conformidade e ética?",
        options: [
          "Conceder vantagens informais ao fornecedor em troca de agilidade na entrega.",
          "Registrar formalmente todas as etapas de negociação e negociações em atas acessíveis para auditorias e TCU.",
          "Esconder o orçamento estimado do certame até dos órgãos de fiscalização interna.",
          "Negociar condições contratuais fora do escopo fixado no edital da licitação.",
        ],
        correct: 1,
        explanation: "O princípio da publicidade e controle exige que todas as negociações da administração pública sejam formalmente registradas e fundamentadas, permitindo a fiscalização de lisura.",
      },
    ],
  },
};

function toQQ(
  quiz: { questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[] } | undefined,
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
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos da Negociação" },
  { id: "modulo-2", label: "Módulo 2", title: "Negociação Aplicada ao Suprimento" },
] as const;

export default function AulaEstrategiasNegociacao(props: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_estrategias_negociacao_";

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
      const newSet = new Set(completedModules).add(moduleId);
      updateCompletedModules(Array.from(newSet));
      const progress = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      props.onUpdateProgress?.(progress);
      if (moduleId === "modulo-2") {
        props.onComplete?.();
      }
    }
  };

  const getModuleVariant = (num: number) => {
    const variants = ["cyan", "emerald", "amber", "rose", "blue"] as const;
    return variants[(num - 1) % variants.length];
  };

  const renderModulo1 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={1}
        titulo="Fundamentos da Negociação"
        descricao="Tipos de negociação, preparação, BATNA e habilidades essenciais."
        variant={getModuleVariant(1)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="A Arte de Negociar no Suprimento"
          description="Domine estratégias que fazem a diferença entre o bom e o excelente comprador."
          variant={getModuleVariant(1)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
          <p>
            A <strong>negociação</strong> é uma habilidade fundamental no mundo dos negócios, essencial para a tomada de decisões, resolução de conflitos e estabelecimento de parcerias bem-sucedidas. No contexto empresarial dinâmico de hoje, entender e aplicar estratégias de negociação eficazes é de suma importância para alcançar objetivos, construir relacionamentos sólidos e impulsionar o crescimento.
          </p>
          <p>
            No contexto da Petrobras e de provas CESGRANRIO, o profissional de suprimentos precisa dominar técnicas de negociação que garantam o melhor custo-benefício sem comprometer a qualidade e a segurança das operações.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Negociação Integrativa vs. Distributiva</h3>
          <p>
            A negociação pode ser abordada de duas maneiras fundamentais:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-3">🤝 Integrativa (Ganha-Ganha)</h4>
              <p className="text-base text-muted-foreground">
                As partes buscam soluções que atendam aos <strong>interesses mútuos</strong> e maximizem o valor total. O foco é na colaboração, criando valor para ambos os lados.
              </p>
              <p className="text-xl mt-3 font-medium text-emerald-700 dark:text-emerald-300 text-foreground/85 leading-relaxed">
                Ideal para: parcerias de longo prazo, desenvolvimento de fornecedores.
              </p>
            </div>
            <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-xl">
              <h4 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-3">⚔️ Distributiva (Ganha-Perde)</h4>
              <p className="text-base text-muted-foreground">
                Envolve a <strong>divisão de recursos limitados</strong>. Resulta em concessões de uma parte para beneficiar a outra. O recurso é fixo ("bolo" finito).
              </p>
              <p className="text-xl mt-3 font-medium text-rose-700 dark:text-rose-300 text-foreground/85 leading-relaxed">
                Típica em: leilões, commodities, negociação de preço puro.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Preparação: A Chave do Sucesso</h3>
          <p>
            Uma negociação eficaz começa <strong>muito antes das conversas reais</strong>. A preparação é essencial para entender os interesses, necessidades e limitações de ambas as partes. Isso inclui:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Pesquisa sobre a outra parte:</strong> Histórico, capacidade financeira, mercado de atuação e reputação.</li>
            <li><strong>Definição de metas claras:</strong> Qual é o resultado ideal? E o mínimo aceitável?</li>
            <li><strong>Identificação de alternativas viáveis:</strong> Quais opções existem se a negociação não avançar?</li>
            <li><strong>Mapeamento de concessões:</strong> O que estou disposto a ceder? O que é inegociável?</li>
          </ul>

          <AlertBox tipo="info" titulo="CESGRANRIO cobra isto!">
            A banca frequentemente questiona sobre as etapas de preparação de uma negociação e a diferença conceitual entre negociação integrativa e distributiva. Memorize as características de cada abordagem!
          </AlertBox>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">BATNA — Sua Melhor Alternativa</h3>
          <p>
            O conceito de <strong>BATNA (Best Alternative To a Negotiated Agreement)</strong> — Melhor Alternativa para um Acordo Negociado — enfatiza a importância de ter alternativas claras em mente antes de negociar. Compreender as opções disponíveis caso não se chegue a um acordo é essencial para tomar decisões informadas durante as discussões.
          </p>
          <p>
            Uma <strong>BATNA forte</strong> fortalece a posição de negociação e dá confiança para buscar um acordo mutuamente benéfico. Já uma BATNA fraca (como depender de um único fornecedor — <em>sole sourcing</em>) deixa o negociador vulnerável a pressões e concessões indevidas.
          </p>

          <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">
              🧠 Exemplo Prático (BATNA)
            </span>
            <p className="text-base text-foreground mt-2">
              O Técnico de Suprimentos da Petrobras está negociando a compra de válvulas especiais. Se ele tem <strong>3 fornecedores homologados</strong> capazes de fornecer, seu BATNA é forte — pode recusar propostas insatisfatórias. Se há <strong>apenas 1 fornecedor exclusivo</strong> (proprietário de patente), o BATNA é fraco, e o poder de barganha diminui drasticamente.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Habilidades de Comunicação e Escuta Ativa</h3>
          <p>
            A comunicação é a base de negociações bem-sucedidas. É importante expressar claramente seus objetivos e entender as necessidades da outra pessoa. <strong>Habilidades de escuta ativa</strong> são fundamentais para obter compreensão profunda das preocupações e perspectivas da outra parte.
          </p>
          <p>
            A comunicação eficaz promove a colaboração e cria um ambiente que constrói <strong>relacionamentos duradouros</strong> — especialmente importante em cadeias de suprimentos onde os mesmos fornecedores são recorrentes ao longo de anos.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Táticas de Persuasão Ética</h3>
          <p>
            A persuasão é uma poderosa ferramenta de negociação. Estratégias eficazes incluem:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Argumentos convincentes</strong> baseados em dados e evidências concretas.</li>
            <li><strong>Destaque de benefícios mútuos</strong> — mostrar como o acordo beneficia ambas as partes.</li>
            <li><strong>Senso de urgência legítimo</strong> — prazos reais e consequências de não agir.</li>
            <li><strong>Ancoragem</strong> — estabelecer referências de preço ou condições que sirvam de ponto de partida.</li>
          </ul>

          <AlertBox tipo="warning" titulo="⚠️ Linha Ética">
            É crucial empregar táticas de persuasão de maneira <strong>ética</strong>, evitando práticas manipulativas que possam comprometer a confiança. Em empresas estatais, a ética nas negociações é fiscalizada por órgãos de controle como o TCU.
          </AlertBox>

          <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg mb-2">
              💡 Resumo de Ouro — Módulo 1
            </span>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Integrativa:</strong> Ganha-ganha, colaboração, valor mútuo.</li>
              <li>✓ <strong>Distributiva:</strong> Ganha-perde, divisão de recursos limitados.</li>
              <li>✓ <strong>Preparação:</strong> Pesquisa + metas + alternativas = poder de barganha.</li>
              <li>✓ <strong>BATNA:</strong> Quanto mais alternativas, mais forte sua posição.</li>
              <li>✓ <strong>Comunicação:</strong> Escuta ativa + expressão clara = relacionamento duradouro.</li>
              <li>✓ <strong>Persuasão:</strong> Ética + dados + benefícios mútuos = confiança.</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={1}
        variant={getModuleVariant(1)}
        resumoVisual={{
          moduloNome: "Módulo 1",
          tituloAula: "Fundamentos da Negociação",
          materia: "Suprimento",
          images: [
            { title: "Integrativa vs Distributiva", type: "Comparativo", placeholderColor: "bg-cyan-500/20" },
            { title: "BATNA — Fluxo de Decisão", type: "Fluxograma", placeholderColor: "bg-cyan-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Negociar é Preparar",
          content: (
            <>
              <div className="text-6xl my-6 animate-pulse text-center">🤝 🎯</div>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                &quot;A melhor negociação não é aquela onde você vence, mas aquela onde ambas as partes saem satisfeitas e querem negociar de novo.&quot;
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                  <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">BATNA Forte</h4>
                  <p className="text-lg text-muted-foreground italic">
                    Múltiplas alternativas = poder de barganha. Você define os termos.
                  </p>
                </div>
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">BATNA Fraco</h4>
                  <p className="text-lg text-muted-foreground italic">
                    Sem alternativas = vulnerabilidade. O fornecedor define os termos.
                  </p>
                </div>
              </div>
            </>
          ),
        }}
        podcast={{
            aulaId: "estrategiasnegociacao",
            aulaTitulo: "Estrategias Negociacao",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <div className="space-y-6">
        <ModuleSectionHeader
          index={1}
          variant={getModuleVariant(1)}
          title="Análise C.E.D.E."
          description="Fundamentos de Negociação na prova."
        />
        <ContentAccordion
          mode="stacked"
          slides={[
            {
              titulo: "Conceituação: Os Dois Modelos",
              icone: <LuBrain />,
              conteudo: (
                <div className="space-y-4">
                  <p>
                    A negociação pode ser <strong>Integrativa</strong> (ganha-ganha, foco em criar valor e interesses mútuos) ou <strong>Distributiva</strong> (ganha-perde, foco em dividir um recurso fixo).
                  </p>
                  <AlertBox tipo="info" titulo="Equilíbrio">
                    O equilíbrio entre abordagens integrativa e distributiva depende do contexto e dos objetivos específicos da negociação. Parcerias de longo prazo pedem abordagem integrativa.
                  </AlertBox>
                </div>
              ),
            },
            {
              titulo: "Exemplificação: BATNA na Prática",
              icone: <LuBookOpen />,
              conteudo: (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <p className="text-base">
                      <strong>Caso real:</strong> Um comprador da Petrobras precisa adquirir equipamentos de mergulho para manutenção submarina. Com apenas um fabricante mundial certificado (sole sourcing), seu BATNA é extremamente fraco. A estratégia passa a ser negociação integrativa de longo prazo, buscando contratos plurianuais com cláusulas de reajuste previsíveis.
                    </p>
                  </div>
                </div>
              ),
            },
            {
              titulo: "Dicas: Preparação Estratégica",
              icone: <LuFileText />,
              conteudo: (
                <div className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Zona de Acordo Possível (ZOPA):</strong> Identifique a faixa de valores onde ambas as partes podem chegar a um acordo.</li>
                    <li><strong>Ponto de Reserva:</strong> O valor mínimo (ou máximo) que você aceita antes de abandonar a negociação.</li>
                    <li><strong>Ancoragem:</strong> Quem faz a primeira oferta estabelece o referencial. Use com dados de mercado sólidos.</li>
                  </ul>
                </div>
              ),
            },
            {
              titulo: "Exceções: Limites Legais",
              icone: <LuSearch />,
              conteudo: (
                <div className="space-y-4">
                  <AlertBox tipo="warning" titulo="Empresas Estatais">
                    Em empresas estatais, a negociação é limitada pela Lei 13.303/16 e pelo RLCP. Não é permitido negociar livremente como no setor privado — os limites de preço, as condições de pagamento e os critérios de julgamento são definidos no edital/instrumento convocatório.
                  </AlertBox>
                </div>
              ),
            },
            {
              titulo: "⚡ Raio-X CESGRANRIO — Conceitos de Ouro",
              icone: <LuSearch />,
              conteudo: (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    A banca exige conhecimento preciso sobre os termos e dinâmica de negociação de Harvard. <strong>Tópicos mais cobrados:</strong>
                  </p>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-amber-700 dark:text-amber-300">
                      🥇 BATNA vs. Poder de Barganha
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      O seu poder de barganha é diretamente proporcional à força do seu <strong>BATNA</strong>. Se você tiver múltiplos fornecedores homologados (BATNA forte), pode caminhar para fora da mesa. Em regime de exclusividade (sole source), o fornecedor dita as regras.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300">
                      🥈 ZOPA (Zona de Possível Acordo)
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      É a interseção entre o preço máximo que o comprador aceita pagar e o preço mínimo que o vendedor aceita receber. Se não houver interseção, o acordo é <strong>impossível</strong>.
                    </p>
                    <p className="text-lg text-foreground/85 leading-relaxed">Comprador aceita até R$100 | Vendedor aceita mín. R$80 → ZOPA = R$80 a R$100</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-emerald-700 dark:text-emerald-300">
                      🥉 Estratégias de Sourcing (Muito cobrado!)
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="text-lg text-foreground/85 leading-relaxed w-full">
                        <thead>
                          <tr className="bg-emerald-100 dark:bg-emerald-950/40">
                            <th className="p-2 text-left">Estratégia</th>
                            <th className="p-2 text-left">Característica</th>
                            <th className="p-2 text-left">Risco</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-gray-300">
                          <tr className="border-b"><td className="p-2">Sole Source</td><td className="p-2">Único fornecedor existente no mercado</td><td className="p-2">Altíssimo (sem alternativa)</td></tr>
                          <tr className="border-b"><td className="p-2">Single Source</td><td className="p-2">Único fornecedor por escolha estratégica</td><td className="p-2">Alto (decisão gerenciável)</td></tr>
                          <tr><td className="p-2">Multiple Source</td><td className="p-2">Múltiplos fornecedores simultâneos</td><td className="p-2">Baixo (BATNA sempre forte)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border font-mono text-xl text-foreground/85 leading-relaxed">
                    <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">🧠 Macete de Código:</p>
                    <p className="text-gray-600 dark:text-gray-400">BATNA FORTE → você pode sair da mesa → poder de barganha máximo</p>
                    <p className="text-gray-600 dark:text-gray-400">BATNA FRACO → você precisa do acordo → fornecedor tem o poder</p>
                    <p className="text-gray-600 dark:text-gray-400">SEM ZOPA → negociação falha, sem acordo possível</p>
                    <p className="text-gray-600 dark:text-gray-400">TCO ≠ preço → inclui frete + manutenção + descarte + risco</p>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>

      <QuizInterativo
        titulo="Fundamentos da Negociação"
        numero={1}
        variant={getModuleVariant(1)}
        questoes={toQQ(QUIZ_NEGOCIACAO["modulo-1"])}
        onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
      />
    </div>
  );

  const renderModulo2 = () => (
    <div className="space-y-6">
      <ModuleBanner
        numero={2}
        titulo="Negociação Aplicada ao Suprimento"
        descricao="Aplicações práticas das estratégias no contexto de compras e contratações."
        variant={getModuleVariant(2)}
      />

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
        <ModuleSectionHeader
          index="INTRO"
          title="Negociação no Dia a Dia do Suprimento"
          description="Como as estratégias de negociação se aplicam no contexto real de compras."
          variant={getModuleVariant(2)}
        />

        <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
          <p>
            No contexto de <strong>Suprimento de Bens e Serviços</strong>, a negociação não é apenas sobre preço. O profissional de suprimentos negocia prazos de entrega, condições de pagamento, garantias, assistência técnica, penalidades contratuais e cláusulas de reajuste. A maestria em negociação transforma o técnico de suprimentos em um verdadeiro <strong>gestor de valor</strong>.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Negociação em Diferentes Cenários</h3>

          <div className="space-y-4">
            <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">📋 Licitações e Pregões</h4>
              <p className="text-base text-muted-foreground">
                Em licitações, a &quot;negociação&quot; ocorre na <strong>fase de lances</strong> (pregão) ou na <strong>fase de negociação</strong> prevista na Lei 13.303/16. O comprador pode negociar com o licitante melhor classificado para obter condições mais vantajosas, desde que respeitados os limites do edital e a isonomia.
              </p>
            </div>
            <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">🔄 Contratos de Longo Prazo</h4>
              <p className="text-base text-muted-foreground">
                Contratos plurianuais exigem negociação integrativa: cláusulas de <strong>reajuste indexado</strong>, gatilhos de revisão, metas de desempenho e bônus/penalidades equilibrados. O objetivo é garantir sustentabilidade para ambas as partes ao longo dos anos.
              </p>
            </div>
            <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-xl">
              <h4 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-2">⚡ Compras Emergenciais</h4>
              <p className="text-base text-muted-foreground">
                Em situações de emergência (Art. 29, XV da Lei 13.303/16), a negociação é rápida e focada. O BATNA é fraco (urgência), então o foco é garantir <strong>disponibilidade imediata</strong> e <strong>preço compatível com o mercado</strong>, documentando justificativas para os órgãos de controle.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Competências do Negociador de Suprimentos</h3>
          <p>
            O profissional de suprimentos eficaz desenvolve competências que vão além do conhecimento técnico:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li><strong>Inteligência Emocional:</strong> Manter a calma sob pressão e não reagir emocionalmente a provocações.</li>
            <li><strong>Pensamento Analítico:</strong> Avaliar propostas com base em dados, TCO e análise de riscos.</li>
            <li><strong>Conhecimento de Mercado:</strong> Entender as dinâmicas de oferta e demanda do setor.</li>
            <li><strong>Visão Sistêmica:</strong> Enxergar impactos das decisões de compra em toda a cadeia de suprimentos.</li>
            <li><strong>Ética e Compliance:</strong> Atuar dentro dos limites legais e dos códigos de conduta corporativos.</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Erros Comuns em Negociação</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-rose-500/5 rounded-lg">
              <span className="text-2xl">❌</span>
              <div>
                <p className="font-bold text-rose-600 dark:text-rose-400">Focar apenas no preço</p>
                <p className="text-xl text-foreground/85 leading-relaxed">Ignorar qualidade, prazo, garantia e TCO pode custar muito mais no longo prazo.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-rose-500/5 rounded-lg">
              <span className="text-2xl">❌</span>
              <div>
                <p className="font-bold text-rose-600 dark:text-rose-400">Negociar sem preparação</p>
                <p className="text-xl text-foreground/85 leading-relaxed">Entrar em uma negociação sem dados de mercado é ceder o controle para a outra parte.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-rose-500/5 rounded-lg">
              <span className="text-2xl">❌</span>
              <div>
                <p className="font-bold text-rose-600 dark:text-rose-400">Ignorar o relacionamento</p>
                <p className="text-xl text-foreground/85 leading-relaxed">Tratar fornecedor como adversário destrói parcerias estratégicas de longo prazo.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-rose-500/5 rounded-lg">
              <span className="text-2xl">❌</span>
              <div>
                <p className="font-bold text-rose-600 dark:text-rose-400">Fazer concessões sem contrapartida</p>
                <p className="text-xl text-foreground/85 leading-relaxed">Toda concessão deve ser trocada por algo de valor equivalente (princípio da reciprocidade).</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">
              💡 Resumo de Ouro — Módulo 2
            </span>
            <ul className="text-lg space-y-1 text-foreground">
              <li>✓ <strong>Licitações:</strong> Negociação ocorre na fase de lances/negociação, respeitando o edital.</li>
              <li>✓ <strong>Contratos Longos:</strong> Abordagem integrativa com cláusulas equilibradas.</li>
              <li>✓ <strong>Emergência:</strong> BATNA fraco, foco em disponibilidade e preço de mercado.</li>
              <li>✓ <strong>Competências:</strong> Inteligência emocional + análise + mercado + ética.</li>
              <li>✓ <strong>Evite:</strong> Foco só em preço, falta de preparação, ignorar relacionamento.</li>
            </ul>
          </div>
        </div>
      </section>

      <ModuleConsolidation
        index={2}
        variant={getModuleVariant(2)}
        resumoVisual={{
          moduloNome: "Módulo 2",
          tituloAula: "Negociação Aplicada",
          materia: "Suprimento",
          images: [
            { title: "Negociação na Petrobras", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
            { title: "Sole Sourcing — Alternativas", type: "Fluxograma", placeholderColor: "bg-cyan-500/20" },
          ],
        }}
        sinteseEstrategica={{
          title: "Inteligência Comercial",
          content: (
            <>
              <div className="text-6xl my-6 animate-pulse text-center">📊 💼</div>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                A aplicação prática de negociação em suprimentos exige flexibilidade, cumprimento de normas e entendimento profundo de custos e alternativas (TCO e BATNA).
              </p>
            </>
          ),
        }}
      podcast={{
            aulaId: "estrategiasnegociacao",
            aulaTitulo: "Estrategias Negociacao",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <div className="space-y-6">
        <ModuleSectionHeader
          index={2}
          variant={getModuleVariant(2)}
          title="Análise C.E.D.E."
          description="Estratégias aplicadas ao suprimento."
        />
        <ContentAccordion
          mode="stacked"
          slides={[
            {
              titulo: "Exemplificação: Competências Essenciais",
              icone: <LuBookOpen />,
              conteudo: (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <p className="text-base">
                      <strong>Caso real:</strong> Durante a negociação de um contrato de manutenção offshore, o negociador percebeu que o fornecedor tinha capacidade ociosa. Em vez de pressionar por desconto (distributiva), propôs ampliar o escopo do contrato com exclusividade regional (integrativa), obtendo 15% de redução no valor unitário e garantia de atendimento prioritário.
                    </p>
                  </div>
                </div>
              ),
            },
            {
              titulo: "Dicas: Erros Fatais",
              icone: <LuFileText />,
              conteudo: (
                <div className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Não confunda preço com custo:</strong> O TCO (Custo Total de Propriedade) deve guiar a negociação.</li>
                    <li><strong>Documente tudo:</strong> Em empresas estatais, toda negociação deve ser registrada e justificada.</li>
                    <li><strong>Reciprocidade:</strong> Nunca faça concessão sem obter algo em troca.</li>
                  </ul>
                </div>
              ),
            },
            {
              titulo: "Exceções: Sole Sourcing",
              icone: <LuSearch />,
              conteudo: (
                <div className="space-y-4">
                  <AlertBox tipo="warning" titulo="Fornecedor Exclusivo">
                    Quando há sole sourcing (fornecedor único por motivos tecnológicos/patentes), a estratégia muda completamente. Sem BATNA, o foco deve ser em contratos de longo prazo com cláusulas de proteção, benchmarks internacionais de preço e desenvolvimento de fontes alternativas a médio prazo.
                  </AlertBox>
                </div>
              ),
            },
            {
              titulo: "⚡ Raio-X CESGRANRIO — Aplicação Petrobras",
              icone: <LuSearch />,
              conteudo: (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Nas licitações da Petrobras regidas pela Lei 13.303/16, o processo de negociação segue limites rígidos:
                  </p>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-amber-700 dark:text-amber-300">
                      Negociação na Lei das Estatais
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      Após o julgamento e classificação, o pregoeiro/comprador <strong>deve negociar</strong> com o licitante vencedor para obter termos ainda mais vantajosos. Isso visa à economicidade e eficiência pública.
                    </p>
                  </div>
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl space-y-2">
                    <h5 className="font-bold text-red-700 dark:text-red-300">
                      Risco de Emergências
                    </h5>
                    <p className="text-xl text-gray-700 text-foreground/85 leading-relaxed">
                      Em compras emergenciais (inundação, falha crítica offshore), o comprador tem um BATNA extremamente fraco e o fornecedor tenta elevar preços. O papel do comprador é buscar benchmarks históricos e justificar a compatibilidade de preços perante o TCU.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
        />
        <QuizInterativo
          titulo="Negociação Aplicada ao Suprimento"
          numero={2}
          variant={getModuleVariant(2)}
          questoes={toQQ(QUIZ_NEGOCIACAO["modulo-2"])}
          onComplete={(score: number) => handleQuizComplete("modulo-2", score)}
        />
      </div>
    </div>
  );

  return (
    <AulaTemplate
      {...props}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la.">
      <TabsContent value="modulo-1" className="mt-0">
        {renderModulo1()}
      </TabsContent>
      <TabsContent value="modulo-2" className="mt-0">
        {renderModulo2()}
      </TabsContent>
    </AulaTemplate>
  );
}
