
export interface Materia {
    id: string;
    nome: string;
    peso: number;
}

export interface Cargo {
    id: string;
    nome: string;
    nivel: 'medio' | 'superior';
    materiasBasicas: Materia[];
    materiasEspecificas: Materia[];
}

export const MATERIAS_BASICAS_MEDIO: Materia[] = [
    { id: 'portugues', nome: 'Língua Portuguesa', peso: 1 },
    { id: 'matematica', nome: 'Matemática', peso: 1 },
];

export const MATERIAS_BASICAS_SUPERIOR: Materia[] = [
    { id: 'portugues', nome: 'Língua Portuguesa', peso: 1 },
    { id: 'ingles', nome: 'Língua Inglesa', peso: 1 },
];

export const CARGOS: Cargo[] = [
    // Nível Médio
    {
        id: 'operacao',
        nome: 'Técnico de Operação',
        nivel: 'medio',
        materiasBasicas: MATERIAS_BASICAS_MEDIO,
        materiasEspecificas: [
            { id: 'fisica', nome: 'Física', peso: 2 },
            { id: 'quimica', nome: 'Química', peso: 2 },
            { id: 'termodinamica', nome: 'Termodinâmica', peso: 2 },
            { id: 'instrumentacao', nome: 'Instrumentação', peso: 2 },
        ]
    },
    {
        id: 'manutencao-mecanica',
        nome: 'Manutenção Mecânica',
        nivel: 'medio',
        materiasBasicas: MATERIAS_BASICAS_MEDIO,
        materiasEspecificas: [
            { id: 'metrologia', nome: 'Metrologia', peso: 2 },
            { id: 'elementos-maquinas', nome: 'Elementos de Máquinas', peso: 2 },
            { id: 'resistencia-materiais', nome: 'Resistência dos Materiais', peso: 2 },
            { id: 'hidraulica', nome: 'Hidráulica e Pneumática', peso: 2 },
        ]
    },
    {
        id: 'manutencao-eletrica',
        nome: 'Manutenção Elétrica',
        nivel: 'medio',
        materiasBasicas: MATERIAS_BASICAS_MEDIO,
        materiasEspecificas: [
            { id: 'circuitos-eletricos', nome: 'Circuitos Elétricos', peso: 2 },
            { id: 'maquinas-eletricas', nome: 'Máquinas Elétricas', peso: 2 },
            { id: 'instalacoes', nome: 'Instalações Elétricas', peso: 2 },
            { id: 'nr10', nome: 'NR-10', peso: 2 },
        ]
    },
    {
        id: 'seguranca',
        nome: 'Segurança do Trabalho',
        nivel: 'medio',
        materiasBasicas: MATERIAS_BASICAS_MEDIO,
        materiasEspecificas: [
            { id: 'nrs', nome: 'Normas Regulamentadoras', peso: 2 },
            { id: 'epis', nome: 'EPIs e EPCs', peso: 2 },
            { id: 'analise-riscos', nome: 'Análise de Riscos', peso: 2 },
            { id: 'higiene', nome: 'Higiene Ocupacional', peso: 2 },
        ]
    },
    {
        id: 'administracao',
        nome: 'Suprimentos/Administração',
        nivel: 'medio',
        materiasBasicas: MATERIAS_BASICAS_MEDIO,
        materiasEspecificas: [
            { id: 'logistica', nome: 'Logística', peso: 2 },
            { id: 'gestao-estoques', nome: 'Gestão de Estoques', peso: 2 },
            { id: 'licitacoes', nome: 'Licitações e Contratos', peso: 2 },
            { id: 'noções-adm', nome: 'Noções de Administração', peso: 2 },
        ]
    },

    // Nível Superior
    {
        id: 'eng-petroleo',
        nome: 'Engenheiro de Petróleo',
        nivel: 'superior',
        materiasBasicas: MATERIAS_BASICAS_SUPERIOR,
        materiasEspecificas: [
            { id: 'geologia-petroleo', nome: 'Geologia do Petróleo', peso: 2 },
            { id: 'reservatorios', nome: 'Engenharia de Reservatórios', peso: 2 },
            { id: 'perfuracao', nome: 'Perfuração', peso: 2 },
            { id: 'producao', nome: 'Elevação e Escoamento', peso: 2 },
        ]
    },
    {
        id: 'eng-mecanico',
        nome: 'Engenheiro Mecânico',
        nivel: 'superior',
        materiasBasicas: MATERIAS_BASICAS_SUPERIOR,
        materiasEspecificas: [
            { id: 'resistencia-materiais-sup', nome: 'Resistência dos Materiais', peso: 2 },
            { id: 'termodinamica-sup', nome: 'Termodinâmica', peso: 2 },
            { id: 'mecanica-fluidos', nome: 'Mecânica dos Fluidos', peso: 2 },
            { id: 'transf-calor', nome: 'Transferência de Calor', peso: 2 },
        ]
    },
    {
        id: 'analista-sistemas',
        nome: 'Analista de Sistemas',
        nivel: 'superior',
        materiasBasicas: MATERIAS_BASICAS_SUPERIOR,
        materiasEspecificas: [
            { id: 'desenvolvimento', nome: 'Desenvolvimento de Software', peso: 2 },
            { id: 'banco-dados', nome: 'Banco de Dados', peso: 2 },
            { id: 'eng-software', nome: 'Engenharia de Software', peso: 2 },
            { id: 'infraestrutura', nome: 'Infraestrutura e Redes', peso: 2 },
        ]
    },
];
