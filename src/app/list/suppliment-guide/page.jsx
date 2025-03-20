"use client";

import { useState } from "react";
import Link from "next/link";
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
    <main className="min-h-screen w-full px-6 py-10 flex flex-col items-center gap-10 bg-gray-50">
      <div className="w-full max-w-5xl flex justify-between items-center">
        <Link href="/list">
          <button className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300">
            ← Back to List
          </button>
        </Link>
        <h2 className="text-2xl font-bold">Ai Supplement Recommender</h2>
        <div />
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8">
        {/* Left: Supplement Form */}
        <div className="w-full md:w-1/3">
          <SupplimentForm onGenerate={handleGenerate} />
        </div>

        {/* Right: Supplement Result Window */}
        <div className="w-full md:w-2/3">
          <SupplimentResultWindow
            loading={loading}
            supplementPlan={supplementPlan}
          />
        </div>
      </div>
    </main>
  );
}
