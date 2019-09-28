import { useState, useEffect, useMemo } from 'react';

import { User, mapFirebaseUserToUser } from '../model/auth';
import { setUser } from '../api/users';
import { useDatabase } from './useDatabase';

interface State {
  authenticating: boolean;
  authError: string | null;
  user: User | null;
}

const initialState: State = {
  authenticating: true,
  authError: null,
  user: null
};

export const useSession = () => {
  const db = useDatabase();
  const auth = useMemo(() => firebase.auth(), []);
  const [state, setState] = useState(initialState);

  useEffect(
    () =>
      auth.onAuthStateChanged(
        async firebaseUser => {
          if (!firebaseUser) {
            setState({ authenticating: false, authError: null, user: null });
            return;
          }

          try {
            const user = mapFirebaseUserToUser(firebaseUser);
            await db.execute(setUser(user));

            setState({ authenticating: false, authError: null, user });
          } catch (error) {
            setState({
              authenticating: false,
              authError: error.message || 'Failed to update user',
              user: null
            });
          }
        },
        error => setState({ authenticating: false, authError: `${error.code}: ${error.message}`, user: null })
      ),
    [db, auth]
  );

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider).catch(error => console.error('Failed to signin', error));
  };

  const signOut = () => {
    auth.signOut().catch(error => console.error('Failed to sign out', error));
  };

  return {
    ...state,
    signIn,
    signOut
  };
};
