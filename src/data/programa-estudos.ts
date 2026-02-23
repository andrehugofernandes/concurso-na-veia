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

export function getProgramaDeEstudos(cargoId?: string): MateriaConteudo[] {
    // 1. Matérias Básicas (Sempre presentes)
    const programa: MateriaConteudo[] = [
        CONTEUDO_MATERIAS.find(m => m.id === 'portugues')!,
        CONTEUDO_MATERIAS.find(m => m.id === 'matematica')!,
    ];

    // Se não tiver cargo selecionado, retorna o básico padrão + exemplo de técnicas
    if (!cargoId) {
        const fisica = CONTEUDO_MATERIAS.find(m => m.id === 'fisica');
        const quimica = CONTEUDO_MATERIAS.find(m => m.id === 'quimica');
        if (fisica) programa.push(fisica);
        if (quimica) programa.push(quimica); // Exemplo genérico
        return programa;
    }

    // Mapear ID do legado/usuário para ID do edital
    const normalizedCargoId = CARGO_ID_MAP[cargoId] || cargoId;
    const profissao = getProfissaoById(normalizedCargoId);

    if (!profissao) {
        // Fallback se profissão não encontrada
        return programa;
    }

    // 2. Adicionar Inglês se for Nível Superior e ainda não estiver na lista
    // OBS: Verificamos tanto o nível da profissão quanto uma possível flag de nível no sistema
    if (profissao.nivel === 'superior') {
        const ingles = CONTEUDO_MATERIAS.find(m => m.id === 'ingles');
        if (ingles && !programa.find(p => p.id === 'ingles')) {
            programa.push(ingles);
        }
    } else {
        // Garantir que inglês seja removido se existir acidentalmente para nível médio
        const indexIngles = programa.findIndex(p => p.id === 'ingles');
        if (indexIngles !== -1) {
            programa.splice(indexIngles, 1);
        }
    }

    // 3. Adicionar Matérias Específicas (Baseadas nos Blocos)
    if (profissao.blocos) {
        profissao.blocos.forEach((bloco, index) => {
            const materiaId = `especifica-${slugify(bloco.nome)}`;

            // Transformar strings de tópicos em objetos Topico
            const topicos: Topico[] = bloco.topicos.map((topicoTitulo, tIndex) => ({
                id: slugify(topicoTitulo),
                titulo: topicoTitulo,
                descricao: `Tópico específico de ${profissao.nome}`,
                duracao: '30 min', // Duração padrão estimada
                ordem: tIndex + 1
            }));

            const novaMateria: MateriaConteudo = {
                id: materiaId,
                nome: bloco.nome,
                descricao: `Conhecimentos específicos para ${profissao.nome}`,
                icone: BLOCO_ICONS[index % BLOCO_ICONS.length],
                cor: BLOCO_COLORS[index % BLOCO_COLORS.length],
                requiredPlan: 'Ouro', // Específicas geralmente são premium
                topicos: topicos
            };

            programa.push(novaMateria);
        });
    }

    return programa;
}
