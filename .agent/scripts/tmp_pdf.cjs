const fs = require('fs');
const pdf = require('pdf-parse');

const extract = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    console.log(`--- EXTRACTED: ${filePath} ---\n`);
    console.log(data.text.substring(0, 500)); // Log first 500 chars to test
    console.log(`\n--- END EXTRACTED ---\n`);
  } catch (err) {
    console.error(`Error extracting ${filePath}:`, err);
  }
};

extract(process.argv[2]);
