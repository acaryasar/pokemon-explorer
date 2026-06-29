-- Fix the handle_new_user function to work with anonymous users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create profile for non-anonymous users
  IF NEW.is_anonymous = false THEN
    INSERT INTO profiles (id, username, level, xp, pokeballs)
    VALUES (NEW.id, NEW.email, 1, 0, 10);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
