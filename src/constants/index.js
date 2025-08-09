// Ollama AI model settings
const AI_MODEL = process.env.AI_MODEL;
const AI_URL = process.env.AI_URL;

// Server port configuration
const API_PORT = process.env.PORT;

// API endpoint URLs
const BASE_URL_V1 = "/api/v1";
const GRAMMAR_BASE_URL = `${BASE_URL_V1}/grammar`;
const GRAMMAR_REVIEW_URL = `${GRAMMAR_BASE_URL}/review`;

module.exports = {
  AI_MODEL,
  AI_URL,
  API_PORT,
  GRAMMAR_REVIEW_URL,
};
