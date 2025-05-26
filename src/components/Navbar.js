import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Clean navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/browse', label: 'Browse', icon: '🔍' },
    { path: '/submit', label: 'Submit', icon: '✨', highlight: true },
    { path: '/my-submissions', label: 'My Ideas', icon: '📋' }
  ];

  return (    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div 
            className={`flex items-center cursor-pointer group transition-all duration-200 hover:scale-105 px-2 py-2 rounded-lg hover:bg-white/10 ${
              isNavigating ? 'opacity-50' : ''
            }`}
            onClick={() => handleNavigation('/')}
          >
            <span className="text-3xl mr-2">💡</span>
            <span className="text-xl font-bold text-white tracking-wide">WantAnIdea</span>
            {isNavigating && (
              <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Navigation Items */}
            {navItems.map((item) => (
              <button 
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                disabled={isNavigating}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105
                  ${item.highlight 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md hover:shadow-lg' 
                    : isActive(item.path)
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'text-indigo-200 hover:bg-white/10 hover:text-white'
                  }
                  ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 ml-6 pl-6 border-l border-white/20">
              <button
                onClick={() => handleNavigation('/auth?mode=login')}
                disabled={isNavigating}
                className={`text-indigo-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 ${
                  isNavigating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => handleNavigation('/auth?mode=signup')}
                disabled={isNavigating}
                className={`bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 ${
                  isNavigating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-indigo-200 inline-flex items-center justify-center p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200 hover:bg-white/10"
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-indigo-700/95 border-t border-white/20">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Items */}
              {navItems.map((item) => (
                <button 
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center
                    ${item.highlight
                      ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-white border border-yellow-300/30'
                      : isActive(item.path) 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'text-indigo-200 hover:bg-white/10 hover:text-white border border-transparent'
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              {/* Auth Buttons */}
              <div className="border-t border-white/20 pt-4 space-y-3">
                <button 
                  onClick={() => handleNavigation('/auth?mode=signup')}
                  className="w-full bg-white text-indigo-700 px-4 py-3 rounded-lg font-bold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </button>
                <button 
                  onClick={() => handleNavigation('/auth?mode=login')}
                  className="w-full text-indigo-200 hover:text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-white/10 border border-transparent hover:border-white/20"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
