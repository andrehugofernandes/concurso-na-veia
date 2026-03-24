import { QuizQuestion } from "../../shared";

// ── MÓDULO 1: PREDICTION & PRE-READING ────────────────────────────────
export const QUIZ_M1_PREDICTION: QuizQuestion[] = [
  {
    id: "ing-m1-q1",
    pergunta: "According to the principles of 'Prediction' in instrumental English, which element is most likely to provide the core theme of a Petrobras technical report before reading the first paragraph?",
    opcoes: [
      { label: "a", valor: "The number of pages in the document." },
      { label: "b", valor: "The title and subheadings of the report." },
      { label: "c", valor: "The bibliography section at the end." },
      { label: "d", valor: "The font size used in the footnotes." },
      { label: "e", valor: "The date the document was printed." }
    ],
    correta: "b",
    explicacao: "Prediction involves using pre-reading elements like titles, subheadings, and images to anticipate the main subject. Titles are the most direct indicators of a report's theme."
  },
  {
    id: "ing-m1-q2",
    pergunta: "If a text title is 'Offshore Drilling Safety Protocols', what is the most logical prediction about its content?",
    opcoes: [
      { label: "a", valor: "A history of oil prices in the 1970s." },
      { label: "b", valor: "A biography of a famous petroleum engineer." },
      { label: "c", valor: "Guidelines for preventing accidents on oil rigs." },
      { label: "d", valor: "A marketing plan for renewable energy solar panels." },
      { label: "e", valor: "Instructions on how to refine crude oil into gasoline." }
    ],
    correta: "c",
    explicacao: "The words 'Offshore Drilling' and 'Safety Protocols' predict content related to security measures in marine oil extraction."
  },
  {
    id: "ing-m1-q3",
    pergunta: "Which of the following is NOT a typical pre-reading element used for 'Prediction'?",
    opcoes: [
      { label: "a", valor: "Charts and graphs." },
      { label: "b", valor: "Bolded keywords." },
      { label: "c", valor: "Captions under photographs." },
      { label: "d", valor: "The index or table of contents." },
      { label: "e", valor: "The list of irregular verbs in an appendix." }
    ],
    correta: "e",
    explicacao: "A list of verbs is a grammar resource, not a textual element that helps predict the specific semantic content of a text."
  },
  {
    id: "ing-m1-q4",
    pergunta: "In a Cesgranrio exam, looking at a diagram of a 'Blowout Preventer (BOP)' before reading the text is an application of:",
    opcoes: [
      { label: "a", valor: "Scanning for dates." },
      { label: "b", valor: "Skimming for grammar points." },
      { label: "c", valor: "Prediction/Pre-reading strategies." },
      { label: "d", valor: "Translating the entire text." },
      { label: "e", valor: "Ignoring visual aids to focus on text." }
    ],
    correta: "c",
    explicacao: "Analyzing visual aids (diagrams, photos) is a key part of prediction strategies to build context."
  },
  {
    id: "ing-m1-q5",
    pergunta: "The source 'Petrobras Sustainability Report 2023' helps the reader predict that the text will likely focus on:",
    opcoes: [
      { label: "a", valor: "Political scandals in Europe." },
      { label: "b", valor: "Environmental impacts and social responsibility." },
      { label: "c", valor: "The best restaurants near the refinery." },
      { label: "d", valor: "How to fix a domestic water leak." },
      { label: "e", valor: "Speculative fiction about space travel." }
    ],
    correta: "b",
    explicacao: "The source (Sustainability Report) strongly predicts topics like environment, carbon footprint, and ESG (Environmental, Social, and Governance)."
  },
  {
    id: "ing-m1-q6",
    pergunta: "Prediction is a strategy that focuses on:",
    opcoes: [
      { label: "a", valor: "Aktivating previous knowledge and expectations." },
      { label: "b", valor: "Reading every word carefully and slowly." },
      { label: "c", valor: "Memorizing the dictionary before the test." },
      { label: "d", valor: "Rewriting the text in Portuguese." },
      { label: "e", valor: "Ignoring the title to avoid bias." }
    ],
    correta: "a",
    explicacao: "Prediction helps the brain 'warm up' by activating what the reader already knows about the subject."
  },
  {
    id: "ing-m1-q7",
    pergunta: "When you see the word 'Downstream' in a title, you should predict topics related to:",
    opcoes: [
      { label: "a", valor: "Searching for new oil fields in the deep sea." },
      { label: "b", valor: "Refining, marketing, and distribution of products." },
      { label: "c", valor: "Seismic surveys and geological mapping." },
      { label: "d", valor: "Drilling exploratory wells in the Amazon." },
      { label: "e", valor: "Building offshore platforms from scratch." }
    ],
    correta: "b",
    explicacao: "Downstream is the sector of the industry that deals with transforming crude oil into products and selling them."
  },
  {
    id: "ing-m1-q8",
    pergunta: "A subheading titled 'Mitigating Carbon Emissions' suggests the text will discuss:",
    opcoes: [
      { label: "a", valor: "Ways to increase greenhouse gases." },
      { label: "b", valor: "Solutions for reducing environmental impact." },
      { label: "c", valor: "Techniques for deep-water diving." },
      { label: "d", valor: "The chemical composition of steel pipes." },
      { label: "e", valor: "A historical account of the steam engine." }
    ],
    correta: "b",
    explicacao: "Mitigating means reducing/alleviating. Carbon emissions relate to environmental impact."
  },
  {
    id: "ing-m1-q9",
    pergunta: "Which question is most helpful for the 'Prediction' phase?",
    opcoes: [
      { label: "a", valor: "How many adjectives are in the third paragraph?" },
      { label: "b", valor: "What do I already know about this company/topic?" },
      { label: "c", valor: "What is the phonetic pronunciation of the last word?" },
      { label: "d", valor: "Can I translate 'hydrocarbon' into French?" },
      { label: "e", valor: "How many lines are in the text?" }
    ],
    correta: "b",
    explicacao: "Activating prior knowledge is the core of effective prediction."
  },
  {
    id: "ing-m1-q10",
    pergunta: "In an exam, 'Prediction' should ideally be done:",
    opcoes: [
      { label: "a", valor: "After reading the whole text three times." },
      { label: "b", valor: "Simultaneously while answer questions." },
      { label: "c", valor: "Before starting the formal reading of the paragraphs." },
      { label: "d", valor: "Only if you don't understand the first sentence." },
      { label: "e", valor: "When you have already finished the entire test." }
    ],
    correta: "c",
    explicacao: "It's a pre-reading strategy to set the stage for comprehension."
  }
];

