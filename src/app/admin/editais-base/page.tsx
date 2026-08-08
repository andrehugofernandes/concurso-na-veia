import React from "react";
import { Download, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acervo de Editais Base | Admin",
};

const EDITAIS = [
  {
    id: "bb",
    nome: "Banco do Brasil (Escriturário)",
    banca: "Cesgranrio",
    ano: "2022/2023",
    link: "https://www.cesgranrio.org.br/pdf/banco_do_brasil0122/Edital_01_2022_BB.pdf",
  },
  {
    id: "caixa",
    nome: "Caixa Econômica (TBN)",
    banca: "Cesgranrio",
    ano: "2024",
    link: "https://www.cesgranrio.org.br/pdf/caixa0124/Edital_01_2024_CAIXA.pdf",
  },
  {
    id: "correios",
    nome: "Correios (Agente/Analista)",
    banca: "IBFC",
    ano: "2024",
    link: "https://fc.ibfc.org.br/arquivos/Edital_N_01_2024.pdf",
  },
  {
    id: "inss",
    nome: "INSS (Técnico)",
    banca: "Cebraspe",
    ano: "2022",
    link: "https://cdn.cebraspe.org.br/concursos/INSS_22/arquivos/ED_1_INSS_2022_ABERTURA.PDF",
  },
  {
    id: "ibge",
    nome: "IBGE (Diversos) - CNU",
    banca: "Cesgranrio",
    ano: "2024",
    link: "https://www.gov.br/gestao/pt-br/concursonacional/editais/edital-bloco-8.pdf",
  },
  {
    id: "ata",
    nome: "ATA-MF (Assistente)",
    banca: "ESAF",
    ano: "2014",
    link: "https://pesquisa.in.gov.br/imprensa/jsp/visualiza/index.jsp?jornal=3&pagina=81&data=07/02/2014",
  },
  {
    id: "prf",
    nome: "PRF (Policial)",
    banca: "Cebraspe",
    ano: "2021",
    link: "https://cdn.cebraspe.org.br/concursos/prf_21/arquivos/ED_1_PRF_2021_ABERTURA_CERTIFICADO.PDF",
  },
  {
    id: "pf-adm",
    nome: "Polícia Federal (Agente Adm)",
    banca: "Cebraspe",
    ano: "2013/2014",
    link: "https://cdn.cebraspe.org.br/concursos/dpf_13_administrativo/arquivos/ED_1_2013_DPF_ADM_ABERTURA.PDF",
  },
  {
    id: "tjsp",
    nome: "TJ-SP (Escrevente)",
    banca: "Vunesp",
    ano: "2024",
    link: "https://documento.vunesp.com.br/documento/stream/MzU0ODUwNQ%3d%3d",
  },
  {
    id: "tre",
    nome: "TRE Unificado (Técnico/Analista)",
    banca: "Cebraspe",
    ano: "2024",
    link: "https://cdn.cebraspe.org.br/concursos/TSE_24/arquivos/ED_1_TSE_TRE_2024_ABERTURA.PDF",
  },
];

export default function EditaisBasePage() {
  return (
    <div className="p-8 pb-32 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Acervo de Editais Base
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Links oficiais dos últimos editais dos concursos que estão em fase <strong>Pré-Edital</strong> na vitrine.
            Utilize estes arquivos para extração dinâmica com IA no Wizard.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/cursos/novo"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition px-5 py-2.5 rounded-xl font-bold shadow-md flex items-center gap-2 text-sm"
          >
            Ir para o Wizard
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 p-4 rounded-2xl text-sm font-medium flex items-start gap-3">
        <div className="bg-amber-500/20 p-2 rounded-lg shrink-0 mt-0.5">
          <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <p>
          <strong>Dica de Uso:</strong> Baixe o arquivo PDF diretamente do link oficial clicando na linha correspondente e, em seguida,
          faça o upload no Mapeamento por IA dentro do Wizard para gerar automaticamente a ementa de aulas.
        </p>
      </div>

      {/* Tabela de Editais */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              <tr>
                <th className="py-4 px-6">Concurso</th>
                <th className="py-4 px-4 text-center">Banca</th>
                <th className="py-4 px-4 text-center">Ano Base</th>
                <th className="py-4 px-6 text-right">Arquivo (PDF)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-medium">
              {EDITAIS.map((edital) => (
                <tr key={edital.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-extrabold text-foreground text-base leading-snug">
                      {edital.nome}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-muted border border-border text-foreground">
                      {edital.banca}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-xs font-bold text-muted-foreground">
                      {edital.ano}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a
                      href={edital.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-end gap-2 text-primary hover:text-primary/80 font-bold transition-colors"
                    >
                      <span>Acessar PDF</span>
                      <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Download className="w-4 h-4" />
                      </div>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
