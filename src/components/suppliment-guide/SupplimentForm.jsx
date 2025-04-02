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
      className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow-lg w-full border-t-4 border-red-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Age (years)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. 25"
          />
        </div>

        {/* Known Medical Conditions */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Known Medical Conditions?
          </label>
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="knownConditions"
                value="yes"
                checked={knownConditions === "yes"}
                onChange={() => setKnownConditions("yes")}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <span className="text-gray-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="knownConditions"
                value="no"
                checked={knownConditions === "no"}
                onChange={() => setKnownConditions("no")}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Fitness Goal */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Primary Fitness Goal
          </label>
          <select
            value={fitnessGoal}
            onChange={(e) => setFitnessGoal(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="muscle gain">Muscle Gain</option>
            <option value="weight loss">Weight Loss</option>
            <option value="endurance">Endurance</option>
            <option value="general wellness">General Wellness</option>
          </select>
        </div>

        {/* Training Intensity */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Training Intensity
          </label>
          <select
            value={trainingIntensity}
            onChange={(e) => setTrainingIntensity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="light">Light (1-2 workouts/week)</option>
            <option value="moderate">Moderate (3-4 workouts/week)</option>
            <option value="high">High (5-6 workouts/week)</option>
            <option value="athletic">
              Athletic/Competitive (7+ workouts/week)
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Frame/Urgency */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Time Frame/Urgency
          </label>
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="short">Short-term (1-4 weeks)</option>
            <option value="medium">Medium-term (5-12 weeks)</option>
            <option value="long">Long-term (3+ months)</option>
          </select>
        </div>

        {/* Dietary Preference */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Dietary Preference
          </label>
          <select
            value={dietPreference}
            onChange={(e) => setDietPreference(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="omnivorous">Omnivorous</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
      </div>

      {/* Main Concerns: checkboxes */}
      <div>
        <label className="block text-gray-700 font-medium mb-3">
          Main Concerns (Select any)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {concernsList.map((concern) => (
            <label
              key={concern}
              className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={mainConcerns.includes(concern)}
                onChange={() => handleCheckboxChange(concern)}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">{concern}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Existing Supplements */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Existing Supplements (Optional)
          </label>
          <input
            type="text"
            value={existingSupps}
            onChange={(e) => setExistingSupps(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. Whey protein, multivitamin"
          />
        </div>

        {/* Allergies / Restrictions */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Allergies / Restrictions
          </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="e.g. Dairy, Soy, Shellfish"
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Budget</label>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md font-bold transform hover:scale-[1.02] transition-transform duration-200">
        GET SUPPLEMENT SUGGESTIONS
      </button>
    </form>
  );
}
