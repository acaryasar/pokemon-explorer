import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import type { Direction } from '../lib/types/game'

export function useMovement() {
  const { movePlayer, encounterPokemon } = useGameStore()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      let direction: Direction | null = null

      if (key === 'arrowup' || key === 'w') {
        direction = 'up'
      } else if (key === 'arrowdown' || key === 's') {
        direction = 'down'
      } else if (key === 'arrowleft' || key === 'a') {
        direction = 'left'
      } else if (key === 'arrowright' || key === 'd') {
        direction = 'right'
      }

      if (direction) {
        movePlayer(direction)
        encounterPokemon()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [movePlayer, encounterPokemon])
}
