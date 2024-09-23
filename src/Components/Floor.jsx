import React from "react";
import { DoubleSide } from "three";

const Floor = () => {
  return (
    <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* planeGeometry is used since it represents 2D shape which is perfect for floor */}
      <planeGeometry args={[28, 22]} />
      <meshBasicMaterial color="lightgreen" side={DoubleSide} />
    </mesh>
  );
};

export default Floor;
