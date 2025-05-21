import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token, darkMode }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-6 ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form
        onSubmit={onSubmitHandler}
        className={`flex flex-col w-full items-start gap-6 bg-white p-6 rounded-lg shadow-sm ${
          darkMode ? "bg-gray-700" : ""
        }`}
      >
        <div className="w-full">
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            } mb-3`}
          >
            Product Images
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <label
                key={num}
                htmlFor={`image${num}`}
                className="cursor-pointer"
              >
                <div
                  className={`w-full aspect-square rounded-lg border-2 border-dashed ${
                    eval(`image${num}`) ? "border-blue-500" : "border-gray-300"
                  } hover:border-blue-500 transition-colors duration-200 flex items-center justify-center overflow-hidden ${
                    darkMode ? "bg-gray-600" : ""
                  }`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={
                      eval(`!image${num}`)
                        ? assets.upload_area
                        : URL.createObjectURL(eval(`image${num}`))
                    }
                    alt={`Product image ${num}`}
                  />
                </div>
                <input
                  onChange={(e) => eval(`setImage${num}(e.target.files[0])`)}
                  type="file"
                  id={`image${num}`}
                  hidden
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="w-full space-y-6">
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Product Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              } focus:ring-2 focus:ring-blue-500`}
              type="text"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Product Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              } focus:ring-2 focus:ring-blue-500`}
              placeholder="Write product description here"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } mb-2`}
              >
                Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } focus:ring-2 focus:ring-blue-500`}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } mb-2`}
              >
                Sub Category
              </label>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } focus:ring-2 focus:ring-blue-500`}
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } mb-2`}
              >
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } focus:ring-2 focus:ring-blue-500`}
                type="number"
                placeholder="Enter price"
                required
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-3`}
            >
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                  className={`cursor-pointer ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <p
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                      sizes.includes(size)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              onChange={() => setBestseller((prev) => !prev)}
              checked={bestseller}
              type="checkbox"
              id="bestseller"
              className={`w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            />
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } cursor-pointer`}
              htmlFor="bestseller"
            >
              Mark as Bestseller
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full sm:w-auto px-8 py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium ${
            darkMode ? "bg-blue-700 hover:bg-blue-800" : ""
          }`}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
