# Walkthrough — Ultimate Template de Criação de Aulas

## O que foi feito

Consolidação de **toda a inteligência de criação de aulas** do projeto em um único workflow definitivo: [aula.md](file:///c:/Workspace/petrobras-quest/.agent/workflows/aula.md)

## Fontes Pesquisadas

| Fonte                              | Tipo        | Linhas/Conteúdo                                                            |
| ---------------------------------- | ----------- | -------------------------------------------------------------------------- |
| `PRD_NotebookLM_Conteudo_Aulas.md` | PRD         | 434 linhas — Estrutura de aulas, formato CESGRANRIO, requisitos por módulo |
| `PRD_A_VAGA_E_MINHA.md`            | PRD         | 193 linhas — Visão do produto, stack técnica, funcionalidades core         |
| `PRD PARA O PROFESSOR AVATAR.md`   | PRD         | 114 linhas — Requisitos Meet.AI (referência de arquitetura)                |
| `shared.tsx`                       | Componente  | 3151 linhas, 67 componentes — Catálogo completo de building blocks         |
| Workflow `/aula` anterior          | Workflow    | 264 linhas — Base do workflow existente                                    |
| Skill `acordeon-carrossel`         | Skill       | 638 linhas — Padrão ContentAccordion v3 (FINAL)                            |
| `IMPLEMENTACAO_FINAL.md`           | Doc         | 210 linhas — Sistema de coloração dinâmica                                 |
| `ARCHITECTURE.md`                  | Doc         | 289 linhas — Mapa de 20 agentes, 36 skills, 11 workflows                   |
| `frontend-specialist.md`           | Agente      | 594 linhas — Regras de design, Purple Ban, anti-clichê                     |
| `fix_consolidation_position.py`    | Script      | 133 linhas — Fix de ordenação Consolidation/Quiz                           |
| `fix_count.py`                     | Script      | 6 linhas — Diagnóstico de tags JSX balanceadas                             |
| `fix_tags.py`                      | Script      | 30 linhas — Inserção de tags de fechamento                                 |
| 43 aulas existentes                | Componentes | Padrões testados e validados em produção                                   |
| 30 arquivos de quizzes             | Dados       | Formato validado do pool de questões                                       |

## O que o Ultimate Template inclui

1. **Mapeamento de 7 agentes** com suas skills (frontend, backend, segurança, testes, SEO, performance, planejamento)
2. **Contexto completo do produto** (stack, banca CESGRANRIO, público-alvo)
3. **Fluxo de 7 passos** detalhado com código copiável
4. **Anatomia completa do componente** com boilerplate de 2500+ linhas
5. **Protocolo C.E.D.E.** com checklist por slide
6. **Catálogo de 67 componentes** de `shared.tsx` organizados por categoria
7. **3 scripts de fix** com ordem de execução recomendada
8. **67 anti-patterns** categorizado (código, estrutura, accordion, design)
9. **Checklist final** com 20+ itens de validação
10. **Métricas de qualidade** com mínimos e ideais

## Validação

- ✅ Workflow escrito em formato compatível com `/aula`
- ✅ Frontmatter YAML preservado
- ✅ `// turbo-all` preservado para auto-run
- ✅ Todos os componentes referenciados existem em `shared.tsx`
- ✅ Scripts de fix referenciados existem na raiz do projeto
