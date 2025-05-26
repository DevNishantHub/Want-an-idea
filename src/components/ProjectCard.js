import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ idea }) => {
  const navigate = useNavigate();  const handleCardClick = () => {
    navigate(`/project/${idea.id}`);
  };

  const handleLearnMoreClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    navigate(`/project/${idea.id}`);
  };  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 cursor-pointer hover:scale-105 transform select-none relative overflow-hidden"
      style={{ userSelect: 'none' }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-indigo-700 transition-colors duration-300">
            {idea.title}
          </h3>
          <span className="text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">💡</span>
        </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
          {idea.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 shadow-sm">
              Innovative
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm">
              Practical
            </span>
          </div>
          
          <button 
            onClick={handleLearnMoreClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >            Learn More
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