// ── MÓDULO 2: SKIMMING ──────────────────────────────────────────────
export const QUIZ_M2_SKIMMING: QuizQuestion[] = [
  {
    id: "ing-m2-q1",
    pergunta: "The main goal of applying 'Skimming' to a text is to:",
    opcoes: [
      { label: "a", valor: "Find a specific number, like a year or percentage." },
      { label: "b", valor: "Understand every single grammatical rule used." },
      { label: "c", valor: "Get the general gist or main idea of the message." },
      { label: "d", valor: "Translate the text into another language." },
      { label: "e", valor: "Memorize the technical vocabulary." }
    ],
    correta: "c",
    explicacao: "Skimming is a high-speed reading technique to identify the main theme or overall purpose of a text."
  },
  {
    id: "ing-m2-q2",
    pergunta: "When skimming reaching the conclusion of a text, you are likely to find:",
    opcoes: [
      { label: "a", valor: "A detailed list of all resources used." },
      { label: "b", valor: "A summary of the main arguments or results." },
      { label: "c", valor: "The name of the author's parents." },
      { label: "d", valor: "A dictionary of terms used in the text." },
      { label: "e", valor: "The pricing of the magazine where it was published." }
    ],
    correta: "b",
    explicacao: "Conclusions usually recap the main point, which is essential for skimming."
  },
  {
    id: "ing-m2-q3",
    pergunta: "Which part of a paragraph is most important during a 'Skimming' session?",
    opcoes: [
      { label: "a", valor: "The adjectives in the middle." },
      { label: "b", valor: "The punctuations at the end." },
      { label: "c", valor: "The topic sentence (usually the first one)." },
      { label: "d", valor: "The prepositions." },
      { label: "e", valor: "The page numbers." }
    ],
    correta: "c",
    explicacao: "The topic sentence typically introduces the main idea of the paragraph."
  },
  {
    id: "ing-m2-q4",
    pergunta: "If you read only the titles and the first sentence of each paragraph, you are performing:",
    opcoes: [
      { label: "a", valor: "Scanning." },
      { label: "b", valor: "Intensive reading." },
      { label: "c", valor: "Critical analysis." },
      { label: "d", valor: "Skimming." },
      { label: "e", valor: "Grammar review." }
    ],
    correta: "d",
    explicacao: "This is the classic way to get the 'gist' quickly."
  },
  {
    id: "ing-m2-q5",
    pergunta: "Skimming is most useful in an exam when:",
    opcoes: [
      { label: "a", valor: "You have plenty of time to read every word." },
      { label: "b", valor: "The question asks for a specific date." },
      { label: "c", valor: "The question asks for the 'Main Purpose' of the text." },
      { label: "d", valor: "You want to check the spelling of a word." },
      { label: "e", valor: "The text is very short (one sentence)." }
    ],
    correta: "c",
    explicacao: "Cesgranrio often asks 'What is the main purpose of this passage?', which is solved by skimming."
  },
  {
    id: "ing-m2-q6",
    pergunta: "A reader notices the word 'However' frequently. This signal word during skimming indicates:",
    opcoes: [
      { label: "a", valor: "A summary is coming." },
      { label: "b", valor: "An additional example." },
      { label: "c", valor: "A contrast or shift in perspective." },
      { label: "d", valor: "The end of the text." },
      { label: "e", valor: "A list of items." }
    ],
    correta: "c",
    explicacao: "Transitional words like 'However' or 'But' are crucial during skimming to understand the flow of ideas."
  },
  {
    id: "ing-m2-q7",
    pergunta: "Which of these is a typical 'Skimming' speed compared to regular reading?",
    opcoes: [
      { label: "a", valor: "Much slower." },
      { label: "b", valor: "The same speed." },
      { label: "c", valor: "Three to four times faster." },
      { label: "d", valor: "Reading word by word backwards." },
      { label: "e", valor: "Reading only the silent letters." }
    ],
    correta: "c",
    explicacao: "Skimming is a rapid survey technique."
  },
  {
    id: "ing-m2-q8",
    pergunta: "In a text about 'Petrobras and Green Hydrogen', a skimming reader would quickly identify the core subject as:",
    opcoes: [
      { label: "a", valor: "The price of diesel in 1990." },
      { label: "b", valor: "New energy transition technologies." },
      { label: "c", valor: "How to paint a gas station." },
      { label: "d", valor: "The salary of a secretary." },
      { label: "e", valor: "The geography of Alaska." }
    ],
    correta: "b",
    explicacao: "'Green Hydrogen' and 'Petrobras' signal a focus on energy transition."
  },
  {
    id: "ing-m2-q9",
    pergunta: "What should you ignore while skimming?",
    opcoes: [
      { label: "a", valor: "Titles." },
      { label: "b", valor: "Specific details and secondary examples." },
      { label: "c", valor: "The first paragraph." },
      { label: "d", valor: "Bolded words." },
      { label: "e", valor: "The main verb of the first sentence." }
    ],
    correta: "b",
    explicacao: "Skimming filters out details to find the 'skeleton' of the text."
  },
  {
    id: "ing-m2-q10",
    pergunta: "Cesgranrio often uses the word 'Intends' in questions. Matching this with skimming helps identify:",
    opcoes: [
      { label: "a", valor: "The author's intention or goal." },
      { label: "b", valor: "The exact number of inhabitants." },
      { label: "c", valor: "The date of the author's birth." },
      { label: "d", valor: "The price of the book." },
      { label: "e", valor: "The chemical formula of oil." }
    ],
    correta: "a",
    explicacao: "Skimming is perfect for identifying author intent."
  }
];

// ── MÓDULO 3: SCANNING ──────────────────────────────────────────────
export const QUIZ_M3_SCANNING: QuizQuestion[] = [
  {
    id: "ing-m3-q1",
    pergunta: "Scanning is a reading technique used primarily to:",
    opcoes: [
      { label: "a", valor: "Understand the philosophy behind the text." },
      { label: "b", valor: "Locate specific information rapidly." },
      { label: "c", valor: "Improve the reader's pronunciation." },
      { label: "d", valor: "Critique the author's style." },
      { label: "e", valor: "Read the entire text in 30 seconds." }
    ],
    correta: "b",
    explicacao: "Scanning is like a 'Ctrl+F' function for the human eye, looking for names, dates, numbers, or specific keywords."
  },
  {
    id: "ing-m3-q2",
    pergunta: "Which of the following would require 'Scanning' rather than Skimming?",
    opcoes: [
      { label: "a", valor: "Identifying the overall mood of the story." },
      { label: "b", valor: "Deciding if the text is for or against a topic." },
      { label: "c", valor: "Finding the exact year Petrobras was founded in a text." },
      { label: "d", valor: "Briefly explaining what 'Sustainability' means." },
      { label: "e", valor: "Choosing a title for the passage." }
    ],
    correta: "c",
    explicacao: "Finding a specific year is a classic scanning task."
  },
  {
    id: "ing-m3-q3",
    pergunta: "To scan effectively, your should:",
    opcoes: [
      { label: "a", valor: "Read every sentence from left to right." },
      { label: "b", valor: "Start from the last paragraph and go up." },
      { label: "c", valor: "Have a specific keyword in mind to look for." },
      { label: "d", valor: "Close your eyes and point at the page." },
      { label: "e", valor: "Translate the first paragraph." }
    ],
    correta: "c",
    explicacao: "Scanning requires knowing what you are looking for before you start."
  },
  {
    id: "ing-m3-q4",
    pergunta: "In a Cesgranrio question like 'According to paragraph 4, what was the percentage increase?', you should use:",
    opcoes: [
      { label: "a", valor: "Prediction only." },
      { label: "b", valor: "Skimming of the whole text." },
      { label: "c", valor: "Scanning of paragraph 4." },
      { label: "d", valor: "A dictionary." },
      { label: "e", valor: "Intuition without reading." }
    ],
    correta: "c",
    explicacao: "The question points to a specific location and specific data (percentage)."
  },
  {
    id: "ing-m3-q5",
    pergunta: "What visual features help with scanning?",
    opcoes: [
      { label: "a", valor: "White space between paragraphs." },
      { label: "b", valor: "Capital letters, numbers, and symbols like '$' or '%'." },
      { label: "c", valor: "Small, thin fonts." },
      { label: "d", valor: "Long sentences." },
      { label: "e", valor: "The color of the paper." }
    ],
    correta: "b",
    explicacao: "Numbers and capital letters stand out visually, making scanning easier."
  },
  {
    id: "ing-m3-q6",
    pergunta: "Scanning should be used:",
    opcoes: [
      { label: "a", valor: "To prove why the author is wrong." },
      { label: "b", valor: "When you need a quick answer to a detail question." },
      { label: "c", valor: "To learn how to write like the author." },
      { label: "d", valor: "After you have failed the exam." },
      { label: "e", valor: "Only in narrative fiction poems." }
    ],
    correta: "b",
    explicacao: "Detail questions (who, where, when, how much) are the target of scanning."
  },
  {
    id: "ing-m3-q7",
    pergunta: "If the keyword is 'FPSO', where would your eyes concentrate while scanning?",
    opcoes: [
      { label: "a", valor: "On lowercase prepositions." },
      { label: "b", valor: "On all words starting with 'F', especially in caps." },
      { label: "c", valor: "On the author's biography." },
      { label: "d", valor: "On the page footer." },
      { label: "e", valor: "On the images of flowers." }
    ],
    correta: "b",
    explicacao: "Acronyms are identified by their capital letters."
  },
  {
    id: "ing-m3-q8",
    pergunta: "Scanning helps most in questions that start with:",
    opcoes: [
      { label: "a", valor: "What is the author's tone...?" },
      { label: "b", valor: "According to the text, in which year...?" },
      { label: "c", valor: "Describe the underlying metaphor of..." },
      { label: "d", valor: "Infer the future of the company..." },
      { label: "e", valor: "Which of the following would be a good title...?" }
    ],
    correta: "b",
    explicacao: "Questions about dates and specific facts are solved with scanning."
  },
  {
    id: "ing-m3-q9",
    pergunta: "A characteristic of scanning is:",
    opcoes: [
      { label: "a", valor: "High comprehension of the whole text." },
      { label: "b", valor: "Low speed, high detail reading." },
      { label: "c", valor: "High speed, selective focus." },
      { label: "d", valor: "Skipping the text entirely." },
      { label: "e", valor: "Translating every word." }
    ],
    correta: "c",
    explicacao: "Scanning is fast but ignores anything not related to the search target."
  },
  {
    id: "ing-m3-q10",
    pergunta: "In Petrobras exams, terms like 'Pre-salt' or 'Refinery' are often keywords for:",
    opcoes: [
      { label: "a", valor: "Skimming." },
      { label: "b", valor: "Scanning." },
      { label: "c", valor: "Critique." },
      { label: "d", valor: "Poetic analysis." },
      { label: "e", valor: "Spelling checks." }
    ],
    correta: "b",
    explicacao: "Technical terms function as anchors for scanning."
  }
];

