import { useEffect, useState } from 'react'

/**
 * Detects touch-primary devices (phones and tablets of any width) rather than
 * gating on a CSS width breakpoint, since tablets are often >= the `md`
 * breakpoint but still have no physical keyboard.
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)')
    const update = () => setIsTouch(query.matches || navigator.maxTouchPoints > 0)

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isTouch
}
