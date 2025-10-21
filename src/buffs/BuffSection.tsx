import React from 'react';
import { type GridTile } from '../types';
import Icon from '../icon/Icon';

interface BuffSectionProps {
  buffs: GridTile[],
}

const BuffSection: React.FC<BuffSectionProps> = ({ buffs }) => {

  return (
      <div className='buff-icon'>
        {buffs.map(tile => (
          <Icon row={tile.row} col={tile.col} description={tile.reward.name} opaque={false} reward={true} />
        ))}
      </div>
  );
};

export default BuffSection;