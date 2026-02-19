// Estrutura de dados baseada no Edital Petrobras 2023.2
// Organizada por nível e área de atuação

export interface BlocoConteudo {
    nome: string;
    topicos: string[];
}

export interface Profissao {
    id: string;
    nome: string;
    nivel: 'tecnico' | 'superior';
    area: string;
    blocos: BlocoConteudo[];
}

// Conhecimentos Básicos (Comum a Todas as Profissões)
export const CONHECIMENTOS_BASICOS = {
    linguaPortuguesa: {
        nome: 'Língua Portuguesa',
        topicos: [
            'Compreensão e interpretação de textos',
            'Tipos textuais (narração, descrição, dissertação)',
            'Ortografia oficial',
            'Classes de palavras',
            'Estruturas morfossintáticas (regência, concordância, pontuação)',
            'Reescritura de frases e parágrafos',
        ],
    },
    matematica: {
        nome: 'Matemática',
        topicos: [
            'Teoria dos conjuntos',
            'Funções exponenciais, logarítmicas e trigonométricas',
            'Equações de 1º e 2º graus',
            'Análise combinatória',
            'Progressões (PA e PG)',
            'Matrizes e sistemas lineares',
            'Geometria plana, espacial e analítica',
            'Matemática financeira (juros simples e compostos)',
        ],
    },
};

