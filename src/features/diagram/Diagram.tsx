import React from 'react';
import clsx from 'clsx';

import styles from './Diagram.module.css';

const Diagram: React.FC = () => {
  return (
    <div className="row no-gutters">
      <div className={clsx('col-8 overflow-auto', styles.fullHeightColumn)}>Designer</div>
      <div className={clsx('col-4 border-left border-light overflow-auto', styles.fullHeightColumn)}>
        Sidebar
      </div>
    </div>
  );
};

export default Diagram;
