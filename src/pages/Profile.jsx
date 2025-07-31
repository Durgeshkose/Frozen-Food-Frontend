import React, { useState } from 'react';
import { User, ShoppingCart, Package, Heart, CreditCard, MapPin, Bell, Settings, Star, Calendar, Truck, Clock, ChevronRight, Eye, Download, Edit3, Plus, Trash2 } from 'lucide-react';

const FrozenFoodDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample user data
  const userData = {
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
  };

  const recentOrders = [
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
    },
    { 
      id: '#ORD003', 
      date: '15 July 2025', 
      items: 'Frozen Chicken, Mutton Keema, Prawns', 
      status: 'Delivered', 
      amount: '₹1,580',
      deliveryDate: '16 July 2025',
      rating: 4
    }
  ];

  const wishlistItems = [
    { id: 1, name: 'Premium Ice Cream Combo Pack', price: '₹599', originalPrice: '₹799', image: '🍦', discount: '25% off', inStock: true },
    { id: 2, name: 'Gourmet Fish Curry Ready Meal', price: '₹449', originalPrice: '₹529', image: '🐟', discount: '15% off', inStock: true },
    { id: 3, name: 'Assorted Momos Family Pack', price: '₹299', originalPrice: '₹399', image: '🥟', discount: '25% off', inStock: false },
    { id: 4, name: 'Frozen Pizza Collection', price: '₹899', originalPrice: '₹1199', image: '🍕', discount: '25% off', inStock: true }
  ];

  const addresses = [
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
  ];

  const paymentMethods = [
    { id: 1, type: 'Credit Card', brand: 'Visa', details: '**** **** **** 1234', expiry: '12/26', isDefault: true },
    { id: 2, type: 'Debit Card', brand: 'Mastercard', details: '**** **** **** 5678', expiry: '08/25', isDefault: false },
    { id: 3, type: 'UPI', brand: 'PhonePe', details: 'john@phonepe', expiry: null, isDefault: false }
  ];

  const notifications = [
    { id: 1, title: 'Order Delivered Successfully', message: 'Your order #ORD001 has been delivered', time: '2 hours ago', read: false },
    { id: 2, title: 'New Discount Available', message: '25% off on all ice cream products', time: '1 day ago', read: true },
    { id: 3, title: 'Loyalty Points Earned', message: 'You earned 50 points from your recent purchase', time: '2 days ago', read: true }
  ];

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
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-sm text-gray-500">Member since: {userData.joinDate}</p>
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1">
                {userData.membershipTier} Member
              </span>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Orders</p>
                <p className="text-2xl font-bold">{userData.totalOrders}</p>
              </div>
              <Package className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Spent</p>
                <p className="text-2xl font-bold">{userData.totalSpent}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Reward Points</p>
                <p className="text-2xl font-bold">{userData.loyaltyPoints}</p>
              </div>
              <Star className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Wishlist Items</p>
                <p className="text-2xl font-bold">{wishlistItems.length}</p>
              </div>
              <Heart className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" value={userData.name} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="text" value={userData.phone} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" value={userData.email} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input type="date" value={userData.dateOfBirth} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
            <select className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Gujarati">Gujarati</option>
            </select>
          </div>
        </div>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Update Information
        </button>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Order History</h3>
          <div className="flex space-x-2">
            <select className="border rounded-md px-3 py-2">
              <option>All Orders</option>
              <option>Delivered</option>
              <option>In Transit</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="font-medium text-blue-600">{order.id}</span>
                    <span className="text-sm text-gray-500">{order.date}</span>
                    <span className="text-sm text-gray-500">Expected: {order.deliveryDate}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{order.items}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <span className="font-semibold text-gray-800">{order.amount}</span>
                    {order.rating && (
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 border rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 border rounded">
                    <Download className="w-4 h-4" />
                  </button>
                  {order.status === 'Delivered' && !order.rating && (
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Rate
                    </button>
                  )}
                  {order.status === 'Delivered' && (
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">My Wishlist ({wishlistItems.length} items)</h3>
          <button className="text-blue-600 hover:text-blue-800">Clear All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-center mb-3">
                <div className="text-4xl mb-2">{item.image}</div>
                <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg font-bold text-green-600">{item.price}</span>
                  <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                </div>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-1">
                  {item.discount}
                </span>
              </div>
              <div className="space-y-2">
                <button 
                  className={`w-full py-2 rounded font-medium transition-colors ${
                    item.inStock 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!item.inStock}
                >
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="w-full py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 font-medium">
                  Remove from Wishlist
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Saved Addresses</h3>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-800">{address.type}</span>
                    {address.isDefault && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Default</span>
                    )}
                  </div>
                  <p className="font-medium text-gray-800">{address.name}</p>
                  <p className="text-gray-600 mb-1">{address.address}</p>
                  <p className="text-gray-600">{address.phone}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 border rounded">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 border rounded">
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>Add Payment Method</span>
          </button>
        </div>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{method.type}</span>
                      <span className="text-sm text-gray-500">({method.brand})</span>
                      {method.isDefault && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Default</span>
                      )}
                    </div>
                    <p className="text-gray-600">{method.details}</p>
                    {method.expiry && <p className="text-sm text-gray-500">Expires: {method.expiry}</p>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 border rounded">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 border rounded">
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button className="text-blue-600 hover:text-blue-800">Mark All as Read</button>
        </div>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-4 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{notification.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive order updates via email</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full">ON</button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-gray-500">Receive order updates via SMS</p>
            </div>
            <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full">OFF</button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Promotional Emails</h4>
              <p className="text-sm text-gray-500">Receive deals and offers</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full">ON</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Security</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
            <div>
              <h4 className="font-medium">Change Password</h4>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
        <button className="w-full text-left p-4 border border-red-300 rounded-lg hover:bg-red-50 flex justify-between items-center">
          <div>
            <h4 className="font-medium text-red-600">Delete Account</h4>
            <p className="text-sm text-gray-500">Permanently delete your account and data</p>
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">FrozenMart</h1>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600">User Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <User className="w-6 h-6" />
                <span>Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrozenFoodDashboard;