import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";
import AdminDashboard from "./admin/AdminDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import FrozenFoodAboutUs from "./pages/AboutUs";
import FrozenFoodFAQs from "./pages/FAQ";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/user-dashboard"
                  element={
                    <ProtectedRoute role="user">
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/faq" element={<FrozenFoodFAQs />} />

                <Route path="/about-us" element={<FrozenFoodAboutUs />} />
                <Route
                  path="/product/:id"
                  element={
                    <ProtectedRoute role="user">
                      <ProductDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute role="user">
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute role="user">
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute role="user">
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-success"
                  element={
                    <ProtectedRoute role="user">
                      <OrderSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-history"
                  element={
                    <ProtectedRoute role="user">
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
