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
    topicos: Topico[];
}

export const CONTEUDO_MATERIAS: MateriaConteudo[] = [
    {
        id: 'portugues',
        nome: 'Língua Portuguesa',
        descricao: 'Gramática, interpretação de texto e redação para concursos CESGRANRIO',
        icone: '📝',
        cor: 'from-blue-500 to-cyan-500',
        topicos: [
            { id: 'interpretacao', titulo: 'Interpretação de Texto', descricao: 'Técnicas para compreender e analisar textos', duracao: '8 min', ordem: 1 },
            { id: 'coesao-coerencia', titulo: 'Coesão e Coerência', descricao: 'Elementos de ligação e organização textual', duracao: '6 min', ordem: 2 },
            { id: 'sintaxe', titulo: 'Sintaxe', descricao: 'Análise sintática e estrutura das orações', duracao: '10 min', ordem: 3 },
            { id: 'concordancia', titulo: 'Concordância Verbal e Nominal', descricao: 'Regras de concordância gramatical', duracao: '7 min', ordem: 4 },
            { id: 'regencia', titulo: 'Regência Verbal e Nominal', descricao: 'Uso correto das preposições', duracao: '6 min', ordem: 5 },
            { id: 'pontuacao', titulo: 'Pontuação', descricao: 'Uso correto dos sinais de pontuação', duracao: '5 min', ordem: 6 },
            { id: 'crase', titulo: 'Crase', descricao: 'Quando usar e não usar a crase', duracao: '5 min', ordem: 7 },
            { id: 'ortografia', titulo: 'Ortografia e Acentuação', descricao: 'Regras do novo acordo ortográfico', duracao: '6 min', ordem: 8 },
        ]
    },
    {
        id: 'matematica',
        nome: 'Matemática',
        descricao: 'Raciocínio lógico-quantitativo para concursos de nível médio',
        icone: '🔢',
        cor: 'from-purple-500 to-pink-500',
        topicos: [
            { id: 'conjuntos', titulo: 'Teoria dos Conjuntos', descricao: 'Operações e diagramas de Venn', duracao: '7 min', ordem: 1 },
            { id: 'razao-proporcao', titulo: 'Razão e Proporção', descricao: 'Grandezas proporcionais e regra de três', duracao: '8 min', ordem: 2 },
            { id: 'porcentagem', titulo: 'Porcentagem', descricao: 'Cálculos percentuais e variações', duracao: '6 min', ordem: 3 },
            { id: 'equacoes-1grau', titulo: 'Equações de 1º Grau', descricao: 'Resolução de equações lineares', duracao: '5 min', ordem: 4 },
            { id: 'equacoes-2grau', titulo: 'Equações de 2º Grau', descricao: 'Fórmula de Bhaskara e propriedades', duracao: '7 min', ordem: 5 },
            { id: 'funcoes', titulo: 'Funções', descricao: 'Funções afins, quadráticas e exponenciais', duracao: '10 min', ordem: 6 },
            { id: 'geometria-plana', titulo: 'Geometria Plana', descricao: 'Áreas e perímetros de figuras', duracao: '8 min', ordem: 7 },
            { id: 'geometria-espacial', titulo: 'Geometria Espacial', descricao: 'Volumes e áreas de sólidos', duracao: '8 min', ordem: 8 },
            { id: 'probabilidade', titulo: 'Probabilidade', descricao: 'Cálculo de probabilidades', duracao: '6 min', ordem: 9 },
            { id: 'estatistica', titulo: 'Estatística Básica', descricao: 'Média, mediana, moda e desvio padrão', duracao: '7 min', ordem: 10 },
        ]
    },
    {
        id: 'fisica',
        nome: 'Física',
        descricao: 'Conceitos de mecânica, termodinâmica e eletricidade para técnicos',
        icone: '⚡',
        cor: 'from-yellow-500 to-orange-500',
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
        id: 'ingles',
        nome: 'Língua Inglesa',
        descricao: 'Interpretação de textos técnicos em inglês',
        icone: '🇺🇸',
        cor: 'from-red-500 to-pink-500',
        topicos: [
            { id: 'reading-strategies', titulo: 'Reading Strategies', descricao: 'Técnicas de leitura e skimming', duracao: '6 min', ordem: 1 },
            { id: 'verb-tenses', titulo: 'Verb Tenses', descricao: 'Tempos verbais em inglês', duracao: '8 min', ordem: 2 },
            { id: 'connectors', titulo: 'Connectors', descricao: 'Palavras de ligação e transição', duracao: '5 min', ordem: 3 },
            { id: 'vocabulary', titulo: 'Technical Vocabulary', descricao: 'Vocabulário técnico de petróleo e gás', duracao: '10 min', ordem: 4 },
            { id: 'false-cognates', titulo: 'False Cognates', descricao: 'Falsos cognatos mais comuns', duracao: '5 min', ordem: 5 },
            { id: 'comprehension', titulo: 'Text Comprehension', descricao: 'Interpretação de textos técnicos', duracao: '8 min', ordem: 6 },
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
