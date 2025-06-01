import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../services/api';
import { Eye, EyeOff, ArrowLeft, Shield, CheckCircle,  } from 'lucide-react';

// Enhanced Toast Component
const ResetPasswordToast = ({ message, type, isVisible, onHide }) => {
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
      <div className={`rounded-3xl p-6 shadow-2xl backdrop-blur-sm max-w-sm border-3 transform hover:scale-105 transition-all duration-300 ${
        type === 'success' ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 text-green-800' :
        type === 'error' ? 'bg-gradient-to-r from-red-100 to-pink-100 border-red-300 text-red-800' :
        'bg-white/90 border-orange-300 text-gray-900'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex">
            <div className="flex-shrink-0 text-2xl animate-bounce">
              {type === 'success' && '🎉'}
              {type === 'error' && '😓'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold">{message}</p>
            </div>
          </div>
          <button onClick={onHide} className="text-current opacity-70 hover:opacity-100 transition-opacity font-bold text-lg">
            <span className="sr-only">Close</span>
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
    if (strength >= 4) return 'bg-gradient-to-r from-emerald-400 to-green-500';
    if (strength >= 3) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (strength >= 1) return 'bg-gradient-to-r from-orange-400 to-red-500';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  if (!password) return null;

  return (
    <div className="mt-3 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border-2 border-orange-200">
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-3 flex-1 rounded-full ${
              level <= strength ? getStrengthColor() : 'bg-gray-200'
            } transition-all duration-300`}
          />
        ))}
      </div>
      <p className="text-sm font-bold text-gray-700">{feedback}</p>
    </div>
  );
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Get token from URL on mount
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      // No token provided, redirect to forgot password
      navigate('/auth?mode=forgot-password');
    }
  }, [searchParams, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.newPassword) {
      errors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await authAPI.resetPassword(token, formData.newPassword);
      
      if (result.success) {
        setResetSuccess(true);
        setToastMessage('🎉 Password reset successfully! You can now sign in with your new password.');
        setToastType('success');
        setShowToast(true);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/auth?mode=login');
        }, 3000);
      } else {
        setToastMessage(result.error || 'Failed to reset password. The link may be expired.');
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setToastMessage('Failed to reset password. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ResetPasswordToast
          message={toastMessage}
          type={toastType}
          isVisible={showToast}
          onHide={() => setShowToast(false)}
        />
        
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl border-2 border-green-200 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successfully!</h2>
            <p className="text-gray-600 mb-6">Your password has been updated. You will be redirected to the login page.</p>
            <button
              onClick={() => navigate('/auth?mode=login')}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <ResetPasswordToast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />

      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/auth?mode=login')}
            className="flex items-center text-orange-600 hover:text-orange-700 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Login</span>
          </button>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl border-2 border-orange-200">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl inline-flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
            <p className="text-gray-600">Enter your new password below.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* New Password field */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                🔒 New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 text-gray-900 placeholder-gray-500 pr-12 ${
                    formErrors.newPassword ? 'border-red-500' : 'border-orange-200'
                  }`}
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-orange-500 hover:text-orange-600 transition-colors duration-200" />
                  ) : (
                    <Eye className="w-5 h-5 text-orange-500 hover:text-orange-600 transition-colors duration-200" />
                  )}
                </button>
              </div>
              {formErrors.newPassword && (
                <p className="mt-1 text-sm text-red-600">{formErrors.newPassword}</p>
              )}
              <PasswordStrengthIndicator password={formData.newPassword} />
            </div>

            {/* Confirm Password field */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                🔐 Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 text-gray-900 placeholder-gray-500 pr-12 ${
                    formErrors.confirmPassword ? 'border-red-500' : 'border-orange-200'
                  }`}
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Reset Password
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <button
              onClick={() => navigate('/auth?mode=login')}
              className="text-orange-600 hover:text-orange-700 hover:underline font-bold transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
