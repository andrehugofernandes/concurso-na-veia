# Lista de Tarefas: Persistência de Estado e Padronização "Aula Master v3" nas Aulas de Administração

## 🗲 Fase 1: Automatização da Persistência de Estado (localStorage)
- [x] Criar o script utilitário de persistência `persist_and_standardize.py`
- [x] Aplicar a persistência do `localStorage` de abas ativas, módulos liberados e completados na aula de Recursos Humanos: `AulaGestãoDeRecursosHumanos.tsx`
- [x] Estender a persistência do `localStorage` para as outras aulas chaves de administração (Gestão de Pessoas, Marketing Gerencial, Planejamento Estratégico, etc.)

## 🎨 Fase 2: Harmonização de Cores (Variants)
- [x] Validar e garantir que as aulas de administração usem o array `mv` obtido por `getModuleVariant(index)` de [moduleColors.ts](file:///c:/Workspace/petrobras-quest/src/lib/moduleColors.ts)
- [x] Vincular elementos de banner, seção e questionários à variante cromática correta
- [x] Eliminar as cores restritas legadas (`purple`, `violet`, `fuchsia`) das aulas de administração através do script de otimização

## 📖 Fase 3: Alinhamento ao Padrão "Aula Master v3"
- [x] Configurar `mode="stacked"` nos componentes `ContentAccordion` das aulas prioritárias de administração
- [x] Atualizar os cabeçalhos de introdução de cada módulo para usar `index="INTRO"` nas aulas pendentes
- [x] Ajustar o grid dos FlipCards premium para `gap-6` (substituindo `gap-4`)

## 🧪 Fase 4: Validação e Compilação
- [x] Executar o script de auditoria de conformidade para checar as introduções e FlipCards
- [x] Executar teste de compilação do TypeScript no projeto (`pnpm exec tsc --noEmit`) para garantir integridade completa
