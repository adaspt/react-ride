import { useState } from 'react';

import { ComponentTree } from '../../../model/component';

interface State {
  tree: ComponentTree;
}

const initialState: State = {
  tree: {
    components: {
      root: { id: 'root', parentId: null, name: 'App', width: 12, properties: [], hooks: [] },
      diagram: { id: 'diagram', parentId: 'root', name: 'Diagram', width: 12, properties: [], hooks: [] }
    },
    byParent: {
      root: ['diagram'],
      diagram: []
    }
  }
};

const handleAddComponent = (parentId: string, id: string) => (state: State): State => ({
  ...state,
  tree: {
    ...state.tree,
    components: {
      ...state.tree.components,
      [id]: { id, parentId, name: 'Component', width: 12, properties: [], hooks: [] }
    },
    byParent: {
      ...state.tree.byParent,
      [id]: [],
      [parentId]: [...state.tree.byParent[parentId], id]
    }
  }
});

export const useComponentModel = () => {
  const [state, setState] = useState(initialState);

  const addComponent = (parentId: string) => setState(handleAddComponent(parentId, 'random'));
  return {
    ...state,
    addComponent
  };
};
