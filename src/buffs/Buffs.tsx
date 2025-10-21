import React from 'react';
import { useGridContext } from '../providers/GridProvider';
import type { GridTile } from '../types';
import Icon from '../icon/Icon';

interface BuffsProps {

}

const Buffs: React.FC<BuffsProps> = ({ }) => {

const { grid } = useGridContext();

  // Flatten the TileMap into a single array of tiles
  const allTiles: GridTile[] = Object.values(grid)
    .flatMap(row => Object.values(row));

  // Filter tiles by a property, e.g., planned === true
  const plannedTiles = allTiles.filter(tile => tile.planned);

  return (
    <div>
      <h3>Active Buffs</h3>
        {plannedTiles.map(tile => (
            <Icon row={tile.row} col={tile.col} description={tile.reward.description} opaque={false} reward={true}/>
        ))}
    </div>
  );
};

export default Buffs;