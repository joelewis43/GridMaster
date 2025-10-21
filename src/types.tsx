export const UUID_NAMESPACE: string = '889207a4-4d6b-4edb-a48e-6249bc74b0bb';

export interface Step {
  id: string,
  task: string,
  input: string,
  outputName: string,
  outputValue: string,
  type: StepType,
}

export interface GridTile {
  id: string,
  row: number,
  col: number,

  reward: Reward,
  task: Task,

  planned: boolean,
  done: boolean,
}

export enum Difficulty {
  Hard = 'Hard',
  Medium = 'Medium',
  Easy = 'Easy',
  Beginner = 'Beginner',
  None = 'None'
}

export enum StepType {
  Tile = 'Tile',
  Travel = 'Travel',
  Action = 'Action',
  None = 'None',
}

export enum RewardType {
  Item = 'Item',
  Relic = 'Relic',
  Multiplier = 'Multiplier',
  AutoComplete = 'AutoComplete',
  Experience = 'Experience',
  CombatMastery = 'CombatMastery',
}

export type Reward = {
  name: string,
  description: string,
  type: RewardType,
}

export interface Task {
  name: string,
  difficulty: Difficulty,
}



export type TileMap = {
  [row: number]: {
    [col: number]: GridTile;
  };
};