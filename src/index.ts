import { useState } from 'react';
import { Draft, produce } from 'immer';

export const useImmutable = <S = any>(initialState: S | (() => S)) => {
  let isUpdating: boolean;
  let draft: {
    state: Draft<S>;
  };
  const [state, setState] = useState(initialState);
  return {
    get state() {
      return isUpdating ? draft.state : state;
    },
    set state(value) {
      draft.state = value as Draft<S>;
    },
    set(callback: () => void) {
      isUpdating = true;
      const next = produce({ state }, (_draft) => {
        draft = _draft;
        callback();
      });
      isUpdating = false;
      setState(next.state);
    },
  };
};
