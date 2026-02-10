"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { categoriesService, type Category } from "@/lib/services/categories";
import { uploadToFirebase } from "@/lib/firebase-upload";
import { isVideoFile } from "@/lib/client-video-thumbnail";
import { Upload, Image as ImageIcon, FileUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PROGRESS_WIDTH_CLASSES = [
  "w-[0%]",
  "w-[5%]",
  "w-[10%]",
  "w-[15%]",
  "w-[20%]",
  "w-[25%]",
  "w-[30%]",
  "w-[35%]",
  "w-[40%]",
  "w-[45%]",
  "w-[50%]",
  "w-[55%]",
  "w-[60%]",
  "w-[65%]",
  "w-[70%]",
  "w-[75%]",
  "w-[80%]",
  "w-[85%]",
  "w-[90%]",
  "w-[95%]",
  "w-[100%]",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function FileUploadForm({ open, onClose }: Props) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Contador e validação de caracteres da descrição (mesmo padrão de categorias)
  const MAX_DESCRIPTION_LENGTH = 500;
  const descriptionLength = description.length;
  const isDescriptionTooLong = descriptionLength > MAX_DESCRIPTION_LENGTH;

  // Validação de tipos e tamanho (máx. 100MB para Firebase)
  const MAX_SIZE = 100 * 1024 * 1024;
  const allowedExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "png", "jpg", "jpeg", "webp", "mp4"] as const;
  const allowedMimes = new Set<string>([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/png",
    "image/jpeg",
    "image/webp",
    "video/mp4",
  ]);

  const isAllowedFile = (f: File) => {
    const name = f.name || "";
    const ext = name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
    const byExt = (allowedExtensions as readonly string[]).includes(ext);
    const byMime = f.type ? allowedMimes.has(f.type) : false;
    if (!(byExt || byMime)) {
      return { ok: false, reason: "Tipo de arquivo não permitido." } as const;
    }
    if (f.size > MAX_SIZE) {
      return {
      ok: false,
      reason: "Arquivo excede 100MB.",
    } as const;
    }
    return { ok: true } as const;
  };

  const handleFileSelect = (f: File | null | undefined) => {
    if (!f) return;
    const res = isAllowedFile(f);
    if (!res.ok) {
      toast({ title: "Arquivo inválido", description: res.reason, variant: "destructive" });
      return;
    }
    setFile(f);
  };

  useEffect(() => {
    let ignore = false;
    categoriesService.list().then((items) => {
      if (!ignore) setCategories(items);
    }).catch(() => void 0);
    return () => { ignore = true; };
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) {
      const res = isAllowedFile(f);
      if (!res.ok) {
        toast({ title: "Arquivo inválido", description: res.reason, variant: "destructive" });
        return;
      }
      setFile(f);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "Selecione um arquivo", variant: "destructive" });
      return;
    }

    try {
      setSubmitting(true);
      setUploadProgress(0);
      setUploadStatus("Preparando upload...");

      // Usar thumbnail manual se fornecido
      const thumbnailToUpload: File | null = thumbnailFile;

      // Validar descrição
      if (isDescriptionTooLong) {
        toast({
          title: "Erro",
          description: `A descrição excede o limite de ${MAX_DESCRIPTION_LENGTH} caracteres.`,
          variant: "destructive",
        });
        return;
      }

      // Validar arquivo
      const validation = isAllowedFile(file);
      if (!validation.ok) {
        toast({ title: "Arquivo inválido", description: validation.reason, variant: "destructive" });
        return;
      }

      // 1. Upload para Firebase Storage
      setUploadStatus("Enviando arquivo...");
      const firebaseResult = await uploadToFirebase(file, (progress) => {
        setUploadProgress(progress.progress);
      });

      // 1.5. Upload thumbnail se foi fornecido
      let thumbnailUrl: string | undefined = undefined;
      if (thumbnailToUpload) {
        setUploadStatus("Enviando thumbnail...");
        const thumbnailResult = await uploadToFirebase(thumbnailToUpload);
        thumbnailUrl = thumbnailResult.downloadURL;
        console.log('[Upload] Thumbnail enviado para Firebase:', thumbnailUrl);
      }

      // 2. Salvar metadata no banco de dados
      setUploadStatus("Salvando informações...");
      const response = await fetch('/api/files/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          filename: file.name,
          originalName: title || file.name,
          firebaseUrl: firebaseResult.downloadURL,
          size: file.size,
          mimeType: file.type,
          categoryId: categoryId || null,
          thumbnailUrl: thumbnailUrl, // URL do thumbnail no Firebase
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao salvar metadata');
      }

      toast({ title: "Upload concluído!", description: file.name });

      // Resetar formulário
      setFile(null);
      setTitle("");
      setDescription("");
      setCategoryId(undefined);
      setTags("");
      setUploadProgress(0);
      setUploadStatus("");
      setThumbnailFile(null);
      setThumbnailPreview(null);
      onClose();
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no upload';
      toast({ title: "Erro no upload", description: errorMessage, variant: "destructive" });
    } finally {
      setSubmitting(false);
      setUploadStatus("");
    }
  };

  // Verificar se deve mostrar campo de thumbnail
  const selectedCategory = categories.find(c => c.id === categoryId);
  const isImunePlay = selectedCategory?.slug === 'imuneplay';
  const showThumbnailUpload = file && isVideoFile(file) && isImunePlay;

  // Handler para selecionar thumbnail
  const handleThumbnailSelect = (thumbnailFile: File | undefined) => {
    if (!thumbnailFile) {
      setThumbnailFile(null);
      setThumbnailPreview(null);
      return;
    }

    // Validar se é imagem
    if (!thumbnailFile.type.startsWith('image/')) {
      toast({ title: "Selecione uma imagem", description: "O thumbnail deve ser uma imagem (PNG, JPG, WEBP)", variant: "destructive" });
      return;
    }

    setThumbnailFile(thumbnailFile);
    setThumbnailPreview(URL.createObjectURL(thumbnailFile));
  };

  // Limpar preview ao desmontar
  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  const getProgressClass = (value: number) => {
    if (value <= 0) return "w-[0%]";
    if (value >= 100) return "w-[100%]";
    const index = Math.min(
      PROGRESS_WIDTH_CLASSES.length - 1,
      Math.round(value / 5)
    );
    return PROGRESS_WIDTH_CLASSES[index];
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        hideClose
        side="right"
        className="w-full sm:max-w-md overflow-y-auto p-0 bg-white dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#151515] dark:to-[#101010] text-foreground"
      >
        <div className="flex items-center justify-between w-full p-6 relative bg-[var(--primary)] text-white">
          <div className="flex items-center space-x-3">
            <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20">
              <FileUp className="h-4 w-4 text-white" />
            </Badge>
            <SheetTitle className="text-lg font-semibold text-white">Upload de Arquivo</SheetTitle>
          </div>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[var(--primary)] rounded"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="fileTitle" className="text-gray-700 dark:text-gray-300">Título do Arquivo *</Label>
            <Input id="fileTitle" placeholder="Digite o título do arquivo" value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="fileDescription" className="text-gray-700 dark:text-gray-300">Descrição</Label>
              <div className={`text-xs ${isDescriptionTooLong ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
              </div>
            </div>
            <Textarea
              id="fileDescription"
              placeholder="Digite a descrição do arquivo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 ${isDescriptionTooLong ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {isDescriptionTooLong && (
              <p className="text-xs text-red-500 mt-1">A descrição excede o limite de {MAX_DESCRIPTION_LENGTH} caracteres.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">Categoria *</Label>
            <Select value={categoryId ?? "none"} onValueChange={(v) => setCategoryId(v === "none" ? undefined : v)}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                <SelectItem value="none">Selecione...</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileTags" className="text-gray-700 dark:text-gray-300">Tags (separadas por vírgula)</Label>
            <Input id="fileTags" placeholder="tag1, tag2, tag3" value={tags} onChange={(e) => setTags(e.target.value)} className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>

          {/* Input de arquivo oculto fora da área clicável para evitar controles aninhados */}
          <input
            id="fileInputHidden"
            type="file"
            className="hidden"
            aria-label="Selecionar arquivo para upload"
            title="Selecionar arquivo para upload"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.webp,.mp4,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,image/png,image/jpeg,image/webp,video/mp4"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />

          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={"border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors " + (dragActive ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800")}
            onClick={() => document.getElementById("fileInputHidden")?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.getElementById('fileInputHidden')?.click();
              }
            }}
            aria-label="Área para soltar ou selecionar arquivo"
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-500" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Clique para selecionar ou arraste um arquivo aqui
            </p>
            <p className="text-xs text-gray-500">PDF, DOC, DOCX, PPT, PPTX, PNG, JPG, WEBP, MP4 até 100MB</p>
            {file && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">Selecionado: {file.name}</p>
            )}
          </div>

          {/* Upload de Thumbnail (apenas para vídeos IMUNEPLAY) */}
          {showThumbnailUpload && (
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Thumbnail do Vídeo (Opcional)
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Faça upload de uma imagem para ser usada como capa do vídeo
              </p>
              
              <input
                id="thumbnailInput"
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => handleThumbnailSelect(e.target.files?.[0])}
                aria-label="Selecionar thumbnail"
              />
              
              <div
                onClick={() => document.getElementById("thumbnailInput")?.click()}
                className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    document.getElementById('thumbnailInput')?.click();
                  }
                }}
                aria-label="Selecionar thumbnail"
              >
                {thumbnailPreview ? (
                  <div className="space-y-2">
                    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={thumbnailPreview} 
                        alt="Preview do thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <div className="bg-green-500 text-white rounded-full p-1">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                      ✓ Thumbnail selecionado
                    </p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Clique para selecionar uma imagem
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG ou WEBP</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Barra de progresso */}
          {submitting && (
            <div className="mt-4 space-y-2">
              {uploadStatus && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></div>
                  <span>{uploadStatus}</span>
                </div>
              )}
              {uploadProgress > 0 && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span>Progresso</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={cn(
                        "bg-[var(--primary)] h-2 rounded-full transition-all duration-300",
                        getProgressClass(uploadProgress)
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>Cancelar</Button>
            <Button type="submit" disabled={submitting} className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white">
              {submitting ? `Enviando... ${Math.round(uploadProgress)}%` : "Fazer Upload"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
