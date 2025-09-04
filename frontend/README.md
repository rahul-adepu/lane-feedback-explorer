# Lane Feedback Explorer - Frontend

A modern React application for submitting and exploring product feedback.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with:
```
REACT_APP_API_URL=http://localhost:3000
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Features

- **Add Feedback**: Modal form with validation for submitting new feedback
- **Feedback Explorer**: List, search, filter, and sort feedback items
- **Grouping**: Group feedback by category with collapsible sections
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Automatic refresh when new feedback is added

## Tech Stack

- React 18
- Tailwind CSS for styling
- Axios for API calls
- React Hot Toast for notifications
- Lucide React for icons