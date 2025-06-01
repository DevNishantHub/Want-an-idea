/**
 * API Service for WantAnIdea Backend
 * Handles all HTTP requests to the Spring Boot backend with automatic token refresh
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  // Process failed queue after token refresh
  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  // Handle token refresh
  async handleTokenRefresh() {
    const refreshToken = localStorage.getItem('wantanidea_refresh_token');
    
    if (!refreshToken) {
      throw new ApiError(401, 'No refresh token available');
    }

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('admin:changeme')}` // Basic auth for refresh endpoint
        },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to refresh token');
      }

      const data = await response.json();
      
      // Update tokens in localStorage
      localStorage.setItem('wantanidea_token', data.token);
      if (data.refreshToken) {
        localStorage.setItem('wantanidea_refresh_token', data.refreshToken);
      }

      return data.token;
    } catch (error) {
      // Clear auth data if refresh fails
      localStorage.removeItem('wantanidea_token');
      localStorage.removeItem('wantanidea_refresh_token');
      localStorage.removeItem('wantanidea_user');
      
      throw new ApiError(401, 'Session expired. Please login again.');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add basic auth for /auth/ endpoints
    if (endpoint.startsWith('/auth/')) {
      const basicAuth = btoa('admin:changeme');
      config.headers.Authorization = `Basic ${basicAuth}`;
    } else {
      // Add JWT token for other authenticated endpoints
      const token = localStorage.getItem('wantanidea_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    try {
      console.log('Making API request to:', url);
      console.log('Request config:', config);
      
      const response = await fetch(url, config);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401 && !endpoint.startsWith('/auth/')) {
        // If already refreshing, queue this request
        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then(token => {
            // Retry original request with new token
            const newConfig = {
              ...config,
              headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`
              }
            };
            return fetch(url, newConfig).then(res => res.json());
          });
        }

        this.isRefreshing = true;

        try {
          const newToken = await this.handleTokenRefresh();
          this.processQueue(null, newToken);
          
          // Retry original request with new token
          const newConfig = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newToken}`
            }
          };
          
          const retryResponse = await fetch(url, newConfig);
          
          if (!retryResponse.ok) {
            let errorData = {};
            const contentType = retryResponse.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
              errorData = await retryResponse.json().catch(() => ({}));
            } else {
              const textResponse = await retryResponse.text().catch(() => '');
              errorData = { message: `HTTP ${retryResponse.status}: ${retryResponse.statusText}`, details: textResponse };
            }
            
            throw new ApiError(retryResponse.status, errorData.message || 'Request failed', errorData);
          }

          if (retryResponse.status === 204) {
            return null;
          }

          return await retryResponse.json();
        } catch (refreshError) {
          this.processQueue(refreshError, null);
          throw refreshError;
        } finally {
          this.isRefreshing = false;
        }
      }
      
      // Handle other error responses
      if (!response.ok) {
        let errorData = {};
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json().catch(() => ({}));
        } else {
          // Handle non-JSON error responses (like HTML error pages)
          const textResponse = await response.text().catch(() => '');
          errorData = { message: `HTTP ${response.status}: ${response.statusText}`, details: textResponse };
        }
        
        console.error('API Error Response:', errorData);
        
        // Handle specific HTTP status codes
        if (response.status === 401) {
          throw new ApiError(401, 'Authentication required. Please check your backend security configuration for public endpoints like /auth/register and /auth/login.');
        }
        
        throw new ApiError(response.status, errorData.message || 'Request failed', errorData);
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle specific network/CORS errors
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new ApiError(0, 'Unable to connect to server. Please check if the backend is running and CORS is configured properly.');
      }
      
      // Handle network errors
      throw new ApiError(0, 'Network error. Please check your connection.');
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const searchParams = new URLSearchParams(params);
    const url = searchParams.toString() ? `${endpoint}?${searchParams}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Custom API Error class
class ApiError extends Error {
  constructor(status, message, details = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

// Create singleton instance
const apiService = new ApiService();

// Authentication API endpoints
export const authAPI = {
  // Register new user
  register: async (userData) => {
    return apiService.post('/auth/register', userData);
  },

  // Login user
  login: async (credentials) => {
    return apiService.post('/auth/login', credentials);
  },

  // Logout user (client-side only)
  logout: async () => {
    // No backend call needed - just for consistency with existing code
    return Promise.resolve({ success: true });
  },

  // Refresh token
  refresh: async (refreshToken) => {
    return apiService.post('/auth/refresh', { refreshToken });
  },

  // Forgot password
  forgotPassword: async (email) => {
    return apiService.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    return apiService.post('/auth/reset-password', { token, newPassword });
  },

  // Verify email
  verifyEmail: async (verificationToken) => {
    return apiService.post('/auth/verify-email', { verificationToken });
  },
  // Resend verification email
  resendVerification: async (email) => {
    return apiService.post('/auth/resend-verification', { email });
  },

  // Social authentication
  socialGoogle: async (googleToken) => {
    return apiService.post('/auth/social/google', { googleToken });
  },

  socialGithub: async (githubCode) => {
    return apiService.post('/auth/social/github', { githubCode });
  },

  socialLinkedin: async (linkedinCode) => {
    return apiService.post('/auth/social/linkedin', { linkedinCode });
  },
};

// User API endpoints
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return apiService.get('/users/profile');
  },

  // Update user profile
  updateProfile: async (userData) => {
    return apiService.put('/users/profile', userData);
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    return apiService.put('/users/preferences', preferences);
  },

  // Get user stats
  getStats: async () => {
    return apiService.get('/users/me/stats');
  },

  // Update user stats
  updateStats: async (stats) => {
    return apiService.put('/users/me/stats', stats);
  },

  // Get account information
  getAccount: async () => {
    return apiService.get('/users/me/account');
  },
};

export { ApiError };
export default apiService;
