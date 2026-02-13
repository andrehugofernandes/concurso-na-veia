/**
 * Página raiz do dashboard administrativo
 */
export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-8">Bem-vindo ao painel administrativo</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="/admin/categories"
          className="block rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg dark:shadow-none p-4 transition-shadow hover:shadow-xl"
        >
          <h2 className="font-semibold text-gray-900 dark:text-slate-100">Categorias</h2>
          <p className="text-sm text-gray-600 dark:text-slate-400">Gerenciar categorias</p>
        </a>

        <a
          href="/admin/audit-logs"
          className="block rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg dark:shadow-none p-4 transition-shadow hover:shadow-xl"
        >
          <h2 className="font-semibold text-gray-900 dark:text-slate-100">Auditoria</h2>
          <p className="text-sm text-gray-600 dark:text-slate-400">Visualizar logs</p>
        </a>

        <a
          href="/admin/backups"
          className="block rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg dark:shadow-none p-4 transition-shadow hover:shadow-xl"
        >
          <h2 className="font-semibold text-gray-900 dark:text-slate-100">Backups</h2>
          <p className="text-sm text-gray-600 dark:text-slate-400">Gerenciar backups</p>
        </a>
      </div>
    </div>
  );
}
