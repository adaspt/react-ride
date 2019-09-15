import { Fn1 } from './functions';

// prettier-ignore
type HasKey<K extends string, V = any> =
  | { [_ in K]: V }
  | { [_ in K]?: V | undefined }
  | never;

export type Mod<T, V> = Fn1<Fn1<V>, Fn1<T>>;

export const mergeLeft = <T>(value: Partial<T>) => (source: T): T => ({ ...source, ...value });

export function mod<K extends string>(name: K): (<V>(fn: (value: V) => V) => (<T extends HasKey<K, V>>(obj: T) => T)); // prettier-ignore
export function mod<K extends string, V>(name: K, fn: (value: V) => V): (<T extends HasKey<K, V>>(obj: T) => T); // prettier-ignore
export function mod(name: string, fn?: (value: any) => any) {
  if (!fn) {
    return (fn: (value: any) => any) => mod(name, fn);
  }

  return (obj: any) => ({ ...obj, [name]: fn(obj[name]) });
}

export const set = <K extends string, V>(
  name: K,
  value: V
): (<T extends HasKey<K, V>>(obj: T) => T) => obj => ({
  ...obj,
  [name]: value
});

export const omit = <T>(keys: string[]) => (obj: Record<string, T>): Record<string, T> =>
  Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce(
      (current, key) => ({
        ...current,
        [key]: obj[key]
      }),
      {}
    );
