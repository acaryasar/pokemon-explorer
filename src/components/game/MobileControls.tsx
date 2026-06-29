import { useGameStore } from '../../store/gameStore'

function MobileControls() {
  const { movePlayer, encounterPokemon } = useGameStore()

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    movePlayer(direction)
    encounterPokemon()
  }

  return (
    <div className="md:hidden fixed bottom-24 right-4 z-50">
      <div className="grid grid-cols-3 gap-2 bg-gray-800 p-3 rounded-xl">
        <div></div>
        <button
          onClick={() => handleMove('up')}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center text-2xl font-bold active:scale-95 transition-transform"
        >
          ↑
        </button>
        <div></div>
        <button
          onClick={() => handleMove('left')}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center text-2xl font-bold active:scale-95 transition-transform"
        >
          ←
        </button>
        <div></div>
        <button
          onClick={() => handleMove('right')}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center text-2xl font-bold active:scale-95 transition-transform"
        >
          →
        </button>
        <div></div>
        <button
          onClick={() => handleMove('down')}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center text-2xl font-bold active:scale-95 transition-transform"
        >
          ↓
        </button>
        <div></div>
      </div>
    </div>
  )
}

export default MobileControls
