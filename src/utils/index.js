import { useState, useCallback } from 'react';

// 获取唯一的key
export const getOnlyKey = () => {
  return Math.random();
};

// hooks useForceUpdate
export const useForceUpdate = () => {
  const [, setstate] = useState(0);

  const update = useCallback(() => {
    setstate((prev) => prev + 1);
  }, []);
  return update;
};

//
