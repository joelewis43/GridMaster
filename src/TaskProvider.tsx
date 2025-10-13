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
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [grid, setGrid] = useState<TileMap>(createTileMap());

  const addTask = (newTask: Task) => {
    if (taskList.filter((t) => t.id === newTask.id).length > 0) return;
    setTaskList(prev => [...prev, newTask]);
  };

  const addTileToList = (tile: GridTile) => {
    if (taskList.filter((t) => t.id === tile.id).length > 0) return;
    const newTask: Task = {
      id: tile.id,
      task: tile.name,
      input: '',
      outputName: tile.rewardName,
      outputValue: tile.reward,
      type: TaskType.Tile,
    }
    setTaskList(prev => [...prev, newTask]);
  }

  const editTask = (updatedTask: Task) => {
    setTaskList((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
    setTaskList((prev) => prev.filter(task => task.id !== id));
  };

  const importTask = (tasks: Task[]) => { setTaskList(tasks) }

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
      name: entry.task,
      rewardName: entry.title,
      reward: entry.reward,
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