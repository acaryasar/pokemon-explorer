import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'
import { useIsTouchDevice } from '../../hooks/useIsTouchDevice'

const MAX_DISTANCE = 50

function MobileControls() {
  const setJoystickVector = useGameStore((s) => s.setJoystickVector)
  const isTouchDevice = useIsTouchDevice()
  const [isDragging, setIsDragging] = useState(false)
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)

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

  // Stop any residual movement if the widget unmounts mid-drag
  useEffect(() => {
    return () => setJoystickVector({ x: 0, z: 0 })
  }, [setJoystickVector])

  if (!isTouchDevice) return null

  return (
    <div
      className="fixed z-40"
      style={{
        left: 'max(1.25rem, env(safe-area-inset-left))',
        bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
      }}
    >
      <div
        ref={joystickRef}
        className="relative rounded-full touch-none select-none"
        style={{
          width: 'clamp(88px, 24vmin, 136px)',
          height: 'clamp(88px, 24vmin, 136px)',
          background: 'radial-gradient(circle at 35% 30%, rgba(55,65,81,0.85), rgba(17,24,39,0.85))',
          border: '2px solid rgba(255,255,255,0.15)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4), inset 0 0 12px rgba(0,0,0,0.5)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {/* Directional hints */}
        <span className="absolute top-1.5 left-1/2 -translate-x-1/2 text-white/40 text-xs leading-none">▲</span>
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-white/40 text-xs leading-none">▼</span>
        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-white/40 text-xs leading-none">◀</span>
        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-white/40 text-xs leading-none">▶</span>

        <div
          className="absolute rounded-full transition-transform duration-75"
          style={{
            width: 'clamp(40px, 11vmin, 60px)',
            height: 'clamp(40px, 11vmin, 60px)',
            left: '50%',
            top: '50%',
            marginLeft: 'clamp(-30px, -5.5vmin, -20px)',
            marginTop: 'clamp(-30px, -5.5vmin, -20px)',
            transform: `translate(${knobPosition.x}px, ${knobPosition.y}px)`,
            background: 'radial-gradient(circle at 35% 30%, #60a5fa, #2563eb)',
            boxShadow: isDragging
              ? '0 0 0 6px rgba(96,165,250,0.25), 0 2px 8px rgba(0,0,0,0.5)'
              : '0 2px 8px rgba(0,0,0,0.5)',
          }}
        />
      </div>
    </div>
  )
}

export default MobileControls
