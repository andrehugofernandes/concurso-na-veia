"use client";

import React, { useEffect, useMemo, useState, Fragment, forwardRef, useImperativeHandle, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit3, Trash2, GripVertical, FolderTree, FolderPlus, ChevronRight, Folders, FileText, Video } from "lucide-react";
import { categoriesService, type Category } from "@/lib/services/categories";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconBadge } from "@/components/ui/icon-badge";
import { CategoryBadge } from "@/components/ui/category-badge";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { useToast } from "@/hooks/use-toast";
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CategoryForm } from "./category-form";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

function SortableRow({ id, children, className, allowDrag = true }: { id: string; children: React.ReactNode; className?: string; allowDrag?: boolean }) {
  const { setNodeRef, transform, transition } = useSortable({ id, disabled: !allowDrag });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined
  };
  
  return (
    <div ref={setNodeRef} className={`${className} transition-transform duration-200 ease-in-out`} style={style}>
      {children}
    </div>
  );
}

function DragHandle({ id, allowDrag }: { id: string; allowDrag: boolean }) {
  const { attributes, listeners } = useSortable({ id, disabled: !allowDrag });
  
  return (
    <div 
      className={`text-gray-400 ${allowDrag ? 'cursor-grab' : 'cursor-not-allowed opacity-50'}`}
      {...(allowDrag ? { ...attributes, ...listeners } : {})}
    >
      <GripVertical className="h-4 w-4" />
    </div>
  );
}

function buildHierarchy(items: Category[]) {
  const parents = items.filter((c) => !c.parentId);
  const childrenMap = new Map<string, Category[]>();
  items.forEach((c) => {
    if (c.parentId) {
      const list = childrenMap.get(c.parentId) ?? [];
      list.push(c);
      childrenMap.set(c.parentId, list);
    }
  });
  // Ordenar por sortOrder
  parents.sort((a, b) => a.sortOrder - b.sortOrder);
  for (const list of childrenMap.values()) {
    list.sort((a, b) => a.sortOrder - b.sortOrder);
  }
  return { parents, childrenMap };
}

export type CategoriesPageHandle = {
  openCreate: () => void;
};

type CategoriesPageProps = Record<string, unknown>;

