import { QuizQuestion } from "../../shared";

// ═══ MÓDULO 1 — DECODING QUESTION TYPES ═══
export const QUIZ_M1_DECODING: QuizQuestion[] = [
  {
    id: "ing-comp-m1-q1",
    pergunta: "When a question asks for the 'main idea' or 'central theme', you should:",
    opcoes: [
      { label: "A", valor: "Look for a specific detail mentioned in paragraph 2" },
      { label: "B", valor: "Find the topic sentence that summarizes the entire text" },
      { label: "C", valor: "Search for numbers and statistics" },
      { label: "D", valor: "Identify the author's personal opinion" },
      { label: "E", valor: "Count how many paragraphs the text has" }
    ],
    correta: "B",
    explicacao: "Main idea questions test if you can identify the overall topic. The topic sentence is usually the first or second sentence of the first paragraph."
  },
  {
    id: "ing-comp-m1-q2",
    pergunta: "A 'detail question' (e.g., 'According to paragraph 3...') requires:",
    opcoes: [
      { label: "A", valor: "Understanding the author's general message" },
      { label: "B", valor: "Locating specific information in the designated paragraph" },
      { label: "C", valor: "Translating the text to Portuguese" },
      { label: "D", valor: "Making an educated guess" },
      { label: "E", valor: "Reading the entire text carefully before answering" }
    ],
    correta: "B",
    explicacao: "Detail questions limit your search to a specific paragraph. Scan for the exact information requested."
  },
  {
    id: "ing-comp-m1-q3",
    pergunta: "An 'inference question' (e.g., 'The author implies that...') asks you to:",
    opcoes: [
      { label: "A", valor: "Quote exactly what the text says" },
      { label: "B", valor: "Deduce information that is suggested but not explicitly stated" },
      { label: "C", valor: "Find the dictionary definition of a word" },
      { label: "D", valor: "Ignore the context and guess" },
      { label: "E", valor: "Count the number of sentences" }
    ],
    correta: "B",
    explicacao: "Inference questions test your ability to read between the lines. Use context clues and logic to determine what the author means without stating directly."
  },
  {
    id: "ing-comp-m1-q4",
    pergunta: "A 'tone question' tests your understanding of:",
    opcoes: [
      { label: "A", valor: "The volume of voice used when reading" },
      { label: "B", valor: "The author's attitude and emotional approach (neutral, critical, optimistic, formal)" },
      { label: "C", valor: "The number of syllables in each word" },
      { label: "D", valor: "The date the text was published" },
      { label: "E", valor: "The geographical location of the author" }
    ],
    correta: "B",
    explicacao: "Tone questions evaluate the author's attitude. Look for words that reveal whether the text is neutral, critical, positive, formal, informal, etc."
  },
  {
    id: "ing-comp-m1-q5",
    pergunta: "Which of the following indicates a 'main idea' question?",
    opcoes: [
      { label: "A", valor: "According to the text..." },
      { label: "B", valor: "In paragraph 2, what..." },
      { label: "C", valor: "The main topic of this text is..." },
      { label: "D", valor: "What does the word 'therefore' mean?" },
      { label: "E", valor: "How many times is 'oil' mentioned?" }
    ],
    correta: "C",
    explicacao: "Phrases like 'main topic', 'central theme', or 'primary purpose' signal main idea questions. These require broad understanding, not specific details."
  },
  {
    id: "ing-comp-m1-q6",
    pergunta: "When answering inference questions, you should:",
    opcoes: [
      { label: "A", valor: "Guess without reading the text" },
      { label: "B", valor: "Use context clues and logical reasoning" },
      { label: "C", valor: "Find the answer in the dictionary" },
      { label: "D", valor: "Choose the longest answer" },
      { label: "E", valor: "Ignore difficult paragraphs" }
    ],
    correta: "B",
    explicacao: "Never guess on inference questions. Always support your answer with textual evidence and logical reasoning."
  },
  {
    id: "ing-comp-m1-q7",
    pergunta: "A Cesgranrio tone question typically includes words like:",
    opcoes: [
      { label: "A", valor: "'Definition', 'synonym', 'antonym'" },
      { label: "B", valor: "'Attitude', 'tone', 'intent', 'purpose'" },
      { label: "C", valor: "'Calculate', 'measure', 'count'" },
      { label: "D", valor: "'Past', 'future', 'present'" },
      { label: "E", valor: "'Name', 'date', 'location'" }
    ],
    correta: "B",
    explicacao: "Tone questions use language-specific keywords. Watch for 'attitude', 'tone', 'author's intent', and 'purpose'."
  },
  {
    id: "ing-comp-m1-q8",
    pergunta: "Detail questions are easier to answer than inference questions because:",
    opcoes: [
      { label: "A", valor: "They require less reading" },
      { label: "B", valor: "The answer is explicitly stated in the text" },
      { label: "C", valor: "You can use a translator" },
      { label: "D", valor: "The text is always short" },
      { label: "E", valor: "No logic is required" }
    ],
    correta: "B",
    explicacao: "Detail answers are directly in the text. Inference requires you to think beyond what is written."
  },
  {
    id: "ing-comp-m1-q9",
    pergunta: "Which question type is NOT commonly tested in Cesgranrio exams?",
    opcoes: [
      { label: "A", valor: "Main idea" },
      { label: "B", valor: "Supporting detail" },
      { label: "C", valor: "Inference" },
      { label: "D", valor: "Author's exact birth date" },
      { label: "E", valor: "Tone and purpose" }
    ],
    correta: "D",
    explicacao: "Cesgranrio focuses on comprehension skills, not biographical facts. Personal details about the author are rarely tested."
  },
  {
    id: "ing-comp-m1-q10",
    pergunta: "Understanding question types BEFORE reading the text helps you:",
    opcoes: [
      { label: "A", valor: "Translate faster" },
      { label: "B", valor: "Know what to search for, saving time and improving accuracy" },
      { label: "C", valor: "Memorize every word" },
      { label: "D", valor: "Skip difficult paragraphs" },
      { label: "E", valor: "Write better sentences" }
    ],
    correta: "B",
    explicacao: "Decoding questions first is a strategic advantage. You know what information to focus on before reading."
  }
];

