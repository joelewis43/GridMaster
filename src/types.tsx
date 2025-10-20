export const UUID_NAMESPACE: string = '889207a4-4d6b-4edb-a48e-6249bc74b0bb';

export interface Task {
  id: string,
  task: string,
  input: string,
  outputName: string,
  outputValue: string,
  type: TaskType,
}

export interface GridTile {
  id: string,
  taskName: string,
  rewardName: string,
  rewardDescription: string,
  row: number,
  col: number,
  difficulty: Difficulty,
  planned: boolean,
}

export enum Difficulty {
  Hard = 'Hard',
  Medium = 'Medium',
  Easy = 'Easy',
  Beginner = 'Beginner',
  None = 'None'
}

export enum TaskType {
  Tile = 'Tile',
  Travel = 'Travel',
  Action = 'Action',
  None = 'None',
}

export type TileMap = {
  [row: number]: {
    [col: number]: GridTile;
  };
};