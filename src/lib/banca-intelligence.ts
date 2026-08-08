import fs from 'fs';
import path from 'path';

/**
 * Tenta descobrir qual é a banca organizadora com base no texto do edital.
 * Se não identificar claramente, retorna 'padrao'.
 */
export function identifyBancaFromText(editalText: string): string {
  const text = editalText.toLowerCase();
  
  if (text.includes('cesgranrio')) {
    return 'cesgranrio';
  }
  
  if (text.includes('cebraspe') || text.includes('cespe')) {
    return 'cebraspe';
  }
  
  if (text.includes('fgv') || text.includes('fundação getulio vargas') || text.includes('fundacao getulio vargas')) {
    return 'fgv';
  }
  
  if (text.includes('fcc') || text.includes('fundação carlos chagas') || text.includes('fundacao carlos chagas')) {
    return 'fcc';
  }

  if (text.includes('vunesp') || text.includes('fundação vunesp') || text.includes('fundacao vunesp')) {
    return 'vunesp';
  }
  
  // Adicionar outras bancas no futuro (idecan, ibfc, etc)
  
  return 'padrao';
}

/**
 * Retorna o conteúdo Markdown do perfil hacker da banca especificada.
 * Esse conteúdo deve ser injetado no System Prompt da IA durante a geração de cursos.
 */
export function getBancaHackerContext(bancaName: string): string {
  try {
    // Normaliza o nome para evitar Path Traversal e garantir lower case
    const safeName = bancaName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Caminho absoluto considerando a raiz do projeto no Next.js
    const filePath = path.join(process.cwd(), 'src', 'data', 'bancas', `${safeName}.md`);
    
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    
    // Fallback se o arquivo da banca não existir
    const fallbackPath = path.join(process.cwd(), 'src', 'data', 'bancas', 'padrao.md');
    return fs.readFileSync(fallbackPath, 'utf8');
  } catch (error) {
    console.error(`Erro ao carregar contexto da banca ${bancaName}:`, error);
    return "Regra Padrão: Crie questões de múltipla escolha com 4 ou 5 alternativas. Enunciados claros e objetivos.";
  }
}
