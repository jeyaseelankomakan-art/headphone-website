import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getVariant, type VariantId } from "@/lib/variants";

interface Props {
  variant: VariantId;
  explode?: number; // 0..1
  rotate?: boolean;
  autoRotateSpeed?: number;
}

export function Headphone({ variant, explode = 0, rotate = true, autoRotateSpeed = 0.25 }: Props) {
  const group = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.MeshStandardMaterial>(null);
  const v = getVariant(variant);

  const accent = useMemo(() => new THREE.Color(v.accent), [v.accent]);
  const bodyColor = useMemo(() => new THREE.Color(v.body), [v.body]);

  useFrame((state, delta) => {
    if (group.current && rotate) {
      group.current.rotation.y += delta * autoRotateSpeed;
    }
    if (ledRef.current) {
      const pulse = 0.6 + Math.sin(state.clock.elapsedTime * 2.2) * 0.4;
      ledRef.current.emissiveIntensity = 2 + pulse * 2.5;
    }
  });

  const cupOffset = 1.05 + explode * 0.6;

  return (
    <group ref={group} dispose={null}>
      {/* Headband - outer */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.05, 0.07, 24, 96, Math.PI]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={v.metalness}
          roughness={v.roughness}
        />
      </mesh>
      {/* Headband - inner cushion */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.04, 16, 96, Math.PI]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Headband LED strip */}
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.07, 0.012, 8, 96, Math.PI]} />
        <meshStandardMaterial
          ref={ledRef}
          color={accent}
          emissive={accent}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Left cup assembly */}
      <CupAssembly side={-1} offset={cupOffset} variant={variant} explode={explode} />
      {/* Right cup assembly */}
      <CupAssembly side={1} offset={cupOffset} variant={variant} explode={explode} />
    </group>
  );
}

function CupAssembly({
  side,
  offset,
  variant,
  explode,
}: {
  side: 1 | -1;
  offset: number;
  variant: VariantId;
  explode: number;
}) {
  const v = getVariant(variant);
  const accent = useMemo(() => new THREE.Color(v.accent), [v.accent]);
  const body = useMemo(() => new THREE.Color(v.body), [v.body]);
  const ringRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.emissiveIntensity =
        1.5 + Math.sin(state.clock.elapsedTime * 1.6 + side) * 1.2;
    }
  });

  const armOffset = explode * 0.25;
  const platterOffset = explode * 0.4;
  const driverOffset = explode * 0.55;

  return (
    <group position={[side * offset, 0, 0]}>
      {/* Yoke / arm */}
      <mesh position={[-side * (0.12 + armOffset), 0.3, 0]} castShadow>
        <boxGeometry args={[0.14, 0.5, 0.08]} />
        <meshStandardMaterial color={body} metalness={v.metalness} roughness={v.roughness} />
      </mesh>
      <mesh position={[-side * (0.12 + armOffset), 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.18, 16]} />
        <meshStandardMaterial color="#3a3d44" metalness={1} roughness={0.4} />
      </mesh>

      {/* Outer cup body */}
      <mesh position={[side * (0.05 + platterOffset), 0, 0]} rotation={[0, side * Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.66, 0.32, 64]} />
        <meshStandardMaterial color={body} metalness={v.metalness} roughness={v.roughness} />
      </mesh>

      {/* Outer ring LED */}
      <mesh
        position={[side * (0.22 + platterOffset), 0, 0]}
        rotation={[0, side * Math.PI / 2, 0]}
      >
        <torusGeometry args={[0.6, 0.018, 12, 96]} />
        <meshStandardMaterial
          ref={ringRef}
          color={accent}
          emissive={accent}
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>

      {/* Transparent glass cover revealing circuits */}
      <mesh
        position={[side * (0.23 + platterOffset), 0, 0]}
        rotation={[0, side * Math.PI / 2, 0]}
      >
        <cylinderGeometry args={[0.58, 0.58, 0.02, 64]} />
        <meshPhysicalMaterial
          color="#0b1220"
          transmission={0.85}
          thickness={0.4}
          roughness={0.05}
          metalness={0}
          ior={1.45}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Internal "circuit" core (visible through glass) */}
      <mesh position={[side * (0.18 + driverOffset), 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.06, 32]} />
        <meshStandardMaterial color="#101820" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* Glowing core dot */}
      <mesh position={[side * (0.2 + driverOffset), 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 24]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      {/* Concentric circuit rings */}
      {[0.22, 0.3, 0.38, 0.48].map((r, i) => (
        <mesh
          key={r}
          position={[side * (0.21 + driverOffset), 0, 0]}
          rotation={[0, side * Math.PI / 2, 0]}
        >
          <torusGeometry args={[r, 0.005, 8, 64]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={1.2 - i * 0.2}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Ear cushion (interior side) */}
      <mesh position={[-side * (0.12 + platterOffset * 0.4), 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <torusGeometry args={[0.42, 0.13, 16, 48]} />
        <meshStandardMaterial color="#0a0a0d" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Mini greeble: mic / button */}
      <mesh
        position={[side * (0.04 + platterOffset), -0.32, 0.12]}
        rotation={[0, side * Math.PI / 2, 0]}
      >
        <boxGeometry args={[0.06, 0.04, 0.06]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
    </group>
  );
}
