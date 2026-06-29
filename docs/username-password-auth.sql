-- Username/Password Authentication Schema
-- Run this in Supabase SQL Editor

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Update profiles table to support username
ALTER TABLE profiles ALTER COLUMN username SET NOT NULL;

-- Create a custom users table for username/password
CREATE TABLE IF NOT EXISTS app_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update profiles table to reference app_users instead of auth.users
-- First, backup existing data
-- Then modify the foreign key

-- For simplicity, we'll create a new approach:
-- Use Supabase auth with email, but store username in profiles
-- Email will be username@pokemon-explorer.local for simplicity

-- Function to handle new user signup with username
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_username TEXT;
BEGIN
  -- Extract username from email (before @)
  user_username := split_part(NEW.email, '@', 1);
  
  INSERT INTO profiles (id, username, level, xp, pokeballs)
  VALUES (NEW.id, user_username, 1, 0, 10);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert default users
-- Note: These need to be created via Supabase Auth API or admin panel
-- The SQL below is for reference - actual user creation requires auth API

-- Default users to create:
-- kuzey / 202020 -> email: kuzey@pokemon-explorer.local
-- yasar / 198419 -> email: yasar@pokemon-explorer.local  
-- rüzgar / 201620 -> email: ruzgar@pokemon-explorer.local
