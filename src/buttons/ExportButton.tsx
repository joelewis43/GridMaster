import React from 'react';
import { FaDownload } from "react-icons/fa";
import { useRouteContext } from '../providers/RouteProvider';

interface ExportButtonProps {
}

const ExportButton: React.FC<ExportButtonProps> = ({  }) => {
  const { route } = useRouteContext();
  const handleExport = () => {
    const json = JSON.stringify(route, null, 2); // pretty print with 2-space indent
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json'; // file name
    a.click();

    URL.revokeObjectURL(url); // clean up
  };

  return (
    <FaDownload className='nav-clickable' onClick={handleExport}/>
  );
};

export default ExportButton;
