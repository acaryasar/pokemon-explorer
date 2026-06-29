import { supabase } from './client'
import type { AuthError, User } from '@supabase/supabase-js'

export async function signInWithGoogle(): Promise<{ data: { url: string } | null; error: AuthError | null }> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  })

  return { data: data.url ? { url: data.url } : null, error }
}

export async function signInAnonymously(): Promise<{ data: User | null; error: AuthError | null }> {
  const { data, error } = await supabase.auth.signInAnonymously()

  return { data: data.user, error }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser(): Promise<{ data: User | null; error: AuthError | null }> {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { data: user, error }
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback)
}
