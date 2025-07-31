import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    addToCart(product);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    setIsAddingToWishlist(true);
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    
    setTimeout(() => setIsAddingToWishlist(false), 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.category === 'Veg' ? 'bg-green-100 text-green-800' :
              product.category === 'Non-Veg' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>
          
          <span className="text-xl font-bold text-blue-600">
            ₹{product.price}
          </span>
        </div>
      </Link>
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex space-x-2">
          <button
            onClick={handleWishlistToggle}
            disabled={isAddingToWishlist}
            className={`p-2 rounded-full transition-colors ${
              isInWishlist
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } ${isAddingToWishlist ? 'opacity-50' : ''}`}
          >
            <FaHeart className="text-sm" />
          </button>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              product.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } ${isAddingToCart ? 'opacity-50' : ''}`}
          >
            {isAddingToCart ? (
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <FaShoppingCart />
                <span>Add</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;