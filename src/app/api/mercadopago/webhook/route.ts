import { NextRequest, NextResponse } from 'next/server';
import { mpPayment, type AppPlan } from '@/lib/mercadopago';
import { createClient } from '@supabase/supabase-js';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const body = await req.json().catch(() => ({}));

    const topic = url.searchParams.get('type') || url.searchParams.get('topic') || body.type || body.action;
    const paymentId = url.searchParams.get('data.id') || url.searchParams.get('id') || body.data?.id;

    if ((topic === 'payment' || body.action?.includes('payment')) && paymentId) {
      const paymentData = await mpPayment.get({ id: String(paymentId) });

      if (paymentData && paymentData.status === 'approved') {
        const metadata = paymentData.metadata || {};
        const userId = metadata.supabase_user_id;
        const plan = metadata.app_plan as AppPlan | undefined;
        const userEmail = metadata.user_email;

        const supabase = getServiceClient();

        // Data de validade até o dia do concurso (ou padrão 1 ano se não definido)
        const validUntil = new Date();
        validUntil.setFullYear(validUntil.getFullYear() + 1);

        if (userId && plan) {
          await supabase.from('profiles').update({ plan }).eq('id', userId);

          await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: `mp_cust_${paymentData.payer?.id || userId}`,
            stripe_subscription_id: `mp_pay_${paymentData.id}`,
            plan,
            status: 'active',
            current_period_start: new Date().toISOString(),
            current_period_end: validUntil.toISOString(),
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

          console.log(`[MercadoPago Webhook] ✅ Plano ${plan} ativado para usuário ${userId}`);
        } else if (userEmail && plan) {
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', userEmail)
            .maybeSingle();

          if (userProfile?.id) {
            await supabase.from('profiles').update({ plan }).eq('id', userProfile.id);

            await supabase.from('subscriptions').upsert({
              user_id: userProfile.id,
              stripe_customer_id: `mp_cust_${paymentData.payer?.id || userProfile.id}`,
              stripe_subscription_id: `mp_pay_${paymentData.id}`,
              plan,
              status: 'active',
              current_period_start: new Date().toISOString(),
              current_period_end: validUntil.toISOString(),
              updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id' });

            console.log(`[MercadoPago Webhook] ✅ Plano ${plan} ativado via e-mail ${userEmail}`);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[MercadoPago Webhook Error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
