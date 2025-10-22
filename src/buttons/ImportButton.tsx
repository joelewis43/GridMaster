import React from 'react';
import type { Step } from '../types';
import { FaUpload } from "react-icons/fa";

interface ImportButtonProps {
  onImport: (route: Step[]) => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onImport }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const data = JSON.parse(result);
          if (Array.isArray(data)) {
            onImport(data); // optionally validate
          } else {
            alert('Invalid file format: Expected an array of tasks.');
          }
        }
      } catch (error) {
        alert('Failed to read file. Ensure it is valid JSON.');
        console.error(error);
      }
    };

    reader.readAsText(file);
    e.target.value = ''; // allow re-uploading the same file
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // manually trigger file input
  };

  return (
    <>
      <input
        type="file"
        accept=".json,application/json"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <FaUpload className='nav-clickable' onClick={handleClick} />
    </>
  );
};

export default ImportButton;
