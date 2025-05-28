"use client";

import { useRouter } from "next/navigation";
import { navItems } from "@/constants/NavConstants";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="dark:bg-gray-900">
    <footer className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025 BLOG™. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <button
                onClick={() => router.push(path)}
                className="hover:underline me-4 md:me-6"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </footer>
    </div>
  );
}
