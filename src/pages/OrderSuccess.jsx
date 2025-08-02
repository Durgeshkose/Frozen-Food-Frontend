import React, { useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle, FaShoppingBag, FaHistory } from 'react-icons/fa';

const OrderSuccess = () => {
  const { clearCart } = useAuth();
  const location = useLocation();
  // Data ab backend se aa raha hai
  const orderData = location.state?.orderData;

  useEffect(() => {
    // Sirf tabhi cart clear karein jab orderData ho
    if (orderData) {
      clearCart();
    }
  }, [clearCart, orderData]);

  // Agar koi orderData nahi hai, toh user ko dashboard par bhej dein
  if (!orderData) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Order Successful - FrozenFresh</title>
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FaCheckCircle className="text-3xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600">Thank you for your order. We'll deliver it fresh to your doorstep.</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              {/* FIX: Ab hum asli backend _id dikhayenge */}
              <p className="font-semibold text-gray-900">#{orderData._id.slice(-6).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-semibold text-gray-900">{orderData.paymentMethod}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivery Fee</p>
              <p className="font-semibold text-gray-900">{orderData.deliveryFee === 0 ? 'Free' : `₹${orderData.deliveryFee}`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="font-semibold text-blue-600 text-lg">₹{orderData.totalPrice}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Items Ordered ({orderData.orderItems.length})</h3>
            <div className="space-y-4">
              {orderData.orderItems.map((item) => (
                <div key={item._id} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/order-history" className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <FaHistory className="mr-2" />
            View Order History
          </Link>
          <Link to="/user-dashboard" className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
            <FaShoppingBag className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
