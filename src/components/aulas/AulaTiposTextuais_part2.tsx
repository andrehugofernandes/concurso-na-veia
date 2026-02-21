
const QUIZ_MOD3_POOL: QuizQuestion[] = [
    {
        id: 301,
        pergunta: "Em um Manual de Procedimento Operacional Padrão da Refinaria, prevalece a tipologia:",
        opcoes: [
            { label: 'A', valor: "Descritiva passiva." },
            { label: 'B', valor: "Injuntiva ou instrucional." },
            { label: 'C', valor: "Dissertativa técnica." },
            { label: 'D', valor: "Narrativa cronológica." }
        ],
        correta: 'B',
        explicacao: "O texto injuntivo (ou instrucional) serve para dar ordens, instruções ou ensinar a fazer algo, como num manual, receita ou bula."
    },
    {
        id: 302,
        pergunta: "Qual modo verbal é a marca registrada do texto injuntivo?",
        opcoes: [
            { label: 'A', valor: "Indicativo (certeza)." },
            { label: 'B', valor: "Subjuntivo (dúvida)." },
            { label: 'C', valor: "Imperativo (ordem/conselho)." },
            { label: 'D', valor: "Infinitivo impessoal (sempre)." }
        ],
        correta: 'C',
        explicacao: "Verbos no imperativo ('aperte', 'verifique', 'feche') são a principal característica da função conativa/apelativa na injunção."
    },
    {
        id: 303,
        pergunta: "Leia: 'Ligue o computador. Insira sua senha. Aguarde o sistema carregar.' Isso é um texto:",
        opcoes: [
            { label: 'A', valor: "Injuntivo prescritivo." },
            { label: 'B', valor: "Descrição objetiva narrada." },
            { label: 'C', valor: "Narração em 2ª pessoa." },
            { label: 'D', valor: "Dissertação sobre o login." }
        ],
        correta: 'A',
        explicacao: "Há uma sequência de instruções diretas buscando modificar o comportamento ou ação do leitor."
    },
    {
        id: 304,
        pergunta: "O tipo textual 'Dialogal' ou 'Conversacional' caracteriza-se por:",
        opcoes: [
            { label: 'A', valor: "Longas explanações de um único emissor sem interrupções." },
            { label: 'B', valor: "Troca de turnos de fala entre dois ou mais interlocutores." },
            { label: 'C', valor: "Uso exclusivo de linguagem formal e culta na escrita." },
            { label: 'D', valor: "Ausência de marcas de oralidade." }
        ],
        correta: 'B',
        explicacao: "O diálogo exige a interação. Marcas como 'né?', pausas, interrogações e respostas configuram a troca de turnos típica deste tipo."
    },
    {
        id: 305,
        pergunta: "Em qual gênero abaixo o tipo textal dialogal é absolutamente essencial?",
        opcoes: [
            { label: 'A', valor: "Receita de bolo." },
            { label: 'B', valor: "Bula de remédio." },
            { label: 'C', valor: "Roteiro de teatro." },
            { label: 'D', valor: "Editorial de jornal." }
        ],
        correta: 'C',
        explicacao: "Uma peça teatral é feita fundamentalmente de diálogos (tipo dialogal/conversacional), embora possa ter sequências narrativas nas rubricas."
    },
    {
        id: 306,
        pergunta: "Em textos injuntivos como Editais de Concurso, a principal finalidade é:",
        opcoes: [
            { label: 'A', valor: "Narrar a história das bancas." },
            { label: 'B', valor: "Prescrever condutas, regras e deveres que não podem ser ignorados." },
            { label: 'C', valor: "Descrever detalhadamente a sala de aula." },
            { label: 'D', valor: "Argumentar que a CESGRANRIO é a melhor banca." }
        ],
        correta: 'B',
        explicacao: "O edital é injuntivo prescritivo. Ele dita regras, proibições ('não portar celular') e passos para a inscrição, exigindo cumprimento."
    }
];

