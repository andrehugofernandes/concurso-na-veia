"use server";

import { createEfiCob, getEfiCobStatus } from "@/lib/efi";
import { type StripePlan } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

interface CreateEfiPixRegisterData {
  planKey: string;
  userData: {
    nome: string;
    email: string;
    username: string;
    nivel: string;
    cargo: string;
  };
}

export async function createEfiPixChargeRegister(data: CreateEfiPixRegisterData) {
  try {
    const { planKey, userData } = data;

    if (!planKey || !userData?.email) {
      return { error: "Dados de registro inválidos." };
    }

    const pixData = await createEfiCob(
      planKey as StripePlan,
      userData.email,
      userData.nome
    );

    return {
      success: true,
      txid: pixData.txid,
      pixCopiaECola: pixData.pixCopiaECola,
      imagemQrcode: pixData.imagemQrcode,
      valor: pixData.valor,
      expiracao: pixData.expiracao,
    };
  } catch (error: any) {
    console.error("[Efí Pix Register Error]", error);
    return { error: error.message || "Erro ao gerar PIX no Efí Bank." };
  }
}

export async function createEfiPixChargeAuth(planKey: string) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: "Não autenticado." };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email, plan")
      .eq("id", user.id)
      .single();

    if (profile?.plan === planKey) {
      return { error: "Você já possui este plano ativo." };
    }

    const email = user.email ?? profile?.email ?? "";
    const nome = profile?.full_name ?? user.user_metadata?.full_name ?? "";

    const pixData = await createEfiCob(
      planKey as StripePlan,
      email,
      nome
    );

    return {
      success: true,
      txid: pixData.txid,
      pixCopiaECola: pixData.pixCopiaECola,
      imagemQrcode: pixData.imagemQrcode,
      valor: pixData.valor,
      expiracao: pixData.expiracao,
    };
  } catch (error: any) {
    console.error("[Efí Pix Auth Error]", error);
    return { error: error.message || "Erro ao gerar PIX no Efí Bank." };
  }
}

export async function checkEfiPixStatusAction(txid: string) {
  try {
    if (!txid) return { paid: false };
    const statusData = await getEfiCobStatus(txid);
    return statusData;
  } catch (error: any) {
    console.error("[Check Efí Status Error]", error);
    return { paid: false, error: error.message };
  }
}
