import React from 'react';
import clsx from 'clsx';

import { Component } from '../../../model/component';
import { useInput } from '../../../hooks/useInput';
import { ComponentDetailsTab, useComponentDetailsTabs } from '../hooks/useComponentDetailsTabs';
import Panel from '../../../components/Panel';
import SizeInput from '../../../components/SizeInput';
import ComponentProperties from './ComponentProperties';
import ComponentHooks from './ComponentHooks';

interface Props {
  component: Component;
  selectedPropIndex: number | null;
  selectedHookIndex: number | null;
  onAddComponent: (parentId: string) => void;
  onDeleteComponent: (componentId: string) => void;
  onUpdateComponent: (componentId: string, data: Partial<Component>) => void;
  onMoveOutComponent: (componentId: string) => void;
  onMoveInComponent: (componentId: string) => void;
  onMoveUpComponent: (componentId: string) => void;
  onMoveDownComponent: (componentId: string) => void;
  onAddProp: (componentId: string) => void;
  onSelectProp: (componentId: string, propIndex: number) => void;
  onAddHook: (componentId: string) => void;
  onSelectHook: (componentId: string, hookIndex: number) => void;
}

const ComponentDetails: React.FC<Props> = ({
  component,
  selectedPropIndex,
  selectedHookIndex,
  onAddComponent,
  onDeleteComponent,
  onUpdateComponent,
  onMoveOutComponent,
  onMoveInComponent,
  onMoveUpComponent,
  onMoveDownComponent,
  onAddProp,
  onSelectProp,
  onAddHook,
  onSelectHook
}) => {
  const { selectedTab, changeTab } = useComponentDetailsTabs();

  const nameInput = useInput(component.name, name => onUpdateComponent(component.id, { name }));
  const widthInput = useInput(component.width, width => onUpdateComponent(component.id, { width }));

  const handleKeyDown = (callback: () => void): React.KeyboardEventHandler => e => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  const handleWidthChange = (width: number) => {
    widthInput.change(width);
    widthInput.submit();
  };

  const handleTabChange = (tab: ComponentDetailsTab): React.MouseEventHandler => e => {
    e.preventDefault();
    changeTab(tab);
  };

  const handleAddProp = () => {
    changeTab('Props');
    onAddProp(component.id);
  };

  const handleAddHook = () => {
    changeTab('Hooks');
    onAddHook(component.id);
  };

  return (
    <>
      <Panel>
        <div className="card-header">
          <i className="fa fa-cube"></i> Component
        </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={nameInput.value}
              onChange={e => nameInput.change(e.target.value)}
              onKeyDown={handleKeyDown(nameInput.submit)}
            />
          </div>
          <div className="form-group">
            <SizeInput value={widthInput.value} onChange={handleWidthChange} />
          </div>
          <div className="btn-toolbar">
            <div className="form-group btn-group mr-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onAddComponent(component.id)}
              >
                <i className="fa fa-plus"></i> Comp
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleAddProp}>
                <i className="fa fa-plus"></i> Prop
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleAddHook}>
                <i className="fa fa-plus"></i> Hook
              </button>
            </div>
            <div className="form-group btn-group mr-2">
              <button
                type="button"
                className="btn btn-danger"
                disabled={!component.parentId}
                onClick={() => onDeleteComponent(component.id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
            <div className="form-group btn-group">
              <button
                type="button"
                className="btn btn-secondary"
                title="In"
                onClick={() => onMoveInComponent(component.id)}
              >
                <i className="fa fa-arrow-circle-up"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                title="Out"
                onClick={() => onMoveOutComponent(component.id)}
              >
                <i className="fa fa-arrow-circle-down"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                title="Up"
                onClick={() => onMoveUpComponent(component.id)}
              >
                <i className="fa fa-arrow-up"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                title="Down"
                onClick={() => onMoveDownComponent(component.id)}
              >
                <i className="fa fa-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>
      </Panel>
      <Panel continuous fill>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a
                className={clsx('nav-link', selectedTab === 'Props' && 'active')}
                href="#props"
                onClick={handleTabChange('Props')}
              >
                Props
              </a>
            </li>
            <li className="nav-item">
              <a
                className={clsx('nav-link', selectedTab === 'Hooks' && 'active')}
                href="#hooks"
                onClick={handleTabChange('Hooks')}
              >
                Hooks
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-fill position-relative">
          <div className="absolute-fill overflow-auto">
            {selectedTab === 'Props' && (
              <ComponentProperties
                properties={component.properties}
                selectedIndex={selectedPropIndex}
                onSelect={index => onSelectProp(component.id, index)}
              />
            )}
            {selectedTab === 'Hooks' && (
              <ComponentHooks
                hooks={component.hooks}
                selectedIndex={selectedHookIndex}
                onSelect={index => onSelectHook(component.id, index)}
              />
            )}
          </div>
        </div>
      </Panel>
    </>
  );
};

export default ComponentDetails;
