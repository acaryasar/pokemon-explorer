import type { Rarity } from '../types/pokemon'

export const RARITY_CHANCES: Record<Rarity, number> = {
  common: 0.6,
  uncommon: 0.25,
  rare: 0.1,
  epic: 0.04,
  legendary: 0.01,
}

export const RARITY_COLORS: Record<Rarity, string> = {
  common: '#9CA3AF',
  uncommon: '#10B981',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B',
}

export function getRandomRarity(): Rarity {
  const random = Math.random()
  let cumulative = 0

  for (const [rarity, chance] of Object.entries(RARITY_CHANCES)) {
    cumulative += chance
    if (random <= cumulative) {
      return rarity as Rarity
    }
  }

  return 'common'
}
