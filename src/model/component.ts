import append from 'ramda/es/append';
import assoc from 'ramda/es/assoc';
import evolve from 'ramda/es/evolve';
import insert from 'ramda/es/insert';
import lensPath from 'ramda/es/lensPath';
import lensProp from 'ramda/es/lensProp';
import mergeLeft from 'ramda/es/mergeLeft';
import move from 'ramda/es/move';
import omit from 'ramda/es/omit';
import over from 'ramda/es/over';
import pipe from 'ramda/es/pipe';
import remove from 'ramda/es/remove';
import update from 'ramda/es/update';
import without from 'ramda/es/without';

export interface ComponentProperty {
  name: string;
  type: string;
}

export interface ComponentHook {
  name: string;
}

export interface Component {
  id: string;
  parentId: string | null;
  name: string;
  width: number;
  properties: ComponentProperty[];
  hooks: ComponentHook[];
}

export interface ComponentTree {
  components: Record<string, Component>;
  children: Record<string, string[]>;
}

const createComponent = (id: string, parentId: string | null, name: string): Component => ({
  id,
  parentId,
  name,
  width: 12,
  properties: [],
  hooks: []
});

export const emptyTree: ComponentTree = {
  components: { root: createComponent('root', null, 'App') },
  children: { root: [] }
};

// Lens

const componentLens = (id: string) => lensPath(['components', id]);
const componentPropsLens = (id: string) => lensPath(['components', id, 'properties']);
const componentHooksLens = (id: string) => lensPath(['components', id, 'hooks']);
const childrenLens = lensProp('children');

// Actions

type Action = (x: ComponentTree) => ComponentTree;

export const updateComponentAction = (componentId: string, changes: Partial<Component>): Action =>
  over(componentLens(componentId), mergeLeft(changes));

export const deleteComponentAction = (componentId: string): Action => tree => {
  const parentId = tree.components[componentId].parentId!;

  const componentIdsToRemove: string[] = [];
  const collectComponentsToRemove = (id: string) => {
    componentIdsToRemove.push(id);
    tree.children[id].forEach(collectComponentsToRemove);
  };

  collectComponentsToRemove(componentId);

  return {
    ...tree,
    components: omit(componentIdsToRemove)(tree.components),
    children: {
      ...omit(componentIdsToRemove)(tree.children),
      [parentId]: without([componentId])(tree.children[parentId])
    }
  };
};

export const moveComponentInAction = (componentId: string): Action => tree => {
  const prevParentId = tree.components[componentId].parentId;
  if (!prevParentId) {
    return tree;
  }

  const siblings = tree.children[prevParentId];
  const prevIndex = siblings.indexOf(componentId);
  if (prevIndex === 0) {
    return tree;
  }

  const nextParentId = siblings[prevIndex - 1];

  return pipe(
    over(componentLens(componentId), assoc('parentId', nextParentId)),
    over(
      childrenLens,
      evolve({
        [prevParentId]: without([componentId]),
        [nextParentId]: append(componentId)
      })
    )
  )(tree);
};

export const moveComponentOutAction = (componentId: string): Action => tree => {
  const prevParentId = tree.components[componentId].parentId;
  if (!prevParentId) {
    return tree;
  }

  const nextParentId = tree.components[prevParentId].parentId;
  if (!nextParentId) {
    return tree;
  }

  const siblings = tree.children[nextParentId];
  const parentIndex = siblings.indexOf(prevParentId);

  return {
    ...tree,
    components: {
      ...tree.components,
      [componentId]: {
        ...tree.components[componentId],
        parentId: nextParentId
      }
    },
    children: {
      ...tree.children,
      [prevParentId]: without([componentId], tree.children[prevParentId]),
      [nextParentId]: insert(parentIndex + 1, componentId, tree.children[nextParentId])
    }
  };
};

export const moveComponentUpAction = (componentId: string): Action => tree => {
  const prevParentId = tree.components[componentId].parentId;
  if (!prevParentId) {
    return tree;
  }

  const siblings = tree.children[prevParentId];
  const prevIndex = siblings.indexOf(componentId);
  if (prevIndex === 0) {
    return tree;
  }

  const nextIndex = prevIndex - 1;

  return {
    ...tree,
    children: {
      ...tree.children,
      [prevParentId]: move(prevIndex, nextIndex, tree.children[prevParentId])
    }
  };
};

export const moveComponentDownAction = (componentId: string): Action => tree => {
  const prevParentId = tree.components[componentId].parentId;
  if (!prevParentId) {
    return tree;
  }

  const siblings = tree.children[prevParentId];
  const prevIndex = siblings.indexOf(componentId);
  if (prevIndex === siblings.length - 1) {
    return tree;
  }

  const nextIndex = prevIndex + 1;

  return {
    ...tree,
    children: {
      ...tree.children,
      [prevParentId]: move(prevIndex, nextIndex, tree.children[prevParentId])
    }
  };
};

export const addComponentAction = (parentId: string, componentId: string): Action =>
  evolve({
    components: assoc(componentId, createComponent(componentId, parentId, 'Component')),
    children: pipe(
      assoc(componentId, []),
      over(lensProp(parentId), append(componentId))
    )
  });

export const addPropAction = (componentId: string): Action =>
  over(componentPropsLens(componentId), append({ name: 'prop', type: 'string' }));

export const updatePropAction = (componentId: string, propIndex: number, values: ComponentProperty): Action =>
  over(componentPropsLens(componentId), update(propIndex, values));

export const deletePropAction = (componentId: string, propIndex: number): Action =>
  over(componentPropsLens(componentId), remove(propIndex, 1));

export const addHookAction = (componentId: string): Action =>
  over(componentHooksLens(componentId), append({ name: 'useHook' }));

export const updateHookAction = (componentId: string, hookIndex: number, values: ComponentHook): Action =>
  over(componentHooksLens(componentId), update(hookIndex, values));

export const deleteHookAction = (componentId: string, hookIndex: number): Action =>
  over(componentHooksLens(componentId), remove(hookIndex, 1));
