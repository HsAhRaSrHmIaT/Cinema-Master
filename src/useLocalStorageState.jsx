import { useState, useEffect } from "react";

export function useLocalStorageState(initialValue, key) {
    const [value, setValue] = useState(() => {
        const storedWatched = localStorage.getItem(key);
        if (storedWatched) {
          return storedWatched ? JSON.parse(storedWatched) : initialValue;
        }
      });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
      }, [value, key]);

    return [value, setValue];
}