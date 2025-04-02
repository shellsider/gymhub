export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-bold text-gray-800">Loading GymHub</h2>
        <p className="text-gray-600 mt-2">
          Preparing your fitness experience...
        </p>
      </div>
    </div>
  );
}
