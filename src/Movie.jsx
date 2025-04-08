import React from "react";

export function Movie({ movie, onSelectMovie }) {
  return (
    <li
      className="flex items-center gap-4 p-4 
                 hover:bg-zinc-700 
                 transition duration-300 
                 cursor-pointer 
                 group"
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="w-16 h-24 object-cover rounded-lg shadow-md"
      />
      <div>
        <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-teal-400 transition">
          {movie.Title}
        </h3>
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <span>📅</span>
          <span>{movie.Year}</span>
        </div>
      </div>
    </li>
  );
}
