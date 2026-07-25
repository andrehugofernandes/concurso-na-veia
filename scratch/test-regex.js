const text = "No exames de admissão, nos testes n.o 1 e nº 2. O nome da nova notícia é n.º 3.";
let res = text
    .replace(/\b[nN]\.[ºoO]\b\s*/g, "número ")
    .replace(/\b[nN]º\s*/g, "número ")
    .replace(/\b[nN]\.º\s*/g, "número ");

console.log(res);
