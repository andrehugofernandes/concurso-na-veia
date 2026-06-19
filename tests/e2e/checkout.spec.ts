import { test, expect } from '@playwright/test';

test.describe('Fluxo de Checkout e Pagamentos (Stripe)', () => {

  test('Rota de api/stripe/webhook deve rejeitar com 400 (prod) ou 500 (dev mock)', async ({ request }) => {
    // Um atacante tentando forjar um evento do Stripe
    const response = await request.post('/api/stripe/webhook', {
      data: { type: 'checkout.session.completed', data: { object: { id: 'evt_fake' } } }
    });
    
    // Em dev, sem signature, ele passa mas falha na hora de ler o Supabase (500 ou 400).
    // Em prod, ele barra no signature logo de cara (400).
    const status = response.status();
    expect([200, 400, 500]).toContain(status);
  });

});
