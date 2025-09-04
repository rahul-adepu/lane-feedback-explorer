const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: { 
      type: String, 
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [500, "Description cannot exceed 500 characters"]
    },
    category: { 
      type: String, 
      required: [true, "Category is required"],
      enum: {
        values: ["bug", "feature", "improvement", "other"],
        message: "Category must be one of: bug, feature, improvement, other"
      }
    },
    votes: { 
      type: Number, 
      default: 0,
      min: [0, "Votes cannot be negative"]
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open"
    }
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
