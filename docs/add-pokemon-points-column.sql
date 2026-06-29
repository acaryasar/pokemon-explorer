-- Add pokemon_points column to profiles table
-- Run this in Supabase SQL Editor

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS pokemon_points INTEGER DEFAULT 10000;

-- Update existing users to have 10000 points
UPDATE profiles 
SET pokemon_points = 10000 
WHERE pokemon_points IS NULL;

-- Set Kuzey's points to 100000
UPDATE profiles 
SET pokemon_points = 100000 
WHERE username = 'kuzey';
