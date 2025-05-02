"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      // Call the new API endpoint that includes YouTube videos
      const response = await axios.post("/api/workout-with-videos", {
        formData,
      });

      // The AI response with YouTube videos is in response.data.data
      setWorkoutPlan(response.data.data || "No response from AI.");
    } catch (error) {
      console.error("Error generating workout plan:", error);
      setWorkoutPlan("An error occurred while fetching the workout plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[30vh]">
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/workoutplan.jpg"
            alt="Workout Plan"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center z-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Workout Recommender
          </h1>
          <p className="text-gray-200 text-lg text-center max-w-2xl">
            Get personalized workout plans tailored to your goals and fitness
            level
          </p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-100 py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-red-600 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href="/list"
              className="text-gray-500 hover:text-red-600 transition-colors">
              Features
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-red-600 font-medium">
              Workout Recommender
            </span>
          </div>
        </div>
      </div>

      {/* Main Content: Form (left) + Result Window (right) */}
      <section className="py-12 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column: The Workout Form */}
            <div className="w-full md:w-1/3">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Customize Your Workout
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill in the form below to generate a personalized workout plan
                  that matches your specific needs and goals.
                </p>
                <WorkoutForm onGeneratePlan={handleGenerateWorkout} />
              </div>
            </div>

            {/* Right Column: The Workout Result */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Personalized Workout Plan
              </h2>
              <WorkoutResultWindow
                loading={loading}
                workoutPlan={workoutPlan}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 gym-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Begin Your Workout Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Generate your workout plan, then explore our diet recommendations
            for maximum results.
          </p>
          <Link href="/list/diet-plan-recommender">
            <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105 transition-transform duration-300">
              EXPLORE DIET PLANS
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
