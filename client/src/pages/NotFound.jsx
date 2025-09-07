// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#07020D] text-[#F1E9DB] text-center px-4">
      <h1 className="text-8xl font-bold mb-4 animate-fadeIn">404</h1>
      <h2 className="text-3xl md:text-4xl mb-2 animate-fadeIn">Oops! Page Not Found</h2>
      <p className="text-lg md:text-xl mb-6 animate-fadeIn">
        The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#5DB7DE] text-[#07020D] rounded-md font-semibold hover:bg-[#A39B8B] transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
