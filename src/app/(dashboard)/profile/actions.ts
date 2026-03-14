'use server';

import { createClient } from '@/lib/supabase/server';
import { uploadToSupabaseStorage } from '@/lib/services/supabase-storage';

export async function uploadAvatarAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) {
            return { success: false, error: 'No file provided' };
        }

        // Realiza o upload para o Supabase Storage
        // Nota: No servidor, podemos passar o objeto File se a versão do Node/Fetch suportar, 
        // ou converter para Buffer. O utilitário uploadToSupabaseStorage usa o client.
        const result = await uploadToSupabaseStorage(file, 'avatars', 'profiles');

        if (result.success && result.url) {
            // Update profile with new avatar URL
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                await supabase
                    .from('profiles')
                    .update({ avatar_url: result.url })
                    .eq('id', user.id);

                await supabase.auth.updateUser({
                    data: { avatar_url: result.url }
                });
            }

            return { success: true, url: result.url };
        }

        return { success: false, error: result.error };

    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updatePasswordAction(current: string, newPass: string) {
    // Supabase needs the user to be signed in.
    // However, `updateUser` with password usually requires the new password.
    // Verifying the OLD password is NOT directly supported by `updateUser` (it just overwrites).
    // To verify the old password, we might need to try to signIn with it first?
    // OR we just trust the session if the user is logged in.
    // BUT for security "Change Password" usually asks for current password.
    // Supabase GoTrue doesn't have a "verifyPassword" endpoint easily exposed without signing in.

    // Strategy:
    // 1. Get current user
    // 2. Try to signInWithPassword (re-auth) to verify `current`
    // 3. If success, update to `newPass`

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        return { success: false, error: 'User not authenticated' };
    }

    // Verify current password by attempting a sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: current,
    });

    if (signInError) {
        return { success: false, error: 'Senha atual incorreta.' };
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
        password: newPass
    });

    if (updateError) {
        return { success: false, error: updateError.message };
    }

    return { success: true };
}
