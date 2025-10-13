export interface Task {
  input: string,
  task: string,
  outputName: string,
  outputValue: string,
  difficulty: Difficulty,
  id: string,
  type: TaskType,
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
    [col: number]: Task;
  };
};