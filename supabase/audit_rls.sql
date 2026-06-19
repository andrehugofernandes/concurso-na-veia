-- Script de Auditoria: Identifica todas as tabelas no schema "public" que não têm RLS habilitado.
-- Para executar no painel do Supabase -> SQL Editor

SELECT 
    schemaname, 
    tablename 
FROM 
    pg_tables 
WHERE 
    schemaname = 'public' 
    AND rowsecurity = false;
