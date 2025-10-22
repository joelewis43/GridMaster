import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import type { Step } from '../types';
import DraggableStep from './DraggableStep';
import StepModal from './StepModal';
import { useRouteContext } from '../providers/RouteProvider';

const ItemType = 'TILE';

interface RouteProps {
}

const Route: React.FC<RouteProps> = ({ }) => {
  const { route, setRoute, editRouteStep } = useRouteContext();
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


  const flipEditStep = () => { setShowEditStep(!showEditStep) }
  const startEditStep = (step: Step) => {
    setSelectedStep(step);
    flipEditStep();
  }

  return (
    <div className='route-container'>
      <div className='task-list-header'>
        <h4 className='route-col'>Step</h4>
        <h4 className='route-col'>Input</h4>
        <h4 className='route-col'>Output</h4>
      </div>
      <hr />
      <div className='step-container'>
        {route.map((step, index) => (
          <DraggableStep
            key={step.id}
            index={index}
            step={step}
            moveStep={moveStep}
            type={ItemType}
            editStep={startEditStep}
          />
        ))}
      </div>
      <StepModal show={showEditStep} onClose={flipEditStep} onSubmit={editRouteStep} initialStep={selectedStep} />
    </div>
  );
};

export default Route;
