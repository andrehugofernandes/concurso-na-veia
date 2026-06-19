# Plano de Teste dos Filtros de Denúncias

- [x] Abrir http://localhost:3000/denuncias
- [x] Clicar na aba "Este Ano"
- [x] Verificar logs no console: `Carregando denúncias com filtros: {..., current_year: true}`
- [x] Verificar o "Total" de denúncias (esperado ~33) -> **Confirmado: 33 denúncias**
- [x] Clicar na aba "Urgentes"
- [x] Verificar se os filtros estão funcionando corretamente via logs e interface -> **Confirmado: 32 denúncias (urgente: true)**
- [x] Tirar screenshots e capturar logs para evidência
