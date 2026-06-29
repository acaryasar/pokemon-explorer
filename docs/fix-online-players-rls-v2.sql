-- Fix RLS policies for online_players table with proper UUID casting

-- Enable RLS
ALTER TABLE online_players ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view online players" ON online_players;
DROP POLICY IF EXISTS "Users can update own online status" ON online_players;
DROP POLICY IF EXISTS "Anonymous users can manage own status" ON online_players;

-- Create new policies that work with anonymous users
CREATE POLICY "Anyone can view online players" ON online_players FOR SELECT USING (true);

-- Allow users to update their own status (works for both authenticated and anonymous)
CREATE POLICY "Users can manage own online status" ON online_players 
  FOR ALL 
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);
