import React, { useState, useMemo } from 'react';
import BrowseProjectCard from './BrowseProjectCard';

const BrowseIdeasNew = ({ projectIdeas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Categories for filtering
  const categories = [
    { name: 'All', emoji: '🌟' },
    { name: 'Technology', emoji: '💻' },
    { name: 'Health', emoji: '🏥' },
    { name: 'Education', emoji: '📚' },
    { name: 'Environment', emoji: '🌱' },
    { name: 'Community', emoji: '👥' }
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

  // Calculate category counts
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Project Ideas</h1>
          <p className="text-xl text-gray-600">No project ideas available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Browse Project Ideas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover innovative project ideas from our community. Use filters to find projects that match your interests and skill level.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chunked Search and Filter Interface */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search Chunk - Primary Discovery Tool */}
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <h3 className="text-sm font-semibold text-indigo-800 mb-3 flex items-center">
              🔍 Discover Ideas
            </h3>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Search for project ideas..."
                className="w-full pl-6 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Category Filter Chunk - Browse by Topic */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
              📋 Browse by Category
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {categoryStats.map(category => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category.name
                      ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-700'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{category.emoji}</div>
                  <div className="text-xs font-medium">{category.name}</div>
                  <div className="text-xs text-gray-500">({category.count})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sort & Results Chunk - Organize View */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                📊 Sort & Filter
              </h3>
              {(searchTerm || selectedCategory !== 'All') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800 underline font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  {[
                    { value: 'newest', label: '🆕 Latest', icon: '🆕' },
                    { value: 'popular', label: '❤️ Popular', icon: '❤️' },
                    { value: 'alphabetical', label: '🔤 A-Z', icon: '🔤' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        sortBy === option.value
                          ? 'bg-indigo-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-1">{option.icon}</span>
                      {option.label.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-indigo-600">{filteredAndSortedIdeas.length}</span> projects
                {searchTerm && <span> for "<span className="font-medium">{searchTerm}</span>"</span>}
                {selectedCategory !== 'All' && <span> in <span className="font-medium">{selectedCategory}</span></span>}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {filteredAndSortedIdeas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Projects Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any projects matching your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Project Grid - Clean and focused */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedIdeas.map((idea) => (
                <BrowseProjectCard key={idea.id} idea={idea} />
              ))}
            </div>

            {/* Load More Button (simplified) */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                ✨ Discover More Ideas
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseIdeasNew;
