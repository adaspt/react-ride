import { useEffect } from 'react';

import {
  ComponentTree,
  Component,
  buildComponentTree,
  updateComponentAction
} from '../../../model/component';
import { getComponents } from '../../../api/components';
import { useDatabase } from '../../../hooks/useDatabase';
import { useAsyncData } from '../../../hooks/useAsyncData';

export const useComponentTree = (projectId: string, diagramId: string) => {
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
    updateComponent: (id: string, changes: Partial<Component>) =>
      update(prevData => {
        if (!prevData) {
          return prevData;
        }

        return updateComponentAction(id, changes)(prevData);
      })
  };
};
