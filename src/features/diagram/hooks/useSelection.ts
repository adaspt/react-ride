import { useState } from 'react';
import compose from 'ramda/es/compose';

export type DiagramTab = 'props' | 'hooks';

interface State {
  tab: DiagramTab;
  componentId: string | null;
  propIndex: number | null;
  hookIndex: number | null;
}

const initialState: State = {
  tab: 'props',
  componentId: null,
  propIndex: null,
  hookIndex: null
};

type Action = (prevState: State) => State;

const selectTabAction = (tab: DiagramTab): Action => prevState => ({
  ...prevState,
  tab
});

const selectComponentAction = (
  componentId: string | null,
  propIndex: number | null,
  hookIndex: number | null
): Action => prevState => ({
  ...prevState,
  componentId,
  propIndex: componentId ? propIndex : null,
  hookIndex: componentId ? (propIndex ? null : hookIndex) : null
});

export const useSelection = () => {
  const [state, setState] = useState(initialState);

  return {
    ...state,
    selectTab: compose(
      setState,
      selectTabAction
    ),
    selectComponent: compose(
      setState,
      selectComponentAction
    )
  };
};
