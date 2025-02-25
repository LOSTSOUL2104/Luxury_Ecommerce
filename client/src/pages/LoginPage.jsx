/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const LuxuryNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-gray-100">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-serif text-xl tracking-wider">
            <Link to="/">LUXURIA</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/collections"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Collections
              </Link>
              <Link
                to="/new-arrivals"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                New Arrivals
              </Link>
              <Link
                to="/exclusive"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Exclusive
              </Link>
              <Link
                to="/sale"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Sale
              </Link>
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <Search size={20} />
            </button>
            <Link
              to="/LoginPage"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              <User size={20} />
            </Link>
            <button className="text-gray-300 hover:text-white relative transition-colors duration-200">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                3
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white">
              <ShoppingBag size={20} />
            </button>
            <Link to="/login" className="text-gray-300 hover:text-white">
              <User size={20} />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/collections"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Collections
            </Link>
            <Link
              to="/new-arrivals"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              New Arrivals
            </Link>
            <Link
              to="/exclusive"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Exclusive
            </Link>
            <Link
              to="/sale"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Sale
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center justify-around px-5">
              <button className="text-gray-300 hover:text-white">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LuxuryNavbar;
