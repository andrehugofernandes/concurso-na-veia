/**
 * POST /api/stripe/checkout
 *
 * Cria uma sessão de checkout no Stripe e retorna a URL de redirecionamento.
 * Body: { plan: 'pro' | 'enterprise' }
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe, getOrCreateStripeCustomer, getPriceByLookupKey, PLANOS_CONFIG, STRIPE_LOOKUP_KEYS, type StripePlan } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json() as { plan: StripePlan };

    if (!plan || !(plan in PLANOS_CONFIG)) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 });
    }

    // Autentica usuário
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Busca perfil do usuário
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email, plan')
      .eq('id', user.id)
      .single();

    const email = user.email ?? profile?.email ?? '';
    const nome = profile?.full_name ?? user.user_metadata?.full_name ?? '';

    // Evita dupla assinatura do mesmo plano
    if (profile?.plan === plan) {
      return NextResponse.json({ error: 'Você já possui este plano' }, { status: 400 });
    }

    // Busca ou cria customer Stripe
    const customerId = await getOrCreateStripeCustomer(user.id, email, nome);

    // Busca o price ID pelo lookup key
    const lookupKey = STRIPE_LOOKUP_KEYS[plan];
    const price = await getPriceByLookupKey(lookupKey);

    if (!price) {
      return NextResponse.json(
        { error: 'Produto não configurado. Acesse /api/stripe/setup primeiro.' },
        { status: 500 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    // Cria sessão de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'subscription',
      success_url: `${appUrl}/seja-pro?success=true&plan=${plan}`,
      cancel_url: `${appUrl}/seja-pro?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
        app_plan: plan,
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          app_plan: plan,
        },
      },
      locale: 'pt-BR',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('[Stripe Checkout]', error);
    return NextResponse.json({ error: error.message ?? 'Erro ao criar checkout' }, { status: 500 });
  }
}
