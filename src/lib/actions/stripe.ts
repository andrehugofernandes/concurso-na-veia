"use server";

import { stripe, getPriceByLookupKey, getOrCreateStripeCustomer, STRIPE_LOOKUP_KEYS, PLANOS_CONFIG, type StripePlan } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

// ─── Checkout para registro (pré-autenticação) ─────────────────

interface CheckoutRegisterData {
  planKey: string;
  userData: {
    nome: string;
    email: string;
    username: string;
    nivel: string;
    cargo: string;
  };
}

export async function createCheckoutSession(data: CheckoutRegisterData) {
  try {
    const { planKey, userData } = data;

    if (!planKey || !userData?.email) {
      return { error: "Dados inválidos" };
    }

    if (!(planKey in STRIPE_LOOKUP_KEYS)) {
      return { error: "Plano inválido" };
    }

    const lookupKey = STRIPE_LOOKUP_KEYS[planKey as StripePlan];
    const price = await getPriceByLookupKey(lookupKey);

    if (!price) {
      return { error: "Produto não configurado no Stripe. Execute o setup primeiro." };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer_email: userData.email,
      payment_method_types: ["card"],
      line_items: [{ price: price.id, quantity: 1 }],
      mode: "subscription",
      ui_mode: "embedded",
      return_url: `${appUrl}/register/success?session_id={CHECKOUT_SESSION_ID}&plan=${planKey}`,
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
      locale: "pt-BR",
    });

    return { clientSecret: session.client_secret };
  } catch (error: any) {
    console.error("[Stripe Checkout Register]", error);
    return { error: error.message ?? "Erro ao criar checkout" };
  }
}

// ─── Checkout para usuário já autenticado (upgrade) ─────────────

export async function createAuthenticatedCheckout(plan: string) {
  try {
    if (!plan || !(plan in PLANOS_CONFIG)) {
      return { error: "Plano inválido" };
    }

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: "Não autenticado" };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email, plan")
      .eq("id", user.id)
      .single();

    if (profile?.plan === plan) {
      return { error: "Você já possui este plano" };
    }

    const email = user.email ?? profile?.email ?? "";
    const nome = profile?.full_name ?? user.user_metadata?.full_name ?? "";

    const customerId = await getOrCreateStripeCustomer(user.id, email, nome);

    const lookupKey = STRIPE_LOOKUP_KEYS[plan as StripePlan];
    const price = await getPriceByLookupKey(lookupKey);

    if (!price) {
      return { error: "Produto não configurado no Stripe. Execute o setup primeiro." };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price: price.id, quantity: 1 }],
      mode: "subscription",
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
      locale: "pt-BR",
    });

    return { url: session.url };
  } catch (error: any) {
    console.error("[Stripe Checkout Auth]", error);
    return { error: error.message ?? "Erro ao criar checkout" };
  }
}

// ─── Verificar sessão de checkout ────────────────────────────────

export async function verifyCheckoutSession(sessionId: string) {
  try {
    if (!sessionId) {
      return { error: "Session ID obrigatório" };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const success = session.payment_status === "paid";

    return {
      success,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_email,
      metadata: session.metadata,
      clientSecret: session.client_secret,
    };
  } catch (error: any) {
    console.error("[Verify Session]", error);
    return { error: error.message ?? "Erro ao verificar sessão" };
  }
}

// ─── Portal do cliente (gerenciar/cancelar assinatura) ───────────

export async function createPortalSession() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: "Não autenticado" };
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    if (!subscription?.stripe_customer_id) {
      return { error: "Nenhuma assinatura encontrada" };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${appUrl}/seja-pro`,
    });

    return { url: session.url };
  } catch (error: any) {
    console.error("[Stripe Portal]", error);
    return { error: error.message ?? "Erro ao abrir portal" };
  }
}
