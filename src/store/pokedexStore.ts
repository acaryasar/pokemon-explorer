import { create } from 'zustand'
import type { CaughtPokemon } from '../lib/types/pokemon'
import { getCaughtPokemon, evolvePokemon as evolvePokemonDB } from '../lib/supabase/pokemon'
import { useAuthStore } from './authStore'

interface PokedexState {
  pokemon: CaughtPokemon[]
  loading: boolean
  loadPokemon: () => Promise<void>
  getPokemonById: (id: string) => CaughtPokemon | undefined
  addPokemon: (pokemon: CaughtPokemon) => void
  evolvePokemon: (caughtPokemonId: string) => Promise<{ success: boolean; error: string | null }>
}

export const usePokedexStore = create<PokedexState>((set, get) => ({
  pokemon: [],
  loading: true,

  loadPokemon: async () => {
    const user = useAuthStore.getState().user
    if (user) {
      const { data, error } = await getCaughtPokemon(user.id)
      if (!error) {
        set({ pokemon: data, loading: false })
      } else {
        set({ loading: false })
      }
    } else {
      set({ loading: false })
    }
  },

  getPokemonById: (id: string) => {
    return get().pokemon.find((p) => p.id === id)
  },

  addPokemon: (pokemon: CaughtPokemon) => {
    set((state) => ({
      pokemon: [...state.pokemon, pokemon],
    }))
  },

  evolvePokemon: async (caughtPokemonId: string) => {
    const pokemon = get().pokemon.find(p => p.id === caughtPokemonId)
    if (!pokemon) {
      return { success: false, error: 'Pokemon bulunamadı' }
    }

    const { getPokemonById } = await import('../lib/constants/pokemon')
    const pokemonData = getPokemonById(pokemon.pokemon_id)
    
    if (!pokemonData?.evolvesTo || !pokemonData?.evolutionLevel) {
      return { success: false, error: 'Bu pokemon evrimleşemez' }
    }

    if (pokemon.level < pokemonData.evolutionLevel) {
      return { success: false, error: `Level ${pokemonData.evolutionLevel} gerekli` }
    }

    // Update in database
    const { error } = await evolvePokemonDB(caughtPokemonId, pokemonData.evolvesTo!)
    if (error) {
      return { success: false, error: 'Evrim başarısız' }
    }

    // Update local state
    set((state) => ({
      pokemon: state.pokemon.map(p => 
        p.id === caughtPokemonId 
          ? { ...p, pokemon_id: pokemonData.evolvesTo! }
          : p
      )
    }))

    return { success: true, error: null }
  },
}))
