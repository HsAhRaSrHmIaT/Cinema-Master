import React, { useState } from "react";
import { WatchedSummary } from "./WatchedSummary";
import { Loader } from "./Loader";
import { Header } from "./Header";
import { WatchedMovies } from "./WatchedMovies";
import { MovieDetails } from "./MovieDetails";
import { useMovies } from "./useMovies";
import { SectionHeader } from "./SectionHeader";
import { MovieList } from "./MovieList";
import { ErrorMessage } from "./ErrorMessage";
import { useLocalStorageState } from "./useLocalStorageState";

const KEY = "33b3bc13";
// const KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

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