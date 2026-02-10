// Server Component - não requer "use client"
import * as React from "react"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loading } from "@/components/ui/loading"
import { getCategories } from "@/app/actions/categories"
import type { Category } from "@/types/actions"

// Função para preload dos dados (evita waterfall)
export function preloadCategories() {
  // Inicia a busca de categorias com parâmetros padrão
  return getCategories({ page: 1, limit: 20, status: "all" })
}

// Função para buscar dados
async function fetchCategories(): Promise<Category[]> {
  try {
    // Usa a Server Action para buscar categorias
    const result = await getCategories({ page: 1, limit: 20, status: "all" })
    
    // O server action retorna um objeto SafeActionResult, precisamos acessar a propriedade .data
    // que contém o array de categorias
    return result.data || []
  } catch (error) {
    // Caso a Server Action lance uma exceção
    console.error("Erro ao buscar categorias:", error)
    throw error
  }
}

// Componente que exibe os dados
async function CategoriesContent() {
  // Busca os dados
  const categories = await fetchCategories()
  
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nenhuma categoria encontrada</p>
      </div>
    )
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category: Category) => (
        <Card key={category.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{category.name}</CardTitle>
              {category.active ? (
                <Badge variant="default">Ativo</Badge>
              ) : (
                <Badge variant="outline">Inativo</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{category.description}</p>
            <p className="text-xs mt-2 text-muted-foreground">Slug: {category.slug}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Componente principal com Suspense
export function CategoriesList() {
  // Inicia o preload dos dados
  preloadCategories()
  
  return (
    <Suspense fallback={<Loading type="card" count={3} />}>
      <CategoriesContent />
    </Suspense>
  )
}
