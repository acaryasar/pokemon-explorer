import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'

const MAX_DISTANCE = 50

function MobileControls() {
  const setJoystickVector = useGameStore((s) => s.setJoystickVector)
  const [isDragging, setIsDragging] = useState(false)
  const [isMovingJoystick, setIsMovingJoystick] = useState(false)
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 })
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateVector = (deltaX: number, deltaY: number) => {
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    let x = deltaX
    let y = deltaY
    if (distance > MAX_DISTANCE) {
      x = (deltaX / distance) * MAX_DISTANCE
      y = (deltaY / distance) * MAX_DISTANCE
    }

    setKnobPosition({ x, y })
    setJoystickVector({ x: x / MAX_DISTANCE, z: y / MAX_DISTANCE })
  }

  const handleStart = (clientX: number, clientY: number) => {
    if (!joystickRef.current) return
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    setIsDragging(true)
    updateVector(clientX - centerX, clientY - centerY)
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !joystickRef.current) return
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    updateVector(clientX - centerX, clientY - centerY)
  }

  const handleEnd = () => {
    setIsDragging(false)
    setKnobPosition({ x: 0, y: 0 })
    setJoystickVector({ x: 0, z: 0 })
  }

  const handleJoystickDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsMovingJoystick(true)
  }

  const handleJoystickDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isMovingJoystick || !containerRef.current) return
    e.preventDefault()

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const containerRect = containerRef.current.getBoundingClientRect()
    const newX = clientX - containerRect.left - 64
    const newY = clientY - containerRect.top - 64

    setJoystickPosition({ x: newX, y: newY })
  }

  const handleJoystickDragEnd = () => {
    setIsMovingJoystick(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMovingJoystick) return
    e.preventDefault()
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMovingJoystick) {
      handleJoystickDragMove(e)
    } else {
      e.preventDefault()
      const touch = e.touches[0]
      handleMove(touch.clientX, touch.clientY)
    }
  }

  const handleTouchEnd = () => {
    if (isMovingJoystick) {
      handleJoystickDragEnd()
    } else {
      handleEnd()
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMovingJoystick) return
    e.preventDefault()
    handleStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMovingJoystick) {
      handleJoystickDragMove(e)
    } else {
      e.preventDefault()
      handleMove(e.clientX, e.clientY)
    }
  }

  const handleMouseUp = () => {
    if (isMovingJoystick) {
      handleJoystickDragEnd()
    } else {
      handleEnd()
    }
  }

  // Stop any residual movement if the widget unmounts mid-drag
  useEffect(() => {
    return () => setJoystickVector({ x: 0, z: 0 })
  }, [setJoystickVector])

  return (
    <div ref={containerRef} className="md:hidden fixed inset-0 pointer-events-none z-40">
      <div
        className="absolute pointer-events-auto"
        style={{
          left: `calc(50% + ${joystickPosition.x}px - 64px)`,
          top: `calc(100% + ${joystickPosition.y}px - 150px)`,
        }}
      >
        <div
          ref={joystickRef}
          className="relative w-32 h-32 bg-gray-800/80 rounded-full border-4 border-gray-700 touch-none select-none cursor-move"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-600 rounded-full cursor-move z-10"
            onMouseDown={handleJoystickDragStart}
            onTouchStart={handleJoystickDragStart}
          >
            <div className="w-full h-full flex items-center justify-center text-white text-xs">⋮⋮</div>
          </div>

          <div
            className="absolute w-14 h-14 bg-blue-600 rounded-full shadow-lg transition-transform duration-75"
            style={{
              transform: `translate(${knobPosition.x}px, ${knobPosition.y}px)`,
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
    </div>
  )
}

export default MobileControls
