const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function testWebhook() {
  console.log("Iniciando teste local de webhook...\n");

  try {
    // Busca uma assinatura real para que o webhook consiga fazer o `retrieve` nela
    const subs = await stripe.subscriptions.list({ limit: 1 });
    if (subs.data.length === 0) {
       console.log("⚠️ Nenhuma assinatura real encontrada no Stripe para usar de molde no teste.");
       console.log("Faça pelo menos uma assinatura real (mesmo que com cupom de 100%) para podermos usar o ID dela neste teste.");
       return;
    }
    const realSub = subs.data[0];

    // Payload simulado do Stripe (checkout.session.completed)
    const payload = {
      id: "evt_test_123",
      object: "event",
      api_version: "2023-10-16",
      created: Math.floor(Date.now() / 1000),
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_a1b2c3",
          object: "checkout.session",
          customer: realSub.customer,
          subscription: realSub.id, // Usando ID real para passar no stripe.subscriptions.retrieve do webhook
          metadata: {
            supabase_user_id: "00000000-0000-0000-0000-000000000000", // UUID falso
            app_plan: "avaga-aprovado-medio-monthly",
            user_email: "teste_webhook@concursonaveia.com.br",
            user_nome: "Teste Webhook",
          }
        }
      }
    };

    const payloadString = JSON.stringify(payload);

    // Gerando a assinatura falsa para simular que o Stripe quem mandou
    const signature = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: webhookSecret,
    });

    console.log(`Usando a Subscription Real: ${realSub.id} apenas para leitura.`);
    console.log("Payload criado e assinado! Disparando contra localhost:3000/api/stripe/webhook...");

    const res = await fetch('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': signature
      },
      body: payloadString
    });

    const data = await res.json();
    console.log(`\nStatus HTTP: ${res.status}`);
    console.log("Resposta da API:", data);
    
    if (res.ok) {
        console.log("✅ WEBHOOK RECEBIDO E PROCESSADO COM SUCESSO PELO SEU CÓDIGO!");
        console.log("O banco de dados (Supabase) tentou processar a atualização para o usuário falso.");
    } else {
        console.log("❌ ERRO NO PROCESSAMENTO DO WEBHOOK.");
    }
    
  } catch (err) {
    console.error("Falha ao se comunicar:", err.message);
  }
}

testWebhook();
