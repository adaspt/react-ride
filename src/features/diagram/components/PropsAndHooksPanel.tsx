import React from 'react';
import clsx from 'clsx';

import { Component } from '../../../model/component';
import Panel from '../../../components/Panel';
import { DiagramTab } from '../hooks/useSelection';

interface Props {
  component: Component;
  selectedTab: DiagramTab;
  changeTab: (tab: DiagramTab) => void;
}

const PropsAndHooksPanel: React.FC<Props> = ({ component, selectedTab, changeTab }) => {
  const handleTabChange = (tab: DiagramTab): React.MouseEventHandler => e => {
    e.preventDefault();
    changeTab(tab);
  };

  return (
    <Panel continuous fill>
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a
              className={clsx('nav-link', selectedTab === 'props' && 'active')}
              href="#props"
              onClick={handleTabChange('props')}
            >
              Props
            </a>
          </li>
          <li className="nav-item">
            <a
              className={clsx('nav-link', selectedTab === 'hooks' && 'active')}
              href="#hooks"
              onClick={handleTabChange('hooks')}
            >
              Hooks
            </a>
          </li>
        </ul>
      </div>
    </Panel>
  );
};

export default PropsAndHooksPanel;
