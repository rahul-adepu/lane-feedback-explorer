const Feedback = require("../model/feedback");

const express = require("express");
const router = express.Router();

// POST /feedback - Create new feedback with server-side validation
router.post("/feedback", async (req, res) => {
  try {
    // Basic validation - check if required fields are present
    const { title, description, category } = req.body;
    
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        errors: {
          title: !title ? "Title is required" : null,
          description: !description ? "Description is required" : null,
          category: !category ? "Category is required" : null
        }
      });
    }

    // Additional manual validation
    if (title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 3 characters long"
      });
    }

    if (description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Description must be at least 10 characters long"
      });
    }

    if (!["bug", "feature", "improvement", "other"].includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Category must be one of: bug, feature, improvement, other"
      });
    }

    // Create new feedback
    const feedback = new Feedback({
      title: title.trim(),
      description: description.trim(),
      category: category.toLowerCase()
    });

    // Save to database (Mongoose will also validate)
    const savedFeedback = await feedback.save();
    
    res.status(201).json({
      success: true,
      message: "Feedback created successfully",
      data: savedFeedback
    });

  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors
      });
    }

    // Handle other errors
    console.error("Error creating feedback:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// GET /feedback - List feedback with optional query parameters
router.get("/feedback", async (req, res) => {
  try {
    const { sort, category, q, page = 1, limit = 10 } = req.query;
    
    // Build query object
    let query = {};
    
    // Filter by category if provided
    if (category) {
      if (!["bug", "feature", "improvement", "other"].includes(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category. Must be one of: bug, feature, improvement, other"
        });
      }
      query.category = category;
    }
    
    // Search by title or description if 'q' is provided
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Build sort object
    let sortObj = { createdAt: -1 }; // Default sort by newest first
    
    if (sort) {
      switch (sort) {
        case 'newest':
          sortObj = { createdAt: -1 };
          break;
        case 'oldest':
          sortObj = { createdAt: 1 };
          break;
        case 'votes':
          sortObj = { votes: -1 };
          break;
        case 'title':
          sortObj = { title: 1 };
          break;
        default:
          return res.status(400).json({
            success: false,
            message: "Invalid sort parameter. Must be one of: newest, oldest, votes, title"
          });
      }
    }
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Validate pagination parameters
    if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100"
      });
    }
    
    // Execute query
    const feedback = await Feedback.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);
    
    // Get total count for pagination info
    const total = await Feedback.countDocuments(query);
    const totalPages = Math.ceil(total / limitNum);
    
    res.status(200).json({
      success: true,
      message: "Feedback retrieved successfully",
      data: feedback,
      pagination: {
        currentPage: pageNum,
        totalPages: totalPages,
        totalItems: total,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
    
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

module.exports = router;
