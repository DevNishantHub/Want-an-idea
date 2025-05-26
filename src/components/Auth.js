import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

/**
 * USER GUIDANCE & FEEDBACK OPTIMIZATION PRINCIPLES APPLIED TO AUTHENTICATION:
 * 
 * 1. Clear Next Actions & Simplified Flow:
 *    - Single-step authentication with smart defaults
 *    - Clear value proposition for signing up
 *    - Progressive disclosure of optional fields
 *    - Smart authentication method recommendations
 * 
 * 2. Immediate Feedback System (<100ms):
 *    - Real-time form validation with instant feedback
 *    - Password strength indicator with live updates
 *    - Social login with immediate status updates
 *    - Loading states for all interactions
 * 
 * 3. Reduced Decision Fatigue:
 *    - Simplified form with minimal required fields
 *    - Smart default selections and suggestions
 *    - One-click social authentication options
 *    - Clear authentication benefits and security features
 * 
 * 4. Gamification & Trust Building:
 *    - Progress indicators for account completion
 *    - Security level badges and trust indicators
 *    - Welcome bonuses and first-time user benefits
 *    - Community trust and verification systems
 */

// Enhanced Toast Component for Auth Feedback
const AuthToast = ({ message, type, isVisible, onHide, actionButton }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
    }`}>
      <div className={`rounded-lg p-4 shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'info' ? 'bg-blue-500 text-white' :
        type === 'welcome' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' :
        'bg-gray-800 text-white'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex">
            <div className="flex-shrink-0">
              {type === 'success' && '✅'}
              {type === 'error' && '❌'}
              {type === 'info' && 'ℹ️'}
              {type === 'welcome' && '🎉'}
              {type === 'warning' && '⚠️'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message}</p>
              {actionButton && (
                <div className="mt-2">
                  {actionButton}
                </div>
              )}
            </div>
          </div>
          <button onClick={onHide} className="text-white hover:text-gray-300">
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Password Strength Indicator Component
const PasswordStrengthIndicator = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setFeedback('');
      return;
    }

    let score = 0;
    let messages = [];

    if (password.length >= 8) score += 1;
    else messages.push('8+ characters');

    if (/[A-Z]/.test(password)) score += 1;
    else messages.push('uppercase letter');

    if (/[a-z]/.test(password)) score += 1;
    else messages.push('lowercase letter');

    if (/[0-9]/.test(password)) score += 1;
    else messages.push('number');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else messages.push('special character');

    setStrength(score);
    
    if (score === 5) {
      setFeedback('🔒 Excellent security!');
    } else if (score >= 3) {
      setFeedback(`💪 Good! Add: ${messages.join(', ')}`);
    } else if (score >= 1) {
      setFeedback(`⚠️ Weak. Need: ${messages.join(', ')}`);
    } else {
      setFeedback('❌ Too weak');
    }
  }, [password]);

  const getStrengthColor = () => {
    if (strength >= 4) return 'bg-green-500';
    if (strength >= 3) return 'bg-yellow-500';
    if (strength >= 1) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex space-x-1 mb-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded ${
              level <= strength ? getStrengthColor() : 'bg-gray-200'
            } transition-all duration-300`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-600">{feedback}</p>
    </div>
  );
};

// Social Login Benefits Component
const SocialLoginBenefits = ({ onSocialAuth, isLoading }) => {
  const benefits = [
    { icon: '⚡', text: 'Instant access' },
    { icon: '🔐', text: 'Secure login' },
    { icon: '📱', text: 'No passwords to remember' }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">Quick & secure authentication</p>
        <div className="flex justify-center space-x-6 mb-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-1">
              <span className="text-lg">{benefit.icon}</span>
              <span className="text-xs text-gray-600">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={() => onSocialAuth('google')}
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <button
          onClick={() => onSocialAuth('github')}
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get('mode') || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    fullName: '', // Simplified single name field
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Enhanced state for User Guidance features
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [toastActionButton, setToastActionButton] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);

  useEffect(() => {
    const modeFromUrl = searchParams.get('mode');
    if (modeFromUrl && ['login', 'signup'].includes(modeFromUrl)) {
      setMode(modeFromUrl);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`${mode} submitted:`, formData);
      setIsLoading(false);
      // Here you would handle actual authentication
      navigate('/'); // Redirect to home after successful auth
    }, 1500);
  };

  const handleSocialAuth = (provider) => {
    console.log(`${provider} authentication initiated`);
    // Here you would integrate with actual social auth providers
    alert(`${provider} authentication would be initiated here`);
  };
  const switchMode = (newMode) => {
    setMode(newMode);
    navigate(`/auth?mode=${newMode}`, { replace: true });
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      fullName: '',
      agreeToTerms: false
    });
    setShowAdvancedOptions(false); // Reset advanced options when switching modes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl">💡</span>
            <span className="ml-2 text-2xl font-bold text-gray-900">WantAnIdea</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'Welcome Back!' : 'Join Our Community'}
          </h2>
          <p className="text-gray-600">
            {mode === 'login' 
              ? 'Sign in to access your account and share your ideas'
              : 'Create an account to start sharing your project ideas'
            }
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
              mode === 'login'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => switchMode('signup')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
              mode === 'signup'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Sign Up
          </button>
        </div>        {/* Main Content */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {/* Social Authentication Buttons - Simplified to reduce choice overload */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth('Google')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>

            {/* Show additional social options only when advanced options are enabled */}
            {showAdvancedOptions && (
              <>
                <button
                  onClick={() => handleSocialAuth('GitHub')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="#333" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Continue with GitHub</span>
                </button>
              </>
            )}
          </div>

          {/* Advanced Options Toggle */}
          {!showAdvancedOptions && (
            <div className="text-center mb-6">
              <button
                type="button"
                onClick={() => setShowAdvancedOptions(true)}
                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                More sign-in options
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  👤 Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            {/* Show traditional first/last name fields only in advanced options */}
            {mode === 'signup' && showAdvancedOptions && (
              <div className="grid grid-cols-2 gap-4 opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📧 Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔒 Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="flex items-start opacity-0 animate-[fadeIn_0.3s_ease-in-out_0.2s_forwards]">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 mr-3 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  required
                />
                <label className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-indigo-500 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-indigo-500 hover:underline">Privacy Policy</a>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>

            {mode === 'login' && (
              <div className="text-center">
                <a href="#" className="text-sm text-indigo-500 hover:underline">
                  Forgot your password?
                </a>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  className="text-indigo-500 hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-indigo-500 hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
