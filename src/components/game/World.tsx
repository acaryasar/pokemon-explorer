import { Grid } from '@react-three/drei'
import { OBSTACLES, WORLD_HALF_SIZE } from '../../lib/constants/world'

function Tree({ x, z, scale }: { x: number; z: number; scale: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1, 6]} />
        <meshStandardMaterial color="#6b4423" flatShading />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <coneGeometry args={[0.7, 1.2, 7]} />
        <meshStandardMaterial color="#2f7a3c" flatShading />
      </mesh>
      <mesh position={[0, 1.9, 0]} castShadow>
        <coneGeometry args={[0.55, 1, 7]} />
        <meshStandardMaterial color="#38924a" flatShading />
      </mesh>
    </group>
  )
}

function Rock({ x, z, scale }: { x: number; z: number; scale: number }) {
  return (
    <mesh position={[x, 0.3 * scale, z]} scale={scale} rotation={[0.3, 0.6, 0.1]} castShadow>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#8a8a8a" flatShading />
    </mesh>
  )
}

function World() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[WORLD_HALF_SIZE * 2, WORLD_HALF_SIZE * 2]} />
        <meshStandardMaterial color="#4a9c4f" />
      </mesh>

      <Grid
        position={[0, 0.01, 0]}
        args={[WORLD_HALF_SIZE * 2, WORLD_HALF_SIZE * 2]}
        cellSize={1}
        cellColor="#3d8542"
        sectionSize={5}
        sectionColor="#2f6b34"
        fadeDistance={40}
        infiniteGrid={false}
      />

      {OBSTACLES.map((o, i) =>
        o.type === 'tree' ? (
          <Tree key={i} x={o.x} z={o.z} scale={o.scale} />
        ) : (
          <Rock key={i} x={o.x} z={o.z} scale={o.scale} />
        )
      )}
    </group>
  )
}

export default World
