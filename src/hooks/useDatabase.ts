import { useMemo } from 'react';
import { ApiRequest } from '../api/model';

export const useDatabase = () => {
  const firestore = useMemo(() => firebase.firestore(), []);

  return useMemo(
    () => ({
      execute: <T>(request: ApiRequest<T>) => request(firestore)
    }),
    [firestore]
  );
};
