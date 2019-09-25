import { useState, useEffect } from 'react';

import {
  ComponentTree,
  Component,
  ComponentProperty,
  ComponentHook,
  saveComponentTree,
  loadComponentTree
} from '../../../model/component';
import { adjust, append, insert, remove, swap, without } from '../../../utils/arrays';
import { pipe } from '../../../utils/functions';
import { uniqueId } from '../../../utils/strings';
import { Mod, mod, mergeLeft, omit, set } from '../../../utils/objects';
import { useDebouncedEffect } from '../../../hooks/useDebouncedEffect';

interface State {
  tree: ComponentTree;
}

const createComponent = (id: string, parentId: string | null, name: string): Component => ({
  id,
  parentId,
  name,
  width: 12,
  properties: [],
  hooks: []
});

const initialState: State = {
  tree: {
    components: {
      root: createComponent('root', null, 'App')
    },
    children: {
      root: []
    }
  }
};

const updateTree = mod('tree') as Mod<State, ComponentTree>;
const updateComponents = mod('components');
const updateChildren = mod('children');

const handleAddComponent = (parentId: string, id: string) =>
  updateTree(
    pipe(
      updateComponents(set(id, createComponent(id, parentId, 'Component'))),
      updateChildren(
        pipe(
          set(id, [] as string[]),
          mod(parentId, append(id))
        )
      )
    )
  );

const handleDeleteComponent = (componentId: string) => (state: State): State => {
  const parentId = state.tree.components[componentId].parentId!;

  const componentIdsToRemove: string[] = [];
  const collectComponentsToRemove = (id: string) => {
    componentIdsToRemove.push(id);
    state.tree.children[id].forEach(collectComponentsToRemove);
  };

  collectComponentsToRemove(componentId);

  return updateTree(
    pipe(
      updateComponents(omit(componentIdsToRemove)),
      updateChildren(
        pipe(
          omit(componentIdsToRemove),
          mod(parentId, without([componentId]))
        )
      )
    )
  )(state);
};

const handleUpdateComponent = (componentId: string, data: Partial<Component>) =>
  updateTree(updateComponents(mod(componentId, mergeLeft(data))));

const handleMoveOutComponent = (componentId: string) => (state: State): State => {
  const prevParentId = state.tree.components[componentId].parentId;
  if (!prevParentId) {
    return state;
  }

  const nextParentId = state.tree.components[prevParentId].parentId;
  if (!nextParentId) {
    return state;
  }

  const siblings = state.tree.children[nextParentId];
  const parentIndex = siblings.indexOf(prevParentId);

  return updateTree(
    pipe(
      updateComponents(mod(componentId, set('parentId', nextParentId as string | null))),
      updateChildren(
        pipe(
          mod(prevParentId, without([componentId])),
          mod(nextParentId, insert(parentIndex + 1, componentId))
        )
      )
    )
  )(state);
};

const handleMoveInComponent = (componentId: string) => (state: State): State => {
  const prevParentId = state.tree.components[componentId].parentId;
  if (!prevParentId) {
    return state;
  }

  const siblings = state.tree.children[prevParentId];
  const prevIndex = siblings.indexOf(componentId);
  if (prevIndex === 0) {
    return state;
  }

  const nextParentId = siblings[prevIndex - 1];

  return updateTree(
    pipe(
      updateComponents(mod(componentId, set('parentId', nextParentId as string | null))),
      updateChildren(
        pipe(
          mod(prevParentId, without([componentId])),
          mod(nextParentId, append(componentId))
        )
      )
    )
  )(state);
};

const handleMoveUpComponent = (componentId: string) => (state: State): State => {
  const prevParentId = state.tree.components[componentId].parentId;
  if (!prevParentId) {
    return state;
  }

  const siblings = state.tree.children[prevParentId];
  const prevIndex = siblings.indexOf(componentId);
  if (prevIndex === 0) {
    return state;
  }

  const nextIndex = prevIndex - 1;

  return updateTree(updateChildren(mod(prevParentId, swap(prevIndex, nextIndex))))(state);
};

