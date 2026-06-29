-- Add pokemon to kuzey's collection to reach 50 total
-- This adds a variety of pokemon including epic ones
-- Note: pokemon_caught.user_id references profiles.id, but we need to match with auth.users.id
-- So we use profiles.id which is the same as auth.users.id

INSERT INTO pokemon_caught (user_id, pokemon_id, rarity, caught_at)
SELECT 
  (SELECT id FROM profiles WHERE username = 'kuzey'),
  pokemon_id,
  rarity,
  NOW()
FROM (VALUES
  (1, 'common'),
  (4, 'common'),
  (7, 'common'),
  (10, 'common'),
  (13, 'common'),
  (16, 'common'),
  (19, 'common'),
  (129, 'common'),
  -- Uncommon Pokemon
  (25, 'uncommon'),
  (35, 'uncommon'),
  (37, 'uncommon'),
  (39, 'uncommon'),
  (41, 'uncommon'),
  (43, 'uncommon'),
  (50, 'uncommon'),
  (52, 'uncommon'),
  (54, 'uncommon'),
  -- Rare Pokemon
  (58, 'rare'),
  (60, 'rare'),
  (63, 'rare'),
  (66, 'rare'),
  (69, 'rare'),
  (72, 'rare'),
  (74, 'rare'),
  (77, 'rare'),
  (79, 'rare'),
  (81, 'rare'),
  (133, 'rare'),
  -- Epic Pokemon
  (83, 'epic'),
  (86, 'epic'),
  (88, 'epic'),
  (90, 'epic'),
  (92, 'epic'),
  (95, 'epic'),
  (96, 'epic'),
  (98, 'epic'),
  (100, 'epic'),
  (104, 'epic'),
  -- Legendary Pokemon
  (123, 'legendary'),
  (124, 'legendary'),
  (126, 'legendary'),
  (130, 'legendary'),
  (131, 'legendary'),
  (135, 'legendary'),
  (137, 'legendary'),
  (143, 'legendary'),
  (144, 'legendary'),
  (145, 'legendary'),
  (146, 'legendary'),
  (149, 'legendary'),
  (150, 'legendary'),
  (151, 'legendary')
) AS v(pokemon_id, rarity)
WHERE NOT EXISTS (
  SELECT 1 FROM pokemon_caught 
  WHERE user_id = (SELECT id FROM profiles WHERE username = 'kuzey')
  AND pokemon_id = v.pokemon_id
);
