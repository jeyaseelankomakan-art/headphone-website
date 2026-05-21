import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { Headphone } from "./Headphone";
import { Particles } from "./Particles";
import { CameraRig } from "./CameraRig";
import type { VariantId } from "@/lib/variants";

interface Props {
  variant: VariantId;
  scrollProgress: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  explode: number;
}

export function CanvasRoot({ variant, scrollProgress, mouse, explode }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, isMobile ? 1.4 : 1.75]}
      camera={{ position: [0, 0.2, 4.2], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
        scene.fog = new THREE.FogExp2(0x05060c, 0.08);
      }}
    >
      <color attach="background" args={["#05060c"]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 6, 4]} intensity={1.1} castShadow color="#bcdcff" />
        <spotLight position={[-4, 3, 2]} angle={0.5} penumbra={0.8} intensity={1.6} color="#a855f7" />
        <spotLight position={[4, -2, 3]} angle={0.6} penumbra={0.9} intensity={1.4} color="#22d3ee" />
        <pointLight position={[0, -3, -2]} intensity={1} color="#3b82f6" />

        <Environment preset="city" environmentIntensity={0.35} />

        <CameraRig scrollProgress={scrollProgress} mouse={mouse}>
          <Headphone variant={variant} explode={explode} />
        </CameraRig>

        {!isMobile && <Particles count={350} radius={9} color="#7dd3fc" />}
        <Particles count={isMobile ? 80 : 180} radius={5} color="#a855f7" />

        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.55}
          scale={8}
          blur={2.6}
          far={3}
          color="#000000"
        />

        {!isMobile && (
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.18}
              luminanceSmoothing={0.2}
              mipmapBlur
              kernelSize={KernelSize.LARGE}
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.0008, 0.0012)}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette eskil={false} offset={0.15} darkness={0.85} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
