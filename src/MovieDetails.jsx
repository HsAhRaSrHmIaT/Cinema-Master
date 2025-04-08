import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Loader } from "./Loader";

const KEY = import.meta.env.VITE_API_KEY;

export function MovieDetails({ selectedId, onCloseDetails, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const alreadyRated = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

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

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      Title: title,
      Poster: poster,
      runtime: parseInt(runtime),
      imdbRating: parseFloat(imdbRating),
      userRating: userRating,
    };

    onAddWatched(newMovie);
    onCloseDetails();
  }

  useEffect(() => {
    document.title = `CinemaTracker | ${title}`;
    return () => {
      document.title = "CinemaTracker";
    };
  }, [title]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  return (
    <div className="p-4 bg-zinc-800 rounded-lg shadow-lg text-zinc-100 space-y-6 relative overflow-y-auto scrollbar-hide h-120">
      {isLoading ? (
        <Loader type={"details"} />
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <header className="flex flex-col sm:flex-row items-start gap-4 pr-10">
              <img
                src={poster}
                alt={`${title} poster`}
                className="w-32 h-48 object-cover rounded-lg shadow-md"
              />
              <div className="space-y-2 mt-2 sm:mt-0">
                <h2 className="text-2xl font-bold text-teal-400 pr-8">
                  {title}
                </h2>
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
            <div
              className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${
                userRating > 0 ? "bg-zinc-700/50" : ""
              } p-4 rounded-lg w-full`}
            >
              <div className="flex items-center gap-2">
                {isWatched ? (
                  <p className="text-green-400 font-semibold text-start">
                    Already Watched and Rated <span>⭐</span>
                    {alreadyRated}
                  </p>
                ) : (
                  <StarRating maxRating={10} size={20} onRate={setUserRating} />
                )}
                <span className="text-yellow-400 font-semibold">
                  {userRating > 0 ? userRating : ""}
                </span>
              </div>

              {userRating > 0 && (
                <button
                  className="bg-teal-500 text-zinc-100 px-4 py-2 rounded-lg hover:bg-teal-400 transition duration-300 w-full sm:w-auto text-center"
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  Add to Watched
                </button>
              )}
            </div>
            <p className="text-sm text-zinc-300 italic">{plot}</p>
            <p className="text-sm text-zinc-300">
              <strong className="text-zinc-100">Actors:</strong> {actors}
            </p>
            <p className="text-sm text-zinc-300">
              <strong className="text-zinc-100">Director:</strong> {director}
            </p>
          </section>
        </>
      )}
    </div>
  );
}
