import fs from 'fs';
import PDFParser from 'pdf2json';

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("./.agent/scripts/matematica_extracted.txt", pdfParser.getRawTextContent());
    console.log("Sucesso! Extraído para .agent/scripts/matematica_extracted.txt");
});

pdfParser.loadPDF("./source/conteudo/Matematica.pdf");
