"use client";

import { useRef } from "react";
import { CategoriesPage } from "@/components/admin/categories/categories-page";
import type { CategoriesPageHandle } from "@/components/admin/categories/categories-page";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CategoriesScreen() {
  const categoriesRef = useRef<CategoriesPageHandle>(null);

  const handleOpenCreate = () => {
    categoriesRef.current?.openCreate();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Categorias</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Organize documentos por categorias e subcategorias</p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors"
          aria-label="Criar nova categoria"
        >
          <Plus className="h-4 w-4 mr-2" /> Nova Categoria
        </Button>
      </div>

      <CategoriesPage ref={categoriesRef} />
    </div>
  );
}