// ── MÓDULO 4: VOCABULARY & CONTEXT ─────────────────────────────────
export const QUIZ_M4_VOCABULARY: QuizQuestion[] = [
  {
    id: "ing-m4-q1",
    pergunta: "Which word is a 'False Cognate' (Falso Amigo) that frequently appears in English exams?",
    opcoes: [
      { label: "a", valor: "Actually (meaning 'na verdade')." },
      { label: "b", valor: "Information (meaning 'informação')." },
      { label: "c", valor: "Problem (meaning 'problema')." },
      { label: "d", valor: "Oil (meaning 'óleo')." },
      { label: "e", valor: "Safety (meaning 'segurança')." }
    ],
    correta: "a",
    explicacao: "'Actually' looks like 'atualmente' but means 'in reality/in fact'. This is a classic trap."
  },
  {
    id: "ing-m4-q2",
    pergunta: "In the sentence 'The company intends to increase its production', the word 'intends' means:",
    opcoes: [
      { label: "a", valor: "Entende." },
      { label: "b", valor: "Pretende." },
      { label: "c", valor: "Inventa." },
      { label: "d", valor: "Indica." },
      { label: "e", valor: "Interrompe." }
    ],
    correta: "b",
    explicacao: "To intend = pretender/ter a intenção."
  },
  {
    id: "ing-m4-q3",
    pergunta: "The word 'Eventually' in a text about energy transition usually means:",
    opcoes: [
      { label: "a", valor: "Eventualmente (raramente)." },
      { label: "b", valor: "Finalmente / Com o tempo." },
      { label: "c", valor: "Certamente." },
      { label: "d", valor: "Talvez." },
      { label: "e", valor: "Nunca." }
    ],
    correta: "b",
    explicacao: "Eventually = 'no fim das contas' or 'com o passar do tempo', NOT 'eventualmente' (which is 'occasionally')."
  },
  {
    id: "ing-m4-q4",
    pergunta: "In the phrase 'Petrobras announced a novel technology', the word 'novel' means:",
    opcoes: [
      { label: "a", valor: "Novela." },
      { label: "b", valor: "Livro." },
      { label: "c", valor: "Inovadora / Nova." },
      { label: "d", valor: "Antiga." },
      { label: "e", valor: "Complicada." }
    ],
    correta: "c",
    explicacao: "In this context, 'novel' is an adjective meaning new and original."
  },
  {
    id: "ing-m4-q5",
    pergunta: "A synonym for 'Hazardous' often found in safety manuals is:",
    opcoes: [
      { label: "a", valor: "Safe." },
      { label: "b", valor: "Dangerous." },
      { label: "c", valor: "Cheap." },
      { label: "d", valor: "Blue." },
      { label: "e", valor: "Fast." }
    ],
    correta: "b",
    explicacao: "Hazardous = perigoso."
  },
  {
    id: "ing-m4-q6",
    pergunta: "What does 'To monitor' mean in an industrial context?",
    opcoes: [
      { label: "a", valor: "Ignorar." },
      { label: "b", valor: "Monitorar / Acompanhar." },
      { label: "c", valor: "Destruir." },
      { label: "d", valor: "Vender." },
      { label: "e", valor: "Esconder." }
    ],
    correta: "b",
    explicacao: "Cognate word with direct meaning in industry."
  },
  {
    id: "ing-m4-q7",
    pergunta: "The term 'Crude oil' refers to:",
    opcoes: [
      { label: "a", valor: "Óleo processado." },
      { label: "b", valor: "Petróleo bruto." },
      { label: "c", valor: "Gasolina aditivada." },
      { label: "d", valor: "Biodiesel." },
      { label: "e", valor: "Querosene." }
    ],
    correta: "b",
    explicacao: "Crude = bruto, não refinado."
  },
  {
    id: "ing-m4-q8",
    pergunta: "In English, 'Environment' refers to:",
    opcoes: [
      { label: "a", valor: "Envolvimento." },
      { label: "b", valor: "Meio ambiente." },
      { label: "c", valor: "Empresa." },
      { label: "d", valor: "Governo." },
      { label: "e", valor: "Refinaria." }
    ],
    correta: "b",
    explicacao: "Environment = meio ambiente."
  },
  {
    id: "ing-m4-q9",
    pergunta: "The word 'Policy' in 'Company Policy' means:",
    opcoes: [
      { label: "a", valor: "Polícia." },
      { label: "b", valor: "Política / Diretriz." },
      { label: "c", valor: "Polimento." },
      { label: "d", valor: "Estratégia." },
      { label: "e", valor: "Seguro." }
    ],
    correta: "b",
    explicacao: "Policy = política/norma, different from Police (polícia)."
  },
  {
    id: "ing-m4-q10",
    pergunta: "If a text mentions 'Cost-effective', it means the solution is:",
    opcoes: [
      { label: "a", valor: "Very expensive and bad." },
      { label: "b", valor: "Cheap but low quality." },
      { label: "c", valor: "Economically efficient (good value for money)." },
      { label: "d", valor: "Completely free." },
      { label: "e", valor: "Illegal." }
    ],
    correta: "c",
    explicacao: "Cost-effective = custo-benefício positivo."
  }
];

// ── MÓDULO 5: SIMULADO FINAL ───────────────────────────────────────
export const QUIZ_M5_FINAL: QuizQuestion[] = [
  {
    id: "ing-m5-q1",
    pergunta: "TEXT CLIP: 'Petrobras has invested heavily in carbon capture and storage (CCS) technologies to align with global climate goals.' \n QUESTION: What is the main subject of this sentence?",
    opcoes: [
      { label: "a", valor: "Petrobras is reducing its investments." },
      { label: "b", valor: "The company is focusing on sustainability and environment." },
      { label: "c", valor: "Petrobras is buying more coal mines." },
      { label: "d", valor: "The increase in oil prices in China." },
      { label: "e", valor: "A historical summary of old refineries." }
    ],
    correta: "b",
    explicacao: "'Carbon capture' (CCS) and 'climate goals' are sustainability topics."
  },
  {
    id: "ing-m5-q2",
    pergunta: "To find the specific date of a contract mentioned in a 20-page document, the candidate should primarily use:",
    opcoes: [
      { label: "a", valor: "Extensive reading of every footnote." },
      { label: "b", valor: "Skimming of the first two pages only." },
      { label: "c", valor: "Scanning for number patterns and dates." },
      { label: "d", valor: "Prediction based on the author's nationality." },
      { label: "e", valor: "Intuition without looking at the text." }
    ],
    correta: "c",
    explicacao: "Specific data (dates) = Scanning."
  },
  {
    id: "ing-m5-q3",
    pergunta: "Which synonym pairs are correct according to Petrobras/Cesgranrio terminology?",
    opcoes: [
      { label: "a", valor: "Hazardous / Safe" },
      { label: "b", valor: "Refinery / Hospital" },
      { label: "c", valor: "Drilling / Boring (in mechanical terms)" },
      { label: "d", valor: "Pipeline / Road" },
      { label: "e", valor: "Crude / Refined" }
    ],
    correta: "c",
    explicacao: "In engineering, 'boring' can be a synonym for drilling/piercing."
  },
  {
    id: "ing-m5-q4",
    pergunta: "The connector 'Despite' in 'Despite the high costs, the project was successful' expresses:",
    opcoes: [
      { label: "a", valor: "Addition." },
      { label: "b", valor: "Concession / Contrast." },
      { label: "c", valor: "Result." },
      { label: "d", valor: "Time." },
      { label: "e", valor: "Reason." }
    ],
    correta: "b",
    explicacao: "Despite = apesar de (concessão)."
  },
  {
    id: "ing-m5-q5",
    pergunta: "If a text has the title 'AI Applications in Reservoir Monitoring', what should you predict?",
    opcoes: [
      { label: "a", valor: "Artistic paintings of the ocean." },
      { label: "b", valor: "The use of computers to manage oil fields." },
      { label: "c", valor: "How to hire more human divers." },
      { label: "d", valor: "The history of the telephone." },
      { label: "e", valor: "A cookbook for offshore workers." }
    ],
    correta: "b",
    explicacao: "AI (computers) applied to Reservoir Monitoring (oil fields management)."
  },
  {
    id: "ing-m5-q6",
    pergunta: "What is the best approach for a 10-question English part in a 4-hour exam?",
    opcoes: [
      { label: "a", valor: "Read word by word and translate everything first." },
      { label: "b", valor: "Start with skimming, then read questions, then scan." },
      { label: "c", valor: "Guess all answers based on the longest alternative." },
      { label: "d", valor: "Ignore the text and look for grammar errors only." },
      { label: "e", valor: "Read the text loudly to understand better." }
    ],
    correta: "b",
    explicacao: "The most efficient strategy: Gist (Skimming) -> Objectives (Questions) -> Details (Scanning)."
  },
  {
    id: "ing-m5-q7",
    pergunta: "In 'The Pre-salt layer is located thousands of meters below the seabed', where is the oil?",
    opcoes: [
      { label: "a", valor: "On the surface of the water." },
      { label: "b", valor: "Inside the ships." },
      { label: "c", valor: "Deep under the ocean floor." },
      { label: "d", valor: "In the clouds above the sea." },
      { label: "e", valor: "In a mountain in Minas Gerais." }
    ],
    correta: "c",
    explicacao: "Below the seabed = abaixo do leito marinho."
  },
  {
    id: "ing-m5-q8",
    pergunta: "A question asks: 'Which statement is NOT true according to the text?'. This requires:",
    opcoes: [
      { label: "a", valor: "Fast skimming only." },
      { label: "b", valor: "Prediction of the author's opinion." },
      { label: "c", valor: "Detailed scanning of each alternative in the text." },
      { label: "d", valor: "Finding the shortest paragraph." },
      { label: "e", valor: "Just choosing the 'E' option." }
    ],
    correta: "c",
    explicacao: "Verifying TRUE/FALSE statements requires finding the specific corroboration or contradiction in the text (Scanning)."
  },
  {
    id: "ing-m5-q9",
    pergunta: "Meaning of 'Supply Chain' in a Petrobras context:",
    opcoes: [
      { label: "a", valor: "Cadeia de suprimentos (logística/insumos)." },
      { label: "b", valor: "Corrente de aço para âncoras." },
      { label: "c", valor: "Prisão para funcionários." },
      { label: "d", valor: "Loja de conveniência." },
      { label: "e", valor: "Aumento de salário." }
    ],
    correta: "a",
    explicacao: "Supply Chain = Cadeia de Suprimentos."
  },
  {
    id: "ing-m5-q10",
    pergunta: "Finally, what does 'Mainstream' usually refer to in media terminology (different from midstream)?",
    opcoes: [
      { label: "a", valor: "The center of a river." },
      { label: "b", valor: "Dominant or widely accepted trends/media." },
      { label: "c", valor: "A specific type of gas pipe." },
      { label: "d", valor: "The oldest worker in the refinery." },
      { label: "e", valor: "A secret code used by engineers." }
    ],
    correta: "b",
    explicacao: "Mainstream = predominante/geral (usado para mídia ou tendências)."
  }
];

