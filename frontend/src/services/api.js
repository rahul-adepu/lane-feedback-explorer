import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Feedback API functions
export const feedbackAPI = {
  // Get all feedback with optional query parameters
  getFeedback: async (params = {}) => {
    try {
      const response = await api.get('/feedback', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new feedback
  createFeedback: async (feedbackData) => {
    try {
      const response = await api.post('/feedback', feedbackData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
