import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Task } from '../types';
import { BsTrash } from 'react-icons/bs'
import { FaEdit } from "react-icons/fa";

interface DraggableTaskProps {
  task: Task;
  index: number;
  moveTask: (from: number, to: number) => void;
  type: string;
  deleteTask: (id: string) => void;
  editTask: (task: Task) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ task, index, moveTask, type, deleteTask, editTask }) => {
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

      moveTask(dragIndex, hoverIndex);
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
    <div ref={ref} className='drag-task'>

      <div className='task-body'>
        <p>{task.task}</p>
      </div>

      <div className='input-body'>
        <p>{task.input}</p>
      </div>

      <div className='reward-body'>
        <p>{task.outputName}</p>
      </div>

      <div className='button-container'>
        <button onClick={() => editTask(task)} className='update-task'>
          <FaEdit />
        </button>
        <button onClick={() => deleteTask(task.id)} className='delete-task'>
          <BsTrash />
        </button>
      </div>
    </div>
  );
};

export default DraggableTask;
