import React from "react";

export function ErrorMessage({ message }) {
  return (
    <div className="p-4 bg-zinc-700 rounded-lg m-4 border border-red-500">
      <p className="text-red-400 text-center font-semibold">{message}</p>
    </div>
  );
}
