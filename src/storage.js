/**
 * Storage module for localStorage persistence.
 * Handles products, meal plans, and custom goals.
 */

const PRODUCTS_KEY = "nutriScan_products";
const MEAL_PLAN_KEY = "nutriScan_mealPlan";
const GOALS_KEY = "nutriScan_goals";

const DEFAULT_GOALS = {
  energy: 2000,
  fat: 65,
  saturatedFat: 20,
  carbohydrates: 275,
  sugars: 50,
  fiber: 25,
  protein: 50,
  salt: 6
};

/**
 * Saves products to localStorage.
 *
 * @param {Array<Object>} products - Array of product objects
 */
export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

/**
 * Loads products from localStorage.
 *
 * @returns {Array<Object>} Array of product objects
 */
export function loadProducts() {
  const data = localStorage.getItem(PRODUCTS_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

/**
 * Saves meal plan to localStorage.
 *
 * @param {Object} mealPlan - Meal plan object with date and meals
 */
export function saveMealPlan(mealPlan) {
  localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(mealPlan));
}

/**
 * Loads meal plan from localStorage.
 *
 * @returns {Object|null} Meal plan object or null if not stored
 */
export function loadMealPlan() {
  const data = localStorage.getItem(MEAL_PLAN_KEY);
  if (!data) return null;
  return JSON.parse(data);
}

/**
 * Saves custom goals to localStorage.
 *
 * @param {Object} goals - Goals object with nutrition targets
 */
export function saveGoals(goals) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

/**
 * Loads goals from localStorage, returning defaults if none stored.
 *
 * @returns {Object} Goals object with nutrition targets
 */
export function loadGoals() {
  const data = localStorage.getItem(GOALS_KEY);
  if (!data) return { ...DEFAULT_GOALS };
  return JSON.parse(data);
}