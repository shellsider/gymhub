"use client";

import { useState } from "react";

export default function NutritionForm({ onSendMeals }) {
  // Start with one meal entry, now including an optional "info" field.
  const [meals, setMeals] = useState([
    { mealName: "", servings: "", info: "" },
  ]);

  // Handle input change for a given meal entry.
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newMeals = [...meals];
    newMeals[index][name] = value;
    setMeals(newMeals);
  };

  // Add a new meal input.
  const addMeal = () => {
    setMeals([...meals, { mealName: "", servings: "", info: "" }]);
  };

  // On form submission, send the meals data upward.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that required fields (mealName and servings) are not empty.
    for (let i = 0; i < meals.length; i++) {
      const { mealName, servings } = meals[i];
      if (!mealName.trim() || !servings.trim()) {
        alert(
          "Please fill out all required fields (Meal Name and Servings) for each meal."
        );
        return;
      }
    }

    onSendMeals(meals);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow-lg w-full border-t-4 border-red-600">
      {meals.map((meal, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 pb-6 border-b border-gray-200">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Meal Name
            </label>
            <input
              type="text"
              name="mealName"
              placeholder="e.g., Grilled Chicken Salad"
              value={meal.mealName}
              onChange={(e) => handleChange(index, e)}
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Servings
            </label>
            <input
              type="text"
              name="servings"
              placeholder="e.g., 2"
              value={meal.servings}
              onChange={(e) => handleChange(index, e)}
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Info (Optional)
            </label>
            <input
              type="text"
              name="info"
              placeholder="Additional context (optional)"
              value={meal.info}
              onChange={(e) => handleChange(index, e)}
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addMeal}
        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md font-medium">
        + Add Another Meal
      </button>

      <button
        type="submit"
        className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md font-bold transform hover:scale-[1.02] transition-transform duration-200">
        CALCULATE NUTRITION
      </button>
    </form>
  );
}
