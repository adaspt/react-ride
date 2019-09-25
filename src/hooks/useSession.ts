import { useState, useEffect } from 'react';

interface State {
  authenticating: boolean;
  authError: firebase.auth.Error | null;
  user: firebase.User | null;
}

const initialState: State = {
  authenticating: true,
  authError: null,
  user: null
};

export const useSession = () => {
  const [state, setState] = useState(initialState);

  const onAuthenticated = (user: firebase.User | null) =>
    setState({ authenticating: false, authError: null, user });
  const onError = (authError: firebase.auth.Error) =>
    setState({ authenticating: false, authError, user: null });

  useEffect(() => firebase.auth().onAuthStateChanged(onAuthenticated, onError), []);

  return state;
};
