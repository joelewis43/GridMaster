import React from 'react';
import { Modal } from 'react-bootstrap';

interface HelpModalProps {
  show: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <ul>
        <li>4x xp at spawn</li>
        <li>5x drops at spawn</li>
        <li>some kind of anti grief at lesser demon</li>
        <li>quests that unlock regions are auto'd (e.g. corsair curse)</li>
      </ul>
    </Modal>
  );
};

export default HelpModal;
