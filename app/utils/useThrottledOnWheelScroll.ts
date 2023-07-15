import { useEffect, useMemo } from 'react';
import throttle from 'lodash/throttle';

const useThrottledOnWheelScroll = (callback: () => unknown, delay: number) => {
  const throttledCallback = useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  useEffect(() => {
    if (throttledCallback === noop) {
      return undefined;
    }

    window.addEventListener('wheel', throttledCallback);
    return () => {
      window.removeEventListener('wheel', throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
};

const noop = () => {};

export default useThrottledOnWheelScroll;
