import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function setupVitalis() {
  const { stripe, PLANOS_CONFIG } = await import('../src/lib/stripe');

  const config = PLANOS_CONFIG['vitalis-total'];
  console.log(`Configurando preço para ${config.nome}...`);
  try {
    const existingPrices = await stripe.prices.list({
      lookup_keys: [config.lookupKey],
      active: true,
      limit: 1,
    });

    if (existingPrices.data.length > 0) {
      console.log(`Preço já existe no Stripe: ${existingPrices.data[0].id}`);
      return;
    }

    const product = await stripe.products.create({
      name: `Concurso Na Veia - ${config.nome} (Acesso Único)`,
      description: config.descricao,
    });

    console.log(`Produto criado: ${product.id}`);

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: config.preco,
      currency: 'brl',
      lookup_key: config.lookupKey,
      transfer_lookup_key: true,
    });

    console.log(`Preço criado: ${price.id} com lookup_key ${config.lookupKey}`);
  } catch (err) {
    console.error(`Erro ao configurar ${config.nome}:`, err);
  }
}

setupVitalis().then(() => console.log('Finalizado!'));
