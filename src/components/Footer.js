import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Animated Metric Counter
const MetricCounter = ({ value, label, icon, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayValue(prev => {
        if (prev < value) {
          const increment = Math.ceil((value - prev) / 20);
          return prev + increment;
        }
        return value;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
      <div className="text-3xl mb-2 group-hover:animate-bounce">{icon}</div>
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-mono">
        {displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-slate-400 font-medium">{label}</div>
    </div>
  );
};

// Newsletter Signup Component
const NewsletterSignup = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      if (onSubmit) {
        onSubmit('Thanks for joining our innovation community! 🚀', 'success');
      }
    }, 1000);
  };
  if (isSubscribed) {
    return (
      <div className="text-center bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-6 rounded-2xl border border-emerald-500/30 backdrop-blur-xl">
        <div className="text-4xl mb-2 animate-bounce">🎉</div>
        <div className="text-lg font-bold text-emerald-400 mb-2">You're In!</div>
        <div className="text-sm text-emerald-300">Get ready for amazing ideas in your inbox!</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-display mb-2">
          🚀 Join the Innovation Network
        </h3>
        <p className="text-slate-300 text-sm">
          Get weekly doses of creativity, trending ideas, and success stories
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-slate-700/50 backdrop-blur-sm text-white placeholder-slate-400"
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            ✉️
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!email || isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Launching...</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>Launch My Subscription</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="footer-grid" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.5" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)"/>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Innovation Metrics Dashboard */}
        <div className="mb-16">          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-display mb-4">
              🌟 Innovation Hub Metrics
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Real-time data from our thriving community of creators, builders, and dreamers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <MetricCounter value={2847} label="Active Ideas" icon="💡" />
            <MetricCounter value={1250} label="Creators" icon="👨‍💻" />
            <MetricCounter value={456} label="Prototypes" icon="🔧" />
            <MetricCounter value={89} label="Launched" icon="🚀" />
          </div>          {/* Innovation Pipeline - Dark Theme */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-display mb-4 text-center">
              🚀 Innovation Pipeline
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: '💭', label: 'Ideas', count: 2847, color: 'text-purple-400' },
                { icon: '🔬', label: 'Prototypes', count: 456, color: 'text-blue-400' },
                { icon: '🚀', label: 'Launched', count: 89, color: 'text-green-400' },
                { icon: '🌟', label: 'Successful', count: 23, color: 'text-yellow-400' }
              ].map((stage, index) => (
                <div key={stage.label} className="text-center relative">
                  <div className={`text-3xl mb-2 ${stage.color} animate-pulse`} style={{ animationDelay: `${index * 0.2}s` }}>
                    {stage.icon}
                  </div>
                  <div className="text-xl font-bold text-white font-mono">
                    {stage.count}
                  </div>
                  <div className="text-xs text-slate-400">{stage.label}</div>
                  
                  {/* Connection line - Dark Theme */}
                  {index < 3 && (
                    <div className="absolute top-8 -right-6 w-12 h-0.5 bg-gradient-to-r from-slate-600 to-slate-700 hidden md:block">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-slate-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-display">WantAnIdea</h3>
                <p className="text-slate-400 text-sm">Where innovation begins</p>
              </div>
            </div>
              <p className="text-slate-300 leading-relaxed">
              Empowering creators worldwide to share, discover, and build upon amazing ideas. 
              Share your concepts freely and find inspiration from our community of innovators.
            </p>

            <div className="flex space-x-4">
              {['💬', '🐦', '📷', '💼'].map((emoji, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 hover:scale-110 hover:shadow-lg border border-slate-600/50"
                >
                  <span className="text-lg">{emoji}</span>
                </button>
              ))}
            </div>
          </div>          {/* Quick Links - Dark Theme */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-display">🚀 Quick Launch</h3>
            <div className="space-y-3">
              {[
                { label: 'Explore Ideas', path: '/browse', icon: '🔍' },
                { label: 'Submit Your Idea', path: '/submit', icon: '✨' },
                { label: 'My Laboratory', path: '/my-submissions', icon: '🧪' },
                { label: 'About Mission', path: '/About', icon: '🎯' }              ].map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className={link.path === '/About' 
                    ? "text-gray-300 hover:text-white transition-colors duration-300 text-sm block py-1 hover:bg-gray-700/30 rounded px-2"
                    : "flex items-center space-x-3 text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                  }
                >
                  {link.path === '/About' ? (
                    `${link.icon} ${link.label}`
                  ) : (
                    <>
                      <span className="group-hover:animate-bounce">{link.icon}</span>
                      <span className="group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent">{link.label}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterSignup onSubmit={showToastMessage} />
          </div>
        </div>        {/* Bottom Bar - Dark Theme */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {currentYear} WantAnIdea. All rights reserved. Built with 💡 and ☕
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-slate-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="text-slate-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </button>
              <button className="text-slate-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>      {/* Toast Notification - Dark Theme */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
          <div className={`rounded-xl px-6 py-4 shadow-2xl backdrop-blur-xl border ${
            toastType === 'success' ? 'bg-gradient-to-r from-emerald-500/90 to-green-600/90 text-white border-emerald-400/30' :
            toastType === 'info' ? 'bg-gradient-to-r from-blue-500/90 to-indigo-600/90 text-white border-blue-400/30' :
            'bg-gradient-to-r from-slate-600/90 to-slate-700/90 text-white border-slate-500/30'
          } max-w-sm`}>
            <div className="flex items-center space-x-3">
              <span className="text-xl">
                {toastType === 'success' ? '🎉' : toastType === 'info' ? 'ℹ️' : '⚠️'}
              </span>
              <span className="font-medium">{toastMessage}</span>
              <button 
                onClick={() => setShowToast(false)}
                className="ml-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
