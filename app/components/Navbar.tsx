'use client';

import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Back Button */}

        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-sm px-2 py-2 text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white rounded-lg bg-gray-100 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-400"
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
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          BLOG
        </span>
        {/* Theme Mode Toggle Button and Hamburger */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            TODO
          </button>
          <button
            type="button"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
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
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 font-medium md:flex-row md:space-x-8 md:mt-0 md:border-0 md:p-0 md:bg-white dark:bg-gray-800 dark:border-gray-700 rtl:space-x-reverse">
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
          ? "block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-700 dark:text-white bg-gray-200 dark:bg-gray-700"
          : "block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300"
      }
    >
      {label}
    </button>
  );
}
