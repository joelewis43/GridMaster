import React, { useState } from 'react';
import ExportButton from '../buttons/ExportButton';
import ImportButton from '../buttons/ImportButton';
import { FaQuestionCircle, FaPlusCircle } from "react-icons/fa";
import HelpModal from '../modals/HelpModal';
import { useRouteContext } from '../providers/RouteProvider';
import StepModal from '../modals/StepModal';

interface NavBarProps {
}

const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAddStep, setShowAddStep] = useState(false);

  const flipHelpModal = () => { setShowHelpModal(!showHelpModal) }
  const flipAddStep = () => { setShowAddStep(!showAddStep) }

  const { importRoute, appendRoute } = useRouteContext();

  return (
    <div className='navbar'>
      <div className='nav-header-container' >
        <h3>GridMaster Planner</h3>
      </div>

      <div className='nav-button-container'>
        <FaPlusCircle className='nav-clickable' onClick={flipAddStep} />
        <ImportButton onImport={importRoute} />
        <ExportButton />
        <FaQuestionCircle className='nav-clickable' onClick={flipHelpModal} />
      </div>

      <HelpModal show={showHelpModal} onClose={flipHelpModal} />
      <StepModal show={showAddStep} onClose={flipAddStep} onSubmit={appendRoute} />

    </div>
  );
};

export default NavBar;
