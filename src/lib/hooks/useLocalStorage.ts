import * as React from 'react';

const getLocalStorageOrDefault = <T extends unknown>(
  key: string,
  defaultValue: T,
): T => {
  const stored = localStorage.getItem(key);

  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
};

export const useLocalStorage = <T extends unknown>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = React.useState<T>(
    getLocalStorageOrDefault<T>(key, defaultValue),
  );

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
