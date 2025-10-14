import React, { useRef } from 'react';
import { Col } from 'react-bootstrap';
import type { GridTile } from '../types';
import { useTaskContext } from '../TaskProvider';

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
      return <p className="tile-text">{tile.name}</p>;
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
      {getTaskContent()}
    </Col>
  );
};

export default GridCell;