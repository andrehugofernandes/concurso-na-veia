# Implementation Plan: CardCarousel Mobile Alignment

Goal: Adjust the mobile layout of `CardCarousel` cards so the icon is smaller and centered above the title, and the title is also centered, allowing text wrapping.

## User Review Required

No breaking changes. This focuses on CSS/Tailwind utility adjustments for mobile viewports (`< 768px`).

## Proposed Changes

### 1. `src/components/aulas/shared.tsx`

Adjust the layout of the card content within `CardCarousel`.

#### [MODIFY] `CardCarousel` (Around line 333)

- **Current Layout:**
  ```tsx
  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 mb-6">
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-xl md:text-2xl ...">
      {card.icone || card.icon}
    </div>
    <div className="flex-1 min-w-0 mt-2 md:mt-0">
      <h4 className="font-bold text-foreground text-lg mb-1 leading-tight">
        {card.titulo || card.title}
      </h4>
      <div className="text-sm text-muted-foreground leading-relaxed">
        {card.descricao}
      </div>
    </div>
  </div>
  ```
- **New Layout Strategy (Mobile First):**
  - Change the main wrapper from `items-start` to `items-center md:items-start` so that on mobile, the icon and text group are horizontally centered.
  - Change the icon wrapper to reduce its size on mobile: `w-10 h-10` and `text-lg`.
  - Change the text container (`div.flex-1`) from `min-w-0` to `text-center md:text-left` to center the title and description on mobile.
  - Allow the title to wrap naturally by keeping `leading-tight` but optionally removing any forced truncation if present (it doesn't appear to be truncated currently, just `min-w-0`).

## Verification Plan

### Manual Verification

1. Open the application and navigate to Módulo 3 in the "Coesão e Coerência" lesson.
2. View the page on a mobile viewport (e.g., iPhone 13 Pro).
3. Scroll down to the `CardCarousel` (e.g., "Normas e Regulamentos", "Comunicados Oficiais").
4. Verify that the icon is smaller.
5. Verify that the icon and the title are centered horizontally.
6. Verify that the title wraps to a new line if it's too long, without scrolling.
7. Switch to desktop viewport and ensure the original left-aligned layout is preserved.
