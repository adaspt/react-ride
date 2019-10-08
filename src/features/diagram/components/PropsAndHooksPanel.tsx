import React from 'react';
import clsx from 'clsx';

import { Component } from '../../../model/component';
import Panel from '../../../components/Panel';
import { DiagramTab } from '../hooks/useSelection';
import ComponentItems from './ComponentItems';

interface Props {
  component: Component;
  selectedTab: DiagramTab;
  selectedPropIndex: number | null;
  selectedHookIndex: number | null;
  onTabChange: (tab: DiagramTab) => void;
  onPropSelect: (componentId: string, index: number) => void;
  onHookSelect: (componentId: string, index: number) => void;
}

const PropsAndHooksPanel: React.FC<Props> = ({
  component,
  selectedTab,
  selectedPropIndex,
  selectedHookIndex,
  onTabChange,
  onPropSelect,
  onHookSelect
}) => {
  const handleTabChange = (tab: DiagramTab): React.MouseEventHandler => e => {
    e.preventDefault();
    onTabChange(tab);
  };

  const props = component.properties.map(x => `${x.name}: ${x.type}`);
  const hooks = component.hooks.map(x => x.name);

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
      <div className="flex-fill position-relative">
        <div className="absolute-fill overflow-auto">
          {selectedTab === 'props' && (
            <ComponentItems
              items={props}
              selectedIndex={selectedPropIndex}
              onSelect={index => onPropSelect(component.id, index)}
            />
          )}
          {selectedTab === 'hooks' && (
            <ComponentItems
              items={hooks}
              selectedIndex={selectedHookIndex}
              onSelect={index => onHookSelect(component.id, index)}
            />
          )}
        </div>
      </div>
    </Panel>
  );
};

export default PropsAndHooksPanel;
