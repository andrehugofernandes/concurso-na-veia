
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { lessonId, moduleId, data } = await request.json();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = {
            user_id: user.id,
            lesson_id: lessonId,
            module_id: moduleId,
            ...data,
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from('lesson_progress')
            .upsert(payload, { onConflict: 'user_id, lesson_id, module_id' });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error saving progress:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const lessonId = searchParams.get('lessonId');

    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            if (authError) console.error('Auth check failed:', authError);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let query = supabase
            .from('lesson_progress')
            .select('*')
            .eq('user_id', user.id);

        if (lessonId) {
            query = query.eq('lesson_id', lessonId);
        }

        const { data: progress, error: dbError } = await query;

        if (dbError) {
            // If table doesn't exist yet, return empty array gracefully
            if (dbError.message?.includes('schema cache') || dbError.code === '42P01') {
                console.warn('lesson_progress table not found. Run the migration first.');
                return NextResponse.json([]);
            }
            console.error('Database error fetching progress:', dbError);
            throw dbError;
        }

        return NextResponse.json(progress ?? []);
    } catch (error: any) {
        console.error('Error fetching progress:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
