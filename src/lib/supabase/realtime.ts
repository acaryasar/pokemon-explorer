import { supabase } from './client'

export interface OnlinePlayer {
  id: string
  username: string
  last_seen: string
}

export function subscribeToOnlinePlayers(callback: (players: OnlinePlayer[]) => void) {
  const channel = supabase
    .channel('online_players')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'online_players',
      },
      () => {
        // Fetch all online players when changes occur
        fetchOnlinePlayers(callback)
      }
    )
    .subscribe()

  // Initial fetch
  fetchOnlinePlayers(callback)

  return () => {
    supabase.removeChannel(channel)
  }
}

async function fetchOnlinePlayers(callback: (players: OnlinePlayer[]) => void) {
  const { data, error } = await supabase
    .from('online_players')
    .select('*')
    .gt('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString()) // Players active in last 5 minutes

  if (!error && data) {
    callback(data)
  }
}

export async function updateOnlinePlayer(userId: string, username: string) {
  await supabase
    .from('online_players')
    .upsert({
      id: userId,
      username,
      last_seen: new Date().toISOString(),
    })
}
