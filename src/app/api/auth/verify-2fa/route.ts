import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { code } = body

        if (!code) {
            return NextResponse.json(
                { error: 'O código é obrigatório' },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // 1. Listar os fatores do usuário (ele deve estar logado, mas com nível aal1)
        const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors()
        
        if (factorsError) {
            console.error('Error listing factors:', factorsError)
            return NextResponse.json(
                { error: 'Erro ao recuperar fatores de autenticação' },
                { status: 400 }
            )
        }

        // 2. Encontrar o fator TOTP verificado
        const totpFactor = factors.totp.find(f => f.status === 'verified')
        
        if (!totpFactor) {
            return NextResponse.json(
                { error: 'Nenhum fator MFA verificado encontrado para este usuário.' },
                { status: 400 }
            )
        }

        // 3. Desafiar e verificar o código
        // challengeAndVerify é um helper que faz o challenge e logo em seguida o verify
        const { data, error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
            factorId: totpFactor.id,
            code
        })

        if (verifyError) {
            console.error('Error verifying MFA code:', verifyError)
            return NextResponse.json(
                { error: 'Código inválido ou expirado' },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            data
        })
    } catch (error: any) {
        console.error('MFA Verification error:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}
