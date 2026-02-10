export type UserRole = 'ADMIN' | 'COORDENADOR' | 'USER';

export interface UserListItem {
    id: string;
    name: string;
    email: string;
    username: string;
    role: UserRole;
    status: 'Ativo' | 'Inativo' | 'Pendente';
    createdAt: string;
}
