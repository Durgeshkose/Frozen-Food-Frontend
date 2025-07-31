import React, { useState, useEffect } from 'react';
import { User, ShoppingCart, Package, Heart, CreditCard, MapPin, Bell, Settings, Star, Calendar, Truck, Clock, ChevronRight, Eye, Download, Edit3, Plus, Trash2, Menu, X } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance'; // For backend API calls

const FrozenFoodDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State for backend data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    joinDate: 'January 2024',
    totalOrders: 47,
    totalSpent: '₹24,890',
    loyaltyPoints: 840,
    membershipTier: 'Gold',
    profileImage: null,
    dateOfBirth: '1985-03-15',
    gender: 'Male'
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Backend API calls
  useEffect(() => {
    fetchUserData();
    fetchRecentOrders();
    fetchWishlist();
    fetchAddresses();
    fetchPaymentMethods();
    fetchNotifications();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/user/profile');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders/recent');
      setRecentOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback data
      setRecentOrders([
        { 
          id: '#ORD001', 
          date: '25 July 2025', 
          items: 'Frozen Paneer Tikka, Premium Ice Cream, Chicken Nuggets', 
          status: 'Delivered', 
          amount: '₹1,250',
          deliveryDate: '26 July 2025',
          rating: 5
        },
        { 
          id: '#ORD002', 
          date: '20 July 2025', 
          items: 'Mixed Vegetables, Fish Fingers, Samosas', 
          status: 'In Transit', 
          amount: '₹840',
          deliveryDate: '22 July 2025',
          rating: null
        }
      ]);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get('/wishlist');
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      // Fallback data
      setWishlistItems([
        { id: 1, name: 'Premium Ice Cream Combo Pack', price: '₹599', originalPrice: '₹799', image: '🍦', discount: '25% off', inStock: true },
        { id: 2, name: 'Gourmet Fish Curry Ready Meal', price: '₹449', originalPrice: '₹529', image: '🐟', discount: '15% off', inStock: true },
        { id: 3, name: 'Assorted Momos Family Pack', price: '₹299', originalPrice: '₹399', image: '🥟', discount: '25% off', inStock: false }
      ]);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get('/addresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      // Fallback data
      setAddresses([
        { 
          id: 1, 
          type: 'Home', 
          name: 'John Doe',
          address: '123, MG Road, Indore, Madhya Pradesh 452001', 
          phone: '+91 98765 43210',
          isDefault: true 
        },
        { 
          id: 2, 
          type: 'Office', 
          name: 'John Doe',
          address: '456, Vijay Nagar, Indore, Madhya Pradesh 452010', 
          phone: '+91 98765 43211',
          isDefault: false 
        }
      ]);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await axiosInstance.get('/payment-methods');
      setPaymentMethods(response.data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      // Fallback data
      setPaymentMethods([
        { id: 1, type: 'Credit Card', brand: 'Visa', details: '**** **** **** 1234', expiry: '12/26', isDefault: true },
        { id: 2, type: 'UPI', brand: 'PhonePe', details: 'john@phonepe', expiry: null, isDefault: false }
      ]);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Fallback data
      setNotifications([
        { id: 1, title: 'Order Delivered Successfully', message: 'Your order #ORD001 has been delivered', time: '2 hours ago', read: false },
        { id: 2, title: 'New Discount Available', message: '25% off on all ice cream products', time: '1 day ago', read: true }
      ]);
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center ring-4 ring-white/20">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{userData.name}</h2>
              <p className="text-blue-100 text-sm sm:text-base">{userData.email}</p>
              <p className="text-xs sm:text-sm text-blue-200">Member since: {userData.joinDate}</p>
              <span className="inline-block bg-yellow-400/20 text-yellow-200 text-xs px-3 py-1 rounded-full mt-2 backdrop-blur-sm border border-yellow-400/30">
                {userData.membershipTier} Member
              </span>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all border border-white/30">
            <Edit3 className="w-4 h-4" />
            <span className="text-sm sm:text-base">Edit Profile</span>
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white p-3 sm:p-4 rounded-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm">Total Orders</p>
                <p className="text-lg sm:text-2xl font-bold">{userData.totalOrders}</p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-sm text-white p-3 sm:p-4 rounded-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm">Total Spent</p>
                <p className="text-lg sm:text-2xl font-bold">{userData.totalSpent}</p>
              </div>
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/80 to-purple-600/80 backdrop-blur-sm text-white p-3 sm:p-4 rounded-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm">Rewards</p>
                <p className="text-lg sm:text-2xl font-bold">{userData.loyaltyPoints}</p>
              </div>
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/80 to-orange-600/80 backdrop-blur-sm text-white p-3 sm:p-4 rounded-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs sm:text-sm">Wishlist</p>
                <p className="text-lg sm:text-2xl font-bold">{wishlistItems.length}</p>
              </div>
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Full Name</label>
            <input type="text" value={userData.name} className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Phone Number</label>
            <input type="text" value={userData.phone} className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Email Address</label>
            <input type="email" value={userData.email} className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Date of Birth</label>
            <input type="date" value={userData.dateOfBirth} className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm" />
          </div>
        </div>
        <button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium">
          Update Information
        </button>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Order History</h3>
          <select className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400">
            <option className="bg-blue-900 text-white">All Orders</option>
            <option className="bg-blue-900 text-white">Delivered</option>
            <option className="bg-blue-900 text-white">In Transit</option>
          </select>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-white/5 border border-white/20 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center space-x-4 mb-2 gap-2">
                    <span className="font-medium text-blue-300">{order.id}</span>
                    <span className="text-sm text-blue-200">{order.date}</span>
                    <span className="text-sm text-blue-200">Expected: {order.deliveryDate}</span>
                  </div>
                  <p className="text-white mb-2 text-sm sm:text-base">{order.items}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      order.status === 'Delivered' ? 'bg-green-500/30 text-green-200 border border-green-500/50' : 
                      order.status === 'In Transit' ? 'bg-blue-500/30 text-blue-200 border border-blue-500/50' : 
                      'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50'
                    }`}>
                      {order.status}
                    </span>
                    <span className="font-semibold text-white">{order.amount}</span>
                    {order.rating && (
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-200 hover:text-white border border-white/30 rounded bg-white/10 hover:bg-white/20 transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-blue-200 hover:text-white border border-white/30 rounded bg-white/10 hover:bg-white/20 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                  {order.status === 'Delivered' && (
                    <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm rounded hover:from-green-600 hover:to-green-700 transition-all">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white">My Wishlist ({wishlistItems.length} items)</h3>
          <button className="text-blue-300 hover:text-white transition-colors">Clear All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/20 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <div className="text-center mb-3">
                <div className="text-3xl sm:text-4xl mb-2">{item.image}</div>
                <h4 className="font-medium text-white mb-2 text-sm sm:text-base">{item.name}</h4>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg font-bold text-green-300">{item.price}</span>
                  <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                </div>
                <span className="inline-block bg-red-500/30 text-red-200 text-xs px-2 py-1 rounded mt-1 border border-red-500/50">
                  {item.discount}
                </span>
              </div>
              <div className="space-y-2">
                <button 
                  className={`w-full py-2 rounded font-medium transition-all ${
                    item.inStock 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700' 
                      : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!item.inStock}
                >
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="w-full py-2 border border-red-500/50 text-red-300 rounded hover:bg-red-500/20 font-medium transition-all">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Saved Addresses</h3>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
            <Plus className="w-4 h-4" />
            <span>Add Address</span>
          </button>
        </div>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white/5 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-white">{address.type}</span>
                    {address.isDefault && (
                      <span className="bg-green-500/30 text-green-200 text-xs px-2 py-1 rounded border border-green-500/50">Default</span>
                    )}
                  </div>
                  <p className="font-medium text-white">{address.name}</p>
                  <p className="text-blue-100 mb-1 text-sm sm:text-base">{address.address}</p>
                  <p className="text-blue-100 text-sm sm:text-base">{address.phone}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-200 hover:text-white border border-white/30 rounded bg-white/10 hover:bg-white/20 transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-300 hover:text-white border border-red-500/50 rounded bg-red-500/10 hover:bg-red-500/20 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Payment Methods</h3>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
            <Plus className="w-4 h-4" />
            <span>Add Payment</span>
          </button>
        </div>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white/5 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-200" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{method.type}</span>
                      <span className="text-sm text-blue-200">({method.brand})</span>
                      {method.isDefault && (
                        <span className="bg-green-500/30 text-green-200 text-xs px-2 py-1 rounded border border-green-500/50">Default</span>
                      )}
                    </div>
                    <p className="text-blue-100">{method.details}</p>
                    {method.expiry && <p className="text-sm text-blue-200">Expires: {method.expiry}</p>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-200 hover:text-white border border-white/30 rounded bg-white/10 hover:bg-white/20 transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-300 hover:text-white border border-red-500/50 rounded bg-red-500/10 hover:bg-red-500/20 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Notifications</h3>
          <button className="text-blue-300 hover:text-white transition-colors">Mark All Read</button>
        </div>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-4 rounded-lg border backdrop-blur-sm ${notification.read ? 'bg-white/5 border-white/20' : 'bg-blue-500/20 border-blue-500/50'}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{notification.title}</h4>
                  <p className="text-blue-100 text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-blue-200 mt-2">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm">
            <div>
              <h4 className="font-medium text-white">Email Notifications</h4>
              <p className="text-sm text-blue-200">Receive order updates via email</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">ON</button>
          </div>
          <div className="flex justify-between items-center p-4 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm">
            <div>
              <h4 className="font-medium text-white">SMS Notifications</h4>
              <p className="text-sm text-blue-200">Receive order updates via SMS</p>
            </div>
            <button className="bg-gray-600 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-500 transition-colors">OFF</button>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Security</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-white/20 rounded-lg hover:bg-white/10 flex justify-between items-center bg-white/5 backdrop-blur-sm transition-all">
            <div>
              <h4 className="font-medium text-white">Change Password</h4>
              <p className="text-sm text-blue-200">Update your account password</p>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-200" />
          </button>
          <button className="w-full text-left p-4 border border-white/20 rounded-lg hover:bg-white/10 flex justify-between items-center bg-white/5 backdrop-blur-sm transition-all">
            <div>
              <h4 className="font-medium text-white">Two-Factor Authentication</h4>
              <p className="text-sm text-blue-200">Add an extra layer of security</p>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-200" />
          </button>
        </div>
      </div>

      <div className="bg-red-500/10 backdrop-blur-sm rounded-xl shadow-xl border border-red-500/30 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-red-300">Danger Zone</h3>
        <button className="w-full text-left p-4 border border-red-500/50 rounded-lg hover:bg-red-500/20 flex justify-between items-center bg-red-500/10 backdrop-blur-sm transition-all">
          <div>
            <h4 className="font-medium text-red-300">Delete Account</h4>
            <p className="text-sm text-blue-200">Permanently delete your account and data</p>
          </div>
          <ChevronRight className="w-5 h-5 text-red-400" />
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'orders':
        return renderOrders();
      case 'wishlist':
        return renderWishlist();
      case 'addresses':
        return renderAddresses();
      case 'payments':
        return renderPayments();
      case 'notifications':
        return renderNotifications();
      case 'settings':
        return renderSettings();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold text-white">FrozenFresh</h1>
              <span className="text-blue-200">|</span>
              <span className="text-blue-100 text-sm sm:text-base">User Dashboard</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="relative p-2 text-blue-200 hover:text-white transition-colors">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">3</span>
              </button>
              <button className="hidden sm:flex items-center space-x-2 text-blue-200 hover:text-white transition-colors">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Account</span>
              </button>
              <button 
                className="sm:hidden p-2 text-blue-200 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          )}

          {/* Sidebar */}
          <div className={`lg:w-64 ${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 w-64 transform translate-x-0' : 'hidden lg:block'} transition-transform duration-300 ease-in-out`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-4 h-fit lg:sticky lg:top-8">
              {/* Mobile Close Button */}
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <span className="text-white font-semibold">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-blue-200 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white shadow-lg border border-white/30'
                          : 'text-blue-100 hover:bg-white/10 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.id === 'notifications' && notifications.filter(n => !n.read).length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {notifications.filter(n => !n.read).length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrozenFoodDashboard;