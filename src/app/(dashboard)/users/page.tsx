import { Suspense } from 'react';
import { listUsers, getUserStats } from './actions';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { UsersPageClient } from './page-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    role?: string;
    search?: string;
    page?: string;
    pageSize?: string;
    orderBy?: string;
    orderDir?: string;
  }>;
}

function UsersSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-slate-800 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* Filter skeleton */}
      <div className="h-10 bg-slate-800 rounded-lg animate-pulse" />

      {/* Table skeleton */}
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-slate-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

async function UsersContentWrapper({
  role,
  search,
  page,
  pageSize,
  orderBy,
  orderDir,
}: {
  role?: string;
  search?: string;
  page: number;
  pageSize: number;
  orderBy?: string;
  orderDir?: string;
}) {
  const current = await getCurrentUser();

  const [usersResult, statsResult] = await Promise.all([
    listUsers({
      role: (role as 'admin' | 'editor' | 'viewer' | undefined) || undefined,
      search: search || undefined,
      page,
      pageSize,
      orderBy: orderBy as 'username' | 'role' | 'isActive' | 'twoFactorEnabled' | 'createdAt' | undefined,
      orderDir: orderDir as 'asc' | 'desc' | undefined,
    }),
    getUserStats(),
  ]);

  if (usersResult.status === 'error') {
    return (
      <div className="p-4 rounded-lg bg-red-500/10 text-red-400">
        Erro ao carregar usuários: {usersResult.error}
      </div>
    );
  }

  const stats = statsResult.status === 'success' && statsResult.data
    ? statsResult.data
    : { total: 0, admins: 0, editors: 0, viewers: 0 };

  return (
    <UsersPageClient
      users={usersResult.data!.users}
      total={usersResult.data!.total}
      page={usersResult.data!.page}
      pageSize={usersResult.data!.pageSize}
      _totalPages={usersResult.data!.totalPages}
      stats={stats}
      currentRole={role}
      currentSearch={search}
      currentUserId={current?.id}
      orderBy={orderBy}
      orderDir={orderDir}
    />
  );
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const role = params.role;
  const search = params.search;
  const page = parseInt(params.page || '1', 10);
  const pageSize = parseInt(params.pageSize || '10', 10);
  const orderBy = params.orderBy;
  const orderDir = params.orderDir;

  return (
    <Suspense fallback={<UsersSkeleton />}>
      <UsersContentWrapper
        role={role}
        search={search}
        page={page}
        pageSize={pageSize}
        orderBy={orderBy}
        orderDir={orderDir}
      />
    </Suspense>
  );
}
