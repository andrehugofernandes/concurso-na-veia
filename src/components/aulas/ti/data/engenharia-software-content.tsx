import React from "react";

export interface FlipCardItem {
  frontIcon: string;
  frontTitle: string;
  backTitle: string;
  backContent: string;
}

export interface AccordionSlideItem {
  conteudo: React.ReactNode;
}

export interface AccordionDef {
  titulo: string;
  icone: string;
  corIndicador: string;
  defaultOpen?: boolean;
  mode?: string;
  slides: AccordionSlideItem[];
}

export interface SectionDef {
  index: string;
  title: string;
  accordions: AccordionDef[];
  flipCards?: FlipCardItem[];
}

export interface ConsolidationDef {
  sinteseEstrategica: {
    title: string;
    content: React.ReactNode;
  };
  resumoVisual: {
    moduloNome: string;
    tituloAula: string;
    materia: string;
    images?: {
      title: string;
      type: string;
      placeholderColor: string;
      imageUrl?: string;
    }[];
  };
  podcast: {
    aulaId: string;
    aulaTitulo: string;
    materia: string;
    materiaId: string;
    moduloNumero: number;
    moduloTitulo: string;
    conteudoResumo: string;
  };
}

export interface ModuleData {
  secoes: SectionDef[];
  consolidation: ConsolidationDef;
}

