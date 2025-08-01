import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaSnowflake } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const res = await fetch("https://frozen-food-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",  // optional: only if you're using cookies
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    alert(`✅ Login successful as ${role}`);
    // optionally: redirect to dashboard or save token

  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};


  const fillDemoCredentials = (roleType) => {
    setRole(roleType);
    if (roleType === 'admin') {
      setFormData({
        email: 'admin@example.com',
        password: 'admin123'
      });
    } else {
      setFormData({
        email: 'user@example.com',
        password: 'user123'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header Section */}
        <div className="text-center transform transition-all duration-500 ease-out">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-full border border-white border-opacity-20 shadow-2xl">
              <FaSnowflake className="text-4xl text-cyan-300" style={{
                animation: 'spin 8s linear infinite'
              }} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-blue-100 text-sm">
            Sign in to continue to{' '}
            <span className="font-semibold text-cyan-300">FrozenFresh</span>
          </p>
          <p className="mt-3 text-xs text-blue-200">
            Don't have an account?{' '}
            <a 
              href="#" 
              className="font-medium text-cyan-300 hover:text-cyan-200 transition-colors duration-200 underline underline-offset-2"
            >
              Create one here
            </a>
          </p>
        </div>

        {/* Demo Credentials Card */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl p-6 shadow-2xl transform transition-all duration-300 hover:bg-opacity-15">
          <h3 className="text-sm font-semibold text-cyan-200 mb-4 flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
            Demo Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => fillDemoCredentials('user')}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <span className="group-hover:animate-pulse">👤 User Login</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('admin')}
              className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <span className="group-hover:animate-pulse">⚡ Admin Login</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 text-red-200 px-4 py-3 rounded-xl backdrop-blur-sm" style={{
                animation: 'shake 0.5s ease-in-out'
              }}>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div className="group">
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-4 w-4 text-blue-300 transition-colors duration-200" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 placeholder-blue-300 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-opacity-15"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-4 w-4 text-blue-300 transition-colors duration-200" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 placeholder-blue-300 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-opacity-15"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-blue-900 bg-gradient-to-r from-cyan-300 to-blue-300 hover:from-cyan-200 hover:to-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-900 mr-2"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <span className="group-hover:tracking-wide transition-all duration-200">
                  Sign In
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-blue-200">
            Secure login powered by FrozenFresh
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Login;