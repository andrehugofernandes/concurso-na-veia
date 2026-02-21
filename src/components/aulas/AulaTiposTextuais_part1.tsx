'use client';

import { useState, useCallback, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LuCheck, LuVideo, LuHeadphones, LuImage, LuZap, LuBookOpen, LuShield, LuMessageCircle, LuAlertTriangle, LuArrowRight, LuEye, LuFileText } from 'react-icons/lu';
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

const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Narrativo & Descritivo' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'Dissertativo' },
    { id: 'modulo-3', label: 'Módulo 3', titulo: 'Injuntivo & Dialogal' },
    { id: 'modulo-4', label: 'Módulo 4', titulo: 'Gêneros vs. Tipos' },
    { id: 'modulo-5', label: 'Módulo 5', titulo: 'Laboratório & Revisão' }
] as const;

// ============================================================================
// POOLS DE QUESTÕES
// ============================================================================

const QUIZ_MOD1_POOL: QuizQuestion[] = [
    {
        id: 101,
        pergunta: "Leia o trecho: 'A plataforma era imensa, revestida de aço pintado de amarelo desbotado pelo sol. O som constante do mar batendo nas pilastras ecoava...' Qual o tipo textual predominante?",
        opcoes: [
            { label: 'A', valor: "Narrativo, pois relata as ações do mar." },
            { label: 'B', valor: "Descritivo, pois caracteriza estaticamente o ambiente." },
            { label: 'C', valor: "Dissertativo, pois expõe o problema da maresia." },
            { label: 'D', valor: "Injuntivo, pois instrui como observar a plataforma." }
        ],
        correta: 'B',
        explicacao: "A descrição pinta um 'quadro mental' com adjetivos e características simultâneas, sem progressão de ações no tempo."
    },
    {
        id: 102,
        pergunta: "Para haver um texto narrativo, é estritamente necessária a presença de:",
        opcoes: [
            { label: 'A', valor: "Progressão temporal de ações com personagens em um enredo." },
            { label: 'B', valor: "Adjetivos detalhados sobre o espaço da ação." },
            { label: 'C', valor: "Argumentos que convençam o leitor sobre a moral da história." },
            { label: 'D', valor: "Diálogos diretos entre personagens principais." }
        ],
        correta: 'A',
        explicacao: "A narração exige mudança de estado no tempo (ações cronológicas) envolvendo personagens dentro de um enredo."
    },
    {
        id: 103,
        pergunta: "No discurso indireto livre, o que ocorre com a voz do narrador e do personagem?",
        opcoes: [
            { label: 'A', valor: "O narrador introduz a fala exata do personagem com travessão." },
            { label: 'B', valor: "O narrador relata o que o personagem disse usando 'que'." },
            { label: 'C', valor: "As falas ou pensamentos do personagem se misturam à fala do narrador sem marcas de transição." },
            { label: 'D', valor: "O personagem assume o lugar do narrador na primeira pessoa temporalmente." }
        ],
        correta: 'C',
        explicacao: "O discurso indireto livre é uma fusão. Não há verbos de elocução ('disse que') nem travessões, o pensamento do personagem invade a narração."
    },
    {
        id: 104,
        pergunta: "Uma descrição **subjetiva** difere de uma objetiva porque:",
        opcoes: [
            { label: 'A', valor: "Usa dados técnicos, medidas exatas e vocabulário técnico." },
            { label: 'B', valor: "Expressa a percepção, emoção e opinião de quem descreve." },
            { label: 'C', valor: "Apresenta apenas fatos cronológicos de forma clara." },
            { label: 'D', valor: "Não utiliza adjetivos, focando apenas nos substantivos." }
        ],
        correta: 'B',
        explicacao: "A descrição subjetiva está carregada das impressões e sentimentos do observador, enquanto a objetiva busca ser exata e neutra."
    },
    {
        id: 105,
        pergunta: "Em um relatório de manutenção na Petrobras, a seção 'Estado do Equipamento Antes da Pintura' exige o uso do tipo textual:",
        opcoes: [
            { label: 'A', valor: "Narrativo, contando a história do desgaste." },
            { label: 'B', valor: "Dissertativo, argumentando sobre a qualidade da tinta." },
            { label: 'C', valor: "Injuntivo, ordenando aos funcionários o que pintar." },
            { label: 'D', valor: "Descritivo objetivo, detalhando as características físicas." }
        ],
        correta: 'D',
        explicacao: "Para relatar o estado físico (rachaduras, ferrugem, cores), usa-se a descrição objetiva, técnica e isenta de opiniões literárias."
    },
    {
        id: 106,
        pergunta: "Identifique o tipo de discurso no trecho: 'O engenheiro olhou para o duto vazando. O que faria agora? A pressão estava muito alta.'",
        opcoes: [
            { label: 'A', valor: "Discurso direto" },
            { label: 'B', valor: "Discurso indireto" },
            { label: 'C', valor: "Discurso indireto livre" },
            { label: 'D', valor: "Ausência de discurso" }
        ],
        correta: 'C',
        explicacao: "As perguntas e pensamentos do engenheiro ('O que faria agora?') fluem misturados com a narração em terceira pessoa, sem aviso prévio."
    },
    {
        id: 107,
        pergunta: "Na narração, se o narrador tudo sabe, inclusive os pensamentos dos personagens, ele é chamado de:",
        opcoes: [
            { label: 'A', valor: "Narrador personagem" },
            { label: 'B', valor: "Narrador observador" },
            { label: 'C', valor: "Narrador onisciente" },
            { label: 'D', valor: "Narrador intruso" }
        ],
        correta: 'C',
        explicacao: "Opcional ou total, a onisciência permite ao narrador transcender o espaço físico e entrar na mente das personagens."
    },
    {
        id: 108,
        pergunta: "Quando a predominância do texto é informar as características verbais ou visuais simultâneas de um objeto, sem tempo avançando, temos um(a):",
        opcoes: [
            { label: 'A', valor: "Conto (Narrativa)" },
            { label: 'B', valor: "Fotografia textual (Descrição)" },
            { label: 'C', valor: "Manobra lógica (Dissertação)" },
            { label: 'D', valor: "Comando (Injunção)" }
        ],
        correta: 'B',
        explicacao: "A descrição paralisa o tempo. É como tirar uma fotografia textual ('A sala era fria, luz branca, cadeiras azuis')."
    }
];