// ═══ MÓDULO 2 — SKIMMING ═══
export const QUIZ_M2_SKIMMING: QuizQuestion[] = [
  {
    id: "ing-comp-m2-q1",
    pergunta: "Skimming is a reading technique used to:",
    opcoes: [
      { label: "A", valor: "Read every single word carefully" },
      { label: "B", valor: "Get a general overview of the text quickly" },
      { label: "C", valor: "Translate the text mentally" },
      { label: "D", valor: "Find only numbers and data" },
      { label: "E", valor: "Memorize the entire passage" }
    ],
    correta: "B",
    explicacao: "Skimming means reading quickly to understand the general idea. You ignore details and focus on the big picture."
  },
  {
    id: "ing-comp-m2-q2",
    pergunta: "When skimming a text about 'Deepwater Drilling', which should you read FIRST?",
    opcoes: [
      { label: "A", valor: "Every paragraph word by word" },
      { label: "B", valor: "The title, first and last paragraphs" },
      { label: "C", valor: "Only the conclusion" },
      { label: "D", valor: "Random paragraphs" },
      { label: "E", valor: "The middle section" }
    ],
    correta: "B",
    explicacao: "Skim by reading the title and first/last paragraphs first. This gives you the context and main idea quickly."
  },
  {
    id: "ing-comp-m2-q3",
    pergunta: "Skimming is useful BEFORE answering questions because it:",
    opcoes: [
      { label: "A", valor: "Teaches you grammar rules" },
      { label: "B", valor: "Builds context so you know where to find specific information" },
      { label: "C", valor: "Eliminates the need to read carefully" },
      { label: "D", valor: "Shows you all the answers" },
      { label: "E", valor: "Helps you translate better" }
    ],
    correta: "B",
    explicacao: "Skimming first creates a mental map of the text. Then you can scan precisely for specific details."
  },
  {
    id: "ing-comp-m2-q4",
    pergunta: "In a Cesgranrio test, you should skim a text to identify:",
    opcoes: [
      { label: "A", valor: "All typos and spelling errors" },
      { label: "B", valor: "The main topic and paragraph organization" },
      { label: "C", valor: "The author's favorite color" },
      { label: "D", valor: "How many times each word appears" },
      { label: "E", valor: "The exact word count" }
    ],
    correta: "B",
    explicacao: "Skimming identifies the topic and text structure. This helps you navigate quickly when detail questions ask 'According to paragraph X...'"
  },
  {
    id: "ing-comp-m2-q5",
    pergunta: "Skimming is NOT appropriate when:",
    opcoes: [
      { label: "A", valor: "You need to answer a detail question" },
      { label: "B", valor: "You want a general overview" },
      { label: "C", valor: "You have limited time" },
      { label: "D", valor: "The text is very long" },
      { label: "E", valor: "It is your first time reading the text" }
    ],
    correta: "A",
    explicacao: "For detail questions, you need scanning, not skimming. Skimming is for getting the general idea; scanning is for finding specific information."
  },
  {
    id: "ing-comp-m2-q6",
    pergunta: "Which of the following is a skimming technique?",
    opcoes: [
      { label: "A", valor: "Reading every sentence carefully" },
      { label: "B", valor: "Highlighting all adjectives" },
      { label: "C", valor: "Reading topic sentences and ignoring supporting details" },
      { label: "D", valor: "Translating each phrase" },
      { label: "E", valor: "Counting paragraphs" }
    ],
    correta: "C",
    explicacao: "Skimming focuses on topic sentences (usually first sentences of paragraphs) to get the main idea of each section."
  },
  {
    id: "ing-comp-m2-q7",
    pergunta: "Skimming time on a 5-paragraph text should be approximately:",
    opcoes: [
      { label: "A", valor: "30 seconds to 1 minute" },
      { label: "B", valor: "5-10 minutes" },
      { label: "C", valor: "20-30 minutes" },
      { label: "D", valor: "1-2 hours" },
      { label: "E", valor: "Does not matter" }
    ],
    correta: "A",
    explicacao: "Skimming should be fast (30 sec - 1 min). If it takes longer, you're reading too carefully (scanning), not skimming."
  },
  {
    id: "ing-comp-m2-q8",
    pergunta: "When you skim a Petrobras technical document about 'Subsea Infrastructure', you are looking for:",
    opcoes: [
      { label: "A", valor: "The author's personal background" },
      { label: "B", valor: "Definition of subsea infrastructure and its importance" },
      { label: "C", valor: "The exact price of equipment" },
      { label: "D", valor: "Hidden messages" },
      { label: "E", valor: "Errors in grammar" }
    ],
    correta: "B",
    explicacao: "Skimming reveals what the text is ABOUT. The definition and importance are the main ideas, not the specific details."
  },
  {
    id: "ing-comp-m2-q9",
    pergunta: "Skimming and scanning are different because:",
    opcoes: [
      { label: "A", valor: "Skimming is faster and more general; scanning is slower and specific" },
      { label: "B", valor: "Skimming requires a dictionary" },
      { label: "C", valor: "Scanning is always done first" },
      { label: "D", valor: "They use different languages" },
      { label: "E", valor: "Skimming uses your hands" }
    ],
    correta: "A",
    explicacao: "Skim for the big picture (fast), scan for specific data (slow and focused). Skim first, then scan for details."
  },
  {
    id: "ing-comp-m2-q10",
    pergunta: "The BEST time to skim a text during a Cesgranrio exam is:",
    opcoes: [
      { label: "A", valor: "Never, always read every word" },
      { label: "B", valor: "AFTER you answer all questions" },
      { label: "C", valor: "BEFORE you read the questions" },
      { label: "D", valor: "Only if you are out of time" },
      { label: "E", valor: "BETWEEN reading and answering questions" }
    ],
    correta: "E",
    explicacao: "Skim the text first to understand its structure. Then read the questions. Finally, scan the text to find answers. This 3-step process is the most efficient."
  }
];

// ═══ MÓDULO 3 — SCANNING ═══
export const QUIZ_M3_SCANNING: QuizQuestion[] = [
  {
    id: "ing-comp-m3-q1",
    pergunta: "Scanning is a technique to:",
    opcoes: [
      { label: "A", valor: "Understand the main idea of the text" },
      { label: "B", valor: "Rapidly locate specific information" },
      { label: "C", valor: "Memorize every word" },
      { label: "D", valor: "Improve your vocabulary" },
      { label: "E", valor: "Check grammar" }
    ],
    correta: "B",
    explicacao: "Scanning is the fastest reading technique. You move your eyes quickly, searching for a specific word or fact."
  },
  {
    id: "ing-comp-m3-q2",
    pergunta: "When a Cesgranrio question asks 'According to paragraph 3, what is the pressure at 3,000 meters?', you should:",
    opcoes: [
      { label: "A", valor: "Read the entire paragraph slowly" },
      { label: "B", valor: "Scan paragraph 3 for the word 'pressure' and '3,000 meters'" },
      { label: "C", valor: "Read all paragraphs first" },
      { label: "D", valor: "Skip this question" },
      { label: "E", valor: "Guess the answer" }
    ],
    correta: "B",
    explicacao: "Scanning means looking for keywords. Your eyes jump to 'pressure' and '3,000 meters' without reading every word around them."
  },
  {
    id: "ing-comp-m3-q3",
    pergunta: "Scanning is more efficient than skimming when you need to:",
    opcoes: [
      { label: "A", valor: "Understand the author's general argument" },
      { label: "B", valor: "Get a quick overview of the topic" },
      { label: "C", valor: "Find one specific fact or number" },
      { label: "D", valor: "Improve your reading speed" },
      { label: "E", valor: "Learn new vocabulary" }
    ],
    correta: "C",
    explicacao: "For one specific piece of information, scanning is the fastest. Skimming is better for general understanding."
  },
  {
    id: "ing-comp-m3-q4",
    pergunta: "To scan effectively, you should identify:",
    opcoes: [
      { label: "A", valor: "All vowels in the text" },
      { label: "B", valor: "The keywords from the question BEFORE scanning" },
      { label: "C", valor: "Every adjective and adverb" },
      { label: "D", valor: "The author's personal opinions" },
      { label: "E", valor: "Punctuation marks" }
    ],
    correta: "B",
    explicacao: "Extract keywords from the question (example: 'temperature', 'wellhead') and scan for those specific words in the text."
  },
  {
    id: "ing-comp-m3-q5",
    pergunta: "Scanning is especially useful for finding:",
    opcoes: [
      { label: "A", valor: "The main idea" },
      { label: "B", valor: "The author's tone" },
      { label: "C", valor: "Names, dates, numbers, and specific facts" },
      { label: "D", valor: "Implied meanings" },
      { label: "E", valor: "Grammar patterns" }
    ],
    correta: "C",
    explicacao: "Scanning excels at finding concrete data: 'The study was conducted in 2022', 'The pressure was 200 MPa', 'Engineer Rodriguez stated...'"
  },
  {
    id: "ing-comp-m3-q6",
    pergunta: "When scanning a text about 'Offshore Platforms', your eyes should:",
    opcoes: [
      { label: "A", valor: "Read every word from left to right" },
      { label: "B", valor: "Jump from word to word, searching for keywords" },
      { label: "C", valor: "Focus on beautiful writing" },
      { label: "D", valor: "Avoid technical terms" },
      { label: "E", valor: "Read in a spiral pattern" }
    ],
    correta: "B",
    explicacao: "Scanning is NOT linear reading. Your eyes jump, skipping irrelevant text, until they land on the target keyword."
  },
  {
    id: "ing-comp-m3-q7",
    pergunta: "Scanning becomes difficult when:",
    opcoes: [
      { label: "A", valor: "The text is short" },
      { label: "B", valor: "Keywords appear multiple times with different meanings" },
      { label: "C", valor: "You read slowly" },
      { label: "D", valor: "The text is about science" },
      { label: "E", valor: "Questions are in Portuguese" }
    ],
    correta: "B",
    explicacao: "If 'pressure' appears 10 times, you must read the context to find the RIGHT mention (e.g., 'pressure at 3,000 meters', not 'pressure in the office')."
  },
  {
    id: "ing-comp-m3-q8",
    pergunta: "The scanning process for finding 'What materials are used for wellhead seals?' includes:",
    opcoes: [
      { label: "A", valor: "Reading slowly and understanding every detail" },
      { label: "B", valor: "Identifying keywords ('wellhead', 'seals', 'materials') and scanning for them" },
      { label: "C", valor: "Memorizing the entire text" },
      { label: "D", valor: "Translating every sentence" },
      { label: "E", valor: "Finding synonyms for each keyword" }
    ],
    correta: "B",
    explicacao: "Extract keywords from the question, then scan the text for those words and read the surrounding sentences for context."
  },
  {
    id: "ing-comp-m3-q9",
    pergunta: "After scanning finds your keyword, you should:",
    opcoes: [
      { label: "A", valor: "Immediately select an answer" },
      { label: "B", valor: "Read the SENTENCE containing the keyword to understand context" },
      { label: "C", valor: "Skip it and scan elsewhere" },
      { label: "D", valor: "Check the dictionary" },
      { label: "E", valor: "Ask for help" }
    ],
    correta: "B",
    explicacao: "Scanning finds the location; reading the context confirms the answer. Never answer based on keywords alone."
  },
  {
    id: "ing-comp-m3-q10",
    pergunta: "In a Cesgranrio exam with 10 questions and 1 text, the BEST strategy is:",
    opcoes: [
      { label: "A", valor: "Read the entire text slowly, then answer" },
      { label: "B", valor: "Guess all answers without reading" },
      { label: "C", valor: "Skim the text, then SCAN for each question's answer" },
      { label: "D", valor: "Answer from memory" },
      { label: "E", valor: "Read only the first paragraph" }
    ],
    correta: "C",
    explicacao: "Optimal exam strategy: Skim once for context → Answer each question by scanning → This is faster and more accurate than reading every word."
  }
];

