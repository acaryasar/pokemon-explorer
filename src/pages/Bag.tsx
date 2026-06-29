import Header from '../components/layout/Header'
import { useInventoryStore } from '../store/inventoryStore'
import { usePokedexStore } from '../store/pokedexStore'
import { useEffect } from 'react'
import { getPokemonById } from '../lib/constants/pokemon'

function Bag() {
  const { pokeballs, loadInventory } = useInventoryStore()
  const { pokemon, loadPokemon } = usePokedexStore()

  useEffect(() => {
    loadInventory()
    loadPokemon()
  }, [loadInventory, loadPokemon])

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Çanta</h1>
        
        {/* Pokeballs */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">🎒</div>
            <div>
              <h2 className="text-2xl font-bold text-white">Pokeball</h2>
              <p className="text-gray-400">{pokeballs} adet</p>
            </div>
          </div>
          <div className="text-gray-300">
            <p className="mb-2">Pokeball kullanarak Pokemon yakalayın!</p>
            <p className="text-sm text-gray-500">
              10 Pokeball ile başlarsınız. Pokemon yakalayarak daha fazla kazanın!
            </p>
          </div>
        </div>

        {/* Caught Pokemon */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Yakalanan Pokemon</h2>
          {pokemon.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <div className="text-6xl mb-4">📖</div>
              <p>Henüz Pokemon yakalanmadı!</p>
              <p className="text-sm mt-2">Keşfe çıkın ve Pokemon yakalayın.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pokemon.map((caughtPokemon) => {
                const pokemonData = getPokemonById(caughtPokemon.pokemon_id)
                return (
                  <div key={caughtPokemon.id} className="bg-gray-700 rounded-lg p-4 text-center">
                    <img
                      src={pokemonData?.sprite}
                      alt={pokemonData?.name}
                      className="w-20 h-20 mx-auto mb-2"
                    />
                    <p className="text-white font-semibold">{caughtPokemon.nickname || pokemonData?.name}</p>
                    <p className="text-gray-400 text-sm">Level {caughtPokemon.level}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bag
