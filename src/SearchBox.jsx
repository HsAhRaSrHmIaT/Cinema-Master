import React, { useEffect } from "react";

export function SearchBox({ query, setQuery }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        const searchBox = document.querySelector("input[type='text']");
        searchBox.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
        🔍︎
      </span>
    </div>
  );
}
