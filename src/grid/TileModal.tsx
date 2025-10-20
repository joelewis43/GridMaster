import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import type { GridTile } from '../types';
import { useTaskContext } from '../TaskProvider';

interface TileModalProps {
  tile: GridTile | null;
  show: boolean;
  onClose: () => void;
}

const TileModal: React.FC<TileModalProps> = ({ tile, show, onClose }) => {


  const { addTileToList } = useTaskContext();

  if (!tile) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <h3>{tile.taskName || ''}</h3>
      </Modal.Header>

      <Modal.Body>
        <h4>{tile.rewardName}</h4>
        <p>{tile.rewardDescription || 'No reward description is available.'}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant='secondary' onClick={() => addTileToList(tile)}>
          Add to List
        </Button>
      </Modal.Footer>
      
    </Modal>
  );
};

export default TileModal;
