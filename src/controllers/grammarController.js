// Import modules
const grammarService = require("../services/grammarService");

/**
 * Handles grammar checking for a given text.
 *
 * Expects a POST request with JSON body containing a 'text' string.
 * Validates the input text and calls grammarService to evaluate grammar.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 *
 * @returns {Promise<void>} Sends JSON response with grammar check results or error message
 */
exports.checkGrammar = async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    return res
      .status(400)
      .json({ error: 'Invalid or missing "text" in request' });
  }

  try {
    const result = await grammarService.evaluateText(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Ollama API error", error });
  }
};
