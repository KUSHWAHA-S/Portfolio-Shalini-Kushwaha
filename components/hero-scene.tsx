"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState, Suspense } from "react"
import { useTheme } from "next-themes"
import { getVisualThemeMode, scenePalettes } from "@/lib/visual-theme"

interface MeshRef {
  rotation: { x: number; y: number; z: number }
}

interface PointsRef {
  rotation: { x: number; y: number }
}

function AnimatedSphere({ accentColor }: { accentColor: string }) {
  const meshRef = useRef<MeshRef>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 100, 100]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={accentColor}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function ParticleField({ accentColor }: { accentColor: string }) {
  const count = 500
  const particlesRef = useRef<PointsRef>(null)
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={accentColor}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingRings({
  accentColor,
  accentSecondaryColor,
  accentWarmColor,
}: {
  accentColor: string
  accentSecondaryColor: string
  accentWarmColor: string
}) {
  const ring1Ref = useRef<MeshRef>(null)
  const ring2Ref = useRef<MeshRef>(null)
  const ring3Ref = useRef<MeshRef>(null)
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5
      ring1Ref.current.rotation.y = t * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.4 + Math.PI / 4
      ring2Ref.current.rotation.z = t * 0.2
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.6
      ring3Ref.current.rotation.z = t * 0.4 + Math.PI / 3
    }
  })
  
  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshStandardMaterial
          color={accentSecondaryColor}
          emissive={accentSecondaryColor}
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.8, 0.01, 16, 100]} />
        <meshStandardMaterial
          color={accentWarmColor}
          emissive={accentWarmColor}
          emissiveIntensity={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

export function HeroScene() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const sceneColors = useMemo(
    () => scenePalettes[getVisualThemeMode(resolvedTheme)],
    [resolvedTheme],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 -z-10" aria-hidden="true" />
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <color attach="background" args={[sceneColors.background]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={sceneColors.accent} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color={sceneColors.accentSecondary} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            color={sceneColors.light}
          />
          <AnimatedSphere accentColor={sceneColors.accent} />
          <FloatingRings
            accentColor={sceneColors.accent}
            accentSecondaryColor={sceneColors.accentSecondary}
            accentWarmColor={sceneColors.accentWarm}
          />
          <ParticleField accentColor={sceneColors.accentSecondary} />
          <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  )
}
