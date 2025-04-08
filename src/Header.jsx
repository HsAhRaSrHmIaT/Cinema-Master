import React from "react";
import { SearchBox, FoundResults } from "./App";

export function Header({ movies, query, setQuery }) {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-5xl" role="img">
            🎬
          </span>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            CinemaTracker
          </h1>
        </div>
        <SearchBox query={query} setQuery={setQuery} />
      </div>
      <FoundResults movieCount={movies?.length || 0} />
    </header>
  );
}
