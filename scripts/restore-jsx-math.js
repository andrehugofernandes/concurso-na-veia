const fs = require("fs");
const path = require("path");

const aulasDir = path.join(__dirname, "../src/components/aulas/matematica");

function unEscapeMathAula(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  // Reverte {"{"} e {"}"} para { e } apenas se estiverem isolados ou em comentários corrompidos
  const unEscapeRegex1 = /\{"\{"\}/g;
  const unEscapeRegex2 = /\{"\}\"\}/g; // Padrão corrompido que vi no view_file

  if (unEscapeRegex1.test(content)) {
    content = content.replace(unEscapeRegex1, "{");
    modified = true;
  }
  
  if (unEscapeRegex2.test(content)) {
    content = content.replace(unEscapeRegex2, "}");
    modified = true;
  }

  // Tratando o caso específico do final do arquivo ou comentários
  content = content.replace(/\)\{"\}"\}/g, ")}");
  content = content.replace(/\{"\{"\}\/\*/g, "{/*");
  content = content.replace(/\*\/\s* \{"\}"\}/g, "*/}");

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
  }
}

const files = fs.readdirSync(aulasDir).filter(f => f.endsWith(".tsx"));
files.forEach(file => unEscapeMathAula(path.join(aulasDir, file)));

console.log("🏁 Restauração de JSX concluída.");
