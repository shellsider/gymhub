"use client";
import Link from "next/link";
import Image from "next/image";
import Card from "../../components/Card";

// Include a `link` field for each feature.
// If it's "Diet Plan Generator", we set `link: "/list/diet-plan-recommender"`
// Otherwise, we set `link: "/list/#"`.
const featuresData = [
  {
    title: "AI-Driven Workout Plans",
    description:
      "Personalized routines tailored to your fitness goals and progress. Get expert guidance on exercises, sets, reps, and rest periods based on your experience level.",
    link: "/list/workout-recommender",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    title: "Diet Plan Generator",
    description:
      "Generate meal plans based on calories, macros, and dietary restrictions. Our AI creates balanced nutrition plans that align with your workout regime and body goals.",
    link: "/list/diet-plan-recommender",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Protein & Calorie Counter",
    description:
      "Easily track daily protein intake and calories for better results. Visualize your nutrition data and get insights on how to optimize your diet for muscle growth or fat loss.",
    link: "/list/calorie-counter",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Supplement Guide",
    description:
      "Get recommendations for supplements based on your unique body and goals. Learn which supplements can enhance your performance and which ones are just hype.",
    link: "/list/suppliment-guide",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    title: "Chatbot Support",
    description:
      "Get instant answers to fitness queries with our AI-powered chatbot. Ask about exercise techniques, nutrition advice, or recovery strategies 24/7.",
    link: "/list/chatbot",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[30vh]">
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/features.png"
            alt="GymHub Features"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center z-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            GymHub Features
          </h1>
          <p className="text-gray-200 text-lg text-center max-w-2xl">
            Discover all the tools you need to transform your fitness journey
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
            <span className="text-red-600 font-medium">Features</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* First row with 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuresData.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="mb-6 flex justify-center">{feat.icon}</div>
                <Card
                  title={feat.title}
                  description={feat.description}
                  link={feat.link}
                />
              </div>
            ))}
          </div>

          {/* Second row with 2 cards centered - same size as top row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuresData.slice(3, 5).map((feat, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="mb-6 flex justify-center">{feat.icon}</div>
                <Card
                  title={feat.title}
                  description={feat.description}
                  link={feat.link}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 gym-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Choose any feature to begin or explore them all to maximize your
            fitness results.
          </p>
          <Link href="/">
            <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105 transition-transform duration-300">
              RETURN TO HOME
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
