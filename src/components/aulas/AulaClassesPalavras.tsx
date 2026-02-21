'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    QuizQuestion,
    getRandomQuestions,
    AlertBox,
    FlipCard,
    QuizInterativo,
    TimelineItem,
    ModuleBanner,
    CardCarousel,
    StickyModuleNav,
    ModuleSectionHeader,
    ContentAccordion,
    LessonTabs,
    AulaProps,
    VideoModal
} from './shared';
import {
    LuCheck,
    LuBookOpen,
    LuTag,
    LuActivity,
    LuLink2,
    LuNavigation,
    LuZap,
    LuHash,
    LuShield,
    LuShuffle,
    LuVideo,
    LuHeadphones,
    LuImage,
    LuArrowDown
} from 'react-icons/lu';

// ── Definição dos 5 Módulos ──
const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Verbo & Substantivo' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'Pronome & Adjetivo' },
    { id: 'modulo-3', label: 'Módulo 3', titulo: 'Conjunção & Preposição' },
    { id: 'modulo-4', label: 'Módulo 4', titulo: 'Advérbio & Artigo' },
    { id: 'modulo-5', label: 'Módulo 5', titulo: 'Numeral, Interjeição & Lab' }
] as const;

// ══════════════════════════════════════════════════════════════════════════
// VETORES ESTÁTICOS DE CONJUGAÇÃO (Para otimizar e limpar o JSX)
// ══════════════════════════════════════════════════════════════════════════

const renderConj = (p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, prefixo: string = '') => {
    const w = prefixo ? 'w-16' : 'w-10';
    return (
        <div className="text-base space-y-2 font-mono">
            <p className="flex gap-2"><span className={`text-muted-foreground ${w} text-right`}>{prefixo ? `(${prefixo}) ` : ''}eu</span> <span className="font-semibold text-foreground text-left">{p1}</span></p>
            <p className="flex gap-2"><span className={`text-muted-foreground ${w} text-right`}>{prefixo ? `(${prefixo}) ` : ''}tu</span> <span className="font-semibold text-foreground text-left">{p2}</span></p>
            <p className="flex gap-2"><span className={`text-muted-foreground ${w} text-right`}>{prefixo ? `(${prefixo}) ` : ''}ele</span> <span className="font-semibold text-foreground text-left">{p3}</span></p>
            <p className="flex gap-2"><span className={`text-muted-foreground ${w} text-right`}>{prefixo ? `(${prefixo}) ` : ''}nós</span> <span className="font-semibold text-foreground text-left">{p4}</span></p>
            <p className="flex gap-2"><span className={`text-muted-foreground ${w} text-right`}>{prefixo ? `(${prefixo}) ` : ''}vós</span> <span className="font-semibold text-foreground text-left">{p5}</span></p>
            <p className="flex gap-2"><span className={`text-muted-foreground ${w} text-right`}>{prefixo ? `(${prefixo}) ` : ''}eles</span> <span className="font-semibold text-foreground text-left">{p6}</span></p>
        </div>
    );
};

