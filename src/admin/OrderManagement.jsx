import React, { useState } from 'react';
import { mockOrders } from '../data/mockData';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaEye, 
  FaEdit,
  FaShippingFast,
  FaCheckCircle
} from 'react-icons/fa';

const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const statuses = ['All', 'Pending', 'Shipped', 'Delivered'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toString().includes(searchTerm) ||
                         order.items.some(item => 
                           item.name.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="text-green-400" />;
      case 'shipped':
        return <FaShippingFast className="text-blue-400" />;
      default:
        return <FaEdit className="text-yellow-400" />;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Order Management</h1>
        <p className="text-blue-100 mt-2">Manage and track customer orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {statuses.filter(status => status !== 'All').map(status => {
          const count = orders.filter(order => order.status === status).length;
          return (
            <div key={status} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-200">{status} Orders</p>
                  <p className="text-xl md:text-2xl font-bold text-white mt-2">{count}</p>
                </div>
                <div className="p-3 rounded-full bg-white/10">
                  {getStatusIcon(status)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
              <input
                type="text"
                placeholder="Search by order ID or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>
          <div className="lg:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-slate-800 text-white">{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    #{order.id}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-blue-100">
                    User {order.userId}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-green-300">
                    ₹{order.total}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-sm focus:ring-2 focus:ring-blue-400 ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending" className="bg-slate-800 text-white">Pending</option>
                      <option value="Shipped" className="bg-slate-800 text-white">Shipped</option>
                      <option value="Delivered" className="bg-slate-800 text-white">Delivered</option>
                    </select>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-300" />
                      <span className="hidden md:inline">{formatDate(order.orderDate)}</span>
                      <span className="md:hidden">{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openOrderModal(order)}
                      className="text-blue-300 hover:text-blue-100 flex items-center transition-colors"
                      title="View Details"
                    >
                      <FaEye className="mr-1" />
                      <span className="hidden md:inline">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-blue-200">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Order Details #{selectedOrder.id}
              </h2>
              <button
                onClick={closeModal}
                className="text-blue-200 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-200">Order Date</p>
                  <p className="font-medium text-white">{formatDate(selectedOrder.orderDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Status</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-sm ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Customer ID</p>
                  <p className="font-medium text-white">User {selectedOrder.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Total Amount</p>
                  <p className="font-bold text-lg text-green-300">₹{selectedOrder.total}</p>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Delivery Address</h3>
                <p className="text-blue-100 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                  {selectedOrder.deliveryAddress}
                </p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">
                  Order Items ({selectedOrder.items.length})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-blue-200">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-300">₹{item.price * item.quantity}</p>
                        <p className="text-sm text-blue-200">₹{item.price} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Update Status</h3>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    updateOrderStatus(selectedOrder.id, e.target.value);
                    setSelectedOrder({...selectedOrder, status: e.target.value});
                  }}
                  className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="Pending" className="bg-slate-800 text-white">Pending</option>
                  <option value="Shipped" className="bg-slate-800 text-white">Shipped</option>
                  <option value="Delivered" className="bg-slate-800 text-white">Delivered</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition-colors border border-blue-500/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;