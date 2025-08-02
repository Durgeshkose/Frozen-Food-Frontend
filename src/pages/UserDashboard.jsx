import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { FaSearch, FaFilter, FaSpinner } from 'react-icons/fa';
import axiosInstance from '../utils/axiosInstance';

const UserDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    if (products.length === 0) return ['All'];
    return ['All', ...new Set(products.map(product => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearchTerm, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Products - FrozenFresh</title>
        <meta name="description" content="Browse our selection of premium frozen foods" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Welcome back, {user?.name || 'Guest'}!
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base">
              Discover our premium selection of frozen foods
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 border border-white/30 rounded-lg leading-5 bg-white/20 backdrop-blur-sm placeholder-blue-200 text-white focus:outline-none focus:placeholder-blue-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div className="w-full lg:w-48 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 border border-white/30 rounded-lg leading-5 bg-white/20 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-blue-900 text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid Header */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory} 
              <span className="text-blue-200 ml-2 text-sm sm:text-base">({filteredProducts.length})</span>
            </h2>
          </div>

          {/* Products Grid or Loading/Empty State */}
          {isLoading ? (
            <div className="text-center py-16 text-white flex items-center justify-center">
              <FaSpinner className="animate-spin mr-3 text-2xl" />
              <span>Loading Products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 sm:p-12 border border-white/20">
                <p className="text-blue-100 text-base sm:text-lg lg:text-xl">
                  {debouncedSearchTerm ? 
                    `No products found for "${debouncedSearchTerm}"` : 
                    `No products found in the ${selectedCategory} category`
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                // FIX: Use product._id for the key
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
