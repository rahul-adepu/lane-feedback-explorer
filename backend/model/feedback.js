const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    votes: { type: Number },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
