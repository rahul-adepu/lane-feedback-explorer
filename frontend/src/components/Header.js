import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ onAddFeedback }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-16 py-4 sm:py-0">
          {/* Logo and Title */}
          <div className="mb-4 sm:mb-0">
            <div className="grid grid-cols-[max-content_1fr] gap-x-2">
              <h1 className="col-start-1 row-start-1 text-2xl sm:text-3xl font-bold text-gray-900">
                Lane Feedback
              </h1>
              <p className="col-start-2 row-start-2 text-sm sm:text-base text-gray-600 mt-1">
                - Turning Feedback into Action
              </p>
            </div>
          </div>

          {/* Add Feedback Button */}
          <button
            onClick={onAddFeedback}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
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
