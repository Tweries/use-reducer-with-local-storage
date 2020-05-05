# useReducerWithLocalStorage

React hook that adds local storage support to the `useReducer` hook

## Install

```bash
yarn add use-reducer-with-local-storage
```

## Usage

```js
const [state, dispatch] = useReducerWithLocalStorage({
  initializerArg: emptyState,
  key: 'REACT_APP_STATE',
  reducer
});
```

## Resources

- [https://gist.github.com/mattiaerre/8dbd2d8efca3f242c7085a9ce82ecbde](https://gist.github.com/mattiaerre/8dbd2d8efca3f242c7085a9ce82ecbde)

- [https://github.com/Tweries/silver-tip/blob/master/src/App.js#L2](https://github.com/Tweries/silver-tip/blob/master/src/App.js#L2)

## Notes

- Special thanks to [Matthew Brooks](https://github.com/mdboop) that was kind enough to review the original Gist and to propose new features.
