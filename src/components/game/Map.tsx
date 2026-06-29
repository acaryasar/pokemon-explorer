import { useGameStore } from '../../store/gameStore'
import Player from './Player'

function Map() {
  const { playerPosition } = useGameStore()

  const gridSize = 10
  const tiles = []

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const isPlayer = playerPosition.x === x && playerPosition.y === y
      tiles.push(
        <div
          key={`${x}-${y}`}
          className={`
            relative aspect-square border border-gray-300 bg-green-100
            ${isPlayer ? 'bg-green-200' : ''}
          `}
        >
          {isPlayer && <Player />}
        </div>
      )
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          maxWidth: '500px',
        }}
      >
        {tiles}
      </div>
      <div className="mt-4 text-white text-center text-sm">
        Use arrow keys or WASD to move
      </div>
    </div>
  )
}

export default Map
