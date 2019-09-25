import { useState, useEffect } from 'react';

declare const firebase: any;

interface State {
  authenticating: boolean;
  user: {} | null;
}

const initialState: State = {
  authenticating: true,
  user: null
};

export const useSession = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user: any) => {
      setState({ authenticating: false, user });
    });
  }, []);

  return state;
};
