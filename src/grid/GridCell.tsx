import React, { useRef } from 'react';
import { Col } from 'react-bootstrap';
import type { GridTile } from '../types';
import { useRouteContext } from '../providers/RouteProvider';
import Icon from '../icon/Icon';

interface GridCellProps {
  tile: GridTile;
  onClick: (tile: GridTile) => void;
}

const GridCell: React.FC<GridCellProps> = ({ tile, onClick }) => {
  const { addTileToRoute } = useRouteContext();
  const clickTimeout = useRef<number | null>(null);

  const getClasses = () => {
    return (
      `tile-cell
        ${tile ? 'tile-filled' : 'tile-empty'}
        ${tile ? `border-${tile.task.difficulty.toLowerCase()}` : ''}
        ${tile != undefined ? (tile.planned ? 'task-planned' : '') : ''}`
    );
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
    addTileToRoute(tile);
  };

  return (
    <Col className={getClasses()} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <Icon row={tile.row} col={tile.col} opaque={tile.planned} description={tile.task.name}/>
    </Col>
  );
};

export default GridCell;