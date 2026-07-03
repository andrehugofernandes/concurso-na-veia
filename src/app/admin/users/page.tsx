import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Search, MoreVertical, Shield } from 'lucide-react';

export const metadata = {
  title: 'Gestão de Usuários - Admin',
};

export default async function AdminUsersPage() {
  const supabase = await createClient();

  // Buscar todos os perfis
  const { data: users, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching users:', error);
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground mt-1">Gerencie os alunos cadastrados na plataforma.</p>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="bg-card text-card-foreground border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b flex justify-between items-center bg-muted/20">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por e-mail ou nome..." 
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Usuário</th>
                <th className="px-6 py-4 font-medium">Plano / Assinatura</th>
                <th className="px-6 py-4 font-medium">Data de Cadastro</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground mr-3">
                        {user.first_name ? user.first_name.charAt(0) : '?'}
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {user.first_name || 'Usuário'} {user.last_name || ''}
                          {user.role === 'admin' && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                              <Shield className="w-3 h-3 mr-1" />
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-muted-foreground text-xs">ID: {user.id.substring(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.plan === 'pro' 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                        : 'bg-muted text-muted-foreground border'
                    }`}>
                      {user.plan === 'pro' ? 'Premium' : 'Gratuito'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
