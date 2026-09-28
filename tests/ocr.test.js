import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { extractNutrition } from "../src/ocr.js";

// Mock fetch globally
global.fetch = async (url, options) => {
  // Simulate successful OCR response
  return {
    ok: true,
    json: async () => ({
      choices: [{
        message: {
          content: JSON.stringify({
            energy: 2292,
            fat: 33,
            saturatedFat: 13,
            carbohydrates: 55,
            sugars: 45,
            fiber: 2.4,
            protein: 6.8,
            salt: 0.18
          })
        }
      }]
    })
  };
};

describe("extractNutrition", () => {
  test("AC-1: extracts nutrition data from image via OCR API", async () => {
    const imageData = "base64encodedimage";
    const apiKey = "test-api-key";
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";

    const result = await extractNutrition(imageData, apiKey, apiEndpoint);

    assert.strictEqual(result.energy, 2292);
    assert.strictEqual(result.fat, 33);
    assert.strictEqual(result.saturatedFat, 13);
    assert.strictEqual(result.carbohydrates, 55);
    assert.strictEqual(result.sugars, 45);
    assert.strictEqual(result.fiber, 2.4);
    assert.strictEqual(result.protein, 6.8);
    assert.strictEqual(result.salt, 0.18);
  });

  test("AC-2: handles API errors gracefully", async () => {
    global.fetch = async () => ({
      ok: false,
      status: 500,
      statusText: "Internal Server Error"
    });

    const imageData = "base64encodedimage";
    const apiKey = "test-api-key";
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";

    await assert.rejects(
      async () => await extractNutrition(imageData, apiKey, apiEndpoint),
      /API request failed/
    );
  });

  test("AC-3: handles malformed API response", async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({
        choices: [{
          message: {
            content: "not valid JSON"
          }
        }]
      })
    });

    const imageData = "base64encodedimage";
    const apiKey = "test-api-key";
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";

    await assert.rejects(
      async () => await extractNutrition(imageData, apiKey, apiEndpoint),
      /Failed to parse nutrition data/
    );
  });

  test("AC-4: extracts all required nutrition fields", async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              energy: 199,
              fat: 0,
              saturatedFat: 0,
              carbohydrates: 11,
              sugars: 10,
              fiber: 0,
              protein: 0.4,
              salt: 0
            })
          }
        }]
      })
    });

    const imageData = "base64encodedimage";
    const apiKey = "test-api-key";
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";

    const result = await extractNutrition(imageData, apiKey, apiEndpoint);

    // Verify all fields are present and are numbers
    assert.strictEqual(typeof result.energy, "number");
    assert.strictEqual(typeof result.fat, "number");
    assert.strictEqual(typeof result.saturatedFat, "number");
    assert.strictEqual(typeof result.carbohydrates, "number");
    assert.strictEqual(typeof result.sugars, "number");
    assert.strictEqual(typeof result.fiber, "number");
    assert.strictEqual(typeof result.protein, "number");
    assert.strictEqual(typeof result.salt, "number");
  });
});