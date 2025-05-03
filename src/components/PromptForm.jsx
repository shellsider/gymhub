"use client";

import { useState } from "react";

export default function PromptForm({ onGenerate }) {
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("lose");
  const [duration, setDuration] = useState("4");
  const [dietPreference, setDietPreference] = useState("omnivorous");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [waterIntake, setWaterIntake] = useState("");
  const [allergies, setAllergies] = useState("");
  const [mealFrequency, setMealFrequency] = useState("3");
  const [includeImages, setIncludeImages] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic checks
    if (!weight || !targetWeight || !height || !age || !waterIntake) {
      alert("Please fill out all required fields!");
      return;
    }
    onGenerate({
      weight,
      targetWeight,
      height,
      age,
      goal,
      duration,
      dietPreference,
      activityLevel,
      waterIntake,
      allergies,
      mealFrequency,
      includeImages,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow-lg w-full border-t-4 border-red-600">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Your Personal Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Current Weight (kg):
          </span>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. 80"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Target Weight (kg):
          </span>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. 70"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">Height (cm):</span>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. 178"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">Age (years):</span>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. 21"
          />
        </label>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-700 font-medium mb-2">Goal:</span>
        <div className="flex gap-6 mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="goal"
              value="lose"
              checked={goal === "lose"}
              onChange={() => setGoal("lose")}
              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <span>Lose Weight</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="goal"
              value="gain"
              checked={goal === "gain"}
              onChange={() => setGoal("gain")}
              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <span>Gain Weight</span>
          </label>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
        Plan Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Duration (weeks):
          </span>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. 4"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Dietary Preference:
          </span>
          <select
            value={dietPreference}
            onChange={(e) => setDietPreference(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="omnivorous">Omnivorous</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Activity Level:
          </span>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="sedentary">Sedentary (No Exercise)</option>
            <option value="light">Light (1-3 Days/Week)</option>
            <option value="moderate">Moderate (3-5 Days/Week)</option>
            <option value="very active">Very Active (6-7 Days/Week)</option>
            <option value="super active">Super Active (Athlete Level)</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Water Intake (Liters/day):
          </span>
          <input
            type="number"
            step="0.1"
            value={waterIntake}
            onChange={(e) => setWaterIntake(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. 2.5"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Food Allergies (Optional):
          </span>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. Nuts, Dairy, Gluten"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Preferred Meals/Day:
          </span>
          <select
            value={mealFrequency}
            onChange={(e) => setMealFrequency(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="2">2 Meals</option>
            <option value="3">3 Meals</option>
            <option value="5">5-6 Small Meals</option>
          </select>
        </label>
      </div>

      <div className="mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeImages}
            onChange={(e) => setIncludeImages(e.target.checked)}
            className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <span className="text-gray-700">
            Include dish images in your plan
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="inline-block mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all flex items-center justify-center shadow-md transform hover:scale-105 w-full md:w-auto md:self-end">
        <span>Generate Plan</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>
    </form>
  );
}
