import React from "react";
import { Movie } from "./Movie";

export function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="divide-y divide-zinc-700">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
