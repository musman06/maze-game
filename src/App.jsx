import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber"; //react library so that three.js can work with react
import { OrbitControls } from "@react-three/drei"; //react fiber helper library
import { Vector3 } from "three";
import SceneDescription from "./Components/SceneDescription";
import Floor from "./Components/Floor";
import GenerateObstacles from "./Components/GenerateObstacles";
import Player from "./Components/Player";

const App = () => {
  const wallsRef = useRef([]); //wallsRef array to hold individual wall references in it
  const playerRef = useRef(null);
  const xAxis = 42;
  const zAxis = 33;
  const cellSize = 5;
  const startPosition = new Vector3(
    xAxis - (cellSize - 0.5) - cellSize / 2,
    3.15,
    -zAxis + cellSize + cellSize / 2
  );
  const finishPosition = new Vector3(
    -xAxis + (cellSize + 1),
    2.9,
    zAxis - (cellSize + 2)
  );

  return (
    <div className="canvas-container">
      <Canvas
        shadows={true}
        className="canvas"
        camera={{
          position: [0, 52, -35],
          rotation: [-Math.PI / 3, 0, 0],
        }}
        gl={{ alpha: false, clearColor: "black" }} //WebGL instance to remove transparency and set background color to black
      >
        <ambientLight intensity={1.0} />
        <directionalLight
          intensity={1.0}
          color="yellow"
          position={[0, 53, -36]}
          castShadow={true}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />

        {/* maxDistance={80} minDistance={55} */}
        <OrbitControls />
        <axesHelper
          position={[80, 15, 25]}
          args={[10, 10, 10]}
          scale={[-1, 1, 1]}
        />
        <gridHelper position={[82, 14, 28]} args={[20, 20]} />
        {/* to print text on the page */}
        <SceneDescription playerRef={playerRef} startPosition={startPosition} />
        <Floor
          xAxis={xAxis}
          zAxis={zAxis}
          playerRef={playerRef}
          finishPosition={finishPosition}
        />
        {/* function to dynamically generate maze */}
        <GenerateObstacles
          xAxis={xAxis}
          zAxis={zAxis}
          wallsRef={wallsRef}
          cellSize={cellSize}
        />
        <Player
          xAxis={xAxis}
          zAxis={zAxis}
          playerRef={playerRef}
          wallsRef={wallsRef}
          startPosition={startPosition}
        />
      </Canvas>
    </div>
  );
};

export default App;
