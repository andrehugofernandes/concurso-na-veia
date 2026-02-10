"use client";

import { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { authFetch } from '@/lib/api-fetch';
import type { UserListItem, UserRole } from '@/types/user.type';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated?: (user: UserListItem) => void;
}

export function UserForm({ open, onClose, onCreated }: Props) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormData = {
    name: string;
    email: string;
    role: 'Admin' | 'Editor' | 'Visualizador';
    status: 'Ativo' | 'Inativo' | 'Pendente';
    password: string;
    username: string; // ajuste Next: username (AD)
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: 'Visualizador',
    status: 'Ativo',
    password: '',
    username: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const mapRoleToApi = (r: FormData['role']): UserRole => {
    if (r === 'Admin') return 'ADMIN';
    if (r === 'Editor') return 'COORDENADOR';
    return 'USER';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const payload = {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: mapRoleToApi(formData.role),
      } as { username: string; name: string; email: string; password: string; role: UserRole };

      const created = await authFetch<UserListItem>("/api/users", {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      toast({ title: 'Usuário criado', description: `${created.name} (${created.email})`, className: "bg-[var(--primary)] text-white border-none" });
      onCreated?.(created);
      onClose();
      setFormData({ name: '', email: '', role: 'Visualizador', status: 'Ativo', password: '', username: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Tente novamente.';
      toast({ title: 'Erro ao criar usuário', description: message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent
        hideClose
        className="w-full sm:max-w-md overflow-y-auto p-0 bg-white dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#151515] dark:to-[#101010] text-foreground"
      >
        <div 
          className="flex items-center justify-between w-full p-6 relative bg-[var(--primary)] text-white"
        >
          <div className="flex items-center space-x-3">
            <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20">
              <User className="h-4 w-4 text-white" />
            </Badge>
            <SheetTitle className="text-lg font-semibold text-white">
              Novo Usuário
            </SheetTitle>
          </div>
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[var(--primary)] rounded"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Usuário (AD) *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="nome.sobrenome"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userName" className="text-gray-700 dark:text-gray-300">Nome Completo *</Label>
              <Input
                id="userName"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Digite o nome completo"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userEmail" className="text-gray-700 dark:text-gray-300">E-mail *</Label>
              <Input
                id="userEmail"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Digite o e-mail"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userRole" className="text-gray-700 dark:text-gray-300">Função *</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="Admin">ADMIN</SelectItem>
                  <SelectItem value="Editor">COORDENADOR</SelectItem>
                  <SelectItem value="Visualizador">USER</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userStatus" className="text-gray-700 dark:text-gray-300">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userPassword" className="text-gray-700 dark:text-gray-300">Senha *</Label>
              <Input
                id="userPassword"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Digite a senha"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="transition-colors bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
              >
                {isSubmitting ? 'Criando...' : 'Criar Usuário'}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