// ── MÓDULO 5: INFERENCING FROM CONTEXT ────────────────────────────
export const QUIZ_M5_INFERENCING: QuizQuestion[] = [
  {
    id: "ing-m5-q1",
    pergunta: "In 'The offshore platform experienced severe weather yesterday, so operations were temporarily suspended', the word 'suspended' most likely means:",
    opcoes: [
      { label: "a", valor: "Iniciadas." },
      { label: "b", valor: "Pausadas / Interrompidas." },
      { label: "c", valor: "Expandidas." },
      { label: "d", valor: "Duplicadas." },
      { label: "e", valor: "Finalizadas permanentemente." }
    ],
    correta: "b",
    explicacao: "Context clues: 'severe weather' and 'so' (consequence) suggest operations were halted, not expanded."
  },
  {
    id: "ing-m5-q2",
    pergunta: "Given the sentence: 'The reservoir's permeability is crucial for oil extraction; without it, fluid cannot flow through rock formations', 'permeability' refers to:",
    opcoes: [
      { label: "a", valor: "A rocha muito dura." },
      { label: "b", valor: "A capacidade de permitir passagem de fluidos." },
      { label: "c", valor: "Um tipo de óleo especial." },
      { label: "d", valor: "A profundidade do poço." },
      { label: "e", valor: "Um equipamento de segurança." }
    ],
    correta: "b",
    explicacao: "The text defines permeability through context: 'crucial for... fluid cannot flow through rock formations'."
  },
  {
    id: "ing-m5-q3",
    pergunta: "In a Petrobras safety manual: 'All employees must adhere to stringent HSE protocols. Non-compliance can result in disciplinary action.' The word 'stringent' infers:",
    opcoes: [
      { label: "a", valor: "Flexíveis e simples." },
      { label: "b", valor: "Rigorosos / Estritos." },
      { label: "c", valor: "Opcionais e sugestionados." },
      { label: "d", valor: "Antigos e obsoletos." },
      { label: "e", valor: "Apenas recomendados." }
    ],
    correta: "b",
    explicacao: "Context clue: 'Non-compliance can result in disciplinary action' suggests strict requirements."
  },
  {
    id: "ing-m5-q4",
    pergunta: "From the text: 'Although the new refinery was commissioned last year, it has already improved efficiency by 25%', the word 'commissioned' suggests:",
    opcoes: [
      { label: "a", valor: "Danificada ou quebrada." },
      { label: "b", valor: "Colocada em funcionamento / Ativada." },
      { label: "c", valor: "Vendida para outro país." },
      { label: "d", valor: "Estudada em um laboratório." },
      { label: "e", valor: "Destruída em um acidente." }
    ],
    correta: "b",
    explicacao: "Context: 'last year' and 'already improved efficiency' suggest it became operational."
  },
  {
    id: "ing-m5-q5",
    pergunta: "In 'Petrobras' commitment to mitigating carbon emissions demonstrates its alignment with global sustainability goals', 'mitigating' infers:",
    opcoes: [
      { label: "a", valor: "Aumentar as emissões." },
      { label: "b", valor: "Reduzir / Minimizar." },
      { label: "c", valor: "Ignorar completamente." },
      { label: "d", valor: "Medir exatamente." },
      { label: "e", valor: "Transferir para outro país." }
    ],
    correta: "b",
    explicacao: "Context: 'commitment... alignment with global sustainability goals' suggests reducing, not increasing."
  },
  {
    id: "ing-m5-q6",
    pergunta: "From the passage: 'The FPSO vessel utilizes state-of-the-art technology to process and store crude oil offshore, eliminating the need for onshore infrastructure', 'state-of-the-art' means:",
    opcoes: [
      { label: "a", valor: "Muito velho e ineficaz." },
      { label: "b", valor: "A mais avançada / A mais moderna." },
      { label: "c", valor: "Simples e artesanal." },
      { label: "d", valor: "Feita por artistas." },
      { label: "e", valor: "Restaurada e histórica." }
    ],
    correta: "b",
    explicacao: "In technology contexts, 'state-of-the-art' always means the most advanced available."
  },
  {
    id: "ing-m5-q7",
    pergunta: "Consider: 'The engineer flagged several impediments to project completion: insufficient funding, labor shortages, and equipment delays.' What does 'flagged' suggest?",
    opcoes: [
      { label: "a", valor: "Ignorou completamente." },
      { label: "b", valor: "Identificou / Chamou atenção para." },
      { label: "c", valor: "Aplaudiu e elogiou." },
      { label: "d", valor: "Destruiu deliberadamente." },
      { label: "e", valor: "Traduziu para português." }
    ],
    correta: "b",
    explicacao: "Context: 'several impediments' listed afterward suggests the engineer highlighted/pointed out issues."
  },
  {
    id: "ing-m5-q8",
    pergunta: "From a sustainability report: 'The company implemented comprehensive measures to curtail operational waste, achieving a 40% reduction in landfill disposal.' 'Curtail' infers:",
    opcoes: [
      { label: "a", valor: "Aumentar drasticamente." },
      { label: "b", valor: "Reduzir / Limitar." },
      { label: "c", valor: "Distribuir igualmente." },
      { label: "d", valor: "Reciclar 100%." },
      { label: "e", valor: "Ignorar e continuar." }
    ],
    correta: "b",
    explicacao: "'achieved a 40% reduction' confirms that curtail = to reduce."
  },
  {
    id: "ing-m5-q9",
    pergunta: "In 'The offshore pipeline infrastructure is inherently vulnerable to corrosion due to saltwater exposure; therefore, regular inspections are mandatory.' 'Inherently' suggests:",
    opcoes: [
      { label: "a", valor: "Por acaso ou coincidência." },
      { label: "b", valor: "Naturalmente / Essencialmente / Intrinsecamente." },
      { label: "c", valor: "Apenas em teoria." },
      { label: "d", valor: "Raramente ou nunca." },
      { label: "e", valor: "Apenas quando chove." }
    ],
    correta: "b",
    explicacao: "Context: 'due to saltwater exposure; therefore, regular inspections are mandatory' suggests a natural, built-in vulnerability."
  },
  {
    id: "ing-m5-q10",
    pergunta: "From the document: 'The committee deliberated for hours before reaching consensus on the new drilling standards.' What does 'deliberated' mean?",
    opcoes: [
      { label: "a", valor: "Votou rapidamente sem discussão." },
      { label: "b", valor: "Discutiu cuidadosamente / Refletiu profundamente." },
      { label: "c", valor: "Ignorou completamente." },
      { label: "d", valor: "Tentou enganar os outros." },
      { label: "e", valor: "Preparou documentos." }
    ],
    correta: "b",
    explicacao: "'for hours before reaching consensus' suggests careful, thorough discussion."
  }
];

