"use client";

import { useState } from "react";
import Link from "next/link";
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
            const prompt = `Create a diet plan for a ${data.age}-year-old ${data.dietPreference} individual who is ${data.height} cm tall, weighs ${data.weight} kg, and wants to reach ${data.targetWeight} kg in ${data.duration} weeks. 
They have a goal to ${data.goal === "lose" ? "lose weight" : "gain weight"
                }, with an activity level of ${data.activityLevel}, drinking ${data.waterIntake
                } liters of water daily, allergies to ${data.allergies || "none"}, and prefer ${data.mealFrequency
                } meals per day. 
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
        <main className="min-h-screen w-full px-6 py-10 flex flex-col items-center gap-10 bg-gray-50">
            <div className="w-full max-w-5xl flex justify-between items-center">
                <Link href="/list">
                    <button className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300">
                        ← Back to List
                    </button>
                </Link>
                <h2 className="text-2xl font-bold">Ai-Powered Diet Plan Recommender</h2>
                <div />
            </div>

            <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8">
                {/* Left: Input Form */}
                <div className="w-full md:w-1/3">
                    <PromptForm onGenerate={handleGenerate} />
                </div>

                {/* Right: Plan Result */}
                <div className="w-full md:w-2/3">
                    <PlanResult loading={loading} plan={plan} />
                </div>
            </div>
        </main>
    );
}
