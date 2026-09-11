import { useEffect, useRef } from 'react'
import type { MoveVector } from '../lib/types/game'

const KEY_MAP: Record<string, keyof typeof INITIAL_KEYS> = {
  arrowup: 'up',
  w: 'up',
  arrowdown: 'down',
  s: 'down',
  arrowleft: 'left',
  a: 'left',
  arrowright: 'right',
  d: 'right',
}

const INITIAL_KEYS = { up: false, down: false, left: false, right: false }

/**
 * Tracks held movement keys in a ref (not state) so the render loop can read
 * input every frame without triggering React re-renders on every keystroke.
 */
export function useKeyboardControls() {
  const keys = useRef({ ...INITIAL_KEYS })
  const vector = useRef<MoveVector>({ x: 0, z: 0 })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mapped = KEY_MAP[e.key.toLowerCase()]
      if (mapped) keys.current[mapped] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      const mapped = KEY_MAP[e.key.toLowerCase()]
      if (mapped) keys.current[mapped] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Returns a normalized (x, z) direction vector for the currently held keys.
  return () => {
    const k = keys.current
    vector.current.x = (k.right ? 1 : 0) - (k.left ? 1 : 0)
    vector.current.z = (k.down ? 1 : 0) - (k.up ? 1 : 0)
    return vector.current
  }
}