// ── MÓDULO 6: MAIN IDEA & SUPPORTING DETAILS ─────────────────────
export const QUIZ_M6_MAIN_IDEA: QuizQuestion[] = [
  {
    id: "ing-m6-q1",
    pergunta: "TEXT: 'Petrobras invested $50 billion in exploration. The company drilled 15 new wells. Production increased 30% annually. Environmental standards were implemented in all operations.' What is the MAIN IDEA?",
    opcoes: [
      { label: "a", valor: "Environmental standards." },
      { label: "b", valor: "Petrobras conducted significant expansion and modernization efforts." },
      { label: "c", valor: "The company drilled 15 wells." },
      { label: "d", valor: "Production increased." },
      { label: "e", valor: "$50 billion was invested." }
    ],
    correta: "b",
    explicacao: "The main idea encompasses all details; other options are supporting details."
  },
  {
    id: "ing-m6-q2",
    pergunta: "Paragraph: 'Global oil demand is declining due to renewable energy adoption. Many countries have set net-zero targets. Electric vehicles are becoming mainstream. Oil companies are diversifying into clean energy.' Which is NOT a supporting detail for the main idea?",
    opcoes: [
      { label: "a", valor: "Many countries have set net-zero targets." },
      { label: "b", valor: "Electric vehicles are becoming mainstream." },
      { label: "c", valor: "Oil companies are diversifying into clean energy." },
      { label: "d", valor: "The sky is blue." },
      { label: "e", valor: "Global oil demand is declining." }
    ],
    correta: "d",
    explicacao: "'The sky is blue' is irrelevant to the topic of energy transition."
  },
  {
    id: "ing-m6-q3",
    pergunta: "In a technical document about pre-salt fields, the TOPIC SENTENCE is typically found:",
    opcoes: [
      { label: "a", valor: "Na última frase do parágrafo." },
      { label: "b", valor: "No meio do parágrafo." },
      { label: "c", valor: "Na primeira frase (geralmente)." },
      { label: "d", valor: "Em uma nota de rodapé." },
      { label: "e", valor: "No título do documento." }
    ],
    correta: "c",
    explicacao: "Topic sentences usually appear first and introduce the paragraph's central idea."
  },
  {
    id: "ing-m6-q4",
    pergunta: "Paragraph: 'The blowout preventer (BOP) is a critical safety device. It stops uncontrolled oil flow. It monitors pressure. It can be operated remotely.' What is the main topic?",
    opcoes: [
      { label: "a", valor: "Pressure monitoring systems." },
      { label: "b", valor: "Remote operation of equipment." },
      { label: "c", valor: "The function and importance of blowout preventers." },
      { label: "d", valor: "Oil flow calculations." },
      { label: "e", valor: "Safety regulations only." }
    ],
    correta: "c",
    explicacao: "All sentences describe the BOP's role; the main topic is the device itself and its importance."
  },
  {
    id: "ing-m6-q5",
    pergunta: "Which statement is a SUPPORTING DETAIL rather than the main idea?",
    opcoes: [
      { label: "a", valor: "Petrobras operates 36 refineries worldwide." },
      { label: "b", valor: "The company maintains a complex global refining network to process crude oil." },
      { label: "c", valor: "The refinery network is essential to Petrobras' business." },
      { label: "d", valor: "Refining is a core operation of Petrobras." },
      { label: "e", valor: "Petrobras has invested in infrastructure upgrades." }
    ],
    correta: "a",
    explicacao: "'36 refineries' is a specific detail supporting the broader concept of a global network."
  },
  {
    id: "ing-m6-q6",
    pergunta: "In analyzing a paragraph's structure, you notice: Topic Sentence → 3 Examples → Conclusion. The examples are:",
    opcoes: [
      { label: "a", valor: "A ideia principal." },
      { label: "b", valor: "Detalhes de suporte." },
      { label: "c", valor: "Irrelevantes." },
      { label: "d", valor: "Apenas opiniões." },
      { label: "e", valor: "Contra-argumentos." }
    ],
    correta: "b",
    explicacao: "Examples function as supporting details that illustrate and strengthen the main idea."
  },
  {
    id: "ing-m6-q7",
    pergunta: "A Cesgranrio question asks: 'Which of the following best summarizes the main idea of the passage?' What approach should you use?",
    opcoes: [
      { label: "a", valor: "Leia cada palavra atentamente." },
      { label: "b", valor: "Use skimming para identificar o tópico geral." },
      { label: "c", valor: "Memorize o parágrafo." },
      { label: "d", valor: "Ignore o título." },
      { label: "e", valor: "Escolha a resposta mais longa." }
    ],
    correta: "b",
    explicacao: "Skimming efficiently identifies the main idea by focusing on topic sentences and key concepts."
  },
  {
    id: "ing-m6-q8",
    pergunta: "Passage structure: 'Introduction (Problem) → Historical Context → Current Solutions → Future Outlook (Conclusion)'. The historical context is:",
    opcoes: [
      { label: "a", valor: "A ideia principal." },
      { label: "b", valor: "Um detalhe de suporte que contextualiza o problema." },
      { label: "c", valor: "Irrelevante." },
      { label: "d", valor: "Apenas opinião." },
      { label: "e", valor: "A conclusão." }
    ],
    correta: "b",
    explicacao: "Historical context provides background and support for understanding the problem."
  },
  {
    id: "ing-m6-q9",
    pergunta: "In a multi-paragraph text, how do you identify the OVERALL main idea?",
    opcoes: [
      { label: "a", valor: "Leia apenas o primeiro parágrafo." },
      { label: "b", valor: "Leia apenas o último parágrafo." },
      { label: "c", valor: "Identifique o tema geral conectando as ideias principais de cada parágrafo." },
      { label: "d", valor: "Conte o número de palavras." },
      { label: "e", valor: "Escolha aleatoriamente." }
    ],
    correta: "c",
    explicacao: "The overall main idea emerges from synthesizing the main ideas of individual paragraphs."
  },
  {
    id: "ing-m6-q10",
    pergunta: "Paragraph: 'Deep-water drilling requires advanced robotics. ROVs (Remotely Operated Vehicles) perform inspections. Automation reduces human risk. Precision is enhanced by AI systems.' The main idea is:",
    opcoes: [
      { label: "a", valor: "ROVs são robôs." },
      { label: "b", valor: "A IA é importante." },
      { label: "c", valor: "Tecnologia avançada é essencial para operações em águas profundas." },
      { label: "d", valor: "Humanos não devem trabalhar em plataformas." },
      { label: "e", valor: "Os robôs são melhores que pessoas." }
    ],
    correta: "c",
    explicacao: "All details illustrate how advanced technology is essential for deep-water operations."
  }
];