export const CategoriesPage = forwardRef<CategoriesPageHandle, CategoriesPageProps>(function CategoriesPage(_props, ref) {
  const { user } = useAuth();
  const isSysadmin = user?.role === 'SYSADMIN';
  const isAdmin = user?.role === 'ADMIN';
  const isCoordenador = user?.role === 'COORDENADOR';
  const allowReorder = isSysadmin || isAdmin || isCoordenador;
  const canEdit = isSysadmin || isAdmin || isCoordenador;
  const canDelete = isSysadmin || isAdmin;
  const { toast } = useToast();
  const [items, setItems] = useState<Category[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Partial<Category> | null>(null);
  const [countsMap, setCountsMap] = useState<Record<string, number>>({});
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [contentFilter, setContentFilter] = useState<"ALL" | "WITH_FILES" | "WITHOUT_FILES">("ALL");
  const [hierarchyFilter, setHierarchyFilter] = useState<"ALL" | "PARENT_ONLY" | "WITH_CHILDREN">("ALL");

  const sensors = useSensors(useSensor(PointerSensor));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await categoriesService.list();
      setItems(data);
      try {
        const res = await fetch('/api/files/category-counts', { cache: 'no-store' });
        const json = await res.json() as { counts: Record<string, number>; totalFiles: number; totalVideos: number };
        setCountsMap(json.counts || {});
        setTotalFiles(json.totalFiles || 0);
        setTotalVideos(json.totalVideos || 0);
      } catch {}
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
      toast({ title: "Erro ao carregar categorias", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let data = items;

    if (needle) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(needle) || (c.description ?? "").toLowerCase().includes(needle)
      );
    }

    if (contentFilter !== "ALL") {
      data = data.filter((category) => {
        const count = countsMap[category.id] ?? 0;
        return contentFilter === "WITH_FILES" ? count > 0 : count === 0;
      });
    }

    if (hierarchyFilter === "PARENT_ONLY") {
      data = data.filter((category) => !category.parentId);
    } else if (hierarchyFilter === "WITH_CHILDREN") {
      const parentIdsWithChildren = new Set(
        items
          .filter((category) => !category.parentId)
          .filter((parent) => items.some((child) => child.parentId === parent.id))
          .map((parent) => parent.id)
      );

      data = data.filter((category) => {
        const parentId = category.parentId ?? category.id;
        return parentIdsWithChildren.has(parentId);
      });
    }

    return data;
  }, [items, q, contentFilter, hierarchyFilter, countsMap]);

  const { parents, childrenMap } = useMemo(() => buildHierarchy(filtered), [filtered]);
  const totalParents = parents.length;
  const pagedParents = useMemo(() => {
    const start = (page - 1) * pageSize;
    return parents.slice(start, start + pageSize);
  }, [parents, page, pageSize]);

  const openCreate = useCallback(() => {
    setEditData(null);
    setOpenForm(true);
  }, []);
  const openEdit = useCallback((category: Category) => {
    // Garantir que o objeto seja passado corretamente
    setEditData({
      id: category.id,
      name: category.name,
      description: category.description,
      parentId: category.parentId,
      color: category.color,
      sortOrder: category.sortOrder
    });
    setOpenForm(true);
  }, []);

  const handleSaved = () => {
    // Após salvar, recarrega lista para refletir parentId/sortOrder
    void load();
  };

  const computeUpdatesForParent = (parentId: string | null, list: Category[]) =>
    list.map((c, index) => ({ id: c.id, parentId, sortOrder: index }));

  const onDragEnd = useCallback(async (event: DragEndEvent) => {
    if (!allowReorder) return;
    const { active, over } = event;
    if (!active?.id || !over?.id || active.id === over.id) return;

    // Reordenação simples: somente entre irmãos do mesmo nível (pais entre pais, filhos dentro do mesmo pai)
    // Estratégia: mover active para a posição do over e recalcular sortOrder daquele nível, enviar updates.

    // 1) Checar se ambos são pais
    const parentsIds = parents.map((p) => p.id);
    if (parentsIds.includes(String(active.id)) && parentsIds.includes(String(over.id))) {
      const newParents = [...parents];
      const from = newParents.findIndex((c) => c.id === active.id);
      const to = newParents.findIndex((c) => c.id === over.id);
      if (from >= 0 && to >= 0) {
        const [moved] = newParents.splice(from, 1);
        newParents.splice(to, 0, moved);
        const updates = computeUpdatesForParent(null, newParents);
        try {
          await categoriesService.updateHierarchy(updates);
          await load();
          toast({ title: "Ordem atualizada", description: "Categorias principais reordenadas." });
        } catch (e: unknown) {
          const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
          toast({ title: "Erro ao salvar ordem", description: errorMessage, variant: "destructive" });
        }
      }
      return;
    }

    // 2) Checar se ambos são filhos do mesmo pai
    const parentOfActive = items.find((c) => c.id === active.id)?.parentId
      ?? [...childrenMap.entries()].find(([, arr]) => arr.some((x) => x.id === active.id))?.[0]
      ?? null;
    const parentOfOver = items.find((c) => c.id === over.id)?.parentId
      ?? [...childrenMap.entries()].find(([, arr]) => arr.some((x) => x.id === over.id))?.[0]
      ?? null;

    if (parentOfActive === parentOfOver) {
      const siblings = parentOfActive ? (childrenMap.get(parentOfActive) ?? []) : parents;
      const newSiblings = [...siblings];
      const from = newSiblings.findIndex((c) => c.id === active.id);
      const to = newSiblings.findIndex((c) => c.id === over.id);
      if (from >= 0 && to >= 0) {
        const [moved] = newSiblings.splice(from, 1);
        newSiblings.splice(to, 0, moved);
        const updates = computeUpdatesForParent(parentOfActive, newSiblings);
        try {
          await categoriesService.updateHierarchy(updates);
          await load();
          toast({ title: "Ordem atualizada", description: "Subcategorias reordenadas." });
        } catch (e: unknown) {
          const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
          toast({ title: "Erro ao salvar ordem", description: errorMessage, variant: "destructive" });
        }
      }
    }
  }, [allowReorder, childrenMap, items, load, parents, toast]);

  useImperativeHandle(ref, () => ({
    openCreate,
  }), [openCreate]);

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="green"><FolderTree className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categorias Principais</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{items.filter(i => !i.parentId).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="blue"><Folders className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Subcategorias</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{items.filter(i => !!i.parentId).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="purple"><FileText className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Arquivos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="orange"><Video className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vídeos (ImunePlay)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalVideos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Categorias</CardTitle>
            <FolderTree className="h-5 w-5 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              placeholder="Buscar categorias..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              aria-label="Buscar categorias"
            />
            <Select value={contentFilter} onValueChange={(value) => { setContentFilter(value as typeof contentFilter); setPage(1); }}>
              <SelectTrigger
                className="bg-white text-gray-900 border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                aria-label="Filtrar por arquivos associados"
              >
                <SelectValue placeholder="Arquivos associados" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectItem value="ALL" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Todas</SelectItem>
                <SelectItem value="WITH_FILES" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Com arquivos</SelectItem>
                <SelectItem value="WITHOUT_FILES" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Sem arquivos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={hierarchyFilter} onValueChange={(value) => { setHierarchyFilter(value as typeof hierarchyFilter); setPage(1); }}>
              <SelectTrigger
                className="bg-white text-gray-900 border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                aria-label="Filtrar por hierarquia"
              >
                <SelectValue placeholder="Tipo de categoria" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectItem value="ALL" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Todas</SelectItem>
                <SelectItem value="PARENT_ONLY" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Somente principais</SelectItem>
                <SelectItem value="WITH_CHILDREN" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Com subcategorias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="text-sm text-gray-500">Carregando...</div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              {/* Pais */}
              <SortableContext items={pagedParents.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {pagedParents.map((p) => (
                    <Fragment key={p.id}>
                      <SortableRow
                        key={p.id}
                        id={p.id}
                        className="flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-4 transition-colors hover:bg-[var(--primary)]/5"
                        allowDrag={allowReorder}
                      >
                        <div className="flex items-center gap-3">
                          <DragHandle id={p.id} allowDrag={allowReorder} />
                          <span
                            className={cn(
                              "w-4 h-4 rounded-full bg-[var(--primary)]",
                              p.color ? '' : undefined
                            )}
                            style={p.color ? { backgroundColor: p.color } : undefined}
                            aria-hidden
                          />
                          <FolderTree className="h-8 w-8 text-[var(--primary)]" aria-hidden />
                          <div>
                            <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                              <span>{p.name}</span>
                              <CategoryBadge name={p.name} color={p.color} />
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {Number(countsMap[p.id] || 0).toLocaleString()} arquivos • {(childrenMap.get(p.id) ?? []).length} subcategorias
                            </div>
                            {p.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">{p.description}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Principal</Badge>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                                  onClick={() => openEdit(p)}
                                  aria-label={`Editar categoria ${p.name}`}
                                >
                                  <Edit3 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[var(--primary)] text-white border-none">Editar</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                                  onClick={() => { setEditData({ parentId: p.id }); setOpenForm(true); }}
                                  aria-label={`Adicionar subcategoria em ${p.name}`}
                                >
                                  <FolderPlus className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[var(--primary)] text-white border-none">Adicionar subcategoria</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-gray-200 dark:border-gray-600 text-red-600 hover:bg-red-100" 
                                  aria-label={`Excluir categoria ${p.name}`} 
                                  disabled={!canDelete}
                                  onClick={async () => {
                                    console.log('[CategoriesPage] 🗑️ Tentando deletar categoria:', { id: p.id, name: p.name, userRole: user?.role });
                                    if (!window.confirm(`Tem certeza que deseja excluir a categoria "${p.name}"?`)) {
                                      console.log('[CategoriesPage] ❌ Deleção cancelada pelo usuário');
                                      return;
                                    }
                                    try {
                                      console.log('[CategoriesPage] 📤 Enviando DELETE para /api/categories/' + p.id);
                                      await categoriesService.remove(p.id);
                                      console.log('[CategoriesPage] ✅ Categoria deletada com sucesso');
                                      toast({ 
                                        title: 'Sucesso', 
                                        description: 'Categoria excluída com sucesso!',
                                        className: 'bg-green-50 border-green-200 text-green-900'
                                      });
                                      load();
                                    } catch (error: unknown) {
                                      console.error('[CategoriesPage] ❌ Erro ao deletar categoria:', error);
                                      const err = error as { response?: { data?: { message?: string } }; message?: string };
                                      const errorMessage = err?.response?.data?.message || err?.message || 'Erro ao excluir categoria';
                                      toast({ 
                                        title: 'Erro', 
                                        description: errorMessage, 
                                        variant: 'destructive',
                                        className: 'bg-red-50 border-red-200 text-red-900'
                                      });
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-[var(--primary)] text-white border-none">Excluir</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </SortableRow>

                      {/* Filhos */}
                      {(() => {
                        const childItems = childrenMap.get(p.id) ?? [];
                        if (childItems.length === 0) return null;
                        return (
                          <SortableContext items={childItems.map((child) => child.id)} strategy={verticalListSortingStrategy}>
                            {childItems.map((child) => (
                              <SortableRow
                                id={child.id}
                                key={child.id}
                                className="ml-8 flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-3 transition-colors hover:bg-[var(--primary)]/5"
                                allowDrag={allowReorder}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="pt-1"><DragHandle id={child.id} allowDrag={allowReorder} /></div>
                                  <span
                                    className={cn(
                                      "mt-1 w-2.5 h-2.5 rounded-full bg-[var(--primary)]",
                                      child.color ? '' : undefined
                                    )}
                                    style={child.color ? { backgroundColor: child.color } : undefined}
                                    aria-hidden
                                  />
                                  <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5" aria-hidden />
                                  <div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                                      <span>{child.name}</span>
                                      <CategoryBadge name={child.name} color={child.color} />
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">{Number(countsMap[child.id] || 0).toLocaleString()} arquivos</div>
                                    {child.description && (
                                      <div className="text-xs text-gray-500 dark:text-gray-400">{child.description}</div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">Subcategoria</Badge>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                                          onClick={() => openEdit(child)}
                                          aria-label={`Editar subcategoria ${child.name}`}
                                          disabled={!canEdit}
                                        >
                                          <Edit3 className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-[var(--primary)] text-white border-none">Editar</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="border-gray-200 dark:border-gray-600 text-red-600 hover:bg-red-100" 
                                          aria-label={`Excluir subcategoria ${child.name}`} 
                                          disabled={!canDelete}
                                          onClick={async () => {
                                            console.log('[CategoriesPage] 🗑️ Tentando deletar subcategoria:', { id: child.id, name: child.name, parentId: child.parentId, userRole: user?.role });
                                            if (!window.confirm(`Tem certeza que deseja excluir a subcategoria "${child.name}"?`)) {
                                              console.log('[CategoriesPage] ❌ Deleção cancelada pelo usuário');
                                              return;
                                            }
                                            try {
                                              console.log('[CategoriesPage] 📤 Enviando DELETE para /api/categories/' + child.id);
                                              await categoriesService.remove(child.id);
                                              console.log('[CategoriesPage] ✅ Subcategoria deletada com sucesso');
                                              toast({ 
                                                title: 'Sucesso', 
                                                description: 'Subcategoria excluída com sucesso!',
                                                className: 'bg-green-50 border-green-200 text-green-900'
                                              });
                                              load();
                                            } catch (error: unknown) {
                                              console.error('[CategoriesPage] ❌ Erro ao deletar subcategoria:', error);
                                              const err = error as { response?: { data?: { message?: string } }; message?: string };
                                              const errorMessage = err?.response?.data?.message || err?.message || 'Erro ao excluir subcategoria';
                                              toast({ 
                                                title: 'Erro', 
                                                description: errorMessage, 
                                                variant: 'destructive',
                                                className: 'bg-red-50 border-red-200 text-red-900'
                                              });
                                            }
                                          }}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-[var(--primary)] text-white border-none">Excluir</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </SortableRow>
                            ))}
                          </SortableContext>
                        );
                      })()}
                    </Fragment>
                  ))}
                </div>
              </SortableContext>
              <div className="mt-6">
                <PaginationControls
                  page={page}
                  pageSize={pageSize}
                  total={totalParents}
                  onPageChange={setPage}
                  onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
                />
              </div>
            </DndContext>
          )}
        </CardContent>
      </Card>

      <CategoryForm open={openForm} onClose={() => setOpenForm(false)} onSaved={handleSaved} editData={editData} />
    </div>
  );
});
