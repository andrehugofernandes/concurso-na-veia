import { CONTEUDO_MATERIAS, MateriaConteudo, Topico } from './conteudo';
import { getProfissaoById } from '@/lib/profissoes-edital';
import { CARGO_ID_MAP } from '@/lib/cargos-map';

// Helper para gerar ID a partir de texto
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// Cores para os blocos específicos
const BLOCO_COLORS = [
    'from-blue-600 to-indigo-600',
    'from-purple-600 to-violet-600',
    'from-emerald-600 to-teal-600',
    'from-rose-600 to-pink-600',
    'from-amber-600 to-orange-600',
];

const BLOCO_ICONS = ['📚', '🔧', '🧠', '⚙️', '🔬'];

export function getProgramaDeEstudos(cargoId?: string, isElite?: boolean): MateriaConteudo[] {
    // 1. Se for Elite Total, retorna todas as matérias disponíveis
    if (isElite) {
        return CONTEUDO_MATERIAS;
    }

    // 2. Matérias Básicas (Sempre presentes para usuários comuns)
    const programa: MateriaConteudo[] = [
        CONTEUDO_MATERIAS.find(m => m.id === 'portugues')!,
        CONTEUDO_MATERIAS.find(m => m.id === 'matematica')!,
        CONTEUDO_MATERIAS.find(m => m.id === 'fisica')!,
        CONTEUDO_MATERIAS.find(m => m.id === 'quimica')!,
    ];

    // Se não tiver cargo selecionado, retorna o básico padrão
    if (!cargoId) {
        return programa;
    }

    // Mapear ID do legado/usuário para ID do edital
    const normalizedCargoId = CARGO_ID_MAP[cargoId] || cargoId;
    const profissao = getProfissaoById(normalizedCargoId);

    if (!profissao) {
        return programa;
    }

    // 3. Adicionar Inglês se for Nível Superior
    if (profissao.nivel === 'superior') {
        const ingles = CONTEUDO_MATERIAS.find(m => m.id === 'ingles');
        if (ingles && !programa.find(p => p.id === 'ingles')) {
            programa.push(ingles);
        }
    }

    // 4. Adicionar Matérias Específicas
    // Tenta encontrar blocos pré-definidos em CONTEUDO_MATERIAS primeiro (Ex: Suprimento-ADM)
    const blocosPreDefinidos = CONTEUDO_MATERIAS.filter(m => 
        m.id.startsWith(`especifica-bloco`) && 
        m.descricao.toLowerCase().includes(profissao.nome.toLowerCase())
    );

    if (blocosPreDefinidos.length > 0) {
        programa.push(...blocosPreDefinidos);
    } else if (profissao.blocos) {
        // Se não houver pré-definido, gera dinamicamente a partir de PROFISSOES
        profissao.blocos.forEach((bloco, index) => {
            const materiaId = `especifica-${slugify(bloco.nome)}`;
            
            const topicos: Topico[] = bloco.topicos.map((topicoTitulo, tIndex) => ({
                id: slugify(topicoTitulo),
                titulo: topicoTitulo,
                descricao: `Tópico específico de ${profissao.nome}`,
                duracao: '30 min',
                ordem: tIndex + 1
            }));

            const novaMateria: MateriaConteudo = {
                id: materiaId,
                nome: bloco.nome,
                descricao: `Conhecimentos específicos para ${profissao.nome}`,
                icone: BLOCO_ICONS[index % BLOCO_ICONS.length],
                cor: BLOCO_COLORS[index % BLOCO_COLORS.length],
                requiredPlan: 'Ouro',
                topicos: topicos
            };

            programa.push(novaMateria);
        });
    }

    return programa;
}
