/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken, darkMode, toggleDarkMode }) => {
  return (
    <div
      className={`flex items-center py-2 px-[4%] justify-between ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${
            darkMode
              ? "text-gray-100 hover:bg-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          } transition-colors duration-200`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
        <button
          onClick={() => setToken("")}
          className={`${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-600 hover:bg-gray-700"
          } text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm transition-colors duration-200`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
