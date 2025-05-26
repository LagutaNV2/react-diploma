//src/hooks/useDebounce.ts
import { useEffect, useRef } from 'react';

export function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
