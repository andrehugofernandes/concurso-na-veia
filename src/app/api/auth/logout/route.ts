
import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()

        await supabase.auth.signOut()

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Error logging out:', error)
        return NextResponse.json(
            { error: 'Erro ao fazer logout' },
            { status: 500 }
        )
    }
}
