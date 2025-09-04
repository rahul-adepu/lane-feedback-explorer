const express = require("express");
const connectDB = require("./db");
const feedbackRoutes = require("./routes/feedback");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS middleware (basic setup)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

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
app.use("*", (req, res) => {
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
