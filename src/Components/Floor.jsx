import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { DoubleSide, Vector3 } from "three";

const Floor = ({ xAxis, zAxis, playerRef, finishPosition }) => {
  const [playerPosition, setPlayerPosition] = useState(new Vector3());
  const tetrahedronRef = useRef(null);
  const [positionY, setPositionY] = useState(1.5);
  const epsilon = 0.5; //small value to compare since player never exactly reach the finish position

  useFrame(() => {
    if (!tetrahedronRef.current || !playerRef.current) return;

    setPlayerPosition(() => {
      return playerRef.current.position.clone();
    });

    //making the pointer at finish position move up and down
    setPositionY((prev) => {
      const newPositionY = prev + 0.02;
      return newPositionY > 3 ? 1.5 : newPositionY < 0.0 ? 1.5 : newPositionY;
    });
  });

  return (
    <>
      <mesh position={[0, -3.5, 0]} receiveShadow={true}>
        {/* boxGeometry is used to represents the floor since it also has a little depth so planeGeometry was not used */}
        <boxGeometry args={[xAxis * 2, 4, zAxis * 2]} />
        <meshPhongMaterial color="rgb(41, 215, 41)" side={DoubleSide} />
      </mesh>

      {/* mesh to represen the finish point */}
      <mesh position={[-44, positionY, 35]} ref={tetrahedronRef}>
        <tetrahedronGeometry args={[3]} />
        <meshPhongMaterial
          color={`${
            playerPosition.distanceTo(finishPosition) < epsilon //adjusting color depending on player position
              ? "#f1f5f8"
              : "red"
          }`}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Floor;
