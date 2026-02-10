export interface Category {
    id: string;
    name: string;
    description?: string;
    parentId?: string | null;
    color?: string;
    sortOrder: number;
}

export const categoriesService = {
    list: async (): Promise<Category[]> => {
        return [];
    },
    create: async (data: any) => {
        console.log('[Mock Categories] Create', data);
        return { id: 'new-id', ...data };
    },
    update: async (id: string, data: any) => {
        console.log('[Mock Categories] Update', id, data);
        return { id, ...data };
    },
    delete: async (id: string) => {
        console.log('[Mock Categories] Delete', id);
    },
    remove: async (id: string) => {
        console.log('[Mock Categories] Remove', id);
    },
    updateHierarchy: async (updates: any[]) => {
        console.log('[Mock Categories] Update Hierarchy', updates);
    }
};
