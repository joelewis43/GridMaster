import React, { createContext, useContext, useState } from 'react';
import { RewardType, UUID_NAMESPACE, type Difficulty, type GridTile, type Reward, type Task, type TileMap } from '../types';
import rawData from '../assets/tiles.json';
import { v5 as uuidv5 } from 'uuid';

interface GridContextType {
  grid: TileMap; // The predefined Grid Jagex has put together
  setGridPlanned: (id: string, b: boolean) => void;
}

const GridContext = createContext<GridContextType | undefined>(undefined);

export const GridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [grid, setGrid] = useState<TileMap>(createTileMap());

  const setGridPlanned = (id: string, b: boolean) => {
    setGrid((prevGrid) => {
      for (const row of Object.values(prevGrid)) {
        for (const tile of Object.values(row)) {
          if (tile.id === id) {
            tile.planned = b;
          }
        }
      }
      return { ...prevGrid };
    });
  }


 /* ******************* Context Provider ******************* */
  return (
    <GridContext.Provider value={{ grid, setGridPlanned }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) throw new Error('useGridContext must be used within a TaskProvider');
  return context;
};


const createTileMap = () => {
  const tileMap: TileMap = {};

  rawData.forEach((entry) => {
    const row = Number(entry.row);
    const col = Number(entry.col);

    const r: Reward = {
      name: entry.rewardName,
      description: entry.rewardDescription,
      type: RewardType.Relic // TODO: Update the JSON
    }

    const t: Task = {
      name: entry.task,
      difficulty: entry.difficulty as Difficulty,
    }

    const gt: GridTile = {
      id: uuidv5(entry.task, UUID_NAMESPACE),
      row: row,
      col: col,

      reward: r,
      task: t,
      
      planned: false,
      done: false,
    };

    if (!tileMap[row]) {
      tileMap[row] = {};
    }

    tileMap[row][col] = gt;
  });

  return tileMap;
}