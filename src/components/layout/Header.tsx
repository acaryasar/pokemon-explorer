import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function Header() {
  const { user, signOut, username, profile } = useAuthStore()

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
          Pokemon Explorer
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <div className="text-right">
              <span className="text-white font-semibold block">
                👤 {username || user.email}
              </span>
              <span className="text-yellow-400 text-sm font-semibold">
                ⭐ {profile?.pokemon_points || 0} Puan
              </span>
            </div>
          )}
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
    </header>
  )
}

export default Header
