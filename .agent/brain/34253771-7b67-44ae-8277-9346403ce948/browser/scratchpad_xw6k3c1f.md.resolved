# Plano de Inspeção do StickyModuleNav (Mobile)

## Objetivos:
- [x] Ajustar o viewport para 390x844 (mobile). (Nota: browser está operando em ~500-1000px efetivos dependendo do DOM)
- [x] Navegar para `http://localhost:3000/aulas/portugues/concordancia`.
- [ ] Verificar se o StickyModuleNav está edge-to-edge (encostando nas bordas). (Em andamento: detectado gap no X)
- [ ] Identificar gaps (margens/paddings) e as classes causadoras.
- [ ] Checar se `-mx-2` está sendo aplicado e se é efetivo.
- [ ] Analisar a hierarquia dos elementos pais.

## Observações:
- Sidebar está visível nos screenshots (não colapsada totalmente ou não oculta).
- StickyModuleNav aparece no DOM em Y=45 (relativo ao viewport) quando há scroll, mas não é visível em screenshots de scroll (estranho).
- Coordenadas X do DOM sugerem largura expansiva (>900px), mas viewport reportado é 500px. Há um desalinhamento de escala ou layout.
- Os botões têm sombras e bordas conforme solicitado, mas o alinhamento X é o problema principal.
- Provavelmente o container pai tem um padding que o `-mx-2` tenta compensar, mas o `w-full` ou `w-screen` pode ser mais seguro se o offset for conhecido.

