"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function WorkoutResultWindow({ loading, workoutPlan }) {
  const [processedPlan, setProcessedPlan] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  const [expandedVideos, setExpandedVideos] = useState({});

  useEffect(() => {
    if (workoutPlan) {
      setIsRendering(true);

      // Process markdown asynchronously
      const timer = setTimeout(() => {
        setProcessedPlan(workoutPlan);
        setIsRendering(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setProcessedPlan("");
      setExpandedVideos({});
    }
  }, [workoutPlan]);

  const toggleVideo = (videoId) => {
    setExpandedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match && match[1] ? match[1] : null;
  };

  return (
    <section className="relative w-full p-8 bg-white rounded-xl shadow-lg min-h-[300px] border-t-4 border-red-600">
      {(loading || isRendering) && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-xl z-10">
          {/* Spinner Overlay */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4" />
            <p className="text-red-600 font-medium">
              {loading
                ? "Creating your workout plan..."
                : "Formatting your plan..."}
            </p>
          </div>
        </div>
      )}

      {processedPlan ? (
        <div className="prose prose-red max-w-none overflow-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
            Your AI-Powered Workout Plan
          </h3>
          <div className="overflow-x-auto max-w-full">
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
                    className="text-lg font-semibold text-gray-800 mt-4 mb-2 break-words"
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
                  <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />
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
                  <td className="border border-gray-300 px-4 py-2" {...props} />
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
                a: ({ node, href, children, ...props }) => {
                  // Special handling for YouTube links
                  const isYouTubeLink =
                    href?.includes("youtube.com") || href?.includes("youtu.be");

                  if (!isYouTubeLink) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline"
                        {...props}>
                        {children}
                      </a>
                    );
                  }

                  // Extract video ID for embedding
                  const videoId = getYouTubeVideoId(href);
                  const isExpanded = expandedVideos[videoId];

                  return (
                    <div className="my-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <button
                        onClick={() => toggleVideo(videoId)}
                        className="flex items-center w-full gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-3 transition-colors">
                        <svg
                          className="w-5 h-5 flex-shrink-0 fill-red-600"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span className="flex-1 text-left">{children}</span>
                        <span className="text-sm">
                          {isExpanded ? "Hide Video" : "Play Video"}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="aspect-video w-full bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"></iframe>
                        </div>
                      )}
                    </div>
                  );
                },
              }}>
              {processedPlan}
            </ReactMarkdown>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
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
              Print Workout Plan
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
              Fill out the form and click "Generate Workout Plan" to receive
              your personalized exercise routine.
            </p>
          </div>
        )
      )}
    </section>
  );
}
