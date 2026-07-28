import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const FloatingName: React.FC = () => {
    const textRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (textRef.current) {
            // Gentle floating animation
            textRef.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime) * 0.1;
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Text
            ref={textRef}
            position={[0, 2.5, -2]}
            fontSize={0.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
        >
            SAM JERISH D
        </Text>
    );
};

export default FloatingName;
