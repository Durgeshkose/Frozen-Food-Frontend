import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  // FIX: Check for product._id in wishlist
  const isInWishlist = wishlist.some(item => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    addToCart(product); // Assuming addToCart takes the whole product object
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    setIsAddingToWishlist(true);
    
    if (isInWishlist) {
      // FIX: Use product._id to remove from wishlist
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
    
    setTimeout(() => setIsAddingToWishlist(false), 500);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* FIX: Link to product details using product._id */}
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative">
          {/* Image container */}
          <div className="aspect-square overflow-hidden bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                Out of Stock
              </span>
            </div>
          )}
          
          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            disabled={isAddingToWishlist}
            className={`absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm border transition-all duration-200 hover:scale-110 ${
              isInWishlist
                ? 'text-red-500 border-red-200'
                : 'text-gray-400 hover:text-red-500 border-gray-200'
            } ${isAddingToWishlist ? 'opacity-50' : ''}`}
            aria-label="Toggle Wishlist"
          >
            <FaHeart className="text-xs" />
          </button>
          
          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
              product.category === 'Veg' ? 'bg-green-100 text-green-700' :
              product.category === 'Non-Veg' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {product.category}
            </span>
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating and reviews */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xs ${
                    // FIX: Use 'ratings' to match backend data
                    i < Math.floor(product.ratings || 0)
                      ? 'text-orange-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {/* FIX: Use 'numReviews' to match backend data */}
            <span className="ml-1 text-xs text-gray-500">
              ({product.numReviews || 0})
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-3">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
          </div>
        </div>
      </Link>
      
      {/* Add to cart button */}
      <div className="px-3 pb-3">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
          className={`w-full py-2 rounded text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1 ${
            product.inStock
              ? 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } ${isAddingToCart ? 'opacity-75' : ''}`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <FaShoppingCart className="text-xs" />
              <span>ADD TO CART</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
