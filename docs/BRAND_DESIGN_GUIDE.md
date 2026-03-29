# Brand Design Guide — "A Vaga E Minha"

> Guia de marca e tipografia para alimentar LLMs e manter consistencia visual.
> NOTA: A paleta de cores e controlada pelo sistema de skins do projeto (Laranja, Azul, Verde, Verde Claro, Amarelo, Azul Claro) e e imutavel. Este guia foca em tipografia, efeitos visuais e identidade.

---

## 1. Identidade da Marca

**Nome:** A VAGA E MINHA
**Subtitulo:** Simulador de Concursos
**Dominio:** avagaemia.ai
**Publico-alvo:** Candidatos a concursos publicos (foco Petrobras/CESGRANRIO)

---

## 2. Estudo Tipografico 1: Khand Bold (Logo Principal)

### Sobre a Font

- **Nome:** Khand
- **Foundry:** Indian Type Foundry
- **Tipo:** Condensed sans-serif
- **Scripts:** Latin, Devanagari
- **Pesos disponiveis:** Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Google Fonts:** https://fonts.google.com/specimen/Khand
- **Licenca:** Open Font License (livre para uso comercial)

### Caracteristicas Visuais

- Geometria angular e condensada — ideal para logos, headings e CTAs
- Strokes uniformes com terminacoes retas (sem serifas, sem curvas decorativas)
- Alta legibilidade em tamanhos grandes (display) e medios (UI headings)
- Vertical stress forte — transmite autoridade e modernidade
- Espaco entre caracteres naturalmente apertado — bom para logotipos compactos

### Aplicacoes na Marca

| Uso | Peso | Tamanho | Classe Tailwind |
|-----|------|---------|-----------------|
| Logo principal "A VAGA" | Bold 700 | 28-32px | `font-bebas text-[28px] md:text-[32px]` |
| Icone sidebar (AV) | Bold 700 | 24-30px | `font-bebas text-2xl md:text-3xl` |
| Headings de pagina | Bold 700 | 24-48px | `font-bebas text-3xl md:text-4xl` |
| Headings de secao | SemiBold 600 | 20-28px | `font-bebas text-2xl` |
| Botoes CTA | Bold 700 | 18-24px | `font-bebas text-xl uppercase tracking-wider` |
| OTP inputs | Bold 700 | 24-30px | `font-bebas text-3xl` |

### Implementacao Tecnica (Next.js)

```typescript
// src/app/layout.tsx
import { Khand } from "next/font/google";

const khand = Khand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-khand",
});

// No <body>:
<body className={`${poppins.variable} ${khand.variable} font-sans`}>
```

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
  bebas: ['var(--font-khand)', 'sans-serif'],  // alias mantido para compatibilidade
}
```

### Comparacao: Bebas Neue vs Khand

| Aspecto | Bebas Neue | Khand Bold |
|---------|-----------|------------|
| Tipo | All-caps display | Mixed-case condensed |
| Pesos | 1 (Regular) | 5 (300-700) |
| Lowercase | Nao tem | Tem |
| Flexibilidade | Apenas titulos | Titulos + UI + body |
| Largura | Ultra-condensed | Condensed |
| Numeros | Tabular | Tabular |
| Personalidade | Industrial/brutalista | Moderna/tecnica |

**Vantagem Khand:** Permite usar a mesma familia em mais contextos (botoes, labels, inputs) sem perder o carater display. Os 5 pesos dao hierarquia tipografica completa com uma unica font.

---

## 3. Estudo Tipografico 2: Font Geometrica Poligonal (Estilo "THE AGENCY")

### Descricao Visual

A font observada na imagem de referencia ("THE" e "AGENCY") possui:

- **Construcao por linhas/segmentos:** Cada letra e formada por segmentos retos que se conectam em angulos, como arestas de poligonos
- **Estilo outlined/wireframe:** As letras nao sao preenchidas — sao formadas apenas por contornos/strokes
- **Sobreposicao geometrica:** Segmentos de linhas se cruzam e sobrepoe, criando uma estetica de "blueprint tecnico"
- **Aspecto futurista/tech:** Remete a HUDs, interfaces sci-fi, engenharia
- **Peso ultra-light:** Strokes finos e uniformes

### Fonts Similares Identificadas

1. **Orbitron** (Google Fonts)
   - Geometrica, futurista, angulos retos
   - Disponivel em Google Fonts: https://fonts.google.com/specimen/Orbitron
   - Limitacao: nao tem o efeito de wireframe/outlined

2. **Rajdhani** (Google Fonts)
   - Condensed, angular, tech-forward
   - https://fonts.google.com/specimen/Rajdhani
   - Boa alternativa acessivel

3. **Michroma** (Google Fonts)
   - Futurista, geometrica, wide
   - https://fonts.google.com/specimen/Michroma

4. **Oxanium** (Google Fonts)
   - Futurista, gaming/tech vibe
   - https://fonts.google.com/specimen/Oxanium

5. **Fonts premium com efeito poligonal exato:**
   - **Cyberion** — font de segmentos poligonais overlapping
   - **Polygon** by Fontfabric
   - **Geometos** — construcao geometrica pura
   - **Cornerstone** — angular, segmentada

### Como Replicar o Efeito Poligonal em CSS

Para obter o efeito de "linhas sobrepostas formando letras" sem uma font custom:

```css
/* Approach 1: Text stroke (outlined) */
.polygon-text {
  font-family: 'Orbitron', 'Khand', sans-serif;
  font-weight: 700;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.9);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* Approach 2: SVG filter for geometric fragmentation */
