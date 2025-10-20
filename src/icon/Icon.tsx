import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface IconProps {
  row: number;
  col: number;
  opaque: boolean;
  description: string;
}

const Icon: React.FC<IconProps> = ({ row, col, opaque, description }) => {

  const tileImage = `tasks/50px-Grid_Master_tile_(R${row}T${col}).png`
  const tileImageClass = `${opaque ? 'tile-opaque' : ''}`

  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id={`tooltip-${row}-${col}`}>{description}</Tooltip>}
    >
      <img src={tileImage} className={tileImageClass} alt={description} style={{ cursor: 'pointer' }} />
    </OverlayTrigger>
  );
};

export default Icon;