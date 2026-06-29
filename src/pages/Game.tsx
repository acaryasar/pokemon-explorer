import Header from '../components/layout/Header'
import Map from '../components/game/Map'
import PokemonEncounter from '../components/game/PokemonEncounter'
import { useMovement } from '../hooks/useMovement'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Game() {
  useMovement()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Game</h1>
        <div className="flex justify-center">
          <Map />
        </div>
        <PokemonEncounter />
      </div>
    </div>
  )
}

export default Game
