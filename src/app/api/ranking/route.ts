
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'geral'; // geral, cargo, materia

    try {
        let query = supabase
            .from('profiles')
            .select('nome, xp, cargo, avatar_url, nivel')
            .order('xp', { ascending: false })
            .limit(20);

        if (type === 'cargo') {
            const userCargo = searchParams.get('cargo');
            if (userCargo) {
                query = query.eq('cargo', userCargo);
            }
        }

        const { data: rankings, error } = await query;

        if (error) throw error;

        // Add position
        const rankingWithPos = rankings.map((r, index) => ({
            ...r,
            posicao: index + 1
        }));

        return NextResponse.json(rankingWithPos);

    } catch (error: any) {
        console.error('Error fetching ranking:', error);
        return NextResponse.json({ error: 'Erro ao buscar ranking' }, { status: 500 });
    }
}
