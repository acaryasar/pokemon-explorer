import { supabase } from './client'
import type { CaughtPokemon } from '../types/pokemon'

export async function catchPokemon(
  userId: string,
  pokemonId: number,
  rarity: string
): Promise<{ data: CaughtPokemon | null; error: any }> {
  const { data, error } = await supabase
    .from('pokemon_caught')
    .insert({
      user_id: userId,
      pokemon_id: pokemonId,
      level: 1,
      rarity,
    })
    .select()
    .single()

  return { data, error }
}

export async function getCaughtPokemon(
  userId: string
): Promise<{ data: CaughtPokemon[]; error: any }> {
  const { data, error } = await supabase
    .from('pokemon_caught')
    .select('*')
    .eq('user_id', userId)
    .order('caught_at', { ascending: false })

  return { data: data || [], error }
}

export async function updatePokemonNickname(
  pokemonId: string,
  nickname: string
): Promise<{ error: any }> {
  const { error } = await supabase
    .from('pokemon_caught')
    .update({ nickname })
    .eq('id', pokemonId)

  return { error }
}
