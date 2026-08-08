"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Users, 
  Search, 
  Shield, 
  Crown, 
  User, 
  ChevronDown, 
  Pencil, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface UserProfile {
  id: string;
  email: string;
  nome: string;
  role: string;
  plan: string | null;
  username: string | null;
  avatar_url: string | null;
  cargo: string | null;
  concurso_id: string | null;
}

export default function AdminUsuariosPage() {
  const supabase = createClient();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [concursos, setConcursos] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  // Modals state
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editFormData, setEditFormData] = useState({
    nome: "",
    username: "",
    email: "",
    password: "",
    role: "aluno",
    plan: "free",
    cargo: "",
    concurso_id: ""
  });
  const [savingEdit, setSavingEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [deletingUser, setDeletingUser] = useState<UserProfile | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setCurrentUser(profile);
      }
      
      const { data: concursosData } = await supabase
        .from("concursos")
        .select("id, nome")
        .order("nome", { ascending: true });
      if (concursosData) setConcursos(concursosData);

      fetchUsers();
    }
    init();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("id, email, nome, role, plan, username, avatar_url, cargo, concurso_id")
        .order("nome", { ascending: true });

      if (error) throw error;
      setUsers(profileData || []);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setLoading(false);
    }
  }

  // ── MUTAÇÃO: Alterar Cargo no Dropdown ─────────────────────────────────────
  async function handleRoleChange(userId: string, newRole: string) {
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

  // ── MUTAÇÃO: Salvar Edição de Usuário ──────────────────────────────────────
  const handleOpenEdit = (user: UserProfile) => {
    setEditingUser(user);
    setEditFormData({
      nome: user.nome || "",
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.role || "aluno",
      plan: user.plan || "free",
      cargo: user.cargo || "",
      concurso_id: user.concurso_id || ""
    });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    setSavingEdit(true);

    try {
      const res = await fetch("/api/admin/usuarios/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: editingUser.id,
          updates: {
            nome: editFormData.nome,
            username: editFormData.username,
            email: editFormData.email,
            password: editFormData.password,
            role: editFormData.role,
            plan: editFormData.plan
          }
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao salvar alterações");
      }

      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      console.error("[AdminUsuarios] Erro ao editar usuário:", err);
      alert(`Erro ao salvar alterações: ${err.message}`);
    } finally {
      setSavingEdit(false);
    }
  };

  // ── MUTAÇÃO: Excluir Usuário ───────────────────────────────────────────────
  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    
    if (currentUser?.id === deletingUser.id) {
      alert("Você não pode excluir sua própria conta nesta tela.");
      setDeletingUser(null);
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/usuarios/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: [deletingUser.id] }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erro ao excluir");
      }

      setDeletingUser(null);
      setSelectedUsers(prev => prev.filter(id => id !== deletingUser.id));
      fetchUsers();
    } catch (err: any) {
      console.error("[AdminUsuarios] Erro ao excluir usuário:", err);
      alert(`Erro ao excluir usuário: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (selectedUsers.includes(currentUser?.id)) {
      alert("Sua própria conta não pode ser excluída em lote. Desmarque-a.");
      return;
    }
    
    if (!confirm(`Tem certeza que deseja excluir permanentemente ${selectedUsers.length} usuário(s)? Essa ação não pode ser desfeita.`)) return;

    setBulkDeleting(true);
    try {
      const res = await fetch("/api/admin/usuarios/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: selectedUsers }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao excluir usuários em lote");
      }

      setSelectedUsers([]);
      fetchUsers();
    } catch (err: any) {
      console.error("[AdminUsuarios] Erro ao excluir lote:", err);
      alert(`Erro: ${err.message}`);
    } finally {
      setBulkDeleting(false);
    }
  };

  // Filter logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !search ||
      u.nome?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.username?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  const roleCounts = {
    all: users.length,
    sysadmin: users.filter(u => u.role === 'sysadmin').length,
    admin: users.filter(u => u.role === 'admin').length,
    aluno: users.filter(u => u.role === 'aluno').length,
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'sysadmin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm">
            <Crown className="h-3 w-3" /> SYSADMIN
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm">
            <Shield className="h-3 w-3" /> ADMIN
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <User className="h-3 w-3" /> Aluno
          </span>
        );
    }
  };

  const getPlanLabel = (plan: string | null) => {
    const labels: Record<string, string> = {
      'free': 'Gratuito',
      'aprovado-medio': 'Aprovado Médio',
      'aprovado-superior': 'Aprovado Superior',
      'elite-medio': 'Elite Médio',
      'elite-superior': 'Elite Superior',
      'elite-total': '💎 Elite Total',
      'vittalis-total': '🚀 Vittalis Total',
    };
    return labels[plan || 'free'] || plan || 'Gratuito';
  };

  return (
    <div className="p-4 md:p-8 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users className="h-5 w-5" />
            </div>
            Gerenciamento de Alunos
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {users.length} usuários cadastrados · Controle de permissões, edições e acessos
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-3">
        {selectedUsers.length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 p-3 rounded-xl flex items-center justify-between">
            <span className="text-sm font-medium text-red-800 dark:text-red-300">
              {selectedUsers.length} usuário(s) selecionado(s)
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="h-8 shadow-sm flex items-center gap-1"
            >
              {bulkDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Excluir Selecionados
            </Button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, email ou username..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>

        {/* Role Filter Pills */}
        <div className="flex gap-1.5 bg-muted/50 p-1 rounded-lg border border-border">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'sysadmin', label: 'Sysadmin' },
            { key: 'admin', label: 'Admin' },
            { key: 'aluno', label: 'Alunos' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setRoleFilter(tab.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                roleFilter === tab.key
                  ? "bg-card text-foreground shadow-sm border border-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-[10px] opacity-60">
                {roleCounts[tab.key as keyof typeof roleCounts]}
              </span>
            </button>
          ))}
        </div>
      </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">
            <div className="animate-pulse flex flex-col items-center gap-2">
              <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Carregando usuários...</span>
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nenhum usuário encontrado</p>
            <p className="text-xs mt-1">Tente ajustar os filtros de busca.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-4 w-12 text-center">
                    <Checkbox
                      checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedUsers(filteredUsers.map(u => u.id));
                        else setSelectedUsers([]);
                      }}
                    />
                  </th>
                  <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Usuário</th>
                  <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cargo</th>
                  <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Plano</th>
                  <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-center">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedUsers([...selectedUsers, user.id]);
                          else setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                        }}
                      />
                    </td>
                    {/* User Identity */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                          {user.nome?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {user.nome || 'Sem nome'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate md:hidden">
                            {user.email}
                          </p>
                          {user.username && (
                            <p className="text-xs text-muted-foreground">@{user.username}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-foreground/70">{user.email}</span>
                    </td>

                    {/* Role Badge */}
                    <td className="p-4">{getRoleBadge(user.role)}</td>

                    {/* Plan */}
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{getPlanLabel(user.plan)}</span>
                    </td>

                    {/* Actions Column: Role Select + Edit + Delete */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Seletor Rápido de Cargo */}
                        <div className="relative inline-block">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="appearance-none pl-2.5 pr-6 py-1.5 border border-border bg-background rounded-lg text-xs font-medium cursor-pointer hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                            disabled={currentUser?.role !== 'sysadmin' && user.role === 'sysadmin'}
                          >
                            <option value="aluno">Aluno</option>
                            <option value="admin">Admin</option>
                            {currentUser?.role === 'sysadmin' && (
                              <option value="sysadmin">Sysadmin</option>
                            )}
                          </select>
                          <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* Botão EDITAR USUÁRIO */}
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 rounded-lg border border-border bg-card hover:bg-primary/10 hover:text-primary hover:border-primary/40 text-muted-foreground transition shadow-xs"
                          title="Editar Usuário"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>

                        {/* Botão EXCLUIR USUÁRIO */}
                        <button
                          onClick={() => setDeletingUser(user)}
                          className="p-1.5 rounded-lg border border-border bg-card hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/40 text-muted-foreground transition shadow-xs"
                          title="Excluir Usuário"
                          disabled={currentUser?.id === user.id}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination UI */}
        {!loading && filteredUsers.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
            <span className="text-sm text-muted-foreground">
              Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} a {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} de {filteredUsers.length} usuários
            </span>
            <div className="flex items-center gap-2 text-sm font-medium">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <span className="px-2 text-muted-foreground">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL: EDITAR USUÁRIO ────────────────────────────────────────────── */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="sm:max-w-3xl p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5 text-primary" /> Editar Perfil do Usuário
            </DialogTitle>
            <DialogDescription>
              Altere as informações de cadastro, cargo e plano do usuário.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-4">
            {/* Nome Completo */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nome Completo</label>
              <input
                type="text"
                value={editFormData.nome}
                onChange={(e) => setEditFormData({ ...editFormData, nome: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Ex: André Hugo"
              />
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Username</label>
              <input
                type="text"
                value={editFormData.username}
                onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="ex: andre.hugo"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="email@exemplo.com"
              />
            </div>

            {/* Profissão / Cargo */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profissão / Cargo (Opcional)</label>
              <input
                type="text"
                value={editFormData.cargo}
                onChange={(e) => setEditFormData({ ...editFormData, cargo: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Ex: Engenheiro de Software"
              />
            </div>

            {/* Concurso de Interesse */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Concurso de Interesse</label>
              <select
                value={editFormData.concurso_id}
                onChange={(e) => setEditFormData({ ...editFormData, concurso_id: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Nenhum selecionado</option>
                {concursos.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>

            {/* Role / Permissão */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Permissão no Sistema</label>
              <select
                value={editFormData.role}
                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="aluno">Aluno / Estudante</option>
                <option value="admin">Administrador (Admin)</option>
                {currentUser?.role === "sysadmin" && (
                  <option value="sysadmin">Super Administrador (SYSADMIN)</option>
                )}
              </select>
            </div>

            {/* Plano */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plano de Assinatura</label>
              <select
                value={editFormData.plan}
                onChange={(e) => setEditFormData({ ...editFormData, plan: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="free">Plano Gratuito</option>
                <option value="aprovado-medio">Aprovado Médio</option>
                <option value="aprovado-superior">Aprovado Superior</option>
                <option value="elite-medio">Elite Médio</option>
                <option value="elite-superior">Elite Superior</option>
                <option value="elite-total">💎 Elite Total</option>
                <option value="vittalis-total">🚀 Vittalis Total</option>
              </select>
            </div>

            {/* Nova Senha */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nova Senha (Opcional)</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  className="w-full h-10 pl-3 pr-10 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Deixe em branco para não alterar"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setEditingUser(null)} disabled={savingEdit}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={savingEdit}>
              {savingEdit ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
              {savingEdit ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── MODAL: CONFIRMAÇÃO DE EXCLUSÃO ───────────────────────────────────── */}
      <Dialog open={!!deletingUser} onOpenChange={(open) => !open && setDeletingUser(null)}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" /> Confirmar Exclusão de Usuário
            </DialogTitle>
            <DialogDescription>
              Esta ação removerá permanentemente o perfil do usuário do sistema.
            </DialogDescription>
          </DialogHeader>

          {deletingUser && (
            <div className="p-4 border rounded-xl bg-red-500/5 border-red-500/20 space-y-1 my-2">
              <p className="font-bold text-foreground">{deletingUser.nome || "Sem nome"}</p>
              <p className="text-xs text-muted-foreground">{deletingUser.email}</p>
              {deletingUser.username && (
                <p className="text-xs text-muted-foreground">@{deletingUser.username}</p>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setDeletingUser(null)} disabled={deleting}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteUser} disabled={deleting}>
              {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              {deleting ? "Excluindo..." : "Excluir Usuário"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
