export default function DashboardLoading() {
  return (
    <div className="space-y-12 w-full px-2">
      <div>
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="lg:col-span-4 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
