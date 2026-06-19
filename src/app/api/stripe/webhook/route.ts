/**
 * POST /api/stripe/webhook
 *
 * Recebe eventos do Stripe e sincroniza com o Supabase.
 * Configure no Stripe Dashboard: https://dashboard.stripe.com/webhooks
 * URL: https://seu-dominio.com/api/stripe/webhook
 *
 * Eventos necessários:
 *   - checkout.session.completed
 *   - customer.subscription.updated
 *   - customer.subscription.deleted
 */
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe, type StripePlan, PLANOS_CONFIG } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

// Usa service role para bypassar RLS durante webhook
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Em dev sem webhook secret, apenas loga (não valida assinatura)
  let event: Stripe.Event;

  if (process.env.NODE_ENV === 'production' && (!webhookSecret || !sig)) {
    console.error('[Webhook] Em produção, a assinatura e o secret são OBRIGATÓRIOS.');
    return NextResponse.json({ error: 'Acesso negado. Assinatura obrigatória.' }, { status: 400 });
  }

  if (webhookSecret && sig) {
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      console.error('[Webhook] Assinatura inválida:', err.message);
      return NextResponse.json({ error: 'Assinatura inválida' }, { status: 400 });
    }
  } else {
    // Apenas em dev sem secret
    try {
      event = JSON.parse(body) as Stripe.Event;
      console.warn('[Webhook] AVISO: STRIPE_WEBHOOK_SECRET não configurado — rodando sem validação (aceito apenas em dev)');
    } catch {
      return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
    }
  }

  const supabase = getServiceClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session, supabase);
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(sub, supabase);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(sub, supabase);
        break;
      }

      default:
        console.log(`[Webhook] Evento ignorado: ${event.type}`);
    }
  } catch (err: any) {
    console.error(`[Webhook] Erro ao processar ${event.type}:`, err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ---------------------------------------------------------------------------

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: ReturnType<typeof getServiceClient>
) {
  const userId = session.metadata?.supabase_user_id;
  const plan = session.metadata?.app_plan as StripePlan | undefined;

  if (!userId || !plan) {
    console.error('[Webhook] checkout.session.completed sem metadata userId/plan');
    return;
  }

  // Busca detalhes da assinatura
  const subscriptionId = session.subscription as string;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Atualiza perfil do usuário
  await supabase.from('profiles').update({ plan }).eq('id', userId);

  // Upsert na tabela subscriptions
  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: session.customer as string,
    stripe_subscription_id: subscriptionId,
    plan,
    status: subscription.status,
    current_period_start: subscription.items.data[0]?.current_period_start
      ? new Date(subscription.items.data[0].current_period_start * 1000).toISOString()
      : null,
    current_period_end: subscription.items.data[0]?.current_period_end
      ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });

  console.log(`[Webhook] ✅ Usuário ${userId} → plano ${plan}`);
}

async function handleSubscriptionUpdated(
  sub: Stripe.Subscription,
  supabase: ReturnType<typeof getServiceClient>
) {
  const userId = sub.metadata?.supabase_user_id;
  if (!userId) return;

  const rawPlan = sub.metadata?.app_plan;
  const plan: StripePlan | 'free' = (rawPlan && rawPlan in PLANOS_CONFIG) ? rawPlan as StripePlan : 'free';
  const isActive = sub.status === 'active' || sub.status === 'trialing';

  await supabase.from('profiles').update({ plan: isActive ? plan : 'free' }).eq('id', userId);

  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_subscription_id: sub.id,
    plan: isActive ? plan : 'free',
    status: sub.status,
    current_period_start: sub.items.data[0]?.current_period_start
      ? new Date(sub.items.data[0].current_period_start * 1000).toISOString()
      : null,
    current_period_end: sub.items.data[0]?.current_period_end
      ? new Date(sub.items.data[0].current_period_end * 1000).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });

  console.log(`[Webhook] 🔄 Sub atualizada ${sub.id} → ${sub.status}`);
}

async function handleSubscriptionDeleted(
  sub: Stripe.Subscription,
  supabase: ReturnType<typeof getServiceClient>
) {
  const userId = sub.metadata?.supabase_user_id;
  if (!userId) return;

  await supabase.from('profiles').update({ plan: 'free' }).eq('id', userId);

  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_subscription_id: sub.id,
    plan: 'free',
    status: 'canceled',
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });

  console.log(`[Webhook] ❌ Sub cancelada ${sub.id} → plano free`);
}
