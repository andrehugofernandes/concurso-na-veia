-- Migration: Suporte a múltiplos concursos (Vitrine)
-- Cria a tabela de concursos, vincula as profissões/cargos e atualiza o trigger de criação de usuário

-- 1. Criar tabela de concursos
CREATE TABLE IF NOT EXISTS public.concursos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    orgao TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para concursos
ALTER TABLE public.concursos ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública para concursos
CREATE POLICY "Public read concursos" ON public.concursos FOR SELECT USING (true);

-- 2. Inserir concursos base
INSERT INTO public.concursos (nome, slug, orgao) VALUES
('Petrobras', 'petrobras', 'Petrobras'),
('Caixa Econômica Federal', 'caixa', 'CEF'),
('Banco do Brasil', 'bb', 'BB'),
('Correios', 'correios', 'ECT'),
('Instituto Brasileiro de Geografia e Estatística', 'ibge', 'IBGE'),
('Instituto Nacional do Seguro Social', 'inss', 'INSS')
ON CONFLICT (slug) DO UPDATE SET 
  nome = EXCLUDED.nome,
  orgao = EXCLUDED.orgao;

-- 3. Modificar tabela profissoes para vincular a concurso
ALTER TABLE public.profissoes ADD COLUMN IF NOT EXISTS concurso_id UUID REFERENCES public.concursos(id) ON DELETE CASCADE;

-- 4. Modificar tabela profiles para referenciar concurso
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS concurso_id UUID REFERENCES public.concursos(id) ON DELETE SET NULL;

-- 5. Vincular as profissões da Petrobras existentes ao concurso da Petrobras
DO $$
DECLARE
    petrobras_id UUID;
BEGIN
    SELECT id INTO petrobras_id FROM public.concursos WHERE slug = 'petrobras';
    IF petrobras_id IS NOT NULL THEN
        UPDATE public.profissoes 
        SET concurso_id = petrobras_id 
        WHERE concurso_id IS NULL;
    END IF;
END $$;

-- 6. Inserir as novas profissões associadas aos seus concursos
DO $$
DECLARE
    caixa_id UUID;
    bb_id UUID;
    correios_id UUID;
    ibge_id UUID;
    inss_id UUID;
BEGIN
    SELECT id INTO caixa_id FROM public.concursos WHERE slug = 'caixa';
    SELECT id INTO bb_id FROM public.concursos WHERE slug = 'bb';
    SELECT id INTO correios_id FROM public.concursos WHERE slug = 'correios';
    SELECT id INTO ibge_id FROM public.concursos WHERE slug = 'ibge';
    SELECT id INTO inss_id FROM public.concursos WHERE slug = 'inss';

    -- Caixa Técnico Bancário
    IF caixa_id IS NOT NULL THEN
        INSERT INTO public.profissoes (nome, slug, nivel, concurso_id)
        VALUES ('Técnico Bancário', 'caixa-tecnico', 'tecnico', caixa_id)
        ON CONFLICT (slug) DO UPDATE SET 
            nome = EXCLUDED.nome,
            concurso_id = EXCLUDED.concurso_id;
    END IF;

    -- BB Escriturário
    IF bb_id IS NOT NULL THEN
        INSERT INTO public.profissoes (nome, slug, nivel, concurso_id)
        VALUES ('Escriturário', 'bb-escriturario', 'tecnico', bb_id)
        ON CONFLICT (slug) DO UPDATE SET 
            nome = EXCLUDED.nome,
            concurso_id = EXCLUDED.concurso_id;
    END IF;

    -- Correios Agente de Correios
    IF correios_id IS NOT NULL THEN
        INSERT INTO public.profissoes (nome, slug, nivel, concurso_id)
        VALUES ('Agente de Correios', 'correios-agente', 'tecnico', correios_id)
        ON CONFLICT (slug) DO UPDATE SET 
            nome = EXCLUDED.nome,
            concurso_id = EXCLUDED.concurso_id;
    END IF;

    -- IBGE Recenseador/Agente
    IF ibge_id IS NOT NULL THEN
        INSERT INTO public.profissoes (nome, slug, nivel, concurso_id)
        VALUES ('Recenseador/Agente', 'ibge-recenseador', 'tecnico', ibge_id)
        ON CONFLICT (slug) DO UPDATE SET 
            nome = EXCLUDED.nome,
            concurso_id = EXCLUDED.concurso_id;
    END IF;

    -- INSS Técnico do Seguro Social
    IF inss_id IS NOT NULL THEN
        INSERT INTO public.profissoes (nome, slug, nivel, concurso_id)
        VALUES ('Técnico do Seguro Social', 'inss-tecnico', 'tecnico', inss_id)
        ON CONFLICT (slug) DO UPDATE SET 
            nome = EXCLUDED.nome,
            concurso_id = EXCLUDED.concurso_id;
    END IF;

END $$;

-- 7. Atualizar a trigger function handle_new_user() para persistir nivel, cargo, plano e concurso_id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    concurso_id_var UUID;
BEGIN
    -- Obter concurso_id pelo slug contido na metadata (com fallback para 'petrobras')
    SELECT id INTO concurso_id_var
    FROM public.concursos
    WHERE slug = COALESCE(NEW.raw_user_meta_data->>'concurso', 'petrobras')
    LIMIT 1;

    INSERT INTO public.profiles (
        id, 
        nome, 
        email, 
        nivel, 
        cargo, 
        plan, 
        concurso_id
    )
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'nome', 'Usuário'), 
        NEW.email,
        NEW.raw_user_meta_data->>'nivel',
        NEW.raw_user_meta_data->>'cargo',
        COALESCE(NEW.raw_user_meta_data->>'plan', 'free'),
        concurso_id_var
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
