import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    const supabase = await createClient()

    // PKCE flow: exchange code for session
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            const redirectTo = request.nextUrl.clone()
            redirectTo.pathname = '/auth/verified'
            redirectTo.searchParams.delete('code')
            redirectTo.searchParams.set('next', next)
            return NextResponse.redirect(redirectTo)
        }
    }

    // Magic link / OTP flow
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })

        if (!error) {
            const redirectTo = request.nextUrl.clone()
            redirectTo.pathname = '/auth/verified'
            redirectTo.searchParams.delete('token_hash')
            redirectTo.searchParams.delete('type')
            redirectTo.searchParams.set('next', next)
            return NextResponse.redirect(redirectTo)
        }
    }

    // Error fallback
    const redirectTo = request.nextUrl.clone()
    redirectTo.pathname = '/auth/auth-code-error'
    return NextResponse.redirect(redirectTo)
}
