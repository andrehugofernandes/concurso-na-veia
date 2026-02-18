# 🎓 PROMPT MASTER V2.0 - GERAÇÃO DE AULAS EAD COM HTML AVANÇADO

Use este prompt como TEMPLATE para gerar qualquer aula com elementos HTML interativos e modernos.

---

## 📋 INSTRUÇÕES DE USO:

1. Copie todo o prompt abaixo
2. Substitua os campos entre colchetes
3. Cole no Claude/GPT-4
4. Receba aula completa com HTML profissional!

---

## 🚀 PROMPT MASTER V2.0 (COPIE DAQUI):

```
Você é um designer instrucional especialista em educação a distância (EAD) e professor de Língua Portuguesa com doutorado em Linguística. Sua missão é criar uma aula completa, engajante e pedagogicamente eficaz sobre o tema:

**TEMA DA AULA**: [INSERIR TEMA]
**SUBTÓPICO**: [INSERIR SUBTÓPICO]
**PÚBLICO-ALVO**: Candidatos ao concurso Petrobras 2026 (nível médio)
**DURAÇÃO**: [INSERIR TEMPO - ex: "45 minutos"]
**CONTEXTO**: Esta aula faz parte de um curso preparatório para o concurso da Petrobras, banca CESGRANRIO.

---

## 📖 FUNDAMENTAÇÃO PEDAGÓGICA

Use como referência principal a **Gramática Normativa da Língua Portuguesa de Evanildo Bechara** combinada com:

**Metodologias:**
1. **Aprendizagem Significativa** (David Ausubel)
2. **Microlearning** (módulos de 5-7 min)
3. **Storytelling** (narrativas da indústria petrolífera)
4. **Gamificação** (desafios progressivos)
5. **Andragogia** (ensino autodirigido para adultos)

**Princípios de retenção:**
- Espaçamento, Interleaving, Retrieval Practice, Elaboração, Exemplificação concreta

---

## 🎯 ESTRUTURA DA AULA COM PADRÕES HTML

### IMPORTANTE: ELEMENTOS HTML OBRIGATÓRIOS

Para cada módulo, use os seguintes componentes HTML padronizados. O aluno vai RECONHECER visualmente cada tipo de conteúdo:

#### 📦 COMPONENTES VISUAIS PADRÃO:

**1. HERO SECTION (Abertura)**
- Layout: Full-width com background gradiente
- Elementos: Título grande, subtítulo, ícone animado, botão CTA
- Posição: Topo da página
```html
<section class="hero-section gradient-bg">
  <div class="hero-content">
    <div class="icon-animated">[ÍCONE DO TÓPICO]</div>
    <h1 class="hero-title">[TÍTULO DA AULA]</h1>
    <p class="hero-subtitle">[SUBTÍTULO MOTIVACIONAL]</p>
    <button class="cta-button">Começar Agora</button>
  </div>
</section>
```

**2. ACORDEÃO (Para regras e conceitos)**
- Usar SEMPRE que tiver 3+ itens relacionados
- Cada item se expande revelando conteúdo
- Ícone muda de + para - ao expandir
```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header">
      <span class="accordion-icon">+</span>
      <span>Regra 1: [Nome da regra]</span>
    </button>
    <div class="accordion-content">
      <p>[Explicação detalhada]</p>
      <div class="example-box">
        <strong>Exemplo:</strong> [texto]
      </div>
    </div>
  </div>
  <!-- Repetir para cada regra -->
</div>
```

**3. CARROSSEL DE IMAGENS (Para exemplos visuais)**
- Usar quando tiver 3+ imagens sequenciais
- Navegação com setas e dots
- Auto-play opcional
```html
<div class="carousel">
  <div class="carousel-track">
    <div class="carousel-slide">
      <img src="[IMAGEM 1]" alt="[descrição]">
      <p class="carousel-caption">[Legenda 1]</p>
    </div>
    <div class="carousel-slide">
      <img src="[IMAGEM 2]" alt="[descrição]">
      <p class="carousel-caption">[Legenda 2]</p>
    </div>
  </div>
  <button class="carousel-prev">←</button>
  <button class="carousel-next">→</button>
  <div class="carousel-dots">
    <span class="dot active"></span>
    <span class="dot"></span>
  </div>
