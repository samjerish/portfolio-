import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Environment, ContactShadows, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import Desktop from '../os/Desktop';
import FloatingName from './FloatingName';

const ComputerModel = () => {
    const groupRef = useRef<THREE.Group>(null);

    // Gently rotate the entire computer group
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Monitor Stand */}
            <mesh position={[0, -1.5, -0.5]}>
                <cylinderGeometry args={[0.2, 0.4, 0.2, 32]} />
                <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -1, -0.5]}>
                <boxGeometry args={[0.4, 1, 0.2]} />
                <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Monitor Body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4.2, 3.2, 0.2]} />
                <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Monitor Screen Area */}
            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[4, 3]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* The HTML Overlay representing the Screen */}
            <Html
                transform
                className="computer-screen"
                distanceFactor={1.5}
                position={[0, 0, 0.12]}
                style={{
                    width: '1024px',
                    height: '768px',
                    backgroundColor: '#000',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '4px solid #111'
                }}
            >
                {/* Scale down the desktop so it fits properly in our virtual screen */}
                <div style={{ width: '100%', height: '100%', zoom: 0.8 }}>
                    <Desktop />
                </div>
            </Html>
        </group>
    );
};

const Computer3D: React.FC = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
                
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <ComputerModel />
                        <FloatingName />
                    </Float>
                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                </Suspense>
                
                <OrbitControls 
                    enablePan={false} 
                    minPolarAngle={Math.PI / 3} 
                    maxPolarAngle={Math.PI / 2} 
                    minAzimuthAngle={-Math.PI / 4} 
                    maxAzimuthAngle={Math.PI / 4} 
                />
            </Canvas>
        </div>
    );
};

export default Computer3D;
