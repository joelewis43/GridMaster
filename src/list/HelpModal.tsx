import React from 'react';
import { Modal } from 'react-bootstrap';

interface HelpModalProps {
  show: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Help Page</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>Starting XP Multiplier: 5x</li>
          <li>Starting Drop Rate Multiplier: 8x</li>
          <li>Starting Slayer Point Multiplier: 5x</li>
          <li>Starting Farming Groth Rate Multiplier: 5x</li>
          <li>Starting Minigame Points Multiplier: 4x</li>
        </ul>
        <hr />
        <ul>
          <li>Shops have unlimited stock</li>
          <li>Mods have mentioned there will be some kind of anti grief at lesser demon</li>
          <li>Quests that unlock regions are auto'd (e.g. corsair curse)</li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default HelpModal;
