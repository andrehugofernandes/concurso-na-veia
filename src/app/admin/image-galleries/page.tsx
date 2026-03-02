import { Suspense } from 'react';
// Force re-evaluation
import { LuSearch } from 'react-icons/lu';
import { ImageGalleriesPageClient } from './page-client';
import { listGalleries, getGalleryStats } from './actions';
import { TextRoll } from '@/components/core/text-roll';

interface PageProps {
    searchParams: Promise<{
        status?: string;
        search?: string;
        page?: string;
        pageSize?: string;
    }>;
}

export default async function ImageGalleriesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const search = params.search;

    return (
        <div className="space-y-6">
            {/* Header: Título + Busca */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
                        <TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Galerias</TextRoll>
                    </h1>
                </div>
                <form action="/admin/image-galleries" method="GET" className="flex gap-2 max-w-sm">
                    <div className="relative flex-1">
                        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-slate-400" />
                        <input
                            type="text"
                            name="search"
                            defaultValue={search || ''}
                            placeholder="Buscar galerias..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 
              focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white font-medium transition-colors"
                    >
                        Buscar
                    </button>
                </form>
            </div>

            <Suspense fallback={<GalleriesSkeleton />}>
                <GalleriesContentWrapper searchParams={params} />
            </Suspense>
        </div>
    );
}

async function GalleriesContentWrapper({
    searchParams,
}: {
    searchParams: {
        status?: string;
        search?: string;
        page?: string;
        pageSize?: string;
    };
}) {
    const page = parseInt(searchParams.page || '1', 10);
    const pageSize = parseInt(searchParams.pageSize || '12', 10);

    const [result, statsResult] = await Promise.all([
        listGalleries({
            page,
            search: searchParams.search,
            status: searchParams.status as 'active' | 'inactive' | 'all',
            pageSize,
        }),
        getGalleryStats(),
    ]);

    const galleriesData =
        result.status === 'success'
            ? result.data
            : { galleries: [], total: 0, page: 1, pageSize: 12, totalPages: 1, pages: 0 };
    const statsData = statsResult.status === 'success' ? statsResult.data ?? null : null;

    return (
        <ImageGalleriesPageClient
            searchParams={searchParams}
            galleriesData={galleriesData}
            statsData={statsData}
        />
    );
}

function GalleriesSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-slate-800 rounded-lg animate-pulse" />
                ))}
            </div>
            <div className="h-10 bg-slate-800 rounded-lg animate-pulse" />
            <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-slate-800 rounded-lg animate-pulse" />
                ))}
            </div>
        </div>
    );
}
