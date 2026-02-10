"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { UserListItem, UserRole } from "@/types/user.type";
import { useToast } from "@/hooks/use-toast";
import { authFetch } from "@/lib/api-fetch";

interface Props {
  open: boolean;
  user: UserListItem | null;
  onClose: () => void;
  onUpdated: (u: UserListItem) => void;
}

export function UserEditForm({ open, user, onClose, onUpdated }: Props) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("USER");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const payload: Partial<UserListItem> = { name, username, email, role };
      const updated = await authFetch<UserListItem>(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast({ title: "Usuário atualizado", description: updated.name ?? "" });
      onUpdated(updated);
      onClose();
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
        side="right"
        hideClose
        className="w-full sm:max-w-md p-0 bg-white dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#151515] dark:to-[#101010] text-foreground"
      >
        <div className="flex items-center justify-between w-full p-6 relative bg-[var(--primary)] text-white rounded-tl-md">
          <div className="flex items-center space-x-3">
            <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20">
              <User className="h-4 w-4 text-white" />
            </Badge>
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold text-white">Editar Usuário</SheetTitle>
            </SheetHeader>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[var(--primary)] rounded"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="space-y-2">
            <label htmlFor="editUserName" className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
            <Input id="editUserName" placeholder="Digite o nome completo" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div className="space-y-2">
            <label htmlFor="editUserUsername" className="text-sm font-medium text-gray-700 dark:text-gray-300">Username (AD)</label>
            <Input id="editUserUsername" placeholder="Digite o username" value={username} onChange={(e) => setUsername(e.target.value)} required className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div className="space-y-2">
            <label htmlFor="editUserEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
            <Input id="editUserEmail" placeholder="Digite o e-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div className="space-y-2">
            <label htmlFor="editUserRole" className="text-sm font-medium text-gray-700 dark:text-gray-300">Função</label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger id="editUserRole" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                <SelectValue placeholder="Selecione a função" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="COORDENADOR">COORDENADOR</SelectItem>
                <SelectItem value="USER">USER</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Cancelar</Button>
            <Button type="submit" disabled={saving} className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white">Salvar</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
