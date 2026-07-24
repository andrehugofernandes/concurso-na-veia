"use server";

import { mpPreference, PLANOS_CONFIG, type AppPlan } from "@/lib/mercadopago";
import { createClient } from "@/lib/supabase/server";

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

export async function createMPCheckoutSession(data: CheckoutRegisterData) {
  try {
    const { planKey, userData } = data;

    if (!planKey || !userData?.email) {
      return { error: "Dados inválidos" };
    }

    if (!(planKey in PLANOS_CONFIG)) {
      return { error: "Plano inválido" };
    }

    const planConfig = PLANOS_CONFIG[planKey as AppPlan];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const preference = await mpPreference.create({
      body: {
        items: [
          {
            id: planKey,
            title: planConfig.nome,
            description: planConfig.descricao,
            quantity: 1,
            unit_price: planConfig.preco / 100, // MP espera em Reais, não em centavos
            currency_id: 'BRL',
          }
        ],
        payer: {
          email: userData.email,
          name: userData.nome,
        },
        back_urls: {
          success: `${appUrl}/register/success?plan=${planKey}`,
          failure: `${appUrl}/seja-pro?canceled=true`,
          pending: `${appUrl}/register/success?plan=${planKey}&pending=true`,
        },
        auto_return: "approved",
        metadata: {
          app_plan: planKey,
          user_email: userData.email,
          username: userData.username,
          user_nome: userData.nome,
          user_nivel: userData.nivel,
          user_cargo: userData.cargo,
        },
      }
    });

    return { url: preference.init_point }; // URL de redirecionamento do MP
  } catch (error: any) {
    console.error("[Mercado Pago Checkout Register]", error);
    return { error: error.message ?? "Erro ao criar checkout" };
  }
}

export async function createMPAuthenticatedCheckout(plan: string) {
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
    const planConfig = PLANOS_CONFIG[plan as AppPlan];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const preference = await mpPreference.create({
      body: {
        items: [
          {
            id: plan,
            title: planConfig.nome,
            description: planConfig.descricao,
            quantity: 1,
            unit_price: planConfig.preco / 100,
            currency_id: 'BRL',
          }
        ],
        payer: {
          email: email,
          name: nome,
        },
        back_urls: {
          success: `${appUrl}/seja-pro?success=true&plan=${plan}`,
          failure: `${appUrl}/seja-pro?canceled=true`,
          pending: `${appUrl}/seja-pro?pending=true&plan=${plan}`,
        },
        auto_return: "approved",
        metadata: {
          supabase_user_id: user.id,
          app_plan: plan,
        },
      }
    });

    return { url: preference.init_point };
  } catch (error: any) {
    console.error("[Mercado Pago Checkout Auth]", error);
    return { error: error.message ?? "Erro ao criar checkout" };
  }
}
