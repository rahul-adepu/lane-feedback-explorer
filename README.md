# Lane Feedback Explorer

A full-stack web application for submitting and exploring product feedback, built as part of the Lane Full-Stack Developer Intern assignment.

## Overview

This is a production-like one-page web application that allows users to submit and explore product feedback with a clean, modern UI. The application consists of a React frontend and a Node.js/Express backend with MongoDB.

## Architecture

- **Frontend**: React with Tailwind CSS for styling
- **Backend**: Node.js + Express with MongoDB 
- **Database**: MongoDB
- **API**: RESTful API with server-side validation

## Tech Choices

### Frontend
- **React**: Chosen for its component-based architecture and excellent ecosystem
- **Tailwind CSS**: For rapid UI development with consistent design system
- **Axios**: For reliable HTTP client with request/response interceptors
- **React Hot Toast**: For user-friendly notifications
- **Lucide React**: For consistent, accessible icons

### Backend
- **Node.js + Express**: Lightweight and fast for API development
- **MongoDB**: Flexible document database with schema validation
- **CORS**: For cross-origin requests between frontend and backend

## Project Structure

```
lane-feedback-explorer/
├── backend/
│   ├── controllers/
│   │   └── feedback.js          # Feedback API endpoints
│   ├── model/
│   │   └── feedback.js          # Mongoose schema
│   ├── routes/
│   │   └── feedback.js          # Route definitions
│   ├── db.js                    # Database connection
│   ├── index.js                 # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # App header with navigation
│   │   │   ├── AddFeedbackModal.js  # Feedback submission form
│   │   │   └── FeedbackExplorer.js  # Main feedback list/explorer
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main app component
│   │   └── index.js             # React entry point
│   └── package.json
└── README.md
```

## How to Run

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Clone the Repository
```bash
git clone https://github.com/rahul-adepu/lane-feedback-explorer.git
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB connection string:
```
MONGO_URI=Paste atlas or compass link
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:8090`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:8090
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`



## Features Implemented

### ✅ Must-Have Features
- [x] **Header**: App name, tagline, and "Add Feedback" button
- [x] **Add Feedback Form**: Title, Description, Category with validation
- [x] **Feedback Explorer**: List with sorting, grouping, and search
- [x] **Server-side Validation**: Comprehensive validation on backend
- [x] **Responsive Design**: Works on desktop, tablet, and mobile
- [x] **Loading States**: Proper loading indicators and error handling
- [x] **Empty States**: Designed for "no data" and "no results"

### ✅ UI/UX Features
- [x] **Clean Typography**: Consistent font hierarchy and spacing
- [x] **Visual Hierarchy**: Clear titles, subtitles, cards, and dividers
- [x] **Interactive Design**: Disabled states, focus states, error messages
- [x] **Accessibility**: Semantic HTML, labels, keyboard navigation
- [x] **Toast Notifications**: Success and error feedback

### ✅ Advanced Features
- [x] **Grouping**: Group by category with collapsible sections
- [x] **Search**: Real-time search in title and description
- [x] **Filtering**: Filter by category
- [x] **Sorting**: Multiple sort options (newest, oldest, votes, title)
- [x] **Pagination**: Backend pagination support
- [x] **Vote Count**: Display vote counts per feedback item


### Environment Variables
Make sure to set the appropriate environment variables in your deployment platform:
- `MONGO_URI`: MongoDB connection string
- `REACT_APP_API_URL`: Backend API URL for frontend

## What's Missing

### Current Limitations
1. **Authentication**: No JWT auth implemented (marked as optional)
2. **Vote Functionality**: Vote counts are displayed but voting is not implemented


## Testing the Application

1. Start both backend and frontend servers
2. Open the frontend in your browser
3. Try adding new feedback with different categories
4. Test the search and filter functionality
5. Verify the grouping and sorting features
6. Test responsive design on different screen sizes


<h1 align="center">✨Thank You✨</h1>
