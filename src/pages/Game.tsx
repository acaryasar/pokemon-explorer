import Map from '../components/game/Map'
import PokemonEncounter from '../components/game/PokemonEncounter'
import MobileControls from '../components/game/MobileControls'
import OnlinePlayers from '../components/game/OnlinePlayers'
import { useMovement } from '../hooks/useMovement'
import { useAudio } from '../hooks/useAudio'
import { useAuthStore } from '../store/authStore'
import { usePokedexStore } from '../store/pokedexStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Game() {
  useMovement()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { toggle, isPlaying } = useAudio('/assets/pokemon-theme.mp3')
  const { loadPokemon } = usePokedexStore()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    if (user) {
      loadPokemon()
    }
  }, [user, loadPokemon])

  const handleMusicToggle = () => {
    toggle()
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">Oyun</h1>
          <button
            onClick={handleMusicToggle}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {isPlaying ? '🔊' : '🔇'}
          </button>
        </div>
        <div className="flex justify-center">
          <Map />
        </div>
        <PokemonEncounter />
      </div>
      <MobileControls />
      <OnlinePlayers />
    </div>
  )
}

export default Game
