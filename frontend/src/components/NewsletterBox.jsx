/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "", details: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Test connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/newsletter/test"
        );
        console.log("Connection test response:", response.data);
        setIsConnected(true);
      } catch (error) {
        console.error("Connection test failed:", error);
        setIsConnected(false);
        setStatus({
          type: "error",
          message: "Cannot connect to the server",
          details: "Please check if the backend server is running on port 4000",
        });
      }
    };

    testConnection();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "", details: "" });

    try {
      console.log("Sending subscription request for:", email);
      const response = await axios.post(
        "http://localhost:4000/api/newsletter/subscribe",
        { email }
      );
      console.log("Subscription response:", response.data);
      setStatus({
        type: "success",
        message: "Thank you for subscribing!",
        details: "You will receive a confirmation email shortly.",
      });
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error.response?.data || error);

      if (!error.response) {
        setStatus({
          type: "error",
          message: "Network Error",
          details:
            "Cannot connect to the server. Please check if the backend server is running.",
        });
        return;
      }

      const errorMessage =
        error.response?.data?.message ||
        "Failed to subscribe. Please try again.";
      const errorDetails = error.response?.data?.details || error.message;

      setStatus({
        type: "error",
        message: errorMessage,
        details: errorDetails,
      });

      // If it's a configuration error, show a more helpful message
      if (errorMessage.includes("configuration")) {
        setStatus({
          type: "error",
          message: "We're currently experiencing technical difficulties.",
          details: "Please try again later or contact support.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setStatus({ type: "", message: "", details: "" });
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12 bg-gray-50">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p className="font-medium">Server Connection Error</p>
          <p className="text-sm mt-1">
            Please make sure the backend server is running on port 4000
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12 bg-gray-50">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Stay updated with our latest products and exclusive offers.
      </p>

      {status.message && (
        <div
          className={`mt-4 p-4 rounded-md ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <p className="font-medium">{status.message}</p>
          {status.details && <p className="text-sm mt-1">{status.details}</p>}
          {status.type === "error" && (
            <button
              onClick={handleRetry}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try Again
            </button>
          )}
        </div>
      )}

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-md bg-white shadow-sm"
      >
        <input
          className="w-full sm:flex-1 outline-none py-4"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "SENDING..." : "SUBSCRIBE"}
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
