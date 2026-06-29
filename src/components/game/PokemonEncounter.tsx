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
          <h2 className="text-2xl font-bold mb-4">A wild {currentPokemon.name} appeared!</h2>
          
          <div className="mb-4">
            <img
              src={currentPokemon.sprite}
              alt={currentPokemon.name}
              className="w-32 h-32 mx-auto"
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

          <div className="mb-4 text-left">
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
            <div className="flex justify-between text-sm mb-1">
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
