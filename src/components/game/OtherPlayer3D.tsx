import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'
import type { OnlinePlayer } from '../../lib/supabase/realtime'

interface OtherPlayer3DProps {
  player: OnlinePlayer
}

function OtherPlayer3D({ player }: OtherPlayer3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const smoothedRef = useRef({ x: player.x ?? 0, z: player.y ?? 0 })
  const rotationRef = useRef(0)
  const walkTimeRef = useRef(0)

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
    if (bodyRef.current) {
      bodyRef.current.position.y = isMoving ? Math.abs(Math.sin(walkTimeRef.current)) * 0.12 : 0
    }
  })

  return (
    <group ref={groupRef}>
      <group ref={bodyRef}>
        <mesh position={[0, 0.9, 0]} castShadow>
          <capsuleGeometry args={[0.3, 0.6, 4, 8]} />
          <meshStandardMaterial color="#3a86ff" flatShading />
        </mesh>
        <mesh position={[0, 1.55, 0]} castShadow>
          <sphereGeometry args={[0.28, 12, 10]} />
          <meshStandardMaterial color="#ffd9b3" flatShading />
        </mesh>
        <mesh position={[0, 1.72, 0]} castShadow>
          <coneGeometry args={[0.3, 0.22, 12]} />
          <meshStandardMaterial color="#ffb703" flatShading />
        </mesh>
      </group>
      <Billboard position={[0, 2.2, 0]}>
        <Text fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000000">
          {player.username}
        </Text>
      </Billboard>
    </group>
  )
}

export default OtherPlayer3D
