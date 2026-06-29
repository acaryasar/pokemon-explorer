import { supabase } from './client'

export interface OnlinePlayer {
  id: string
  username: string
  last_seen: string
  x?: number
  y?: number
}

// Singleton subscription manager
let onlinePlayersChannel: any = null
let onlinePlayersCallbacks: Set<(players: OnlinePlayer[]) => void> = new Set()

function fetchOnlinePlayers() {
  supabase
    .from('online_players')
    .select('*')
    .gt('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString())
    .then(({ data, error }) => {
      if (!error && data) {
        onlinePlayersCallbacks.forEach(callback => callback(data))
      }
    })
}

export function subscribeToOnlinePlayers(callback: (players: OnlinePlayer[]) => void) {
  onlinePlayersCallbacks.add(callback)

  // Create channel if it doesn't exist
  if (!onlinePlayersChannel) {
    onlinePlayersChannel = supabase
      .channel('online_players_global')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'online_players',
        },
        () => {
          fetchOnlinePlayers()
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          fetchOnlinePlayers()
        }
      })
  } else {
    // Channel already exists, just fetch current data
    fetchOnlinePlayers()
  }

  // Return unsubscribe function
  return () => {
    onlinePlayersCallbacks.delete(callback)

    // Remove channel if no more callbacks
    if (onlinePlayersCallbacks.size === 0 && onlinePlayersChannel) {
      supabase.removeChannel(onlinePlayersChannel)
      onlinePlayersChannel = null
    }
  }
}

export async function updateOnlinePlayer(userId: string, username: string, x?: number, y?: number) {
  await supabase
    .from('online_players')
    .upsert({
      id: userId,
      username,
      last_seen: new Date().toISOString(),
      x: x ?? 0,
      y: y ?? 0,
    })
}
