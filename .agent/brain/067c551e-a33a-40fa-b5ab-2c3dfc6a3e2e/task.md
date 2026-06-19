# Tarefa: Verificar Configuração do Stripe

- [x] Pesquisar por dependências do Stripe no `package.json`
- [x] Pesquisar por chaves de API ou variáveis de ambiente relacionadas ao Stripe
- [x] Verificar o status da conta Stripe via MCP
- [x] Analisar a integração no codebase (webhooks, checkout, etc.)
- [x] Relatar o status final da configuração

# Tarefa: Corrigir Erro de Build e Padronizar AulaGestãoDePessoas.tsx

- [x] Identificar e corrigir o import correto do ícone (LuCheckCircle -> LuCircleCheck)
- [/] Refatorar componente para padrão C.E.D.E. e alinhar com `shared.tsx`
    - [x] Criar plano de implementação específico
    - [ ] Corrigir props de `AulaTemplate`, `ModuleConsolidation` e `ContentAccordion`
    - [ ] Corrigir props de `QuizInterativo` e imports de ícones faltantes
- [ ] Validar build final

# Tarefa: Configuração Final do Stripe

- [x] Verificar status da conta e integração atual
- [ ] Executar rota de setup (`/api/stripe/setup`) para criar produtos Petrobras Quest
- [ ] Configurar `STRIPE_WEBHOOK_SECRET` e atualizar `.env.local` com novos Price IDs
- [ ] Testar fluxo completo de checkout e subscrição
