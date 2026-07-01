'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
    id: string;
    email: string;
    username: string;
    full_name: string;
    role: string;
    phone?: string;
    job_title?: string;
    nivel?: string;
    avatar_url?: string;
    plan?: string;
    xp?: number;
}

interface UserContextType {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const supabase = createClient();

    const fetchProfile = useCallback(async () => {
        try {
            // Don't set loading to true on refetch to avoid flickering if we want silent updates
            // But for initial load it's fine. 
            // setProfile(prev => prev) // keep previous while loading?

            // Dev Mock Auth Bypass
            if (process.env.NODE_ENV === 'development') {
                const mockAuth = localStorage.getItem('DEV_MOCK_AUTH');
                if (mockAuth) {
                    try {
                        const parsed = JSON.parse(mockAuth);
                        setProfile({
                            id: 'dev-mock-id',
                            email: 'dev@petrobras.test',
                            username: 'dev.tester',
                            full_name: 'Tester (Dev Mode)',
                            role: 'USER',
                            job_title: parsed.cargo || 'Enfermagem do Trabalho',
                            nivel: parsed.nivel || 'Técnico',
                            plan: parsed.plan || 'premium',
                            xp: 9999
                        });
                        setLoading(false);
                        return;
                    } catch(e) {}
                }
            }

            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                // Not authenticated or error
                setProfile(null);
                setLoading(false);
                return;
            }

            // Fetch profile data from 'profiles' table
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileError && profileError.code !== 'PGRST116') {
                console.error('Error fetching profile table:', profileError);
            }

            // Merge data
            const userProfile: UserProfile = {
                id: user.id,
                email: user.email || '',
                username: profileData?.username || user.user_metadata?.username || '',
                full_name: profileData?.nome || user.user_metadata?.full_name || user.user_metadata?.nome || '',
                role: user.user_metadata?.role || 'USER',
                job_title: profileData?.cargo || user.user_metadata?.cargo || '',
                nivel: profileData?.nivel || user.user_metadata?.nivel || '',
                plan: profileData?.plan || user.user_metadata?.plan || 'free',
                xp: profileData?.xp || 0,
                avatar_url: profileData?.avatar_url || user.user_metadata?.avatar_url,
                phone: profileData?.phone,
            };

            setProfile(userProfile);
        } catch (err: any) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const updateProfile = async (data: Partial<UserProfile>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No user');

            const updates: any = {};
            if (data.full_name) updates.nome = data.full_name;
            if (data.job_title) updates.cargo = data.job_title;
            if (data.nivel) updates.nivel = data.nivel;

            // Update 'profiles' table
            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;

            // Update metadata as fallback/sync
            const metadataUpdates: any = {};
            if (data.full_name) metadataUpdates.full_name = data.full_name;
            if (data.full_name) metadataUpdates.nome = data.full_name;
            if (data.job_title) metadataUpdates.cargo = data.job_title;
            if (data.nivel) metadataUpdates.nivel = data.nivel;

            await supabase.auth.updateUser({
                data: metadataUpdates
            });

            // Refresh local state
            setProfile(prev => prev ? { ...prev, ...data } : null);

            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    return (
        <UserContext.Provider value={{ profile, loading, error, refetch: fetchProfile, updateProfile }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
