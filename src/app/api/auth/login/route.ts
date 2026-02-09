
import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, password } = body

        // Validation
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Usuário e senha são obrigatórios' },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // 1. Buscar o email associado ao username usando RPC seguro
        const { data: userEmail, error: rpcError } = await supabase
            .rpc('get_email_by_username', { username_input: username })

        if (rpcError || !userEmail) {
            console.error('Error fetching email:', rpcError)
            return NextResponse.json(
                { error: 'Usuário não encontrado ou sem email associado' },
                { status: 401 }
            )
        }

        // 2. Fazer login usando o email recuperado
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password,
        })

        if (error || !session) {
            // Check for specific error codes
            if (error?.message?.includes('Email not confirmed') || error?.code === 'email_not_confirmed') {
                return NextResponse.json(
                    { error: 'Email não confirmado. Verifique sua caixa de entrada.' },
                    { status: 403 }
                )
            }

            return NextResponse.json(
                { error: 'Usuário ou senha incorretos' },
                { status: 401 }
            )
        }

        // 3. Verificar se o usuário tem MFA ativado
        const { data: factors } = await supabase.auth.mfa.listFactors()
        const hasVerifiedFactor = factors?.totp.some(factor => factor.status === 'verified')

        if (hasVerifiedFactor) {
            return NextResponse.json({
                success: true,
                mfaRequired: true
            })
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Error logging in:', error)

        // Catch any specific auth errors that might have bubbled up
        if (error?.message?.includes('Email not confirmed') || error?.code === 'email_not_confirmed') {
            return NextResponse.json(
                { error: 'Email não confirmado. Verifique sua caixa de entrada.' },
                { status: 403 }
            )
        }

        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}
