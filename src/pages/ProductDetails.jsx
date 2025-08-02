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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Loading Product...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Product not found"}</h2>
          <button
            onClick={() => navigate('/user-dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-[500px] object-contain rounded-lg"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                    Out of Stock
                  </span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.category === 'Veg' ? 'bg-green-100 text-green-800' :
                  product.category === 'Non-Veg' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {product.category}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.ratings || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-gray-600">
                  {product.ratings || 0} ratings ({product.numReviews || 0} reviews)
                </span>
              </div>

              <div className="text-4xl font-bold text-blue-600 mb-6">
                ₹{product.price}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center mb-6">
                <span className="text-gray-700 mr-4 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2.5 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                    aria-label="Decrement quantity"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="px-5 py-2 border-x border-gray-300 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2.5 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= product.stock}
                    aria-label="Increment quantity"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                <span className="ml-4 text-sm text-gray-500">{product.stock} available</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } ${isAddingToCart ? 'opacity-75' : ''}`}
                >
                  {isAddingToCart ? (
                    <div className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Adding...
                    </div>
                  ) : (
                    <><FaShoppingCart className="mr-2" />Add to Cart</>
                  )}
                </button>

                <button
                  onClick={handleWishlistToggle}
                  disabled={isAddingToWishlist}
                  className={`px-5 py-3 rounded-lg font-medium transition-colors border-2 flex items-center justify-center ${
                    isInWishlist
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  } ${isAddingToWishlist ? 'opacity-50' : ''}`}
                  aria-label="Toggle Wishlist"
                >
                  <FaHeart className={`inline ${isInWishlist ? 'text-red-600' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
