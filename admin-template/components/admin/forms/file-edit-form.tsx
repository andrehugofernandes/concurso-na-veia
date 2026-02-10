"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { File as ImuneFile } from "@/types/actions";
import { categoriesService, type Category } from "@/lib/services/categories";
import { useToast } from "@/hooks/use-toast";
import { authFetch } from "@/lib/api-fetch";

interface Props {
  open: boolean;
  file: ImuneFile | null;
  onClose: () => void;
  onSaved: () => void;
}

export function FileEditForm({ open, file, onClose, onSaved }: Props) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Contador e validação da descrição (padrão categorias)
  const MAX_DESCRIPTION_LENGTH = 500;
  const descriptionLength = description.length;
  const isDescriptionTooLong = descriptionLength > MAX_DESCRIPTION_LENGTH;

  useEffect(() => {
    let ignore = false;
    categoriesService.list().then((items) => { if (!ignore) setCategories(items); }).catch(() => void 0);
    return () => { ignore = true; };
  }, []);

  useEffect(() => {
    setName(file?.name ?? "");
    // Alguns campos (description, tags) podem não existir no tipo ImuneFile
    setDescription((file && typeof (file as unknown) === 'object' && 'description' in (file as unknown as Record<string, unknown>))
      ? String((file as unknown as { description?: unknown }).description ?? "")
      : "");
    setCategoryId(file?.categoryId ?? undefined);
    setTags((file && typeof (file as unknown) === 'object' && 'tags' in (file as unknown as Record<string, unknown>))
      ? String((file as unknown as { tags?: unknown }).tags ?? "")
      : "");
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    try {
      setSaving(true);
      if (isDescriptionTooLong) {
        toast({
          title: "Erro",
          description: `A descrição excede o limite de ${MAX_DESCRIPTION_LENGTH} caracteres. Por favor, reduza o texto.`,
          variant: "destructive",
        });
        return;
      }
      // API aceita PATCH em /api/files/[id] e atualiza apenas campos suportados
      const payload = {
        originalName: name,
        categoryId: categoryId ?? null,
        // Campos opcionais só serão usados se o backend suportar
      } as const;
      await authFetch(`/api/files/${file.id}`, { method: "PATCH", body: JSON.stringify(payload) });
      toast({ title: "Arquivo atualizado", description: name });
      onSaved();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Tente novamente';
      toast({ title: "Erro ao atualizar", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
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
            <SheetTitle className="text-lg font-semibold text-white">Editar Arquivo</SheetTitle>
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
            <Label htmlFor="editFileName" className="text-gray-700 dark:text-gray-300">Nome do Arquivo *</Label>
            <Input id="editFileName" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="editFileDescription" className="text-gray-700 dark:text-gray-300">Descrição</Label>
            <div className="flex items-center justify-between">
              <span className="sr-only">Contador de caracteres</span>
              <div className={`ml-auto text-xs ${isDescriptionTooLong ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
              </div>
            </div>
            <Textarea
              id="editFileDescription"
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
            <Label htmlFor="editFileTags" className="text-gray-700 dark:text-gray-300">Tags (separadas por vírgula)</Label>
            <Input id="editFileTags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tag1, tag2, tag3" className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">Categoria</Label>
            <Select value={categoryId ?? "none"} onValueChange={(v) => setCategoryId(v === "none" ? undefined : v)}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                <SelectItem value="none">Sem categoria</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={saving} className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white">{saving ? "Salvando..." : "Salvar"}</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
