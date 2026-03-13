'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { 
  ActionResponse, 
  createSuccessResponse, 
  createErrorResponse 
} from '@/lib/actions/safe-action';

const getMateriasSchema = z.object({
  slug: z.string().min(1, 'Slug é obrigatório'),
});

export interface MateriaItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  questionCount: number;
  isSpecific: boolean;
}

export interface MateriasResult {
  profession: string;
  subjects: MateriaItem[];
}

/**
 * Recupera as matérias e regras de edital baseadas em uma profissão (slug).
 */
export async function getMateriasPorProfissaoAction(
  input: z.infer<typeof getMateriasSchema>
): Promise<ActionResponse<MateriasResult>> {
  try {
    const { slug } = getMateriasSchema.parse(input);
    const supabase = await createClient();

    // 1. Get Profession ID
    const { data: profession, error: profError } = await supabase
      .from('profissoes')
      .select('id, nome')
      .eq('slug', slug)
      .single();

    if (profError || !profession) {
      return createErrorResponse('Profissão não encontrada');
    }

    // 2. Get Rules and Subjects
    const { data: rules, error: rulesError } = await supabase
      .from('edital_regras')
      .select(`
        qtd_questoes,
        is_especifica,
        materias (
          id,
          nome,
          slug,
          descricao
        )
      `)
      .eq('profissao_id', profession.id);

    if (rulesError) throw rulesError;

    const subjects = (rules ?? []).map((r: any) => ({
      id: r.materias.id,
      name: r.materias.nome,
      slug: r.materias.slug,
      description: r.materias.descricao,
      questionCount: r.qtd_questoes,
      isSpecific: r.is_especifica
    }));

    return createSuccessResponse({
      profession: profession.nome,
      subjects
    });
  } catch (error: any) {
    console.error('[getMateriasPorProfissaoAction] Erro:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.issues[0].message);
    }
    return createErrorResponse(error.message || 'Erro ao buscar matérias');
  }
}
