import React from 'react';
import { Modal } from 'react-bootstrap';

interface HelpModalProps {
  show: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body>
        <Modal.Title>Help Page</Modal.Title>
        <hr />
        <h6>GridMaster Overview</h6>
        <ul>
          <li>Starting XP Multiplier: 5x</li>
          <li>Starting Drop Rate Multiplier: 8x</li>
          <li>Starting Slayer Point Multiplier: 5x</li>
          <li>Starting Farming Groth Rate Multiplier: 5x</li>
          <li>Starting Minigame Points Multiplier: 4x</li>
          <li>Shops have unlimited stock</li>
          <li>Quests that unlock regions are auto'd (e.g. corsair curse)</li>
        </ul>
        <hr />
        <h6>Planner Help</h6>
        <ul>
          <li>Click on grid tiles to see their associated reward and description, double click to add them to your route</li>
          <li>As you add grid tiles to the route, the rewards you'll get are added to the reward display under the grid</li>
          <li>Use the + button on the nav to add custom steps in your route like traveling to talking to an NPC</li>
          <li>You can import and export your route from the nav as well</li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default HelpModal;
