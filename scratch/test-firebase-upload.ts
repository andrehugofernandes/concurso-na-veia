import { uploadPodcastToFirebaseStorage } from '../src/lib/services/firebase-storage';

async function testUpload() {
  // Criamos um arquivo falso bem pequeno (apenas texto) simulando um arquivo de áudio
  const dummyBuffer = Buffer.from('Teste de envio de podcast...', 'utf-8');
  
  console.log('🔄 Iniciando teste de upload para o Firebase Storage...');
  
  const result = await uploadPodcastToFirebaseStorage(
    dummyBuffer,
    'teste-regras',
    'aula-01',
    1
  );
  
  if (result.success) {
    console.log('✅ SUCESSO! As regras estão corretas e o Firebase aceitou o arquivo.');
    console.log('🔗 URL pública gerada:', result.url);
  } else {
    console.log('❌ FALHA NO UPLOAD.');
    console.log('Detalhes do Erro:', result.error);
  }
}

testUpload();
