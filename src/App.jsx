import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { WatchedSummary } from "./WatchedSummary";
import { Movie } from "./Movie";
import { Loader } from "./Loader";
import { Header } from "./Header";
import { WatchedMovies } from "./WatchedMovies";
import { MovieDetails } from "./MovieDetails";

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

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    setIsOpen2(true);
  }

  function handleCloseDetails() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, 
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
        // console.log(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
        console.error(error.message);
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

    return () => {
      controller.abort();
    }

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
            {isLoading && <Loader type={"list"} />}
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
                  onAddWatched={handleAddWatched}
                  watched={watched}
                />
              ) : (
                <>
                  <div className="sticky top-0 z-10 bg-zinc-800 w-full">
                    <WatchedSummary watched={watched} />
                  </div>
                  <WatchedMovies
                    watched={watched}
                    onDeleteWatched={handleDeleteWatched}
                    onSelectMovie={handleSelectMovie}
                  />
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

export function SearchBox({ query, setQuery }) {
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

export function FoundResults({ movieCount }) {
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

export function StatCard({ icon, value, color }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 text-center shadow-md">
      <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
      <div className="text-zinc-300 font-medium">{value}</div>
    </div>
  );
}

export function MovieRating({ icon, rating, color }) {
  return (
    <p className={`flex items-center gap-2 text-sm ${color}`}>
      <span>{icon}</span>
      <span>{rating}</span>
    </p>
  );
}
