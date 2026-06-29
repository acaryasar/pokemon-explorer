export const XP_PER_LEVEL = 100

export function getXPForLevel(level: number): number {
  return (level - 1) * XP_PER_LEVEL
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function getXPProgress(xp: number): number {
  return xp % XP_PER_LEVEL
}
