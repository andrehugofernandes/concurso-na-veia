# Plano de Correção e Diagnóstico: 2FA & Auth Flow

## 📋 Objetivos
1. Resolver o erro de "Unexpected Response" em Server Actions.
2. Garantir que o Reset do 2FA funcione via Admin API (bypassando AAL2).
3. Diagnosticar por que os códigos OTP não estão sincronizando (Check de Time Drift).

## 🛠️ Passos de Implementação

### Fase 1: Diagnóstico e Robustez (Server Side)
- [ ] **Log de Time Drift**: Adicionar log do horário atual do servidor (`new Date().toISOString()`) em `verify2FAAction` e `loginAction`. Isso ajuda a comparar com o horário do celular do usuário.
- [ ] **Simplificação de Resposta**: Garantir que TODAs as Server Actions retornem um objeto plano literal, sem metadados complexos do Supabase que causam erro de serialização no Next.js 16/Turbopack.

### Fase 2: Reset Forçado de 2FA (Admin)
- [ ] **Admin Client**: Validar que o `createAdminClient` no `src/lib/supabase/server.ts` está usando a `SERVICE_ROLE_KEY` corretamente.
- [ ] **Reset Total**: Em `reset2FAAction`, usar `admin.mfa.deleteFactor` e também `admin.updateUserById` para remover o `mfa_enabled` dos metadados de forma definitiva.

### Fase 3: Interface do Usuário (Cliente)
- [ ] **Feedback Claro**: Na `LoginPage` e `Verify2FAPage`, capturar o erro da Action e exibir uma mensagem amigável em vez de deixar o erro de console "puro".
- [ ] **Redirecionamento**: Garantir que após o Reset, a sessão seja invalidada para forçar um novo login e, consequentemente, um novo setup de QR Code.

## 🧪 Critérios de Aceite
- Ao clicar em "Resetar", o usuário deve receber uma confirmação de sucesso.
- Ao tentar logar após o reset, o QR Code de configuração deve aparecer novamente.
- O terminal deve mostrar `[AUTH_DEBUG]` com o horário do servidor durante a tentativa de OTP.
