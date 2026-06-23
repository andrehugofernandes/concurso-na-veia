/**
 * GET /api/stripe/setup
 *
 * Rota de setup único — cria os produtos e preços no Stripe
 * se ainda não existirem, e retorna os price IDs para copiar ao .env.local
 *
 * Acesse http://localhost:3000/api/stripe/setup UMA vez para configurar.
 */
import { NextResponse } from 'next/server';
import { stripe, PLANOS_CONFIG, getPriceByLookupKey } from '@/lib/stripe';

export async function GET() {
  try {
    const results: Record<string, { productId: string; priceId: string; lookupKey: string }> = {};

    for (const [planKey, config] of Object.entries(PLANOS_CONFIG)) {
      // Verifica se preço já existe
      let price = await getPriceByLookupKey(config.lookupKey);

      if (!price) {
        // Cria produto
        const product = await stripe.products.create({
          name: `Passei No Concurso - ${config.nome}`,
          description: config.descricao,
          metadata: { app_plan: planKey },
        });

        // Cria preço recorrente mensal em BRL
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: config.preco,
          currency: 'brl',
          recurring: { interval: 'month' },
          lookup_key: config.lookupKey,
          transfer_lookup_key: true,
          metadata: { app_plan: planKey },
        });

        results[planKey] = { productId: product.id, priceId: price.id, lookupKey: config.lookupKey };
      } else {
        results[planKey] = {
          productId: typeof price.product === 'string' ? price.product : price.product.id,
          priceId: price.id,
          lookupKey: config.lookupKey,
        };
      }
    }

    return NextResponse.json({
      ok: true,
      message: 'Produtos criados/verificados com sucesso.',
      details: results,
    });
  } catch (error: any) {
    console.error('[Stripe Setup]', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
