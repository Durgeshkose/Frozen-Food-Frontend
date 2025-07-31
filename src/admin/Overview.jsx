import React, { useState, useEffect } from 'react';
import { mockProducts, mockOrders } from '../data/mockData';
import { 
  FaBoxes, 
  FaShoppingCart, 
  FaDollarSign, 
  FaUsers,
  FaArrowUp,
  FaArrowDown, 
  FaEye
} from 'react-icons/fa';

const Overview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    recentOrders: [],
    lowStockProducts: []
  });

  useEffect(() => {
    // Calculate stats
    const totalProducts = mockProducts.length;
    const totalOrders = mockOrders.length;
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
    const totalUsers = 150; // Mock user count
    const recentOrders = mockOrders.slice(0, 5);
    const lowStockProducts = mockProducts.filter(product => !product.inStock);

    setStats({
      totalProducts,
      totalOrders,
      totalRevenue,
      totalUsers,
      recentOrders,
      lowStockProducts
    });
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FaBoxes,
      color: 'bg-blue-500/20 border-blue-400/30',
      iconColor: 'text-blue-400',
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: FaShoppingCart,
      color: 'bg-green-500/20 border-green-400/30',
      iconColor: 'text-green-400',
      change: '+8%',
      isPositive: true
    },
    {
      title: 'Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: FaDollarSign,
      color: 'bg-yellow-500/20 border-yellow-400/30',
      iconColor: 'text-yellow-400',
      change: '+15%',
      isPositive: true
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FaUsers,
      color: 'bg-purple-500/20 border-purple-400/30',
      iconColor: 'text-purple-400',
      change: '-2%',
      isPositive: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500/20 text-green-300 border border-green-400/30';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-300 border border-blue-400/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-400/30';
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-blue-100 mt-2">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-200">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full backdrop-blur-sm border ${stat.color}`}>
                  <Icon className={`${stat.iconColor} text-lg md:text-xl`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.isPositive ? (
                  <FaArrowUp className="text-green-400 mr-1 text-sm" />
                ) : (
                  <FaArrowDown className="text-red-400 mr-1 text-sm" />
                )}
                <span className={`text-sm font-medium ${
                  stat.isPositive ? 'text-green-300' : 'text-red-300'
                }`}>
                  {stat.change}
                </span>
                <span className="text-blue-200 text-sm ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {/* Recent Orders */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-2">
            <h2 className="text-lg md:text-xl font-semibold text-white">Recent Orders</h2>
            <button className="text-blue-300 hover:text-blue-100 font-medium text-sm md:text-base transition-colors self-start sm:self-auto">
              View All
            </button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 gap-2 sm:gap-0">
                <div className="flex-1">
                  <p className="font-medium text-white">Order #{order.id}</p>
                  <p className="text-sm text-blue-200">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex sm:flex-col sm:text-right items-center sm:items-end justify-between sm:justify-start gap-2">
                  <p className="font-semibold text-green-300">₹{order.total}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-sm ${getStatusColor(order.status)} whitespace-nowrap`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-2">
            <h2 className="text-lg md:text-xl font-semibold text-white">Stock Alerts</h2>
            <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-sm font-medium border border-red-400/30 backdrop-blur-sm self-start sm:self-auto">
              {stats.lowStockProducts.length} items
            </span>
          </div>

          {stats.lowStockProducts.length === 0 ? (
            <div className="text-center py-6 md:py-8">
              <p className="text-blue-200">All products are in stock!</p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {stats.lowStockProducts.map((product) => (
                <div key={product.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-red-500/10 backdrop-blur-sm rounded-lg border border-red-400/20 gap-3 sm:gap-0">
                  <div className="flex items-center space-x-3 flex-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 md:w-12 md:h-12 object-cover rounded flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white text-sm md:text-base truncate">{product.name}</p>
                      <p className="text-sm text-red-300">Out of Stock</p>
                    </div>
                  </div>
                  <button className="text-blue-300 hover:text-blue-100 text-sm font-medium transition-colors self-start sm:self-auto">
                    <FaEye className="inline mr-1" />
                    <span className="sm:hidden md:inline">View</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6 text-center">
          <FaBoxes className="text-2xl md:text-3xl text-blue-400 mx-auto mb-3 md:mb-4" />
          <h3 className="text-base md:text-lg font-semibold text-white mb-2">Add New Product</h3>
          <p className="text-blue-200 mb-3 md:mb-4 text-sm md:text-base">Add a new product to your inventory</p>
          <button className="w-full sm:w-auto bg-blue-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors border border-blue-500/30 text-sm md:text-base">
            Add Product
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6 text-center">
          <FaShoppingCart className="text-2xl md:text-3xl text-green-400 mx-auto mb-3 md:mb-4" />
          <h3 className="text-base md:text-lg font-semibold text-white mb-2">Manage Orders</h3>
          <p className="text-blue-200 mb-3 md:mb-4 text-sm md:text-base">View and update order statuses</p>
          <button className="w-full sm:w-auto bg-green-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors border border-green-500/30 text-sm md:text-base">
            View Orders
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6 text-center sm:col-span-2 lg:col-span-1">
          <FaUsers className="text-2xl md:text-3xl text-purple-400 mx-auto mb-3 md:mb-4" />
          <h3 className="text-base md:text-lg font-semibold text-white mb-2">User Analytics</h3>
          <p className="text-blue-200 mb-3 md:mb-4 text-sm md:text-base">View user engagement statistics</p>
          <button className="w-full sm:w-auto bg-purple-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors border border-purple-500/30 text-sm md:text-base">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;