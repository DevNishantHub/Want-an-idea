import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Brain, Sparkles, Target, TrendingUp, Clock, Heart, Eye, Star } from 'lucide-react';
import BrowseProjectCard from './BrowseProjectCard';

const BrowseIdeasNew = ({ projectIdeas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // Enhanced categories with psychology-driven insights - warm theme colors
  const categories = [
    { name: 'All', emoji: '🌟', description: 'Explore everything', color: 'from-orange-500 to-pink-600' },
    { name: 'Technology', emoji: '💻', description: 'Digital innovation', color: 'from-orange-500 to-red-600' },
    { name: 'Health', emoji: '🏥', description: 'Wellness solutions', color: 'from-pink-500 to-red-600' },
    { name: 'Education', emoji: '📚', description: 'Learning evolution', color: 'from-yellow-500 to-orange-600' },
    { name: 'Environment', emoji: '🌱', description: 'Sustainable future', color: 'from-green-500 to-yellow-600' },
    { name: 'Community', emoji: '👥', description: 'Social impact', color: 'from-pink-500 to-orange-600' }
  ];

  // Psychology insights for discovery - warm theme colors
  const discoveryInsights = [
    { icon: <Brain className="w-5 h-5" />, text: 'Ideas curated using cognitive bias research', color: 'text-orange-600' },
    { icon: <Target className="w-5 h-5" />, text: 'Personalized recommendations based on behavior', color: 'text-pink-600' },
    { icon: <Sparkles className="w-5 h-5" />, text: 'AI-powered idea matching technology', color: 'text-yellow-600' }
  ];

  // Helper functions to assign metadata based on project ID
  const getCategory = (id) => {
    const categoryNames = ['Technology', 'Health', 'Education', 'Environment', 'Community'];
    return categoryNames[id % categoryNames.length];
  };

  const getDifficulty = (id) => {
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    return difficulties[id % difficulties.length];
  };

  const getDatePosted = (id) => {
    const dates = ['2025-05-25', '2025-05-24', '2025-05-23', '2025-05-22', '2025-05-21'];
    return dates[id % dates.length];
  };

  const getLikes = (id) => {
    return Math.floor(Math.random() * 200) + id * 10;
  };

  const getViews = (id) => {
    return Math.floor(Math.random() * 1000) + id * 50;
  };

  // Extended project data with metadata
  const extendedProjectIdeas = useMemo(() => {
    if (!projectIdeas || projectIdeas.length === 0) return [];
    
    return projectIdeas.map(idea => ({
      ...idea,
      category: getCategory(idea.id),
      difficulty: getDifficulty(idea.id),
      datePosted: getDatePosted(idea.id),
      likes: getLikes(idea.id),
      views: getViews(idea.id)
    }));
  }, [projectIdeas]);

  // Calculate category stats
  const categoryStats = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      count: cat.name === 'All' 
        ? extendedProjectIdeas.length 
        : extendedProjectIdeas.filter(idea => idea.category === cat.name).length
    }));
  }, [extendedProjectIdeas]);

  // Filter and sort logic
  const filteredAndSortedIdeas = useMemo(() => {
    let filtered = extendedProjectIdeas.filter(idea => {
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.datePosted) - new Date(a.datePosted);
        case 'popular':
          return b.likes - a.likes;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.datePosted) - new Date(a.datePosted);
      }
    });

    return filtered;
  }, [extendedProjectIdeas, searchTerm, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('newest');
  };

  // Safety check for empty project ideas
  if (!projectIdeas || projectIdeas.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 relative overflow-hidden">
        {/* Animated Background Elements - warm theme */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
              Browse Ideas
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              No project ideas available at the moment. Be the first to share your innovative concepts!
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all font-medium shadow-lg transform hover:scale-105">
              <Sparkles className="w-5 h-5 mr-2 inline" />
              Submit First Idea
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements - warm theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-orange-400/20 rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-pink-400/25 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '4s'}}></div>

      {/* Enhanced Header Section */}
      <div className="relative z-10">
        <div className="bg-white/40 backdrop-blur-xl border-b border-orange-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl border-2 border-orange-200 shadow-lg">
                    <Brain className="w-12 h-12 text-orange-600" />
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">Breakthrough</span> Ideas
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Explore thousands of innovative projects from creators worldwide. Find your next inspiration or discover ideas to build upon.
              </p>

              {/* Psychology Insights Banner */}
              <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-6 border border-orange-200 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center">
                  <Brain className="w-6 h-6 mr-2 text-orange-600" />
                  Psychology-Powered Discovery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {discoveryInsights.map((insight, index) => (
                    <div key={index} className="flex items-center justify-center text-sm">
                      <span className={`mr-2 ${insight.color}`}>{insight.icon}</span>
                      <span className="text-gray-700">{insight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Search and Filter Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Search Bar */}
                <div className="lg:col-span-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search innovative ideas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/90 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="lg:col-span-1">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/90 text-gray-900"
                  >
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.emoji} {category.name} - {category.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort and View Options */}
                <div className="lg:col-span-1 flex gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/90 text-gray-900"
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="alphabetical">A-Z</option>
                  </select>
                  
                  <div className="flex rounded-xl border-2 border-orange-200 bg-white/90 overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-orange-500 text-white' 
                          : 'text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-orange-500 text-white' 
                          : 'text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Category Tags Section */}
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 border-b border-orange-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 border-2 ${
                    selectedCategory === category.name
                      ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg transform scale-105`
                      : 'bg-white/80 text-gray-700 border-orange-200 hover:border-orange-300 hover:bg-white'
                  }`}
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-orange-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <Target className="w-5 h-5 mr-2 text-orange-600" />
                <span className="font-medium">
                  {filteredAndSortedIdeas.length} innovative ideas found
                </span>
                {searchTerm && (
                  <span className="ml-2 text-gray-600">
                    for "{searchTerm}"
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="ml-2 text-gray-600">
                    in {selectedCategory}
                  </span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-1 text-pink-500" />
                Sorted by {sortBy.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas Grid/List */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredAndSortedIdeas.length === 0 ? (
          <NoIdeasFound searchTerm={searchTerm} selectedCategory={selectedCategory} />
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }>            {filteredAndSortedIdeas.map((idea) => (
              <BrowseProjectCard
                key={idea.id}
                idea={idea}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Load More Button */}
      {filteredAndSortedIdeas.length > 0 && (
        <div className="relative z-10 text-center pb-16">
          <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-orange-500/25 transform hover:scale-105">
            <Sparkles className="w-5 h-5 mr-2 inline" />
            Load More Innovations
          </button>
        </div>
      )}
    </div>
  );
};

// Enhanced No Ideas Found Component - warm theme
const NoIdeasFound = ({ searchTerm, selectedCategory }) => (
  <div className="text-center py-16">
    <div className="mb-8">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center border-4 border-orange-200 mb-6">
        <Search className="w-12 h-12 text-orange-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">No Ideas Found</h3>
      <p className="text-gray-700 max-w-md mx-auto mb-8">
        {searchTerm 
          ? `We couldn't find any ideas matching "${searchTerm}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.`
          : `No ideas found in ${selectedCategory} category.`
        }
        <br />Try adjusting your search or explore other categories.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => window.location.reload()} 
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg"
        >
          🔄 Reset Filters
        </button>
        <button 
          onClick={() => window.location.href = '/submit'} 
          className="border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium"
        >
          💡 Share Your Idea
        </button>
      </div>
    </div>
  </div>
);

export default BrowseIdeasNew;
