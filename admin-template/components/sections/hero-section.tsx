"use client"

import { Button } from "@/components/ui/button"
import { FileText, GraduationCap, Book, Play } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Left */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  IMUNE+ JABOATÃO
                </span>
              </h1>
              <p className="text-xl md:text-2xl opacity-80">
                Sistema integrado de recursos para profissionais de imunização de Jaboatão dos Guararapes
              </p>
            </div>

            {/* CTA Buttons Grid 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => scrollToSection('biblioteca')}
                className="group bg-imune-green hover:bg-green-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-auto"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Book className="h-5 w-5" />
                  <span>BIBLIOTECA IMUNE+</span>
                </div>
              </Button>

              <Button
                onClick={() => scrollToSection('impressos')}
                className="group bg-imune-orange hover:bg-orange-600 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-auto"
              >
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>IMPRESSOS IMUNE+</span>
                </div>
              </Button>

              <Button
                onClick={() => scrollToSection('capacita')}
                className="group bg-imune-blue hover:bg-blue-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-auto"
              >
                <div className="flex items-center justify-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>CAPACITA+</span>
                </div>
              </Button>

              

              <Button
                onClick={() => scrollToSection('imuneplay')}
                className="group bg-imune-light-green hover:bg-green-500 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-auto"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>IMUNEPLAY</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Video Placeholder Right */}
          <div className="lg:flex justify-center">
            <div className="relative bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-2xl max-w-md w-full aspect-video transition-colors duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white dark:bg-gray-800 p-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => console.log('Video play functionality would be implemented here')}
                >
                  <Play className="h-8 w-8 text-orange-500 ml-1" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-center text-sm opacity-70">
                  Vídeo de apresentação do IMUNE+
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}