.polygon-text-advanced {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px #ffffff;
  filter: url(#polygon-filter);
}

/* Approach 3: Layered shadows for wireframe depth */
.polygon-text-layered {
  font-family: 'Khand', sans-serif;
  font-weight: 700;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
  text-shadow:
    0 0 20px rgba(100, 150, 255, 0.3),
    0 0 40px rgba(100, 150, 255, 0.1);
}
```

### Recomendacao para o Projeto

**Para uso display (hero sections, landing page):** Usar Orbitron com `-webkit-text-stroke` para o efeito outlined. E a opcao mais proxima do visual "THE AGENCY" disponivel gratuitamente.

**Para uso no logo/sidebar:** Manter Khand Bold — o estilo poligonal e muito fino para icones de 12px na sidebar.

**Implementacao sugerida:**

```typescript
// Adicionar Orbitron como font display opcional
import { Khand, Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});
```

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
  bebas: ['var(--font-khand)', 'sans-serif'],
  display: ['var(--font-orbitron)', 'var(--font-khand)', 'sans-serif'],
}
```

---

## 4. Sistema de Cores (Skins)

As cores do projeto sao gerenciadas pelo sistema de skins e NAO devem ser alteradas manualmente. O sistema oferece 6 temas de cor:

| Skin | Hex | Uso |
|------|-----|-----|
| Laranja | `#FF8500` | Skin padrao |
| Azul | `#0037C1` | Corporativo |
| Verde | `#008C32` | Natureza |
| Verde Claro | `#00DD4F` | Fresh |
| Amarelo | `#FDC300` | Energia |
| Azul Claro | `#00BDFF` | Tech |

A cor da skin ativa e injetada via CSS variable `--primary-hex` e aplicada automaticamente em todo o sistema. Todas as cores de accent, botoes, links e destaques derivam da skin ativa. **Nunca hardcode cores primarias — sempre use `var(--primary-hex)` ou classes Tailwind `bg-primary`, `text-primary`.**

---

## 5. Hierarquia Tipografica Completa

| Nivel | Font | Peso | Tamanho | Classe Tailwind | Uso |
|-------|------|------|---------|-----------------|-----|
| Display | Khand | 700 | 48-72px | `font-bebas text-5xl md:text-7xl` | Hero headings, landing |
| H1 | Khand | 700 | 32-48px | `font-bebas text-3xl md:text-4xl` | Titulos de pagina |
| H2 | Khand | 600 | 24-32px | `font-bebas text-2xl md:text-3xl` | Titulos de secao |
| H3 | Khand | 600 | 20-24px | `font-bebas text-xl` | Sub-secoes |
| Body | Poppins | 400 | 14-16px | `font-sans text-sm md:text-base` | Texto corrido |
| Body bold | Poppins | 600 | 14-16px | `font-sans font-semibold` | Enfase |
| Caption | Poppins | 300 | 12px | `font-sans text-xs font-light` | Labels, timestamps |
| Button | Khand | 700 | 16-20px | `font-bebas text-xl uppercase tracking-wider` | CTAs |
| Code | Fira Code | 400 | 14px | `font-mono text-sm` | Codigo, dados tecnicos |
| Display alt | Orbitron | 700+ | 48-96px | `font-display` (se adicionada) | Efeito poligonal |

---

## 6. Regras de Marca para LLM

Ao gerar interfaces ou conteudo visual para "A Vaga E Minha":

1. **Sempre usar `font-bebas` (Khand)** para headings e elementos de destaque
2. **Sempre usar `font-sans` (Poppins)** para corpo de texto
3. **Cores via sistema de skins** — nunca hardcode cores primarias, usar `bg-primary`, `text-primary`, `var(--primary-hex)`
4. **As 6 skins disponiveis** sao imutaveis: Laranja, Azul, Verde, Verde Claro, Amarelo, Azul Claro
5. **Suportar dark mode** — usar classes Tailwind `dark:` para variantes escuras
6. **Manter alto contraste** — respeitar foreground/background do tema ativo
7. **Evitar bordas arredondadas excessivas** — preferir radius moderado (8-12px)
8. **Uppercase com tracking** para CTAs e labels curtos (`uppercase tracking-wider`)
9. **O icone da sidebar e "AV"** renderizado em Khand Bold sobre fundo `--primary-hex`
10. **O logo completo e "A VAGA E MINHA"** com "A VAGA" na cor primaria e "E MINHA" na cor foreground

---

## 7. Assets e Recursos

### Fonts (Google Fonts CDN)

```html
<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Khand:wght@400;500;600;700&family=Poppins:wght@300;400;600;700;800&family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
```

### Implementacao Next.js (Atual)

- Layout: [layout.tsx](src/app/layout.tsx) — Khand + Poppins via `next/font/google`
- Tailwind: [tailwind.config.js](tailwind.config.js) — `font-bebas` alias para Khand
- CSS: [globals.css](src/app/globals.css) — variaveis de tema
- Logo: [admin-sidebar.tsx](src/components/admin/admin-sidebar.tsx) — "AV" icon + "A VAGA E MINHA"
