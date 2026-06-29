# Pokemon Explorer - Project Plan

## 1. Project Folder Structure

```
pokemon-explorer/
├── public/
│   ├── icons/
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   ├── sounds/
│   │   ├── catch.mp3
│   │   ├── shake.mp3
│   │   ├── success.mp3
│   │   └── fail.mp3
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── Avatar.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── game/
│   │   │   ├── Map.tsx
│   │   │   ├── Player.tsx
│   │   │   ├── PokemonEncounter.tsx
│   │   │   ├── CatchAnimation.tsx
│   │   │   └── ProfessorAI.tsx
│   │   ├── pokedex/
│   │   │   ├── PokedexList.tsx
│   │   │   ├── PokemonCard.tsx
│   │   │   └── PokemonDetail.tsx
│   │   ├── inventory/
│   │   │   ├── Bag.tsx
│   │   │   ├── PokeballCounter.tsx
│   │   │   └── ItemCard.tsx
│   │   ├── social/
│   │   │   ├── FriendsList.tsx
│   │   │   ├── FriendCard.tsx
│   │   │   ├── TradeModal.tsx
│   │   │   └── OnlinePlayers.tsx
│   │   └── profile/
│   │       ├── AvatarCustomizer.tsx
│   │       ├── BadgeDisplay.tsx
│   │       ├── XPBar.tsx
│   │       ├── DailyQuest.tsx
│   │       └── Settings.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Game.tsx
│   │   ├── Pokedex.tsx
│   │   ├── Bag.tsx
│   │   ├── Friends.tsx
│   │   └── Settings.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSupabase.ts
│   │   ├── usePokemon.ts
│   │   ├── useMovement.ts
│   │   ├── useRealtime.ts
│   │   └── useSound.ts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── pokemon.ts
│   │   │   ├── players.ts
│   │   │   └── realtime.ts
│   │   ├── constants/
│   │   │   ├── pokemon.ts
│   │   │   ├── rarity.ts
│   │   │   ├── xp.ts
│   │   │   └── badges.ts
│   │   ├── utils/
│   │   │   ├── animation.ts
│   │   │   ├── random.ts
│   │   │   └── validation.ts
│   │   └── types/
│   │       ├── pokemon.ts
│   │       ├── player.ts
│   │       └── game.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── gameStore.ts
│   │   ├── pokedexStore.ts
│   │   └── inventoryStore.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.json
├── .prettierrc
└── README.md
```

## 2. Database Schema

### Supabase Tables

#### `profiles`
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  pokeballs INTEGER DEFAULT 10,
  avatar JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `pokemon_caught`
```sql
CREATE TABLE pokemon_caught (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  pokemon_id INTEGER NOT NULL,
  nickname TEXT,
  level INTEGER DEFAULT 1,
  rarity TEXT NOT NULL,
  caught_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, pokemon_id)
);
```

#### `player_positions`
```sql
CREATE TABLE player_positions (
  user_id UUID PRIMARY KEY REFERENCES profiles(id),
  x INTEGER DEFAULT 0,
  y INTEGER DEFAULT 0,
  last_moved TIMESTAMPTZ DEFAULT NOW()
);
```

#### `friends`
```sql
CREATE TABLE friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  friend_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);
```

#### `trades`
```sql
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES profiles(id),
  to_user_id UUID REFERENCES profiles(id),
  from_pokemon_id UUID REFERENCES pokemon_caught(id),
  to_pokemon_id UUID REFERENCES pokemon_caught(id),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `daily_quests`
```sql
CREATE TABLE daily_quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  quest_type TEXT NOT NULL,
  target INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  reward TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  UNIQUE(user_id, date, quest_type)
);
```

#### `badges`
```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  badge_type TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);
```

### RLS Policies

```sql
-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Pokemon Caught
ALTER TABLE pokemon_caught ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own pokemon" ON pokemon_caught FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pokemon" ON pokemon_caught FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Player Positions
ALTER TABLE player_positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all positions" ON player_positions FOR SELECT USING (true);
CREATE POLICY "Users can update own position" ON player_positions FOR UPDATE USING (auth.uid() = user_id);

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
```

## 3. Component Tree

```
App
├── AuthProvider
│   └── Router
│       ├── Home
│       │   ├── Header
│       │   ├── Navigation
│       │   └── FeatureCards
│       ├── Game
│       │   ├── Header
│       │   ├── Map
│       │   │   ├── Player
│       │   │   ├── OtherPlayers
│       │   │   └── ProfessorAI
│       │   ├── PokemonEncounter (Modal)
│       │   │   ├── PokemonSprite
│       │   │   └── CatchAnimation
│       │   └── XPBar
│       ├── Pokedex
│       │   ├── Header
│       │   ├── PokedexList
│       │   │   └── PokemonCard
│       │   └── PokemonDetail (Modal)
│       ├── Bag
│       │   ├── Header
│       │   ├── PokeballCounter
│       │   └── ItemCard
│       ├── Friends
│       │   ├── Header
│       │   ├── FriendsList
│       │   │   └── FriendCard
│       │   ├── OnlinePlayers
│       │   └── TradeModal
│       └── Settings
│           ├── Header
│           ├── AvatarCustomizer
│           ├── BadgeDisplay
│           ├── DailyQuest
│           └── SettingsOptions
└── Footer
```

## 4. Page Flow

```
Login (Google/Anonymous)
    ↓
