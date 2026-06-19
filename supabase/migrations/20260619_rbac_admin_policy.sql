-- Migration: Adiciona função para checar is_admin diretamente no Supabase Auth via RLS

-- 1. Cria uma função segura que checa a role dentro dos metadados do auth.users
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  -- Assumindo que o admin é setado na tabela profiles ou auth.users metadata
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Atualiza a tabela profiles (garantindo que ninguem pode elevar sua propria role)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own profile except role" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()) -- impede de alterar a coluna role
);

-- 3. Policy global para admin ter acesso total a qualquer tabela.
-- Para tabelas como "questoes" ou "simulados", adicione esta logica no UPDATE/DELETE:
-- CREATE POLICY "Admin can delete anything" ON public.questoes FOR DELETE USING (public.is_admin());