// ═══ MÓDULO 4 — VOCABULARY IN CONTEXT ═══
export const QUIZ_M4_VOCABULARY: QuizQuestion[] = [
  {
    id: "ing-comp-m4-q1",
    pergunta: "When you encounter an unknown word like 'mitigate', you should:",
    opcoes: [
      { label: "A", valor: "Stop reading and use a dictionary" },
      { label: "B", valor: "Guess the meaning based on context clues" },
      { label: "C", valor: "Skip the word and continue" },
      { label: "D", valor: "Translate the entire text" },
      { label: "E", valor: "Ignore it completely" }
    ],
    correta: "B",
    explicacao: "Context clues help you deduce meaning WITHOUT a dictionary. Look at sentences before and after the word."
  },
  {
    id: "ing-comp-m4-q2",
    pergunta: "'The company despite challenging market conditions, increased its profits.' 'Despite' here means:",
    opcoes: [
      { label: "A", valor: "Because of" },
      { label: "B", valor: "Following" },
      { label: "C", valor: "In spite of; even though" },
      { label: "D", valor: "Before" },
      { label: "E", valor: "Without" }
    ],
    correta: "C",
    explicacao: "'Despite' shows contrast. Despite = even though. The company had difficulties BUT increased profits."
  },
  {
    id: "ing-comp-m4-q3",
    pergunta: "Context clues come from:",
    opcoes: [
      { label: "A", valor: "The dictionary definition" },
      { label: "B", valor: "Words, punctuation, and logic surrounding the unknown word" },
      { label: "C", valor: "Guessing without evidence" },
      { label: "D", valor: "The author's biography" },
      { label: "E", valor: "The title alone" }
    ],
    correta: "B",
    explicacao: "Good context means: nearby words (synonyms/antonyms), punctuation (parentheses often clarify), and logical flow."
  },
  {
    id: "ing-comp-m4-q4",
    pergunta: "'The subsea equipment is robust and can withstand extreme pressure.' 'Robust' means:",
    opcoes: [
      { label: "A", valor: "Cheap and fragile" },
      { label: "B", valor: "Strong and durable" },
      { label: "C", valor: "Small and portable" },
      { label: "D", valor: "Old and outdated" },
      { label: "E", valor: "Colorful" }
    ],
    correta: "B",
    explicacao: "Context: equipment can 'withstand extreme pressure' → robust = strong, durable, and resilient."
  },
  {
    id: "ing-comp-m4-q5",
    pergunta: "When a sentence has a pronoun or synonym following a colon (: ), it usually clarifies the previous word. Example: 'The protocol: a set of standard procedures.' Here, 'protocol' means:",
    opcoes: [
      { label: "A", valor: "A disease" },
      { label: "B", valor: "A set of standard procedures or rules" },
      { label: "C", valor: "A type of fish" },
      { label: "D", valor: "A software error" },
      { label: "E", valor: "A religious ceremony" }
    ],
    correta: "B",
    explicacao: "The colon (:) is a context clue that introduces a definition or clarification. 'Protocol = a set of standard procedures.'"
  },
  {
    id: "ing-comp-m4-q6",
    pergunta: "'The reservoir's capacity diminished after the extraction.' 'Diminished' most likely means:",
    opcoes: [
      { label: "A", valor: "Increased rapidly" },
      { label: "B", valor: "Decreased or reduced" },
      { label: "C", valor: "Remained stable" },
      { label: "D", valor: "Doubled" },
      { label: "E", valor: "Disappeared completely" }
    ],
    correta: "B",
    explicacao: "Context: 'after extraction' (removing something) → capacity diminished = became smaller/reduced."
  },
  {
    id: "ing-comp-m4-q7",
    pergunta: "Antonym context clues are useful when:",
    opcoes: [
      { label: "A", valor: "The unknown word appears alone" },
      { label: "B", valor: "It is contrasted with a known word (using 'but', 'however', 'unlike')" },
      { label: "C", valor: "The word is very short" },
      { label: "D", valor: "You have no time to read" },
      { label: "E", valor: "The text is translated" }
    ],
    correta: "B",
    explicacao: "Opposite words (antonyms) defined by 'unlike', 'but', or 'however' help you understand a word by knowing what it is NOT."
  },
  {
    id: "ing-comp-m4-q8",
    pergunta: "'Cesgranrio tests are notorious for their difficulty.' 'Notorious' means:",
    opcoes: [
      { label: "A", valor: "Unknown and silent" },
      { label: "B", valor: "Famous or well-known in a NEGATIVE way" },
      { label: "C", valor: "Easy and fun" },
      { label: "D", valor: "Fair and balanced" },
      { label: "E", valor: "Unexpected and surprising" }
    ],
    correta: "B",
    explicacao: "Context: tests for 'difficulty' → notorious = famous in a bad way. (Compare with 'famous', which is positive.)"
  },
  {
    id: "ing-comp-m4-q9",
    pergunta: "When using context clues, you should look at:",
    opcoes: [
      { label: "A", valor: "Only the sentence with the unknown word" },
      { label: "B", valor: "The surrounding 2-3 sentences BEFORE and AFTER" },
      { label: "C", valor: "The title only" },
      { label: "D", valor: "Random paragraphs" },
      { label: "E", valor: "The author's other books" }
    ],
    correta: "B",
    explicacao: "Expand your search! Read 2-3 sentences before and after for better context. Sometimes the clue appears later."
  },
  {
    id: "ing-comp-m4-q10",
    pergunta: "On a Cesgranrio exam, knowing vocabulary from context is important because:",
    opcoes: [
      { label: "A", valor: "You can use a dictionary in the exam" },
      { label: "B", valor: "You don't need to understand any words" },
      { label: "C", valor: "Dictionaries are NOT allowed; you must deduce meaning" },
      { label: "D", valor: "All words appear in the title" },
      { label: "E", valor: "The text is always translated" }
    ],
    correta: "C",
    explicacao: "In real exams, you cannot use dictionaries. Context clues are your ONLY tool for unknown words."
  }
];