Home
    ├── Play → Game
    ├── Pokedex → Pokedex
    ├── Bag → Bag
    ├── Friends → Friends
    └── Settings → Settings

Game Flow:
Game → Move → Encounter? (20%)
    ├── Yes → PokemonEncounter → Catch/Run
    │   ├── Catch → CatchAnimation → Success/Fail
    │   └── Run → Back to Game
    └── No → Continue Game

Pokedex Flow:
Pokedex → PokemonCard → PokemonDetail

Friends Flow:
Friends → FriendCard → TradeModal → Confirm Trade

Settings Flow:
Settings → AvatarCustomizer → Save
Settings → BadgeDisplay → View Badges
Settings → DailyQuest → Complete Quest
```

## 5. API Structure

### Supabase Client Functions

```typescript
// lib/supabase/auth.ts
- signInWithGoogle()
- signInAnonymously()
- signOut()
- getCurrentUser()

// lib/supabase/pokemon.ts
- getRandomPokemon(rarity: Rarity)
- catchPokemon(userId: UUID, pokemonId: number)
- getUserPokemon(userId: UUID)
- getPokemonById(pokemonId: number)

// lib/supabase/players.ts
- updatePosition(userId: UUID, x: number, y: number)
- getPlayerPosition(userId: UUID)
- getAllPlayerPositions()
- updateProfile(userId: UUID, data: ProfileUpdate)
- addXP(userId: UUID, amount: number)
- checkLevelUp(userId: UUID)

// lib/supabase/realtime.ts
- subscribeToPlayerPositions(callback: Function)
- subscribeToFriendStatus(callback: Function)

// lib/supabase/friends.ts
- sendFriendRequest(userId: UUID, friendId: UUID)
- acceptFriendRequest(requestId: UUID)
- getFriends(userId: UUID)
- getOnlineFriends(userId: UUID)

// lib/supabase/trades.ts
- createTrade(fromUserId: UUID, toUserId: UUID, fromPokemon: UUID, toPokemon: UUID)
- acceptTrade(tradeId: UUID)
- rejectTrade(tradeId: UUID)
- getTrades(userId: UUID)

// lib/supabase/quests.ts
- getDailyQuest(userId: UUID)
- updateQuestProgress(userId: UUID, questType: string, amount: number)
- completeQuest(userId: UUID, questId: UUID)

// lib/supabase/badges.ts
- getBadges(userId: UUID)
- awardBadge(userId: UUID, badgeType: string)
- checkBadgeEligibility(userId: UUID)
```

## 6. State Management

### Zustand Stores

```typescript
// store/authStore.ts
interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInAnonymously: () => Promise<void>
  signOut: () => Promise<void>
  loadProfile: () => Promise<void>
}

// store/gameStore.ts
interface GameState {
  playerPosition: { x: number; y: number }
  currentPokemon: Pokemon | null
  isEncounter: boolean
  isCatching: boolean
  movePlayer: (direction: Direction) => void
  encounterPokemon: () => void
  catchPokemon: () => Promise<void>
  runAway: () => void
}

// store/pokedexStore.ts
interface PokedexState {
  pokemon: CaughtPokemon[]
  loading: boolean
  loadPokemon: () => Promise<void>
  getPokemonById: (id: string) => CaughtPokemon | undefined
}

// store/inventoryStore.ts
interface InventoryState {
  pokeballs: number
  items: Item[]
  loading: boolean
  loadInventory: () => Promise<void>
  usePokeball: () => void
  addPokeballs: (amount: number) => void
}
```

## 7. Development Roadmap

### Phase 1: Foundation (Days 1-2)
- [ ] Project setup (Vite + React + TypeScript + TailwindCSS)
- [ ] Supabase project creation and configuration
- [ ] Database schema setup
- [ ] Authentication (Google + Anonymous)
- [ ] Basic routing structure
- [ ] UI component library (Button, Card, Modal, ProgressBar)

### Phase 2: Core Game Loop (Days 3-4)
- [ ] Map component with tile grid
- [ ] Player movement system
- [ ] Pokemon encounter system (20% chance)
- [ ] Pokemon data and constants
- [ ] Catch animation
- [ ] XP and leveling system
- [ ] Pokedex storage

### Phase 3: UI/UX Polish (Days 5-6)
- [ ] Home screen with navigation
- [ ] Pokedex view with Pokemon cards
- [ ] Bag/inventory system
- [ ] Sound effects
- [ ] Smooth animations
- [ ] Responsive design testing
- [ ] Touch-friendly controls

### Phase 4: Social Features (Days 7-8)
- [ ] Friends system
- [ ] Realtime player positions
- [ ] Online status
- [ ] Trade system
- [ ] Professor AI tips

### Phase 5: Advanced Features (Days 9-10)
- [ ] Daily quests
- [ ] Badge system
- [ ] Avatar customization
- [ ] Settings page
- [ ] Save/load system

### Phase 6: PWA & Optimization (Days 11-12)
- [ ] PWA manifest
- [ ] Service worker for offline support
- [ ] Performance optimization
- [ ] Code splitting
- [ ] Image optimization
- [ ] Cross-device testing

### Phase 7: Testing & Launch (Days 13-14)
- [ ] Unit tests for core logic
- [ ] E2E testing with Playwright
- [ ] Mobile testing
- [ ] Tablet testing
- [ ] Desktop testing
- [ ] Bug fixes
- [ ] Deployment
