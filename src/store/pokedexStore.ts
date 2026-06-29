import { create } from 'zustand'
import type { CaughtPokemon } from '../lib/types/pokemon'
import { getCaughtPokemon } from '../lib/supabase/pokemon'
import { useAuthStore } from './authStore'

interface PokedexState {
  pokemon: CaughtPokemon[]
  loading: boolean
  loadPokemon: () => Promise<void>
  getPokemonById: (id: string) => CaughtPokemon | undefined
  addPokemon: (pokemon: CaughtPokemon) => void
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
}))
