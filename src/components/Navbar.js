import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, LogOut } from 'lucide-react';

/**
 * SIMPLIFIED USER GUIDANCE & FEEDBACK OPTIMIZATION FOR NAVBAR:
 * 
 * 1. Clean & Focused Design:
 *    - Reduced visual clutter and cognitive load
 *    - Essential navigation only
 *    - Clear visual hierarchy
 * 
 * 2. Immediate Feedback (<100ms):
 *    - Subtle loading states
 *    - Active page indicators
 *    - Smooth transitions
 * 
 * 3. Mobile-First Responsive:
 *    - Clean mobile menu
 *    - Touch-friendly targets
 *    - Consistent experience
 */

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout, isLoading } = useAuth();  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
    const isActive = (path) => location.pathname === path;

  // Simplified navigation handler
  const handleNavigation = async (path) => {
    if (isActive(path)) return;
    
    setIsNavigating(true);
    setIsMobileMenuOpen(false);
    
    // Quick transition for better UX
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 100);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    handleNavigation('/');
  };

  // Clean navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/browse', label: 'Browse', icon: '🔍' },
    { path: '/submit', label: 'Submit', icon: '✨', highlight: true },
    { path: '/my-submissions', label: 'My Ideas', icon: '📋' }
  ];  return (
    <nav className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 shadow-2xl relative backdrop-blur-sm border-b border-orange-200">
      {/* Animated background elements to match HeroSection */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-yellow-300/10 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-orange-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating geometric shapes like HeroSection */}
        <div className="absolute top-4 left-10 w-8 h-8 bg-yellow-300/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-2 right-20 w-6 h-6 bg-orange-400/20 rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-6 right-1/4 w-4 h-4 bg-pink-400/25 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">          {/* Logo/Brand */}
          <div 
            className={`flex items-center cursor-pointer group transition-all duration-300 hover:scale-105 px-2 py-2 rounded-lg hover:bg-white/20 ${
              isNavigating ? 'opacity-50' : ''
            }`}
            onClick={() => handleNavigation('/')}
          >
            <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl shadow-lg group-hover:shadow-xl group-hover:shadow-orange-500/25 transition-all duration-300 mr-2">
              <span className="text-white text-xl animate-pulse">💡</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:via-red-500 group-hover:to-pink-500 transition-all duration-300 tracking-wide">
              WantAnIdea
            </span>
            {isNavigating && (
              <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Navigation Items */}
            {navItems.map((item) => (
              <button 
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                disabled={isNavigating}                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm
                  ${item.highlight 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/25 border border-orange-400/30' 
                    : isActive(item.path)
                      ? 'bg-gradient-to-r from-orange-500/20 to-pink-600/20 text-orange-800 shadow-lg border border-orange-400/40'
                      : 'text-orange-700 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-600/10 hover:text-orange-800 border border-transparent hover:border-orange-400/20'
                  }
                  ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}            {/* Auth Section */}
            <div className="flex items-center space-x-2 ml-6 pl-6 border-l border-orange-400/30">
              {isAuthenticated ? (
                /* User Profile Button - Direct Navigation to Account */
                <>
                  <button
                    onClick={() => handleNavigation('/account')}
                    disabled={isNavigating}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-600/10 backdrop-blur-sm border border-transparent hover:border-orange-400/20 ${
                      isNavigating ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {user?.profilePicture ? (
                        <img 
                          src={user.profilePicture} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-orange-400/30"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white text-sm font-semibold">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                      <span className="text-orange-700 hidden sm:block">{user?.name}</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    disabled={isNavigating}
                    className={`text-red-600 hover:text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-600/10 backdrop-blur-sm border border-transparent hover:border-red-400/20 ${
                      isNavigating ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                /* Auth Buttons for Non-authenticated Users */
                <>
                  <button
                    onClick={() => handleNavigation('/auth?mode=login')}
                    disabled={isNavigating}
                    className={`text-orange-700 hover:text-orange-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-600/10 backdrop-blur-sm border border-transparent hover:border-orange-400/20 ${
                      isNavigating ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => handleNavigation('/auth?mode=signup')}
                    disabled={isNavigating}
                    className={`bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-400 hover:to-red-500 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transform hover:scale-105 border border-orange-400/30 ${
                      isNavigating ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-orange-700 hover:text-orange-800 inline-flex items-center justify-center p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors duration-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-600/10 backdrop-blur-sm border border-transparent hover:border-orange-400/20"
              aria-label="Toggle menu"
            >
              <svg 
                className="h-6 w-6" 
                stroke="currentColor" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-br from-yellow-100/95 via-orange-100/95 to-pink-100/95 border-t border-orange-300/30 backdrop-blur-sm">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Items */}
              {navItems.map((item) => (
                <button 
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center backdrop-blur-sm
                    ${item.highlight
                      ? 'bg-gradient-to-r from-orange-500/20 to-red-600/20 text-orange-900 border border-orange-400/40 shadow-lg'
                      : isActive(item.path) 
                        ? 'bg-gradient-to-r from-orange-500/15 to-pink-600/15 text-orange-800 border border-orange-400/30 shadow-md' 
                        : 'text-orange-700 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-600/10 hover:text-orange-800 border border-transparent hover:border-orange-400/20'
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
                {/* Auth Section for Mobile */}
              <div className="border-t border-orange-400/30 pt-4 space-y-3">                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => handleNavigation('/account')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-orange-500/10 to-pink-600/10 rounded-lg border border-orange-400/20 transition-all duration-300 hover:from-orange-500/15 hover:to-pink-600/15"
                    >
                      <div className="flex items-center space-x-3">
                        {user?.profilePicture ? (
                          <img 
                            src={user.profilePicture} 
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-orange-400/30"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white font-semibold">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                        <div className="text-left">
                          <div className="font-semibold text-gray-800">{user?.name}</div>
                          <div className="text-sm text-gray-600">{user?.email}</div>
                        </div>
                      </div>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-600/10 border border-transparent hover:border-red-400/20 text-red-600"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleNavigation('/auth?mode=signup')}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:from-orange-400 hover:to-red-500 border border-orange-400/30"
                    >
                      Sign Up
                    </button>
                    <button 
                      onClick={() => handleNavigation('/auth?mode=login')}
                      className="w-full text-orange-700 hover:text-orange-800 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-pink-600/10 border border-transparent hover:border-orange-400/20 backdrop-blur-sm"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
