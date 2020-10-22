import { useState } from 'react';
import { Draft, produce } from 'immer';

interface Options {
  timeTravel?: boolean;
}

export const useImmutable = <S = any>(
  initialState: S | (() => S),
  { timeTravel = false }: Options = {}
) => {
  let isUpdating: boolean;
  let draft: {
    state: Draft<S>;
  };
  const [state, setState] = useState(initialState);
  const store = [];
  const keys: (number | string)[] = [];
  return {
    get state() {
      return isUpdating ? draft.state : state;
    },
    set state(value) {
      draft.state = value as Draft<S>;
    },
    snapshot(index?: number | string) {
      store.push(state);
      keys.push(index ?? store.length);
    },
    pop(index?: number | string) {
      setState(
        index === -1 || typeof index === 'undefined'
          ? store.slice(-1)[0]
          : typeof index === 'string'
          ? store[keys.indexOf(index)]
          : store[index]
      );
    },
    clear() {
      store.length = 0;
    },
    get length() {
      return store.length;
    },
    get index() {
      return store.indexOf(state);
    },
    set(callback: () => void) {
      isUpdating = true;
      const next = produce({ state }, (_draft) => {
        draft = _draft;
        callback();
      });
      isUpdating = false;
      if (timeTravel) {
        store.push(next.state);
        keys.push(store.length);
      }
      setState(next.state);
    },
  };
};
