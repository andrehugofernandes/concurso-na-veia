# Implementação de 2FA Obrigatório e Correção de Esquema

## Goal Description
Garantir que todos os usuários registrados via formulário passem obrigatoriamente pela configuração de 2FA (MFA) e resolver inconsistências no banco de dados e no fluxo de validação de e-mail.

## User Review Required
> [!IMPORTANT]
> A etapa de "bypass" da confirmação de e-mail foi mantida para evitar o erro de link expirado, mas agora forçaremos o 2FA imediatamente após o primeiro login. O usuário não entrará no dashboard sem configurar o 2FA.

## Proposed Changes

### Database Schema
#### [MODIFY] `profiles` table
- Adicionar coluna `mfa_enabled` (boolean, default false) para alinhar com a lógica do código.

### Backend (Auth Actions)
#### [MODIFY] [auth.ts](file:///c:/Workspace/petrobras-quest/src/lib/actions/auth.ts)
- Atualizar `registerAction` para incluir `mfa_enabled: true` no `user_metadata` do `signUp`.
- Garantir que o `adminSupabase` também atualize o metadado corretamente.
- Corrigir `reset2FAAction` para que a atualização do `profiles` funcione (agora que a coluna existirá).

### Frontend (Login Flow)
#### [MODIFY] [login/page.tsx](file:///c:/Workspace/petrobras-quest/src/app/(auth)/login/page.tsx)
- Garantir que usuários com `mfaSetupRequired` sejam redirecionados corretamente para `/auth/setup-2fa`.

## Verification Plan
### Automated Tests
- Criar um novo usuário de teste e verificar se após o login ele é redirecionado para a configuração de 2FA.
- Verificar no banco de dados se a coluna `mfa_enabled` foi criada e populada corretamente.

### Manual Verification
- Logar com `sophiabeatriz` após eu atualizar manualmente o status dela para confirmar o redirecionamento de 2FA.
