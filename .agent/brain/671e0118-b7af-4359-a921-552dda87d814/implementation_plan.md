# Fix Build Error in AulaEquacoes1Grau.tsx

Resolve "Parsing ecmascript source code failed" in `AulaEquacoes1Grau.tsx` by escaping unescaped JSX characters (`<` and `{`/`}`) within text blocks.

## Proposed Changes

### Matemática Components

#### [MODIFY] [AulaEquacoes1Grau.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/matematica/AulaEquacoes1Grau.tsx)
- Escape curly braces `{` and `}` as `&#123;` and `&#125;` on line 1724: `{..., 3, 4, 5}` -> `&#123;..., 3, 4, 5&#125;`.
- Scan for and escape any other literal `<` or `{` characters that are not part of JSX tags or expressions.

## Verification Plan

### Automated Tests
- Run `npm run dev` and check if the Turbopack build succeeds without the "Parsing ecmascript source code failed" error.

### Manual Verification
- Access the "Equações de 1º Grau" lesson in the application and verify that the set notation `{..., 3, 4, 5}` renders correctly as text.
- Verify other mathematical formulas in the same section for correct rendering.
