import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import { RARITY_COLORS } from '../../lib/constants/rarity'
import type { CaughtPokemon } from '../../lib/types/pokemon'
import { getPokemonById } from '../../lib/constants/pokemon'

interface PokemonCardProps {
  caughtPokemon: CaughtPokemon
}

function PokemonCard({ caughtPokemon }: PokemonCardProps) {
  const pokemon = getPokemonById(caughtPokemon.pokemon_id)

  if (!pokemon) return null

  return (
    <Card hover>
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <Avatar src={pokemon.sprite} alt={pokemon.name} size="lg" />
          <div>
            <h3 className="font-bold text-lg">{caughtPokemon.nickname || pokemon.name}</h3>
            <div
              className="inline-block px-2 py-1 rounded-full text-white text-xs font-semibold"
              style={{ backgroundColor: RARITY_COLORS[pokemon.rarity] }}
            >
              {pokemon.rarity.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <div className="mb-1">
            <span className="font-semibold">Seviye: </span>
            {caughtPokemon.level}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Türler: </span>
            {pokemon.types.join(', ')}
          </div>
          <div>
            <span className="font-semibold">Yakalandı: </span>
            {new Date(caughtPokemon.caught_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PokemonCard
