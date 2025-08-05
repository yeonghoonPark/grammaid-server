// Ollama AI model settings
const AI_MODEL = "qwen3";
const AI_URL = process.env.AI_URL || "http://localhost:11434/api/generate";

// Server port configuration
const API_PORT = process.env.PORT || 5000;

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
