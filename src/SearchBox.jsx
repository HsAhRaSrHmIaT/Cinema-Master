import React, { useRef } from "react";
import { useKey } from "./useKey";

export function SearchBox({ query, setQuery }) {
  const inputElement = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputElement.current) {
      return;
    }
    inputElement.current.focus();
      setQuery("");
  });


  return (
    <div className="relative">
      <input
        className="w-72 px-4 py-3 rounded-full 
        bg-zinc-700 text-zinc-100 
        placeholder-zinc-500 
        focus:outline-none focus:ring-2 focus:ring-teal-500 
        transition duration-300 
        border border-zinc-600"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
        🔍︎
      </span>
    </div>
  );
}
