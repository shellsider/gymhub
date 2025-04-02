import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[70vh] flex items-center justify-center">
        {/* Overlay with dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10"></div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/backdrop.jpg"
            alt="Fitness Background"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center flex flex-col items-center gap-6 px-6 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
            Transform Your <span className="text-red-500">Fitness</span> Journey
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Your AI-Powered Fitness Companion for personalized workouts, diet
            plans, and real-time guidance. Achieve your goals with expert
            recommendations.
          </p>
          <Link href="/list">
            <button className="mt-4 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold tracking-wide text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
              GET STARTED
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
              Features at a Glance
            </span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600"></div>
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-red-500 flex flex-col">
              <div className="mb-4 text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI-Driven Workout Plans
              </h3>
              <p className="text-gray-600 flex-grow">
                Personalized routines tailored to your goals and fitness level.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-red-500 flex flex-col">
              <div className="mb-4 text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Diet Plan Generator
              </h3>
              <p className="text-gray-600 flex-grow">
                Create meals based on your caloric needs and macronutrient
                requirements.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-red-500 flex flex-col">
              <div className="mb-4 text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Protein & Calorie Counter
              </h3>
              <p className="text-gray-600 flex-grow">
                Track your daily nutritional intake with real-time insights and
                analytics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-red-500 flex flex-col">
              <div className="mb-4 text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              </div>
              <h3 className="text-xl font-semibold mb-2">Supplement Guide</h3>
              <p className="text-gray-600 flex-grow">
                Recommendations tailored to your body type, goals, and training
                regimen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why GymHub Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/GymHub-Logo.png"
                alt="GymHub Logo"
                fill
                className="object-fill"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">
              Why <span className="text-red-600">GymHub</span>?
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Many individuals struggle to achieve their fitness goals due to
              lack of personalized guidance, confusion about nutrition, and
              incorrect workout techniques.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              GymHub solves these challenges by providing a unified, AI-driven
              platform that integrates workouts, diet planning, and real-time
              tracking – ensuring you stay motivated and see real results.
            </p>
            <Link href="/list">
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors">
                Explore All Features
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Transform Your Fitness Journey?
          </h3>
          <p className="text-xl mb-8">
            Join thousands of users who have already achieved their fitness
            goals with GymHub.
          </p>
          <Link href="/list">
            <button className="px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              GET STARTED NOW
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
