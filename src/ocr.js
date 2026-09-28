/**
 * OCR module for extracting nutrition data from label images.
 * Uses an OpenAI-compatible endpoint to process images.
 */

/**
 * Extracts nutritional values from an image via an OpenAI-compatible OCR API.
 *
 * @param {string} imageData - Base64-encoded image data
 * @param {string} apiKey - API key for the OCR service
 * @param {string} apiEndpoint - URL of the OpenAI-compatible endpoint
 * @returns {Promise<Object>} Nutrition data object with fields: energy, fat, saturatedFat, carbohydrates, sugars, fiber, protein, salt
 */
export async function extractNutrition(imageData, apiKey, apiEndpoint) {
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract the nutritional information from this nutrition label. Return a JSON object with these fields: energy (kJ per 100g), fat (g per 100g), saturatedFat (g per 100g), carbohydrates (g per 100g), sugars (g per 100g), fiber (g per 100g), protein (g per 100g), salt (g per 100g). All values should be numbers."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageData}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
    throw new Error("Failed to parse nutrition data: invalid API response structure");
  }

  try {
    const content = data.choices[0].message.content;
    // Try to extract JSON from the response (in case there's markdown formatting)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse nutrition data: no JSON found in response");
    }
    const nutritionData = JSON.parse(jsonMatch[0]);

    // Ensure all required fields are numbers
    const result = {};
    const fields = ["energy", "fat", "saturatedFat", "carbohydrates", "sugars", "fiber", "protein", "salt"];
    for (const field of fields) {
      result[field] = Number(nutritionData[field]) || 0;
    }

    return result;
  } catch (e) {
    throw new Error(`Failed to parse nutrition data: ${e.message}`);
  }
}