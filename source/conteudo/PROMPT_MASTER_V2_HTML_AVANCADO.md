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
- Espaçamento, Interleaving, Retrieval Practice, Elaboração, Exemplificação concreta.
- **REGRA DE OURO:** Toda explicação teórica DEVE ser validada por um exemplo em frase (Antes/Depois, Certo/Errado ou Aplicação Real). NUNCA gere teoria pura sem exemplificação textual. Isso é inegociável para a clareza do aluno.
- **BRANDING:** O nome do sistema/SaaS é **"A Vaga É Minha"**. NUNCA use "Petrobras Quest" em títulos de PDF ou componentes de marca.
- **USB/PDF EXPORT:** Para garantir qualidade na exportação de resumos: 
    1. Forneça entre 3 a 5 imagens explicativas no `ModuleSummaryCarouselNew`.
    2. Informe `tituloAula`, `materia`, `profissao` e `moduloNome` nas props do componente.
    3. O sistema manterá o **aspect ratio original** das imagens. Prefira imagens horizontais (16:9) para PDFs mais elegantes.

---

## ✍️ DIRETRIZES DE ESTILO E REDAÇÃO (CLAREZA TOTAL)

**1. ZERO ABREVIATURAS (JAMAIS USE):**
- **REGRA:** Escreva SEMPRE por extenso. Abreviaturas confundem o aluno iniciante.
- **ERRADO:** "O VTD pede OD." / "O sujeito é o PA." / "Use o IIS."
- **CORRETO:** "O **Verbo Transitivo Direto** pede **Objeto Direto**." / "O sujeito é a **Partícula Apassivadora**."
- **OBS:** Mesmo que repita, escreva por extenso. Clareza > Concisão.

**2. TOM DE VOZ:**
- Use linguagem direta, ativa e encorajadora.
- Fale com o aluno ("Você vai perceber...", "Anote isso...").

---

## 🎯 ESTRUTURA DA AULA COM PADRÕES HTML

### IMPORTANTE: ELEMENTOS HTML OBRIGATÓRIOS

Para garantir uma experiência de aprendizado completa, toda aula DEVE seguir rigorosamente esta macro-estrutura:

**MACRO-ESTRUTURA OBRIGATÓRIA (INTRODUÇÃO → DESENVOLVIMENTO → FIM):**

1.  **INTRODUÇÃO RICA (Engajamento):**
    *   **Hero Section:** Título impactante + Subtítulo com promessa de valor.
    *   **Hook Visual:** Card ou Imagem que conecte o tema ao cotidiano da Petrobras.
    *   **Diagnóstico:** Quiz rápido ou pergunta reflexiva para ativar conhecimentos prévios.

2.  **DESENVOLVIMENTO OSTENSIVO (Conteúdo Denso):**
    *   **Regra de Ouro:** NUNCA usar apenas texto corrido. Use `ContentAccordion` para TUDO.
    *   **Granularidade:** Quebre tópicos em slides (Conceito → Exemplo → Exceção → Dica da Banca).
    *   **Multimídia:** Preveja 1 vídeo explicativo (placeholder interativo) a cada 2 módulos.

3.  **FIM CONSOLIDADO (Retenção):**
    *   **Resumo Visual:** Carrossel recapitulando os 3 pontos-chave da aula. Garanta de 3 a 5 imagens explicativas para permitir download em PDF. Use o componente `ModuleSummaryCarouselNew` com as props de contexto (`tituloAula`, `materia`, etc.) preenchidas. O título do PDF será **"A VAGA É MINHA"**.
    *   **Música de Fixação:** Player de música obrigatório para ancoragem emocional.
    *   **Próximos Passos:** Botões claros de ação (Simulado ou Próxima Aula).
    *   **Acessibilidade:** O template `AulaTemplate` já inclui controles de tamanho de fonte no header; garanta que seu conteúdo se adapte bem a aumentos de fonte.

---

#### 📦 COMPONENTES VISUAIS PADRÃO:

**1. HERO SECTION (Abertura)**
- Layout: Full-width com background gradiente
- Elementos: Título grande, subtítulo, ícone animado, botão CTA
- Posição: Topo da página

