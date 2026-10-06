'use client'

import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, OrbitControls, useGLTF } from '@react-three/drei'
import { Component, Suspense } from 'react'
import type { ReactNode } from 'react'
import type { Group } from 'three'

// Декодер Draco лежит на нашем сайте (public/draco), а не на чужом CDN
useGLTF.setDecoderPath('/draco/')

// Если 3D не загрузилась (старый телефон, нет WebGL, сбой сети), сайт не должен падать целиком
class ModelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: unknown) { console.warn('[3D] модель не загрузилась', error) }
  render() { return this.state.failed ? <div className="car-model-poster" aria-hidden="true" /> : this.props.children }
}

function CarMesh() {
  const { scene } = useGLTF('/2024_byd_yangwang_u9.glb') as { scene: Group }
  return <primitive object={scene} scale={70} position={[0, -0.96, 0]} rotation={[0, Math.PI * 0.08, 0]} />
}

export function CarModel() {
  return (
    <ModelBoundary>
    <div className="car-model-canvas" role="group" aria-roledescription="3D viewer" aria-label="Интерактивная 3D-модель автомобиля BYD Yangwang U9">
      <Canvas shadows camera={{ position: [4.5, 1.5, 5.8], fov: 34 }} dpr={[1, 1.25]} frameloop="demand">
        <Suspense fallback={null}>
          <ambientLight intensity={0.42} />
          <directionalLight position={[4, 6, 5]} intensity={4.8} color="#fff1dc" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0002} />
          <directionalLight position={[-4, 3, 2]} intensity={2.6} color="#6c9dff" />
          <spotLight position={[0, 5.5, 1]} angle={0.5} penumbra={0.8} intensity={7} color="#ffffff" castShadow />
          <pointLight position={[-3, 1.8, -2]} intensity={3.5} color="#477dff" />
          <Environment resolution={256} environmentIntensity={0.38}>
            <Lightformer form="rect" intensity={4} position={[0, 5, -5]} scale={[10, 4, 1]} />
            <Lightformer form="rect" intensity={2} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
            <Lightformer form="rect" intensity={2} position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
            <Lightformer form="ring" intensity={2} position={[0, 4, 4]} scale={6} />
          </Environment>
          <CarMesh />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.99, 0]} receiveShadow>
            <planeGeometry args={[40, 40]} />
            <shadowMaterial transparent opacity={0.18} />
          </mesh>
          <ContactShadows position={[0, -0.985, 0]} opacity={0.88} scale={5.4} blur={1.35} far={1.55} resolution={1024} frames={1} />
          <OrbitControls enablePan={false} enableDamping dampingFactor={0.06} target={[0, -0.3, 0]} minDistance={5.8} maxDistance={7.8} minPolarAngle={Math.PI / 3.8} maxPolarAngle={Math.PI / 2.16} />
        </Suspense>
      </Canvas>
      <span className="model-hint">Потяните, чтобы осмотреть</span>
    </div>
    </ModelBoundary>
  )
}

useGLTF.preload('/2024_byd_yangwang_u9.glb')
