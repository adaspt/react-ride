import { useEffect, EffectCallback } from 'react';

type CancelCallback = ReturnType<EffectCallback>;

export const useDebouncedEffect = (
  callback: EffectCallback,
  timeout: number,
  deps?: readonly any[] | undefined
) => {
  useEffect(() => {
    let onCancel: CancelCallback;

    const timer = window.setTimeout(() => {
      onCancel = callback();
    }, timeout);

    return () => {
      window.clearTimeout(timer);
      if (onCancel) {
        onCancel();
      }
    };
  }, deps); // eslint-disable-line
};
