import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import type { GridTile } from '../types';
import { useRouteContext } from '../providers/RouteProvider';

interface TileModalProps {
  tile: GridTile | null;
  show: boolean;
  onClose: () => void;
}

const TileModal: React.FC<TileModalProps> = ({ tile, show, onClose }) => {


  const { addTileToRoute } = useRouteContext();

  if (!tile) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <h3>{tile.task.name || ''}</h3>
      </Modal.Header>

      <Modal.Body>
        <h4>{tile.reward.name}</h4>
        <p>{tile.reward.description || 'No reward description is available.'}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant='secondary' onClick={() => addTileToRoute(tile)}>
          Add to List
        </Button>
      </Modal.Footer>
      
    </Modal>
  );
};

export default TileModal;
