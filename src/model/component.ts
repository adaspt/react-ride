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
