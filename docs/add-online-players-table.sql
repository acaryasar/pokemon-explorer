-- Add online_players table to track online users
CREATE TABLE IF NOT EXISTS online_players (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE online_players ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view online players (for the online list)
CREATE POLICY "Anyone can view online players" ON online_players FOR SELECT USING (true);

-- Allow users to update their own online status
CREATE POLICY "Users can update own online status" ON online_players FOR UPSERT USING (auth.uid() = id);

-- Create index for better performance on last_seen queries
CREATE INDEX IF NOT EXISTS idx_online_players_last_seen ON online_players(last_seen);

-- Function to automatically clean up old online players (older than 10 minutes)
CREATE OR REPLACE FUNCTION cleanup_old_online_players()
RETURNS void AS $$
BEGIN
  DELETE FROM online_players
  WHERE last_seen < NOW() - INTERVAL '10 minutes';
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a trigger to call cleanup periodically (requires pg_cron extension)
-- This is optional and can be set up later if needed
