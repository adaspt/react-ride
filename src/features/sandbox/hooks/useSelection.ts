import { useState } from 'react';

interface State {
  componentId: string | null;
  propIndex: number | null;
  hookIndex: number | null;
}

const initialState: State = {
  componentId: null,
  propIndex: null,
  hookIndex: null
};

const handleSelectComponent = (componentId: string | null) => (): State => ({
  componentId,
  propIndex: null,
  hookIndex: null
});

const handleSelectProp = (componentId: string, propIndex: number | null) => (): State => ({
  componentId,
  propIndex,
  hookIndex: null
});

const handleSelectHook = (componentId: string, hookIndex: number | null) => (): State => ({
  componentId,
  propIndex: null,
  hookIndex
});

export const useSelection = () => {
  const [selection, setSelection] = useState(initialState);

  const selectComponent = (componentId: string | null) => setSelection(handleSelectComponent(componentId));
  const selectProp = (componentId: string, propIndex: number | null) =>
    setSelection(handleSelectProp(componentId, propIndex));
  const selectHook = (componentId: string, hookIndex: number | null) =>
    setSelection(handleSelectHook(componentId, hookIndex));

  return {
    selection,
    selectComponent,
    selectProp,
    selectHook
  };
};
