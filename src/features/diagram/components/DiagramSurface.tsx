import React from 'react';

import { ComponentTree } from '../../../model/component';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import Path from './Path';
import Component from './Component';

interface Props {
  tree: ComponentTree | null;
  treeError: string | null;
  treeLoading: boolean;
  selectedComponentId: string | null;
  onComponentSelect: (componentId: string | null) => void;
}

const DiagramSurface: React.FC<Props> = ({
  tree,
  treeError,
  treeLoading,
  selectedComponentId,
  onComponentSelect
}) => {
  if (treeError) {
    return (
      <div className="container-fluid py-5">
        <Error message={treeError} />
      </div>
    );
  }

  if (treeLoading) {
    return (
      <div className="container-fluid py-5">
        <Loading />
      </div>
    );
  }

  if (!tree) {
    return null;
  }

  return (
    <div className="absolute-fill overflow-auto" onClick={() => onComponentSelect(null)}>
      <Path selectedComponentId={selectedComponentId} tree={tree} />
      <div className="row no-gutters p-2">
        <Component
          id="root"
          selectedComponentId={selectedComponentId}
          tree={tree}
          onSelect={onComponentSelect}
        />
      </div>
    </div>
  );
};

export default DiagramSurface;
