
const CONTEUDO_MATERIAS = [
  { id: 'portugues', nome: 'Língua Portuguesa', topicos: [{ titulo: 'Crase' }] },
  { id: 'matematica', nome: 'Matemática', topicos: [{ titulo: 'Probabilidade' }] }
];

function testarDistribuicaoMaratona(nivel) {
  let distribuicao = [];
  if (nivel === "superior") {
    distribuicao = [
      { materia: "Língua Portuguesa", qtd: 20 },
      { materia: "Matemática", qtd: 15 },
      { materia: "Língua Inglesa", qtd: 15 },
      { materia: "Conhecimentos Específicos", qtd: 50 },
    ];
  } else {
    distribuicao = [
      { materia: "Língua Portuguesa", qtd: 20 },
      { materia: "Matemática", qtd: 20 },
      { materia: "Conhecimentos Específicos", qtd: 60 },
    ];
  }

  const total = distribuicao.reduce((acc, curr) => acc + curr.qtd, 0);
  console.log(`\n--- Teste Maratona (${nivel}) ---`);
  console.log(`Total de questões: ${total}`);
  distribuicao.forEach(m => console.log(`${m.materia}: ${m.qtd} questões`));
  
  const totalLotes = total / 5;
  const tempoEstimadoSegundos = totalLotes * 26;
  console.log(`Total de lotes (batch size 5): ${totalLotes}`);
  console.log(`Tempo total estimado para geração: ${tempoEstimadoSegundos / 60} minutos`);
}

testarDistribuicaoMaratona("medio");
testarDistribuicaoMaratona("superior");
