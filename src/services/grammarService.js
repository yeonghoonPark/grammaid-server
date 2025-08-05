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
      "feedback": (string, your brief explanation in Korean),
      "recommendedSentences": [three different English sentences with same meaning]
    }

    - If the text is grammatically correct and natural,
      set "isGrammaticallyCorrect" to true and provide an explanation in Korean as "feedback", including what the sentence means.
      Also, provide three alternative English sentences with the same meaning in the "recommendedSentences" array.

    - If not,
      set "isGrammaticallyCorrect" to false, briefly explain in Korean why it is wrong as "feedback".
      The "recommendedSentences" array can be omitted or left empty in that case.

    - Do not include any thinking process. Just provide the answer directly.
    
    - All explanations ("feedback") must be in Korean.

    For example:
    {
      "isGrammaticallyCorrect": true,
      "feedback": "문장이 문법적으로 정확하고 자연스럽습니다. ~~~",
      "recommendedSentences": [
        "~~~",
        "~~~",
        "~~~"
      ]
    }
  `;

  const params = {
    model: AI_MODEL,
    prompt,
    stream: false,
  };
  const response = await axios.post(AI_URL, params, { timeout: 120000 });
  const data = response.data?.response || response.data;
  const result = JSON.parse(
    data.replace(/<think>[\s\S]*?<\/think>/gi, "").trim()
  );

  return result;
};