const QUIZ_MOD4_POOL: QuizQuestion[] = [
    {
        id: 401,
        pergunta: "Segundo a teoria linguística cobrada em provas, a diferença fundamental é que:",
        opcoes: [
            { label: 'A', valor: "Gêneros são limitados a 5 categorias, Tipos são infinitos." },
            { label: 'B', valor: "Gêneros se referem à intenção social (notícia, crônica, receita), Tipos se referem à estrutura (narração, dissertação)." },
            { label: 'C', valor: "Não há diferença, são sinônimos." },
            { label: 'D', valor: "Gênero só existe na fala, Tipo só existe na escrita." }
        ],
        correta: 'B',
        explicacao: "Tipos (narração, descrição, etc.) são bases estruturais restritas. Gêneros (e-mail, tweet, artigo, receita) são as incontáveis formas que textos assumem no uso cotidiano."
    },
    {
        id: 402,
        pergunta: "Uma notícia de jornal sobre um acidente na rodovia tem, predominantemente, a tipologia:",
        opcoes: [
            { label: 'A', valor: "Narrativa, relata um acontecimento com tempo e espaço no passado." },
            { label: 'B', valor: "Dissertativa, critica os motoristas ruins." },
            { label: 'C', valor: "Injuntiva, manda reduzir a velocidade." },
            { label: 'D', valor: "Descritiva poética." }
        ],
        correta: 'A',
        explicacao: "A notícia (gênero) costuma ter tipologia dominante Narrativa, pois relata *o que* aconteceu, *quando* e *onde* (fatos no tempo)."
    },
    {
        id: 403,
        pergunta: "O que significa dizer que um texto apresenta 'hibridismo tipológico'?",
        opcoes: [
            { label: 'A', valor: "Ele não pertence a nenhum idioma conhecido." },
            { label: 'B', valor: "Ele mistura estruturas de narração, descrição e argumentação em um único texto." },
            { label: 'C', valor: "Ele foi escrito por duas pessoas diferentes." },
            { label: 'D', valor: "Ele não pode ser cobrado na CESGRANRIO." }
        ],
        correta: 'B',
        explicacao: "É raro um texto ser 100% de um único tipo. Quase sempre há hibridismo (uma dissertação com trechos descritivos, por exemplo)."
    },
    {
        id: 404,
        pergunta: "Em um gênero 'Bula de Remédio', qual a sequência tipológica dominante?",
        opcoes: [
            { label: 'A', valor: "Narrativa, contando a história do remédio." },
            { label: 'B', valor: "Dialogal, falando com o leitor." },
            { label: 'C', valor: "Injuntiva, indicando dosagens e como usar (posologia)." },
            { label: 'D', valor: "Argumentativa, convencendo que o remédio cura." }
        ],
        correta: 'C',
        explicacao: "A bula instrui o paciente a como tomar o remédio (injunção), ainda que traga pequenas descrições (aparência do comprimido)."
    },
    {
        id: 405,
        pergunta: "Gênero: Resenha Crítica. Tipologia dominante:",
        opcoes: [
            { label: 'A', valor: "Narração de aventura." },
            { label: 'B', valor: "Dissertativa-Argumentativa." },
            { label: 'C', valor: "Injunção instrucional." },
            { label: 'D', valor: "Descrição pura." }
        ],
        correta: 'B',
        explicacao: "Na resenha crítica, o autor resume a obra (exposição) e emite forte julgamento de valor para convencer o leitor (argumentação)."
    },
    {
        id: 406,
        pergunta: "Se a CESGRANRIO perguntar 'O fragmento x constitui uma descrição...', ela está questionando sobre:",
        opcoes: [
            { label: 'A', valor: "Gênero do texto principal." },
            { label: 'B', valor: "Modo de organização discursiva / Tipo Textual." },
            { label: 'C', valor: "A intenção do narrador secundário." },
            { label: 'D', valor: "A marca de oralidade." }
        ],
        correta: 'B',
        explicacao: "Falou em Narrativo, Descritivo, Dissertativo ou Injuntivo? A questão aborda *Tipo Textual* ou *Modo de Organização/Sequência Textual*."
    }
];

