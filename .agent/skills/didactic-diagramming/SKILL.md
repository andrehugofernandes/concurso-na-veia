---
name: didactic-diagramming
description: Diretrizes de diagramação e design editorial para converter blocos de texto acadêmicos densos em layouts didáticos fluidos no estilo revista (layouts assimétricos, listas destacadas e imagens com texto fluindo).
---

# 📚 Didactic Diagramming Skill — Petrobras Quest

Esta skill define as melhores práticas para a conversão de textos teóricos corridos e densos em layouts interativos com alto apelo visual (estilo revista pedagógica). Ela orienta como diagramar listas, estruturar cartões de erro/alerta e posicionar imagens prescritas no corpo de textos.

---

## 🎨 1. Princípios de Diagramação Editorial

1. **Quebra do Texto Corrido (Anti-Wall-of-Text):**
   - NUNCA apresente listas sequenciais no formato `(1) isso, (2) aquilo`. Extraia-as para componentes visuais de lista ordenada com numeração proeminente ou grids de colunas.
   - Use caixas de destaque semânticas para contrastar conceitos (Ex: Erro comum vs. Prática recomendada).

2. **Posicionamento de Imagens "Estilo Revista":**
   - **Abordagem A (Grid Assimétrico - Recomendada):** Para telas médias e grandes, divida o espaço em uma proporção assimétrica (ex: `grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start`), posicionando a imagem ilustrativa na coluna menor.
   - **Abordagem B (Texto Flutuante/Float):** Use as propriedades nativas de float do Tailwind (`float-right md:float-right ml-6 mb-6 max-w-[320px]`) para que o texto corra de forma fluida ao redor da imagem. Certifique-se de limpar os floats com `clear-both` se necessário.

3. **Padronização de Imagens Prescritas (Placeholder do Nano Banana):**
   - Armazene as imagens em caminhos previsíveis e bem organizados:
     - `/assets/images/matematica/[nome-aula]/modulo-[N]/m[N]-intro-[assunto].png`
   - O comentário contendo o prompt para o Nano Banana deve estar colado à propriedade `src` ou `imageUrl` de forma explícita e detalhada.

---

## 📐 2. Templates de Código Recomendados

### A. Grid Assimétrico com Texto e Imagem
```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
  <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
    <p>
      Explicação teórica densa sobre o conceito...
    </p>
    {/* Lista de tópicos extraída */}
    <ul className="space-y-4 my-6">
      <li className="flex items-start gap-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 font-bold shrink-0">1</span>
        <div><strong>Item 1:</strong> Descrição rica em detalhes do item.</div>
      </li>
    </ul>
  </div>
  
  {/* Imagem Editorial na Coluna Lateral */}
  <div className="shrink-0 space-y-2">
    <img
      src="/assets/images/matematica/assunto/modulo-1/m1-intro-diagrama.png" 
      // PROMPT: [MANDATÓRIO] Ilustração vetorial educacional, estilo dark premium. Fundo escuro azul-petróleo profundo (#030712). Diagrama técnico mostrando [assunto], linhas neon ciano e azul brilhante.
      alt="Diagrama explicativo sobre o assunto"
      className="w-full rounded-xl border border-white/10 shadow-md"
    />
    <p className="text-xs text-muted-foreground text-center">Fig 1. Representação do conceito em escala técnica.</p>
  </div>
</div>
```

### B. Grid de Alertas/Erros Lado a Lado (Comparativo)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-2">
    <h5 className="font-bold text-rose-500 flex items-center gap-2">
      <LuAlertCircle className="w-5 h-5 shrink-0" />
      Cuidado com o Erro Comum
    </h5>
    <p className="text-sm text-foreground/80 leading-relaxed">
      Explicação do equívoco mais frequente e como a banca tenta enganar o candidato.
    </p>
  </div>
  
  <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
    <h5 className="font-bold text-emerald-500 flex items-center gap-2">
      <LuCheckCircle className="w-5 h-5 shrink-0" />
      Abordagem Correta
    </h5>
    <p className="text-sm text-foreground/80 leading-relaxed">
      A forma correta de encarar o problema matematicamente.
    </p>
  </div>
</div>
```

---

## 🚀 3. Passos para Aplicação da Transformação

1. **Mapear a Sequência:** Identifique todas as enumerações embutidas no texto e separe-as em itens de lista ou blocos.
2. **Identificar Oportunidades Visuais:** Determine qual parte do texto explica relações espaciais, fluxos ou fórmulas que se beneficiariam de uma ilustração técnica.
3. **Prescrever a Imagem:** Insira uma imagem com caminho estruturado nas pastas correspondentes e com um prompt detalhado em comentário.
4. **Criar Estrutura de Destaque:** Use caixas semânticas coloridas (sem usar cores proibidas - Purple Ban) para contrastar erros comuns de definições fundamentais.
5. **Verificar Responsividade:** Garanta que em dispositivos móveis (`grid-cols-1`) a imagem se posicione de forma limpa abaixo ou acima do texto, mantendo a leitura confortável.
