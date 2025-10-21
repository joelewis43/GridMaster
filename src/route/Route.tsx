import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import type { Step } from '../types';
import DraggableStep from './DraggableStep';
import ControlBar from './ControlBar';
import TaskModal from './StepModal';
import { useRouteContext } from '../providers/RouteProvider';

const ItemType = 'TILE';

interface RouteProps {
}

const Route: React.FC<RouteProps> = ({ }) => {
  const { route, setRoute, appendRoute, editRouteStep, deleteStepFromRoute } = useRouteContext();
  const [showAddStep, setShowAddStep] = useState(false);
  const [showEditStep, setShowEditStep] = useState(false);
  const [selectedStep, setSelectedStep] = useState<Step>();

  const moveStep = useCallback((fromIndex: number, toIndex: number) => {
    setRoute((prevSteps) =>
      update(prevSteps, {
        $splice: [
          [fromIndex, 1],
          [toIndex, 0, prevSteps[fromIndex]],
        ],
      })
    );
  }, []);

  const flipAddStep = () => { setShowAddStep(!showAddStep) }
  const flipEditStep = () => { setShowEditStep(!showEditStep) }
  const startEditStep = (step: Step) => {
    setSelectedStep(step);
    flipEditStep();
  }

  return (
    <div>
      <ControlBar openAddStep={flipAddStep} routeForExport={route} />
      <div className='task-list-header'>
        <h4 className='task-body'>Step</h4>
        <h4 className='input-body'>Input</h4>
        <h4 className='output-body'>Output</h4>
      </div>
      {route.map((step, index) => (
        <DraggableStep
          key={step.id}
          index={index}
          step={step}
          moveStep={moveStep}
          type={ItemType}
          deleteStep={deleteStepFromRoute}
          editStep={startEditStep}
        />
      ))}

      {/* used for add task */}
      <TaskModal show={showAddStep} onClose={flipAddStep} onSubmit={appendRoute} />
      <TaskModal show={showEditStep} onClose={flipEditStep} onSubmit={editRouteStep} initialStep={selectedStep} />
    </div>
  );
};

export default Route;
