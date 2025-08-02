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
  
  // Initialize cart and wishlist from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Persist cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (token) {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password, role = "user") => {
    // ... (login function waisa hi rahega)
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
      return { success: false, error: error?.response?.data?.message || "Login failed" };
    }
  };

  const signup = async (userData) => {
    // ... (signup function waisa hi rahega)
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      const { token, role, ...data } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ ...data, role }));
      setToken(token);
      setUser({ ...data, role });
      return { success: true };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message || error.message };
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  // ==================================================
  // =========== CART & ORDER LOGIC START =============
  // ==================================================

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existItem = prevCart.find(item => item._id === product._id);
      if (existItem) {
        // Agar item pehle se hai, toh quantity update karo
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Agar naya item hai, toh use cart mein add karo
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      // Agar quantity 0 ya kam hai, toh item ko hata do
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === productId ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = async (orderData) => {
    try {
      // Backend ko request bhejkar naya order create karo
      const { data } = await axiosInstance.post('/orders', orderData);
      // Safal hone par, naya order data wapas bhejo
      return data;
    } catch (error) {
      console.error("Error in placeOrder context:", error.response?.data || error);
      // Error ko aage bhej do taaki component use handle kar sake
      throw error.response?.data || new Error("Could not place order");
    }
  };

  // ==================================================
  // =========== WISHLIST LOGIC START =================
  // ==================================================

  const addToWishlist = (product) => {
    setWishlist(prev => [...prev, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item._id !== productId));
  };

  // ==================================================

  const value = {
    user,
    token,
    loading,
    cart,
    wishlist,
    login,
    signup,
    logout,
    // Cart functions
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    // Wishlist functions
    addToWishlist,
    removeFromWishlist,
    // Order function
    placeOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
