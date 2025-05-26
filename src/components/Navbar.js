import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * FITTS'S LAW OPTIMIZATIONS APPLIED TO NAVBAR:
 * 
 * 1. Target Size Enhancement:
 *    - Desktop buttons: Minimum 44px height with enhanced widths
 *    - Mobile menu items: Minimum 56px height for better touch targeting
 *    - Logo area: Larger clickable region with padding
 *    - Mobile hamburger: Enhanced to 48px touch target
 * 
 * 2. Proximity and Ordering:
 *    - Primary actions (most used) positioned prominently with largest sizes
 *    - Secondary actions grouped with medium sizing
 *    - Authentication actions positioned last with clear visual separation
 *    - Mobile menu ordered by usage frequency
 * 
 * 3. Mobile-Specific Optimizations:
 *    - All touch targets 56px+ for thumb-friendly navigation
 *    - Adequate spacing between menu items
 *    - Priority-ordered buttons (Sign Up larger than Sign In)
 *    - Enhanced visual feedback on touch
 * 
 * These optimizations work together with Cognitive Load Theory principles
 * to create an intuitive, efficient navigation experience.
 */

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  // Cognitive Load Theory: Simplified navigation structure
  const navigationSections = {
    primary: [
      { 
        path: '/browse', 
        label: 'Explore Ideas', 
        icon: '💡',
        description: 'Discover projects',
        isHighlight: false
      },
      { 
        path: '/submit', 
        label: 'Share Idea', 
        icon: '✨',
        description: 'Add your project',
        isHighlight: true
      }
    ],
    secondary: [
      { 
        path: '/my-submissions', 
        label: 'My Ideas', 
        icon: '📋',
        description: 'Your projects',
        isHighlight: false
      }
    ]
  };  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">          {/* Logo/Brand - Fitts's Law: Larger clickable area */}
          <div 
            className="flex items-center cursor-pointer group transition-all duration-200 hover:scale-105 px-2 py-2 rounded-lg hover:bg-white/10" 
            onClick={() => navigate('/')}
            style={{ minWidth: '160px', minHeight: '48px' }} // Fitts's Law: Larger target area
          >
            <span className="text-3xl mr-2">💡</span>
            <span className="text-xl font-bold text-white tracking-wide">WantAnIdea</span>
          </div>

          {/* Desktop Navigation - Fitts's Law: Optimized button sizes and spacing */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {/* Primary Actions - Fitts's Law: Larger buttons for frequent actions */}
              <div className="flex items-center space-x-2 mr-6">
                {navigationSections.primary.map((item) => (
                  <button 
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`
                      min-w-[120px] min-h-[44px] px-6 py-3 rounded-lg text-base font-semibold transition-all duration-200 transform hover:scale-105
                      ${item.isHighlight 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md hover:shadow-lg hover:scale-110' 
                        : isActive(item.path)
                          ? 'bg-white/20 text-white shadow-sm scale-105'
                          : 'text-indigo-200 hover:bg-white/10 hover:text-white'
                      }
                    `}
                    style={{ minWidth: '120px', minHeight: '44px' }} // Fitts's Law: Minimum touch target
                  >
                    <span className="mr-2 text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Secondary Actions - Fitts's Law: Medium-sized buttons */}
              <div className="flex items-center space-x-2 mr-6">
                {navigationSections.secondary.map((item) => (
                  <button 
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`
                      min-w-[100px] min-h-[44px] px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105
                      ${isActive(item.path)
                        ? 'bg-white/15 text-white border border-white/20 scale-105'
                        : 'text-indigo-200 hover:bg-white/10 hover:text-white'
                      }
                    `}
                    style={{ minWidth: '100px', minHeight: '44px' }} // Fitts's Law: Adequate touch target
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* User Actions - Fitts's Law: Grouped with adequate spacing */}
              <div className="flex items-center space-x-2 pl-6 border-l border-white/20">
                <button                  onClick={() => navigate('/auth?mode=login')}
                  className="min-w-[80px] min-h-[44px] text-indigo-200 hover:text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 transform hover:scale-105"
                  style={{ minWidth: '80px', minHeight: '44px' }} // Fitts's Law: Minimum touch target
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/auth?mode=signup')}
                  className="min-w-[90px] min-h-[44px] bg-white text-indigo-700 hover:bg-indigo-50 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                  style={{ minWidth: '90px', minHeight: '44px' }} // Fitts's Law: Larger signup button
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button - Fitts's Law: Larger touch target */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-w-[48px] min-h-[48px] text-white hover:text-indigo-200 inline-flex items-center justify-center p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200 hover:bg-white/10"
              aria-label="Toggle menu"
              style={{ minWidth: '48px', minHeight: '48px' }} // Fitts's Law: Larger touch target for mobile
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
        </div>        {/* Mobile Menu - Fitts's Law: Larger touch targets and better spacing */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-indigo-700/95 border-t border-white/20">
            <div className="px-4 py-6 space-y-6">
              
              {/* Primary Actions Section - Fitts's Law: Most used items first with larger targets */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">
                  Main Actions
                </div>
                {navigationSections.primary.map((item) => (
                  <button 
                    key={item.path}                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full min-h-[56px] text-left px-6 py-4 rounded-lg transition-all duration-200 flex items-center hover:scale-105 transform
                      ${item.isHighlight
                        ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-white border-2 border-yellow-300/30 shadow-md'
                        : isActive(item.path) 
                          ? 'bg-white/20 text-white border-2 border-white/30 shadow-sm' 
                          : 'text-indigo-200 hover:bg-white/10 hover:text-white border-2 border-transparent'
                      }
                    `}
                    style={{ minHeight: '56px' }} // Fitts's Law: Larger touch targets for mobile
                  >
                    <span className="mr-4 text-xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-base">{item.label}</div>
                      <div className="text-sm opacity-75">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>              {/* Secondary Actions Section - Fitts's Law: Enhanced touch targets */}
              <div className="space-y-3 border-t border-white/20 pt-6">
                <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">
                  Your Content
                </div>
                {navigationSections.secondary.map((item) => (
                  <button 
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full min-h-[56px] text-left px-6 py-4 rounded-lg transition-all duration-200 flex items-center hover:scale-105 transform
                      ${isActive(item.path) 
                        ? 'bg-white/20 text-white border-2 border-white/30 shadow-sm' 
                        : 'text-indigo-200 hover:bg-white/10 hover:text-white border-2 border-transparent'
                      }
                    `}
                    style={{ minHeight: '56px' }} // Fitts's Law: Larger touch targets for mobile
                  >
                    <span className="mr-4 text-xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-base">{item.label}</div>
                      <div className="text-sm opacity-75">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Authentication Section - Fitts's Law: Priority-ordered buttons */}
              <div className="space-y-3 border-t border-white/20 pt-6">
                <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">
                  Account
                </div>
                <button 
                  onClick={() => {
                    navigate('/auth?mode=signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[56px] bg-white text-indigo-700 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  style={{ minHeight: '56px' }} // Fitts's Law: Large primary action button
                >
                  Sign Up
                </button>
                <button 
                  onClick={() => {
                    navigate('/auth?mode=login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[56px] text-indigo-200 hover:text-white px-6 py-4 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-white/10 border-2 border-transparent hover:border-white/20"
                  style={{ minHeight: '56px' }} // Fitts's Law: Large secondary action button
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
