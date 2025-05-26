import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * FITTS'S LAW OPTIMIZATIONS APPLIED:
 * 
 * 1. Target Size Optimization:
 *    - Step navigator buttons: Enhanced from 48px to 64px+ (minimum 44px touch target)
 *    - Category/Difficulty cards: Minimum 120px height with larger padding
 *    - Navigation buttons: Minimum 44px height, larger widths for primary actions
 *    - Form inputs: Enhanced padding for easier targeting
 * 
 * 2. Distance/Proximity Optimization:
 *    - Related controls grouped together with adequate spacing
 *    - Sequential action buttons positioned close to each other
 *    - Step navigator centrally positioned for easy access
 *    - Submit button largest and most prominent for final action
 * 
 * 3. Mobile-Specific Optimizations:
 *    - All touch targets minimum 44px, enhanced to 56px+ for better usability
 *    - Increased spacing between interactive elements
 *    - Larger icons and text for better visibility and targeting
 * 
 * 4. Visual Clarity Enhancement:
 *    - Clear visual boundaries for clickable areas
 *    - Hover effects to indicate interactive elements
 *    - Progressive sizing (larger buttons for more important actions)
 *    - Enhanced shadows and borders for better depth perception
 * 
 * Combined with previous optimizations:
 * - Cognitive Load Theory: Progressive disclosure, chunking, familiar patterns
 * - Doherty Threshold: <400ms response times, instant feedback, optimized performance
 */

