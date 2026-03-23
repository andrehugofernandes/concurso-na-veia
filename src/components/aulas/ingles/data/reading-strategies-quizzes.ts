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
