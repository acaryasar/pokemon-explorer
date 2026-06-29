import { create } from 'zustand'
import { getProfile } from '../lib/supabase/profile'
import { useAuthStore } from './authStore'

interface Item {
  id: string
  name: string
  description: string
  quantity: number
}

interface InventoryState {
  pokeballs: number
  items: Item[]
  loading: boolean
  loadInventory: () => Promise<void>
  usePokeball: () => void
  addPokeballs: (amount: number) => void
  addItem: (item: Item) => void
}

export const useInventoryStore = create<InventoryState>((set) => ({
  pokeballs: 10,
  items: [],
  loading: true,

  loadInventory: async () => {
    const user = useAuthStore.getState().user
    if (user) {
      const { data: profile } = await getProfile(user.id)
      if (profile) {
        set({ pokeballs: profile.pokeballs, loading: false })
      } else {
        set({ loading: false })
      }
    } else {
      set({ loading: false })
    }
  },

  usePokeball: () => {
    set((state) => ({
      pokeballs: Math.max(0, state.pokeballs - 1),
    }))
  },

  addPokeballs: (amount: number) => {
    set((state) => ({
      pokeballs: state.pokeballs + amount,
    }))
  },

  addItem: (item: Item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        }
      }
      return { items: [...state.items, item] }
    })
  },
}))
