# Reset status do 2FA para Inativo

O objetivo é resetar o status do 2FA do usuário `andrehugofernandes@gmail.com` para que ele precise escanear o QR Code novamente no próximo login.

## Alterações Propostas

### Supabase Database

Remover os fatores de autenticação multifator (MFA) associados ao usuário.

- **Query**: `DELETE FROM auth.mfa_factors WHERE user_id = '8efe4080-43b3-4d7c-887b-2b84fc92b3bd';`

## Plano de Verificação

### Verificação Manual
- Após a execução do comando, o usuário deve tentar fazer login e confirmar que foi solicitado a configurar o 2FA (escanear o QR Code) em vez de apenas inserir o código.
- Posso verificar via SQL se o registro foi removido: `SELECT COUNT(*) FROM auth.mfa_factors WHERE user_id = '8efe4080-43b3-4d7c-887b-2b84fc92b3bd';`
