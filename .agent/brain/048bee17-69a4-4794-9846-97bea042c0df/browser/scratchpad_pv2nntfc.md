# Plano de Testes PMAVV

## Passo 1: Login

- [x] Navegar para `http://localhost:3000/login`
- [x] Inserir credenciais (`andre.hugo` / `Mvvas@18261405`)
- [x] Tratar 2FA (Não foi solicitado)
- [x] Verificar se o login foi bem-sucedido

## Passo 2: Verificação da DataTable

- [x] Navegar para `/denuncias`
- [x] Verificar coluna "PROTOCOLO" (120px, sticky left) - **OK**: Coluna fixa à esquerda durante scroll.
- [/] Verificar coluna "AÇÕES" (102px, sticky right) - **TESTANDO**: Rolando para a direita para confirmar.
- [x] Capturar screenshot da tabela com scroll horizontal - **OK**: Capturado.

## Passo 3: Verificação do Fix (Wizard)

- [ ] Abrir modal "Nova Denúncia"
- [ ] No Step 1, clicar em "OUTROS" (Formas de Violência)
- [ ] Verificar se o erro "Maximum update depth exceeded" foi resolvido
- [ ] Capturar screenshot do Step 1 com "OUTROS" selecionado

## Informações Adicionais

- Credenciais: andre.hugo / Mvvas@18261405
- URL: http://localhost:3000
- **Observação**: DataTable funcionando conforme o esperado para a coluna PROTOCOLO.
