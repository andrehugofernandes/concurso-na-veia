import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function setupOneTimePrices() {
  const { stripe, PLANOS_CONFIG } = await import('../src/lib/stripe');

  for (const [key, config] of Object.entries(PLANOS_CONFIG)) {
    console.log(`Configurando preço para ${config.nome}...`);
    try {
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
}

setupOneTimePrices().then(() => console.log('Finalizado!'));
