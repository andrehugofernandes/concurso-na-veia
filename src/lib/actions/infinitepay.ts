"use server";

import { createInfinitePayCob, getInfinitePayStatus } from "@/lib/infinitepay";
import { type StripePlan } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

interface CreateInfinitePayPixRegisterData {
  planKey: string;
  userData: {
    nome: string;
    email: string;
    username: string;
    nivel: string;
    cargo: string;
  };
}

export async function createInfinitePayPixChargeRegister(data: CreateInfinitePayPixRegisterData) {
  try {
    const { planKey, userData } = data;

    if (!planKey || !userData?.email) {
      return { error: "Dados de registro inválidos." };
    }

    const pixData = await createInfinitePayCob(
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
    console.error("[InfinitePay Pix Register Error]", error);
    return { error: error.message || "Erro ao gerar PIX no InfinitePay." };
  }
}

export async function createInfinitePayPixChargeAuth(planKey: string) {
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

    const pixData = await createInfinitePayCob(
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
    console.error("[InfinitePay Pix Auth Error]", error);
    return { error: error.message || "Erro ao gerar PIX no InfinitePay." };
  }
}

export async function checkInfinitePayPixStatusAction(txid: string) {
  try {
    if (!txid) return { paid: false };
    const statusData = await getInfinitePayStatus(txid);
    return statusData;
  } catch (error: any) {
    console.error("[Check InfinitePay Status Error]", error);
    return { paid: false, error: error.message };
  }
}
