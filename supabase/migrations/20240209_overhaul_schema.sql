-- Create Profissoes Table
CREATE TABLE IF NOT EXISTS profissoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    nivel TEXT NOT NULL CHECK (nivel IN ('tecnico', 'superior')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Materias Table
CREATE TABLE IF NOT EXISTS materias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Edital Regras Table (Linking Professions to Subjects with counts)
CREATE TABLE IF NOT EXISTS edital_regras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profissao_id UUID NOT NULL REFERENCES profissoes(id) ON DELETE CASCADE,
    materia_id UUID NOT NULL REFERENCES materias(id) ON DELETE CASCADE,
    qtd_questoes INTEGER NOT NULL DEFAULT 0,
    is_especifica BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profissoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE materias ENABLE ROW LEVEL SECURITY;
ALTER TABLE edital_regras ENABLE ROW LEVEL SECURITY;

-- Create Policies (Public Read, Admin Write)
-- Note: Assuming service_role or admin for writes, public for reads
CREATE POLICY "Public read profissoes" ON profissoes FOR SELECT USING (true);
CREATE POLICY "Public read materias" ON materias FOR SELECT USING (true);
CREATE POLICY "Public read edital_regras" ON edital_regras FOR SELECT USING (true);

-- Initial Seed Data: Técnico de Administração e Controle Júnior
DO $$
DECLARE
    prof_adm_id UUID;
    mat_port_id UUID;
    mat_mat_id UUID;
    mat_esp_adm_id UUID;
BEGIN
    -- Insert Profession
    INSERT INTO profissoes (nome, slug, nivel)
    VALUES ('Técnico de Administração e Controle Júnior', 'tecnico-administracao', 'tecnico')
    ON CONFLICT (slug) DO UPDATE SET nome = EXCLUDED.nome
    RETURNING id INTO prof_adm_id;

    -- Insert Subjects (Materias)
    INSERT INTO materias (nome, slug, descricao)
    VALUES ('Língua Portuguesa', 'lingua-portuguesa', 'Gramática, Interpretação de Texto, Oficial')
    ON CONFLICT (slug) DO UPDATE SET nome = EXCLUDED.nome
    RETURNING id INTO mat_port_id;

    INSERT INTO materias (nome, slug, descricao)
    VALUES ('Matemática', 'matematica', 'Raciocínio Lógico, Estatística, Álgebra')
    ON CONFLICT (slug) DO UPDATE SET nome = EXCLUDED.nome
    RETURNING id INTO mat_mat_id;

    INSERT INTO materias (nome, slug, descricao)
    VALUES ('Conhecimentos Específicos - Adm', 'especificas-adm', 'Administração Geral, Logística, RH, Arquivologia')
    ON CONFLICT (slug) DO UPDATE SET nome = EXCLUDED.nome
    RETURNING id INTO mat_esp_adm_id;

    -- Insert Rules (Edital 2023.2 Rules)
    -- Português: 10 questões
    INSERT INTO edital_regras (profissao_id, materia_id, qtd_questoes, is_especifica)
    VALUES (prof_adm_id, mat_port_id, 10, false);

    -- Matemática: 10 questões
    INSERT INTO edital_regras (profissao_id, materia_id, qtd_questoes, is_especifica)
    VALUES (prof_adm_id, mat_mat_id, 10, false);

    -- Específicas: 60 questões
    INSERT INTO edital_regras (profissao_id, materia_id, qtd_questoes, is_especifica)
    VALUES (prof_adm_id, mat_esp_adm_id, 60, true);

END $$;
