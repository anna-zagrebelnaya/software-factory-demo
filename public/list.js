export function addItem(items, text) {
  const t = text.trim();
  if (!t) return items;
  return [...items, { id: Date.now() + Math.random(), text: t }];
}

export function removeItem(items, id) {
  return items.filter((i) => i.id !== id);
}
