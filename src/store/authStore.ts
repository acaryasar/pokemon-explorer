import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { signInWithUsername, signUpWithUsername, signOut, getCurrentUser, onAuthStateChange } from '../lib/supabase/auth'
import { getProfile } from '../lib/supabase/profile'
import type { Profile } from '../lib/types/player'

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  username: string
  signInWithUsername: (username: string, password: string) => Promise<{ success: boolean; error: string | null }>
  signUpWithUsername: (username: string, password: string) => Promise<{ success: boolean; error: string | null }>
  signOut: () => Promise<void>
  loadProfile: () => Promise<void>
  setUser: (user: User | null) => void
  setUsername: (username: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  username: '',

  signInWithUsername: async (username: string, password: string) => {
    const { data, error } = await signInWithUsername(username, password)
    if (!error && data) {
      set({ user: data, loading: false, username })
      // Update online player status
      const { updateOnlinePlayer } = await import('../lib/supabase/realtime')
      await updateOnlinePlayer(data.id, username)
      return { success: true, error: null }
    } else {
      set({ loading: false })
      return { success: false, error: error?.message || 'Giriş başarısız' }
    }
  },

  signUpWithUsername: async (username: string, password: string) => {
    const { data, error } = await signUpWithUsername(username, password)
    if (!error && data) {
      set({ user: data, loading: false, username })
      // Update online player status
      const { updateOnlinePlayer } = await import('../lib/supabase/realtime')
      await updateOnlinePlayer(data.id, username)
      return { success: true, error: null }
    } else {
      set({ loading: false })
      return { success: false, error: error?.message || 'Kayıt başarısız' }
    }
  },

  signOut: async () => {
    await signOut()
    set({ user: null, profile: null, loading: false, username: '' })
  },

  loadProfile: async () => {
    const { data: user } = await getCurrentUser()
    if (user) {
      set({ user, loading: false })
      // Fetch profile from Supabase
      const { data: profile } = await getProfile(user.id)
      if (profile) {
        set({ profile, username: profile.username || '' })
        // Update online player status
        const { updateOnlinePlayer } = await import('../lib/supabase/realtime')
        await updateOnlinePlayer(user.id, profile.username || 'User')
      }
    } else {
      set({ loading: false })
    }
  },

  setUser: (user) => {
    set({ user, loading: false })
  },

  setUsername: (username) => {
    set({ username })
  },
}))

// Initialize auth state listener
onAuthStateChange((_event, session) => {
  const user = session?.user || null
  useAuthStore.setState({ user, loading: false })
})
