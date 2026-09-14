// A distinct, kid-friendly color per trainer, picked deterministically from
// their user id so the same person always gets the same color (and different
// people reliably get different-looking colors in multiplayer).
const PLAYER_COLORS = [
  '#e63946', // red
  '#3a86ff', // blue
  '#2a9d8f', // teal
  '#ffb703', // amber
  '#8338ec', // purple
  '#fb5607', // orange
  '#06d6a0', // green
  '#ff5da2', // pink
]

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getPlayerColor(key: string): string {
  if (!key) return PLAYER_COLORS[0]
  return PLAYER_COLORS[hashString(key) % PLAYER_COLORS.length]
}
