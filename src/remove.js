function remove({ blacklist, state }) {
  return Object.keys(state).reduce((accumulator, current) => {
    if (!blacklist.includes(current)) {
      accumulator[current] = state[current];
    }
    return accumulator;
  }, {});
}

export default remove;
