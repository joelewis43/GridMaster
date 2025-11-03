import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import type { TileMap } from '../types'
import { useGridContext } from '../providers/GridProvider';
import GridCell from './GridCell';

interface GridProps {
}

const Grid: React.FC<GridProps> = ({ }) => {
  const gridSize = 7;

  const [showRewardTile, setShowRewardTile] = useState(false);

  const { grid } = useGridContext();

  const handleFlipTiles = () => {
    setShowRewardTile(!showRewardTile);
  }

  const buildRowContents = (gridSize: number, row: number, tileMap: TileMap) => {
    return (
      <Row key={row} className="row no-side-margins">
        {Array.from({ length: gridSize }, (_, colIndex) => {
          const col = colIndex + 1;
          const tile = tileMap[row]?.[col];

          return <GridCell key={tile?.id ?? `${row}-${col}`} tile={tile} reward={showRewardTile}/>
        })}
      </Row>
    );
  }

  return (
    <div className='grid-div'>
      <Button className='grid-button' onClick={handleFlipTiles}>
        {showRewardTile ? 'Show Tasks' : 'Show Rewards'}
      </Button>
      <Container className='container-fluid'>
        {Array.from({ length: gridSize }, (_, rowIndex) => {
          const row = rowIndex + 1;
          return buildRowContents(gridSize, row, grid);
        })}
      </Container>
    </div>
  );
};

export default Grid;