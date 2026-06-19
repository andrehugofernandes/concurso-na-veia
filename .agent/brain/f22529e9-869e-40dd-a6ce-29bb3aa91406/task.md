# Tarefa: Padronização Definitiva da Aula de Coesão (Ultimate V4.1)

Padronizar `AulaCoesaoCoerencia.tsx` em paridade absoluta com `AulaInterpretacaoTexto.tsx`, seguindo o blueprint de 10 módulos, remoção de travas e cores dinâmicas.

## Checklist

- [ ] **Infraestrutura e Lógica (Paridade Interpretação)**
  - [ ] Importar `getModuleVariant` e inicializar `mv`
  - [ ] REMOVER TRAVAS: Alterar `isModuleUnlocked` para retornar sempre `true`
- [/] **Implementação da Introdução Rica (Universal)**
  - [x] Adicionar `RichIntro` no Módulo 1 com Protocolo N.E.X.O.
  - [ ] Replicar seções de "Rich Intro" (Dossiê Tático) nos Módulos 2 a 10
- [ ] **Padronização Visual e Cromática**
  - [ ] Aplicar `variant={mv[N]}` em todos os banners e headers
  - [ ] Sincronizar paleta de cores dos 10 módulos com o sistema dinâmico
- [ ] **Enriquecimento Modular (1 a 10)**
  - [x] Garantir `ContentAccordion mode="stacked"` em todos os módulos
  - [x] Garantir 4 abas de mídia (`LessonTabs`) por módulo
- [ ] **Verificação Final**
  - [ ] Resolver erros de lint e tipos (LuSearch, LuShieldAlert, etc.)
  - [ ] Auditoria visual final e mobile
