"use client";

import { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit3, Power, Trash2, Users as UsersIcon } from "lucide-react";
import Image from "next/image";
import { authFetch } from "@/lib/api-fetch";
import { useAuth } from "@/hooks/useAuth";
import type { UserListItem, UserRole } from "@/types/user.type";
import { UserForm } from "@/components/admin/forms/user-form";
import { UserEditForm } from "@/components/admin/forms/user-edit-form";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconBadge } from "@/components/ui/icon-badge";

export type UsersPageHandle = { openCreate: () => void };

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type UsersPageProps = {};

type UsersStats = {
  total: number;
  ativos: number;
  inativos: number;
  porFuncao: { ADMIN: number; COORDENADOR: number; USER: number };
  criadosNoMes?: number;
};

const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case "SYSADMIN":
      return { text: "SYSADMIN", className: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" };
    case "ADMIN":
      return { text: "ADMIN", className: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" };
    case "COORDENADOR":
      return { text: "COORDENADOR", className: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" };
    case "USER":
    default:
      return { text: "USUÁRIO", className: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" };
  }
};

const getTwoFactorStatus = (twoFactorEnabled: boolean) => {
  return twoFactorEnabled 
    ? { text: "ATIVO", className: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" }
    : { text: "INATIVO", className: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300" };
};

const getUserInitials = (name: string) => {
  const names = name.trim().split(' ');
  if (names.length === 0) return '';
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  
  const firstName = names[0];
  const lastName = names[names.length - 1];
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

/**
 * Abrevia nomes para lista de usuários em telas < 1566px
 * Regras:
 * - < 4 nomes: mantém todos
 * - 4 nomes: abrevia somente o 3º (antepenúltimo considerando o bloco final)
 * - 5+ nomes: abrevia os dois anteriores ao(s) último(s) sobrenome(s)
 * - Considera blocos de sobrenome composto: De/Da/Do/Dos/Das ficam junto ao último sobrenome
 */
const formatDisplayName = (name: string) => {
  if (!name) return name;
  const tokens = name.split(' ').filter(Boolean);
  if (tokens.length === 0) return name;

  const PREPS = new Set(['de', 'da', 'do', 'dos', 'das', 'De', 'Da', 'Do', 'Dos', 'Das']);
  const n = tokens.length;
  const tailCount = n >= 2 && PREPS.has(tokens[n - 2]) ? 2 : 1;

  const head = tokens.slice(0, n - tailCount);
  const tail = tokens.slice(n - tailCount); // último sobrenome (e prep, se houver)

  // headLen representa os nomes antes do bloco final (sobrenome)
  const headLen = head.length;
  if (headLen < 3) {
    // Menos de 3 nomes antes do sobrenome: mantém tudo (total < 4 nomes efetivos)
    return tokens.join(' ');
  }

  const resultHead = [...head];
  const abbreviate = (s: string) => (s ? `${s.charAt(0)}.` : s);

  if (headLen === 3) {
    // 4 nomes efetivos: abrevia apenas o último do head
    resultHead[headLen - 1] = abbreviate(resultHead[headLen - 1]);
  } else {
    // 5+ nomes efetivos: abrevia os dois últimos do head
    resultHead[headLen - 1] = abbreviate(resultHead[headLen - 1]);
    resultHead[headLen - 2] = abbreviate(resultHead[headLen - 2]);
  }

  return [...resultHead, ...tail].join(' ');
};

export const UsersPage = forwardRef<UsersPageHandle, UsersPageProps>(function UsersPage(_props: UsersPageProps, ref) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [items, setItems] = useState<UserListItem[]>([]);
  const [q, setQ] = useState("");
  const [role, setRole] = useState<UserRole | "ALL">("ALL");
  const [status, setStatus] = useState<"ALL" | "ATIVO" | "INATIVO">("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<UsersStats | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<UserListItem | null>(null);
  const [shouldAbbreviate, setShouldAbbreviate] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  
  // Verificar se o usuário é admin, coordenador ou sysadmin
  const isSysadmin = user?.role === 'SYSADMIN';
  const isAdmin = user?.role === 'ADMIN' || isSysadmin;
  const isCoordenador = user?.role === 'COORDENADOR';

  // Detectar largura da tela para abreviar nomes
  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;
      setShouldAbbreviate(width < 1566);
      setIsCompactLayout(width <= 1366);
    };
    
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(pageSize));
      if (q) params.set("search", q);
      if (role !== "ALL") params.set("role", role);
      if (status !== "ALL") params.set("status", status);
      const data = await authFetch<{ items: UserListItem[]; total: number }>(`/api/users?${params.toString()}`, { cache: "no-store" });
      console.log('[UsersPage] 📥 Dados recebidos da API:', data.items.map(u => ({ username: u.username, role: u.role })));
      setItems(data.items);
      setTotal(data.total ?? 0);
      try {
        const s = await authFetch<UsersStats>("/api/users/stats", { cache: "no-store" });
        setStats(s);
      } catch {}
    } catch (err) {
      console.error("[UsersPage] load error:", err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, q, role, status]);

  useEffect(() => { load(); }, [load]);

  useImperativeHandle(ref, () => ({
    openCreate: () => {
      // Apenas SYSADMIN pode criar usuários manualmente
      if (user?.role !== 'SYSADMIN') {
        window.alert("Criação manual de usuários desabilitada. Usuários são criados automaticamente via Active Directory.");
        return;
      }
      setOpenCreate(true);
    },
  }), [user]);

  const filtered = items; // backend já filtra

  const handleCreated = (user: UserListItem) => {
    setItems((prev) => [user, ...prev]);
  };

  const handleOpenEdit = (u: UserListItem) => {
    if (!isAdmin && !isCoordenador) {
      window.alert("Apenas administradores e coordenadores podem editar usuários.");
      return;
    }
    setSelected(u);
    setOpenEdit(true);
  };
  const handleUpdated = (u: UserListItem) => {
    setItems(prev => prev.map(x => x.id === u.id ? { ...x, ...u } : x));
    // Atualiza métricas rapidamente sem bloquear
    (async () => {
      try { const s = await authFetch<UsersStats>("/api/users/stats", { cache: "no-store" }); setStats(s); } catch {}
    })();
  };
  const handleToggleStatus = async (u: UserListItem) => {
    if (!isAdmin && !isCoordenador) {
      window.alert("Apenas administradores e coordenadores podem ativar/desativar usuários.");
      return;
    }
    const displayName = u.full_name || u.name;
    const action = u.active ? 'desativar' : 'ativar';
    const ok = window.confirm(`Deseja ${action} o usuário "${displayName}"?`);
    if (!ok) return;
    try {
      const response = await authFetch<{ user: UserListItem }>(`/api/users/${u.id}/status`, { method: 'PATCH' });
      setItems(prev => prev.map(x => x.id === u.id ? response.user : x));
      // Recarrega total/metrics
      try {
        const refreshedStats = await authFetch<UsersStats>("/api/users/stats", { cache: "no-store" });
        setStats(refreshedStats);
      } catch {}
    } catch (err) {
      console.error('[UsersPage] toggle status error:', err);
      window.alert('Erro ao atualizar status do usuário');
    }
  };

  return (
    <div className="space-y-6">

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="orange"><UsersIcon className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Usuários</p>
                <p className="text-2xl font-bold">{stats?.total ?? filtered.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="green"><UsersIcon className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ativos</p>
                <p className="text-2xl font-bold">{stats?.ativos ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="purple"><UsersIcon className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inativos</p>
                <p className="text-2xl font-bold">{stats?.inativos ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="blue"><UsersIcon className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
                <p className="text-2xl font-bold">{stats?.porFuncao?.ADMIN ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="green"><UsersIcon className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Coordenadores</p>
                <p className="text-2xl font-bold">{stats?.porFuncao?.COORDENADOR ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="orange"><UsersIcon className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Usuários</p>
                <p className="text-2xl font-bold">{stats?.porFuncao?.USER ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="blue"><UsersIcon className="h-5 w-5" /></IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Criados no mês</p>
                <p className="text-2xl font-bold">{stats?.criadosNoMes ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in-up">
        <CardHeader>
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-[var(--primary)]" />
              <CardTitle className="text-lg font-semibold">Lista de Usuários</CardTitle>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Gerencie os usuários do sistema</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Buscar usuários..." value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} aria-label="Buscar usuários" />
            <Select value={role} onValueChange={(v) => setRole(v as UserRole | "ALL")}>
              <SelectTrigger
                className="bg-white text-gray-900 border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                aria-label="Filtrar por função"
              >
                <SelectValue placeholder="Função" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectItem value="ALL" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Todos</SelectItem>
                <SelectItem value="SYSADMIN" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Sysadmin</SelectItem>
                <SelectItem value="ADMIN" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Admin</SelectItem>
                <SelectItem value="COORDENADOR" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Coordenador</SelectItem>
                <SelectItem value="USER" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Usuário</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(v) => setStatus(v as "ALL" | "ATIVO" | "INATIVO")}>
              <SelectTrigger
                className="bg-white text-gray-900 border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                aria-label="Filtrar por status"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <SelectItem value="ALL" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Todos</SelectItem>
                <SelectItem value="ATIVO" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Ativo</SelectItem>
                <SelectItem value="INATIVO" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">Inativo</SelectItem>
              </SelectContent>
            </Select>
            <div className="hidden md:block" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-gray-500">Carregando...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableHead className="text-gray-600 dark:text-gray-400 font-medium">Nome</TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400 font-medium">
                        {isCompactLayout ? "Usuário / Email" : "Usuário"}
                      </TableHead>
                      {!isCompactLayout && (
                        <TableHead className="text-gray-600 dark:text-gray-400 font-medium">Email</TableHead>
                      )}
                      <TableHead className="text-gray-600 dark:text-gray-400 font-medium">Função</TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400 font-medium">Status</TableHead>
                      <TableHead className="text-gray-600 dark:text-gray-400 font-medium">2FA</TableHead>
                      <TableHead className="text-right text-gray-600 dark:text-gray-400 font-medium">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((u) => {
                      const roleBadge = getRoleBadge(u.role);
                      const twoFactorStatus = getTwoFactorStatus(u.twoFactorEnabled !== false);
                      const displayName = u.full_name || u.name;
                      const initials = getUserInitials(displayName);
                      const avatarColor = getAvatarColor(displayName);
                      // Aplicar abreviatura apenas em telas < 1566px
                      const formattedName = shouldAbbreviate ? formatDisplayName(displayName) : displayName;
                      
                      return (
                        <TableRow 
                          key={u.id} 
                          className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="rounded-full border-2 border-[var(--primary)]">
                                  {u.avatar_url ? (
                                    <Image 
                                      src={u.avatar_url}
                                      alt={displayName}
                                      width={40}
                                      height={40}
                                      className="rounded-full object-cover aspect-square"
                                    />
                                  ) : (
                                    <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white text-base font-medium aspect-square`}>
                                      {initials}
                                    </div>
                                  )}
                                </div>
                                {/* Indicador de Status */}
                                {(() => {
                                  if (!u.lastSeenAt) {
                                    // Nunca logou - bolinha cinza
                                    return (
                                      <div 
                                        className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-gray-800 rounded-full"
                                        title="Offline"
                                      />
                                    );
                                  }
                                  
                                  const lastSeen = new Date(u.lastSeenAt);
                                  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
                                  const isOnline = lastSeen >= fiveMinutesAgo;
                                  
                                  return (
                                    <div 
                                      className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-gray-800 rounded-full ${
                                        isOnline 
                                          ? 'bg-green-500' 
                                          : 'bg-gray-400 dark:bg-gray-500'
                                      }`}
                                      title={isOnline ? 'Online' : 'Offline'}
                                    />
                                  );
                                })()}
                              </div>
                              <div>
                                <div 
                                  className="font-medium text-gray-900 dark:text-white"
                                  title={displayName} // Tooltip com nome completo
                                >
                                  {formattedName}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">
                            {isCompactLayout ? (
                              <div className="flex flex-col items-start justify-center text-left">
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{u.username}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{u.email}</span>
                              </div>
                            ) : (
                              u.username
                            )}
                          </TableCell>
                          {!isCompactLayout && (
                            <TableCell className="text-gray-600 dark:text-gray-400">
                              {u.email}
                            </TableCell>
                          )}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={roleBadge.className}>
                                {roleBadge.text}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={u.active ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"}>
                              {u.active ? "ATIVO" : "INATIVO"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={twoFactorStatus.className}>
                              {twoFactorStatus.text}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {(isAdmin || isCoordenador) && (
                              <div className="flex items-center justify-end gap-2">
                                {/* Botão Editar */}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10"
                                        onClick={() => handleOpenEdit(u)}
                                        aria-label={`Editar ${u.name}`}
                                      >
                                        <Edit3 className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[var(--primary)] text-white border-none">Editar</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                {/* Botão Ativar/Desativar */}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className={u.active ? "border-gray-200 dark:border-gray-600 text-orange-600 hover:bg-orange-100" : "border-gray-200 dark:border-gray-600 text-green-600 hover:bg-green-100"}
                                        aria-label={u.active ? `Desativar ${u.name}` : `Ativar ${u.name}`}
                                        onClick={() => handleToggleStatus(u)}
                                      >
                                        <Power className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[var(--primary)] text-white border-none">
                                      {u.active ? "Desativar" : "Ativar"}
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                {/* Botão Deletar (apenas para usuários de teste e SYSADMIN) */}
                                {isSysadmin && u.isTestUser && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="border-gray-200 dark:border-gray-600 text-red-600 hover:bg-red-100"
                                          aria-label={`Deletar ${u.name}`}
                                          onClick={async () => {
                                            const displayName = u.full_name || u.name;
                                            const ok = window.confirm(`Tem certeza que deseja deletar o usuário de teste "${displayName}"?\n\nEsta ação não pode ser desfeita.`);
                                            if (!ok) return;
                                            try {
                                              await authFetch(`/api/users/${u.id}`, { method: 'DELETE' });
                                              setItems(prev => prev.filter(x => x.id !== u.id));
                                              window.alert('Usuário de teste deletado com sucesso!');
                                            } catch (err) {
                                              console.error('[UsersPage] delete error:', err);
                                              window.alert('Erro ao deletar usuário de teste');
                                            }
                                          }}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-red-600 text-white border-none">Deletar Usuário de Teste</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {filtered.length === 0 && (
                  <div className="text-center text-sm text-gray-500 py-6 border border-dashed rounded-md">Nenhum usuário encontrado.</div>
                )}
              </div>
              <div className="mt-6">
                <PaginationControls
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={setPage}
                  onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <UserForm open={openCreate} onClose={() => setOpenCreate(false)} onCreated={handleCreated} />
      <UserEditForm open={openEdit} user={selected} onClose={() => setOpenEdit(false)} onUpdated={handleUpdated} />
    </div>
  );
});
