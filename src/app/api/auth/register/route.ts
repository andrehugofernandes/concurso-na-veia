
import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { nome, username, email, password, nivel, cargo, plan } = body

        // Validation
        if (!nome || !username || !email || !password || !nivel || !cargo) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios' },
                { status: 400 }
            )
        }

        // Check password requirements
        const requirements = [
            password.length >= 12,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /[0-9]/.test(password),
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
        ];

        if (!requirements.every(Boolean)) {
            return NextResponse.json(
                { error: 'A senha deve ter no mínimo 12 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais.' },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // 0. Check if username exists (optional, but good for UX error message)
        const { data: existingUser } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', username)
            .single()

        if (existingUser) {
            return NextResponse.json(
                { error: 'Nome de usuário já está em uso.' },
                { status: 400 }
            )
        }

        // 1. Sign up user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    nome,
                    username, // Adicionado username
                    nivel,
                    cargo,
                    plan: plan || 'free',
                }
            }
        })

        if (authError) {
            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            )
        }

        // 2. Additional Profile Updates (Fallback)
        if (authData.user) {
            // A trigger deve cuidar disso, mas se falhar, tentamos atualizar
            // Adicionalmente, garantimos que o email fique salvo no profile
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    username,
                    email, // Garantir que email seja salvo
                    nome,  // Garantir que nome seja salvo
                    nivel,
                    cargo,
                    plan: plan || 'free',
                    updated_at: new Date().toISOString()
                })
                .eq('id', authData.user.id)

            if (profileError) {
                console.error('Error updating profile fallback:', profileError)
            }
        }

        return NextResponse.json({
            success: true,
            user: {
                id: authData.user?.id,
                email: authData.user?.email,
                username,
                nome,
                nivel,
                cargo,
                plan: plan || 'free'
            }
        })

    } catch (error: any) {
        console.error('Error registering user:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}