export const MODULE_CONTENTS: Record<number, ModuleData> = {
  1: {
    secoes: [
      {
        index: "INTRO",
        title: "Processos de Software e Modelos de Maturidade",
        accordions: [
          {
            titulo: "C.E.D.E.A - Fundamentos de Processos e CMMI",
            icone: "⚙️",
            corIndicador: "bg-blue-500",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>A Engenharia de Software nasceu da necessidade de domar o caos inerente ao desenvolvimento de sistemas complexos. Na Petrobras, onde falhas de software podem interromper operações críticas de exploração e refino, ou vazar dados confidenciais de licitações, a criação de software não pode ser uma arte baseada no heroísmo individual, mas sim uma disciplina pautada por processos rigorosos e repetíveis. O foco das bancas de alto nível, especialmente a CESGRANRIO, é cobrar exatamente como essas organizações estruturam seus métodos para garantir a qualidade final do produto.</p>
                      
                      <p>Historicamente, a crise do software evidenciou que orçamentos estourados e prazos ignorados eram sintomas de uma falta de padronização nas atividades fundamentais: especificação, projeto, validação e evolução. Para combater isso, o mercado desenvolveu frameworks de governança e avaliação de maturidade. Entender um Processo de Software significa compreender o conjunto de atividades, métodos e ferramentas que as equipes utilizam para transformar a necessidade de um cliente em uma solução de software implantada e mantida de forma sustentável ao longo do tempo.</p>
                      
                      {/* Explicação */}
                      <p>O modelo CMMI (Capability Maturity Model Integration) é o principal framework exigido nos editais, atuando como um guia para a melhoria de processos organizacionais. Ele avalia o nível de maturidade de uma empresa de desenvolvimento de software em uma escala de 1 a 5. O Nível 1 (Inicial) é caótico e dependente de heróis. O Nível 2 (Gerenciado) estabelece a disciplina básica focada no <strong>projeto</strong>, garantindo que cronogramas e requisitos sejam repetíveis em projetos similares. É neste nível que as práticas básicas de gestão são implementadas e estabilizadas, tirando a organização do caos absoluto.</p>
                      
                      <p>Avançando na escala, o Nível 3 (Definido) é o ponto de virada onde os processos deixam de ser específicos de um projeto e passam a ser o padrão da <strong>organização</strong> como um todo. O Nível 4 (Gerenciado Quantitativamente) introduz a medição estatística rigorosa, onde o processo é controlado numericamente. Finalmente, o Nível 5 (Em Otimização) foca na melhoria contínua e na prevenção de defeitos através da inovação tecnológica. A norma ISO/IEC 12207, por sua vez, complementa o CMMI estabelecendo um padrão internacional para a arquitetura do ciclo de vida, dividindo os processos em Primários (ex: desenvolvimento), de Apoio (ex: garantia da qualidade) e Organizacionais (ex: treinamento).</p>
                      
                      {/* Demonstração */}
                      <p>Na prática, considere uma equipe que precisa desenvolver o novo portal de relacionamento com fornecedores da Petrobras. Em uma organização de Nível 1 (CMMI), a equipe escreve o código diretamente (Code-and-Fix), sem requisitos claros. Se o desenvolvedor principal sair da empresa, o projeto colapsa. Em uma organização de Nível 2, a mesma equipe estabeleceria planos de projeto, controle de configuração (versão) e monitoraria os requisitos. Eles documentam o que fazem para que possam repetir o sucesso em um portal futuro, mas o processo ainda é focado estritamente na gestão daquele portal específico.</p>
                      
                      <p>Se esta organização estivesse no Nível 3 (Definido), a equipe do portal não precisaria inventar sua própria metodologia; eles acessariam o repositório de ativos de processos da organização (OPA) e usariam as diretrizes corporativas padronizadas. No Nível 4, a liderança saberia estatisticamente que o portal teria, por exemplo, 0.5 bugs por mil linhas de código, baseando-se em métricas históricas de variação de processo. No Nível 5, se um bug crítico fosse detectado na etapa de testes, a equipe não apenas o corrigiria, mas utilizaria análises de causa raiz para alterar o processo padrão da empresa e garantir que aquele tipo de bug nunca mais fosse injetado no código desde a sua concepção inicial.</p>
                      
                      {/* Expansão */}
                      <p>O MPS.BR (Melhoria de Processos do Software Brasileiro) surge como uma resposta nacional e mais flexível, adaptada à realidade das pequenas e médias empresas, mas frequentemente cobrada de forma comparativa ao CMMI. Enquanto o CMMI (na representação por estágios) possui 5 níveis de maturidade, o MPS.BR possui 7 níveis de maturidade (de G a A). Uma das pegadinhas clássicas é a correlação entre os níveis: o Nível G (Parcialmente Gerenciado) e F (Gerenciado) do MPS.BR equivalem juntos ao Nível 2 do CMMI. O nível E, D e C do MPS.BR representam estágios gradativos do Nível 3 do CMMI, permitindo que a empresa evolua sem o choque abrupto do modelo americano.</p>
                      
                      <p>Essa granularidade maior do MPS.BR resolve o problema crônico de estagnação das empresas no Nível 2 do CMMI, pois a transição para o Nível 3 era muito pesada. Além disso, a arquitetura do MPS.BR baseia-se fortemente na ISO 12207 para definir os seus processos (o "o quê" fazer) e na ISO 15504 (SPICE) para estabelecer como avaliar a capacidade desses processos. Portanto, um profissional de TI deve compreender que o MPS.BR não reinventa a roda, mas empacota padrões internacionais (ISO) em um modelo de avaliação mais aderente ao ecossistema brasileiro de TI.</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>A CESGRANRIO tem um perfil metodológico implacável quando cobra Engenharia de Software. Em provas para Analista de Sistemas, a banca foca incisivamente na diferença de escopo entre o Nível 2 e o Nível 3 do CMMI. A palavra-chave que separa os dois é o <strong>domínio do processo</strong>: se a questão fala que o processo é planejado, executado, medido e controlado em um escopo restrito de "projetos", a resposta é Nível 2 (Gerenciado). Se a banca menciona que o processo é padronizado e proativo para toda a "organização", a resposta é Nível 3 (Definido).</p>
                      
                      <p>Outra "armadilha" típica da CESGRANRIO envolve as áreas de processo (PAs - Process Areas) e as representações do CMMI (Contínua vs Por Estágios). Lembre-se: a representação Contínua mede a <em>Capacidade</em> (Níveis 0 a 3) de áreas de processos individuais (permite focar apenas nas áreas que a empresa mais precisa no momento), enquanto a representação Por Estágios mede a <em>Maturidade</em> (Níveis 1 a 5) de toda a organização através de pacotes de áreas de processo. As questões frequentemente invertem esses conceitos, afirmando que a representação por estágios foca em processos individuais (ERRADO), exigindo do candidato o reflexo imediato para identificar a contradição conceitual.</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuCheck",
            frontTitle: "CMMI Nível 2 vs Nível 3",
            backTitle: "O Escopo de Atuação",
            backContent: "O Nível 2 (Gerenciado) é reativo e focado nos processos de um PROJETO específico. O Nível 3 (Definido) é proativo, onde processos são padronizados e pertencem à ORGANIZAÇÃO, aplicados em todos os projetos.",
          },
          {
            frontIcon: "LuBarChart3",
            frontTitle: "CMMI Nível 4 vs Nível 5",
            backTitle: "Métricas vs Prevenção",
            backContent: "O Nível 4 (Gerenciado Quantitativamente) mede e controla a variação do processo usando ESTATÍSTICA (métricas). O Nível 5 (Em Otimização) usa os dados para PREVENIR defeitos sistematicamente e aplicar inovações tecnológicas.",
          },
          {
            frontIcon: "LuNetwork",
            frontTitle: "Contínuo vs Estágios (CMMI)",
            backTitle: "Capacidade vs Maturidade",
            backContent: "Representação CONTÍNUA mede a CAPACIDADE (níveis 0 a 3) de um processo específico escolhido pela empresa. Representação POR ESTÁGIOS mede a MATURIDADE (níveis 1 a 5) da organização como um todo (conjunto de processos engessado).",
          },
          {
            frontIcon: "LuFlag",
            frontTitle: "MPS.BR (Níveis G e F)",
            backTitle: "A Equivalência CMMI",
            backContent: "No MPS.BR, o Nível G (Parcialmente Gerenciado) e o Nível F (Gerenciado) juntos correspondem ao Nível 2 do CMMI. O MPS.BR tem 7 níveis (G a A) para facilitar a implementação gradativa (foco em PMEs).",
          },
          {
            frontIcon: "LuBookOpen",
            frontTitle: "ISO/IEC 12207",
            backTitle: "Processos do Ciclo de Vida",
            backContent: "Norma internacional que estabelece uma estrutura comum para o ciclo de vida do software. Divide os processos em três grandes blocos: Processos Primários (ex: aquisição, desenvolvimento), de Apoio (ex: garantia de qualidade) e Organizacionais.",
          },
          {
            frontIcon: "LuTarget",
            frontTitle: "Pegadinha CESGRANRIO (Processo)",
            backTitle: "Modelo vs Padrão",
            backContent: "A banca tenta confundir CMMI com uma metodologia ágil ou com a ISO 12207. Lembre-se: CMMI é um MODELO de avaliação da MATURIDADE/QUALIDADE, enquanto a ISO 12207 define o PADRÃO de processos (o que deve existir no ciclo de vida).",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "A Frase para os Níveis do CMMI (Por Estágios)",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-4 shadow-inner border border-slate-700">
            <p className="text-xl font-bold text-center leading-relaxed">
              "Eu <span className="text-red-400">I</span>nicialmente <span className="text-blue-400">G</span>erenciei <span className="text-emerald-400">D</span>etalhes <span className="text-amber-400">Q</span>uantitativos <span className="text-purple-400">O</span>timizados."
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mt-6">
              <div className="bg-slate-800 p-3 rounded-lg"><span className="text-2xl block mb-2">🔥</span><span className="font-bold text-red-400">1. Inicial</span><br/><span className="text-sm opacity-80">Caos</span></div>
              <div className="bg-slate-800 p-3 rounded-lg"><span className="text-2xl block mb-2">🛡️</span><span className="font-bold text-blue-400">2. Gerenciado</span><br/><span className="text-sm opacity-80">Projetos</span></div>
              <div className="bg-slate-800 p-3 rounded-lg"><span className="text-2xl block mb-2">🏛️</span><span className="font-bold text-emerald-400">3. Definido</span><br/><span className="text-sm opacity-80">Organização</span></div>
              <div className="bg-slate-800 p-3 rounded-lg"><span className="text-2xl block mb-2">📊</span><span className="font-bold text-amber-400">4. Quantitativo</span><br/><span className="text-sm opacity-80">Métricas/Estatística</span></div>
              <div className="bg-slate-800 p-3 rounded-lg"><span className="text-2xl block mb-2">🚀</span><span className="font-bold text-purple-400">5. Otimizado</span><br/><span className="text-sm opacity-80">Prevenção/Inovação</span></div>
            </div>
            <p className="text-center text-sm mt-4 italic opacity-75">Níveis de maturidade - Decore a ordem e a palavra-chave central.</p>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 1",
        tituloAula: "Processos e Maturidade",
        materia: "Engenharia de Software",
        images: [
          {
            title: "Maturidade CMMI vs MPS.BR",
            type: "Diagrama Comparativo",
            placeholderColor: "blue",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bbda38a5f452?q=80&w=2070&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 1,
        moduloTitulo: "Processos e CMMI",
        conteudoResumo: "Revisão imersiva sobre CMMI, MPS.BR e os paradigmas de maturidade exigidos pela CESGRANRIO.",
      }
    }
  },
  
  2: {
    secoes: [
      {
        index: "INTRO",
        title: "Modelos de Ciclo de Vida: Do Cascata ao RUP",
        accordions: [
          {
            titulo: "C.E.D.E.A - Paradigmas do Ciclo de Vida de Software",
            icone: "🔄",
            corIndicador: "bg-emerald-500",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>A construção de software em larga escala não difere essencialmente da engenharia tradicional no que diz respeito à necessidade de fases bem definidas, mas difere profundamente na invisibilidade do seu produto e na mutabilidade extrema de seus requisitos. Modelos de Ciclo de Vida foram criados para organizar o trabalho humano (frequentemente imprevisível) em fases encadeadas, desde a análise do problema até a retirada do software de operação (descomissionamento). Em órgãos com cultura de auditoria pesada, compreender os ciclos de vida tradicionais e modernos é vital, pois a falha na execução de um modelo adequado compromete não apenas o orçamento, mas a própria legalidade das contratações de TI.</p>
                      
                      <p>Durante décadas, a indústria tentou aplicar os modelos de fabricação em série (engenharia civil ou manufatura) à criação de software, o que resultou no clássico modelo em Cascata. Com a percepção tardia de que softwares mudam mais rápido do que concreto, novos modelos iterativos, incrementais e focados em análise de risco nasceram. A banca CESGRANRIO exige que o candidato domine profundamente a taxonomia de Boehm e de Sommerville, conhecendo os prós e os contras de cada modelo, bem como os cenários ideais em que cada um deve ser aplicado (sistemas críticos vs sistemas de inovação acelerada).</p>
                      
                      {/* Explicação */}
                      <p>O Modelo em <strong>Cascata (Waterfall)</strong> é o avô de todos os modelos, caracterizado por ser um processo puramente sequencial e guiado por documentos. Cada fase (Requisitos, Projeto, Implementação, Testes, Manutenção) deve ser concluída, revisada e "congelada" antes que a próxima inicie. É um modelo de alto controle e rastreabilidade, mas de baixíssima flexibilidade, pois acomodar mudanças em fases tardias tem um custo proibitivo. Já a abordagem <strong>Iterativa e Incremental</strong> rompe com essa linearidade. No modelo incremental, o software é desenvolvido e entregue em partes menores e funcionais (incrementos), agregando valor ao usuário mais cedo. A iteração, por sua vez, permite refinar (retrabalhar) o produto em ciclos repetidos, baseando-se no feedback do cliente.</p>
                      
                      <p>Barry Boehm, percebendo as deficiências do Cascata, criou o <strong>Modelo em Espiral</strong>, o primeiro framework a colocar a <em>análise de riscos</em> como o coração do processo de desenvolvimento. A Espiral é composta por loops contínuos de planejamento, análise de riscos, engenharia e avaliação. Outro gigante dos ciclos de vida é o <strong>RUP (Rational Unified Process)</strong>, um framework de processo pesado, iterativo, dirigido por casos de uso e centrado na arquitetura. O RUP possui quatro fases bem marcadas que o candidato deve saber de cor: Concepção (Inception - foco em viabilidade e escopo), Elaboração (Elaboration - foco na mitigação de riscos técnicos e estabilização da arquitetura), Construção (Construction - foco na codificação massiva das features) e Transição (Transition - implantação e entrega ao usuário final).</p>
                      
                      {/* Demonstração */}
                      <p>Para visualizar a diferença estrutural, imagine que a Petrobras deseja construir o software embarcado para o controle de um ROV (Veículo Operado Remotamente) de águas ultraprofundas. Esse é um sistema hiper-crítico onde requisitos bem compreendidos e falhas de segurança representam perda de milhões de dólares e riscos de desastres ambientais. Para partes desse sistema (onde os requisitos de hardware são rígidos), uma abordagem <strong>Cascata</strong>, focada na verificação formal antes de escrever uma linha de código, pode ser surpreendentemente recomendada pelas normas de segurança. A documentação completa atua como prova legal do projeto.</p>
                      
                      <p>Porém, se a demanda fosse desenvolver um novo painel web analítico para a diretoria, onde os requisitos mudam semanalmente de acordo com novos indicadores de mercado, utilizar a Cascata seria um desastre absoluto, entregando no final do ano um sistema que não resolve os problemas do momento. Para o painel web, uma abordagem <strong>Iterativa e Incremental</strong> seria implementada. A equipe entregaria o dashboard de vendas no primeiro mês (primeiro incremento) e coletaria o feedback; no mês seguinte entregaria os gráficos de RH (segundo incremento), enquanto refinava a interface do dashboard anterior (iteração).</p>
                      
                      {/* Expansão */}
                      <p>O <strong>Modelo de Prototipação</strong> é amplamente explorado pelas bancas quando o cenário descrito aponta para requisitos mal compreendidos pelo cliente. A prototipação atua como um mecanismo de validação rápida. O "Protótipo Descartável" (Throwaway) é construído rapidamente para extrair os requisitos reais do usuário, e seu código espaguete é jogado fora após o entendimento ser alcançado, substituindo-o por engenharia estruturada. Em oposição, o "Protótipo Evolucionário" começa como um esqueleto que ganha robustez a cada ciclo, tornando-se o próprio produto final. A expansão de entendimento reside em saber que a Prototipação não exclui outros modelos; pelo contrário, o modelo Espiral e o RUP utilizam fortemente a prototipação como ferramenta em suas fases iniciais.</p>
                      
                      <p>Ao aprofundarmos no <strong>RUP</strong>, é vital entender a sua matriz bidimensional (eixo do tempo vs eixo dos fluxos de trabalho). Embora as Fases (Concepção, Elaboração, Construção, Transição) deem uma falsa impressão de um modelo sequencial estilo cascata ao longo do tempo, as disciplinas (requisitos, análise, projeto, testes) ocorrem simultaneamente durante <em>todas</em> as fases, apenas com intensidades diferentes. Por exemplo, modelam-se requisitos muito na Concepção, mas ainda se modelam alguns poucos requisitos na fase de Transição. Essa interseção é a chave para a natureza iterativa do RUP.</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>A banca CESGRANRIO tem "fetiche" pelas definições estritas das fases do RUP e pela matriz de risco do Modelo Espiral. Para questões CESGRANRIO envolvendo RUP, o principal divisor de águas é a <strong>Fase de Elaboração</strong>: qualquer alternativa de questão afirmando que a arquitetura do sistema é construída (estabilizada) e os principais riscos técnicos são extinguidos na fase de <em>Concepção</em> ou na fase de <em>Construção</em> estará, categoricamente, ERRADA. A Elaboração é o coração técnico do RUP. Se o projeto vai falhar tecnicamente, ele deve falhar nesta fase, onde o protótipo arquitetural é testado.</p>
                      
                      <p>Ainda sob o rigor da CESGRANRIO, quando uma questão situacional menciona termos como "o cliente não sabe exatamente o que quer", a banca está abrindo caminho para a resposta ser "Prototipação" ou "Modelos Iterativos". Contudo, fique atento à armadilha da "Engenharia de Software Baseada em Reuso" (Component-Based Software Engineering - CBSE): se a questão citar um processo que foca quase inteiramente em buscar no mercado COTS (Commercial Off-The-Shelf - pacotes comerciais prontos) e integrá-los para formar a solução desejada com baixo custo e altíssima velocidade de implantação, a taxonomia exata exigida será o "Modelo Baseado em Componentes", e não a prototipação.</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuWaves",
            frontTitle: "Cascata (Waterfall)",
            backTitle: "Sequencial & Rígido",
            backContent: "O modelo linear onde uma fase só inicia quando a anterior é finalizada e os documentos aprovados (congelados). Dificuldade absurda em acomodar mudanças. Ideal apenas para requisitos MUITO bem compreendidos e imutáveis.",
          },
          {
            frontIcon: "LuRepeat2",
            frontTitle: "Iterativo vs Incremental",
            backTitle: "A Diferença Crucial",
            backContent: "INCREMENTAL entrega partes funcionais progressivas do software (adiciona funcionalidades). ITERATIVO foca em refinar o que já foi entregue através de ciclos repetidos (melhora as funcionalidades). Eles geralmente andam juntos.",
          },
          {
            frontIcon: "LuOrbit",
            frontTitle: "Modelo Espiral (Boehm)",
            backTitle: "Foco Absoluto em Riscos",
            backContent: "Divide o desenvolvimento em loops. O grande diferencial é a introdução formal e obrigatória da ANÁLISE DE RISCO antes do desenvolvimento de cada ciclo. Usa fortemente a prototipação para validar suposições.",
          },
          {
            frontIcon: "LuLayers",
            frontTitle: "RUP: Elaboração",
            backTitle: "O Coração da Arquitetura",
            backContent: "Na fase de Elaboração, a equipe foca em estabilizar a ARQUITETURA do sistema e mitigar os maiores riscos técnicos. Se o projeto é tecnicamente inviável, o desenvolvimento é abortado ou alterado aqui.",
          },
          {
            frontIcon: "LuGoal",
            frontTitle: "RUP: Concepção (Inception)",
            backTitle: "Escopo e Viabilidade",
            backContent: "A primeira fase foca em definir o escopo inicial (Business Case), verificar a viabilidade comercial do produto e identificar todos os stakeholders. Responde à pergunta: 'Vale a pena investir neste projeto?'.",
          },
          {
            frontIcon: "LuAlertCircle",
            frontTitle: "Pegadinha CESGRANRIO (Prototipação)",
            backTitle: "O Protótipo Descartável",
            backContent: "Na Prototipação Descartável (Throwaway), o código do protótipo NÃO é reaproveitado para o sistema final. Ele serve apenas como ferramenta visual para validar e elicitar REQUISITOS com o usuário final.",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "Modelos Clássicos & As Fases do RUP",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-6 shadow-inner border border-slate-700">
            
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">🔄 Gatilhos dos Modelos de Ciclo de Vida:</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="font-bold text-slate-300">Cascata:</span> Rígido, Documentado, Fases travadas.</li>
                <li><span className="font-bold text-slate-300">Espiral:</span> Orientado à Análise de Riscos.</li>
                <li><span className="font-bold text-slate-300">Incremental:</span> Entrega em pedaços (Software funcionando mais cedo).</li>
                <li><span className="font-bold text-slate-300">Prototipação:</span> Requisitos mal compreendidos pelo cliente.</li>
              </ul>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
              <h4 className="text-blue-400 font-bold mb-3 flex items-center justify-center gap-2">🎯 Mnemônico para o RUP:</h4>
              <p className="text-xl font-bold font-mono tracking-widest text-slate-100">
                <span className="text-purple-400">CO</span>.<span className="text-blue-400">E</span>.<span className="text-amber-400">CO</span>.<span className="text-emerald-400">T</span>
              </p>
              <p className="mt-2 text-sm">
                (<span className="text-purple-400">Co</span>ncepção ➔ <span className="text-blue-400">E</span>laboração ➔ <span className="text-amber-400">Co</span>nstrução ➔ <span className="text-emerald-400">T</span>ransição)
              </p>
              <div className="mt-3 text-xs opacity-75 grid grid-cols-2 gap-2 text-left">
                <p>• Concepção = Viabilidade/Escopo</p>
                <p>• Elaboração = Arquitetura/Riscos</p>
                <p>• Construção = Codificação massiva</p>
                <p>• Transição = Deploy/Entrega</p>
              </div>
            </div>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 2",
        tituloAula: "Ciclos de Vida",
        materia: "Engenharia de Software",
        images: [
          {
            title: "A Espiral de Riscos",
            type: "Infográfico",
            placeholderColor: "emerald",
            imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 2,
        moduloTitulo: "Ciclos de Vida e RUP",
        conteudoResumo: "Mergulho nos Modelos de Ciclo de Vida: Cascata, Incremental, Espiral e os pontos de prova do RUP.",
      }
    }
  },
  
  3: {
    secoes: [
      {
        index: "INTRO",
        title: "Engenharia de Requisitos",
        accordions: [
          {
            titulo: "C.E.D.E.A - Elicitação, Análise e Validação",
            icone: "📝",
            corIndicador: "bg-purple-500",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>O desenvolvimento de software começa, invariavelmente, no entendimento do que precisa ser feito. A <strong>Engenharia de Requisitos</strong> é a fase mais crítica e sensível de todo o ciclo de vida. Um erro cometido na infraestrutura pode ser mitigado com ferramentas modernas; um erro de arquitetura custa caro; porém, um erro no levantamento de requisitos significa entregar perfeitamente o sistema errado para o cliente. Estatisticamente, a maior parte dos projetos de TI em corporações de energia e governo falham não por incompetência técnica (código ruim), mas porque o problema não foi entendido ou o escopo não foi devidamente isolado pelas equipes de negócios.</p>
                      
                      <p>Na literatura clássica (como Ian Sommerville ou Karl Wiegers), a Engenharia de Requisitos não é um ato isolado de "perguntar o que o cliente quer e anotar". Ela engloba a Elicitação (descoberta), a Análise (negociação de conflitos), a Especificação (documentação rigorosa) e a Validação (confirmação formal). Esse sub-processo estruturado visa remover a ambiguidade, a incompletude e a inconsistência das necessidades das partes interessadas (stakeholders), transformando a linguagem natural e difusa dos gerentes e operadores em linguagem técnica testável para os programadores.</p>
                      
                      {/* Explicação */}
                      <p>O primeiro passo é separar os requisitos em três grandes pilares exigidos pelas bancas. <strong>Requisitos Funcionais</strong> definem os serviços que o sistema deve fornecer (o que o sistema FAZ). Por exemplo: "O sistema deve emitir um relatório de consumo de barris diário". <strong>Requisitos Não-Funcionais (RNF)</strong> definem as restrições sobre os serviços e funções (como o sistema se COMPORTA ou opera). Exemplos incluem requisitos de desempenho, segurança, usabilidade ou obrigações regulatórias. Por último, os <strong>Requisitos de Domínio</strong> vêm do domínio de aplicação e podem refletir características daquele mercado que, se violadas, tornam o sistema inválido funcionalmente (ex: fórmulas de contabilidade petrolífera exigidas por lei).</p>
                      
                      <p>O fluxo das atividades da engenharia de requisitos deve estar cravado na memória: <em>Elicitação (Descoberta)</em> é o uso de técnicas como entrevistas, questionários, JAD (Joint Application Design), observação (etnografia) ou brainstorming para levantar as necessidades. <em>Análise e Negociação</em> é o momento onde os requisitos levantados são priorizados e os conflitos resolvidos (quando o diretor pede X e o operador pede Y). <em>Especificação</em> é a escrita formal no SRS (Software Requirements Specification), seja em linguagem estruturada ou modelagem. <em>Validação</em> é a verificação se o documento reflete a intenção real (o sistema certo), resultando no "Sign-off" (assinatura e aprovação do cliente).</p>
                      
                      {/* Demonstração */}
                      <p>Na prática industrial: Um engenheiro logístico solicita ao analista de sistemas: "Eu preciso de um portal para os caminhoneiros registrarem o manifesto de carga muito rápido, ou as filas vão bloquear as refinarias, e o sistema tem que gerar um certificado digital de transporte." Durante o processo de engenharia de requisitos, o Analista desdobra a frase em componentes técnicos. "Gerar certificado digital de transporte através do manifesto" é catalogado no SRS como um <strong>Requisito Funcional (RF01)</strong>, testável através de uma interface ou API.</p>
                      
                      <p>Entretanto, a expressão "muito rápido, ou as filas vão bloquear" é um sentimento ambíguo. Na etapa de <em>Análise</em>, o Analista extrai métricas, questionando qual é a tolerância máxima. A resposta gera o <strong>Requisito Não-Funcional de Desempenho (RNF01)</strong>: "O tempo de resposta do cadastro de manifesto não deve exceder 3 segundos com 500 caminhoneiros conectados simultaneamente". Sem essa conversão de adjetivo ("muito rápido") para restrição quantitativa e testável, o requisito não-funcional seria inválido, pois os programadores e os testadores não teriam parâmetros objetivos para validar a entrega final.</p>
                      
                      {/* Expansão */}
                      <p>Uma distinção fundamental que confunde candidatos desavisados é a diferença entre requisitos de usuário e requisitos de sistema. Os <strong>Requisitos de Usuário</strong> são declarações abstratas em linguagem natural acompanhadas de diagramas simples, feitas PARA o cliente final e gestores entenderem. Os <strong>Requisitos de Sistema</strong> são o desdobramento profundo dos requisitos de usuário, detalhando funções, serviços e restrições operacionais em uma especificação muito mais longa e precisa técnica, feita PARA os desenvolvedores projetarem o banco de dados e a arquitetura.</p>
                      
                      <p>A expansão técnica nos exige entender a gestão dessas mudanças (Gerenciamento de Requisitos). Na vida real, a volatilidade dos requisitos (a taxa na qual os requisitos mudam) é uma métrica crucial. Para controlar o caos, a engenharia estabelece a <em>Matriz de Rastreabilidade</em>. A rastreabilidade permite mapear a origem do requisito (rastreabilidade para trás), sua evolução até a implementação no código e os testes associados (rastreabilidade para frente). Se a legislação tributária que afeta a venda de diesel for alterada, o analista consulta a matriz e identifica exatamente quais componentes de software e diagramas de classe serão impactados pela mudança daquele requisito (Traceability Management).</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>Na visão focada da CESGRANRIO, 80% das questões de requisitos visam classificar um pequeno texto como Funcional ou Não-Funcional. A regra máxima é: se o texto descreve uma função que manipula, salva ou exibe dados resultando de uma ação do usuário, é Funcional. Se descreve qualidades transversais como "O sistema deve usar linguagem Java (restrição de implementação)", "Tempo de resposta X (desempenho)", "Criptografia RSA de 256 bits (segurança)" ou "Deve rodar no Windows Server 2022 (portabilidade/ambiente)", é Não-Funcional. Lembre-se que restrições de tecnologia impostas (o cliente obriga o uso de Oracle) são RNF restritivos.</p>
                      
                      <p>Outra sutileza da banca é tentar misturar a Etnografia com outras técnicas de Elicitação. A CESGRANRIO exige que você entenda que Etnografia consiste na observação técnica do ambiente natural do usuário (imersão do analista na rotina operacional). Ao contrário das entrevistas estruturadas, na etnografia o usuário não descreve suas atividades; o analista apenas observa para capturar tarefas invisíveis ou "gambiarras" que os usuários não mencionariam, identificando requisitos implícitos. Toda vez que a prova mencionar "analista observando o trabalho diário in-loco para descobrir a cultura operacional", a alternativa correta é a Etnografia.</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuFileText",
            frontTitle: "Requisito Funcional (RF)",
            backTitle: "A Funcionalidade Básica",
            backContent: "Descreve os serviços que o sistema deve fornecer, as reações a determinadas entradas e o comportamento do sistema. (Ex: 'O sistema deve permitir gerar relatório PDF de vendas'). É o famoso 'O QUE o sistema faz'.",
          },
          {
            frontIcon: "LuShieldCheck",
            frontTitle: "Requisito Não-Funcional (RNF)",
            backTitle: "A Restrição e a Qualidade",
            backContent: "Restrições aplicadas aos serviços do sistema. Define atributos de qualidade como desempenho, segurança, escalabilidade, portabilidade e até linguagem de programação imposta. (Ex: 'O sistema deve suportar 100 usuários online').",
          },
          {
            frontIcon: "LuBookOpen",
            frontTitle: "Requisitos de Domínio",
            backTitle: "A Regra de Negócio Extrema",
            backContent: "Derivam do domínio de aplicação e refletem regras irrevogáveis (frequentemente equações matemáticas, leis, regras de contabilidade pesada). Se desrespeitado, invalida todo o projeto pois afeta a essência do negócio.",
          },
          {
            frontIcon: "LuSearch",
            frontTitle: "Etnografia (Elicitação)",
            backTitle: "A Observação Direta",
            backContent: "Técnica de elicitação onde o analista de sistemas se insere no ambiente de trabalho dos usuários finais para observá-los operando. Excelente para capturar requisitos implícitos e fluxos de trabalho que os usuários esqueceriam de citar.",
          },
          {
            frontIcon: "LuNetwork",
            frontTitle: "Matriz de Rastreabilidade",
            backTitle: "Controle de Impacto",
            backContent: "Ferramenta essencial na Gestão de Requisitos. Cria elos (links) cruzados que mostram a ligação entre um requisito e suas origens, além de ligá-lo a módulos de software e testes, ajudando na análise de impacto em caso de mudanças.",
          },
          {
            frontIcon: "LuStamp",
            frontTitle: "Especificação vs Validação",
            backTitle: "A Diferença do Final do Processo",
            backContent: "A Especificação é o ato de escrever o Documento formal (ex: Documento de Requisitos de Software - SRS). A Validação é a última etapa, onde demonstra-se que o documento define o sistema que o cliente realmente deseja (Sign-off).",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "Diferenciação RF vs RNF e o Fluxo",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-6 shadow-inner border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-emerald-500">
                <h4 className="font-bold text-emerald-400 mb-2">✅ Funcional (O QUE)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Gerar extrato bancário</li>
                  <li>• Cadastrar clientes</li>
                  <li>• Calcular o troco do pedido</li>
                  <li>• Enviar notificação por e-mail</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-amber-500">
                <h4 className="font-bold text-amber-400 mb-2">🛡️ Não-Funcional (COMO)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Responder em até 2 segundos</li>
                  <li>• Banco de dados PostgreSQL</li>
                  <li>• Cores de alto contraste</li>
                  <li>• Criptografia 256bits na rede</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
              <h4 className="text-purple-400 font-bold mb-3 flex items-center justify-center gap-2">📝 O Fluxo de Atividades</h4>
              <p className="text-sm font-mono text-slate-100 flex flex-wrap justify-center gap-2">
                <span className="bg-purple-900/50 px-2 py-1 rounded">1. Elicitação</span> ➔
                <span className="bg-purple-900/50 px-2 py-1 rounded">2. Análise</span> ➔
                <span className="bg-purple-900/50 px-2 py-1 rounded">3. Especificação</span> ➔
                <span className="bg-purple-900/50 px-2 py-1 rounded">4. Validação</span>
              </p>
            </div>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 3",
        tituloAula: "Engenharia de Requisitos",
        materia: "Engenharia de Software",
        images: [
          {
            title: "Taxonomia de Requisitos",
            type: "Infográfico",
            placeholderColor: "purple",
            imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 3,
        moduloTitulo: "Engenharia de Requisitos",
        conteudoResumo: "Entenda os requisitos funcionais, não-funcionais, de domínio e as pegadinhas em técnicas de elicitação.",
      }
    }
  },
  
  4: {
    secoes: [
      {
        index: "INTRO",
        title: "Arquitetura e Modelagem UML",
        accordions: [
          {
            titulo: "C.E.D.E.A - Paradigmas Arquiteturais e Diagramas UML",
            icone: "🏗️",
            corIndicador: "bg-blue-600",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>Uma vez que os requisitos estão claros, o próximo desafio não é escrever código, mas sim projetar o esqueleto que suportará esse código. A <strong>Arquitetura de Software</strong> é o processo de tomada de decisões de alto nível que dita como o sistema será estruturado e como seus componentes fundamentais vão interagir. Em sistemas de energia e finanças, onde alta disponibilidade (HA) e escalabilidade são inegociáveis, uma arquitetura falha resultará em gargalos intransponíveis no futuro. É a arquitetura que define se o sistema será monolítico, cliente-servidor ou orientado a serviços, baseando-se quase inteiramente na mitigação de riscos mapeados pelos Requisitos Não-Funcionais.</p>
                      
                      <p>Para comunicar essa arquitetura e o design das regras de negócio aos desenvolvedores, a indústria padronizou a <strong>UML (Unified Modeling Language)</strong>. A UML não é uma linguagem de programação nem um processo (como o RUP); ela é uma linguagem visual de propósito geral, rica e semanticamente rigorosa. Sem a UML, engenheiros diferentes poderiam desenhar o mesmo componente de formas contraditórias. Para provas de concursos (como CESGRANRIO), dominar a divisão entre os diagramas estruturais (que mostram o "esqueleto" estático) e os diagramas comportamentais (que mostram a "ação" dinâmica) é absolutamente vital para a pontuação.</p>
                      
                      {/* Explicação */}
                      <p>A UML possui diagramas essenciais que caem sistematicamente em provas. Do lado Estrutural, o <strong>Diagrama de Classes</strong> é o rei absoluto. Ele mapeia as entidades do sistema (ex: Funcionario, Departamento), seus atributos, métodos e, fundamentalmente, seus relacionamentos (associação, agregação, composição, herança). O <strong>Diagrama de Componentes</strong> mostra as partes físicas e substituíveis do sistema (como DLLs, executáveis ou pacotes). O <strong>Diagrama de Implantação (Deployment)</strong> ilustra a arquitetura de hardware: onde os componentes de software serão instalados fisicamente, mostrando os nós de processamento e as redes de comunicação.</p>
                      
                      <p>Do lado Comportamental, o <strong>Diagrama de Casos de Uso</strong> é a ponte com os usuários, mostrando <em>o que</em> o sistema faz sob a ótica dos atores (usuários ou outros sistemas externos), mas nunca revelando <em>como</em> faz internamente. O <strong>Diagrama de Atividade</strong> é essencialmente um fluxograma anabolizado, excelente para modelar o fluxo de negócio ou a lógica complexa de um algoritmo. Já o <strong>Diagrama de Sequência</strong> foca na troca temporal de mensagens; ele mostra a interação entre os objetos no eixo do tempo (linha de vida), sendo o diagrama ideal para detalhar a lógica interna (backend) de um Caso de Uso específico.</p>
                      
                      {/* Demonstração */}
                      <p>Imagine o design arquitetural de um novo módulo de Autorização de Pagamentos da Petrobras. O Arquiteto decide por um padrão <em>Cliente-Servidor em Camadas (Layered)</em> para separar a interface (frontend) da lógica de negócios e do banco de dados, facilitando a segurança. Para documentar a infraestrutura necessária (servidores web, firewalls, servidores de banco de dados e os protocolos HTTP/TCP), o arquiteto desenha um robusto <strong>Diagrama de Implantação</strong>, garantindo que a equipe de infraestrutura saiba exatamente que máquinas virtuais provisionar.</p>
                      
                      <p>Em paralelo, o Analista de Sistemas modela o fluxo de aprovação. Ele usa o <strong>Diagrama de Casos de Uso</strong> para mostrar que o "Gerente" (ator) realiza a ação de "Aprovar Fatura". Mas como essa fatura é aprovada internamente no código? Ele usa um <strong>Diagrama de Sequência</strong> para mostrar que, no Tempo 1, o <em>Controlador</em> envia a mensagem `validarSaldo()` para a <em>Conta</em>; no Tempo 2, a <em>Conta</em> responde; no Tempo 3, o <em>Controlador</em> chama `aprovar()` na <em>Fatura</em>. A linha do tempo vertical é a chave visual que diferencia a sequência de outros diagramas de interação.</p>
                      
                      {/* Expansão */}
                      <p>Uma confusão profunda e recorrente acontece entre os relacionamentos do Diagrama de Classes, especificamente entre <strong>Agregação</strong> e <strong>Composição</strong>. Ambos representam uma relação de "Todo/Parte" (um Carro tem um Motor). A Agregação (losango vazio) é uma relação fraca: se a classe Todo (ex: Departamento) for destruída, a classe Parte (ex: Funcionário) continua existindo independentemente (o funcionário não morre se o departamento for fechado). Já a Composição (losango preenchido/escuro) é uma relação existencial forte: o tempo de vida da Parte é rigidamente vinculado ao Todo. Se a classe "Fatura" for deletada, seus "Itens de Fatura" são obrigatoriamente destruídos junto com ela no banco de dados.</p>
                      
                      <p>Outra expansão essencial é entender a diferença de escopo no mundo dos padrões. <strong>Padrões Arquiteturais</strong> (como MVC - Model-View-Controller, Cliente-Servidor, Peer-to-Peer) são decisões macro que afetam toda a estrutura do software e a sua topologia física/lógica. Por outro lado, <strong>Padrões de Projeto (Design Patterns)</strong>, popularizados pelo grupo GoF (Gang of Four), operam em nível micro. Eles resolvem problemas de código, como a criação de objetos (Criacionais - ex: Singleton, Factory), a estrutura interna das classes (Estruturais - ex: Adapter, Facade) ou a comunicação entre os objetos (Comportamentais - ex: Observer, Strategy).</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>A CESGRANRIO adora a taxonomia da UML 2.x. As questões costumam apresentar o nome de 5 diagramas e perguntar "Qual das alternativas abaixo contém EXCLUSIVAMENTE diagramas de natureza estrutural?". Para gabaritar, você não pode hesitar: Classes, Objetos, Componentes, Implantação e Pacotes são <strong>Estruturais</strong> (visão estática). Casos de Uso, Atividades, Estados, Sequência e Comunicação são <strong>Comportamentais</strong> (visão dinâmica). Lembre-se que o antigo diagrama de Colaboração (UML 1.x) mudou de nome para diagrama de Comunicação (UML 2.x).</p>
                      
                      <p>Além disso, a banca é impiedosa com os relacionamentos do Diagrama de Casos de Uso: o <strong>{"<<include>>"}</strong> (inclusão) e o <strong>{"<<extend>>"}</strong> (extensão). A regra de ouro para a CESGRANRIO é: o {"<<include>>"} é um comportamento OBRIGATÓRIO (ex: o caso "Sacar Dinheiro" OBRIGATORIAMENTE inclui "Autenticar Usuário"). O {"<<extend>>"} é um comportamento OPCIONAL ou condicional (ex: "Emitir Recibo Impresso" estende "Sacar Dinheiro", pois só acontece se o usuário quiser ou se houver papel). Na seta de extensão, a ponta aponta do caso estendido (opcional) PARA o caso base.</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuLayoutTemplate",
            frontTitle: "Diagramas Estruturais",
            backTitle: "A Visão Estática (O Esqueleto)",
            backContent: "Mostram os elementos que existem no sistema e as relações entre eles, sem considerar o fator tempo. Principais (UML 2.x): Diagrama de Classes, Diagrama de Componentes, Diagrama de Implantação e Diagrama de Pacotes.",
          },
          {
            frontIcon: "LuActivity",
            frontTitle: "Diagramas Comportamentais",
            backTitle: "A Visão Dinâmica (A Ação)",
            backContent: "Mostram o que acontece no sistema e como os elementos interagem ao longo do tempo. Principais (UML 2.x): Diagrama de Casos de Uso, Diagrama de Sequência, Diagrama de Atividade e Diagrama de Máquina de Estados.",
          },
          {
            frontIcon: "LuGitMerge",
            frontTitle: "Agregação vs Composição",
            backTitle: "O Tempo de Vida da 'Parte'",
            backContent: "Agregação (Losango Branco): Relação fraca. A parte sobrevive sem o todo (Ex: Computador e Impressora). Composição (Losango Preto): Relação de dependência existencial. A parte morre se o todo morrer (Ex: Fatura e Itens da Fatura).",
          },
          {
            frontIcon: "LuArrowRightFromLine",
            frontTitle: "«include» vs «extend»",
            backTitle: "Obrigatório vs Opcional",
            backContent: "No diagrama de Casos de Uso: «include» aponta para uma funcionalidade OBRIGATÓRIA que foi reaproveitada. «extend» indica um comportamento OPCIONAL ou uma variação de fluxo que pode ou não ocorrer no caso base.",
          },
          {
            frontIcon: "LuServer",
            frontTitle: "Diagrama de Implantação",
            backTitle: "A Visão do Hardware",
            backContent: "É o único diagrama estrutural focado quase que inteiramente na infraestrutura física. Mostra os NÓS (servidores, roteadores) onde os artefatos de software serão executados, além dos protocolos de rede (HTTP, TCP/IP).",
          },
          {
            frontIcon: "LuClock",
            frontTitle: "Diagrama de Sequência",
            backTitle: "Interação baseada no Tempo",
            backContent: "Um diagrama comportamental/interação onde o EIXO VERTICAL representa o tempo. É o mais poderoso para mostrar o fluxo de mensagens síncronas/assíncronas trocadas entre objetos para realizar um único Caso de Uso.",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "Divisão Clássica da UML",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-6 shadow-inner border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-400 mb-2">🧱 Estruturais (Parados)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Diagrama de Classes</li>
                  <li>• Diagrama de Componentes</li>
                  <li>• Diagrama de Implantação</li>
                  <li>• Diagrama de Objetos</li>
                  <li>• Diagrama de Pacotes</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-emerald-500">
                <h4 className="font-bold text-emerald-400 mb-2">🏃 Comportamentais (Movendo)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Diagrama de Casos de Uso</li>
                  <li>• Diagrama de Sequência</li>
                  <li>• Diagrama de Atividade</li>
                  <li>• Diagrama de Máquina de Estados</li>
                  <li>• Diagrama de Comunicação</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
              <h4 className="text-amber-400 font-bold mb-3">💎 Dica de Agregação/Composição</h4>
              <p className="text-sm text-slate-100">
                "Losango <span className="font-bold text-white uppercase">Vazio</span> = Coração Vazio (Agregação, relação fraca)."<br/>
                "Losango <span className="font-bold text-black bg-white px-1 uppercase">Preto</span> = Luto, Morte certa da parte (Composição, forte)."
              </p>
            </div>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 4",
        tituloAula: "Arquitetura e UML",
        materia: "Engenharia de Software",
        images: [
          {
            title: "Diagrama de Casos de Uso (Include/Extend)",
            type: "Diagrama",
            placeholderColor: "blue",
            imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 4,
        moduloTitulo: "Arquitetura e UML",
        conteudoResumo: "Entenda perfeitamente a diferença entre diagramas estruturais e comportamentais da UML.",
      }
    }
  },

  5: {
    secoes: [
      {
        index: "INTRO",
        title: "Agilidade: Scrum e Cultura DevOps",
        accordions: [
          {
            titulo: "C.E.D.E.A - Manifesto Ágil, Framework Scrum e Pipeline",
            icone: "🚀",
            corIndicador: "bg-emerald-500",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>O mundo corporativo moderno, impulsionado pela transformação digital, exige que as empresas lancem produtos e corrijam falhas quase em tempo real. A frustração histórica com os modelos preditivos pesados (como o Cascata), que entregavam sistemas obsoletos após anos de desenvolvimento, culminou no histórico Encontro de Snowbird em 2001, onde nasceu o Manifesto Ágil. A partir desse marco, a indústria abandonou a documentação exaustiva e abraçou a entrega de valor contínuo, a adaptação às mudanças e a colaboração estreita com os clientes.</p>
                      
                      <p>Hoje, na Petrobras e no mercado, não se fala mais em desenvolvimento de software sem mencionar Scrum, Kanban e DevOps. A Agilidade não é a ausência de processos, mas sim a aplicação de frameworks empíricos (baseados em observação e experimentação) que aceitam que os requisitos vão mudar. E, para que essa agilidade de negócio se transforme em software rodando em produção de forma segura, a cultura DevOps quebrou o muro tradicional que existia entre os Desenvolvedores (Dev), que queriam lançar mudanças rapidamente, e a equipe de Operações (Ops), que queria estabilidade e odiava mudanças.</p>
                      
                      {/* Explicação */}
                      <p>O <strong>Manifesto Ágil</strong> baseia-se em 4 valores fundamentais (indivíduos e interações, software funcionando, colaboração com o cliente e resposta a mudanças) e 12 princípios. O framework ágil mais cobrado em concursos é, indiscutivelmente, o <strong>Scrum</strong>. O Scrum não prescreve como programar, mas como gerenciar o trabalho complexo através de ciclos curtos chamados Sprints (geralmente de 2 a 4 semanas). Ele define 3 papéis absolutos: o <em>Product Owner (PO)</em>, dono do produto e responsável por maximizar o valor e gerenciar o Product Backlog; o <em>Scrum Master</em>, o líder servidor focado em remover impedimentos e garantir a aplicação correta do framework; e os <em>Developers</em>, a equipe auto-gerenciada e cross-funcional que efetivamente constrói o software.</p>
                      
                      <p>Do lado da automação, a cultura <strong>DevOps</strong> se apoia em pilares técnicos essenciais. O <em>Continuous Integration (CI)</em> garante que o código feito por múltiplos desenvolvedores seja mesclado (merge), compilado e testado automaticamente várias vezes ao dia. O <em>Continuous Delivery (CD)</em> garante que esse código testado esteja empacotado e pronto para ser implantado no ambiente de produção a qualquer momento, ao clique de um botão. Se a implantação for feita 100% de forma automática (sem aprovação humana manual), chamamos de <em>Continuous Deployment</em>. Juntos, CI/CD formam a "Pipeline", o coração tecnológico do DevOps.</p>
                      
                      {/* Demonstração */}
                      <p>Na prática de uma equipe ágil: O PO da Petrobras, ouvindo os engenheiros de campo, adiciona no <em>Product Backlog</em> a necessidade de "Tirar fotos dos dutos offline". No evento da <em>Sprint Planning</em>, a equipe seleciona esse item e cria o seu <em>Sprint Backlog</em> (o plano para a Sprint atual). Todos os dias, por apenas 15 minutos, a equipe faz a <em>Daily Scrum</em> para sincronizar o trabalho ("O que fiz? O que vou fazer? Há impedimentos?"). Ao final de 2 semanas, a equipe apresenta o aplicativo de câmera funcionando na <em>Sprint Review</em> (focada no produto) e, logo após, realizam a <em>Sprint Retrospective</em> (focada em melhorar o processo da equipe).</p>
                      
                      <p>Neste mesmo cenário, assim que o desenvolvedor termina o código da câmera e envia para o servidor (git push), a ferramenta de DevOps (ex: Jenkins ou GitLab CI) desperta automaticamente. A <em>Pipeline de CI</em> compila o código, roda os testes de segurança e verifica a cobertura do código. Se tudo passar, a <em>Pipeline de CD</em> cria um contêiner (ex: Docker) e o disponibiliza no ambiente de homologação. O DevOps garante que esse ciclo ocorra dezenas de vezes por dia, sem intervenção humana, zerando o erro de implantação manual que antes derrubava os servidores nas madrugadas de sábado.</p>
                      
                      {/* Expansão */}
                      <p>O <strong>Kanban</strong>, frequentemente usado junto com o Scrum (originando o Scrumban), é fundamentalmente focado no fluxo contínuo (Flow). Diferente do Scrum que trabalha com iterações travadas (timeboxed), o Kanban não exige Sprints. O coração do Kanban é a limitação do <em>WIP (Work In Progress)</em>. Limitar o WIP significa proibir que a equipe puxe novos cartões ("A Fazer") se a coluna "Em Desenvolvimento" já estiver no seu limite máximo (ex: 3 tarefas). Essa restrição forçada obriga a equipe a focar em terminar o que já começou antes de iniciar algo novo, reduzindo o gargalo radicalmente.</p>
                      
                      <p>Outra expansão vital é entender as "moedas" de estimativa ágil. Ao contrário dos modelos tradicionais que usam "horas" (Ponto de Função ou Horas-Homem), as equipes ágeis costumam usar o <em>Planning Poker</em> e estimativas relativas, usando <em>Story Points</em> (geralmente seguindo a sequência de Fibonacci: 1, 2, 3, 5, 8...). O Story Point não mede apenas tempo, mas um combo de Complexidade, Esforço e Incerteza (Risco). A soma dos Story Points que uma equipe consegue finalizar em uma Sprint é chamada de <strong>Velocidade (Velocity)</strong>, a métrica essencial de previsibilidade de um time ágil.</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>A CESGRANRIO tem "pegadinhas" históricas na distribuição de papéis do Scrum. Regra de ouro da banca: o <strong>Product Owner (PO)</strong> é a ÚNICA pessoa autorizada a gerenciar o Product Backlog (adicionar, remover ou priorizar itens), embora possa delegar o trabalho mecânico; e a banca adora afirmar (falsamente) que o Scrum Master aprova os requisitos do cliente ou designa quem vai fazer qual tarefa. Falso! Quem distribui as tarefas internamente e decide "como" fazer o trabalho são os <strong>Developers</strong> (a equipe é auto-gerenciada). O Scrum Master NÃO é um chefe de projeto (Project Manager), ele é um facilitador.</p>
                      
                      <p>Sobre as reuniões (Eventos Scrum), a banca tenta confundir a <em>Sprint Review</em> (Revisão) com a <em>Sprint Retrospective</em> (Retrospectiva). O macete para concursos é rígido: a Revisão é focada no <strong>PRODUTO</strong> e em adaptar o Product Backlog com a presença dos clientes/stakeholders; ela ocorre no final da Sprint para mostrar o incremento. Já a Retrospectiva é a ÚLTIMA reunião da Sprint, fechada apenas para o Scrum Team, focada exclusivamente no <strong>PROCESSO</strong> e na melhoria contínua da equipe ("o que fizemos bem, o que foi mal no nosso fluxo e como melhorar a próxima Sprint").</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuUserCheck",
            frontTitle: "O Papel do Product Owner",
            backTitle: "O Dono do Valor (O Quê)",
            backContent: "Responsável por maximizar o valor do produto. É a ÚNICA pessoa autorizada a gerenciar e priorizar o Product Backlog. Ele representa a voz do cliente e define O QUE precisa ser feito (mas não 'como' fazer).",
          },
          {
            frontIcon: "LuRefreshCw",
            frontTitle: "Review vs Retrospectiva",
            backTitle: "Produto vs Processo",
            backContent: "Sprint Review = Final do ciclo, foca no PRODUTO, demonstra o incremento para os stakeholders. Sprint Retrospective = Última reunião, foca no PROCESSO da equipe, busca melhoria contínua e resolução de atritos internos.",
          },
          {
            frontIcon: "LuShield",
            frontTitle: "O Papel do Scrum Master",
            backTitle: "O Facilitador (O Processo)",
            backContent: "Não é gerente de projeto! É um líder servidor focado em remover impedimentos do time, blindar a equipe contra interrupções externas e garantir que a teoria e as regras do Scrum sejam compreendidas e aplicadas.",
          },
          {
            frontIcon: "LuKanban",
            frontTitle: "Kanban: Limite WIP",
            backTitle: "Pare de Começar, Comece a Terminar",
            backContent: "WIP (Work In Progress). A regra central do Kanban é limitar a quantidade de itens que podem estar em andamento simultaneamente em uma coluna. Isso expõe os gargalos e força a finalização das tarefas (evita gargalo).",
          },
          {
            frontIcon: "LuGitMerge",
            frontTitle: "Continuous Integration (CI)",
            backTitle: "Integração e Teste Automático",
            backContent: "Prática DevOps onde os desenvolvedores integram o código no repositório central várias vezes ao dia. Cada commit dispara builds e testes automatizados, identificando bugs imediatamente após sua introdução.",
          },
          {
            frontIcon: "LuRocket",
            frontTitle: "CD: Delivery vs Deployment",
            backTitle: "A Aprovação Humana",
            backContent: "Continuous Delivery (Entrega): O código fica pronto e empacotado para produção, mas precisa de um CLIQUE (aprovação manual) para ir ao ar. Continuous Deployment (Implantação): O código vai para a produção de forma 100% AUTOMÁTICA sem intervenção humana.",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "Pilares e Eventos do Scrum",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-6 shadow-inner border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-emerald-500">
                <h4 className="font-bold text-emerald-400 mb-2">💎 Os 3 Pilares Empíricos</h4>
                <ul className="text-sm space-y-1">
                  <li><span className="font-bold">T</span>ransparência (Fatos visíveis a todos)</li>
                  <li><span className="font-bold">I</span>nspeção (Verificar o trabalho/artefatos)</li>
                  <li><span className="font-bold">A</span>daptação (Ajustar o rumo se houver desvio)</li>
                  <li className="italic opacity-80 pt-2">Mnemônico: "TIA do Scrum"</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-amber-500">
                <h4 className="font-bold text-amber-400 mb-2">⏱️ Os 5 Eventos</h4>
                <ul className="text-sm space-y-1">
                  <li>1. A Sprint (O contêiner de tudo)</li>
                  <li>2. Sprint Planning (O Plano)</li>
                  <li>3. Daily Scrum (15 min - Sincronização)</li>
                  <li>4. Sprint Review (Avaliar o Produto)</li>
                  <li>5. Sprint Retrospective (Avaliar a Equipe)</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 5",
        tituloAula: "Agilidade e DevOps",
        materia: "Engenharia de Software",
        images: [
          {
            title: "O Framework Scrum",
            type: "Diagrama",
            placeholderColor: "emerald",
            imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 5,
        moduloTitulo: "Agilidade, Scrum e DevOps",
        conteudoResumo: "Os papéis intocáveis do Scrum e a diferença técnica que a banca cobra entre Integração, Entrega e Implantação Contínua.",
      }
    }
  },

  6: {
    secoes: [
      {
        index: "INTRO",
        title: "Bancos de Dados Relacionais (SQL)",
        accordions: [
          {
            titulo: "C.E.D.E.A - Modelagem E-R, Normalização e ACID",
            icone: "🗄️",
            corIndicador: "bg-indigo-500",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>Enquanto a Engenharia de Software organiza os processos e a arquitetura do código, o coração da esmagadora maioria dos sistemas corporativos é o local onde a informação reside de forma persistente. Os <strong>Bancos de Dados Relacionais (SGBDR)</strong>, baseados na teoria matemática de Edgar Codd da década de 1970, governam o mundo das finanças, da logística e dos recursos humanos. Na Petrobras, bilhões de registros estruturados (dados de perfuração, folhas de pagamento, contratos) dependem da integridade ferrenha que apenas o modelo relacional garante. Para as bancas, Bancos de Dados são um universo paralelo, exigindo rigor matemático em conceitos de chaves, modelagem e normalização.</p>
                      
                      <p>A Modelagem de Dados é dividida classicamente em três níveis de abstração que decrescem até o hardware. O <em>Modelo Conceitual</em> é a fase mais abstrata (focada no negócio), geralmente desenhada através do Modelo Entidade-Relacionamento (MER), independente de qual software de banco será usado. O <em>Modelo Lógico</em> traduz os conceitos para estruturas de dados (no caso relacional, transforma entidades em Tabelas e relacionamentos em Chaves Estrangeiras). Finalmente, o <em>Modelo Físico</em> é o código real de criação (os scripts DDL, como CREATE TABLE) focado na performance do SGDB escolhido (Oracle, PostgreSQL, SQL Server).</p>
                      
                      {/* Explicação */}
                      <p>No modelo lógico relacional, a espinha dorsal da integridade são as <strong>Chaves</strong>. A <em>Chave Primária (Primary Key - PK)</em> garante a integridade de entidade: ela identifica de forma absolutamente única cada registro/linha na tabela (não pode haver duas matrículas iguais) e, por regra de ouro, nunca pode ser nula (Regra de Integridade de Entidade). A <em>Chave Estrangeira (Foreign Key - FK)</em> é a cola que liga as tabelas, estabelecendo a integridade referencial: um valor na coluna FK de uma tabela filha deve OBRIGATORIAMENTE corresponder a um valor existente na PK da tabela mãe (ou ser nulo).</p>
                      
                      <p>Para evitar a redundância catastrófica de dados (anomalias de inserção, deleção e atualização), aplicamos a <strong>Normalização</strong>. A <em>1ª Forma Normal (1FN)</em> exige que a tabela seja "plana" (flat): todos os atributos devem ser atômicos (indivisíveis) e não podem existir grupos repetitivos ou atributos multivalorados (ex: uma célula com 3 telefones). A <em>2ª Forma Normal (2FN)</em> exige estar na 1FN e que não haja "dependência funcional parcial"; ou seja, se a Chave Primária for composta por duas colunas, os atributos comuns devem depender das DUAS colunas inteiras, e não de apenas uma parte dela. A <em>3ª Forma Normal (3FN)</em> exige estar na 2FN e proíbe a "dependência transitiva": atributos comuns não podem depender de outros atributos comuns, eles devem depender apenas e diretamente da Chave Primária.</p>
                      
                      {/* Demonstração */}
                      <p>Considere uma tabela inicial desastrosa de "Pedidos": <code>[ID_Pedido, ID_Produto, Nome_Cliente, Tel_Cliente, Nome_Produto, Preço_Unit, Quantidade, Valor_Total]</code>. A chave primária é composta por (ID_Pedido, ID_Produto). Analisando pela 1FN, se o Tel_Cliente permitir múltiplos telefones por linha, falhamos. Aplicando a 2FN: o <code>Nome_Produto</code> depende apenas do <code>ID_Produto</code> (parte da PK), e não do ID_Pedido. Isso é dependência parcial! Extraímos <code>Nome_Produto</code> e <code>Preço</code> para uma tabela nova de "Produtos".</p>
                      
                      <p>Finalmente, aplicando a 3FN na tabela de Pedidos restante, percebemos que o <code>Tel_Cliente</code> depende de <code>Nome_Cliente</code>, e não diretamente do Pedido. Ou seja, se o cliente mudar de telefone, teríamos que atualizar centenas de linhas de pedidos antigos. Isso é a dependência transitiva (Coluna A depende de Coluna B que não é a Chave). A solução é criar uma terceira tabela dedicada de "Clientes". A normalização transformou uma tabela obesa e propensa a erros em três tabelas coesas (Clientes, Produtos, Itens_Pedido) ligadas impecavelmente por Chaves Estrangeiras.</p>
                      
                      {/* Expansão */}
                      <p>As garantias vitais de um sistema transacional (como uma transferência bancária) baseiam-se no paradigma <strong>ACID</strong>, sagrado em provas. <em>Atomicidade (A)</em> garante o "Tudo ou Nada" (se o banco A debitar, o banco B tem que creditar; se algo falhar, tudo é desfeito - Rollback). <em>Consistência (C)</em> assegura que a transação levará o banco de um estado válido para outro estado válido, respeitando regras como chaves e gatilhos (trigers). <em>Isolamento (I)</em> blinda transações que ocorrem ao mesmo tempo, impedindo que uma transação leia dados pela metade de outra (controle de concorrência). <em>Durabilidade (D)</em> crava que, uma vez confirmada (Commit), a mudança está permanentemente salva no disco físico e resistirá até a falta de energia.</p>
                      
                      <p>No domínio da linguagem SQL (Structured Query Language), os comandos são divididos em categorias cirúrgicas. <strong>DDL (Data Definition Language)</strong> trata a estrutura (CREATE, ALTER, DROP, TRUNCATE). <strong>DML (Data Manipulation Language)</strong> trata os dados dentro da tabela (INSERT, UPDATE, DELETE). Muitos candidatos confundem o DELETE (DML) com o DROP/TRUNCATE (DDL). O DELETE remove as linhas especificadas (podendo ser desfeito com rollback em alguns casos), o TRUNCATE esvazia a tabela instantaneamente de forma definitiva (reseta as chaves, sem logs individuais de linhas), e o DROP aniquila a própria estrutura da tabela da face da terra.</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>As questões de Normalização da CESGRANRIO são precisas e teóricas. Um gatilho mental vital para a prova: Se a Chave Primária da tabela for SIMPLES (apenas 1 coluna, ex: ID), a tabela <strong>automaticamente, matematicamente e inquestionavelmente</strong> já está na 2ª Forma Normal (assumindo que já estava na 1FN). Por quê? Porque a violação da 2FN exige que o atributo dependa de "PARTE" da chave. Se a chave tem apenas um campo, ela não tem partes. A CESGRANRIO frequentemente coloca uma tabela com chave primária simples e pergunta se ela fere a 2FN: a resposta é NÃO.</p>
                      
                      <p>Outro alvo constante da banca são as propriedades ACID, misturando os conceitos de Atomicidade e Isolamento. A pegadinha clássica afirma que o <em>Isolamento</em> garante o "Tudo ou Nada" do Commit/Rollback. Isso é FALSO. O Tudo ou Nada (falha no meio da operação refaz todo o processo) pertence à <strong>Atomicidade</strong>. O Isolamento (Isolation) lida unicamente com transações simultâneas, os problemas de leituras "sujas" (Dirty Reads), leituras fantasmas (Phantom Reads) e a garantia de que as transações ocorram como se fossem seriais. Gravar essa divisão semântica salva preciosos pontos de gabarito.</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuKey",
            frontTitle: "Integridade de Entidade vs Referencial",
            backTitle: "A Regra das Chaves",
            backContent: "Integridade de ENTIDADE garante que a Chave Primária (PK) nunca seja NULA e seja única (para garantir a identidade da linha). Integridade REFERENCIAL garante que o valor de uma Chave Estrangeira (FK) só contenha valores que existem na PK da tabela apontada, ou que a FK seja nula.",
          },
          {
            frontIcon: "LuFilter",
            frontTitle: "2ª Forma Normal (2FN)",
            backTitle: "Dependência Parcial",
            backContent: "Para estar na 2FN, deve estar na 1FN e NÃO possuir dependências funcionais PARCIAIS. Atributos não chave devem depender da Chave Primária INTEIRA, não de apenas parte dela. MACETE: Se a PK for SIMPLES, a tabela já está na 2FN.",
          },
          {
            frontIcon: "LuSplitSquareHorizontal",
            frontTitle: "3ª Forma Normal (3FN)",
            backTitle: "Dependência Transitiva",
            backContent: "Para estar na 3FN, deve estar na 2FN e NÃO possuir dependências TRANSITIVAS. Ou seja, um atributo 'comum' não pode depender de outro atributo 'comum', ele deve depender apenas diretamente da Chave Primária. (Ex: O estado da federação depende do CEP, não do ID do Cliente).",
          },
          {
            frontIcon: "LuShieldCheck",
            frontTitle: "O Paradigma A.C.I.D",
            backTitle: "Transações Confiáveis",
            backContent: "A (Atomicidade - Tudo ou Nada, Commit/Rollback); C (Consistência - Estado válido mantendo regras do BD); I (Isolamento - Transações não interferem umas nas outras); D (Durabilidade - Dados salvos fisicamente resistem a quedas de energia).",
          },
          {
            frontIcon: "LuCode",
            frontTitle: "DDL vs DML",
            backTitle: "Estrutura vs Dados",
            backContent: "DDL (Linguagem de Definição de Dados): Mexe na 'Estrutura' (CREATE, ALTER, DROP, TRUNCATE). DML (Linguagem de Manipulação de Dados): Mexe na 'Massa de Dados/Linhas' (INSERT, UPDATE, DELETE). O comando SELECT é frequentemente catalogado isoladamente como DQL.",
          },
          {
            frontIcon: "LuTarget",
            frontTitle: "Pegadinha CESGRANRIO (DELETE vs TRUNCATE)",
            backTitle: "A Diferença na Prática",
            backContent: "Ambos esvaziam dados. Mas o DELETE (DML) apaga linha por linha e grava logs pesados, permitindo restrição WHERE e Rollback (desfazer). O TRUNCATE (DDL) esvazia a tabela instantaneamente e reseta sequenciais, de forma muito mais rápida, sem desfazer (via de regra).",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "Modelagem Lógica e ACID",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-6 shadow-inner border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-emerald-500">
                <h4 className="font-bold text-emerald-400">1FN</h4>
                <p className="text-sm mt-2">Sem Grupos Repetitivos e Atributos atômicos (indivisíveis).</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-blue-500">
                <h4 className="font-bold text-blue-400">2FN</h4>
                <p className="text-sm mt-2">Depende da PK <span className="font-bold text-white uppercase">Inteira</span> (Sem dependência Parcial).</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-purple-500">
                <h4 className="font-bold text-purple-400">3FN</h4>
                <p className="text-sm mt-2">Depende <span className="font-bold text-white uppercase">Apenas</span> da PK (Sem dependência Transitiva).</p>
              </div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h4 className="text-amber-400 font-bold mb-2 flex items-center justify-center gap-2">🔥 Matriz ACID</h4>
              <ul className="text-sm space-y-1 w-fit mx-auto">
                <li><span className="font-bold text-amber-200">A</span>tomicidade ➔ Tudo ou Nada (Rollback)</li>
                <li><span className="font-bold text-amber-200">C</span>onsistência ➔ Integridade sempre válida</li>
                <li><span className="font-bold text-amber-200">I</span>solamento ➔ Concorrência oculta/independente</li>
                <li><span className="font-bold text-amber-200">D</span>urabilidade ➔ Salvo p/ sempre (pós-Commit)</li>
              </ul>
            </div>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 6",
        tituloAula: "Bancos de Dados SQL",
        materia: "Engenharia de Software",
        images: [
          {
            title: "Processo de Normalização",
            type: "Infográfico",
            placeholderColor: "indigo",
            imageUrl: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=2073&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 6,
        moduloTitulo: "Bancos Relacionais (SQL)",
        conteudoResumo: "Mergulho nas Formas Normais, restrições DDL/DML e as 4 propriedades infalíveis do ACID.",
      }
    }
  },

  7: {
    secoes: [
      {
        index: "INTRO",
        title: "NoSQL e Big Data",
        accordions: [
          {
            titulo: "C.E.D.E.A - Bancos Não-Relacionais, Teorema CAP e Ecossistema Hadoop",
            icone: "🌐",
            corIndicador: "bg-teal-500",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>Os bancos de dados relacionais (SQL) reinaram soberanos por décadas, mas a explosão exponencial de dados digitais no século XXI expôs limitações estruturais irreconciliáveis. Redes sociais gerando bilhões de postagens por dia, sensores IoT em plataformas de petróleo emitindo streams de dados contínuos e aplicações web com milhões de usuários simultâneos revelaram que o modelo relacional, por mais robusto que seja em consistência, não foi concebido para escalar horizontalmente de forma elástica. Nasceu então o movimento <strong>NoSQL (Not Only SQL)</strong>, que não busca substituir o SQL, mas complementá-lo para cenários onde flexibilidade, velocidade e volume são prioritários sobre a rigidez transacional.</p>
                      
                      <p>Na Petrobras, os dados de telemetria de poços, imagens sísmicas e logs de sensores de campo geram volumes que ultrapassam facilmente a casa dos petabytes. Armazenar essas massas em tabelas normalizadas com JOINs complexos seria computacionalmente proibitivo e operacionalmente lento demais para a tomada de decisão em tempo real. O conceito de <strong>Big Data</strong> — definido classicamente pelos 5 Vs: Volume, Velocidade, Variedade, Veracidade e Valor — exige uma infraestrutura de armazenamento e processamento fundamentalmente diferente da arquitetura cliente-servidor tradicional dos SGBDs relacionais.</p>
                      
                      {/* Explicação */}
                      <p>Os bancos NoSQL são classificados em quatro categorias principais, cada uma otimizada para um padrão de acesso específico. Os <strong>Bancos Chave-Valor</strong> (Key-Value), como o Redis e o DynamoDB, são os mais simples e rápidos: cada registro é um par (chave → valor), sem esquema rígido, ideais para cache e sessões de usuário. Os <strong>Bancos de Documentos</strong> (Document), como o MongoDB e o CouchDB, armazenam dados em documentos semi-estruturados (geralmente JSON/BSON), permitindo que cada documento tenha uma estrutura diferente — perfeito para catálogos de produtos ou perfis de usuário que variam.</p>
                      
                      <p>Os <strong>Bancos Colunares</strong> (Wide-Column), como o Cassandra e o HBase, organizam os dados por colunas em vez de linhas, otimizando massivamente consultas analíticas que precisam ler apenas um subconjunto de atributos de bilhões de registros (ex: somar todas as temperaturas de todos os sensores do último mês). Por fim, os <strong>Bancos de Grafos</strong>, como o Neo4j e o Amazon Neptune, modelam dados como nós e arestas, sendo imbatíveis para representar relacionamentos complexos e navegá-los em profundidade (ex: redes sociais, detecção de fraude, mapas de conhecimento corporativo). Cada tipo sacrifica algo do modelo ACID para ganhar em escalabilidade.</p>
                      
                      {/* Demonstração */}
                      <p>Na operação da Petrobras, um sistema de monitoramento de poços submarinos utiliza um banco <strong>Chave-Valor (Redis)</strong> como cache de alta velocidade para exibir em tempo real no painel do engenheiro as últimas leituras de pressão e temperatura, com latência inferior a 1 milissegundo. Simultaneamente, esses dados são gravados em um banco <strong>Colunar (Cassandra)</strong> distribuído em 10 servidores globalmente, permitindo que analistas façam consultas históricas sobre bilhões de leituras sem derrubar o sistema. A escolha do tipo NoSQL adequado depende inteiramente do padrão de leitura e escrita (read-heavy vs write-heavy).</p>
                      
                      <p>Para o processamento massivo desses dados armazenados, o ecossistema <strong>Hadoop</strong> tornou-se o padrão da indústria. O <em>HDFS (Hadoop Distributed File System)</em> divide arquivos gigantes em blocos de 128MB e os replica automaticamente em múltiplos servidores commodity (baratos), garantindo tolerância a falhas. O <em>MapReduce</em> é o modelo de programação que processa esses dados em duas fases: o <em>Map</em> fragmenta e filtra os dados em pares (chave, valor) em paralelo nos nós; o <em>Reduce</em> agrega e consolida os resultados. O Apache <em>Spark</em> superou o MapReduce ao processar dados em memória RAM (em vez de disco), sendo até 100x mais rápido para análises iterativas.</p>
                      
                      {/* Expansão */}
                      <p>O conceito mais importante e mais cobrado em provas sobre sistemas distribuídos é o <strong>Teorema CAP (de Eric Brewer)</strong>. Ele afirma que um sistema distribuído pode garantir, no máximo, duas das três propriedades simultaneamente: <em>Consistência (C)</em> — todos os nós veem o mesmo dado ao mesmo tempo; <em>Disponibilidade (A - Availability)</em> — toda requisição recebe uma resposta, mesmo que não seja a mais recente; e <em>Tolerância a Partição (P)</em> — o sistema continua operando mesmo quando a comunicação entre os nós falha. Como partições de rede são inevitáveis em sistemas distribuídos, na prática a escolha real é entre CP (consistência) e AP (disponibilidade).</p>
                      
                      <p>Expandindo para o ecossistema moderno de Big Data, o <strong>Apache Kafka</strong> é a plataforma de streaming de eventos em tempo real, funcionando como um log distribuído e imutável que permite que múltiplos consumidores leiam os mesmos dados independentemente (pub/sub). O <strong>Apache Hive</strong> permite fazer consultas SQL sobre dados armazenados no HDFS, democratizando o acesso para analistas que não sabem programar em Java/Scala. E o conceito de <em>Data Lake</em> (como um S3 na AWS) permite armazenar dados brutos (estruturados, semi-estruturados e não-estruturados) em seu formato nativo, sem a necessidade de transformá-los antes da carga — filosofia oposta ao Data Warehouse tradicional (ETL vs ELT).</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>A CESGRANRIO adora o <strong>Teorema CAP</strong> e suas implicações práticas. A pegadinha clássica é afirmar que um sistema distribuído pode ter Consistência, Disponibilidade E Tolerância a Partições simultaneamente. Isso é FALSO pelo teorema. A banca também cobra a classificação dos bancos NoSQL: ela descreve um cenário (ex: "armazenar relacionamentos de amizade entre milhões de usuários e encontrar caminhos entre eles") e pergunta qual tipo de banco NoSQL é mais adequado. Neste caso, a resposta é inequivocamente <strong>Banco de Grafos</strong>, pois a travessia de relacionamentos é sua especialidade nativa.</p>
                      
                      <p>Outro alvo constante é a diferença entre <em>Data Warehouse</em> e <em>Data Lake</em>. O Data Warehouse (DW) armazena dados <strong>estruturados e já processados</strong> (schema-on-write), otimizados para consultas analíticas repetitivas (OLAP). O Data Lake armazena dados <strong>brutos e em qualquer formato</strong> (schema-on-read), sendo muito mais flexível mas exigindo governança severa para não virar um "data swamp" (pântano de dados). A CESGRANRIO frequentemente inverte essas definições nas alternativas, afirmando que o DW aceita dados não-estruturados ou que o Data Lake exige transformação prévia dos dados.</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuDatabase",
            frontTitle: "4 Tipos de NoSQL",
            backTitle: "Cada Um Para Um Caso",
            backContent: "Chave-Valor (Redis): Cache ultra-rápido. Documentos (MongoDB): JSON flexível. Colunar (Cassandra): Análise de bilhões de registros. Grafos (Neo4j): Travessia de relacionamentos complexos (redes sociais, fraude).",
          },
          {
            frontIcon: "LuTriangle",
            frontTitle: "Teorema CAP",
            backTitle: "Escolha Apenas 2 de 3",
            backContent: "Consistência (todos veem o mesmo dado), Disponibilidade (sempre responde) e Tolerância a Partição (rede pode falhar). Sistemas distribuídos DEVEM tolerar partições (P), então a escolha real é: CP ou AP.",
          },
          {
            frontIcon: "LuHardDrive",
            frontTitle: "HDFS (Hadoop)",
            backTitle: "Sistema de Arquivos Distribuído",
            backContent: "Divide arquivos gigantes em blocos (padrão 128MB) e os replica em múltiplos servidores commodity. Se um servidor morre, o dado ainda está disponível nas réplicas. É a base de armazenamento do ecossistema Hadoop.",
          },
          {
            frontIcon: "LuZap",
            frontTitle: "Spark vs MapReduce",
            backTitle: "Memória vs Disco",
            backContent: "MapReduce: Processa dados gravando resultados intermediários em disco (lento para iterações). Spark: Processa dados em MEMÓRIA RAM, sendo até 100x mais rápido para análises iterativas e machine learning.",
          },
          {
            frontIcon: "LuWarehouse",
            frontTitle: "Data Warehouse vs Data Lake",
            backTitle: "Processado vs Bruto",
            backContent: "Data Warehouse: Dados ESTRUTURADOS e já processados (schema-on-write, ETL). Data Lake: Dados BRUTOS em qualquer formato (schema-on-read, ELT). O DW é otimizado para consultas OLAP; o Lake é flexível mas exige governança.",
          },
          {
            frontIcon: "LuRadio",
            frontTitle: "Apache Kafka",
            backTitle: "Streaming em Tempo Real",
            backContent: "Plataforma de streaming de eventos (pub/sub). Funciona como um log distribuído e imutável. Múltiplos consumidores leem independentemente. Ideal para ingestão de dados de sensores IoT e eventos de aplicação.",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "NoSQL, CAP e Big Data",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-6 shadow-inner border border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-800 p-3 rounded-lg border-t-4 border-red-500">
                <h4 className="font-bold text-red-400 text-sm">🔑 Chave-Valor</h4>
                <p className="text-xs mt-1">Redis, DynamoDB</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border-t-4 border-emerald-500">
                <h4 className="font-bold text-emerald-400 text-sm">📄 Documentos</h4>
                <p className="text-xs mt-1">MongoDB, CouchDB</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border-t-4 border-blue-500">
                <h4 className="font-bold text-blue-400 text-sm">📊 Colunar</h4>
                <p className="text-xs mt-1">Cassandra, HBase</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border-t-4 border-purple-500">
                <h4 className="font-bold text-purple-400 text-sm">🕸️ Grafos</h4>
                <p className="text-xs mt-1">Neo4j, Neptune</p>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
              <h4 className="text-amber-400 font-bold mb-2">⚠️ Teorema CAP</h4>
              <p className="text-sm">"Em sistema distribuído, partições acontecem. Escolha: <span className="font-bold text-emerald-400">Consistência (CP)</span> ou <span className="font-bold text-blue-400">Disponibilidade (AP)</span>"</p>
            </div>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 7",
        tituloAula: "NoSQL e Big Data",
        materia: "Engenharia de Software",
        images: [
          {
            title: "Ecossistema Hadoop e Spark",
            type: "Infográfico",
            placeholderColor: "teal",
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 7,
        moduloTitulo: "NoSQL e Big Data",
        conteudoResumo: "Os 4 tipos de NoSQL, o Teorema CAP e a diferença entre Data Warehouse e Data Lake.",
      }
    }
  },

  8: {
    secoes: [
      {
        index: "INTRO",
        title: "Microsserviços, APIs e Contêineres",
        accordions: [
          {
            titulo: "C.E.D.E.A - SOA, REST, GraphQL, Docker e Kubernetes",
            icone: "🐳",
            corIndicador: "bg-cyan-500",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>A evolução natural da arquitetura de software levou o mercado do monolito inchado para os sistemas distribuídos modulares. Quando uma aplicação gigante (monolítica) precisa escalar, a única opção é escalar tudo junto (scaling vertical — comprar mais CPU/RAM para o mesmo servidor), o que é caro e limitado. A <strong>Arquitetura de Microsserviços</strong> nasceu para resolver isso: cada funcionalidade do negócio (ex: autenticação, pagamentos, catálogo) é um serviço independente, com seu próprio banco de dados, seu próprio deploy e sua própria equipe. Microsserviços escalam horizontalmente (adicionando mais instâncias do serviço específico que está sobrecarregado).</p>
                      
                      <p>Antes dos microsserviços, a indústria já havia tentado resolver o problema da modularidade com a <strong>Arquitetura SOA (Service-Oriented Architecture)</strong>. SOA é o avô dos microsserviços. A diferença fundamental é o grão: SOA usava um <em>ESB (Enterprise Service Bus)</em> centralizado — um barramento pesado que orquestrava toda a comunicação entre serviços, criando um ponto único de falha e acoplamento. Os microsserviços eliminam o ESB, usando comunicação leve e descentralizada (HTTP/REST ou mensageria assíncrona). A CESGRANRIO ama comparar SOA com Microsserviços.</p>
                      
                      {/* Explicação */}
                      <p>Para que microsserviços se comuniquem, eles expõem <strong>APIs (Application Programming Interfaces)</strong>. O padrão dominante é o <strong>REST (Representational State Transfer)</strong>, que usa os verbos HTTP (GET para ler, POST para criar, PUT para atualizar, DELETE para remover) e trata os dados como "recursos" acessíveis por URLs. Uma API REST é <em>stateless</em> (sem estado): cada requisição deve conter toda a informação necessária para ser processada, sem depender de sessões do lado do servidor. O formato de troca de dados padrão é o JSON.</p>
                      
                      <p>Uma alternativa moderna ao REST é o <strong>GraphQL</strong>, criado pelo Facebook. Diferente do REST, onde cada endpoint retorna uma estrutura fixa de dados (frequentemente trazendo dados a mais — over-fetching — ou de menos — under-fetching), o GraphQL permite que o <em>cliente</em> especifique exatamente quais campos e relações quer receber em uma única requisição. Ele usa um único endpoint (geralmente POST /graphql) e uma linguagem de consulta própria. Para aplicações mobile que precisam economizar banda, o GraphQL é particularmente poderoso. Já o <strong>gRPC</strong>, do Google, usa o protocolo HTTP/2 e Protocol Buffers (binário, muito mais eficiente que JSON) para comunicação de altíssima performance entre microsserviços internos.</p>
                      
                      {/* Demonstração */}
                      <p>Considere o portal de licitações da Petrobras sendo migrado de um monolito para microsserviços. O serviço de "Autenticação" (Login/JWT) roda em 2 instâncias; o de "Catálogo de Editais" roda em 5 instâncias (alta leitura); e o de "Processamento de Propostas" roda em 3 instâncias (alta escrita). Cada um tem seu banco de dados isolado (pattern "Database per Service"). Se o volume de acessos ao Catálogo dispara na véspera de um pregão, a equipe de Ops escala apenas esse microsserviço para 20 instâncias, sem tocar nos demais — impossível em um monolito.</p>
                      
                      <p>Para empacotar e isolar cada microsserviço de forma padronizada, a tecnologia de <strong>contêineres (Docker)</strong> revolucionou a infraestrutura. Um contêiner encapsula a aplicação, suas dependências, bibliotecas e configuração em uma unidade leve e portátil (a "imagem Docker"). Diferente de uma Máquina Virtual (VM), o contêiner não precisa de um sistema operacional completo — ele compartilha o kernel do host, sendo muito mais leve e rápido para iniciar. O <strong>Kubernetes (K8s)</strong>, criado pelo Google, é o orquestrador que gerencia centenas de contêineres em produção: ele automatiza o deploy, o scaling, o balanceamento de carga e a auto-recuperação (se um contêiner morre, o K8s sobe outro automaticamente).</p>
                      
                      {/* Expansão */}
                      <p>Um padrão arquitetural essencial em microsserviços é o <strong>API Gateway</strong>. Em vez de o frontend chamar dezenas de microsserviços diretamente (cada um com sua URL, protocolo de autenticação e rate limiting), todas as requisições passam por um único ponto de entrada inteligente — o Gateway (ex: Kong, AWS API Gateway, NGINX). Ele faz roteamento, autenticação centralizada, rate limiting, caching e transformação de protocolos. Outro padrão vital é o <em>Circuit Breaker</em> (inspirado em disjuntores elétricos): se um microsserviço downstream falha repetidamente, o Circuit Breaker "abre" e para de chamá-lo temporariamente, evitando que a falha cascateie e derrube o sistema inteiro.</p>
                      
                      <p>A <strong>observabilidade</strong> é o calcanhar de Aquiles dos microsserviços. Em um monolito, uma requisição percorre um único processo. Em microsserviços, uma única ação do usuário pode atravessar 10 serviços diferentes. O <em>Distributed Tracing</em> (rastreamento distribuído, ex: Jaeger, Zipkin) propaga um ID único pela cadeia inteira de chamadas, permitindo rastrear exatamente onde ocorreu a lentidão ou a falha. A tríade da observabilidade moderna é: <em>Logs</em> (registros textuais de eventos), <em>Métricas</em> (números agregados como latência, taxa de erro) e <em>Traces</em> (o caminho de uma requisição entre os serviços).</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>A CESGRANRIO cobra frequentemente a diferença entre <strong>SOA e Microsserviços</strong>. O macete é: SOA usa ESB (barramento centralizado, pesado, acoplamento); Microsserviços usam comunicação leve e descentralizada (REST/mensageria). Sobre REST, a banca adora perguntar sobre os verbos HTTP: GET é idempotente e seguro (não altera dados), POST não é idempotente (criar o mesmo recurso duas vezes gera duplicidade), PUT é idempotente (enviar o mesmo update N vezes produz o mesmo resultado). DELETE também é idempotente (deletar algo que já foi deletado não causa efeito adicional).</p>
                      
                      <p>Sobre contêineres, a pegadinha favorita é comparar <strong>Docker com Máquina Virtual (VM)</strong>. A VM virtualiza o hardware inteiro e roda um SO completo guest por cima de um hypervisor, sendo pesada (GBs de tamanho, minutos para iniciar). O contêiner Docker virtualiza apenas o nível do SO, compartilha o kernel do host e é extremamente leve (MBs, segundos para iniciar). A banca também cobra o papel do <strong>Kubernetes</strong>: ele NÃO é um contêiner, ele é o <em>orquestrador</em> que gerencia contêineres em escala — auto-scaling, self-healing, rolling updates e service discovery.</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuBoxes",
            frontTitle: "SOA vs Microsserviços",
            backTitle: "O ESB é a Diferença-Chave",
            backContent: "SOA: Usa ESB centralizado (pesado, ponto único de falha). Microsserviços: Comunicação leve e descentralizada (REST, mensageria). Microsserviços = 'Database per Service', deploy independente, equipe autônoma.",
          },
          {
            frontIcon: "LuGlobe",
            frontTitle: "API REST (Verbos HTTP)",
            backTitle: "CRUD mapeado em HTTP",
            backContent: "GET = Ler (idempotente, seguro). POST = Criar (NÃO idempotente). PUT = Atualizar tudo (idempotente). PATCH = Atualizar parcial. DELETE = Remover (idempotente). Stateless: cada request é autossuficiente.",
          },
          {
            frontIcon: "LuContainer",
            frontTitle: "Docker vs Máquina Virtual",
            backTitle: "Kernel Compartilhado vs SO Completo",
            backContent: "VM: Virtualiza HARDWARE, roda SO guest completo por cima de um hypervisor. Pesada (GBs, minutos). Docker: Virtualiza SO, compartilha kernel do host. Leve (MBs, segundos). Ambos isolam, mas Docker é mais eficiente.",
          },
          {
            frontIcon: "LuNetwork",
            frontTitle: "API Gateway",
            backTitle: "Ponto Único de Entrada",
            backContent: "Todas as requisições do frontend passam pelo Gateway. Ele centraliza: autenticação, roteamento, rate limiting e caching. Evita que o cliente conheça URLs internas de dezenas de microsserviços.",
          },
          {
            frontIcon: "LuShieldAlert",
            frontTitle: "Circuit Breaker",
            backTitle: "O Disjuntor Digital",
            backContent: "Se um microsserviço downstream falha repetidamente, o Circuit Breaker 'abre' e PARA de chamá-lo temporariamente, retornando um fallback. Evita que a falha cascateie e derrube o sistema inteiro (efeito dominó).",
          },
          {
            frontIcon: "LuScanLine",
            frontTitle: "Observabilidade (3 Pilares)",
            backTitle: "Logs, Métricas e Traces",
            backContent: "Logs: registros textuais de eventos. Métricas: números agregados (latência, taxa de erro). Traces: caminho de uma requisição entre microsserviços (Distributed Tracing - Jaeger/Zipkin). Os 3 juntos = Observabilidade.",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "Microsserviços e Contêineres",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-6 shadow-inner border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-bold text-cyan-400 mb-2">🐳 Docker vs VM</h4>
                <ul className="text-sm space-y-1">
                  <li>Docker → Compartilha Kernel (Leve, MBs)</li>
                  <li>VM → SO Guest Completo (Pesada, GBs)</li>
                  <li>K8s → Orquestra contêineres em escala</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-amber-500">
                <h4 className="font-bold text-amber-400 mb-2">🔄 Verbos REST (Idempotência)</h4>
                <ul className="text-sm space-y-1">
                  <li>GET ✅ POST ❌ PUT ✅ DELETE ✅</li>
                  <li>Idempotente = N chamadas = mesmo resultado</li>
                  <li>Stateless = Sem sessão no servidor</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 8",
        tituloAula: "Microsserviços e APIs",
        materia: "Engenharia de Software",
        images: [
          {
            title: "Arquitetura de Microsserviços",
            type: "Diagrama",
            placeholderColor: "cyan",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 8,
        moduloTitulo: "Microsserviços, APIs e Docker",
        conteudoResumo: "SOA vs Microsserviços, verbos REST, Docker vs VM e os padrões essenciais como API Gateway e Circuit Breaker.",
      }
    }
  },

  9: {
    secoes: [
      {
        index: "INTRO",
        title: "Segurança no Desenvolvimento de Software",
        accordions: [
          {
            titulo: "C.E.D.E.A - OWASP, Criptografia, OAuth e DevSecOps",
            icone: "🔒",
            corIndicador: "bg-red-600",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>O desenvolvimento de software sem segurança é como construir um cofre com a porta aberta. Em empresas como a Petrobras, onde os sistemas processam informações classificadas de geologia, contratos bilionários e dados pessoais de milhares de funcionários (regidos pela LGPD), a segurança não é um módulo opcional agregado ao final do projeto — ela deve ser integrada desde a fase de requisitos. O conceito de <strong>Security by Design (Segurança por Projeto)</strong> garante que as vulnerabilidades sejam prevenidas na arquitetura, e não remendadas após um incidente humilhante e público.</p>
                      
                      <p>O custo de corrigir uma vulnerabilidade descoberta em produção é exponencialmente maior do que corrigi-la na fase de design. A <strong>OWASP (Open Web Application Security Project)</strong> mantém o famoso "OWASP Top 10", uma lista das 10 vulnerabilidades mais críticas em aplicações web, atualizada periodicamente. Para a CESGRANRIO, conhecer essa lista e saber diferenciar cada tipo de ataque (Injection, XSS, CSRF, etc.) é um requisito inegociável para candidatos de nível superior em TI, pois as questões frequentemente descrevem cenários de ataque e pedem a classificação correta.</p>
                      
                      {/* Explicação */}
                      <p>A vulnerabilidade mais devastadora e historicamente cobrada é a <strong>Injeção (Injection)</strong>, especialmente a <em>SQL Injection</em>. Ela ocorre quando dados fornecidos pelo usuário (ex: campo de login) são concatenados diretamente em uma consulta SQL sem sanitização. Um atacante insere código SQL malicioso (ex: <code>{"' OR '1'='1"}</code>) que altera a lógica da query, podendo ler, modificar ou destruir todo o banco de dados. A defesa padrão é o uso de <em>Prepared Statements (Consultas Parametrizadas)</em>, onde os dados do usuário são tratados como literais e nunca como código executável.</p>
                      
                      <p>O <strong>XSS (Cross-Site Scripting)</strong> é outra vulnerabilidade do OWASP Top 10. Ele permite que um atacante injete scripts maliciosos (JavaScript) em páginas web vistas por outros usuários. No XSS <em>Stored (Persistente)</em>, o script é salvo no banco de dados (ex: em um comentário) e executado toda vez que outro usuário acessa a página. No XSS <em>Reflected (Refletido)</em>, o script é embutido na URL e executado apenas quando a vítima clica no link malicioso. A defesa é a <em>sanitização/encoding</em> de todas as saídas HTML e a aplicação de Content Security Policy (CSP) no cabeçalho HTTP.</p>
                      
                      {/* Demonstração */}
                      <p>No cenário de autenticação moderna, o padrão <strong>OAuth 2.0</strong> é o protocolo de autorização dominante. Ele permite que um usuário autorize um aplicativo terceiro (ex: "Login com Google") a acessar seus dados sem compartilhar sua senha. O fluxo mais seguro para aplicações web é o <em>Authorization Code Flow</em>: o usuário é redirecionado para o provedor de identidade (ex: Google), autentica-se, recebe um código temporário, e o aplicativo troca esse código por um <em>Access Token</em> (e opcionalmente um <em>Refresh Token</em>) no backend, de forma segura e invisível ao navegador.</p>
                      
                      <p>Para proteger a integridade e a autenticidade dos dados, a <strong>Criptografia</strong> é fundamental. A <em>Criptografia Simétrica</em> (AES, 3DES) usa a MESMA chave para cifrar e decifrar — rápida, mas com o problema da distribuição segura da chave compartilhada. A <em>Criptografia Assimétrica</em> (RSA, ECC) usa um PAR de chaves: a <em>chave pública</em> (que pode ser distribuída livremente) cifra a mensagem, mas SOMENTE a <em>chave privada</em> (secreta, que nunca sai do dono) pode decifrá-la. O HTTPS (TLS/SSL) usa os dois: a assimétrica para trocar a chave de sessão com segurança, e depois a simétrica para a comunicação rápida do restante da sessão.</p>
                      
                      {/* Expansão */}
                      <p>O <strong>Hashing</strong> é frequentemente confundido com criptografia, mas são conceitos diferentes. O hash (SHA-256, bcrypt) é uma função <em>unidirecional</em> (one-way): transforma dados de qualquer tamanho em uma sequência fixa de caracteres (o "digest"), e é computacionalmente inviável reverter o processo. O hash é usado para verificar integridade (se o arquivo foi alterado) e para armazenar senhas (nunca se armazena a senha em texto claro, mas sim seu hash). A <em>Assinatura Digital</em> combina o hash com a criptografia assimétrica: o remetente calcula o hash da mensagem e o cifra com sua <em>chave privada</em>; o destinatário verifica com a chave pública, garantindo autenticidade (quem assinou) e integridade (o conteúdo não foi alterado).</p>
                      
                      <p>A cultura <strong>DevSecOps</strong> integra a segurança diretamente na pipeline CI/CD (Dev + Sec + Ops). Ferramentas de <em>SAST (Static Application Security Testing)</em> analisam o código-fonte em busca de vulnerabilidades antes da compilação. Ferramentas de <em>DAST (Dynamic Application Security Testing)</em> atacam a aplicação já em execução simulando um hacker. E o <em>SCA (Software Composition Analysis)</em> verifica as bibliotecas de terceiros (dependências) em busca de vulnerabilidades conhecidas (CVEs), pois grande parte dos ataques modernos explora bibliotecas open-source desatualizadas na cadeia de suprimentos do software.</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>A CESGRANRIO é cirúrgica na diferença entre <strong>Criptografia Simétrica e Assimétrica</strong>. A regra para a prova: Simétrica = 1 chave (rápida, usada para dados em volume, problema de distribuição). Assimétrica = 2 chaves (lenta, resolve o problema de distribuição, usada para troca de chaves e assinatura digital). A banca adora inverter: afirma que a assimétrica usa uma única chave ou que a simétrica é mais segura para troca de chaves na internet — ambas FALSAS.</p>
                      
                      <p>Sobre o OWASP, a banca descreve um cenário de ataque e pede a classificação. A regra de ouro: se o atacante <em>insere código em uma consulta ao banco</em> → <strong>Injection</strong>. Se o atacante <em>insere script JavaScript que é executado no navegador de outro usuário</em> → <strong>XSS</strong>. Se o atacante <em>forja uma requisição usando a sessão autenticada da vítima</em> (sem o conhecimento dela, por exemplo em um link malicioso que executa uma ação) → <strong>CSRF (Cross-Site Request Forgery)</strong>. Memorize: Injection ataca o servidor (banco), XSS ataca o navegador (cliente), CSRF ataca a sessão (autenticação).</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuSyringe",
            frontTitle: "SQL Injection",
            backTitle: "Dados Viram Código Malicioso",
            backContent: "O atacante insere código SQL no campo de input, alterando a lógica da query no banco. Defesa: Prepared Statements (consultas parametrizadas) onde o input do usuário NUNCA é tratado como comando SQL.",
          },
          {
            frontIcon: "LuCode",
            frontTitle: "XSS vs CSRF",
            backTitle: "Navegador vs Sessão",
            backContent: "XSS: Atacante injeta JavaScript que executa no navegador DA VÍTIMA (roubo de cookies). CSRF: Atacante forja requisição usando a sessão JÁ AUTENTICADA da vítima (ação sem consentimento). XSS ataca o browser, CSRF ataca a sessão.",
          },
          {
            frontIcon: "LuKeyRound",
            frontTitle: "Simétrica vs Assimétrica",
            backTitle: "1 Chave vs 2 Chaves",
            backContent: "Simétrica (AES): 1 chave = cifrar E decifrar (rápida, problema de distribuição). Assimétrica (RSA): 2 chaves (pública cifra, privada decifra). HTTPS usa os dois: assimétrica para trocar a chave, simétrica para o tráfego.",
          },
          {
            frontIcon: "LuFingerprint",
            frontTitle: "Hash vs Criptografia",
            backTitle: "Unidirecional vs Reversível",
            backContent: "Hash (SHA-256, bcrypt): ONE-WAY, irreversível. Usado para senhas e integridade. Criptografia: REVERSÍVEL (quem tem a chave decifra). Assinatura Digital = Hash cifrado com a chave PRIVADA do remetente.",
          },
          {
            frontIcon: "LuShieldCheck",
            frontTitle: "SAST vs DAST",
            backTitle: "Estático vs Dinâmico",
            backContent: "SAST (Estático): Analisa o CÓDIGO-FONTE antes da compilação. DAST (Dinâmico): Ataca a aplicação EM EXECUÇÃO simulando um hacker. SCA: Verifica vulnerabilidades em bibliotecas de terceiros (dependências).",
          },
          {
            frontIcon: "LuLock",
            frontTitle: "OAuth 2.0",
            backTitle: "Autorização (Não Autenticação!)",
            backContent: "Protocolo de AUTORIZAÇÃO. O usuário autoriza o app a acessar seus dados SEM compartilhar a senha. Fluxo seguro: Authorization Code Flow. Access Token = curta duração. Refresh Token = renova o access token.",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "Segurança: OWASP e Criptografia",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-6 shadow-inner border border-slate-700">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-red-400 mb-2">🎯 Injection vs XSS vs CSRF</h4>
              <ul className="text-sm space-y-1">
                <li>💉 <strong>Injection</strong> → Ataca o <span className="text-red-300">SERVIDOR (Banco)</span></li>
                <li>📜 <strong>XSS</strong> → Ataca o <span className="text-amber-300">NAVEGADOR (Cliente)</span></li>
                <li>🔗 <strong>CSRF</strong> → Ataca a <span className="text-blue-300">SESSÃO (Autenticação)</span></li>
              </ul>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-emerald-500">
              <h4 className="font-bold text-emerald-400 mb-2">🔐 Criptografia</h4>
              <ul className="text-sm space-y-1">
                <li>🔑 <strong>Simétrica</strong> = 1 chave (AES) → Rápida</li>
                <li>🔑🔑 <strong>Assimétrica</strong> = 2 chaves (RSA) → Segura</li>
                <li>#️⃣ <strong>Hash</strong> = Irreversível (SHA-256) → Senhas</li>
              </ul>
            </div>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 9",
        tituloAula: "Segurança no Software",
        materia: "Engenharia de Software",
        images: [
          {
            title: "OWASP Top 10 e Criptografia",
            type: "Mapa Mental",
            placeholderColor: "red",
            imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 9,
        moduloTitulo: "Segurança no Desenvolvimento",
        conteudoResumo: "OWASP Top 10, a diferença entre criptografia simétrica e assimétrica, e a cultura DevSecOps na pipeline CI/CD.",
      }
    }
  },

  10: {
    secoes: [
      {
        index: "INTRO",
        title: "Testes de Software e Qualidade",
        accordions: [
          {
            titulo: "C.E.D.E.A - Níveis de Teste, Cobertura e Garantia da Qualidade",
            icone: "✅",
            corIndicador: "bg-green-600",
            defaultOpen: true,
            mode: "stacked",
            slides: [
              {
                conteudo: (
                  <div className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed">
                      {/* Contexto */}
                      <p>Software que não é testado é software que não funciona — é apenas questão de tempo até a falha se manifestar. Na Petrobras, um defeito em um sistema de controle de válvulas ou de monitoramento de pressão pode ter consequências catastróficas, desde vazamentos ambientais até riscos à vida humana. A disciplina de <strong>Testes de Software</strong> é a última (e muitas vezes a única) barreira entre o código produzido pelos desenvolvedores e o desastre em produção. Ela não busca provar que o software está "correto" (isso é matematicamente impossível para sistemas complexos), mas sim encontrar o maior número de defeitos possível antes que o usuário final os encontre.</p>
                      
                      <p>A qualidade de software não se resume a testes; ela é um conceito muito mais amplo governado por normas internacionais. A <strong>ISO/IEC 25010 (SQuaRE)</strong> define 8 características de qualidade de produto de software: Adequação Funcional, Eficiência de Desempenho, Compatibilidade, Usabilidade, Confiabilidade, Segurança, Manutenibilidade e Portabilidade. A <strong>Garantia da Qualidade (QA - Quality Assurance)</strong> foca no <em>processo</em> (prevenção de defeitos através de padrões e auditorias), enquanto o <strong>Controle da Qualidade (QC - Quality Control)</strong> foca no <em>produto</em> (detecção de defeitos através de inspeções e testes). A CESGRANRIO ama confundir QA com QC.</p>
                      
                      {/* Explicação */}
                      <p>Os testes são organizados em <strong>4 níveis</strong> que formam a clássica "Pirâmide de Testes". Na base, os <em>Testes Unitários</em> validam a menor unidade testável do código (uma função ou método individual), de forma isolada, rápida e automatizada — são a fundação da confiança. Os <em>Testes de Integração</em> verificam a comunicação correta entre dois ou mais módulos/componentes que já foram testados individualmente (ex: o módulo de login se comunica corretamente com o banco de dados?). Os <em>Testes de Sistema</em> avaliam o sistema completo, integrado e implantado em um ambiente que simula a produção, verificando requisitos funcionais e não-funcionais.</p>
                      
                      <p>No topo da pirâmide, os <em>Testes de Aceitação</em> são executados pelo <strong>cliente/usuário final</strong> (ou seu representante) para validar se o sistema atende aos critérios de negócio acordados. Em metodologias ágeis, os critérios de aceitação são definidos nas User Stories antes do desenvolvimento (ex: "DADO que estou logado, QUANDO clico em 'Gerar Relatório', ENTÃO o PDF é baixado em menos de 3 segundos"). Existem dois subtipos cruciais: o <em>Teste Alfa</em> (executado internamente no ambiente do desenvolvedor, com o usuário presente) e o <em>Teste Beta</em> (executado no ambiente real do usuário, sem a presença do desenvolvedor).</p>
                      
                      {/* Demonstração */}
                      <p>Em um projeto ágil da Petrobras, o desenvolvedor escreve um <strong>Teste Unitário</strong> para validar que a função <code>calcularICMS(valor, uf)</code> retorna R$ 180,00 quando chamada com (1000, "RJ"). Depois, o time cria um <strong>Teste de Integração</strong> para garantir que o módulo de Faturamento grava corretamente a nota fiscal no microserviço de Pagamentos via API REST. O QA automatiza um <strong>Teste de Sistema</strong> end-to-end (E2E) com Selenium/Playwright que navega pela interface web completa, preenche o formulário, clica em "Emitir NF" e verifica se o PDF foi gerado.</p>
                      
                      <p>Finalmente, o Product Owner (PO) executa o <strong>Teste de Aceitação</strong> na Sprint Review, validando se o fluxo completo atende ao critério de negócio definido na User Story. Se o PO aprova, o incremento é considerado "Done". Paralelamente, testes não-funcionais são executados: o <em>Teste de Performance/Carga</em> (JMeter) simula 10.000 usuários simultâneos acessando o portal; o <em>Teste de Estresse</em> empurra o sistema além do limite para ver onde ele quebra; e o <em>Teste de Segurança</em> (penetration test) tenta explorar as vulnerabilidades OWASP cobertas no módulo anterior.</p>
                      
                      {/* Expansão */}
                      <p>Os testes também são classificados pela <strong>abordagem de design</strong>: <em>Caixa-Branca (White-Box)</em> e <em>Caixa-Preta (Black-Box)</em>. Na Caixa-Branca, o testador tem acesso total ao código-fonte e projeta os casos de teste com base na estrutura lógica interna (cobrindo todos os caminhos, condições e loops). Técnicas incluem Cobertura de Comandos, Cobertura de Decisão e Cobertura de Condição. Na Caixa-Preta, o testador NÃO vê o código interno; ele testa apenas as entradas e saídas com base nos requisitos especificados. Técnicas incluem Partição de Equivalência (dividir inputs em classes válidas e inválidas) e Análise de Valor-Limite (testar os extremos das classes).</p>
                      
                      <p>Em projetos de manutenção, o <strong>Teste de Regressão</strong> é sagrado: após qualquer alteração no código (correção de bug, nova feature), todos os testes existentes são reexecutados para garantir que a mudança não "quebrou" algo que já funcionava (regressão). A automação de testes de regressão é um dos maiores retornos sobre investimento (ROI) em qualidade de software. Outro conceito vital é o <em>TDD (Test-Driven Development)</em>: a prática ágil onde o desenvolvedor escreve o teste ANTES de escrever o código de produção (ciclo Red-Green-Refactor). O teste falha primeiro (Red), o dev escreve o mínimo de código para fazê-lo passar (Green) e depois refatora o código mantendo os testes passando (Refactor).</p>
                      
                      {/* Aplicação (CESGRANRIO) */}
                      <p>A CESGRANRIO cobra sistematicamente a diferença entre os <strong>4 níveis de teste</strong>. O macete infalível é: Unitário = <em>função isolada</em> (desenvolvedor). Integração = <em>comunicação entre módulos</em> (interfaces). Sistema = <em>sistema completo em ambiente simulado</em> (requisitos). Aceitação = <em>validação pelo cliente/PO</em> (negócio). A banca adora afirmar que o teste de integração valida requisitos de negócio (FALSO — isso é aceitação) ou que o teste de sistema é feito pelo usuário final (FALSO — isso é aceitação).</p>
                      
                      <p>Sobre as abordagens, a pegadinha clássica envolve <strong>Caixa-Branca vs Caixa-Preta</strong>. Caixa-Branca = vê o código (Estrutural). Caixa-Preta = não vê o código (Funcional). A banca também cobra a diferença entre <strong>Verificação</strong> ("Estamos construindo o produto CORRETAMENTE?" — foco no processo, revisões, inspeções, conformidade com especificações) e <strong>Validação</strong> ("Estamos construindo o produto CORRETO?" — foco no produto, testes de aceitação, aprovação do cliente). Mnemônico: Verificação = processo interno (V de Verificar o código), Validação = valor para o cliente (V de Validar com o usuário).</p>
                    </div>
                  </div>
                ),
              },
            ],
          },
        ],
        flipCards: [
          {
            frontIcon: "LuTestTube",
            frontTitle: "Os 4 Níveis de Teste",
            backTitle: "Da Unidade à Aceitação",
            backContent: "1. Unitário: Função isolada (dev). 2. Integração: Comunicação entre módulos (interfaces). 3. Sistema: Sistema completo em ambiente simulado (requisitos). 4. Aceitação: Validação pelo cliente/PO (negócio). MACETE: U-I-S-A.",
          },
          {
            frontIcon: "LuEye",
            frontTitle: "Caixa-Branca vs Caixa-Preta",
            backTitle: "Estrutural vs Funcional",
            backContent: "Caixa-Branca (White-Box): Vê o código. Testa caminhos lógicos internos. Caixa-Preta (Black-Box): NÃO vê o código. Testa entradas e saídas baseado nos requisitos. Há também a Caixa-Cinza (combinação).",
          },
          {
            frontIcon: "LuRefreshCcw",
            frontTitle: "Teste de Regressão",
            backTitle: "Não Quebre o que Já Funciona",
            backContent: "Após QUALQUER alteração no código, reexecuta-se os testes existentes para garantir que nada que já funcionava foi quebrado pela mudança. É o principal candidato à automação por seu altíssimo ROI.",
          },
          {
            frontIcon: "LuClipboardCheck",
            frontTitle: "Verificação vs Validação",
            backTitle: "Processo vs Produto",
            backContent: "Verificação: 'Estamos construindo o produto CORRETAMENTE?' (foco no processo, conformidade com specs). Validação: 'Estamos construindo o produto CORRETO?' (foco no cliente, testes de aceitação).",
          },
          {
            frontIcon: "LuFlaskConical",
            frontTitle: "TDD (Test-Driven Dev)",
            backTitle: "Red → Green → Refactor",
            backContent: "1. Escreve o TESTE primeiro (Red: ele falha). 2. Escreve o MÍNIMO de código para passar (Green). 3. Refatora o código mantendo os testes verdes (Refactor). Ciclo contínuo.",
          },
          {
            frontIcon: "LuUsers",
            frontTitle: "Teste Alfa vs Beta",
            backTitle: "Ambiente do Dev vs Ambiente do Usuário",
            backContent: "Alfa: Executado NO ambiente do desenvolvedor, COM o usuário presente (interno, controlado). Beta: Executado NO ambiente REAL do usuário, SEM a presença do desenvolvedor (externo, campo).",
          }
        ],
      },
    ],
    consolidation: {
      sinteseEstrategica: {
        title: "Testes e Qualidade de Software",
        content: (
          <div className="p-6 bg-slate-900 text-slate-50 rounded-xl space-y-6 shadow-inner border border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-800 p-3 rounded-lg border-t-4 border-blue-500">
                <h4 className="font-bold text-blue-400 text-sm">🧪 Unitário</h4>
                <p className="text-xs mt-1">Função isolada (Dev)</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border-t-4 border-emerald-500">
                <h4 className="font-bold text-emerald-400 text-sm">🔗 Integração</h4>
                <p className="text-xs mt-1">Módulos juntos (API)</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border-t-4 border-amber-500">
                <h4 className="font-bold text-amber-400 text-sm">💻 Sistema</h4>
                <p className="text-xs mt-1">Completo (Requisitos)</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border-t-4 border-red-500">
                <h4 className="font-bold text-red-400 text-sm">👤 Aceitação</h4>
                <p className="text-xs mt-1">Cliente/PO (Negócio)</p>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h4 className="text-amber-400 font-bold mb-2 text-center">🎯 Verificação vs Validação</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-blue-300">Verificação</p>
                  <p>Construímos CORRETAMENTE? (Processo/Specs)</p>
                </div>
                <div>
                  <p className="font-bold text-emerald-300">Validação</p>
                  <p>Construímos o CORRETO? (Cliente/Valor)</p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      resumoVisual: {
        moduloNome: "Módulo 10",
        tituloAula: "Testes e Qualidade",
        materia: "Engenharia de Software",
        images: [
          {
            title: "Pirâmide de Testes",
            type: "Diagrama",
            placeholderColor: "green",
            imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
          }
        ],
      },
      podcast: {
        aulaId: "engenhariasoftware",
        aulaTitulo: "Engenharia de Software",
        materia: "Tecnologia da Informação",
        materiaId: "ti",
        moduloNumero: 10,
        moduloTitulo: "Testes e Qualidade",
        conteudoResumo: "Os 4 níveis de teste, Caixa-Branca vs Caixa-Preta, TDD e a diferença que muda a vida no concurso: Verificação vs Validação.",
      }
    }
  },
};
