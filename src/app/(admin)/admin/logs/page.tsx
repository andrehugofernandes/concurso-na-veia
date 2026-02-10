import { Suspense } from 'react';
import { LogsPage } from '@/components/admin/logs/logs-page';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Sistema de Logs',
};

export default function Page() {
  return (
    <Suspense fallback={<LogsSkeleton />}> 
      <LogsPage />
    </Suspense>
  );
}

function LogsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-full max-w-sm" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
      <Skeleton className="h-28 w-full" />
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} className="h-24 w-full" />
      ))}
    </div>
  );
}
