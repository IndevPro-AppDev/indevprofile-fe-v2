import type { JSX } from 'react'
import { Suspense, useRef } from 'react'

import type { GLTF } from 'three-stdlib'

import { animated, useSpring } from '@react-spring/three'
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type GLTFResult = GLTF & {
  nodes: {
    shape_blue_gradient: THREE.Mesh
    shape_orange_gradient: THREE.Mesh
    shape_star_orange_gradient: THREE.Mesh
  }
  materials: {
    blue: THREE.MeshStandardMaterial
    orange: THREE.MeshStandardMaterial
  }
}

export default function IndevproScene() {
  return (
    <div className="relative h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0.3, 3], fov: 61 }}
        className="h-full transform-gpu bg-transparent"
      >
        <Suspense fallback={null}>
          <IndevproModel />
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[0, 2, 3]} // Front-top
            intensity={0.4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.001}
            color="#FCFCFD"
          />
          <directionalLight
            position={[0, 2, -3]}
            intensity={0.3}
            color="#FCFCFD"
          />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.35}
            scale={12}
            blur={3.5}
            far={2.5}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export function IndevproModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/indevpro-3d.glb'
  ) as unknown as GLTFResult

  const groupRef = useRef<THREE.Group>(null!)

  const { scale, position } = useSpring({
    from: {
      opacity: 0,
      filter: 'blur(4px)',
      scale: 0,
      position: new THREE.Vector3(0, -0.4, 0)
    },
    to: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      position: new THREE.Vector3(0, -0.8, 0)
    },
    config: {
      mass: 0.4,
      damping: 12,
      stiffness: 115
    },
    delay: 250
  })

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.5
      groupRef.current.rotation.x = Math.sin(elapsed * 1.5) * 0.05
      groupRef.current.position.y = -0.8 + Math.sin(elapsed * 1.8) * 0.15
    }
  })

  return (
    <animated.group
      {...props}
      ref={groupRef}
      dispose={null}
      scale={scale}
      position={position}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shape_blue_gradient.geometry}
        material={materials.blue}
        rotation={[Math.PI / 2, 0, 0]}
        scale={160.09}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shape_orange_gradient.geometry}
        material={materials.orange}
        rotation={[Math.PI / 2, 0, 0]}
        scale={160.09}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shape_star_orange_gradient.geometry}
        material={materials.orange}
        rotation={[Math.PI / 2, 0, 0]}
        scale={160.09}
      />
    </animated.group>
  )
}

useGLTF.preload('/indevpro-3d.glb')
