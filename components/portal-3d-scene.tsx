"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export default function PortalScene() {
  const groupRef = useRef<THREE.Group | null>(null)
  const torusRef = useRef<THREE.Mesh | null>(null)
  const torusRef2 = useRef<THREE.Mesh | null>(null)
  const boxRef = useRef<THREE.Mesh | null>(null)
  const spheresRef = useRef<THREE.Mesh[]>([])

  // ✅ Viewport-based responsiveness
  const { size } = useThree()
  const isMobile = size.width < 640
  const isTablet = size.width >= 640 && size.width < 1024

  useFrame((state) => {
    if (groupRef.current) {
      // 🎯 Reduced parallax on smaller screens
      const parallaxStrength = isMobile ? 0.04 : isTablet ? 0.07 : 0.1
      groupRef.current.rotation.x = state.mouse.y * parallaxStrength
      groupRef.current.rotation.y = state.mouse.x * parallaxStrength
    }

    // Rotate tori (unchanged)
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.002
      torusRef.current.rotation.y += 0.003
    }

    if (torusRef2.current) {
      torusRef2.current.rotation.x -= 0.001
      torusRef2.current.rotation.y -= 0.002
    }

    // Rotate central box (unchanged)
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.004
      boxRef.current.rotation.y += 0.005
      boxRef.current.rotation.z += 0.003
    }

    // Animate floating spheres (unchanged)
    spheresRef.current.forEach((sphere, idx) => {
      sphere.position.y += Math.sin(state.clock.elapsedTime + idx) * 0.003
      sphere.position.x += Math.cos(state.clock.elapsedTime * 0.8 + idx) * 0.002
    })
  })

  return (
    <group
      ref={groupRef}
      // ✅ Scale scene based on device
      scale={
        isMobile
          ? 0.65
          : isTablet
          ? 0.8
          : 1
      }
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffaa00" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#0099ff" />

      {/* Central rotating torus */}
      <mesh ref={torusRef}>
        <torusGeometry args={[2, 0.4, 16, 100]} />
        <meshStandardMaterial
          color="#ff8800"
          emissive="#ff8800"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Secondary torus */}
      <mesh ref={torusRef2} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[3, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#0099ff"
          emissive="#0099ff"
          emissiveIntensity={0.2}
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Central rotating cube */}
      <mesh ref={boxRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ff8800"
          emissive="#ff8800"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Floating glowing spheres */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 4,
            Math.sin((i / 5) * Math.PI * 2) * 3,
            Math.cos((i / 5) * Math.PI * 2) * 3,
          ]}
          ref={(el) => {
            if (el) spheresRef.current[i] = el
          }}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ff8800" : "#0099ff"}
            emissive={i % 2 === 0 ? "#ff8800" : "#0099ff"}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Wireframe background polyhedron */}
      <mesh position={[0, 0, -8]}>
        <dodecahedronGeometry args={[4, 0]} />
        <meshStandardMaterial
          color="#ff8800"
          emissive="#ff8800"
          emissiveIntensity={0.1}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}
