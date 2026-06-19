# Plano de Teste Mobile - Aulas de Português

## Checklist de Testes

- [x] Abrir a página de aula (Ortografia)
- [x] Redimensionar para viewport mobile (iPhone 13 - 390x844)
- [x] Verificar renderização inicial e barra de navegação sticky
- [x] Testar transições de abas (Módulos e Resumo/Vídeo)
- [x] Verificar rolagem vertical e ausência de rolagem horizontal indesejada
- [x] Validar legibilidade do conteúdo e layout dos exercícios
- [x] Reportar inconsistências visuais ou funcionais

## Notas de Progresso

- Testes concluídos com sucesso.
- **Pontos Positivos**:
  - Layout responsivo sem overflow horizontal no conteúdo.
  - Navegação de módulos (sticky top) funciona com scroll horizontal.
  - Componentes de expansão (Dossiê Técnico) e abas internas (Resumo/Vídeo) operam corretamente.
  - Quiz bem adaptado para toque.
- **Inconsistências/Melhorias**:
  - O botão central "Dashboard" da barra inferior sobrepõe a barra de progresso.
  - O botão "Voltar ao topo" fica muito próximo ou sobreposto aos elementos da barra inferior no mobile.
  - Crowding visual na parte inferior da tela devido à sobreposição de múltiplas camadas (barra de navegação, progresso e botão flutuante).
