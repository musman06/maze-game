import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Box3, Vector3, Sphere } from "three";

const Player = ({ xAxis, zAxis, playerRef, wallsRef, startPosition }) => {
  const sphereRadius = 0.75;
  const [velocity] = useState(new Vector3(0, 0, 0)); //velocity vector object to handle speed and direction both at the same time
  const speed = 0.3; // speed of the player

  //keysRef to handle keys pressed and make them persist in different renders and not to cause any re-render on the event of key being pressed
  const keysRef = useRef({
    KeyW: false, //capital K
    KeyA: false,
    KeyS: false,
    KeyD: false,
  });

  //function to check if player collides with any obstacle present in the code
  const checkCollision = (newPosition) => {
    if (!playerRef.current) return false;
    const playerSphere = new Sphere(
      new Vector3().copy(playerRef.current.position).add(newPosition),
      sphereRadius
    );

    for (const wallRef of wallsRef.current) {
      if (!wallRef.current) continue;
      const wallBox = new Box3().setFromObject(wallRef.current);
      if (playerSphere.intersectsBox(wallBox)) return true;
    }
    return false;
  };

  const boundMovement = (newPosition) => {
    if (
      playerRef.current.position.x + newPosition.x > xAxis ||
      playerRef.current.position.x + newPosition.x < -xAxis ||
      playerRef.current.position.z + newPosition.z > zAxis ||
      playerRef.current.position.z + newPosition.z < -zAxis
    ) {
      return true;
    } else {
      return false;
    }
  };

  //used to attach event listeners when player is mounted in the DOM and remove them and their respective function on dismount to avoid memory leak and unexpected behaviour
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysRef.current[e.code] = true;
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!playerRef.current || !wallsRef.current.length) return;
    velocity.set(0, 0, 0); //velocity is set to 0 on each frame so player should not be moving without any key being pressed

    if (keysRef.current.KeyW === true) velocity.z += speed; //forward movement
    if (keysRef.current.KeyA === true) velocity.x += speed; //left movement
    if (keysRef.current.KeyS === true) velocity.z -= speed; //backward movement
    if (keysRef.current.KeyD === true) velocity.x -= speed; //right movement

    //if player's new position does not collides with any of the obstacles and also don't go out of the floor then move it
    const newPosition = velocity.clone();
    if (!checkCollision(newPosition) && !boundMovement(newPosition))
      playerRef.current.position.add(velocity); //velocity is added in player position vector
  });

  return (
    <mesh ref={playerRef} position={startPosition} castShadow={true}>
      <sphereGeometry args={[sphereRadius, 10, 10]} />
      <meshPhongMaterial color="orange" />
    </mesh>
  );
};

export default Player;