**⚠️ REGRA DE CONTRASTE (CRÍTICO):**
- NUNCA use cores claras (ex: `gray-300`, `muted`) diretamente em Modo Claro.
- SEMPRE use a variante `dark:` para cores claras (ex: `text-muted-foreground dark:text-gray-300`).
- Em Modo Claro, priorize cores sólidas e legíveis, sempre derivando do `primary` com opacidade quando necessário.

**2. CONTENT ACCORDION (OBRIGATÓRIO PARA CONTEÚDO DENSO)**
- **SUBSTITUI**: Listas longas, textos corridos ou acordeões simples.
- **QUANDO USAR**: SEMPRE que explicar regras, exceções ou conceitos com mais de 2 parágrafos.
- **ESTRUTURA**: Acordeão que expande revelando um CARROSSEL interno de slides ricos.
- **FILOSOFIA**: "Dividir para conquistar". Quebre o conteúdo em slides digeríveis.

```tsx
<ContentAccordion
  titulo="[TÍTULO DO TÓPICO - EX: Regra dos Verbos Impessoais]"
  icone="💡" // Emoji ou LucideIcon
  corIndicador="bg-[COR_DO_TEMA]-500" // Ex: bg-emerald-500, bg-indigo-500
  defaultOpen={true} // Primeiro item sempre aberto
  slides={[
    {
      titulo: '[SLIDE 1: O CONCEITO]',
      icone: '1️⃣', // BADGE NUMÉRICO OBRIGATÓRIO
      conteudo: (
        <div className="flex flex-col h-full space-y-4">
          {/* CARD DE CONCEITO (ENCAPSULADO) */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</span>
              <h3 className="font-bold text-lg">Definição Fundamental</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              [EXPLICAÇÃO CLARA E DIRETA - Mínimo 3 linhas]
            </p>
          </div>
          
          {/* CARD DE EXEMPLO */}
          <div className="bg-muted/30 rounded-xl border border-border/50 p-4">
            <p className="font-bold text-sm text-foreground mb-2">💡 Exemplo Prático:</p>
            <p className="italic text-muted-foreground">"[FRASE EXEMPLO]"</p>
          </div>
        </div>
      ),
    },
    {
      titulo: '[SLIDE 2: APLICAÇÃO]',
      icone: '2️⃣',
      conteudo: (
        <div className="flex flex-col h-full space-y-4">
          {/* CARD DE CERTO/ERRADO */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">CORRETO</div>
               <p className="text-green-800 dark:text-green-300 font-medium">✅ [FRASE CORRETA]</p>
               <p className="text-xs text-green-700/80 mt-1">[Motivo]</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">ERRADO</div>
               <p className="text-red-800 dark:text-red-300 font-medium">❌ [FRASE ERRADA]</p>
               <p className="text-xs text-red-700/80 mt-1">[Motivo]</p>
            </div>
          </div>
        </div>
      ),
    },
  ]}
/>
```

**3. CARD CAROUSEL (PARA LISTAS DE REGRAS/CASOS - MUITO IMPORTANTE)**
- **USAR**: Para apresentar múltiplos casos (ex: Casos Facultativos, Exceções) de forma horizontal e visual.
- **VANTAGEM**: Menos scroll vertical que o Accordion.
- **ESTRUTURA**: Carrossel de cards com ícone, título e descrição rica.
- **ÍCONES**: Use `icone` como ReactNode (ex: `<LuBuilding />`).
```tsx
<CardCarousel
    titulo="[Título da Seção - ex: Casos Facultativos]"
    subtitulo="[Subtítulo explicativo]"
    cards={[
        {
            icone: <LuUser className="text-xl text-indigo-500" />,
            titulo: "[Caso 1]",
            descricao: (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">[Explicação]</p>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2">
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">✅ Correto: [Exemplo]</p>
                    </div>
                </div>
            )
        },
        // ... mais cards
    ]}
/>
```

**⚠️ LEI DO ENRIQUECIMENTO OSTENSIVO:**
1. **ENCAPSULAMENTO TOTAL:** NADA fica solto na página. Todo conteúdo (texto, exemplo, dica) deve estar dentro de um `<div className="bg-card ...">` ou similar.
2. **INDEXAÇÃO VISUAL:** Use números (1, 2, 3...) em destaque para guiar a leitura.
3. **NADA DE TEXTO RASO:** Proibido usar apenas `<li>` ou `<p>` soltos.
4. **VISUAL FIRST:** Todo conceito deve ter um ÍCONE e uma COR semântica.
5. **CONTEXTO PETROBRAS:** Use exemplos relacionados a plataformas, refino, segurança, ética corporativa.

