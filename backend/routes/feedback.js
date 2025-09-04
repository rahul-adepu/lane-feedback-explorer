const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback");

// Use the feedback controller routes
router.use("/", feedbackController);

module.exports = router;
