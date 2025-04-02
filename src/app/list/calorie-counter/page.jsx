"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import NutritionForm from "@/components/nutrition/NutritionForm";
import NutritionResultWindow from "@/components/nutrition/NutritionResultWindow";

export default function NutritionCalculatorPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Called when the user submits the meals form.
  const handleSendMeals = async (meals) => {
    setLoading(true);
    setResult("");

    // Build the Gemini prompt with all the meals details.
    let prompt = `I want you to analyze the following meals and their servings. For each meal, provide an estimated breakdown of calories and protein. Also, give the final total calorie and protein intake.\n\n`;
    meals.forEach((meal, index) => {
      prompt += `Meal ${index + 1}: ${meal.mealName}, Servings: ${
        meal.servings
      }\n`;
    });
    prompt += `\nPlease describe what each meal offers in terms of calories and protein, and include the final totals.`;

    try {
      const response = await axios.post("/api/gemini", { prompt });
      setResult(response.data.data || "No response from Gemini AI.");
    } catch (error) {
      console.error("Error analyzing meals:", error);
      setResult("An error occurred while analyzing your meals.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[30vh]">
        {/* Overlay with dark gradient for text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/protinecounter.webp"
            alt="Protein Counter"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center z-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Protein & Calorie Counter
          </h1>
          <p className="text-gray-200 text-lg text-center max-w-2xl">
            Track your daily nutritional intake and optimize your fitness goals
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
            <span className="text-red-600 font-medium">Calorie Counter</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column: The Nutrition Form */}
            <div className="w-full md:w-1/3">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Track Your Meals
                </h2>
                <p className="text-gray-600 mb-6">
                  Enter your meals below to calculate the total calories and
                  protein content in your diet.
                </p>
                <NutritionForm onSendMeals={handleSendMeals} />
              </div>
            </div>

            {/* Right Column: The Result Window */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Nutritional Analysis
              </h2>
              <NutritionResultWindow loading={loading} result={result} />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 gym-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Enhance Your Nutrition Strategy
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Track your calories and protein intake, then explore our diet plans
            and supplements for a complete fitness approach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/list/diet-plan-recommender">
              <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105 transition-transform duration-300">
                GET A DIET PLAN
              </button>
            </Link>
            <Link href="/list/suppliment-guide">
              <button className="px-8 py-4 bg-gray-800 text-white rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors shadow-lg transform hover:scale-105 transition-transform duration-300">
                SUPPLEMENT GUIDE
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
