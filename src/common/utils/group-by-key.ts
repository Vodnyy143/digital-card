export function groupByKey<T, K extends keyof T>(
  items: T[],
  key: K,
  ids: readonly T[K][],
): T[][] {
  const map = new Map<T[K], T[]>();

  for (const item of items) {
    const list = map.get(item[key]);
    if (list) list.push(item);
    else map.set(item[key], [item]);
  }

  return ids.map((id) => map.get(id) ?? []);
}