</div>
```

**4. TABS (Para organizar conteúdo relacionado)**
- Usar para: Exemplos vs Contraexemplos, Teoria vs Prática
- Alterna entre visualizações sem scroll
```html
<div class="tabs-container">
  <div class="tabs-header">
    <button class="tab-button active" data-tab="exemplos">
      ✅ Exemplos Corretos
    </button>
    <button class="tab-button" data-tab="erros">
      ❌ Erros Comuns
    </button>
  </div>
  <div class="tabs-content">
    <div class="tab-panel active" id="exemplos">
      [Conteúdo de exemplos]
    </div>
    <div class="tab-panel" id="erros">
      [Conteúdo de erros]
    </div>
  </div>
</div>
```

**5. CARDS INTERATIVOS (Para questões e exercícios)**
- Cards flip (viram ao clicar)
- Frente: Pergunta | Verso: Resposta
```html
<div class="card-grid">
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <p class="question-number">Questão 1</p>
        <p class="question-text">[Enunciado da questão]</p>
      </div>
      <div class="flip-card-back">
        <p class="answer-label">Resposta:</p>
        <p class="answer-text">[Resposta com explicação]</p>
      </div>
    </div>
  </div>
</div>
```

**6. TIMELINE (Para sequência de passos)**
- Visualização linear de processos
- Conectores visuais entre etapas
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker">1</div>
    <div class="timeline-content">
      <h3>[Passo 1]</h3>
      <p>[Descrição]</p>
    </div>
  </div>
  <div class="timeline-connector"></div>
  <div class="timeline-item">
    <div class="timeline-marker">2</div>
    <div class="timeline-content">
      <h3>[Passo 2]</h3>
      <p>[Descrição]</p>
    </div>
  </div>
</div>
```

**7. MODAL DE VÍDEO (Para vídeos explicativos)**
- Thumbnail clicável que abre vídeo
- Player integrado com controles
```html
<div class="video-container">
  <div class="video-thumbnail" onclick="openVideoModal('video1')">
    <img src="[THUMBNAIL]" alt="Play video">
    <div class="play-button">
      <i class="fas fa-play"></i>
    </div>
    <p class="video-title">[Título do Vídeo]</p>
    <p class="video-duration">[Duração]</p>
  </div>
</div>

<div id="videoModal1" class="modal">
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <video controls>
      <source src="[VIDEO_URL]" type="video/mp4">
    </video>
  </div>
</div>
```

**8. PROGRESS BAR (Para gamificação)**
- Barra de progresso da aula
- Sempre visível no topo
```html
<div class="progress-container sticky-top">
  <div class="progress-bar" style="width: 0%" id="progressBar">
    <span class="progress-text">0% concluído</span>
  </div>
</div>
```

**9. ALERT BOXES (Para dicas e avisos)**
- 4 tipos: Dica, Atenção, Erro Comum, Macete
```html
<!-- DICA -->
<div class="alert alert-info">
  <i class="fas fa-lightbulb"></i>
  <div>
    <strong>💡 Dica do Professor:</strong>
    <p>[Conteúdo da dica]</p>
  </div>
</div>

<!-- ATENÇÃO -->
<div class="alert alert-warning">
  <i class="fas fa-exclamation-triangle"></i>
  <div>
    <strong>⚠️ Atenção:</strong>
    <p>[Conteúdo do aviso]</p>
  </div>
</div>

<!-- ERRO COMUM -->
<div class="alert alert-danger">
  <i class="fas fa-times-circle"></i>
  <div>
    <strong>❌ Erro Comum:</strong>
    <p>[Conteúdo do erro]</p>
  </div>
</div>

<!-- MACETE -->
<div class="alert alert-success">
  <i class="fas fa-brain"></i>
  <div>
    <strong>🧠 Macete Memorável:</strong>
    <p>[Conteúdo do macete]</p>
  </div>
</div>
```

**10. COMPARAÇÃO LADO A LADO**
- Split-screen para antes/depois, certo/errado
```html
<div class="comparison-container">
  <div class="comparison-side incorrect">
    <div class="comparison-header">❌ Incorreto</div>
    <div class="comparison-content">
      [Exemplo errado]
    </div>
  </div>
  <div class="comparison-divider">
    <span>VS</span>
  </div>
  <div class="comparison-side correct">
    <div class="comparison-header">✅ Correto</div>
    <div class="comparison-content">
      [Exemplo correto]
    </div>
  </div>
</div>
```

