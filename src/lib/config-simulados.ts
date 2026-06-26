// Estrutura de Simulados baseada no Edital Petrobras/Transpetro 2023.2 (CESGRANRIO)
// Configurações de prova por nível e profissão

export interface ConfiguracaoProva {
    totalQuestoes: number;
    tempoLimiteMinutos: number;
    distribuicaoMaterias: DistribuicaoMateria[];
}

export interface DistribuicaoMateria {
    materia: string;
    quantidade: number;
    peso: number; // peso para cálculo da nota final
}

// Configuração para Nível Técnico (60 questões - padrão CESGRANRIO)
export const PROVA_TECNICO_PADRAO: ConfiguracaoProva = {
    totalQuestoes: 60,
    tempoLimiteMinutos: 240, // 4 horas
    distribuicaoMaterias: [
        { materia: 'Língua Portuguesa', quantidade: 10, peso: 1 },
        { materia: 'Matemática', quantidade: 10, peso: 1 },
        { materia: 'Conhecimentos Específicos', quantidade: 40, peso: 2 },
    ],
};

// Configuração para Simulado Completo (100 questões - modo intensivo)
export const PROVA_SIMULADO_COMPLETO: ConfiguracaoProva = {
    totalQuestoes: 100,
    tempoLimiteMinutos: 240, // 4 horas
    distribuicaoMaterias: [
        { materia: 'Língua Portuguesa', quantidade: 15, peso: 1 },
        { materia: 'Matemática', quantidade: 15, peso: 1 },
        { materia: 'Conhecimentos Específicos', quantidade: 70, peso: 2 },
    ],
};

// Distribuição de Conhecimentos Específicos por profissão
export interface DistribuicaoEspecifica {
    profissaoId: string;
    blocos: { nome: string; quantidade: number }[];
}

export const DISTRIBUICAO_ESPECIFICA: Record<string, DistribuicaoEspecifica> = {
    // Técnico de Operação
    'operacao': {
        profissaoId: 'operacao',
        blocos: [
            { nome: 'Termodinâmica e Mecânica dos Fluidos', quantidade: 15 },
            { nome: 'Processos de Refino e Petroquímica', quantidade: 15 },
            { nome: 'Segurança de Processo e Equipamentos', quantidade: 10 },
        ],
    },
    // Operação de Lastro
    'operacao-lastro': {
        profissaoId: 'operacao-lastro',
        blocos: [
            { nome: 'Estabilidade e Sistemas de Lastro', quantidade: 15 },
            { nome: 'Manobra e Navegação', quantidade: 15 },
            { nome: 'Segurança Marítima (SOLAS/MARPOL)', quantidade: 10 },
        ],
    },
    // Manutenção Elétrica
    'manutencao-eletrica': {
        profissaoId: 'manutencao-eletrica',
        blocos: [
            { nome: 'Circuitos Elétricos e Máquinas', quantidade: 15 },
            { nome: 'Instalações e Medidas Elétricas', quantidade: 15 },
            { nome: 'Proteção, Aterramento e Automação', quantidade: 10 },
        ],
    },
    // Manutenção Mecânica
    'manutencao-mecanica': {
        profissaoId: 'manutencao-mecanica',
        blocos: [
            { nome: 'Metrologia e Elementos de Máquinas', quantidade: 15 },
            { nome: 'Equipamentos Rotativos e Hidráulica', quantidade: 15 },
            { nome: 'Manutenção Preditiva e Gestão', quantidade: 10 },
        ],
    },
    // Manutenção Instrumentação
    'manutencao-instrumentacao': {
        profissaoId: 'manutencao-instrumentacao',
        blocos: [
            { nome: 'Instrumentação e Medição', quantidade: 15 },
            { nome: 'CLPs, SDCDs e Redes Industriais', quantidade: 15 },
            { nome: 'Sistemas de Controle e Segurança', quantidade: 10 },
        ],
    },
    // Manutenção Caldeiraria
    'manutencao-caldeiraria': {
        profissaoId: 'manutencao-caldeiraria',
        blocos: [
            { nome: 'Tecnologia Mecânica e Soldagem', quantidade: 15 },
            { nome: 'Metalurgia e Tratamentos Térmicos', quantidade: 15 },
            { nome: 'Desenho Técnico e Qualidade', quantidade: 10 },
        ],
    },
    // Enfermagem do Trabalho
    'enfermagem-trabalho': {
        profissaoId: 'enfermagem-trabalho',
        blocos: [
            { nome: 'Urgências e Epidemiologia', quantidade: 15 },
            { nome: 'NRs, PCMSO e Toxicologia', quantidade: 15 },
            { nome: 'Enfermagem Clínica e Biossegurança', quantidade: 10 },
        ],
    },
    // Segurança do Trabalho
    'seguranca-trabalho': {
        profissaoId: 'seguranca-trabalho',
        blocos: [
            { nome: 'Gestão de Riscos e NRs', quantidade: 15 },
            { nome: 'Análise de Acidentes e ISO 45001', quantidade: 15 },
            { nome: 'Ergonomia e Planos de Contingência', quantidade: 10 },
        ],
    },
    // Logística de Transportes
    'logistica-transportes': {
        profissaoId: 'logistica-transportes',
        blocos: [
            { nome: 'Armazenagem e Inventários', quantidade: 15 },
            { nome: 'Movimentação e Lei das Estatais', quantidade: 15 },
            { nome: 'Produtos Perigosos e NR 11', quantidade: 10 },
        ],
    },
    // Química de Petróleo
    'quimica-petroleo': {
        profissaoId: 'quimica-petroleo',
        blocos: [
            { nome: 'Química Analítica e Instrumental', quantidade: 15 },
            { nome: 'Química Orgânica e Propriedades do Petróleo', quantidade: 15 },
            { nome: 'Análises Laboratoriais e Qualidade', quantidade: 10 },
        ],
    },
    // Suprimento (Administração)
    'suprimento-adm': {
        profissaoId: 'suprimento-adm',
        blocos: [
            { nome: 'Administração e Logística', quantidade: 15 },
            { nome: 'Lei 13.303 e RLCP', quantidade: 15 },
            { nome: 'Contabilidade e Tributos', quantidade: 10 },
        ],
    },
    // Inspeção de Equipamentos e Instalações
    'inspecao-equipamentos': {
        profissaoId: 'inspecao-equipamentos',
        blocos: [
            { nome: 'Física, Química e Metrologia', quantidade: 15 },
            { nome: 'Materiais e Ensaios Não Destrutivos', quantidade: 15 },
            { nome: 'Soldagem e Corrosão', quantidade: 10 },
        ],
    },
    // Edificações
    'edificacoes': {
        profissaoId: 'edificacoes',
        blocos: [
            { nome: 'Materiais e Estruturas', quantidade: 15 },
            { nome: 'Instalações e Orçamento', quantidade: 15 },
            { nome: 'AutoCAD e Segurança (NR 18)', quantidade: 10 },
        ],
    },
    // Elétrica (Projetos)
    'eletrica-projetos': {
        profissaoId: 'eletrica-projetos',
        blocos: [
            { nome: 'Projetos e Subestações', quantidade: 15 },
            { nome: 'Proteção e Automação', quantidade: 15 },
            { nome: 'Fiscalização e Normas NBR', quantidade: 10 },
        ],
    },
    // Mecânica (Projetos)
    'mecanica-projetos': {
        profissaoId: 'mecanica-projetos',
        blocos: [
            { nome: 'Montagem e Tubulações', quantidade: 15 },
            { nome: 'Soldagem e Ensaios', quantidade: 15 },
            { nome: 'Rigging e Normas ASME/API', quantidade: 10 },
        ],
    },
    // Instrumentação (Projetos)
    'instrumentacao-projetos': {
        profissaoId: 'instrumentacao-projetos',
        blocos: [
            { nome: 'Projetos e P&ID', quantidade: 15 },
            { nome: 'Montagem e Calibração', quantidade: 15 },
            { nome: 'Comissionamento e FAT/SAT', quantidade: 10 },
        ],
    },
};

