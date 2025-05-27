import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * AUTH CONTEXT FOR USER AUTHENTICATION STATE MANAGEMENT
 * 
 * Provides:
 * - Login/logout functionality
 * - User state persistence
 * - Authentication status tracking
 * - User profile data management
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
  const [isLoading, setIsLoading] = useState(true);  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('wantanidea_user');
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('wantanidea_user');
      }
    }
    setIsLoading(false);
  }, []);  // Login function
  const login = (userData) => {
    const userWithDefaults = {
      id: userData.id || Date.now(),
      email: userData.email,
      name: userData.name || userData.email.split('@')[0],
      profilePicture: userData.profilePicture || null,
      joinDate: userData.joinDate || new Date().toISOString(),
      isVerified: userData.isVerified || false,
      preferences: userData.preferences || {
        emailNotifications: true,
        ideaRecommendations: true,
        weeklyDigest: true,
        profileVisibility: 'public'
      },
      stats: userData.stats || {
        ideasSubmitted: 0,
        profileViews: 0,
        inspirationCount: 0,
        totalShares: 0
      },
      ...userData
    };

    setUser(userWithDefaults);
    localStorage.setItem('wantanidea_user', JSON.stringify(userWithDefaults));
    return userWithDefaults;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('wantanidea_user');
  };

  // Update user data
  const updateUser = (updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('wantanidea_user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
