-- Pokemon Explorer Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  pokeballs INTEGER DEFAULT 10,
  avatar JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pokemon caught table
CREATE TABLE pokemon_caught (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  pokemon_id INTEGER NOT NULL,
  nickname TEXT,
  level INTEGER DEFAULT 1,
  rarity TEXT NOT NULL,
  caught_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, pokemon_id)
);

-- Player positions table
CREATE TABLE player_positions (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  x INTEGER DEFAULT 0,
  y INTEGER DEFAULT 0,
  last_moved TIMESTAMPTZ DEFAULT NOW()
);

-- Friends table
CREATE TABLE friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

-- Trades table
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  from_pokemon_id UUID REFERENCES pokemon_caught(id) ON DELETE CASCADE,
  to_pokemon_id UUID REFERENCES pokemon_caught(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily quests table
CREATE TABLE daily_quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quest_type TEXT NOT NULL,
  target INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  reward TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  UNIQUE(user_id, date, quest_type)
);

-- Badges table
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

-- Row Level Security Policies

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Pokemon Caught
ALTER TABLE pokemon_caught ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own pokemon" ON pokemon_caught FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pokemon" ON pokemon_caught FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pokemon" ON pokemon_caught FOR UPDATE USING (auth.uid() = user_id);

-- Player Positions
ALTER TABLE player_positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all positions" ON player_positions FOR SELECT USING (true);
CREATE POLICY "Users can update own position" ON player_positions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own position" ON player_positions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Friends
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own friends" ON friends FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own friends" ON friends FOR ALL USING (auth.uid() = user_id);

-- Trades
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own trades" ON trades FOR SELECT USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
CREATE POLICY "Users can create own trades" ON trades FOR INSERT WITH CHECK (auth.uid() = from_user_id);
CREATE POLICY "Users can update own trades" ON trades FOR UPDATE USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

-- Daily Quests
ALTER TABLE daily_quests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own quests" ON daily_quests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own quests" ON daily_quests FOR ALL USING (auth.uid() = user_id);

-- Badges
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own badges" ON badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own badges" ON badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, level, xp, pokeballs)
  VALUES (NEW.id, NEW.email, 1, 0, 10);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
