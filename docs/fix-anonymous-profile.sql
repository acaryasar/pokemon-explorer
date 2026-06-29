-- Fix to create profiles for anonymous users
-- This ensures anonymous users can catch pokemon and have their data tracked

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile for all users (including anonymous)
  -- For anonymous users, use a default username
  IF NEW.is_anonymous = true THEN
    INSERT INTO profiles (id, username, level, xp, pokeballs)
    VALUES (NEW.id, 'Anonymous_' || left(NEW.id::text, 8), 1, 0, 10);
  ELSE
    INSERT INTO profiles (id, username, level, xp, pokeballs)
    VALUES (NEW.id, COALESCE(NEW.email, 'User_' || left(NEW.id::text, 8)), 1, 0, 10);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Also update the existing trigger if needed
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