const handleMoveDownComponent = (componentId: string) => (state: State): State => {
  const prevParentId = state.tree.components[componentId].parentId;
  if (!prevParentId) {
    return state;
  }

  const siblings = state.tree.children[prevParentId];
  const prevIndex = siblings.indexOf(componentId);
  if (prevIndex === siblings.length - 1) {
    return state;
  }

  const nextIndex = prevIndex + 1;

  return updateTree(updateChildren(mod(prevParentId, swap(prevIndex, nextIndex))))(state);
};

const handleAddProp = (componentId: string) =>
  updateTree(updateComponents(mod(componentId, mod('properties', append({ name: 'prop', type: 'string' })))));

const handleUpdateProp = (componentId: string, propIndex: number, data: Partial<ComponentProperty>) =>
  updateTree(updateComponents(mod(componentId, mod('properties', adjust(propIndex, mergeLeft(data))))));

const handleDeleteProp = (componentId: string, propIndex: number) =>
  updateTree(updateComponents(mod(componentId, mod('properties', remove<ComponentProperty>(propIndex, 1)))));

const handleAddHook = (componentId: string) =>
  updateTree(updateComponents(mod(componentId, mod('hooks', append({ name: 'useHook' })))));

const handleUpdateHook = (componentId: string, hookIndex: number, data: Partial<ComponentHook>) =>
  updateTree(updateComponents(mod(componentId, mod('hooks', adjust(hookIndex, mergeLeft(data))))));

const handleDeleteHook = (componentId: string, hookIndex: number) =>
  updateTree(updateComponents(mod(componentId, mod('hooks', remove<ComponentHook>(hookIndex, 1)))));

export const useComponentModel = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const tree = loadComponentTree();
    if (tree) {
      setState({ tree });
    }
  }, []);

  useDebouncedEffect(
    () => {
      console.log('Saving...');
      saveComponentTree(state.tree);
    },
    5000,
    [state.tree]
  );

  const addComponent = (parentId: string) => {
    const componentId = uniqueId();
    setState(handleAddComponent(parentId, componentId));

    return componentId;
  };

  const deleteComponent = (id: string) => setState(handleDeleteComponent(id));

  const updateComponent = (id: string, data: Partial<Component>) => setState(handleUpdateComponent(id, data));

  const moveOutComponent = (componentId: string) => setState(handleMoveOutComponent(componentId));

  const moveInComponent = (componentId: string) => setState(handleMoveInComponent(componentId));

  const moveUpComponent = (componentId: string) => setState(handleMoveUpComponent(componentId));

  const moveDownComponent = (componentId: string) => setState(handleMoveDownComponent(componentId));

  const addProp = (componentId: string) => {
    setState(handleAddProp(componentId));
    return state.tree.components[componentId].properties.length;
  };

  const updateProp = (componentId: string, propIndex: number, data: Partial<ComponentProperty>) =>
    setState(handleUpdateProp(componentId, propIndex, data));

  const deleteProp = (componentId: string, propIndex: number) =>
    setState(handleDeleteProp(componentId, propIndex));

  const addHook = (componentId: string) => {
    setState(handleAddHook(componentId));
    return state.tree.components[componentId].hooks.length;
  };

  const updateHook = (componentId: string, hookIndex: number, data: Partial<ComponentHook>) =>
    setState(handleUpdateHook(componentId, hookIndex, data));

  const deleteHook = (componentId: string, hookIndex: number) =>
    setState(handleDeleteHook(componentId, hookIndex));

  return {
    ...state,
    addComponent,
    deleteComponent,
    updateComponent,
    moveOutComponent,
    moveInComponent,
    moveUpComponent,
    moveDownComponent,
    addProp,
    updateProp,
    deleteProp,
    addHook,
    updateHook,
    deleteHook
  };
};
