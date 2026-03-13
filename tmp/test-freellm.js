
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function testFreeLLM() {
  const apiKey = process.env.FREE_LLM_API_KEY;
  const endpoint = process.env.FREE_LLM_URL || "https://apifreellm.com/api/v1/chat";
  
  console.log('Using Key:', apiKey?.substring(0, 10) + '...');
  console.log('Using Endpoint:', endpoint);

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
    const finalEndpoint = endpoint.endsWith('/chat') ? endpoint : endpoint.replace(/\/$/, '') + '/chat';
    console.log('Final Endpoint:', finalEndpoint);
    const response = await fetch(finalEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        message: prompt,
        model: "apifreellm",
      }),
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testFreeLLM();
