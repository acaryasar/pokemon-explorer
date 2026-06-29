import Header from '../components/layout/Header'
import PokedexList from '../components/pokedex/PokedexList'
import { usePokedexStore } from '../store/pokedexStore'
import { useEffect } from 'react'

function Pokedex() {
  const { loadPokemon } = usePokedexStore()

  useEffect(() => {
    loadPokemon()
  }, [loadPokemon])

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Pokedex</h1>
        <PokedexList />
      </div>
    </div>
  )
}

export default Pokedex
