# Plano de PD&I (Pesquisa, Desenvolvimento e Inovação) e Memorial Técnico - Passei No Concurso

Este documento detalha o Memorial Técnico de Inovação da infraestrutura **Passei No Concurso** para fins de subvenção econômica, análise de risco tecnológico e propriedade intelectual junto à FACEPE, FINEP e SECTI-PE.

---

## 🔬 1. Risco Tecnológico e Grau de Inovação
Diferente das plataformas convencionais de ensino, que operam sob gerência manual de conteúdo e estruturas relacionais de dados simples, a inovação proposta baseia-se em um **motor dinâmico de conversão e renderização pedagógica autônoma assistido por Inteligência Artificial**:

1. **Grau de Novidade**: Inovação em processo e serviço (EdTech/GovTech) por meio de um ecossistema de agentes que automatiza a indexação didática estruturada a partir de PDFs de editais, reduzindo o tempo de criação de um curso acadêmico de semanas para minutos.
2. **Risco Tecnológico**: O desafio reside na garantia de integridade e robustez semântica (evitar alucinações das LLMs) e na compatibilização reativa do front-end (`ScoreLessonRenderer`) ao interpretar em tempo de execução esquemas JSON mutáveis e dinâmicos, garantindo a coexistência com o código nativo estático.

---

## 🏛️ 2. Arquitetura e Engenharia de Inovação

### A. Subsistema de Contexto Persistente e Memória Local (Frente B2C)
Para sustentar o aprendizado adaptativo do usuário sem depender puramente de sessões voláteis de navegadores ou conexões de API externas custosas, a aplicação embarca um banco de dados local **SQLite** (`context_history.db`).
- **Engine de Recuperação Semântica**: Script proprietário `get_context.py` que realiza queries indexadas no histórico de interações do candidato com os agentes de IA, gerando vetores de contexto que personalizam as próximas lições e quizzes.
- **Isolamento de Dados**: Garante maior conformidade com a LGPD e soberania dos dados do estudante, reduzindo custos de tráfego de nuvem.

### B. AI Parser Engine & ScoreLessonRenderer (Frente B2B/GovTech)
A engine de automatização White-Label opera em duas camadas de software desacopladas:
- **Camada Ingestão/Parser**: Processamento assíncrono de documentos brutos (editais em PDF) utilizando a API do Anthropic Claude 3.5 Sonnet para decodificação e montagem de uma árvore estruturada de conteúdo com representação JSON Schema estrita.
- **Camada Renderização (ScoreLessonRenderer)**: Engine que interpreta o JSON em tempo de execução e gera os layouts de micro-interações sem requerer compilação ou deploy de novas rotas estáticas `.tsx`.

---

## 📚 3. Metodologia Didática de Retenção Cognitiva (C.E.D.E.A.)
A infraestrutura valida a geração de apostilas virtuais e simulados a partir do rigor do framework **C.E.D.E.A**, impedindo a geração de resumos vazios:
- **Contextualização**: Inserção do aluno no panorama regulatório ou do edital.
- **Exploração**: Mínimo de 10 parágrafos densos e analíticos por módulo.
- **Demonstração**: Aplicação direta com resolução de pegadinhas de bancas examinadoras.
- **Exercícios & Avaliação**: Quizzes de 5 alternativas com feedback instantâneo mapeado.

---

## 🎨 4. Diretrizes e Barreiras de Design
- **Tipografia**: Headers em fonte `Khand` (otimização de scannability visual) e corpo em `Poppins`.
- **Barreira de Identidade ("Purple Ban")**: Exclusão estrita de tonalidades roxas e violetas das interfaces e das lâminas de apresentação do projeto para bancas de fomento científico.
