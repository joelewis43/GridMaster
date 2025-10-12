import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import type { Task } from '../types'
import TileModal from './TileModal';
import TaskCell from './TaskCell';
import { useTaskContext } from '../TaskProvider';

type TileMap = {
  [row: number]: {
    [col: number]: Task;
  };
};

interface GridProps {
  tileMap: TileMap;
}

const Grid: React.FC<GridProps> = ({ tileMap }) => {
  const gridSize = 7;

  const [selectedTile, setSelectedTile] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { addTask } = useTaskContext();

  const handleTileClick = (tile: Task) => {
    setSelectedTile(tile);
    setShowModal(true);
  };

  const buildRowContents = (gridSize: number, row: number, tileMap: TileMap, handleTileClick: (tile: Task) => void) => {
  return (
    <Row key={row} className="g-2 grid-row">
      {Array.from({ length: gridSize }, (_, colIndex) => {
        const col = colIndex + 1;
        const tile = tileMap[row]?.[col];

        return <TaskCell task={tile} onClick={handleTileClick}/>
      })}
    </Row>
  );
}

  return (
    <Container fluid>
      {Array.from({ length: gridSize }, (_, rowIndex) => {
        const row = rowIndex + 1;
        return buildRowContents(gridSize, row, tileMap, handleTileClick);
      })}

      <TileModal
        tile={selectedTile}
        show={showModal}
        onClose={() => setShowModal(false)}
        addTask={addTask}
      />

    </Container>
  );
};

export default Grid;