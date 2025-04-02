"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import PromptForm from "../../../components/PromptForm";
import PlanResult from "../../../components/PlanResult";

export default function DietPlanRecommender() {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  // Called when user submits the form
  const handleGenerate = async (data) => {
    setLoading(true);
    setPlan("");

    try {
      // Build prompt with new fields
      const prompt = `Create a diet plan for a ${data.age}-year-old ${
        data.dietPreference
      } individual who is ${data.height} cm tall, weighs ${
        data.weight
      } kg, and wants to reach ${data.targetWeight} kg in ${
        data.duration
      } weeks. 
They have a goal to ${
        data.goal === "lose" ? "lose weight" : "gain weight"
      }, with an activity level of ${data.activityLevel}, drinking ${
        data.waterIntake
      } liters of water daily, allergies to ${
        data.allergies || "none"
      }, and prefer ${data.mealFrequency} meals per day. 
Include daily calorie intake, hydration tips, and nutrient recommendations. Format response with headings, bullet points, and line breaks.`;

      const response = await axios.post("/api/gemini", { prompt });
      setPlan(response.data.data || "No response from Gemini");
    } catch (error) {
      console.error("Error:", error);
      setPlan("An error occurred while fetching the diet plan.");
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
            src="/dietPlan.webp"
            alt="Diet Plan"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center z-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Diet Plan Generator
          </h1>
          <p className="text-gray-200 text-lg text-center max-w-2xl">
            Create personalized meal plans tailored to your nutritional needs
            and fitness goals
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
              Diet Plan Generator
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Input Form */}
            <div className="w-full md:w-1/3">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Customize Your Diet Plan
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill in your details below to generate a personalized diet
                  plan that aligns with your goals and preferences.
                </p>
                <PromptForm onGenerate={handleGenerate} />
              </div>
            </div>

            {/* Right: Plan Result */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Personalized Diet Plan
              </h2>
              <PlanResult loading={loading} plan={plan} />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 gym-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Fuel Your Fitness Journey</h2>
          <p className="text-xl mb-8 text-white/90">
            Generate your diet plan, then explore our workout recommendations
            for maximum results.
          </p>
          <Link href="/list/workout-recommender">
            <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105 transition-transform duration-300">
              EXPLORE WORKOUT PLANS
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
