export interface Task {
  input: string,
  task: string,
  outputName: string,
  outputValue: string,
  difficulty: Difficulty,
  id: string
}

export enum Difficulty {
  Hard = 'Hard',
  Medium = 'Medium',
  Easy = 'Easy',
  Beginner = 'Beginner',
  None = 'None'
}

export type TileMap = {
  [row: number]: {
    [col: number]: Task;
  };
};