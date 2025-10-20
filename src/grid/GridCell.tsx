import React, { useRef } from 'react';
import { Col } from 'react-bootstrap';
import type { GridTile } from '../types';
import { useTaskContext } from '../TaskProvider';
import Icon from '../icon/Icon';

interface GridCellProps {
  tile: GridTile;
  onClick: (tile: GridTile) => void;
}

const GridCell: React.FC<GridCellProps> = ({ tile, onClick }) => {
  const { addTileToList } = useTaskContext();
  const clickTimeout = useRef<number | null>(null);

  const getClasses = () => {
    return (
      `tile-cell
        ${tile ? 'tile-filled' : 'tile-empty'}
        ${tile ? `border-${tile.difficulty.toLowerCase()}` : ''}
        ${tile != undefined ? (tile.planned ? 'task-planned' : '') : ''}`
    );
  };

  const getTaskContent = () => {
    if (tile) {
      const tileImage = `tasks/50px-Grid_Master_tile_(R${tile.row}T${tile.col}).png`
      const tileImageClass = `${tile != undefined ? (tile.planned ? 'tile-planned' : '') : ''}`
      return <img src={tileImage} className={tileImageClass}/>
    }
    return <span className="text-muted">—</span>;
  };

  const handleClick = () => {
    if (!tile) return;
    
    // Clear any existing timeout
    if (clickTimeout.current !== null) {
      clearTimeout(clickTimeout.current);
    }
    
    // Set a new timeout with longer delay (300ms is safe for double-clicks)
    clickTimeout.current = setTimeout(() => {
      onClick(tile);
      clickTimeout.current = null;
    }, 200);
  };

  const handleDoubleClick = () => {
    if (!tile) return;
    
    // Cancel the pending single click
    if (clickTimeout.current !== null) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
    addTileToList(tile);
  };

  return (
    <Col className={getClasses()} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <Icon row={tile.row} col={tile.col} opaque={tile.planned} description={tile.taskName}/>
    </Col>
  );
};

export default GridCell;