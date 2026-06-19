# Plano de Teste - Navegação Sticky Mobile

## Checklist
- [x] Definir viewport para 390x844
- [x] Navegar para `http://localhost:3000/aulas/portugues/concordancia`
- [x] Aguardar 5 segundos (hot reload)
- [x] Capturar screenshot inicial (topo da página)
- [x] Scroll down (600px total, 200px por vez)
- [x] Capturar screenshot com sticky nav fixo
- [x] Analisar largura da barra (edge-to-edge)
- [x] Verificar visibilidade das setas (< e >)
- [x] Verificar visibilidade dos botões de módulo
- [x] Verificar bordas (dark mode) / sombras (light mode) nos botões
- [x] Scroll back to top e screenshot final

## Resultados
- **Edge-to-edge**: A barra sticky nav toca perfeitamente ambas as bordas (0px de margem visível).
- **Setas de Navegação**: As setas `<` e `>` estão visíveis nas extremidades da barra.
- **Botões de Módulo**: "MÓDULO 01" e "MÓDULO 02" estão centrados entre as setas e operacionais.
- **Estilo dos Botões**: No dark mode, os botões apresentam bordas sutis (`border-border/20`) conforme solicitado.
- **Comportamento Sticky**: O estado `isStickyNavPinned` está refletindo corretamente no `DashboardShell`, escondendo a sidebar e permitindo que o nav ocupe a largura total.