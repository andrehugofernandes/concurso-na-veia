"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Edit3, FileText, Search, Trash2, Upload, FileType, FileVideo2, FileImage, File, FolderTree, Image as ImageIcon, X, Eye, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";
// import { authFetch } from "@/lib/api-fetch";
import type { File as ImuneFile } from "@/types/actions";
import { FileUploadForm } from "@/components/admin/forms/file-upload-form";
import { FileEditForm } from "@/components/admin/forms/file-edit-form";
import { deleteFile } from "@/app/actions/files";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { categoriesService, type Category } from "@/lib/services/categories";
import { IconBadge } from "@/components/ui/icon-badge";
// import { hexToRgba } from "@/lib/color";
import { CategoryBadge } from "@/components/ui/category-badge";
import { PaginationControls } from "@/components/ui/pagination-controls";

const cardStyle = "shadow-lg rounded-lg border-none overflow-hidden bg-white dark:bg-gray-800";

// Helpers
const FileIcon = ({ mime }: { mime?: string }) => {
  const t = (mime || "").toLowerCase();
  if (t.includes("pdf")) return <FileType className="h-5 w-5 text-red-600" aria-hidden />;
  if (t.includes("presentation") || t.includes("powerpoint") || t.endsWith("/vnd.ms-powerpoint")) return <FileType className="h-5 w-5 text-orange-600" aria-hidden />;
  if (t.includes("word") || t.includes("msword")) return <FileType className="h-5 w-5 text-blue-600" aria-hidden />;
  if (t.includes("spreadsheet") || t.includes("excel") || t.includes("vnd.ms-excel")) return <FileSpreadsheet className="h-5 w-5 text-green-700" aria-hidden />;
  if (t.startsWith("image/")) return <FileImage className="h-5 w-5 text-purple-600" aria-hidden />;
  if (t.startsWith("video/") || t.includes("mp4")) return <FileVideo2 className="h-5 w-5 text-green-600" aria-hidden />;
  return <File className="h-5 w-5 text-[var(--primary)]" aria-hidden />;
};

const getFileTypeLabel = (mime?: string): string => {
  const t = (mime || "").toLowerCase();
  if (t.includes("pdf")) return "PDF";
  if (t.includes("presentation") || t.includes("powerpoint")) return "PPT";
  if (t.includes("word") || t.includes("msword")) return "DOC";
  if (t.includes("spreadsheet") || t.includes("excel") || t.includes("vnd.ms-excel")) return "XLS";
  if (t.startsWith("image/")) {
    const ext = t.split("/").pop() || "";
    return ext.toUpperCase();
  }
  if (t.startsWith("video/") || t.includes("mp4")) return "MP4";
  return (mime || "").split("/").pop()?.toUpperCase() || "FILE";
};


