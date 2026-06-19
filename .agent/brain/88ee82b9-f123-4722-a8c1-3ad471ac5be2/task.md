# Integração do Gemini Pro para Simulados

Este projeto visa permitir que o usuário utilize a API do Google Gemini Pro para a geração de questões de simulados, oferecendo uma alternativa ao Claude da Anthropic.

## Tarefas

- [x] Pesquisar e planejar a integração (Gemini + ApiFreeLLM) [2026-03-13]
  - [x] Analisar- [x] Corrigir erro de geração de questões (Limite Atingido)
        [x] Ajustar Zod schema para aceitar dificuldades customizadas
        [x] Sincronizar tipos de Questão no frontend
        [x] Melhorar normalização de matérias e assuntos
        [x] Corrigir persistência de parâmetros da URL no auto-start
  - [ ] Aguardar refresh do usuário e logs do console
  - [x] Identificar variáveis de ambiente necessárias [2026-03-13]
  - [x] Criar plano de implementação com foco em redução de custos [2026-03-13]
- [x] Implementar infraestrutura multi-provedor [2026-03-13]
  - [x] Instalar `@google/generative-ai` e `openai` [2026-03-13]
  - [x] Criar estrutura de classes para Provedores (Gemini, ApiFreeLLM, Anthropic) [2026-03-13]
  - [x] Criar fábrica de provedores `src/lib/ai/provider.ts` [2026-03-13]
  - [x] Refatorar a rota de API para utilizar a nova infraestrutura [2026-03-13]
- [x] Verificação e Testes [2026-03-13]
  - [x] Testar geração com Claude [2026-03-13]
  - [x] Testar geração com Gemini [2026-03-13]
  - [x] Validar formato do JSON retornado [2026-03-13]
- [x] Atualizar plano do usuário para Pago (Top) [2026-03-13]