// ═══ MÓDULO 5 — PARAGRAPH STRUCTURE ═══
export const QUIZ_M5_PARAGRAPH: QuizQuestion[] = [
  {
    id: "ing-comp-m5-q1",
    pergunta: "A paragraph's structure typically includes:",
    opcoes: [
      { label: "A", valor: "Random sentences with no connection" },
      { label: "B", valor: "Topic sentence (main idea) + Supporting details + Conclusion" },
      { label: "C", valor: "Only numbers and data" },
      { label: "D", valor: "Just questions" },
      { label: "E", valor: "Only dialogue" }
    ],
    correta: "B",
    explicacao: "Standard paragraph structure: Topic sentence (usually 1st or 2nd) → Details → Conclusion. This applies to technical and academic texts."
  },
  {
    id: "ing-comp-m5-q2",
    pergunta: "The topic sentence of a paragraph is usually found at:",
    opcoes: [
      { label: "A", valor: "The very end of the paragraph" },
      { label: "B", valor: "The middle of the paragraph" },
      { label: "C", valor: "The beginning (1st or 2nd sentence)" },
      { label: "D", valor: "The title" },
      { label: "E", valor: "It does not exist in Petrobras texts" }
    ],
    correta: "C",
    explicacao: "English (and Portuguese) typically place the main idea at the START. This is called 'deductive' structure."
  },
  {
    id: "ing-comp-m5-q3",
    pergunta: "Read: 'Offshore drilling is essential for energy security. The process extracts oil from beneath the ocean floor. Advanced technology allows companies to drill safely in deep water.' The topic sentence is:",
    opcoes: [
      { label: "A", valor: "'The process extracts oil...'" },
      { label: "B", valor: "'Advanced technology allows...'" },
      { label: "C", valor: "'Offshore drilling is essential...'" },
      { label: "D", valor: "All sentences have equal importance" },
      { label: "E", valor: "There is no topic sentence" }
    ],
    correta: "C",
    explicacao: "The first sentence states the main idea. The next two sentences provide supporting examples and details."
  },
  {
    id: "ing-comp-m5-q4",
    pergunta: "Supporting details in a paragraph serve to:",
    opcoes: [
      { label: "A", valor: "Confuse the reader" },
      { label: "B", valor: "Explain, illustrate, or prove the topic sentence" },
      { label: "C", valor: "Change the main idea" },
      { label: "D", valor: "Make the text longer" },
      { label: "E", valor: "Introduce new, unrelated topics" }
    ],
    correta: "B",
    explicacao: "Details support and clarify the main idea. They answer questions like 'Why? How? What is an example?'"
  },
  {
    id: "ing-comp-m5-q5",
    pergunta: "In a multi-paragraph text about 'Sustainability in Oil Production', you can find the MAIN TOPIC by reading:",
    opcoes: [
      { label: "A", valor: "Only the conclusion" },
      { label: "B", valor: "The first paragraph's topic sentence" },
      { label: "C", valor: "The title and first paragraph" },
      { label: "D", valor: "Only the last paragraph" },
      { label: "E", valor: "Random paragraphs" }
    ],
    correta: "C",
    explicacao: "The title previews the topic. The first paragraph's topic sentence introduces the overall theme for the entire text."
  },
  {
    id: "ing-comp-m5-q6",
    pergunta: "Transition words like 'however', 'moreover', and 'therefore' help readers by:",
    opcoes: [
      { label: "A", valor: "Making sentences longer" },
      { label: "B", valor: "Connecting ideas and showing relationships between sentences" },
      { label: "C", valor: "Replacing nouns" },
      { label: "D", valor: "Hiding the main idea" },
      { label: "E", valor: "Confusing the reader" }
    ],
    correta: "B",
    explicacao: "Transitions show relationships: 'moreover' = addition, 'however' = contrast, 'therefore' = cause-effect. They guide your understanding."
  },
  {
    id: "ing-comp-m5-q7",
    pergunta: "A paragraph WITHOUT a clear topic sentence:",
    opcoes: [
      { label: "A", valor: "Is always poorly written" },
      { label: "B", valor: "Can be understood by reading all sentences together" },
      { label: "C", valor: "Is always correct" },
      { label: "D", valor: "Should be skipped" },
      { label: "E", valor: "Does not need to be understood" }
    ],
    correta: "B",
    explicacao: "Some paragraphs have implied (not explicitly stated) topics. Read all sentences, and the main idea emerges."
  },
  {
    id: "ing-comp-m5-q8",
    pergunta: "If you're answering 'What is the main idea of paragraph 2?' the quickest approach is:",
    opcoes: [
      { label: "A", valor: "Read the entire text" },
      { label: "B", valor: "Focus on paragraph 2's first and last sentences" },
      { label: "C", valor: "Count the words" },
      { label: "D", valor: "Skip paragraph 2" },
      { label: "E", valor: "Ask the author" }
    ],
    correta: "B",
    explicacao: "Paragraph structure shortcuts: 1st sentence = topic, last sentence = conclusion. This quickly reveals the paragraph's focus."
  },
  {
    id: "ing-comp-m5-q9",
    pergunta: "Supporting details are MOST important when answering:",
    opcoes: [
      { label: "A", valor: "Main idea questions" },
      { label: "B", valor: "Detail questions (According to...)" },
      { label: "C", valor: "Tone questions" },
      { label: "D", valor: "Vocabulary questions" },
      { label: "E", valor: "All question types equally" }
    ],
    correta: "B",
    explicacao: "Detail questions ask 'What does the text say about X?' You need supporting facts, numbers, and specific examples."
  },
  {
    id: "ing-comp-m5-q10",
    pergunta: "Understanding paragraph structure helps you:",
    opcoes: [
      { label: "A", valor: "Memorize the text" },
      { label: "B", valor: "Navigate quickly and answer both main idea and detail questions effectively" },
      { label: "C", valor: "Write better English" },
      { label: "D", valor: "Improve pronunciation" },
      { label: "E", valor: "Translate the text" }
    ],
    correta: "B",
    explicacao: "Structure awareness = faster navigation and accurate question answering. You know where to find main ideas vs. details."
  }
];

