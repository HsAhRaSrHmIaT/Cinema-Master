import React from "react";

export function Loader({ type }) {
  return (
    <>
      {type === "list" && (
        <div className="p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 animate-pulse"
              >
                <div className="w-16 h-24 bg-zinc-700 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {type === "details" && (
        <div className="p-4 space-y-6 animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col sm:flex-row items-start gap-4 pr-10">
              <div className="w-32 h-48 bg-zinc-700 rounded-lg"></div>
              <div className="space-y-2 mt-2 sm:mt-0 flex-1">
                <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/3"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
            <div className="h-4 bg-zinc-700 rounded w-full"></div>
            <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
          </div>
        </div>
      )}
    </>
  );
}
