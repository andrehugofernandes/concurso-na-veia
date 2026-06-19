# Walkthrough — Respiro Interno do StickyModuleNav

## Alteração

Adicionado `max-w-5xl mx-auto` ao wrapper desktop dos botões de módulo em [shared.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/shared.tsx#L2666), delimitando a largura interna a 1024px centralizado.

render_diffs(file:///c:/Workspace/petrobras-quest/src/components/aulas/shared.tsx)

## Resultado Visual

```carousel
![Estado normal — botões com respiro horizontal](C:/Users/andre.hugo/.gemini/antigravity/brain/ed49fc44-f6e1-48fe-8d50-407a909a1858/conjuntos_initial_desktop_1773080642080.png)
<!-- slide -->
![Estado sticky — respiro mantido](C:/Users/andre.hugo/.gemini/antigravity/brain/ed49fc44-f6e1-48fe-8d50-407a909a1858/conjuntos_sticky_desktop_1773080653922.png)
```

## Rollback

> [!TIP]
> Commit de backup: `b108032` — `git reset --hard b108032`
