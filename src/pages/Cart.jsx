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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
              <FaShoppingBag className="mx-auto h-24 w-24 text-blue-200 mb-6 drop-shadow-lg" />
              <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Your cart is empty</h2>
              <p className="text-blue-100 mb-8 text-lg drop-shadow-sm">Looks like you haven't added any items yet.</p>
              <Link
                to="/user-dashboard"
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${cart.length}) - FrozenFresh`}</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-md text-center lg:text-left">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                {cart.map((item, index) => (
                  <div key={item._id} className={`p-6 ${index !== cart.length - 1 ? 'border-b border-white/20' : ''} hover:bg-white/5 transition-all duration-300`}>
                    <div className="flex items-center space-x-4">
                      <div className="relative group">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate drop-shadow-sm">{item.name}</h3>
                        <p className="text-sm text-blue-200 drop-shadow-sm">{item.category}</p>
                        <p className="text-lg font-bold text-cyan-300 mt-1 drop-shadow-sm">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => updateCartQuantity(item._id, item.quantity - 1)} 
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-110 backdrop-blur-sm"
                        >
                          <FaMinus className="text-sm text-blue-200" />
                        </button>
                        <span className="w-8 text-center font-bold text-white text-lg drop-shadow-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item._id, item.quantity + 1)} 
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-110 backdrop-blur-sm"
                        >
                          <FaPlus className="text-sm text-blue-200" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item._id)} 
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-full transition-all duration-300 hover:scale-110 border border-red-400/20 hover:border-red-400/40 backdrop-blur-sm" 
                        title="Remove from cart"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-blue-200 drop-shadow-sm">{item.quantity} × ₹{item.price}</span>
                      <span className="text-xl font-bold text-cyan-300 drop-shadow-sm">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 sticky top-24 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md text-center">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-blue-200 font-medium drop-shadow-sm">Subtotal</span>
                    <span className="font-bold text-white text-lg drop-shadow-sm">₹{total}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-blue-200 font-medium drop-shadow-sm">Delivery Fee</span>
                    <span className="font-bold text-lg drop-shadow-sm">
                      {deliveryFee === 0 ? 
                        <span className="text-green-400">Free</span> : 
                        <span className="text-white">₹{deliveryFee}</span>
                      }
                    </span>
                  </div>
                  
                  {total > 0 && total < 500 && (
                    <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-3 backdrop-blur-sm">
                      <p className="text-sm text-green-300 font-medium text-center drop-shadow-sm">
                        Add ₹{500 - total} more for free delivery! 🚚
                      </p>
                    </div>
                  )}
                  
                  <hr className="border-white/20 my-4" />
                  
                  <div className="flex justify-between text-xl font-bold py-3 bg-white/5 rounded-xl px-4 backdrop-blur-sm">
                    <span className="text-white drop-shadow-sm">Total</span>
                    <span className="text-cyan-300 drop-shadow-sm">₹{grandTotal}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleProceedToCheckout}
                  disabled={isPlacingOrder}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-bold text-lg flex items-center justify-center disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
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
                
                <div className="mt-6 text-center">
                  <Link 
                    to="/user-dashboard" 
                    className="text-blue-300 hover:text-cyan-300 text-sm transition-colors duration-300 font-medium drop-shadow-sm hover:drop-shadow-md"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;