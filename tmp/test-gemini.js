
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY não configurada");
    return;
  }
  
  console.log('Using Gemini Key:', apiKey.substring(0, 10) + '...');
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Crie UMA questão de Língua Portuguesa para concurso Petrobras nível médio.
Dificuldade: Casca de Banana
Estilo CESGRANRIO: enunciado CURTO, objetivo, direto.
Retorne APENAS um JSON válido seguindo este formato:
{
  "enunciado": "texto da questão",
  "alternativas": ["opção A", "opção B", "opção C", "opção D", "opção E"],
  "correta": 0,
  "explicacao": "Explicação detalhada",
  "assunto": "Gramática",
  "dificuldade": "Casca de Banana"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Response:', text);
  } catch (error) {
    console.error('Error:', error);
  }
}

testGemini();
