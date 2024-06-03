import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./redux/features/products/productsSlice";

// Components
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Products from "./components/Products";
import Details from "./components/Details";
import ShoppingCart from "./components/ShoppingCart";
import SignUp from "./components/SignUp";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from 'react-hot-toast';

import "../src/styles/App.css";
import Login from "./components/Login";
import Public from "./components/Public";
import Order from "./components/Order";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();

  // Fetch products when the page loads.
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const loading = useSelector(state => state.productsReducer.loading);

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    const authToken = localStorage.getItem('authToken');
    return !!authToken;
  };

  return (
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/login" element={isAuthenticated() ?  <Navigate to="/products" replace /> : <Login />} />
        <Route path="/details/:id" element={isAuthenticated() ? <Details /> : <Navigate to="/" replace />} />
        <Route path="/shoppingCart" element={isAuthenticated() ? <ShoppingCart /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={isAuthenticated() ?  <Navigate to="/products" replace /> : <SignUp />} />
        <Route path="/products" element={isAuthenticated() ? <Products /> : <Navigate to="/" replace />} />
        <Route path="/order" element={isAuthenticated() ? <Order /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/" replace />} />
        <Route path="/" element={isAuthenticated() ?  <Navigate to="/products" replace /> : <Public />} />
        {/* Redirect to public page for unknown routes */}
        <Route path="*" element={isAuthenticated()? <Navigate to="/" replace /> : <Products />} />
      </Routes>
    </Router>
  );
}

export default App;