**11. QUIZ INTERATIVO**
- Múltipla escolha com feedback imediato
```html
<div class="quiz-container">
  <div class="quiz-question">
    <p class="question-text">[Pergunta]</p>
    <div class="quiz-options">
      <label class="quiz-option">
        <input type="radio" name="q1" value="a">
        <span class="option-label">A) [Alternativa A]</span>
      </label>
      <label class="quiz-option">
        <input type="radio" name="q1" value="b">
        <span class="option-label">B) [Alternativa B]</span>
      </label>
      <!-- Mais opções -->
    </div>
    <button class="quiz-submit" onclick="checkAnswer(1, 'b')">
      Verificar Resposta
    </button>
    <div class="quiz-feedback" id="feedback1" style="display:none;">
      [Feedback da resposta]
    </div>
  </div>
</div>
```

**12. STICKY SIDEBAR (Navegação lateral)**
- Menu lateral fixo com âncoras
```html
<div class="page-layout">
  <aside class="sidebar sticky">
    <h3>Nesta Aula</h3>
    <nav class="sidebar-nav">
      <a href="#intro">Introdução</a>
      <a href="#conceito">Conceito</a>
      <a href="#regras">Regras</a>
      <a href="#pratica">Prática</a>
      <a href="#resumo">Resumo</a>
    </nav>
  </aside>
  <main class="main-content">
    [Conteúdo da aula]
  </main>
</div>
```

---

## 🎯 ESTRUTURA DA AULA (COM ELEMENTOS HTML INDICADOS)

### 1. ABERTURA IMPACTANTE (2-3 minutos)

**USAR:**
- ✅ HERO SECTION (abertura visual)
- ✅ CARD com história/situação-problema
- ✅ PROGRESS BAR inicializado

**Conteúdo:**
- Hook inicial com situação-problema real
- Pergunta provocativa
- Preview dos benefícios
- **[PONTO DE IMAGEM 1]**: Ícone/ilustração principal do tópico (SVG ou PNG transparente, 400x400px)

**Posicionamento:**
```
[HERO SECTION com background gradiente]
  ↓
[CARD centralizado com hook]
  ↓
[PREVIEW em 3 colunas responsivas]
```

---

### 2. ATIVAÇÃO DO CONHECIMENTO PRÉVIO (3-5 minutos)

**USAR:**
- ✅ QUIZ INTERATIVO (diagnóstico)
- ✅ ALERT BOX tipo "info" (reflexão)

**Conteúdo:**
- Quiz de diagnóstico (3-5 perguntas)
- Reflexão guiada
- Conexão com conhecimentos anteriores

**Posicionamento:**
```
[QUIZ INTERATIVO centralizado]
  ↓
[ALERT BOX com reflexão]
  ↓
[Resultado automático com score]
```

---

### 3. APRESENTAÇÃO DO CONCEITO CENTRAL (10-15 minutos)

#### **Módulo 3.1 - Definição Clara**

**USAR:**
- ✅ CARD destacado (conceito principal)
- ✅ COMPARAÇÃO LADO A LADO (metáfora vs definição técnica)
- ✅ MODAL DE VÍDEO (explicação animada)

**Conteúdo:**
- Conceito em linguagem acessível
- Definição técnica (Bechara)
- Metáfora memorável
- **[PONTO DE VÍDEO 1]**: Vídeo explicativo 60-90s (embed YouTube/Vimeo ou MP4 local)

**Posicionamento:**
```
[CARD com conceito simples - DESTAQUE]
  ↓
[COMPARAÇÃO: Metáfora | Definição Técnica]
  ↓
[VIDEO MODAL - thumbnail centralizado]
```

---

#### **Módulo 3.2 - Regras e Aplicações**

**USAR:**
- ✅ ACORDEÃO (uma seção por regra)
- ✅ CARROSSEL DE IMAGENS (infográficos das regras)
- ✅ TABS (Exemplos vs Contraexemplos)
- ✅ ALERT BOXES (dicas e erros comuns)

**Conteúdo:**
- Liste todas as regras numeradas
- Para cada regra:
  * Explicação simples
  * Exemplo contextualizado (indústria: refino, plataforma, produção)
  * Contraexemplo (erro comum)
  * **[PONTO DE IMAGEM 2-5]**: Infográfico por regra (formato 1920x1080 horizontal)

**Posicionamento:**
```
[ACORDEÃO com 5 regras]
  Regra 1 (expandida por padrão)
    ↓ Conteúdo dentro:
    [Explicação em parágrafo]
    ↓
    [TABS: Exemplo | Contraexemplo]
    ↓
    [ALERT BOX tipo "warning" com pegadinha]
    ↓
    [IMAGEM infográfico centralizada]
  
  Regra 2 (collapsed)
  Regra 3 (collapsed)
  ...
```

---

