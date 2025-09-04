import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ThumbsUp, Calendar, Loader2 } from 'lucide-react';
import { feedbackAPI } from '../services/api';
import toast from 'react-hot-toast';

const FeedbackExplorer = ({ refreshTrigger }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [groupByCategory, setGroupByCategory] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({
    bug: true,
    feature: true,
    improvement: true,
    other: true
  });

  const categories = [
    { value: 'bug', label: 'Bug', color: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'feature', label: 'Feature', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'improvement', label: 'Improvement', color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800 border-gray-200' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'votes', label: 'Most Voted' },
    { value: 'title', label: 'Title A-Z' }
  ];

  // Fetch feedback data
  const fetchFeedback = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        sort: sortBy,
        ...(selectedCategory && { category: selectedCategory }),
        ...(searchTerm && { q: searchTerm })
      };
      
      const response = await feedbackAPI.getFeedback(params);
      setFeedback(response.data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast.error('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  }, [sortBy, selectedCategory, searchTerm]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback, refreshTrigger]);

  // Group feedback by category
  const groupedFeedback = feedback.reduce((acc, item) => {
    const category = item.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get category info
  const getCategoryInfo = (category) => {
    return categories.find(cat => cat.value === category) || categories[3];
  };

  // Render feedback item
  const renderFeedbackItem = (item) => (
    <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryInfo(item.category).color}`}>
              {getCategoryInfo(item.category).label}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(item.createdAt)}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {item.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {item.description.length > 150 
              ? `${item.description.substring(0, 150)}...` 
              : item.description
            }
          </p>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200">
            <ThumbsUp className="w-4 h-4" />
            {item.votes || 0}
          </button>
        </div>
      </div>
    </div>
  );

  // Render empty state
  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {searchTerm || selectedCategory ? 'No feedback found' : 'No feedback yet'}
      </h3>
      <p className="text-gray-500">
        {searchTerm || selectedCategory 
          ? 'Try adjusting your search or filter criteria'
          : 'Be the first to share your feedback!'
        }
      </p>
    </div>
  );

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        <span className="ml-2 text-gray-600">Loading feedback...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Controls */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex gap-4">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Group Toggle */}
            <button
              onClick={() => setGroupByCategory(!groupByCategory)}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 ${
                groupByCategory
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Group by Category
            </button>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      {feedback.length === 0 ? (
        renderEmptyState()
      ) : groupByCategory ? (
        // Grouped View
        <div className="space-y-6">
          {categories.map(category => {
            const categoryFeedback = groupedFeedback[category.value] || [];
            if (categoryFeedback.length === 0) return null;

            return (
              <div key={category.value} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.value)}
                  className="w-full px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${category.color}`}>
                      {category.label}
                    </span>
                    <span className="text-sm text-gray-500">
                      {categoryFeedback.length} feedback
                    </span>
                  </div>
                  {expandedCategories[category.value] ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {expandedCategories[category.value] && (
                  <div className="p-6 space-y-4">
                    {categoryFeedback.map(renderFeedbackItem)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {feedback.map(renderFeedbackItem)}
        </div>
      )}
    </div>
  );
};

export default FeedbackExplorer;
