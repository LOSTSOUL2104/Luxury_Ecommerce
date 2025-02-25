/* eslint-disable no-unused-vars */
import React from 'react'
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

const App = () => {
  return (
    
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/login" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
