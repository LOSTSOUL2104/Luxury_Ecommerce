import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token, darkMode }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return darkMode
          ? "bg-yellow-900 text-yellow-200"
          : "bg-yellow-100 text-yellow-800";
      case "processing":
        return darkMode
          ? "bg-blue-900 text-blue-200"
          : "bg-blue-100 text-blue-800";
      case "shipped":
        return darkMode
          ? "bg-purple-900 text-purple-200"
          : "bg-purple-100 text-purple-800";
      case "delivered":
        return darkMode
          ? "bg-green-900 text-green-200"
          : "bg-green-100 text-green-800";
      case "cancelled":
        return darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800";
      default:
        return darkMode
          ? "bg-gray-700 text-gray-200"
          : "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch =
      searchTerm === "" ||
      order.address.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.address.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      className={`max-w-7xl mx-auto p-6 ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              } focus:ring-2 focus:ring-blue-500`}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            } focus:ring-2 focus:ring-blue-500`}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 && (
          <div
            className={`p-8 text-center rounded-lg ${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-500"
            }`}
          >
            No orders found
          </div>
        )}

        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 ${
              darkMode ? "bg-gray-800" : ""
            }`}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6">
                <div className="flex items-center justify-center">
                  <img
                    className="w-16 h-16 object-contain"
                    src={assets.parcel_icon}
                    alt="Order"
                  />
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p
                        key={index}
                        className={`text-gray-700 ${
                          darkMode ? "text-gray-400" : ""
                        }`}
                      >
                        {item.name} x {item.quantity}{" "}
                        <span
                          className={`text-gray-500 ${
                            darkMode ? "text-gray-400" : ""
                          }`}
                        >
                          ({item.size})
                        </span>
                        {index !== order.items.length - 1 && ","}
                      </p>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p
                      className={`font-medium text-gray-900 ${
                        darkMode ? "text-gray-200" : ""
                      }`}
                    >
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p
                      className={`text-gray-600 ${
                        darkMode ? "text-gray-400" : ""
                      }`}
                    >
                      {order.address.street},
                    </p>
                    <p
                      className={`text-gray-600 ${
                        darkMode ? "text-gray-400" : ""
                      }`}
                    >
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country} - {order.address.zipcode}
                    </p>
                    <p
                      className={`text-gray-600 ${
                        darkMode ? "text-gray-400" : ""
                      }`}
                    >
                      {order.address.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p
                    className={`text-gray-700 ${
                      darkMode ? "text-gray-400" : ""
                    }`}
                  >
                    <span className="font-medium">Items:</span>{" "}
                    {order.items.length}
                  </p>
                  <p
                    className={`text-gray-700 ${
                      darkMode ? "text-gray-400" : ""
                    }`}
                  >
                    <span className="font-medium">Method:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p
                    className={`text-gray-700 ${
                      darkMode ? "text-gray-400" : ""
                    }`}
                  >
                    <span className="font-medium">Payment:</span>{" "}
                    <span
                      className={`${
                        order.payment ? "text-green-600" : "text-yellow-600"
                      } ${darkMode ? "text-gray-400" : ""}`}
                    >
                      {order.payment ? "Paid" : "Pending"}
                    </span>
                  </p>
                  <p
                    className={`text-gray-700 ${
                      darkMode ? "text-gray-400" : ""
                    }`}
                  >
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`text-xl font-bold text-gray-900 ${
                      darkMode ? "text-gray-200" : ""
                    }`}
                  >
                    {currency}
                    {order.amount}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className={`px-3 py-2 rounded-lg border ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                    } text-sm`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
