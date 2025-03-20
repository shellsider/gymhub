"use client";

import ReactMarkdown from "react-markdown";

export default function WorkoutResultWindow({ loading, workoutPlan }) {
    return (
        <section className="relative w-full p-6 bg-white rounded shadow min-h-[200px]">
            {loading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    {/* Spinner Overlay */}
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                </div>
            )}

            {workoutPlan ? (
                <>
                    <h3 className="font-semibold text-base mb-2">
                        Your Ai-Powered Workout Plan
                    </h3>
                    <ReactMarkdown>{workoutPlan}</ReactMarkdown>
                </>
            ) : (
                !loading && (
                    <p className="text-gray-500 text-sm">
                        Fill out the form and click “Generate Workout” to see your plan here.
                    </p>
                )
            )}
        </section>
    );
}
