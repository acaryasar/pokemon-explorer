export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

export interface Pokemon {
  id: number
  name: string
  types: string[]
  sprite: string
  baseStats: {
    hp: number
    attack: number
    defense: number
    speed: number
  }
  rarity: Rarity
}

export interface CaughtPokemon {
  id: string
  user_id: string
  pokemon_id: number
  nickname: string | null
  level: number
  rarity: Rarity
  caught_at: string
}