#### **Módulo 3.3 - Mapa Mental**

**USAR:**
- ✅ IMAGEM RESPONSIVA full-width
- ✅ ZOOM ON CLICK (modal para ver detalhes)

**Conteúdo:**
- Mapa mental visual
- **[PONTO DE IMAGEM 6]**: Mapa mental completo (formato 1920x1080 ou quadrado 2000x2000)

**Posicionamento:**
```
[Título "Visão Geral do Tópico"]
  ↓
[IMAGEM grande do mapa mental]
  ↓
[Botão "Clique para ampliar" → abre MODAL]
  ↓
[ALERT BOX tipo "info": "Use este mapa para revisar"]
```

---

### 4. DEMONSTRAÇÃO PRÁTICA (10-12 minutos)

#### **Módulo 4.1 - Questões Comentadas CESGRANRIO**

**USAR:**
- ✅ CARDS FLIP (questões que viram)
- ✅ TIMELINE (passo a passo da resolução)
- ✅ TABS (3 níveis: Fácil | Média | Difícil)

**Conteúdo:**
- 3-4 questões reais da banca
- Análise passo a passo
- **[PONTO DE VÍDEO 2]**: Resolução comentada 2-3min (embed ou MP4)

**Posicionamento:**
```
[TABS: Fácil | Média | Difícil]
  ↓ Em cada tab:
  [CARD FLIP com questão]
    Frente: Enunciado + alternativas
    Verso: Resposta + explicação
  ↓
  [TIMELINE mostrando raciocínio passo a passo]
  ↓
  [VIDEO MODAL com resolução detalhada]
```

---

#### **Módulo 4.2 - Exercício Guiado**

**USAR:**
- ✅ WIZARD/STEPPER (passos numerados)
- ✅ INPUTS INTERATIVOS (aluno preenche)
- ✅ FEEDBACK DINÂMICO

**Posicionamento:**
```
[STEPPER: Passo 1 → 2 → 3 → 4]
  ↓
Passo 1: Leia o texto
  [CARD com texto]
  [Botão "Avançar"]
  ↓
Passo 2: Identifique palavras-chave
  [INPUT para usuário digitar]
  [Botão "Verificar"]
  [FEEDBACK]
  ↓
Passo 3: Escolha a resposta
  [QUIZ]
  ↓
Passo 4: Confirmação
  [ALERT BOX com resultado]
```

---

### 5. PRÁTICA INDEPENDENTE (8-10 minutos)

#### **Módulo 5.1 - Bateria de Exercícios**

**USAR:**
- ✅ QUIZ PROGRESSIVO (10 questões)
- ✅ PROGRESS BAR (mostra quantas fez)
- ✅ BADGES (conquistas)

**Posicionamento:**
```
[PROGRESS BAR: X/10 questões]
  ↓
[QUIZ com feedback imediato]
  ↓
[SCOREBOARD ao final]
  ↓
[BADGES desbloqueadas]
```

---

#### **Módulo 5.2 - Desafio Extra**

**USAR:**
- ✅ CARD destacado com borda dourada
- ✅ TIMER (opcional)

**Posicionamento:**
```
[CARD premium com borda animada]
  "🏆 DESAFIO MESTRE"
  [Questão difícil]
  [TIMER: 2 min]
  [Recompensa: +50 XP]
```

---

### 6. CONSOLIDAÇÃO E SÍNTESE (5 minutos)

#### **Módulo 6.1 - Resumo Visual**

**USAR:**
- ✅ CARROSSEL de cards (resumo em slides)
- ✅ CHECKLIST interativa
- ✅ BOTÃO de download/compartilhar

**Conteúdo:**
- **[PONTO DE IMAGEM 7]**: Card de resumo (formato 1080x1080 quadrado para compartilhar)

**Posicionamento:**
```
[CARROSSEL com 5 slides de resumo]
  Slide 1: Conceito principal
  Slide 2: Regras essenciais
  Slide 3: Macetes
  Slide 4: Armadilhas
  Slide 5: Checklist
  ↓
[BOTÃO "Baixar Resumo em PDF"]
[BOTÃO "Compartilhar no Instagram"]
```

---

#### **Módulo 6.2 - Macetes e Dicas**

**USAR:**
- ✅ ACORDEÃO (macetes)
- ✅ ALERT BOXES tipo "success"

**Posicionamento:**
```
[ACORDEÃO com 3-5 macetes]
  Macete 1: Acrônimo
  Macete 2: Rima
  Macete 3: História
  ↓
[ALERT BOX verde com frase-gatilho]
```

