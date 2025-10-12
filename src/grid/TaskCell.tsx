import React, { useRef } from 'react';
import { Col } from 'react-bootstrap';
import type { Task } from '../types';
import { useTaskContext } from '../TaskProvider';

interface TaskCellProps {
  task: Task;
  onClick: (task: Task) => void;
}

const TaskCell: React.FC<TaskCellProps> = ({ task, onClick }) => {
  const { addTask } = useTaskContext();
  const clickTimeout = useRef<number | null>(null);

  const getClasses = (task: Task) => {
    return (
      `tile-cell
        ${task ? 'tile-filled' : 'tile-empty'}
        ${task ? `border-${task.difficulty.toLowerCase()}` : ''}`
    );
  };

  const getTaskContent = (task: Task) => {
    if (task) {
      return <p className="tile-text">{task.task}</p>;
    }
    return <span className="text-muted">—</span>;
  };

  const handleClick = () => {
    if (!task) return;
    
    // Clear any existing timeout
    if (clickTimeout.current !== null) {
      clearTimeout(clickTimeout.current);
    }
    
    // Set a new timeout with longer delay (300ms is safe for double-clicks)
    clickTimeout.current = setTimeout(() => {
      onClick(task);
      clickTimeout.current = null;
    }, 200);
  };

  const handleDoubleClick = () => {
    if (!task) return;
    
    // Cancel the pending single click
    if (clickTimeout.current !== null) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
   
    addTask(task);
  };

  return (
    <Col className={getClasses(task)} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      {getTaskContent(task)}
    </Col>
  );
};

export default TaskCell;