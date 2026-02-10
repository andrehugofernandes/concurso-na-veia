# Planejamento Avançado: Painel Administrativo Petrobras Quest AI (SaaS)

> [!IMPORTANT]
> Este plano foi refinado para atender à necessidade de uma gestão profunda, intuitiva e orientada a dados, focada no ciclo de vida do usuário e na saúde do SaaS.

## 1. Visão Geral e Filosofia UX

**Objetivo:** Criar um "Centro de Comando" que permita ao administrador entender a saúde do negócio em segundos e agir sobre problemas de usuários em poucos cliques.

**Princípios de Design (UX/UI):**
- **Densidade de Informação Confortável:** Tabelas ricas em dados, mas com espaçamento adequado.
- **Ações Contextuais:** Botões de ação (banir, editar, acessar) sempre visíveis na linha do usuário.
- **Feedback Imediato:** Toasts e indicadores de carregamento para todas as ações administrativas.
- **Navegação Rápida:** Atalhos de teclado (ex: `Cmd+K` para buscar usuário) e estrutura de menu rasa.

---

## 2. Dashboard Principal (The Command Center)
A tela inicial (`/admin`) deve responder a três perguntas: "O sistema está saudavel?", "O negócio está crescendo?" e "O que precisa da minha atenção agora?".

### KPIs Principais (Cards de Topo)
- **MRR (Monthly Recurring Revenue):** Receita recorrente atual (Estimada ou via Stripe).
- **Usuários Ativos (MAU/DAU):** Total de usuários únicos ativos nos últimos 30 dias e 24h.
- **Taxa de Conversão:** % de usuários Free que viraram Pro/Enterprise.
- **Churn Rate:** % de usuários que cancelaram ou não renovaram.

### Gráficos Estratégicos
- **Crescimento de Usuários:** Linha do tempo (Novos vs Cancelamentos).
- **Simulados Realizados:** Barras diárias mostrando o engajamento na plataforma.
- **Distribuição de Planos:** Pizza (Free vs Pro vs Enterprise).

### Widgets de Atenção
- **Erros Recentes:** Lista compacta dos últimos erros 500 capturados.
- **Novos Cadastros:** Lista rápida dos últimos 5 usuários.
- **Alertas de Sistema:** Ex: "Backup falhou", "Alta latência na API".

---

## 3. Gestão de Usuários (Deep User Management)
Esta é a área mais crítica para o suporte e gestão do SaaS.

### A. Tabela de Usuários Avançada
- **Colunas:** Avatar, Nome/Email (clicável), Status (Badge: Ativo/Banido/Pendente), Plano, Role, Último Login, Data Cadastro.
- **Filtros Poderosos:**
  - *Status:* Ativo, Inativo, Banido.
  - *Plano:* Free, Pro, Enterprise.
  - *Role:* User, Admin, Coordenador.
- **Busca:** Instantânea por nome, email ou ID.

### B. Perfil do Usuário 360° (Detail View)
Ao clicar em um usuário, abre-se uma gaveta (Sheet) ou página detalhada contendo:
- **Resumo:** Dados cadastrais, status 2FA, avatar.
- **Assinatura:** Detalhes do plano atual, data de renovação, histórico de pagamentos (mock ou real).
- **Engajamento:** Quantidade de simulados feitos, média de acertos, tempo na plataforma.
- **Logs de Atividade:** "Fez login", "Gerou simulado", "Alterou senha".

### C. Ações Administrativas (Actions)
- **✨ Impersonation (Logar como Usuário):** Botão "Acessar Conta" que gera uma sessão temporária para o admin ver exatamente o que o usuário vê. Crítico para debug.
- **Gestão de Acesso:** Resetar Senha (envia email), Banir Usuário (com motivo), Desbloquear.
- **Modificação de Plano:** Upgrade/Downgrade manual (ex: dar 7 dias de Pro como cortesia).

---

## 4. Relatórios e Analytics
Ferramentas para tomada de decisão baseada em dados.

### Relatórios Disponíveis
1.  **Relatório de Engajamento:** Quais profissões/matérias são mais acessadas? (Ajuda a priorizar conteúdo).
2.  **Relatório Financeiro:** Entradas, saídas, LTV (Lifetime Value) estimado.
3.  **Relatório de Retenção:** Cohort analysis simplificado (quem entrou em Jan ainda está ativo em Mar?).

### Funcionalidades
- **Exportação:** Botões "Exportar CSV" e "Gerar PDF" em todas as tabelas de relatório.
- **Filtros de Data:** DatePicker range para analisar períodos específicos.

---

## 5. Configurações do Sistema (SaaS Settings)
Controle sobre o comportamento da plataforma sem precisar de deploy.

- **Feature Flags:** Ativar/Desativar funcionalidades (ex: "Manutenção Programada", "Novo Dashboard de Aluno").
- **Tabela de Preços:** Editar valores dos planos exibidos no frontend.
- **Notificações Globais:** Criar banner de aviso para todos os usuários (ex: "Nova atualização disponível!").
- **Backup & Logs:** Configurar retenção de logs e visualizar status de backups automáticos.

---

## 6. Stack Tecnológica
- **UI:** Shadcn/ui (Data Table, Sheets, Cards, Charts).
- **Charts:** Recharts (para gráficos de linha e barra).
- **Forms:** React Hook Form + Zod.
- **Date Handling:** date-fns.
- **Icons:** Lucide React.
