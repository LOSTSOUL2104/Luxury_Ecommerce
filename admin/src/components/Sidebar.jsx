/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = ({ darkMode }) => {
  return (
    <div
      className={`w-[15%] h-[100vh] p-4 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg`}
    >
      <div className="flex flex-col gap-4">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-800"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5" src={assets.plus_icon} alt="Add" />
          <span className="font-medium">Add Item</span>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-800"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5" src={assets.list_icon} alt="List" />
          <span className="font-medium">List Items</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-800"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5" src={assets.order_icon} alt="Orders" />
          <span className="font-medium">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
