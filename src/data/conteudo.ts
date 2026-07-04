export type PlanType = 'Bronze' | 'Prata' | 'Ouro';

export interface Topico {
    id: string;
    titulo: string;
    descricao: string;
    duracao: string; // "5 min", "10 min", etc.
    ordem: number;
}

export interface MateriaConteudo {
    id: string;
    nome: string;
    descricao: string;
    icone: string;
    cor: string;
    requiredPlan: PlanType;
    topicos: Topico[];
    concursos?: string[]; // Lista de slugs de concursos aos quais se aplica. Se undefined, aplica-se a todos (ex: português, matemática).
    profissoes?: string[]; // Lista de IDs de profissões às quais este bloco se aplica (ex: 'suprimento-adm').
}

export const CONTEUDO_MATERIAS: MateriaConteudo[] = [
    {
        id: 'portugues',
        nome: 'Língua Portuguesa',
        descricao: 'Gramática e interpretação de texto para concursos de nível médio',
        icone: '📝',
        cor: 'from-blue-500 to-cyan-500',
        requiredPlan: 'Bronze',
        topicos: [
            { id: 'interpretacao-texto', titulo: 'Interpretação de Texto', descricao: 'Compreensão de textos de gêneros variados', duracao: '22 min', ordem: 1 },
            { id: 'coesao-coerencia', titulo: 'Coesão e Coerência', descricao: 'Aprenda a conectar ideias de forma lógica', duracao: '21 min', ordem: 2 },
            { id: 'reescrita-frases', titulo: 'Reescrita de Frases', descricao: 'Técnicas para reescrever mantendo o sentido', duracao: '25 min', ordem: 3 },
            { id: 'crase', titulo: 'Crase', descricao: 'Quando usar e não usar a crase', duracao: '10 min', ordem: 4 },
            { id: 'pontuacao', titulo: 'Pontuação', descricao: 'Domine a vírgula e outros sinais', duracao: '19 min', ordem: 5 },
            { id: 'concordancia', titulo: 'Concordância Verbal e Nominal', descricao: 'Regras de concordância gramatical', duracao: '36 min', ordem: 6 },
            { id: 'regencia', titulo: 'Regência Verbal e Nominal', descricao: 'Uso correto das preposições', duracao: '26 min', ordem: 7 },
            { id: 'sintaxe', titulo: 'Sintaxe', descricao: 'Análise sintática e estrutura das orações', duracao: '17 min', ordem: 8 },
            { id: 'classes-palavras', titulo: 'Classes de Palavras', descricao: 'Substantivo, verbo, pronome, conjunção, etc.', duracao: '33 min', ordem: 9 },
            { id: 'tipos-textuais', titulo: 'Tipos Textuais', descricao: 'Narração, descrição, injunção e dissertação', duracao: '21 min', ordem: 10 },
            { id: 'ortografia', titulo: 'Ortografia e Acentuação', descricao: 'Hífen, novo acordo ortográfico e regras de acentuação', duracao: '19 min', ordem: 11 },
            { id: 'semantica', titulo: 'Semântica', descricao: 'Significado das palavras, sinônimos, antônimos e contexto', duracao: '30 min', ordem: 12 },
        ]
    },
    {
        id: 'matematica',
        nome: 'Matemática',
        descricao: 'Raciocínio lógico-quantitativo essencial para concursos',
        icone: '🔢',
        cor: 'from-purple-500 to-pink-500',
        requiredPlan: 'Bronze',
        topicos: [
            { id: 'conjuntos', titulo: 'Teoria dos Conjuntos', descricao: 'Operações, diagramas de Venn e conjuntos numéricos', duracao: '50 min', ordem: 1 },
            { id: 'razao-proporcao', titulo: 'Razão e Proporção', descricao: 'Grandezas proporcionais e regra de três', duracao: '52 min', ordem: 2 },
            { id: 'porcentagem', titulo: 'Porcentagem', descricao: 'Cálculos percentuais e variações', duracao: '40 min', ordem: 3 },
            { id: 'equacoes-1grau', titulo: 'Equações de 1º Grau', descricao: 'Resolução de equações lineares', duracao: '50 min', ordem: 4 },
            { id: 'equacoes-2grau', titulo: 'Equações de 2º Grau', descricao: 'Fórmula de Bhaskara e propriedades', duracao: '45 min', ordem: 5 },
            { id: 'funcoes-afim-quadratica', titulo: 'Funções Afim e Quadrática', descricao: 'Gráficos, raízes e aplicações', duracao: '47 min', ordem: 6 },
            { id: 'funcoes-exponenciais', titulo: 'Funções Exponenciais', descricao: 'Crescimento e decrescimento exponencial', duracao: '42 min', ordem: 7 },
            { id: 'funcoes-logaritmicas', titulo: 'Funções Logarítmicas', descricao: 'Propriedades e equações logarítmicas', duracao: '45 min', ordem: 8 },
            { id: 'progressoes-pa', titulo: 'Progressão Aritmética (PA)', descricao: 'Termo geral e soma de PA', duracao: '40 min', ordem: 9 },
            { id: 'progressoes-pg', titulo: 'Progressão Geométrica (PG)', descricao: 'Termo geral e soma de PG', duracao: '40 min', ordem: 10 },
            { id: 'matrizes-determinantes', titulo: 'Matrizes e Determinantes', descricao: 'Operações matriciais e cálculo de determinantes', duracao: '10 min', ordem: 11 },
            { id: 'sistemas-lineares', titulo: 'Sistemas Lineares', descricao: 'Métodos de resolução e classificação', duracao: '8 min', ordem: 12 },
            { id: 'analise-combinatoria', titulo: 'Análise Combinatória', descricao: 'Permutação, arranjo e combinação', duracao: '10 min', ordem: 13 },
            { id: 'probabilidade', titulo: 'Probabilidade', descricao: 'Eventos independentes e cálculo de probabilidades', duracao: '40 min', ordem: 14 },
            { id: 'trigonometria', titulo: 'Trigonometria', descricao: 'Razões trigonométricas, funções e identidades', duracao: '12 min', ordem: 15 },
            { id: 'geometria-plana', titulo: 'Geometria Plana', descricao: 'Áreas e perímetros de figuras', duracao: '8 min', ordem: 16 },
            { id: 'geometria-espacial', titulo: 'Geometria Espacial', descricao: 'Volumes e áreas de sólidos', duracao: '8 min', ordem: 17 },
            { id: 'geometria-analitica', titulo: 'Geometria Analítica', descricao: 'Equação da reta, parábola e circunferência', duracao: '10 min', ordem: 18 },
            { id: 'matematica-financeira', titulo: 'Matemática Financeira', descricao: 'Juros simples, compostos, capital e montante', duracao: '10 min', ordem: 19 },
            { id: 'estatistica-basica', titulo: 'Estatística Básica', descricao: 'Médias, mediana, moda e interpretação de gráficos', duracao: '40 min', ordem: 20 },
        ]
    },
    {
        id: 'fisica',
        nome: 'Física',
        descricao: 'Conceitos de mecânica, termodinâmica e eletricidade para técnicos',
        icone: '⚡',
        cor: 'from-yellow-500 to-orange-500',
        requiredPlan: 'Prata',
        concursos: ['petrobras'],
        topicos: [
            { id: 'cinematica', titulo: 'Cinemática', descricao: 'MRU, MRUV e movimento circular', duracao: '10 min', ordem: 1 },
            { id: 'dinamica', titulo: 'Dinâmica', descricao: 'Leis de Newton e aplicações', duracao: '10 min', ordem: 2 },
            { id: 'energia', titulo: 'Energia e Trabalho', descricao: 'Conservação de energia mecânica', duracao: '8 min', ordem: 3 },
            { id: 'termodinamica', titulo: 'Termodinâmica', descricao: 'Leis da termodinâmica e máquinas térmicas', duracao: '12 min', ordem: 4 },
            { id: 'hidraulica', titulo: 'Hidrostática', descricao: 'Pressão, empuxo e princípio de Pascal', duracao: '8 min', ordem: 5 },
            { id: 'eletricidade', titulo: 'Eletricidade Básica', descricao: 'Circuitos, lei de Ohm e potência', duracao: '10 min', ordem: 6 },
        ]
    },
    {
        id: 'quimica',
        nome: 'Química',
        descricao: 'Química geral, orgânica e inorgânica para técnicos de operação',
        icone: '🧪',
        cor: 'from-green-500 to-emerald-500',
        requiredPlan: 'Prata',
        concursos: ['petrobras'],
        topicos: [
            { id: 'atomos', titulo: 'Estrutura Atômica', descricao: 'Modelos atômicos e distribuição eletrônica', duracao: '8 min', ordem: 1 },
            { id: 'tabela-periodica', titulo: 'Tabela Periódica', descricao: 'Propriedades periódicas e famílias', duracao: '7 min', ordem: 2 },
            { id: 'ligacoes', titulo: 'Ligações Químicas', descricao: 'Iônica, covalente e metálica', duracao: '9 min', ordem: 3 },
            { id: 'reacoes', titulo: 'Reações Químicas', descricao: 'Tipos de reações e balanceamento', duracao: '8 min', ordem: 4 },
            { id: 'estequiometria', titulo: 'Estequiometria', descricao: 'Cálculos de massas e proporções', duracao: '10 min', ordem: 5 },
            { id: 'solucoes', titulo: 'Soluções', descricao: 'Concentração e diluição', duracao: '7 min', ordem: 6 },
            { id: 'organica-intro', titulo: 'Química Orgânica', descricao: 'Hidrocarbonetos e grupos funcionais', duracao: '12 min', ordem: 7 },
            { id: 'petroleo', titulo: 'Petróleo e Derivados', descricao: 'Refino e produtos do petróleo', duracao: '10 min', ordem: 8 },
        ]
    },
    {
        id: 'especifica-bloco-i-gestao-estrategica',
        nome: 'Bloco I - Gestão Estratégica',
        descricao: 'Conhecimentos específicos para Administração - Planejamento, Processos, Projetos e Governança',
        icone: '📚',
        cor: 'from-blue-600 to-indigo-600',
        requiredPlan: 'Ouro',
        concursos: ['petrobras'],
        topicos: [
            { id: 'planejamento-estrategico', titulo: 'Planejamento Estratégico', descricao: 'Análise SWOT, BSC, formulação e implementação de estratégias corporativas', duracao: '60 min', ordem: 1 },
            { id: 'gestao-de-processos', titulo: 'Gestão de Processos', descricao: 'BPM, mapeamento, modelagem BPMN, melhoria contínua e indicadores', duracao: '60 min', ordem: 2 },
            { id: 'gestao-de-projetos-pmbok', titulo: 'Gestão de Projetos (PMBOK)', descricao: 'Áreas de conhecimento, ciclo de vida, metodologias ágeis e tradicionais', duracao: '60 min', ordem: 3 },
            { id: 'governanca-corporativa', titulo: 'Governança Corporativa', descricao: 'Princípios, compliance, gestão de riscos, controles internos e Lei Sarbanes-Oxley', duracao: '60 min', ordem: 4 },
        ]
    },
    {
        id: 'ingles',
        nome: 'Língua Inglesa',
        descricao: 'Interpretação de textos técnicos em inglês',
        icone: '🇺🇸',
        cor: 'from-red-500 to-pink-500',
        requiredPlan: 'Ouro',
        concursos: ['petrobras', 'bb'],
        topicos: [
            { id: 'petrolingo', titulo: 'Petro-Lingo', descricao: 'Aprenda inglês técnico com gamificação no estilo Duolingo', duracao: 'Prática Livre', ordem: 1 },
            { id: 'reading-strategies', titulo: 'Reading Strategies', descricao: 'Técnicas de leitura e skimming', duracao: '6 min', ordem: 2 },
            { id: 'verb-tenses', titulo: 'Verb Tenses', descricao: 'Tempos verbais em inglês', duracao: '8 min', ordem: 3 },
            { id: 'connectors', titulo: 'Connectors', descricao: 'Palavras de ligação e transição', duracao: '5 min', ordem: 4 },
            { id: 'vocabulary', titulo: 'Technical Vocabulary', descricao: 'Vocabulário técnico de petróleo e gás', duracao: '10 min', ordem: 5 },
            { id: 'false-cognates', titulo: 'False Cognates', descricao: 'Falsos cognatos mais comuns', duracao: '5 min', ordem: 6 },
            { id: 'comprehension', titulo: 'Text Comprehension', descricao: 'Interpretação de textos técnicos', duracao: '8 min', ordem: 7 },
        ]
    },
    {
        id: 'especifica-bloco-ii-gestao-de-pessoas-e-marketing',
        nome: 'Bloco II - Gestão de Pessoas e Marketing',
        descricao: 'Conhecimentos específicos em Gestão de Pessoas, RH e Marketing Gerencial para Administradores Nível Superior',
        icone: '👥',
        cor: 'from-indigo-500 to-purple-500',
        requiredPlan: 'Ouro',
        concursos: ['petrobras'],
        topicos: [
            { id: 'gestao-pessoas', titulo: 'Gestão de Pessoas', descricao: 'Recrutamento, desenvolvimento, retenção e gestão de talentos', duracao: '18 min', ordem: 1 },
            { id: 'gestao-recursos-humanos', titulo: 'Gestão de Recursos Humanos', descricao: 'Estrategia, organização e métricas de RH', duracao: '18 min', ordem: 2 },
            { id: 'marketing-gerencial', titulo: 'Marketing Gerencial', descricao: 'Estratégia de marketing, segmentação e comunicação integrada', duracao: '18 min', ordem: 3 },
        ]
    },
    {
        id: 'especifica-bloco-i-administracao-suprimento',
        nome: 'Bloco I - Administração (Suprimento)',
        descricao: 'Técnico de Suprimento de Bens e Serviços - Administração Geral, Qualidade, Logística e Compras',
        icone: '📁',
        cor: 'from-blue-500 to-indigo-600',
        requiredPlan: 'Ouro',
        concursos: ['petrobras'],
        profissoes: ['suprimento-adm'],
        topicos: [
            { id: 'administracao-geral-suprimento', titulo: 'Administração Geral', descricao: 'Conceitos fundamentais, funções administrativas e comportamento organizacional', duracao: '17 min', ordem: 1 },
            { id: 'gestao-qualidade-suprimento', titulo: 'Gestão de Qualidade', descricao: 'Princípios da qualidade, ferramentas e melhoria de processos', duracao: '16 min', ordem: 2 },
            { id: 'logistica-suprimento', titulo: 'Logística', descricao: 'Cadeia de suprimentos, armazenagem e distribuição', duracao: '17 min', ordem: 3 },
            { id: 'compras-suprimento', titulo: 'Compras', descricao: 'Processos de aquisição, seleção de fornecedores e negociação', duracao: '18 min', ordem: 4 },
            { id: 'atendimento-cliente-suprimento', titulo: 'Atendimento ao Cliente', descricao: 'Conceito, importância, qualidade e fidelização do cliente', duracao: '16 min', ordem: 5 },
            { id: 'estrategias-negociacao-suprimento', titulo: 'Estratégias de Negociação', descricao: 'Tipos, etapas, BATNA e técnicas', duracao: '18 min', ordem: 6 },
            { id: 'gestao-contratos-suprimento', titulo: 'Gestão de Contratos', descricao: 'Gestão, fiscalização e controle de contratos administrativos', duracao: '17 min', ordem: 7 },
            { id: 'gestao-estoques-almoxarifados-suprimento', titulo: 'Almoxarifado e Estoques', descricao: 'Funções do almoxarifado, inventário, controle e gestão', duracao: '19 min', ordem: 8 },
        ]
    },
    {
        id: 'especifica-bloco-ii-legislacao-tributos',
        nome: 'Bloco II - Legislação e Tributos',
        descricao: 'Conhecimentos específicos em Lei 13.303, RLCP e Direito Tributário',
        icone: '⚖️',
        cor: 'from-violet-500 to-fuchsia-500',
        requiredPlan: 'Ouro',
        concursos: ['petrobras'],
        profissoes: ['suprimento-adm'],
        topicos: [
            { id: 'lei-13303', titulo: 'Lei 13.303 - Empresa Estatal', descricao: 'Lei Federal que disciplina funcionamento e governança de empresas públicas', duracao: '18 min', ordem: 1 },
            { id: 'rlcp', titulo: 'RLCP - Regulamento de Licitações Petrobras', descricao: 'Procedimentos transparentes de compras e contratações', duracao: '18 min', ordem: 2 },
            { id: 'administrativo-tributario', titulo: 'Administrativo e Tributário', descricao: 'Contabilidade básica, direito tributário e administração tributária', duracao: '17 min', ordem: 3 },
        ]
    },
    {
        id: 'especifica-bloco-iii-tributos-suprimento',
        nome: 'Bloco III - Tributos (Suprimento)',
        descricao: 'Contabilidade básica, Direito tributário e Administração tributária aplicada',
        icone: '💰',
        cor: 'from-emerald-500 to-teal-600',
        requiredPlan: 'Ouro',
        concursos: ['petrobras'],
        profissoes: ['suprimento-adm'],
        topicos: [
            { id: 'contabilidade-basica-suprimento', titulo: 'Contabilidade Básica', descricao: 'Fundamentos contábeis, balanço e lançamentos', duracao: '18 min', ordem: 1 },
            { id: 'direito-tributario-suprimento', titulo: 'Direito Tributário', descricao: 'Princípios tributários, impostos e obrigações', duracao: '18 min', ordem: 2 },
            { id: 'administracao-tributaria-suprimento', titulo: 'Administração Tributária', descricao: 'Processos administrativos e fiscalização', duracao: '18 min', ordem: 3 },
        ]
    },
    {
        id: 'nrs',
        nome: 'Normas Regulamentadoras (NRs)',
        descricao: 'Estudo aprofundado das principais NRs aplicadas à indústria',
        icone: '👷',
        cor: 'from-emerald-500 to-green-600',
        requiredPlan: 'Prata',
        concursos: ['petrobras'],
        topicos: [
            { id: 'nr10', titulo: 'NR-10 (Elétrica)', descricao: 'Segurança em Instalações e Serviços em Eletricidade', duracao: '90 min', ordem: 1 },
            { id: 'nr13', titulo: 'NR-13 (Vasos e Caldeiras)', descricao: 'Caldeiras, Vasos de Pressão e Tubulações', duracao: '90 min', ordem: 2 },
            { id: 'nr33', titulo: 'NR-33 (Espaço Confinado)', descricao: 'Segurança e Saúde nos Trabalhos em Espaços Confinados', duracao: '90 min', ordem: 3 },
            { id: 'nr35', titulo: 'NR-35 (Trabalho em Altura)', descricao: 'Requisitos e medidas de proteção para trabalho em altura', duracao: '90 min', ordem: 4 },
        ]
    },
    {
        id: 'manutencao',
        nome: 'Manutenção Industrial',
        descricao: 'Conhecimentos básicos de mecânica, metrologia e desenho técnico',
        icone: '🛠️',
        cor: 'from-blue-600 to-indigo-700',
        requiredPlan: 'Prata',
        concursos: ['petrobras'],
        topicos: [
            { id: 'metrologia', titulo: 'Metrologia Industrial', descricao: 'Medição com paquímetro, micrômetro e tolerâncias ISO', duracao: '120 min', ordem: 1 },
            { id: 'desenho-tecnico', titulo: 'Desenho Técnico', descricao: 'Projeção ortográfica, cortes e representação industrial', duracao: '120 min', ordem: 2 },
        ]
    },
    // ===== NOVAS MATÉRIAS - OUTROS CONCURSOS =====
    {
        id: 'conhecimentos-bancarios',
        nome: 'Conhecimentos Bancários',
        descricao: 'Sistema Financeiro Nacional, Mercado e Produtos Bancários',
        icone: '🏦',
        cor: 'from-emerald-600 to-teal-600',
        requiredPlan: 'Bronze',
        concursos: ['caixa', 'bb'],
        topicos: [
            { id: 'sfn', titulo: 'Sistema Financeiro Nacional', descricao: 'Estrutura, órgãos reguladores e fiscalizadores', duracao: '25 min', ordem: 1 },
            { id: 'produtos-bancarios', titulo: 'Produtos e Serviços Bancários', descricao: 'Contas, investimentos, cartões e garantias', duracao: '30 min', ordem: 2 },
            { id: 'garantias', titulo: 'Garantias do Sistema Financeiro', descricao: 'Aval, fiança, hipoteca e penhor', duracao: '20 min', ordem: 3 },
        ]
    },
    {
        id: 'atendimento-vendas',
        nome: 'Atendimento e Vendas',
        descricao: 'Técnicas de vendas, marketing e Código de Defesa do Consumidor',
        icone: '🤝',
        cor: 'from-orange-500 to-amber-500',
        requiredPlan: 'Bronze',
        concursos: ['caixa', 'bb', 'correios'],
        topicos: [
            { id: 'qualidade-atendimento', titulo: 'Qualidade no Atendimento', descricao: 'Postura, empatia e satisfação do cliente', duracao: '20 min', ordem: 1 },
            { id: 'tecnicas-vendas', titulo: 'Técnicas de Vendas e Negociação', descricao: 'Abordagem, objeções e fechamento de vendas', duracao: '25 min', ordem: 2 },
            { id: 'cdc', titulo: 'Código de Defesa do Consumidor', descricao: 'Direitos básicos e regras para serviços financeiros', duracao: '15 min', ordem: 3 },
        ]
    },
    {
        id: 'tecnologia-informacao',
        nome: 'Tecnologia da Informação',
        descricao: 'TI, banco de dados, segurança e comportamento digital',
        icone: '💻',
        cor: 'from-blue-500 to-indigo-500',
        requiredPlan: 'Prata',
        concursos: ['caixa', 'bb'],
        topicos: [
            { id: 'seguranca-informacao', titulo: 'Segurança da Informação', descricao: 'Criptografia, malwares, senhas e boas práticas', duracao: '22 min', ordem: 1 },
            { id: 'banco-dados', titulo: 'Conceitos de Banco de Dados', descricao: 'Modelagem, SQL, Big Data e Analytics', duracao: '30 min', ordem: 2 },
            { id: 'comportamento-digital', titulo: 'Comportamento e Cultura Digital', descricao: 'Open Finance, PIX, transformação digital e IA', duracao: '18 min', ordem: 3 },
        ]
    },
    {
        id: 'conhecimentos-postais',
        nome: 'Conhecimentos Postais',
        descricao: 'Serviços postais, regulamento e logística dos Correios',
        icone: '📦',
        cor: 'from-yellow-600 to-yellow-500',
        requiredPlan: 'Bronze',
        concursos: ['correios'],
        topicos: [
            { id: 'servicos-postais', titulo: 'Serviços Postais e Logística', descricao: 'Envio, SEDEX, PAC, telegramas e logística reversa', duracao: '25 min', ordem: 1 },
            { id: 'regulamento-postal', titulo: 'Regulamento do Serviço Postal', descricao: 'Legislação e diretrizes da ECT', duracao: '20 min', ordem: 2 },
        ]
    },
    {
        id: 'censo-tecnico',
        nome: 'Conhecimentos Técnicos do Censo',
        descricao: 'Conceitos censitários e coleta de dados do IBGE',
        icone: '🗺️',
        cor: 'from-teal-500 to-cyan-500',
        requiredPlan: 'Bronze',
        concursos: ['ibge'],
        topicos: [
            { id: 'manual-recenseador', titulo: 'Manual de Coleta e Censo', descricao: 'Fluxo de entrevista e captação de dados no formulário', duracao: '35 min', ordem: 1 },
            { id: 'entrevista-campo', titulo: 'Técnicas de Entrevista', descricao: 'Abordagem de moradores e tratamento de recusas', duracao: '20 min', ordem: 2 },
        ]
    },
    {
        id: 'etica-servico-publico',
        nome: 'Ética no Serviço Público',
        descricao: 'Código de ética profissional e Regime Disciplinar',
        icone: '⚖️',
        cor: 'from-purple-500 to-indigo-500',
        requiredPlan: 'Bronze',
        concursos: ['ibge', 'inss'],
        topicos: [
            { id: 'codigo-etica', titulo: 'Código de Ética Profissional', descricao: 'Deveres, vedações e comissões de ética do servidor', duracao: '15 min', ordem: 1 },
            { id: 'lei-8112', titulo: 'Regime Jurídico Único (Lei 8.112/90)', descricao: 'Deveres, proibições e penalidades aplicadas ao servidor', duracao: '25 min', ordem: 2 },
        ]
    },
    {
        id: 'direito-previdenciario',
        nome: 'Direito Previdenciário',
        descricao: 'Seguridade Social, RGPS, benefícios e custeio do INSS',
        icone: '🛡️',
        cor: 'from-rose-600 to-red-600',
        requiredPlan: 'Prata',
        concursos: ['inss'],
        topicos: [
            { id: 'seguridade-social', titulo: 'Conceitos da Seguridade Social', descricao: 'Saúde, Assistência Social e Previdência Social', duracao: '30 min', ordem: 1 },
            { id: 'rgps', titulo: 'Regime Geral de Previdência Social', descricao: 'Segurados, dependentes e período de graça', duracao: '40 min', ordem: 2 },
            { id: 'beneficios', titulo: 'Benefícios em Espécie do RGPS', descricao: 'Aposentadorias, auxílios e pensões do INSS', duracao: '45 min', ordem: 3 },
        ]
    },
    {
        id: 'direito-administrativo-constitucional',
        nome: 'Direito Administrativo e Constitucional',
        descricao: 'Princípios administrativos, atos, servidores e direitos constitucionais',
        icone: '🏛️',
        cor: 'from-amber-600 to-amber-700',
        requiredPlan: 'Prata',
        concursos: ['inss'],
        topicos: [
            { id: 'principios-adm', titulo: 'Princípios da Administração Pública', descricao: 'Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência', duracao: '20 min', ordem: 1 },
            { id: 'atos-administrativos', titulo: 'Atos Administrativos', descricao: 'Requisitos, atributos e extinção de atos públicos', duracao: '25 min', ordem: 2 },
            { id: 'direitos-fundamentais', titulo: 'Direitos e Garantias Fundamentais', descricao: 'Artigo 5º da CF/88 e remédios constitucionais', duracao: '30 min', ordem: 3 },
        ]
    }
];

import { CONTEUDO_ESPECIFICO } from './conteudo-especifico';
CONTEUDO_MATERIAS.push(...CONTEUDO_ESPECIFICO);


export function getMateriaById(id: string): MateriaConteudo | undefined {
    return CONTEUDO_MATERIAS.find(m => m.id === id);
}

export function getTopicoById(materiaId: string, topicoId: string): Topico | undefined {
    const materia = getMateriaById(materiaId);
    return materia?.topicos.find(t => t.id === topicoId);
}

export function getNextTopico(materiaId: string, currentTopicoId: string): Topico | undefined {
    const materia = getMateriaById(materiaId);
    if (!materia) return undefined;

    const currentIndex = materia.topicos.findIndex(t => t.id === currentTopicoId);
    if (currentIndex === -1 || currentIndex >= materia.topicos.length - 1) return undefined;

    return materia.topicos[currentIndex + 1];
}

export function getPrevTopico(materiaId: string, currentTopicoId: string): Topico | undefined {
    const materia = getMateriaById(materiaId);
    if (!materia) return undefined;

    const currentIndex = materia.topicos.findIndex(t => t.id === currentTopicoId);
    if (currentIndex <= 0) return undefined;

    return materia.topicos[currentIndex - 1];
}
