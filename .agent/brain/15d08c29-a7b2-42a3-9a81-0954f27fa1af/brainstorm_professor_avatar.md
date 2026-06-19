# 🧠 Brainstorm: Evolução do Professor Avatar (Petrobras Quest)

## Contexto
Atualmente, o PRD do "Professor Avatar" é uma cópia base do projeto "Meet.AI" (SaaS de agentes de IA para chamadas de vídeo). O objetivo é transformar esse baseline em uma ferramenta educacional única, focada na preparação para o concurso da **Petrobras (Banca CESGRANRIO)**, utilizando tecnologias de ponta como OpenAI Realtime API, HeyGen e ElevenLabs.

---

### Opção 1: Webinars IA Interativos (Assíncrono "Feel-Live")
Aulas pré-renderizadas de alta fidelidade onde o Avatar explica conteúdos do edital. A interação ocorre via chat RAG (Retrieval Augmented Generation), simulando uma live.

🤖 **Visão @frontend-specialist:**
- Layout 50/50: Esquerda com o PDF da aula (`AulaConjuntos.tsx`) e direita com o vídeo 4K do Avatar.
- Botão "Levantar a Mão": Pausa o vídeo e abre um chat contextual.
- Estética "Glassmorphism" com cores Petrobras (Verde/Amarelo sutil, Azul Petróleo).

🤖 **Visão @backend-specialist:**
- Pipeline Inngest para gerar o roteiro (Claude), áudio (ElevenLabs) e lip-sync (HeyGen).
- Armazenamento em Cloudflare R2 e streaming via Cloudflare Stream.
- RAG indexando os componentes TSX de aula para que o chat saiba o que está na tela.

✅ **Prós:**
- Custo previsível por aula ($30-$40).
- Qualidade visual cinematográfica (HeyGen).
- Disponível 24/7 sem latência de geração de vídeo.

❌ **Cons:**
- Não é conversacional por voz (interação é texto -> texto).
- Rigidez no conteúdo da aula.

📊 **Esforço:** Médio

---

### Opção 2: Tutor Particular em Tempo Real (Síncrono)
Utiliza a **OpenAI Realtime API** para uma conversa fluida por voz e vídeo de baixa latência. O aluno "conversa" com o professor como se fosse uma chamada de vídeo real.

🤖 **Visão @frontend-specialist:**
- Interface imersiva estilo "FaceTime".
- HUD dinâmico: Indicadores de "Ouvindo", "Processando" e "Explicando".
- Quadro branco compartilhado onde o avatar "desenha" enquanto fala.

🤖 **Visão @backend-specialist:**
- Implementação de WebRTC para áudio bi-direcional de baixa latência (<500ms).
- Integração com `Stream Video SDK` para gerenciar a sala de aula.
- O Avatar acessa os metadados do aluno (Cargo pretendido, nível de acerto em simulados) para personalizar a fala.

✅ **Prós:**
- Experiência "Uau": Sente-se como um mentor humano real.
- Altíssima personalização (o professor sabe onde você tem dificuldade).
- Totalmente interativo.

❌ **Cons:**
- Custo operacional elevado (API Realtime é cara por minuto).
- Visual do avatar menos "polido" se gerado em tempo real (vs pré-renderizado).

📊 **Esforço:** Alto

---

### Opção 3: Mentor Híbrido "The Hub" (Recomendada)
Uma plataforma centralizada que mescla os dois mundos. Aulas teóricas são **Opção 1** (alta qualidade), mas com janelas de "Plantão de Dúvidas" usando **Opção 2**.

🤖 **Visão @mobile-developer:**
- App mobile focado em "Micro-learning".
- O Avatar envia áudios curtos de "Dica do Dia" via notificações push (ElevenLabs).
- Player de vídeo otimizado para vertical (estilo TikTok didático).

🤖 **Visão @backend-specialist:**
- Orquestração de workflows Inngest para gerenciar o progresso do aluno entre as aulas teóricas e as sessões de dúvida.
- Sistema de créditos para controlar o uso da API Realtime.

✅ **Prós:**
- Melhor dos dois mundos: Escala (assíncrono) + Personalização (síncrono).
- Maior valor percebido para planos SaaS Premium.
- Flexibilidade tecnológica (pode começar com Opção 1 e escalar Opção 2).

📊 **Esforço:** Muito Alto

---

## 💡 Recomendação: **Opção 3 (Híbrida)**

**Por que?**
A preparação para a Petrobras exige profundidade teórica (melhor servida por vídeos pré-renderizados de 1h) e clareza em pontos específicos (onde o Realtime brilha). 

**Próximos Passos Sugeridos:**
1. Atualizar o PRD para focar em "Tutoria Híbrida".
2. Criar um Protótipo de "HUD de Aula" que una o conteúdo de `AulaConjuntos.tsx` com um placeholder de vídeo IA.
3. Configurar um workflow Inngest experimental para geração de roteiros baseados em editais Petrobras.

**Qual dessas direções você prefere aprofundar no PRD melhorado?**
