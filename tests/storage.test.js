import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { saveProducts, loadProducts, saveMealPlan, loadMealPlan, saveGoals, loadGoals } from "../src/storage.js";

// Mock localStorage
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, value) => { mockStorage[key] = value; },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(key => delete mockStorage[key]); }
};

describe("saveProducts", () => {
  test("AC-11: saves products to localStorage", () => {
    const products = [
      {
        id: "1",
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
        }
      },
      {
        id: "2",
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
        }
      }
    ];

    saveProducts(products);

    const stored = JSON.parse(localStorage.getItem("nutriScan_products"));
    assert.strictEqual(stored.length, 2);
    assert.strictEqual(stored[0].name, "Chocolate bar");
    assert.strictEqual(stored[1].name, "Apple juice");
  });
});

describe("loadProducts", () => {
  test("AC-12: loads products from localStorage", () => {
    const products = [
      {
        id: "1",
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
        }
      }
    ];

    localStorage.setItem("nutriScan_products", JSON.stringify(products));

    const loaded = loadProducts();
    assert.strictEqual(loaded.length, 1);
    assert.strictEqual(loaded[0].name, "Chocolate bar");
    assert.strictEqual(loaded[0].nutritionData.energy, 2292);
  });

  test("AC-13: returns empty array when no products stored", () => {
    localStorage.removeItem("nutriScan_products");
    const loaded = loadProducts();
    assert.strictEqual(loaded.length, 0);
  });
});

describe("saveMealPlan", () => {
  test("AC-14: saves meal plan to localStorage", () => {
    const mealPlan = {
      date: "2024-01-15",
      meals: [
        {
          name: "Breakfast",
          items: [
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
            }
          ]
        }
      ]
    };

    saveMealPlan(mealPlan);

    const stored = JSON.parse(localStorage.getItem("nutriScan_mealPlan"));
    assert.strictEqual(stored.date, "2024-01-15");
    assert.strictEqual(stored.meals.length, 1);
    assert.strictEqual(stored.meals[0].name, "Breakfast");
  });
});

describe("loadMealPlan", () => {
  test("AC-15: loads meal plan from localStorage", () => {
    const mealPlan = {
      date: "2024-01-15",
      meals: [
        {
          name: "Breakfast",
          items: [
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
            }
          ]
        }
      ]
    };

    localStorage.setItem("nutriScan_mealPlan", JSON.stringify(mealPlan));

    const loaded = loadMealPlan();
    assert.strictEqual(loaded.date, "2024-01-15");
    assert.strictEqual(loaded.meals.length, 1);
    assert.strictEqual(loaded.meals[0].name, "Breakfast");
  });

  test("AC-16: returns null when no meal plan stored", () => {
    localStorage.removeItem("nutriScan_mealPlan");
    const loaded = loadMealPlan();
    assert.strictEqual(loaded, null);
  });
});

describe("saveGoals", () => {
  test("AC-17: saves custom goals to localStorage", () => {
    const goals = {
      energy: 2000,
      fat: 65,
      saturatedFat: 20,
      carbohydrates: 275,
      sugars: 50,
      fiber: 25,
      protein: 50,
      salt: 6
    };

    saveGoals(goals);

    const stored = JSON.parse(localStorage.getItem("nutriScan_goals"));
    assert.strictEqual(stored.energy, 2000);
    assert.strictEqual(stored.fat, 65);
    assert.strictEqual(stored.saturatedFat, 20);
    assert.strictEqual(stored.carbohydrates, 275);
    assert.strictEqual(stored.sugars, 50);
    assert.strictEqual(stored.fiber, 25);
    assert.strictEqual(stored.protein, 50);
    assert.strictEqual(stored.salt, 6);
  });
});

describe("loadGoals", () => {
  test("AC-18: loads goals from localStorage", () => {
    const goals = {
      energy: 2000,
      fat: 65,
      saturatedFat: 20,
      carbohydrates: 275,
      sugars: 50,
      fiber: 25,
      protein: 50,
      salt: 6
    };

    localStorage.setItem("nutriScan_goals", JSON.stringify(goals));

    const loaded = loadGoals();
    assert.strictEqual(loaded.energy, 2000);
    assert.strictEqual(loaded.fat, 65);
    assert.strictEqual(loaded.saturatedFat, 20);
    assert.strictEqual(loaded.carbohydrates, 275);
    assert.strictEqual(loaded.sugars, 50);
    assert.strictEqual(loaded.fiber, 25);
    assert.strictEqual(loaded.protein, 50);
    assert.strictEqual(loaded.salt, 6);
  });

  test("AC-19: returns default goals when no goals stored", () => {
    localStorage.removeItem("nutriScan_goals");
    const loaded = loadGoals();
    assert.strictEqual(loaded.energy, 2000);
    assert.strictEqual(loaded.fat, 65);
    assert.strictEqual(loaded.saturatedFat, 20);
    assert.strictEqual(loaded.carbohydrates, 275);
    assert.strictEqual(loaded.sugars, 50);
    assert.strictEqual(loaded.fiber, 25);
    assert.strictEqual(loaded.protein, 50);
    assert.strictEqual(loaded.salt, 6);
  });
});