---

### 7. ENCERRAMENTO MOTIVACIONAL (2 minutos)

**USAR:**
- ✅ HERO SECTION (similar à abertura)
- ✅ CTA BUTTONS (próxima aula, simulado)
- ✅ MUSIC PLAYER (música de fixação - NOVO!)

**Conteúdo:**
- Recapitulação visual
- Próximos passos
- Call-to-action
- **[PONTO DE MÚSICA]**: Música educacional no estilo sertanejo universitário (embed player)

**Posicionamento:**
```
[HERO SECTION com conquista]
  "🎉 Parabéns! Você concluiu a aula!"
  [XP ganho visualmente]
  ↓
[MUSIC PLAYER com música tema da aula]
  "🎵 Ouça a música de fixação!"
  [Player embed Spotify/SoundCloud/MP3]
  ↓
[2 BOTÕES lado a lado]
  [Próxima Aula →] [Fazer Simulado 📝]
```

---

## 🎨 CSS OBRIGATÓRIO (PADRÃO VISUAL)

Inclua este CSS inline ou em <style> no HTML:

```css
/* PALETA DE CORES */
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --accent: #f6ad55;
  --success: #48bb78;
  --warning: #ed8936;
  --danger: #f56565;
  --info: #4299e1;
  --white: #ffffff;
  --gray-50: #f7fafc;
  --gray-100: #edf2f7;
  --gray-900: #1a202c;
}

/* GRADIENTES */
.gradient-bg {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}

/* HERO SECTION */
.hero-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 4rem 2rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

/* ACORDEÃO */
.accordion-item {
  background: white;
  border: 2px solid var(--gray-100);
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  padding: 1.5rem;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  transition: background 0.3s;
}

.accordion-header:hover {
  background: var(--gray-50);
}

.accordion-content {
  padding: 0 1.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-item.active .accordion-content {
  max-height: 1000px;
  padding: 1.5rem;
}

/* CARROSSEL */
.carousel {
  position: relative;
  max-width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  padding: 2rem;
}

/* TABS */
.tabs-header {
  display: flex;
  border-bottom: 2px solid var(--gray-100);
}

.tab-button {
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.tab-button.active {
  border-bottom-color: var(--primary);
  color: var(--primary);
}

/* CARDS */
.flip-card {
  background-color: transparent;
  width: 100%;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* ALERT BOXES */
.alert {
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

.alert-info {
  background: #e6f7ff;
  border-left: 4px solid var(--info);
}

.alert-success {
  background: #f0fdf4;
  border-left: 4px solid var(--success);
}

.alert-warning {
  background: #fffbeb;
  border-left: 4px solid var(--warning);
}

.alert-danger {
  background: #fef2f2;
  border-left: 4px solid var(--danger);
}

/* PROGRESS BAR */
.progress-container {
  width: 100%;
  height: 8px;
  background: var(--gray-100);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transition: width 0.3s ease;
}

/* QUIZ */
.quiz-option {
  display: block;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid var(--gray-100);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.quiz-option:hover {
  border-color: var(--primary);
  background: var(--gray-50);
}

.quiz-option input[type="radio"] {
  margin-right: 1rem;
}

/* RESPONSIVO */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .comparison-container {
    flex-direction: column;
  }
  
  .sidebar {
    display: none;
  }
}
```

---

## 📊 CHECKLIST DE QUALIDADE HTML

A aula está completa quando tiver:

**Elementos Visuais:**
- [ ] Hero Section de abertura
- [ ] Progress Bar funcionando
- [ ] Acordeão com regras (mín 3 itens)
- [ ] Tabs para organização
- [ ] Cards interativos (flip ou hover)
- [ ] Carrossel de imagens (se 3+ imagens)
- [ ] Timeline para processos sequenciais
- [ ] Alert boxes (mín 2 tipos diferentes)
- [ ] Comparação lado a lado (certo vs errado)
- [ ] Quiz interativo (mín 5 questões)
- [ ] Modal de vídeo
- [ ] Music player (música de fixação)
- [ ] Sidebar de navegação
- [ ] Botões CTA destacados

**Funcionalidades:**
- [ ] JavaScript para acordeões
- [ ] JavaScript para tabs
- [ ] JavaScript para carrossel
- [ ] JavaScript para quiz com feedback
- [ ] JavaScript para progress bar
- [ ] Responsivo (mobile-first)
- [ ] Animações suaves (transitions)

