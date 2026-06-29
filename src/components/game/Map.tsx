import { useGameStore } from '../../store/gameStore'
import { useAuthStore } from '../../store/authStore'
import { subscribeToOnlinePlayers, type OnlinePlayer } from '../../lib/supabase/realtime'
import { useState, useEffect } from 'react'

function Map() {
  const { playerPosition } = useGameStore()
  const { user } = useAuthStore()
  const [onlinePlayers, setOnlinePlayers] = useState<OnlinePlayer[]>([])

  useEffect(() => {
    const unsubscribe = subscribeToOnlinePlayers(setOnlinePlayers)
    return unsubscribe
  }, [])

  const gridSize = 15
  const tiles = []

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const isPlayer = playerPosition.x === x && playerPosition.y === y
      const otherPlayersAtPosition = onlinePlayers.filter(
        p => p.id !== user?.id && p.x === x && p.y === y
      )

      tiles.push(
        <div
          key={`${x}-${y}`}
          className={`
            relative aspect-square border border-gray-300 bg-green-100
            ${isPlayer ? 'bg-green-200' : ''}
            ${otherPlayersAtPosition.length > 0 ? 'bg-blue-200' : ''}
          `}
        >
          {isPlayer && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl animate-bounce">🚶</div>
            </div>
          )}
          {otherPlayersAtPosition.length > 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xl">
                {otherPlayersAtPosition.length === 1 ? '🚶' : `🚶×${otherPlayersAtPosition.length}`}
              </div>
              {otherPlayersAtPosition.length === 1 && (
                <div className="text-xs text-white bg-black/70 px-2 py-1 rounded mt-1 whitespace-nowrap font-bold">
                  {otherPlayersAtPosition[0].username}
                </div>
              )}
              {otherPlayersAtPosition.length > 1 && (
                <div className="text-xs text-white bg-black/70 px-2 py-1 rounded mt-1 whitespace-nowrap font-bold">
                  {otherPlayersAtPosition.length} oyuncu
                </div>
              )}
            </div>
          )}
        </div>
      )
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-bold">🗺️ Harita</h2>
        <div className="text-white text-sm">
          👥 Çevrimiçi: {onlinePlayers.length}
        </div>
      </div>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          maxWidth: '600px',
        }}
      >
        {tiles}
      </div>
      <div className="mt-4 text-white text-center text-sm">
        Hareket etmek için ok tuşlarını veya WASD kullanın
      </div>
    </div>
  )
}

export default Map
