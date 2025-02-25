// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";

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
            ZOOSKO
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Collections
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                New Arrivals
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Exclusive
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Sale
              </a>
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <Search size={20} />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <User size={20} />
            </button>
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
            <a
              href="#"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Collections
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              New Arrivals
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Exclusive
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Sale
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center justify-around px-5">
              <button className="text-gray-300 hover:text-white">
                <Search size={20} />
              </button>
              <button className="text-gray-300 hover:text-white">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LuxuryNavbar;
