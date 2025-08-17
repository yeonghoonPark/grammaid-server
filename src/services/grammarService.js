// Import modules
const axios = require("axios");
const { AI_MODEL, AI_URL } = require("../constants");

/**
 * Evaluates the grammar of the given English text by sending a request to an AI API.
 *
 * The text is sanitized to replace certain characters, and a prompt is constructed for the AI.
 * The AI responds with a JSON containing grammar correctness, feedback in Korean, and recommended sentences.
 *
 * @param {string} text - The English text to evaluate.
 * @returns {Promise<{
 *   isGrammaticallyCorrect: boolean,
 *   feedback: string,
 *   recommendedSentences?: string[]
 * }>} An object with grammar evaluation result, feedback in Korean, and optionally recommended sentences.
 *
 * @throws Will throw an error if the API request fails or response parsing fails.
 */
exports.evaluateText = async (text) => {
  const safeText = text.replace(/["`]/g, "'");
  const prompt = `
    Please evaluate the following English text: "${safeText}".

    - Respond ONLY in JSON format, with the following structure:
    {
      "isGrammaticallyCorrect": (true or false),
      "feedback": (string, your detailed and precise explanation in Korean, including grammar, naturalness, and expression appropriateness),
      "recommendedSentences": [between three and six different English sentences with the same meaning, corrected if original sentence is incorrect]
    }

    - If the text is grammatically correct and natural,
      set "isGrammaticallyCorrect" to true and provide a detailed explanation in Korean as "feedback", including what the sentence means and why it is correct.
      Also, provide between three and six different English sentences with the same meaning in the "recommendedSentences" array.

    - If not,
      set "isGrammaticallyCorrect" to false, provide a detailed explanation in Korean as "feedback" explaining exactly why it is incorrect, including grammar mistakes, awkwardness, or unnatural expressions.
      Provide between three and six different corrected English sentences with the same meaning in the "recommendedSentences" array.

    - Do not include any thinking process. Just provide the answer directly.

    - All explanations ("feedback") must be in Korean.

    For example:
      {
        "isGrammaticallyCorrect": true,
        "feedback": "-----. ----- ... ----- ... ----- ... -----.",
        "recommendedSentences": [
          "...",
          "...",
          "..."
        ]
      }
  `;

  const params = {
    model: AI_MODEL,
    prompt,
    stream: false,
    think: false,
  };
  const response = await axios.post(AI_URL, params, { timeout: 120000 });
  const data = response.data?.response || response.data;
  const result = JSON.parse(data);

  return result;
};
