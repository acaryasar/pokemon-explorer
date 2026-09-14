import Modal from '../ui/Modal'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import { useGameStore } from '../../store/gameStore'
import { useInventoryStore } from '../../store/inventoryStore'
import { RARITY_COLORS } from '../../lib/constants/rarity'
import CatchAnimation from './CatchAnimation'

function PokemonEncounter() {
  const { currentPokemon, isEncounter, isCatching, catchPokemon, runAway } = useGameStore()
  const { pokeballs, usePokeball } = useInventoryStore()

  if (!isEncounter || !currentPokemon) return null

  const handleCatch = () => {
    if (pokeballs > 0) {
      usePokeball()
      catchPokemon()
    }
  }

  return (
    <Modal isOpen={isEncounter} onClose={runAway}>
      {isCatching ? (
        <CatchAnimation />
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">A wild {currentPokemon.name} appeared!</h2>
          
          <div className="mb-4 relative flex items-center justify-center">
            <div
              className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full blur-2xl opacity-40"
              style={{ backgroundColor: RARITY_COLORS[currentPokemon.rarity] }}
            />
            <img
              src={currentPokemon.sprite}
              alt={currentPokemon.name}
              className="relative w-44 h-44 md:w-56 md:h-56 mx-auto animate-float drop-shadow-2xl"
            />
          </div>

          <div className="mb-4">
            <div
              className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-2"
              style={{ backgroundColor: RARITY_COLORS[currentPokemon.rarity] }}
            >
              {currentPokemon.rarity.toUpperCase()}
            </div>
          </div>

          <div className="mb-4 text-left text-gray-800">
            <div className="mb-2">
              <span className="font-semibold">Types: </span>
              {currentPokemon.types.join(', ')}
            </div>
            <div className="mb-2">
              <span className="font-semibold">HP: </span>
              {currentPokemon.baseStats.hp}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Attack: </span>
              {currentPokemon.baseStats.attack}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Defense: </span>
              {currentPokemon.baseStats.defense}
            </div>
            <div>
              <span className="font-semibold">Speed: </span>
              {currentPokemon.baseStats.speed}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 text-gray-700">
              <span>Pokeballs</span>
              <span>{pokeballs}</span>
            </div>
            <ProgressBar value={pokeballs} max={50} color="blue" />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleCatch}
              variant="primary"
              disabled={pokeballs === 0}
              className="flex-1"
            >
              Yakala ({pokeballs} kaldı)
            </Button>
            <Button onClick={runAway} variant="secondary" className="flex-1">
              Kaç
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default PokemonEncounter
