const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Erro: STRIPE_SECRET_KEY não foi encontrada no arquivo .env.local");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const lookupKeys = [
  'avaga-aprovado-medio-monthly',
  'avaga-aprovado-superior-monthly',
  'avaga-elite-medio-monthly',
  'avaga-elite-superior-monthly',
  'avaga-elite-total-monthly',
];

async function checkPrices() {
  try {
    console.log("Verificando se os planos/preços já estão cadastrados no Stripe...\n");
    
    const prices = await stripe.prices.list({
      lookup_keys: lookupKeys,
      active: true,
      expand: ['data.product'],
    });

    console.log(`Encontrados ${prices.data.length} preços cadastrados:\n`);

    lookupKeys.forEach(key => {
      const price = prices.data.find(p => p.lookup_key === key);
      if (price) {
        const prod = price.product;
        console.log(`✅ Lookup Key: ${key}`);
        console.log(`   Price ID: ${price.id}`);
        console.log(`   Product ID: ${prod.id}`);
        console.log(`   Product Name: ${prod.name}`);
        console.log(`   Valor: R$ ${(price.unit_amount / 100).toFixed(2)}\n`);
      } else {
        console.log(`❌ Lookup Key: ${key} (Não encontrado ou inativo no Stripe)`);
      }
    });

  } catch (error) {
    console.error("Falha ao verificar os preços no Stripe:", error.message);
  }
}

checkPrices();
