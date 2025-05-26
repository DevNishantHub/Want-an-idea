import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const MySubmissions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Simplified status options - only showing most commonly used statuses
  const primaryStatusOptions = ['All', 'Published', 'Under Review', 'Draft'];
  const allStatusOptions = ['All', 'Draft', 'Under Review', 'Approved', 'Published', 'Rejected'];

  // Mock submitted ideas data - in a real app, this would come from an API or local storage
  const [submittedIdeas] = useState([
    {
      id: 101,
      title: "AI-Powered Study Assistant",
      description: "An intelligent study companion that creates personalized quiz questions, summarizes reading materials, and tracks learning progress using machine learning algorithms.",
      category: "Education",
      difficulty: "Intermediate",
      status: "Under Review",
      submittedDate: "2025-05-20",
      lastUpdated: "2025-05-22",
      submitterName: "Alex Johnson",
      submitterEmail: "alex@example.com",
      tags: "AI, Education, Machine Learning",
      views: 45,
      likes: 12,
      comments: 3
    },
    {
      id: 102,
      title: "Community Garden Management System",
      description: "A platform to help community gardens coordinate planting schedules, share resources, track harvests, and connect gardeners with similar interests.",
      category: "Community",
      difficulty: "Beginner",
      status: "Approved",
      submittedDate: "2025-05-15",
      lastUpdated: "2025-05-18",
      submitterName: "Alex Johnson",
      submitterEmail: "alex@example.com",
      tags: "Community, Gardening, Management",
      views: 128,
      likes: 34,
      comments: 8
    },
    {
      id: 103,
      title: "Smart Home Energy Optimizer",
      description: "An IoT system that learns your daily routines and automatically adjusts heating, cooling, and lighting to minimize energy consumption while maintaining comfort.",
      category: "Technology",
      difficulty: "Advanced",
      status: "Rejected",
      submittedDate: "2025-05-10",
      lastUpdated: "2025-05-12",
      submitterName: "Alex Johnson",
      submitterEmail: "alex@example.com",
      tags: "IoT, Smart Home, Energy",
      views: 89,
      likes: 23,
      comments: 5,
      rejectionReason: "Similar project already exists in our database. Consider adding unique features or combining with existing ideas."
    },
    {
      id: 104,
      title: "Local Artist Showcase Platform",
      description: "A digital gallery where local artists can display their work, connect with buyers, and organize community art events and workshops.",
      category: "Entertainment",
      difficulty: "Intermediate",
      status: "Published",
      submittedDate: "2025-05-05",
      lastUpdated: "2025-05-08",
      submitterName: "Alex Johnson",
      submitterEmail: "alex@example.com",
      tags: "Art, Community, Marketplace",
      views: 256,
      likes: 67,
      comments: 15
    },
    {
      id: 105,
      title: "Mindful Meditation Companion",
      description: "A wellness app that provides guided meditation sessions, breathing exercises, and mood tracking with personalized recommendations based on stress levels.",
      category: "Health",
      difficulty: "Beginner",
      status: "Draft",
      submittedDate: "2025-05-24",
      lastUpdated: "2025-05-24",
      submitterName: "Alex Johnson",
      submitterEmail: "alex@example.com",
      tags: "Health, Meditation, Wellness",
      views: 12,
      likes: 3,
      comments: 1
    }
  ]);

  const statusOptions = primaryStatusOptions;
  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'Draft':
        return '📝';
      case 'Under Review':
        return '⏳';
      case 'Approved':
        return '👍';
      case 'Published':
        return '✅';
      case 'Rejected':
        return '❌';
      default:
        return '📄';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  const filteredAndSortedIdeas = useMemo(() => {
    let filtered = submittedIdeas.filter(idea => {
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || idea.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Simple default sorting by newest first
    filtered.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate));

    return filtered;
  }, [submittedIdeas, searchTerm, statusFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };

  const getStatsData = () => {
    const total = submittedIdeas.length;
    const published = submittedIdeas.filter(idea => idea.status === 'Published').length;
    const underReview = submittedIdeas.filter(idea => idea.status === 'Under Review').length;
    const totalViews = submittedIdeas.reduce((sum, idea) => sum + idea.views, 0);
    const totalLikes = submittedIdeas.reduce((sum, idea) => sum + idea.likes, 0);

    return { total, published, underReview, totalViews, totalLikes };
  };

  const stats = getStatsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Page Header */}
      <div className="bg-white shadow-sm">        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                📝 My Ideas
              </h1>
              <p className="text-xl text-gray-600">
                Track and manage your submitted project ideas
              </p>
            </div>
            <button
              onClick={() => navigate('/submit')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium flex items-center"
            >
              <span className="mr-2">✨</span>
              Submit New Idea
            </button>
          </div>
        </div>
      </div>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">        {/* Chunked Statistics Dashboard */}
        <div className="mb-8">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="w-full bg-white rounded-lg shadow-md p-4 text-left hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📊</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">My Statistics</h3>
                  <p className="text-sm text-gray-600">
                    {stats.total} total ideas • {stats.published} published
                  </p>
                </div>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 transform transition-transform ${showStats ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          {showStats && (
            <div className="mt-4 space-y-4">
              {/* Idea Status Chunk */}
              <div className="bg-blue-50/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                  📝 My Ideas Status
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow-sm p-3 text-center border">
                    <div className="text-xl font-bold text-indigo-600">{stats.total}</div>
                    <div className="text-xs text-gray-600">Total Ideas</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-3 text-center border">
                    <div className="text-xl font-bold text-green-600">{stats.published}</div>
                    <div className="text-xs text-gray-600">Published</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-3 text-center border">
                    <div className="text-xl font-bold text-yellow-600">{stats.underReview}</div>
                    <div className="text-xs text-gray-600">Under Review</div>
                  </div>
                </div>
              </div>
              
              {/* Engagement Metrics Chunk */}
              <div className="bg-purple-50/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-purple-800 mb-3 flex items-center">
                  📈 Community Engagement
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg shadow-sm p-3 text-center border">
                    <div className="text-xl font-bold text-blue-600">{stats.totalViews}</div>
                    <div className="text-xs text-gray-600">Total Views</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-3 text-center border">
                    <div className="text-xl font-bold text-purple-600">{stats.totalLikes}</div>
                    <div className="text-xs text-gray-600">Total Likes</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>        {/* Chunked Search and Filter Interface */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Chunk - Primary Discovery Tool */}
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
            <h3 className="text-sm font-semibold text-indigo-800 mb-3 flex items-center">
              🔍 Find Your Ideas
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Search your ideas..."
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              />
            </div>
          </div>

          {/* Filter Chunk - Organize by Status */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                📋 Filter by Status
              </h3>
              {(searchTerm || statusFilter !== 'All') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800 underline font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status === 'All' ? '📋 All Status' : 
                       status === 'Published' ? '✅ Published' :
                       status === 'Under Review' ? '⏳ Under Review' :
                       status === 'Draft' ? '📝 Draft' : status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-indigo-600">{filteredAndSortedIdeas.length}</span> of {submittedIdeas.length} ideas
              </div>
            </div>
          </div>          {/* Progressive Disclosure for Advanced Options */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              ⚙️ Advanced Options
              <svg 
                className={`ml-1 w-4 h-4 transform transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showAdvancedFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by All Status Types
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {allStatusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {filteredAndSortedIdeas.length === 0 ? (          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Ideas Found</h3>
            <p className="text-gray-600 mb-6">
              {submittedIdeas.length === 0 
                ? "You haven't shared any ideas yet. Start by submitting your first innovative project idea!"
                : "No ideas match your current search. Try adjusting your filters."
              }
            </p>
            <div className="space-x-4">
              {submittedIdeas.length === 0 ? (
                <button
                  onClick={() => navigate('/submit')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  ✨ Submit Your First Idea
                </button>
              ) : (
                <button
                  onClick={clearFilters}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedIdeas.map((idea) => (
              <div key={idea.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  {/* Header with Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {idea.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Submitted: {formatDate(idea.submittedDate)}</span>
                        <span>•</span>
                        <span>Updated: {formatDate(idea.lastUpdated)}</span>
                        <span>•</span>
                        <span className="capitalize">{idea.category} • {idea.difficulty}</span>
                      </div>
                    </div>                    <div className="flex items-center gap-3 ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(idea.status)}`}>
                        <span className="text-sm">{getStatusEmoji(idea.status)}</span>
                        {idea.status}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {idea.description}
                  </p>

                  {/* Tags */}
                  {idea.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {idea.tags.split(', ').map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}                  {/* Rejection Reason */}
                  {idea.status === 'Rejected' && idea.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-red-800 mb-1">Rejection Reason:</h4>
                      <p className="text-sm text-red-700 mb-3">{idea.rejectionReason}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-red-600">You can edit and resubmit this idea</span>
                        <button 
                          onClick={() => navigate(`/edit/${idea.id}`)}
                          className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors duration-200"
                        >
                          Edit & Resubmit
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Draft Notice */}
                  {idea.status === 'Draft' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-yellow-800">
                          <span className="font-medium">Draft:</span> Complete your submission to get it reviewed
                        </span>
                        <button 
                          onClick={() => navigate(`/edit/${idea.id}`)}
                          className="px-3 py-1 text-xs font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded transition-colors duration-200"
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  )}                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👁️ {idea.views}</span>
                      <span>❤️ {idea.likes}</span>
                      <span>💬 {idea.comments}</span>
                    </div>
                    
                    {/* Simplified Actions */}
                    <div className="flex items-center gap-2">
                      {/* Primary Action based on status */}
                      {idea.status === 'Draft' && (
                        <button 
                          onClick={() => navigate(`/edit/${idea.id}`)}
                          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
                        >
                          Complete
                        </button>
                      )}
                      {idea.status === 'Rejected' && (
                        <button 
                          onClick={() => navigate(`/edit/${idea.id}`)}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                        >
                          Edit & Resubmit
                        </button>
                      )}
                      {idea.status === 'Published' && (
                        <button 
                          onClick={() => navigate(`/project/${idea.id}`)}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
                        >
                          View Live
                        </button>
                      )}
                      
                      {/* Secondary Action */}
                      <button 
                        onClick={() => navigate(`/project/${idea.id}`)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
