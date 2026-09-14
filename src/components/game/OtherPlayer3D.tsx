import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'
import type { OnlinePlayer } from '../../lib/supabase/realtime'
import { getPlayerColor } from '../../lib/constants/playerColors'
import CharacterModel, { type WalkState } from './CharacterModel'

interface OtherPlayer3DProps {
  player: OnlinePlayer
}

function OtherPlayer3D({ player }: OtherPlayer3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const walkStateRef = useRef<WalkState>({ isMoving: false, walkTime: 0 })
  const smoothedRef = useRef({ x: player.x ?? 0, z: player.y ?? 0 })
  const rotationRef = useRef(0)
  const walkTimeRef = useRef(0)

  const color = useMemo(() => getPlayerColor(player.id), [player.id])

  useFrame((_state, delta) => {
    const targetX = player.x ?? 0
    const targetZ = player.y ?? 0

    const dx = targetX - smoothedRef.current.x
    const dz = targetZ - smoothedRef.current.z
    const dist = Math.hypot(dx, dz)
    const isMoving = dist > 0.05

    if (isMoving) {
      const targetAngle = Math.atan2(dx, dz)
      const angleDiff = THREE.MathUtils.euclideanModulo(
        targetAngle - rotationRef.current + Math.PI,
        Math.PI * 2
      ) - Math.PI
      rotationRef.current += angleDiff * Math.min(1, delta * 8)
      walkTimeRef.current += delta * 8
    } else {
      walkTimeRef.current = 0
    }

    smoothedRef.current.x = THREE.MathUtils.lerp(smoothedRef.current.x, targetX, Math.min(1, delta * 5))
    smoothedRef.current.z = THREE.MathUtils.lerp(smoothedRef.current.z, targetZ, Math.min(1, delta * 5))

    if (groupRef.current) {
      groupRef.current.position.set(smoothedRef.current.x, 0, smoothedRef.current.z)
      groupRef.current.rotation.y = rotationRef.current
    }
    walkStateRef.current.isMoving = isMoving
    walkStateRef.current.walkTime = walkTimeRef.current
  })

  return (
    <group ref={groupRef}>
      <CharacterModel color={color} walkStateRef={walkStateRef} />
      <Billboard position={[0, 1.75, 0]}>
        <Text fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000000">
          {player.username}
        </Text>
      </Billboard>
    </group>
  )
}

export default OtherPlayer3D
