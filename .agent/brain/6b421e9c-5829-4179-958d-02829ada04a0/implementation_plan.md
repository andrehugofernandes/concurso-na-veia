# Diagnóstico: Integração Stripe — A Vaga É Minha

## Estado Atual da Implementação

### ✅ O que já está PRONTO

| Componente                         | Status              | Detalhes                                                                              |
| ---------------------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| **`lib/stripe.ts`**                | ✅ Completo         | 5 planos configurados com lookup keys, getOrCreateStripeCustomer, getPriceByLookupKey |
| **`lib/actions/stripe.ts`**        | ✅ Completo         | 4 server actions: checkout registro, checkout autenticado, verify session, portal     |
| **`api/stripe/setup`**             | ✅ Completo         | Cria produtos e preços automaticamente no Stripe                                      |
| **`api/stripe/checkout`**          | ✅ Completo         | Checkout para usuários autenticados (upgrade)                                         |
| **`api/stripe/checkout-register`** | ✅ Completo         | Checkout pré-registro (pagamento antes de criar conta)                                |
| **`api/stripe/verify-session`**    | ✅ Completo         | Verifica status de sessão do checkout                                                 |
| **`api/stripe/portal`**            | ✅ Completo         | Portal Stripe para gerenciar/cancelar assinatura                                      |
| **`api/stripe/webhook`**           | ✅ Código pronto    | 3 handlers: checkout.completed, subscription.updated, subscription.deleted            |
| **Página `seja-pro`**              | ✅ Completo         | 559 linhas, 5 planos, tabs médio/superior, checkout e portal integrados               |
| **Página `register`**              | ✅ Completo         | 572 linhas, 4 steps wizard (Dados→Cargo→Plano→Senha)                                  |
| **Página `register/success`**      | ✅ Completo         | Verifica pagamento e redireciona para complete                                        |
| **Página `register/complete`**     | ✅ Completo         | Cria conta Supabase com dados da sessão Stripe                                        |
| **Stripe Dashboard**               | ✅ Criado           | 5 produtos "A Vaga EH Minha" + 5 preços em BRL                                        |
| **Tabela `subscriptions`**         | ✅ Schema OK        | user_id, stripe_customer_id, stripe_subscription_id, plan, status, periods            |
| **Tabela `profiles.plan`**         | ✅ Check constraint | free, aprovado-medio, aprovado-superior, elite-medio, elite-superior, elite-total     |

### ⚠️ O que precisa de ATENÇÃO

| Item                        | Problema                                                                  | Impacto                                                         |
| --------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **`STRIPE_WEBHOOK_SECRET`** | Vazio no `.env.local`                                                     | Webhooks não são validados (ok para dev, crítico para produção) |
| **Tabela `subscriptions`**  | 0 linhas                                                                  | Nunca houve checkout real — precisa testar end-to-end           |
| **Produtos duplicados**     | 10 produtos no Stripe (5 "A Vaga EH Minha" + 5 "Petrobras Quest" legados) | Pode confundir; lookup keys garantem que os corretos são usados |

## User Review Required

> [!IMPORTANT]
> Preciso de esclarecimento sobre o que significa "finalizar a integração". Com base na investigação, a arquitetura **já está completa** em termos de código. Seguem as perguntas:

1. **Testar o fluxo end-to-end?** — Quer que eu execute o setup, faça um checkout de teste pelo Stripe CLI e verifique se o webhook atualiza o Supabase corretamente?

2. **Configurar o webhook no Stripe Dashboard?** — O `STRIPE_WEBHOOK_SECRET` está vazio. Posso gerar o secret via Stripe CLI (`stripe listen --forward-to localhost:3000/api/stripe/webhook`) para testes locais.

3. **Limpar produtos duplicados?** — Existem 5 produtos legados "Petrobras Quest" no Stripe que podem ser arquivados.

4. **Há algum bug específico?** — Por exemplo: checkout não redireciona, webhook não atualiza o plano, portal não abre, etc.

5. **Fluxo de registro com pagamento**: O flow atual é `Register → Checkout Stripe → Success → Complete (cria conta)`. Esse fluxo está funcionando ou quebra em algum ponto?

6. **Deploy/produção**: Precisa configurar webhook para URL de produção?

## Verificação Proposta

### Teste End-to-End Local (via Stripe CLI)

```bash
# 1. Instalar Stripe CLI (se não tiver)
# 2. Fazer login
stripe login

# 3. Encaminhar webhooks localmente
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 4. Copiar o webhook secret gerado e adicionar ao .env.local:
# STRIPE_WEBHOOK_SECRET=whsec_...

# 5. Reiniciar dev server
pnpm dev

# 6. Testar fluxo de checkout na página /seja-pro
# 7. Usar cartão de teste: 4242 4242 4242 4242
# 8. Verificar no Supabase se tabela subscriptions foi atualizada
```

### Verificação Manual

1. Acessar `/seja-pro` → Clicar em "Assinar" em qualquer plano
2. Preencher checkout Stripe com cartão de teste
3. Verificar redirecionamento para success page
4. Verificar no Supabase: `profiles.plan` atualizado + `subscriptions` com nova linha
5. Acessar "Gerenciar Assinatura" → Verificar se portal Stripe abre
