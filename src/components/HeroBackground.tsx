"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "@/lib/constants";

function GridPlane() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.z = -3 + Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2.5, -4]}>
      <planeGeometry args={[28, 28, 24, 24]} />
      <meshBasicMaterial
        color={COLORS.primaryLight}
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

function NetworkNodes() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      [
        [-4, 1.5, -2],
        [-1.5, 2.8, -3],
        [2, 2.2, -2.5],
        [4.5, 0.8, -3],
        [0, 0.5, -4],
        [-3, -0.5, -3.5],
        [3, -1, -3],
      ] as [number, number, number][],
    []
  );

  const lineGeo = useMemo(() => {
    const pairs: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
      [4, 6],
      [2, 6],
      [0, 5],
    ];
    const points: THREE.Vector3[] = [];
    pairs.forEach(([a, b]) => {
      points.push(new THREE.Vector3(...nodes[a]));
      points.push(new THREE.Vector3(...nodes[b]));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={COLORS.accentCyan} transparent opacity={0.35} />
      </lineSegments>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08 + (i % 3) * 0.03, 12, 12]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? COLORS.primaryLight : COLORS.accentCyan}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

function GrowthBars() {
  const group = useRef<THREE.Group>(null);
  const heights = [0.4, 0.7, 1.0, 1.35, 1.6];

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const base = heights[i];
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2 + i * 0.5) * 0.06;
      mesh.scale.y = base * pulse;
    });
  });

  return (
    <group ref={group} position={[5.5, -1.2, -3]}>
      {heights.map((h, i) => (
        <mesh key={i} position={[i * 0.45 - 0.9, h / 2, 0]}>
          <boxGeometry args={[0.28, 1, 0.28]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? COLORS.primary : COLORS.accentCyan}
            emissive={COLORS.primaryLight}
            emissiveIntensity={0.25}
            metalness={0.4}
            roughness={0.35}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingPanels() {
  const panels = useMemo(
    () => [
      { pos: [-5.5, 0.5, -4] as [number, number, number], rot: 0.3, color: COLORS.primary },
      { pos: [5, 2.5, -5] as [number, number, number], rot: -0.4, color: COLORS.accentCyan },
      { pos: [-2, -1.5, -5] as [number, number, number], rot: 0.15, color: COLORS.accentYellow },
    ],
    []
  );

  return (
    <>
      {panels.map((p, i) => (
        <FloatingPanel key={i} {...p} index={i} />
      ))}
    </>
  );
}

function FloatingPanel({
  pos,
  rot,
  color,
  index,
}: {
  pos: [number, number, number];
  rot: number;
  color: string;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = pos[1] + Math.sin(t * 0.5 + index) * 0.25;
    ref.current.rotation.z = rot + Math.sin(t * 0.3 + index) * 0.05;
  });

  return (
    <mesh ref={ref} position={pos} rotation={[0, rot, 0]}>
      <planeGeometry args={[1.8, 1.1]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

function AmbientParticles() {
  const count = 80;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color(COLORS.primaryLight),
      new THREE.Color(COLORS.accentCyan),
      new THREE.Color("#C4B5FD"),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
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
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={0.7} color={COLORS.primaryLight} />
      <pointLight position={[-4, 2, 3]} intensity={0.4} color={COLORS.accentCyan} />
      <GridPlane />
      <NetworkNodes />
      <GrowthBars />
      <FloatingPanels />
      <AmbientParticles />
    </>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 75% 25%, rgba(139, 92, 246, 0.22) 0%, transparent 55%),
            radial-gradient(ellipse 60% 45% at 15% 75%, rgba(0, 180, 216, 0.14) 0%, transparent 50%),
            linear-gradient(160deg, #f8f7ff 0%, #f3f0ff 40%, #eef8fc 100%)
          `,
        }}
      />

      <div className="absolute top-0 right-0 w-[min(480px,100vw)] h-[min(480px,75vh)] rounded-full bg-violet-300/20 blur-[100px] translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[min(400px,85vw)] h-[min(400px,65vh)] rounded-full bg-cyan-300/15 blur-[90px] -translate-x-1/4 translate-y-1/4" />

      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #6B28D9 1px, transparent 1px),
            linear-gradient(to bottom, #6B28D9 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <Canvas
        camera={{ position: [0, 0.5, 9], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/70 pointer-events-none" />
    </div>
  );
}
