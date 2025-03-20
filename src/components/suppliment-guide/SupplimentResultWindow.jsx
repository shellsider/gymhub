"use client";

import { useState, useEffect } from "react";
import { marked } from "marked";

export default function SupplimentResultWindow({ loading, supplementPlan }) {
  const [formattedPlan, setFormattedPlan] = useState("");

  useEffect(() => {
    if (supplementPlan) {
      // Convert Markdown -> HTML
      const html = marked(supplementPlan);
      setFormattedPlan(html);
    } else {
      setFormattedPlan("");
    }
  }, [supplementPlan]);

  return (
    <section className="relative w-full p-6 bg-white rounded shadow min-h-[200px]">
      {loading && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {supplementPlan ? (
        <>
          <h3 className="font-semibold text-lg mb-4">
            Your Personalized Supplement Guide
          </h3>
          <div
            className="prose prose-sm sm:prose max-w-full leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedPlan }}
          />
        </>
      ) : (
        !loading && (
          <p className="text-gray-500 text-sm">
            Fill out the form and click “Get Supplement Suggestions” to see
            recommendations here.
          </p>
        )
      )}
    </section>
  );
}
