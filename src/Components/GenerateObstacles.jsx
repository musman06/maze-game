import React from "react";
import Wall from "./Wall";

const GenerateObstacles = ({
  xAxis,
  zAxis,
  wallsRef,
  playerRef,
  finishPosition,
}) => {
  const noOfObstacles = Math.trunc(Math.random() * 10) + 6; //random number between 6 & 15
  const obstacles = [];

  //player's start and finish positions
  const playerStartPosition = [xAxis, -0.7, -zAxis];
  const playerFinishPosition = [-xAxis, -0.7, zAxis];

  //safe zone around the player's start position
  const startSafeZone = {
    minX: playerStartPosition[0] - 10,
    maxX: playerStartPosition[0] + 10,
    minZ: playerStartPosition[2] - 10,
    maxZ: playerStartPosition[2] + 10,
  };

  //safe zone around the player's finish position
  const finishSafeZone = {
    minX: playerFinishPosition[0] - 10, //-52
    maxX: playerFinishPosition[0] + 10, //-32
    minZ: playerFinishPosition[2] - 10, //23
    maxZ: playerFinishPosition[2] + 10, //43
  };

  for (let i = 1; i <= noOfObstacles; i++) {
    let positionX, positionY, positionZ;

    //continue generating positions until created outside the safe zone
    do {
      positionX = Math.random() * (xAxis - -xAxis + 1) + -xAxis; //random number between -42 & 42
      positionY = 0;
      positionZ = Math.random() * (zAxis - -zAxis + 1) + -zAxis; //random number between -33 & 33
    } while (
      positionX <= startSafeZone.minX &&
      positionX >= startSafeZone.maxX &&
      positionZ <= startSafeZone.minZ &&
      positionZ >= startSafeZone.maxZ &&
      positionX <= finishSafeZone.minX &&
      positionX >= finishSafeZone.maxX &&
      positionZ <= finishSafeZone.minZ &&
      positionZ >= finishSafeZone.maxZ
    );

    //maximum distance our obstacle can grow in x-axis direction
    const sizeXRange = positionX >= 0 ? xAxis - positionX : xAxis + positionX;
    const sizeX = Math.random() * sizeXRange;

    const sizeY = 3;

    //maximum distance our obstacle can grow in z-axis direction
    const sizeZRange =
      positionZ >= 0 ? (zAxis - positionZ) * 2 : (zAxis + positionZ) * 2;
    const sizeZ = Math.random() * sizeZRange;

    //position corresponds to where the wall should be placed on X-Y-Z axes, and size corresponds to wall width, height, and length
    obstacles.push(
      <Wall
        position={[positionX, positionY, positionZ]}
        size={[sizeX, sizeY, sizeZ]}
        wallsRef={wallsRef}
        xAxis={xAxis}
        zAxis={zAxis}
        playerRef={playerRef}
        finishPosition={finishPosition}
      />
    );
  }
  return <>{obstacles}</>;
};

export default GenerateObstacles;
