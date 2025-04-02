export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner Placeholder */}
      <div className="relative h-[30vh] bg-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative h-full flex flex-col items-center justify-center z-10 px-4">
          <div className="w-72 h-10 bg-gray-400 rounded-lg mb-4"></div>
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
            <span className="mx-2 text-gray-400">/</span>
            <div className="w-48 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Main Content Placeholder */}
      <div className="py-12 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Introduction Placeholder */}
          <div className="mb-12">
            <div className="w-72 h-8 bg-gray-200 rounded mb-4"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Supplement Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="w-3/4 h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="w-1/3 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Placeholder */}
      <div className="py-16 px-6 bg-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-96 h-8 bg-blue-400 rounded mx-auto mb-6"></div>
          <div className="w-full h-4 bg-blue-400 rounded mx-auto mb-3"></div>
          <div className="w-3/4 h-4 bg-blue-400 rounded mx-auto mb-8"></div>
          <div className="w-48 h-12 bg-white rounded-lg mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
