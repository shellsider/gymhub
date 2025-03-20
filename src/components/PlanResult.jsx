"use client";

import ReactMarkdown from "react-markdown";

export default function PlanResult({ loading, plan }) {
  return (
    <section className="relative w-full p-6 bg-white rounded shadow min-h-[200px]">
      {loading && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
          {/* Spinner */}
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {plan ? (
        <>
          <h3 className="font-semibold text-base mb-2">Your Diet Plan</h3>

          {/* Render the plan as Markdown without className */}
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-xl font-bold" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-lg font-semibold" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-md font-semibold" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-700 leading-relaxed" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 space-y-2" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-600" {...props} />
              ),
            }}>
            {plan}
          </ReactMarkdown>
        </>
      ) : (
        !loading && (
          <p className="text-gray-500 text-sm">
            Please enter your information and click "Generate Plan" to see
            results.
          </p>
        )
      )}
    </section>
  );
}
