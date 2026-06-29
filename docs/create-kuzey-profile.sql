-- Create kuzey's profile manually
INSERT INTO profiles (id, username, level, xp, pokeballs)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'kuzey@pokemon-explorer.local'),
  'kuzey',
  1,
  0,
  50
ON CONFLICT (id) DO UPDATE SET
  username = 'kuzey',
  pokeballs = 50;
