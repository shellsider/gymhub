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
            className="flex flex-col gap-4 p-6 bg-white rounded shadow w-full"
        >
            {/* Body Parts */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Select Body Parts
                </label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    {bodyPartsList.map((part) => (
                        <label key={part} className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                value={part}
                                checked={selectedBodyParts.includes(part)}
                                onChange={() => handleCheckboxChange(part)}
                            />
                            {part}
                        </label>
                    ))}
                </div>
            </div>

            {/* Number of Exercises */}
            <div>
                <label className="block text-sm font-medium">
                    Number of Exercises
                </label>
                <select
                    value={numExercises}
                    onChange={(e) => setNumExercises(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                >
                    <option value="3">3 Exercises</option>
                    <option value="4">4 Exercises</option>
                    <option value="5">5 Exercises</option>
                    <option value="6">6 Exercises</option>
                    <option value="7">7 Exercises</option>
                </select>
            </div>

            {/* Sets per Exercise */}
            <div>
                <label className="block text-sm font-medium">
                    Sets per Exercise
                </label>
                <select
                    value={setsPerExercise}
                    onChange={(e) => setSetsPerExercise(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                >
                    <option value="3">3 Sets</option>
                    <option value="4">4 Sets</option>
                </select>
            </div>

            {/* Fitness Goal */}
            <div>
                <label className="block text-sm font-medium">Fitness Goal</label>
                <select
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                >
                    <option value="strength">Strength Training</option>
                    <option value="hypertrophy">Hypertrophy (Muscle Growth)</option>
                    <option value="fat loss">Fat Loss & Toning</option>
                    <option value="endurance">Endurance Training</option>
                    <option value="general">General Fitness</option>
                </select>
            </div>

            {/* Experience Level */}
            <div>
                <label className="block text-sm font-medium">Experience Level</label>
                <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>

            {/* Equipment */}
            <div>
                <label className="block text-sm font-medium">Available Equipment</label>
                <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                >
                    <option value="bodyweight">Bodyweight Only</option>
                    <option value="dumbbells">Dumbbells</option>
                    <option value="barbell">Barbell & Weights</option>
                    <option value="full gym">Full Gym Access</option>
                </select>
            </div>

            {/* Workout Duration */}
            <div>
                <label className="block text-sm font-medium">Workout Duration</label>
                <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                >
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes</option>
                    <option value="90">90 Minutes (1.5 hrs)</option>
                    <option value="120">120 Minutes (2 hrs)</option>
                    <option value="150">150 Minutes (2.5 hrs)</option>
                </select>
            </div>

            {/* Rest Time */}
            <div>
                <label className="block text-sm font-medium">
                    Rest Time Between Sets
                </label>
                <select
                    value={restTime}
                    onChange={(e) => setRestTime(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                >
                    <option value="30s">30 seconds</option>
                    <option value="45-60s">45-60 seconds</option>
                    <option value="90s">90 seconds</option>
                    <option value="120s+">2+ minutes</option>
                </select>
            </div>

            {/* Training Style */}
            <div>
                <label className="block text-sm font-medium">Training Style</label>
                <select
                    value={trainingStyle}
                    onChange={(e) => setTrainingStyle(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                >
                    <option value="straight sets">Straight Sets</option>
                    <option value="supersets">Supersets</option>
                    <option value="circuit">Circuit Training</option>
                    <option value="drop sets">Drop Sets</option>
                </select>
            </div>

            {/* Warm-Up & Cool Down */}
            <div className="flex flex-col text-sm font-medium">
                Include Warm-Up & Cool Down?
                <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="warmupCoolDown"
                            value="yes"
                            checked={warmupCoolDown === "yes"}
                            onChange={() => setWarmupCoolDown("yes")}
                        />
                        Yes
                    </label>
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="warmupCoolDown"
                            value="no"
                            checked={warmupCoolDown === "no"}
                            onChange={() => setWarmupCoolDown("no")}
                        />
                        No
                    </label>
                </div>
            </div>

            {/* Cardio Integration */}
            <div className="flex flex-col text-sm font-medium">
                Integrate Cardio?
                <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="cardioIntegration"
                            value="yes"
                            checked={cardioIntegration === "yes"}
                            onChange={() => setCardioIntegration("yes")}
                        />
                        Yes
                    </label>
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="cardioIntegration"
                            value="no"
                            checked={cardioIntegration === "no"}
                            onChange={() => setCardioIntegration("no")}
                        />
                        No
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
                Generate Workout
            </button>
        </form>
    );
}
