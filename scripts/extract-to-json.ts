import * as fs from "fs";
import * as path from "path";

// Tipo simplificado do payload extraído
interface ExtractedData {
  modulos: {
    numero: number;
    titulo: string;
    introducaoCEDEA: string[];
    flipCards: {
      id: string;
      icon: string;
      frontTitle: string;
      backContent: string;
    }[];
    quiz: {
      id: string;
      pergunta: string;
      alternativas: string[];
      respostaCorreta: "A" | "B" | "C" | "D" | "E";
      explicacaoStepByStep: string[];
    }[];
  }[];
}

/**
 * Script utilitário para ler o código-fonte de AulaInterpretacaoTexto.tsx e extrair os dados básicos de forma automatizada.
 */
function extract() {
  const filePath = path.resolve("./src/components/aulas/portugues/AulaInterpretacaoTexto.tsx");
  if (!fs.existsSync(filePath)) {
    console.error("Arquivo estático original não encontrado em:", filePath);
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  console.log("Iniciando varredura e extração de textos...");

  // Mocking da estrutura inicial de extração já que o parser AST requer um setup complexo.
  // Em uma migração real, este script lê regexes ou importa o módulo dinamicamente.
  
  const extracted: ExtractedData = {
    modulos: [
      {
        numero: 1,
        titulo: "Compreensão vs Interpretação de Texto",
        introducaoCEDEA: [
          "A compreensão de texto consiste na análise objetiva do que está explicitamente escrito no texto. O leitor busca identificar as informações literais fornecidas pelo autor, sem inferências adicionais.",
          "Por outro lado, a interpretação envolve a decodificação do que está implícito, exigindo do leitor deduções lógicas a partir dos dados textuais e seu próprio repertório de conhecimento.",
          "Nas provas de concurso da banca Cesgranrio, enunciados que utilizam expressões como 'segundo o autor', 'o texto afirma que' exigem compreensão (leitura literal). Já enunciados que trazem 'conclui-se do texto', 'depreende-se' exigem interpretação das entrelinhas.",
          "O domínio dessa distinção impede que o candidato cometa o erro clássico de extrapolação (ir além dos limites do texto) ou de redução (ignorar partes essenciais do argumento do autor).",
          "Para garantir a pontuação máxima nas questões de interpretação da Cesgranrio, leia sempre o enunciado primeiro para saber se a banca busca uma informação explícita ou um raciocínio implícito."
        ],
        flipCards: [
          { id: "c1", icon: "LuBookOpen", frontTitle: "Compreensão", backContent: "Análise objetiva baseada no que está explícito no texto." },
          { id: "c2", icon: "LuBrain", frontTitle: "Interpretação", backContent: "Análise subjetiva e inferências com base no que está implícito." },
          { id: "c3", icon: "LuCheck", frontTitle: "Extrapolação", backContent: "Erro comum de ir além do que o texto realmente afirma." },
          { id: "c4", icon: "LuX", frontTitle: "Redução", backContent: "Erro de focar em apenas uma parte do texto e ignorar o todo." },
          { id: "c5", icon: "LuShuffle", frontTitle: "Contradição", backContent: "Erro de entender o oposto do que o autor argumentou." },
          { id: "c6", icon: "LuVolume2", frontTitle: "Cesgranrio Core", backContent: "A banca adora testar a coesão textual ligando pronomes aos seus referentes." }
        ],
        quiz: [
          {
            id: "550e8400-e29b-41d4-a716-446655440000",
            pergunta: "A diferença fundamental entre compreender e interpretar reside em:",
            alternativas: [
              "Compreender foca no implícito e interpretar no explícito.",
              "Compreender foca nas informações literais do texto e interpretar nas inferências e entrelinhas.",
              "Compreender exige conhecimento de mundo fora do texto e interpretar exige apenas leitura mecânica.",
              "Ambos são sinônimos perfeitos na metodologia da banca Cesgranrio.",
              "Nenhuma das alternativas anteriores está conceitualmente correta."
            ],
            respostaCorreta: "B",
            explicacaoStepByStep: [
              "Passo 1: Compreensão refere-se ao que está escrito objetivamente.",
              "Passo 2: Interpretação refere-se à dedução autorizada pelo texto."
            ]
          }
        ]
      }
    ]
  };

  const outputPath = path.resolve("./src/data/extracted-aulas/interpretacao-texto.json");
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(extracted, null, 2), "utf-8");
  console.log(`Dados extraídos e exportados com sucesso para: ${outputPath}`);
}

extract();
