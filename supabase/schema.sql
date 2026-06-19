-- Petrobras Quest AI - Schema do Banco de Dados (Supabase)
-- Execute este script no SQL Editor do Supabase

-- ============================================
-- EXTENSÕES
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA: concursos
-- ============================================
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

-- ============================================
-- TABELA: users (estende auth.users do Supabase)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  nivel TEXT CHECK (nivel IN ('medio', 'superior')),
  cargo TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'aprovado-medio', 'aprovado-superior', 'elite-medio', 'elite-superior', 'elite-total')),
  xp INTEGER DEFAULT 0,
  nivel_jogador TEXT DEFAULT 'Estagiário',
  questoes_certas INTEGER DEFAULT 0,
  questoes_erradas INTEGER DEFAULT 0,
  sequencia_atual INTEGER DEFAULT 0,
  maior_sequencia INTEGER DEFAULT 0,
  conquistas TEXT[] DEFAULT '{}',
  questoes_geradas INTEGER DEFAULT 0,
  concurso_id UUID REFERENCES public.concursos(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: cargos
-- ============================================
CREATE TABLE IF NOT EXISTS public.cargos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nivel TEXT NOT NULL CHECK (nivel IN ('medio', 'superior')),
  nome TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  descricao TEXT,
  materias_basicas TEXT[] NOT NULL,
  materias_especificas TEXT[] NOT NULL,
  concurso_id UUID REFERENCES public.concursos(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: materias
-- ============================================
CREATE TABLE IF NOT EXISTS public.materias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  descricao TEXT,
  topicos TEXT[] DEFAULT '{}',
  peso INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: questoes (questões geradas salvas)
-- ============================================
CREATE TABLE IF NOT EXISTS public.questoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  materia TEXT NOT NULL,
  assunto TEXT NOT NULL,
  enunciado TEXT NOT NULL,
  alternativas TEXT[] NOT NULL,
  correta INTEGER NOT NULL,
  explicacao TEXT,
  dificuldade TEXT CHECK (dificuldade IN ('Fácil', 'Média', 'Difícil')),
  banca TEXT DEFAULT 'CESGRANRIO',
  gerada_por_ia BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: respostas (histórico de respostas)
-- ============================================
CREATE TABLE IF NOT EXISTS public.respostas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  questao_id UUID REFERENCES public.questoes(id) ON DELETE CASCADE,
  selecionada INTEGER NOT NULL,
  correta BOOLEAN NOT NULL,
  tempo_segundos INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: simulados
-- ============================================
CREATE TABLE IF NOT EXISTS public.simulados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  total_questoes INTEGER NOT NULL,
  acertos INTEGER DEFAULT 0,
  erros INTEGER DEFAULT 0,
  percentual INTEGER DEFAULT 0,
  tempo_segundos INTEGER,
  xp_ganho INTEGER DEFAULT 0,
  concluido BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  finished_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- TABELA: planos_estudo
-- ============================================
CREATE TABLE IF NOT EXISTS public.planos_estudo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cargo_id UUID REFERENCES public.cargos(id),
  semanas INTEGER DEFAULT 4,
  cronograma JSONB,
  progresso JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABELA: subscriptions (assinaturas)
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'aprovado-medio', 'aprovado-superior', 'elite-medio', 'elite-superior', 'elite-total')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'cancelled', 'expired', 'incomplete')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DADOS INICIAIS: Cargos Nível Médio
-- ============================================
INSERT INTO public.cargos (nivel, nome, slug, materias_basicas, materias_especificas) VALUES
('medio', 'Técnico de Operação', 'operacao', 
  ARRAY['Língua Portuguesa', 'Matemática'],
  ARRAY['Física', 'Química', 'Processos de Refino', 'SMS', 'Instrumentação']),
('medio', 'Manutenção Mecânica', 'manutencao-mecanica', 
  ARRAY['Língua Portuguesa', 'Matemática'],
  ARRAY['Metrologia', 'Elementos de Máquinas', 'Desenho Técnico', 'Resistência dos Materiais', 'Hidráulica e Pneumática']),
('medio', 'Manutenção Elétrica', 'manutencao-eletrica', 
  ARRAY['Língua Portuguesa', 'Matemática'],
  ARRAY['Circuitos Elétricos', 'Máquinas Elétricas', 'Instalações Industriais', 'Comandos Elétricos', 'NR-10']),
('medio', 'Manutenção Instrumentação', 'manutencao-instrumentacao', 
  ARRAY['Língua Portuguesa', 'Matemática'],
  ARRAY['Calibração', 'Válvulas de Controle', 'Norma ISA 5.1', 'Medição de Grandezas', 'Automação Industrial']),
