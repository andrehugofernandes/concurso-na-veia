---
description: Design Systems e Padrões Visuais do Petrobras Quest
---

# 🎨 Design Systems - Petrobras Quest

Guias completos para manter consistência visual e padrão premium em todas as aulas.

---

## 📚 Documentos Disponíveis

### 1. **Sistema de Coloração de Módulos (1-10)** ⭐ NEW
📄 [`MODULO_COLOR_SYSTEM.md`](MODULO_COLOR_SYSTEM.md)

**O que é?** Paleta harmônica de 10 cores para identificação visual de módulos em aulas.

**Quando usar?**
- Ao criar uma nova aula (sempre com 10 módulos)
- Ao atualizar aulas existentes
- Quando validar cores em componentes

**Paleta:**
```
Módulo 1:  ████ Azul       | Módulo 6:  ████ Âmbar
Módulo 2:  ████ Ciano      | Módulo 7:  ████ Laranja
Módulo 3:  ████ Esmeralda  | Módulo 8:  ████ Vermelho
Módulo 4:  ████ Teal       | Módulo 9:  ████ Rosa
Módulo 5:  ████ Violeta    | Módulo 10: ████ Índigo
```

**Funções auxiliares:** `src/lib/moduleColors.ts`
- `getModuleColor(index)` → Tailwind color
- `getModuleColorHex(index)` → Hex color
- `getModuleVariant(index)` → Variant name
- `getModuleColorInfo(index)` → Complete object

**Uso:**
```tsx
import { getModuleVariant, getModuleColor } from "@/lib/moduleColors";

// Em ModuleBanner
<ModuleBanner index={1} titulo="..." />  // Auto-usa azul

// Em ModuleSectionHeader
<ModuleSectionHeader index={1} title="..." variant={getModuleVariant(1)} />

// Em CardCarousel
<CardCarousel cards={[...]} corIndicador={`bg-${getModuleColor(1)}`} />
```

**Auditoria:** `.agent/audits/COLOR_SYSTEM_AUDIT.md`

---

## 🔗 Referências Rápidas

### Componentes Premium
- **ModuleBanner** → Define cor do módulo (background + número)
- **ModuleSectionHeader** → Número do módulo com cor (badges)
- **CardCarousel** → Indicador de navegação com cor
- **StickyModuleNav** → Badges de navegação no topo (cores progressivas)

### Arquivos Críticos
- **Código:** `src/lib/moduleColors.ts`
- **Documentação:** `.agent/design-systems/`
- **Auditoria:** `.agent/audits/COLOR_SYSTEM_AUDIT.md`
- **Workflow:** `.agent/workflows/aula.md` (Passo 3 - inclui coloração)

---

## ✅ Checklist de Conformidade

Ao criar/atualizar uma aula, verificar:

- [ ] Todos 10 módulos com cores diferentes (Azul → Índigo)
- [ ] ModuleBanner com `index={1-10}` correto
- [ ] ModuleSectionHeader com `variant` do getModuleVariant()
- [ ] CardCarousel com `corIndicador` da cor do módulo
- [ ] StickyModuleNav mostrando badges coloridas
- [ ] Sem cores hardcoded (nunca `bg-blue-500` em string)
- [ ] Usar funções de `moduleColors.ts`

---

## 🚀 Próximos Passos

### Fase 1: Validação ✅ (CONCLUÍDO)
- [x] Criar paleta oficial (10 cores)
- [x] Implementar funções auxiliares (`moduleColors.ts`)
- [x] Documentar sistema (este arquivo + MODULO_COLOR_SYSTEM.md)
- [x] Criar auditoria (COLOR_SYSTEM_AUDIT.md)

### Fase 2: Varredura (PRÓXIMA)
- [ ] Executar grep em todas as aulas
- [ ] Identificar cores hardcoded
- [ ] Mapear status de conformidade

### Fase 3: Correção (FUTURA)
- [ ] Atualizar aulas não-conformes
- [ ] Validar visualmente
- [ ] Deploy

### Fase 4: Manutenção (CONTÍNUA)
- [ ] Atualizar workflow `/aula` com conformidade obrigatória
- [ ] Treinar LLM para usar `getModuleVariant()` automaticamente
- [ ] Revisar em cada nova aula

---

## 🎯 Objetivos

✅ **Visual Harmony** → Usuário identifica módulo apenas pela cor
✅ **Accessibility** → Cores com bom contraste em light/dark
✅ **Consistency** → Mesma paleta em todas as aulas
✅ **Scalability** → Funções reutilizáveis
✅ **Documentation** → Fácil entender e implementar

---

## 📞 Suporte

Dúvidas sobre coloração?

1. Consultar `MODULO_COLOR_SYSTEM.md` (documentação completa)
2. Conferir `moduleColors.ts` (código com comentários)
3. Executar `debugModuleColors()` para validar
4. Revisar COLOR_SYSTEM_AUDIT.md para conformidade

---

**Última atualização:** 2026-03-14
**Status:** 🟢 Ativo e em conformidade
