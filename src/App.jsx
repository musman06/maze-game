import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber"; //react library so that three.js can work with react
import { OrbitControls } from "@react-three/drei"; //react fiber helper library
import Wall from "./Components/Wall";
import Player from "./Components/Player";

const App = () => {
  const wallsRef = useRef([]); //wallsRef array to hold individual wall references in it
  return (
    <div className="canvas-container">
      <Canvas
        className="canvas"
        camera={{ position: [0, 10, -10], rotation: [-Math.PI / 3, 0, 0] }}
        gl={{ alpha: false, clearColor: "black" }} //WebGL instance to remove transparency and set background color to black
      >
        <OrbitControls />

        <ambientLight intensity={1.0} />
        <directionalLight
          intensity={1.0}
          color="yellow"
          position={[0, 11, -11]}
        />
        <group scale={[-1, 1, 1]}>
          {/* flipped the x-axis */}
          <gridHelper />
          {/* position corresonds to where wall should be placed on X-Y-Z axes, and size corresponds to wall width, height, and length */}
          <axesHelper args={[5, 5, 5]} />

          {/*left*/}
          <Wall
            position={[-2.5, 0, 0]}
            size={[0.25, 3, 5]}
            wallsRef={wallsRef}
          />
          {/*right*/}
          <Wall
            position={[2.5, 0, 0]}
            size={[0.25, 3, 5]}
            wallsRef={wallsRef}
          />

          {/* <Wall position={[0, 0, -2.5]} size={[5, 3, 0.25]} wallsRef={wallsRef}/>           back */}
          {/*front*/}
          <Wall
            position={[0, 0, 2.5]}
            size={[5, 3, 0.25]}
            wallsRef={wallsRef}
          />

          <Wall
            position={[7, 0, 4]}
            size={[8, 3.5, 0.35]}
            wallsRef={wallsRef}
          />

          <Player wallsRef={wallsRef} />
        </group>
      </Canvas>
    </div>
  );
};

export default App;
