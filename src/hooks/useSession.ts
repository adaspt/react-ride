import { useState, useEffect } from 'react';

export interface User {
  uid: string;
  displayName: string;
}

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

const mapFirebaseUserToUser = (user: firebase.User | null): User | null => {
  if (user == null) {
    return null;
  }

  return {
    uid: user.uid,
    displayName: user.displayName || user.email || 'Unknown'
  };
};

export const useSession = () => {
  const [state, setState] = useState(initialState);

  const onAuthenticated = (user: firebase.User | null) =>
    setState({ authenticating: false, authError: null, user: mapFirebaseUserToUser(user) });
  const onError = (authError: firebase.auth.Error) =>
    setState({ authenticating: false, authError, user: null });

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => console.error('Failed to sign out', error));
  };

  useEffect(() => firebase.auth().onAuthStateChanged(onAuthenticated, onError), []);

  return {
    ...state,
    signOut
  };
};
