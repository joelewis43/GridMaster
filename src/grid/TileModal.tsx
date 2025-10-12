import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import type { Task } from '../types';

interface TileModalProps {
  tile: Task | null;
  show: boolean;
  onClose: () => void;
  addTask: (task: Task) => void;
}

const TileModal: React.FC<TileModalProps> = ({ tile, show, onClose, addTask }) => {
  if (!tile) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{tile.outputName || ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ whiteSpace: 'pre-line' }}>{tile.outputValue || 'No reward data available.'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant='secondary' onClick={() => addTask(tile)}>
          Add to List
        </Button>
        <Button variant='secondary' onClick={() => {tile.done = !tile.done; onClose();}}>
          Mark complete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TileModal;
