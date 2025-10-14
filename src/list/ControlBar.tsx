import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ExportButton from './ExportButton';
import type { Task } from '../types';
import ImportButton from './ImportButton';
import { FaQuestionCircle } from "react-icons/fa";
import HelpModal from './HelpModal';
import { useTaskContext } from '../TaskProvider';

interface ControlBarProps {
  openAddTask: Function,
  tasksForExport: Task[],
}

const ControlBar: React.FC<ControlBarProps> = ({ openAddTask, tasksForExport }) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  const flipHelpModal = () => {setShowHelpModal(!showHelpModal)}

  const { importTask } = useTaskContext();
  

  return (
    <div className='task-controls'>
      <Button variant="secondary" onClick={() => openAddTask()}>
        Add Task
      </Button>
      <ImportButton onImport={importTask} />
      <ExportButton tasks={tasksForExport} />
      <Button variant='secondary' onClick={() => flipHelpModal()}>
        <FaQuestionCircle/>
      </Button>

      <HelpModal show={showHelpModal} onClose={flipHelpModal}/>
    </div>
  );
};

export default ControlBar;
