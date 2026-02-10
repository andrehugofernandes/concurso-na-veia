"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  size: string;
  mimeType: string;
  createdAt: string;
}

export function ImunePlaySection() {
  const [openVideo, setOpenVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Buscar vídeos do backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/public/videos?category=imuneplay');
        const data = await response.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, []);

  const handlePlayVideo = async (video: Video) => {
    console.log('[ImunePlay] Iniciando reprodução do vídeo:', video.title, 'ID:', video.id);
    setOpenVideo(video);
    
    try {
      // Registrar visualização
      console.log('[ImunePlay] Enviando requisição para registrar visualização...');
      const response = await fetch(`/api/files/${video.id}/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      console.log('[ImunePlay] Resposta do servidor:', response.status, data);
      
      if (response.ok) {
        console.log('[ImunePlay] ✓ Visualização registrada com sucesso para:', video.title);
      } else {
        console.error('[ImunePlay] ✗ Erro ao registrar visualização:', data);
      }
    } catch (error) {
      console.error('[ImunePlay] ✗ Erro de rede ao registrar visualização:', error);
    }
  };

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setOpenVideo(null);
  };

  return (
    <section
      id="imuneplay"
      className="py-16 md:py-24 transition-colors bg-gray-50 dark:bg-gray-900 duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Videos Left */}
          <div className="order-2 lg:order-1 space-y-4">
            {loading ? (
              // Skeleton loading
              Array.from({ length: 2 }).map((_, index) => (
                <Card key={index} className="transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <Skeleton className="w-16 h-12 rounded-lg" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                      <Skeleton className="w-10 h-10 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : videos.length === 0 ? (
              <Card className="transition-all duration-300">
                <CardContent className="p-6">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Nenhum vídeo disponível no momento
                  </p>
                </CardContent>
              </Card>
            ) : (
              videos.map((video) => (
                <Card
                  key={video.id}
                  className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="relative w-24 h-16 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0 group/thumb">
                          {/* Thumbnail */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={`/api/public/files/${video.id}/thumbnail`}
                            alt={video.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          
                          {/* Vídeo preview (hover) */}
                          <video
                            src={video.videoUrl}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300"
                            muted
                            loop
                            playsInline
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{video.title}</h4>
                          <p className="text-sm opacity-60">
                            {new Date(video.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <Button
                        className="bg-imune-light-green hover:bg-green-500 text-white flex-shrink-0"
                        onClick={() => handlePlayVideo(video)}
                        aria-label={`Assistir ${video.title}`}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          {/* Content Right */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-imune-light-green rounded-xl flex items-center justify-center">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-400 mt-1">
                  IMUNEPLAY
                </h2>
              </div>
            </div>
            <p className="text-lg leading-relaxed opacity-80 mt-4">
              Aqui serão encontrados vídeos curtos, objetivos e educativos, com
              orientações técnicas baseadas nas diretrizes do Ministério da
              Saúde. O objetivo é facilitar o aprendizado contínuo com conteúdos
              rápidos e acessíveis, que ajudam no aperfeiçoamento das práticas
              profissionais de forma dinâmica e moderna.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Vídeo */}
      <Dialog open={!!openVideo} onOpenChange={handleCloseVideo}>
        <DialogContent hideClose className="max-w-4xl p-0 overflow-hidden bg-white dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#151515] dark:to-[#101010] text-foreground">
          <div className="flex items-center justify-between w-full p-4 relative bg-[var(--primary)] text-white">
            <h3 className="text-lg font-semibold">
              {openVideo?.title}
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
            {openVideo && (
              <video
                ref={videoRef}
                className="w-full h-full"
                controls
                autoPlay
                key={openVideo.id}
              >
                <source src={openVideo.videoUrl} type={openVideo.mimeType || 'video/mp4'} />
                <track kind="captions" label="Português" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