// ═══ MÓDULO 6 — REFERENCE WORDS & COHESION ═══
export const QUIZ_M6_REFERENCE: QuizQuestion[] = [
  {
    id: "ing-comp-m6-q1",
    pergunta: "Reference words like 'it', 'they', 'that' help create text cohesion by:",
    opcoes: [
      { label: "A", valor: "Repeating nouns constantly" },
      { label: "B", valor: "Replacing nouns to avoid repetition while maintaining connection" },
      { label: "C", valor: "Confusing the reader" },
      { label: "D", valor: "Changing the topic" },
      { label: "E", valor: "Using difficult words" }
    ],
    correta: "B",
    explicacao: "Pronouns and demonstratives create a smooth flow. Instead of 'The platform... the platform... the platform', you write 'The platform... it... its...'"
  },
  {
    id: "ing-comp-m6-q2",
    pergunta: "In the sentence 'Petrobras operates subsea wells. They are located in deep water.' 'They' refers to:",
    opcoes: [
      { label: "A", valor: "Petrobras" },
      { label: "B", valor: "Subsea wells" },
      { label: "C", valor: "Deep water" },
      { label: "D", valor: "Water only" },
      { label: "E", valor: "Operates" }
    ],
    correta: "B",
    explicacao: "'They' = plural pronoun → refers to 'subsea wells' (plural noun closest to the pronoun)."
  },
  {
    id: "ing-comp-m6-q3",
    pergunta: "'This' typically refers to:",
    opcoes: [
      { label: "A", valor: "Something mentioned AFTER the sentence" },
      { label: "B", valor: "Something mentioned BEFORE the sentence" },
      { label: "C", valor: "The title" },
      { label: "D", valor: "An unrelated concept" },
      { label: "E", valor: "The reader" }
    ],
    correta: "B",
    explicacao: "'This' looks BACKWARD to a recently mentioned noun, fact, or idea. Example: 'Oil prices rose. This increase affected production.'"
  },
  {
    id: "ing-comp-m6-q4",
    pergunta: "Cohesive devices include all of the following EXCEPT:",
    opcoes: [
      { label: "A", valor: "Pronouns (it, they, that)" },
      { label: "B", valor: "Synonyms" },
      { label: "C", valor: "Transitions (however, moreover)" },
      { label: "D", valor: "Random unrelated ideas" },
      { label: "E", valor: "Demonstratives (this, that, these, those)" }
    ],
    correta: "D",
    explicacao: "Cohesion CONNECTS ideas. Random, unrelated ideas break cohesion. Pronouns, synonyms, and transitions create coherence."
  },
  {
    id: "ing-comp-m6-q5",
    pergunta: "When tracking a reference, you should read:",
    opcoes: [
      { label: "A", valor: "The sentence with the pronoun ONLY" },
      { label: "B", valor: "The 1-2 sentences BEFORE the pronoun to find its antecedent (what it refers to)" },
      { label: "C", valor: "The end of the paragraph" },
      { label: "D", valor: "Another paragraph" },
      { label: "E", valor: "The glossary" }
    ],
    correta: "B",
    explicacao: "Look BACKWARD. The pronoun's referent (the noun it replaces) is usually in the sentence before or earlier in the paragraph."
  },
  {
    id: "ing-comp-m6-q6",
    pergunta: "Read: 'Engineers tested the sealing system. Its durability exceeded expectations.' 'Its' refers to:",
    opcoes: [
      { label: "A", valor: "Engineers" },
      { label: "B", valor: "Durability" },
      { label: "C", valor: "The sealing system" },
      { label: "D", valor: "Expectations" },
      { label: "E", valor: "Testing" }
    ],
    correta: "C",
    explicacao: "'Its' = possessive pronoun for singular noun → refers to 'sealing system'. Its durability = the sealing system's durability."
  },
  {
    id: "ing-comp-m6-q7",
    pergunta: "When a Cesgranrio question asks 'What does the pronoun 'that' refer to?' you should:",
    opcoes: [
      { label: "A", valor: "Guess" },
      { label: "B", valor: "Find the noun phrase closest to 'that' in previous sentences" },
      { label: "C", valor: "Check a grammar book" },
      { label: "D", valor: "Translate the text" },
      { label: "E", valor: "Ignore the question" }
    ],
    correta: "B",
    explicacao: "Look BACKWARD from 'that'. The noun phrase that makes sense in context is the antecedent."
  },
  {
    id: "ing-comp-m6-q8",
    pergunta: "Synonyms create cohesion by:",
    opcoes: [
      { label: "A", valor: "Using the same word repeatedly" },
      { label: "B", valor: "Using different words with similar meanings to avoid repetition" },
      { label: "C", valor: "Using opposite words" },
      { label: "D", valor: "Using unrelated words" },
      { label: "E", valor: "Using only technical terms" }
    ],
    correta: "B",
    explicacao: "Instead of 'problem... problem... problem', write 'problem... issue... challenge'. Synonyms create flow while maintaining meaning."
  },
  {
    id: "ing-comp-m6-q9",
    pergunta: "Read: 'Subsea platforms are complex structures. These devices require specialized maintenance.' 'These devices' refers to:",
    opcoes: [
      { label: "A", valor: "Maintenance" },
      { label: "B", valor: "Structures" },
      { label: "C", valor: "Subsea platforms" },
      { label: "D", valor: "Complexity" },
      { label: "E", valor: "Specialization" }
    ],
    correta: "C",
    explicacao: "'These devices' = demonstrative + noun → refers back to 'subsea platforms' mentioned in the first sentence."
  },
  {
    id: "ing-comp-m6-q10",
    pergunta: "Understanding reference and cohesion helps you:",
    opcoes: [
      { label: "A", valor: "Improve your handwriting" },
      { label: "B", valor: "Track ideas across sentences and paragraphs, improving inference ability" },
      { label: "C", valor: "Memorize vocabulary" },
      { label: "D", valor: "Translate faster" },
      { label: "E", valor: "Count sentences" }
    ],
    correta: "B",
    explicacao: "Following references reveals how ideas connect. This is CRITICAL for inference questions about implied relationships."
  }
];

