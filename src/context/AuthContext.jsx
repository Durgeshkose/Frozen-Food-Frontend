import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (token) {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }
    setLoading(false);
  }, [token]);

  // ✅ Login function with role support
  const login = async (email, password, role = "user") => {
    try {
      const endpoint = role === "admin" ? "/admin/login" : "/auth/login";
      const res = await axiosInstance.post(endpoint, { email, password });

      const { token, ...userData } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ ...userData, role }));
      setToken(token);
      setUser({ ...userData, role });

      return { success: true, role };
    } catch (error) {
      return {
        success: false,
        error: error?.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      const { token, role, ...data } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ ...data, role }));
      setToken(token);
      setUser({ ...data, role });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.response?.data?.message || error.message,
      };
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  const value = {
    user,
    token,
    loading,
    cart,
    wishlist,
    login,
    signup,
    logout,
    setCart,
    setWishlist,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
