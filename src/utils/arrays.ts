export const insert = <T>(index: number, value: T, list: T[]) => [
  ...list.slice(0, index),
  value,
  ...list.slice(index)
];

export const swap = <T>(a: number, b: number, list: T[]) =>
  list.map((x, i, arr) => {
    if (i === a) return arr[b];
    if (i === b) return arr[a];
    return x;
  });
