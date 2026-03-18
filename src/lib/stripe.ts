import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY não definida');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Mapeamento de plano → lookup key do Stripe
export const STRIPE_LOOKUP_KEYS = {
  'aprovado-medio': 'avaga-aprovado-medio-monthly',
  'aprovado-superior': 'avaga-aprovado-superior-monthly',
  'elite-medio': 'avaga-elite-medio-monthly',
  'elite-superior': 'avaga-elite-superior-monthly',
  'elite-total': 'avaga-elite-total-monthly',
} as const;

// Dados dos planos para criação no Stripe
export const PLANOS_CONFIG = {
  'aprovado-medio': {
    nome: 'Aprovado Médio',
    descricao: 'Acesso às matérias do cargo técnico/médio',
    preco: 4999, // R$ 49,99 em centavos
    lookupKey: STRIPE_LOOKUP_KEYS['aprovado-medio'],
  },
  'aprovado-superior': {
    nome: 'Aprovado Superior',
    descricao: 'Acesso às matérias do cargo superior',
    preco: 6999, // R$ 69,99 em centavos
    lookupKey: STRIPE_LOOKUP_KEYS['aprovado-superior'],
  },
  'elite-medio': {
    nome: 'Elite Médio',
    descricao: 'IA + Mentoria + Acesso às matérias do cargo técnico/médio',
    preco: 7999, // R$ 79,99 em centavos
    lookupKey: STRIPE_LOOKUP_KEYS['elite-medio'],
  },
  'elite-superior': {
    nome: 'Elite Superior',
    descricao: 'IA + Mentoria + Acesso às matérias do cargo superior',
    preco: 11999, // R$ 119,99 em centavos
    lookupKey: STRIPE_LOOKUP_KEYS['elite-superior'],
  },
  'elite-total': {
    nome: 'Elite Total',
    descricao: 'Acesso total: Médio + Superior, IA, Mentoria e todos os cargos',
    preco: 14999, // R$ 149,99 em centavos
    lookupKey: STRIPE_LOOKUP_KEYS['elite-total'],
  },
} as const;

export type StripePlan = keyof typeof PLANOS_CONFIG;

/**
 * Busca ou cria um customer Stripe para o usuário
 */
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  nome?: string
): Promise<string> {
  // Busca customer existente pelo metadata
  const existing = await stripe.customers.search({
    query: `metadata['supabase_user_id']:'${userId}'`,
    limit: 1,
  });

  if (existing.data.length > 0) {
    return existing.data[0].id;
  }

  // Cria novo customer
  const customer = await stripe.customers.create({
    email,
    name: nome,
    metadata: { supabase_user_id: userId },
  });

  return customer.id;
}

/**
 * Busca o preço ativo pelo lookup key
 */
export async function getPriceByLookupKey(lookupKey: string): Promise<Stripe.Price | null> {
  const prices = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true,
    expand: ['data.product'],
    limit: 1,
  });

  return prices.data[0] ?? null;
}

/**
 * Mapeia plano Stripe → plano da aplicação
 */
export function stripeMetadataToPlan(metadata: Stripe.Metadata): StripePlan | 'free' {
  const plan = metadata?.app_plan as string;
  if (plan in PLANOS_CONFIG) return plan as StripePlan;
  return 'free';
}
