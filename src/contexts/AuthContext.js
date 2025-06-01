import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI, ApiError } from '../services/api';

/**
 * AUTH CONTEXT FOR USER AUTHENTICATION STATE MANAGEMENT
 * 
 * Provides:
 * - Login/logout functionality with backend integration
 * - User state persistence with JWT tokens
 * - Authentication status tracking
 * - User profile data management
 * - Automatic token refresh
 */

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('wantanidea_user');
      const savedToken = localStorage.getItem('wantanidea_token');
      const savedRefreshToken = localStorage.getItem('wantanidea_refresh_token');
      
      if (savedUser && savedToken) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          // Verify token is still valid by fetching user profile
          try {
            const currentUser = await userAPI.getProfile();
            if (currentUser) {
              setUser(currentUser);
              localStorage.setItem('wantanidea_user', JSON.stringify(currentUser));
            }
          } catch (error) {
            // Token might be expired, try to refresh if we have a refresh token
            if (savedRefreshToken && error.status === 401) {
              try {
                console.log('Access token expired, attempting refresh...');
                const refreshResponse = await authAPI.refresh(savedRefreshToken);
                
                if (refreshResponse.token) {
                  localStorage.setItem('wantanidea_token', refreshResponse.token);
                  if (refreshResponse.refreshToken) {
                    localStorage.setItem('wantanidea_refresh_token', refreshResponse.refreshToken);
                  }
                  
                  // Try to get user profile again with new token
                  const currentUser = await userAPI.getProfile();
                  if (currentUser) {
                    setUser(currentUser);
                    localStorage.setItem('wantanidea_user', JSON.stringify(currentUser));
                  }
                  console.log('Token refreshed successfully');
                } else {
                  throw new Error('Invalid refresh response');
                }
              } catch (refreshError) {
                console.warn('Token refresh failed:', refreshError);
                clearAuthData();
              }
            } else {
              console.warn('Token validation failed:', error);
              clearAuthData();
            }
          }
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          clearAuthData();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Clear all auth data
  const clearAuthData = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('wantanidea_user');
    localStorage.removeItem('wantanidea_token');
    localStorage.removeItem('wantanidea_refresh_token');
  };
  // Login function
  const login = async (credentials) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await authAPI.login(credentials);
      console.log('AuthContext: Login response:', response);
      
      // Backend returns { verified: true, token, refreshToken, userId, email, name }
      if (response.verified && response.token) {
        // Create user object from backend response data
        const userWithDefaults = {
          id: response.userId,
          email: response.email,
          name: response.name,
          preferences: {
            emailNotifications: true,
            weeklyDigest: true,
            profileVisibility: 'public'
          },
          stats: {
            ideasSubmitted: 0,
            profileViews: 0,
            inspirationCount: 0,
            totalShares: 0
          }
        };

        setUser(userWithDefaults);
        localStorage.setItem('wantanidea_user', JSON.stringify(userWithDefaults));
        localStorage.setItem('wantanidea_token', response.token);
        
        if (response.refreshToken) {
          localStorage.setItem('wantanidea_refresh_token', response.refreshToken);
        }
        
        return { success: true, user: userWithDefaults };
      } else {
        // Handle failed login - backend returns verified: false
        const errorMessage = 'Invalid email or password. Please try again.';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };// Register function
  const register = async (userData) => {
    setError(null);
    setIsLoading(true);

    try {      console.log('AuthContext: Starting registration with data:', userData);
      const response = await authAPI.register(userData);
      console.log('AuthContext: Registration response:', response);
      
      // Check if user was created successfully even if token generation failed
      if (response.success && response.user && response.token) {
        // Set default values for new user
        const userWithDefaults = {
          ...response.user,
          preferences: response.user.preferences || {
            emailNotifications: true,
            weeklyDigest: true,
            profileVisibility: 'public'
          },
          stats: response.user.stats || {
            ideasSubmitted: 0,
            profileViews: 0,
            inspirationCount: 0,
            totalShares: 0
          }
        };

        setUser(userWithDefaults);
        localStorage.setItem('wantanidea_user', JSON.stringify(userWithDefaults));
        localStorage.setItem('wantanidea_token', response.token);
        
        if (response.refreshToken) {
          localStorage.setItem('wantanidea_refresh_token', response.refreshToken);
        }
          return { success: true, user: userWithDefaults };      } else {
        // Handle failed registration - return the error from backend
        const errorMessage = response.message || 'Registration failed. Please try again.';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  // Logout function - Client-side only
  const logout = () => {
    // No need to call backend - just clear all auth data locally
    clearAuthData();
    console.log('User logged out successfully');
  };

  // Update user data
  const updateUser = async (updates) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    setError(null);
    
    try {
      const updatedUser = await userAPI.updateProfile(updates);
      setUser(updatedUser);
      localStorage.setItem('wantanidea_user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Failed to update profile';
      setError(errorMessage);
      return { success: false, error: errorMessage };    }
  };

  // Social authentication functions
  const socialLogin = async (provider, token) => {
    setError(null);
    setIsLoading(true);

    try {
      let response;
      
      switch (provider) {
        case 'google':
          response = await authAPI.socialGoogle(token);
          break;
        case 'github':
          response = await authAPI.socialGithub(token);
          break;
        case 'linkedin':
          response = await authAPI.socialLinkedin(token);
          break;
        default:
          throw new Error('Unsupported social provider');
      }

      if (response.user && response.token) {
        // Set default values for social login users
        const userWithDefaults = {
          ...response.user,
          preferences: response.user.preferences || {
            emailNotifications: true,
            weeklyDigest: true,
            profileVisibility: 'public'
          },
          stats: response.user.stats || {
            ideasSubmitted: 0,
            profileViews: 0,
            inspirationCount: 0,
            totalShares: 0
          }
        };

        setUser(userWithDefaults);
        localStorage.setItem('wantanidea_user', JSON.stringify(userWithDefaults));
        localStorage.setItem('wantanidea_token', response.token);
        
        if (response.refreshToken) {
          localStorage.setItem('wantanidea_refresh_token', response.refreshToken);
        }
        
        return { success: true, user: userWithDefaults };
      } else {
        const errorMessage = 'Social authentication failed. Please try again.';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Social authentication failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!user && !!localStorage.getItem('wantanidea_token');
  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUser,
    clearAuthData,
    socialLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;