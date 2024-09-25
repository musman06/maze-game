import React, { useState } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const SceneDescription = ({ playerRef, startPosition }) => {
  const [playerPosition, setPlayerPosition] = useState(new Vector3());
  useFrame(() => {
    if (!playerRef.current) return;
    setPlayerPosition(() => {
      return playerRef.current.position.clone();
    });
  });
  return (
    <>
      <Text
        position={[95, 10, 20]}
        fontSize={2}
        color="red"
        anchorX="left"
        anchorY="middle"
        scale={[-1, 1, 1]}
        rotation={[Math.PI / 6, 0, 0]}
      >
        Red: X-axis
      </Text>
      <Text
        position={[95, 8, 18]}
        fontSize={2}
        color="green"
        anchorX="left"
        anchorY="middle"
        scale={[-1, 1, 1]}
        rotation={[Math.PI / 6, 0, 0]}
      >
        Green: Y-axis
      </Text>
      <Text
        position={[95, 6, 16]}
        fontSize={2}
        color="blue"
        anchorX="left"
        anchorY="middle"
        scale={[-1, 1, 1]}
        rotation={[Math.PI / 6, 0, 0]}
      >
        Blue: Z-axis
      </Text>
      <Text
        position={[43, 0, -35]}
        fontSize={3}
        color={`${playerPosition.equals(startPosition) ? "red" : "#f1f5f8"}`}
        anchorX="left"
        anchorY="middle"
        scale={[-1, 1, 1]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        Start 🧨
      </Text>
    </>
  );
};

export default SceneDescription;
