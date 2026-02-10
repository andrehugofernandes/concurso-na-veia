"use client";

import { useEffect, useState } from "react";
import { ModuleSection } from "@/components/public/ModuleSection";
import { FileText, BookOpen, Video, GraduationCap } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  path: string;
  categoryId: string;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  sortOrder: number;
}

interface Subcategory {
  id: string;
  name: string;
  files: FileItem[];
}

export function ModulesSections() {
  const [loading, setLoading] = useState(true);
  const [impressosData, setImpressosData] = useState<Subcategory[]>([]);
  const [capacitaData, setCapacitaData] = useState<Subcategory[]>([]);
  const [bibliotecaData, setBibliotecaData] = useState<Subcategory[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Buscar todas as categorias (endpoint público)
      const categoriesRes = await fetch("/api/public/categories", { cache: "no-store" });
      if (!categoriesRes.ok) {
        throw new Error(`Erro ao buscar categorias: ${categoriesRes.status}`);
      }
      const categories = await categoriesRes.json() as Category[];
      
      // Buscar todos os arquivos (endpoint público)
      const filesRes = await fetch("/api/public/files?limit=1000", { cache: "no-store" });
      if (!filesRes.ok) {
        throw new Error(`Erro ao buscar arquivos: ${filesRes.status}`);
      }
      const filesResponse = await filesRes.json() as { items: FileItem[] };
      const allFiles = filesResponse.items;

      // Organizar arquivos por categoria
      const filesByCategory = allFiles.reduce((acc, file) => {
        if (!acc[file.categoryId]) {
          acc[file.categoryId] = [];
        }
        acc[file.categoryId].push(file);
        return acc;
      }, {} as Record<string, FileItem[]>);

      // Função para encontrar categoria pai por nome (case-insensitive e flexível)
      const findParentCategory = (searchName: string) => {
        return categories.find(cat => 
          !cat.parentId && 
          cat.name.toLowerCase().includes(searchName.toLowerCase())
        );
      };

      // Função para buscar subcategorias de uma categoria pai (ordenadas por sortOrder)
      const getSubcategories = (parentId: string): Subcategory[] => {
        return categories
          .filter(cat => cat.parentId === parentId)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(cat => ({
            id: cat.id,
            name: cat.name,
            files: filesByCategory[cat.id] || []
          }));
      };

      // Buscar categoria "Biblioteca IMUNE+"
      const bibliotecaParent = findParentCategory("biblioteca");
      const biblioteca = bibliotecaParent ? getSubcategories(bibliotecaParent.id) : [];

      // Buscar categoria "Impressos IMUNE+"
      const impressosParent = findParentCategory("impressos");
      const impressos = impressosParent ? getSubcategories(impressosParent.id) : [];

      // Buscar categoria "CAPACITA+"
      const capacitaParent = findParentCategory("capacita");
      const capacita = capacitaParent ? getSubcategories(capacitaParent.id) : [];

      setBibliotecaData(biblioteca);
      setImpressosData(impressos);
      setCapacitaData(capacita);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Carregando módulos...</p>
      </div>
    );
  }

  return (
    <>
      {/* BIBLIOTECA IMUNE+ */}
      <ModuleSection
        id="biblioteca"
        title="BIBLIOTECA IMUNE+"
        description="Um acervo digital com documentos técnicos organizados por imunobiológico. Neste espaço o profissional encontra notas técnicas, atualizações do Ministério da Saúde, manuais, informes e demais referências oficiais sobre vacinas e imunização. Tudo centralizado e fácil de acessar para apoiar as decisões e práticas na sala de vacina."
        color="green"
        icon={<BookOpen size={24} />}
        hasCategories={true}
        subcategories={bibliotecaData}
        textAlign="right"
      />

      {/* CAPACITA+ */}
      <ModuleSection
        id="capacita"
        title="CAPACITA+"
        description="Neste espaço o profissional acessa todo o material complementar dos treinamentos e capacitações promovidos pela coordenação de imunização. São apresentações, apostilas e arquivos utilizados durante os encontros formativos, disponíveis para consulta e reforço do conteúdo aprendido. Uma forma prática de revisar e manter-se sempre atualizado."
        color="blue"
        icon={<GraduationCap size={24} />}
        reversed={true}
        hasCategories={true}
        subcategories={capacitaData}
      />

      {/* IMPRESSOS IMUNE+ */}
      <ModuleSection
        id="impressos"
        title="IMPRESSOS IMUNE+"
        description="Neste espaço, o profissional de saúde encontrará materiais prontos para impressão, que podem ser utilizados no dia a dia da unidade. Aqui estarão disponíveis modelos de cartão de vacina, fichas, formulários e outros documentos importantes para atender demandas imediatas, facilitando a rotina de trabalho e garantindo a continuidade dos serviços mesmo diante de imprevistos."
        color="orange"
        icon={<FileText size={24} />}
        hasCategories={true}
        subcategories={impressosData}
        textAlign="right"
      />

      {/* IMUNEPLAY */}
      <ModuleSection
        id="imuneplay"
        title="IMUNEPLAY"
        description="Aqui serão encontrados vídeos curtos, objetivos e educativos, com orientações técnicas baseadas nas diretrizes do Ministério da Saúde. O objetivo é facilitar o aprendizado contínuo com conteúdos rápidos e acessíveis, que ajudam no aperfeiçoamento das práticas profissionais de forma dinâmica e moderna."
        color="yellow"
        icon={<Video size={24} />}
        reversed={true}
        hasVideoCarousel={true}
      />
    </>
  );
}
