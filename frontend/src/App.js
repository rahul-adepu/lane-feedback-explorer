import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import AddFeedbackModal from './components/AddFeedbackModal';
import FeedbackExplorer from './components/FeedbackExplorer';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddFeedback = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFeedbackAdded = (newFeedback) => {
    // Trigger refresh of feedback list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Header onAddFeedback={handleAddFeedback} />
      
      <main>
        <FeedbackExplorer refreshTrigger={refreshTrigger} />
      </main>

      <AddFeedbackModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFeedbackAdded={handleFeedbackAdded}
      />
    </div>
  );
}

export default App;
