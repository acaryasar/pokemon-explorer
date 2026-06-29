-- Fix RLS policies for online_players table to allow anonymous users

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view online players" ON online_players;
DROP POLICY IF EXISTS "Users can update own online status" ON online_players;

-- Create new policies that work with anonymous users
CREATE POLICY "Anyone can view online players" ON online_players FOR SELECT USING (true);

-- Allow authenticated users to update their own status
CREATE POLICY "Users can update own online status" ON online_players 
  FOR ALL 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow anonymous users to insert/update their own status
CREATE POLICY "Anonymous users can manage own status" ON online_players 
  FOR ALL 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
