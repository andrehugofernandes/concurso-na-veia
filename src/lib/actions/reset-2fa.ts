'use server';

// Teste mínimo - Action que só retorna sucesso
export async function reset2FAAction(): Promise<{ success: boolean; error?: string }> {
  console.log('[RESET_2FA_TEST] Action foi chamada com sucesso no servidor!');
  return { success: true };
}
