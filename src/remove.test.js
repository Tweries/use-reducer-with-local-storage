import remove from './remove';

test('key', () => {
  const newState = remove({
    blacklist: ['key'],
    state: { status: 'READY', value: 'HELLO' }
  });
  expect(newState).toEqual({ status: 'READY', value: 'HELLO' });
});

test('status and value', () => {
  const newState = remove({
    blacklist: ['status', 'value'],
    state: { status: 'READY', value: 'HELLO' }
  });
  expect(newState).toEqual({});
});

test('status', () => {
  const newState = remove({
    blacklist: ['status'],
    state: { status: 'READY', value: 'HELLO' }
  });
  expect(newState).toEqual({ value: 'HELLO' });
});