const SubmitIdea = ({ isEditMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Cognitive Load Theory: Step-based progressive disclosure
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const totalSteps = 4;
    // Doherty Threshold: Instant feedback states
  const [validationState, setValidationState] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [lastInputTime, setLastInputTime] = useState(Date.now());
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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
  });  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Doherty Threshold: Performance optimization with memoized data
  const categories = useMemo(() => [
    { name: 'Technology', emoji: '💻', description: 'Apps, software, AI', popular: true },
    { name: 'Health', emoji: '🏥', description: 'Wellness, fitness, medical', popular: true },
    { name: 'Education', emoji: '📚', description: 'Learning, training, skills', popular: false },
    { name: 'Business', emoji: '💼', description: 'Startups, services, tools', popular: false },
    { name: 'Environment', emoji: '🌱', description: 'Sustainability, green tech', popular: false },
    { name: 'Community', emoji: '👥', description: 'Social, local, networking', popular: false }
  ], []);
  
  const difficulties = useMemo(() => [
    { 
      level: 'Beginner', 
      description: 'Little to no coding experience needed',
      timeframe: '1-7 days',
      icon: '🌱',
      popular: true
    },
    { 
      level: 'Intermediate', 
      description: 'Some programming knowledge required',
      timeframe: '1-4 weeks', 
      icon: '🚀',
      popular: true
    },
    { 
      level: 'Advanced', 
      description: 'Significant technical expertise needed',
      timeframe: '1+ months',
      icon: '⚡',
      popular: false
    }
  ], []);
  
  const timeEstimates = useMemo(() => [
    { label: 'Weekend Project', value: 'Quick (1-5 hours)', popular: false },
    { label: 'Week-long Sprint', value: 'Short-term (1-7 days)', popular: true },
    { label: 'Monthly Challenge', value: 'Medium-term (1-4 weeks)', popular: true },
    { label: 'Long-term Vision', value: 'Long-term (1+ months)', popular: false }
  ], []);
  // Doherty Threshold: Instant validation with <400ms response
  const validateFieldInstantly = useCallback((fieldName, value) => {
    const startTime = Date.now();
    let isValid = true;
    let message = '';
    
    switch (fieldName) {
      case 'title':
        if (!value.trim()) {
          isValid = false;
          message = 'Title is required';
        } else if (value.length < 5) {
          isValid = false;
          message = 'Title must be at least 5 characters';
        } else if (value.length > 100) {
          isValid = false;
          message = 'Title must be less than 100 characters';
        } else {
          message = 'Great title! ✓';
        }
        break;
        
      case 'description':
        if (!value.trim()) {
          isValid = false;
          message = 'Description is required';
        } else if (value.length < 50) {
          isValid = false;
          message = `${50 - value.length} more characters needed`;
        } else if (value.length > 500) {
          isValid = false;
          message = 'Description too long';
        } else {
          message = 'Perfect description! ✓';
        }
        break;
        
      case 'submitterName':
        if (!value.trim()) {
          isValid = false;
          message = 'Name is required';
        } else if (value.length < 2) {
          isValid = false;
          message = 'Name must be at least 2 characters';
        } else {
          message = 'Name looks good! ✓';
        }
        break;
        
      case 'submitterEmail':
        if (!value.trim()) {
          isValid = false;
          message = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          isValid = false;
          message = 'Please enter a valid email';
        } else {
          message = 'Valid email! ✓';
        }
        break;
    }
    
    // Ensure response time is under 400ms (Doherty Threshold)
    const responseTime = Date.now() - startTime;
    
    setValidationState(prev => ({
      ...prev,
      [fieldName]: {
        isValid,
        message,
        responseTime,
        timestamp: Date.now()
      }
    }));
    
    return isValid;
  }, []);
  
  // Doherty Threshold: Debounced validation for optimal performance
  const debouncedValidation = useCallback((fieldName, value) => {
    setIsTyping(true);
    setLastInputTime(Date.now());
    
    const timeoutId = setTimeout(() => {
      validateFieldInstantly(fieldName, value);
      setIsTyping(false);
    }, 150); // 150ms debounce for optimal UX
    
    return () => clearTimeout(timeoutId);
  }, [validateFieldInstantly]);  const validateStep = (step, currentFormData = formData) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Project Basics
        if (!currentFormData.title.trim()) {
          newErrors.title = 'Project title is required';
        } else if (currentFormData.title.length < 5) {
          newErrors.title = 'Title must be at least 5 characters long';
        }
        if (!currentFormData.description.trim()) {
          newErrors.description = 'Project description is required';
        } else if (currentFormData.description.length < 50) {
          newErrors.description = 'Description must be at least 50 characters long';
        }
        break;
        
      case 2: // Category & Difficulty
        if (!currentFormData.category) {
          newErrors.category = 'Please select a category';
        }
        if (!currentFormData.difficulty) {
          newErrors.difficulty = 'Please select a difficulty level';
        }
        break;
        
      case 3: // Project Details
        if (!currentFormData.estimatedTime) {
          newErrors.estimatedTime = 'Please select a time estimate';
        }
        break;
        
      case 4: // Contact Info
        if (!currentFormData.submitterName.trim()) {
          newErrors.submitterName = 'Your name is required';
        }
        if (!currentFormData.submitterEmail.trim()) {
          newErrors.submitterEmail = 'Your email is required';
        } else if (!/\S+@\S+\.\S+/.test(currentFormData.submitterEmail)) {
          newErrors.submitterEmail = 'Please enter a valid email address';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };  // Doherty Threshold: Optimized step navigation with user-friendly delay
  const goToNextStep = useCallback(() => {
    const startTime = Date.now();
    
    // Use setTimeout to ensure we get the latest state
    setTimeout(() => {
      console.log('Current form data at validation:', formData);
      console.log('Current step:', currentStep);
      
      if (validateStep(currentStep, formData)) {
        // Mark step as completed immediately for visual feedback
        setCompletedSteps(prev => new Set([...prev, currentStep]));
        setIsTransitioning(true);
        
        // Add a brief delay for better UX (300ms - still under Doherty Threshold)
        setTimeout(() => {
          if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
            setErrors({}); // Clear errors when moving to next step
          }
          setIsTransitioning(false);
          
          // Performance monitoring
          const transitionTime = Date.now() - startTime;
          console.log(`Step transition completed in ${transitionTime}ms`);
        }, 300); // 300ms delay for better user experience
      } else {
        console.log('Validation failed for step:', currentStep);
        console.log('Current errors would be:', errors);
      }
    }, 0); // Use 0ms timeout to ensure we get the latest state
  }, [currentStep, totalSteps, formData, errors]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({}); // Clear errors when going back
    }
  }, [currentStep]);

  const goToStep = useCallback((step) => {
    // Allow going to any completed step or the next step
    if (completedSteps.has(step) || step === currentStep || step === currentStep + 1) {
      if (step > currentStep) {
        // Validate current step before jumping forward
        if (validateStep(currentStep)) {
          setCompletedSteps(prev => new Set([...prev, currentStep]));
          setCurrentStep(step);
          setErrors({});
        }
      } else {
        setCurrentStep(step);
        setErrors({});
      }
    }
  }, [completedSteps, currentStep]);
  // Cognitive Load Theory: Progress calculation
  const getProgress = () => {
    return (completedSteps.size + (currentStep > completedSteps.size ? 0.5 : 0)) / totalSteps * 100;
  };

  // Mock data for edit mode
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
        estimatedTime: "Medium-term (1-4 weeks)",
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
  }, [isEditMode, id, navigate]);  // Doherty Threshold: Optimized input handling with instant feedback
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    const startTime = Date.now();
    
    // Instant UI update
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear existing errors immediately
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Trigger instant validation for critical fields
    if (['title', 'description', 'submitterName', 'submitterEmail'].includes(name)) {
      debouncedValidation(name, value);
    }
    
    // Performance monitoring
    const updateTime = Date.now() - startTime;
    console.log(`Input update completed in ${updateTime}ms`);
  }, [errors, debouncedValidation]);  // Doherty Threshold: Instant keyboard navigation with user-friendly delay
  const handleKeyDown = useCallback((e) => {
    // Handle Enter key for navigation (but not in textarea)
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
      e.preventDefault();
      const startTime = Date.now();
      
      // Move to next step if current step is valid
      if (currentStep < totalSteps) {
        goToNextStep();
      } else if (currentStep === totalSteps) {
        // Submit form on final step
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        e.target.form.dispatchEvent(submitEvent);
      }
      
      // Performance monitoring
      const keyboardResponseTime = Date.now() - startTime;
      console.log(`Keyboard navigation completed in ${keyboardResponseTime}ms`);
    }
    
    // Handle Escape key to go back
    if (e.key === 'Escape') {
      if (currentStep > 1) {
        goToPreviousStep();
      }
    }
  }, [currentStep, totalSteps, goToNextStep, goToPreviousStep]);

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
  // Cognitive Load Reduction: Simplified form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    let allValid = true;
    for (let step = 1; step <= totalSteps; step++) {
      if (!validateStep(step)) {
        allValid = false;
        setCurrentStep(step); // Jump to first invalid step
        break;
      }
    }
    
    if (!allValid) return;
    
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
          // Reset form and go back to step 1
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
          setCurrentStep(1);
          setCompletedSteps(new Set());
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
      </div>      {/* Form Section - Cognitive Load Theory Implementation */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          
          {/* Progress Indicator - Reduces Uncertainty and Cognitive Load */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Step {currentStep} of {totalSteps}</h3>
              <div className="text-sm text-gray-500">{Math.round(getProgress())}% Complete</div>
            </div>
            
            {/* Visual Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>            {/* Step Navigator - Fitts's Law: Larger targets, better spacing */}
            <div className="flex items-center justify-center space-x-6 sm:space-x-8">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => goToStep(step)}
                  disabled={!completedSteps.has(step) && step !== currentStep && step !== currentStep + 1}
                  className={`flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${
                    completedSteps.has(step)
                      ? 'bg-green-500 border-green-500 text-white cursor-pointer hover:bg-green-600'
                      : step === currentStep
                      ? 'bg-indigo-500 border-indigo-500 text-white animate-pulse'
                      : step === currentStep + 1
                      ? 'border-indigo-300 text-indigo-400 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50'
                      : 'border-gray-300 text-gray-400 cursor-not-allowed'
                  }`}
                  style={{ minWidth: '64px', minHeight: '64px' }} // Fitts's Law: Minimum 44px touch target, enhanced to 64px
                >
                  {completedSteps.has(step) ? '✓' : step}
                </button>
              ))}
            </div>
              {/* Keyboard Navigation Hint - Doherty Threshold UX Enhancement */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-200">
                <span className="mr-2">⌨️</span>
                Press <kbd className="px-2 py-1 mx-1 bg-white border border-blue-300 rounded text-xs font-mono">Enter</kbd> to continue with a brief validation delay, 
                <kbd className="px-2 py-1 mx-1 bg-white border border-blue-300 rounded text-xs font-mono">Esc</kbd> to go back
              </div>
            </div>
          </div>

          {/* Step Content - Progressive Disclosure */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Your Idea</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Give your project a compelling title and description. This is what people will see first!
                </p>
                <div className="mt-4 inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="mr-2">✨</span>
                  95% of users complete this step successfully
                </div>
              </div>              {/* Project Title - Doherty Threshold: Instant feedback */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Project Title *
                  <span className="text-sm font-normal text-gray-500 ml-2">(Keep it clear and memorable)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., AI-Powered Recipe Optimizer"
                    className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${
                      errors.title ? 'border-red-300 bg-red-50' : 
                      validationState.title?.isValid ? 'border-green-300 bg-green-50' :
                      'border-gray-300 hover:border-indigo-300'
                    }`}
                  />
                  {/* Doherty Threshold: Instant visual feedback */}
                  {isTyping && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
                    </div>
                  )}
                </div>
                
                {/* Real-time feedback with Doherty Threshold optimization */}
                {formData.title.length > 0 && (
                  <div className="mt-2 transition-all duration-200">
                    <div className="flex items-center mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            formData.title.length >= 20 ? 'bg-green-500' : 
                            formData.title.length >= 10 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min((formData.title.length / 30) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium transition-colors duration-200 ${
                        formData.title.length >= 20 ? 'text-green-600' : 
                        formData.title.length >= 10 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {formData.title.length >= 20 ? '🔥 Perfect!' : 
                         formData.title.length >= 10 ? '👍 Good' : '✍️ Keep going'}
                      </span>
                    </div>
                    {/* Instant validation message */}
                    {validationState.title && (
                      <p className={`text-sm font-medium transition-all duration-200 ${
                        validationState.title.isValid ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {validationState.title.message}
                        {validationState.title.responseTime && (
                          <span className="text-xs text-gray-400 ml-2">
                            ({validationState.title.responseTime}ms)
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                )}
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.title}</p>
                )}
              </div>

              {/* Project Description - Doherty Threshold: Enhanced feedback */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Project Description *
                  <span className="text-sm font-normal text-gray-500 ml-2">(Explain what it does and why it matters)</span>
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="6"
                    placeholder="Example: A mobile app that uses AI to scan your fridge contents and suggests recipes based on what you have, reducing food waste by 40% while saving users $200/month on groceries..."
                    className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg ${
                      errors.description ? 'border-red-300 bg-red-50' : 
                      validationState.description?.isValid ? 'border-green-300 bg-green-50' :
                      'border-gray-300 hover:border-indigo-300'
                    }`}
                  />
                  {/* Character count indicator */}
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                    {formData.description.length}/500
                  </div>
                </div>
                
                <div className="mt-2 transition-all duration-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {errors.description && (
                        <p className="text-sm text-red-600 font-medium">{errors.description}</p>
                      )}
                      {validationState.description && !errors.description && (
                        <p className={`text-sm font-medium transition-colors duration-200 ${
                          validationState.description.isValid ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {validationState.description.message}
                        </p>
                      )}
                    </div>
                    {formData.description.length >= 50 && !errors.description && (
                      <span className={`text-sm font-medium transition-all duration-200 ${
                        formData.description.length >= 200 ? 'text-green-600' : 
                        formData.description.length >= 100 ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        {formData.description.length >= 200 ? '🎯 Excellent detail!' : 
                         formData.description.length >= 100 ? '👌 Almost perfect!' : '✍️ Great start!'}
                      </span>
                    )}
                  </div>
                  {/* Progress bar for description length */}
                  <div className="mt-2 bg-gray-200 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        formData.description.length >= 200 ? 'bg-green-500' : 
                        formData.description.length >= 100 ? 'bg-yellow-500' : 
                        formData.description.length >= 50 ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((formData.description.length / 300) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏷️</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Categorize Your Project</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Help others discover your idea by choosing the right category and difficulty level.
                </p>
                <div className="mt-4 inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="mr-2">🔥</span>
                  Technology & Health are trending this week
                </div>
              </div>              {/* Category Selection - Chunked for Easier Processing */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Category *
                  <span className="text-sm font-normal text-gray-500 ml-2">(Choose the best fit)</span>
                  {formData.category && (
                    <span className="ml-2 text-green-600 font-medium">✓ Selected: {formData.category}</span>
                  )}
                </label>                {/* Category Selection - Fitts's Law: Larger touch targets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map(category => (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => {
                        const newFormData = { ...formData, category: category.name };
                        setFormData(newFormData);
                        // Clear category error immediately
                        if (errors.category) {
                          setErrors(prev => ({ ...prev, category: '' }));
                        }
                        console.log('Category selected:', category.name, 'New form data:', newFormData);
                      }}
                      className={`relative p-6 min-h-[120px] rounded-xl border-3 transition-all duration-300 text-center hover:scale-105 shadow-md hover:shadow-lg ${
                        formData.category === category.name
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg transform scale-105'
                          : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                      }`}
                      style={{ minHeight: '120px' }} // Fitts's Law: Larger target area
                    >
                      {category.popular && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                          🔥 Popular
                        </div>
                      )}
                      <div className="text-4xl mb-3">{category.emoji}</div>
                      <div className="font-bold text-lg mb-2">{category.name}</div>
                      <div className="text-sm text-gray-600">{category.description}</div>
                    </button>
                  ))}
                </div>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.category}</p>
                )}
              </div>              {/* Difficulty Selection - Simplified Choices */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Difficulty Level *
                  <span className="text-sm font-normal text-gray-500 ml-2">(How complex is the implementation?)</span>
                  {formData.difficulty && (
                    <span className="ml-2 text-green-600 font-medium">✓ Selected: {formData.difficulty}</span>
                  )}
                </label>                {/* Difficulty Selection - Fitts's Law: Enhanced target sizes */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {difficulties.map(diff => (
                    <button
                      key={diff.level}
                      type="button"
                      onClick={() => {
                        const newFormData = { ...formData, difficulty: diff.level };
                        setFormData(newFormData);
                        // Clear difficulty error immediately
                        if (errors.difficulty) {
                          setErrors(prev => ({ ...prev, difficulty: '' }));
                        }
                        console.log('Difficulty selected:', diff.level, 'New form data:', newFormData);
                      }}
                      className={`p-8 min-h-[160px] rounded-xl border-3 transition-all duration-300 text-left hover:scale-105 shadow-md hover:shadow-lg ${
                        formData.difficulty === diff.level
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg transform scale-105'
                          : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                      }`}
                      style={{ minHeight: '160px' }} // Fitts's Law: Larger target area
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-4">{diff.icon}</span>
                        <div>
                          <div className="font-bold text-xl">{diff.level}</div>
                          {diff.popular && (
                            <div className="text-sm text-green-600 font-semibold">⭐ Most Popular</div>
                          )}
                        </div>
                      </div>
                      <p className="text-base text-gray-600 mb-3 leading-relaxed">{diff.description}</p>
                      <p className="text-sm text-indigo-600 font-semibold">⏱️ {diff.timeframe}</p>
                    </button>
                  ))}
                </div>
                {errors.difficulty && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.difficulty}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">⚙️</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Details</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Add some specifics to help others understand the scope and requirements.
                </p>
                <div className="mt-4 inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="mr-2">⏱️</span>
                  Most successful projects take 1-4 weeks
                </div>
              </div>              {/* Time Estimate - Essential Information */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Estimated Timeline *
                  <span className="text-sm font-normal text-gray-500 ml-2">(How long might this take?)</span>
                  {formData.estimatedTime && (
                    <span className="ml-2 text-green-600 font-medium">✓ Selected: {formData.estimatedTime}</span>
                  )}
                </label>                {/* Time Estimate - Fitts's Law: Optimized layout and sizing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {timeEstimates.map((time) => (
                    <button
                      key={time.value}
                      type="button"
                      onClick={() => {
                        const newFormData = { ...formData, estimatedTime: time.value };
                        setFormData(newFormData);
                        // Clear estimatedTime error immediately
                        if (errors.estimatedTime) {
                          setErrors(prev => ({ ...prev, estimatedTime: '' }));
                        }
                        console.log('Time estimate selected:', time.value, 'New form data:', newFormData);
                      }}
                      className={`relative p-6 min-h-[120px] rounded-lg border-3 transition-all duration-300 text-center hover:scale-105 shadow-md hover:shadow-lg ${
                        formData.estimatedTime === time.value
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg transform scale-105'
                          : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                      }`}
                      style={{ minHeight: '120px' }} // Fitts's Law: Larger target area
                    >                      {time.popular && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                          ⭐ Popular
                        </div>
                      )}
                      <div className="font-bold text-lg mb-2">{time.label}</div>
                      <div className="text-sm text-gray-600">{time.value}</div>
                    </button>
                  ))}
                </div>
                {errors.estimatedTime && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.estimatedTime}</p>
                )}
              </div>

              {/* Optional Fields - Progressive Disclosure */}
              <div className="border-t border-gray-200 pt-8">
                <button
                  type="button"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="flex items-center w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-300"
                >
                  <span className="text-lg font-medium text-gray-700 flex-1">
                    Optional Details (Advanced)
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${showAdvancedOptions ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvancedOptions && (
                  <div className="mt-6 space-y-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Skills Needed
                      </label>
                      <input
                        type="text"
                        name="requiredSkills"
                        value={formData.requiredSkills}
                        onChange={handleInputChange}
                        placeholder="e.g., JavaScript, UI Design, Marketing"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Tags
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="e.g., AI, mobile, sustainability"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Resources & References
                      </label>
                      <textarea
                        name="resources"
                        value={formData.resources}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Include any helpful links, tools, or resources"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">👤</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Let people know how to reach you if they're interested in collaborating.
                </p>
                <div className="mt-4 inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="mr-2">🔒</span>
                  Your information is kept private and secure
                </div>
              </div>

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

              {/* Contact Preference */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  How can people contact you?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.contactPreference === 'email' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:bg-gray-50'
                  }`}>
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
                      <p className="text-sm text-gray-500">Allow interested people to reach out</p>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.contactPreference === 'none' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="contactPreference"
                      value="none"
                      checked={formData.contactPreference === 'none'}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-lg font-medium">🔒 Anonymous</span>
                      <p className="text-sm text-gray-500">Share idea without contact</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}          {/* Navigation Buttons - Fitts's Law: Larger targets, better proximity */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8 gap-4">
            <button
              type="button"
              onClick={currentStep > 1 ? goToPreviousStep : () => navigate('/')}
              className="flex items-center justify-center min-w-[140px] min-h-[56px] px-8 py-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300 font-medium border-2 border-gray-300 hover:border-gray-400"
              style={{ minWidth: '140px', minHeight: '56px' }} // Fitts's Law: Minimum touch target size
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              {currentStep > 1 ? 'Previous' : 'Cancel'}
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={goToNextStep}
                disabled={isTransitioning}
                className={`flex items-center justify-center min-w-[160px] min-h-[56px] px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isTransitioning
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                }`}
                style={{ minWidth: '160px', minHeight: '56px' }} // Fitts's Law: Larger primary action button
              >
                {isTransitioning ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Next Step
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center min-w-[180px] min-h-[56px] px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                }`}
                style={{ minWidth: '180px', minHeight: '56px' }} // Fitts's Law: Largest button for final action
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="mr-2 text-xl">🚀</span>
                    {isEditMode ? 'Update Idea' : 'Submit Idea'}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitIdea;
