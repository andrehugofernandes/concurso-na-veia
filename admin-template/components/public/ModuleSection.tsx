"use client";

import { FileText, BookOpen, Video, GraduationCap, ChevronDown, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FileItem {
  id: string;
  name: string;
  path: string;
  description?: string;
}

interface Subcategory {
  id: string;
  name: string;
  files: FileItem[];
}

interface ModuleSectionProps {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  reversed?: boolean;
  hasCategories?: boolean;
  hasVideoCarousel?: boolean;
  subcategories?: Subcategory[];
  textAlign?: 'left' | 'right';
}

interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  mimeType: string;
  createdAt: string;
}

export function ModuleSection({ 
  id, 
  title, 
  description, 
  color, 
  icon, 
  reversed = false, 
  hasCategories = false,
  hasVideoCarousel = false,
  subcategories = [],
  textAlign = 'left'
}: ModuleSectionProps) {
  const [openAccordions, setOpenAccordions] = useState<{[key: string]: boolean}>({});
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState<VideoItem | null>(null);
  const { toast } = useToast();
  
  // Estado para rastrear o arquivo em hover
  const [hoveredFile, setHoveredFile] = useState<{name: string, rect: DOMRect} | null>(null);

  // Handlers para mostrar/esconder o badge
  const handleFileHover = (fileName: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredFile({ name: fileName, rect });
  };

  const handleFileLeave = () => {
    setHoveredFile(null);
  };

  // Buscar vídeos do backend quando hasVideoCarousel for true
  useEffect(() => {
    if (hasVideoCarousel && id === 'imuneplay') {
      const fetchVideos = async () => {
        setLoadingVideos(true);
        try {
          const response = await fetch('/api/public/videos?category=imuneplay');
          const data = await response.json();
          setVideos(data.videos || []);
        } catch (error) {
          console.error('Erro ao carregar vídeos:', error);
        } finally {
          setLoadingVideos(false);
        }
      };
      fetchVideos();
    }
  }, [hasVideoCarousel, id]);

  // Handler para abrir vídeo e registrar visualização
  const handlePlayVideo = async (video: VideoItem) => {
    setOpenVideoModal(video);
    
    try {
      // Registrar visualização
      await fetch(`/api/files/${video.id}/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Visualização registrada:', video.title);
    } catch (error) {
      console.error('Erro ao registrar visualização:', error);
    }
  };

  const handleCloseVideo = () => {
    setOpenVideoModal(null);
  };

  const formatFileCount = (count: number) => {
    const padded = count.toString().padStart(2, '0');
    const label = count === 1 ? 'Arquivo' : 'Arquivos';
    return `${padded} ${label}`;
  };

  const bgColor = color === "orange" ? "bg-orange-50 dark:bg-orange-900/20" :
                  color === "blue" ? "bg-blue-50 dark:bg-blue-900/20" :
                  color === "green" ? "bg-green-50 dark:bg-green-900/20" :
                  color === "emerald" ? "bg-emerald-50 dark:bg-emerald-900/20" :
                  color === "teal" ? "bg-teal-50 dark:bg-teal-900/20" :
                  color === "yellow" ? "bg-yellow-50 dark:bg-yellow-900/20" :
                  "bg-gray-50 dark:bg-gray-900/20";

  const accentColor = color === "orange" ? "text-orange-600" :
                      color === "blue" ? "text-blue-600" :
                      color === "green" ? "text-green-600" :
                      color === "emerald" ? "text-emerald-600" :
                      color === "teal" ? "text-teal-600" :
                      color === "yellow" ? "text-yellow-600" :
                      "text-gray-600";

  const buttonColor = color === "orange" ? "bg-orange-500 hover:bg-orange-600" :
                      color === "blue" ? "bg-blue-600 hover:bg-blue-700" :
                      color === "green" ? "bg-green-600 hover:bg-green-700" :
                      color === "emerald" ? "bg-emerald-500 hover:bg-emerald-600" :
                      color === "teal" ? "bg-teal-500 hover:bg-teal-600" :
                      color === "yellow" ? "bg-yellow-600 hover:bg-yellow-700" :
                      "bg-gray-500 hover:bg-gray-600";

  const toggleAccordion = (categoryId: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleFileDownload = async (file: FileItem) => {
    try {
      toast({
        title: "Iniciando download",
        description: file.name,
      });
      
      // Abrir URL de download em nova janela (funciona com redirects do Firebase)
      window.open(`/api/public/files/${file.id}/download`, '_blank');

      // Aguardar um pouco antes de mostrar mensagem de sucesso
      setTimeout(() => {
        toast({
          title: "Download iniciado",
          description: file.name,
        });
      }, 500);
    } catch (error) {
      let errorMessage = "Erro desconhecido ao fazer download";
      
      if (error instanceof Error) {
        // Traduzir mensagens de erro comuns
        if (error.message === "Failed to fetch") {
          errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
        } else if (error.message.includes("não encontrado")) {
          errorMessage = "Arquivo não encontrado no servidor";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Erro no download",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  

  return (
      <section id={id} className={`py-20 ${bgColor}`}>
        {/* PORTAL - Badge flutuante renderizado fora da hierarquia */}
        {hoveredFile && (
          <div 
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: hoveredFile.rect.left + hoveredFile.rect.width / 2,
              top: hoveredFile.rect.top - 8,
              transform: 'translate(-50%, -100%)'
            }}
          >
            {/* Badge principal */}
            <div className="bg-gray-900 text-white px-3 pt-2 pb-1.5 rounded-lg text-sm font-medium shadow-xl whitespace-normal break-words max-w-xs capitalize animate-in fade-in-0 slide-in-from-bottom-1 duration-200">
              {hoveredFile.name.toLowerCase()}
            </div>
            
            {/* Seta apontando para baixo (tocando o botão) */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45"
              style={{ bottom: '-4px' }}
            ></div>
          </div>
        )}
        <div className="container mx-auto px-4">
          <div className={`grid lg:grid-cols-5 gap-8 items-start ${reversed ? 'lg:flex-row-reverse' : ''}`}>
            {/* Content - 40% width */}
            <div className={`lg:col-span-2 space-y-6 ${reversed ? 'lg:order-2' : ''} ${textAlign === 'right' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center space-x-4 ${textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg ${accentColor} bg-white dark:bg-gray-800`}>
                  {icon}
                </div>
                <h2 className={`text-3xl lg:text-4xl font-bold ${accentColor}`}>
                  {title}
                </h2>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {description}
              </p>
            </div>

            {/* Content Area - 60% width */}
            <div className={`lg:col-span-3 ${reversed ? 'lg:order-1' : ''}`}>
              {hasVideoCarousel ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Vídeos Educativos
                  </h3>
                  {loadingVideos ? (
                    <div className="grid grid-cols-2 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                          <Skeleton className="aspect-video rounded-lg" />
                          <Skeleton className="h-4 w-3/4 mx-auto" />
                        </div>
                      ))}
                    </div>
                  ) : videos.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                      Nenhum vídeo disponível no momento
                    </p>
                  ) : (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {videos.map((video) => (
                          <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/2">
                            <div className="p-2">
                              <div className="relative w-full bg-gray-900 rounded-lg aspect-video overflow-hidden group">
                                {/* Thumbnail */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={`/api/public/files/${video.id}/thumbnail`}
                                  alt={video.title}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-yellow-400', 'to-yellow-600');
                                  }}
                                />
                                
                                {/* Vídeo preview (hover) */}
                                <video
                                  src={video.videoUrl}
                                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  muted
                                  loop
                                  playsInline
                                  onMouseEnter={(e) => e.currentTarget.play()}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                    e.currentTarget.currentTime = 0;
                                  }}
                                />
                                
                                {/* Overlay escuro */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                                
                                {/* Botão play */}
                                <button
                                  onClick={() => handlePlayVideo(video)}
                                  className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer z-10"
                                  aria-label={`Assistir ${video.title}`}
                                >
                                  <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
                                    <Video className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                                  </div>
                                </button>
                              </div>
                              <p className="text-sm font-medium text-center mt-2 text-gray-700 dark:text-gray-300 truncate">
                                {video.title}
                              </p>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2 z-[5]" />
                      <CarouselNext className="right-2 z-[5]" />
                    </Carousel>
                  )}
                </div>
              ) : hasCategories ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg relative">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Categorias por Imunobiológico
                  </h3>
                  <div className="space-y-4">
                    {subcategories.map((category) => (
                      <Collapsible
                        key={category.id}
                        open={openAccordions[category.id]}
                        onOpenChange={() => toggleAccordion(category.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <button
                            className={`w-full ${buttonColor} text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-md shadow-sm flex items-center justify-between gap-3 relative z-[10]`}
                          >
                            <span className="flex w-full items-center justify-between gap-2">
                              <span className="truncate text-left">{category.name}</span>
                              <span className="rounded-full bg-white/25 px-2 py-0.5 text-xs font-semibold text-white whitespace-nowrap">
                                {formatFileCount(category.files.length)}
                              </span>
                            </span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                openAccordions[category.id] ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3">
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-6 py-4 pt-10 relative overflow-visible">
                            {category.files.length === 0 ? (
                              <p className="text-center text-gray-500 dark:text-gray-400 py-8 w-full">
                                Nenhum arquivo disponível nesta categoria
                              </p>
                            ) : (
                              (() => {
                                const fileCount = category.files.length;
                                const carouselOpts = fileCount <= 2 ? { align: "center" as const } : { align: "start" as const };
                                const carouselContentClass = `-ml-2 ${fileCount === 1 ? 'justify-center' : ''} ${fileCount === 2 ? 'justify-evenly' : ''}`.trim();
                                const carouselItemClass = `pl-2 ${fileCount <= 2 ? 'md:basis-[45%] lg:basis-[30%] xl:basis-[25%]' : 'md:basis-1/2 lg:basis-1/3'} ${fileCount === 1 ? 'max-w-[240px] mx-auto' : ''}`.trim();

                                return (
                              <Carousel className="w-full" opts={carouselOpts}>
                                <CarouselContent className={carouselContentClass}>
                                  {category.files.map((file) => (
                                    <CarouselItem key={file.id} className={carouselItemClass}>
                                      <div className="p-2">
                                        <button
                                          onClick={() => handleFileDownload(file)}
                                          onMouseEnter={(e) => handleFileHover(file.name, e)}
                                          onMouseLeave={handleFileLeave}
                                          className={`w-full ${buttonColor} text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md shadow-sm flex items-center space-x-2`}
                                        >
                                          <FileText className="h-4 w-4 flex-shrink-0" />
                                          <span className="truncate text-left flex-1">{file.name}</span>
                                          <Download className="h-3 w-3 flex-shrink-0 opacity-70" />
                                        </button>
                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious className="-left-16 z-[1] bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800" />
                                <CarouselNext className="-right-16 z-[1] bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800" />
                              </Carousel>
                                );
                              })()
                            )}
                          </div>
                        </CollapsibleContent>
                        </Collapsible>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Modal de Vídeo */}
        {openVideoModal && (
          <Dialog open={!!openVideoModal} onOpenChange={handleCloseVideo}>
            <DialogContent hideClose className="max-w-4xl p-0 overflow-hidden bg-white dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#151515] dark:to-[#101010] text-foreground">
              <div className="flex items-center justify-between w-full p-4 relative bg-[var(--primary)] text-white">
                <h3 className="text-lg font-semibold">
                  {openVideoModal.title}
                </h3>
                <button
                  onClick={handleCloseVideo}
                  className="text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[var(--primary)] rounded"
                  aria-label="Fechar vídeo"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  key={openVideoModal.id}
                >
                  <source src={openVideoModal.videoUrl} type={openVideoModal.mimeType || 'video/mp4'} />
                  <track kind="captions" label="Português" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </section>
  );
}

// Export dos ícones para uso externo
export { FileText, BookOpen, Video, GraduationCap };
