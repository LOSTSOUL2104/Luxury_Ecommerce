import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 transition-all duration-300 ${
          isActive ? "text-black" : "hover:text-black"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <p>{children}</p>
          <div
            className={`w-2/4 h-[1.5px] bg-black transition-all duration-300 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}
    </NavLink>
  );

  return (
    <div className="flex items-center justify-between py-5 font-medium bg-white shadow-sm px-4 md:px-8 sticky top-0 z-50">
      <Link to="/">
        <img
          src={assets.logo}
          className="w-36 hover:opacity-80 transition-opacity"
          alt=""
        />
      </Link>

      <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
        <NavItem to="/">HOME</NavItem>
        <NavItem to="/collection">COLLECTION</NavItem>
        <NavItem to="/about">ABOUT</NavItem>
        <NavItem to="/contact">CONTACT</NavItem>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer hover:opacity-70 transition-opacity"
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer hover:opacity-70 transition-opacity"
            src={assets.profile_icon}
            alt=""
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 animate-fadeIn">
              <div className="flex flex-col gap-2 w-48 py-3 px-5 bg-white text-gray-600 rounded-lg shadow-lg border border-gray-100">
                <p className="cursor-pointer hover:text-black transition-colors duration-200">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black transition-colors duration-200"
                >
                  Orders
                </p>
                <hr className="my-1 border-gray-100" />
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-red-600 transition-colors duration-200"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative group">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 group-hover:opacity-70 transition-opacity"
            alt=""
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-5 h-5 text-center leading-5 bg-black text-white rounded-full text-[10px] font-medium shadow-sm">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden hover:opacity-70 transition-opacity"
          alt=""
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out shadow-2xl ${
          visible ? "w-[280px]" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p className="font-medium">Close Menu</p>
          </div>
          <div className="flex flex-col mt-4">
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b hover:bg-gray-50 transition-colors ${
                  isActive ? "bg-gray-50 text-black" : ""
                }`
              }
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b hover:bg-gray-50 transition-colors ${
                  isActive ? "bg-gray-50 text-black" : ""
                }`
              }
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b hover:bg-gray-50 transition-colors ${
                  isActive ? "bg-gray-50 text-black" : ""
                }`
              }
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-3 pl-6 border-b hover:bg-gray-50 transition-colors ${
                  isActive ? "bg-gray-50 text-black" : ""
                }`
              }
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
