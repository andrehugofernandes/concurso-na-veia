# Plano de Implementação: Sticky Nav Pixel-Perfect (Mobile)

O objetivo é garantir que a barra de navegação de módulos seja verdadeiramente "edge-to-edge" (encostando nas bordas do dispositivo e da sidebar), sem cantos arredondados quando fixa, e com visibilidade perfeita em ambos os temas.

## Problemas Identificados
1. **Gaps Laterais**: O uso de `-mx-2` não está sendo suficiente em todos os cenários.
2. **Sobreposição de Conteúdo**: O layout fixo atual não respeita o fluxo da página, ocultando títulos e descrição.
3. **Sangramento de Texto**: A transparência da barra permite que o conteúdo da aula "brigue" com os botões.
4. **Detalhamento Estético**: Cantos arredondados no estado fixo quebram a ilusão de continuidade com o topo da tela.

## Mudanças Propostas

### 1. [Componente] StickyModuleNav (shared.tsx)
Mudança estrutural para garantir o efeito visual solicitado e o alinhamento total.

- **Efeito Vidro (Glassmorphism)**: 
  - Usar `bg-background/80` (ajustando para "pouca opacidade" conforme solicitado) + `backdrop-blur-md`.
  - Isso garante que o conteúdo atrás fique borrado mas as letras do menu fiquem legíveis.
- **Breakout Visual (Mobile/Desktop)**:
  - Usar `w-screen` com `left: 0` quando fixo, compensando o `left` apenas se a sidebar estiver visível.
  - Implementar um **Spacer Div** (sentinela) que ocupa o espaço original da barra quando ela se torna `fixed`, evitando o "pulo" do conteúdo.
  - No estado **fixo** (stuck), utilizaremos `rounded-none` e `shadow-lg`.

- **Z-Index e Layering**: 
  - Fixar o `z-index` em 51 para garantir que fique acima do conteúdo.

### 2. Cabeçalho Principal (admin-dashboard-layout.tsx)
- No mobile, o `AdminHeader` será ocultado via CSS quando `isStickyNavPinned` for true (já configurado), permitindo que o Nav de módulos assuma o topo absoluto.


## Perguntas Abertas
> [!IMPORTANT]
> 1. No desktop, você também quer o comportamento "edge-to-edge" total ou apenas no mobile?
> 2. Posso remover o arredondamento dos cantos completamente quando ela estiver fixa no topo para um visual mais "Premium Desktop App"?

## Plano de Verificação
### Testes Automatizados (Browser Subagent)
1. Abrir em 390px.
2. Screenshot inicial (gaps nas bordas?).
3. Scroll profundo (stuck?).
4. Validar se o texto da aula está sobreposto/ilegível abaixo da barra.

### Verificação Manual
- Validar se o transição de arredondamento para reto é suave.
