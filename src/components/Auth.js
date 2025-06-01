import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { Eye, EyeOff, ArrowLeft, Brain, Sparkles, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { OAUTH_CONFIG } from '../config/oauth';

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
      <div className={`rounded-xl p-4 shadow-lg max-w-sm border ${
        type === 'success' ? 'bg-green-100 border-green-300 text-green-800' :
        type === 'error' ? 'bg-red-100 border-red-300 text-red-800' :
        type === 'info' ? 'bg-blue-100 border-blue-300 text-blue-800' :
        type === 'warning' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
        'bg-white border-gray-300 text-gray-900'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex">
            <div className="flex-shrink-0 text-lg mr-2">
              {type === 'success' && '✅'}
              {type === 'error' && '❌'}
              {type === 'info' && 'ℹ️'}
              {type === 'warning' && '⚠️'}
            </div>
            <div>
              <p className="text-sm font-medium">{message}</p>
              {actionButton && (
                <div className="mt-2">
                  {actionButton}
                </div>
              )}
            </div>
          </div>
          <button onClick={onHide} className="text-current opacity-70 hover:opacity-100 transition-opacity font-bold">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Password Strength Indicator
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
      setFeedback('🚀 Excellent security!');
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
    <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded ${
              level <= strength ? getStrengthColor() : 'bg-gray-200'
            } transition-all duration-300`}
          />
        ))}
      </div>
      <p className="text-sm font-medium text-gray-700">{feedback}</p>
    </div>
  );
};

const Auth = () => {
  const navigate = useNavigate();
  const { login, register, socialLogin, isLoading: authLoading, error: authError } = useAuth();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get('mode') || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  // State for User Guidance features
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [formErrors, setFormErrors] = useState({});

  // State for email verification and forgot password
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);
  useEffect(() => {
    const modeFromUrl = searchParams.get('mode');
    if (modeFromUrl && ['login', 'signup', 'forgot-password'].includes(modeFromUrl)) {
      setMode(modeFromUrl);
    }

    // Handle OAuth callbacks
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    if (code) {
      // Handle OAuth callback
      if (state === 'google') {
        handleOAuthCallback('google', code);
      } else if (state === 'github') {
        handleOAuthCallback('github', code);
      }
    }
  }, [searchParams]);

  // Handle email verification on component mount
  useEffect(() => {
    const verificationToken = searchParams.get('token');
    const emailParam = searchParams.get('email');
    
    if (verificationToken) {
      handleEmailVerification(verificationToken);
    }
    
    // Pre-fill email if provided in URL
    if (emailParam && !formData.email) {
      setFormData(prev => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  // Handle email verification
  const handleEmailVerification = async (token) => {
    setIsVerifying(true);
    setVerificationStatus(null);
    
    try {
      const result = await authAPI.verifyEmail(token);
      
      if (result.success) {
        setVerificationStatus('success');
        setToastMessage('Email verified successfully! You can now sign in.');
        setToastType('success');
        setShowToast(true);
        
        // Switch to login mode and clear URL params
        setTimeout(() => {
          setMode('login');
          navigate('/auth?mode=login', { replace: true });
        }, 2000);
      } else {
        setVerificationStatus('error');
        setToastMessage('Email verification failed. The link may be expired or invalid.');
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Email verification error:', error);
      setVerificationStatus('error');
      setToastMessage('Email verification failed. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setFormErrors({ email: 'Email is required' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormErrors({ email: 'Email is invalid' });
      return;
    }
    
    setIsForgotPasswordLoading(true);
    setFormErrors({});
    
    try {
      const result = await authAPI.forgotPassword(formData.email);
      
      // If the API call succeeds (no error thrown), treat it as successful
      // Backend returns 200 OK for successful forgot password requests
      setForgotPasswordSent(true);
      setToastMessage('Password reset link sent! Check your email.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      setToastMessage('Failed to send password reset email. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  // Handle resend verification email
  const handleResendVerification = async () => {
    if (!formData.email) {
      setToastMessage('Please enter your email address first.');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    setResendingVerification(true);
    
    try {
      const result = await authAPI.resendVerification(formData.email);
      
      if (result.success) {
        setToastMessage('Verification email sent! Check your inbox.');
        setToastType('success');
        setShowToast(true);
      } else {
        setToastMessage(result.error || 'Failed to send verification email. Please try again.');
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      setToastMessage('Failed to send verification email. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setResendingVerification(false);
    }
  };

  // Show auth errors as toast
  useEffect(() => {
    if (authError) {
      setToastMessage(authError);
      setToastType('error');
      setShowToast(true);
    }
  }, [authError]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Registration-specific validation
    if (mode === 'signup') {
      if (!formData.name.trim()) {
        errors.name = 'Name is required';
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      let result;
      
      if (mode === 'login') {
        // Login with email and password
        result = await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        // Register with email, password, and name
        result = await register({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          name: formData.name
        });
      }

      console.log('Auth result:', result);
      
      // Handle successful authentication
      if (result && result.success) {
        setToastMessage(mode === 'signup' ? 
          'Welcome! Your account has been created successfully.' : 
          'Welcome back! You\'ve been signed in successfully.'
        );
        setToastType('success');
        setShowToast(true);
        
        // Redirect to account page after successful auth
        setTimeout(() => {
          navigate('/account');
        }, 1000);
        return;
      }

      // Handle registration-specific cases where user might be created but token failed
      if (mode === 'signup' && result && !result.success) {
        const errorMessage = result.error || '';
        
        // Check if this is a JWT/token generation error but user was likely created
        if (errorMessage.includes('jjwt') || errorMessage.includes('JWT') || errorMessage.includes('token')) {
          setToastMessage('Account created successfully! There was an issue with automatic login due to server configuration. Please log in manually.');
          setToastType('warning');
          setShowToast(true);
          
          // Auto-switch to login mode and pre-fill email
          setTimeout(() => {
            setMode('login');
            navigate('/auth?mode=login', { replace: true });
            setFormData(prev => ({
              email: prev.email, // Keep the email
              password: '',
              confirmPassword: '',
              name: ''
            }));
            setFormErrors({});
          }, 3000);
          return;
        }
      }

      // Handle other authentication failures
      setToastMessage(result?.error || 'Authentication failed. Please try again.');
      setToastType('error');
      setShowToast(true);
      
    } catch (error) {
      console.error('Auth error:', error);
      console.error('Error details:', error.message, error.stack);
      setToastMessage(`Something went wrong: ${error.message || 'Please try again.'}`);
      setToastType('error');
      setShowToast(true);
    }
  };
  // Handle OAuth callback from provider
  const handleOAuthCallback = async (provider, code) => {
    try {
      setToastMessage(`Processing ${provider} authentication...`);
      setToastType('info');
      setShowToast(true);
      
      const result = await socialLogin(provider, code);
      
      if (result && result.success) {
        setToastMessage(`Welcome! You've been signed in with ${provider} successfully.`);
        setToastType('success');
        setShowToast(true);
        
        // Clear URL parameters and redirect
        navigate('/account', { replace: true });
      } else {
        setToastMessage(result?.error || `${provider} authentication failed. Please try again.`);
        setToastType('error');
        setShowToast(true);
        
        // Clear URL parameters and return to login
        navigate('/auth?mode=login', { replace: true });
      }
    } catch (error) {
      console.error(`${provider} OAuth callback error:`, error);
      setToastMessage(`${provider} authentication failed. Please try again.`);
      setToastType('error');
      setShowToast(true);
      
      // Clear URL parameters and return to login
      navigate('/auth?mode=login', { replace: true });
    }
  };

  // Handle Google authentication
  const handleGoogleAuth = async () => {
    try {
      // Create Google OAuth URL with state parameter
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${OAUTH_CONFIG.google.clientId}&` +
        `redirect_uri=${encodeURIComponent(OAUTH_CONFIG.google.redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(OAUTH_CONFIG.google.scope)}&` +
        `access_type=offline&` +
        `prompt=consent&` +
        `state=google`;
      
      // Redirect to Google OAuth
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error('Google auth error:', error);
      setToastMessage('Failed to initiate Google authentication. Please try again.');
      setToastType('error');
      setShowToast(true);
    }
  };

  // Handle GitHub authentication
  const handleGithubAuth = async () => {
    try {
      if (!OAUTH_CONFIG.github.clientId) {
        setToastMessage('GitHub authentication is not configured yet. Please use email signup for now.');
        setToastType('warning');
        setShowToast(true);
        return;
      }
      
      // Create GitHub OAuth URL with state parameter
      const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
        `client_id=${OAUTH_CONFIG.github.clientId}&` +
        `redirect_uri=${encodeURIComponent(OAUTH_CONFIG.github.redirectUri)}&` +
        `scope=${encodeURIComponent(OAUTH_CONFIG.github.scope)}&` +
        `state=github`;
      
      // Redirect to GitHub OAuth
      window.location.href = githubAuthUrl;
    } catch (error) {
      console.error('GitHub auth error:', error);
      setToastMessage('Failed to initiate GitHub authentication. Please try again.');
      setToastType('error');
      setShowToast(true);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    navigate(`/auth?mode=${newMode}`, { replace: true });
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setFormErrors({});
    // Reset forgot password and verification states
    setForgotPasswordSent(false);
    setVerificationStatus(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <AuthToast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />

      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-orange-600 hover:text-orange-700 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>

        {/* Mode Toggle - Only show for login/signup */}
        {mode !== 'forgot-password' && (
          <div className="flex bg-orange-100 rounded-xl p-1 border-2 border-orange-200">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 px-4 text-sm font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2 px-4 text-sm font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-200">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back!' : 
               mode === 'signup' ? 'Create Account' :
               'Reset Password'}
            </h2>
            <p className="text-gray-600 mt-2">
              {mode === 'login' 
                ? 'Sign in to access your account'
                : mode === 'signup'
                ? 'Create an account to get started'
                : 'Enter your email to reset your password'
              }
            </p>
          </div>
          
          {/* Email Verification Status */}
          {isVerifying && (
            <div className="mb-6 p-4 bg-blue-100 rounded-xl border border-blue-300">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-800 font-medium">Verifying your email...</span>
              </div>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 rounded-xl border border-green-300">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-800 font-medium">Email verified successfully!</span>
              </div>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 rounded-xl border border-red-300">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-red-800 font-medium">Email verification failed.</span>
              </div>
            </div>
          )}

          {/* Forgot Password Mode */}
          {mode === 'forgot-password' && (
            <>
              <div className="text-center mb-6">
                <div className="p-3 bg-orange-100 rounded-xl inline-flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Reset Your Password</h3>
                <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
              </div>

              {!forgotPasswordSent ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isForgotPasswordLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isForgotPasswordLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Send Reset Link
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="p-4 bg-green-100 rounded-xl border border-green-300">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">Reset link sent!</p>
                    <p className="text-green-700 text-sm mt-1">Check your email for the password reset link.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setForgotPasswordSent(false);
                      setFormData(prev => ({ ...prev, email: '' }));
                    }}
                    className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                  >
                    Try a different email
                  </button>
                </div>
              )}
            </>
          )}

          {/* Login/Signup Form */}
          {(mode === 'login' || mode === 'signup') && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name field for signup only */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                    required
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                  required
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot-password')}
                      className="text-sm text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all pr-12 ${
                      formErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
                {mode === 'signup' && <PasswordStrengthIndicator password={formData.password} />}
              </div>

              {/* Confirm Password field for signup only */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all pr-12 ${
                        formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  <span className="flex items-center">
                    {mode === 'login' ? (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Sign In
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Create Account
                      </>
                    )}
                  </span>
                )}
              </button>

              {/* Social Authentication - Only show for login/signup */}
              {(mode === 'login' || mode === 'signup') && (
                <>
                  {/* Social Authentication Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Authentication Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      disabled={authLoading}
                      className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={handleGithubAuth}
                      disabled={authLoading}
                      className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </button>
                  </div>
                </>
              )}

              {/* Resend Verification Email */}
              {mode === 'login' && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Didn't receive email verification?</p>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resendingVerification}
                    className="text-sm text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors disabled:opacity-50"
                  >
                    {resendingVerification ? 'Sending...' : 'Resend verification email'}
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                >
                  Sign in
                </button>
              </>
            ) : mode === 'forgot-password' ? (
              <>
                Remember your password?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                >
                  Back to Sign In
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
