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

async function updateStripeProducts() {
  try {
    console.log("Buscando preços e produtos no Stripe...\n");
    
    const prices = await stripe.prices.list({
      lookup_keys: lookupKeys,
      active: true,
      expand: ['data.product'],
    });

    for (const price of prices.data) {
      if (price.product && typeof price.product !== 'string') {
        const prod = price.product;
        const oldName = prod.name;
        // Substituir 'A Vaga EH Minha' por 'Passei No Concurso'
        const newName = oldName.replace(/A Vaga EH Minha/i, 'Passei No Concurso');
        
        if (newName !== oldName) {
          console.log(`Atualizando produto ${prod.id}...`);
          console.log(`De: ${oldName}\nPara: ${newName}`);
          await stripe.products.update(prod.id, {
            name: newName
          });
          console.log(`✅ Sucesso!\n`);
        } else {
          console.log(`Produto ${prod.id} já está atualizado (${oldName})\n`);
        }
      }
    }
    
    console.log("Atualização no Stripe finalizada com sucesso!");
  } catch (error) {
    console.error("Falha ao atualizar produtos no Stripe:", error.message);
  }
}

updateStripeProducts();
