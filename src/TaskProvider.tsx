import React, { createContext, useContext, useState } from 'react';
import { TaskType, UUID_NAMESPACE, type Difficulty, type GridTile, type Task, type TileMap } from './types';
import rawData from './assets/tiles.json';
import { v5 as uuidv5 } from 'uuid';

interface TaskContextType {
  taskList: Task[];
  grid: TileMap;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  addTileToList: (tile: GridTile) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  importTask: (tasks: Task[]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  /* ******************* Task List Provider Methods ******************* */
  const [taskList, setTaskList] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    if (taskList.filter((t) => t.id === newTask.id).length > 0) return;
    setTaskList(prev => [...prev, newTask]);
  };

  const addTileToList = (tile: GridTile) => {
    if (taskList.filter((t) => t.id === tile.id).length > 0) return;
    const newTask: Task = {
      id: tile.id,
      task: tile.taskName,
      input: '',
      outputName: tile.rewardName,
      outputValue: tile.rewardDescription,
      type: TaskType.Tile,
    }
    setTaskList(prev => [...prev, newTask]);
    setGridPlanned(tile.id, true);
  }

  const editTask = (updatedTask: Task) => {
    setTaskList((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
    setTaskList((prev) => prev.filter(task => task.id !== id));
    setGridPlanned(id, false);
  };

  const importTask = (tasks: Task[]) => {
    setTaskList(tasks);
    for (const task of tasks) {
      setGridPlanned(task.id, true);
    }
  }

  /* ******************* Grid Provider Methods ******************* */
  const [grid, setGrid] = useState<TileMap>(createTileMap());

  const setGridPlanned = (id: string, b: boolean) => {
    setGrid((prevGrid) => {
      for (const row of Object.values(prevGrid)) {
        for (const tile of Object.values(row)) {
          if (tile.id === id) {
            tile.planned = b;
            console.log("tile matched - planned updated to " + b);
          }
        }
      }
      return { ...prevGrid };
    });
  }


 /* ******************* Context Provider ******************* */
  return (
    <TaskContext.Provider value={{ taskList, grid, setTaskList, addTask, addTileToList, editTask, deleteTask, importTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
  return context;
};


const createTileMap = () => {
  const tileMap: TileMap = {};

  rawData.forEach((entry) => {
    const row = Number(entry.row);
    const col = Number(entry.col);

    const t: GridTile = {
      id: uuidv5(entry.task, UUID_NAMESPACE),
      taskName: entry.task,
      rewardName: entry.rewardName,
      rewardDescription: entry.rewardDescription,
      row: row,
      col: col,
      difficulty: entry.difficulty as Difficulty,
      planned: false,
    };

    if (!tileMap[row]) {
      tileMap[row] = {};
    }

    tileMap[row][col] = t;
  });

  return tileMap;
}