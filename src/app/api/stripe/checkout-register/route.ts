/**
 * POST /api/stripe/checkout-register
 *
 * Cria uma sessão de checkout para novo usuário (ainda não autenticado)
 * Body: {
 *   planKey: string (aprovado-medio, elite-superior, etc)
 *   userData: { nome, email, username, nivel, cargo }
 * }
 */
import { NextRequest, NextResponse } from 'next/server';
import { stripe, getPriceByLookupKey, STRIPE_LOOKUP_KEYS, type StripePlan } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { planKey, userData } = await req.json();

    if (!planKey || !userData?.email) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    // Validar planKey
    if (!(planKey in STRIPE_LOOKUP_KEYS)) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 });
    }

    // Buscar price ID pelo lookup key
    const lookupKey = STRIPE_LOOKUP_KEYS[planKey as StripePlan];
    const price = await getPriceByLookupKey(lookupKey);

    if (!price) {
      return NextResponse.json(
        { error: 'Produto não configurado. Acesse /api/stripe/setup primeiro.' },
        { status: 500 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    // Criar sessão de checkout com dados de usuário no metadata
    const session = await stripe.checkout.sessions.create({
      customer_email: userData.email,

      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'subscription',
      success_url: `${appUrl}/register/success?session_id={CHECKOUT_SESSION_ID}&plan=${planKey}`,
      cancel_url: `${appUrl}/register?step=3&plan=${planKey}`,
      metadata: {
        app_plan: planKey,
        user_email: userData.email,
        username: userData.username,
        user_nome: userData.nome,
        user_nivel: userData.nivel,
        user_cargo: userData.cargo,
      },
      subscription_data: {
        metadata: {
          app_plan: planKey,
          user_email: userData.email,
          username: userData.username,
          user_nome: userData.nome,
          user_nivel: userData.nivel,
          user_cargo: userData.cargo,
        },
      },
      locale: 'pt-BR',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('[Stripe Checkout Register]', error);
    return NextResponse.json(
      { error: error.message ?? 'Erro ao criar checkout' },
      { status: 500 }
    );
  }
}