**3. CARROSSEL DE IMAGENS (Para sequências visuais)**
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
- **REQUISITO OBRIGATÓRIO:** Ao usar este componente para conceitos, fornecer MÍNIMO DE 5 EXEMPLOS VARIADOS (Array com seleção aleatória).
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

**8. QUIZ INTERATIVO (Para avaliação)**
- Cards de perguntas e respostas com feedback imediato
- **ESTILO OBRIGATÓRIO**: Deve possuir título com numeração em destaque (bolha numérica) para manter consistência visual com os módulos de lição (Ex: "5. Quiz de Fixação").
- Use a prop `numero={X}` no componente React para renderizar o número grande.
```html
<QuizInterativo
  questoes={...}
  titulo="Quiz de Fixação"
  icone="📝"
  numero={5} // OBRIGATÓRIO: Número do módulo
/>
```

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

```

**12. MUSIC PLAYER COM LYRICS (Para fixação musical)**
- Player de áudio com capa, controles e letra da música ao lado.
- Responsivo: Stack em mobile, Side-by-side em desktop.
```tsx
<MusicPlayerCard
    audioUrl="[URL_DO_AUDIO]"
    titulo="[TITULO_DA_MUSICA]"
    artista="[NOME_DO_PROFESSOR]"
    capaUrl="[URL_DA_CAPA]"
    lyrics={`
    (Verso 1)
    A letra da música vai aqui...
    Cada linha quebrada...
    
    (Refrão)
    Para o aluno cantar junto!
    `}
/>
```

**13. ESTRUTURA MODULAR ESCALÁVEL COM TABS, LOCKING E LAYOUT ENAP**

> [!IMPORTANT]
> **Regras de Espaçamento Obrigatórias (Inspiração ENAP):**
> - Container principal: `space-y-12`
> - Container da aula (`<main>`): `container mx-auto px-6 py-8 max-w-6xl` (redução de ~15% vs full-width)
> - Dentro de cada `TabsContent`: `space-y-16`
> - Cada seção de conteúdo: envolver em `bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm`
> - Títulos: `text-3xl md:text-4xl` com badge `w-12 h-12` numerado
> - Fontes Gerais: Corpo: `text-base md:text-lg`. Callouts: `text-lg`. Sub-labels: `text-base`.
> - Banner de Módulo: gradiente full-width com título `text-4xl md:text-5xl`

> [!IMPORTANT]
> **Regras de Locking Modular:**
> - Usar `MODULE_DEFS` array para definir módulos. NUNCA hardcodar condições como `currentProgress < 50`.
> - Usar `completedModules: Set<string>` para rastrear quais módulos foram concluídos.
> - `isModuleUnlocked(index)`: Módulo 0 = sempre. Módulo N = só se N-1 está em `completedModules`.
> - Tabs responsivas: `grid-cols-2 md:grid-cols-${N}` (mobile 2×2, desktop N colunas).
> - Tabs bloqueadas: `disabled:opacity-40 disabled:cursor-not-allowed` + ícone 🔒.
> - Tabs concluídas: ícone ✓ verde ao lado do título.
> - Ao completar quiz, salvar via `progressService.saveProgress()` por módulo.
>
> [!IMPORTANT]
> **Regras de Numeração e Estrutura (CRÍTICO):**
> - **Numeração Reiniciada:** A numeração dos cards de conteúdo (1, 2, 3...) DEVE reiniciar em CADA módulo. O primeiro card do Módulo 2 DEVE ser o número 1, e NÃO a continuação do Módulo 1.
> - **Resumo Numerado:** O componente de Resumo (Tabs com Vídeo/Música/Mapas) DEVE estar dentro de uma `<section>` com estilo de card (`bg-card ...`) e POSSUIR BADGE NUMÉRICO no título (ex: se for o 3º item do módulo, deve ter o badge "3").
> - **Quiz Numerado:** O Quiz Final de cada módulo DEVE ter um título com o mesmo peso visual e badge numérico dos outros cards (ex: "4. Quiz de Fixação"). Use a prop `numero={X}` no componente `QuizInterativo`.
> - **Card de Conclusão Manual (NOVO):** Ao final do ÚLTIMO módulo, adicione SEMPRE um card visualmente distinto ("Termine a leitura") que permita ao usuário marcar manualmente a conclusão, garantindo a sensação de "dever cumprido" e o trigger do XP.

```tsx
import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    QuizQuestion, 
    getRandomQuestions, 
    AlertBox, 
    VideoModal, 
    ImageCarousel, 
    ProgressIndicator, 
    FlipCard, 
    QuizInterativo, 
    TimelineItem, 
    ComparisonSide, 
    ModuleBanner,
    MusicPlayerCard,
    CardCarousel,
    StickyModuleNav
} from './shared';
// Ícones Lucide essenciais
import { LuBuilding, LuUser, LuCheck, LuX, LuBookOpen } from 'react-icons/lu';

