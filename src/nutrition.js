/**
 * Nutrition calculation module.
 * Provides functions to scale nutrition data and sum meals.
 */

/**
 * Scales nutrition values from per-100g to a given gram amount.
 *
 * @param {Object} nutritionData - Nutrition data per 100g with fields: energy, fat, saturatedFat, carbohydrates, sugars, fiber, protein, salt
 * @param {number} grams - The amount in grams to scale to
 * @returns {Object} Scaled nutrition data
 */
export function calculateServing(nutritionData, grams) {
  const factor = grams / 100;
  return {
    energy: nutritionData.energy * factor,
    fat: nutritionData.fat * factor,
    saturatedFat: nutritionData.saturatedFat * factor,
    carbohydrates: nutritionData.carbohydrates * factor,
    sugars: nutritionData.sugars * factor,
    fiber: nutritionData.fiber * factor,
    protein: nutritionData.protein * factor,
    salt: nutritionData.salt * factor
  };
}

/**
 * Sums nutrition across all items in a meal.
 * Each item has: name, nutritionData (per 100g), grams
 *
 * @param {Array<Object>} mealItems - Array of meal items
 * @returns {Object} Total nutrition for the meal
 */
export function calculateMeal(mealItems) {
  const total = {
    energy: 0,
    fat: 0,
    saturatedFat: 0,
    carbohydrates: 0,
    sugars: 0,
    fiber: 0,
    protein: 0,
    salt: 0
  };

  for (const item of mealItems) {
    const serving = calculateServing(item.nutritionData, item.grams);
    for (const key of Object.keys(total)) {
      total[key] += serving[key];
    }
  }

  return total;
}