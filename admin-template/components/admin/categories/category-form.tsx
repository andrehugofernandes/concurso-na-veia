"use client";

import { useEffect, useMemo, useState } from "react";
import { Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useTheme } from "@/components/providers/theme-provider";
import { categoriesService, type Category } from "@/lib/services/categories";
import { useToast } from "@/hooks/use-toast";

export type CategoryFormData = {
  name: string;
  description?: string | null;
  parentId?: string | null;
  color?: string;
};

export function CategoryForm({
  open,
  onClose,
  onSaved,
  editData,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: (c: Category) => void;
  editData?: Partial<Category> | null;
}) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: editData?.name ?? "",
    description: editData?.description ?? "",
    parentId: editData?.parentId ?? null,
    color: editData?.color ?? "#0037C1",
  });
  const [saving, setSaving] = useState(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const { themeColors, isLightColor } = useTheme();
  const { toast } = useToast();
  const headingTextClass = isLightColor(themeColors.primary) ? "text-black" : "text-white";
  
  // Constantes para o contador de caracteres
  const MAX_DESCRIPTION_LENGTH = 500;
  const descriptionLength = formData.description?.length || 0;
  const isDescriptionTooLong = descriptionLength > MAX_DESCRIPTION_LENGTH;

  useEffect(() => {
    console.log('CategoryForm - editData recebido:', editData);
    console.log('CategoryForm - open prop:', open);
    setFormData({
      name: editData?.name ?? "",
      description: editData?.description ?? "",
      parentId: editData?.parentId ?? null,
      color: editData?.color ?? "#0037C1",
    });
  }, [editData, open]);

  // Recarregar lista de categorias sempre que o modal abrir
  useEffect(() => {
    if (!open) return;
    
    console.log('[CategoryForm] Modal aberto, recarregando lista de categorias...');
    let ignore = false;
    categoriesService.list().then((items) => {
      if (!ignore) {
        console.log('[CategoryForm] ✅ Lista de categorias carregada:', items.length, 'categorias');
        setAllCategories(items);
      }
    }).catch((error) => {
      console.error('[CategoryForm] ❌ Erro ao carregar categorias:', error);
    });
    return () => { ignore = true; };
  }, [open]);

  const parentOptions = useMemo(
    () => allCategories.filter(c => c.id !== (editData?.id ?? '')),
    [allCategories, editData]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar nome da categoria
    const invalidCharsRegex = /[()[\]{}]/;
    if (invalidCharsRegex.test(formData.name)) {
      toast({
        title: "Nome inválido",
        description: "O nome da categoria não pode conter parênteses ( ), colchetes [ ] ou chaves { }. Use hífen ou traço para separar informações.",
        variant: "destructive",
        className: "z-[9999] bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      });
      return;
    }
    
    // Validar tamanho da descrição
    if (isDescriptionTooLong) {
      toast({
        title: "Erro",
        description: `A descrição excede o limite de ${MAX_DESCRIPTION_LENGTH} caracteres. Por favor, reduza o texto.`,
        variant: "destructive",
        className: "z-[9999] bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      });
      return;
    }
    
    setSaving(true);
    try {
      if (editData?.id) {
        const updated = await categoriesService.update(editData.id, formData);
        onSaved(updated);
        const isSub = !!updated.parentId;
        toast({
          title: isSub ? "Subcategoria atualizada" : "Categoria atualizada",
          description: updated.name,
          variant: "default",
          className: "z-[9999] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        });
      } else {
        const created = await categoriesService.create({
          name: formData.name,
          description: formData.description ?? undefined,
          parentId: formData.parentId ?? null,
          color: formData.color ?? "#0037C1",
        });
        onSaved(created as Category);
        const isSub = !!(created as Category).parentId;
        toast({
          title: isSub ? "Subcategoria criada" : "Categoria criada",
          description: (created as Category).name,
          variant: "default",
          className: "z-[9999] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        });
      }
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: "Erro ao salvar categoria",
        description: errorMessage,
        variant: "destructive",
        className: "z-[9999] bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInput = (field: keyof CategoryFormData, value: string) => setFormData(prev => ({ ...prev, [field]: value }));
  
  // Validação em tempo real do nome
  const invalidCharsRegex = /[()[\]{}]/;
  const hasInvalidChars = invalidCharsRegex.test(formData.name);

  const handleOpenChange = (state: boolean) => {
    console.log('CategoryForm - handleOpenChange chamado com state:', state);
    if (!state) {
      console.log('CategoryForm - fechando modal');
      onClose();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        hideClose
        className="w-full sm:max-w-md overflow-y-auto p-0 bg-white dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#151515] dark:to-[#101010] text-foreground"
      >
        <div
          className={`flex items-center justify-between w-full p-6 relative bg-[var(--primary)] ${headingTextClass}`}
        >
          <div className="flex items-center space-x-3">
            <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20">
              <Folder className={`h-4 w-4 ${headingTextClass}`} />
            </Badge>
            <SheetTitle className={`text-lg font-semibold ${headingTextClass}`}>
              {editData?.id
                ? (formData.parentId ? "Editar Subcategoria" : "Editar Categoria")
                : (formData.parentId ? "Nova Subcategoria" : "Nova Categoria")}
            </SheetTitle>
          </div>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[var(--primary)] rounded"
            aria-label="Fechar"
            title="Fechar"
          >
            ✕
          </button>
        </div>

        <SheetDescription className="sr-only">
          {editData?.id ? "Formulário para edição de categoria" : "Formulário para criação de nova categoria"}
        </SheetDescription>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="categoryName" className="text-gray-700 dark:text-gray-300">Nome da Categoria *</Label>
              <Input
                id="categoryName"
                value={formData.name}
                onChange={(e) => handleInput("name", e.target.value)}
                placeholder="Digite o nome da categoria"
                className={`bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 ${
                  hasInvalidChars ? 'border-red-500 focus-visible:ring-red-500' : ''
                }`}
                required
              />
              {hasInvalidChars && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  ⚠️ Caracteres inválidos detectados: ( ) [ ] { }. Use hífen ou traço para separar informações.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="categoryDescription" className="text-gray-700 dark:text-gray-300">Descrição</Label>
                <div className={`text-xs ${isDescriptionTooLong ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                  {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
                </div>
              </div>
              <Textarea
                id="categoryDescription"
                value={formData.description ?? ""}
                onChange={(e) => handleInput("description", e.target.value)}
                placeholder="Digite a descrição da categoria"
                className={`bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 ${
                  isDescriptionTooLong ? 'border-red-500 focus-visible:ring-red-500' : ''
                }`}
                rows={3}
              />
              {isDescriptionTooLong && (
                <p className="text-xs text-red-500 mt-1">
                  A descrição excede o limite de {MAX_DESCRIPTION_LENGTH} caracteres.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentCategory" className="text-gray-700 dark:text-gray-300">Categoria Pai (Opcional)</Label>
              <Select value={formData.parentId ?? "none"} onValueChange={(value) => handleInput("parentId", value === "none" ? (null as unknown as string) : value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Selecione uma categoria pai" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="none">Nenhuma (Categoria Raiz)</SelectItem>
                  {parentOptions.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryColor" className="text-gray-700 dark:text-gray-300">Cor da Categoria</Label>
              <div className="flex items-center space-x-3">
                <Input
                  id="categoryColor"
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInput("color", e.target.value)}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={formData.color}
                  onChange={(e) => handleInput("color", e.target.value)}
                  placeholder="#0037C1"
                  className="flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="transition-colors bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
              >
                {editData?.id 
                  ? (formData.parentId ? "Atualizar Subcategoria" : "Atualizar Categoria") 
                  : (formData.parentId ? "Criar Subcategoria" : "Criar Categoria")}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
