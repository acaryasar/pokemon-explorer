import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <Link
        to="/game"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="text-2xl font-bold text-white mb-2">Oyna</h2>
        <p className="text-white/80">Keşfet ve Pokemon yakala</p>
      </Link>

      <Link
        to="/pokedex"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-2xl font-bold text-white mb-2">Pokedex</h2>
        <p className="text-white/80">Koleksiyonunu gör</p>
      </Link>

      <Link
        to="/bag"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">🎒</div>
        <h2 className="text-2xl font-bold text-white mb-2">Çanta</h2>
        <p className="text-white/80">Eşyalarını yönet</p>
      </Link>

      <Link
        to="/friends"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-2xl font-bold text-white mb-2">Arkadaşlar</h2>
        <p className="text-white/80">Eğitmenlerle bağlantı kur</p>
      </Link>

      <Link
        to="/settings"
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 cursor-pointer border border-white/20"
      >
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-2xl font-bold text-white mb-2">Ayarlar</h2>
        <p className="text-white/80">Profilini özelleştir</p>
      </Link>
    </div>
  )
}

export default Navigation
