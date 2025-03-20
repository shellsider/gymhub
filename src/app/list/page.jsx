"use client";
import Link from "next/link";
import Card from "../../components/Card";

// Include a `link` field for each feature.
// If it's "Diet Plan Generator", we set `link: "/list/diet-plan-recommender"`
// Otherwise, we set `link: "/list/#"`.
const featuresData = [
  {
    title: "AI-Driven Workout Plans",
    description:
      "Personalized routines tailored to your fitness goals and progress.",
    link: "/list/workout-recommender",
  },
  {
    title: "Diet Plan Generator",
    description:
      "Generate meal plans based on calories, macros, and dietary restrictions.",
    link: "/list/diet-plan-recommender",
  },
  {
    title: "Protein & Calorie Counter",
    description:
      "Easily track daily protein intake and calories for better results.",
    link: "/list/#",
  },
  {
    title: "Supplement Guide",
    description:
      "Recommendations for supplements based on your unique body and goals.",
    link: "/list/suppliment-guide",
  },
  {
    title: "Chatbot Support",
    description:
      "Get instant answers to fitness queries with our AI-powered chatbot.",
    link: "/list/#",
  },
  {
    title: "Video Demonstrations",
    description:
      "Detailed exercise videos with muscle targeting and real-time form correction.",
    link: "/list/#",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen p-6 sm:p-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/">
          <button className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300">
            ← Back to Home
          </button>
        </Link>

        <h2 className="text-2xl font-bold text-center">GymHub Features</h2>
        <div />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresData.map((feat, idx) => (
          <Card
            key={idx}
            title={feat.title}
            description={feat.description}
            link={feat.link}
          />
        ))}
      </div>
    </main>
  );
}
