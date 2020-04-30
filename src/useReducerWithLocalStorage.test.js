import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';
import useReducerWithLocalStorage from './useReducerWithLocalStorage';

jest.mock('./useLocalStorage');

const emptyState = { firstName: '', lastName: '' };

const mockSetLocalStorageState = jest.fn();

const mockLocalStorageState = { ...emptyState, lastName: 'Doe' };

useLocalStorage.mockImplementation(() => [
  mockLocalStorageState,
  mockSetLocalStorageState
]);

const REACT_APP_STATE = 'REACT_APP_STATE';

const CHANGE_FIRST_NAME = 'CHANGE_FIRST_NAME';

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_FIRST_NAME:
      return { ...state, firstName: action.value };
    default:
      return state;
  }
}

const mockReducer = jest.fn((state, action) => reducer(state, action));

test('useReducerWithLocalStorage', () => {
  const {
    result: {
      current: [state, dispatch]
    }
  } = renderHook(() =>
    useReducerWithLocalStorage({
      initializerArg: emptyState,
      key: REACT_APP_STATE,
      reducer: mockReducer
    })
  );

  expect(useLocalStorage).toBeCalledWith(REACT_APP_STATE, emptyState);

  expect(state).toEqual(mockLocalStorageState);

  act(() => {
    dispatch({ type: CHANGE_FIRST_NAME, value: 'John' });
  });

  expect(mockSetLocalStorageState).toBeCalledWith({
    firstName: 'John',
    lastName: 'Doe'
  });
});
