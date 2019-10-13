import { useEffect } from 'react';

import { Diagram } from '../../../model/diagrams';
import { getDiagrams } from '../../../api/diagrams';
import { useDatabase } from '../../../hooks/useDatabase';
import { useAsyncData } from '../../../hooks/useAsyncData';

export const useDiagramList = (projectId: string) => {
  const db = useDatabase();
  const { data: diagrams, error: diagramsError, loading: diagramsLoading, load } = useAsyncData<Diagram[]>();

  useEffect(load(() => db.execute(getDiagrams(projectId))), [projectId]);

  return {
    diagrams,
    diagramsError,
    diagramsLoading
  };
};
