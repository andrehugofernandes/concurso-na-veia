-- Migration: Atualiza os valores permitidos de 'plan' para os 5 novos planos
-- Execute no SQL Editor do Supabase Dashboard

-- ============================================
-- 1. Atualiza o CHECK constraint em profiles
-- ============================================
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_plan_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_plan_check
  CHECK (plan IN ('free', 'aprovado-medio', 'aprovado-superior', 'elite-medio', 'elite-superior', 'elite-total'));

-- ============================================
-- 2. Atualiza o CHECK constraint em subscriptions
-- ============================================
ALTER TABLE public.subscriptions
  DROP CONSTRAINT IF EXISTS subscriptions_plan_check;

ALTER TABLE public.subscriptions
  ADD CONSTRAINT subscriptions_plan_check
  CHECK (plan IN ('free', 'aprovado-medio', 'aprovado-superior', 'elite-medio', 'elite-superior', 'elite-total'));

-- Corrige também o status check (adiciona 'canceled' que o webhook usa)
ALTER TABLE public.subscriptions
  DROP CONSTRAINT IF EXISTS subscriptions_status_check;

ALTER TABLE public.subscriptions
  ADD CONSTRAINT subscriptions_status_check
  CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'cancelled', 'expired', 'incomplete'));

-- ============================================
-- 3. Migra usuários antigos (pro → aprovado-superior, enterprise → elite-superior)
-- ============================================
UPDATE public.profiles SET plan = 'aprovado-superior' WHERE plan = 'pro';
UPDATE public.profiles SET plan = 'elite-superior'    WHERE plan = 'enterprise';

UPDATE public.subscriptions SET plan = 'aprovado-superior' WHERE plan = 'pro';
UPDATE public.subscriptions SET plan = 'elite-superior'    WHERE plan = 'enterprise';
