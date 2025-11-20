import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Stars, Float } from '@react-three/drei';

function SpinningBox(props) {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.5;
        mesh.current.rotation.y += delta * 0.2;
    });

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <SpinningBox position={[-1.2, 0, 0]} />
                <SpinningBox position={[1.2, 0, 0]} />
            </Float>

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Text
                    position={[0, 2, 0]}
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    Congratulations!
                </Text>
                <Text
                    position={[0, 1.2, 0]}
                    fontSize={0.3}
                    color="#cccccc"
                    anchorX="center"
                    anchorY="middle"
                >
                    You've reached the secret page.
                </Text>
            </Float>

            <OrbitControls enableZoom={false} />
        </>
    );
}

export default function SuccessPage() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#111', color: '#fff' }}>
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                <h1 style={{ margin: 0 }}>200 OK</h1>
                <p style={{ margin: 0, opacity: 0.7 }}>System Operational</p>
            </div>
            <Canvas>
                <Scene />
            </Canvas>
        </div>
    );
}
