export type ActionState<T> = {
    success?: boolean;
    error?: string;
    data?: T;
};
export interface File {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
}
