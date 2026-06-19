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
    const normalizedCargoId = cargoId ? (CARGO_ID_MAP[cargoId] || cargoId) : undefined;
    const profissao = normalizedCargoId ? getProfissaoById(normalizedCargoId) : undefined;
    const userConcursoSlug = profissao?.concurso || "petrobras";

    // Filtrar matérias pelo concurso do usuário
    const filteredMaterias = CONTEUDO_MATERIAS.filter((m) => {
        if (!m.concursos) return true; // Matérias comuns (Português, Matemática)
        return m.concursos.includes(userConcursoSlug);
    });

    // 1. Se for Elite Total, retorna todas as matérias disponíveis para esse concurso
    if (isElite) {
        return filteredMaterias;
    }

    // 2. Matérias Básicas (Sempre presentes para usuários comuns)
    const programa: MateriaConteudo[] = [
        filteredMaterias.find(m => m.id === 'portugues')!,
        filteredMaterias.find(m => m.id === 'matematica')!,
    ].filter(Boolean);

    // Se não tiver cargo selecionado, retorna o básico padrão
    if (!cargoId) {
        return programa;
    }

    if (!profissao) {
        return programa;
    }

    // 3. Adicionar Inglês se for Nível Superior e a matéria estiver disponível no concurso
    if (profissao.nivel === 'superior') {
        const ingles = filteredMaterias.find(m => m.id === 'ingles');
        if (ingles && !programa.find(p => p.id === 'ingles')) {
            programa.push(ingles);
        }
    }

    // 4. Adicionar Matérias Específicas
    if (profissao.blocos) {
        profissao.blocos.forEach((bloco, index) => {
            const numRoman = index === 0 ? 'I' : index === 1 ? 'II' : 'III';
            
            // Tenta achar bloco pré-definido para este bloco específico
            const blocoPreDefinido = filteredMaterias.find(m => 
                m.id.startsWith(`especifica-bloco`) && 
                (
                    (m.profissoes && m.profissoes.includes(profissao.id) && m.nome.includes(`Bloco ${numRoman}`)) ||
                    (!m.profissoes && m.descricao.toLowerCase().includes(profissao.nome.toLowerCase()) && m.nome.includes(`Bloco ${numRoman}`))
                )
            );

            if (blocoPreDefinido) {
                programa.push(blocoPreDefinido);
            } else {
                // Se não houver pré-definido para este bloco, gera dinamicamente a partir de PROFISSOES
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
                    topicos: topicos,
                    concursos: [userConcursoSlug]
                };

                programa.push(novaMateria);
            }
        });
    } else {
        // Fallback legado caso a profissão não tenha a propriedade blocos
        const blocosPreDefinidos = filteredMaterias.filter(m => 
            m.id.startsWith(`especifica-bloco`) && 
            m.descricao.toLowerCase().includes(profissao.nome.toLowerCase())
        );
        if (blocosPreDefinidos.length > 0) {
            programa.push(...blocosPreDefinidos);
        }
    }

    return programa;
}
