import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { subscribeToOnlinePlayers, updateOnlinePlayer, type OnlinePlayer } from '../../lib/supabase/realtime'

function Header() {
  const { user, signOut, username, profile } = useAuthStore()
  const [players, setPlayers] = useState<OnlinePlayer[]>([])
  const [showOnlinePlayers, setShowOnlinePlayers] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToOnlinePlayers(setPlayers)
    return unsubscribe
  }, [])

  // Update own online status every 30 seconds
  useEffect(() => {
    if (!user) return

    const updateStatus = async () => {
      const displayName = profile?.username || username || 'Anonymous'
      await updateOnlinePlayer(user.id, displayName)
    }

    updateStatus()
    const interval = setInterval(updateStatus, 30000)

    return () => clearInterval(interval)
  }, [user, username, profile])

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
          Pokemon Explorer
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">
                👤 {username || user.email}
              </span>
              <span className="text-yellow-400 text-sm font-semibold">
                ⭐ {profile?.pokemon_points || 0} Puan
              </span>
            </div>
          )}
          <button
            onClick={() => setShowOnlinePlayers(!showOnlinePlayers)}
            className="text-white hover:text-blue-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>👥</span> Çevrimiçi ({players.length})
          </button>
          <nav className="flex gap-4">
            <Link to="/game" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
              <span>🎮</span> Oyun
            </Link>
            <Link to="/pokedex" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
              <span>📖</span> Pokedex
            </Link>
            <Link to="/bag" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
              <span>🎒</span> Çanta
            </Link>
            <Link to="/friends" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
              <span>👥</span> Arkadaşlar
            </Link>
            <Link to="/settings" className="text-white hover:text-blue-400 transition-colors flex items-center gap-2">
              <span>⚙️</span> Ayarlar
            </Link>
          </nav>
          {user && (
            <button
              onClick={signOut}
              className="text-white hover:text-red-400 transition-colors text-sm"
            >
              Çıkış Yap
            </button>
          )}
        </div>
      </div>
      {showOnlinePlayers && (
        <div className="absolute top-16 right-4 bg-gray-800 rounded-lg p-4 shadow-xl z-50 border border-gray-700">
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
      )}
    </header>
  )
}

export default Header