**Acessibilidade:**
- [ ] Alt text em todas as imagens
- [ ] Contraste adequado (mín 4.5:1)
- [ ] Navegação por teclado possível
- [ ] Labels em inputs
- [ ] ARIA labels onde necessário

---

## 📤 FORMATO DE SAÍDA

Gere a aula contendo:

1. **HTML COMPLETO** com:
   - Estrutura semântica (<header>, <main>, <section>, <article>)
   - CSS inline ou em <style>
   - JavaScript inline ou em <script>
   - Todos os componentes indicados acima
   
2. **LISTA DE RECURSOS VISUAIS**:
   - [IMAGEM 1]: Descrição + especificações
   - [IMAGEM 2-7]: Idem
   - [VÍDEO 1-2]: Roteiro + duração
   - [MÚSICA]: Letra + especificações (ver prompt específico)

3. **ASSETS NECESSÁRIOS**:
   - Fontes: Google Fonts (Poppins)
   - Ícones: Font Awesome ou Lucide
   - Imagens: Especificações para geração
   - Vídeos: Roteiros completos
   - Música: Letra + prompt Suno

---

## 🎯 EXEMPLO DE ESTRUTURA VISUAL DA PÁGINA:

```
┌─────────────────────────────────────────┐
│  PROGRESS BAR (sticky top)              │
├─────────────────────────────────────────┤
│  HERO SECTION (gradiente)               │
│  ┌─────────────────────────────────┐   │
│  │  Ícone Animado                   │   │
│  │  Título Grande                   │   │
│  │  Subtítulo                       │   │
│  │  [Botão CTA]                     │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  ┌──────┐  ┌────────────────────────┐  │
│  │SIDE  │  │ MAIN CONTENT           │  │
│  │BAR   │  │                        │  │
│  │(nav) │  │ QUIZ DIAGNÓSTICO       │  │
│  │      │  │ [cards interativos]    │  │
│  │Intro │  ├────────────────────────┤  │
│  │Regras│  │ ACORDEÃO (Regras)      │  │
│  │Prática│ │  ┌─ Regra 1 ──────┐   │  │
│  │Resumo│  │  │ [conteúdo]     │   │  │
│  │      │  │  │ TABS: Ex | Err │   │  │
│  │      │  │  │ [Imagem]       │   │  │
│  │      │  │  └────────────────┘   │  │
│  │      │  │  ┌─ Regra 2 ──────┐   │  │
│  │      │  │  └────────────────┘   │  │
│  │      │  ├────────────────────────┤  │
│  │      │  │ VÍDEO MODAL            │  │
│  │      │  │ [thumbnail + play]     │  │
│  │      │  ├────────────────────────┤  │
│  │      │  │ CARROSSEL EXEMPLOS     │  │
│  │      │  │ [← img1 img2 img3 →]  │  │
│  │      │  ├────────────────────────┤  │
│  │      │  │ TIMELINE (Técnica)     │  │
│  │      │  │  1 → 2 → 3 → 4        │  │
│  │      │  ├────────────────────────┤  │
│  │      │  │ QUIZ PRÁTICA (10q)     │  │
│  │      │  │ [progress: 5/10]       │  │
│  │      │  ├────────────────────────┤  │
│  │      │  │ RESUMO VISUAL          │  │
│  │      │  │ [Carrossel de cards]   │  │
│  │      │  ├────────────────────────┤  │
│  │      │  │ MÚSICA DE FIXAÇÃO      │  │
│  │      │  │ [🎵 Player embed]      │  │
│  │      │  └────────────────────────┘  │
│  └──────┘  └────────────────────────┘  │
├─────────────────────────────────────────┤
│  FOOTER (CTA próxima aula)              │
└─────────────────────────────────────────┘
```

---

AGORA GERE A AULA COMPLETA SEGUINDO TODAS ESTAS DIRETRIZES COM OS ELEMENTOS HTML ESPECIFICADOS!
```

---

## ✅ PRINCIPAIS MELHORIAS DA V2.0:

1. **Elementos HTML padronizados** - Aluno reconhece visualmente
2. **Componentes obrigatórios** - Consistência entre aulas
3. **Layout responsivo** - Mobile-first
4. **Interatividade máxima** - Engajamento alto
5. **Acessibilidade** - WCAG 2.1 compatível
6. **Performance** - CSS/JS otimizados
7. **Música de fixação** - Diferencial único (ver próximo arquivo)

---

**PRÓXIMO ARQUIVO**: PROMPT_MUSICA_SUNO.md com especificações para criar músicas educacionais!