// Import modules
const express = require("express");
const grammarController = require("../controllers/grammarController");
const { GRAMMAR_REVIEW_URL } = require("../constants");

// Router setup
const router = express.Router();

// Define POST API endpoint for grammar checking
router.post(GRAMMAR_REVIEW_URL, grammarController.checkGrammar);

// Export the router module
module.exports = router;