export function FilesAdminPage() {
  const [openUpload, setOpenUpload] = useState(false);
  const [openEdit, setOpenEdit] = useState<ImuneFile | null>(null);
  const [thumbnailModal, setThumbnailModal] = useState<{ fileId: string; fileName: string } | null>(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ImuneFile[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();
  const [stats, setStats] = useState<{ totalFiles: number; uploadsThisMonth: number; downloadsThisMonth: number; viewsThisMonth: number; activeCategories: number } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryById = useMemo(() => new Map(categories.map(c => [c.id, c])), [categories]);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "DOCUMENT" | "IMAGE" | "VIDEO" | "OTHER">("ALL");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(pageSize));
      if (q) params.set("search", q);
      // Usar /api/files que busca do banco de dados
      const res = await fetch(`/api/files?${params.toString()}`, { 
        cache: "no-store",
        credentials: "include" // Incluir cookies de autenticação
      });
      
      if (!res.ok) {
        console.error("[FilesAdminPage] Erro ao carregar arquivos:", res.status);
        setItems([]);
        setTotal(0);
        return;
      }
      
      const data = (await res.json()) as { items: ImuneFile[]; total: number; page: number; limit: number };
      setItems(data.items || []);
      setTotal(data.total ?? 0);
      // Stats também do banco
      const rs = await fetch("/api/files/stats", { 
        cache: "no-store",
        credentials: "include"
      });
      setStats(await rs.json());
      // categorias para badge com cor
      try {
        const cats = await categoriesService.list();
        setCategories(cats);
      } catch {}
    } catch (e) {
      console.error("[FilesAdminPage] load:", e);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, q]);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    // Garantir que items seja sempre um array
    if (!items || !Array.isArray(items)) {
      return [];
    }

    const needle = q.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch = needle
        ? item.name.toLowerCase().includes(needle) || (item.description ?? "").toLowerCase().includes(needle)
        : true;

      const matchesCategory = categoryFilter === "ALL" ? true : item.categoryId === categoryFilter;

      const mime = (item.type || "").toLowerCase();
      const matchesType = (() => {
        switch (typeFilter) {
          case "DOCUMENT":
            return mime.includes("pdf") || mime.includes("msword") || mime.includes("officedocument");
          case "IMAGE":
            return mime.startsWith("image/");
          case "VIDEO":
            return mime.startsWith("video/") || mime.includes("mp4");
          case "OTHER":
            return !(
              mime.includes("pdf") ||
              mime.includes("msword") ||
              mime.includes("officedocument") ||
              mime.startsWith("image/") ||
              mime.startsWith("video/") ||
              mime.includes("mp4")
            );
          default:
            return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [items, q, categoryFilter, typeFilter]);

  const handleDeleted = async (id: string) => {
    const confirmed = window.confirm("Deseja realmente excluir este arquivo?");
    if (!confirmed) return;
    const res = await deleteFile({ id });
    if (res && typeof res === 'object' && 'error' in res) {
      const err = (res as { error?: { message?: string } }).error;
      toast({ title: "Erro ao excluir", description: err?.message ?? "Tente novamente", variant: "destructive" });
      return;
    }
    toast({ title: "Arquivo excluído" });
    await load();
  };

  const downloadHref = (f: ImuneFile) => `/api/files/${f.id}/download`;

  const handleDownload = (f: ImuneFile) => {
    const url = downloadHref(f);
    toast({ title: "Iniciando download", description: f.name });
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Arquivos</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Upload e organização de documentos do sistema</p>
        </div>
        <Button onClick={() => setOpenUpload(true)} className="text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors" aria-label="Abrir modal de upload de arquivo">
          <Upload className="h-4 w-4 mr-2" /> Upload de Arquivo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="orange"><FileText className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Arquivos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalFiles ?? items.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="green"><Upload className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Uploads este mês</p>
                <p className="mt-2 text-2xl font-bold">{stats?.uploadsThisMonth ?? '—'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="orange"><Download className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Downloads este mês</p>
                <p className="mt-2 text-2xl font-bold">{stats?.downloadsThisMonth ?? '—'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="blue"><Eye className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Visualizações este mês</p>
                <p className="mt-2 text-2xl font-bold">{stats?.viewsThisMonth ?? '—'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="purple"><FolderTree className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categorias Ativas</p>
                <p className="mt-2 text-2xl font-bold">{stats?.activeCategories ?? '—'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={cn("col-span-4", cardStyle)}>
        <CardHeader className="space-y-2 p-6 pb-2">
          <CardTitle>Buscar Arquivos</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Buscar por nome do arquivo..."
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              aria-label="Buscar arquivos"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <Select value={typeFilter} onValueChange={(value) => { setTypeFilter(value as typeof typeFilter); setPage(1); }}>
              <SelectTrigger
                className="bg-white text-gray-900 border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                aria-label="Filtrar por tipo de arquivo"
              >
                <SelectValue placeholder="Tipo de arquivo" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectItem value="ALL" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Todos os tipos</SelectItem>
                <SelectItem value="DOCUMENT" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Documentos</SelectItem>
                <SelectItem value="IMAGE" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Imagens</SelectItem>
                <SelectItem value="VIDEO" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Vídeos</SelectItem>
                <SelectItem value="OTHER" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Outros</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={(value) => { setCategoryFilter(value); setPage(1); }}>
              <SelectTrigger
                className="bg-white text-gray-900 border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                aria-label="Filtrar por categoria"
              >
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectItem value="ALL" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex md:justify-end">
              <Button variant="outline" className="w-full md:w-auto whitespace-nowrap"><Search className="h-4 w-4 mr-2" /> Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Arquivos Recentes</CardTitle>
            <FileText className="h-5 w-5 text-[var(--primary)]" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-gray-500">Carregando...</div>
          ) : (
            <div className="space-y-3">
              {filtered.map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-4 transition-colors hover:bg-[var(--primary)]/5">
                  <div className="flex items-center gap-3">
                    <FileIcon mime={f.type} />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{f.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(f.createdAt).toLocaleDateString()} • {(Number(f.size) / 1024 / 1024).toFixed(1)} MB
                        {f.categoryId && categoryById.get(f.categoryId)?.slug === 'imuneplay' ? (
                          f.viewCount !== undefined && (
                            <span className="ml-2">• <Download className="h-3 w-3 inline" /> {f.viewCount} {f.viewCount === 1 ? 'visualização' : 'visualizações'}</span>
                          )
                        ) : (
                          f.downloadCount !== undefined && (
                            <span className="ml-2">• <Download className="h-3 w-3 inline" /> {f.downloadCount} {f.downloadCount === 1 ? 'download' : 'downloads'}</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs uppercase">{getFileTypeLabel(f.type)}</Badge>
                    {f.storageType === 'firebase' && (
                      <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800">
                        Firebase
                      </Badge>
                    )}
                    {f.categoryId && categoryById.get(f.categoryId) && (
                      <CategoryBadge name={categoryById.get(f.categoryId)!.name} color={categoryById.get(f.categoryId)!.color} />
                    )}
                    {/* Botão Thumbnail para vídeos IMUNEPLAY */}
                    {f.thumbnailPath && f.categoryId && categoryById.get(f.categoryId)?.slug === 'imuneplay' && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setThumbnailModal({ fileId: f.id, fileName: f.name })}
                              aria-label={`Ver thumbnail de ${f.name}`}
                              className="text-purple-600 hover:bg-purple-100"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-[var(--primary)] text-white border-none">Ver Thumbnail</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(f)}
                            aria-label={`Baixar ${f.name}`}
                            className="text-green-600 hover:bg-green-100"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[var(--primary)] text-white border-none">Baixar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setOpenEdit(f)}
                            aria-label={`Editar ${f.name}`}
                            className="text-blue-600 hover:bg-blue-100"
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
                            className="text-red-600 hover:bg-red-100"
                            onClick={() => handleDeleted(f.id)}
                            aria-label={`Excluir ${f.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[var(--primary)] text-white border-none">Excluir</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-sm text-gray-500">Nenhum arquivo encontrado.</div>
              )}
              <div className="pt-4">
                <PaginationControls
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={setPage}
                  onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <FileUploadForm open={openUpload} onClose={() => { setOpenUpload(false); load(); }} />
      <FileEditForm open={!!openEdit} file={openEdit} onClose={() => setOpenEdit(null)} onSaved={() => { setOpenEdit(null); load(); }} />
      
      {/* Modal de Visualização de Thumbnail */}
      {thumbnailModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setThumbnailModal(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              setThumbnailModal(null);
            }
          }}
          aria-hidden="true"
        >
          <div 
            className="relative max-w-4xl w-full mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="presentation"
            onKeyDown={(e) => { /* manter por acessibilidade do linter */ if (e.key === 'Escape') {/* noop */} }}
            tabIndex={-1}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-[var(--primary)] text-white">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                <h3 className="font-semibold">Thumbnail do Vídeo</h3>
              </div>
              <button
                onClick={() => setThumbnailModal(null)}
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Conteúdo */}
            <div className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {thumbnailModal.fileName}
              </p>
              <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/public/files/${thumbnailModal.fileId}/thumbnail`}
                  alt={`Thumbnail de ${thumbnailModal.fileName}`}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%23ddd" width="800" height="450"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="24"%3EThumbnail não disponível%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <Button
                variant="outline"
                onClick={() => setThumbnailModal(null)}
              >
                Fechar
              </Button>
              <Button
                onClick={() => {
                  window.open(`/api/public/files/${thumbnailModal.fileId}/thumbnail`, '_blank');
                }}
                className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar Thumbnail
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
