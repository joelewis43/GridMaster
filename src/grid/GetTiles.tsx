import rawData from '../assets/tiles.json';
import { type Task, Difficulty, type TileMap, TaskType} from '../types';
import { v4 as uuidv4 } from 'uuid';

function GetGridMasterTiles() : TileMap {
  const tileMap: TileMap = {};

  rawData.forEach((entry) => {
    const row = Number(entry.row);
    const col = Number(entry.col);

    const t: Task = {
      id: uuidv4(),
      input: '',
      task: entry.task,
      outputName: entry.title,
      outputValue: entry.reward,
      difficulty: entry.difficulty as Difficulty,
      type: TaskType.Tile,
      planned: false,
    };

    if (!tileMap[row]) {
      tileMap[row] = {};
    }

    tileMap[row][col] = t;
  });

  return tileMap;
}

export default GetGridMasterTiles;