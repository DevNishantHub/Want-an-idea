import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Settings, Heart, Eye, MessageSquare, TrendingUp, 
  Edit3, Save, Camera, Mail, Globe, Github, Linkedin, 
  Shield, Bell, Lock, LogOut, Trash2, Download, Upload,
  Star, Clock, Calendar, Award, Target, Activity
} from 'lucide-react';

/**
 * USER ACCOUNT MANAGER COMPONENT
 * 
 * A comprehensive account management system providing:
 * - Profile management and customization
 * - Account settings and preferences
 * - Activity dashboard and analytics
 * - Security and privacy controls
 * - Content management (submissions, likes, etc.)
 * - Notification preferences
 * - Account actions (export, delete, etc.)
 */

// Enhanced Feedback Toast Component
const AccountToast = ({ message, type, isVisible, onHide, actionButton }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <div className={`fixed top-6 right-6 z-50 transition-all duration-500 transform ${
      isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-full scale-95 pointer-events-none'
    }`}>
      <div className={`rounded-2xl p-4 shadow-2xl border backdrop-blur-sm max-w-sm ${
        type === 'success' ? 'bg-green-500/90 border-green-400/30 text-white' :
        type === 'error' ? 'bg-red-500/90 border-red-400/30 text-white' :
        type === 'warning' ? 'bg-yellow-500/90 border-yellow-400/30 text-white' :
        type === 'info' ? 'bg-blue-500/90 border-blue-400/30 text-white' :
        'bg-orange-500/90 border-orange-400/30 text-white'
      }`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              {type === 'success' && '✓'}
              {type === 'error' && '✕'}
              {type === 'warning' && '!'}
              {type === 'info' && 'i'}
              {!['success', 'error', 'warning', 'info'].includes(type) && '•'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-tight">{message}</p>
            {actionButton && (
              <div className="mt-3 pt-3 border-t border-white/20">
                {actionButton}
              </div>
            )}
          </div>
          <button 
            onClick={onHide} 
            className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Profile Picture Upload Component
const ProfilePictureUpload = ({ currentPicture, onPictureChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentPicture);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    try {
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Simulate upload (replace with actual upload logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onPictureChange(url);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 p-1 shadow-lg">
        <div className="w-full h-full rounded-full bg-white p-1">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
              <User className="w-12 h-12 text-orange-600" />
            </div>
          )}
        </div>
      </div>
      
      {/* Upload Button */}
      <label className={`absolute bottom-2 right-2 w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-lg ${
        isUploading ? 'opacity-50 cursor-not-allowed' : ''
      }`}>
        {isUploading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <Camera className="w-5 h-5 text-white" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
        />
      </label>
    </div>
  );
};

// Dashboard Statistics Card
const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = "orange" }) => {
  const colorClasses = {
    orange: "from-orange-500 to-red-500",
    blue: "from-blue-500 to-indigo-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    yellow: "from-yellow-500 to-orange-500"
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`text-sm font-medium px-2 py-1 rounded-full ${
            trend.type === 'up' ? 'text-green-700 bg-green-100' : 
            trend.type === 'down' ? 'text-red-700 bg-red-100' : 
            'text-gray-700 bg-gray-100'
          }`}>
            {trend.type === 'up' ? '↗' : trend.type === 'down' ? '↘' : '→'} {trend.value}
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-lg font-semibold text-gray-800 mb-1">{title}</div>
        {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
      </div>
    </div>
  );
};

// Navigation Tab Component
const TabButton = ({ id, label, icon: Icon, isActive, onClick, badge }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-left w-full ${
      isActive 
        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105' 
        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
    }`}
  >
    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
    <span className="flex-1">{label}</span>
    {badge && (
      <span className={`px-2 py-1 text-xs rounded-full font-bold ${
        isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'
      }`}>
        {badge}
      </span>
    )}
  </button>
);

const UserAccount = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [toastActionButton, setToastActionButton] = useState(null);

  // User data state
  const [userData, setUserData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Full-stack developer passionate about creating innovative solutions that connect technology with everyday life.',
    website: 'https://alexjohnson.dev',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    skills: ['React', 'Node.js', 'MongoDB', 'IoT', 'Python', 'TypeScript'],
    contactPreference: 'EMAIL',
    profilePicture: null,
    joinDate: '2024-01-15',
    isEmailVerified: true,
    role: 'USER'
  });

  // User settings state
  const [settings, setSettings] = useState({
    emailNotifications: {
      projectUpdates: true,
      newMessages: true,
      weeklyDigest: true,
      marketingEmails: false
    },
    privacy: {
      showEmail: false,
      showProfile: true,
      allowMessages: true
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC'
    }
  });

  // User statistics
  const [userStats, setUserStats] = useState({
    projectsSubmitted: 12,
    totalViews: 15420,
    totalLikes: 234,
    messagesReceived: 89,
    profileViews: 1247,
    joinedDaysAgo: 132
  });

  // Show toast notification
  const showNotification = (message, type = 'success', actionButton = null) => {
    setToastMessage(message);
    setToastType(type);
    setToastActionButton(actionButton);
    setShowToast(true);
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      showNotification('Failed to update profile. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Save settings
  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showNotification('Settings saved successfully!', 'success');
    } catch (error) {
      showNotification('Failed to save settings. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    showNotification('Logged out successfully!', 'info');
    setTimeout(() => {
      navigate('/auth');
    }, 1500);
  };

  // Navigation tabs configuration
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'submissions', label: 'My Ideas', icon: Heart, badge: userStats.projectsSubmitted },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3' },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  // Render Dashboard Tab
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.firstName}! 👋</h1>
            <p className="text-orange-100 text-lg">
              You've been inspiring the community for {userStats.joinedDaysAgo} days
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
              <Star className="w-12 h-12 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Heart}
          title="Ideas Shared"
          value={userStats.projectsSubmitted}
          subtitle="Projects submitted"
          trend={{ type: 'up', value: '+2 this month' }}
          color="orange"
        />
        <StatCard
          icon={Eye}
          title="Total Views"
          value={userStats.totalViews.toLocaleString()}
          subtitle="Across all projects"
          trend={{ type: 'up', value: '+15%' }}
          color="blue"
        />
        <StatCard
          icon={TrendingUp}
          title="Community Likes"
          value={userStats.totalLikes}
          subtitle="From other creators"
          trend={{ type: 'up', value: '+12' }}
          color="green"
        />
        <StatCard
          icon={MessageSquare}
          title="Messages"
          value={userStats.messagesReceived}
          subtitle="From interested creators"
          trend={{ type: 'neutral', value: 'Active' }}
          color="purple"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="w-6 h-6 text-orange-600 mr-3" />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            { action: 'New like on "Smart Garden Monitor"', time: '2 hours ago', type: 'like' },
            { action: 'Message received about "Recipe Exchange"', time: '5 hours ago', type: 'message' },
            { action: 'Project "Study Buddy Finder" reached 100 views', time: '1 day ago', type: 'milestone' },
            { action: 'New idea submission approved', time: '2 days ago', type: 'approval' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-300">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'like' ? 'bg-red-100 text-red-600' :
                activity.type === 'message' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'milestone' ? 'bg-green-100 text-green-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {activity.type === 'like' && <Heart className="w-5 h-5" />}
                {activity.type === 'message' && <MessageSquare className="w-5 h-5" />}
                {activity.type === 'milestone' && <Target className="w-5 h-5" />}
                {activity.type === 'approval' && <Award className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Profile Tab
  const renderProfile = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <User className="w-7 h-7 text-orange-600 mr-3" />
          Profile Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <ProfilePictureUpload
                currentPicture={userData.profilePicture}
                onPictureChange={(newPicture) => 
                  setUserData(prev => ({ ...prev, profilePicture: newPicture }))
                }
              />
              <p className="text-sm text-gray-600 mt-4">
                Click the camera icon to upload a new profile picture
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 pr-12"
                />
                {userData.isEmailVerified && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
              {userData.isEmailVerified && (
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Email verified
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={userData.bio}
                onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none"
                placeholder="Tell the community about yourself..."
              />
              <p className="text-sm text-gray-500 mt-1">{userData.bio.length}/500 characters</p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    placeholder="Website"
                    value={userData.website}
                    onChange={(e) => setUserData(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    placeholder="LinkedIn"
                    value={userData.linkedin}
                    onChange={(e) => setUserData(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    placeholder="GitHub"
                    value={userData.github}
                    onChange={(e) => setUserData(prev => ({ ...prev, github: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {userData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium flex items-center space-x-2">
                    <span>{skill}</span>
                    <button
                      onClick={() => setUserData(prev => ({
                        ...prev,
                        skills: prev.skills.filter((_, i) => i !== index)
                      }))}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    const newSkill = e.target.value.trim();
                    if (!userData.skills.includes(newSkill)) {
                      setUserData(prev => ({
                        ...prev,
                        skills: [...prev.skills, newSkill]
                      }));
                    }
                    e.target.value = '';
                  }
                }}
              />
            </div>

            {/* Contact Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Contact Preference</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'EMAIL', label: 'Email', icon: Mail },
                  { value: 'PLATFORM_MESSAGES', label: 'Platform Messages', icon: MessageSquare },
                  { value: 'NONE', label: 'No Contact', icon: Lock }
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setUserData(prev => ({ ...prev, contactPreference: value }))}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-3 ${
                      userData.contactPreference === value
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Settings Tab
  const renderSettings = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <Settings className="w-7 h-7 text-orange-600 mr-3" />
          Account Settings
        </h2>

        {/* Email Notifications */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="w-6 h-6 text-orange-600 mr-2" />
            Email Notifications
          </h3>
          <div className="space-y-4">
            {Object.entries({
              projectUpdates: 'Project status updates and approvals',
              newMessages: 'New messages from other creators',
              weeklyDigest: 'Weekly digest of trending ideas',
              marketingEmails: 'Marketing and promotional emails'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{label}</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({
                    ...prev,
                    emailNotifications: {
                      ...prev.emailNotifications,
                      [key]: !prev.emailNotifications[key]
                    }
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                    settings.emailNotifications[key] ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      settings.emailNotifications[key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-6 h-6 text-orange-600 mr-2" />
            Privacy Settings
          </h3>
          <div className="space-y-4">
            {Object.entries({
              showEmail: 'Show email address on profile',
              showProfile: 'Make profile visible to other users',
              allowMessages: 'Allow messages from other creators'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{label}</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({
                    ...prev,
                    privacy: {
                      ...prev.privacy,
                      [key]: !prev.privacy[key]
                    }
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                    settings.privacy[key] ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      settings.privacy[key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors duration-300">
              <Download className="w-5 h-5" />
              <span>Export Data</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors duration-300">
              <Upload className="w-5 h-5" />
              <span>Import Data</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 p-4 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <Trash2 className="w-6 h-6 text-red-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-800 mb-2">Delete Account</h4>
                <p className="text-red-700 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 text-sm font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Render placeholder for other tabs
  const renderPlaceholder = (tabName) => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="text-4xl">🚧</div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {tabName.charAt(0).toUpperCase() + tabName.slice(1)} Coming Soon
        </h3>
        <p className="text-gray-600">
          This section is under development and will be available soon.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Enhanced Toast Notification */}
      <AccountToast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onHide={() => {
          setShowToast(false);
          setToastActionButton(null);
        }}
        actionButton={toastActionButton}
      />

      {/* Header */}
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
              Back to Platform
            </button>
            
            <h1 className="text-2xl font-bold text-gray-900">Account Manager</h1>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    id={tab.id}
                    label={tab.label}
                    icon={tab.icon}
                    isActive={activeTab === tab.id}
                    onClick={setActiveTab}
                    badge={tab.badge}
                  />
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'settings' && renderSettings()}
            {activeTab === 'submissions' && renderPlaceholder('submissions')}
            {activeTab === 'messages' && renderPlaceholder('messages')}
            {activeTab === 'security' && renderPlaceholder('security')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
