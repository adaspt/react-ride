import { useState, useEffect, useMemo } from 'react';

import { User, mapFirebaseUserToUser } from '../model/auth';

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
  const auth = useMemo(() => firebase.auth(), []);
  const [state, setState] = useState(initialState);

  const onAuthenticated = async (firebaseUser: firebase.User | null) => {
    if (!firebaseUser) {
      setState({ authenticating: false, authError: null, user: null });
      return;
    }

    try {
      const user = mapFirebaseUserToUser(firebaseUser);
      await firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .set({
          displayName: user.displayName,
          email: user.email
        });

      setState({ authenticating: false, authError: null, user });
    } catch (error) {
      setState({ authenticating: false, authError: '', user: null });
    }
  };

  const onError = (error: firebase.auth.Error) =>
    setState({ authenticating: false, authError: `${error.code}: ${error.message}`, user: null });

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
