import { useEffect } from 'react';

import { Diagram } from '../../../model/diagrams';
import { getDiagram } from '../../../api/diagrams';
import { useDatabase } from '../../../hooks/useDatabase';
import { useAsyncData } from '../../../hooks/useAsyncData';

export const useDiagram = (projectId: string, diagramId: string) => {
  const db = useDatabase();
  const { data: diagram, error: diagramError, loading: diagramLoading, load } = useAsyncData<Diagram>();

  useEffect(load(() => db.execute(getDiagram(projectId, diagramId))), [projectId, diagramId]);

  return {
    diagram,
    diagramError,
    diagramLoading
  };
};
