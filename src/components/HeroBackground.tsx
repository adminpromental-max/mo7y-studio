"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/constants";

function BokehOrb({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const start = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + start;
    ref.current.position.y = position[1] + Math.sin(t) * 0.6;
    ref.current.position.x = position[0] + Math.cos(t * 0.6) * 0.4;
    ref.current.scale.setScalar(scale + Math.sin(t * 1.5) * 0.08);
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

function ApertureRing({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.35, 0.04, 8, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function SparkFlash({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const pulse = Math.pow(Math.abs(Math.sin(state.clock.elapsedTime * 2.5 + delay)), 4);
    ref.current.scale.setScalar(0.05 + pulse * 0.25);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.9;
  });

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[1, 16]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={0} />
    </mesh>
  );
}

function ParticleField() {
  const count = 120;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color(COLORS.primary),
      new THREE.Color(COLORS.primaryLight),
      new THREE.Color(COLORS.accentCyan),
      new THREE.Color(COLORS.accentYellow),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const orbs = useMemo(
    () => [
      { position: [-5, 2, -4] as [number, number, number], color: COLORS.primaryLight, scale: 1.2, speed: 0.25 },
      { position: [6, -1, -5] as [number, number, number], color: COLORS.accentCyan, scale: 0.9, speed: 0.35 },
      { position: [-3, -3, -3] as [number, number, number], color: COLORS.accentYellow, scale: 0.7, speed: 0.4 },
      { position: [4, 3, -6] as [number, number, number], color: COLORS.primary, scale: 1.5, speed: 0.2 },
      { position: [0, 0, -5] as [number, number, number], color: "#C084FC", scale: 1.8, speed: 0.15 },
    ],
    []
  );

  const rings = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        position: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5 - 2,
        ] as [number, number, number],
        color: [COLORS.primary, COLORS.accentCyan, COLORS.accentYellow][
          Math.floor(Math.random() * 3)
        ],
        speed: 0.2 + Math.random() * 0.5,
      })),
    []
  );

  const flashes = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4 - 1,
        ] as [number, number, number],
        delay: i * 0.7,
      })),
    []
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={COLORS.primaryLight} />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color={COLORS.accentCyan} />
      <ParticleField />
      {orbs.map((orb, i) => (
        <BokehOrb key={i} {...orb} />
      ))}
      {rings.map((ring, i) => (
        <ApertureRing key={i} {...ring} />
      ))}
      {flashes.map((flash, i) => (
        <SparkFlash key={i} {...flash} />
      ))}
    </>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Rich mesh gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(139, 92, 246, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 80% 70%, rgba(0, 180, 216, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 60% 20%, rgba(245, 166, 35, 0.18) 0%, transparent 45%),
            radial-gradient(ellipse 50% 50% at 10% 80%, rgba(107, 40, 217, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #f3e8ff 0%, #ede9fe 25%, #e0f2fe 60%, #faf5ff 100%)
          `,
        }}
      />

      {/* Animated aurora blobs — contained to avoid horizontal scroll */}
      <div className="absolute top-0 right-0 w-[min(500px,100vw)] h-[min(500px,80vh)] rounded-full bg-purple-400/30 blur-[100px] animate-pulse translate-x-1/4 -translate-y-1/4" />
      <div
        className="absolute bottom-0 left-0 w-[min(450px,90vw)] h-[min(450px,70vh)] rounded-full bg-cyan-400/25 blur-[90px] -translate-x-1/4 translate-y-1/4"
        style={{ animation: "pulse 4s ease-in-out infinite alternate" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,100vw)] h-[min(300px,50vh)] rounded-full bg-violet-300/20 blur-[80px]" />

      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>

      {/* Soft edge fade — not white wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-50/40 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
    </div>
  );
}
