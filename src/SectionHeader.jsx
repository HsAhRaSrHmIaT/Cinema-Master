import React from "react";

export function SectionHeader({ children, isOpen, setIsOpen }) {
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
