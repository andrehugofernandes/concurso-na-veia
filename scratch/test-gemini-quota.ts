import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkQuota() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Chave GEMINI_API_KEY não encontrada!');
    return;
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    console.log('🔄 Disparando chamada de teste ultrarrápida para o Gemini (apenas 1 palavra)...');
    
    // Tenta fazer uma requisição mínima apenas para checar o status
    const result = await model.generateContent('Responda apenas com a palavra "LIBERADO" se estiver me ouvindo.');
    const response = await result.response;
    
    console.log('✅ SUCESSO ABSOLUTO! A API do Gemini respondeu: "' + response.text().trim() + '"');
    console.log('Isso significa que seus créditos já caíram e a cota foi liberada pelo Google!');
  } catch (error: any) {
    console.error('❌ AINDA BLOQUEADO. A API retornou erro de cota ou recusa:');
    if (error.message.includes('429')) {
      console.error('Motivo: Erro 429 - Limite de cota/rate limit atingido. Os servidores ainda não atualizaram seu saldo.');
    } else {
      console.error(error.message);
    }
  }
}

checkQuota();
