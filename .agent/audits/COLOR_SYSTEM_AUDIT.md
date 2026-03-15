---
description: Auditoria de conformidade com o Sistema de Coloração de Módulos (1-10)
---

# 🔍 Auditoria de Coloração de Módulos (1-10)

**Status:** Pendente de varredura completa
**Data:** 2026-03-14

---

## 📋 Checklist de Conformidade por Aula

### Matemática (11 aulas)

#### 1. ✅ AulaConjuntos
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded (azul, vermelho, etc em strings)
- **Notas:**

#### 2. ✅ AulaEquacoes1Grau
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 3. ✅ AulaEquacoes2Grau
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 4. ✅ AulaFuncoesAfimQuadratica
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 5. ✅ AulaFuncoesExponenciais
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 6. ✅ AulaFuncoesLogaritmicas
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 7. ✅ AulaProgressoesPa
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 8. ✅ AulaProgressoesPg
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 9. ✅ AulaPorcentagem
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 10. ✅ AulaRazaoProporcao
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 11. ✅ AulaProbabilidade
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

---

### Português (Aulas principais)

#### 1. ✅ AulaConcordancia
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 2. ✅ AulaOrtografia
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 3. ⏳ AulaCrase
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

#### 4. ⏳ AulaSintaxe
- [ ] ModuleBanner usa `index={1-10}` com cores correspondentes
- [ ] ModuleSectionHeader usa `variant` correto
- [ ] CardCarousel tem `corIndicador` do módulo
- [ ] StickyModuleNav mostra badges coloridas
- [ ] Sem cores hardcoded
- **Notas:**

---

## 🔧 Conformidade Técnica

### ✅ Checklist Global

- [ ] `src/lib/moduleColors.ts` criado com todas as funções
- [ ] `.agent/design-systems/MODULO_COLOR_SYSTEM.md` documentado
- [ ] Workflow `/aula` atualizado com referência ao color system
- [ ] Nenhuma aula usa cores hardcoded (grep por `bg-blue`, `bg-red`, etc)
- [ ] ModuleBanner mapeia `index` → cor automaticamente
- [ ] ModuleSectionHeader aceita `variant` correto
- [ ] StickyModuleNav renderiza badges com cores progressivas
- [ ] Testes de contraste em light/dark modes

---

## 🚀 Próximas Ações

1. **Varredura de Código** → Grep de todas as aulas para encontrar cores hardcoded
2. **Atualização de Componentes** → Adicionar suporte automático a `getModuleVariant(index)`
3. **Testes Visuais** → Validar harmonia de cores no browser
4. **Documentação no Workflow** → Atualizar `/aula` para impor conformidade
5. **Correções** → Aula por aula conforme necessário

---

## 📝 Log de Correções

### Aula: [Nome]
**Data:** YYYY-MM-DD | **Responsável:** [Seu Nome]

**Problemas encontrados:**
- [ ] Problema 1
- [ ] Problema 2

**Correções aplicadas:**
- ✅ Corrigida cor do módulo X
- ✅ Atualizado variant em ModuleSectionHeader

**Status:** Concluída

---

## 🎨 Paleta de Referência Rápida

```
Módulo 1:  ████ Azul       (blue-500)       #3b82f6
Módulo 2:  ████ Ciano      (cyan-500)       #06b6d4
Módulo 3:  ████ Esmeralda  (emerald-500)    #10b981
Módulo 4:  ████ Teal       (teal-500)       #14b8a6
Módulo 5:  ████ Violeta    (violet-500)     #a78bfa
Módulo 6:  ████ Âmbar      (amber-500)      #f59e0b
Módulo 7:  ████ Laranja    (orange-500)     #f97316
Módulo 8:  ████ Vermelho   (red-500)        #ef4444
Módulo 9:  ████ Rosa       (pink-500)       #ec4899
Módulo 10: ████ Índigo     (indigo-500)     #6366f1
```
