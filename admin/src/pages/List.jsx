/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token, darkMode }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Product removed successfully!");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while removing the product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div
      className={`max-w-7xl mx-auto p-6 ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">All Products</h1>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Total Products: {list.length}
        </p>
      </div>

      <div
        className={`bg-white rounded-lg shadow-lg overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`grid grid-cols-12 gap-4 p-4 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="col-span-1 font-medium">Image</div>
          <div className="col-span-3 font-medium">Name</div>
          <div className="col-span-2 font-medium">Category</div>
          <div className="col-span-2 font-medium">Price</div>
          <div className="col-span-2 font-medium">Sizes</div>
          <div className="col-span-2 font-medium text-right">Actions</div>
        </div>

        {list.length === 0 ? (
          <div
            className={`p-8 text-center ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            No products found
          </div>
        ) : (
          list.map((item) => (
            <div
              key={item._id}
              className={`grid grid-cols-12 gap-4 p-4 items-center border-b ${
                darkMode
                  ? "border-gray-700 hover:bg-gray-700"
                  : "border-gray-200 hover:bg-gray-50"
              } transition-colors duration-200`}
            >
              <div className="col-span-1">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              <div className="col-span-3">
                <p className="font-medium">{item.name}</p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.description?.substring(0, 50)}...
                </p>
              </div>
              <div className="col-span-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    darkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.category}
                </span>
              </div>
              <div className="col-span-2">
                <p className="font-medium">${item.price}</p>
              </div>
              <div className="col-span-2">
                <div className="flex gap-2">
                  {Object.entries(item.sizes).map(
                    ([size, available]) =>
                      available && (
                        <span
                          key={size}
                          className={`px-2 py-1 rounded text-xs ${
                            darkMode
                              ? "bg-gray-700 text-gray-200"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {size}
                        </span>
                      )
                  )}
                </div>
              </div>
              <div className="col-span-2 text-right">
                <button
                  onClick={() => removeProduct(item._id)}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "text-red-400 hover:bg-gray-700 hover:text-red-300"
                      : "text-red-500 hover:bg-gray-100 hover:text-red-600"
                  } transition-colors duration-200`}
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
