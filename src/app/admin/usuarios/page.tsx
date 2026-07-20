"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  nome: string;
  role: "sysadmin" | "admin" | "aluno";
  tenant_id: string | null;
  stripe_status: string | null;
  tenant_nome?: string;
}

interface Tenant {
  id: string;
  nome: string;
}

export default function AdminUsuariosPage() {
  const supabase = createClient();
  
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [activeTab, setActiveTab] = useState<"b2c" | "govtech">("b2c");
  const [selectedTenantFilter, setSelectedTenantFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      // Obter usuário logado
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setCurrentUser(profile);
        
        // Se o usuário logado for ADMIN de um Tenant específico, define o filtro padrão para o tenant dele
        if (profile && profile.role === "admin" && profile.tenant_id) {
          setSelectedTenantFilter(profile.tenant_id);
          setActiveTab("govtech");
        }
      }

      // Buscar lista de Tenants
      const { data: tenantList } = await supabase
        .from("tenants")
        .select("id, nome");
      if (tenantList) setTenants(tenantList);

      fetchUsers();
    }
    init();
  }, [activeTab, selectedTenantFilter]);

  async function fetchUsers() {
    setLoading(true);
    try {
      // Carregar Tenants novamente para garantir nomes atualizados
      const { data: currentTenants } = await supabase.from("tenants").select("id, nome");
      const tenantMap = new Map((currentTenants || []).map(t => [t.id, t.nome]));

      let query = supabase
        .from("profiles")
        .select(`
          id, email, nome, role, tenant_id, stripe_status
        `);

      if (activeTab === "b2c") {
        query = query.is("tenant_id", null);
      } else {
        query = query.not("tenant_id", "is", null);
        if (selectedTenantFilter !== "all") {
          query = query.eq("tenant_id", selectedTenantFilter);
        }
      }

      // Se o usuário logado for ADMIN de um Tenant específico, restringir acesso apenas ao Tenant dele
      if (currentUser && currentUser.role === "admin" && currentUser.tenant_id) {
        query = query.eq("tenant_id", currentUser.tenant_id);
      }

      const { data: profileData, error } = await query;
      if (error) throw error;

      // Buscar nomes dos tenants para enriquecer a tabela
      const enrichedUsers = (profileData || []).map((u: any) => ({
        ...u,
        tenant_nome: tenantMap.get(u.tenant_id) || "Não definido"
      }));

      setUsers(enrichedUsers);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleChange(userId: string, newRole: "sysadmin" | "admin" | "aluno") {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);
    
    if (error) {
      alert("Erro ao alterar cargo: " + error.message);
    } else {
      fetchUsers();
    }
  }

  async function handleRevokeAccess(userId: string) {
    if (confirm("Deseja realmente revogar o acesso deste usuário? Ele será alterado para o cargo 'aluno' e desvinculado de qualquer Tenant.")) {
      const { error } = await supabase
        .from("profiles")
        .update({ role: "aluno", tenant_id: null })
        .eq("id", userId);
      
      if (error) {
        alert("Erro ao revogar acesso: " + error.message);
      } else {
        fetchUsers();
      }
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Alunos & Usuários</h1>
          <p className="text-muted-foreground mt-1">Controle de acessos, Roles (SYSADMIN, ADMIN, ALUNO) e isolamento de Tenants.</p>
        </div>
      </div>

      {/* Abas Principais de Filtro (Escondidas se for admin de Tenant, pois só vê GovTech dele) */}
      {!(currentUser?.role === "admin" && currentUser?.tenant_id) && (
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("b2c")}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition-all ${
              activeTab === "b2c"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Alunos B2C (Venda Direta)
          </button>
          <button
            onClick={() => setActiveTab("govtech")}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition-all ${
              activeTab === "govtech"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            GovTech & Corporativos (Tenants)
          </button>
        </div>
      )}

      {/* Filtros específicos de Tenants se for SYSADMIN */}
      {activeTab === "govtech" && currentUser?.role === "sysadmin" && (
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold">Filtrar por Órgão:</label>
          <select
            value={selectedTenantFilter}
            onChange={(e) => setSelectedTenantFilter(e.target.value)}
            className="p-2 border border-border bg-background rounded-lg text-sm"
          >
            <option value="all">Todos os órgãos</option>
            {tenants.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
        </div>
      )}

      {/* Tabela de Usuários */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Carregando usuários...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Nenhum usuário cadastrado nesta categoria.</div>
        ) : (
          <table className="w-full border-collapse text-left text-sm text-foreground">
            <thead className="bg-muted text-muted-foreground font-semibold">
              <tr>
                <th className="p-4 border-b border-border">Nome</th>
                <th className="p-4 border-b border-border">Email</th>
                <th className="p-4 border-b border-border">Cargo (Role)</th>
                {activeTab === "b2c" ? (
                  <th className="p-4 border-b border-border">Status Assinatura</th>
                ) : (
                  <th className="p-4 border-b border-border">Órgão / Tenant</th>
                )}
                <th className="p-4 border-b border-border text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30">
                  <td className="p-4 font-medium">{user.nome || "Não preenchido"}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      user.role === "sysadmin"
                        ? "bg-red-500/10 text-red-500"
                        : user.role === "admin"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-blue-500/10 text-blue-500"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  {activeTab === "b2c" ? (
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        user.stripe_status === "active"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-rose-500/10 text-rose-500"
                      }`}>
                        {user.stripe_status || "Inativo"}
                      </span>
                    </td>
                  ) : (
                    <td className="p-4 text-muted-foreground">{user.tenant_nome}</td>
                  )}
                  <td className="p-4 text-right space-x-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                      className="p-1.5 border border-border bg-background rounded-lg text-xs"
                      disabled={currentUser?.role !== "sysadmin" && user.role === "sysadmin"}
                    >
                      <option value="aluno">Aluno (Padrão)</option>
                      <option value="admin">Administrador (Admin)</option>
                      {currentUser?.role === "sysadmin" && (
                        <option value="sysadmin">Superadministrador (Sysadmin)</option>
                      )}
                    </select>

                    <button
                      onClick={() => handleRevokeAccess(user.id)}
                      className="px-2.5 py-1.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg text-xs font-semibold transition-all"
                    >
                      Revogar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
