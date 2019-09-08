import { useState } from 'react';
import omit from 'ramda/es/omit';
import without from 'ramda/es/without';

import { ComponentTree } from '../../../model/component';
import { uniqueId } from '../../../utils/strings';

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

const handleDeleteComponent = (componentId: string) => (state: State): State => {
  const parentId = state.tree.components[componentId].parentId!;

  const componentIdsToRemove: string[] = [];
  const collectComponentsToRemove = (id: string) => {
    componentIdsToRemove.push(id);
    state.tree.byParent[id].forEach(collectComponentsToRemove);
  };

  collectComponentsToRemove(componentId);

  return {
    ...state,
    tree: {
      ...state.tree,
      components: omit(componentIdsToRemove, state.tree.components),
      byParent: {
        ...omit(componentIdsToRemove, state.tree.byParent),
        [parentId]: without([componentId], state.tree.byParent[parentId])
      }
    }
  };
};

export const useComponentModel = () => {
  const [state, setState] = useState(initialState);

  const addComponent = (parentId: string) => {
    const componentId = uniqueId();
    setState(handleAddComponent(parentId, componentId));

    return componentId;
  };

  const deleteComponent = (id: string) => setState(handleDeleteComponent(id));

  return {
    ...state,
    addComponent,
    deleteComponent
  };
};