// ── MÓDULO 7: CRITICAL READING & TONE ────────────────────────────
export const QUIZ_M7_TONE: QuizQuestion[] = [
  {
    id: "ing-m7-q1",
    pergunta: "TEXT: 'The environmental assessment revealed alarming levels of contamination. Immediate remediation is imperative. Delayed action would be catastrophic.' The author's TONE is:",
    opcoes: [
      { label: "a", valor: "Descontraído e humorístico." },
      { label: "b", valor: "Urgente e alarmista." },
      { label: "c", valor: "Dúbio e incerto." },
      { label: "d", valor: "Elogiador e aprovador." },
      { label: "e", valor: "Neutro e desinteressado." }
    ],
    correta: "b",
    explicacao: "'Alarming', 'imperative', 'catastrophic' convey urgency and concern."
  },
  {
    id: "ing-m7-q2",
    pergunta: "Which author's PURPOSE is implied by: 'The company's renewable energy portfolio has increased substantially, positioning Petrobras as a leader in energy transition.'?",
    opcoes: [
      { label: "a", valor: "Criticar a empresa." },
      { label: "b", valor: "Elogiar e promover a empresa." },
      { label: "c", valor: "Questionar a credibilidade." },
      { label: "d", valor: "Expressar dúvida." },
      { label: "e", valor: "Advertir sobre riscos." }
    ],
    correta: "b",
    explicacao: "'Substantially' and 'leader' suggest positive portrayal and promotion."
  },
  {
    id: "ing-m7-q3",
    pergunta: "Passage: 'While the project promises efficiency gains, critics argue the economic costs outweigh the benefits.' The author's ATTITUDE toward the project is:",
    opcoes: [
      { label: "a", valor: "Totalmente favorável." },
      { label: "b", valor: "Totalmente contrária." },
      { label: "c", valor: "Equilibrada / Apresenta ambos os lados." },
      { label: "d", valor: "Indiferente." },
      { label: "e", valor: "Cínica." }
    ],
    correta: "c",
    explicacao: "The use of 'while' and presenting both 'promises' and 'critics argue' shows balanced perspective."
  },
  {
    id: "ing-m7-q4",
    pergunta: "TEXT: 'Despite regulatory pressures, Petrobras continues fossil fuel investments. This strategy contradicts climate commitments.' The author IMPLIES:",
    opcoes: [
      { label: "a", valor: "Petrobras está agindo coerentemente." },
      { label: "b", valor: "Petrobras é hipócrita / Contraditória." },
      { label: "c", valor: "As regulações são desnecessárias." },
      { label: "d", valor: "Os combustíveis fósseis não poluem." },
      { label: "e", valor: "Os compromissos climáticos são falsos." }
    ],
    correta: "b",
    explicacao: "'Despite... pressures' + 'contradicts commitments' implies hypocrisy."
  },
  {
    id: "ing-m7-q5",
    pergunta: "A safety manual states: 'Non-compliance with HSE protocols WILL result in immediate disciplinary action, up to and including termination.' The tone is:",
    opcoes: [
      { label: "a", valor: "Sugestivo e opcional." },
      { label: "b", valor: "Firme, formal e obrigatório." },
      { label: "c", valor: "Amigável e casual." },
      { label: "d", valor: "Apologético." },
      { label: "e", valor: "Irônico." }
    ],
    correta: "b",
    explicacao: "'WILL', 'immediate', 'up to and including termination' convey absolute firmness."
  },
  {
    id: "ing-m7-q6",
    pergunta: "Which sentence reflects an OPINION rather than a FACT?",
    opcoes: [
      { label: "a", valor: "Petrobras produces 3 million barrels per day." },
      { label: "b", valor: "Pre-salt reserves are located below the salt layer." },
      { label: "c", valor: "Petrobras' renewable initiatives are inadequate and insufficient." },
      { label: "d", valor: "The company operates in 70 countries." },
      { label: "e", valor: "Oil refining requires high temperatures." }
    ],
    correta: "c",
    explicacao: "'Inadequate' and 'insufficient' are value judgments, not provable facts."
  },
  {
    id: "ing-m7-q7",
    pergunta: "A technical report uses phrases: 'The equipment was tested', 'Results suggest improved performance', 'Further validation is recommended.' The author's TONE is:",
    opcoes: [
      { label: "a", valor: "Entusiasmado e apaixonado." },
      { label: "b", valor: "Objetivo, técnico e cauteloso." },
      { label: "c", valor: "Pessimista e negativista." },
      { label: "d", valor: "Agressivo e confrontacional." },
      { label: "e", valor: "Humorístico." }
    ],
    correta: "b",
    explicacao: "Passive voice, 'suggest' (not 'proves'), and 'recommended' show objective, cautious professionalism."
  },
  {
    id: "ing-m7-q8",
    pergunta: "What does the author IMPLY by: 'Although the new policies are challenging, they are necessary for long-term sustainability.'?",
    opcoes: [
      { label: "a", valor: "As políticas são impossíveis." },
      { label: "b", valor: "A sustentabilidade não importa." },
      { label: "c", valor: "Benefícios futuros justificam as dificuldades presentes." },
      { label: "d", valor: "As políticas devem ser abandonadas." },
      { label: "e", valor: "Ninguém aceita as mudanças." }
    ],
    correta: "c",
    explicacao: "'Although... challenging' followed by 'necessary' suggests short-term cost for long-term gain."
  },
  {
    id: "ing-m7-q9",
    pergunta: "In 'The recent incident exposed serious lapses in emergency protocols', the word 'exposed' carries which CONNOTATION?",
    opcoes: [
      { label: "a", valor: "Positiva (revelou boas práticas)." },
      { label: "b", valor: "Negativa (revelou problemas/falhas)." },
      { label: "c", valor: "Neutra (simplesmente mostrou)." },
      { label: "d", valor: "Humorística." },
      { label: "e", valor: "Confusa." }
    ],
    correta: "b",
    explicacao: "'Exposed' + 'serious lapses' conveys negative judgment."
  },
  {
    id: "ing-m7-q10",
    pergunta: "A journalist writes: 'Petrobras claims to be committed to renewable energy, yet continues expanding oil production.' The author's STANCE is:",
    opcoes: [
      { label: "a", valor: "Completamente confiante na empresa." },
      { label: "b", valor: "Cética / Crítica das alegações da empresa." },
      { label: "c", valor: "Apoiadora incondicional." },
      { label: "d", valor: "Desinteressada." },
      { label: "e", valor: "Admira a companhia." }
    ],
    correta: "b",
    explicacao: "'Claims... yet continues' suggests skepticism and contradiction-spotting."
  }
];

// ── MÓDULO 8: TEXT STRUCTURE & ORGANIZATION ──────────────────────
export const QUIZ_M8_STRUCTURE: QuizQuestion[] = [
  {
    id: "ing-m8-q1",
    pergunta: "A text shows: '...the first step. Next, ... Second, ... Finally, ...' This organization pattern is:",
    opcoes: [
      { label: "a", valor: "Comparison and contrast." },
      { label: "b", valor: "Chronological / Sequential." },
      { label: "c", valor: "Cause and effect." },
      { label: "d", valor: "Problem and solution." },
      { label: "e", valor: "Question and answer." }
    ],
    correta: "b",
    explicacao: "'First', 'Next', 'Second', 'Finally' are sequential time markers."
  },
  {
    id: "ing-m8-q2",
    pergunta: "In a procedural document: 'To extract crude oil, companies drill through rock layers. As pressure builds, oil flows. Eventually, production declines.' The structure is:",
    opcoes: [
      { label: "a", valor: "Comparison." },
      { label: "b", valor: "Chronological process." },
      { label: "c", valor: "Problem-solution." },
      { label: "d", valor: "Definition." },
      { label: "e", valor: "Aleatória." }
    ],
    correta: "b",
    explicacao: "The text describes stages in a process: drilling → pressure → flow → decline."
  },
  {
    id: "ing-m8-q3",
    pergunta: "Which TRANSITION WORD signals a CAUSE-EFFECT relationship?",
    opcoes: [
      { label: "a", valor: "Similarly." },
      { label: "b", valor: "In contrast." },
      { label: "c", valor: "Therefore." },
      { label: "d", valor: "On the other hand." },
      { label: "e", valor: "For instance." }
    ],
    correta: "c",
    explicacao: "'Therefore' introduces a consequence or effect."
  },
  {
    id: "ing-m8-q4",
    pergunta: "TEXT: 'Pre-salt fields are very deep, while onshore fields are shallow. Pre-salt requires advanced technology, whereas onshore uses simpler methods.' The pattern is:",
    opcoes: [
      { label: "a", valor: "Sequential (primeiro... depois...)." },
      { label: "b", valor: "Comparison and Contrast." },
      { label: "c", valor: "Cause and effect." },
      { label: "d", valor: "Problem-solution." },
      { label: "e", valor: "Definition." }
    ],
    correta: "b",
    explicacao: "'While', 'whereas' are comparison/contrast markers highlighting differences."
  },
  {
    id: "ing-m8-q5",
    pergunta: "Which organization is typical for a problem-solution text?",
    opcoes: [
      { label: "a", valor: "Define termo → Exemplos → Conclusão." },
      { label: "b", valor: "Identificar problema → Analisar causas → Propor soluções." },
      { label: "c", valor: "Apresentar Evento A → Apresentar Evento B → Comparar." },
      { label: "d", valor: "Início → Meio → Fim (Cronológico)." },
      { label: "e", valor: "Perguntas → Respostas (Aleatório)." }
    ],
    correta: "b",
    explicacao: "Problem-solution texts identify an issue, analyze it, and propose remedies."
  },
  {
    id: "ing-m8-q6",
    pergunta: "In 'Although environmental concerns exist, the benefits of the project outweigh the drawbacks', 'Although' introduces:",
    opcoes: [
      { label: "a", valor: "Uma razão." },
      { label: "b", valor: "Uma concessão / Um contraste." },
      { label: "c", valor: "Uma consequência." },
      { label: "d", valor: "Um exemplo." },
      { label: "e", valor: "Uma definição." }
    ],
    correta: "b",
    explicacao: "'Although' signals a concession where a contrasting idea is acknowledged."
  },
  {
    id: "ing-m8-q7",
    pergunta: "A Petrobras safety procedure lists: 'Step 1: Put on gear. Step 2: Enter the chamber. Step 3: Perform inspection. Step 4: Document findings. Step 5: Exit safely.' This is structured as:",
    opcoes: [
      { label: "a", valor: "Comparison." },
      { label: "b", valor: "Cause-effect." },
      { label: "c", valor: "Sequential process / Procedural." },
      { label: "d", valor: "Problem-solution." },
      { label: "e", valor: "Argumentativo." }
    ],
    correta: "c",
    explicacao: "Numbered steps show a clear, ordered sequence."
  },
  {
    id: "ing-m8-q8",
    pergunta: "Which TRANSITION WORD indicates ADDITIONAL INFORMATION?",
    opcoes: [
      { label: "a", valor: "However." },
      { label: "b", valor: "Moreover / Furthermore." },
      { label: "c", valor: "Instead." },
      { label: "d", valor: "Eventually." },
      { label: "e", valor: "Nevertheless." }
    ],
    correta: "b",
    explicacao: "'Moreover' and 'Furthermore' add more supporting information."
  },
  {
    id: "ing-m8-q9",
    pergunta: "A text explains: 'When oil reserves deplete (CAUSE), production costs increase (EFFECT). As costs rise, profitability decreases.' This shows:",
    opcoes: [
      { label: "a", valor: "Comparação entre dois campos." },
      { label: "b", valor: "Cadeia de causas e efeitos." },
      { label: "c", valor: "Passos de um procedimento." },
      { label: "d", valor: "Argumentos contraditórios." },
      { label: "e", valor: "Definições técnicas." }
    ],
    correta: "b",
    explicacao: "Multiple connected cause-effect relationships form a chain."
  },
  {
    id: "ing-m8-q10",
    pergunta: "In a technical document, you see: 'The refinery processes crude oil. First, ... Second, ... Finally, ...' then 'As a result, the output is high-quality fuel.' The structure combines:",
    opcoes: [
      { label: "a", valor: "Comparação pura." },
      { label: "b", valor: "Sequential process + Cause-effect." },
      { label: "c", valor: "Problema-solução." },
      { label: "d", valor: "Cronologia histórica." },
      { label: "e", valor: "Definição." }
    ],
    correta: "b",
    explicacao: "The text shows steps (sequential) followed by a result (cause-effect)."
  }
];

