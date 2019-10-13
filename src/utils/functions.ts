type AsyncFn<T extends any[], Out> = (...args: T) => Out | PromiseLike<Out> | Promise<Out>;
type AsyncFn1<T, Out> = (a: T) => Out | PromiseLike<Out> | Promise<Out>;

export function asyncPipe<T1 extends any[], T2, Out>(fn1: AsyncFn<T1, T2>, fn2: AsyncFn1<T2, Out>): (...args: T1) => Promise<Out>; // prettier-ignore
export function asyncPipe<T1 extends any[], T2, T3, Out>(fn1: AsyncFn<T1, T2>, fn2: AsyncFn1<T2, T3>, fn3: AsyncFn1<T3, Out>): (...args: T1) => Promise<Out>; // prettier-ignore
export function asyncPipe<T1 extends any[], T2, T3, T4, Out>(fn1: AsyncFn<T1, T2>, fn2: AsyncFn1<T2, T3>, fn3: AsyncFn1<T3, T4>, fn4: AsyncFn1<T4, Out>): (...args: T1) => Promise<Out>; // prettier-ignore
export function asyncPipe<T1 extends any[], T>(
  first: (...args: T1) => T | PromiseLike<T> | Promise<T>,
  ...rest: ReadonlyArray<(x: T) => Promise<T>>
) {
  return (...args: T1) => {
    return rest.reduce(async (y, f) => f(await y), first(...args));
  };
}
