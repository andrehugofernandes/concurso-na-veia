# Padronização da Estrutura do Modal de Denúncias

Este plano visa ajustar o modal de denúncias para se tornar o padrão do sistema, garantindo que as labels não quebrem em desktop, o overlay tenha efeito de blur e os botões de ação fiquem sempre fixos na parte inferior.

## Mudanças Propostas

### UI Components

#### [MODIFY] [dialog.tsx](file:///c:/GSW/PMAVV/PMAVV/src/components/ui/dialog.tsx)

- Escurecer o overlay (`bg-black/40`) e aumentar o efeito de blur (`backdrop-blur-md`).

---

### Denúncias Component

#### [MODIFY] [denuncia-form.tsx](file:///c:/GSW/PMAVV/PMAVV/src/components/denuncias/denuncia-form.tsx)

- Alterar a estrutura do formulário para ser um flex container (`flex flex-col h-full`).
- Adicionar o botão "Limpar" que utiliza o método `reset()` do `react-hook-form`.
- Garantir que a div de ações (`Actions`) use `mt-auto` para ficar sempre no rodapé do container, independentemente do conteúdo.
- Ajustar as labels para evitar quebras de linha (`whitespace-nowrap`).
- Garantir `whitespace-nowrap` em todas as labels importantes.
- Renomear `isSubmitting` para `isLoading` para padrão de consistência.
- Aplicar `px-10` e `py-8` no formulário para layout mais arejado (premium).

#### [MODIFY] [denuncia-form-modal.tsx](file:///c:/GSW/PMAVV/PMAVV/src/components/denuncias/denuncia-form-modal.tsx)

- Posicionar o modal à direita (painel lateral) com **40px de gap** (`right-10`, `top-10`, `bottom-10`).
- Remover centralização e aplicar altura dinâmica `h-[calc(100vh-80px)]`.
- Integrar `AnimatedBorder` garantindo que não seja cortada pelo `overflow-hidden`.
- Aumentar o `z-index` para `100` para evitar que o overlay de blur sobreponha o formulário.
- Ajustar largura para `sm:w-max` e `min-w-[600px]` para evitar quebras de labels.

## Detalhes da Borda Animada

O efeito de borda animada será implementado utilizando o componente `AnimatedBorder` já existente em `src/components/ui/animated-border.tsx`, que utiliza gradientes cônicos e a variável `--primary` do sistema de skins.

## Open Questions

- O usuário mencionou que o modal "vai virar o padrão para os demais entidades". Devo aplicar essas mudanças de largura/overlay no componente global `Dialog` ou apenas especificamente no `DenunciaFormModal` por enquanto? (Seguirei com o overlay global e largura específica no modal).

## Plano de Verificação

### Testes Manuais

- Abrir o modal de "Nova Denúncia".
- Verificar se o fundo está mais escuro e com blur.
- Verificar se o modal está centralizado e se as labels longas (ex: "Pertinente ao Trabalho AVV?") não quebram linha.
- Redimensionar a altura da janela e garantir que os botões "Limpar", "Cancelar" e "Criar" permaneçam no rodapé do modal.
- Testar o botão "Limpar" para garantir que os campos sejam resetados.
