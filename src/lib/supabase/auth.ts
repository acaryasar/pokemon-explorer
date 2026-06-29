import { supabase } from './client'
import type { AuthError, User } from '@supabase/supabase-js'

export async function signInWithUsername(username: string, password: string): Promise<{ data: User | null; error: AuthError | null }> {
  const email = `${username}@pokemon-explorer.local`
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data: data.user, error }
}

export async function signUpWithUsername(username: string, password: string): Promise<{ data: User | null; error: AuthError | null }> {
  const email = `${username}@pokemon-explorer.local`
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

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
