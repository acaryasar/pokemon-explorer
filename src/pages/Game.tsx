import GameScene from '../components/game/GameScene'
import PokemonEncounter from '../components/game/PokemonEncounter'
import MobileControls from '../components/game/MobileControls'
import Header from '../components/layout/Header'
import { useAudio } from '../hooks/useAudio'
import { useAuthStore } from '../store/authStore'
import { usePokedexStore } from '../store/pokedexStore'
import { useEffect } from 'react'

function Game() {
  const { user } = useAuthStore()
  const { toggle, isPlaying } = useAudio('/assets/pokemon-theme.mp3')
  const { loadPokemon } = usePokedexStore()

  useEffect(() => {
    if (user) {
      loadPokemon()
    }
  }, [user, loadPokemon])

  if (!user) {
    return null
  }

  return (
    <div className="h-dvh flex flex-col bg-gray-900 overflow-hidden">
      <Header />
      <div className="relative flex-1">
        <GameScene />

        <button
          onClick={toggle}
          className="absolute top-4 right-4 z-30 px-4 py-2 bg-blue-600/90 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors"
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>

        <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-white text-sm bg-black/50 px-4 py-2 rounded-lg pointer-events-none">
          Hareket etmek için ok tuşlarını veya WASD kullanın
        </div>

        <MobileControls />
        <PokemonEncounter />
      </div>
    </div>
  )
}

export default Game
