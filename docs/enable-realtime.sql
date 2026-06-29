-- Enable Realtime for online_players table
-- This is required for the subscription to work

ALTER PUBLICATION supabase_realtime ADD TABLE online_players;

-- Verify the publication
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