// ═══ MÓDULO 7 — TONE & AUTHOR'S PURPOSE ═══
export const QUIZ_M7_TONE: QuizQuestion[] = [
  {
    id: "ing-comp-m7-q1",
    pergunta: "Tone refers to:",
    opcoes: [
      { label: "A", valor: "The volume of voice used when reading" },
      { label: "B", valor: "The author's attitude and emotional approach toward the subject" },
      { label: "C", valor: "The number of paragraphs" },
      { label: "D", valor: "The date the text was published" },
      { label: "E", valor: "The author's salary" }
    ],
    correta: "B",
    explicacao: "Tone = attitude. Neutral? Critical? Optimistic? Formal? Word choice reveals the author's emotional stance."
  },
  {
    id: "ing-comp-m7-q2",
    pergunta: "Which tone is most common in Cesgranrio technical texts about Petrobras?",
    opcoes: [
      { label: "A", valor: "Angry and frustrated" },
      { label: "B", valor: "Casual and humorous" },
      { label: "C", valor: "Formal, objective, and informative" },
      { label: "D", valor: "Poetic and romantic" },
      { label: "E", valor: "Sarcastic and mocking" }
    ],
    correta: "C",
    explicacao: "Technical and industrial texts maintain FORMAL tone. The author presents facts objectively, without personal emotion."
  },
  {
    id: "ing-comp-m7-q3",
    pergunta: "Words that reveal a CRITICAL tone include:",
    opcoes: [
      { label: "A", valor: "'Allegedly', 'purportedly', 'claimed'" },
      { label: "B", valor: "'Definitely', 'clearly', 'undoubtedly'" },
      { label: "C", valor: "'Happily', 'joyfully'" },
      { label: "D", valor: "'Maybe', 'perhaps'" },
      { label: "E", valor: "'Never', 'always'" }
    ],
    correta: "A",
    explicacao: "'Allegedly' and 'purportedly' suggest doubt or skepticism. They create distance between the author and the claim."
  },
  {
    id: "ing-comp-m7-q4",
    pergunta: "Neutral tone uses:",
    opcoes: [
      { label: "A", valor: "Emotional words and personal opinions" },
      { label: "B", valor: "Passive voice, factual statements, and objective language" },
      { label: "C", valor: "Sarcasm and irony" },
      { label: "D", valor: "Repeated exclamation marks" },
      { label: "E", valor: "Personal pronouns like 'I' and 'we'" }
    ],
    correta: "B",
    explicacao: "Neutral tone: 'The study found that...' (not 'The study obviously proved...'). Focus on facts, not feelings."
  },
  {
    id: "ing-comp-m7-q5",
    pergunta: "Compare: A) 'Regulations were enforced.' B) 'Strict regulations were finally enforced.' Which has a different tone?",
    opcoes: [
      { label: "A", valor: "A is more emotional" },
      { label: "B", valor: "Both are identical in tone" },
      { label: "C", valor: "B is more opinionated (uses 'strict' and 'finally' to suggest approval)" },
      { label: "D", valor: "A is too formal" },
      { label: "E", valor: "B is more neutral" }
    ],
    correta: "C",
    explicacao: "Adjectives like 'strict' and adverbs like 'finally' add emotional weight. They reveal the author's attitude."
  },
  {
    id: "ing-comp-m7-q6",
    pergunta: "The author's PURPOSE in a Petrobras safety manual would likely be:",
    opcoes: [
      { label: "A", valor: "To entertain readers" },
      { label: "B", valor: "To inform and ensure compliance with safety procedures" },
      { label: "C", valor: "To convince people to avoid oil work" },
      { label: "D", valor: "To criticize engineers" },
      { label: "E", valor: "To tell a funny story" }
    ],
    correta: "B",
    explicacao: "Purpose is the TEXT'S GOAL. A manual's purpose is always to INFORM and INSTRUCT, ensuring safe practices."
  },
  {
    id: "ing-comp-m7-q7",
    pergunta: "Identifying tone and purpose helps you answer:",
    opcoes: [
      { label: "A", valor: "Only vocabulary questions" },
      { label: "B", valor: "Tone, purpose, and inference questions" },
      { label: "C", valor: "Only detail questions" },
      { label: "D", valor: "No questions" },
      { label: "E", valor: "Only date-related questions" }
    ],
    correta: "B",
    explicacao: "Tone and purpose questions are DIRECTLY asked in Cesgranrio. They also help you infer the author's stance on topics."
  },
  {
    id: "ing-comp-m7-q8",
    pergunta: "Which choice describes an OPTIMISTIC tone?",
    opcoes: [
      { label: "A", valor: "'The failure resulted in significant losses.'" },
      { label: "B", valor: "'Advanced technology enables companies to achieve unprecedented efficiency.'" },
      { label: "C", valor: "'Despite numerous obstacles, the project stalled.'" },
      { label: "D", valor: "'The proposal was rejected unanimously.'" },
      { label: "E", valor: "'Problems persist without resolution.'" }
    ],
    correta: "B",
    explicacao: "Optimistic tone uses positive words: 'advanced', 'enables', 'unprecedented', 'efficiency'. It suggests confidence and progress."
  },
  {
    id: "ing-comp-m7-q9",
    pergunta: "When the author writes 'The government's alleged commitment to clean energy' the tone suggests:",
    opcoes: [
      { label: "A", valor: "Full confidence and support" },
      { label: "B", valor: "Doubt or skepticism about the claim" },
      { label: "C", valor: "Happiness" },
      { label: "D", valor: "Aggressive criticism" },
      { label: "E", valor: "Neutrality" }
    ],
    correta: "B",
    explicacao: "'Alleged' casts doubt. The author questions the government's ACTUAL commitment despite their claims."
  },
  {
    id: "ing-comp-m7-q10",
    pergunta: "In a Cesgranrio exam, tone questions typically ask:",
    opcoes: [
      { label: "A", valor: "'What is the volume of the author's voice?'" },
      { label: "B", valor: "'What is the author's attitude toward the subject?' or 'The tone of the text is...'" },
      { label: "C", valor: "'How many times is the subject mentioned?'" },
      { label: "D", valor: "'Who wrote this text?'" },
      { label: "E", valor: "'What is the title?'" }
    ],
    correta: "B",
    explicacao: "Tone questions ask about ATTITUDE: Is the author supportive? Critical? Neutral? These are standard in comprehension tests."
  }
];

// ═══ MÓDULO 8 — INFERENCE & IMPLICIT INFORMATION ═══
export const QUIZ_M8_INFERENCE: QuizQuestion[] = [
  {
    id: "ing-comp-m8-q1",
    pergunta: "An inference is:",
    opcoes: [
      { label: "A", valor: "Information directly stated in the text" },
      { label: "B", valor: "A conclusion you draw from textual evidence and logic" },
      { label: "C", valor: "A guess without evidence" },
      { label: "D", valor: "The title" },
      { label: "E", valor: "A grammatical rule" }
    ],
    correta: "B",
    explicacao: "Inference = reading between the lines. Use facts from the text + logic to reach conclusions not explicitly stated."
  },
  {
    id: "ing-comp-m8-q2",
    pergunta: "Read: 'The refinery's production decreased significantly during the storm. Technicians worked overtime to restore normal operations.' You can infer:",
    opcoes: [
      { label: "A", valor: "The technicians caused the storm" },
      { label: "B", valor: "The storm damaged the refinery, reducing production temporarily" },
      { label: "C", valor: "Storms always shut down refineries" },
      { label: "D", valor: "Technicians don't care about production" },
      { label: "E", valor: "The refinery is closing permanently" }
    ],
    correta: "B",
    explicacao: "Evidence: decreased production + storm + overtime work → Inference: Storm caused damage, they're fixing it. Logical deduction."
  },
  {
    id: "ing-comp-m8-q3",
    pergunta: "When making an inference, you should NEVER:",
    opcoes: [
      { label: "A", valor: "Use context clues" },
      { label: "B", valor: "Use textual evidence" },
      { label: "C", valor: "Guess or assume something without support from the text" },
      { label: "D", valor: "Think logically" },
      { label: "E", valor: "Read between the lines" }
    ],
    correta: "C",
    explicacao: "Every inference must be SUPPORTED by textual evidence. Wild guesses are NOT valid inferences."
  },
  {
    id: "ing-comp-m8-q4",
    pergunta: "Read: 'The new environmental regulations increased operational costs. Several companies moved their facilities to countries with less stringent requirements.' What can you infer about these companies?",
    opcoes: [
      { label: "A", valor: "They love protecting the environment" },
      { label: "B", valor: "They prioritize reducing costs over environmental compliance" },
      { label: "C", valor: "The regulations were good for them" },
      { label: "D", valor: "They are moving to Petrobras" },
      { label: "E", valor: "They manufacture toys" }
    ],
    correta: "B",
    explicacao: "Evidence: regulations raised costs → companies avoided them → Inference: they value profit over environmental responsibility."
  },
  {
    id: "ing-comp-m8-q5",
    pergunta: "'Imply' vs. 'Infer': The author IMPLIES; the reader INFERS. What does this mean?",
    opcoes: [
      { label: "A", valor: "Both words mean the same thing" },
      { label: "B", valor: "The author leaves information implicit (hidden); the reader draws conclusions from it" },
      { label: "C", valor: "Readers write and authors read" },
      { label: "D", valor: "It is a grammatical distinction only" },
      { label: "E", valor: "They are not related" }
    ],
    correta: "B",
    explicacao: "Author implies = suggests without stating. Reader infers = concludes from the implication. The author gives clues; you solve the puzzle."
  },
  {
    id: "ing-comp-m8-q6",
    pergunta: "When a Cesgranrio question asks 'It can be inferred that...', the answer is:",
    opcoes: [
      { label: "A", valor: "Always the first option" },
      { label: "B", valor: "Directly quoted from the text" },
      { label: "C", valor: "A conclusion based on textual evidence and logic (NOT explicitly stated)" },
      { label: "D", valor: "The author's personal opinion" },
      { label: "E", valor: "A random guess" }
    ],
    correta: "C",
    explicacao: "'Can be inferred' = not directly stated but logically supported by the text. The answer should be defendable with evidence."
  },
  {
    id: "ing-comp-m8-q7",
    pergunta: "Read: 'Petrobras invests billions in renewable energy research annually. The company's strategic plan includes transitioning away from fossil fuels.' You can infer:",
    opcoes: [
      { label: "A", valor: "Petrobras will never produce oil again" },
      { label: "B", valor: "Petrobras is abandoning all oil operations tomorrow" },
      { label: "C", valor: "Petrobras is committed to long-term sustainability and diversifying its energy portfolio" },
      { label: "D", valor: "Oil prices will increase" },
      { label: "E", valor: "Renewable energy doesn't work" }
    ],
    correta: "C",
    explicacao: "Evidence: billions invested + strategic plan → Inference: They're committed to change (long-term, not immediate)."
  },
  {
    id: "ing-comp-m8-q8",
    pergunta: "A good inference question expects you to:",
    opcoes: [
      { label: "A", valor: "Memorize facts" },
      { label: "B", valor: "Analyze evidence, consider context, and reach a reasonable conclusion" },
      { label: "C", valor: "Translate every word" },
      { label: "D", valor: "Change the subject" },
      { label: "E", valor: "Ignore the text" }
    ],
    correta: "B",
    explicacao: "Inference is an active thinking process. You must evaluate evidence and construct logical conclusions."
  },
  {
    id: "ing-comp-m8-q9",
    pergunta: "Which of the following is a WEAK inference (not well-supported)?",
    opcoes: [
      { label: "A", valor: "'The company struggled during the recession. (Inference: Times were difficult for many businesses.)'" },
      { label: "B", valor: "'The engineer was promoted. (Inference: The engineer performed excellently.)'" },
      { label: "C", valor: "'Regulations increased. (Inference: The sun is made of ice.)'" },
      { label: "D", valor: "'Equipment was upgraded. (Inference: The company invested in modernization.)'" },
      { label: "E", valor: "'The project failed. (Inference: Something went wrong.)'" }
    ],
    correta: "C",
    explicacao: "'The sun is made of ice' has NO connection to regulations. Weak inferences ignore textual evidence. Always connect to the text."
  },
  {
    id: "ing-comp-m8-q10",
    pergunta: "Mastering inference questions is critical for Cesgranrio because:",
    opcoes: [
      { label: "A", valor: "Inference questions are never asked" },
      { label: "B", valor: "They test your ability to think critically and understand beyond literal meaning" },
      { label: "C", valor: "They are only for advanced students" },
      { label: "D", valor: "The test has no inference questions" },
      { label: "E", valor: "Inference is not part of reading comprehension" }
    ],
    correta: "B",
    explicacao: "Inference questions separate good readers from excellent readers. They test comprehension at the highest level."
  }
];

