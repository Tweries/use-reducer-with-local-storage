import { useReducer } from 'react';
import remove from './remove';
import useLocalStorage from './useLocalStorage';

function useReducerWithLocalStorage({
  blacklist = [],
  initializerArg,
  key,
  reducer
}) {
  const [localStorageState, setLocalStorageState] = useLocalStorage(
    key,
    remove({ blacklist, state: initializerArg })
  );

  return useReducer(
    (state, action) => {
      const newState = reducer(state, action);
      setLocalStorageState(remove({ blacklist, state: newState }));
      return newState;
    },
    { ...initializerArg, ...localStorageState }
  );
}

export default useReducerWithLocalStorage;
