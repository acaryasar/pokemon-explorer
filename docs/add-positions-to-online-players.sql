-- Add position columns to online_players table
ALTER TABLE online_players ADD COLUMN IF NOT EXISTS x INTEGER DEFAULT 0;
ALTER TABLE online_players ADD COLUMN IF NOT EXISTS y INTEGER DEFAULT 0;

-- Update RLS policy to allow updating position
DROP POLICY IF EXISTS "Users can manage own online status" ON online_players;

CREATE POLICY "Users can manage own online status" ON online_players 
  FOR ALL 
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);
