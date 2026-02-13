import { revalidatePath, revalidateTag } from 'next/cache';

export const cacheTags = {
  postsList: 'posts-list',
  pagesList: 'pages-list',
  mediaList: 'media-list',
  categoriesList: 'categories-list',
  dashboardSummary: 'dashboard-summary',
} as const;

export type CacheTag = (typeof cacheTags)[keyof typeof cacheTags];

export interface CacheLifeOptions {
  seconds: number;
  staleWhileRevalidateSeconds?: number;
}

export const defaultCacheLife: CacheLifeOptions = {
  seconds: 60,
  staleWhileRevalidateSeconds: 30,
};

export function invalidateTag(tag: CacheTag): void {
  revalidateTag(tag, 'max');
}

export function invalidateTags(tags: CacheTag[]): void {
  for (const tag of tags) {
    revalidateTag(tag, 'max');
  }
}

export function invalidatePath(path: string): void {
  revalidatePath(path, 'page');
}
