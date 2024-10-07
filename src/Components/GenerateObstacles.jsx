import React, { useState, useEffect } from "react";
import { Vector3 } from "three";
import Wall from "./Wall";

const GenerateObstacles = ({ xAxis, zAxis, wallsRef, cellSize }) => {
  const [walls, setWalls] = useState([]);
  const rows = Math.floor(xAxis / cellSize) * 2 + 1;
  const cols = Math.floor(zAxis / cellSize) * 2 + 1;

  //finding parent of a cell
  const find = (cell, parent) => {
    if (parent[cell] !== cell) {
      parent[cell] = find(parent[cell], parent); //recursive call
    }
    return parent[cell];
  };

  //union of two cells in disjoint sets
  const union = (cell1, cell2, parent, rank) => {
    const root1 = find(cell1, parent);
    const root2 = find(cell2, parent);

    if (root1 !== root2) {
      if (rank[root1] > rank[root2]) {
        parent[root2] = root1;
      } else if (rank[root1] < rank[root2]) {
        parent[root1] = root2;
      } else {
        parent[root2] = root1;
        rank[root1] += 1;
      }
      return true;
    }
    return false; //already in the same set
  };

  useEffect(() => {
    const cells = [];
    const edges = [];
    const parent = {};
    const rank = {};
    let wallsArray = [];

    //initializing cells and disjoint set
    for (let r = 1; r < rows; r += 2) {
      for (let c = 1; c < cols; c += 2) {
        const cell = `${r}-${c}`;
        cells.push(cell);
        parent[cell] = cell;
        rank[cell] = 0;

        //horizontal edges
        if (c + 2 < cols) {
          edges.push([
            [r, c],
            [r, c + 2],
          ]);
        }
        //vertical edges
        if (r + 2 < rows) {
          edges.push([
            [r, c],
            [r + 2, c],
          ]);
        }
      }
    }

    // Shuffle edges to randomize the maze
    for (let i = edges.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [edges[i], edges[j]] = [edges[j], edges[i]];
    }

    const wallsToKeep = new Set(); //tracking walls we want to keep

    //adding all walls in maze by default on alternative cells
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r % 2 === 0 || c % 2 === 0) {
          wallsToKeep.add(`${r}-${c}`);
        }
      }
    }

    //creating a path from start to end
    for (const edge of edges) {
      const [cell1, cell2] = edge.map(([r, c]) => `${r}-${c}`);
      if (union(cell1, cell2, parent, rank)) {
        //removing the wall between connected cells
        const midRow = (edge[0][0] + edge[1][0]) / 2;
        const midCol = (edge[0][1] + edge[1][1]) / 2;

        wallsToKeep.delete(`${midRow}-${midCol}`);
      }
    }

    //placing walls with help of wallsToKeep array
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (wallsToKeep.has(`${r}-${c}`)) {
          let position = new Vector3();
          if (r === 16 && c !== 12) {
            position = new Vector3(
              r * cellSize - (xAxis - 1.5),
              3.5,
              c * cellSize - (zAxis - 2.5)
            );
          } else if (c === 12 && r !== 16) {
            position = new Vector3(
              r * cellSize - (xAxis - 2.5),
              3.5,
              c * cellSize - (zAxis - 3.0)
            );
          } else if (r === 16 && c === 12) {
            position = new Vector3(
              r * cellSize - (xAxis - 1.5),
              3.5,
              c * cellSize - (zAxis - 3.0)
            );
          } else {
            position = new Vector3(
              r * cellSize - (xAxis - 2.5),
              3.5,
              c * cellSize - (zAxis - 2.5)
            );
          }
          if (c === 12) {
            wallsArray.push({ position, size: [cellSize, 3, cellSize + 1] });
          } else {
            wallsArray.push({
              position,
              size: [cellSize, 3, cellSize],
            });
          }
        }
      }
    }

    setWalls(wallsArray);
  }, []);

  return (
    <>
      {walls.map((wall, index) => (
        <Wall
          key={index}
          position={wall.position.toArray()}
          size={wall.size}
          wallsRef={wallsRef}
        />
      ))}
    </>
  );
};

export default GenerateObstacles;
