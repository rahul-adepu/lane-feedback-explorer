const express = require("express");
const connectDB = require("./db");
const feedbackRoutes = require("./routes/feedback");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS middleware
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Lane Feedback Explorer API",
    version: "1.0.0",
    endpoints: {
      "POST /feedback": "Create new feedback",
      "GET /feedback": "Get feedback list with optional query params (sort, category, q, page, limit)"
    }
  });
});

// Use feedback routes
app.use("/", feedbackRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong!"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log("MongoDB connected");
  console.log(`Server is running on port ${PORT}`);
});
