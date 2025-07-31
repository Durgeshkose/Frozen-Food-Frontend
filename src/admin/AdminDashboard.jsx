import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from './Sidebar';
import Overview from './Overview';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';

const Snowflake = ({ id }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: -5,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.6 + 0.4,
    drift: Math.random() * 2 - 1
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        ...prev,
        y: prev.y > 105 ? -5 : prev.y + prev.speed,
        x: prev.x + prev.drift * 0.1 + Math.sin(prev.y * 0.02) * 0.3
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed pointer-events-none select-none"
      style={{
        left: `${Math.max(0, Math.min(100, position.x))}%`,
        top: `${position.y}%`,
        fontSize: `${position.size}px`,
        opacity: position.opacity,
        zIndex: 1,
        color: '#ffffff',
        textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6)',
        filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.9))'
      }}
    >
      ❄
    </div>
  );
};

const AdminDashboard = () => {
  const [snowflakes] = useState(() =>
    Array.from({ length: 80 }, (_, i) => i)
  );
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - FrozenFresh</title>
        <meta name="description" content="Admin dashboard for FrozenFresh" />
      </Helmet>

      <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Snowfall Effect - Reduced on mobile for performance */}
        {(isMobile ? snowflakes.slice(0, 40) : snowflakes).map(id => (
          <Snowflake key={id} id={id} />
        ))}

        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 w-full md:ml-0 bg-gradient-to-b from-blue-900/40 to-slate-800/20 backdrop-blur-sm relative z-10">
          {/* Content Container with proper spacing */}
          <div className="min-h-screen w-full">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/orders" element={<OrderManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;