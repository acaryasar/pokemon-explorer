import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'

function MobileControls() {
  const { movePlayer, encounterPokemon } = useGameStore()
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const moveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleStart = (clientX: number, clientY: number) => {
    if (!joystickRef.current) return
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    setIsDragging(true)
    updatePosition(clientX - centerX, clientY - centerY)
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !joystickRef.current) return
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    updatePosition(clientX - centerX, clientY - centerY)
  }

  const updatePosition = (deltaX: number, deltaY: number) => {
    const maxDistance = 50
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    let x = deltaX
    let y = deltaY
    
    if (distance > maxDistance) {
      x = (deltaX / distance) * maxDistance
      y = (deltaY / distance) * maxDistance
    }
    
    setPosition({ x, y })
    
    // Determine direction based on position
    const threshold = 15
    let direction: 'up' | 'down' | 'left' | 'right' | null = null
    
    if (Math.abs(x) > Math.abs(y)) {
      if (x > threshold) direction = 'right'
      else if (x < -threshold) direction = 'left'
    } else {
      if (y > threshold) direction = 'down'
      else if (y < -threshold) direction = 'up'
    }
    
    if (direction) {
      // Clear existing interval
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current)
      }
      
      // Move immediately
      movePlayer(direction)
      encounterPokemon()
      
      // Set up continuous movement
      moveIntervalRef.current = setInterval(() => {
        movePlayer(direction)
        encounterPokemon()
      }, 150)
    } else {
      // Clear interval if no direction
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current)
        moveIntervalRef.current = null
      }
    }
  }

  const handleEnd = () => {
    setIsDragging(false)
    setPosition({ x: 0, y: 0 })
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current)
      moveIntervalRef.current = null
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    handleMove(touch.clientX, touch.clientY)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault()
    handleMove(e.clientX, e.clientY)
  }

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="md:hidden fixed bottom-24 left-4 z-50">
      <div
        ref={joystickRef}
        className="relative w-32 h-32 bg-gray-800/80 rounded-full border-4 border-gray-700 touch-none select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        <div
          ref={knobRef}
          className="absolute w-14 h-14 bg-blue-600 rounded-full shadow-lg transition-transform duration-75"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            left: 'calc(50% - 28px)',
            top: 'calc(50% - 28px)',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileControls
