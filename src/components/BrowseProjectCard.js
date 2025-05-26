import React from 'react';
import { useNavigate } from 'react-router-dom';

const BrowseProjectCard = ({ idea }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${idea.id}`);
  };

  const handleLearnMoreClick = (e) => {
    e.stopPropagation();
    navigate(`/project/${idea.id}`);
  };
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 shadow-sm';
      case 'Intermediate':
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-300 shadow-sm';
      case 'Advanced':
        return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-300 shadow-sm';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-300 shadow-sm';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-300 shadow-sm',
      'Health': 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-300 shadow-sm',
      'Education': 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border border-purple-300 shadow-sm',
      'Environment': 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-300 shadow-sm',
      'Entertainment': 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-300 shadow-sm',
      'Community': 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border border-cyan-300 shadow-sm',
      'Business': 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-300 shadow-sm',
      'Lifestyle': 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border border-rose-300 shadow-sm'
    };
    return colors[category] || 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-300 shadow-sm';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

    return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 cursor-pointer hover:scale-105 transform overflow-hidden backdrop-blur-sm"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        {/* Header with Category, Difficulty and Social Proof */}
      <div className="relative z-20 p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-4 py-2 rounded-full text-xs font-semibold ${getCategoryColor(idea.category)} transition-all duration-300 hover:scale-105`}>
              {idea.category}
            </span>
            {/* Social Proof Badge for Popular Items */}
            {idea.likes > 150 && (
              <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-300 rounded-full text-xs font-bold animate-pulse">
                🔥 HOT
              </span>
            )}
          </div>
          <span className={`px-4 py-2 rounded-full text-xs font-semibold ${getDifficultyColor(idea.difficulty)} transition-all duration-300 hover:scale-105`}>
            {idea.difficulty}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 px-6 pb-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 leading-tight pr-2 group-hover:text-indigo-700 transition-colors duration-300">
            {idea.title}
          </h3>
          <span className="text-2xl flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">💡</span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
          {idea.description}
        </p>        {/* Enhanced Project Stats with Social Proof */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 text-xs">
            {/* Likes with Social Proof Emphasis */}
            <div className={`flex items-center gap-2 transition-colors duration-300 ${
              idea.likes > 100 ? 'text-red-600 font-bold' : 'text-gray-500 group-hover:text-red-500'
            }`}>
              <svg className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">{idea.likes}</span>
              {idea.likes > 100 && <span className="text-red-600">♥</span>}
            </div>
            
            {/* Views with Popularity Indicator */}
            <div className={`flex items-center gap-2 transition-colors duration-300 ${
              idea.views > 500 ? 'text-indigo-600 font-bold' : 'text-gray-500 group-hover:text-indigo-500'
            }`}>
              <svg className="w-4 h-4 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-semibold">{idea.views}</span>
              {idea.views > 500 && <span className="text-indigo-600">👁</span>}
            </div>
            
            {/* Date with Recency Effect */}
            <div className="flex items-center gap-2 group-hover:text-purple-500 transition-colors duration-300">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">{formatDate(idea.datePosted)}</span>
            </div>
          </div>
          
          {/* Scarcity Indicator */}
          {idea.likes > 150 && (
            <div className="text-xs text-orange-600 font-bold">
              🚀 Trending!
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-300 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            Innovative
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            Practical
          </span>
          {idea.difficulty === 'Beginner' && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              Beginner Friendly
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
            Click to view details
          </div>
          <button 
            onClick={handleLearnMoreClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Learn More
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowseProjectCard;
