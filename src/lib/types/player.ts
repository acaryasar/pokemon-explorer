export interface Profile {
  id: string
  username: string | null
  level: number
  xp: number
  pokeballs: number
  avatar: Record<string, any>
  created_at: string
  updated_at: string
}

export interface PlayerPosition {
  user_id: string
  x: number
  y: number
  last_moved: string
}
