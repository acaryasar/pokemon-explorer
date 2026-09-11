import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useKeyboardControls } from '../../hooks/useKeyboardControls'
import { useGameStore } from '../../store/gameStore'
import { useAuthStore } from '../../store/authStore'
import { updateOnlinePlayer } from '../../lib/supabase/realtime'
import { OBSTACLES, PLAYER_RADIUS, PLAYER_SPEED, WORLD_HALF_SIZE } from '../../lib/constants/world'

const SYNC_INTERVAL = 0.15 // seconds between multiplayer position updates
const ENCOUNTER_DISTANCE = 3 // world units walked before rolling a new encounter check
const CAMERA_HEIGHT = 3.2
const CAMERA_DISTANCE = 5.5

function resolveCollisions(x: number, z: number): { x: number; z: number } {
  let resultX = x
  let resultZ = z

  for (const o of OBSTACLES) {
    const dx = resultX - o.x
    const dz = resultZ - o.z
    const minDist = PLAYER_RADIUS + o.radius
    const dist = Math.hypot(dx, dz)
    if (dist < minDist && dist > 0.0001) {
      const push = (minDist - dist) / dist
      resultX += dx * push
      resultZ += dz * push
    }
  }

  const bound = WORLD_HALF_SIZE - PLAYER_RADIUS
  resultX = THREE.MathUtils.clamp(resultX, -bound, bound)
  resultZ = THREE.MathUtils.clamp(resultZ, -bound, bound)

  return { x: resultX, z: resultZ }
}

interface Player3DProps {
  positionRef: React.MutableRefObject<{ x: number; z: number }>
}

function Player3D({ positionRef }: Player3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const getInputVector = useKeyboardControls()
  const { camera } = useThree()

  const rotationRef = useRef(0)
  const walkTimeRef = useRef(0)
  const syncTimerRef = useRef(0)
  const encounterDistanceRef = useRef(0)
  const cameraInitializedRef = useRef(false)

  const { username, profile } = useAuthStore()

  useFrame((_state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1)
    const isEncounter = useGameStore.getState().isEncounter
    const joystick = useGameStore.getState().joystickVector
    const keyboard = getInputVector()

    let dirX = keyboard.x + joystick.x
    let dirZ = keyboard.z + joystick.z
    const magnitude = Math.hypot(dirX, dirZ)
    const isMoving = !isEncounter && magnitude > 0.05

    if (isMoving) {
      dirX /= magnitude
      dirZ /= magnitude

      const nextX = positionRef.current.x + dirX * PLAYER_SPEED * delta
      const nextZ = positionRef.current.z + dirZ * PLAYER_SPEED * delta
      const distanceStep = Math.hypot(
        nextX - positionRef.current.x,
        nextZ - positionRef.current.z
      )
      const resolved = resolveCollisions(nextX, nextZ)
      positionRef.current = resolved

      const targetAngle = Math.atan2(dirX, dirZ)
      const angleDiff = THREE.MathUtils.euclideanModulo(
        targetAngle - rotationRef.current + Math.PI,
        Math.PI * 2
      ) - Math.PI
      rotationRef.current += angleDiff * Math.min(1, delta * 10)

      walkTimeRef.current += delta * 8
      encounterDistanceRef.current += distanceStep
      if (encounterDistanceRef.current >= ENCOUNTER_DISTANCE) {
        encounterDistanceRef.current = 0
        useGameStore.getState().encounterPokemon()
      }
    } else {
      walkTimeRef.current = 0
    }

    if (groupRef.current) {
      groupRef.current.position.set(positionRef.current.x, 0, positionRef.current.z)
      groupRef.current.rotation.y = rotationRef.current
    }
    if (bodyRef.current) {
      bodyRef.current.position.y = isMoving ? Math.abs(Math.sin(walkTimeRef.current)) * 0.12 : 0
    }

    // Throttled multiplayer position sync
    syncTimerRef.current += delta
    if (syncTimerRef.current >= SYNC_INTERVAL) {
      syncTimerRef.current = 0
      const user = useAuthStore.getState().user
      if (user) {
        const displayName = profile?.username || username || 'Anonymous'
        updateOnlinePlayer(
          user.id,
          displayName,
          Math.round(positionRef.current.x),
          Math.round(positionRef.current.z)
        )
      }
    }

    // Third-person chase camera
    const behindX = positionRef.current.x - Math.sin(rotationRef.current) * CAMERA_DISTANCE
    const behindZ = positionRef.current.z - Math.cos(rotationRef.current) * CAMERA_DISTANCE
    const targetCamPos = new THREE.Vector3(behindX, CAMERA_HEIGHT, behindZ)

    if (!cameraInitializedRef.current) {
      camera.position.copy(targetCamPos)
      cameraInitializedRef.current = true
    } else {
      camera.position.lerp(targetCamPos, Math.min(1, delta * 4))
    }
    camera.lookAt(positionRef.current.x, 1, positionRef.current.z)
  })

  const displayName = profile?.username || username || 'Sen'

  return (
    <group ref={groupRef}>
      <group ref={bodyRef}>
        <mesh position={[0, 0.9, 0]} castShadow>
          <capsuleGeometry args={[0.3, 0.6, 4, 8]} />
          <meshStandardMaterial color="#e63946" flatShading />
        </mesh>
        <mesh position={[0, 1.55, 0]} castShadow>
          <sphereGeometry args={[0.28, 12, 10]} />
          <meshStandardMaterial color="#ffd9b3" flatShading />
        </mesh>
        <mesh position={[0, 1.72, 0]} castShadow>
          <coneGeometry args={[0.3, 0.22, 12]} />
          <meshStandardMaterial color="#1d3557" flatShading />
        </mesh>
      </group>
      <Billboard position={[0, 2.2, 0]}>
        <Text fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000000">
          {displayName}
        </Text>
      </Billboard>
    </group>
  )
}

export default Player3D
