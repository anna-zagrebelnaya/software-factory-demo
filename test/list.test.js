import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addItem, removeItem } from '../public/list.js';

test('addItem adds trimmed text', () => {
  const r = addItem([], '  milk ');
  assert.equal(r.length, 1);
  assert.equal(r[0].text, 'milk');
});
test('addItem ignores blank text', () => {
  assert.deepEqual(addItem([], '   '), []);
});
test('removeItem deletes by id', () => {
  const r = removeItem([{ id: 1, text: 'a' }, { id: 2, text: 'b' }], 1);
  assert.deepEqual(r, [{ id: 2, text: 'b' }]);
});
