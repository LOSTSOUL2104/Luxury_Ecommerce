import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      let response;
      switch (method) {
        case "cod":
          response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          response = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
          } else {
            toast.error(response.data.message);
          }
          break;

        case "razorpay":
          response = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            initPay(response.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row justify-between gap-8 pt-8 lg:pt-14 min-h-[80vh] border-t"
      >
        {/* Left Side - Delivery Information */}
        <div className="flex flex-col gap-6 w-full lg:max-w-[480px]">
          <div className="text-2xl lg:text-3xl mb-2">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="firstName"
                  value={formData.firstName}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  type="text"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="lastName"
                  value={formData.lastName}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                required
                onChange={onChangeHandler}
                name="email"
                value={formData.email}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                type="email"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                required
                onChange={onChangeHandler}
                name="street"
                value={formData.street}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                type="text"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="city"
                  value={formData.city}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  type="text"
                  placeholder="New York"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  onChange={onChangeHandler}
                  name="state"
                  value={formData.state}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  type="text"
                  placeholder="NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Zipcode
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="zipcode"
                  value={formData.zipcode}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  type="number"
                  placeholder="10001"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="country"
                  value={formData.country}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  type="text"
                  placeholder="United States"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                required
                onChange={onChangeHandler}
                name="phone"
                value={formData.phone}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                type="number"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary & Payment */}
        <div className="lg:w-[450px] space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <CartTotal />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl mb-6">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>

            <div className="space-y-4">
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  method === "stripe"
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    method === "stripe" ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  {method === "stripe" && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <img className="h-6" src={assets.stripe_logo} alt="Stripe" />
              </div>

              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  method === "razorpay"
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    method === "razorpay"
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {method === "razorpay" && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <img
                  className="h-6"
                  src={assets.razorpay_logo}
                  alt="Razorpay"
                />
              </div>

              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  method === "cod"
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    method === "cod" ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  {method === "cod" && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-700 font-medium">
                  Cash on Delivery
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-black text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
