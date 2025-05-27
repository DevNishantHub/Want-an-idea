import React from 'react';

const Header = () => {
  return (    <header className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 shadow-2xl overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-yellow-100/20 to-pink-100/30"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), 
                         radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`
      }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="relative mb-6">            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-4 leading-tight">
              <span className="inline-block transform hover:rotate-12 transition-transform duration-300 mr-4">💡</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-orange-800 to-pink-800">
                WantAnIdea
              </span>
            </h1>
            <div className="absolute inset-0 text-6xl md:text-7xl font-extrabold text-orange-500/10 blur-sm">
              💡 WantAnIdea
            </div>
          </div>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Discover and share <span className="text-orange-600 font-bold">innovative</span> project ideas with a 
            <span className="text-pink-600 font-bold"> vibrant community</span> of creators and builders
          </p>          {/* Enhanced Floating Elements - Warm Theme */}
          <div className="absolute top-8 left-1/4 text-3xl text-orange-400/40 animate-bounce" style={{animationDelay: '0s'}}>⚡</div>
          <div className="absolute top-12 right-1/4 text-2xl text-pink-400/40 animate-bounce" style={{animationDelay: '1s'}}>🎯</div>
          <div className="absolute bottom-8 left-1/3 text-4xl text-yellow-400/40 animate-bounce" style={{animationDelay: '2s'}}>🌟</div>
        </div>
      </div>
        {/* Enhanced Bottom Gradient Fade - Warm Theme */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-100/30 to-transparent"></div>
    </header>
  );
};

export default Header;
