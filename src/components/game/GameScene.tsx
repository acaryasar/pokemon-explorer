import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import World from './World'
import Player3D from './Player3D'
import OtherPlayer3D from './OtherPlayer3D'
import WildPokemon3D from './WildPokemon3D'
import { subscribeToOnlinePlayers, type OnlinePlayer } from '../../lib/supabase/realtime'
import { useAuthStore } from '../../store/authStore'
import { useGameStore } from '../../store/gameStore'

function GameScene() {
  const { user } = useAuthStore()
  const { currentPokemon, isEncounter } = useGameStore()
  const [onlinePlayers, setOnlinePlayers] = useState<OnlinePlayer[]>([])
  const playerPositionRef = useRef({ x: 0, z: 0 })

  useEffect(() => {
    const unsubscribe = subscribeToOnlinePlayers(setOnlinePlayers)
    return unsubscribe
  }, [])

  const others = onlinePlayers.filter((p) => p.id !== user?.id)

  return (
    <Canvas shadows camera={{ fov: 60, near: 0.1, far: 200, position: [0, 3.2, 5.5] }}>
      <fog attach="fog" args={['#bfe3f5', 35, 95]} />
      <Sky sunPosition={[50, 60, 20]} turbidity={4} rayleigh={1} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[15, 25, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-camera-far={80}
      />

      <World />
      <Player3D positionRef={playerPositionRef} />
      {others.map((p) => (
        <OtherPlayer3D key={p.id} player={p} />
      ))}
      {isEncounter && currentPokemon && (
        <WildPokemon3D pokemon={currentPokemon} positionRef={playerPositionRef} />
      )}
    </Canvas>
  )
}

export default GameScene
