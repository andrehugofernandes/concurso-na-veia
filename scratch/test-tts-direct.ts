
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('Using API key:', apiKey ? apiKey.substring(0, 10) + '...' : 'none');
  
  const response = await fetch(
    \https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=\\,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Olá, testando a geração de áudio por inteligência artificial.' }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Aoede' },
            },
          },
        },
      }),
    }
  );

  console.log('Status:', response.status);
  const data = await response.text();
  console.log('Response:', data);
}

run().catch(console.error);

