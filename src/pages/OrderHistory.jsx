import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance'; // Backend se connect karne ke liye
import { FaShoppingBag, FaCalendarAlt, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return; // Agar user login nahi hai toh kuch na karein
      
      setIsLoading(true);
      try {
        // FIX: Ab hum mockData ki jagah backend se real orders fetch karenge
        const response = await axiosInstance.get('/orders/myorders');
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]); // Jab user login ho, tab orders fetch karein

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-900/30 text-green-300 border border-green-500/30';
      case 'shipped': return 'bg-blue-900/30 text-blue-300 border border-blue-500/30';
      case 'pending': return 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30';
      default: return 'bg-gray-700/50 text-gray-300 border border-gray-500/30';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <FaSpinner className="animate-spin text-4xl mx-auto mb-4" />
          <p>Loading your order history...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Helmet>
          <title>Order History - FrozenFresh</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <FaShoppingBag className="mx-auto h-24 w-24 text-blue-300 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">No orders yet</h2>
            <p className="text-blue-200 mb-8 text-lg">You haven't placed any orders yet. Start shopping!</p>
            <Link
              to="/user-dashboard"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-medium shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order History - FrozenFresh</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Order History</h1>
            <p className="text-blue-200 text-lg">Track and view all your previous orders</p>
          </div>
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
                <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-sm text-blue-300 font-medium">Order ID</p>
                      <p className="font-bold text-white text-lg">#{order._id.slice(-6).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-300 font-medium">Order Date</p>
                      <p className="font-medium text-white">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-300 font-medium">Total</p>
                      <p className="text-2xl font-bold text-emerald-400">₹{order.totalPrice}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus || 'Pending'}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Items ({order.orderItems.length})</h3>
                  <div className="space-y-4">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="flex items-center justify-between py-3 px-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div>
                            <p className="font-semibold text-white">{item.name}</p>
                            <p className="text-blue-300 text-sm">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold text-emerald-400">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
