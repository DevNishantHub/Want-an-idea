import React from 'react';

const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/20 via-purple-700/20 to-pink-700/20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), 
                         radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="relative mb-6">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
              <span className="inline-block transform hover:rotate-12 transition-transform duration-300 mr-4">💡</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white">
                WantAnIdea
              </span>
            </h1>
            <div className="absolute inset-0 text-6xl md:text-7xl font-extrabold text-white/10 blur-sm">
              💡 WantAnIdea
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed font-medium">
            Discover and share <span className="text-yellow-200 font-bold">innovative</span> project ideas with a 
            <span className="text-pink-200 font-bold"> vibrant community</span> of creators and builders
          </p>
          
          {/* Floating Elements */}
          <div className="absolute top-8 left-1/4 text-3xl text-white/30 animate-bounce" style={{animationDelay: '0s'}}>⚡</div>
          <div className="absolute top-12 right-1/4 text-2xl text-white/30 animate-bounce" style={{animationDelay: '1s'}}>🎯</div>
          <div className="absolute bottom-8 left-1/3 text-4xl text-white/30 animate-bounce" style={{animationDelay: '2s'}}>🌟</div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent"></div>
    </header>
  );
};

export default Header;
