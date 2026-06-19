# Implementation Plan - New Aula Layout (Login Style)

The user wants to refactor the lesson layout (specifically for `AulaConjuntos.tsx` for now) to match the "Login Page" styling:
1.  **Fixed Header**: Replicate the login page's header with the "AV A VAGA EH MINHA" logo and group.
2.  **Split Layout**: 50/50 split on Desktop (Left: Content, Right: Slideshow).
3.  **Two-Column Content**: The left side's content should be divided into two columns.
4.  **Hero Slideshow**: Incorporate the `HeroSlideshow` from the login page on the right side.

## Proposed Changes

### 1. Extract `AuthHeader` (Optional but good)
The header in `AuthLayout.tsx` is currently inline. I should check if it's already extracted or if I should just use it in the new template.

### 2. Create `AulaAuthLayout` or Update `AulaTemplate`
I will add a `variant="split"` (or similar) to `AulaTemplate` to support this new design without breaking existing lessons (unless the user wants *all* lessons changed, which they might). Given the request "Faça ESSE layout", I'll specifically target `AulaConjuntos.tsx` first or add the variant.

### 3. Implement the Two-Column Grid for Left Content
Within the left column of the split layout, I'll use a `grid-cols-2` (on large screens) to display the lesson modules/sections.

### 4. Integrate `HeroSlideshow`
Add the slideshow to the right side of the split layout.

## Tasks

- [ ] Analyze `AuthLayout.tsx` header and layout logic.
- [ ] Update `AulaTemplate` in `src/components/aulas/shared.tsx` to support a `layoutVariant` prop.
- [ ] or create a wrapper component inside `AulaConjuntos.tsx`.
- [ ] Apply the 2-column grid to the `children` area in the left side.
- [ ] Add `HeroSlideshow` to the right side.
- [ ] Fix any padding/scrolling issues with the new split layout.

## User Questions / Clarifications
- **Scope**: Should this change apply to ALL lessons (updating `AulaTemplate` globally) or just `AulaConjuntos.tsx`?
- **Column content**: How should the 2 columns be filled? Alternating modules? Info on left, exercises on right? Or just a wrapping grid?
- **Sticky Nav**: In a split layout, where should the `StickyModuleNav` (tabs) be placed?

---
*Created by Antigravity*
