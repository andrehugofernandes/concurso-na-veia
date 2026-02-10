"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ReportForm({ open, onClose }: Props) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Relatório gerado (mock)", description: title || "Sem título" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent hideClose className="sm:max-w-md p-0 bg-white dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#151515] dark:to-[#101010] text-foreground">
        <div className="flex items-center justify-between w-full p-6 relative bg-[var(--primary)] text-white">
          <div className="flex items-center space-x-3">
            <DialogTitle className="text-lg font-semibold text-white">Novo Relatório</DialogTitle>
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
          <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white">Gerar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
