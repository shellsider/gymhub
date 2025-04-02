"use client";

import { useState } from "react";

export default function WorkoutForm({ onGeneratePlan }) {
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [numExercises, setNumExercises] = useState("3");
  const [setsPerExercise, setSetsPerExercise] = useState("3");
  const [fitnessGoal, setFitnessGoal] = useState("strength");
  const [experience, setExperience] = useState("beginner");
  const [equipment, setEquipment] = useState("bodyweight");
  const [duration, setDuration] = useState("30"); // in minutes
  const [restTime, setRestTime] = useState("45-60s");
  const [trainingStyle, setTrainingStyle] = useState("straight sets");
  const [warmupCoolDown, setWarmupCoolDown] = useState("yes");
  const [cardioIntegration, setCardioIntegration] = useState("no");

  // Body Part checkboxes
  const bodyPartsList = [
    "Chest",
    "Back",
    "Biceps",
    "Triceps",
    "Forearms",
    "Abs",
    "Legs",
  ];

  const handleCheckboxChange = (part) => {
    setSelectedBodyParts((prev) =>
      prev.includes(part)
        ? prev.filter((item) => item !== part)
        : [...prev, part]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBodyParts.length === 0) {
      alert("Please select at least one body part.");
      return;
    }

    onGeneratePlan({
      selectedBodyParts,
      numExercises,
      setsPerExercise,
      fitnessGoal,
      experience,
      equipment,
      duration,
      restTime,
      trainingStyle,
      warmupCoolDown,
      cardioIntegration,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow-lg w-full border-t-4 border-red-600">
      {/* Body Parts */}
      <div>
        <label className="block text-gray-700 font-medium mb-3">
          Select Body Parts
        </label>
        <div className="grid grid-cols-2 gap-3">
          {bodyPartsList.map((part) => (
            <label
              key={part}
              className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={part}
                checked={selectedBodyParts.includes(part)}
                onChange={() => handleCheckboxChange(part)}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">{part}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Number of Exercises */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Number of Exercises
          </label>
          <select
            value={numExercises}
            onChange={(e) => setNumExercises(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="3">3 Exercises</option>
            <option value="4">4 Exercises</option>
            <option value="5">5 Exercises</option>
            <option value="6">6 Exercises</option>
            <option value="7">7 Exercises</option>
          </select>
        </div>

        {/* Sets per Exercise */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Sets per Exercise
          </label>
          <select
            value={setsPerExercise}
            onChange={(e) => setSetsPerExercise(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="3">3 Sets</option>
            <option value="4">4 Sets</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fitness Goal */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Fitness Goal
          </label>
          <select
            value={fitnessGoal}
            onChange={(e) => setFitnessGoal(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="strength">Strength Training</option>
            <option value="hypertrophy">Hypertrophy (Muscle Growth)</option>
            <option value="fat loss">Fat Loss & Toning</option>
            <option value="endurance">Endurance Training</option>
            <option value="general">General Fitness</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Experience Level
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Equipment */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Available Equipment
          </label>
          <select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="bodyweight">Bodyweight Only</option>
            <option value="dumbbells">Dumbbells</option>
            <option value="barbell">Barbell & Weights</option>
            <option value="full gym">Full Gym Access</option>
          </select>
        </div>

        {/* Workout Duration */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Workout Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="30">30 Minutes</option>
            <option value="45">45 Minutes</option>
            <option value="60">60 Minutes</option>
            <option value="90">90 Minutes (1.5 hrs)</option>
            <option value="120">120 Minutes (2 hrs)</option>
            <option value="150">150 Minutes (2.5 hrs)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rest Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Rest Time Between Sets
          </label>
          <select
            value={restTime}
            onChange={(e) => setRestTime(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="30s">30 seconds</option>
            <option value="45-60s">45-60 seconds</option>
            <option value="90s">90 seconds</option>
            <option value="120s+">2+ minutes</option>
          </select>
        </div>

        {/* Training Style */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Training Style
          </label>
          <select
            value={trainingStyle}
            onChange={(e) => setTrainingStyle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
            <option value="straight sets">Straight Sets</option>
            <option value="supersets">Supersets</option>
            <option value="circuit">Circuit Training</option>
            <option value="drop sets">Drop Sets</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Warm-Up & Cool Down */}
        <div className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Include Warm-Up & Cool Down?
          </span>
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="warmupCoolDown"
                value="yes"
                checked={warmupCoolDown === "yes"}
                onChange={() => setWarmupCoolDown("yes")}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="warmupCoolDown"
                value="no"
                checked={warmupCoolDown === "no"}
                onChange={() => setWarmupCoolDown("no")}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Cardio Integration */}
        <div className="flex flex-col">
          <span className="text-gray-700 font-medium mb-2">
            Integrate Cardio?
          </span>
          <div className="flex gap-6 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="cardioIntegration"
                value="yes"
                checked={cardioIntegration === "yes"}
                onChange={() => setCardioIntegration("yes")}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="cardioIntegration"
                value="no"
                checked={cardioIntegration === "no"}
                onChange={() => setCardioIntegration("no")}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <span>No</span>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="inline-block mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all flex items-center justify-center shadow-md transform hover:scale-105 w-full md:w-auto md:self-end">
        <span>Generate Workout Plan</span>
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
