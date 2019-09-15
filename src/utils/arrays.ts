export const adjust = <T>(index: number, fn: (value: T) => T) => (list: readonly T[]) => [
  ...list.slice(0, index),
  fn(list[index]),
  ...list.slice(index + 1)
];

export const append = <T>(value: T) => (list: readonly T[]): T[] => [...list, value];

export const insert = <T>(index: number, value: T) => (list: readonly T[]) => [
  ...list.slice(0, index),
  value,
  ...list.slice(index)
];

export const remove = <T>(index: number, count: number = 1) => (list: readonly T[]): T[] => [
  ...list.slice(0, index),
  ...list.slice(index + count)
];

export const swap = <T>(a: number, b: number) => (list: readonly T[]) =>
  list.map((x, i, arr) => {
    if (i === a) return arr[b];
    if (i === b) return arr[a];
    return x;
  });

export const without = <T>(values: readonly T[]) => (list: readonly T[]) =>
  list.filter(x => !values.includes(x));
