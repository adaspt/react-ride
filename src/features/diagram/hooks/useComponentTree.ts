import { useEffect } from 'react';

import {
  ComponentTree,
  Component,
  ComponentProperty,
  ComponentHook,
  buildComponentTree,
  updateComponentAction,
  deleteComponentAction,
  moveComponentInAction,
  moveComponentOutAction,
  moveComponentUpAction,
  moveComponentDownAction,
  addComponentAction,
  addPropAction,
  updatePropAction,
  addHookAction,
  deletePropAction,
  updateHookAction,
  deleteHookAction
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
    deleteComponent: (id: string) => {
      update(ifLoaded(deleteComponentAction(id)));
      select(null, null, null);
    },
    moveComponentIn: (id: string) => {
      update(ifLoaded(moveComponentInAction(id)));
    },
    moveComponentOut: (id: string) => {
      update(ifLoaded(moveComponentOutAction(id)));
    },
    moveComponentUp: (id: string) => {
      update(ifLoaded(moveComponentUpAction(id)));
    },
    moveComponentDown: (id: string) => {
      update(ifLoaded(moveComponentDownAction(id)));
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
    updateProp: (componentId: string, propIndex: number, values: ComponentProperty) => {
      update(ifLoaded(updatePropAction(componentId, propIndex, values)));
      if (tree) {
        select(componentId, null, null);
      }
    },
    deleteProp: (componentId: string, propIndex: number) => {
      update(ifLoaded(deletePropAction(componentId, propIndex)));
      if (tree) {
        select(componentId, null, null);
      }
    },
    addHook: (componentId: string) => {
      update(ifLoaded(addHookAction(componentId)));
      if (tree) {
        select(componentId, null, tree.components[componentId].hooks.length);
      }
    },
    updateHook: (componentId: string, hookIndex: number, values: ComponentHook) => {
      update(ifLoaded(updateHookAction(componentId, hookIndex, values)));
      if (tree) {
        select(componentId, null, null);
      }
    },
    deleteHook: (componentId: string, hookIndex: number) => {
      update(ifLoaded(deleteHookAction(componentId, hookIndex)));
      if (tree) {
        select(componentId, null, null);
      }
    }
  };
};
