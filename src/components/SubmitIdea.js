import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SubmitIdea = ({ isEditMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    tags: '',
    requiredSkills: '',
    estimatedTime: '',
    resources: '',
    submitterName: '',
    submitterEmail: '',
    contactPreference: 'email'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  // Simplified and grouped categories to reduce choice overload
  const categories = [
    { name: 'Technology', emoji: '💻', group: 'Innovation' },
    { name: 'Health', emoji: '🏥', group: 'Wellness' },
    { name: 'Education', emoji: '📚', group: 'Learning' },
    { name: 'Environment', emoji: '🌱', group: 'Impact' },
    { name: 'Community', emoji: '👥', group: 'Social' },
    { name: 'Business', emoji: '💼', group: 'Innovation' }
  ];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  
  // Simplified time estimates to reduce choice overload
  const timeEstimates = [
    'Quick (1-5 hours)', 
    'Short-term (1-7 days)', 
    'Medium-term (1-4 weeks)', 
    'Long-term (1+ months)'  ];

  // Mock function to get submission data by ID
  const getSubmissionById = (submissionId) => {
    const mockSubmissions = {
      101: {
        id: 101,
        title: "AI-Powered Study Assistant",
        description: "An intelligent study companion that creates personalized quiz questions, summarizes reading materials, and tracks learning progress using machine learning algorithms.",
        category: "Education",
        difficulty: "Intermediate",
        tags: "AI, Education, Machine Learning",
        requiredSkills: "Python, Machine Learning, React",
        estimatedTime: "2-4 weeks",
        resources: "TensorFlow documentation, educational APIs",
        submitterName: "Alex Johnson",
        submitterEmail: "alex@example.com",
        contactPreference: "email"
      }
    };
    return mockSubmissions[submissionId] || null;
  };

  useEffect(() => {
    if (isEditMode && id) {
      setLoading(true);
      setTimeout(() => {
        const submission = getSubmissionById(parseInt(id));
        if (submission) {
          setFormData({
            title: submission.title,
            description: submission.description,
            category: submission.category,
            difficulty: submission.difficulty,
            tags: submission.tags,
            requiredSkills: submission.requiredSkills,
            estimatedTime: submission.estimatedTime,
            resources: submission.resources,
            submitterName: submission.submitterName,
            submitterEmail: submission.submitterEmail,
            contactPreference: submission.contactPreference
          });
        } else {
          navigate('/my-submissions');
        }
        setLoading(false);
      }, 1000);
    }
  }, [isEditMode, id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters long';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.difficulty) {
      newErrors.difficulty = 'Please select a difficulty level';
    }

    if (!formData.submitterName.trim()) {
      newErrors.submitterName = 'Your name is required';
    }

    if (!formData.submitterEmail.trim()) {
      newErrors.submitterEmail = 'Your email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.submitterEmail)) {
      newErrors.submitterEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      if (isEditMode) {
        setTimeout(() => {
          navigate('/my-submissions');
        }, 2000);
      } else {
        setTimeout(() => {
          setFormData({
            title: '',
            description: '',
            category: '',
            difficulty: '',
            tags: '',
            requiredSkills: '',
            estimatedTime: '',
            resources: '',
            submitterName: '',
            submitterEmail: '',
            contactPreference: 'email'
          });
          setShowSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting idea:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-purple-100/20 to-pink-100/30"></div>
        
        <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-lg w-full mx-4 text-center border border-white/50">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isEditMode ? '✨ Updated Successfully!' : '🎉 Success!'}
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {isEditMode 
              ? 'Your project idea has been updated successfully!'
              : 'Your project idea has been submitted successfully. We\'ll review it and get back to you soon!'
            }
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate(isEditMode ? '/my-submissions' : '/browse')}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isEditMode ? 'View My Submissions' : 'Browse Other Ideas'}
            </button>
            {!isEditMode && (
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-white/70 backdrop-blur-sm text-gray-700 py-4 px-6 rounded-xl hover:bg-white/90 transition-all duration-300 font-semibold border border-gray-200 hover:border-gray-300"
              >
                Submit Another Idea
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  if (isEditMode && loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-purple-100/20 to-pink-100/30"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 font-medium">Loading submission data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-purple-100/20 to-pink-100/30"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), 
                         radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
      }}></div>
        {/* Enhanced Page Header with Cognitive Bias Principles */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            {/* Social Proof Badge - Anchoring Effect */}
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full border border-green-300 mb-6 shadow-lg">
              <span className="text-2xl mr-2">🏆</span>
              <span className="font-semibold">Join 5,000+ successful idea creators!</span>
            </div>
            
            <div className="text-5xl mb-6 animate-bounce">
              {isEditMode ? '✏️' : '💡'}
            </div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6 leading-tight">
              {isEditMode ? 'Perfect Your Idea' : 'Your Next Big Idea Starts Here'}
            </h1>
            
            {/* Loss Aversion & Social Proof */}
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
              {isEditMode
                ? 'Refine your project idea to maximize its impact and visibility.'
                : <><span className="font-semibold text-indigo-600">87% of funded projects</span> started with a simple idea submission. Don't let your breakthrough innovation slip away!</>
              }
            </p>
            
            {/* Scarcity & Urgency */}
            {!isEditMode && (
              <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-lg border border-orange-300 text-sm font-medium">
                <span className="mr-2">⚡</span>
                Limited spots for featured ideas this month
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">          {/* Chunk 1: Project Basics - Enhanced with Endowment Effect */}
          <div className="mb-12 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-indigo-900 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 shadow-lg">1</span>
                📝 Project Basics
              </h2>
              {/* Social Proof Badge - Anchoring Effect */}
              <div className="text-sm text-indigo-600 font-medium bg-indigo-100 px-3 py-1 rounded-full">
                ✨ 95% completion rate at this step
              </div>
            </div>
            
            {/* Loss Aversion Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-600 mr-2">💡</span>
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Pro tip:</span> Projects with compelling titles get <span className="font-bold">3x more views</span>. Make yours count!
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">              {/* Project Title - Enhanced with Social Proof */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Project Title *
                  <span className="text-sm font-normal text-gray-500 ml-2">(Most popular titles are 4-8 words)</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., AI-Powered Recipe Optimizer (trending category: Tech + Health)"
                  className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                  }`}
                />
                {/* Progress Indicator - Endowment Effect */}
                {formData.title.length > 0 && (
                  <div className="mt-2 flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          formData.title.length >= 20 ? 'bg-green-500' : 
                          formData.title.length >= 10 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((formData.title.length / 30) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${
                      formData.title.length >= 20 ? 'text-green-600' : 
                      formData.title.length >= 10 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {formData.title.length >= 20 ? '🔥 Great title!' : 
                       formData.title.length >= 10 ? '👍 Good start' : '✍️ Keep going'}
                    </span>
                  </div>
                )}
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.title}</p>
                )}
              </div>              {/* Project Description - Enhanced with Loss Aversion */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Project Description *
                  <span className="text-sm font-normal text-gray-500 ml-2">(Detailed descriptions get 5x more interest)</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Successful example: 'A mobile app that uses AI to scan your fridge contents and suggests recipes based on what you have, reducing food waste by 40% while saving users $200/month on groceries...'"
                  className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                  }`}
                />
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {errors.description && (
                      <p className="text-sm text-red-600 font-medium">{errors.description}</p>
                    )}
                    {/* Endowment Effect Progress */}
                    {formData.description.length >= 50 && !errors.description && (
                      <div className="flex items-center text-sm">
                        <span className={`font-medium ${
                          formData.description.length >= 200 ? 'text-green-600' : 
                          formData.description.length >= 100 ? 'text-yellow-600' : 'text-blue-600'
                        }`}>
                          {formData.description.length >= 200 ? '🎯 Perfect length!' : 
                           formData.description.length >= 100 ? '👌 Almost there!' : '✍️ Good start!'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {formData.description.length}/500 characters
                  </p>
                </div>
                {/* Social Proof Examples */}
                {formData.description.length < 50 && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">💡 Need inspiration?</span> Top-rated ideas mention: problem solved, target users, key benefits, and how it works.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>          {/* Chunk 2: Project Classification - Enhanced with Social Proof */}
          <div className="mb-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-900 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 shadow-lg">2</span>
                🏷️ Project Classification
              </h2>
              {/* Popular Categories Badge */}
              <div className="text-sm text-purple-600 font-medium bg-purple-100 px-3 py-1 rounded-full">
                🔥 Technology & Health are trending
              </div>
            </div>
            
            {/* Social Proof for Categories */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <span className="text-purple-600 mr-2">📊</span>
                <p className="text-sm text-purple-800">
                  <span className="font-semibold">Popular this week:</span> Technology (42%), Health (23%), Education (18%). Choose wisely to maximize visibility!
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Category *
                  <span className="text-sm font-normal text-gray-500 ml-2">(Affects discoverability)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map(category => {
                    // Add popularity indicators based on category
                    const isPopular = category.name === 'Technology' || category.name === 'Health';
                    const isTrending = category.name === 'Technology';
                    
                    return (
                      <button
                        key={category.name}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: category.name }))}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                          formData.category === category.name
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                        }`}
                      >
                        {/* Trending Badge */}
                        {isTrending && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                            🔥 HOT
                          </div>
                        )}
                        {/* Popular Badge */}
                        {isPopular && !isTrending && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            ⭐ Popular
                          </div>
                        )}
                        <div className="text-3xl mb-2">{category.emoji}</div>
                        <div className="font-semibold text-sm">{category.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{category.group}</div>
                        {/* Social Proof Numbers */}
                        {isPopular && (
                          <div className="text-xs text-indigo-600 font-medium mt-1">
                            {category.name === 'Technology' ? '1,200+ ideas' : '650+ ideas'}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.category}</p>
                )}
              </div>              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Difficulty Level *
                  <span className="text-sm font-normal text-gray-500 ml-2">(Beginner projects get 60% more applications)</span>
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg ${
                    errors.difficulty ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  <option value="">Select difficulty</option>
                  {difficulties.map(difficulty => {
                    const isPopular = difficulty === 'Beginner';
                    return (
                      <option key={difficulty} value={difficulty}>
                        {difficulty} {isPopular ? '⭐ (Most Popular)' : ''}
                      </option>
                    );
                  })}
                </select>
                {/* Social Proof for Difficulty Selection */}
                {formData.difficulty && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                    {formData.difficulty === 'Beginner' && (
                      <span>🎯 Great choice! Beginner projects attract 3x more collaborators</span>
                    )}
                    {formData.difficulty === 'Intermediate' && (
                      <span>👍 Good balance of challenge and accessibility</span>
                    )}
                    {formData.difficulty === 'Advanced' && (
                      <span>🚀 Expert-level projects often become groundbreaking innovations</span>
                    )}
                  </div>
                )}
                {errors.difficulty && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.difficulty}</p>
                )}
              </div>
            </div>
          </div>          {/* Chunk 3: Project Details - Enhanced with Choice Overload Reduction */}
          <div className="mb-12 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-900 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 shadow-lg">3</span>
                ⚙️ Project Details
              </h2>
              <div className="flex items-center space-x-3">
                {/* Completion Rate Badge */}
                <div className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                  🎯 90% complete sections here
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all duration-300"
                >
                  <span>{showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options</span>
                  <svg 
                    className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAdvancedOptions ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Anchoring Message */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <span className="text-emerald-600 mr-2">⏱️</span>
                <p className="text-sm text-emerald-800">
                  <span className="font-semibold">Time estimate tip:</span> Most successful projects (78%) are "Short-term" or "Medium-term" duration.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">              {/* Essential Field - Always Visible - Enhanced with Social Proof */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  How long might this take? *
                  <span className="text-sm font-normal text-gray-500 ml-2">(Most popular: Short-term projects)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeEstimates.map((time, index) => {
                    // Add popularity indicators
                    const isPopular = time.includes('Short-term') || time.includes('Medium-term');
                    const isMostPopular = time.includes('Short-term');
                    
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, estimatedTime: time }))}
                        className={`relative p-3 rounded-lg border-2 transition-all duration-300 text-center text-sm font-medium hover:scale-105 ${
                          formData.estimatedTime === time
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                        }`}
                      >
                        {/* Popular Badge */}
                        {isMostPopular && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 py-0.5 rounded-full font-bold">
                            ⭐
                          </div>
                        )}
                        {isPopular && !isMostPopular && (
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-full font-bold">
                            👍
                          </div>
                        )}
                        {time}
                        {/* Social proof percentages */}
                        {isMostPopular && (
                          <div className="text-xs text-green-600 mt-1 font-medium">45% choose this</div>
                        )}
                        {isPopular && !isMostPopular && (
                          <div className="text-xs text-blue-600 mt-1 font-medium">33% choose this</div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {/* Social Proof Feedback */}
                {formData.estimatedTime && (
                  <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                    {formData.estimatedTime.includes('Short-term') && (
                      <span>🎯 Excellent! Short-term projects have 85% completion rate</span>
                    )}
                    {formData.estimatedTime.includes('Medium-term') && (
                      <span>👍 Good choice! Medium-term projects balance scope and feasibility</span>
                    )}
                    {formData.estimatedTime.includes('Quick') && (
                      <span>⚡ Perfect for rapid prototyping and quick wins!</span>
                    )}
                    {formData.estimatedTime.includes('Long-term') && (
                      <span>🚀 Ambitious projects often lead to breakthrough innovations</span>
                    )}
                  </div>
                )}
              </div>

              {/* Advanced Options - Progressive Disclosure */}
              {showAdvancedOptions && (
                <>
                  {/* Tags */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Tags (Optional)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="e.g., AI, mobile app, sustainability (comma-separated)"
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg hover:border-indigo-300"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Add relevant tags to help others find your project
                    </p>
                  </div>

                  {/* Required Skills */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Required Skills (Optional)
                    </label>
                    <input
                      type="text"
                      name="requiredSkills"
                      value={formData.requiredSkills}
                      onChange={handleInputChange}
                      placeholder="e.g., JavaScript, Design, Marketing"
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg hover:border-indigo-300"
                    />
                  </div>

                  {/* Resources */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Resources & References (Optional)
                    </label>
                    <textarea
                      name="resources"
                      value={formData.resources}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Include any helpful links, articles, tools, or resources related to this project"
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg hover:border-indigo-300"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Chunk 4: Contact Information */}
          <div className="mb-12 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
            <h2 className="text-2xl font-bold text-orange-900 mb-6 flex items-center">
              <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 shadow-lg">4</span>
              👤 Contact Information
            </h2>            
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="submitterName"
                    value={formData.submitterName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg ${
                      errors.submitterName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  />
                  {errors.submitterName && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.submitterName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="submitterEmail"
                    value={formData.submitterEmail}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg ${
                      errors.submitterEmail ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  />
                  {errors.submitterEmail && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.submitterEmail}</p>
                  )}
                </div>
              </div>

              {/* Contact Preference - Simplified */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  How can people contact you about this idea?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:bg-gray-50">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="email"
                      checked={formData.contactPreference === 'email'}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-lg font-medium">📧 Email Me</span>
                      <p className="text-sm text-gray-500">Interested people can reach out via email</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:bg-gray-50">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="none"
                      checked={formData.contactPreference === 'none'}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-lg font-medium">🔒 Share Anonymously</span>
                      <p className="text-sm text-gray-500">Just share the idea, no contact needed</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Actions Chunk */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold text-lg"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                <>
                  <span className="mr-2 text-xl">
                    {isEditMode ? '✏️' : '🚀'}
                  </span>
                  {isEditMode ? 'Update Project Idea' : 'Submit Project Idea'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitIdea;