const QUIZ_MOD5_POOL: QuizQuestion[] = [
    {
        id: 501,
        pergunta: "Assinale a opção em que o trecho é fundamentalmente uma INJUNÇÃO.",
        opcoes: [
            { label: 'A', valor: "A parede de aço reluzia contra o céu acinzentado da manhã de ontem..." },
            { label: 'B', valor: "Foi então que o marinheiro gritou, sem entender direito de onde vinha a voz..." },
            { label: 'C', valor: "Para evitar acidentes, certifique-se de que a válvula P-14 esteja fechada, travando a alavanca em seguida." },
            { label: 'D', valor: "É evidente que os cortes em pesquisa não garantem um bom desempenho a longo prazo da empresa." }
        ],
        correta: 'C',
        explicacao: "Verbos no imperativo ('certifique-se', mandando o leitor agir) definem a injunção. A é Descrição; B é Narração; D é Argumentação."
    },
    {
        id: 502,
        pergunta: "Um ensaio acadêmico defendendo a mudança para energias renováveis no Brasil seria:",
        opcoes: [
            { label: 'A', valor: "Narração ficcional pura." },
            { label: 'B', valor: "Gênero Ensaio; Tipo Dissertativo-Argumentativo." },
            { label: 'C', valor: "Gênero Argumento; Tipo Acadêmico." },
            { label: 'D', valor: "Gênero Crônica; Tipo Expositivo." }
        ],
        correta: 'B',
        explicacao: "Ensaio (Gênero, intenção social e suporte) e Argumentativo (Tipo estrutural base, expondo e defendendo ideias)."
    },
    {
        id: 503,
        pergunta: "Qual das palavras-chave indica uma TESE numa argumentação?",
        opcoes: [
            { label: 'A', valor: "'Então, a princesa disse feliz...'" },
            { label: 'B', valor: "'Cerca de 25% da frota está velha...'" },
            { label: 'C', valor: "'Ligue a batedeira por 5 minutos...'" },
            { label: 'D', valor: "'Portanto, é inaceitável ignorarmos o risco...'" }
        ],
        correta: 'D',
        explicacao: "Adjetivos moralizantes e opiniões formam a Tese. A palavra 'inaceitável' emite juízo de valor argumentativo."
    },
    {
        id: 504,
        pergunta: "A CESGRANRIO costuma misturar tipos. Se um texto conta 'Em 2005 foi descoberto o Pré-Sal' e logo emenda 'Essa reserva profunda provou que a Petrobras domina águas profundas, sendo esse nosso maior orgulho', o autor:",
        opcoes: [
            { label: 'A', valor: "Fez uma narração objetiva do início ao fim." },
            { label: 'B', valor: "Foi de uma sequencia temporal (narração/exposição histórica) para uma opinião argumentativa." },
            { label: 'C', valor: "Apresenta apenas descrição." },
            { label: 'D', valor: "Comete erro de coerência." }
        ],
        correta: 'B',
        explicacao: "Primeiro relata fatos no tempo, depois emite opinião ('nosso maior orgulho', 'provou'). É o hibridismo tipológico clássico."
    },
    {
        id: 505,
        pergunta: "A Crônica (gênero) tem como característica a mistura de quais Tipos Textuais geralmente?",
        opcoes: [
            { label: 'A', valor: "Somente injunção e descrição." },
            { label: 'B', valor: "Narração (conta fatos do cotidiano) e Argumentação/Reflexão (sobre esses mesmos fatos)." },
            { label: 'C', valor: "Dissertação acadêmica misturada com manuais injuntivos." },
            { label: 'D', valor: "Sem características tipológicas definidas." }
        ],
        correta: 'B',
        explicacao: "A crônica aborda um fato do dia a dia (Narração base) e então tece considerações e opiniões sobre ele (Dissertação argumentativa reflexiva)."
    },
    {
        id: 506,
        pergunta: "A frase: 'O Sol batia forte e a brisa era seca' pertence a qual Tipo Textual?",
        opcoes: [
            { label: 'A', valor: "Descritivo, detalhando uma cena/ambiente no momento." },
            { label: 'B', valor: "Narrativo, contando uma sequência veloz de ações no passado." },
            { label: 'C', valor: "Expositivo, explicando cientificamente a seca." },
            { label: 'D', valor: "Injuntivo, alertando sobre a seca." }
        ],
        correta: 'A',
        explicacao: "Mostra características sensoriais fixas (luz e vento) configurando uma fotografia local, ou seja, descrição."
    }
];

// ============================================================================
// DADOS ESTÁTICOS & HELPERS EXTERNIZADOS
// ============================================================================

const GENERO_VS_TIPO_FLIPS = [
    {
        frente: (
            <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                    Tipo Textual
                </span>
                <span className="font-medium text-lg text-foreground/80 mt-2">
                    (Narração, Descrição...)
                </span>
            </div>
        ),
        verso: (
            <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                <p><strong>São poucos e rígidos.</strong></p>
                <p className="text-muted-foreground">Forma estrutural profunda (como a gramática visual e lógica). Existem cerca de 5 ou 6 tipos.</p>
            </div>
        )
    },
    {
        frente: (
            <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                <LuArrowRight className="w-10 h-10 text-muted-foreground/40" />
            </div>
        ),
        verso: (
            <div className="flex flex-col justify-center h-full text-center text-sm p-4">
                <p className="font-bold text-amber-500">MÚLTIPLOS GÊNEROS DEVORAM OS TIPOS</p>
            </div>
        )
    },
    {
        frente: (
            <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Gênero Textual
                </span>
                <span className="font-medium text-lg text-foreground/80 mt-2">
                    (Crônica, Notícia...)
                </span>
            </div>
        ),
        verso: (
            <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                <p><strong>São infinitos e sociais.</strong></p>
                <p className="text-muted-foreground">Textos prontos da sociedade. Uma <strong>crônica</strong> (gênero) tem base na <strong>narração</strong> (tipo).</p>
            </div>
        )
    }
];
