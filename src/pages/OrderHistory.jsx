import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { mockOrders } from '../data/mockData';
import { FaShoppingBag, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Filter orders for current user
    const userOrders = mockOrders.filter(order => order.userId === user?.id);
    setOrders(userOrders);
  }, [user]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-900/30 text-green-300 border border-green-500/30';
      case 'shipped':
        return 'bg-blue-900/30 text-blue-300 border border-blue-500/30';
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30';
      default:
        return 'bg-gray-700/50 text-gray-300 border border-gray-500/30';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <>
        <Helmet>
          <title>Order History - FrozenFresh</title>
          <meta name="description" content="View your order history" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
                </div>
                <FaShoppingBag className="relative mx-auto h-24 w-24 text-blue-300 mb-6" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                No orders yet
              </h2>
              <p className="text-blue-200 mb-8 text-lg">
                You haven't placed any orders yet. Start shopping to see your order history here.
              </p>
              <a
                href="/user-dashboard"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Shopping
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order History - FrozenFresh</title>
        <meta name="description" content="View your order history and track deliveries" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Order History
            </h1>
            <p className="text-blue-200 text-lg">
              Track and view all your previous orders
            </p>
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
                {/* Order Header */}
                <div className="bg-slate-800/80 px-6 py-6 border-b border-slate-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-6">
                      <div>
                        <p className="text-sm text-blue-300 font-medium">Order ID</p>
                        <p className="font-bold text-white text-lg">#{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-300 font-medium">Order Date</p>
                        <div className="flex items-center text-white">
                          <FaCalendarAlt className="mr-2 text-blue-400" />
                          <span className="font-medium">
                            {formatDate(order.orderDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center space-x-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <div className="text-right">
                        <p className="text-sm text-blue-300 font-medium">Total</p>
                        <p className="text-2xl font-bold text-emerald-400">₹{order.total}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Items ({order.items.length})
                  </h3>
                  
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 px-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <FaShoppingBag className="text-white text-lg" />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-lg">{item.name}</p>
                            <p className="text-blue-300">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-400 text-lg">₹{item.price * item.quantity}</p>
                          <p className="text-blue-300">₹{item.price} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="px-6 py-6 bg-slate-800/50 border-t border-slate-700/50">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mt-1">
                      <FaMapMarkerAlt className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-blue-300 font-medium mb-1">Delivery Address</p>
                      <p className="text-white text-lg">{order.deliveryAddress}</p>
                    </div>
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