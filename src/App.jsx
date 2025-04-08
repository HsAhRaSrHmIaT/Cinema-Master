import React, { useEffect, useState } from "react";
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
        setError("");
        // console.log(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
          console.log(error.message);
        }
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
    handleCloseDetails();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen text-zinc-100 p-4 md:p-8 transition-all duration-300">
      <div className="max-w-6xl mx-auto transition-all duration-300">
        <Header movies={movies} query={query} setQuery={setQuery} />

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-300">
          <div
            className={`bg-zinc-800 rounded-2xl shadow-2xl overflow-y-auto scrollbar-hide transition-all duration-300 ${
              isOpen1 ? "h-120" : "h-auto"
            }`}
          >
            <div className="sticky top-0 z-10 transition-all duration-300">
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
            className={`bg-zinc-800 rounded-2xl shadow-2xl overflow-y-auto scrollbar-hide transition-all duration-300 ${
              isOpen2 ? "h-120" : "h-auto"
            } `}
          >
            <div className="sticky top-0 z-10 transition-all duration-300">
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
                  <div className="sticky top-0 z-10 bg-zinc-800 w-full transition-all duration-300">
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

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="divide-y divide-zinc-700">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
