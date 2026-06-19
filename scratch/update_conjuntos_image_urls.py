"""
Script: update_conjuntos_image_urls.py
Atualiza os imageUrl de AulaConjuntos.tsx para o novo padrão de pastas:
  /assets/images/matematica/conjuntos/modulo-N/mN-[tipo].png
E documenta os prompts Nano Banana Pro 2 como comentários no código.
"""

import re

FILE_PATH = r"c:\Workspace\petrobras-quest\src\components\aulas\matematica\AulaConjuntos.tsx"
BASE_URL = "/assets/images/matematica/conjuntos"

# Mapeamento completo: módulo → [imagem1, imagem2, imagem3]
# Cada imagem: (title, type, placeholderColor, filename, prompt_resumo)
MODULOS = {
    1: {
        "titulo": "Fundamentos de Conjuntos",
        "images": [
            {
                "title": "Mapa de Conjuntos — Conceitos Fundamentais",
                "type": "Mapa Mental",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m1-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme #FFFDF4, estilo concurseira. Cores: teal #00897B, rosa #E91E8C, âmbar #FF8F00. Node central (teal): CONJUNTOS. Ramos: Definição (coleção bem definida), Notação (x ∈ A, x ∉ A), Representação (extensão/compreensão/Venn), Cardinalidade (n(A)), Conjunto Vazio (∅ ⊂ A). Setas curvas, tipografia cursiva+bold caps. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pertinência, Inclusão e Igualdade",
                "type": "Passo a Passo",
                "color": "bg-teal-100 dark:bg-teal-900/30",
                "file": "m1-formula.png",
                "prompt": "Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: rosa #E91E8C, teal #00897B. Título no topo (caixa rosa): RELAÇÕES ENTRE CONJUNTOS. Fluxo com setas ↓: Caixa 1 (teal): PERTINÊNCIA ∈/∉ → elemento↔conjunto. Caixa 2 (rosa): INCLUSÃO ⊂/⊄ → conjunto↔conjunto. Caixa 3 (âmbar): IGUALDADE A=B → mesmos elementos. Destaque central: ∅ ⊂ A sempre! Exemplo: Se A={1,2,3}: 1∈A ✅  {1}∈A ❌  {1}⊂A ✅. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pegadinhas CESGRANRIO — ∈ vs ⊂",
                "type": "Dicas CESGRANRIO",
                "color": "bg-rose-100 dark:bg-rose-900/30",
                "file": "m1-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho #E53935 (errado), âmbar (aviso). Título: ⚠️ PEGADINHAS — CONJUNTOS. Grid 2 colunas: ✅ CORRETO | ❌ ERRADO: '1 ∈ {1,2,3}' vs '{1} ∈ {1,2,3}'; '{1} ⊂ {1,2,3}' vs '1 ⊂ {1,2,3}'; '∅ ⊂ A (sempre!)' vs '∅ ∈ A (nem sempre)'; '{∅} ≠ ∅' vs 'Confundir {∅} com ∅'. Caixa âmbar: ⚠️ ∈ é para ELEMENTO | ⊂ é para CONJUNTO. Caixa teal: 💡 MACETE: Chaves dos dois lados → use ⊂. Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
    2: {
        "titulo": "Operações com Conjuntos",
        "images": [
            {
                "title": "Mapa das 4 Operações — União, ∩, Diferença, Complementar",
                "type": "Mapa Mental",
                "color": "bg-blue-100 dark:bg-blue-900/30",
                "file": "m2-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: azul #1565C0, verde #43A047, rosa #E91E8C. Node central (azul): OPERAÇÕES. Ramos: União ∪ (todos os elementos, sem repetir), Interseção ∩ (elementos em comum), Diferença A-B (exclusivos de A), Complementar A' (fora de A no universo). Cada ramo com símbolo grande e exemplo curto. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Como Resolver com Diagrama de Venn",
                "type": "Passo a Passo",
                "color": "bg-indigo-100 dark:bg-indigo-900/30",
                "file": "m2-formula.png",
                "prompt": "Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: azul #1565C0, verde #43A047. Título (azul): ESTRATÉGIA DO DIAGRAMA DE VENN. Passos: 1️⃣ Desenhe os círculos. 2️⃣ Preencha a interseção A∩B primeiro. 3️⃣ Complete A exclusivo e B exclusivo. 4️⃣ Calcule o total: n(A∪B) = n(A)+n(B)-n(A∩B). Fórmula destacada em caixa azul grande. Exemplo numérico resolvido passo a passo. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pegadinhas CESGRANRIO — Operações",
                "type": "Dicas CESGRANRIO",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m2-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: verde (correto), vermelho (errado), âmbar (aviso). Título: ⚠️ PEGADINHAS — OPERAÇÕES. Grid: ✅ n(A∪B)=n(A)+n(B)-n(A∩B) vs ❌ n(A∪B)=n(A)+n(B). ✅ A-B ≠ B-A vs ❌ Diferença é comutativa. ✅ Complementar depende do Universo vs ❌ Complementar é fixo. Caixa âmbar: ⚠️ Sempre subtrair a interseção na fórmula da União! Caixa verde: 💡 MACETE: De dentro pra fora no Venn. Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
    3: {
        "titulo": "Diagramas de Venn",
        "images": [
            {
                "title": "Anatomia do Diagrama de Venn",
                "type": "Mapa Mental",
                "color": "bg-emerald-100 dark:bg-emerald-900/30",
                "file": "m3-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: verde #43A047, teal #00897B, âmbar. Node central: DIAGRAMA DE VENN. Ramos: 2 conjuntos (regiões I, II, III, IV), 3 conjuntos (7 regiões + exterior), Universo U (retângulo), Regiões exclusivas vs interseção. Diagrama visual dos círculos sobrepostos no centro da imagem com regiões coloridas. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Método de Resolução — 3 Conjuntos",
                "type": "Passo a Passo",
                "color": "bg-teal-100 dark:bg-teal-900/30",
                "file": "m3-formula.png",
                "prompt": "Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: verde #43A047, teal #00897B. Título: ESTRATÉGIA 3 CONJUNTOS. Passos numerados com setas: 1️⃣ Marque A∩B∩C (interseção tripla). 2️⃣ Marque as interseções duplas (AB, AC, BC) subtraindo a tripla. 3️⃣ Marque os exclusivos de cada conjunto. 4️⃣ Some tudo e compare com o total. Fórmula: n(A∪B∪C)=n(A)+n(B)+n(C)-n(A∩B)-n(A∩C)-n(B∩C)+n(A∩B∩C). Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pegadinhas — Venn na CESGRANRIO",
                "type": "Dicas CESGRANRIO",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m3-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar (aviso). Título: ⚠️ PEGADINHAS — VENN. Grid: ✅ Começa pela interseção tripla vs ❌ Começa pelos exclusivos. ✅ 'Somente A' = A exclusivo vs ❌ 'Somente A' = n(A). ✅ Nem A nem B = fora dos círculos vs ❌ Nem A nem B = zero. Caixa âmbar: ⚠️ 'Somente' vs 'Ao menos' são conceitos opostos! Caixa teal: 💡 MACETE: De dentro para fora — tripla primeiro! Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
    4: {
        "titulo": "Conjuntos Numéricos",
        "images": [
            {
                "title": "Hierarquia dos Conjuntos Numéricos",
                "type": "Mapa Mental",
                "color": "bg-rose-100 dark:bg-rose-900/30",
                "file": "m4-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: rosa #E91E8C, teal #00897B, verde #43A047. Hierarquia visual (círculos concêntricos desenhados à mão): ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Cada conjunto com definição curta e exemplos: ℕ={0,1,2...}, ℤ={...-2,-1,0,1,2...}, ℚ=frações, ℝ=todos. Irracionais (ℙ) ao lado com π, √2, √3. Setas de inclusão entre os conjuntos. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Diferença entre Racionais e Irracionais",
                "type": "Passo a Passo",
                "color": "bg-pink-100 dark:bg-pink-900/30",
                "file": "m4-formula.png",
                "prompt": "Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: rosa #E91E8C, teal #00897B. Título: RACIONAL vs IRRACIONAL. Dois blocos grandes lado a lado: RACIONAL ℚ (teal): pode ser escrito como p/q, dízima periódica ou finita. Ex: 1/3=0,333... | 1/2=0,5 | -7. IRRACIONAL ℙ (rosa): NÃO pode ser fração, dízima infinita não periódica. Ex: π=3,14159... | √2=1,41421... | e. Caixa central: ℝ = ℚ ∪ ℙ (sem sobreposição!). Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pegadinhas — Conjuntos Numéricos",
                "type": "Dicas CESGRANRIO",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m4-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar. Título: ⚠️ PEGADINHAS — NUMÉRICOS. Grid: ✅ 0 ∈ ℕ vs ❌ ℕ começa em 1. ✅ -5 ∈ ℤ mas -5 ∉ ℕ vs ❌ Todo inteiro é natural. ✅ √4=2 é racional vs ❌ Toda raiz é irracional. ✅ π é irracional vs ❌ π=22/7 (aproximação!). Caixa âmbar: ⚠️ 0 pertence a ℕ, ℤ, ℚ e ℝ mas não a ℙ! Caixa teal: 💡 MACETE: N⊂Z⊂Q⊂R — cada conjunto engloba o anterior. Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
    5: {
        "titulo": "Subconjuntos e Conjunto Potência",
        "images": [
            {
                "title": "Subconjuntos — Inclusão e Potência",
                "type": "Mapa Mental",
                "color": "bg-violet-100 dark:bg-violet-900/30",
                "file": "m5-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: lilás #7B1FA2, teal #00897B, âmbar. Node central: SUBCONJUNTOS. Ramos: Definição (A⊂B: todo elemento de A está em B), Subconjunto próprio (A⊊B: A⊂B e A≠B), Conjunto Potência P(A)=todos os subconjuntos, Fórmula 2^n (n=número de elementos), Propriedades (reflexiva, antissimétrica, transitiva). Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Construindo o Conjunto Potência",
                "type": "Passo a Passo",
                "color": "bg-purple-100 dark:bg-purple-900/30",
                "file": "m5-formula.png",
                "prompt": "Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: lilás, teal. Título: CONJUNTO DAS PARTES P(A). Exemplo central: A={a,b,c} → n(A)=3 → P(A) tem 2³=8 elementos. Lista visual em grid 2×4: ∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}. Regra destacada: P(A) sempre inclui ∅ e o próprio A. Destaque: Se n(A)=10 → P(A) tem 1024 subconjuntos! Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pegadinhas — Subconjuntos",
                "type": "Dicas CESGRANRIO",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m5-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar. Título: ⚠️ PEGADINHAS — SUBCONJUNTOS. Grid: ✅ ∅ ∈ P(A) (vazio é elemento de P(A)) vs ❌ ∅ ∉ P(A). ✅ A ∈ P(A) (A é elemento de P(A)) vs ❌ A ∉ P(A). ✅ {∅} tem 1 elemento (o vazio) vs ❌ {∅} é o conjunto vazio. ✅ n(P(A))=2^n vs ❌ n(P(A))=2n. Caixa âmbar: ⚠️ ∅ pertence ao conjunto potência de qualquer conjunto! Caixa teal: 💡 MACETE: P(A) tem 2^n elementos — dobre a cada novo elemento. Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
    6: {
        "titulo": "Princípio da Inclusão-Exclusão",
        "images": [
            {
                "title": "Fórmula da Inclusão-Exclusão",
                "type": "Mapa Mental",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m6-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: âmbar #FF8F00, teal #00897B, rosa. Node central: INCLUSÃO-EXCLUSÃO. Ramos: Para 2 conjuntos: n(A∪B)=n(A)+n(B)-n(A∩B), Para 3 conjuntos: fórmula completa com +n(A∩B∩C), Estratégia visual (diagrama de Venn), Aplicações (pesquisas, enquetes, grupos). Fórmula de 2 conjuntos em destaque grande. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Aplicando a Fórmula — Passo a Passo",
                "type": "Passo a Passo",
                "color": "bg-orange-100 dark:bg-orange-900/30",
                "file": "m6-formula.png",
                "prompt": "Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: âmbar, teal. Título: INCLUSÃO-EXCLUSÃO NA PRÁTICA. Problema modelo: 'De 100 alunos, 60 estudam Matemática, 50 estudam Português e 20 estudam ambas. Quantos estudam pelo menos uma?' Solução passo a passo: 1️⃣ n(A∪B)=60+50-20=90. 2️⃣ Somente Matemática=60-20=40. 3️⃣ Somente Português=50-20=30. 4️⃣ Nenhum=100-90=10. Diagrama de Venn com valores preenchidos. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pegadinhas — Inclusão-Exclusão",
                "type": "Dicas CESGRANRIO",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m6-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar. Título: ⚠️ PEGADINHAS — INCLUSÃO-EXCLUSÃO. Grid: ✅ Subtrair a interseção na União vs ❌ Somar tudo diretamente. ✅ 'Somente A'=n(A)-n(A∩B) vs ❌ 'Somente A'=n(A). ✅ 'Nenhum'=Total-n(A∪B) vs ❌ 'Nenhum'=0. ✅ 'Ao menos um'=n(A∪B) vs ❌ 'Ao menos um'=n(A)+n(B). Caixa âmbar: ⚠️ Diferença entre 'somente um' e 'ao menos um'! Caixa teal: 💡 MACETE: Sempre preencha o Venn de dentro pra fora. Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
    7: {
        "titulo": "Naturais, Inteiros e Racionais (ℕ, ℤ, ℚ)",
        "images": [
            {
                "title": "ℕ, ℤ, ℚ — Mapa Comparativo",
                "type": "Mapa Mental",
                "color": "bg-blue-100 dark:bg-blue-900/30",
                "file": "m7-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: azul #1565C0, verde #43A047, teal. Três blocos principais conectados por setas de inclusão: ℕ (azul claro): {0,1,2,3,...} — positivos e zero, sem frações, sem negativos. ℤ (azul médio): {...,-2,-1,0,1,2,...} — inclui negativos, sem frações. ℚ (azul escuro): a/b com b≠0, inclui dízimas periódicas e finitas. Destaque: ℕ⊂ℤ⊂ℚ com setas visuais de inclusão. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Operações nos Conjuntos ℕ, ℤ, ℚ",
                "type": "Passo a Passo",
                "color": "bg-cyan-100 dark:bg-cyan-900/30",
                "file": "m7-formula.png",
                "prompt": "Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: azul, teal. Título: FECHAMENTO DAS OPERAÇÕES. Tabela visual 4×3: Operação | ℕ | ℤ | ℚ. Adição: ✅ | ✅ | ✅. Subtração: ❌ | ✅ | ✅. Multiplicação: ✅ | ✅ | ✅. Divisão: ❌ | ❌ | ✅ (b≠0). Exemplo: 3-5=-2 ∉ ℕ mas ∈ ℤ. 3÷4=0,75 ∉ ℤ mas ∈ ℚ. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pegadinhas — ℕ, ℤ, ℚ",
                "type": "Dicas CESGRANRIO",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m7-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Título: ⚠️ PEGADINHAS — ℕ ℤ ℚ. Grid: ✅ 0 ∈ ℕ vs ❌ ℕ só tem positivos. ✅ -3 ∈ ℤ mas ∉ ℕ vs ❌ Todo número inteiro é natural. ✅ 0,333...=1/3 ∈ ℚ vs ❌ 0,333... é irracional. ✅ ℤ inclui negativos vs ❌ ℤ só tem positivos e zero. Caixa âmbar: ⚠️ 0 (zero) pertence a ℕ, ℤ e ℚ! Caixa teal: 💡 MACETE: Inteiros = Naturais + Negativos | Racionais = Inteiros + Frações. Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
    8: {
        "titulo": "Irracionais e Reais (ℙ e ℝ)",
        "images": [
            {
                "title": "Irracionais e a Reta Real ℝ",
                "type": "Mapa Mental",
                "color": "bg-emerald-100 dark:bg-emerald-900/30",
                "file": "m8-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: verde #43A047, teal #00897B, rosa. Node central: IRRACIONAIS ℙ e REAIS ℝ. Ramos: Irracional (dízima infinita não periódica: π, √2, √3, e, φ), Real = ℚ ∪ ℙ, Reta real (todos os pontos), Propriedades (denso, completo, ordenado). Visual da reta numérica com pontos racionais e irracionais marcados. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Como Identificar Irracionais",
                "type": "Passo a Passo",
                "color": "bg-green-100 dark:bg-green-900/30",
                "file": "m8-formula.png",
                "prompt": "Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: verde, teal. Título: É IRRACIONAL? Fluxograma de decisão: Pergunta 1: 'É uma raiz quadrada?' → Se sim: 'O radicando é quadrado perfeito?' → Sim=Racional, Não=Irracional. Pergunta 2: 'É π, e ou φ?' → Sim=Irracional. Exemplos: √4=2 Racional ✅. √2=1,41421... Irracional ✅. √9=3 Racional ✅. π=3,14159... Irracional ✅. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pegadinhas — Irracionais e ℝ",
                "type": "Dicas CESGRANRIO",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m8-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Título: ⚠️ PEGADINHAS — IRRACIONAIS. Grid: ✅ √4=2 é racional vs ❌ Toda raiz é irracional. ✅ π é irracional vs ❌ π=22/7 (22/7 é só aproximação!). ✅ 0,101001000... é irracional vs ❌ Toda dízima é racional. ✅ ℝ=ℚ∪ℙ (sem sobreposição) vs ❌ Racional pode ser irracional. Caixa âmbar: ⚠️ Raízes de quadrados perfeitos são racionais! Caixa teal: 💡 MACETE: Irracional = dízima infinita SEM período repetido. Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
    9: {
        "titulo": "Leis de De Morgan",
        "images": [
            {
                "title": "Leis de De Morgan — Mapa",
                "type": "Mapa Mental",
                "color": "bg-rose-100 dark:bg-rose-900/30",
                "file": "m9-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: rosa #E91E8C, azul #1565C0, teal. Node central: LEIS DE DE MORGAN. Ramos: 1ª Lei: (A∪B)'=A'∩B' (complementar da união = interseção dos complementares), 2ª Lei: (A∩B)'=A'∪B' (complementar da interseção = união dos complementares), Aplicações (lógica, banco de dados), Analogia lógica (NÃO(P OU Q) = NÃO P E NÃO Q). Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Aplicando De Morgan — Exemplos",
                "type": "Passo a Passo",
                "color": "bg-pink-100 dark:bg-pink-900/30",
                "file": "m9-formula.png",
                "prompt": "Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: rosa, azul. Título: DE MORGAN NA PRÁTICA. Duas seções com caixas coloridas. SEÇÃO 1 (1ª Lei): (A∪B)'=A'∩B'. Passo 1: Se A={1,2,3}, B={3,4,5}, U={1,2,3,4,5,6}. Passo 2: A∪B={1,2,3,4,5} → (A∪B)'={6}. Passo 3: A'={4,5,6}, B'={1,2,6} → A'∩B'={6} ✅. SEÇÃO 2 (2ª Lei): (A∩B)'=A'∪B'. Verificação com mesmo exemplo. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Pegadinhas — De Morgan",
                "type": "Dicas CESGRANRIO",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m9-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Título: ⚠️ PEGADINHAS — DE MORGAN. Grid: ✅ (A∪B)'=A'∩B' vs ❌ (A∪B)'=A'∪B'. ✅ (A∩B)'=A'∪B' vs ❌ (A∩B)'=A'∩B'. ✅ Complemento muda ∪↔∩ vs ❌ Complemento mantém a operação. ✅ De Morgan vale na lógica tb vs ❌ De Morgan só para conjuntos. Caixa âmbar: ⚠️ O erro mais comum: não inverter a operação ao distribuir o complementar! Caixa teal: 💡 MACETE: Complemento distribui e INVERTE: ∪ vira ∩ e vice-versa. Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
    10: {
        "titulo": "Simulado Final — Conjuntos",
        "images": [
            {
                "title": "Revisão Geral — Mapa de Conjuntos Completo",
                "type": "Mapa Mental",
                "color": "bg-violet-100 dark:bg-violet-900/30",
                "file": "m10-conceito.png",
                "prompt": "Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: lilás #7B1FA2, teal #00897B, âmbar. Node central: CONJUNTOS — REVISÃO COMPLETA. Grandes ramos: Fundamentos (∈,⊂,∅,n(A)), Operações (∪,∩,-,'), Venn (2 e 3 conjuntos), Numéricos (ℕ⊂ℤ⊂ℚ⊂ℝ), De Morgan (2 leis). Mini-fórmulas em cada ramo. Visual colorido de mapa completo para revisão. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Fórmulas Essenciais para a Prova",
                "type": "Passo a Passo",
                "color": "bg-indigo-100 dark:bg-indigo-900/30",
                "file": "m10-formula.png",
                "prompt": "Diagrama vertical 9:16, fundo branco, estilo concurseira. Cores: lilás, teal. Título: FÓRMULAS DA PROVA. Lista numerada com caixas coloridas: 1️⃣ n(A∪B)=n(A)+n(B)-n(A∩B). 2️⃣ n(P(A))=2^n(A). 3️⃣ n(A∪B∪C)=n(A)+n(B)+n(C)-n(AB)-n(AC)-n(BC)+n(ABC). 4️⃣ (A∪B)'=A'∩B' e (A∩B)'=A'∪B'. 5️⃣ A-B=A∩B'. Cada fórmula com exemplo numérico em fonte mono destacada. Tag: MATEMÁTICA • PETROBRAS.",
            },
            {
                "title": "Guia Antifalha CESGRANRIO",
                "type": "Dicas CESGRANRIO",
                "color": "bg-amber-100 dark:bg-amber-900/30",
                "file": "m10-dicas.png",
                "prompt": "Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar. Título: ⚠️ GUIA ANTIFALHA — CESGRANRIO. Grid com os 5 erros mais comuns: ✅ ∈ para elemento | ⊂ para conjunto. ✅ 0 ∈ ℕ. ✅ Subtrair interseção na fórmula da União. ✅ (A∪B)'=A'∩B' (operação INVERTE). ✅ Venn: de dentro para fora. vs ❌ cada um. Caixa âmbar grande: ⚠️ CHECKLIST ANTES DE MARCAR A RESPOSTA. Caixa teal: 💡 Releia o enunciado buscando 'somente', 'ao menos', 'nenhum'. Tag: MATEMÁTICA • PETROBRAS.",
            },
        ],
    },
}


def build_images_block(modulo_n, images_data):
    lines = []
    for img in images_data:
        lines.append(f"""                  {{
                    title: "{img['title']}",
                    type: "{img['type']}",
                    placeholderColor: "{img['color']}",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // {img['prompt']}
                    imageUrl: "{BASE_URL}/modulo-{modulo_n}/{img['file']}",
                  }},""")
    return "\n".join(lines)


def update_file():
    with open(FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    for modulo_n, data in MODULOS.items():
        # Pattern para encontrar o bloco images: [ ... ] dentro do resumoVisual do módulo N
        # Usamos marcadores de contexto para identificar o módulo correto
        modulo_titulo = data["titulo"]
        images_block = build_images_block(modulo_n, data["images"])

        # Regex para encontrar o bloco de images dentro do resumoVisual do módulo correto
        # O padrão é: images: [ \n ... \n                ],
        # dentro do contexto do módulo N (identificado pela string moduloNome: "Módulo N")
        pattern = re.compile(
            r'(moduloNome:\s*"Módulo\s*' + str(modulo_n) + r'",\s*'
            r'tituloAula:\s*"Conjuntos",\s*'
            r'materia:\s*"Matemática",\s*'
            r'images:\s*\[)(.*?)(\s*\],)',
            re.DOTALL
        )

        def replacer(m):
            return m.group(1) + "\n" + images_block + "\n                " + m.group(3)

        new_content, count = re.subn(pattern, replacer, content, count=1)
        if count > 0:
            content = new_content
            print(f"  ✅ Módulo {modulo_n} ({modulo_titulo}) — imagens atualizadas")
        else:
            print(f"  ⚠️  Módulo {modulo_n} — padrão não encontrado, pulando")

    # Salvar o arquivo atualizado
    with open(FILE_PATH, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\n✅ Arquivo salvo: {FILE_PATH}")


if __name__ == "__main__":
    print("🖼️  Atualizando imageUrls de AulaConjuntos.tsx para novo padrão de pastas...\n")
    update_file()
    print("\n🎯 Próximos passos:")
    print("  1. Gere as imagens no Nano Banana Pro 2 usando os prompts nos comentários")
    print(f"  2. Salve-as em /public/assets/images/matematica/conjuntos/modulo-N/")
    print("  3. Verifique a compilação: npx tsc --noEmit")
