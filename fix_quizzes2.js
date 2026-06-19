const fs = require('fs');
const path = 'src/components/aulas/portugues/data/crase-quizzes.ts';
let buf = fs.readFileSync(path);
// Detect encoding
let encoding = 'utf8';
if (buf[0] === 0xff && buf[1] === 0xfe) encoding = 'utf16le';
let content = buf.toString(encoding);

const regex = /(opcoes:\s*\[)([\s\S]*?)(\])/g;
let modifiedCount = 0;

let newContent = content.replace(regex, (match, start, optionsStr, end) => {
  // count how many { label: ... } exist
  const labels = optionsStr.match(/label:/g) || [];
  if (labels.length === 5) {
    return match; // Already 5
  }
  if (labels.length === 4) {
    // Add 5th option
    modifiedCount++;
    // Find the last "}," and append the new one
    let newOptionsStr = optionsStr.replace(/\}\s*$/, '},\n      { label: "E", valor: "Nenhuma das alternativas anteriores" }\n    ');
    return start + newOptionsStr + end;
  }
  return match;
});

if (modifiedCount > 0) {
  fs.writeFileSync(path, newContent, encoding);
}
console.log('Modified', modifiedCount, 'quizzes');
