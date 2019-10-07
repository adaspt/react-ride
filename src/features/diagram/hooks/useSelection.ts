import { useState } from 'react';
import { compose } from '../../../utils/functions';

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

const selectComponentAction = (componentId: string | null): Action => prevState => ({
  ...prevState,
  componentId,
  propIndex: null,
  hookIndex: null
});

const selectPropAction = (propIndex: number | null): Action => prevState => ({
  ...prevState,
  propIndex,
  hookIndex: null
});

const selectHookAction = (hookIndex: number | null): Action => prevState => ({
  ...prevState,
  propIndex: null,
  hookIndex
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
    ),
    selectProp: compose(
      setState,
      selectPropAction
    ),
    selectHook: compose(
      setState,
      selectHookAction
    )
  };
};
