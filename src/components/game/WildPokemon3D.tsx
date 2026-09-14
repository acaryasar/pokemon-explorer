import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { RARITY_COLORS } from '../../lib/constants/rarity'
import type { Pokemon } from '../../lib/types/pokemon'

interface WildPokemon3DProps {
  pokemon: Pokemon
  positionRef: React.MutableRefObject<{ x: number; z: number }>
}

function WildPokemonSprite({ pokemon, positionRef }: WildPokemon3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const texture = useTexture(pokemon.sprite)
  const glowColor = RARITY_COLORS[pokemon.rarity]

  useFrame((state) => {
    if (!groupRef.current) return
    const bob = Math.sin(state.clock.elapsedTime * 2) * 0.15
    groupRef.current.position.set(positionRef.current.x, 2.4 + bob, positionRef.current.z)
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.6
  })

  return (
    <group ref={groupRef}>
      <pointLight color={glowColor} intensity={3} distance={5} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.85, 32]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <Billboard>
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[1, 24]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.3} />
        </mesh>
        <mesh>
          <planeGeometry args={[1.8, 1.8]} />
          <meshBasicMaterial map={texture} transparent alphaTest={0.1} />
        </mesh>
      </Billboard>
    </group>
  )
}

function WildPokemon3D(props: WildPokemon3DProps) {
  return (
    <Suspense fallback={null}>
      <WildPokemonSprite {...props} />
    </Suspense>
  )
}

export default WildPokemon3D
