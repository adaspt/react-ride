import { useState, useEffect } from 'react';
import omit from 'ramda/es/omit';
import remove from 'ramda/es/remove';
import update from 'ramda/es/update';
import without from 'ramda/es/without';

import {
  ComponentTree,
  Component,
  ComponentProperty,
  ComponentHook,
  saveComponentTree,
  loadComponentTree
} from '../../../model/component';
import { uniqueId } from '../../../utils/strings';
import { swap, insert } from '../../../utils/arrays';
import { useDebouncedEffect } from '../../../hooks/useDebouncedEffect';

interface State {
  tree: ComponentTree;
}

const initialState: State = {
  tree: {
    components: {
      root: { id: 'root', parentId: null, name: 'App', width: 12, properties: [], hooks: [] }
    },
    children: {
      root: []
    }
  }
};

const updateTreeAll = (
  ...fns: Array<(tree: ComponentTree) => ComponentTree>
): ((state: State) => State) => state => ({
  ...state,
  tree: fns.reduce((current, fn) => fn(current), state.tree)
});

const updateComponents = (
  fn: (components: Record<string, Component>) => Record<string, Component>
): ((tree: ComponentTree) => ComponentTree) => tree => ({
  ...tree,
  components: fn(tree.components)
});

const updateComponent = (
  componentId: string,
  fn: (component: Component) => Component
): ((components: Record<string, Component>) => Record<string, Component>) => components => ({
  ...components,
  [componentId]: fn(components[componentId])
});

const updateChildren = (
  fn: (children: Record<string, string[]>) => Record<string, string[]>
): ((tree: ComponentTree) => ComponentTree) => tree => ({
  ...tree,
  children: fn(tree.children)
});

const handleAddComponent = (parentId: string, id: string) =>
  updateTreeAll(
    updateComponents(
      updateComponent(id, () => ({ id, parentId, name: 'Component', width: 12, properties: [], hooks: [] }))
    ),
    updateChildren(children => ({
      ...children,
      [id]: [],
      [parentId]: [...children[parentId], id]
    }))
  );

const handleDeleteComponent = (componentId: string) => (state: State): State => {
  const parentId = state.tree.components[componentId].parentId!;

  const componentIdsToRemove: string[] = [];
  const collectComponentsToRemove = (id: string) => {
    componentIdsToRemove.push(id);
    state.tree.children[id].forEach(collectComponentsToRemove);
  };

  collectComponentsToRemove(componentId);

  return updateTreeAll(
    updateComponents(components => omit(componentIdsToRemove, components)),
    updateChildren(children => ({
      ...omit(componentIdsToRemove, children),
      [parentId]: without([componentId], children[parentId])
    }))
  )(state);
};

const handleUpdateComponent = (componentId: string, data: Partial<Component>) =>
  updateTreeAll(updateComponents(updateComponent(componentId, component => ({ ...component, ...data }))));

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

  return updateTreeAll(
    updateComponents(updateComponent(componentId, component => ({ ...component, parentId: nextParentId }))),
    updateChildren(children => ({
      ...children,
      [prevParentId]: without([componentId], children[prevParentId]),
      [nextParentId]: insert(parentIndex + 1, componentId, children[nextParentId])
    }))
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

  return updateTreeAll(
    updateComponents(updateComponent(componentId, component => ({ ...component, parentId: nextParentId }))),
    updateChildren(children => ({
      ...children,
      [prevParentId]: without([componentId], children[prevParentId]),
      [nextParentId]: [...children[nextParentId], componentId]
    }))
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

  return updateTreeAll(
    updateChildren(children => ({
      ...children,
      [prevParentId]: swap(prevIndex, nextIndex, children[prevParentId])
    }))
  )(state);
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

  return updateTreeAll(
    updateChildren(children => ({
      ...children,
      [prevParentId]: swap(prevIndex, nextIndex, children[prevParentId])
    }))
  )(state);
};

const handleAddProp = (componentId: string) =>
  updateTreeAll(
    updateComponents(components => ({
      ...components,
      [componentId]: {
        ...components[componentId],
        properties: [...components[componentId].properties, { name: 'prop', type: 'string' }]
      }
    }))
  );

const handleUpdateProp = (componentId: string, propIndex: number, data: Partial<ComponentProperty>) =>
  updateTreeAll(
    updateComponents(
      updateComponent(componentId, component => ({
        ...component,
        properties: update(propIndex, { ...component.properties[propIndex], ...data }, component.properties)
      }))
    )
  );

const handleDeleteProp = (componentId: string, propIndex: number) =>
  updateTreeAll(
    updateComponents(
      updateComponent(componentId, component => ({
        ...component,
        properties: remove(propIndex, 1, component.properties)
      }))
    )
  );

const handleAddHook = (componentId: string) =>
  updateTreeAll(
    updateComponents(
      updateComponent(componentId, component => ({
        ...component,
        hooks: [...component.hooks, { name: 'useHook' }]
      }))
    )
  );

const handleUpdateHook = (componentId: string, hookIndex: number, data: Partial<ComponentHook>) =>
  updateTreeAll(
    updateComponents(
      updateComponent(componentId, component => ({
        ...component,
        hooks: update(hookIndex, { ...component.hooks[hookIndex], ...data }, component.hooks)
      }))
    )
  );

const handleDeleteHook = (componentId: string, hookIndex: number) =>
  updateTreeAll(
    updateComponents(
      updateComponent(componentId, component => ({
        ...component,
        hooks: remove(hookIndex, 1, component.hooks)
      }))
    )
  );

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
