import { usePokedexStore } from '../../store/pokedexStore'
import PokemonCard from './PokemonCard'

function PokedexList() {
  const { pokemon, loading } = usePokedexStore()

  if (loading) {
    return <div className="text-white">Yükleniyor...</div>
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <div className="text-6xl mb-4">📖</div>
        <p>Henüz Pokemon yakalanmadı!</p>
        <p className="text-sm">Keşfe çıkın ve Pokemon yakalayın.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pokemon.map((caughtPokemon) => (
        <PokemonCard key={caughtPokemon.id} caughtPokemon={caughtPokemon} />
      ))}
    </div>
  )
}

export default PokedexList