const QUIZ_MOD2_POOL: QuizQuestion[] = [
    {
        id: 201,
        pergunta: "A principal diferença entre Dissertação Expositiva e Dissertação Argumentativa é que:",
        opcoes: [
            { label: 'A', valor: "A expositiva apresenta fatos e a argumentativa busca convencer o leitor de uma tese." },
            { label: 'B', valor: "A expositiva usa 1ª pessoa e a argumentativa usa 3ª pessoa." },
            { label: 'C', valor: "A expositiva instrui a fazer algo, a argumentativa apenas descreve o tema." },
            { label: 'D', valor: "Não há diferença, ambas servem para convencer via ordem direta." }
        ],
        correta: 'A',
        explicacao: "Dissertar-expor é apenas explicar algo de modo impessoal (como este resumo). Dissertar-argumentar visa persuadir sobre um ponto de vista (tese)."
    },
    {
        id: 202,
        pergunta: "Leia: 'Segundo a Agência Nacional do Petróleo (ANP), o Brasil é o maior produtor de águas profundas.' Que tipo de argumento foi utilizado?",
        opcoes: [
            { label: 'A', valor: "Argumento de autoridade" },
            { label: 'B', valor: "Argumento por analogia" },
            { label: 'C', valor: "Argumento de causa e consequência" },
            { label: 'D', valor: "Argumento de exemplificação" }
        ],
        correta: 'A',
        explicacao: "Para fundamentar a informação, citou-se uma instituição de renome e especialista no assunto (ANP). Isso é argumento de autoridade."
    },
    {
        id: 203,
        pergunta: "Na estrutura da dissertação argumentativa, a 'Tese' costuma aparecer em qual parte?",
        opcoes: [
            { label: 'A', valor: "No primeiro parágrafo do Desenvolvimento." },
            { label: 'B', valor: "Na Conclusão, fechando o texto." },
            { label: 'C', valor: "Na Introdução, apresentando o ponto de vista." },
            { label: 'D', valor: "Apenas indiretamente no título." }
        ],
        correta: 'C',
        explicacao: "A tese é o núcleo do texto e deve ser apresentada logo na Introdução. No desenvolvimento ela é defendida, e na conclusão é reafirmada."
    },
    {
        id: 204,
        pergunta: "Um texto dissertativo expositivo tem como objetivo primordial:",
        opcoes: [
            { label: 'A', valor: "Incentivar uma mudança de comportamento no leitor." },
            { label: 'B', valor: "Explicar, informar e esclarecer um assunto sem defender opiniões polêmicas." },
            { label: 'C', valor: "Relatar fatos com riqueza de cronologia e personagens reais." },
            { label: 'D', valor: "Fornecer regras de segurança para evacuação do prédio." }
        ],
        correta: 'B',
        explicacao: "O texto expositivo expõe as ideias sem polemizar ou tentar impor um juízo de valor. É comum em jornais, enciclopédias e livros didáticos."
    },
    {
        id: 205,
        pergunta: "No argumento de 'Causa e Consequência', a lógica defendida baseia-se em:",
        opcoes: [
            { label: 'A', valor: "Citar falas de especialistas." },
            { label: 'B', valor: "Fazer comparações entre dois elementos distantes." },
            { label: 'C', valor: "Mostrar que o evento inicial A resultou, inevitavelmente, no evento B." },
            { label: 'D', valor: "Apresentar uma lista numérica de acontecimentos não relacionados." }
        ],
        correta: 'C',
        explicacao: "Estabelecer uma relação de causa e efeito fortalece a tese (Ex: 'A falta de manutenção nas sondas [causa] levou ao risco de vazamento [efeito]')."
    },
    {
        id: 206,
        pergunta: "Indique o trecho marcadamente Argumentativo:",
        opcoes: [
            { label: 'A', valor: "A Petrobras foi fundada em 1953." },
            { label: 'B', valor: "Os funcionários da área operacional vestem uniformes com faixas refletivas na cor laranja." },
            { label: 'C', valor: "É inadmissível que os cortes em P&D continuem, pois isso condenará a inovação e o futuro energético do país." },
            { label: 'D', valor: "As brocas de perfuração medem entre dez a trinta polegadas, sendo trocadas mensalmente." }
        ],
        correta: 'C',
        explicacao: "As palavras valorativas ('inadmissível', 'condenará') emitem forte opinião e julgamento sobre o impacto de um fato, buscando adesão."
    }
];
