import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ onAddFeedback }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Lane Feedback
              </h1>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">
                Discover and plan better products together
              </p>
            </div>
          </div>

          {/* Add Feedback Button */}
          <button
            onClick={onAddFeedback}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Feedback
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
