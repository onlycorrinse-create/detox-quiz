-- Запустить в Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- Создаём таблицу результатов квиза
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  answers JSONB NOT NULL,
  selected_count INTEGER NOT NULL,
  result_level TEXT NOT NULL CHECK (result_level IN ('low', 'medium', 'high'))
);

-- Индекс для быстрых запросов по уровню и дате
CREATE INDEX idx_quiz_results_level ON quiz_results (result_level);
CREATE INDEX idx_quiz_results_created ON quiz_results (created_at DESC);

-- Row Level Security: разрешаем INSERT всем (анонимный ключ)
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON quiz_results
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Чтение только с service_role ключом (для аналитики в будущем)
CREATE POLICY "Allow service role reads"
  ON quiz_results
  FOR SELECT
  TO service_role
  USING (true);

-- Пример запроса аналитики:
-- SELECT result_level, COUNT(*) as count, AVG(selected_count) as avg_score
-- FROM quiz_results
-- GROUP BY result_level;
