import { useState, useEffect, useMemo } from 'react';

import { User, mapFirebaseUserToUser } from '../model/auth';

interface State {
  authenticating: boolean;
  authError: firebase.auth.Error | null;
  user: User | null;
}

const initialState: State = {
  authenticating: true,
  authError: null,
  user: null
};

export const useSession = () => {
  const auth = useMemo(() => firebase.auth(), []);
  const [state, setState] = useState(initialState);

  const onAuthenticated = (firebaseUser: firebase.User | null) => {
    const user = mapFirebaseUserToUser(firebaseUser);
    setState({ authenticating: false, authError: null, user });
  };

  const onError = (authError: firebase.auth.Error) =>
    setState({ authenticating: false, authError, user: null });

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider).catch(error => console.error('Failed to signin', error));
  };

  const signOut = () => {
    auth.signOut().catch(error => console.error('Failed to sign out', error));
  };

  useEffect(() => firebase.auth().onAuthStateChanged(onAuthenticated, onError), []);

  return {
    ...state,
    signIn,
    signOut
  };
};