// ═══ MÓDULO 9 — READING COMPREHENSION CESGRANRIO ═══
export const QUIZ_M9_CESGRANRIO: QuizQuestion[] = [
  {
    id: "ing-comp-m9-q1",
    pergunta: "Cesgranrio reading comprehension texts typically cover topics related to:",
    opcoes: [
      { label: "A", valor: "Fashion and entertainment" },
      { label: "B", valor: "Energy, technology, and business (especially Petrobras and oil industry)" },
      { label: "C", valor: "Cooking and recipes" },
      { label: "D", valor: "Sports" },
      { label: "E", valor: "Celebrity gossip" }
    ],
    correta: "B",
    explicacao: "Cesgranrio focuses on professional contexts: oil, energy, engineering, sustainability. Expect technical vocabulary."
  },
  {
    id: "ing-comp-m9-q2",
    pergunta: "A common Cesgranrio trick is to:",
    opcoes: [
      { label: "A", valor: "Use the same keywords in WRONG context" },
      { label: "B", valor: "Ask questions that are too easy" },
      { label: "C", valor: "Avoid using technical terms" },
      { label: "D", valor: "Always put the answer first" },
      { label: "E", valor: "Never test inference" }
    ],
    correta: "A",
    explicacao: "Cesgranrio's trap: answer options repeat keywords from the text BUT in DIFFERENT contexts. You must read carefully."
  },
  {
    id: "ing-comp-m9-q3",
    pergunta: "When a Cesgranrio question says 'According to the text, which is FALSE?', you should:",
    opcoes: [
      { label: "A", valor: "Choose the first option" },
      { label: "B", valor: "Scan for the three TRUE statements and find the one that contradicts the text" },
      { label: "C", valor: "Guess randomly" },
      { label: "D", valor: "Avoid reading carefully" },
      { label: "E", valor: "Assume all options are true" }
    ],
    correta: "B",
    explicacao: "False/NOT TRUE questions require you to find the EXCEPTION. Evaluate each option against the text."
  },
  {
    id: "ing-comp-m9-q4",
    pergunta: "Cesgranrio often tests your ability to:",
    opcoes: [
      { label: "A", valor: "Memorize vocabulary" },
      { label: "B", valor: "Distinguish between what IS STATED vs. what is IMPLIED or PARTIALLY mentioned" },
      { label: "C", valor: "Translate to Portuguese" },
      { label: "D", valor: "Use a dictionary" },
      { label: "E", valor: "Write essays" }
    ],
    correta: "B",
    explicacao: "Cesgranrio's difficulty lies in fine distinctions. The text mentions 'X helped solve Y', but the answer option says 'X solved Y' (too extreme)."
  },
  {
    id: "ing-comp-m9-q5",
    pergunta: "In Cesgranrio exams, texts are usually:",
    opcoes: [
      { label: "A", valor: "Extremely difficult with rare vocabulary" },
      { label: "B", valor: "Moderate difficulty; the trap is in question interpretation, not language" },
      { label: "C", valor: "Very easy" },
      { label: "D", valor: "Always from novels" },
      { label: "E", valor: "Unpredictable" }
    ],
    correta: "B",
    explicacao: "Cesgranrio texts are professionally written (moderate difficulty). The challenge is CAREFUL READING and distinguishing fine details."
  },
  {
    id: "ing-comp-m9-q6",
    pergunta: "A Cesgranrio strategy includes:",
    opcoes: [
      { label: "A", valor: "Skipping the text" },
      { label: "B", valor: "Reading the questions BEFORE the text, then skimming and scanning" },
      { label: "C", valor: "Guessing all answers" },
      { label: "D", valor: "Reading very slowly" },
      { label: "E", valor: "Translating every word" }
    ],
    correta: "B",
    explicacao: "Optimal Cesgranrio strategy: Decode questions first (What am I looking for?) → Skim text → Scan for answers."
  },
  {
    id: "ing-comp-m9-q7",
    pergunta: "If a Cesgranrio option says 'The author mentions that...' but the text only IMPLIES it, the option is:",
    opcoes: [
      { label: "A", valor: "Correct" },
      { label: "B", valor: "Incorrect because 'mentions' means EXPLICITLY STATED, not implied" },
      { label: "C", valor: "Too formal" },
      { label: "D", valor: "Both correct and incorrect" },
      { label: "E", valor: "A trick question" }
    ],
    correta: "B",
    explicacao: "Cesgranrio vocabulary matters: 'mentions' = explicitly says, 'implies' = suggests, 'can be inferred' = concluded logically."
  },
  {
    id: "ing-comp-m9-q8",
    pergunta: "In Cesgranrio exams, you should spend approximately __ percent of your time reading the text and __ percent answering questions:",
    opcoes: [
      { label: "A", valor: "90% reading, 10% answering" },
      { label: "B", valor: "50% reading, 50% answering" },
      { label: "C", valor: "40% reading, 60% answering (with targeted rereading)" },
      { label: "D", valor: "20% reading, 80% answering" },
      { label: "E", valor: "100% reading, 0% answering" }
    ],
    correta: "C",
    explicacao: "Efficiency: Skim/scan the text quickly (40%), then answer questions (60%), using targeted rereading as needed."
  },
  {
    id: "ing-comp-m9-q9",
    pergunta: "When stuck between two similar Cesgranrio options, you should:",
    opcoes: [
      { label: "A", valor: "Flip a coin" },
      { label: "B", valor: "Reread the relevant part of the text and look for subtle differences in meaning" },
      { label: "C", valor: "Choose the longest option" },
      { label: "D", valor: "Choose the shortest" },
      { label: "E", valor: "Skip and move on" }
    ],
    correta: "B",
    explicacao: "Cesgranrio's traps: similar-SOUNDING options with DIFFERENT meanings. Precision reading is required."
  },
  {
    id: "ing-comp-m9-q10",
    pergunta: "The MOST important Cesgranrio reading skill is:",
    opcoes: [
      { label: "A", valor: "Reading very fast" },
      { label: "B", valor: "Knowing every vocabulary word" },
      { label: "C", valor: "Careful, precise reading to catch fine distinctions and avoid traps" },
      { label: "D", valor: "Guessing well" },
      { label: "E", valor: "Memorizing answers" }
    ],
    correta: "C",
    explicacao: "Precision and strategy beat speed and memory. Cesgranrio tests comprehension, not memorization."
  }
];