const criarCard = (icone: React.ReactNode, titulo: string, conj: React.ReactNode, tipo: 'reg' | 'irreg' = 'reg') => ({
    icone,
    titulo: <span className="flex items-center gap-2">{titulo} {tipo === 'irreg' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 font-semibold uppercase tracking-wide border border-red-500/20">Irregular</span>}</span> as any,
    descricao: conj,
    corFundo: tipo === 'irreg' ? 'bg-red-500/5 dark:bg-red-500/10' : undefined
});

const i1 = <span className="font-black text-base text-blue-500">-ar</span>;
const i2 = <span className="font-black text-base text-emerald-500">-er</span>;
const i3 = <span className="font-black text-base text-rose-500">-ir</span>;
const iIr = <span className="font-black text-base text-amber-500">✦</span>;

const CONJ_SLIDES = [
    {
        titulo: '1. Presente do Indicativo', icone: '🕒', conteudo: (
            <CardCarousel titulo="" itemsPerView={3} cards={[
                criarCard(i1, "Estudar", renderConj("estudo", "estudas", "estuda", "estudamos", "estudais", "estudam")),
                criarCard(i2, "Vender", renderConj("vendo", "vendes", "vende", "vendemos", "vendeis", "vendem")),
                criarCard(i3, "Partir", renderConj("parto", "partes", "parte", "partimos", "partis", "partem")),
                criarCard(iIr, "Ser", renderConj("sou", "és", "é", "somos", "sois", "são"), "irreg"),
                criarCard(iIr, "Ir", renderConj("vou", "vais", "vai", "vamos", "ides", "vão"), "irreg"),
                criarCard(iIr, "Vir", renderConj("venho", "vens", "vem", "vimos", "vindes", "vêm"), "irreg"),
                criarCard(iIr, "Pôr", renderConj("ponho", "pões", "põe", "pomos", "pondes", "põem"), "irreg"),
            ]} />
        )
    },
    {
        titulo: '2. Pretérito Perfeito do Indicativo', icone: '✅', conteudo: (
            <CardCarousel titulo="" itemsPerView={3} cards={[
                criarCard(i1, "Estudar", renderConj("estudei", "estudaste", "estudou", "estudamos", "estudastes", "estudaram")),
                criarCard(i2, "Vender", renderConj("vendi", "vendeste", "vendeu", "vendemos", "vendestes", "venderam")),
                criarCard(i3, "Partir", renderConj("parti", "partiste", "partiu", "partimos", "partistes", "partiram")),
                criarCard(iIr, "Ser/Ir", renderConj("fui", "foste", "foi", "fomos", "fostes", "foram"), "irreg"),
                criarCard(iIr, "Vir", renderConj("vim", "vieste", "veio", "viemos", "viestes", "vieram"), "irreg"),
                criarCard(iIr, "Pôr", renderConj("pus", "puseste", "pôs", "pusemos", "pusestes", "puseram"), "irreg"),
                criarCard(iIr, "Ver", renderConj("vi", "viste", "viu", "vimos", "vistes", "viram"), "irreg"),
            ]} />
        )
    },
    {
        titulo: '3. Pretérito Imperfeito do Indicativo', icone: '🎞️', conteudo: (
            <CardCarousel titulo="" itemsPerView={3} cards={[
                criarCard(i1, "Estudar", renderConj("estudava", "estudavas", "estudava", "estudávamos", "estudáveis", "estudavam")),
                criarCard(i2, "Vender", renderConj("vendia", "vendias", "vendia", "vendíamos", "vendíeis", "vendiam")),
                criarCard(i3, "Partir", renderConj("partia", "partias", "partia", "partíamos", "partíeis", "partiam")),
                criarCard(iIr, "Ser", renderConj("era", "eras", "era", "éramos", "éreis", "eram"), "irreg"),
                criarCard(iIr, "Vir", renderConj("vinha", "vinhas", "vinha", "vínhamos", "vínheis", "vinham"), "irreg"),
                criarCard(iIr, "Pôr", renderConj("punha", "punhas", "punha", "púnhamos", "púnheis", "punham"), "irreg"),
            ]} />
        )
    },
    {
        titulo: '4. Pretérito Mais-Que-Perfeito do Ind.', icone: '🏛️', conteudo: (
            <CardCarousel titulo="" itemsPerView={3} cards={[
                criarCard(i1, "Estudar", renderConj("estudara", "estudaras", "estudara", "estudáramos", "estudáreis", "estudaram")),
                criarCard(i2, "Vender", renderConj("vendera", "venderas", "vendera", "vendêramos", "vendêreis", "venderam")),
                criarCard(i3, "Partir", renderConj("partira", "partiras", "partira", "partíramos", "partíreis", "partiram")),
                criarCard(iIr, "Ser/Ir", renderConj("fora", "foras", "fora", "fôramos", "fôreis", "foram"), "irreg"),
                criarCard(iIr, "Vir", renderConj("viera", "vieras", "viera", "viéramos", "viéreis", "vieram"), "irreg"),
                criarCard(iIr, "Pôr", renderConj("pusera", "puseras", "pusera", "puséramos", "puséreis", "puseram"), "irreg"),
            ]} />
        )
    },
    {
        titulo: '5. Futuro do Presente do Indicativo', icone: '🚀', conteudo: (
            <CardCarousel titulo="" itemsPerView={3} cards={[
                criarCard(i1, "Estudar", renderConj("estudarei", "estudarás", "estudará", "estudaremos", "estudareis", "estudarão")),
                criarCard(i2, "Vender", renderConj("venderei", "venderás", "venderá", "venderemos", "vendereis", "venderão")),
                criarCard(i3, "Partir", renderConj("partirei", "partirás", "partirá", "partiremos", "partireis", "partirão")),
                criarCard(iIr, "Ser", renderConj("serei", "serás", "será", "seremos", "sereis", "serão"), "irreg"),
                criarCard(iIr, "Vir", renderConj("virei", "virás", "virá", "viremos", "vireis", "virão"), "irreg"),
                criarCard(iIr, "Pôr", renderConj("porei", "porás", "porá", "poremos", "poreis", "porão"), "irreg"),
            ]} />
        )
    },
    {
        titulo: '6. Futuro do Pretérito do Indicativo', icone: '🤔', conteudo: (
            <CardCarousel titulo="" itemsPerView={3} cards={[
                criarCard(i1, "Estudar", renderConj("estudaria", "estudarias", "estudaria", "estudaríamos", "estudaríeis", "estudariam")),
                criarCard(i2, "Vender", renderConj("venderia", "venderias", "venderia", "venderíamos", "venderíeis", "venderiam")),
                criarCard(i3, "Partir", renderConj("partiria", "partirias", "partiria", "partiríamos", "partiríeis", "partiriam")),
                criarCard(iIr, "Ser", renderConj("seria", "serias", "seria", "seríamos", "seríeis", "seriam"), "irreg"),
                criarCard(iIr, "Vir", renderConj("viria", "virias", "viria", "viríamos", "viríeis", "viriam"), "irreg"),
                criarCard(iIr, "Pôr", renderConj("poria", "porias", "poria", "poríamos", "poríeis", "poriam"), "irreg"),
            ]} />
        )
    },
    {
        titulo: '7. Presente do Subjuntivo', icone: '💭', conteudo: (
            <CardCarousel titulo="" itemsPerView={3} cards={[
                criarCard(i1, "Estudar", renderConj("estude", "estudes", "estude", "estudemos", "estudeis", "estudem", "que")),
                criarCard(i2, "Vender", renderConj("venda", "vendas", "venda", "vendamos", "vendais", "vendam", "que")),
                criarCard(i3, "Partir", renderConj("parta", "partas", "parta", "partamos", "partais", "partam", "que")),
                criarCard(iIr, "Ser", renderConj("seja", "sejas", "seja", "sejamos", "sejais", "sejam", "que"), "irreg"),
                criarCard(iIr, "Vir", renderConj("venha", "venhas", "venha", "venhamos", "venhais", "venham", "que"), "irreg"),
                criarCard(iIr, "Pôr", renderConj("ponha", "ponhas", "ponha", "ponhamos", "ponhais", "ponham", "que"), "irreg"),
                criarCard(iIr, "Ver", renderConj("veja", "vejas", "veja", "vejamos", "vejais", "vejam", "que"), "irreg"),
            ]} />
        )
    },
    {
        titulo: '8. Pretérito Imperfeito do Subjuntivo', icone: '🔮', conteudo: (
            <CardCarousel titulo="" itemsPerView={3} cards={[
                criarCard(i1, "Estudar", renderConj("estudasse", "estudasses", "estudasse", "estudássemos", "estudásseis", "estudassem", "se")),
                criarCard(i2, "Vender", renderConj("vendesse", "vendesses", "vendesse", "vendêssemos", "vendêsseis", "vendessem", "se")),
                criarCard(i3, "Partir", renderConj("partisse", "partisses", "partisse", "partíssemos", "partísseis", "partissem", "se")),
                criarCard(iIr, "Ser / Ir", renderConj("fosse", "fosses", "fosse", "fôssemos", "fôsseis", "fossem", "se"), "irreg"),
                criarCard(iIr, "Vir", renderConj("viesse", "viesses", "viesse", "viéssemos", "viésseis", "viessem", "se"), "irreg"),
                criarCard(iIr, "Pôr", renderConj("pusesse", "pusesses", "pusesse", "puséssemos", "pusésseis", "pusessem", "se"), "irreg"),
                criarCard(iIr, "Ver", renderConj("visse", "visses", "visse", "víssemos", "vísseis", "vissem", "se"), "irreg"),
            ]} />
        )
    },
    {
        titulo: '9. Futuro do Subjuntivo', icone: '🎯', conteudo: (
            <CardCarousel titulo="" itemsPerView={3} cards={[
                criarCard(i1, "Estudar", renderConj("estudar", "estudares", "estudar", "estudarmos", "estudardes", "estudarem", "quando")),
                criarCard(i2, "Vender", renderConj("vender", "venderes", "vender", "vendermos", "venderdes", "venderem", "quando")),
                criarCard(i3, "Partir", renderConj("partir", "partires", "partir", "partirmos", "partirdes", "partirem", "quando")),
                criarCard(iIr, "Ser / Ir", renderConj("for", "fores", "for", "formos", "fordes", "forem", "quando"), "irreg"),
                criarCard(iIr, "Vir", renderConj("vier", "vieres", "vier", "viermos", "vierdes", "vierem", "quando"), "irreg"),
                criarCard(iIr, "Pôr", renderConj("puser", "puseres", "puser", "pusermos", "puserdes", "puserem", "quando"), "irreg"),
                criarCard(iIr, "Ver", renderConj("vir", "vires", "vir", "virmos", "virdes", "virem", "quando"), "irreg"),
            ]} />
        )
    }
];

// ══════════════════════════════════════════════════════════════════════════
// QUIZ POOLS
// ══════════════════════════════════════════════════════════════════════════

const QUIZ_MOD1_POOL: QuizQuestion[] = [
    { id: 101, pergunta: "Em 'A broca **perfurou** o solo com sucesso', o verbo destacado está no:", opcoes: [{ label: 'A', valor: "Pretérito Imperfeito do Indicativo" }, { label: 'B', valor: "Pretérito Perfeito do Indicativo" }, { label: 'C', valor: "Futuro do Pretérito" }, { label: 'D', valor: "Presente do Indicativo" }], correta: 'B', explicacao: "A ação está totalmente concluída no passado (perfurou = fato acabado). Logo, é Pretérito Perfeito do Indicativo." },
    { id: 102, pergunta: "Assinale a alternativa em que o verbo é IMPESSOAL e deve ficar no singular:", opcoes: [{ label: 'A', valor: "Existiam muitos candidatos na fila." }, { label: 'B', valor: "Havia muitos candidatos na fila." }, { label: 'C', valor: "Apareceram problemas na tubulação." }, { label: 'D', valor: "Faltam recursos para o projeto." }], correta: 'B', explicacao: "HAVER no sentido de existir é impessoal: fica SEMPRE na 3ª pessoa do singular. 'Existir', por outro lado, é pessoal e vai ao plural." },
    { id: 103, pergunta: "Na frase '**Deve haver** vagas no concurso', a forma verbal está:", opcoes: [{ label: 'A', valor: "Errada — deveria ser 'Devem haver'" }, { label: 'B', valor: "Correta — o auxiliar acompanha a impessoalidade de haver" }, { label: 'C', valor: "Errada — deveria ser 'Devem existir'" }, { label: 'D', valor: "Correta — mas somente no registro informal" }], correta: 'B', explicacao: "Quando HAVER (impessoal) tem auxiliar, o auxiliar também fica no singular: 'Deve haver', 'Pode haver', 'Vai haver'." },
    { id: 104, pergunta: "Em 'O **amanhecer** na plataforma é surpreendente', a palavra destacada é originalmente um:", opcoes: [{ label: 'A', valor: "Substantivo concreto" }, { label: 'B', valor: "Verbo que sofreu derivação imprópria (substantivação)" }, { label: 'C', valor: "Adjetivo substantivado" }, { label: 'D', valor: "Advérbio de tempo" }], correta: 'B', explicacao: "O artigo 'O' antes de 'amanhecer' transforma o verbo em substantivo. Isso se chama Derivação Imprópria." },
    { id: 105, pergunta: "Qual alternativa contém um substantivo ABSTRATO?", opcoes: [{ label: 'A', valor: "A plataforma resistiu ao temporal." }, { label: 'B', valor: "A extração de petróleo bateu recorde." }, { label: 'C', valor: "O vento soprou forte na base." }, { label: 'D', valor: "A sereia é um ser mitológico." }], correta: 'B', explicacao: "'Extração' indica uma ação (ato de extrair) e depende de um agente. Substantivos que indicam ação, estado, qualidade ou sentimento dependente de um ser são ABSTRATOS." },
    { id: 106, pergunta: "Na voz passiva sintética '**Vendem-se** casas', o sujeito da oração é:", opcoes: [{ label: 'A', valor: "Indeterminado" }, { label: 'B', valor: "O pronome 'se'" }, { label: 'C', valor: "'casas' (sujeito paciente)" }, { label: 'D', valor: "Oculto (alguém vende)" }], correta: 'C', explicacao: "Com VTD + SE, temos Pronome Apassivador. 'Casas' é o sujeito paciente (casas são vendidas), por isso o verbo vai ao plural." },
    { id: 107, pergunta: "Assinale a opção com flexão CORRETA do plural:", opcoes: [{ label: 'A', valor: "Os cidadãos votaram cedo." }, { label: 'B', valor: "Os alemãos chegaram ontem." }, { label: 'C', valor: "Trouxeram muitos limãos." }, { label: 'D', valor: "Os capitães comandaram a missão." }], correta: 'D', explicacao: "Capitão → Capitães (oxítona em -ão faz plural em -ães). Cidadão → Cidadãos. Alemão → Alemães. Limão → Limões." },
    { id: 108, pergunta: "Em 'O operador **chegava** sempre cedo', o tempo verbal indica:", opcoes: [{ label: 'A', valor: "Ação concluída no passado" }, { label: 'B', valor: "Ação habitual ou inacabada no passado" }, { label: 'C', valor: "Ação futura condicionada" }, { label: 'D', valor: "Ação no presente contínuo" }], correta: 'B', explicacao: "Pretérito Imperfeito ('chegava') indica ação habitual, repetida ou inacabada no passado. Compare: 'chegou' (perfeito, ação pontual) vs 'chegava' (imperfeito, ação habitual)." },
    { id: 109, pergunta: "Assinale a alternativa que apresenta a flexão correta do verbo VER no Futuro do Subjuntivo:", opcoes: [{ label: 'A', valor: "Quando eu ver" }, { label: 'B', valor: "Quando eu vir" }, { label: 'C', valor: "Quando eu vi" }, { label: 'D', valor: "Quando eu vesse" }], correta: 'B', explicacao: "O Futuro do Subjuntivo do verbo VER é 'quando eu vir, tu vires, ele vir'. 'Quando eu ver' está incorreto." },
    { id: 110, pergunta: "Na frase 'Se ele ________ mais esforço, ________ aprovado', quais formas completam corretamente os espaços, sendo verbo PÔR e SER?", opcoes: [{ label: 'A', valor: "pusesse / seria" }, { label: 'B', valor: "posse / era" }, { label: 'C', valor: "puzesse / seria" }, { label: 'D', valor: "por / seria" }], correta: 'A', explicacao: "Pretérito Imperfeito do Subjuntivo de PÔR é 'pusesse' (com S). O Futuro do Pretérito do verbo SER é 'seria'." }
];

const QUIZ_MOD2_POOL: QuizQuestion[] = [
    { id: 201, pergunta: "Na frase 'Aquela refinaria é mais antiga que **esta**', os pronomes destacados são:", opcoes: [{ label: 'A', valor: "Possessivos" }, { label: 'B', valor: "Relativos" }, { label: 'C', valor: "Demonstrativos" }, { label: 'D', valor: "Indefinidos" }], correta: 'C', explicacao: "'Aquela' e 'esta' situam os elementos no espaço e no discurso. São pronomes demonstrativos." },
    { id: 202, pergunta: "Em 'O relatório **que** você entregou foi aprovado', a palavra 'que' é:", opcoes: [{ label: 'A', valor: "Conjunção integrante" }, { label: 'B', valor: "Pronome relativo (retoma 'relatório')" }, { label: 'C', valor: "Preposição" }, { label: 'D', valor: "Advérbio de modo" }], correta: 'B', explicacao: "'Que' retoma o antecedente 'relatório' e introduz uma Oração Adjetiva. Logo, é pronome relativo (= o qual)." },
    { id: 203, pergunta: "Assinale a frase em que o adjetivo muda de sentido conforme a posição:", opcoes: [{ label: 'A', valor: "Ele é um excelente engenheiro." }, { label: 'B', valor: "O **grande** líder vs O líder **grande**" }, { label: 'C', valor: "Mesa suja / Computador sujo" }, { label: 'D', valor: "Relatório complexo e detalhado" }], correta: 'B', explicacao: "'Grande líder' = notável (valor subjetivo). 'Líder grande' = alto, corpulento (valor objetivo). A posição do adjetivo altera o significado." },
    { id: 204, pergunta: "Em 'A Petrobras exige **alta** performance', o termo destacado é:", opcoes: [{ label: 'A', valor: "Substantivo" }, { label: 'B', valor: "Adjetivo (qualifica 'performance')" }, { label: 'C', valor: "Advérbio de intensidade" }, { label: 'D', valor: "Pronome demonstrativo" }], correta: 'B', explicacao: "'Alta' qualifica o substantivo 'performance', atribuindo-lhe uma característica. Logo, é adjetivo." },
    { id: 205, pergunta: "Qual pronome é OBLÍQUO ÁTONO e funciona como Objeto Direto?", opcoes: [{ label: 'A', valor: "Eu" }, { label: 'B', valor: "Lhe" }, { label: 'C', valor: "O / A" }, { label: 'D', valor: "Nós" }], correta: 'C', explicacao: "'O' e 'A' são oblíquos átonos que funcionam como Objeto Direto. 'Lhe' funciona como Objeto Indireto. 'Eu' e 'Nós' são retos (sujeito)." },
    { id: 206, pergunta: "'De pedra' em 'coração **de pedra**' equivale a qual adjetivo?", opcoes: [{ label: 'A', valor: "Pedregoso" }, { label: 'B', valor: "Pétreo" }, { label: 'C', valor: "Pedreiro" }, { label: 'D', valor: "Pedrento" }], correta: 'B', explicacao: "'De pedra' é uma Locução Adjetiva. Seu adjetivo correspondente é 'pétreo'. Exemplo: coração pétreo = coração de pedra." },
    { id: 207, pergunta: "Em 'Ela **mesma** resolveu o problema', a palavra 'mesma' é:", opcoes: [{ label: 'A', valor: "Advérbio (invariável)" }, { label: 'B', valor: "Pronome demonstrativo de reforço (variável)" }, { label: 'C', valor: "Adjetivo qualificativo" }, { label: 'D', valor: "Conjunção" }], correta: 'B', explicacao: "'Mesmo/mesma' como reforço é pronome e VARIA em gênero: 'Ela mesma', 'Ele mesmo', 'Elas mesmas'. Nunca 'Ela mesmo'." },
    { id: 208, pergunta: "Na frase 'Seguem **anexas** as cópias', a concordância está:", opcoes: [{ label: 'A', valor: "Errada — deveria ser 'anexo'" }, { label: 'B', valor: "Correta — 'anexo' é adjetivo e concorda com 'cópias'" }, { label: 'C', valor: "Errada — deveria ser 'em anexo'" }, { label: 'D', valor: "Correta — mas somente no plural" }], correta: 'B', explicacao: "'Anexo' é adjetivo e CONCORDA com o substantivo: 'anexas as cópias' (feminino plural). Já 'em anexo' é locução e NÃO varia." }
];

const QUIZ_MOD3_POOL: QuizQuestion[] = [
    { id: 301, pergunta: "Em 'O poço secou **porque** choveu pouco', a conjunção é:", opcoes: [{ label: 'A', valor: "Explicativa" }, { label: 'B', valor: "Causal" }, { label: 'C', valor: "Concessiva" }, { label: 'D', valor: "Condicional" }], correta: 'B', explicacao: "'Porque' introduz a CAUSA de o poço ter secado. A oração subordinada explica o motivo do fato principal. Causal ≠ Explicativa." },
    { id: 302, pergunta: "Assinale a conjunção CONCESSIVA:", opcoes: [{ label: 'A', valor: "Se estudar, passará." }, { label: 'B', valor: "Choveu, mas fomos trabalhar." }, { label: 'C', valor: "**Embora** estivéssemos exaustos, finalizamos o turno." }, { label: 'D', valor: "Estudou tanto **que** passou." }], correta: 'C', explicacao: "'Embora' é conjunção subordinativa concessiva: expressa um obstáculo que NÃO impede a ação principal." },
    { id: 303, pergunta: "Na frase 'Fique calado, **que** a reunião vai começar', o 'que' tem valor de:", opcoes: [{ label: 'A', valor: "Pronome relativo" }, { label: 'B', valor: "Conjunção coordenativa explicativa" }, { label: 'C', valor: "Conjunção subordinativa causal" }, { label: 'D', valor: "Preposição" }], correta: 'B', explicacao: "Após verbo no imperativo ('Fique'), o 'que' equivale a 'pois/porque', justificando a ordem dada. É conjunção explicativa." },
    { id: 304, pergunta: "Em 'O operador foi **a** Macaé verificar a plataforma', o 'a' é:", opcoes: [{ label: 'A', valor: "Artigo definido" }, { label: 'B', valor: "Preposição indicando destino/lugar" }, { label: 'C', valor: "Pronome oblíquo" }, { label: 'D', valor: "Conjunção" }], correta: 'B', explicacao: "A preposição 'a' liga o verbo 'ir' ao destino 'Macaé', indicando lugar/direção." },
    { id: 305, pergunta: "Na locução '**Por causa de**', encontramos:", opcoes: [{ label: 'A', valor: "Locução adverbial" }, { label: 'B', valor: "Locução prepositiva" }, { label: 'C', valor: "Locução conjuntiva" }, { label: 'D', valor: "Duas preposições isoladas" }], correta: 'B', explicacao: "Grupos de palavras que terminam em preposição (de, com, a) e equivalem a uma preposição simples são Locuções Prepositivas." },
    { id: 306, pergunta: "Qual é a diferença entre conjunção CAUSAL e EXPLICATIVA?", opcoes: [{ label: 'A', valor: "Não há diferença" }, { label: 'B', valor: "Causal traz o motivo real; Explicativa justifica a fala do emissor" }, { label: 'C', valor: "Causal é coordenativa; Explicativa é subordinativa" }, { label: 'D', valor: "Causal usa 'porque'; Explicativa usa 'pois'" }], correta: 'B', explicacao: "CAUSAL: 'Não fui porque choveu' (motivo real). EXPLICATIVA: 'Leve o guarda-chuva, porque vai chover' (justificativa da ordem/sugestão)." },
    { id: 307, pergunta: "Em 'Agiram **conforme** a regra ditava', a conjunção expressa:", opcoes: [{ label: 'A', valor: "Condição" }, { label: 'B', valor: "Conformidade" }, { label: 'C', valor: "Causa" }, { label: 'D', valor: "Concessão" }], correta: 'B', explicacao: "'Conforme' estabelece concordância de ações (conformativa): a ação foi feita da maneira que a regra ditava." },
    { id: 308, pergunta: "A contração 'do' (de + o) aparece em qual alternativa?", opcoes: [{ label: 'A', valor: "Gosto **do** café da manhã." }, { label: 'B', valor: "Ele foi **ao** mercado." }, { label: 'C', valor: "Falou **com** o gerente." }, { label: 'D', valor: "Viajou **para** Santos." }], correta: 'A', explicacao: "'Do' é a contração da preposição 'de' + artigo 'o'. Em 'ao' temos 'a + o' (combinação). 'Com' e 'para' são preposições simples." }
];

const QUIZ_MOD4_POOL: QuizQuestion[] = [
    { id: 401, pergunta: "Em 'Ele trabalha **muito** bem', as palavras destacadas são, respectivamente:", opcoes: [{ label: 'A', valor: "Advérbio de intensidade e Advérbio de modo" }, { label: 'B', valor: "Advérbio de tempo e Advérbio de modo" }, { label: 'C', valor: "Adjetivo e Advérbio" }, { label: 'D', valor: "Pronome e Advérbio" }], correta: 'A', explicacao: "'Muito' intensifica o advérbio 'bem' (intensidade). 'Bem' indica a maneira como ele trabalha (modo). Advérbio modifica advérbio!" },
    { id: 402, pergunta: "Marque a alternativa onde '**meio**' atue como ADVÉRBIO:", opcoes: [{ label: 'A', valor: "Comprei **meio** litro de óleo." }, { label: 'B', valor: "Ela estava **meio** cansada do plantão." }, { label: 'C', valor: "Encontramos o **meio** do caminho." }, { label: 'D', valor: "Cortou a maçã no **meio**." }], correta: 'B', explicacao: "Como advérbio de intensidade (= um pouco), 'meio' é INVARIÁVEL. Em 'meio litro', atua como numeral fracionário." },
    { id: 403, pergunta: "'Estudo **bastante** todos os dias' vs 'Comprei **bastantes** livros'. A classificação é:", opcoes: [{ label: 'A', valor: "Advérbio (invariável) e Pronome Indefinido (variável)" }, { label: 'B', valor: "Pronome e Adjetivo" }, { label: 'C', valor: "Adjetivo e Advérbio" }, { label: 'D', valor: "Preposição e Pronome" }], correta: 'A', explicacao: "Modifica verbo (estudo muito) = advérbio INVARIÁVEL. Acompanha substantivo (muitos livros) = pronome adjetivo VARIÁVEL." },
    { id: 404, pergunta: "Em 'É proibido entrada', a concordância está:", opcoes: [{ label: 'A', valor: "Errada — deveria ser 'É proibida entrada'" }, { label: 'B', valor: "Correta — sem artigo, a expressão fica invariável" }, { label: 'C', valor: "Errada — deveria ser 'São proibidas entradas'" }, { label: 'D', valor: "Correta — mas somente no registro coloquial" }], correta: 'B', explicacao: "SEM artigo: 'É proibido/necessário/bom' fica invariável. COM artigo: 'É proibida A entrada' (concorda com o substantivo feminino)." },
    { id: 405, pergunta: "O artigo transforma qualquer palavra em substantivo. Isso se chama:", opcoes: [{ label: 'A', valor: "Derivação prefixal" }, { label: 'B', valor: "Derivação imprópria (substantivação)" }, { label: 'C', valor: "Composição por justaposição" }, { label: 'D', valor: "Derivação sufixal" }], correta: 'B', explicacao: "O artigo é o 'Rei Midas': 'O cantar' (verbo→substantivo), 'O azul' (adjetivo→substantivo), 'Um não' (advérbio→substantivo)." },
    { id: 406, pergunta: "Em 'Os guardas estão **alerta**', a palavra 'alerta' é:", opcoes: [{ label: 'A', valor: "Adjetivo (varia em número)" }, { label: 'B', valor: "Advérbio (invariável)" }, { label: 'C', valor: "Substantivo" }, { label: 'D', valor: "Pronome" }], correta: 'B', explicacao: "'Alerta' é advérbio e NUNCA varia. 'Os guardas estão alerta' (correto). 'Os guardas estão alertas' (ERRADO)." }
];

const QUIZ_LABORATORIO_POOL: QuizQuestion[] = [
    { id: 501, pergunta: "Assinale a alternativa em que ocorreu substantivação de um verbo:", opcoes: [{ label: 'A', valor: "**O amanhecer** na plataforma é surpreendente." }, { label: 'B', valor: "Os trabalhadores cantavam felizes." }, { label: 'C', valor: "Precisamos comprar novos equipamentos." }, { label: 'D', valor: "Eles vão construir uma nova sede." }], correta: 'A', explicacao: "O artigo 'O' antes de 'amanhecer' transforma o verbo em substantivo (derivação imprópria)." },
    { id: 502, pergunta: "Em 'Iremos **embora** amanhã', a palavra destacada é:", opcoes: [{ label: 'A', valor: "Conjunção concessiva" }, { label: 'B', valor: "Advérbio de negação" }, { label: 'C', valor: "Advérbio de lugar/afastamento" }, { label: 'D', valor: "Preposição" }], correta: 'C', explicacao: "'Embora' originalmente vem de 'em boa hora'. Como advérbio, indica afastamento. Como conjunção (Embora chova...), indica concessão." },
    { id: 503, pergunta: "Ela não é **nenhuma** especialista. A palavra destacada é:", opcoes: [{ label: 'A', valor: "Pronome indefinido" }, { label: 'B', valor: "Numeral" }, { label: 'C', valor: "Adjetivo" }, { label: 'D', valor: "Pronome interrogativo" }], correta: 'A', explicacao: "'Nenhuma' refere-se a 'especialista' de forma vaga/negativa, sendo pronome indefinido adjetivo." },
    { id: 504, pergunta: "Qual das frases tem o adjetivo mudando de sentido pela posição?", opcoes: [{ label: 'A', valor: "Ele é um excelente engenheiro." }, { label: 'B', valor: "O **grande** líder / O líder **grande**" }, { label: 'C', valor: "Mesa suja / Computador sujo" }, { label: 'D', valor: "Relatório complexo" }], correta: 'B', explicacao: "'Grande líder' = notável. 'Líder grande' = alto/corpulento. A posição muda o significado." },
    { id: 505, pergunta: "'**Porque** choveu, o poço secou' vs 'Leve guarda-chuva, **porque** vai chover'. São, respectivamente:", opcoes: [{ label: 'A', valor: "Causal e Explicativa" }, { label: 'B', valor: "Explicativa e Causal" }, { label: 'C', valor: "Ambas causais" }, { label: 'D', valor: "Ambas explicativas" }], correta: 'A', explicacao: "1ª: motivo real do fato = CAUSAL. 2ª: justificativa da sugestão = EXPLICATIVA." },
    { id: 506, pergunta: "Em 'Seguem **em anexo** as cópias', 'em anexo' é:", opcoes: [{ label: 'A', valor: "Adjetivo (varia)" }, { label: 'B', valor: "Locução adverbial (invariável)" }, { label: 'C', valor: "Preposição" }, { label: 'D', valor: "Locução adjetiva" }], correta: 'B', explicacao: "'Em anexo' é locução e NÃO varia. Diferente de 'anexo' (adjetivo) que concorda: 'Seguem anexas as cópias'." },
    { id: 507, pergunta: "Na frase 'Fui eu **que fiz**', o verbo concorda com:", opcoes: [{ label: 'A', valor: "O pronome relativo 'que'" }, { label: 'B', valor: "O antecedente 'eu'" }, { label: 'C', valor: "O predicativo" }, { label: 'D', valor: "É invariável" }], correta: 'B', explicacao: "Com pronome relativo QUE, o verbo concorda com o antecedente. 'Fui eu que FIZ' / 'Fomos nós que FIZEMOS'." },
    { id: 508, pergunta: "'**Dois terços** dos técnicos **foram** aprovados'. O verbo concordou com:", opcoes: [{ label: 'A', valor: "A fração" }, { label: 'B', valor: "O especificador 'dos técnicos'" }, { label: 'C', valor: "O sujeito oculto" }, { label: 'D', valor: "O predicativo 'aprovados'" }], correta: 'B', explicacao: "Com fração + especificador, o verbo concorda com o especificador: 'dos técnicos' (plural) → 'foram'." },
    { id: 509, pergunta: "A palavra '**menos**' é:", opcoes: [{ label: 'A', valor: "Adjetivo variável (menos/menas)" }, { label: 'B', valor: "Advérbio invariável (nunca 'menas')" }, { label: 'C', valor: "Pronome indefinido" }, { label: 'D', valor: "Numeral" }], correta: 'B', explicacao: "'MENOS' é advérbio e NUNCA varia. A forma 'menas' NÃO EXISTE na norma culta." },
    { id: 510, pergunta: "Em 'O candidato fez uma prova **ruim**', o termo destacado é:", opcoes: [{ label: 'A', valor: "Substantivo" }, { label: 'B', valor: "Termo acessório" }, { label: 'C', valor: "Adjetivo" }, { label: 'D', valor: "Advérbio" }], correta: 'C', explicacao: "'Ruim' qualifica a prova (substantivo). Termos que qualificam nomes são Adjetivos." },
    { id: 511, pergunta: "**Ambos** os candidatos foram aprovados. 'Ambos' é:", opcoes: [{ label: 'A', valor: "Pronome indefinido" }, { label: 'B', valor: "Numeral dual" }, { label: 'C', valor: "Adjetivo" }, { label: 'D', valor: "Advérbio" }], correta: 'B', explicacao: "'Ambos/ambas' é numeral dual (indica 'os dois'). Sempre concorda em gênero: ambos (masc.) / ambas (fem.)." },
    { id: 512, pergunta: "**Ufa!** Que calor! A interjeição expressa:", opcoes: [{ label: 'A', valor: "Dor" }, { label: 'B', valor: "Alívio" }, { label: 'C', valor: "Admiração" }, { label: 'D', valor: "Desejo" }], correta: 'B', explicacao: "'Ufa!' é interjeição de alívio. O sentido depende do contexto, mas o uso mais comum de 'Ufa' é expressar alívio por algo ter terminado." },
    { id: 513, pergunta: "Na frase 'Ele cantava **muito** bem', os termos destacados são, respectivamente:", opcoes: [{ label: 'A', valor: "Pronome indefinido / advérbio" }, { label: 'B', valor: "Advérbio de intensidade / advérbio de modo" }, { label: 'C', valor: "Adjetivo / pronome" }, { label: 'D', valor: "Advérbio / adjetivo" }], correta: 'B', explicacao: "'Muito' intensifica o advérbio 'bem' (modo de cantar). Ambos são invariáveis." },
    { id: 514, pergunta: "Classifique o 'A' nesta frase: '**A** plataforma foi inspecionada passo **a** passo.'", opcoes: [{ label: 'A', valor: "Artigo / Artigo" }, { label: 'B', valor: "Preposição / Artigo" }, { label: 'C', valor: "Artigo / Preposição" }, { label: 'D', valor: "Preposição / Preposição" }], correta: 'C', explicacao: "O primeiro 'A' acompanha 'plataforma' (Artigo definido). O segundo liga palavras repetidas (Preposição)." },
    { id: 515, pergunta: "Em 'Eles **se** cumprimentaram antes da reunião', a voz verbal é:", opcoes: [{ label: 'A', valor: "Ativa" }, { label: 'B', valor: "Passiva Analítica" }, { label: 'C', valor: "Passiva Sintética" }, { label: 'D', valor: "Reflexiva Recíproca" }], correta: 'D', explicacao: "A ação é trocada simultaneamente entre os membros do sujeito: um cumprimenta o outro e é cumprimentado por ele." },
    { id: 516, pergunta: "Assinale onde ocorreu derivação imprópria (substantivação):", opcoes: [{ label: 'A', valor: "O técnico chegou." }, { label: 'B', valor: "Tinha um andar bonito." }, { label: 'C', valor: "Uma linda casa foi alugada." }, { label: 'D', valor: "Falaram sobre as melhorias." }], correta: 'B', explicacao: "'Andar', originalmente verbo, é transformado em substantivo pelo artigo 'um'." },
    { id: 517, pergunta: "Qual frase tem verbo IMPESSOAL e concorda corretamente no plural?", opcoes: [{ label: 'A', valor: "Haviam muitas chances de aprovação." }, { label: 'B', valor: "Fazem dez anos da descoberta do pré-sal." }, { label: 'C', valor: "Pode haver sérios riscos no mar." }, { label: 'D', valor: "Devem fazer dias frios por aqui." }], correta: 'C', explicacao: "HAVER = Existir é impessoal (singular). Se tem auxiliar, ele acompanha o singular. Portanto, 'Pode haver' é correto; as outras estão erradas ('Havia', 'Faz', 'Deve fazer')." },
    { id: 518, pergunta: "'O **que**' pode ser, dependendo do contexto:", opcoes: [{ label: 'A', valor: "Uma conjunção coordenativa apenas." }, { label: 'B', valor: "Um verbo ou um advérbio." }, { label: 'C', valor: "Um preposição ou um adjetivo." }, { label: 'D', valor: "Um pronome relativo ou conjunção integrante." }], correta: 'D', explicacao: "A palavra 'que' frequentemente atua como pronome relativo (o qual/a qual) ou conjunção subordinativa integrante (que as coisas melhorem)." },
    { id: 519, pergunta: "Sobre 'Onde' e 'Aonde', marque a opção CORRETA:", opcoes: [{ label: 'A', valor: "Onde você vai?" }, { label: 'B', valor: "Aonde você está?" }, { label: 'C', valor: "O documento mostra aonde fica o tesouro." }, { label: 'D', valor: "Aonde nos leva esta tubulação?" }], correta: 'D', explicacao: "'Aonde' indica movimento (Para onde). O verbo 'levar' pede destino ('leva a'). As demais pedem estado/lugar fixo, portanto deveriam usar 'onde'." },
    { id: 520, pergunta: "Em 'Fique quieto, **que** a palestra já começou', o 'que' equivale a:", opcoes: [{ label: 'A', valor: "Conjunção Causal" }, { label: 'B', valor: "Conjunção Explicativa (pois)" }, { label: 'C', valor: "Pronome Relativo" }, { label: 'D', valor: "Preposição" }], correta: 'B', explicacao: "Após verbo no imperativo ('Fique quieto'), o 'que' inicia oração coordenada explicativa, justificando a ordem." }
];

// ══════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════

export default function AulaClassesPalavras({ onComplete, currentProgress, onUpdateProgress }: AulaProps) {
    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
    const [showCompletionBadge, setShowCompletionBadge] = useState(false);

    const [qMod1, setQMod1] = useState<QuizQuestion[]>([]);
    const [qMod2, setQMod2] = useState<QuizQuestion[]>([]);
    const [qMod3, setQMod3] = useState<QuizQuestion[]>([]);
    const [qMod4, setQMod4] = useState<QuizQuestion[]>([]);
    const [qLab, setQLab] = useState<QuizQuestion[]>([]);

    useEffect(() => {
        setQMod1(getRandomQuestions(QUIZ_MOD1_POOL, 6)); // mínimo 6
        setQMod2(getRandomQuestions(QUIZ_MOD2_POOL, 6)); // mínimo 6
        setQMod3(getRandomQuestions(QUIZ_MOD3_POOL, 6)); // mínimo 6
        setQMod4(getRandomQuestions(QUIZ_MOD4_POOL, 6)); // mínimo 6
        setQLab(getRandomQuestions(QUIZ_LABORATORIO_POOL, 20)); // Lab Final com 20
    }, []);

    useEffect(() => {
        const total = MODULE_DEFS.length;
        const done = completedModules.size;
        const percent = Math.round((done / total) * 100);
        onUpdateProgress(percent);
        if (percent >= 100) setShowCompletionBadge(true);
    }, [completedModules, onUpdateProgress]);

    const handleModuleComplete = (moduleId: string, score: number) => {
        if (score >= 70) {
            const newSet = new Set(completedModules).add(moduleId);
            setCompletedModules(newSet);
            localStorage.setItem('aula_classes_palavras_progress', JSON.stringify({ completedModules: Array.from(newSet) }));
            const index = MODULE_DEFS.findIndex(m => m.id === moduleId);
            if (index < MODULE_DEFS.length - 1) {
                setActiveTab(MODULE_DEFS[index + 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                onComplete();
            }
        }
    };

    const isModuleUnlocked = useCallback((moduleIndex: number) => {
        if (moduleIndex === 0) return true;
        const prevModuleId = MODULE_DEFS[moduleIndex - 1]?.id;
        return prevModuleId ? completedModules.has(prevModuleId) : false;
    }, [completedModules]);

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-500">
            <main className="container mx-auto px-6 py-4 max-w-6xl space-y-10">

                {showCompletionBadge && (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center gap-4 shadow-sm animate-in slide-in-from-top-4 duration-700">
                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                            <LuCheck size={32} strokeWidth={3} />
                        </div>
                        <div>
                            <h3 className="text-green-800 dark:text-green-300 font-bold text-xl">Aula de Classes de Palavras Concluída!</h3>
                            <p className="text-green-700 dark:text-green-400">Você dominou as 10 categorias morfológicas do português. Siga firme!</p>
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

                    {/* ══════════════════════════════════════════════
                        MÓDULO 1: VERBO & SUBSTANTIVO
                    ══════════════════════════════════════════════ */}
                    <TabsContent value="modulo-1" className="space-y-16 mt-6">
                        <ModuleBanner numero={1} titulo="Verbo & Substantivo" descricao="As duas classes fundamentais da língua: o motor da frase e o nome de tudo que existe." gradiente="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />

                        {/* ── VERBO ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={1} title="O Verbo — Conceito Científico" variant="indigo" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                O <strong>Verbo</strong> é a classe de palavra que exprime <strong>ação</strong> (correr, perfurar), <strong>estado</strong> (ser, estar, permanecer) ou <strong>fenômeno da natureza</strong> (chover, anoitecer). É a única classe que se flexiona em <strong>cinco categorias</strong>: pessoa, número, tempo, modo e voz. Por isso, é considerado o núcleo do predicado e o motor dinâmico de qualquer oração.
                            </p>
                            <AlertBox tipo="info" titulo="Por que o Verbo é o 1º?">
                                Na Cesgranrio, o verbo aparece diretamente nas questões de Concordância Verbal (2º tema mais cobrado), Regência (3º) e Vozes Verbais. Dominar o verbo é dominar metade da prova.
                            </AlertBox>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={2} title="Flexões Verbais" variant="indigo" />
                            <p className="text-base text-muted-foreground leading-relaxed text-justify">
                                Para entender como o verbo funciona nas questões da Cesgranrio, é essencial dominar suas <strong>cinco dimensões de variação</strong>. Cada uma dessas flexões altera a terminação do verbo (desinência) para situar a mensagem no tempo, definir a atitude do falante ou identificar os envolvidos no discurso. Explore abaixo cada categoria:
                            </p>
                            <ContentAccordion mode="stacked" titulo="As 5 Flexões Verbais" icone={<LuZap />} corIndicador="bg-emerald-500" defaultOpen={true} slidesPerView={1} slides={[
                                {
                                    titulo: '1. Pessoa', icone: '👤', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground"><strong>Conceito:</strong> A flexão de <strong>Pessoa</strong> indica quem participa do discurso. Existem três pessoas: quem fala (1ª pessoa), com quem se fala (2ª pessoa) e de quem se fala (3ª pessoa).</p>
                                            <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-sm space-y-2">
                                                <p><strong>1ª pessoa (Emissor):</strong> <strong>Eu</strong> perfuro / <strong>Nós</strong> perfuramos</p>
                                                <p><strong>2ª pessoa (Receptor):</strong> <strong>Tu</strong> perfuras / <strong>Vós</strong> perfurais</p>
                                                <p><strong>3ª pessoa (Assunto):</strong> <strong>Ele</strong> perfura / <strong>Eles</strong> perfuram</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: '2. Número', icone: '🔢', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground"><strong>Conceito:</strong> A flexão de <strong>Número</strong> indica a quantidade de seres que praticam ou sofrem a ação, dividindo-se entre <strong>Singular</strong> (um ser) e <strong>Plural</strong> (mais de um ser).</p>
                                            <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-sm space-y-2">
                                                <p><strong>Singular:</strong> A plataforma <strong>opera</strong> hoje.</p>
                                                <p><strong>Plural:</strong> As plataformas <strong>operam</strong> hoje.</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: '3. Tempo', icone: '⏳', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground"><strong>Conceito:</strong> O <strong>Tempo</strong> verbal situa a ação no eixo cronológico em relação ao momento da fala: Presente, Passado (Pretérito) ou Futuro.</p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                                                    <strong className="text-emerald-700 dark:text-emerald-400">Presente</strong>
                                                    <p className="mt-1">Fato atual ou rotineiro.</p>
                                                    <p className="italic mt-1">&quot;Eu <strong>estudo</strong> todos os dias.&quot;</p>
                                                </div>
                                                <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                                                    <strong className="text-blue-700 dark:text-blue-400">Pretérito Perfeito</strong>
                                                    <p className="mt-1">Ação <strong>concluída</strong> no passado.</p>
                                                    <p className="italic mt-1">&quot;A broca <strong>perfurou</strong> o solo.&quot;</p>
                                                </div>
                                                <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-sm">
                                                    <strong className="text-indigo-700 dark:text-indigo-400">Futuro do Pretérito</strong>
                                                    <p className="mt-1">Ação que dependeria de uma condição.</p>
                                                    <p className="italic mt-1">&quot;A Petrobras <strong>bateria</strong> o recorde.&quot;</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: '4. Modo', icone: '🎭', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground"><strong>Conceito:</strong> O <strong>Modo</strong> indica a atitude (certeza, dúvida ou ordem) que o emissor tem em relação ao fato que enuncia.</p>
                                            <div className="bg-teal-500/10 p-5 rounded-xl border border-teal-500/20 text-sm space-y-3">
                                                <p><strong>Indicativo (Certeza):</strong> &quot;Ele <strong>passará</strong> no concurso da Petrobras.&quot;</p>
                                                <p><strong>Subjuntivo (Dúvida/Hipótese):</strong> &quot;Talvez ele <strong>passe</strong> no concurso.&quot;</p>
                                                <p><strong>Imperativo (Ordem/Pedido):</strong> &quot;<strong>Passe</strong> no concurso!&quot;</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: '5. Voz', icone: '🗣️', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground"><strong>Conceito:</strong> A <strong>Voz Verbal</strong> indica a relação entre o sujeito e a ação verbal: se ele pratica, sofre ou as duas coisas simultaneamente.</p>
                                            <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-sm space-y-3">
                                                <p><strong>Voz Ativa:</strong> O sujeito age. &quot;O técnico <strong>consertou</strong> a válvula.&quot;</p>
                                                <p><strong>Voz Passiva:</strong> O sujeito sofre a ação. &quot;A válvula <strong>foi consertada</strong>.&quot;</p>
                                                <div className="bg-amber-500/20 p-3 rounded-lg border border-amber-500/30">
                                                    <strong className="text-amber-700 dark:text-amber-400">🚨 Passiva Sintética (A queridinha da Cesgranrio):</strong>
                                                    <p className="mt-1">VTD + pronome SE. Exemplo: &quot;<strong>Vendem-se</strong> casas&quot; (= Casas são vendidas).</p>
                                                    <p className="mt-1 text-red-500">❌ O erro clássico é escrever &quot;Vende-se casas&quot; ignorando a concordância com o alvo.</p>
                                                </div>
                                                <p><strong>Voz Reflexiva:</strong> O sujeito age e sofre. &quot;O técnico <strong>cortou-se</strong>.&quot;</p>
                                            </div>
                                        </div>
                                    )
                                }
                            ]} />
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={3} title="Conjugação Verbal — Modos e Tempos" variant="indigo" />
                            <p className="text-base text-muted-foreground leading-relaxed text-justify">
                                O domínio da <strong>Conjugação Verbal</strong> é a base para a Correção Gramatical. A <strong>CESGRANRIO</strong> testa frequentemente o reconhecimento do tempo e do modo nas orações. Abaixo, destacamos a conjugação dos tempos mais incidentes em três verbos-modelo regulares: <strong>Estudar</strong> (1ª conj.), <strong>Vender</strong> (2ª conj.) e <strong>Partir</strong> (3ª conj.).
                            </p>
                            <ContentAccordion mode="stacked" titulo="Tempos Verbais Principais" icone={<LuBookOpen />} corIndicador="bg-blue-500" defaultOpen={false} slidesPerView={1} slides={CONJ_SLIDES} />
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={4} title="Verbos Impessoais — Pegadinha Máxima" variant="indigo" />
                            <AlertBox tipo="danger" titulo="🚨 Cai em TODA prova Cesgranrio!">
                                Os verbos HAVER (sentido de existir) e FAZER (tempo decorrido) são IMPESSOAIS: ficam SEMPRE na 3ª pessoa do singular, independentemente do contexto.
                            </AlertBox>
                            <CardCarousel titulo="Verbos Impessoais — Regras" subtitulo="Decore: impessoal = singular SEMPRE" cards={[
                                { icone: <LuShield className="text-emerald-500" />, titulo: "HAVER = Existir", descricao: (<div className="space-y-2 text-sm"><p>✅ &quot;<strong>Havia</strong> muitos candidatos.&quot;</p><p>❌ &quot;Haviam muitos candidatos.&quot;</p><p className="text-muted-foreground italic">Macete: troque por &quot;existir&quot;. Se der certo, HAVER fica no singular.</p></div>) },
                                { icone: <LuShield className="text-blue-500" />, titulo: "FAZER = Tempo", descricao: (<div className="space-y-2 text-sm"><p>✅ &quot;<strong>Faz</strong> três meses que viajei.&quot;</p><p>❌ &quot;Fazem três meses que viajei.&quot;</p><p className="text-muted-foreground italic">Indica tempo decorrido → singular obrigatório.</p></div>) },
                                { icone: <LuShield className="text-indigo-500" />, titulo: "Auxiliar + HAVER", descricao: (<div className="space-y-2 text-sm"><p>✅ &quot;<strong>Deve haver</strong> vagas.&quot;</p><p>❌ &quot;Devem haver vagas.&quot;</p><p className="text-muted-foreground italic">O auxiliar &quot;herda&quot; a impessoalidade.</p></div>) },
                                { icone: <LuShield className="text-rose-500" />, titulo: "EXISTIR ≠ HAVER", descricao: (<div className="space-y-2 text-sm"><p>✅ &quot;<strong>Existiam</strong> muitos candidatos.&quot;</p><p className="text-muted-foreground italic">EXISTIR é PESSOAL → vai ao plural normalmente. A Cesgranrio adora misturar os dois!</p></div>) }
                            ]} />
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={5} title="Macete de Resolução — Verbo" variant="indigo" />
                            <TimelineItem passo={1} titulo="Ache o verbo" descricao="Grife o verbo principal da oração." />
                            <TimelineItem passo={2} titulo="Pergunte 'Quem?'" descricao="A resposta é o sujeito. Ele manda na concordância." />
                            <TimelineItem passo={3} titulo="Tem 'SE'?" descricao="Analise: VTD + SE = Passiva (verbo concorda com paciente). VTI + SE = Indeterminação (singular)." />
                            <TimelineItem passo={4} titulo="É impessoal?" descricao="Haver, fazer (tempo), chover = singular SEMPRE." isLast />
                        </section>

                        {/* ── SUBSTANTIVO ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={6} title="O Substantivo — Conceito Científico" variant="indigo" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                O <strong>Substantivo</strong> é a classe de palavra que <strong>nomeia</strong> seres, objetos, lugares, sentimentos, ações e qualidades. Segundo Bechara, é a palavra que designa os seres em geral, reais ou imaginários. É o núcleo de praticamente todos os termos da oração (sujeito, objeto direto, objeto indireto, complemento nominal).
                            </p>
                            <AlertBox tipo="info" titulo="Morfologia vs Sintaxe — Relembre!">
                                Na <strong>Morfologia</strong>, o substantivo é classificado pela forma (RG da palavra). Na <strong>Sintaxe</strong>, ele exerce uma <strong>função</strong> (Profissão da palavra). Ex: &quot;navio&quot; → Morfologia: substantivo concreto. Sintaxe: pode ser sujeito, objeto direto, etc.
                            </AlertBox>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={7} title="Classificações dos Substantivos" variant="indigo" />
                            <p className="text-base text-muted-foreground leading-relaxed text-justify">
                                Os substantivos não são todos iguais. Eles são organizados em <strong>quatro pares de oposição</strong> que ajudam a definir a natureza do ser ou objeto nomeado. Dominar essas classificações é fundamental para entender tópicos avançados como a concordância nominal e a regência. Veja como eles se dividem:
                            </p>
                            <ContentAccordion mode="stacked" titulo="Os 4 Pares de Classificação" icone={<LuTag />} corIndicador="bg-teal-500" defaultOpen={true} slidesPerView={1} slides={[
                                {
                                    titulo: 'Concreto vs Abstrato', icone: '1️⃣', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground"><strong>Concreto:</strong> designa seres reais ou imaginários que possuem existência própria (independente de outro ser). <strong>Abstrato:</strong> designa ações, qualidades, estados e sentimentos (dependem de outro ser para existir).</p>
                                            <CardCarousel titulo="Exemplos Práticos" itemsPerView={1} cards={[
                                                { icone: <LuTag />, titulo: 'Substantivo Concreto', descricao: 'Plataforma (objeto), Macaé (lugar), Sereia (ser imaginário), Vento (fenômeno natural). Todos têm existência autônoma.' },
                                                { icone: <LuTag />, titulo: 'Substantivo Abstrato', descricao: 'Extração (ação de extrair), Rapidez (qualidade), Felicidade (sentimento), Saudade (estado). Só existem em um ser.' }
                                            ]} />
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Próprio vs Comum', icone: '2️⃣', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground"><strong>Próprio:</strong> particulariza e individualiza um ser dentro de uma espécie (sempre escrito com letra maiúscula). <strong>Comum:</strong> nomeia todos os seres de uma mesma espécie de forma genérica.</p>
                                            <div className="bg-amber-500/10 p-5 rounded-xl border border-amber-500/20 text-sm">
                                                <p className="mb-2">🏆 <strong>Comum:</strong> empresa, funcionário, oceano, país.</p>
                                                <p>🌟 <strong>Próprio:</strong> Petrobras, André, Atlântico, Brasil.</p>
                                                <p className="mt-4 italic">Exemplo: &quot;A <strong>Petrobras</strong> (próprio) atua no <strong>oceano</strong> (comum) brasileiro.&quot;</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Simples vs Composto', icone: '3️⃣', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground"><strong>Simples:</strong> formado por apenas um radical ou palavra-base. <strong>Composto:</strong> formado por duas ou mais palavras-base unidas (com ou sem hífen).</p>
                                            <div className="bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/20 text-sm">
                                                <p className="mb-2">🔹 <strong>Simples:</strong> mar, sol, flor, óleo.</p>
                                                <p>🧩 <strong>Composto:</strong> beija-flor, girassol (gira + sol), petróleo (petra + oleum), guarda-chuva.</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Primitivo vs Derivado', icone: '4️⃣', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground"><strong>Primitivo:</strong> é a palavra original, que não provém de outra na língua. <strong>Derivado:</strong> é a palavra originada de outra base através da adição de afixos (prefixo ou sufixo).</p>
                                            <div className="bg-pink-500/10 p-5 rounded-xl border border-pink-500/20 text-sm">
                                                <p>🌱 <strong>Primitivo:</strong> ferro, dente, mar, rio.</p>
                                                <p>🌿 <strong>Derivados:</strong> ferr<strong>agem</strong>, dent<strong>ista</strong>, mar<strong>ítimo</strong>, ri<strong>acho</strong>.</p>
                                            </div>
                                        </div>
                                    )
                                }
                            ]} />
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={8} title="A Derivação Imprópria — O 'Efeito Rei Midas'" variant="indigo" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed mb-4">
                                Se você colocar um <strong>artigo</strong> antes de QUALQUER palavra, ela vira Substantivo. Isso se chama <strong>Derivação Imprópria</strong> (substantivação).
                            </p>
                            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-xl mb-6 text-sm text-foreground">
                                <p><strong>Quem é o Rei Midas?</strong> Na mitologia grega, o Rei Midas transformava em ouro tudo o que tocava. Na Língua Portuguesa, o <strong className="text-amber-600">Artigo é o nosso Rei Midas</strong>: qualquer palavra da língua que venha antecedida por ele perderá a sua classe original e será imediatamente transformada em Substantivo.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FlipCard
                                    frente={
                                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                                            <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">Verbo</span>
                                            <LuArrowDown className="w-10 h-10 text-muted-foreground/40 animate-bounce" />
                                            <span className="font-bold text-2xl md:text-3xl tracking-tight text-foreground/90">Substantivo</span>
                                        </div>
                                    }
                                    verso={
                                        <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm md:text-base p-2">
                                            <div>
                                                <p><strong>O cantar</strong> dos pássaros encanta.</p>
                                                <p className="text-xs text-muted-foreground">(O = artigo + cantar = verbo)</p>
                                            </div>
                                            <hr className="border-border/50" />
                                            <div>
                                                <p>Foi um <strong>amanhecer</strong> radiante.</p>
                                                <p className="text-xs text-muted-foreground">(Um = artigo + amanhecer = verbo)</p>
                                            </div>
                                            <hr className="border-border/50" />
                                            <div>
                                                <p>Ele tem um <strong>andar</strong> esquisito.</p>
                                                <p className="text-xs text-muted-foreground">(Um = artigo + andar = verbo)</p>
                                            </div>
                                        </div>
                                    }
                                />
                                <FlipCard
                                    frente={
                                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                                            <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">Advérbio</span>
                                            <LuArrowDown className="w-10 h-10 text-muted-foreground/40 animate-bounce" />
                                            <span className="font-bold text-2xl md:text-3xl tracking-tight text-foreground/90">Substantivo</span>
                                        </div>
                                    }
                                    verso={
                                        <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm md:text-base p-2">
                                            <div>
                                                <p>Ele recebeu um <strong>não</strong> rotundo.</p>
                                                <p className="text-xs text-muted-foreground">(Um = artigo + não = advérbio)</p>
                                            </div>
                                            <hr className="border-border/50" />
                                            <div>
                                                <p>Espero um <strong>sim</strong> da presidência.</p>
                                                <p className="text-xs text-muted-foreground">(Um = artigo + sim = advérbio)</p>
                                            </div>
                                            <hr className="border-border/50" />
                                            <div>
                                                <p>Não entendo o <strong>porquê</strong> de tudo.</p>
                                                <p className="text-xs text-muted-foreground">(&quot;Porquê&quot; substantivado por &quot;o&quot;)</p>
                                            </div>
                                        </div>
                                    }
                                />
                                <FlipCard
                                    frente={
                                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                                            <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">Adjetivo</span>
                                            <LuArrowDown className="w-10 h-10 text-muted-foreground/40 animate-bounce" />
                                            <span className="font-bold text-2xl md:text-3xl tracking-tight text-foreground/90">Substantivo</span>
                                        </div>
                                    }
                                    verso={
                                        <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm md:text-base p-2">
                                            <div>
                                                <p><strong>O azul</strong> do céu é muito intenso.</p>
                                                <p className="text-xs text-muted-foreground">(O = artigo + azul = adjetivo)</p>
                                            </div>
                                            <hr className="border-border/50" />
                                            <div>
                                                <p>Ele sempre defende os <strong>pobres</strong>.</p>
                                                <p className="text-xs text-muted-foreground">(Os = artigo + pobre = adjetivo)</p>
                                            </div>
                                            <hr className="border-border/50" />
                                            <div>
                                                <p>O <strong>bom</strong> da vida é tentar.</p>
                                                <p className="text-xs text-muted-foreground">(O = artigo + bom = adjetivo)</p>
                                            </div>
                                        </div>
                                    }
                                />
                            </div>
                        </section>

                        {/* Resumo + Quiz */}
                        <section className="space-y-16">
                            <LessonTabs
                                variant="indigo"
                                title="Resumo: Verbo & Substantivo"
                                tabs={[
                                    {
                                        id: 'video',
                                        label: 'Vídeo Resumo',
                                        icon: LuVideo,
                                        content: (
                                            <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                                                <div className="space-y-2">
                                                    <h4 className="text-2xl font-bold">Revisão Estratégica</h4>
                                                    <p className="text-muted-foreground">Assista à revisão em vídeo com os conceitos chaves de Verbos e Substantivos.</p>
                                                </div>
                                                <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: Verbos e Substantivos" duration="15 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'audio',
                                        label: 'Áudio Revisão',
                                        icon: LuHeadphones,
                                        content: (
                                            <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
                                                <div className="space-y-3">
                                                    <h4 className="text-2xl font-bold">Podcast do Aprovado</h4>
                                                    <p className="text-muted-foreground">Ouça o resumo sempre que não puder ver a tela. Ideal para deslocamentos.</p>
                                                </div>
                                                <div className="bg-muted/50 p-8 rounded-3xl border border-border/50 shadow-inner">
                                                    <audio src="#" controls className="w-full" />
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'visual',
                                        label: 'Mapa Mental',
                                        icon: LuImage,
                                        content: (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                                                <div className="aspect-[4/3] w-full bg-emerald-500/5 dark:bg-emerald-500/10 rounded-3xl flex flex-col items-center justify-center border-2 border-emerald-500/20 p-8 group hover:border-emerald-500/40 transition-all">
                                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                                                        <LuZap className="w-8 h-8 text-emerald-600" />
                                                    </div>
                                                    <h5 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">Flexões Verbais</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Esquema visual dos 5 tipos de flexões fundamentais para a prova.</p>
                                                </div>
                                                <div className="aspect-[4/3] w-full bg-teal-500/5 dark:bg-teal-500/10 rounded-3xl flex flex-col items-center justify-center border-2 border-teal-500/20 p-8 group hover:border-teal-500/40 transition-all">
                                                    <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-6">
                                                        <LuTag className="w-8 h-8 text-teal-600" />
                                                    </div>
                                                    <h5 className="text-xl font-bold text-teal-700 dark:text-teal-400 mb-2">Substantivos</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Classificações entre Concreto e Abstrato e suas implicações sintáticas.</p>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'macete',
                                        label: 'Macete',
                                        icon: LuZap,
                                        content: (
                                            <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-[40px] border border-yellow-500/20">
                                                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto ring-8 ring-yellow-500/10">
                                                    <LuZap className="w-10 h-10 text-yellow-600" />
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">Verbo Impessoal (Haver vs Existir)</h4>
                                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                                        Substituiu <strong>'haver'</strong> por <strong>'existir'</strong>? Lembre-se: <br />
                                                        <span className="text-foreground font-bold font-mono px-2 py-1 bg-background rounded-lg border border-border shadow-sm mt-3 inline-block">'Haver' fica no SINGULAR | 'Existir' vai para o PLURAL!</span>
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </section>
                        <section className="mt-16">
                            <QuizInterativo questoes={qMod1} titulo="Quiz — Verbo & Substantivo" icone="📝" numero={8} onComplete={(score) => handleModuleComplete('modulo-1', score)} />
                        </section>
                    </TabsContent>
                    {/* ══════════════════════════════════════════════
                        MÓDULO 2: PRONOME & ADJETIVO
                    ══════════════════════════════════════════════ */}
                    <TabsContent value="modulo-2" className="space-y-16 mt-6">
                        <ModuleBanner numero={2} titulo="Pronome & Adjetivo" descricao="O substituto que garante a coesão e o qualificador que define a concordância nominal." gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-700" />

                        {/* ── PRONOME ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={1} title="O Pronome — Conceito Científico" variant="blue" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                O <strong>Pronome</strong> é a classe de palavra que <strong>substitui</strong> ou <strong>acompanha</strong> o substantivo, indicando as pessoas do discurso. Diferentemente do substantivo, ele não nomeia: apenas aponta, retoma ou refere-se a algo já mencionado. É fundamental para a <strong>coesão textual</strong>, pois evita a repetição de termos.
                            </p>
                            <AlertBox tipo="info" titulo="Pronome Substantivo vs Pronome Adjetivo">
                                <strong>Pronome Substantivo:</strong> substitui o nome → &quot;Ele chegou.&quot; (Ele = João). <strong>Pronome Adjetivo:</strong> acompanha o nome → &quot;Aquele carro chegou.&quot; (Aquele determina &quot;carro&quot;). Saber diferenciar é essencial para questões de coesão.
                            </AlertBox>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={2} title="Pronomes Pessoais — Retos e Oblíquos" variant="blue" />
                            <ContentAccordion titulo="Tabela Completa dos Pessoais" icone={<LuNavigation />} corIndicador="bg-blue-500" defaultOpen={true} slides={[
                                {
                                    titulo: 'Retos (Sujeito) vs Oblíquos (Complemento)', icone: '1️⃣', conteudo: (
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">Os <strong>Retos</strong> funcionam como sujeito. Os <strong>Oblíquos Átonos</strong> como complemento verbal (objeto).</p>
                                            <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 text-sm">
                                                <div className="grid grid-cols-3 gap-2 font-mono">
                                                    <div><strong>Reto</strong></div><div><strong>Oblíquo Átono</strong></div><div><strong>Oblíquo Tônico</strong></div>
                                                    <div>Eu</div><div>me</div><div>mim, comigo</div>
                                                    <div>Tu</div><div>te</div><div>ti, contigo</div>
                                                    <div>Ele/Ela</div><div>o, a, lhe, se</div><div>ele, ela, si, consigo</div>
                                                    <div>Nós</div><div>nos</div><div>nós, conosco</div>
                                                    <div>Eles/Elas</div><div>os, as, lhes, se</div><div>eles, elas, si, consigo</div>
                                                </div>
                                            </div>
                                            <AlertBox tipo="warning" titulo="Pegadinha: O/A = Objeto Direto, LHE = Objeto Indireto">
                                                &quot;Eu <strong>o</strong> vi&quot; (vi alguém = OD). &quot;Eu <strong>lhe</strong> dei o livro&quot; (dei a alguém = OI). Nunca use &quot;lhe&quot; como OD!
                                            </AlertBox>
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Colocação Pronominal (Próclise, Ênclise, Mesóclise)', icone: '2️⃣', conteudo: (
                                        <div className="space-y-3">
                                            <p className="text-muted-foreground"><strong>Próclise</strong> (antes): palavras negativas, advérbios, pronomes relativos atraem o pronome. <strong>Ênclise</strong> (depois): início de frase, após pausa. <strong>Mesóclise</strong> (no meio): só com Futuro do Presente/Pretérito.</p>
                                            <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-sm space-y-1">
                                                <p>✅ &quot;Não <strong>me</strong> diga isso.&quot; (Próclise — &quot;não&quot; atrai)</p>
                                                <p>✅ &quot;Diga-<strong>me</strong> a verdade.&quot; (Ênclise — início de frase)</p>
                                                <p>✅ &quot;Dir-<strong>lhe</strong>-ei a verdade.&quot; (Mesóclise — futuro do presente)</p>
                                            </div>
                                        </div>
                                    )
                                }
                            ]} />
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={3} title="Pronomes Demonstrativos e Relativos" variant="blue" />
                            <CardCarousel titulo="Os Grandes Astros dos Pronomes" subtitulo="Top 3 tipos mais cobrados na Cesgranrio" cards={[
                                { icone: <LuNavigation className="text-blue-500" />, titulo: "Demonstrativos", descricao: (<div className="space-y-2 text-sm"><p><strong>ESTE/ESTA:</strong> perto do emissor (aqui, presente, futuro).</p><p><strong>ESSE/ESSA:</strong> perto do receptor (aí, passado próximo).</p><p><strong>AQUELE/AQUELA:</strong> longe de ambos (lá, passado remoto).</p><p className="text-muted-foreground italic mt-2">No texto: ESTE = o que vou dizer. ESSE = o que já disse.</p></div>) },
                                { icone: <LuNavigation className="text-indigo-500" />, titulo: "Relativos", descricao: (<div className="space-y-2 text-sm"><p>Iniciam Oração Adjetiva e retomam um antecedente.</p><p><strong>QUE</strong> (o mais versátil) = o qual, a qual.</p><p><strong>CUJO</strong> (posse) ≠ nunca acompanhado de artigo.</p><p><strong>ONDE</strong> = em que (apenas para lugar físico).</p></div>) },
                                { icone: <LuNavigation className="text-rose-500" />, titulo: "Indefinidos", descricao: (<div className="space-y-2 text-sm"><p>Referem-se a seres de forma <strong>vaga</strong>: algum, nenhum, outro, vários, certo, todo.</p><p className="text-muted-foreground italic">Cesgranrio testa: &quot;algum&quot; antes do nome = afirmação. &quot;Algum&quot; depois = negação. Ex: &quot;Motivo algum&quot; = nenhum motivo.</p></div>) }
                            ]} />
                        </section>

                        {/* ── ADJETIVO ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={4} title="O Adjetivo — Conceito Científico" variant="blue" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                O <strong>Adjetivo</strong> é a classe de palavra que <strong>qualifica</strong> ou <strong>caracteriza</strong> o substantivo, atribuindo-lhe propriedades, estados ou modos de ser. É classe <strong>variável</strong> (concorda em gênero e número com o substantivo). Segundo Bechara, o adjetivo exprime qualidade inerente ou transitória do ser.
                            </p>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={5} title="A Posição do Adjetivo Muda o Sentido" variant="blue" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FlipCard frente={<span className="font-bold text-center">Adjetivo POSPOSTO<br /><span className="text-sm font-normal text-muted-foreground">(depois do substantivo)</span></span>} verso={<div className="text-center text-sm"><p className="font-bold text-blue-400 mb-2">Valor Objetivo / Denotativo</p><p>&quot;Ele é um homem <strong>grande</strong>.&quot;</p><p className="text-muted-foreground italic mt-1">(alto, forte fisicamente)</p></div>} />
                                <FlipCard frente={<span className="font-bold text-center">Adjetivo ANTEPOSTO<br /><span className="text-sm font-normal text-muted-foreground">(antes do substantivo)</span></span>} verso={<div className="text-center text-sm"><p className="font-bold text-indigo-400 mb-2">Valor Subjetivo / Conotativo</p><p>&quot;Ele é um <strong>grande</strong> homem.&quot;</p><p className="text-muted-foreground italic mt-1">(notável, importante)</p></div>} />
                            </div>
                            <AlertBox tipo="success" titulo="Dica para a Prova">
                                Quando a Cesgranrio pedir &quot;reescreva mantendo o sentido&quot;, observe se o adjetivo mudou de posição. Se mudou, o sentido pode ter sido alterado — e a alternativa estará ERRADA.
                            </AlertBox>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={6} title="Locução Adjetiva e Concordância Nominal" variant="blue" />
                            <ContentAccordion titulo="Detalhes Cruciais do Adjetivo" icone={<LuTag />} corIndicador="bg-indigo-500" defaultOpen={true} slides={[
                                {
                                    titulo: 'Locução Adjetiva (de + substantivo)', icone: '1️⃣', conteudo: (
                                        <div className="space-y-3">
                                            <p className="text-muted-foreground">Uma Locução Adjetiva é formada por preposição + substantivo, equivalendo a um adjetivo simples.</p>
                                            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm space-y-1">
                                                <p><strong>de pedra</strong> → pétreo | <strong>de ouro</strong> → áureo | <strong>de prata</strong> → argênteo</p>
                                                <p><strong>de chuva</strong> → pluvial | <strong>de boca</strong> → bucal | <strong>de olho</strong> → ocular</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Palavras Perigosas na Concordância Nominal', icone: '2️⃣', conteudo: (
                                        <div className="space-y-3">
                                            <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-sm space-y-2">
                                                <p>✅ Seguem <strong>anexas</strong> as notas. (adjetivo concorda)</p>
                                                <p>✅ Seguem <strong>em anexo</strong> as notas. (locução NÃO varia)</p>
                                                <p>✅ Ela <strong>mesma</strong> resolveu. (pronome concorda) | ❌ Ela mesmo</p>
                                                <p>✅ Muito <strong>obrigada</strong>. (mulher falando) | ❌ Muito obrigado</p>
                                            </div>
                                        </div>
                                    )
                                }
                            ]} />
                        </section>

                        {/* Resumo + Quiz */}
                        <section className="space-y-16">
                            <LessonTabs
                                variant="blue"
                                title="Resumo: Pronome & Adjetivo"
                                tabs={[
                                    {
                                        id: 'video', label: 'Vídeo Resumo', icon: LuVideo,
                                        content: (
                                            <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                                                <div className="space-y-2">
                                                    <h4 className="text-2xl font-bold">Revisão Estratégica</h4>
                                                    <p className="text-muted-foreground">Assista à revisão em vídeo sobre Pronomes e Adjetivos.</p>
                                                </div>
                                                <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: Pronomes e Adjetivos" duration="15 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'audio', label: 'Áudio Revisão', icon: LuHeadphones,
                                        content: (
                                            <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
                                                <div className="space-y-3">
                                                    <h4 className="text-2xl font-bold">Podcast do Aprovado</h4>
                                                    <p className="text-muted-foreground">Revisão em áudio dos pontos críticos para a prova.</p>
                                                </div>
                                                <div className="bg-muted/50 p-8 rounded-3xl border border-border/50">
                                                    <audio src="#" controls className="w-full" />
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'visual', label: 'Tabela Pessoais', icon: LuImage,
                                        content: (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                                                <div className="aspect-[4/3] w-full bg-blue-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-blue-500/20 p-8">
                                                    <h5 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">Pessoais</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Retos (Sujeito) vs Oblíquos (Objeto). A base da sintaxe de pronomes.</p>
                                                </div>
                                                <div className="aspect-[4/3] w-full bg-indigo-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-indigo-500/20 p-8">
                                                    <h5 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">Adjetivos</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Mudança de sentido conforme a posição em relação ao substantivo.</p>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'macete', label: 'Macete', icon: LuZap,
                                        content: (
                                            <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-blue-500/5 rounded-[40px] border border-blue-500/20">
                                                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <LuZap className="w-10 h-10 text-blue-600" />
                                                </div>
                                                <h4 className="text-2xl font-bold text-blue-700">Regra de Ouro: Próclise</h4>
                                                <p className="text-lg text-muted-foreground italic">
                                                    &quot;Palavras negativas, advérbios e pronomes relativos são imãs de próclise: eles puxam o pronome para antes do verbo!&quot;
                                                </p>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </section>
                        <section className="mt-16">
                            <QuizInterativo questoes={qMod2} titulo="Quiz — Pronome & Adjetivo" icone="⚡" numero={7} onComplete={(score) => handleModuleComplete('modulo-2', score)} />
                        </section>
                    </TabsContent>
                    {/* ══════════════════════════════════════════════
                        MÓDULO 3: CONJUNÇÃO & PREPOSIÇÃO
                    ══════════════════════════════════════════════ */}
                    <TabsContent value="modulo-3" className="space-y-16 mt-6">
                        <ModuleBanner numero={3} titulo="Conjunção & Preposição" descricao="Os conectivos que unem orações e os elos que subordinam termos. Bases de coesão e regência." gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-700" />

                        {/* ── CONJUNÇÃO ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={1} title="A Conjunção — Conceito Científico" variant="amber" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                A <strong>Conjunção</strong> é a classe de palavra <strong>invariável</strong> que <strong>liga orações</strong> ou termos de mesma função sintática. Sem conjunções, o texto viraria um amontoado de frases soltas. Elas são o verdadeiro &quot;cimento&quot; da coesão textual — e por isso a Cesgranrio as cobra intensamente em questões de reescrita e coesão.
                            </p>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={2} title="Conjunções Coordenativas" variant="amber" />
                            <ContentAccordion titulo="Os 5 Tipos Coordenativos" icone={<LuLink2 />} corIndicador="bg-amber-500" defaultOpen={true} slides={[
                                {
                                    titulo: 'Aditivas, Adversativas e Alternativas', icone: '1️⃣', conteudo: (
                                        <div className="space-y-4">
                                            <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-sm space-y-2">
                                                <p><strong className="text-amber-700 dark:text-amber-400">Aditivas (e, nem, não só...mas também):</strong> somam ideias.</p>
                                                <p className="italic">&quot;Estudou <strong>e</strong> passou.&quot;</p>
                                                <p><strong className="text-amber-700 dark:text-amber-400">Adversativas (mas, porém, contudo, todavia):</strong> ideias opostas.</p>
                                                <p className="italic">&quot;Estudou, <strong>mas</strong> não passou.&quot;</p>
                                                <p><strong className="text-amber-700 dark:text-amber-400">Alternativas (ou, ou...ou, ora...ora):</strong> alternância.</p>
                                                <p className="italic">&quot;<strong>Ou</strong> estuda, <strong>ou</strong> trabalha.&quot;</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Conclusivas e Explicativas', icone: '2️⃣', conteudo: (
                                        <div className="space-y-4">
                                            <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20 text-sm space-y-2">
                                                <p><strong className="text-orange-700 dark:text-orange-400">Conclusivas (logo, portanto, pois [após o verbo]):</strong> conclusão.</p>
                                                <p className="italic">&quot;Estudou muito; <strong>logo</strong>, passou.&quot;</p>
                                                <p><strong className="text-orange-700 dark:text-orange-400">Explicativas (pois [antes do verbo], porque, que):</strong> justificativa.</p>
                                                <p className="italic">&quot;Leve o guarda-chuva, <strong>pois</strong> vai chover.&quot;</p>
                                            </div>
                                        </div>
                                    )
                                }
                            ]} />
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={3} title="Causal × Explicativa — A Armadilha Clássica" variant="amber" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FlipCard frente={<span className="font-bold text-center">CAUSAL<br /><span className="text-sm font-normal text-muted-foreground">(motivo REAL do fato)</span></span>} verso={<div className="text-sm text-center"><p>&quot;O poço secou <strong>porque</strong> choveu pouco.&quot;</p><p className="text-muted-foreground italic mt-2">A chuva fraca é a CAUSA real do poço ter secado.</p></div>} />
                                <FlipCard frente={<span className="font-bold text-center">EXPLICATIVA<br /><span className="text-sm font-normal text-muted-foreground">(justificativa da FALA)</span></span>} verso={<div className="text-sm text-center"><p>&quot;Leve o guarda-chuva, <strong>porque</strong> vai chover.&quot;</p><p className="text-muted-foreground italic mt-2">Não é a causa de levar; é a justificativa da sugestão do emissor.</p></div>} />
                            </div>
                            <AlertBox tipo="success" titulo="Macete de Ouro">
                                Se antes do &quot;porque/pois&quot; houver um verbo no IMPERATIVO ou uma sugestão, é EXPLICATIVA. Se for um fato real seguido de motivo, é CAUSAL.
                            </AlertBox>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={4} title="Subordinativas (9 tipos)" variant="amber" />
                            <CardCarousel titulo="Conjunções Subordinativas" subtitulo="As 5 mais cobradas pela Cesgranrio" itemsPerView={1} cards={[
                                { icone: <LuLink2 className="text-amber-500" />, titulo: "Causais", descricao: (<div className="text-sm space-y-1"><p>porque, visto que, já que, como (= porque)</p><p className="italic">&quot;<strong>Como</strong> choveu, adiamos.&quot;</p></div>) },
                                { icone: <LuLink2 className="text-orange-500" />, titulo: "Concessivas", descricao: (<div className="text-sm space-y-1"><p>embora, conquanto, ainda que, mesmo que</p><p className="italic">&quot;<strong>Embora</strong> cansados, prosseguiram.&quot;</p></div>) },
                                { icone: <LuLink2 className="text-yellow-600" />, titulo: "Condicionais", descricao: (<div className="text-sm space-y-1"><p>se, caso, contanto que, desde que</p><p className="italic">&quot;<strong>Se</strong> estudar, passará.&quot;</p></div>) },
                                { icone: <LuLink2 className="text-rose-500" />, titulo: "Consecutivas", descricao: (<div className="text-sm space-y-1"><p>que (precedido de tão/tanto/tal/tamanho)</p><p className="italic">&quot;Estudou <strong>tanto que</strong> passou.&quot;</p></div>) },
                                { icone: <LuLink2 className="text-indigo-500" />, titulo: "Integrantes", descricao: (<div className="text-sm space-y-1"><p>que, se (introduzem oração substantiva)</p><p className="italic">&quot;Espero <strong>que</strong> você passe.&quot;</p></div>) }
                            ]} />
                        </section>

                        {/* ── PREPOSIÇÃO ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={5} title="A Preposição — Conceito Científico" variant="amber" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                A <strong>Preposição</strong> é a classe de palavra <strong>invariável</strong> que <strong>liga dois termos</strong>, estabelecendo entre eles uma relação de <strong>subordinação</strong> (o segundo termo completa o sentido do primeiro). É essencial na Regência verbal e nominal e na formação da <strong>crase</strong> (a + a = à).
                            </p>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={6} title="Essenciais, Acidentais e Contrações" variant="amber" />
                            <ContentAccordion titulo="O Mundo das Preposições" icone={<LuLink2 />} corIndicador="bg-orange-500" defaultOpen={true} slides={[
                                {
                                    titulo: 'Preposições Essenciais', icone: '1️⃣', conteudo: (
                                        <div className="space-y-3">
                                            <p className="text-muted-foreground">São as palavras que SEMPRE funcionam como preposição:</p>
                                            <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-sm">
                                                <p className="font-bold">a, ante, após, até, com, contra, de, desde, em, entre, para, per, perante, por, sem, sob, sobre, trás</p>
                                                <p className="text-muted-foreground italic mt-2">Macete: &quot;A ANTE APÓS ATÉ COM...&quot; — decore como uma lista rítmica.</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Combinação e Contração', icone: '2️⃣', conteudo: (
                                        <div className="space-y-3">
                                            <p className="text-muted-foreground"><strong>Combinação</strong> (sem perda de sons): a + o = <strong>ao</strong>. <strong>Contração</strong> (com perda): de + o = <strong>do</strong>, em + a = <strong>na</strong>, a + a = <strong>à</strong> (crase).</p>
                                            <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20 text-sm space-y-1">
                                                <p>de + o = <strong>do</strong> | de + a = <strong>da</strong> | em + o = <strong>no</strong> | em + a = <strong>na</strong></p>
                                                <p>a + aquele = <strong>àquele</strong> | per + o = <strong>pelo</strong> | de + este = <strong>deste</strong></p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Relações Semânticas das Preposições', icone: '3️⃣', conteudo: (
                                        <div className="space-y-3">
                                            <p className="text-muted-foreground">A mesma preposição pode expressar diferentes relações conforme o contexto:</p>
                                            <div className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20 text-sm space-y-1">
                                                <p><strong>Lugar:</strong> &quot;Foi <strong>a</strong> Macaé.&quot; | <strong>Tempo:</strong> &quot;Saiu <strong>às</strong> 8h.&quot;</p>
                                                <p><strong>Modo:</strong> &quot;Pintou <strong>a</strong> óleo.&quot; | <strong>Causa:</strong> &quot;Morreu <strong>de</strong> fome.&quot;</p>
                                                <p><strong>Posse:</strong> &quot;Carro <strong>de</strong> João.&quot; | <strong>Instrumento:</strong> &quot;Cortou <strong>com</strong> faca.&quot;</p>
                                            </div>
                                        </div>
                                    )
                                }
                            ]} />
                        </section>

                        {/* Resumo + Quiz */}
                        <section className="space-y-16">
                            <LessonTabs
                                variant="amber"
                                title="Resumo: Conjunção & Preposição"
                                tabs={[
                                    {
                                        id: 'video', label: 'Vídeo Resumo', icon: LuVideo,
                                        content: (
                                            <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                                                <div className="space-y-2">
                                                    <h4 className="text-2xl font-bold">Revisão Estratégica</h4>
                                                    <p className="text-muted-foreground">Assista à revisão em vídeo sobre Conjunções e Preposições.</p>
                                                </div>
                                                <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: Conjunções e Preposições" duration="15 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'audio', label: 'Áudio Revisão', icon: LuHeadphones,
                                        content: (
                                            <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
                                                <div className="space-y-3">
                                                    <h4 className="text-2xl font-bold">Podcast do Aprovado</h4>
                                                    <p className="text-muted-foreground">Ouça o resumo sempre que não puder ver a tela. Ideal para deslocamentos.</p>
                                                </div>
                                                <div className="bg-muted/50 p-8 rounded-3xl border border-border/50">
                                                    <audio src="#" controls className="w-full" />
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'visual', label: 'Mapa Mental', icon: LuImage,
                                        content: (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                                                <div className="aspect-[4/3] w-full bg-amber-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-amber-500/20 p-8 transition-all hover:bg-amber-500/10">
                                                    <h5 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-2">Conjunções</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Os 5 tipos coordenativos e os 9 subordinativos em um só lugar.</p>
                                                </div>
                                                <div className="aspect-[4/3] w-full bg-orange-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-orange-500/20 p-8 transition-all hover:bg-orange-500/10">
                                                    <h5 className="text-xl font-bold text-orange-700 dark:text-orange-400 mb-2">Preposições</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Tabela de contrações (de+o, em+a) e relações semânticas.</p>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'macete', label: 'Macete', icon: LuZap,
                                        content: (
                                            <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-amber-500/5 rounded-[40px] border border-amber-500/20">
                                                <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <LuZap className="w-10 h-10 text-amber-600" />
                                                </div>
                                                <h4 className="text-2xl font-bold text-amber-700">Causal vs Explicativa</h4>
                                                <p className="text-lg text-muted-foreground">
                                                    &quot;Verbo no <strong>Imperativo</strong> antes do 'que/porque'? É <strong>Explicativa</strong>! Se for um fato já ocorrido motivando outro, é <strong>Causal</strong>.&quot;
                                                </p>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </section>
                        <section className="mt-16">
                            <QuizInterativo questoes={qMod3} titulo="Quiz — Conjunção & Preposição" icone="🔗" numero={7} onComplete={(score) => handleModuleComplete('modulo-3', score)} />
                        </section>
                    </TabsContent>
                    {/* ══════════════════════════════════════════════
                        MÓDULO 4: ADVÉRBIO & ARTIGO
                    ══════════════════════════════════════════════ */}
                    <TabsContent value="modulo-4" className="space-y-16 mt-6">
                        <ModuleBanner numero={4} titulo="Advérbio & Artigo" descricao="O modificador invariável que a Cesgranrio adora testar e o pequeno determinante que transforma classes." gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-700" />

                        {/* ── ADVÉRBIO ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={1} title="O Advérbio — Conceito Científico" variant="rose" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                O <strong>Advérbio</strong> é a classe de palavra <strong>invariável</strong> que modifica o <strong>verbo</strong> (trabalha <em>bem</em>), o <strong>adjetivo</strong> (<em>muito</em> bom) ou outro <strong>advérbio</strong> (<em>muito</em> bem). Ele nunca modifica substantivo (se modificar, será adjetivo). Sua principal armadilha na Cesgranrio: certas palavras mudam de classe dependendo do contexto (meio, bastante, certo).
                            </p>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={2} title="Classificações do Advérbio" variant="rose" />
                            <ContentAccordion titulo="Os 7 Tipos de Advérbio" icone={<LuActivity />} corIndicador="bg-rose-500" defaultOpen={true} slides={[
                                {
                                    titulo: 'Lugar, Tempo e Modo', icone: '1️⃣', conteudo: (
                                        <div className="space-y-4">
                                            <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-sm space-y-2">
                                                <p><strong className="text-rose-700 dark:text-rose-400">Lugar:</strong> aqui, ali, lá, perto, longe, dentro, fora, onde</p>
                                                <p className="italic">&quot;A plataforma fica <strong>longe</strong>.&quot;</p>
                                                <p><strong className="text-rose-700 dark:text-rose-400">Tempo:</strong> hoje, ontem, agora, sempre, nunca, cedo, tarde, já</p>
                                                <p className="italic">&quot;O turno começa <strong>cedo</strong>.&quot;</p>
                                                <p><strong className="text-rose-700 dark:text-rose-400">Modo:</strong> bem, mal, assim, depressa, e a maioria dos terminados em <strong>-mente</strong></p>
                                                <p className="italic">&quot;O técnico trabalhou <strong>rapidamente</strong>.&quot;</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Intensidade, Negação, Afirmação e Dúvida', icone: '2️⃣', conteudo: (
                                        <div className="space-y-3">
                                            <div className="bg-pink-500/10 p-4 rounded-xl border border-pink-500/20 text-sm space-y-2">
                                                <p><strong className="text-pink-700 dark:text-pink-400">Intensidade:</strong> muito, pouco, bastante, demais, mais, menos, tão</p>
                                                <p><strong className="text-pink-700 dark:text-pink-400">Negação:</strong> não, nunca, jamais, nem</p>
                                                <p><strong className="text-pink-700 dark:text-pink-400">Afirmação:</strong> sim, certamente, realmente</p>
                                                <p><strong className="text-pink-700 dark:text-pink-400">Dúvida:</strong> talvez, quiçá, possivelmente</p>
                                            </div>
                                        </div>
                                    )
                                }
                            ]} />
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={3} title="As Palavras Camaleão — Meio, Bastante, Certo, Menos" variant="rose" />
                            <AlertBox tipo="danger" titulo="🚨 Pegadinha Número 1 da Cesgranrio!">
                                &quot;Meio&quot;, &quot;bastante&quot; e &quot;certo&quot; mudam de classe conforme o contexto. Advérbio = invariável. Adjetivo/Pronome/Numeral = variável. E &quot;menos&quot; NUNCA varia (&quot;menas&quot; NÃO existe).
                            </AlertBox>
                            <CardCarousel titulo="Dicionário das Palavras Perigosas" subtitulo="Decore essas regras para não cair na armadilha" cards={[
                                { icone: <LuShield className="text-rose-500" />, titulo: "MEIO", descricao: (<div className="text-sm space-y-2"><p>✅ &quot;Ela estava <strong>meio</strong> cansada.&quot; (Advérbio = um pouco → invariável)</p><p>✅ &quot;Comprei <strong>meia</strong> dúzia.&quot; (Numeral = metade → variável)</p><p className="text-red-500 font-bold">❌ &quot;Ela estava meia cansada.&quot; → ERRADO!</p></div>) },
                                { icone: <LuShield className="text-pink-500" />, titulo: "BASTANTE", descricao: (<div className="text-sm space-y-2"><p>✅ &quot;Estudo <strong>bastante</strong>.&quot; (Advérbio = muito → invariável)</p><p>✅ &quot;Comprei <strong>bastantes</strong> livros.&quot; (Pronome Indefinido = muitos → variável)</p></div>) },
                                { icone: <LuShield className="text-fuchsia-500" />, titulo: "MENOS", descricao: (<div className="text-sm space-y-2"><p>✅ &quot;Tinha <strong>menos</strong> gente.&quot;</p><p>✅ &quot;Havia <strong>menos</strong> pessoas.&quot;</p><p className="text-red-500 font-bold">❌ &quot;Havia menas pessoas.&quot; → &quot;MENAS&quot; NÃO EXISTE!</p></div>) },
                                { icone: <LuShield className="text-indigo-500" />, titulo: "ALERTA", descricao: (<div className="text-sm space-y-2"><p>✅ &quot;Os guardas estão <strong>alerta</strong>.&quot; (Advérbio → invariável)</p><p className="text-red-500 font-bold">❌ &quot;Estão alertas.&quot; → ERRADO!</p></div>) }
                            ]} />
                        </section>

                        {/* ── ARTIGO ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={4} title="O Artigo — Conceito Científico" variant="rose" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                O <strong>Artigo</strong> é a classe de palavra <strong>variável</strong> que antecede o substantivo para <strong>determiná-lo</strong> (artigo definido: o, a, os, as) ou <strong>indeterminá-lo</strong> (artigo indefinido: um, uma, uns, umas). É uma classe pequena em quantidade, mas gigante em impacto: ele define a substantivação e influencia a concordância.
                            </p>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={5} title="O Artigo como 'Rei Midas' e a Regra do Proibido/Necessário" variant="rose" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FlipCard frente={<span className="font-bold text-center">Derivação Imprópria<br /><span className="text-sm font-normal text-muted-foreground">(Artigo transforma classe)</span></span>} verso={<div className="text-sm text-center space-y-2"><p><strong>O cantar</strong> → verbo virou subst.</p><p><strong>O azul</strong> → adjetivo virou subst.</p><p><strong>Um não</strong> → advérbio virou subst.</p></div>} />
                                <FlipCard frente={<span className="font-bold text-center">É Proibido/Necessário<br /><span className="text-sm font-normal text-muted-foreground">(COM ou SEM artigo?)</span></span>} verso={<div className="text-sm text-center space-y-2"><p>✅ &quot;É <strong>proibido</strong> entrada.&quot; (sem artigo = invariável)</p><p>✅ &quot;É <strong>proibida</strong> a entrada.&quot; (com artigo = concorda)</p><p className="text-muted-foreground italic">A presença do artigo muda tudo!</p></div>} />
                            </div>
                        </section>

                        {/* Resumo + Quiz */}
                        <section className="space-y-16">
                            <LessonTabs
                                variant="rose"
                                title="Resumo: Advérbio & Artigo"
                                tabs={[
                                    {
                                        id: 'video', label: 'Vídeo Resumo', icon: LuVideo,
                                        content: (
                                            <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                                                <div className="space-y-2">
                                                    <h4 className="text-2xl font-bold">Revisão Estratégica</h4>
                                                    <p className="text-muted-foreground">Assista à revisão em vídeo sobre Advérbios e Artigos.</p>
                                                </div>
                                                <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: Advérbios e Artigos" duration="15 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'audio', label: 'Áudio Revisão', icon: LuHeadphones,
                                        content: (
                                            <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
                                                <div className="space-y-3">
                                                    <h4 className="text-2xl font-bold">Podcast do Aprovado</h4>
                                                    <p className="text-muted-foreground">Ouça o resumo sempre que não puder ver a tela. Ideal para deslocamentos.</p>
                                                </div>
                                                <div className="bg-muted/50 p-8 rounded-3xl border border-border/50">
                                                    <audio src="#" controls className="w-full" />
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'visual', label: 'Mapa Mental', icon: LuImage,
                                        content: (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                                                <div className="aspect-[4/3] w-full bg-rose-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-rose-500/20 p-8 transition-all hover:bg-rose-500/10">
                                                    <h5 className="text-xl font-bold text-rose-700 dark:text-rose-400 mb-2">Advérbios</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Classificações: Lugar, Tempo, Modo, Intensidade e Negação.</p>
                                                </div>
                                                <div className="aspect-[4/3] w-full bg-pink-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-pink-500/20 p-8 transition-all hover:bg-pink-500/10">
                                                    <h5 className="text-xl font-bold text-pink-700 dark:text-pink-400 mb-2">Artigos</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Substantivação e a regra do Proibido/Necessário com artigo.</p>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'macete', label: 'Macete', icon: LuZap,
                                        content: (
                                            <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-rose-500/5 rounded-[40px] border border-rose-500/20">
                                                <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <LuZap className="w-10 h-10 text-rose-600" />
                                                </div>
                                                <h4 className="text-2xl font-bold text-rose-700">O Teste do 'Muito'</h4>
                                                <p className="text-lg text-muted-foreground">
                                                    &quot;Na dúvida se uma palavra é Advérbio ou Adjetivo, troque por 'muito'. Se ficar invariável, é <strong>Advérbio</strong>. Se virar 'muitos/muitas', é <strong>Adjetivo/Pronome</strong>!&quot;
                                                </p>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </section>
                        <section className="mt-16">
                            <QuizInterativo questoes={qMod4} titulo="Quiz — Advérbio & Artigo" icone="🎯" numero={6} onComplete={(score) => handleModuleComplete('modulo-4', score)} />
                        </section>
                    </TabsContent>
                    {/* ══════════════════════════════════════════════
                        MÓDULO 5: NUMERAL, INTERJEIÇÃO & LABORATÓRIO
                    ══════════════════════════════════════════════ */}
                    <TabsContent value="modulo-5" className="space-y-16 mt-6">
                        <ModuleBanner numero={5} titulo="Numeral, Interjeição & Laboratório Final" descricao="As duas classes de menor frequência na prova e o simulado integrador de todas as 10 classes gramaticais." gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />

                        {/* ── NUMERAL ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={1} title="O Numeral — Conceito Científico" variant="violet" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                O <strong>Numeral</strong> é a classe de palavra que indica <strong>quantidade</strong>, <strong>ordem</strong>, <strong>multiplicação</strong> ou <strong>fração</strong> dos seres. Diferente do que parece, em provas da Cesgranrio ele aparece disfarçado em questões de concordância (&quot;ambos&quot;, &quot;meio/meia&quot;) e não como cálculo matemático.
                            </p>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={2} title="Classificações e Armadilhas" variant="violet" />
                            <ContentAccordion titulo="Os 4 Tipos de Numeral" icone={<LuHash />} corIndicador="bg-violet-500" defaultOpen={true} slides={[
                                {
                                    titulo: 'Cardinal, Ordinal, Multiplicativo e Fracionário', icone: '1️⃣', conteudo: (
                                        <div className="space-y-4">
                                            <div className="bg-violet-500/10 p-5 rounded-xl border border-violet-500/20 text-sm space-y-2">
                                                <p><strong className="text-violet-700 dark:text-violet-400">Cardinal:</strong> quantidade exata → um, dois, três, cem, mil</p>
                                                <p><strong className="text-violet-700 dark:text-violet-400">Ordinal:</strong> posição/ordem → primeiro, segundo, trigésimo</p>
                                                <p><strong className="text-violet-700 dark:text-violet-400">Multiplicativo:</strong> multiplicação → dobro, triplo, quádruplo</p>
                                                <p><strong className="text-violet-700 dark:text-violet-400">Fracionário:</strong> divisão → meio, terço, quinto, décimo</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: 'Ambos/Ambas e Meio/Meia como Numeral', icone: '2️⃣', conteudo: (
                                        <div className="space-y-3">
                                            <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 text-sm space-y-2">
                                                <p>✅ &quot;<strong>Ambos</strong> os candidatos passaram.&quot; (numeral dual = os dois → VARIA)</p>
                                                <p>✅ &quot;<strong>Ambas</strong> as plataformas operam.&quot;</p>
                                                <p>✅ &quot;Comprei <strong>meia</strong> dúzia.&quot; (numeral fracionário = metade → VARIA)</p>
                                                <p className="text-muted-foreground italic">Não confunda: &quot;Ela estava meio cansada&quot; (advérbio = invariável)</p>
                                            </div>
                                        </div>
                                    )
                                }
                            ]} />
                        </section>

                        {/* ── INTERJEIÇÃO ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={3} title="A Interjeição — Conceito Científico" variant="violet" />
                            <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                                A <strong>Interjeição</strong> é a classe de palavra <strong>invariável</strong> que expressa <strong>emoções</strong> ou <strong>reações</strong> súbitas do falante. Sempre acompanhada de ponto de exclamação (!). Na Cesgranrio, aparece raramente, mas quando surge costuma testar a <strong>pontuação</strong> associada e o reconhecimento de <strong>Locuções Interjetivas</strong>.
                            </p>
                            <CardCarousel titulo="Interjeições por Emoção" subtitulo="A mesma interjeição pode mudar de emoção pelo contexto" cards={[
                                { icone: <LuZap className="text-green-500" />, titulo: "Alegria / Alívio", descricao: (<div className="text-sm"><p>Ah! / Ufa! / Eba! / Viva!</p><p className="italic mt-1">&quot;<strong>Ufa!</strong> A prova acabou!&quot;</p></div>) },
                                { icone: <LuZap className="text-red-500" />, titulo: "Dor / Espanto", descricao: (<div className="text-sm"><p>Ai! / Ui! / Puxa! / Nossa!</p><p className="italic mt-1">&quot;<strong>Nossa!</strong> Que questão difícil!&quot;</p></div>) },
                                { icone: <LuZap className="text-amber-500" />, titulo: "Locuções Interjetivas", descricao: (<div className="text-sm"><p>Meu Deus! / Valha-me Deus! / Que horror!</p><p className="text-muted-foreground italic mt-1">Duas ou mais palavras com valor de interjeição.</p></div>) }
                            ]} />
                        </section>

                        {/* ── LABORATÓRIO FINAL ── */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
                            <ModuleSectionHeader index={4} title="Quadro-Resumo — As 10 Classes Gramaticais" variant="violet" />
                            <AlertBox tipo="info" titulo="Hora de consolidar tudo!">
                                Antes do simulado final, relembre as 10 classes. Use este resumo como revisão rápida antes da prova.
                            </AlertBox>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { classe: '🔴 Verbo', def: 'Expressa ação, estado ou fenômeno. Flexiona em pessoa, número, tempo, modo e voz.' },
                                    { classe: '🟢 Substantivo', def: 'Nomeia seres, objetos, sentimentos, ações. Núcleo de praticamente todos os termos.' },
                                    { classe: '🔵 Pronome', def: 'Substitui ou acompanha o substantivo. Essencial para a coesão textual.' },
                                    { classe: '🟡 Adjetivo', def: 'Qualifica o substantivo. A posição (antes/depois) pode mudar o sentido.' },
                                    { classe: '🟠 Conjunção', def: 'Liga orações ou termos de mesma função. Invariável. Coordenativas e Subordinativas.' },
                                    { classe: '🟤 Preposição', def: 'Liga termos com subordinação. Invariável. Base da regência e crase.' },
                                    { classe: '🩷 Advérbio', def: 'Modifica verbo, adjetivo ou outro advérbio. Invariável. Meio/bastante são armadilhas.' },
                                    { classe: '⚪ Artigo', def: 'Determina ou indetermina o substantivo. Pode forçar substantivação (derivação imprópria).' },
                                    { classe: '🟣 Numeral', def: 'Indica quantidade, ordem, multiplicação, fração. Ambos/meia são cobrados.' },
                                    { classe: '🔘 Interjeição', def: 'Expressa emoção súbita. Invariável. Sempre com ponto de exclamação.' }
                                ].map((item, i) => (
                                    <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border/50">
                                        <p className="font-bold text-sm">{item.classe}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{item.def}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Resumo Visual + Simulado Final */}
                        <section className="space-y-16">
                            <LessonTabs
                                variant="violet"
                                title="Resumo: 10 Classes Clássicas"
                                tabs={[
                                    {
                                        id: 'video', label: 'Vídeo Resumo', icon: LuVideo,
                                        content: (
                                            <div className="max-w-4xl mx-auto w-full px-4 text-center space-y-6">
                                                <div className="space-y-2">
                                                    <h4 className="text-2xl font-bold">Revisão Integrada</h4>
                                                    <p className="text-muted-foreground">Assista à revisão em vídeo de todas as classes gramaticais.</p>
                                                </div>
                                                <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: 10 Classes de Palavras" duration="15 min" thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" />
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'audio', label: 'Áudio Revisão', icon: LuHeadphones,
                                        content: (
                                            <div className="max-w-2xl mx-auto w-full px-6 py-12 text-center space-y-8">
                                                <div className="space-y-3">
                                                    <h4 className="text-2xl font-bold">Podcast do Aprovado</h4>
                                                    <p className="text-muted-foreground">Revisão completa das 10 classes para ouvir onde quiser.</p>
                                                </div>
                                                <div className="bg-muted/50 p-8 rounded-3xl border border-border/50">
                                                    <audio src="#" controls className="w-full" />
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'visual', label: 'Mapa Mental', icon: LuImage,
                                        content: (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                                                <div className="aspect-[4/3] w-full bg-violet-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-violet-500/20 p-8 transition-all hover:bg-violet-500/10">
                                                    <h5 className="text-xl font-bold text-violet-700 dark:text-violet-400 mb-2">As 10 Classes</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Esquema visual completo de todas as categorias morfológicas.</p>
                                                </div>
                                                <div className="aspect-[4/3] w-full bg-indigo-500/5 rounded-3xl flex flex-col items-center justify-center border-2 border-indigo-500/20 p-8 transition-all hover:bg-indigo-500/10">
                                                    <h5 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">Relacionamentos</h5>
                                                    <p className="text-sm text-muted-foreground text-center">Como cada classe se relaciona entre si (ex: Advérbio modifica Verbo).</p>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'macete', label: 'Macete', icon: LuZap,
                                        content: (
                                            <div className="max-w-3xl mx-auto p-12 text-center space-y-8 bg-violet-500/5 rounded-[40px] border border-violet-500/20">
                                                <div className="w-20 h-20 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <LuZap className="w-10 h-10 text-violet-600" />
                                                </div>
                                                <h4 className="text-2xl font-bold text-violet-700">O Macete Final: CIA P</h4>
                                                <p className="text-lg text-muted-foreground">
                                                    &quot;As classes <strong>INVARIÁVEIS</strong> são a <strong>CIA P</strong>: <strong>C</strong>onjunção, <strong>I</strong>nterjeição, <strong>A</strong>dvérbio e <strong>P</strong>reposição. Todo o resto varia!&quot;
                                                </p>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </section>
                        <section className="mt-16">
                            <QuizInterativo questoes={qLab} titulo="Simulado Final — Todas as 10 Classes" icone="🏆" numero={5} onComplete={(score) => handleModuleComplete('modulo-5', score)} />
                        </section>

                        {/* Botão de Conclusão */}
                        <section className="flex justify-center pt-8 pb-12">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-12 py-6 rounded-2xl text-lg font-bold shadow-xl shadow-violet-500/20 hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105"
                                onClick={onComplete}
                                disabled={completedModules.size < MODULE_DEFS.length}
                            >
                                <LuCheck className="mr-2" /> Concluir Aula de Classes de Palavras
                            </Button>
                        </section>
                    </TabsContent>

                </Tabs>
            </main>
        </div>
    );
}
