function cleanTextForTTS(text) {
  return text
    // 1. Remove URLs
    .replace(/https?:\/\/[^\s]+/g, "")
    // 2. Remove Emojis e Símbolos
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, "")
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, "")
    .replace(/[\u{1F600}-\u{1F64F}]/gu, "")
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, "")
    .replace(/[\u{2600}-\u{26FF}]/gu, "")
    .replace(/[\u{2700}-\u{27BF}]/gu, "")
    .replace(/[\u{FE00}-\u{FE0F}]/gu, "")
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, "") // duplicate but okay
    .replace(/[\u{200D}]/gu, "")
    // 3. Remove marcadores visuais
    .replace(/[•●○◆◇▸▹►▻★☆✓✗✔✘→←↑↓⬆⬇⬅➡#]/g, " ")
    // 4. Remove metadados
    .replace(/Ref:\s*\d+-[A-Z.]+/gi, "")
    .replace(/©\s*Concurso\s*Na\s*Veia\s*System/gi, "")
    .replace(/Clique\s*para\s*revelar[^\n.]*/gi, "")
    .replace(/Dossiê\s*Técnico/gi, "")
    .replace(/\b(className|variant|props|export|import|const|function|return|useState|useEffect|useMemo|useCallback)\b[^.\n]*/gi, "")
    .replace(/[\{\}<>]/g, " ")
    // 5. Suprime pontos de siglas
    .replace(/\b([A-Z])\.(?=[A-Z]\b|\.[A-Z]|(?:\.[A-Z])+)/g, "$1")
    .replace(/\b([A-Z]{2,})\./g, "$1")
    // 6. Expande abreviações
    .replace(/\bArt\.\s*/gi, "Artigo ")
    .replace(/\bInc\.\s*/gi, "Inciso ")
    .replace(/\bp\.?\s*ex\.\s*/gi, "por exemplo, ")
    .replace(/\bex\.\s*/gi, "exemplo, ")
    .replace(/\betc\.\s*/gi, "e assim por diante. ")
    .replace(/\bvs\.\s*/gi, "versus ")
    .replace(/\b(?:n|N)\.[ºoO]\b\s*/g, "número ")
    .replace(/\b(?:n|N)º\s*/g, "número ")
    .replace(/\b(?:n|N)\.º\s*/g, "número ")
    .replace(/\b([0-9]+)[ºª]\s*/g, "$1 ")
    // 7. Trata numeração
    .replace(/^([0-9]+)\.\s+/gm, "$1, ")
    .replace(/Módulo\s+([0-9]+)\.\s+/gi, "Módulo $1: ")
    // 8. Espaçamento duplo
    .replace(/\s{2,}/g, " ")
    .trim();
}

const text = `
Fundamentos de Administração
Entenda a essência da administração como processo de planejar, organizar, dirigir e controlar recursos para atingir objetivos organizacionais.
Áudio Aula — Ouvir Módulo (Elite Total)
Definição e Pilares da Administração
Os conceitos fundamentais que sustentam toda a prática administrativa moderna.
A ciência da administração consolidou-se ao longo do último século como uma das disciplinas fundamentais para a viabilização e longevidade das organizações complexas. Nos exames de admissão de nível superior da Petrobras, elaborados tradicionalmente pela banca CESGRANRIO, os conceitos introdutórios de administração geral não são cobrados de forma puramente teórica, mas sim contextualizados nas rotinas de gerenciamento de recursos e planejamento estratégico. O entendimento claro desses alicerces é a primeira barreira de conhecimento que separa o candidato da aprovação.
Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.
`;

console.log(cleanTextForTTS(text));
