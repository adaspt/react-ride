import { useState } from 'react';

interface State<T> {
  initialValue: T;
  value: T;
}

const createInitialState = <T>(initialValue: T) => (): State<T> => ({
  initialValue,
  value: initialValue
});

const handleChange = <T>(value: T) => (state: State<T>): State<T> => ({
  ...state,
  value
});

export const useInput = <T>(initialValue: T, onSubmit: (value: T) => void) => {
  const [state, setState] = useState(createInitialState(initialValue));

  const change = (value: T) => setState(handleChange(value));

  const submit = () =>
    setState(currentState => {
      onSubmit(currentState.value);
      return currentState;
    });

  return {
    value: state.value,
    change,
    submit
  };
};
