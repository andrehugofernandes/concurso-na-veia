import fs from "fs";
import path from "path";
import { uploadPodcastToFirebaseStorage, getPodcastFirebaseUrl } from "../src/lib/services/firebase-storage";

const AULAS_DIR = path.join(process.cwd(), "src", "components", "aulas");
const BUCKET_NAME = 'petropbras-quest';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nqqyetymjvgstsbsxdkq.supabase.co';

interface PodcastInfo {
  aulaId: string;
  materia: string;
  materiaId: string;
  moduloNumero: number;
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

  const varRegex = /(const|let|var)\s+(\w+)\s*=\s*(["'`])(.*?)\3/g;
  const vars: Record<string, string> = {};
  let varMatch;
  while ((varMatch = varRegex.exec(content)) !== null) {
    vars[varMatch[2]] = varMatch[4];
  }

  let prepends = "";
  for (const [k, v] of Object.entries(vars)) {
    prepends += `const ${k} = ${JSON.stringify(v)};\n`;
  }

  const regex = /resumoVisual=\{\{([\s\S]*?)\}\}/g;
  let match;
  let moduloCounter = 1;

  while ((match = regex.exec(content)) !== null) {
    const block = match[1];
    try {
      const parseObj = new Function(`${prepends} return {${block}}`);
      const obj = parseObj() as any;
      
      if (obj && obj.tituloAula && obj.materia) {
        const pInfo: PodcastInfo = {
          aulaId: obj.tituloAula.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "-"),
          materia: obj.materia,
          materiaId: obj.materia.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "-"),
          moduloNumero: moduloCounter
        };
        podcasts.push(pInfo);
        moduloCounter++;
      }
    } catch (e: any) {
    }
  }
  return podcasts;
}

async function main() {
  console.log("🔍 Procurando arquivos para migrar do Supabase para o Firebase...");
  const tsxFiles = findTsxFiles(AULAS_DIR);
  
  let allPodcasts: PodcastInfo[] = [];
  
  for (const file of tsxFiles) {
    const podcastsInFile = extractPodcasts(file);
    allPodcasts = allPodcasts.concat(podcastsInFile);
  }
  
  console.log(`\nEncontrados ${allPodcasts.length} módulos no total.`);
  console.log("\n🚀 Iniciando Migração (Supabase -> Firebase)...");
  
  let migratedCount = 0;
  let skippedCount = 0;
  
  for (let i = 0; i < allPodcasts.length; i++) {
    const p = allPodcasts[i];
    
    const materiaFolder = p.materia
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '-');
      
    const storagePath = `podcasts/${materiaFolder}/${p.aulaId}/modulo-${p.moduloNumero}.wav`;
    const supabasePublicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${storagePath}`;

    // 1. Verificar se já existe no Firebase
    const firebaseUrl = await getPodcastFirebaseUrl(p.materia, p.aulaId, p.moduloNumero);
    if (firebaseUrl) {
      // Já está no Firebase, ignorar
      process.stdout.write("⏭️");
      skippedCount++;
      continue;
    }

    // 2. Verificar se existe no Supabase
    try {
      const supaCheck = await fetch(supabasePublicUrl, { method: 'HEAD' });
      if (supaCheck.ok) {
        // 3. Existe no Supabase, baixar e subir no Firebase
        process.stdout.write(" ⬇️ ");
        const audioData = await fetch(supabasePublicUrl);
        const arrayBuffer = await audioData.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const uploadRes = await uploadPodcastToFirebaseStorage(buffer, p.materia, p.aulaId, p.moduloNumero);
        if (uploadRes.success) {
          process.stdout.write("⬆️✅");
          migratedCount++;
        } else {
          process.stdout.write("❌");
        }
      } else {
        // Não existe em nenhum dos dois, ainda será gerado pelo outro script
        process.stdout.write(".");
      }
    } catch (e) {
      process.stdout.write("⚠️");
    }
  }
  
  console.log(`\n\n🏁 Migração Concluída!`);
  console.log(`- Arquivos migrados para o Firebase: ${migratedCount}`);
  console.log(`- Arquivos que já estavam no Firebase: ${skippedCount}`);
}

main().catch(console.error);
