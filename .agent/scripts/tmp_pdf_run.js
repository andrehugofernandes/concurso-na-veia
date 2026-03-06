const fs = require('fs');
const pdf = require('pdf-parse');

async function run() {
  try {
    const files = fs.readdirSync('source/conteudo');
    const targetFile = files.find(f => f.includes('Matem'));
    if (!targetFile) throw new Error('File not found');
    
    const path = 'source/conteudo/' + targetFile;
    console.log('Reading:', path);
    const dataBuffer = fs.readFileSync(path);
    
    // Some versions of pdf-parse export a default function, others an object
    const parser = typeof pdf === 'function' ? pdf : pdf.default;
    
    const data = await parser(dataBuffer);
    fs.writeFileSync('.agent/scripts/matematica_edital.txt', data.text);
    console.log('Success! Extracted ' + data.text.length + ' chars.');
  } catch (e) {
    console.error(e);
  }
}

run();
