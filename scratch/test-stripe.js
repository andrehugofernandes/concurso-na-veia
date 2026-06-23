const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Erro: STRIPE_SECRET_KEY não foi encontrada no arquivo .env.local");
  process.exit(1);
}

console.log("STRIPE_SECRET_KEY encontrada:", process.env.STRIPE_SECRET_KEY.substring(0, 12) + "...");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function testStripe() {
  try {
    console.log("Tentando se conectar ao Stripe e buscar informações da conta...");
    const accountInfo = await stripe.accounts.retrieve();
    console.log("\n✅ Conexão bem-sucedida!");
    console.log("Detalhes da Conta Stripe:");
    console.log(`- ID: ${accountInfo.id}`);
    console.log(`- Nome comercial: ${accountInfo.business_profile?.name || accountInfo.name || 'Não definido'}`);
    console.log(`- Email: ${accountInfo.email || 'Não definido'}`);
    console.log(`- País: ${accountInfo.country}`);
    console.log(`- Cobranças ativas (charges_enabled): ${accountInfo.charges_enabled}`);
    console.log(`- Pagamentos ativos (payouts_enabled): ${accountInfo.payouts_enabled}`);
  } catch (error) {
    console.error("\n❌ Falha ao conectar ao Stripe:");
    console.error(`Mensagem de erro: ${error.message}`);
  }
}

testStripe();
