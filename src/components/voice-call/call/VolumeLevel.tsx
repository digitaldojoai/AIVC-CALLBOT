import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const numBars = 10;

interface BarProps {
  index: number;
  volume: number;
}

interface VolumeLevelProps {
  volume: number;
}

// Component for individual bar in the 3D visualization
const Bar: React.FC<BarProps> = ({ index, volume }) => {
  const barRef = useRef<THREE.Mesh>(null);

  // Update the height of the bar based on the volume
  useFrame(() => {
    if (barRef.current) {
      const scale = index / numBars < volume ? 1 + volume * 2 : 0.5;
      (barRef.current as any).scale.y = THREE.MathUtils.lerp(
        (barRef.current as any).scale.y,
        scale,
        0.1
      );
    }
  });

  return (
    <mesh ref={barRef} position={[index - numBars / 2, 0, 0]}>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial
        color={index / numBars < volume ? "#3ef07c" : "white"}
      />
    </mesh>
  );
};

const VolumeLevel: React.FC<VolumeLevelProps> = ({ volume }) => {
  return (
    <div style={{ width: "100%", height: "100px" }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[15, 10, 5]} angle={0.3} />
        <group position={[0, -1, 0]}>
          {Array.from({ length: numBars }, (_, i) => (
            <Bar key={i} index={i} volume={volume} />
          ))}
        </group>
      </Canvas>
      {/* <div style={{ textAlign: "center", color: "white", marginTop: "10px" }}>
        Volume Level: {volume}
      </div> */}
    </div>
  );
};

export default VolumeLevel;
