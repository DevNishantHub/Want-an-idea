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

  const categories = [
    'Technology', 'Health', 'Education', 'Environment', 
    'Entertainment', 'Community', 'Business', 'Lifestyle'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const timeEstimates = [
    '1-2 hours', '3-5 hours', '1-2 days', '1 week', 
    '2-4 weeks', '1-2 months', '3-6 months', '6+ months'
  ];

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
      
      {/* Page Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-5xl mb-6 animate-bounce">
              {isEditMode ? '✏️' : '💡'}
            </div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6 leading-tight">
              {isEditMode ? 'Edit Your Idea' : 'Share Your Vision'}
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              {isEditMode
                ? 'Update your project idea details and save your changes.'
                : 'Share your innovative project idea with our community. Help others bring your vision to life!'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          {/* Basic Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 shadow-lg">1</span>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 gap-8">
              {/* Project Title */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a catchy title for your project idea"
                  className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                  }`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.title}</p>
                )}
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Describe your project idea in detail. What problem does it solve? How would it work?"
                  className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                  }`}
                />
                <div className="mt-2 flex justify-between">
                  {errors.description && (
                    <p className="text-sm text-red-600 font-medium">{errors.description}</p>
                  )}
                  <p className="text-sm text-gray-500 ml-auto">
                    {formData.description.length}/500 characters
                  </p>
                </div>
              </div>

              {/* Category and Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg ${
                      errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Difficulty Level *
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
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                  {errors.difficulty && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.difficulty}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 shadow-lg">2</span>
              Additional Details
            </h2>
            
            <div className="grid grid-cols-1 gap-8">
              {/* Tags */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Tags
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

              {/* Required Skills and Estimated Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Required Skills
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

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Estimated Time to Complete
                  </label>
                  <select
                    name="estimatedTime"
                    value={formData.estimatedTime}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg hover:border-indigo-300"
                  >
                    <option value="">Select time estimate</option>
                    {timeEstimates.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Resources */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Resources & References
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
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 shadow-lg">3</span>
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

              {/* Contact Preference */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Preferred Contact Method
                </label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="email"
                      checked={formData.contactPreference === 'email'}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-lg">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="message"
                      checked={formData.contactPreference === 'message'}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-lg">Platform Messages</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactPreference"
                      value="none"
                      checked={formData.contactPreference === 'none'}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-lg">Anonymous (No Contact)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
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
