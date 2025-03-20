
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-16 gap-10">
      {/* Hero / Intro Section */}
      <section className="text-center flex flex-col items-center gap-4 max-w-2xl">
        <h1 className="text-3xl sm:text-5xl font-bold">
          Welcome to GymHub
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
          Your AI-Powered Fitness Companion for personalized workouts, diet plans,
          and real-time guidance. Achieve your goals with expert recommendations
          and seamless tracking.
        </p>
        <Link href={'/list'}>
          <button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-sm sm:text-base transition-colors">
            Get Started
          </button>
        </Link>
      </section>

      {/* Key Features Section */}
      <section className="max-w-3xl w-full flex flex-col gap-6 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Features at a Glance
        </h2>
        <ul className="grid gap-4 text-sm sm:text-base text-left sm:grid-cols-2">
          <li className="p-4 bg-gray-50 rounded shadow-sm">
            <span className="font-medium">AI-Driven Workout Plans:</span>
            Personalized routines tailored to your goals.
          </li>
          <li className="p-4 bg-gray-50 rounded shadow-sm">
            <span className="font-medium">Diet Plan Generator:</span>
            Create meals based on calories and macronutrients.
          </li>
          <li className="p-4 bg-gray-50 rounded shadow-sm">
            <span className="font-medium">Protein & Calorie Counter:</span>
            Track daily nutritional needs with real-time insights.
          </li>
          <li className="p-4 bg-gray-50 rounded shadow-sm">
            <span className="font-medium">Supplement Guide:</span>
            Recommendations tailored to your body and goals.
          </li>
        </ul>
      </section>

      {/* About Section or Problem Statement */}
      <section className="max-w-2xl flex flex-col gap-4 text-center">
        <h3 className="text-lg sm:text-xl font-semibold">
          Why GymHub?
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Many individuals face difficulties in achieving fitness goals due to
          lack of guidance, diet confusion, and incorrect workout techniques.
          GymHub solves these issues by providing a unified, AI-driven platform
          for workouts, diet planning, and real-time tracking – ensuring you stay
          on the path to success.
        </p>
      </section>
    </main>
  );
}
