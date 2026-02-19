import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Presentation, BookOpen, Award, Download, FileText, } from "lucide-react";

export function CapacitaSection() {
  const materials = [
    {
      title: "COVID-19 (PFIZER)",
      description: "COVID-19 (PFIZER)",
      icon: Presentation,
      pdfUrl: "/pdf/capacita-mais/covid19-pfizer.pdf"
    },
    {
      title: "RESGATE DOS NÃO VACINADOS COM A VACINA HPV",
      description: "RESGATE DOS NÃO VACINADOS COM A VACINA HPV",
      icon: BookOpen,
      pdfUrl: "/pdf/capacita-mais/resgate-dos-nao-vacinados-vacina-hpv.pdf"
    },
    {
      title: "TREINAMENTO INFLUENZA 2025",
      description: "TREINAMENTO INFLUENZA 2025",
      icon: Award,
      pdfUrl: "/pdf/capacita-mais/treinamento-influenza-2025.pdf"
    },
    {
      title: "GUIA RÁPIDO - CADERNETA DE VACINAÇÃO",
      description: "GUIA RÁPIDO - CADERNETA DE VACINAÇÃO",
      icon: FileText,
      pdfUrl: "/pdf/capacita-mais/GUIA_RAPIDO_CADERNETA_VACINAL.pdf"
    },
  ];

  return (
    <section id="capacita" className="py-16 md:py-24 transition-colors  bg-gray-50 dark:bg-gray-900 duration-300">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Materials Left */}
          <div className="order-2 lg:order-1 space-y-4">
            {materials.map((material, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <material.icon className="h-5 w-5 text-blue-600" />
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
                        className="bg-imune-blue hover:bg-blue-700 text-white"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Right */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-start space-x-3">
              <div className="w-14 h-14 bg-imune-blue rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mt-1">
                  CAPACITA+
                </h2>
              </div>
            </div>
            <p className="text-lg leading-relaxed opacity-80 mt-4">
              Neste espaço o profissional acessa todo o material complementar dos treinamentos e capacitações promovidos pela coordenação de imunização. São apresentações, apostilas e arquivos utilizados durante os encontros formativos, disponíveis para consulta e reforço do conteúdo aprendido. Uma forma prática de revisar e manter-se sempre atualizado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}