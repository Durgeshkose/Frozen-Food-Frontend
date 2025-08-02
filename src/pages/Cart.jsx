import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { FaMinus, FaPlus, FaTrash, FaShoppingBag, FaSpinner } from 'react-icons/fa';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder } = useAuth();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = total > 500 ? 0 : 50;
  const grandTotal = total + deliveryFee;

  const handleProceedToCheckout = async () => {
    setIsPlacingOrder(true);
    try {
      const newOrder = await placeOrder({
        orderItems: cart,
        subTotal: total,
        deliveryFee: deliveryFee,
        totalPrice: grandTotal,
        paymentMethod: 'Cash on Delivery',
      });

      navigate('/order-success', { 
        state: { orderData: newOrder }
      });

    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Order place nahi ho saka. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - FrozenFresh</title>
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <FaShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items yet.</p>
          <Link
            to="/user-dashboard"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        {/* FIX: Use template literal to create a single string for the title */}
        <title>{`Shopping Cart (${cart.length}) - FrozenFresh`}</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cart.map((item, index) => (
                <div key={item._id} className={`p-6 ${index !== cart.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-lg font-semibold text-blue-600 mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => updateCartQuantity(item._id, item.quantity - 1)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <FaMinus className="text-sm text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item._id, item.quantity + 1)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <FaPlus className="text-sm text-gray-600" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Remove from cart">
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{item.quantity} × ₹{item.price}</span>
                    <span className="text-lg font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">{deliveryFee === 0 ? <span className="text-green-600">Free</span> : `₹${deliveryFee}`}</span>
                </div>
                {total > 0 && total < 500 && (
                  <p className="text-sm text-green-600">Add ₹{500 - total} more for free delivery!</p>
                )}
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
              <button
                onClick={handleProceedToCheckout}
                disabled={isPlacingOrder}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50"
              >
                {isPlacingOrder ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Placing Order...
                  </>
                ) : (
                  "Proceed to Checkout (COD)"
                )}
              </button>
              <div className="mt-4 text-center">
                <Link to="/user-dashboard" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