// ═══ MÓDULO 10 — SIMULADO MESTRE ═══
export const QUIZ_M10_SIMULADO_MESTRE: QuizQuestion[] = [
  {
    id: "ing-comp-m10-q1",
    pergunta: "Which question type focuses on information DIRECTLY stated in the text?",
    opcoes: [
      { label: "A", valor: "Detail/Fact questions" },
      { label: "B", valor: "Inference questions" },
      { label: "C", valor: "Tone questions" },
      { label: "D", valor: "Purpose questions" },
      { label: "E", valor: "Vocabulary questions" }
    ],
    correta: "A",
    explicacao: "Detail questions ask 'According to the text...' The answer is EXPLICITLY STATED, not inferred."
  },
  {
    id: "ing-comp-m10-q2",
    pergunta: "Skimming a 5-paragraph text takes approximately:",
    opcoes: [
      { label: "A", valor: "30 seconds to 1 minute" },
      { label: "B", valor: "2-3 minutes" },
      { label: "C", valor: "5-10 minutes" },
      { label: "D", valor: "15+ minutes" },
      { label: "E", valor: "Less than 10 seconds" }
    ],
    correta: "A",
    explicacao: "Skimming should be FAST. If taking longer, you're reading carefully (scanning), not skimming."
  },
  {
    id: "ing-comp-m10-q3",
    pergunta: "When scanning for 'What is the pressure at 2,000 meters?', your keywords are:",
    opcoes: [
      { label: "A", valor: "'The', 'is', 'at'" },
      { label: "B", valor: "'Pressure', '2,000', 'meters'" },
      { label: "C", valor: "'What', 'question'" },
      { label: "D", valor: "All words" },
      { label: "E", valor: "No specific keywords needed" }
    ],
    correta: "B",
    explicacao: "Extract keywords: 'pressure', '2,000 meters'. Scan the text for these terms, then read the context."
  },
  {
    id: "ing-comp-m10-q4",
    pergunta: "Context clues help you understand unknown vocabulary when you:",
    opcoes: [
      { label: "A", valor: "Ignore surrounding sentences" },
      { label: "B", valor: "Read 2-3 sentences BEFORE and AFTER for meaning" },
      { label: "C", valor: "Use a dictionary" },
      { label: "D", valor: "Skip the word" },
      { label: "E", valor: "Guess without thinking" }
    ],
    correta: "B",
    explicacao: "Context is found nearby. Expand your search: read the full sentence and surrounding sentences."
  },
  {
    id: "ing-comp-m10-q5",
    pergunta: "A topic sentence typically contains:",
    opcoes: [
      { label: "A", valor: "Supporting details only" },
      { label: "B", valor: "The main idea of the paragraph" },
      { label: "C", valor: "A list of facts" },
      { label: "D", valor: "Conclusions from other texts" },
      { label: "E", valor: "The author's personal story" }
    ],
    correta: "B",
    explicacao: "Topic sentence = main idea of the paragraph. Usually 1st or 2nd sentence."
  },
  {
    id: "ing-comp-m10-q6",
    pergunta: "In 'Engineers tested the sealing system. It exceeded expectations.', 'It' refers to:",
    opcoes: [
      { label: "A", valor: "Engineers" },
      { label: "B", valor: "Expectations" },
      { label: "C", valor: "The sealing system" },
      { label: "D", valor: "Testing" },
      { label: "E", valor: "Performance" }
    ],
    correta: "C",
    explicacao: "'It' = singular pronoun → refers to 'sealing system' (singular noun)."
  },
  {
    id: "ing-comp-m10-q7",
    pergunta: "The word 'despite' in 'Despite high costs, the project succeeded' indicates:",
    opcoes: [
      { label: "A", valor: "Cause" },
      { label: "B", valor: "Contrast (even though)" },
      { label: "C", valor: "Sequence" },
      { label: "D", valor: "Similarity" },
      { label: "E", valor: "Consequence" }
    ],
    correta: "B",
    explicacao: "'Despite' = even though. High costs COULD have stopped the project, but it succeeded anyway (contrast)."
  },
  {
    id: "ing-comp-m10-q8",
    pergunta: "A Cesgranrio comprehension test's main goal is to assess:",
    opcoes: [
      { label: "A", valor: "Your grammar knowledge" },
      { label: "B", valor: "Your ability to understand and analyze written English in professional contexts" },
      { label: "C", valor: "Your speaking ability" },
      { label: "D", valor: "Your pronunciation" },
      { label: "E", valor: "Your writing skills" }
    ],
    correta: "B",
    explicacao: "Comprehension tests reading ability: understanding main ideas, details, inferences, tone, and vocabulary in context."
  },
  {
    id: "ing-comp-m10-q9",
    pergunta: "Before answering any comprehension question, you should ALWAYS:",
    opcoes: [
      { label: "A", valor: "Guess immediately" },
      { label: "B", valor: "Use a translator" },
      { label: "C", valor: "Decode the question and know WHAT to search for in the text" },
      { label: "D", valor: "Skip to the next question" },
      { label: "E", valor: "Memorize the entire text" }
    ],
    correta: "C",
    explicacao: "Strategic reading: Understand the question FIRST → You know what to search for → Your scanning becomes targeted and efficient."
  },
  {
    id: "ing-comp-m10-q10",
    pergunta: "Your BEST preparation for Cesgranrio reading comprehension includes:",
    opcoes: [
      { label: "A", valor: "Memorizing every English word" },
      { label: "B", valor: "Practicing with real Cesgranrio texts, focusing on question types, strategy, and precision reading" },
      { label: "C", valor: "Translating texts to Portuguese" },
      { label: "D", valor: "Learning grammar rules only" },
      { label: "E", valor: "Watching movies in English" }
    ],
    correta: "B",
    explicacao: "Best preparation: Practice with REAL TESTS → Master question types → Develop speed and accuracy → Understand Cesgranrio's style."
  }
];
