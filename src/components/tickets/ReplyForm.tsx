"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { replyTicketAction } from "@/actions/tickets";
import { uploadTicketAttachmentAction } from "@/actions/uploads";
import { useToast } from "@/hooks/use-toast";
import { Paperclip, X, Image as ImageIcon } from "lucide-react";

const formSchema = z.object({
  message: z.string().min(1, "Mensagem não pode estar vazia"),
});

export function ReplyForm({ ticketId }: { ticketId: string }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_TOTAL_SIZE = 2 * 1024 * 1024;
  const totalSizeBytes = files.reduce((acc, f) => acc + f.size, 0);
  const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
  const percentageUsed = Math.min(100, (totalSizeBytes / MAX_TOTAL_SIZE) * 100);
  const isLimitExceeded = totalSizeBytes > MAX_TOTAL_SIZE;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({ title: "Arquivo inválido", description: `${file.name} não é uma imagem`, variant: "destructive" });
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast({ title: "Arquivo muito grande", description: `${file.name} excede 2MB`, variant: "destructive" });
        return false;
      }
      return true;
    });
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      const pastedFiles = Array.from(items)
        .filter(item => item.type.indexOf('image') !== -1)
        .map(item => item.getAsFile())
        .filter((file): file is File => file !== null);
      
      if (pastedFiles.length > 0) {
        handleFiles(pastedFiles);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      const attachment_urls: string[] = [];
      
      if (files.length > 0) {
        toast({ title: "Enviando imagens...", description: "Por favor, aguarde." });
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          
          const result = await uploadTicketAttachmentAction(formData);
          if (result.status === "success" && result.data?.url) {
            attachment_urls.push(result.data.url);
          } else {
            throw new Error(result.error || "Erro ao fazer upload da imagem");
          }
        }
      }

      const result = await replyTicketAction({ ticketId, message: values.message, attachment_urls });

      if (result?.serverError) {
        toast({ title: "Erro ao enviar", description: result.serverError, variant: "destructive" });
      } else {
        form.reset();
        setFiles([]);
      }
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Ocorreu um erro ao enviar a resposta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div 
          onDrop={handleDrop} 
          onDragOver={handleDragOver}
          className="space-y-2 border-2 border-dashed border-transparent focus-within:border-primary/20 hover:border-primary/20 rounded-md p-1 transition-colors"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                    placeholder="Escreva sua resposta... (Você pode colar CTRL+V ou arrastar imagens aqui)" 
                    className="min-h-[100px]" 
                    onPaste={handlePaste}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Paperclip className="h-4 w-4" />
                Anexar Prints (Max 2MB)
              </Button>
              <span className="text-xs text-muted-foreground hidden sm:inline-block">ou cole a imagem com CTRL+V</span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
              />
            </div>
            
            {files.length > 0 && (
              <div className="space-y-3 mt-3">
                <div className="p-3 rounded-xl bg-muted/60 border space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-muted-foreground">Total dos Anexos:</span>
                    <span className={isLimitExceeded ? 'text-destructive font-bold' : 'text-muted-foreground'}>
                      {totalSizeMB} MB / 2.00 MB
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        isLimitExceeded 
                          ? 'bg-destructive' 
                          : percentageUsed > 80 
                            ? 'bg-amber-500' 
                            : 'bg-primary'
                      }`}
                      style={{ width: `${percentageUsed}%` }}
                    />
                  </div>
                  {isLimitExceeded && (
                    <p className="text-[11px] text-destructive font-medium">
                      ⚠️ Tamanho total excede 2MB. Remova algumas imagens antes de enviar.
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {files.map((file, idx) => {
                    const objectUrl = URL.createObjectURL(file);
                    return (
                      <div 
                        key={idx} 
                        className="relative group border rounded-md p-1 bg-muted/50 w-16 h-16 flex items-center justify-center overflow-hidden cursor-pointer"
                        onClick={() => setPreviewImage(objectUrl)}
                      >
                        <img 
                          src={objectUrl} 
                          alt={file.name} 
                          className="w-full h-full object-cover rounded"
                        />
                        <span className="absolute bottom-0 w-full text-[8px] truncate px-1 text-center bg-black/60 text-white">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="absolute top-0.5 right-0.5 bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isLoading || isLimitExceeded}>{isLoading ? "Enviando..." : "Enviar Resposta"}</Button>

        {previewImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 p-2">
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-black/90 transition"
              >
                <X size={20} />
              </button>
              <img 
                src={previewImage} 
                alt="Preview" 
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-lg mx-auto"
              />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
