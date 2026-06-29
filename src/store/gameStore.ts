import { create } from 'zustand'
import type { Direction, Position } from '../lib/types/game'
import type { Pokemon } from '../lib/types/pokemon'
import { getRandomRarity } from '../lib/constants/rarity'
import { POKEMON_DATA } from '../lib/constants/pokemon'
import { useAuthStore } from './authStore'
import { usePokedexStore } from './pokedexStore'
import { useInventoryStore } from './inventoryStore'

interface GameState {
  playerPosition: Position
  currentPokemon: Pokemon | null
  isEncounter: boolean
  isCatching: boolean
  movePlayer: (direction: Direction) => void
  encounterPokemon: () => void
  catchPokemon: () => Promise<void>
  runAway: () => void
  resetEncounter: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  playerPosition: { x: 0, y: 0 },
  currentPokemon: null,
  isEncounter: false,
  isCatching: false,

  movePlayer: (direction: Direction) => {
    set((state) => {
      const newPosition = { ...state.playerPosition }

      switch (direction) {
        case 'up':
          newPosition.y = Math.max(0, newPosition.y - 1)
          break
        case 'down':
          newPosition.y = Math.min(14, newPosition.y + 1)
          break
        case 'left':
          newPosition.x = Math.max(0, newPosition.x - 1)
          break
        case 'right':
          newPosition.x = Math.min(14, newPosition.x + 1)
          break
      }

      // Update online player position in database
      const user = useAuthStore.getState().user
      const username = useAuthStore.getState().username
      if (user) {
        import('../lib/supabase/realtime').then(({ updateOnlinePlayer }) => {
          updateOnlinePlayer(user.id, username || 'Anonymous', newPosition.x, newPosition.y)
        })
      }

      return { playerPosition: newPosition }
    })
  },

  encounterPokemon: () => {
    // 20% chance of encounter
    if (Math.random() < 0.2) {
      const username = useAuthStore.getState().username.toLowerCase()
      const isKuzey = username === 'kuzey'

      let rarity = getRandomRarity()

      // Easter egg: Kuzey always gets legendary pokemon
      if (isKuzey) {
        rarity = 'legendary'
      }

      // Get random Pokemon based on rarity
      const pokemonByRarity = POKEMON_DATA.filter((p: Pokemon) => p.rarity === rarity)
      const randomIndex = Math.floor(Math.random() * pokemonByRarity.length)
      const pokemon = pokemonByRarity[randomIndex]
      set({ currentPokemon: pokemon, isEncounter: true })
    }
  },

  catchPokemon: async () => {
    set({ isCatching: true })
    const { currentPokemon } = get()
    const user = useAuthStore.getState().user
    
    if (currentPokemon && user) {
      // Save to Supabase
      const { catchPokemon: savePokemon } = await import('../lib/supabase/pokemon')
      const { addXP } = await import('../lib/supabase/profile')
      const { addPokeballs } = await import('../lib/supabase/profile')
      
      const { data: caughtPokemon } = await savePokemon(user.id, currentPokemon.id, currentPokemon.rarity)
      
      if (caughtPokemon) {
        // Add XP for catching
        await addXP(user.id, 10)
        
        // Add pokeballs as reward
        await addPokeballs(user.id, 2)
        
        // Update local stores
        const pokedexStore = usePokedexStore.getState()
        pokedexStore.addPokemon(caughtPokemon)
        
        const inventoryStore = useInventoryStore.getState()
        inventoryStore.addPokeballs(2)
      }
    }
    
    setTimeout(() => {
      set({ currentPokemon: null, isEncounter: false, isCatching: false })
    }, 2000)
  },

  runAway: () => {
    set({ currentPokemon: null, isEncounter: false, isCatching: false })
  },

  resetEncounter: () => {
    set({ currentPokemon: null, isEncounter: false, isCatching: false })
  },
}))
