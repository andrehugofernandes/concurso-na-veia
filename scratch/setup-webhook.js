const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Erro: STRIPE_SECRET_KEY não foi encontrada no arquivo .env.local");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function setupWebhook() {
  try {
    console.log("Configurando o webhook no Stripe para concursonaveia.com.br...");
    
    // Lista os webhooks existentes para evitar duplicatas se a URL já existir
    const webhooks = await stripe.webhookEndpoints.list({ limit: 10 });
    const targetUrl = 'https://concursonaveia.com.br/api/stripe/webhook';
    
    let endpoint = webhooks.data.find(w => w.url === targetUrl);
    
    if (endpoint) {
      console.log(`Webhook para ${targetUrl} já existe. ID: ${endpoint.id}`);
      // Atualiza com os eventos corretos, caso não estejam
      endpoint = await stripe.webhookEndpoints.update(endpoint.id, {
        enabled_events: [
          'checkout.session.completed',
          'customer.subscription.updated',
          'customer.subscription.deleted'
        ]
      });
      console.log("Eventos atualizados no webhook existente.");
    } else {
      // Cria um novo webhook
      endpoint = await stripe.webhookEndpoints.create({
        url: targetUrl,
        enabled_events: [
          'checkout.session.completed',
          'customer.subscription.updated',
          'customer.subscription.deleted'
        ],
      });
      console.log(`Novo Webhook criado com sucesso! ID: ${endpoint.id}`);
    }

    console.log(`\nATENÇÃO: A chave secreta do webhook é: ${endpoint.secret}`);
    
    if (endpoint.secret) {
        // Atualiza o arquivo .env.local
        const envPath = path.resolve(__dirname, '../.env.local');
        let envContent = fs.readFileSync(envPath, 'utf8');
        envContent = envContent.replace(/STRIPE_WEBHOOK_SECRET=.*/, `STRIPE_WEBHOOK_SECRET=${endpoint.secret}`);
        fs.writeFileSync(envPath, envContent);
        console.log(`\nO arquivo .env.local foi atualizado com o novo STRIPE_WEBHOOK_SECRET.`);
    }

  } catch (error) {
    console.error("Erro ao configurar webhook:", error.message);
  }
}

setupWebhook();
