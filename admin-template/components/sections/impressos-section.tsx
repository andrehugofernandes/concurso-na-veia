import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, File, ClipboardList, Download } from "lucide-react";

export function ImpressosSection() {
  const materials = [
    {
      title: "CADERNETA DE VACINAÇÃO MENINA",
      description: "CADERNETA DA CRIANÇA VERSÃO MENINA",
      icon: FileText,
      pdfUrl: "/pdf/impressos-imune-mais/caderneta_crianca_menina_passaporte_cidadania_7ed.pdf"
    },
    {
      title: "CADERNETA DE VACINAÇÃO MENINO",
      description: "CADERNETA DA CRIANÇA VERSÃO MENINO",
      icon: File,
      pdfUrl: "/pdf/impressos-imune-mais/caderneta_crianca_menino_passaporte_cidadania_7ed.pdf"
    },
    {
      title: "CADERNETA DIGITAL DA CRIANÇA",
      description: "CADERNETA DA CRIANÇA VERSÃO MENINO",
      icon: File,
      pdfUrl: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca/caderneta-digital-da-crianca"
    },
    // {
    //   title: "FICHA DE NOTIFICAÇÃO ESAVI",
    //   description: "FICHA DE NOTIFICAÇÃO ESAVI",
    //   icon: ClipboardList,
    //   pdfUrl: "/pdf/impressos-imune-mais/ficha-notificacao-esavi.pdf"
    // },
    {
      title: "FICHA DE PREENCHIMENTO PARA CONTACTANTES",
      description: "FICHA DE PREENCHIMENTO PARA CONTACTANTES",
      icon: ClipboardList,
      pdfUrl: "/pdf/impressos-imune-mais/ficha-de-preenchimento-para-contactantes.pdf"
    },
    {
      title: "FORMULÁRIO DE IMUNOBIOLÓGICOS SOB SUSPEITA",
      description: "FORMULÁRIO DE IMUNOBIOLÓGICOS SOB SUSPEITA",
      icon: ClipboardList,
      pdfUrl: "/pdf/impressos-imune-mais/formulario-imunobiologicos-sob-suspeitas.pdf"
    },
    {
      title: "MAPA DE TEMPERATURA 2025",
      description: "MAPA DE TEMPERATURA 2025",
      icon: ClipboardList,
      pdfUrl: "/pdf/impressos-imune-mais/MAPA-DE-TEMPERATURA-2025.pdf"
    },
    {
      title: "REQUERIMENTO PESSOAL",
      description: "REQUERIMENTO PESSOAL",
      icon: ClipboardList,
      pdfUrl: "/pdf/impressos-imune-mais/REQUERIMENTOPESSOAL-MODELO.pdf"
    },
    // {
    //   title: "Formulário Imuno sob suspeita - Modelo",
    //   description: "Formulário Imuno sob suspeita - Modelo",
    //   icon: ClipboardList,
    //   pdfUrl: "/pdf/impressos-imune-mais/formulario-imuno-sob-suspeitas.pdf"
    // },
  ];

  return (
    <section id="impressos" className="py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content Left */}
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="w-14 h-14 bg-imune-orange rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mt-1">
                  IMPRESSOS IMUNE+
                </h2>
              </div>
            </div>
            <p className="text-lg leading-relaxed opacity-80">
              Neste espaço, o profissional de saúde encontrará materiais prontos para impressão, que podem ser utilizados no dia a dia da unidade. Aqui estarão disponíveis modelos de cartão de vacina, fichas, formulários e outros documentos importantes para atender demandas imediatas, facilitando a rotina de trabalho e garantindo a continuidade dos serviços mesmo diante de imprevistos.
            </p>
          </div>

          {/* Materials Right */}
          <div className="space-y-4">
            {materials.map((material, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                        <material.icon className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{material.title}</h4>
                        <p className="text-sm opacity-60">{material.description}</p>
                      </div>
                    </div>
                    <a
                      href={material.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Baixar ${material.title}`}
                    >
                      <Button
                        className="bg-imune-orange hover:bg-orange-600 text-white"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}