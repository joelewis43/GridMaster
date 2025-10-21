import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BsTrash } from 'react-icons/bs'
import { FaEdit } from "react-icons/fa";
import type { Step } from '../types';

interface DraggableStepProps {
  step: Step;
  index: number;
  moveStep: (from: number, to: number) => void;
  type: string;
  deleteStep: (id: string) => void;
  editStep: (step: Step) => void;
}

const DraggableStep: React.FC<DraggableStepProps> = ({ step, index, moveStep, type, deleteStep, editStep }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveStep(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  if (isDragging && 0) return;

  return (
    <div ref={ref} className={`drag-task ${step.type + '-class'}`}>

      <div className='task-body'>
        <p>{step.task}</p>
      </div>

      <div className='input-body'>
        <p>{step.input}</p>
      </div>

      <div className='reward-body'>
        <p>{step.outputName}</p>
      </div>

      <div className='button-container'>
        <button onClick={() => editStep(step)} className='update-task'>
          <FaEdit />
        </button>
        <button onClick={() => deleteStep(step.id)} className='delete-task'>
          <BsTrash />
        </button>
      </div>
    </div>
  );
};

export default DraggableStep;
