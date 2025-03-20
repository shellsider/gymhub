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
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded shadow w-full">
      <label className="flex flex-col text-sm font-medium">
        Current Weight (kg):
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. 80"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Target Weight (kg):
        <input
          type="number"
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. 70"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Height (cm):
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. 178"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Age (years):
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. 21"
        />
      </label>

      <div className="flex flex-col text-sm font-medium">
        Goal:
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="goal"
              value="lose"
              checked={goal === "lose"}
              onChange={() => setGoal("lose")}
            />
            Lose Weight
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="goal"
              value="gain"
              checked={goal === "gain"}
              onChange={() => setGoal("gain")}
            />
            Gain Weight
          </label>
        </div>
      </div>

      <label className="flex flex-col text-sm font-medium">
        Duration (weeks):
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. 4"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Dietary Preference:
        <select
          value={dietPreference}
          onChange={(e) => setDietPreference(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1">
          <option value="omnivorous">Omnivorous</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </label>

      <label className="flex flex-col text-sm font-medium">
        Activity Level:
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1">
          <option value="sedentary">Sedentary (No Exercise)</option>
          <option value="light">Light (1-3 Days/Week)</option>
          <option value="moderate">Moderate (3-5 Days/Week)</option>
          <option value="very active">Very Active (6-7 Days/Week)</option>
          <option value="super active">Super Active (Athlete Level)</option>
        </select>
      </label>

      <label className="flex flex-col text-sm font-medium">
        Water Intake (Liters/day):
        <input
          type="number"
          step="0.1"
          value={waterIntake}
          onChange={(e) => setWaterIntake(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. 2.5"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Food Allergies (Optional):
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. Nuts, Dairy, Gluten"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Preferred Meals/Day:
        <select
          value={mealFrequency}
          onChange={(e) => setMealFrequency(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1">
          <option value="2">2 Meals</option>
          <option value="3">3 Meals</option>
          <option value="5">5-6 Small Meals</option>
        </select>
      </label>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
        Generate Plan
      </button>
    </form>
  );
}
