import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-600"
      }`}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />

      {token === "" ? (
        <Login setToken={setToken} darkMode={darkMode} />
      ) : (
        <>
          <Navbar
            setToken={setToken}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <hr
            className={`${darkMode ? "border-gray-700" : "border-gray-200"}`}
          />
          <div className="flex w-full">
            <Sidebar darkMode={darkMode} />
            <div
              className={`w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-base ${
                darkMode ? "text-gray-100" : "text-gray-600"
              }`}
            >
              <Routes>
                <Route
                  path="/add"
                  element={<Add token={token} darkMode={darkMode} />}
                />
                <Route
                  path="/list"
                  element={<List token={token} darkMode={darkMode} />}
                />
                <Route
                  path="/orders"
                  element={<Orders token={token} darkMode={darkMode} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