// Profissões Nível Técnico - Edital 2023.2
export const PROFISSOES: Profissao[] = [
    // ===== SAÚDE E SEGURANÇA =====
    {
        id: 'enfermagem-trabalho',
        nome: 'Técnico de Enfermagem do Trabalho',
        nivel: 'tecnico',
        area: 'Saúde e Segurança',
        blocos: [
            {
                nome: 'Bloco I - Urgências',
                topicos: ['APH em urgências', 'Epidemiologia', 'Doenças ocupacionais'],
            },
            {
                nome: 'Bloco II - Segurança',
                topicos: ['PNSST', 'Normas Regulamentadoras (NRs)', 'PCMSO', 'Riscos ambientais', 'Toxicologia'],
            },
            {
                nome: 'Bloco III - Enfermagem',
                topicos: ['Anatomia', 'Enfermagem clínica', 'Biossegurança', 'Ética profissional', 'Lei 8.080 (SUS)'],
            },
        ],
    },
    {
        id: 'seguranca-trabalho',
        nome: 'Técnico de Segurança do Trabalho',
        nivel: 'tecnico',
        area: 'Saúde e Segurança',
        blocos: [
            {
                nome: 'Bloco I - Gestão de Riscos',
                topicos: ['Gestão de riscos', 'Higiene ocupacional', 'Prevenção de incêndio', 'Legislação (NRs)'],
            },
            {
                nome: 'Bloco II - Análise',
                topicos: ['Acidentes de trabalho', 'APR/HAZOP', 'ISO 45001', 'Gestão de SESMT/CIPA'],
            },
            {
                nome: 'Bloco III - Ergonomia',
                topicos: ['Ergonomia', 'Suporte à vida', 'Plano Nacional de Contingência'],
            },
        ],
    },

    // ===== MANUTENÇÃO E OPERAÇÃO =====
    {
        id: 'manutencao-caldeiraria',
        nome: 'Técnico de Manutenção - Caldeiraria',
        nivel: 'tecnico',
        area: 'Manutenção e Operação',
        blocos: [
            {
                nome: 'Bloco I - Mecânica',
                topicos: ['Tecnologia Mecânica', 'Ensaios mecânicos', 'Resistência dos materiais', 'Soldagem'],
            },
            {
                nome: 'Bloco II - Metalurgia',
                topicos: ['Metalurgia', 'Metalografia', 'Tratamentos térmicos'],
            },
            {
                nome: 'Bloco III - Desenho',
                topicos: ['Desenho técnico', 'Ajustagem', 'Controle de qualidade', 'Normas técnicas'],
            },
        ],
    },
    {
        id: 'manutencao-eletrica',
        nome: 'Técnico de Manutenção - Elétrica',
        nivel: 'tecnico',
        area: 'Manutenção e Operação',
        blocos: [
            {
                nome: 'Bloco I - Circuitos',
                topicos: ['Diagramas elétricos', 'Circuitos CC/CA', 'Máquinas elétricas', 'NR-10'],
            },
            {
                nome: 'Bloco II - Instalações',
                topicos: ['Medidas elétricas', 'Retificadores', 'Instalações BT/MT'],
            },
            {
                nome: 'Bloco III - Proteção',
                topicos: ['Aterramento', 'SPDA', 'NBR-5410', 'Eletrônica básica', 'Automação'],
            },
        ],
    },
    {
        id: 'manutencao-mecanica',
        nome: 'Técnico de Manutenção - Mecânica',
        nivel: 'tecnico',
        area: 'Manutenção e Operação',
        blocos: [
            {
                nome: 'Bloco I - Metrologia',
                topicos: ['Metrologia', 'Desenho técnico', 'Resistência dos materiais', 'Elementos de máquinas'],
            },
            {
                nome: 'Bloco II - Equipamentos',
                topicos: ['Hidráulica', 'Bombas', 'Compressores', 'Turbinas', 'Motores'],
            },
            {
                nome: 'Bloco III - Manutenção',
                topicos: ['Lubrificação', 'Alinhamento', 'Manutenção preditiva', 'Gestão de manutenção'],
            },
        ],
    },
    {
        id: 'manutencao-instrumentacao',
        nome: 'Técnico de Manutenção - Instrumentação',
        nivel: 'tecnico',
        area: 'Manutenção e Operação',
        blocos: [
            {
                nome: 'Bloco I - Instrumentação',
                topicos: ['Instrumentação industrial', 'Medição de grandezas', 'Sensores e transmissores'],
            },
            {
                nome: 'Bloco II - Controle',
                topicos: ['Sistemas de controle', 'CLPs', 'SDCDs', 'Redes industriais'],
            },
            {
                nome: 'Bloco III - Segurança',
                topicos: ['Sistemas instrumentados de segurança', 'Válvulas de controle', 'Análise de malhas'],
            },
        ],
    },
    {
        id: 'operacao',
        nome: 'Técnico de Operação',
        nivel: 'tecnico',
        area: 'Manutenção e Operação',
        blocos: [
            {
                nome: 'Bloco I - Fundamentos',
                topicos: ['Termodinâmica', 'Mecânica dos fluidos', 'Operações unitárias'],
            },
            {
                nome: 'Bloco II - Processos',
                topicos: ['Processos de refino', 'Química orgânica', 'Petroquímica', 'Processos de separação'],
            },
            {
                nome: 'Bloco III - Segurança',
                topicos: ['Segurança de processo', 'Controle de processos', 'Equipamentos industriais'],
            },
        ],
    },
    {
        id: 'operacao-lastro',
        nome: 'Técnico de Operação de Lastro',
        nivel: 'tecnico',
        area: 'Manutenção e Operação',
        blocos: [
            {
                nome: 'Bloco I - Estabilidade',
                topicos: ['Estabilidade de embarcações', 'Sistemas de lastro', 'Hidrostática naval', 'Flutuabilidade e trim'],
            },
            {
                nome: 'Bloco II - Manobra',
                topicos: ['Manobra de navios', 'Equipamentos de convés', 'Navegação básica', 'Cartas náuticas e GPS'],
            },
            {
                nome: 'Bloco III - Segurança Marítima',
                topicos: ['SOLAS', 'ISM Code', 'MARPOL', 'Sobrevivência no mar'],
            },
        ],
    },

    // ===== INSPEÇÃO =====
    {
        id: 'inspecao-equipamentos',
        nome: 'Técnico de Inspeção de Equipamentos e Instalações',
        nivel: 'tecnico',
        area: 'Inspeção e Química',
        blocos: [
            {
                nome: 'Bloco I - Física e Química',
                topicos: ['Eletroquímica', 'Desenho técnico', 'Metrologia', 'Sistema Internacional', 'Estática e Dinâmica'],
            },
            {
                nome: 'Bloco II - Materiais',
                topicos: ['Aço Carbono', 'Diagrama de equilíbrio', 'Ensaios não destrutivos', 'Hidrostática', 'Eletricidade básica'],
            },
            {
                nome: 'Bloco III - Processos',
                topicos: ['Transferência de calor', 'Soldagem', 'Processos de fabricação', 'Corrosão', 'Hidrocarbonetos'],
            },
        ],
    },

    // ===== PROJETOS, CONSTRUÇÃO E MONTAGEM =====
    {
        id: 'edificacoes',
        nome: 'Técnico em Edificações',
        nivel: 'tecnico',
        area: 'Projetos, Construção e Montagem',
        blocos: [
            {
                nome: 'Bloco I - Materiais',
                topicos: ['Materiais de construção', 'Topografia', 'Mecânica dos solos', 'Estruturas'],
            },
            {
                nome: 'Bloco II - Instalações',
                topicos: ['Instalações prediais', 'Orçamento', 'Planejamento (MS Project)'],
            },
            {
                nome: 'Bloco III - Projetos',
                topicos: ['AutoCAD', 'Segurança em obras (NR 18)'],
            },
        ],
    },
    {
        id: 'eletrica-projetos',
        nome: 'Técnico de Projetos, Construção e Montagem - Elétrica',
        nivel: 'tecnico',
        area: 'Projetos, Construção e Montagem',
        blocos: [
            {
                nome: 'Bloco I - Projetos',
                topicos: ['Projetos de instalações', 'Luminotécnica', 'Subestações'],
            },
            {
                nome: 'Bloco II - Proteção',
                topicos: ['Proteção elétrica', 'Comandos elétricos', 'Automação predial'],
            },
            {
                nome: 'Bloco III - Fiscalização',
                topicos: ['Fiscalização de obras', 'Comissionamento', 'Normas NBR'],
            },
        ],
    },
    {
        id: 'mecanica-projetos',
        nome: 'Técnico de Projetos, Construção e Montagem - Mecânica',
        nivel: 'tecnico',
        area: 'Projetos, Construção e Montagem',
        blocos: [
            {
                nome: 'Bloco I - Montagem',
                topicos: ['Montagem industrial', 'Tubulações', 'Estruturas metálicas'],
            },
            {
                nome: 'Bloco II - Qualidade',
                topicos: ['Soldagem', 'Inspeção', 'Ensaios não destrutivos', 'Pintura industrial'],
            },
            {
                nome: 'Bloco III - Planejamento',
                topicos: ['Planejamento de obras', 'Rigging', 'Normas ASME/API'],
            },
        ],
    },
    {
        id: 'instrumentacao-projetos',
        nome: 'Técnico de Projetos, Construção e Montagem - Instrumentação',
        nivel: 'tecnico',
        area: 'Projetos, Construção e Montagem',
        blocos: [
            {
                nome: 'Bloco I - Detalhamento',
                topicos: ['Projetos de instrumentação', 'P&ID', 'Listas de instrumentos', 'Simbologia ISA'],
            },
            {
                nome: 'Bloco II - Montagem',
                topicos: ['Montagem de CLP/SDCD', 'Tubing e cabeamento', 'Calibração em campo', 'Instalação de equipamentos'],
            },
            {
                nome: 'Bloco III - Comissionamento',
                topicos: ['Comissionamento de malhas', 'FAT e SAT', 'Normas de instrumentação', 'Segurança em instrumentação'],
            },
        ],
    },

    // ===== LOGÍSTICA, SUPRIMENTO E QUÍMICA =====
    {
        id: 'logistica-transportes',
        nome: 'Técnico de Logística de Transportes',
        nivel: 'tecnico',
        area: 'Logística, Suprimento e Química',
        blocos: [
            {
                nome: 'Bloco I - Armazenagem',
                topicos: ['Armazenagem', 'Logística reversa', 'Inventários', 'Modais de transporte'],
            },
            {
                nome: 'Bloco II - Movimentação',
                topicos: ['Movimentação de cargas', 'Logística internacional', 'Lei 13.303 (Lei das Estatais)'],
            },
            {
                nome: 'Bloco III - Segurança',
                topicos: ['Produtos perigosos', 'NR 11', 'Prevenção de incêndios'],
            },
        ],
    },
    {
        id: 'quimica-petroleo',
        nome: 'Técnico de Química de Petróleo',
        nivel: 'tecnico',
        area: 'Logística, Suprimento e Química',
        blocos: [
            {
                nome: 'Bloco I - Análise',
                topicos: ['Química analítica', 'Métodos instrumentais de análise'],
            },
            {
                nome: 'Bloco II - Orgânica',
                topicos: ['Química orgânica', 'Química inorgânica', 'Propriedades do petróleo'],
            },
            {
                nome: 'Bloco III - Laboratório',
                topicos: ['Análises laboratoriais', 'Controle de qualidade', 'Segurança em laboratório'],
            },
        ],
    },
    {
        id: 'suprimento-adm',
        nome: 'Técnico de Suprimento de Bens e Serviços - Administração',
        nivel: 'tecnico',
        area: 'Logística, Suprimento e Química',
        blocos: [
            {
                nome: 'Bloco I - Administração',
                topicos: ['Administração geral', 'Gestão de qualidade', 'Logística', 'Compras'],
            },
            {
                nome: 'Bloco II - Legislação',
                topicos: ['Lei 13.303 (Art. 28-91)', 'Regulamento de Licitações Petrobras (RLCP)'],
            },
            {
                nome: 'Bloco III - Tributos',
                topicos: ['Contabilidade básica', 'Direito tributário', 'Administração tributária'],
            },
        ],
    },

    // ===== NÍVEL SUPERIOR - ENGENHARIAS =====
    {
        id: 'eng-petroleo',
        nome: 'Engenharia de Petróleo',
        nivel: 'superior',
        area: 'Engenharia',
        blocos: [
            {
                nome: 'Bloco I - Engenharia de Poço',
                topicos: ['Perfuração', 'Fluidos de perfuração', 'Cimentação', 'Completação'],
            },
            {
                nome: 'Bloco II - Engenharia de Reservatórios',
                topicos: ['Propriedades da rocha e fluidos', 'Escoamento em meios porosos', 'Recuperação secundária'],
            },
            {
                nome: 'Bloco III - Elevação e Escoamento',
                topicos: ['Métodos de elevação artificial', 'Garantia de escoamento', 'Processamento primário'],
            },
        ],
    },
    {
        id: 'eng-mecanica',
        nome: 'Engenharia Mecânica',
        nivel: 'superior',
        area: 'Engenharia',
        blocos: [
            {
                nome: 'Bloco I - Termofluidos',
                topicos: ['Termodinâmica aplicada', 'Mecânica dos fluidos', 'Transmissão de calor', 'Máquinas de fluxo'],
            },
            {
                nome: 'Bloco II - Projeto Mecânico',
                topicos: ['Resistência dos materiais', 'Elementos de máquinas', 'Vibrações mecânicas', 'Seleção de materiais'],
            },
            {
                nome: 'Bloco III - Fabricação e Gestão',
                topicos: ['Processos de fabricação', 'Metrologia', 'Manutenção industrial', 'Gestão de projetos'],
            },
        ],
    },
    {
        id: 'eng-eletrica',
        nome: 'Engenharia Elétrica',
        nivel: 'superior',
        area: 'Engenharia',
        blocos: [
            {
                nome: 'Bloco I - Sistemas de Potência',
                topicos: ['Geração, transmissão e distribuição', 'Análise de sistemas de potência', 'Proteção de sistemas'],
            },
            {
                nome: 'Bloco II - Máquinas e Acionamentos',
                topicos: ['Transformadores', 'Máquinas rotativas', 'Eletrônica de potência', 'Acionamentos elétricos'],
            },
            {
                nome: 'Bloco III - Eletrônica e Controle',
                topicos: ['Circuitos elétricos', 'Eletrônica analógica e digital', 'Sistemas de controle', 'Instrumentação'],
            },
        ],
    },
    {
        id: 'eng-civil',
        nome: 'Engenharia Civil',
        nivel: 'superior',
        area: 'Engenharia',
        blocos: [
            {
                nome: 'Bloco I - Estruturas e Geotecnia',
                topicos: ['Análise estrutural', 'Concreto armado e protendido', 'Mecânica dos solos', 'Fundações'],
            },
            {
                nome: 'Bloco II - Construção Civil',
                topicos: ['Tecnologia das construções', 'Materiais de construção', 'Planejamento e controle de obras'],
            },
            {
                nome: 'Bloco III - Hidráulica e Saneamento',
                topicos: ['Mecânica dos fluidos', 'Hidráulica aplicada', 'Saneamento básico', 'Instalações prediais'],
            },
        ],
    },
    {
        id: 'eng-seguranca',
        nome: 'Engenharia de Segurança',
        nivel: 'superior',
        area: 'Engenharia',
        blocos: [
            {
                nome: 'Bloco I - Higiene e Medicina',
                topicos: ['Higiene ocupacional', 'Doenças ocupacionais', 'Toxicologia', 'Ergonomia'],
            },
            {
                nome: 'Bloco II - Gerenciamento de Riscos',
                topicos: ['Análise de riscos (APR, HAZOP)', 'Gerenciamento de riscos (PGR)', 'Prevenção e controle de perdas'],
            },
            {
                nome: 'Bloco III - Legislação e Incêndio',
                topicos: ['Normas Regulamentadoras (NRs)', 'Legislação previdenciária', 'Proteção contra incêndio e explosões'],
            },
        ],
    },

    // ===== NÍVEL SUPERIOR - ADMINISTRAÇÃO E ECONOMIA =====
    {
        id: 'administracao',
        nome: 'Administração',
        nivel: 'superior',
        area: 'Gestão e Negócios',
        blocos: [
            {
                nome: 'Bloco I - Gestão Estratégica',
                topicos: ['Planejamento estratégico', 'Gestão de processos', 'Gestão de projetos (PMBOK)', 'Governança corporativa'],
            },
            {
                nome: 'Bloco II - Gestão de Pessoas e Marketing',
                topicos: ['Comportamento organizacional', 'Gestão de RH', 'Marketing estratégico', 'Pesquisa de mercado'],
            },
            {
                nome: 'Bloco III - Logística e Finanças',
                topicos: ['Gestão da cadeia de suprimentos', 'Administração de materiais', 'Administração financeira', 'Orçamento'],
            },
        ],
    },
    {
        id: 'economia',
        nome: 'Economia',
        nivel: 'superior',
        area: 'Gestão e Negócios',
        blocos: [
            {
                nome: 'Bloco I - Microeconomia',
                topicos: ['Teoria do consumidor e da firma', 'Estruturas de mercado', 'Equilíbrio geral', 'Teoria dos jogos'],
            },
            {
                nome: 'Bloco II - Macroeconomia',
                topicos: ['Contabilidade nacional', 'Teoria monetária', 'Políticas fiscal e cambial', 'Crescimento econômico'],
            },
            {
                nome: 'Bloco III - Métodos Quantitativos',
                topicos: ['Estatística econômica', 'Econometria', 'Matemática financeira', 'Análise de projetos'],
            },
        ],
    },

    // ===== NÍVEL SUPERIOR - TI E GEOCIÊNCIAS =====
    {
        id: 'analista-sistemas-eng-software',
        nome: 'Analista de Sistemas - Engenharia de Software',
        nivel: 'superior',
        area: 'Tecnologia da Informação',
        blocos: [
            {
                nome: 'Bloco I - Desenvolvimento',
                topicos: ['Lógica de programação', 'Estruturas de dados', 'Padrões de projeto', 'Linguagens (Java, Python, C#)'],
            },
            {
                nome: 'Bloco II - Engenharia de Software',
                topicos: ['Ciclo de vida de software', 'Metodologias ágeis (Scrum, Kanban)', 'DevOps', 'Testes de software'],
            },
            {
                nome: 'Bloco III - Arquitetura e BD',
                topicos: ['Arquitetura de sistemas', 'Microserviços', 'Banco de dados (SQL e NoSQL)', 'Segurança da informação'],
            },
        ],
    },
    {
        id: 'analista-sistemas-infra',
        nome: 'Analista de Sistemas - Infraestrutura',
        nivel: 'superior',
        area: 'Tecnologia da Informação',
        blocos: [
            {
                nome: 'Bloco I - Redes e Comunicação',
                topicos: ['Protocolos TCP/IP', 'Roteamento e switching', 'Redes sem fio', 'Segurança de redes'],
            },
            {
                nome: 'Bloco II - Sistemas Operacionais',
                topicos: ['Windows Server', 'Linux (Red Hat/Debian)', 'Virtualização', 'Contêineres (Docker, K8s)'],
            },
            {
                nome: 'Bloco III - Gestão e Nuvem',
                topicos: ['Computação em nuvem (AWS/Azure)', 'Gestão de serviços (ITIL)', 'Monitoramento', 'Backup e recuperação'],
            },
        ],
    },
    {
        id: 'analista-sistemas-processos',
        nome: 'Analista de Sistemas - Processos de Negócio',
        nivel: 'superior',
        area: 'Tecnologia da Informação',
        blocos: [
            {
                nome: 'Bloco I - Modelagem de Processos',
                topicos: ['BPMN', 'Engenharia de requisitos', 'Análise de negócios', 'Gestão de processos (BPM)'],
            },
            {
                nome: 'Bloco II - Gestão de Projetos e Serviços',
                topicos: ['PMBOK', 'Scrum', 'ITIL 4', 'COBIT 2019'],
            },
            {
                nome: 'Bloco III - Dados e Inovação',
                topicos: ['Ciência de dados', 'Transformação digital', 'Design Thinking', 'Arquitetura corporativa'],
            },
        ],
    },
    {
        id: 'geologia',
        nome: 'Geologia',
        nivel: 'superior',
        area: 'Geociências',
        blocos: [
            {
                nome: 'Bloco I - Geologia Geral',
                topicos: ['Mineralogia e Petrologia', 'Geologia estrutural', 'Sedimentologia', 'Estratigrafia'],
            },
            {
                nome: 'Bloco II - Geologia do Petróleo',
                topicos: ['Sistemas petrolíferos', 'Geoquímica orgânica', 'Geofísica de exploração', 'Avaliação de formações'],
            },
            {
                nome: 'Bloco III - Mapeamento e Recursos',
                topicos: ['Geotecnologias', 'Sensoriamento remoto', 'Hidrogeologia', 'Geologia ambiental'],
            },
        ],
    },
    {
        id: 'geofisica',
        nome: 'Geofísica',
        nivel: 'superior',
        area: 'Geociências',
        blocos: [
            {
                nome: 'Bloco I - Métodos Potenciais',
                topicos: ['Gravimetria', 'Magnetometria', 'Eletromagnetismo', 'Processamento de dados'],
            },
            {
                nome: 'Bloco II - Métodos Sísmicos',
                topicos: ['Aquisição sísmica', 'Processamento sísmico', 'Interpretação sísmica', 'Sismologia'],
            },
            {
                nome: 'Bloco III - Física da Terra',
                topicos: ['Física da Terra sólida', 'Propriedades físicas das rochas', 'Perfilagem de poços'],
            },
        ],
    },
];

// Função para obter profissão por ID
export function getProfissaoById(id: string): Profissao | undefined {
    return PROFISSOES.find((p) => p.id === id);
}

// Função para obter profissões por área
export function getProfissoesByArea(area: string): Profissao[] {
    return PROFISSOES.filter((p) => p.area === area);
}

// Função para obter profissões por nível
export function getProfissoesByNivel(nivel: 'tecnico' | 'superior'): Profissao[] {
    return PROFISSOES.filter((p) => p.nivel === nivel);
}

// Lista de áreas únicas
export const AREAS = [...new Set(PROFISSOES.map((p) => p.area))];
