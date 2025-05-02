"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function PlanResult({ loading, plan }) {
  const [processedPlan, setProcessedPlan] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (plan) {
      // Show rendering state
      setIsRendering(true);

      // Process markdown asynchronously
      const timer = setTimeout(() => {
        setProcessedPlan(plan);
        setIsRendering(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setProcessedPlan("");
    }
  }, [plan]);

  // Don't render anything on server
  if (!isClient) {
    return (
      <section className="relative w-full p-8 bg-white rounded-xl shadow-lg min-h-[300px] border-t-4 border-red-600">
        <div className="flex flex-col items-center justify-center h-full text-center py-10">
          <div className="w-14 h-14 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4" />
          <p className="text-red-600 font-medium">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full p-8 bg-white rounded-xl shadow-lg min-h-[300px] border-t-4 border-red-600">
      {(loading || isRendering) && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-xl z-10">
          {/* Spinner */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4" />
            <p className="text-red-600 font-medium">
              {loading ? "Generating your plan..." : "Formatting your plan..."}
            </p>
          </div>
        </div>
      )}

      {processedPlan ? (
        <div className="overflow-hidden">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
            Your Personalized Diet Plan
          </h3>

          <div className="prose prose-red max-w-none overflow-auto">
            <div className="overflow-x-auto max-w-full">
              {/* Render the plan as Markdown with custom styling */}
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-2xl font-bold text-gray-800 mt-6 mb-3 break-words"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-xl font-semibold text-gray-800 mt-5 mb-3 break-words"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-lg font-semibold text-red-600 mt-4 mb-2 break-words"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-gray-700 leading-relaxed mb-4 break-words"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="list-decimal pl-6 space-y-2 mb-4"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-600" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-red-600" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table
                        className="border-collapse border border-gray-300 w-full"
                        {...props}
                      />
                    </div>
                  ),
                  tr: ({ node, ...props }) => (
                    <tr className="border-b border-gray-300" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="border border-gray-300 px-4 py-2 bg-gray-50"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      {...props}
                    />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      className="bg-gray-100 rounded px-2 py-1 text-sm"
                      {...props}
                    />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="my-6 border-t border-gray-200" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-red-300 pl-4 italic text-gray-700 my-4"
                      {...props}
                    />
                  ),
                  a: ({ node, href, children, ...props }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline"
                      {...props}>
                      {children}
                    </a>
                  ),
                  em: ({ node, ...props }) => (
                    <em className="text-gray-500 text-sm" {...props} />
                  ),
                }}>
                {processedPlan}
              </ReactMarkdown>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Plan
            </button>
          </div>
        </div>
      ) : (
        !loading &&
        !isRendering && (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 text-lg max-w-md">
              Please enter your information and click "Generate Plan" to receive
              your personalized diet recommendations.
            </p>
          </div>
        )
      )}
    </section>
  );
}
