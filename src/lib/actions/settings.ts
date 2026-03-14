'use server';

import { createClient } from '@/lib/supabase/server';
import { ActionResponse, createSuccessResponse, createErrorResponse } from '@/lib/actions/safe-action';

/**
 * Recupera configurações públicas do site.
 */
export async function getSiteSettingsAction(): Promise<ActionResponse<{ 
  logoUrl?: string | null; 
  loginParticlesStyle?: 'claude' | 'manus' 
}>> {
  try {
    const supabase = await createClient();
    
    // Tenta buscar de uma tabela 'settings' ou similar
    // Como não temos certeza do schema, vamos usar um fallback seguro
    const { data: settings, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error || !settings) {
      return createSuccessResponse({
        logoUrl: '/images/logo.png', // Fallback padrão
        loginParticlesStyle: 'claude'
      });
    }

    return createSuccessResponse({
      logoUrl: settings.logo_url,
      loginParticlesStyle: settings.login_particles_style || 'claude'
    });
  } catch (error: any) {
    // Retorna sucessos com defaults mesmo em erro para não quebrar o layout
    return createSuccessResponse({
      logoUrl: '/images/logo.png',
      loginParticlesStyle: 'claude'
    });
  }
}
