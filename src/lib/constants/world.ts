export const WORLD_HALF_SIZE = 28
export const PLAYER_RADIUS = 0.5
export const PLAYER_SPEED = 6

export interface Obstacle {
  x: number
  z: number
  radius: number
  type: 'tree' | 'rock'
  scale: number
}

// Deterministic PRNG so every client renders the exact same static world layout.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateObstacles(): Obstacle[] {
  const random = mulberry32(1337)
  const obstacles: Obstacle[] = []
  const clearRadius = 5 // keep the spawn point free of obstacles

  const place = (count: number, type: Obstacle['type'], radius: number) => {
    for (let i = 0; i < count; i++) {
      let x = 0
      let z = 0
      do {
        x = (random() * 2 - 1) * (WORLD_HALF_SIZE - 2)
        z = (random() * 2 - 1) * (WORLD_HALF_SIZE - 2)
      } while (Math.hypot(x, z) < clearRadius)

      obstacles.push({ x, z, radius, type, scale: 0.8 + random() * 0.6 })
    }
  }

  place(26, 'tree', 0.6)
  place(12, 'rock', 0.7)

  return obstacles
}

export const OBSTACLES: Obstacle[] = generateObstacles()
