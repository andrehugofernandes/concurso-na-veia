# Plano de Implementação: Persistência de Estado e Padronização "Aula Master v3" nas Aulas de Administração

Este plano detalha a estratégia técnica para atender às novas diretrizes do usuário:
1. **Persistência de Estado no localStorage** para as abas ativas, módulos liberados e módulos concluídos nas aulas.
2. **Harmonização de Cores** seguindo as variants cromáticas ideais extraídas de [AulaInterpretacaoTexto.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaInterpretacaoTexto.tsx).
3. **Alinhamento Pedagógico "Aula Master v3"** com base nas especificações de [SKILL.md](file:///c:/Workspace/petrobras-quest/.agent/skills/rich-intro-premium-flips-builder/SKILL.md), utilizando `mode="stacked"` no `ContentAccordion`, `index="INTRO"` nas cabeceiras de introdução e grid `gap-6` para os FlipCards premium.

---

## 🔍 Detalhamento Técnico das Mudanças

### 1. Persistência de Estado (localStorage)
Para cada aula de administração, vamos refatorar o gerenciamento de estado para ler o estado inicial do `localStorage` de forma segura (verificando se o objeto `window` está definido) e registrar mudanças usando hooks de `useEffect`.

**Chave do LocalStorage**: `petrobras_quest_aula_[NOME_DA_AULA]_[ESTADO]` (para evitar colisões).

Exemplo prático de implementação no estado da aula:
```tsx
import { useState, useEffect } from "react";

// ... dentro do componente da Aula:
const STORAGE_KEY_PREFIX = "petrobras_quest_aula_gestao_rh_";

const [activeTab, setActiveTab] = useState(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
    return saved || "modulo-1";
  }
  return "modulo-1";
});

const [unlockedModules, setUnlockedModules] = useState<string[]>(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}unlocked_modules`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return ["modulo-1"]; }
    }
  }
  return ["modulo-1"];
});

const [completedModules, setCompletedModules] = useState<string[]>(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}completed_modules`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
  }
  return [];
});

// Sincronização com o localStorage via useEffect:
useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
  }
}, [activeTab]);

useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}unlocked_modules`, JSON.stringify(unlockedModules));
  }
}, [unlockedModules]);

useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}completed_modules`, JSON.stringify(completedModules));
  }
}, [completedModules]);
```

### 2. Harmonização Cromática (Variants do módulo Colors)
Garantiremos que todas as aulas de administração utilizem o utilitário `getModuleVariant` herdado do [moduleColors.ts](file:///c:/Workspace/petrobras-quest/src/lib/moduleColors.ts). 
* Removeremos definições de cores estáticas redundantes ou restritas (`purple`, `violet`, `fuchsia`) nas bordas, fundos ou ícones.
* Vincularemos os elementos visuais à variante dinâmica do módulo (`variant={mv[N]}` ou `variant={variant}`) para alinhar o visual das aulas de administração à identidade corporativa premium adotada na [AulaInterpretacaoTexto.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaInterpretacaoTexto.tsx).

### 3. Alinhamento ao Padrão Premium "Aula Master v3"
Faremos correções automatizadas e semi-manuais orientadas pelas regras do `SKILL.md`:
* **ContentAccordion**: Habilitar a propriedade `mode="stacked"` para renderização empilhada de alta performance, sem o inchaço de carrosséis redundantes no mobile.
* **FlipCards**: Garantir grid `gap-6` (nunca `gap-4`) para correta exibição em telas de alta densidade.
* **Header de Introdução**: Configurar `index="INTRO"` (em vez de índices numéricos para a introdução) nas seções iniciais.

---

## 📅 Plano de Ação por Fases

### Fase 1: Criação e Validação do Script de Automatização
Criaremos o script utilitário [persist_and_standardize.py](file:///c:/Workspace/petrobras-quest/scratch/persist_and_standardize.py) para injetar de forma segura a importação do `useEffect`, a leitura dos estados iniciais e os hooks de gravação do `localStorage` nas aulas da pasta `src/components/aulas/administracao/`.
* O script lerá cada arquivo e fará as substituições AST/Regex com total segurança, gerando cópias de backup automáticas.

### Fase 2: Aplicação do Script de Persistência e Otimização
Executaremos o script de persistência e otimização de forma incremental (em lotes) e revisaremos os arquivos principais de administração:
1. 📄 [AulaGestãoDeRecursosHumanos.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaGestãoDeRecursosHumanos.tsx)
2. 📄 [AulaGestãoDePessoas.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaGestãoDePessoas.tsx)
3. 📄 [AulaMarketingGerencial.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaMarketingGerencial.tsx)
4. 📄 [AulaPlanejamentoEstrategico.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaPlanejamentoEstrategico.tsx)
5. Outras aulas sob demanda de conformidade.

### Fase 3: Higienização Cromática e Layout Premium v3
* Aplicaremos o script de correção de grids e variantes de cor.
* Revisaremos manualmente o `ContentAccordion` para configurar `mode="stacked"`, garantindo conformidade com a especificação Aula Master v3.

### Fase 4: Compilação de Segurança
Validaremos o build do projeto com TypeScript para confirmar a integridade de todas as tipagens:
```bash
pnpm exec tsc --noEmit
```

---

## 🧪 Plano de Verificação

### Testes Automatizados
* Verificação estática de tipagem após cada fase com `tsc --noEmit`.
* Execução do script de auditoria: `python .agent/skills/rich-intro-premium-flips-builder/scripts/audit_modules.py src/components/aulas/administracao/` para monitorar a conformidade dos FlipCards e introduções.

### Testes Manuais
* Abrir a aplicação localmente e validar se o progresso (aba ativa, módulos liberados e concluídos) é recuperado perfeitamente no `localStorage` após recarregar o navegador.
