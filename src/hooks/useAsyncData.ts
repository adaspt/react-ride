import { EffectCallback, useState } from 'react';

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

  const load = (command: () => Promise<T>): EffectCallback => () => {
    let aborted = false;

    const execute = async () => {
      try {
        loadStart();
        const data = await command();
        if (!aborted) {
          loadSuccess(data);
        }
      } catch (ex) {
        if (!aborted) {
          loadFailure(ex.message || 'Failed to load data.');
        }
      }
    };

    execute();

    return () => {
      aborted = true;
    };
  };

  const update = (fn: (prevData: T | null) => T | null) =>
    setState(prevState => ({ ...prevState, data: fn(prevState.data) }));

  return {
    ...state,
    load,
    update
  };
};
