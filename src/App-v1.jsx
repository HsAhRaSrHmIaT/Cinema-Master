import React, { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen text-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header movies={movies} />

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
            <SectionHeader isOpen={isOpen1} setIsOpen={setIsOpen1}>
              Movie Catalog
            </SectionHeader>
            {isOpen1 && <MovieList movies={movies} />}
          </div>

          <div className="bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
            <SectionHeader isOpen={isOpen2} setIsOpen={setIsOpen2}>
              Watched Movies
            </SectionHeader>
            {isOpen2 && (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovies watched={watched} />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function Header({ movies }) {
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
        <SearchBox />
      </div>
      <FoundResults movieCount={movies.length} />
    </header>
  );
}

function SectionHeader({ children, isOpen, setIsOpen }) {
  return (
    <div className="bg-zinc-700 p-4 border-b border-zinc-600 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-zinc-200">{children}</h2>
      <button
        className="text-teal-400 hover:text-teal-300 transition duration-300 flex items-center gap-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{isOpen ? "Hide" : "Show"}</span>
        <span className="text-zinc-400">{isOpen ? "▼" : "▲"}</span>
      </button>
    </div>
  );
}

function SearchBox() {
  const [query, setQuery] = useState("");

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

function FoundResults({ movieCount }) {
  return (
    <p className="text-zinc-400 text-right mt-2">
      Found <strong className="text-teal-400">{movieCount}</strong> movies
    </p>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="divide-y divide-zinc-700">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li
      className="flex items-center gap-4 p-4 
                 hover:bg-zinc-700 
                 transition duration-300 
                 cursor-pointer 
                 group"
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

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="p-6 bg-zinc-700/50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="🎬"
          value={`${watched.length} movies`}
          color="text-zinc-200"
        />
        <StatCard
          icon="⭐️"
          value={avgImdbRating.toFixed(1)}
          color="text-yellow-400"
        />
        <StatCard
          icon="🌟"
          value={avgUserRating.toFixed(1)}
          color="text-green-400"
        />
        <StatCard
          icon="⏳"
          value={`${avgRuntime.toFixed(0)} min`}
          color="text-blue-400"
        />
      </div>
    </div>
  );
}

function StatCard({ icon, value, color }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 text-center shadow-md">
      <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
      <div className="text-zinc-300 font-medium">{value}</div>
    </div>
  );
}

function WatchedMovies({ watched }) {
  return (
    <ul className="divide-y divide-zinc-700">
      {watched.map((movie) => (
        <li
          key={movie.imdbID}
          className="flex items-center gap-4 p-4 hover:bg-zinc-700 transition"
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
                color="text-yellow-400"
              />
              <MovieRating
                icon="🌟"
                rating={movie.userRating}
                color="text-green-400"
              />
              <MovieRating
                icon="⏳"
                rating={`${movie.runtime} min`}
                color="text-blue-400"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function MovieRating({ icon, rating, color }) {
  return (
    <p className={`flex items-center gap-2 text-sm ${color}`}>
      <span>{icon}</span>
      <span>{rating}</span>
    </p>
  );
}
