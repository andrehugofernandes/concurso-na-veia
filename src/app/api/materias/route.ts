
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const professionSlug = searchParams.get('slug');

    if (!professionSlug) {
        return NextResponse.json({ error: 'Profissão slug obrigatório' }, { status: 400 });
    }

    const supabase = createClient();

    try {
        // 1. Get Profession ID
        const { data: profession, error: profError } = await supabase
            .from('profissoes')
            .select('id, nome')
            .eq('slug', professionSlug)
            .single();

        if (profError || !profession) {
            return NextResponse.json({ error: 'Profissão não encontrada' }, { status: 404 });
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

        if (rulesError) {
            throw rulesError;
        }

        return NextResponse.json({
            profession: profession.nome,
            subjects: rules.map((r: any) => ({
                id: r.materias.id,
                name: r.materias.nome,
                slug: r.materias.slug,
                description: r.materias.descricao,
                questionCount: r.qtd_questoes,
                isSpecific: r.is_especifica
            }))
        });

    } catch (error: any) {
        console.error('Error fetching subjects:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
