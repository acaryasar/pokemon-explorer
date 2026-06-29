import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function Header() {
  const { user, signOut } = useAuthStore()

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
          Pokemon Explorer
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4">
            <Link to="/game" className="text-white hover:text-blue-400 transition-colors">
              Game
            </Link>
            <Link to="/pokedex" className="text-white hover:text-blue-400 transition-colors">
              Pokedex
            </Link>
            <Link to="/bag" className="text-white hover:text-blue-400 transition-colors">
              Bag
            </Link>
            <Link to="/friends" className="text-white hover:text-blue-400 transition-colors">
              Friends
            </Link>
            <Link to="/settings" className="text-white hover:text-blue-400 transition-colors">
              Settings
            </Link>
          </nav>
          {user && (
            <button
              onClick={signOut}
              className="text-white hover:text-red-400 transition-colors text-sm"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