('medio', 'Segurança do Trabalho', 'seguranca', 
  ARRAY['Língua Portuguesa', 'Matemática'],
  ARRAY['NRs', 'EPIs e EPCs', 'Análise de Riscos', 'CIPA', 'Primeiros Socorros']),
('medio', 'Suprimentos/Administração', 'administracao', 
  ARRAY['Língua Portuguesa', 'Matemática'],
  ARRAY['Gestão de Estoques', 'Logística', 'Lei 13.303/16', 'Licitações', 'Contabilidade Básica']),
('medio', 'Logística de Transportes', 'logistica', 
  ARRAY['Língua Portuguesa', 'Matemática'],
  ARRAY['Logística', 'Transporte', 'Controle de Operações', 'Gestão de Frota']),
('medio', 'Química de Petróleo', 'quimica', 
  ARRAY['Língua Portuguesa', 'Matemática'],
  ARRAY['Química Orgânica', 'Química Inorgânica', 'Análises Laboratoriais', 'Petroquímica']);

-- ============================================
-- DADOS INICIAIS: Cargos Nível Superior
-- ============================================
INSERT INTO public.cargos (nivel, nome, slug, materias_basicas, materias_especificas) VALUES
('superior', 'Engenheiro de Petróleo', 'eng-petroleo', 
  ARRAY['Língua Portuguesa', 'Língua Inglesa'],
  ARRAY['Geologia do Petróleo', 'Reservatórios', 'Perfuração', 'Completação', 'Produção']),
('superior', 'Engenheiro Mecânico', 'eng-mecanico', 
  ARRAY['Língua Portuguesa', 'Língua Inglesa'],
  ARRAY['Resistência dos Materiais', 'Termodinâmica', 'Máquinas Térmicas', 'Mecânica dos Fluidos']),
('superior', 'Engenheiro Elétrico', 'eng-eletrico', 
  ARRAY['Língua Portuguesa', 'Língua Inglesa'],
  ARRAY['Circuitos', 'Máquinas Elétricas', 'Sistemas de Potência', 'Eletrônica']),
('superior', 'Engenheiro Civil', 'eng-civil', 
  ARRAY['Língua Portuguesa', 'Língua Inglesa'],
  ARRAY['Estruturas', 'Fundações', 'Materiais de Construção', 'Geotecnia']),
('superior', 'Analista de Sistemas', 'analista-sistemas', 
  ARRAY['Língua Portuguesa', 'Língua Inglesa'],
  ARRAY['Desenvolvimento de Software', 'Banco de Dados', 'Engenharia de Software', 'Redes']),
('superior', 'Analista de Administração', 'analista-admin', 
  ARRAY['Língua Portuguesa', 'Língua Inglesa'],
  ARRAY['Estratégia Empresarial', 'RH', 'Finanças', 'Marketing', 'Processos']),
('superior', 'Geólogo', 'geologo', 
  ARRAY['Língua Portuguesa', 'Língua Inglesa'],
  ARRAY['Geologia do Petróleo', 'Geofísica', 'Interpretação Sísmica', 'Estratigrafia']),
('superior', 'Economista', 'economista', 
  ARRAY['Língua Portuguesa', 'Língua Inglesa'],
  ARRAY['Microeconomia', 'Macroeconomia', 'Economia do Petróleo', 'Estatística']);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planos_estudo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para questões
CREATE POLICY "Users can read own questions" ON public.questoes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own questions" ON public.questoes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para respostas
CREATE POLICY "Users can read own answers" ON public.respostas
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own answers" ON public.respostas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para simulados
CREATE POLICY "Users can read own simulados" ON public.simulados
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own simulados" ON public.simulados
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own simulados" ON public.simulados
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para planos de estudo
CREATE POLICY "Users can read own study plans" ON public.planos_estudo
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own study plans" ON public.planos_estudo
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own study plans" ON public.planos_estudo
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para subscriptions
CREATE POLICY "Users can read own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Cargos são públicos (somente leitura)
CREATE POLICY "Anyone can read cargos" ON public.cargos
  FOR SELECT USING (true);

-- Materias são públicas (somente leitura)
CREATE POLICY "Anyone can read materias" ON public.materias
  FOR SELECT USING (true);

-- ============================================
-- FUNÇÕES E TRIGGERS
-- ============================================

-- Função para criar perfil automaticamente após signup
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

-- Trigger para criar perfil após signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_planos_updated_at
  BEFORE UPDATE ON public.planos_estudo
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
