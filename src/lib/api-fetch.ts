export const authFetch = async <T>(url: string, options: any = {}): Promise<T> => {
    console.log(`[Mock Fetch] ${url}`, options);
    return {} as T;
};
