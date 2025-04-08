import React from "react";
import { average } from "./average";

export function WatchedSummary({ watched }) {
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
export function StatCard({ icon, value, color }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 text-center shadow-md">
      <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
      <div className="text-zinc-300 font-medium">{value}</div>
    </div>
  );
}
