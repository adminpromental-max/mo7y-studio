"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ServiceIcon = "photo" | "video" | "montage" | "creative";

interface Props {
  color: string;
  accent: string;
  icon: ServiceIcon;
}

const mat = (color: string, accent: string, opacity = 0.9) =>
  new THREE.MeshStandardMaterial({
    color,
    emissive: accent,
    emissiveIntensity: 0.35,
    metalness: 0.55,
    roughness: 0.28,
    transparent: true,
    opacity,
  });

function Camera3D({ color, accent }: { color: string; accent: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.5;
      group.current.position.y = Math.sin(s.clock.elapsedTime * 1.2) * 0.08;
    }
  });
  return (
    <group ref={group}>
      <mesh material={mat(color, accent)}>
        <boxGeometry args={[0.85, 0.52, 0.32]} />
      </mesh>
      <mesh position={[0.38, 0, 0.05]} rotation={[0, Math.PI / 2, 0]} material={mat(accent, color)}>
        <cylinderGeometry args={[0.2, 0.24, 0.38, 16]} />
      </mesh>
      <mesh position={[-0.12, 0.32, 0]} material={mat(color, accent, 0.85)}>
        <boxGeometry args={[0.22, 0.1, 0.18]} />
      </mesh>
      <mesh position={[0.38, 0, 0.22]} material={mat("#111", accent, 0.7)}>
        <circleGeometry args={[0.12, 16]} />
      </mesh>
    </group>
  );
}

function Video3D({ color, accent }: { color: string; accent: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.45;
      group.current.position.y = Math.sin(s.clock.elapsedTime * 1.1) * 0.08;
    }
  });
  return (
    <group ref={group}>
      <mesh material={mat(color, accent)}>
        <boxGeometry args={[1, 0.65, 0.12]} />
      </mesh>
      <mesh position={[0.08, 0, 0.08]} rotation={[0, 0, -Math.PI / 2]} material={mat(accent, "#ffffff", 0.95)}>
        <coneGeometry args={[0.22, 0.32, 3]} />
      </mesh>
      <mesh position={[-0.55, 0.38, 0]} material={mat(color, accent, 0.8)}>
        <boxGeometry args={[0.18, 0.12, 0.1]} />
      </mesh>
    </group>
  );
}

function Montage3D({ color, accent }: { color: string; accent: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.8) * 0.15;
      group.current.rotation.y = s.clock.elapsedTime * 0.4;
      group.current.position.y = Math.sin(s.clock.elapsedTime * 1.3) * 0.08;
    }
  });
  const bladeMat = mat(color, accent);
  return (
    <group ref={group}>
      <mesh position={[-0.15, 0.1, 0]} rotation={[0, 0, 0.5]} material={bladeMat}>
        <boxGeometry args={[0.55, 0.1, 0.06]} />
      </mesh>
      <mesh position={[0.15, -0.1, 0]} rotation={[0, 0, -0.5]} material={bladeMat}>
        <boxGeometry args={[0.55, 0.1, 0.06]} />
      </mesh>
      <mesh position={[0, 0, 0]} material={mat(accent, color)}>
        <torusGeometry args={[0.08, 0.03, 8, 16]} />
      </mesh>
      <mesh position={[0, -0.28, 0]} material={mat(color, accent, 0.75)}>
        <boxGeometry args={[0.12, 0.22, 0.08]} />
      </mesh>
    </group>
  );
}

function Creative3D({ color, accent }: { color: string; accent: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.55;
      group.current.position.y = Math.sin(s.clock.elapsedTime * 1.15) * 0.1;
    }
  });
  const starMat = mat(color, accent);
  const points = 5;
  const outer = 0.45;
  const inner = 0.18;
  return (
    <group ref={group}>
      {Array.from({ length: points * 2 }).map((_, i) => {
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const r = i % 2 === 0 ? outer : inner;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r * 0.5, Math.sin(angle) * r * 0.5, 0]}
            material={starMat}
          >
            <octahedronGeometry args={[0.14, 0]} />
          </mesh>
        );
      })}
      <mesh material={mat(accent, color, 0.85)}>
        <octahedronGeometry args={[0.2, 0]} />
      </mesh>
    </group>
  );
}

function OrbitRing({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.7;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 3.5, 0, 0]}>
      <torusGeometry args={[0.95, 0.018, 8, 48]} />
      <meshBasicMaterial color={color} transparent opacity={0.45} />
    </mesh>
  );
}

function MiniScene({ color, accent, icon }: Props) {
  const icons = {
    photo: <Camera3D color={color} accent={accent} />,
    video: <Video3D color={color} accent={accent} />,
    montage: <Montage3D color={color} accent={accent} />,
    creative: <Creative3D color={color} accent={accent} />,
  };
  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[2, 2, 2]} intensity={1.1} color={accent} />
      <pointLight position={[-2, -1, 1]} intensity={0.45} color={color} />
      {icons[icon]}
      <OrbitRing color={accent} />
    </>
  );
}

const iconMap: Record<string, ServiceIcon> = {
  photo: "photo",
  video: "video",
  montage: "montage",
  creative: "creative",
};

interface CardCanvasProps {
  serviceId: string;
  color: string;
  accent: string;
}

export default function ServiceCardCanvas({
  serviceId,
  color,
  accent,
}: CardCanvasProps) {
  return (
    <div className="absolute inset-0 opacity-95">
      <Canvas
        camera={{ position: [0, 0, 2.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <MiniScene
          color={color}
          accent={accent}
          icon={iconMap[serviceId] ?? "creative"}
        />
      </Canvas>
    </div>
  );
}