// Tipos de Simulado
export type TipoSimulado = 'rapido' | 'padrao' | 'completo' | 'maratona';

export interface ConfigSimulado {
    tipo: TipoSimulado;
    nome: string;
    descricao: string;
    questoes: number;
    tempoMinutos: number;
    materias: string[];
}

export const TIPOS_SIMULADO: ConfigSimulado[] = [
    {
        tipo: 'rapido',
        nome: 'Simulado Rápido',
        descricao: 'Treino rápido para aquecimento',
        questoes: 5,
        tempoMinutos: 15,
        materias: ['misto'],
    },
    {
        tipo: 'padrao',
        nome: 'Simulado Padrão',
        descricao: 'Simulado com 30 questões focadas',
        questoes: 30,
        tempoMinutos: 60,
        materias: ['Língua Portuguesa', 'Matemática', 'Conhecimentos Específicos'],
    },
    {
        tipo: 'completo',
        nome: 'Prova Completa',
        descricao: 'Simulado no formato exato do edital (60 questões)',
        questoes: 60,
        tempoMinutos: 240,
        materias: ['Língua Portuguesa', 'Matemática', 'Conhecimentos Específicos'],
    },
    {
        tipo: 'maratona',
        nome: 'Maratona 100 Questões',
        descricao: 'Simulado intensivo com 100 questões',
        questoes: 100,
        tempoMinutos: 240,
        materias: ['Língua Portuguesa', 'Matemática', 'Conhecimentos Específicos'],
    },
];

// Função para obter configuração de prova por tipo
export function getConfigSimulado(tipo: TipoSimulado): ConfigSimulado | undefined {
    return TIPOS_SIMULADO.find(s => s.tipo === tipo);
}

// Função para calcular distribuição de questões para maratona (100 questões)
export function calcularDistribuicaoMaratona(profissaoId: string): DistribuicaoMateria[] {
    const especifica = DISTRIBUICAO_ESPECIFICA[profissaoId];

    if (!especifica) {
        // Distribuição padrão se profissão não encontrada
        return [
            { materia: 'Língua Portuguesa', quantidade: 15, peso: 1 },
            { materia: 'Matemática', quantidade: 15, peso: 1 },
            { materia: 'Conhecimentos Específicos - Bloco I', quantidade: 25, peso: 2 },
            { materia: 'Conhecimentos Específicos - Bloco II', quantidade: 25, peso: 2 },
            { materia: 'Conhecimentos Específicos - Bloco III', quantidade: 20, peso: 2 },
        ];
    }

    const resultado: DistribuicaoMateria[] = [
        { materia: 'Língua Portuguesa', quantidade: 15, peso: 1 },
        { materia: 'Matemática', quantidade: 15, peso: 1 },
    ];

    // Escalar blocos específicos para 70 questões
    const fatorEscala = 70 / 40; // 70 questões / 40 originais
    especifica.blocos.forEach(bloco => {
        resultado.push({
            materia: bloco.nome,
            quantidade: Math.round(bloco.quantidade * fatorEscala),
            peso: 2,
        });
    });

    return resultado;
}
