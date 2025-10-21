import React, { useState, useRef, useEffect } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';

interface IconProps {
  row: number;
  col: number;
  opaque: boolean;
  description: string;
  reward?: boolean;
}

const FLIP_DURATION = 400; // in ms (full flip)

const Icon: React.FC<IconProps> = ({ row, col, opaque, description, reward }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  const target = useRef<HTMLDivElement | null>(null);

  const nextSrc = reward
    ? `rewards/60px-Grid_Master_tile_(R${row}T${col})_reward.png`
    : `tasks/50px-Grid_Master_tile_(R${row}T${col}).png`;

  const tileImageClass = `tile-icon ${opaque ? 'tile-opaque' : ''}`;

  useEffect(() => {
    if (currentSrc && currentSrc !== nextSrc) {
      setFlipped(true);
      const timeout = setTimeout(() => {
        setCurrentSrc(nextSrc);
        setFlipped(false);
      }, FLIP_DURATION / 2); // swap at halfway point
      return () => clearTimeout(timeout);
    } else if (!currentSrc) {
      setCurrentSrc(nextSrc);
    }
  }, [nextSrc, currentSrc]);

  return (
    <div
      ref={target}
      className="flip-container"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <div
        className={`flipper ${flipped ? 'flipped' : ''}`}
        style={{ transitionDuration: `${FLIP_DURATION}ms` }} // 👈 dynamically set
      >
        <img
          src={currentSrc}
          className={`${tileImageClass} front`}
          alt={description}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <Overlay target={target.current} show={showToolTip} placement="right">
        {(props) => (
          <Tooltip id={`tooltip-${row}-${col}`} {...props}>
            {description}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
};

export default Icon;
