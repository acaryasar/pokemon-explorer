import { useEffect, useState } from 'react'
import { subscribeToOnlinePlayers, type OnlinePlayer } from '../../lib/supabase/realtime'

function OnlinePlayers() {
  const [players, setPlayers] = useState<OnlinePlayer[]>([])

  useEffect(() => {
    const unsubscribe = subscribeToOnlinePlayers(setPlayers)
    return unsubscribe
  }, [])

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <h3 className="text-white font-bold mb-2">👥 Çevrimiçi Oyuncular ({players.length})</h3>
      {players.length === 0 ? (
        <p className="text-gray-400 text-sm">Henüz çevrimiçi oyuncu yok</p>
      ) : (
        <div className="space-y-1">
          {players.map((player) => (
            <div key={player.id} className="text-gray-300 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {player.username}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OnlinePlayers
