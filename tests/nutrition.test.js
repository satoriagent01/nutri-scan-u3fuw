import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateServing, calculateMeal } from "../src/nutrition.js";

describe("calculateServing", () => {
  test("AC-5: scales nutrition from per-100g to custom gram amount", () => {
    const nutritionData = {
      energy: 2292,
      fat: 33,
      saturatedFat: 13,
      carbohydrates: 55,
      sugars: 45,
      fiber: 2.4,
      protein: 6.8,
      salt: 0.18
    };

    // 30g serving (like 1 Melto bar from the spec example)
    const result = calculateServing(nutritionData, 30);

    assert.strictEqual(result.energy, 687.6);
    assert.strictEqual(result.fat, 9.9);
    assert.strictEqual(result.saturatedFat, 3.9);
    assert.strictEqual(result.carbohydrates, 16.5);
    assert.strictEqual(result.sugars, 13.5);
    assert.strictEqual(result.fiber, 0.72);
    assert.strictEqual(result.protein, 2.04);
    assert.strictEqual(result.salt, 0.054);
  });

  test("AC-6: handles 100g serving (no scaling)", () => {
    const nutritionData = {
      energy: 199,
      fat: 0,
      saturatedFat: 0,
      carbohydrates: 11,
      sugars: 10,
      fiber: 0,
      protein: 0.4,
      salt: 0
    };

    const result = calculateServing(nutritionData, 100);

    assert.strictEqual(result.energy, 199);
    assert.strictEqual(result.fat, 0);
    assert.strictEqual(result.saturatedFat, 0);
    assert.strictEqual(result.carbohydrates, 11);
    assert.strictEqual(result.sugars, 10);
    assert.strictEqual(result.fiber, 0);
    assert.strictEqual(result.protein, 0.4);
    assert.strictEqual(result.salt, 0);
  });

  test("AC-7: handles 0g serving", () => {
    const nutritionData = {
      energy: 2292,
      fat: 33,
      saturatedFat: 13,
      carbohydrates: 55,
      sugars: 45,
      fiber: 2.4,
      protein: 6.8,
      salt: 0.18
    };

    const result = calculateServing(nutritionData, 0);

    assert.strictEqual(result.energy, 0);
    assert.strictEqual(result.fat, 0);
    assert.strictEqual(result.saturatedFat, 0);
    assert.strictEqual(result.carbohydrates, 0);
    assert.strictEqual(result.sugars, 0);
    assert.strictEqual(result.fiber, 0);
    assert.strictEqual(result.protein, 0);
    assert.strictEqual(result.salt, 0);
  });
});

describe("calculateMeal", () => {
  test("AC-8: sums nutrition across all items in a meal", () => {
    const mealItems = [
      {
        name: "Chocolate bar",
        nutritionData: {
          energy: 2292,
          fat: 33,
          saturatedFat: 13,
          carbohydrates: 55,
          sugars: 45,
          fiber: 2.4,
          protein: 6.8,
          salt: 0.18
        },
        grams: 30
      },
      {
        name: "Apple juice",
        nutritionData: {
          energy: 199,
          fat: 0,
          saturatedFat: 0,
          carbohydrates: 11,
          sugars: 10,
          fiber: 0,
          protein: 0.4,
          salt: 0
        },
        grams: 200
      }
    ];

    const result = calculateMeal(mealItems);

    // Chocolate bar (30g): energy=687.6, fat=9.9, satFat=3.9, carbs=16.5, sugars=13.5, fiber=0.72, protein=2.04, salt=0.054
    // Apple juice (200ml): energy=398, fat=0, satFat=0, carbs=22, sugars=20, fiber=0, protein=0.8, salt=0
    // Total: energy=1085.6, fat=9.9, satFat=3.9, carbs=38.5, sugars=33.5, fiber=0.72, protein=2.84, salt=0.054

    assert.strictEqual(result.energy, 1085.6);
    assert.strictEqual(result.fat, 9.9);
    assert.strictEqual(result.saturatedFat, 3.9);
    assert.strictEqual(result.carbohydrates, 38.5);
    assert.strictEqual(result.sugars, 33.5);
    assert.strictEqual(result.fiber, 0.72);
    assert.strictEqual(result.protein, 2.84);
    assert.strictEqual(result.salt, 0.054);
  });

  test("AC-9: handles empty meal", () => {
    const mealItems = [];
    const result = calculateMeal(mealItems);

    assert.strictEqual(result.energy, 0);
    assert.strictEqual(result.fat, 0);
    assert.strictEqual(result.saturatedFat, 0);
    assert.strictEqual(result.carbohydrates, 0);
    assert.strictEqual(result.sugars, 0);
    assert.strictEqual(result.fiber, 0);
    assert.strictEqual(result.protein, 0);
    assert.strictEqual(result.salt, 0);
  });

  test("AC-10: handles single item meal", () => {
    const mealItems = [
      {
        name: "Olive oil",
        nutritionData: {
          energy: 3404,
          fat: 92,
          saturatedFat: 14,
          carbohydrates: 0,
          sugars: 0,
          fiber: 0,
          protein: 0,
          salt: 0
        },
        grams: 100
      }
    ];

    const result = calculateMeal(mealItems);

    assert.strictEqual(result.energy, 3404);
    assert.strictEqual(result.fat, 92);
    assert.strictEqual(result.saturatedFat, 14);
    assert.strictEqual(result.carbohydrates, 0);
    assert.strictEqual(result.sugars, 0);
    assert.strictEqual(result.fiber, 0);
    assert.strictEqual(result.protein, 0);
    assert.strictEqual(result.salt, 0);
  });
});