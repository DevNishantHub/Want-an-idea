import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ idea }) => {
  const navigate = useNavigate();  const handleCardClick = () => {
    navigate(`/project/${idea.id}`);
  };

  const handleLearnMoreClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    navigate(`/project/${idea.id}`);
  };  return (    <div 
      onClick={handleCardClick}
      className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-orange-200 cursor-pointer hover:scale-105 transform select-none relative overflow-hidden"
      style={{ userSelect: 'none' }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      {/* Floating elements to match HeroSection */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-300/30 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-orange-400/20 rotate-45 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/2 right-4 w-2 h-2 bg-pink-400/25 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
      
      {/* Content */}
      <div className="relative z-10">        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-orange-700 transition-colors duration-300">
            {idea.title}
          </h3>
          <span className="text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">💡</span>
        </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
          {idea.description}
        </p>
          <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-100 to-yellow-200 text-orange-800 border border-orange-300 shadow-sm">
              Innovative
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-100 to-red-200 text-pink-800 border border-pink-300 shadow-sm">
              Practical
            </span>
          </div>
            <button 
            onClick={handleLearnMoreClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-semibold rounded-lg text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >Learn More
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
