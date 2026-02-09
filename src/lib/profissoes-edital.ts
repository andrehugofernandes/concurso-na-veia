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
        nome: 'Enfermagem do Trabalho',
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
        nome: 'Segurança do Trabalho',
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
        nome: 'Manutenção - Caldeiraria',
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
        nome: 'Manutenção - Elétrica',
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
        nome: 'Manutenção - Mecânica',
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
        nome: 'Manutenção - Instrumentação',
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
        nome: 'Operação de Lastro',
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
        nome: 'Inspeção de Equipamentos e Instalações',
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
        nome: 'Técnico Elétrica (Projetos)',
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
        nome: 'Técnico Mecânica (Projetos)',
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
        nome: 'Técnico Instrumentação (Projetos)',
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
        nome: 'Logística de Transportes',
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
        nome: 'Química de Petróleo',
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
        nome: 'Suprimento (Administração)',
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
