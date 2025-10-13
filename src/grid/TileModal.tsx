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
        <Modal.Title>{tile.rewardName || ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ whiteSpace: 'pre-line' }}>{tile.reward || 'No reward data available.'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant='secondary' onClick={() => addTileToList(tile)}>
          Add to List
        </Button>
        {/* This is a temp button until the planned variable is toggled via adding to list */}
        <Button variant='secondary' onClick={() => {tile.planned = !tile.planned; onClose();}}>
          Mark complete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TileModal;
