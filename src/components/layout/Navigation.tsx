import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <Link
        to="/game"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="text-2xl font-bold text-white mb-2">Play</h2>
        <p className="text-white/80">Explore and catch Pokemon</p>
      </Link>

      <Link
        to="/pokedex"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-2xl font-bold text-white mb-2">Pokedex</h2>
        <p className="text-white/80">View your collection</p>
      </Link>

      <Link
        to="/bag"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">🎒</div>
        <h2 className="text-2xl font-bold text-white mb-2">Bag</h2>
        <p className="text-white/80">Manage your items</p>
      </Link>

      <Link
        to="/friends"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-2xl font-bold text-white mb-2">Friends</h2>
        <p className="text-white/80">Connect with trainers</p>
      </Link>

      <Link
        to="/settings"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-white/80">Customize your profile</p>
      </Link>
    </div>
  )
}

export default Navigation
