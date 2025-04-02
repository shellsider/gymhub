export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner Placeholder */}
      <div className="relative h-[30vh] bg-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative h-full flex flex-col items-center justify-center z-10 px-4">
          <div className="w-64 h-10 bg-gray-400 rounded-lg mb-4"></div>
          <div className="w-96 h-6 bg-gray-400 rounded-lg"></div>
        </div>
      </div>

      {/* Breadcrumb Navigation Placeholder */}
      <div className="bg-gray-100 py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm">
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
            <span className="mx-2 text-gray-400">/</span>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Features Grid Placeholder */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="w-64 h-10 bg-gray-200 rounded-lg mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-6"></div>
                <div className="bg-gray-100 p-6 h-64 rounded-xl animate-pulse">
                  <div className="w-full h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="w-full h-24 bg-gray-200 rounded mb-6"></div>
                  <div className="w-36 h-10 bg-gray-200 rounded mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
