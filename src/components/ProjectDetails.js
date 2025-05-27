import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * GESTALT PRINCIPLES APPLIED TO PROJECT DETAILS:
 * 
 * 1. Emergence - Simplified complex visuals with clear, recognizable card shapes
 * 2. Reification - Minimal design with partial outlines for elegance  
 * 3. Multi-stability - Clear, unambiguous interface elements
 * 4. Invariance - Consistent component recognition across scales
 * 5. Prägnanz - Clean, simple layout with reduced visual noise
 * 6. Closure - Incomplete shapes and subtle borders for visual completion
 * 7. Symmetry & Order - Balanced alignment and visual weight
 * 8. Figure/Ground - Strong contrast between content and background
 * 9. Uniform Connectedness - Related items visually connected
 * 10. Common Regions - Similar content grouped in clear containers
 * 11. Proximity - Related elements positioned close together
 * 12. Continuation - Elements aligned along clear visual lines
 * 13. Common Fate - Related animations and interactions
 * 14. Parallelism - Consistent structure across repeating elements
 */

// Enhanced Feedback Toast Component - Applying Gestalt Principles
const ProjectToast = ({ message, type, isVisible, onHide, actionButton }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <div className={`fixed top-6 right-6 z-50 transition-all duration-500 transform ${
      isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-full scale-95 pointer-events-none'
    }`}>
      {/* Gestalt: Figure/Ground with strong contrast, Closure with rounded borders */}
      <div className={`
        rounded-2xl p-5 shadow-2xl border-l-4 backdrop-blur-sm max-w-sm
        ${type === 'success' ? 'bg-white border-green-500 text-gray-900' :
          type === 'error' ? 'bg-white border-red-500 text-gray-900' :
          type === 'info' ? 'bg-white border-orange-500 text-gray-900' :
          'bg-white border-orange-400 text-gray-900'
        }
      `}>
        {/* Gestalt: Proximity - Icon and content closely grouped */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
              ${type === 'success' ? 'bg-green-100 text-green-600' :
                type === 'error' ? 'bg-red-100 text-red-600' :
                type === 'info' ? 'bg-orange-100 text-orange-600' :
                'bg-orange-100 text-orange-600'
              }`}>
              {type === 'success' && '✓'}
              {type === 'error' && '✕'}
              {type === 'info' && 'i'}
              {type === 'warning' && '!'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-tight">{message}</p>
            {/* Gestalt: Proximity - Action button close to related message */}
            {actionButton && (
              <div className="mt-3 pt-3 border-t border-orange-200">
                {actionButton}
              </div>
            )}
          </div>
          {/* Gestalt: Closure - X button implies clickable close action */}
          <button 
            onClick={onHide} 
            className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-orange-100 flex items-center justify-center text-gray-400 hover:text-orange-600 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Smart Action Recommendations Component - Gestalt Enhanced
const SmartActionRecommendations = ({ project, userEngagement, onAction }) => {
  const getRecommendations = () => {
    const recommendations = [];
    
    if (!userEngagement.hasInteracted) {
      recommendations.push({
        id: 'start_engagement',
        title: 'Get Started',
        description: 'Like this project to show interest',
        action: 'Like Project',
        priority: 'high',
        icon: '❤️'
      });
    }
      if (!userEngagement.hasShared) {
      recommendations.push({
        id: 'share_project',
        title: 'Spread the Word',
        description: 'Help this idea reach more creators',
        action: 'Share Project',
        priority: 'medium',
        icon: '📤'
      });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();
  return (
    /* Gestalt: Common Regions - Clear container grouping related actions */
    <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 rounded-3xl p-8 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Gestalt: Proximity - Title and icon closely grouped */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-orange-600 text-lg">💡</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Recommended Actions</h3>
      </div>
      
      {/* Gestalt: Parallelism - Consistent structure across action items */}
      <div className="grid gap-4">
        {recommendations.map((rec) => (
          /* Gestalt: Uniform Connectedness - Related elements visually connected with consistent styling */
          <div key={rec.id} className="group bg-white rounded-2xl p-5 border-2 border-orange-100 hover:border-orange-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              {/* Gestalt: Proximity - Icon, title, and description grouped together */}
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                  {rec.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{rec.description}</p>
                </div>
              </div>
              {/* Gestalt: Emergence - Clear button shape with consistent styling */}
              <button
                onClick={() => onAction(rec.id, rec.action)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md ${
                  rec.priority === 'high' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700' 
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
              >
                {rec.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Real-time Engagement Metrics Component with Gestalt Principles
/* 
 * GESTALT PRINCIPLES APPLIED:
 * - Emergence: Clear metric cards with recognizable shapes
 * - Proximity: Related metrics grouped close together  
 * - Common Regions: Metrics contained within distinct card boundaries
 * - Parallelism: Consistent structure across all metric cards
 * - Symmetry & Order: Balanced 2x2 grid layout
 * - Figure/Ground: Strong contrast between metrics and background
 * - Uniform Connectedness: Visual consistency through shared styling
 * - Common Fate: Synchronized animations across related elements
 * - Continuation: Progress bar creates visual flow
 * - Closure: Rounded corners suggest completion and enclosure
 */
const LiveEngagementMetrics = ({ project, userEngagement }) => {  const [metrics, setMetrics] = useState({
    views: project.views || 1247,
    likes: project.likes || 89,
    inspirationCount: 23,
    shareCount: 45
  });

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (userEngagement.hasInteracted) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
    }
  }, [userEngagement.hasInteracted]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Gestalt: Proximity - Icon and title grouped closely */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <span className="text-indigo-600 mr-3 text-xl">📊</span>
        <span>Live Project Metrics</span>
      </h3>
      
      {/* Gestalt: Symmetry & Order - Balanced 2x2 grid layout */}
      {/* Gestalt: Parallelism - Consistent structure across all metric cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Views Metric Card */}
        <div className={`relative group text-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-orange-200 transition-all duration-300 hover:shadow-md transform hover:scale-105 ${
          showAnimation ? 'animate-pulse bg-orange-100' : ''
        }`}>
          {/* Gestalt: Figure/Ground - Strong contrast for readability */}
          <div className="text-2xl font-bold text-orange-700 mb-1">{metrics.views.toLocaleString()}</div>
          <div className="text-sm font-medium text-orange-600">Total Views</div>
          {/* Gestalt: Emergence - Clear trending indicator shape */}
          {metrics.views > 1000 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
              🔥 HOT
            </div>
          )}
        </div>
        
        {/* Likes Metric Card */}
        <div className="relative group text-center p-4 rounded-xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 transition-all duration-300 hover:shadow-md transform hover:scale-105">
          <div className="text-2xl font-bold text-red-600 mb-1">{metrics.likes}</div>
          <div className="text-sm font-medium text-red-500">Community Likes</div>
          {/* Gestalt: Uniform Connectedness - Consistent styling for user feedback */}
          {userEngagement.hasLiked && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              ❤️ YOU
            </div>
          )}
        </div>
          {/* Interest Metric Card */}
        <div className="relative group text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 transition-all duration-300 hover:shadow-md transform hover:scale-105">          <div className="text-2xl font-bold text-green-600 mb-1">{metrics.inspirationCount}</div>
          <div className="text-sm font-medium text-green-500">Inspired</div>
          <div className="text-xs text-green-400 mt-1">💡 Sparked creativity</div>
        </div>
          {/* Share Count Metric Card */}
        <div className="relative group text-center p-4 rounded-xl bg-gradient-to-br from-pink-50 to-red-50 border border-pink-200 transition-all duration-300 hover:shadow-md transform hover:scale-105">
          <div className="text-2xl font-bold text-pink-600 mb-1">{metrics.shareCount}</div>
          <div className="text-sm font-medium text-pink-500">Shares</div>
          <div className="text-xs text-pink-400 mt-1">📤 Spreading ideas</div>
        </div>      </div>
    </div>
  );
};

const ProjectDetails = ({ projectIdeas }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  
  // Enhanced state for User Guidance features
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [toastActionButton, setToastActionButton] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  const [userEngagement, setUserEngagement] = useState({
    hasInteracted: false,
    hasLiked: false,
    hasShared: false,
    hasSaved: false
  });
  // Find the project by ID
  const project = projectIdeas.find(idea => idea.id === parseInt(id));

  // Enhanced smart action handler with immediate feedback
  const handleSmartAction = async (actionId, actionLabel) => {
    setIsLoading(true);
    
    try {
      switch (actionId) {
        case 'start_engagement':
        case 'like_project':
          if (!userEngagement.hasLiked) {            setUserEngagement(prev => ({ 
              ...prev, 
              hasLiked: true, 
              hasInteracted: true 
            }));
            setToastMessage('Project liked! You\'ll get updates on new similar ideas.');
            setToastType('success');
          } else {
            setToastMessage('You\'ve already liked this project!');
            setToastType('info');
          }
          break;
    
          
        case 'share_project':
          if (!userEngagement.hasShared) {
            await navigator.clipboard?.writeText(`Check out this amazing project: ${project.title} - ${window.location.href}`);
            setUserEngagement(prev => ({ ...prev, hasShared: true }));
            setToastMessage('Project link copied! Share it with other creators and builders.');
            setToastType('success');
          } else {
            setToastMessage('Thanks for sharing! Link copied again.');
            setToastType('info');
          }
          break;
          
        case 'save_project':
          if (!userEngagement.hasSaved) {
            setUserEngagement(prev => ({ ...prev, hasSaved: true }));
            setToastMessage('Project saved to your favorites!');
            setToastType('success');
          } else {
            setToastMessage('Project is already in your favorites!');
            setToastType('info');
          }
          break;
          
        default:
          setToastMessage(`${actionLabel} feature coming soon!`);
          setToastType('info');
      }
    } catch (error) {
      setToastMessage('Action failed. Please try again.');
      setToastType('error');
    } finally {
      setShowToast(true);
      setIsLoading(false);
    }
  };

  if (!project) {    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/browse')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
            >
              Browse Other Projects
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full border border-orange-300 text-orange-700 px-6 py-3 rounded-lg hover:bg-orange-50 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }  // Enhanced project data with metadata
  const projectMetadata = {
    datePosted: "2025-05-20",
    author: "Alex Johnson",
    authorRole: "Full Stack Developer",
    category: "Technology",
    difficulty: "Intermediate",
    estimatedTime: "3-6 months",
    techStack: ["React", "Node.js", "MongoDB", "IoT Sensors"],
    views: 1247,
    likes: 89,
    status: "Open for Inspiration"
  };

  // Enhanced message handler with better feedback
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setToastMessage(`Message sent to ${projectMetadata.author}! They'll respond within 24 hours.`);
      setToastType('success');
      setToastActionButton(
        <button 
          onClick={() => navigate('/messages')}
          className="text-xs bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-100"
        >
          View Messages
        </button>
      );
      setShowToast(true);
      
      // Reset form
      setMessage('');
      setSenderName('');
      setSenderEmail('');
      setShowMessageForm(false);
    } catch (error) {
      setToastMessage('Failed to send message. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Enhanced Feedback Toast */}
      <ProjectToast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onHide={() => {
          setShowToast(false);
          setToastActionButton(null);
        }}
        actionButton={toastActionButton}
      />

      {/* Enhanced Back Navigation with Context */}
      <div className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-orange-600 hover:text-orange-800 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </button>
            
            {/* Breadcrumb Navigation */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <span>Projects</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span>{projectMetadata.category}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-medium">{project.title}</span>
            </div>
              {/* Quick Action Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleSmartAction('like_project', 'Like Project')}
                disabled={isLoading}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  userEngagement.hasLiked 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={userEngagement.hasLiked ? 'Already liked' : 'Like this project'}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <button 
                onClick={() => handleSmartAction('save_project', 'Save Project')}
                disabled={isLoading}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  userEngagement.hasSaved 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={userEngagement.hasSaved ? 'Already saved' : 'Save this project'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button 
                onClick={() => handleSmartAction('share_project', 'Share Project')}
                disabled={isLoading}
                className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-300 transform hover:scale-110"
                title="Share this project"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Smart Action Recommendations - Above Main Content */}
        <div className="mb-8">
          <SmartActionRecommendations 
            project={project} 
            userEngagement={userEngagement} 
            onAction={handleSmartAction}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Enhanced Project Header */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                      projectMetadata.status === 'Open for Inspiration' 
                        ? 'bg-green-100 text-green-800 border border-green-300' 
                        : 'bg-gray-100 text-gray-800 border border-gray-300'
                    }`}>
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      {projectMetadata.status}
                    </span>
                    {projectMetadata.likes > 50 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-300 animate-pulse">
                        🔥 TRENDING
                      </span>                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{project.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-2">
                      AJ
                    </span>
                    <span className="font-medium">By {projectMetadata.author}</span>
                  </div>
                    <span>•</span>
                    <span>{projectMetadata.datePosted}</span>
                    <span>•</span>
                    <span className="font-medium">{projectMetadata.views} views</span>
                    <span>•</span>
                    <span className="font-medium text-red-600">{projectMetadata.likes} likes</span>
                  </div>
                </div>
                <div className="text-6xl animate-bounce">💡</div>
              </div>              {/* Enhanced Category Tags with Interactivity */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold border border-orange-300 hover:bg-orange-200 transition-all duration-300 cursor-pointer">
                  {projectMetadata.category}
                </span>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold border border-yellow-300 hover:bg-yellow-200 transition-all duration-300 cursor-pointer">
                  {projectMetadata.difficulty}
                </span>                <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold border border-pink-300 hover:bg-pink-200 transition-all duration-300 cursor-pointer">
                  {projectMetadata.estimatedTime}
                </span>
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Description</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {project.description}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Real-time monitoring of soil conditions</li>
                <li>Mobile app with push notifications</li>
                <li>Weather integration for smart watering</li>
                <li>Plant database with care instructions</li>
                <li>Community features for sharing tips</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Technical Requirements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projectMetadata.techStack.map((tech, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                    <span className="text-sm font-medium text-gray-800">{tech}</span>
                  </div>
                ))}
              </div>
            </div>            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phase 1: Research & Planning</h4>
                    <p className="text-sm text-gray-600">Duration: 2-4 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phase 2: Hardware Development</h4>
                    <p className="text-sm text-gray-600">Duration: 8-12 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phase 3: Software Development</h4>
                    <p className="text-sm text-gray-600">Duration: 6-10 weeks</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phase 4: Testing & Launch</h4>
                    <p className="text-sm text-gray-600">Duration: 3-4 weeks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            {/* Live Engagement Metrics */}
            <div className="mb-8">
              <LiveEngagementMetrics 
                project={project} 
                userEngagement={userEngagement} 
              />
            </div>            {/* Enhanced Project Metadata */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-orange-200 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-orange-600 mr-2">📋</span>
                Project Details
              </h3>              <div className="space-y-6">                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-gray-600">Project Type</span>
                  <p className="text-lg font-bold text-blue-800">Open Source</p>
                  <p className="text-xs text-blue-600 mt-1">💡 Share ideas and learn together</p>
                </div><div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                  <span className="text-sm font-medium text-gray-600">Inspiration Level</span>
                  <p className="text-lg font-bold text-orange-800">Open for All</p>
                  <p className="text-xs text-orange-600 mt-1">💡 Share and build upon this idea</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg border border-pink-200">
                  <span className="text-sm font-medium text-gray-600">Timeline</span>
                  <p className="text-lg font-bold text-pink-800">{projectMetadata.estimatedTime}</p>
                  <p className="text-xs text-pink-600 mt-1">⏱️ Realistic timeline</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                  <span className="text-sm font-medium text-gray-600">Difficulty Level</span>
                  <p className="text-lg font-bold text-yellow-800">{projectMetadata.difficulty}</p>
                  <p className="text-xs text-yellow-600 mt-1">🎯 Perfect skill match</p>
                </div>
              </div>
            </div>            {/* Enhanced Author Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-orange-200 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-orange-600 mr-2">👤</span>
                Project Owner
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">AJ</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{projectMetadata.author}</h4>
                  <p className="text-sm text-gray-600">{projectMetadata.authorRole}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                    <span className="text-xs text-gray-500 ml-1">(4.9/5)</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Experienced developer with 5+ years in IoT and full-stack development. 
                Passionate about creating solutions that connect technology with everyday life.
              </p>
              
              {/* Author Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-900">12</div>
                  <div className="text-xs text-orange-600">Projects</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">94%</div>
                  <div className="text-xs text-orange-600">Success Rate</div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowMessageForm(true)}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  <>
                    <span className="mr-2">💬</span>
                    Send Message
                  </>
                )}
              </button>
            </div>            {/* Enhanced Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-200 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-orange-600 mr-2">⚡</span>
                Quick Actions
              </h3>              <div className="space-y-3">
                <button 
                  onClick={() => handleSmartAction('save_project', 'Save Project')}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium ${
                    userEngagement.hasSaved
                      ? 'bg-orange-100 text-orange-800 border border-orange-300'
                      : 'border border-orange-600 text-orange-600 hover:bg-orange-50'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {userEngagement.hasSaved ? (
                    <>
                      <span className="mr-2">💾</span>
                      Saved to Favorites
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🔖</span>
                      Save to Favorites
                    </>
                  )}
                </button>
                
                <button 
                  onClick={() => handleSmartAction('share_project', 'Share Project')}
                  disabled={isLoading}
                  className="w-full border border-orange-300 text-orange-700 py-3 px-4 rounded-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  <span className="mr-2">📤</span>
                  Share Project
                </button>
                
                <div className="pt-2 border-t border-orange-200">
                  <button className="w-full text-gray-500 text-sm py-2 hover:text-orange-700 transition-colors duration-300">
                    <span className="mr-2">🚨</span>
                    Report Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Enhanced Message Modal */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Send Message</h3>
                <p className="text-sm text-gray-600">to {projectMetadata.author}</p>
              </div>
              <button 
                onClick={() => setShowMessageForm(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSendMessage} className="space-y-4">              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Email *</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="w-full border border-orange-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none"
                  placeholder="Hi! I'm interested in learning more about your project idea..."
                  required
                />
                <div className="mt-2 text-xs text-gray-500">
                  {message.length}/500 characters
                </div>
              </div>
              
              {/* Message Templates */}
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Quick Templates:</p>
                <div className="space-y-2">                  <button
                    type="button"
                    onClick={() => setMessage("Hi! This idea really inspired me. I'd love to learn more about your vision and potentially build something similar.")}
                    className="text-xs text-orange-600 hover:text-orange-800 transition-colors duration-300"
                  >
                    • Express inspiration
                  </button>
                  <button
                    type="button"
                    onClick={() => setMessage("Hello! I'd like to learn more about the technical requirements and timeline for this project.")}
                    className="text-xs text-orange-600 hover:text-orange-800 transition-colors duration-300 block"
                  >
                    • Request more details
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMessageForm(false)}
                  className="flex-1 border border-orange-300 text-orange-700 py-3 px-4 rounded-lg hover:bg-orange-50 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <span className="mr-2">📤</span>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
