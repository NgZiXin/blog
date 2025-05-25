"use client";

import { useState } from "react";

interface CounterProps {
  initialCount: number;
  changeInterval: number;
  hasReset: boolean;
}

export default function Counter({
  initialCount,
  changeInterval,
  hasReset,
}: CounterProps) {
  const [count, setCount] = useState<number>(initialCount);

  function handleDecrement() {
    setCount(count - changeInterval);
  }

  function handleIncrement() {
    setCount(count + changeInterval);
  }

  function handleReset() {
    setCount(initialCount);
  }

  return (
    <div className="max-w-xs mx-auto">
      <div className="relative flex items-center max-w-[8rem]">
        <button
          onClick={handleDecrement}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 rounded-s-lg p-2.5 h-11 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14"
            />
          </svg>
        </button>
        <input type="text" value={count} className="bg-gray-50 border border-gray-300 h-11 text-center text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm block w-full py-2.5" disabled />
        <button
          onClick={handleIncrement}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 rounded-e-lg p-2.5 h-11 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center max-w-[8rem]">
        {hasReset ? (
          <button
            onClick={handleReset}
            className="text-sm text-gray-300 hover:text-gray-500 hover:underline dark:text-gray-700 dark:hover:text-gray-500"
          >
            Reset
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>  
  );
}
