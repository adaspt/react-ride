import { useState } from 'react';

interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const initialState: State<any> = {
  data: null,
  loading: false,
  error: null
};

export const useAsyncData = <T>() => {
  const [state, setState] = useState<State<T>>(initialState);

  const loadStart = () => setState(prevState => ({ ...prevState, loading: true, error: null }));
  const loadSuccess = (data: T) => setState({ data, loading: false, error: null });
  const loadFailure = (error: string) => setState(prevState => ({ ...prevState, loading: false, error }));

  return {
    ...state,
    loadStart,
    loadSuccess,
    loadFailure
  };
};
