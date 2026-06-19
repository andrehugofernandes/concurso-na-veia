# PMAVV Login Task

## Checklist
- [x] Navigate to http://localhost:3000/login
- [x] Reload the page
- [x] Clear 'Usuário Municipal' and type 'andre.hugo'
- [x] Clear 'Senha' and type 'AndyBelle@20082021*'
- [x] Click 'Entrar'
- [x] Wait for redirection to '/dashboard'
- [ ] Screenshot dashboard and list modules (if success)
- [x] Describe error (if failure)

## Findings
- Authentication failed with error: "Erro ao conectar com o servidor de autenticação municipal."
- Console logs show a 500 Internal Server Error when calling the login endpoint.
- Fields were cleared and filled correctly with `andre.hugo` and `AndyBelle@20082021*`.

