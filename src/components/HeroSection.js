import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const HeroSection = ({ projectIdeas }) => {
  const [showStats, setShowStats] = useState(false);

  // Chunk projects by category for better organization
  const chunkProjectsByCategory = (ideas) => {
    const chunks = {};
    ideas.forEach(idea => {
      const category = idea.category || 'Other';
      if (!chunks[category]) {
        chunks[category] = [];
      }
      chunks[category].push(idea);
    });
    return chunks;
  };

  const projectChunks = chunkProjectsByCategory(projectIdeas || []);
  const featuredCategories = Object.keys(projectChunks).slice(0, 3); // Show top 3 categories

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 to-purple-100/10"></div>
      
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">        {/* Enhanced Hero Header - Anchoring Bias & Halo Effect */}
        <div className="text-center mb-20">
          {/* Social Proof Badge - Creates positive first impression */}
          <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full border border-green-300 mb-6 shadow-lg">
            <span className="text-2xl mr-2">🏆</span>
            <span className="font-semibold">Join 10,000+ innovators already building their ideas!</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            💡 <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Transform Ideas Into Reality</span>
          </h1>
          
          {/* Anchoring with compelling statistics */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            <span className="font-semibold text-indigo-600">95% of successful projects</span> started with a simple idea. 
            Discover proven concepts from our community and start building something amazing today!
          </p>
          
          {/* Loss Aversion CTA */}
          <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-lg border border-orange-300 text-sm">
            <span className="mr-2">⏰</span>
            Don't let your next breakthrough idea slip away
          </div>
        </div>{/* Chunked Project Ideas by Category */}
        <div className="space-y-16 mb-20">
          {featuredCategories.length > 0 ? (
            featuredCategories.map((category, index) => (
              <div key={category} className="space-y-6">
                {/* Category Chunk Header */}
                <div className={`bg-gradient-to-r ${
                  index === 0 ? 'from-indigo-50 to-purple-50 border-indigo-200' :
                  index === 1 ? 'from-blue-50 to-cyan-50 border-blue-200' :
                  'from-green-50 to-emerald-50 border-green-200'
                } rounded-xl p-6 border`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                        {index === 0 ? '🚀' : index === 1 ? '💻' : '🎨'} {category} Projects
                      </h3>
                      <p className="text-gray-600">
                        {projectChunks[category].length} project{projectChunks[category].length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                    <div className="text-3xl opacity-60">
                      {index === 0 ? '⭐' : index === 1 ? '🔥' : '✨'}
                    </div>
                  </div>
                </div>
                
                {/* Category Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectChunks[category].slice(0, 6).map((idea) => (
                    <ProjectCard key={idea.id} idea={idea} />
                  ))}
                </div>
                
                {/* Show More Link if there are more projects */}
                {projectChunks[category].length > 6 && (
                  <div className="text-center pt-4">
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm underline">
                      View all {projectChunks[category].length} {category.toLowerCase()} projects →
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            // Fallback if no projects or categories
            <div className="bg-gray-50 rounded-xl p-12 text-center border border-gray-200">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Yet</h3>
              <p className="text-gray-600">Be the first to share your amazing project idea!</p>
            </div>
          )}
        </div>{/* Simplified Call to Action */}
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-10 max-w-3xl mx-auto border border-gray-100">
            
            {/* Header Chunk */}
            <div className="mb-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Have a Great Idea?
              </h3>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Join our community and share your project ideas. Get feedback, find collaborators, and bring your vision to life.
              </p>
            </div>
            
            {/* Primary Action Chunk */}
            <div className="mb-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <button className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-lg">
                <span className="mr-2">🚀</span>
                Share Your Idea
              </button>
              <p className="text-sm text-indigo-600 mt-3 font-medium">Start building your project today</p>
            </div>
            
            {/* Secondary Options Chunk */}
            <div className="border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-500 mb-4">
                Not ready to share yet?
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button className="text-indigo-600 hover:text-indigo-700 underline font-medium text-sm">
                  🔍 Explore existing ideas
                </button>
                <span className="hidden sm:inline text-gray-300">•</span>
                <button className="text-indigo-600 hover:text-indigo-700 underline font-medium text-sm">
                  📚 Learn how it works
                </button>
              </div>
            </div>
            
            {/* Progressive Disclosure for Stats */}
            <div className="mt-8">
              <button 
                onClick={() => setShowStats(!showStats)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center mx-auto"
              >
                📊 Community Stats
                <svg 
                  className={`ml-1 w-4 h-4 transform transition-transform ${showStats ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>              {showStats && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                  {/* Social Proof - Bandwagon Effect */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                      🔥 Trending Now
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">2.3K+</div>
                        <div className="text-xs text-blue-700">Active This Week</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">847</div>
                        <div className="text-xs text-green-700">Ideas This Month</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">156</div>
                        <div className="text-xs text-purple-700">Launched Projects</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Loss Aversion & Scarcity */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="text-sm font-semibold text-orange-800 mb-3 flex items-center">
                      ⚡ Limited Time Opportunity
                    </h4>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-700 mb-1">
                        💰 Early adopters got 10x more visibility
                      </div>
                      <div className="text-xs text-orange-600">Join before others discover this platform</div>
                    </div>
                  </div>
                  
                  {/* Availability Heuristic - Recent Success Stories */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <h4 className="text-sm font-semibold text-green-800 mb-3 flex items-center">
                      🏆 Recent Success Stories
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">"Sarah's AI Recipe App" got funded!</span>
                        <span className="text-green-600 font-medium">$50K</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">"Mike's Garden Monitor" went viral</span>
                        <span className="text-green-600 font-medium">10K users</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">"Team Study Buddy" found investors</span>
                        <span className="text-green-600 font-medium">Series A</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
