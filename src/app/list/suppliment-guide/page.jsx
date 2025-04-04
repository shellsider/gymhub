"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SupplimentForm from "@/components/suppliment-guide/SupplimentForm";
import SupplimentResultWindow from "@/components/suppliment-guide/SupplimentResultWindow";

export default function SupplimentRecommenderPage() {
  const [supplementPlan, setSupplementPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setSupplementPlan("");

    try {
      const prompt = `  
Please recommend supplements for a person with the following details:

- Age: ${formData.age}
- Known Medical Conditions: ${formData.knownConditions === "yes" ? "Yes" : "No"}
- Fitness Goal: ${formData.fitnessGoal}
- Training Intensity: ${formData.trainingIntensity}
- Time Frame: ${formData.timeFrame}
- Diet Preference: ${formData.dietPreference}
- Main Concerns: ${formData.mainConcerns.join(", ") || "None"}
- Existing Supplements: ${formData.existingSupps || "None"}
- Allergies/Restrictions: ${formData.allergies || "None"}
- Budget: ${formData.budget}

**Instructions**:
1. List recommended supplements (like EAA, protein, creatine, L-carnitine, etc.).
2. Consider diet preference to avoid non-vegan or restricted ingredients.
3. Provide reason for each supplement, how to use it, disclaimers, potential side effects, etc.
4. Format in Markdown with headings, bullet points, line breaks, etc.
5. Use double line breaks between sections for clarity.
      `;

      const response = await axios.post("/api/gemini", { prompt });
      setSupplementPlan(response.data.data || "No response from Gemini");
    } catch (error) {
      console.error("Error generating supplement plan:", error);
      setSupplementPlan(
        "An error occurred while fetching the supplement plan."
      );
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
            src="/suppliment.jpg"
            alt="Supplement Guide"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center z-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Supplement Guide
          </h1>
          <p className="text-gray-200 text-lg text-center max-w-2xl">
            Get personalized supplement recommendations based on your goals and
            needs
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
            <span className="text-red-600 font-medium">Supplement Guide</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Supplement Form */}
            <div className="w-full md:w-1/3">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Customize Your Supplement Plan
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill in your details below to receive personalized supplement
                  recommendations tailored to your specific fitness goals.
                </p>
                <SupplimentForm onGenerate={handleGenerate} />
              </div>
            </div>

            {/* Right: Supplement Result Window */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Personalized Supplement Plan
              </h2>
              <SupplimentResultWindow
                loading={loading}
                supplementPlan={supplementPlan}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 gym-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Optimize Your Fitness Results
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get the most out of your supplements by combining them with our
            personalized workout and diet plans.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/list/workout-recommender">
              <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105 transition-transform duration-300">
                EXPLORE WORKOUT PLANS
              </button>
            </Link>
            <Link href="/list/diet-plan-recommender">
              <button className="px-8 py-4 bg-gray-800 text-white rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors shadow-lg transform hover:scale-105 transition-transform duration-300">
                EXPLORE DIET PLANS
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
