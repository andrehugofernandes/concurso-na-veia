
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { FreeLLMProvider } from '../src/lib/ai/providers/freellm-provider';

async function testProvider() {
  try {
    const provider = new FreeLLMProvider();
    console.log('Testando FreeLLMProvider...');
    const questao = await provider.generateQuestion({
      materia: 'Matemática',
      dificuldade: 'Média',
      assunto: 'Geometria',
      contexto: { cargo: 'Técnico de Operação', nivel: 'medio' },
      questoesAnteriores: []
    });
    console.log('Sucesso!');
    console.log(JSON.stringify(questao, null, 2));
  } catch (error) {
    console.error('Erro no teste do provedor:', error);
  }
}

testProvider();
