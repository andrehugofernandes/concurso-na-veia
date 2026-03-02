'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { uploadToFirebaseStorage } from '@/lib/services/firebase-storage'; // Needs implementation on client usage or server action

interface UserProfile {
    id: string;
    email: string;
    username: string; // From metadata or profile
    full_name: string; // 'nome' in profile
    role: string;      // metadata role only often
    phone?: string;    // might not exist in current schema
    job_title?: string;// 'cargo'
    nivel?: string;    // 'nivel'
    avatar_url?: string;
    plan?: string;
    xp?: number;
    cargo?: string;    // 'cargo'
}

export function useUserProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const supabase = createClient();

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
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

            if (profileError && profileError.code !== 'PGRST116') { // Ignore not found (might rely on metadata)
                console.error('Error fetching profile table:', profileError);
            }

            // Merge data
            const userProfile: UserProfile = {
                id: user.id,
                email: user.email || '',
                username: profileData?.username || user.user_metadata?.username || '',
                full_name: profileData?.nome || user.user_metadata?.full_name || user.user_metadata?.nome || '',
                role: user.user_metadata?.role || 'USER', // Role usually from metadata or specific table, not 'cargo'
                cargo: profileData?.cargo || user.user_metadata?.cargo || '',
                nivel: profileData?.nivel || user.user_metadata?.nivel || '',
                plan: profileData?.plan || user.user_metadata?.plan || 'free',
                xp: profileData?.xp || 0,
                avatar_url: profileData?.avatar_url || user.user_metadata?.avatar_url,
                // Optional fields that might be added to profiles table later
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

            // Map frontend fields back to DB fields
            // DB: nome, cargo, nivel (known from register route)

            const updates: any = {};
            if (data.full_name) updates.nome = data.full_name;
            if (data.cargo) updates.cargo = data.cargo;
            if (data.nivel) updates.nivel = data.nivel; // Assuming 'nivel' column exists

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
            if (data.cargo) metadataUpdates.cargo = data.cargo;
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

    const uploadAvatar = async (file: File) => {
        try {
            // Convert file to base64 to send to server action (since firebase-storage is server-side)
            // OR use a server action that accepts FormData.
            // Let's use the pattern of sending to a server action.

            const formData = new FormData();
            formData.append('file', file);

            // We need a server action for this. Let's create one in profile/actions.ts
            // For now, returning mock success or we can implement the server action call here.

            // Assuming we will implement `uploadAvatarAction` in `app/(dashboard)/profile/actions.ts`
            // We'll import it dynamically or pass it? 
            // Actually, let's just use the server action directly if we were in a component, 
            // but this is a hook.

            // Temporary: We will implement the action call in the component or import it here if it was a server action file.
            // But `useUserProfile` is a client hook.

            // Let's rely on the component calling the action, or import the action here.
            // I'll define the action in the next step.

            return { success: false, error: "Not implemented yet in hook" };

        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    return {
        profile,
        loading,
        error,
        updateProfile,
        uploadAvatar, // Component will handle the actual logic or we update this hook after actions.ts is ready
        refetch: fetchProfile
    };
}
