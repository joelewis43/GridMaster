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
      <Modal.Body className='grid-modal'>
        <h5>Task: {tile.task.name}</h5>
        <h5>Reward: {tile.reward.name}</h5>
        <p style={{ whiteSpace: 'pre-wrap' }}>Description: {tile.reward.description || 'No reward description is available.'}</p>
        <div className='modal-buttons'>
          <Button className='modal-button' onClick={onClose}>
            Close
          </Button>
          <Button className='modal-button' onClick={() => addTileToRoute(tile)}>
            Add to List
          </Button>
        </div>
      </Modal.Body>


    </Modal>
  );
};

export default TileModal;
