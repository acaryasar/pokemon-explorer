import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export interface WalkState {
  isMoving: boolean
  walkTime: number
}

interface CharacterModelProps {
  color: string
  walkStateRef: React.MutableRefObject<WalkState>
}

const SKIN_COLOR = '#ffd9b3'

/** A simple low-poly child figure: round head, short torso, and jointed arms/legs that swing while walking. */
function CharacterModel({ color, walkStateRef }: CharacterModelProps) {
  const bounceRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftLegRef = useRef<THREE.Group>(null)
  const rightLegRef = useRef<THREE.Group>(null)

  const capColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.6).getStyle(), [color])

  useFrame(() => {
    const { isMoving, walkTime } = walkStateRef.current
    const swing = isMoving ? Math.sin(walkTime) * 0.55 : 0
    const bob = isMoving ? Math.abs(Math.sin(walkTime)) * 0.08 : 0

    if (bounceRef.current) bounceRef.current.position.y = bob
    if (leftArmRef.current) leftArmRef.current.rotation.x = swing
    if (rightArmRef.current) rightArmRef.current.rotation.x = -swing
    if (leftLegRef.current) leftLegRef.current.rotation.x = -swing
    if (rightLegRef.current) rightLegRef.current.rotation.x = swing
  })

  return (
    <group ref={bounceRef}>
      {/* Legs, each ending in a small foot */}
      <group ref={leftLegRef} position={[-0.12, 0.5, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.3, 4, 8]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
        <mesh position={[0, -0.46, 0.03]} castShadow>
          <sphereGeometry args={[0.1, 10, 8]} />
          <meshStandardMaterial color={capColor} flatShading />
        </mesh>
      </group>
      <group ref={rightLegRef} position={[0.12, 0.5, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.3, 4, 8]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
        <mesh position={[0, -0.46, 0.03]} castShadow>
          <sphereGeometry args={[0.1, 10, 8]} />
          <meshStandardMaterial color={capColor} flatShading />
        </mesh>
      </group>

      {/* Torso */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.28, 4, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>

      {/* Arms, each ending in a small hand */}
      <group ref={leftArmRef} position={[-0.3, 0.85, 0]}>
        <mesh position={[0, -0.17, 0]} castShadow>
          <capsuleGeometry args={[0.075, 0.24, 4, 8]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
        <mesh position={[0, -0.37, 0]} castShadow>
          <sphereGeometry args={[0.085, 10, 8]} />
          <meshStandardMaterial color={SKIN_COLOR} flatShading />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[0.3, 0.85, 0]}>
        <mesh position={[0, -0.17, 0]} castShadow>
          <capsuleGeometry args={[0.075, 0.24, 4, 8]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
        <mesh position={[0, -0.37, 0]} castShadow>
          <sphereGeometry args={[0.085, 10, 8]} />
          <meshStandardMaterial color={SKIN_COLOR} flatShading />
        </mesh>
      </group>

      {/* Head (big, child-like proportions) */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.3, 14, 12]} />
        <meshStandardMaterial color={SKIN_COLOR} flatShading />
      </mesh>

      {/* Cap, tinted to match the outfit color */}
      <mesh position={[0, 1.36, 0]} castShadow>
        <coneGeometry args={[0.32, 0.24, 12]} />
        <meshStandardMaterial color={capColor} flatShading />
      </mesh>
    </group>
  )
}

export default CharacterModel
