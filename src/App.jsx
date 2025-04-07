import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";

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

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const query = "sdfasdf"; // Default search query
  // const tempQuery = "Avengers"; // Example search query

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    setIsOpen2(true);
  }

  function handleCloseDetails() {
    setSelectedId(null);
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
        console.log(data);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies(tempMovieData);
      setError("");
      setIsLoading(false);
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen text-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header movies={movies} query={query} setQuery={setQuery} />

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`bg-zinc-800 rounded-2xl shadow-2xl overflow-y-auto scrollbar-hide ${
              isOpen1 ? "h-120" : "h-auto"
            }`}
          >
            <div className="sticky top-0 z-10">
              <SectionHeader isOpen={isOpen1} setIsOpen={setIsOpen1}>
                Movie Catalog
              </SectionHeader>
            </div>
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error && isOpen1 && (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )}
            {isLoading && <Loader />}
          </div>

          <div
            className={`bg-zinc-800 rounded-2xl shadow-2xl overflow-y-auto scrollbar-hide ${
              isOpen2 ? "h-120" : "h-auto"
            } `}
          >
            <div className="sticky top-0 z-10">
              <SectionHeader isOpen={isOpen2} setIsOpen={setIsOpen2}>
                Watched Movies
              </SectionHeader>
            </div>
            {isOpen2 &&
              (selectedId ? (
                <MovieDetails
                  selectedId={selectedId}
                  onCloseDetails={handleCloseDetails}
                />
              ) : (
                <>
                  <div className="sticky top-0 z-10 bg-zinc-800 w-full">
                    <WatchedSummary watched={watched} />
                  </div>
                  <WatchedMovies watched={watched} />
                </>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="p-4 bg-zinc-700 rounded-lg m-4 border border-red-500">
      <p className="text-red-400 text-center font-semibold">{message}</p>
    </div>
  );
}

function Loader() {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center gap-4 animate-pulse">
            <div className="w-16 h-24 bg-zinc-700 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
              <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ movies, query, setQuery }) {
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

function SectionHeader({ children, isOpen, setIsOpen }) {
  return (
    <div className="bg-zinc-700 p-4 border-b border-zinc-600 flex items-center justify-between position-fixed">
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

function SearchBox({ query, setQuery }) {
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

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="divide-y divide-zinc-700">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
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

function MovieDetails({ selectedId, onCloseDetails }) {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    // Year: year,
    Poster: poster,
    Plot: plot,
    Director: director,
    Actors: actors,
    Released: released,
    Genre: genre,
    Runtime: runtime,
    imdbRating,
  } = movie;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  return (
    <div className="p-4 bg-zinc-800 rounded-lg shadow-lg text-zinc-100 space-y-6 relative">
      <div className="flex justify-between items-start mb-4">
        <header className="flex flex-col sm:flex-row items-start gap-4 pr-10">
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-32 h-48 object-cover rounded-lg shadow-md"
          />
          <div className="space-y-2 mt-2 sm:mt-0">
            <h2 className="text-2xl font-bold text-teal-400 pr-8">{title}</h2>
            <p className="text-sm text-zinc-400">
              {released} &bull; {runtime}
            </p>
            <p className="text-sm text-zinc-400">{genre}</p>
            <p className="text-sm text-yellow-400">
              <span>⭐</span> {imdbRating} IMDb Rating
            </p>
          </div>
        </header>

        <button
          className="absolute top-4 right-4 bg-zinc-700 rounded-full p-2
      text-zinc-400 hover:text-teal-400 transition duration-300 w-10 h-10 flex items-center justify-center"
          onClick={onCloseDetails}
          aria-label="Go back"
        >
          <span className="text-2xl">&larr;</span>
        </button>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <StarRating maxRating={10} size={24} />
        </div>
        <p className="text-sm text-zinc-300 italic">{plot}</p>
        <p className="text-sm text-zinc-300">
          <strong className="text-zinc-100">Actors:</strong> {actors}
        </p>
        <p className="text-sm text-zinc-300">
          <strong className="text-zinc-100">Director:</strong> {director}
        </p>
      </section>
    </div>
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
