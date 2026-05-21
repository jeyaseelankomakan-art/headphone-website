import { useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  children: ReactNode;
  scrollProgress: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

// Scroll-driven camera waypoints across sections (0..1)
const waypoints = [
  { pos: [0, 0.2, 4.2], look: [0, 0, 0], rotY: 0 },        // hero
  { pos: [-1.6, 0.6, 3.6], look: [0, 0, 0], rotY: 0.4 },   // noise
  { pos: [0, 1.6, 4.0], look: [0, 0, 0], rotY: 0.8 },      // spatial
  { pos: [1.8, 0.4, 3.2], look: [0, 0, 0], rotY: 1.4 },    // touch
  { pos: [0, -0.4, 3.0], look: [0, 0, 0], rotY: 1.9 },     // battery
  { pos: [0, 0, 3.4], look: [0, 0, 0], rotY: 2.6 },        // 360 viewer
  { pos: [-1.2, 0.2, 3.4], look: [0, 0, 0], rotY: 3.2 },   // variants
  { pos: [1.4, 0.6, 3.6], look: [0, 0, 0], rotY: 3.7 },    // specs
  { pos: [0, 0.1, 4.6], look: [0, 0, 0], rotY: 4.2 },      // final cta
];

function sample(arr: typeof waypoints, t: number) {
  const clamped = Math.max(0, Math.min(0.9999, t));
  const idx = clamped * (arr.length - 1);
  const i = Math.floor(idx);
  const f = idx - i;
  const a = arr[i];
  const b = arr[Math.min(arr.length - 1, i + 1)];
  return {
    pos: [
      a.pos[0] + (b.pos[0] - a.pos[0]) * f,
      a.pos[1] + (b.pos[1] - a.pos[1]) * f,
      a.pos[2] + (b.pos[2] - a.pos[2]) * f,
    ],
    rotY: a.rotY + (b.rotY - a.rotY) * f,
  };
}

export function CameraRig({ children, scrollProgress, mouse }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.2, 4.2));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const t = scrollProgress.current;
    const wp = sample(waypoints, t);

    // Mouse parallax on the camera
    const mx = mouse.current.x * 0.3;
    const my = mouse.current.y * 0.2;

    target.current.set(wp.pos[0] + mx, wp.pos[1] + my, wp.pos[2]);
    camera.position.lerp(target.current, Math.min(1, delta * 3.5));
    camera.lookAt(lookTarget.current);

    if (groupRef.current) {
      // Apply extra rotation on the model itself for cinematic spin
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        wp.rotY,
        Math.min(1, delta * 2.5),
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
}
