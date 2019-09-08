import React from 'react';
import clsx from 'clsx';

interface Props {
  continuous?: boolean;
  fill?: boolean;
}

const Panel: React.FC<Props> = ({ continuous = false, fill = false, children }) => {
  return (
    <div
      className={clsx(
        'card border-left-0 border-right-0 border-bottom-0 rounded-0',
        !continuous && 'border-top-0',
        fill && 'flex-fill'
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
