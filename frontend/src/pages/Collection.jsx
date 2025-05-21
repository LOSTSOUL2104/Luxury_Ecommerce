import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Filter Options */}
      <div className="min-w-64 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xl font-medium">FILTERS</p>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <img
              className={`h-4 transition-transform duration-300 ${
                showFilter ? "rotate-180" : ""
              }`}
              src={assets.dropdown_icon}
              alt="Toggle filters"
            />
          </button>
        </div>

        {/* Category Filter */}
        <div className={`space-y-4 ${showFilter ? "" : "hidden"} sm:block`}>
          <div className="border-b border-gray-100 pb-4">
            <p className="mb-4 text-sm font-medium text-gray-900">CATEGORIES</p>
            <div className="space-y-3">
              {["Men", "Women", "Kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      value={cat}
                      onChange={toggleCategory}
                      className="peer sr-only"
                      checked={category.includes(cat)}
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-sm peer-checked:border-black peer-checked:bg-black transition-colors group-hover:border-gray-400"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className="border-b border-gray-100 pb-4">
            <p className="mb-4 text-sm font-medium text-gray-900">TYPE</p>
            <div className="space-y-3">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      value={type}
                      onChange={toggleSubCategory}
                      className="peer sr-only"
                      checked={subCategory.includes(type)}
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-sm peer-checked:border-black peer-checked:bg-black transition-colors group-hover:border-gray-400"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <div className="relative w-full sm:w-auto">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border-2 border-gray-200 rounded-lg text-sm appearance-none bg-white cursor-pointer hover:border-gray-300 focus:border-black focus:outline-none transition-colors"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Price Low to High</option>
              <option value="high-low">Sort by: Price High to Low</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>

        {filterProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
