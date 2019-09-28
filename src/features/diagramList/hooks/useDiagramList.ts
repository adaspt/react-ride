import { useState, useEffect } from 'react';

import { User } from '../../../model/auth';
import { Diagram } from '../../../model/diagram';

interface State {
  list: Diagram[];
}

const initialState: State = {
  list: []
};

export const useDiagramList = (user: User) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('diagrams')
      .get()
      .then(snapshot => {
        const list: Diagram[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          list.push({ id: doc.id, ...data } as Diagram);
        });

        setState({ list });
      });
  }, [user]);

  return {
    ...state
  };
};
