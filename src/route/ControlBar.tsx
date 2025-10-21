import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExportButton from './ExportButton';
import type { Step } from '../types';
import ImportButton from './ImportButton';
import { FaQuestionCircle, FaPlusCircle } from "react-icons/fa";
import HelpModal from './HelpModal';
import { useRouteContext } from '../providers/RouteProvider';

interface ControlBarProps {
  openAddStep: Function,
  routeForExport: Step[],
}

const ControlBar: React.FC<ControlBarProps> = ({ openAddStep, routeForExport }) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  const flipHelpModal = () => {setShowHelpModal(!showHelpModal)}

  const { importRoute } = useRouteContext();
  

  return (
    <div className='task-controls'>
      <Button variant="secondary" onClick={() => openAddStep()}>
        <FaPlusCircle/>
      </Button>
      <ImportButton onImport={importRoute} />
      <ExportButton route={routeForExport} />
      <Button className='ms-auto' variant='secondary' onClick={() => flipHelpModal()}>
        <FaQuestionCircle/>
      </Button>

      <HelpModal show={showHelpModal} onClose={flipHelpModal}/>
    </div>
  );
};

export default ControlBar;
