"use client";

import { useState } from "react";

export default function SupplimentForm({ onGenerate }) {
  const [fitnessGoal, setFitnessGoal] = useState("muscle gain");
  const [trainingIntensity, setTrainingIntensity] = useState("moderate");
  const [timeFrame, setTimeFrame] = useState("medium");
  const [dietPreference, setDietPreference] = useState("omnivorous");
  const [mainConcerns, setMainConcerns] = useState([]);
  const [existingSupps, setExistingSupps] = useState("");
  const [allergies, setAllergies] = useState("");
  const [budget, setBudget] = useState("medium");
  const [age, setAge] = useState("");
  const [knownConditions, setKnownConditions] = useState("no");

  const concernsList = [
    "Low Energy",
    "Muscle Recovery",
    "Fat Burn",
    "Joint Support",
    "Overall Health",
  ];

  const handleCheckboxChange = (concern) => {
    setMainConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((item) => item !== concern)
        : [...prev, concern]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!age) {
      alert("Please provide your age.");
      return;
    }
    onGenerate({
      fitnessGoal,
      trainingIntensity,
      timeFrame,
      dietPreference,
      mainConcerns,
      existingSupps,
      allergies,
      budget,
      age,
      knownConditions,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded shadow w-full">
      <h2 className="text-xl font-bold mb-4">Get Your Supplement Guide</h2>

      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Age (years):</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. 25"
        />
      </div>

      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Known Medical Conditions?</label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="knownConditions"
              value="yes"
              checked={knownConditions === "yes"}
              onChange={() => setKnownConditions("yes")}
            />
            Yes
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="knownConditions"
              value="no"
              checked={knownConditions === "no"}
              onChange={() => setKnownConditions("no")}
            />
            No
          </label>
        </div>
      </div>

      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Primary Fitness Goal:</label>
        <select
          value={fitnessGoal}
          onChange={(e) => setFitnessGoal(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1">
          <option value="muscle gain">Muscle Gain</option>
          <option value="weight loss">Weight Loss</option>
          <option value="endurance">Endurance</option>
          <option value="general wellness">General Wellness</option>
        </select>
      </div>

      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Training Intensity:</label>
        <select
          value={trainingIntensity}
          onChange={(e) => setTrainingIntensity(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1">
          <option value="light">Light (1-2 workouts/week)</option>
          <option value="moderate">Moderate (3-4 workouts/week)</option>
          <option value="high">High (5-6 workouts/week)</option>
          <option value="athletic">
            Athletic/Competitive (7+ workouts/week)
          </option>
        </select>
      </div>

      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Time Frame/Urgency:</label>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1">
          <option value="short">Short-term (1-4 weeks)</option>
          <option value="medium">Medium-term (5-12 weeks)</option>
          <option value="long">Long-term (3+ months)</option>
        </select>
      </div>

      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Dietary Preference:</label>
        <select
          value={dietPreference}
          onChange={(e) => setDietPreference(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1">
          <option value="omnivorous">Omnivorous</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>

      {/* Main Concerns: checkboxes */}
      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Main Concerns (Select any):</label>
        <div className="grid grid-cols-2 gap-1 mt-1">
          {concernsList.map((concern) => (
            <label key={concern} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={mainConcerns.includes(concern)}
                onChange={() => handleCheckboxChange(concern)}
              />
              {concern}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Existing Supplements (Optional):</label>
        <input
          type="text"
          value={existingSupps}
          onChange={(e) => setExistingSupps(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. Whey protein, multivitamin"
        />
      </div>

      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Allergies / Restrictions:</label>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1"
          placeholder="e.g. Dairy, Soy, Shellfish"
        />
      </div>

      <div className="flex flex-col text-sm mb-4">
        <label className="font-medium">Budget:</label>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mt-1">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-2 text-sm">
        Get Supplement Suggestions
      </button>
    </form>
  );
}
