import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import { FaStar, FaHeart, FaShoppingCart, FaArrowLeft, FaMinus, FaPlus, FaSpinner } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found or an error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center animate-pulse">
          <FaSpinner className="animate-spin text-6xl text-cyan-400 mx-auto mb-6 drop-shadow-lg" />
          <h2 className="text-2xl font-semibold text-cyan-100 animate-bounce">Loading Product...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center p-8 backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
          <h2 className="text-3xl font-bold text-cyan-100 mb-6">{error || "Product not found"}</h2>
          <button
            onClick={() => navigate('/user-dashboard')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.some(item => item._id === product._id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleWishlistToggle = () => {
    setIsAddingToWishlist(true);
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
    setTimeout(() => setIsAddingToWishlist(false), 500);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} - FrozenFresh`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse top-10 left-10"></div>
          <div className="absolute w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse bottom-10 right-10 animation-delay-2s"></div>
          <div className="absolute w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animation-delay-4s"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-cyan-300 hover:text-cyan-100 mb-8 transition-all duration-300 font-medium transform hover:scale-105 group"
          >
            <FaArrowLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="relative">
              Back
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-fade-in-up">
            {/* Product Image */}
            <div className="relative backdrop-blur-lg bg-white/5 p-6 rounded-2xl shadow-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-indigo-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 w-full h-auto max-h-[500px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              {!product.inStock && (
                <div className="absolute inset-6 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-xl animate-pulse">
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
                    Out of Stock
                  </span>
                </div>
              )}
              <div className="absolute top-8 left-8 z-20">
                <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
                  product.category === 'Veg' ? 'bg-green-500/20 text-green-200 border-green-400/30' :
                  product.category === 'Non-Veg' ? 'bg-red-500/20 text-red-200 border-red-400/30' :
                  'bg-yellow-500/20 text-yellow-200 border-yellow-400/30'
                }`}>
                  {product.category}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center space-y-6 animate-fade-in-right">
              <h1 className="text-4xl lg:text-5xl font-bold text-cyan-100 mb-4 animate-slide-down">
                {product.name}
              </h1>

              <div className="flex items-center animate-fade-in">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl transition-all duration-300 hover:scale-125 ${
                        i < Math.floor(product.ratings || 0)
                          ? 'text-yellow-400 drop-shadow-lg animate-twinkle'
                          : 'text-slate-600'
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="ml-4 text-slate-300 font-medium">
                  {product.ratings || 0} ratings ({product.numReviews || 0} reviews)
                </span>
              </div>

              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                ₹{product.price}
              </div>

              <p className="text-slate-300 leading-relaxed text-lg backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
                {product.description}
              </p>

              <div className="flex items-center backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-cyan-200 mr-6 font-semibold text-lg">Quantity:</span>
                <div className="flex items-center backdrop-blur-md bg-white/10 rounded-xl border border-white/20 shadow-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-xl transform active:scale-95"
                    disabled={quantity <= 1}
                    aria-label="Decrement quantity"
                  >
                    <FaMinus className="text-cyan-200" />
                  </button>
                  <span className="px-6 py-3 border-x border-white/20 min-w-[80px] text-center font-bold text-cyan-100 text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-3 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-xl transform active:scale-95"
                    disabled={quantity >= product.stock}
                    aria-label="Increment quantity"
                  >
                    <FaPlus className="text-cyan-200" />
                  </button>
                </div>
                <span className="ml-6 text-sm text-slate-400 font-medium">{product.stock} available</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className={`flex-1 flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    product.inStock
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/25 hover:shadow-2xl active:scale-95'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  } ${isAddingToCart ? 'animate-pulse' : ''}`}
                >
                  {isAddingToCart ? (
                    <div className="flex items-center">
                      <FaSpinner className="animate-spin mr-3 text-xl" />
                      Adding...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FaShoppingCart className="mr-3 text-xl" />
                      Add to Cart
                    </div>
                  )}
                </button>

                <button
                  onClick={handleWishlistToggle}
                  disabled={isAddingToWishlist}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 border-2 flex items-center justify-center transform hover:scale-105 active:scale-95 ${
                    isInWishlist
                      ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-400/50 hover:from-red-500/30 hover:to-pink-500/30 backdrop-blur-md'
                      : 'bg-white/10 text-slate-300 border-white/30 hover:bg-white/20 backdrop-blur-md'
                  } ${isAddingToWishlist ? 'animate-pulse' : ''}`}
                  aria-label="Toggle Wishlist"
                >
                  <FaHeart className={`text-xl transition-all duration-300 ${isInWishlist ? 'text-red-400 animate-heartbeat' : 'hover:text-red-400'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in-right {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes twinkle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out 0.1s both;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .animation-delay-2s {
          animation-delay: 2s;
        }
        
        .animation-delay-4s {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default ProductDetails;