import { listBackupPolicies } from '@/app/admin/backups/actions';
import { BackupPageClient } from '@/app/admin/backups/backups-page-client';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function BackupsPage() {
  const policiesResult = await listBackupPolicies();

  return (
    <BackupPageClient
      initialPolicies={policiesResult.status === 'success' ? policiesResult.data?.policies : undefined}
    />
  );
}
