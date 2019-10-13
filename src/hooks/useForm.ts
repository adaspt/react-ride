import { ChangeEvent, FormEvent, useState } from 'react';

interface State<T extends object> {
  initialValues: T;
  values: T;
}

const initState = <T extends object>(initialValues: T): State<T> => {
  return {
    initialValues,
    values: initialValues
  };
};

const changeAction = <T extends object, K extends keyof T>(name: K, value: T[K]) => (
  prevState: State<T>
): State<T> => ({
  ...prevState,
  values: { ...prevState.values, [name]: value }
});

export const useForm = <T extends object>(initialValues: T) => {
  const [state, setState] = useState(() => initState(initialValues));

  const change = <K extends keyof T>(name: K, value: T[K]) => setState(changeAction(name, value));

  const handleChange = <K extends { [K in keyof T]: T[K] extends string ? K : never }[keyof T]>(name: K) => (
    e: ChangeEvent<HTMLInputElement>
  ) => change(name, (e.target.value as unknown) as T[K]);

  const submit = (handler: (values: T) => Promise<T | void>) => {
    handler(state.values)
      .then(result => {
        console.log('SUBMITTED', result);
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  };

  const handleSubmit = (handler: (values: T) => Promise<T | void>) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(handler);
  };

  return {
    ...state,
    change,
    handleChange,
    submit,
    handleSubmit
  };
};
