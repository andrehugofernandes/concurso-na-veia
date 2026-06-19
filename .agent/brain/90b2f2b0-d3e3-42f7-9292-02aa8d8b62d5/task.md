# Task: Plano de Implementação de 2FA Obrigatório e Validação de E-mail

## Objetivos
- [x] Investigar por que `sophiabeatriz` conseguiu logar sem 2FA.
- [x] Validar a configuração de metadados de MFA para novos usuários.
- [x] Implementar a obrigatoriedade de 2FA no fluxo de registro.
- [x] Garantir que o "bypass" de validação de e-mail não comprometa a segurança, mas resolva o erro de link expirado.

## Etapas
- [x] Pesquisa e Diagnóstico:
    - [x] Verificar metadados e perfil de `sophiabeatriz` no Supabase.
    - [x] Revisar `registerAction` para incluir `mfa_enabled: true` por padrão.
- [x] Implementação Técnica:
    - [x] Atualizar `registerAction` para setar `mfa_enabled` tanto no Auth quanto no Profile.
    - [x] Verificar se o redirecionamento para `/auth/setup-2fa` está funcionando corretamente após o primeiro login.
- [x] Verificação:
    - [x] Testar fluxo completo de registro com um novo usuário teste.
    - [x] Validar se o login bloqueia o acesso sem o 2FA configurado.
    - [x] Gerar walkthrough.md com os resultados.
