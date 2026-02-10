"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Folder, ChevronRight, ChevronDown } from "lucide-react";

export function BibliotecaSection() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const categories = [
    {
      title: "COVID-19",
      documents: "5 documentos disponíveis",
      pdfs: [
        {
          name: "ADM PFIZER",
          url: "/pdf/biblioteca-imune-mais/covid19/adm-pfizer.pdf",
        },
        {
          name: "ESTRATÉGIA DE VACINAÇÃO COVID-19",
          url: "/pdf/biblioteca-imune-mais/covid19/estrategia-de-vacinacao.pdf",
        },
        {
          name: "PFIZER 12 ANOS",
          url: "/pdf/biblioteca-imune-mais/covid19/pfizer-12anos.pdf",
        },
        {
          name: "INFORMAÇÕES SOBRE DOSAGEM",
          url: "/pdf/biblioteca-imune-mais/covid19/Informacoes_sobre_dosagem__diluicao_e_armazenamento___COVID.pdf",
        },
        {
          name: "INCLUSÃO DA APRESENTAÇÃO DA VACINA COVID-19",
          url: "/pdf/biblioteca-imune-mais/covid19/OFICIO_INCLUSAO_DA_COVID.pdf",
        },
        {
          name: "VACINA PFIZER BABY",
          url: "/pdf/biblioteca-imune-mais/covid19/PFIZER_TAMPA_AMARELA.jpeg",
        },
      ],
    },
    {
      title: "DENGUE",
      documents: "1 documentos disponíveis",
      pdfs: [
        {
          name: "ATUALIZAÇÃO DENGUE",
          url: "/pdf/biblioteca-imune-mais/dengue/atualizacao-dengue.pdf",
        },
      ],
    },
    // {
    //   title: "ESAVI",
    //   documents: "3 documentos disponíveis",
    //   pdfs: [
    //     { name: "CONTACTANTES", url: "/pdf/biblioteca-imune-mais/esavi/contactantes.pdf" },
    //     { name: "FICHA DE NOTIFICAÇÃO ESAVI", url: "/pdf/biblioteca-imune-mais/esavi/ficha-de-notificacao-esavi.pdf" },
    //     { name: "MANUAL ESAVI", url: "/pdf/biblioteca-imune-mais/esavi/manual-esavi.pdf" },
    //   ],
    // },
    {
      title: "HPV",
      documents: "3 documentos disponíveis",
      pdfs: [
        {
          name: "RECOMENDAÇÕES PARA O RESGATE DOS NÃO VACINADOS COM A VACINA HPV",
          url: "/pdf/biblioteca-imune-mais/hpv/recomendacao-para-resgate-de-nao-vacinados.pdf",
        },
        {
          name: "NOTA TÉCNICA Nº 162025",
          url: "/pdf/biblioteca-imune-mais/hpv/NOTA-TECNICA-162025-DPNISVSAMS.pdf",
        },
        {
          name: "NOTA TÉCNICA CONJUNTA Nº 1012024",
          url: "/pdf/biblioteca-imune-mais/hpv/NOTA-TECNICA-CONJUNTA-1012024.pdf",
        },
      ],
    },
    {
      title: "HEPATITE A",
      documents: "1 documentos disponíveis",
      pdfs: [
        {
          name: "NOTA TÉCNICA CONJUNTA Nº 1842025",
          url: "/pdf/biblioteca-imune-mais/hepatite-a/nota-tecnica-conjunta-no-184-2025-dpni-dathi-svsa-ms.pdf",
        },
      ],
    },
    {
      title: "MENINGOCÓCICA ACWY",
      documents: "1 documentos disponíveis",
      pdfs: [
        {
          name: "NOTA TÉCNICA CONJUNTA Nº 1842025",
          url: "/pdf/biblioteca-imune-mais/meningococica-acwy/NOTA-ATUALIZACAO-ACWY.pdf",
        },
      ],
    },
    {
      title: "INFLUENZA",
      documents: "2 documentos disponíveis",
      pdfs: [
        {
          name: "ESTRATÉGIA DE VACINAÇÃO CONTRA INFLUENZA NAS REGIÕES",
          url: "/pdf/biblioteca-imune-mais/influenza/estrategia-de-vacinacao-contra-influenza.pdf",
        },
        {
          name: "INFLUENZA 2025",
          url: "/pdf/biblioteca-imune-mais/influenza/OFICIO_INFLUENZA___ATUALIZACAO_AGOSTO.pdf",
        },
      ],
    },
    {
      title: "INTRODUÇÃO NORMATIVA, MANUAIS E INFORMES",
      documents: "12 documentos disponíveis",
      pdfs: [
        {
          name: "INSTRUÇÃO NORMATIVA DO CALENDÁRIO NACIONAL DE VACINAÇÃO 2025",
          url: "/pdf/biblioteca-imune-mais/manuais/instrucao-normativa-que-instrui-o-calendario-nacional-de-vacinacao-2025.pdf",
        },
        {
          name: "MANUAL DE NORMAS E PROCEDIMENTOS PARA VACINAÇÃO",
          url: "/pdf/biblioteca-imune-mais/manuais/manual-de-normas-e-procedimentos-para-vacinacao.pdf",
        },
        {
          name: "MANUAL DE EVENTOS ADVERSOS PÓS VACINAÇÃO",
          url: "/pdf/biblioteca-imune-mais/manuais/manual_eventos-_adversos_pos_vacinacao_4ed_atualizada.pdf",
        },
        {
          name: "VIGILÂNCIA DOS EVENTOS ADVERSOS PÓS VACINAÇÃO: CARTILHA PARA TRABALHADORES DE SALA DE VACINAÇÃO - PARTE 1",
          url: "pdf/biblioteca-imune-mais/manuais/cartilha_eadv_nivel_medio1.pdf",
        },
        {
          name: "VIGILÂNCIA DOS EVENTOS ADVERSOS PÓS VACINAÇÃO: CARTILHA PARA TRABALHADORES DE SALA DE VACINAÇÃO - PARTE 2",
          url: "pdf/biblioteca-imune-mais/manuais/cartilha_eadv_nivel_medio2.pdf",
        },
        {
          name: "MANUAL DOS CENTROS DE REFERÊNCIA PARA IMUNOBIOLÓGICOS ESPECIAIS ",
          url: "/pdf/biblioteca-imune-mais/manuais/manual_centros_referencia_imunobiologicos_6ed.pdf",
        },
        {
          name: "NORMAS TÉCNICAS DE PROFILAXIA DA RAIVA HUMANA",
          url: "/pdf/biblioteca-imune-mais/manuais/Normas-Tecnicas-da-Profilaxia-da-Raiva-Humana.pdf",
        },
        {
          name: "QUADRO - PROFILAXIA DA RAIVA HUMANA",
          url: "/pdf/biblioteca-imune-mais/manuais/cartaz-raiva-quadro-13-07-22-final.pdf",
        },
        {
          name: "FLUXOGRAMA - PROFILAXIA DA RAIVA HUMANA",
          url: "/pdf/biblioteca-imune-mais/manuais/cartaz raiva-13-07-22-final.pdf",
        },
        {
          name: "MANUAL REDE DE FRIO",
          url: "/pdf/biblioteca-imune-mais/manuais/manual_rede_frio4ed.pdf",
        },
        { name: "", url: "/pdf/biblioteca-imune-mais/manuais/" },
        {
          name: "NORMAS E PROCEDIMENTOS PARA VACINAÇÃO",
          url: "/pdf/biblioteca-imune-mais/manuais/normas-e-procedimenos-para-vacinacao.pdf",
        },
        {
          name: "POP IMUNIZAÇÃO 2025",
          url: "/pdf/biblioteca-imune-mais/manuais/pop-imunizacao-2025.pdf",
        },
      ],
    },
    {
      title: "VIP",
      documents: "1 documentos disponíveis",
      pdfs: [
        {
          name: "INFORME SOBRE VIP",
          url: "/pdf/biblioteca-imune-mais/vip/informe-sobre-vip.pdf",
        },
      ],
    },
    {
      title: "CALENDÁRIOS DE VACINAÇÃO",
      documents: "5 documentos disponíveis",
      pdfs: [
        {
          name: "CALENDÁRIO TÉCNICO DE VACINAÇÃO GESTANTE",
          url: "/pdf/biblioteca-imune-mais/calendario-vacina/Calendario-Tecnico-de-Vacinação-Gestante.pdf",
        },
        {
          name: "CALENDÁRIO TÉCNICO DE VACINAÇÃO CRIANÇA",
          url: "/pdf/biblioteca-imune-mais/calendario-vacina/Calendario-Tecnico-de-Vacinação-Criança.pdf",
        },
        {
          name: "CALENDÁRIO TÉCNICO DE VACINAÇÃO ADOLESCENTE E JOVEM",
          url: "/pdf/biblioteca-imune-mais/calendario-vacina/Calendario-Tecnico-de-Vacinação-Adolescentes-e-jovens.pdf",
        },
        {
          name: "CALENDÁRIO TÉCNICO DE VACINAÇÃO ADULTO",
          url: "/pdf/biblioteca-imune-mais/calendario-vacina/Calendario-Tecnico-de-Vacinação-Adulto.pdf",
        },
        {
          name: "CALENDÁRIO TÉCNICO DE VACINAÇÃO IDOSO",
          url: "/pdf/biblioteca-imune-mais/calendario-vacina/Calendario-Tecnico-de-Vacinação-Idoso.pdf",
        },
      ],
    },
  ];

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  return (
    <section
      id="biblioteca"
      className="py-16 md:py-24 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content Left */}
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-imune-green rounded-xl flex items-center justify-center">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-600 mt-1">
                  BIBLIOTECA IMUNE+
                </h2>
              </div>
            </div>
            <p className="text-lg leading-relaxed opacity-80 mt-4">
              Notas técnicas por Imunobiológicos: Um acervo digital com
              documentos técnicos organizados por imunobiológico. Neste espaço o
              profissional encontra notas técnicas, atualizações do Ministério
              da Saúde, manuais, informes e demais referências oficiais sobre
              vacinas e imunização. Tudo centralizado e fácil de acessar para
              apoiar as decisões e práticas na sala de vacina.
            </p>
          </div>

          {/* Categories Right */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">
              Categorias por Imunobiológico
            </h3>

            {categories.map((category, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <Folder className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{category.title}</h4>
                        <p className="text-sm opacity-60">
                          {category.documents}
                        </p>
                      </div>
                    </div>
                    <Button
                      className="bg-imune-green hover:bg-green-700 text-white"
                      onClick={() => toggleCategory(index)}
                    >
                      {expandedCategory === index ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {expandedCategory === index && (
                    <div className="mt-4 space-y-2">
                      {category.pdfs.map((pdf, pdfIndex) => (
                        <a
                          key={pdfIndex}
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {pdf.name}
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
