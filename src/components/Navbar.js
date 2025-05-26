import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}          <div 
            className="flex items-center cursor-pointer group transition-all duration-300 hover:scale-105" 
            onClick={() => navigate('/')}          >
            <span className="text-3xl transform group-hover:rotate-12 transition-all duration-300">💡</span>
            <span className="ml-3 text-xl font-bold text-white tracking-wide group-hover:text-yellow-200 transition-colors duration-300">WantAnIdea</span>
          </div>          {/* Chunked Navigation - Enhanced with Cognitive Bias Principles */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {/* Primary Actions Chunk - Enhanced with Social Proof */}
              <div className="flex items-center space-x-2 px-4 py-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <button 
                  onClick={() => navigate('/browse')}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive('/browse') 
                      ? 'text-white bg-white/30 shadow-md backdrop-blur-sm' 
                      : 'text-indigo-200 hover:bg-white/20 hover:text-white hover:shadow-sm'
                  }`}
                >
                  💡 Explore
                  {/* Social Proof Badge */}
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                    2.5K
                  </span>
                </button>
                <div className="w-px h-6 bg-white/30"></div>
                <button 
                  onClick={() => navigate('/submit')}
                  className={`relative px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isActive('/submit') 
                      ? 'text-white bg-gradient-to-r from-yellow-400/30 to-orange-400/30 shadow-md backdrop-blur-sm border border-yellow-300/50' 
                      : 'text-white bg-gradient-to-r from-yellow-400/20 to-orange-400/20 hover:from-yellow-400/30 hover:to-orange-400/30 hover:shadow-sm border border-yellow-300/30'
                  }`}
                >
                  ✨ Share Idea
                  {/* Urgency Badge - Scarcity Effect */}
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold animate-bounce">
                    HOT
                  </span>
                </button>
              </div>
                {/* Personal Management Chunk - Enhanced with Endowment Effect */}
              <div className="flex items-center">
                <button 
                  onClick={() => navigate('/my-submissions')}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive('/my-submissions') 
                      ? 'text-white bg-white/20 shadow-md backdrop-blur-sm border border-white/30' 
                      : 'text-indigo-200 hover:bg-white/10 hover:text-white hover:shadow-sm'
                  }`}
                >
                  📋 My Ideas
                  {/* Endowment Effect - Make users feel ownership */}
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    💎
                  </span>
                </button>
              </div>
            </div>
          </div>          {/* User Account Chunk - Enhanced with Social Proof */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-1 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <button 
                onClick={() => navigate('/auth?mode=login')}
                className="text-indigo-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/20 hover:shadow-sm transform hover:scale-105"
              >
                Sign In
              </button>
              <div className="w-px h-6 bg-white/30"></div>
              <button 
                onClick={() => navigate('/auth?mode=signup')}
                className="relative bg-gradient-to-r from-white to-yellow-100 text-indigo-700 hover:from-yellow-100 hover:to-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-white/20"
              >
                Sign Up
                {/* Social Proof for Sign Up - Bandwagon Effect */}
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                  5K+
                </span>
              </button>
            </div>
          </div>
            {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-indigo-200 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
            >
              <svg 
                className={`h-6 w-6 transform transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
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
        </div>        {/* Mobile Menu - Chunked Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-indigo-700/95 backdrop-blur-sm border-t border-white/20">
            <div className="px-4 py-4 space-y-6">              {/* Primary Actions Chunk - Enhanced with Social Proof */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3 flex items-center">
                  🚀 Explore & Create
                  <span className="ml-2 bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs font-bold">2.5K+ Active</span>
                </div>
                <button 
                  onClick={() => {
                    navigate('/browse');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/browse') 
                      ? 'text-white bg-white/20 border border-white/30' 
                      : 'text-indigo-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  💡 Explore Ideas
                  <span className="float-right text-xs text-green-300 font-bold">HOT</span>
                </button>
                
                <button 
                  onClick={() => {
                    navigate('/submit');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive('/submit') 
                      ? 'text-white bg-gradient-to-r from-yellow-400/30 to-orange-400/30 border border-yellow-300/50' 
                      : 'text-white bg-gradient-to-r from-yellow-400/20 to-orange-400/20 hover:from-yellow-400/30 hover:to-orange-400/30 border border-yellow-300/30'
                  }`}
                >
                  ✨ Share Your Idea
                  <span className="float-right text-xs text-red-300 font-bold animate-pulse">🔥 TRENDING</span>
                </button>
              </div>
                {/* Personal Management Chunk - Enhanced with Endowment Effect */}
              <div className="space-y-2 border-t border-white/20 pt-4">
                <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3 flex items-center">
                  📋 My Projects
                  <span className="ml-2 bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full text-xs font-bold">💎 Yours</span>
                </div>
                <button 
                  onClick={() => {
                    navigate('/my-submissions');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/my-submissions') 
                      ? 'text-white bg-white/20 border border-white/30' 
                      : 'text-indigo-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  📋 My Ideas
                  <span className="float-right text-xs text-purple-300 font-bold">Personal</span>
                </button>
              </div>
                {/* User Account Chunk - Enhanced with Social Proof */}
              <div className="space-y-2 border-t border-white/20 pt-4">
                <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3 flex items-center">
                  👤 Account
                  <span className="ml-2 bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs font-bold">5K+ Members</span>
                </div>
                <button 
                  onClick={() => {
                    navigate('/auth?mode=signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-white to-yellow-100 text-indigo-700 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg relative"
                >
                  Sign Up
                  <span className="float-right text-xs text-green-600 font-bold">JOIN NOW</span>
                </button>
                
                <button 
                  onClick={() => {
                    navigate('/auth?mode=login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-indigo-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
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
