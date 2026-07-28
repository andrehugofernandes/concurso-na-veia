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

export async function createMercadoPagoCheckoutRegister(data: CheckoutRegisterData) {
  try {
    const { planKey, userData } = data;

    if (!planKey || !userData?.email) {
      return { error: "Dados inválidos para checkout" };
    }

    if (!(planKey in PLANOS_CONFIG)) {
      return { error: "Plano selecionado inválido" };
    }

    const config = PLANOS_CONFIG[planKey as AppPlan];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const preferenceData = {
      body: {
        items: [
          {
            id: planKey,
            title: `Concurso Na Veia - ${config.nome}`,
            description: `${config.descricao} (Acesso até a prova)`,
            quantity: 1,
            unit_price: config.preco / 100,
            currency_id: "BRL",
          },
        ],
        payer: {
          email: userData.email,
          name: userData.nome || userData.username,
        },
        back_urls: {
          success: `${appUrl}/register/success?gateway=mercadopago&plan=${planKey}&email=${encodeURIComponent(userData.email)}`,
          pending: `${appUrl}/register/success?gateway=mercadopago&status=pending&plan=${planKey}`,
          failure: `${appUrl}/register?error=payment_failed`,
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
        notification_url: `${appUrl}/api/mercadopago/webhook`,
      },
    };

    const response = await mpPreference.create(preferenceData);

    const checkoutUrl = process.env.NODE_ENV === "production"
      ? response.init_point
      : response.sandbox_init_point || response.init_point;

    return { url: checkoutUrl, preferenceId: response.id };
  } catch (error: any) {
    console.error("[MercadoPago Checkout Register Error]", error);
    return { error: error.message ?? "Erro ao criar preferência de pagamento no Mercado Pago" };
  }
}

export async function createMercadoPagoCheckoutAuth(planKey: string) {
  try {
    if (!planKey || !(planKey in PLANOS_CONFIG)) {
      return { error: "Plano selecionado inválido" };
    }

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: "Usuário não autenticado" };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email, plan")
      .eq("id", user.id)
      .single();

    if (profile?.plan === planKey) {
      return { error: "Você já possui este plano ativo" };
    }

    const config = PLANOS_CONFIG[planKey as AppPlan];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const email = user.email ?? profile?.email ?? "";
    const nome = profile?.full_name ?? user.user_metadata?.full_name ?? "";

    const preferenceData = {
      body: {
        items: [
          {
            id: planKey,
            title: `Concurso Na Veia - ${config.nome}`,
            description: `${config.descricao} (Acesso até a prova)`,
            quantity: 1,
            unit_price: config.preco / 100,
            currency_id: "BRL",
          },
        ],
        payer: {
          email,
          name: nome,
        },
        back_urls: {
          success: `${appUrl}/seja-pro?success=true&gateway=mercadopago&plan=${planKey}`,
          pending: `${appUrl}/seja-pro?pending=true&gateway=mercadopago`,
          failure: `${appUrl}/seja-pro?canceled=true`,
        },
        auto_return: "approved",
        metadata: {
          supabase_user_id: user.id,
          app_plan: planKey,
        },
        notification_url: `${appUrl}/api/mercadopago/webhook`,
      },
    };

    const response = await mpPreference.create(preferenceData);

    const checkoutUrl = process.env.NODE_ENV === "production"
      ? response.init_point
      : response.sandbox_init_point || response.init_point;

    return { url: checkoutUrl, preferenceId: response.id };
  } catch (error: any) {
    console.error("[MercadoPago Checkout Auth Error]", error);
    return { error: error.message ?? "Erro ao criar preferência de pagamento no Mercado Pago" };
  }
}
