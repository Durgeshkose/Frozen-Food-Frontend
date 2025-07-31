import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaHome,
  FaBoxes,
  FaShoppingCart,
  FaSignOutAlt,
  FaSnowflake,
  FaChartBar,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile when screen size changes
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true); // Auto-open on desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    {
      path: '/admin',
      icon: FaChartBar,
      label: 'Overview',
      exact: true
    },
    {
      path: '/admin/products',
      icon: FaBoxes,
      label: 'Products'
    },
    {
      path: '/admin/orders',
      icon: FaShoppingCart,
      label: 'Orders'
    }
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Arrow Toggle Button - Positioned at center-left of screen */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-1/2 transform -translate-y-1/2 z-50 p-3 bg-white rounded-r-lg shadow-lg border border-l-0 border-gray-200 transition-all duration-300 hover:bg-gray-50 hover:shadow-xl ${
          isOpen ? 'left-64' : 'left-0'
        }`}
        style={{ 
          borderTopLeftRadius: '0', 
          borderBottomLeftRadius: '0',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isOpen ? (
          <FaChevronLeft className="text-gray-600 text-xl" />
        ) : (
          <FaChevronRight className="text-gray-600 text-xl" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isMobile ? '' : 'md:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
          <FaSnowflake className="text-2xl text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">FrozenFresh</h1>
            <p className="text-sm text-gray-600">Admin Panel</p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name || 'Admin'}</p>
              <p className="text-sm text-gray-600">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path, item.exact)
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mb-2"
          >
            <FaHome className="text-lg" />
            <span>Visit Site</span>
          </Link>

          <button
            onClick={() => {
              handleLogout();
              closeSidebar();
            }}
            className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content spacer for desktop */}
      {!isMobile && (
        <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`} />
      )}
    </>
  );
};

export default Sidebar;