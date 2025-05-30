"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { navItems } from "@/constants/NavConstants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 sticky z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 flex justify-center">
      <div className="max-w-screen-lg flex flex-wrap justify-between w-full p-4">
        <div className="flex-1 justify-start">
          <BackButton />
        </div>
        <div className="flex flex-1 justify-end md:order-3 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ToggleTheme />
          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full justify-between md:flex md:w-auto md:order-2`}
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 font-medium md:flex-row md:space-x-8 md:mt-0 md:border-0 md:p-0 md:bg-white dark:bg-gray-800 dark:border-gray-700 dark:md:bg-gray-900 rtl:space-x-reverse">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavItem label={item.label} path={item.path} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ label, path }: { label: string; path: string }) {
  const router = useRouter();
  const isActive = usePathname() === path;
  return (
    <button
      onClick={() => router.push(path)}
      className={
        isActive
          ? "text-left block py-2 px-3 font-medium rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-blue-700 dark:bg-blue-700 dark:text-gray-100 bg-gray-200 w-full"
          : "text-left block py-2 px-3 font-medium rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 w-full"
      }
    >
      {label}
    </button>
  );
}

function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="md:order-1 flex text-sm px-2 py-2 text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white rounded-lg bg-gray-100 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-400 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
}

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <div className="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
      <span className="flex items-center ml-3 font-medium text-gray-900 dark:text-gray-100">
        {theme === "dark" ? (
          <>
            <span className="mr-2">Dark Mode</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </>
        ) : (
          <>
            <span className="mr-2">Light Mode</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </>
        )}
      </span>
    </label>
  );
}
