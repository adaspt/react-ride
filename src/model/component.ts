import { omit } from '../utils/objects';
import { without } from '../utils/arrays';

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

const emptyTree: ComponentTree = {
  components: { root: { id: 'root', parentId: null, name: 'App', width: 12, properties: [], hooks: [] } },
  children: { root: [] }
};

export const buildComponentTree = (components: ComponentTree['components'] | null): ComponentTree => {
  if (!components || !Object.keys(components).length) {
    return emptyTree;
  }

  const children = Object.values(components).reduce<ComponentTree['children']>((map, x) => {
    if (!map[x.id]) {
      map[x.id] = [];
    }

    if (x.parentId) {
      if (!map[x.parentId]) {
        map[x.parentId] = [];
      }

      map[x.parentId].push(x.id);
    }

    return map;
  }, {});

  return {
    components,
    children
  };
};

export const updateComponentAction = (componentId: string, changes: Partial<Component>) => (
  tree: ComponentTree
): ComponentTree => ({
  ...tree,
  components: {
    ...tree.components,
    [componentId]: { ...tree.components[componentId], ...changes }
  }
});

export const deleteComponentAction = (componentId: string) => (tree: ComponentTree): ComponentTree => {
  const parentId = tree.components[componentId].parentId!;

  const componentIdsToRemove: string[] = [];
  const collectComponentsToRemove = (id: string) => {
    componentIdsToRemove.push(id);
    tree.children[id].forEach(collectComponentsToRemove);
  };

  collectComponentsToRemove(componentId);

  return {
    ...tree,
    components: omit<Component>(componentIdsToRemove)(tree.components),
    children: {
      ...omit<string[]>(componentIdsToRemove)(tree.children),
      [parentId]: without([componentId])(tree.children[parentId])
    }
  };
};

export const addComponentAction = (parentId: string, componentId: string) => (
  tree: ComponentTree
): ComponentTree => ({
  ...tree,
  components: {
    ...tree.components,
    [componentId]: { id: componentId, parentId, name: 'Component', width: 12, properties: [], hooks: [] }
  },
  children: {
    ...tree.children,
    [componentId]: [],
    [parentId]: [...tree.children[parentId], componentId]
  }
});

export const addPropAction = (componentId: string) => (tree: ComponentTree): ComponentTree => ({
  ...tree,
  components: {
    ...tree.components,
    [componentId]: {
      ...tree.components[componentId],
      properties: [...tree.components[componentId].properties, { name: 'prop', type: 'string' }]
    }
  }
});

export const updatePropAction = (componentId: string, propIndex: number, values: ComponentProperty) => (
  tree: ComponentTree
): ComponentTree => ({
  ...tree,
  components: {
    ...tree.components,
    [componentId]: {
      ...tree.components[componentId],
      properties: [
        ...tree.components[componentId].properties.slice(0, propIndex),
        values,
        ...tree.components[componentId].properties.slice(propIndex + 1)
      ]
    }
  }
});

export const deletePropAction = (componentId: string, propIndex: number) => (
  tree: ComponentTree
): ComponentTree => ({
  ...tree,
  components: {
    ...tree.components,
    [componentId]: {
      ...tree.components[componentId],
      properties: [
        ...tree.components[componentId].properties.slice(0, propIndex),
        ...tree.components[componentId].properties.slice(propIndex + 1)
      ]
    }
  }
});

export const addHookAction = (componentId: string) => (tree: ComponentTree): ComponentTree => ({
  ...tree,
  components: {
    ...tree.components,
    [componentId]: {
      ...tree.components[componentId],
      hooks: [...tree.components[componentId].hooks, { name: 'useHook' }]
    }
  }
});

export const updateHookAction = (componentId: string, hookIndex: number, values: ComponentHook) => (
  tree: ComponentTree
): ComponentTree => ({
  ...tree,
  components: {
    ...tree.components,
    [componentId]: {
      ...tree.components[componentId],
      hooks: [
        ...tree.components[componentId].hooks.slice(0, hookIndex),
        values,
        ...tree.components[componentId].hooks.slice(hookIndex + 1)
      ]
    }
  }
});

export const deleteHookAction = (componentId: string, hookIndex: number) => (
  tree: ComponentTree
): ComponentTree => ({
  ...tree,
  components: {
    ...tree.components,
    [componentId]: {
      ...tree.components[componentId],
      hooks: [
        ...tree.components[componentId].hooks.slice(0, hookIndex),
        ...tree.components[componentId].hooks.slice(hookIndex + 1)
      ]
    }
  }
});

// -----------------------------------------------------------

export const saveComponentTree = (tree: ComponentTree) => {
  const data = JSON.stringify(tree.components);
  window.localStorage.setItem('rb-v0.1', data);
};

export const loadComponentTree = (): ComponentTree | null => {
  const data = window.localStorage.getItem('rb-v0.1');
  if (!data) {
    return null;
  }

  const components: ComponentTree['components'] = JSON.parse(data);
  const children = Object.values(components).reduce<ComponentTree['children']>((map, x) => {
    if (!map[x.id]) {
      map[x.id] = [];
    }

    if (x.parentId) {
      if (!map[x.parentId]) {
        map[x.parentId] = [];
      }

      map[x.parentId].push(x.id);
    }

    return map;
  }, {});

  return {
    components,
    children
  };
};