// ── MÓDULO 9: READING COMPREHENSION IN PETROBRAS CONTEXT ─────────
export const QUIZ_M9_PETROBRAS: QuizQuestion[] = [
  {
    id: "ing-m9-q1",
    pergunta: "PASSAGE: 'Petrobras achieved record production of 3.2 million barrels per day in 2023, driven by increased output from pre-salt fields in the Santos Basin. The company invested $12 billion in capital expenditures to support growth. Operational efficiency improved by 15% compared to 2022. Safety metrics remained strong with zero fatalities in offshore operations.' Based on this passage, the company's 2023 performance was:",
    opcoes: [
      { label: "a", valor: "Abaixo do esperado." },
      { label: "b", valor: "Bem-sucedida e positiva." },
      { label: "c", valor: "Problemática." },
      { label: "d", valor: "Estagnada." },
      { label: "e", valor: "Perdeu produção." }
    ],
    correta: "b",
    explicacao: "Record production, high investment, improved efficiency, zero fatalities = strong performance."
  },
  {
    id: "ing-m9-q2",
    pergunta: "PASSAGE: 'The Libra Field consortium, operated by Petrobras, faced production delays due to equipment malfunctions in Q2 2024. Supply chain disruptions caused a 20% shortfall from planned output. However, remedial measures were implemented in Q3, and full production resumed by Q4.' What was the main challenge?",
    opcoes: [
      { label: "a", valor: "Falta de tecnologia." },
      { label: "b", valor: "Problemas de equipamento e cadeia de suprimentos." },
      { label: "c", valor: "Falta de interesse em produzir." },
      { label: "d", valor: "Retorno financeiro baixo." },
      { label: "e", valor: "Pessoal insuficiente." }
    ],
    correta: "b",
    explicacao: "The passage explicitly mentions 'equipment malfunctions' and 'supply chain disruptions'."
  },
  {
    id: "ing-m9-q3",
    pergunta: "PASSAGE: 'Petrobras' renewable energy portfolio expanded to 5.5 GW of installed capacity by 2024, including wind, solar, and biofuels. The company aims to reach carbon neutrality by 2050. These initiatives align with Brazil's NDC (Nationally Determined Contribution) under the Paris Agreement.' According to the passage, the company's renewable focus is:",
    opcoes: [
      { label: "a", valor: "Apenas um marketing stunt." },
      { label: "b", valor: "Alinhada com metas globais e nacionais de sustentabilidade." },
      { label: "c", valor: "Insignificante." },
      { label: "d", valor: "Impossível de alcançar." },
      { label: "e", valor: "Contrária aos lucros." }
    ],
    correta: "b",
    explicacao: "The text explicitly states alignment with Brazil's NDC and Paris Agreement targets."
  },
  {
    id: "ing-m9-q4",
    pergunta: "PASSAGE: 'The Pré-Sal cluster contributed 65% of Petrobras' total crude oil production. These ultra-deep offshore reservoirs require sophisticated FPSO vessels and subsea infrastructure. The exploration cost per barrel is $8-12 USD, making pre-salt economically viable despite technical complexity.' What is the economic implication?",
    opcoes: [
      { label: "a", valor: "O pré-sal não é viável economicamente." },
      { label: "b", valor: "O pré-sal é extremamente caro e inutilizável." },
      { label: "c", valor: "Apesar da complexidade técnica, os custos são justificáveis." },
      { label: "d", valor: "Só é lucrativo em português." },
      { label: "e", valor: "Requer subsídios governamentais." }
    ],
    correta: "c",
    explicacao: "'Economically viable despite technical complexity' confirms profitability."
  },
  {
    id: "ing-m9-q5",
    pergunta: "PASSAGE: 'Petrobras implemented strict HSE (Health, Safety, and Environment) protocols across all operations. The Lost Time Injury Frequency Rate (LTIFR) decreased from 0.8 to 0.4 per million hours worked. No spills exceeding 1 barrel were reported in offshore operations in 2023. The company completed 500+ environmental audits.' What do these metrics indicate?",
    opcoes: [
      { label: "a", valor: "Negligência ambiental." },
      { label: "b", valor: "Foco forte em segurança e meio ambiente." },
      { label: "c", valor: "Falta de conformidade regulatória." },
      { label: "d", valor: "Ignorância de protocolos." },
      { label: "e", valor: "Indiferença aos acidentes." }
    ],
    correta: "b",
    explicacao: "Declining injury rates, minimal spills, extensive audits show strong HSE commitment."
  },
  {
    id: "ing-m9-q6",
    pergunta: "PASSAGE: 'Petrobras' integrated refining system processes 2 million barrels per day across 13 refineries in Brazil and 1 abroad. Downstream operations contribute 40% of the company's EBITDA. Challenges include rising feedstock costs and competition from imported fuels.' What is the strategic importance of refining?",
    opcoes: [
      { label: "a", valor: "Irrelevante para Petrobras." },
      { label: "b", valor: "Uma fonte importante de receita e valor agregado." },
      { label: "c", valor: "Um negócio perdedor." },
      { label: "d", valor: "Apenas uma operação secundária." },
      { label: "e", valor: "Obsoleta." }
    ],
    correta: "b",
    explicacao: "'40% of EBITDA' demonstrates strategic importance despite market challenges."
  },
  {
    id: "ing-m9-q7",
    pergunta: "PASSAGE: 'The Campos and Santos Basins account for 90% of Brazil's offshore oil production. Aging infrastructure in Campos requires $5 billion in capital investment over the next decade. However, the Santos Basin, featuring pre-salt fields, offers superior geology and longer asset life.' What is the infrastructure reality?",
    opcoes: [
      { label: "a", valor: "Campos é mais novo que Santos." },
      { label: "b", valor: "Santos é mais velho e requer mais investimento." },
      { label: "c", valor: "Campos precisa de investimento; Santos oferece maior potencial futuro." },
      { label: "d", valor: "Ambas são obsoletas." },
      { label: "e", valor: "Nenhuma requer manutenção." }
    ],
    correta: "c",
    explicacao: "The passage contrasts aging Campos (needs investment) with superior Santos geology."
  },
  {
    id: "ing-m9-q8",
    pergunta: "PASSAGE: 'A pipeline incident occurred in 2015, releasing approximately 3,000 barrels into the Atlantic. Petrobras paid $44 million in fines and remediation costs. The incident prompted a comprehensive overhaul of pipeline inspection protocols using advanced AI-assisted monitoring.' This historical incident demonstrates:",
    opcoes: [
      { label: "a", valor: "A incompetência permanente." },
      { label: "b", valor: "Accountability e implementação de melhorias." },
      { label: "c", valor: "Nenhuma ação corretiva." },
      { label: "d", valor: "Repetição do mesmo erro." },
      { label: "e", valor: "Falta de conformidade regulatória." }
    ],
    correta: "b",
    explicacao: "Payment of fines + comprehensive protocol overhaul show accountability and improvement."
  },
  {
    id: "ing-m9-q9",
    pergunta: "PASSAGE: 'Petrobras reduced its carbon intensity (CO₂ per barrel) from 85 kg CO₂e to 72 kg CO₂e between 2015 and 2023. The company aims for 48 kg CO₂e by 2030. These reductions stem from operational efficiency, renewable energy integration, and natural gas substitution.' How is the company achieving climate targets?",
    opcoes: [
      { label: "a", valor: "Apenas com reobtenciação de metas." },
      { label: "b", valor: "Através de múltiplas iniciativas operacionais e energéticas." },
      { label: "c", valor: "Abandonando a produção de petróleo." },
      { label: "d", valor: "Falsificando dados." },
      { label: "e", valor: "Sem ação real." }
    ],
    correta: "b",
    explicacao: "Multiple concrete strategies (efficiency, renewables, gas) drive measurable reductions."
  },
  {
    id: "ing-m9-q10",
    pergunta: "PASSAGE: 'Petrobras operates in the challenging environment of Brazil's maritime regulatory framework, ANP oversight, and international ESG standards. The company must balance profitability with environmental stewardship. Strategic partnerships with technology providers enable innovation. Government relationships shape long-term planning.' The passage implies that Petrobras' operations are influenced by:",
    opcoes: [
      { label: "a", valor: "Apenas interesse em lucros." },
      { label: "b", valor: "Múltiplos stakeholders, regulações e pressões sociais." },
      { label: "c", valor: "Nenhuma regulação externa." },
      { label: "d", valor: "Autonomia completa." },
      { label: "e", valor: "Interesse exclusivo em crescimento." }
    ],
    correta: "b",
    explicacao: "The passage identifies regulatory, environmental, technological, and political influences."
  }
];

