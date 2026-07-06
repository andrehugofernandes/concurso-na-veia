import fs from "fs";
import path from "path";

const AULAS_DIR = path.join(process.cwd(), "src", "components", "aulas");
const API_URL = "http://localhost:3000/api/podcast/generate";

interface PodcastInfo {
  aulaId: string;
  aulaTitulo: string;
  materia: string;
  materiaId: string;
  moduloNumero: number;
  moduloTitulo: string;
  conteudoResumo?: string;
  file?: string;
}

function findTsxFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTsxFiles(filePath, fileList);
    } else if (filePath.endsWith(".tsx")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function extractPodcasts(filePath: string): PodcastInfo[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const podcasts: PodcastInfo[] = [];

  // Capturar variáveis comuns declaradas no arquivo (ex: const titulo = "..." ou const materia = "...")
  const varRegex = /(const|let|var)\s+(\w+)\s*=\s*(["'`])(.*?)\3/g;
  const vars: Record<string, string> = {};
  let varMatch;
  while ((varMatch = varRegex.exec(content)) !== null) {
    vars[varMatch[2]] = varMatch[4];
  }

  // Montar string de declarações de variáveis para injetar no escopo do new Function
  let prepends = "";
  for (const [k, v] of Object.entries(vars)) {
    prepends += `const ${k} = ${JSON.stringify(v)};\n`;
  }

  // Match the block `resumoVisual={{ ... }}`
  const regex = /resumoVisual=\{\{([\s\S]*?)\}\}/g;
  let match;
  
  // Tentar encontrar o número do módulo pela prop index={} ou moduloNumero={}
  let moduloCounter = 1;

  while ((match = regex.exec(content)) !== null) {
    const block = match[1];
    try {
      // Executa injetando as variáveis locais encontradas no arquivo
      const parseObj = new Function(`${prepends} return {${block}}`);
      const obj = parseObj() as any;
      
      if (obj && obj.tituloAula && obj.materia) {
        const moduloTitulo = obj.moduloNome || `Módulo ${moduloCounter}`;
        const defaultResumo = `Resumo didático e tático do ${moduloTitulo} da aula ${obj.tituloAula} na matéria de ${obj.materia}, focado nas pegadinhas da banca CESGRANRIO para o concurso Petrobras.`;
        
        const pInfo: PodcastInfo = {
          aulaId: obj.tituloAula.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "-"),
          aulaTitulo: obj.tituloAula,
          materia: obj.materia,
          materiaId: obj.materia.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "-"),
          moduloNumero: moduloCounter,
          moduloTitulo: moduloTitulo,
          conteudoResumo: obj.conteudoResumo || defaultResumo,
          file: path.basename(filePath)
        };
        podcasts.push(pInfo);
        moduloCounter++;
      }
    } catch (e: any) {
      // Omitir erros comuns de variáveis não mapeadas para não poluir o terminal
      // console.error(`Erro ao parsear resumoVisual block em ${filePath}:`, e.message);
    }
  }

  return podcasts;
}

async function main() {
  console.log("🔍 Procurando aulas prontas com podcasts configurados...");
  const tsxFiles = findTsxFiles(AULAS_DIR);
  
  let allPodcasts: PodcastInfo[] = [];
  
  for (const file of tsxFiles) {
    const podcastsInFile = extractPodcasts(file);
    allPodcasts = allPodcasts.concat(podcastsInFile);
  }
  
  console.log(`\nEncontrados ${allPodcasts.length} podcasts configurados.`);
  
  if (allPodcasts.length === 0) {
    console.log("Nenhum podcast encontrado. Encerrando.");
    return;
  }
  
  console.log("\n🚀 Iniciando geração em lote (Batch)...");
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < allPodcasts.length; i++) {
    const p = allPodcasts[i];
    console.log(`\n[${i + 1}/${allPodcasts.length}] Gerando podcast: ${p.materiaId} > ${p.aulaId} > Modulo ${p.moduloNumero}`);
    
    let isCached = false;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(p),
      });
      
      const data = await response.json();
      isCached = data && data.success && data.script === null;
      
      if (response.ok && data.success) {
        console.log(`✅ Sucesso! URL: ${data.audioUrl}`);
        successCount++;
      } else {
        console.error(`❌ Erro: ${data.error}`);
        errorCount++;
      }
    } catch (err: any) {
      console.error(`❌ Falha na requisição: ${err.message}`);
      errorCount++;
    }
    
    // Delay de 10s para esfriar o rate limit do Groq/Llama (somente se gerou conteúdo novo)
    if (!isCached) {
      await new Promise((r) => setTimeout(r, 10000));
    }
  }
  
  console.log(`\n🏁 Concluído! Sucessos: ${successCount} | Erros: ${errorCount}`);
}

main().catch(console.error);
