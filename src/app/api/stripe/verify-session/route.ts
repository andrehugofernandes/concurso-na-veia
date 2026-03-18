/**
 * POST /api/stripe/verify-session
 *
 * Verifica o status de uma sessão de checkout
 * Body: { sessionId: string }
 */
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID obrigatório' }, { status: 400 });
    }

    // Buscar sessão
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Retornar status
    const success = session.payment_status === 'paid';

    return NextResponse.json({
      success,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_email,
      metadata: session.metadata,
    });
  } catch (error: any) {
    console.error('[Verify Session]', error);
    return NextResponse.json(
      { error: error.message ?? 'Erro ao verificar sessão' },
      { status: 500 }
    );
  }
}
