-- Check if kuzey exists in auth.users
SELECT id, email, created_at FROM auth.users WHERE email = 'kuzey@pokemon-explorer.local';

-- Check if kuzey exists in profiles
SELECT id, username FROM profiles WHERE username = 'kuzey';
