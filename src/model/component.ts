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

export const saveComponentTree = (tree: ComponentTree) => {
  const data = JSON.stringify(tree.components);
  window.localStorage.setItem('rb-v0.1', data);
};

export const loadComponentTree = (): ComponentTree | null => {
  const data = window.localStorage.getItem('rb-v0.1');
  if (!data) {
    return null;
  }

  const components: Record<string, Component> = JSON.parse(data);
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
