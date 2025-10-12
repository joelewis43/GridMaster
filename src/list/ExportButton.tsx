import React from 'react';
import type { Task } from '../types';
import { Button } from 'react-bootstrap';

interface ExportButtonProps {
  tasks: Task[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ tasks }) => {
  const handleExport = () => {
    const json = JSON.stringify(tasks, null, 2); // pretty print with 2-space indent
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json'; // file name
    a.click();

    URL.revokeObjectURL(url); // clean up
  };

  return (
    <Button variant="secondary" onClick={handleExport}>
      Export Tasks
    </Button>
  );
};

export default ExportButton;
