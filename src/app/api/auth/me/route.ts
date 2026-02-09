
import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient()

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Não autenticado' },
                { status: 401 }
            )
        }

        // Fetch profile data
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (profileError) {
            console.error('Error fetching profile:', profileError)
            // Fallback if profile doesn't exist yet (race condition with trigger?)
            return NextResponse.json({
                user: {
                    id: user.id,
                    email: user.email,
                    // minimal data from metadata if profile fetch fails
                    nome: user.user_metadata.nome,
                    nivel: user.user_metadata.nivel,
                    cargo: user.user_metadata.cargo,
                    plan: user.user_metadata.plan,
                    xp: 0,
                    questoes_geradas: 0
                }
            })
        }

        return NextResponse.json({
            user: {
                ...profile,
                email: user.email,
                user_metadata: user.user_metadata
            }
        })

    } catch (error: any) {
        console.error('Error getting user:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}
