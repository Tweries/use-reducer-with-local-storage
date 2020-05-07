import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';
import useReducerWithLocalStorage from './useReducerWithLocalStorage';

jest.mock('./useLocalStorage');

const mockSetLocalStorageState = jest.fn();

const quote = 'Marvin, what do you make of all of this?';

useLocalStorage.mockImplementation(() => [
  { value: quote },
  mockSetLocalStorageState
]);

const CHANGE_STATUS = 'CHANGE_STATUS';

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_STATUS:
      return { ...state, status: action.value };
    default:
      return state;
  }
}

test('blacklist', () => {
  const LOADING = 'LOADING';
  const READY = 'READY';
  const REACT_APP_STATE = 'REACT_APP_STATE';

  const {
    result: {
      current: [state, dispatch]
    }
  } = renderHook(() =>
    useReducerWithLocalStorage({
      blacklist: ['status'],
      initializerArg: { status: LOADING, value: '' },
      key: REACT_APP_STATE,
      reducer
    })
  );

  expect(useLocalStorage).toBeCalledWith(REACT_APP_STATE, { value: '' });

  expect(state).toEqual({ status: LOADING, value: quote });

  act(() => {
    dispatch({ type: CHANGE_STATUS, value: READY });
  });

  expect(mockSetLocalStorageState).toBeCalledWith({ value: quote });
});
