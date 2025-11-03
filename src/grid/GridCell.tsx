import React, { useRef, useState } from 'react';
import { Col } from 'react-bootstrap';
import type { GridTile } from '../types';
import { useRouteContext } from '../providers/RouteProvider';
import Icon from '../icon/Icon';
import TileModal from '../modals/TileModal';

interface GridCellProps {
  tile: GridTile;
  reward: boolean;
}

const GridCell: React.FC<GridCellProps> = ({ tile, reward }) => {
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(true);
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

  const tileDescription = reward ? tile.reward.name : tile.task.name;

  return (
    <>
      <Col className={getClasses()} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        <Icon row={tile.row} col={tile.col} opaque={tile.planned} description={tileDescription} reward={reward} />
      </Col>

      <TileModal
        tile={tile}
        show={showModal}
        onClose={() => setShowModal(false)}
      /></>

  );
};

export default GridCell;