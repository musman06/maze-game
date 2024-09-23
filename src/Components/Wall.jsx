import React, { useEffect, useRef } from "react";
import Floor from "./Floor";

const Wall = ({ position, size, wallsRef }) => {
  const wallRef = useRef(null);

  useEffect(() => {
    wallsRef.current.push(wallRef);
  }, []);
  return (
    <>
      {/*React fragment is used so that no extra div element is added in the DOM tree so we don't have to style or place it*/}
      <Floor />
      <mesh position={position} ref={wallRef}>
        {/* Three.js Primitive boxGeometry is used to represent walls */}
        <boxGeometry args={size} />
        {/* meshPhongMaterial is used since it reflects light as opposed to basicMaterial which absorbs it */}
        <meshPhongMaterial color="grey" />
      </mesh>
    </>
  );
};

export default Wall;
