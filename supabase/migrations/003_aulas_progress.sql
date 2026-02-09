-- Migração: Tabela de progresso de leitura das aulas
-- Execute este SQL no Supabase SQL Editor

-- Tabela para armazenar progresso de leitura
CREATE TABLE IF NOT EXISTS aulas_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    materia_id TEXT NOT NULL,
    topico_id TEXT NOT NULL,
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    xp_awarded INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint para evitar duplicatas
    UNIQUE(user_id, materia_id, topico_id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_aulas_progress_user ON aulas_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_aulas_progress_materia ON aulas_progress(materia_id);
CREATE INDEX IF NOT EXISTS idx_aulas_progress_completed ON aulas_progress(completed);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_aulas_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_aulas_progress_updated_at ON aulas_progress;
CREATE TRIGGER trigger_aulas_progress_updated_at
    BEFORE UPDATE ON aulas_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_aulas_progress_updated_at();

-- RLS (Row Level Security)
ALTER TABLE aulas_progress ENABLE ROW LEVEL SECURITY;

-- Política: usuários só podem ver/editar seu próprio progresso
DROP POLICY IF EXISTS aulas_progress_select_own ON aulas_progress;
CREATE POLICY aulas_progress_select_own ON aulas_progress
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS aulas_progress_insert_own ON aulas_progress;
CREATE POLICY aulas_progress_insert_own ON aulas_progress
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS aulas_progress_update_own ON aulas_progress;
CREATE POLICY aulas_progress_update_own ON aulas_progress
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Função para concluir aula e dar XP
CREATE OR REPLACE FUNCTION complete_aula_and_award_xp(
    p_materia_id TEXT,
    p_topico_id TEXT,
    p_xp_amount INTEGER DEFAULT 50
)
RETURNS JSON AS $$
DECLARE
    v_user_id UUID;
    v_already_completed BOOLEAN;
    v_result JSON;
BEGIN
    v_user_id := auth.uid();
    
    IF v_user_id IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Not authenticated');
    END IF;
    
    -- Verificar se já completou
    SELECT completed INTO v_already_completed
    FROM aulas_progress
    WHERE user_id = v_user_id 
      AND materia_id = p_materia_id 
      AND topico_id = p_topico_id;
    
    IF v_already_completed THEN
        RETURN json_build_object('success', false, 'error', 'Already completed', 'xp_awarded', 0);
    END IF;
    
    -- Inserir ou atualizar progresso
    INSERT INTO aulas_progress (user_id, materia_id, topico_id, progress_percent, completed, completed_at, xp_awarded)
    VALUES (v_user_id, p_materia_id, p_topico_id, 100, true, NOW(), p_xp_amount)
    ON CONFLICT (user_id, materia_id, topico_id)
    DO UPDATE SET 
        progress_percent = 100,
        completed = true,
        completed_at = NOW(),
        xp_awarded = p_xp_amount;
    
    -- Atualizar XP do usuário no profile
    UPDATE profiles 
    SET xp = COALESCE(xp, 0) + p_xp_amount
    WHERE id = v_user_id;
    
    RETURN json_build_object('success', true, 'xp_awarded', p_xp_amount);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION complete_aula_and_award_xp TO authenticated;
