import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  console.warn('MERCADOPAGO_ACCESS_TOKEN não definido. Pagamentos MP falharão.');
}

// Configura o SDK do Mercado Pago
export const mpClient = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '', 
  options: { timeout: 5000 } 
});

export const mpPreference = new Preference(mpClient);
export const mpPayment = new Payment(mpClient);

// Reutilizar as configurações de planos
import { PLANOS_CONFIG, type StripePlan } from './stripe';

export { PLANOS_CONFIG };
export type AppPlan = StripePlan;
