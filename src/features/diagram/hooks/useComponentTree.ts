import { useEffect } from 'react';

import {
  ComponentTree,
  Component,
  buildComponentTree,
  updateComponentAction,
  addComponentAction,
  addPropAction,
  addHookAction
} from '../../../model/component';
import { uniqueId } from '../../../utils/strings';
import { getComponents } from '../../../api/components';
import { useDatabase } from '../../../hooks/useDatabase';
import { useAsyncData } from '../../../hooks/useAsyncData';

const ifLoaded = (fn: (prevData: ComponentTree) => ComponentTree) => (
  prevData: ComponentTree | null
): ComponentTree | null => (prevData ? fn(prevData) : prevData);

export const useComponentTree = (
  projectId: string,
  diagramId: string,
  select: (componentId: string | null, propIndex: number | null, hookIndex: number | null) => void
) => {
  const db = useDatabase();
  const { data: tree, error: treeError, loading: treeLoading, load, update } = useAsyncData<ComponentTree>();

  useEffect(
    load(async () => {
      const components = await db.execute(getComponents(projectId, diagramId));
      return buildComponentTree(components);
    }),
    [projectId, diagramId]
  );

  return {
    tree,
    treeError,
    treeLoading,
    updateComponent: (id: string, changes: Partial<Component>) => {
      update(ifLoaded(updateComponentAction(id, changes)));
    },
    addComponent: (parentId: string) => {
      const componentId = uniqueId();
      update(ifLoaded(addComponentAction(parentId, componentId)));
      select(componentId, null, null);
    },
    addProp: (componentId: string) => {
      update(ifLoaded(addPropAction(componentId)));
      if (tree) {
        select(componentId, tree.components[componentId].properties.length, null);
      }
    },
    addHook: (componentId: string) => {
      update(ifLoaded(addHookAction(componentId)));
      if (tree) {
        select(componentId, null, tree.components[componentId].hooks.length);
      }
    }
  };
};
