import { useState } from 'react';

interface State {
  componentId: string | null;
}

const initialState: State = {
  componentId: null
};

const handleSelectComponent = (componentId: string | null) => (state: State): State => ({
  componentId
});

export const useSelection = () => {
  const [selection, setSelection] = useState(initialState);
  const selectComponent = (componentId: string | null) => {
    console.log('SELECT COMPONENT', componentId);
    setSelection(handleSelectComponent(componentId));
  };

  return {
    selection,
    selectComponent
  };
};
