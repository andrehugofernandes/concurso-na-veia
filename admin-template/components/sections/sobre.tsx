import Image from "next/image";

export function Sobre() {
  return (
    <section className="py-16 md:py-28 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center text-center">
          
          {/* Cabeçalho */}
          <div >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Image
                src="/images/zegotinha.png"
                alt="IMUNE+ Icon"
                width={80}
                height={100}
                className="w-auto h-auto rounded-xl"
              />
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  OLÁ, IMUNE AMIGO
                </h2>
                <h3 className="text-2xl dark:text-gray-300 font-medium">
                  FICO FELIZ COM SUA PRESENÇA AQUI
                </h3>
              </div>
            </div>
          </div>
          
          {/* Corpo do texto */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-700 w-full">
            <p className="text-lg text-gray-300 leading-relaxed text-justify mb-6">
              A Coordenação do Programa Municipal de Imunização por meio da Secretaria Municipal de Saúde de Jaboatão dos Guararapes idealizou o IMUNE+JABOATÃO para que seus apoiadores, colaboradores e profissionais da rede de saúde, como técnicos de enfermagem, enfermeiros, médicos, agentes comunitários de saúde (ACS) e dentistas tenham acesso rápido e objetivo aos nossos materiais e aos materiais ofertados pelo Ministério da Saúde no tocante ao que se refere à Imunização.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}