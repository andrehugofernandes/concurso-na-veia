import { useState, useEffect } from 'react';

export function useAuth() {
    // Mock auth for admin dashboard dev
    const [user, setUser] = useState<{ id: string; name: string; email: string; role: string; username: string; avatar_url?: string; full_name?: string } | null>({
        id: '1',
        name: 'Admin User',
        email: 'admin@petrobras.com',
        role: 'SYSADMIN',
        username: 'admin',
        avatar_url: 'https://github.com/shadcn.png',
        full_name: 'Admin User Full'
    });
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    return {
        user,
        isAuthenticated,
        isLoading,
        login: () => { },
        logout: () => { },
        register: () => { }
    };
}
