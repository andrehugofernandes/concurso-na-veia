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
}

export const CONTEUDO_MATERIAS: MateriaConteudo[] = [
    {
        id: 'portugues',
        nome: 'Língua Portuguesa',
        descricao: 'Gramática e interpretação de texto conforme Edital Petrobras 2026',
        icone: '📝',
        cor: 'from-blue-500 to-cyan-500',
        requiredPlan: 'Bronze',
        topicos: [
            { id: 'interpretacao-texto', titulo: 'Interpretação de Texto', descricao: 'Compreensão de textos de gêneros variados', duracao: '22 min', ordem: 1 },
            { id: 'coesao-coerencia', titulo: 'Coesão e Coerência', descricao: 'Aprenda a conectar ideias de forma lógica', duracao: '21 min', ordem: 2 },
            { id: 'reescrita-frases', titulo: 'Reescrita de Frases', descricao: 'Técnicas para reescrever mantendo o sentido', duracao: '25 min', ordem: 3 },
            { id: 'crase', titulo: 'Crase', descricao: 'Quando usar e não usar a crase', duracao: '10 min', ordem: 4 },
            { id: 'pontuacao', titulo: 'Pontuação', descricao: 'Domine a vírgula (não é respiração!) e outros sinais', duracao: '19 min', ordem: 5 },
            { id: 'concordancia', titulo: 'Concordância Verbal e Nominal', descricao: 'Regras de concordância gramatical', duracao: '36 min', ordem: 6 },
            { id: 'regencia', titulo: 'Regência Verbal e Nominal', descricao: 'Uso correto das preposições', duracao: '26 min', ordem: 7 },
            { id: 'sintaxe', titulo: 'Sintaxe', descricao: 'Análise sintática e estrutura das orações', duracao: '17 min', ordem: 8 },
            { id: 'classes-palavras', titulo: 'Classes de Palavras', descricao: 'As 10 classes gramaticais: Verbo, Substantivo, Pronome, Adjetivo, Conjunção, Preposição, Advérbio, Artigo, Numeral e Interjeição', duracao: '33 min', ordem: 9 },
            { id: 'tipos-textuais', titulo: 'Tipos Textuais', descricao: 'Aprenda Tipologia: Narração, Descrição, Injunção e Dissertação', duracao: '21 min', ordem: 10 },
            { id: 'ortografia', titulo: 'Ortografia e Acentuação', descricao: 'Hífen, Expressões Problemáticas, Novo Acordo e Acentuação', duracao: '19 min', ordem: 11 },
        ]
    },
    {
        id: 'matematica',
        nome: 'Matemática',
        descricao: 'Raciocínio lógico-quantitativo conforme Edital Petrobras 2026',
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
        ]
    },
    {
        id: 'fisica',
        nome: 'Física',
        descricao: 'Conceitos de mecânica, termodinâmica e eletricidade para técnicos',
        icone: '⚡',
        cor: 'from-yellow-500 to-orange-500',
        requiredPlan: 'Prata',
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
    // ===== CONHECIMENTOS ESPECÍFICOS - ADMINISTRAÇÃO =====
    {
        id: 'especifica-bloco-i-gestao-estrategica',
        nome: 'Bloco I - Gestão Estratégica',
        descricao: 'Conhecimentos específicos para Administração - Planejamento, Processos, Projetos e Governança',
        icone: '📚',
        cor: 'from-blue-600 to-indigo-600',
        requiredPlan: 'Ouro',
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
    // ===== BLOCO II - GESTÃO DE PESSOAS E MARKETING (NÍVEL SUPERIOR) =====
    {
        id: 'especifica-bloco-ii-gestao-de-pessoas-e-marketing',
        nome: 'Bloco II - Gestão de Pessoas e Marketing',
        descricao: 'Conhecimentos específicos em Gestão de Pessoas, RH e Marketing Gerencial para Administradores Nível Superior',
        icone: '👥',
        cor: 'from-indigo-500 to-purple-500',
        requiredPlan: 'Ouro',
        topicos: [
            { id: 'gestao-pessoas', titulo: 'Gestão de Pessoas', descricao: 'Recrutamento, desenvolvimento, retenção e gestão de talentos', duracao: '18 min', ordem: 1 },
            { id: 'gestao-recursos-humanos', titulo: 'Gestão de Recursos Humanos', descricao: 'Estratégia, organização e métricas de RH', duracao: '18 min', ordem: 2 },
            { id: 'marketing-gerencial', titulo: 'Marketing Gerencial', descricao: 'Estratégia de marketing, segmentação e comunicação integrada', duracao: '18 min', ordem: 3 },
        ]
    },
    // ===== BLOCO I - ADMINISTRAÇÃO (NÍVEL TÉCNICO) =====
    {
        id: 'especifica-bloco-i-administracao-suprimento',
        nome: 'Bloco I - Administração (Suprimento)',
        descricao: 'Conhecimentos específicos para Técnico de Suprimento de Bens e Serviços - Administração - Administração Geral, Qualidade, Logística e Compras',
        icone: '📁',
        cor: 'from-blue-500 to-indigo-600',
        requiredPlan: 'Ouro',
        topicos: [
            { id: 'administracao-geral-suprimento', titulo: 'Administração Geral', descricao: 'Conceitos fundamentais, funções administrativas e comportamento organizacional', duracao: '17 min', ordem: 1 },
            { id: 'gestao-qualidade-suprimento', titulo: 'Gestão de Qualidade', descricao: 'Princípios da qualidade, ferramentas e melhoria de processos', duracao: '16 min', ordem: 2 },
            { id: 'logistica-suprimento', titulo: 'Logística', descricao: 'Cadeia de suprimentos, armazenagem e distribuição', duracao: '17 min', ordem: 3 },
            { id: 'compras-suprimento', titulo: 'Compras', descricao: 'Processos de aquisição, seleção de fornecedores e negociação', duracao: '18 min', ordem: 4 },
        ]
    },
    // ===== BLOCO II - LEGISLAÇÃO E TRIBUTOS (NÍVEL TÉCNICO/MÉDIO) =====
    {
        id: 'especifica-bloco-ii-legislacao-tributos',
        nome: 'Bloco II - Legislação e Tributos',
        descricao: 'Conhecimentos específicos em Lei 13.303, RLCP e Direito Tributário para Técnico de Suprimento de Bens e Serviços - Administração',
        icone: '⚖️',
        cor: 'from-violet-500 to-fuchsia-500',
        requiredPlan: 'Ouro',
        topicos: [
            { id: 'lei-13303', titulo: 'Lei 13.303 - Empresa Estatal', descricao: 'Lei Federal que disciplina funcionamento e governança de empresas públicas', duracao: '18 min', ordem: 1 },
            { id: 'rlcp', titulo: 'RLCP - Regulamento de Licitações Petrobras', descricao: 'Procedimentos transparentes de compras e contratações', duracao: '18 min', ordem: 2 },
            { id: 'administrativo-tributario', titulo: 'Administrativo e Tributário', descricao: 'Contabilidade básica, direito tributário e administração tributária', duracao: '17 min', ordem: 3 },
        ]
    },
    // ===== BLOCO III - TRIBUTOS (NÍVEL TÉCNICO) =====
    {
        id: 'especifica-bloco-iii-tributos-suprimento',
        nome: 'Bloco III - Tributos (Suprimento)',
        descricao: 'Contabilidade básica, Direito tributário e Administração tributária aplicada para Técnico de Suprimento de Bens e Serviços - Administração',
        icone: '💰',
        cor: 'from-emerald-500 to-teal-600',
        requiredPlan: 'Ouro',
        topicos: [
            { id: 'contabilidade-basica-suprimento', titulo: 'Contabilidade Básica', descricao: 'Fundamentos contábeis, balanço e lançamentos', duracao: '18 min', ordem: 1 },
            { id: 'direito-tributario-suprimento', titulo: 'Direito Tributário', descricao: 'Princípios tributários, impostos e obrigações', duracao: '18 min', ordem: 2 },
            { id: 'administracao-tributaria-suprimento', titulo: 'Administração Tributária', descricao: 'Processos administrativos e fiscalização', duracao: '18 min', ordem: 3 },
        ]
    },
    // ===== SEGURANÇA DO TRABALHO =====
    {
        id: 'nrs',
        nome: 'Normas Regulamentadoras (NRs)',
        descricao: 'Estudo aprofundado das principais NRs aplicadas à Petrobras e à indústria.',
        icone: '👷',
        cor: 'from-emerald-500 to-green-600',
        requiredPlan: 'Prata',
        topicos: [
            { id: 'nr10', titulo: 'NR-10 (Elétrica)', descricao: 'Segurança em Instalações e Serviços em Eletricidade', duracao: '90 min', ordem: 1 },
            { id: 'nr13', titulo: 'NR-13 (Vasos e Caldeiras)', descricao: 'Caldeiras, Vasos de Pressão e Tubulações', duracao: '90 min', ordem: 2 },
            { id: 'nr33', titulo: 'NR-33 (Espaço Confinado)', descricao: 'Segurança e Saúde nos Trabalhos em Espaços Confinados', duracao: '90 min', ordem: 3 },
            { id: 'nr35', titulo: 'NR-35 (Trabalho em Altura)', descricao: 'Requisitos e medidas de proteção para trabalho em altura', duracao: '90 min', ordem: 4 },
        ]
    },
    // ===== MANUTENÇÃO INDUSTRIAL (CLUSTER BASE) =====
    {
        id: 'manutencao',
        nome: 'Manutenção Industrial',
        descricao: 'Conhecimentos básicos de mecânica, metrologia e desenho técnico para técnicos de manutenção e inspeção.',
        icone: '🛠️',
        cor: 'from-blue-600 to-indigo-700',
        requiredPlan: 'Prata',
        topicos: [
            { id: 'metrologia', titulo: 'Metrologia Industrial', descricao: 'Medição com paquímetro, micrômetro e tolerâncias ISO', duracao: '120 min', ordem: 1 },
            { id: 'desenho-tecnico', titulo: 'Desenho Técnico', descricao: 'Projeção ortográfica, cortes e representação industrial', duracao: '120 min', ordem: 2 },
        ]
    },
];

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
