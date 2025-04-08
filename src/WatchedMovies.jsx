import React from "react";
import { MovieRating } from "./App";

export function WatchedMovies({ watched, onDeleteWatched, onSelectMovie }) {
  if (watched.length === 0) {
    return (
      <div className="p-4 text-center text-zinc-400">
        No movies watched yet. Start watching!
      </div>
    );
  }
  return (
    <ul className="divide-y divide-zinc-700">
      {watched.map((movie) => (
        <li
          key={movie.imdbID}
          className="flex items-center gap-4 p-4 hover:bg-zinc-700 transition"
          onClick={() => onSelectMovie(movie.imdbID)}
        >
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="w-16 h-24 object-cover rounded-lg shadow-md"
          />
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-zinc-100">
              {movie.Title}
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <MovieRating
                icon="⭐️"
                rating={movie.imdbRating}
                color="text-zinc-100"
              />
              <MovieRating
                icon="🌟"
                rating={movie.userRating}
                color="text-zinc-100"
              />
              <MovieRating
                icon="⏳"
                rating={`${movie.runtime} min`}
                color="text-zinc-100"
              />
            </div>
          </div>
          <button
            className="text-zinc-400 hover:text-teal-400 transition duration-300 bg-zinc-700 rounded-full p-2"
            onClick={() => onDeleteWatched(movie.imdbID)}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