// ── Definição dos Módulos (CONFIGURAÇÃO CENTRAL) ──
const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Teoria e Fundamentos' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'Prática e Estratégia' },
    // Adicionar mais módulos aqui...
] as const;

// Interface simplificada
interface AulaProps {
    onComplete: () => void;
    currentProgress: number;
    onUpdateProgress: (percent: number) => Promise<void>;
}

export default function AulaTemplate({ onComplete, currentProgress, onUpdateProgress }: AulaProps) {
    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [showCompletionBadge, setShowCompletionBadge] = useState(false);

    // Efeito para mostrar badge se já completou
    useEffect(() => {
        if (currentProgress >= 100) setShowCompletionBadge(true);
    }, [currentProgress]);

    // Determina se um módulo está desbloqueado
    const isModuleUnlocked = useCallback((moduleIndex: number) => {
        if (moduleIndex === 0) return true;
        const prevModuleId = MODULE_DEFS[moduleIndex - 1]?.id;
        return prevModuleId ? completedModules.has(prevModuleId) : false;
    }, [completedModules]);

    // Carrega progresso (Exemplo com localStorage)
    useEffect(() => {
        const saved = localStorage.getItem('aula_progress_[ID]');
        if (saved) {
            const parsed = JSON.parse(saved);
            const done = new Set<string>(parsed.completedModules || []);
            setCompletedModules(done);
            
            // Navega para o próximo módulo
            const lastDoneIndex = MODULE_DEFS.findIndex(m => done.has(m.id));
            if (lastDoneIndex >= 0 && lastDoneIndex < MODULE_DEFS.length - 1) {
                setActiveTab(MODULE_DEFS[lastDoneIndex + 1].id);
            }
        }
        // Inicializa Quiz
        setQuizQuestions(getRandomQuestions(QUIZ_POOL, 10));
    }, []);

    const handleModuleComplete = (moduleId: string, score: number) => {
        if (score >= 70) {
            const newSet = new Set(completedModules).add(moduleId);
            setCompletedModules(newSet);
            localStorage.setItem('aula_progress_[ID]', JSON.stringify({ completedModules: Array.from(newSet) }));
            
            const index = MODULE_DEFS.findIndex(m => m.id === moduleId);
            if (index < MODULE_DEFS.length - 1) {
                setActiveTab(MODULE_DEFS[index + 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                onComplete();
            }
        } else {
            alert("Você precisa de 70% de acerto para avançar!"); 
            // Ou use um Toast/Dialog mais elegante
        }
    };

    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-500">
            <ProgressIndicator scrollProgress={0} /> {/* Integrar com hook de scroll real */}

            {/* BADGE DE CONCLUSÃO (APARECE QUANDO O USUÁRIO TERMINA TUDO) */}
            {showCompletionBadge && (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-4 shadow-sm mb-6 animate-in slide-in-from-top-4 duration-700">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                        <LuCheck size={24} strokeWidth={3} />
                    </div>
                    <div>
                        <h3 className="text-green-800 dark:text-green-300 font-bold text-lg">Aula Concluída!</h3>
                        <p className="text-green-700 dark:text-green-400 text-sm">Parabéns! Você finalizou 100% desta aula.</p>
                    </div>
                </div>
            )}

            <Tabs value={activeTab} onValueChange={(val) => {
                const idx = MODULE_DEFS.findIndex(m => m.id === val);
                if (isModuleUnlocked(idx)) setActiveTab(val);
            }} className="w-full">
                
                <StickyModuleNav 
                    modules={Array.from(MODULE_DEFS)} 
                    activeTab={activeTab}
                    completedModules={completedModules}
                    isModuleUnlocked={isModuleUnlocked}
                />

                {/* === MÓDULO 1 === */}
                <TabsContent value="modulo-1" className="space-y-16">
                    <ModuleBanner 
                        numero={1} 
                        titulo="Teoria e Fundamentos"
                        descricao="Descrição do Módulo 1"
                        gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"
                    />

                    {/* ... CONTEÚDO DO MÓDULO 1 ... */}

                </Activity>

                {/* ÚLTIMO MÓDULO */}
                <Activity mode={activeTab === 'modulo-X' ? 'visible' : 'hidden'}>
                     {/* ... CONTEÚDO FINAL ... */}
                     
                     {/* CARD DE CONCLUSÃO MANUAL (Item final obrigatório) */}
                     <section className="mt-12 mb-8">
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-orange-900/5 border border-orange-100 dark:border-orange-800/30 rounded-2xl p-10 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-foreground">
                                    <LuBookOpen className="text-orange-500 text-3xl" /> Termine a leitura
                                </h3>
                                <p className="text-muted-foreground text-lg">
                                    Role até o final para marcar esta aula como concluída e ganhar XP
                                </p>
                            </div>
                            
                            <Button 
                                size="lg"
                                onClick={() => {
                                    setShowCompletionBadge(true);
                                    if (onComplete) onComplete();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 font-bold text-lg px-10 py-8 rounded-full shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
                            >
                                Marcar como Concluída
                            </Button>
                        </div>
                    </section>
                </Activity>
            </Tabs>
                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">1</span>
                            Conceito Interativo
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-lg text-muted-foreground">Explicação teórica aqui.</p>
                                <AlertBox type="info">Dica importante sobre o tema.</AlertBox>
                            </div>
                            <FlipCard 
                                frente={<div className="p-6 text-center">Pergunta?</div>} 
                                verso={<div className="p-6 text-center bg-blue-50 dark:bg-blue-900/10">Resposta!</div>} 
                            />
                        </div>
                    {/* Exemplo de CardCarousel para listas */}
                    <section className="space-y-6">
                        <CardCarousel
                            titulo="Regras Fundamentais"
                            subtitulo="Deslize para ver todas as regras."
                            cards={[
                                {
                                    icone: <LuBuilding className="text-xl text-indigo-500" />,
                                    titulo: "Regra 1",
                                    descricao: "Explicação da regra 1..."
                                },
                                {
                                    icone: <LuUser className="text-xl text-purple-500" />,
                                    titulo: "Regra 2",
                                    descricao: "Explicação da regra 2..."
                                }
                            ]}
                        />
                    </section>
                    </section>

                    {/* Exemplo de Timeline */}
                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <h2 className="text-2xl font-bold">Linha do Tempo / Passo-a-Passo</h2>
                        <TimelineItem passo={1} titulo="Passo 1" descricao="Descrição do passo 1." />
                        <TimelineItem passo={2} titulo="Passo 2" descricao="Descrição do passo 2." />
                    </section>

                    {/* Quiz Final do Módulo */}
                    <section className="mt-16">
                        <QuizInterativo 
                            questoes={quizQuestions} 
                            titulo="Quiz de Fixação" 
                            numero={4} /* OBRIGATÓRIO: Sequencial ao conteúdo */
                            onComplete={(score) => handleModuleComplete('modulo-1', score)} 
                        />
                    </section>

                    {/* SEÇÃO FINAL: CONCLUSÃO MANUAL (OBRIGATÓRIO NO FIM DO ÚLTIMO MÓDULO) */}
                    <section className="mt-12 mb-8">
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-orange-900/5 border border-orange-100 dark:border-orange-800/30 rounded-2xl p-10 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-foreground">
                                    <LuBookOpen className="text-orange-500 text-3xl" /> Termine a leitura
                                </h3>
                                <p className="text-muted-foreground text-lg">
                                    Role até o final para marcar esta aula como concluída e ganhar XP
                                </p>
                            </div>
                            
                            <Button 
                                size="lg"
                                onClick={() => {
                                    setShowCompletionBadge(true);
                                    onComplete();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 font-bold text-lg px-10 py-8 rounded-full shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
                            >
                                Marcar como Concluída
                            </Button>
                        </div>
                    </section>
                </TabsContent>

                {/* ... OUTROS MÓDULOS ... */}
            </Tabs>
        </div>
    );
}

// ── POOLS DE QUESTÕES ──
const QUIZ_POOL: QuizQuestion[] = [
    {
        id: 1,
        pergunta: "Pergunta de exemplo?",
        opcoes: [
            { label: 'A', valor: "Opção A" },
            { label: 'B', valor: "Opção B" }
        ],
        correta: 'A',
        explicacao: "Explicação da resposta."
    }
];
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

#### **Módulo 3.1 - O Conceito Central (Concept Presentation)**

**USAR:**
- ✅ BANNER DE CONCEITO (Ícone + Título + Subtítulo)
- ✅ DUPLO CARD (Metáfora vs Regra Técnica)
- ✅ FLIP CARD de Exemplo (Pergunta vs Resposta)

**Conteúdo:**
- **Conceito Visual (O Ímã):** Substantivo como centro gravitacional.
- **Metáfora:** Analogia do dia-a-dia (ex: Trem e vagões, Sol e planetas).
- **Regra Técnica:** Definição formal (Bechara).
- **Exemplo Interativo:** FlipCard com "Como completar?" (OBS: Criar array com 5+ exemplos aleatórios).

**Posicionamento (Grid 2 colunas):**
```
[CABEÇALHO: Ícone + "O Conceito Central"]
  ↓
[GRID 2 COLUNAS]
  [COL 1: O Ímã (Visual)]      [COL 2: Metáfora vs Técnica]
  (Ícone gigante animado)      (Card Metáfora | Card Regra)
  ↓
[FLIP CARD DE EXEMPLO (Logo abaixo)]
  Frente: "Copo e faca..."
  Verso: "Ambos podem estar corretos!"
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
- ✅ HERO SECTION (conquista visual)
- ✅ MUSIC PLAYER CARD (Com letras sincronizadas - OBRIGATÓRIO)
- ✅ CTA BUTTONS (Próxima Fase)

**Conteúdo:**
- Recapitulação emocional
- Paródia ou música de fixação
- **[PONTO DE MÚSICA]**: Paródia sobre o tema (ex: "O Verbo não para")
- Letra da música visível para acompanhar

**Posicionamento:**
```
[HERO SECTION: "Módulo Concluído!"]
  ↓
[MUSIC PLAYER CARD (Layout Split)]
  [Player Controls]  |  [Lyrics/Letra da Música]
  (Capa do Álbum)    |  (Scrollable text)
  ↓
[2 BOTÕES: Simulado 📝 | Próximo Módulo →]
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

  /* SEMANTIC VARIABLES (LIGHT MODE DEFAULT) */
  --bg-body: var(--gray-50);
  --bg-card: var(--white);
  --text-main: var(--gray-900);
  --text-muted: #718096;
  --border-color: var(--gray-100);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-body: #1a202c; /* gray-900 */
    --bg-card: #2d3748; /* gray-800 */
    --text-main: #f7fafc; /* gray-50 */
    --text-muted: #a0aec0; /* gray-400 */
    --border-color: #4a5568; /* gray-700 */
    --gray-50: #2d3748; /* Adjusting some grays for overlays */
    --gray-100: #4a5568;
  }
}

/* GRADIENTES */
.gradient-bg {
  background: var(--primary);
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
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  padding: 1.5rem;
  background: var(--bg-card);
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  transition: background 0.3s;
  color: var(--text-main);
}

.accordion-header:hover {
  background: var(--border-color);
  opacity: 0.9;
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
  border-bottom: 2px solid var(--border-color);
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

/* FLIP CARD FRONT */
.flip-card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background: var(--primary);
  color: white;
}

/* FLIP CARD BACK */
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background: var(--bg-card);
  color: var(--text-main);
  transform: rotateY(180deg);
  border: 2px solid var(--primary);
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

## 🧩 COMPONENTE QUIZ PADRÃO (React/Tailwind)

Use este componente como base para todos os quizzes. Note o uso de `index + 1` para a numeração das questões.

```tsx
function QuizInterativo({
    questoes,
    titulo,
    icone,
    onComplete,
}: {
    questoes: QuizQuestion[];
    titulo: string;
    icone: string;
    onComplete?: (score: number) => void;
}) {
    const [respostas, setRespostas] = useState<Record<number, string>>({});
    const [verificados, setVerificados] = useState<Record<number, boolean>>({});
    const [completed, setCompleted] = useState(false);

    const selecionar = (qId: number, label: string) => {
        if (verificados[qId]) return;
        setRespostas((prev) => ({ ...prev, [qId]: label }));
    };

    const verificar = (qId: number) => {
        setVerificados((prev) => ({ ...prev, [qId]: true }));
    };

    const totalCertas = questoes.filter((q) => verificados[q.id] && respostas[q.id] === q.correta).length;
    const totalVerificadas = Object.keys(verificados).length;

    useEffect(() => {
        if (totalVerificadas === questoes.length && !completed) {
            const acertos = questoes.filter((q) => verificados[q.id] && respostas[q.id] === q.correta).length;
            const aproveitamento = (acertos / questoes.length) * 100;
            if (aproveitamento >= 70) {
                setCompleted(true);
                if (onComplete) onComplete(Math.round(aproveitamento));
            }
        }
    }, [totalVerificadas, questoes, verificados, respostas, completed, onComplete]);

    return (
        <div className="bg-card rounded-xl border border-border p-6 my-8 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                <span>{icone}</span> {titulo}
            </h3>
            {totalVerificadas > 0 && (
                <div className="mb-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                        <span>Progresso: {totalVerificadas}/{questoes.length}</span>
                        <span>|</span>
                        <span className="text-green-500">✅ {totalCertas} certas</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-green-500 transition-all duration-500"
                            style={{ width: `${(totalVerificadas / questoes.length) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="space-y-6 mt-4">
                {questoes.map((q, index) => {
                    const respondida = verificados[q.id];
                    const acertou = respostas[q.id] === q.correta;
                    return (
                        <div key={q.id} className="border border-border/50 rounded-lg p-4 bg-muted/20">
                            <p className="text-foreground font-medium mb-3">
                                <span className="text-yellow-600 dark:text-yellow-500 mr-2">{index + 1}.</span>
                                {q.pergunta}
                            </p>
                            <div className="space-y-2">
                                {q.opcoes.map((op) => {
                                    const selecionada = respostas[q.id] === op.label;
                                    let borderColor = 'border-border hover:border-indigo-500';
                                    if (respondida) {
                                        if (op.label === q.correta) borderColor = 'border-green-500 bg-green-500/10';
                                        else if (selecionada) borderColor = 'border-red-500 bg-red-500/10';
                                        else borderColor = 'border-border opacity-50';
                                    } else if (selecionada) {
                                        borderColor = 'border-indigo-500 bg-indigo-500/10';
                                    }
                                    return (
                                        <button
                                            key={op.label}
                                            onClick={() => selecionar(q.id, op.label)}
                                            disabled={respondida}
                                            className={`w-full text-left px-4 py-3 rounded-lg border-2 ${borderColor} text-foreground text-sm transition-all duration-200`}
                                        >
                                            <span className="font-bold mr-2">{op.label})</span> {op.valor}
                                        </button>
                                    );
                                })}
                            </div>
                            {respostas[q.id] && !respondida && (
                                <button
                                    onClick={() => verificar(q.id)}
                                    className="mt-3 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition shadow-md"
                                >
                                    Verificar Resposta
                                </button>
                            )}
                            {respondida && (
                                <div className={`mt-3 p-3 rounded-lg text-sm ${acertou ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                                    <span className="font-bold">{acertou ? '🎉 Correto!' : '❌ Incorreto.'}</span>{' '}
                                    <span className="text-muted-foreground">{q.explicacao}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {totalVerificadas === questoes.length && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-500/30 text-center shadow-inner">
                    <p className="text-2xl font-bold text-foreground">
                        {totalCertas === questoes.length
                            ? '🏆 Perfeito!'
                            : totalCertas >= questoes.length / 2
                                ? '👏 Bom trabalho!'
                                : '📚 Continue estudando!'}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                        Você acertou {totalCertas} de {questoes.length} questões
                    </p>
                </div>
            )}
        </div>
    );
}
```

---

**PRÓXIMO ARQUIVO**: PROMPT_MUSICA_SUNO.md com especificações para criar músicas educacionais!
