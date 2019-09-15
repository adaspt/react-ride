export type Fn0<Out> = () => Out;
export type Fn1<A, Out = A> = (a: A) => Out;
export type Fn2<A, B = A, Out = B> = (a: A, b: B) => Out;

export function pipe<T1 extends any[], Out>(fn1: (...args: T1) => Out): (...args: T1) => Out; // prettier-ignore
export function pipe<T1 extends any[], T2, Out>(fn1: (...args: T1) => T2, fn2: Fn1<T2, Out>): (...args: T1) => Out; // prettier-ignore
export function pipe<T1 extends any[], T2, T3, Out>(fn1: (...args: T1) => T2, fn2: Fn1<T2, T3>, fn3: Fn1<T3, Out>): (...args: T1) => Out; // prettier-ignore
export function pipe<T1 extends any[], T2, T3, T4, Out>(fn1: (...args: T1) => T2, fn2: Fn1<T2, T3>, fn3: Fn1<T3, T4>, fn4: Fn1<T4, Out>): (...args: T1) => Out; // prettier-ignore
export function pipe<T1 extends any[], T2, T3, T4, T5, Out>(fn1: (...args: T1) => T2, fn2: Fn1<T2, T3>, fn3: Fn1<T3, T4>, fn4: Fn1<T4, T5>, fn5: Fn1<T5, Out>): (...args: T1) => Out; // prettier-ignore
export function pipe<T1 extends any[], T2, T3, T4, T5, T6, Out>(fn1: (...args: T1) => T2, fn2: Fn1<T2, T3>, fn3: Fn1<T3, T4>, fn4: Fn1<T4, T5>, fn5: Fn1<T5, T6>, fn6: Fn1<T6, Out>): (...args: T1) => Out; // prettier-ignore
export function pipe<T>(...fns: ReadonlyArray<Fn1<T>>): Fn1<T>; // prettier-ignore
export function pipe(...fns: ReadonlyArray<(...args: any[]) => any>) {
  return (...args: any[]) => {
    const first = fns[0];
    const rest = fns.slice(1);
    return rest.reduce((p, fn) => fn(p), first(...args));
  };
}

export function compose<T1 extends any[], Out>(fn1: (...args: T1) => Out): (...args: T1) => Out; // prettier-ignore
export function compose<T1 extends any[], T2, Out>(fn1: Fn1<T2, Out>, fn2: (...args: T1) => T2): (...args: T1) => Out; // prettier-ignore
export function compose<T1 extends any[], T2, T3, Out>(fn1: Fn1<T3, Out>, fn2: Fn1<T2, T3>, fn3: (...args: T1) => T2): (...args: T1) => Out; // prettier-ignore
export function compose<T>(...fns: ReadonlyArray<Fn1<T>>): Fn1<T>; // prettier-ignore
export function compose(...fns: ReadonlyArray<(...args: any[]) => any>) {
  return (...args: any[]) => {
    const last = fns[fns.length - 1];
    const rest = fns.slice(0, fns.length - 1);
    return rest.reduceRight((p, fn) => fn(p), last(...args));
  };
}