// ── MÓDULO 10: SIMULADO MESTRE ──────────────────────────────────
export const QUIZ_M10_SIMULADO_MESTRE: QuizQuestion[] = [
  {
    id: "ing-m10-q1",
    pergunta: "INTEGRATED PASSAGE CLIP: 'Petrobras' strategic investments in pre-salt exploration aim to optimize production while minimizing environmental impact. The company employs state-of-the-art monitoring technologies. Despite industry challenges, production targets for 2025 are ambitious.' Which strategy best combines the information?",
    opcoes: [
      { label: "a", valor: "Ignoring environmental concerns." },
      { label: "b", valor: "Using advanced technology to balance productivity and sustainability." },
      { label: "c", valor: "Abandoning exploration entirely." },
      { label: "d", valor: "Reducing all operational standards." },
      { label: "e", valor: "Focusing only on cost reduction." }
    ],
    correta: "b",
    explicacao: "The passage shows balanced approach: optimize production + minimize impact = sustainability."
  },
  {
    id: "ing-m10-q2",
    pergunta: "PASSAGE: 'Cesgranrio exams assess reading comprehension through prediction, scanning, main idea identification, and inference. The exam allocates 30 minutes for a 350-word passage with 10 questions. Candidates must prioritize efficiency over translation.' What is the implied exam strategy?",
    opcoes: [
      { label: "a", valor: "Traduzir cada palavra." },
      { label: "b", valor: "Aplicar técnicas de leitura estratégica: skimming, scanning, prediction." },
      { label: "c", valor: "Adivinhar as respostas." },
      { label: "d", valor: "Ignorar completamente o texto." },
      { label: "e", valor: "Gastar 30 minutos em uma questão." }
    ],
    correta: "b",
    explicacao: "'Prioritize efficiency' + exam structure suggests using all reading strategies."
  },
  {
    id: "ing-m10-q3",
    pergunta: "Which reading strategy is most effective for: 'According to the text, the pre-salt field reserves are estimated at...'?",
    opcoes: [
      { label: "a", valor: "Prediction." },
      { label: "b", valor: "Skimming." },
      { label: "c", valor: "Scanning for specific numbers/data." },
      { label: "d", valor: "Reading every word slowly." },
      { label: "e", valor: "Ignoring the text." }
    ],
    correta: "c",
    explicacao: "'According to the text' + specific data request = scanning for numbers."
  },
  {
    id: "ing-m10-q4",
    pergunta: "INFERENCE: If a text states 'The cost per barrel in pre-salt increased 20% due to deeper wells', we can infer:",
    opcoes: [
      { label: "a", valor: "Profundidade não afeta custos." },
      { label: "b", valor: "Poços mais profundos implicam maiores despesas operacionais." },
      { label: "c", valor: "Os custos diminuíram." },
      { label: "d", valor: "Os poços ficaram mais rasos." },
      { label: "e", valor: "Profundidade reduz custos." }
    ],
    correta: "b",
    explicacao: "Cause-effect relationship: deeper wells → higher costs."
  },
  {
    id: "ing-m10-q5",
    pergunta: "MAIN IDEA: A passage discusses Petrobras' refinery modernization, capacity increases, production timelines, and investment amounts. The main idea is likely:",
    opcoes: [
      { label: "a", valor: "Os refinários são antigos." },
      { label: "b", valor: "O programa abrangente de modernização da Petrobras." },
      { label: "c", valor: "O custo é muito elevado." },
      { label: "d", valor: "Apenas um refinário será modernizado." },
      { label: "e", valor: "Não há planos futuros." }
    ],
    correta: "b",
    explicacao: "All details support the umbrella concept of comprehensive modernization."
  },
  {
    id: "ing-m10-q6",
    pergunta: "TONE/AUTHOR'S INTENT: 'While Petrobras claims commitment to sustainability, its fossil fuel production contradicts this pledge.' The author's perspective is:",
    opcoes: [
      { label: "a", valor: "Totalmente apoiadora." },
      { label: "b", valor: "Cética / Crítica dos apelos de sustentabilidade." },
      { label: "c", valor: "Indiferente." },
      { label: "d", valor: "Entusiasmada." },
      { label: "e", valor: "Enganada." }
    ],
    correta: "b",
    explicacao: "'Claims... contradicts' signals skepticism and contradiction-spotting."
  },
  {
    id: "ing-m10-q7",
    pergunta: "TEXT STRUCTURE: A passage on HSE protocols shows: 'Overview → 5 specific policies → consequences of violations → conclusion.' This structure is:",
    opcoes: [
      { label: "a", valor: "Cronológica." },
      { label: "b", valor: "Definição + exemplos + consequências." },
      { label: "c", valor: "Problema-solução." },
      { label: "d", valor: "Cronologia histórica." },
      { label: "e", valor: "Apenas opinião." }
    ],
    correta: "b",
    explicacao: "Definition (overview) → examples (policies) → implications (consequences) → summary."
  },
  {
    id: "ing-m10-q8",
    pergunta: "VOCABULARY IN CONTEXT: 'The deepwater environment is inherently hostile; therefore, all equipment must be redundantly protected.' 'Redundantly' means:",
    opcoes: [
      { label: "a", valor: "Uma única vez." },
      { label: "b", valor: "Com múltiplas camadas de proteção / Backup." },
      { label: "c", valor: "Sem proteção." },
      { label: "d", valor: "Com tecnologia antiga." },
      { label: "e", valor: "Sem necessidade." }
    ],
    correta: "b",
    explicacao: "Context: 'inherently hostile... therefore... redundantly' suggests multiple layers for safety."
  },
  {
    id: "ing-m10-q9",
    pergunta: "SUPPORTING DETAIL vs. MAIN IDEA: Passage: 'Petrobras operates 13 refineries across Brazil. These facilities process 2 million barrels daily. The company plans $8 billion in modernization.' Which is a SUPPORTING DETAIL?",
    opcoes: [
      { label: "a", valor: "Petrobras operates refineries." },
      { label: "b", valor: "As refinarias processam 2 milhões de barris diários." },
      { label: "c", valor: "A modernização é planejada." },
      { label: "d", valor: "Petrobras é importante na indústria." },
      { label: "e", valor: "Brasil tem muitas refinarias." }
    ],
    correta: "b",
    explicacao: "The specific number (2 million barrels) is a supporting detail, not the main idea."
  },
  {
    id: "ing-m10-q10",
    pergunta: "FINAL SYNTHESIS: To excel at Cesgranrio English reading, the most important combination of strategies is:",
    opcoes: [
      { label: "a", valor: "Memorizar todas as palavras do dicionário." },
      { label: "b", valor: "Traduzir tudo lentamente." },
      { label: "c", valor: "Prediction + Skimming + Scanning + Context clues + Inference." },
      { label: "d", valor: "Ignorar o texto completamente." },
      { label: "e", valor: "Focar apenas em gramática." }
    ],
    correta: "c",
    explicacao: "The integrated use of all reading strategies maximizes comprehension and time efficiency."
  }
];
