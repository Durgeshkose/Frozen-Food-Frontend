import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSnowflake } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, cart, wishlist } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const navRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to detect background brightness
  const detectBackgroundBrightness = () => {
    if (!navRef.current) return;

    const rect = navRef.current.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1;
    canvas.height = 1;

    // Take a sample from behind the navbar
    try {
      const bodyRect = document.body.getBoundingClientRect();
      const sampleY = rect.top + rect.height / 2;
      const sampleX = rect.left + rect.width / 2;

      // Get computed style of body or main content
      const bodyStyles = window.getComputedStyle(document.body);
      const backgroundColor = bodyStyles.backgroundColor;
      
      // Parse RGB values
      const rgb = backgroundColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);
        
        // Calculate luminance using standard formula
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // If luminance is less than 0.5, it's a dark background
        setIsDarkBackground(luminance < 0.5);
      } else {
        // Check for common background classes or elements
        const mainContent = document.querySelector('main') || document.querySelector('.main-content') || document.body;
        const computedStyle = window.getComputedStyle(mainContent);
        const bgColor = computedStyle.backgroundColor;
        
        if (bgColor === 'rgb(0, 0, 0)' || bgColor.includes('rgb(') && bgColor.match(/\d+/g)?.every(val => parseInt(val) < 128)) {
          setIsDarkBackground(true);
        } else {
          setIsDarkBackground(false);
        }
      }
    } catch (error) {
      // Fallback: assume light background
      setIsDarkBackground(false);
    }
  };

  useEffect(() => {
    // Initial detection
    detectBackgroundBrightness();

    // Re-detect on scroll and resize
    const handleScroll = () => detectBackgroundBrightness();
    const handleResize = () => detectBackgroundBrightness();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Also check periodically in case background changes
    const interval = setInterval(detectBackgroundBrightness, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  // Dynamic classes based on background
  const textColorClass = isDarkBackground ? 'text-white' : 'text-gray-800';
  const linkColorClass = isDarkBackground ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600';
  const logoColorClass = isDarkBackground ? 'text-blue-400' : 'text-blue-600';
  const welcomeTextClass = isDarkBackground ? 'text-gray-200' : 'text-gray-700';
  const navBgClass = isDarkBackground ? 'bg-black/40' : 'bg-white/40';
  const mobileBgClass = isDarkBackground ? 'bg-black/50' : 'bg-white/50';
  const borderClass = isDarkBackground ? 'border-white/5' : 'border-white/10';

  return (
    <nav ref={navRef} className={`${navBgClass} backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b ${borderClass} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaSnowflake className={`${logoColorClass} text-2xl`} />
            <span className={`text-xl font-bold ${textColorClass}`}>FrozenFresh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`${linkColorClass} transition-colors`}
            >
              Home
            </Link>

            {user && user.role === "user" && (
              <>
                <Link
                  to="/user-dashboard"
                  className={`${linkColorClass} transition-colors`}
                >
                  Products
                </Link>
                <Link
                  to="/profile"
                  className={`${linkColorClass} transition-colors`}
                >
                  My Profile
                </Link>
                <Link
                  to="/order-history"
                  className={`${linkColorClass} transition-colors`}
                >
                  Orders
                </Link>
                <Link
                  to="/cart"
                  className={`relative ${linkColorClass} transition-colors`}
                >
                  <FaShoppingCart className="text-xl" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Link>
                <Link
                  to="/wishlist"
                  className={`relative ${linkColorClass} transition-colors`}
                >
                  <FaHeart className="text-xl" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </>
            )}

            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className={`${linkColorClass} transition-colors`}
              >
                Admin Dashboard
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <span className={welcomeTextClass}>Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`${isDarkBackground ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-medium transition-colors`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`${isDarkBackground ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg transition-colors`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${linkColorClass} focus:outline-none`}
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden ${mobileBgClass} backdrop-blur-xl border-t ${borderClass}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 ${linkColorClass} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {user && user.role === "user" && (
                <>
                  <Link
                    to="/user-dashboard"
                    className={`block px-3 py-2 ${linkColorClass} transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    to="/order-history"
                    className={`block px-3 py-2 ${linkColorClass} transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/profile"
                    className={`block px-3 py-2 ${linkColorClass} transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/cart"
                    className={`block px-3 py-2 ${linkColorClass} transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </Link>
                  <Link
                    to="/wishlist"
                    className={`block px-3 py-2 ${linkColorClass} transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wishlist ({wishlist.length})
                  </Link>
                </>
              )}

              {user && user.role === "admin" && (
                <Link
                  to="/admin"
                  className={`block px-3 py-2 ${linkColorClass} transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}

              {user ? (
                <div className="px-3 py-2 space-y-2">
                  <p className={welcomeTextClass}>Welcome, {user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/login"
                    className={`block w-full text-center ${isDarkBackground ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-medium transition-colors py-2`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`block w-full ${isDarkBackground ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg transition-colors text-center`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;