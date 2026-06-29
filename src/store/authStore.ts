import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { signInWithGoogle, signInAnonymously, signOut, getCurrentUser, onAuthStateChange } from '../lib/supabase/auth'
import { getProfile } from '../lib/supabase/profile'
import type { Profile } from '../lib/types/player'

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  username: string
  signInWithGoogle: () => Promise<void>
  signInAnonymously: () => Promise<void>
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

  signInWithGoogle: async () => {
    const { data, error } = await signInWithGoogle()
    if (!error && data?.url) {
      window.location.href = data.url
    }
  },

  signInAnonymously: async () => {
    const { data, error } = await signInAnonymously()
    if (!error && data) {
      set({ user: data, loading: false })
      // Update online player status
      const { updateOnlinePlayer } = await import('../lib/supabase/realtime')
      await updateOnlinePlayer(data.id, useAuthStore.getState().username)
    } else {
      set({ loading: false })
      console.error('Anonymous sign in error:', error)
    }
  },

  signOut: async () => {
    await signOut()
    set({ user: null, profile: null, loading: false })
  },

  loadProfile: async () => {
    const { data: user } = await getCurrentUser()
    if (user) {
      set({ user, loading: false })
      // Fetch profile from Supabase
      if (!user.is_anonymous) {
        const { data: profile } = await getProfile(user.id)
        if (profile) {
          set({ profile })
        }
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
