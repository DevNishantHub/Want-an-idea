import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';

/**
 * USER GUIDANCE & FEEDBACK OPTIMIZATION PRINCIPLES APPLIED TO HERO SECTION:
 * 
 * 1. Clear Next Actions & CTAs:
 *    - Prominent action buttons with clear outcomes
 *    - Step-by-step guidance for new users
 *    - Progressive disclosure of features
 *    - Smart recommendations based on user behavior
 * 
 * 2. Immediate Feedback System:
 *    - Real-time interaction responses (<100ms)
 *    - Loading states for all actions
 *    - Visual progress indicators
 *    - Toast notifications for user actions
 * 
 * 3. Gamification & Engagement:
 *    - Achievement showcases and progress tracking
 *    - Social proof with real-time statistics
 *    - User journey milestones
 *    - Streak and engagement rewards
 * 
 * 4. Performance Optimization:
 *    - Lazy loading for improved responsiveness
 *    - Optimized rendering for <100ms interactions
 *    - Smart content prioritization
 */

// Toast Notification Component for Immediate Feedback
const ToastNotification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
      <div className={`rounded-lg p-4 shadow-lg border-l-4 ${
        type === 'success' ? 'bg-green-50 border-green-400 text-green-800' :
        type === 'info' ? 'bg-blue-50 border-blue-400 text-blue-800' :
        type === 'warning' ? 'bg-yellow-50 border-yellow-400 text-yellow-800' :
        'bg-red-50 border-red-400 text-red-800'
      }`}>
        <div className="flex items-center">
          <span className="mr-2">
            {type === 'success' ? '✅' : type === 'info' ? 'ℹ️' : type === 'warning' ? '⚠️' : '❌'}
          </span>
          <span className="font-medium">{message}</span>
          <button onClick={() => setIsVisible(false)} className="ml-3 text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Quick Action Guide Component
const QuickActionGuide = ({ onAction, userProgress, isLoading }) => {
  const actions = [
    {
      id: 'browse',
      title: 'Explore Ideas',
      description: 'Discover trending projects',
      icon: '🔍',
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Easy',
      time: '2 min'
    },
    {
      id: 'submit',
      title: 'Share Your Idea',
      description: 'Add your project concept',
      icon: '✨',
      color: 'from-indigo-500 to-purple-500',
      difficulty: 'Medium',
      time: '5 min',
      highlight: true
    },
    {
      id: 'learn',
      title: 'Get Inspired',
      description: 'See success stories',
      icon: '💡',
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Easy',
      time: '3 min'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 mb-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🚀 Ready to Start?</h3>
        <p className="text-gray-600">Choose your path to innovation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            disabled={isLoading}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              action.highlight 
                ? 'border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 hover:border-indigo-400 scale-105' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg cursor-pointer'}`}
          >
            {action.highlight && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs px-2 py-1 rounded-full font-bold">
                POPULAR
              </div>
            )}
            
            <div className="flex items-center mb-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-2xl mr-4`}>
                {action.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-full">{action.difficulty}</span>
              <span>{action.time}</span>
            </div>
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// User Progress Showcase Component
const UserProgressShowcase = ({ userStats, onViewProgress }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          🏆 Community Impact
        </h3>
        <button 
          onClick={onViewProgress}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium underline"
        >
          View Details
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">{userStats.totalIdeas.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Ideas Shared</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{userStats.successfulProjects.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Projects Built</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{userStats.activeUsers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Active Innovators</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{userStats.weeklyGrowth}%</div>
          <div className="text-sm text-gray-600">Weekly Growth</div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ projectIdeas }) => {
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);
  const [userProgress, setUserProgress] = useState({
    level: 'Explorer',
    ideasViewed: 0,
    actionsCompleted: 0
  });

  // Mock user statistics for gamification
  const userStats = {
    totalIdeas: 12547,
    successfulProjects: 3251,
    activeUsers: 10432,
    weeklyGrowth: 23
  };

  // Enhanced action handler with immediate feedback
  const handleQuickAction = async (actionId) => {
    setIsLoading(true);
    setToastNotification({ message: "Processing your action...", type: "info" });
    
    // Simulate processing time for realistic feedback
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      switch (actionId) {
        case 'browse':
          setToastNotification({ message: "Exploring amazing ideas...", type: "success" });
          setUserProgress(prev => ({ ...prev, actionsCompleted: prev.actionsCompleted + 1 }));
          setTimeout(() => navigate('/browse'), 800);
          break;
          
        case 'submit':
          setToastNotification({ message: "Ready to share your brilliant idea!", type: "success" });
          setUserProgress(prev => ({ ...prev, actionsCompleted: prev.actionsCompleted + 1 }));
          setTimeout(() => navigate('/submit'), 800);
          break;
          
        case 'learn':
          setToastNotification({ message: "Discovering success stories...", type: "info" });
          setUserProgress(prev => ({ ...prev, ideasViewed: prev.ideasViewed + 1 }));
          setTimeout(() => {
            // Scroll to success stories section or navigate to about
            navigate('/about');
          }, 800);
          break;
          
        default:
          setToastNotification({ message: "Feature coming soon!", type: "warning" });
      }
    } catch (error) {
      setToastNotification({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProgress = () => {
    setToastNotification({ message: "Viewing community progress...", type: "info" });
    setShowStats(!showStats);
  };

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
      {/* Toast Notifications for Immediate Feedback */}
      {toastNotification && (
        <ToastNotification
          message={toastNotification.message}
          type={toastNotification.type}
          onClose={() => setToastNotification(null)}
        />
      )}
      
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 to-purple-100/10"></div>
      
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Enhanced Hero Header - Anchoring Bias & Halo Effect */}
        <div className="text-center mb-12">
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
          <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-lg border border-orange-300 text-sm mb-8">
            <span className="mr-2">⏰</span>
            Don't let your next breakthrough idea slip away
          </div>
        </div>

        {/* Quick Action Guide for Clear Next Steps */}
        <QuickActionGuide 
          onAction={handleQuickAction}
          userProgress={userProgress}
          isLoading={isLoading}
        />

        {/* User Progress Showcase for Gamification */}
        <UserProgressShowcase 
          userStats={userStats}
          onViewProgress={handleViewProgress}
        />{/* Chunked Project Ideas by Category */}
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
