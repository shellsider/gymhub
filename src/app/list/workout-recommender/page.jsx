"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import WorkoutForm from "@/components/workout-recommender/WorkoutForm";
import WorkoutResultWindow from "@/components/workout-recommender/WorkoutResultWindow";

export default function WorkoutRecommenderPage() {
    const [workoutPlan, setWorkoutPlan] = useState("");
    const [loading, setLoading] = useState(false);

    // Called when user submits the workout form
    const handleGenerateWorkout = async (formData) => {
        setLoading(true);
        setWorkoutPlan("");

        try {
            // Build a prompt for Gemini, referencing the user’s choices
            // This prompt specifically requests:
            // - how to do the exercise properly, step-by-step instructions,
            // - common mistakes, targeted muscles, etc.
            const prompt = `
            I want you to create a detailed workout plan with the following details:

            - Body parts: ${formData.selectedBodyParts.join(", ")}
            - Number of Exercises: ${formData.numExercises}
            - Sets per Exercise: ${formData.setsPerExercise}
            - Fitness Goal: ${formData.fitnessGoal}
            - Experience Level: ${formData.experience}
            - Available Equipment: ${formData.equipment}
            - Workout Duration: ${formData.duration} minutes
            - Rest Time: ${formData.restTime}
            - Training Style: ${formData.trainingStyle}
            - Include Warm-Up & Cool Down: ${formData.warmupCoolDown === "yes" ? "Yes" : "No"}
            - Integrate Cardio: ${formData.cardioIntegration === "yes" ? "Yes" : "No"}

            For each exercise:
            1. Explain proper form & step-by-step process.
            2. List common mistakes people make.
            3. Mention the target muscles.

            Format your response in Markdown with headings, bullet points, line breaks, etc. and include line breaks
            - for every new exercise underline it as i am using react markdown, give the prompt in order to which it utilises react-markdown to proerly display the reverted text
              `;





            // Call your Next.js API route
            const response = await axios.post("/api/gemini", { prompt });
            // The AI response is in response.data.data
            setWorkoutPlan(response.data.data || "No response from Gemini AI.");
        } catch (error) {
            console.error("Error generating workout plan:", error);
            setWorkoutPlan("An error occurred while fetching the workout plan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full px-6 py-10 flex flex-col items-center gap-10 bg-gray-50">
            {/* Top Row: Link to go back + Title */}
            <div className="w-full max-w-5xl flex justify-between items-center">
                <Link href="/list">
                    <button className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300">
                        ← Back to List
                    </button>
                </Link>
                <h2 className="text-2xl font-bold">Ai Workout Recommender</h2>
                <div />
            </div>

            {/* Main Content: Form (left) + Result Window (right) */}
            <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8">
                {/* Left Column: The Workout Form */}
                <div className="w-full md:w-1/3">
                    <WorkoutForm onGeneratePlan={handleGenerateWorkout} />
                </div>

                {/* Right Column: The Workout Result */}
                <div className="w-full md:w-2/3">
                    <WorkoutResultWindow loading={loading} workoutPlan={workoutPlan} />
                </div>
            </div>
        </main>
    );
}
