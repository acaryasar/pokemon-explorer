import { supabase } from './client'
import type { CaughtPokemon } from '../types/pokemon'
import { addPokemonPoints } from './profile'

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

  if (!error) {
    // Add 100 points for catching a pokemon
    await addPokemonPoints(userId, 100)
  }

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

export async function evolvePokemon(
  caughtPokemonId: string,
  newPokemonId: number,
  userId: string
): Promise<{ error: any }> {
  const { error } = await supabase
    .from('pokemon_caught')
    .update({ pokemon_id: newPokemonId })
    .eq('id', caughtPokemonId)

  if (!error) {
    // Deduct 50 points for evolution
    await addPokemonPoints(userId, -50)
  }

  return { error }
}
