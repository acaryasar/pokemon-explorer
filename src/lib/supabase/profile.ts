import { supabase } from './client'
import type { Profile } from '../types/player'

export async function getProfile(
  userId: string
): Promise<{ data: Profile | null; error: any }> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { data, error }
}

export async function updateProfile(
  userId: string,
  updates: Partial<Profile>
): Promise<{ data: Profile | null; error: any }> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

export async function addXP(userId: string, xpAmount: number): Promise<{ data: Profile | null; error: any }> {
  const { data: currentProfile } = await getProfile(userId)
  
  if (!currentProfile) {
    return { data: null, error: 'Profile not found' }
  }

  const newXP = currentProfile.xp + xpAmount
  const newLevel = Math.floor(newXP / 100) + 1

  return updateProfile(userId, { xp: newXP, level: newLevel })
}

export async function addPokeballs(userId: string, amount: number): Promise<{ data: Profile | null; error: any }> {
  const { data: currentProfile } = await getProfile(userId)
  
  if (!currentProfile) {
    return { data: null, error: 'Profile not found' }
  }

  const newPokeballs = currentProfile.pokeballs + amount
  return updateProfile(userId, { pokeballs: newPokeballs })
}
