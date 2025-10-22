import React from 'react';
import { useGridContext } from '../providers/GridProvider';
import { RewardType, type GridTile } from '../types';
import BuffSection from './BuffSection';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

interface BuffsProps { }

const Buffs: React.FC<BuffsProps> = () => {
  const { grid } = useGridContext();

  // Flatten and filter planned tiles
  const allTiles: GridTile[] = Object.values(grid).flatMap(row =>
    Object.values(row)
  );
  const plannedTiles = allTiles.filter(tile => tile.planned);

  // Group tiles by reward type
  const groupedTiles = Object.values(RewardType).reduce(
    (acc, type) => {
      acc[type] = plannedTiles.filter(tile => tile.reward.type === type);
      return acc;
    },
    {} as Record<RewardType, GridTile[]>
  );

  return (
    <div className='buff-tabs-container'>
      <Tabs defaultActiveKey={RewardType.Relic} className="tabs-class" fill>
        {Object.values(RewardType).map(type => (
          <Tab key={type} eventKey={type} title={type} className='tab-class'>
            <BuffSection buffs={groupedTiles[type]} />
          </Tab>
        ))}
      </Tabs>
    </div>

  );
};

export default Buffs;
