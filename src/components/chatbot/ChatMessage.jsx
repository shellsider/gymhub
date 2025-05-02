"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message, isUser }) {
  const [expandedVideos, setExpandedVideos] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Provide a simple loading state during SSR
  if (!isClient) {
    return (
      <div
        className={`flex w-full mb-4 ${
          isUser ? "justify-end" : "justify-start"
        }`}>
        <div
          className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-800 border border-gray-200"
          }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message}</p>
          ) : (
            <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-red-600 text-white"
            : "bg-gray-100 text-gray-800 border border-gray-200"
        }`}>
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message}</p>
        ) : (
          <div className="prose prose-sm max-w-none overflow-auto">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className={`text-xl font-bold mb-2 ${
                      isUser ? "text-white" : "text-gray-800"
                    }`}
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className={`text-lg font-semibold mb-2 ${
                      isUser ? "text-white" : "text-gray-800"
                    }`}
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className={`text-base font-semibold mb-1 ${
                      isUser ? "text-white" : "text-gray-800"
                    }`}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="mb-2 whitespace-pre-wrap break-words"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />
                ),
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                strong: ({ node, ...props }) => (
                  <strong
                    className={`font-bold ${
                      isUser ? "text-white" : "text-red-600"
                    }`}
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className={`px-1 py-0.5 rounded text-sm ${
                      isUser
                        ? "bg-red-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    {...props}
                  />
                ),
                pre: ({ node, children, ...props }) => (
                  <pre
                    className={`p-3 rounded-md overflow-x-auto my-2 ${
                      isUser
                        ? "bg-red-700 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                    {...props}>
                    {children}
                  </pre>
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className={`border-l-4 pl-3 my-2 ${
                      isUser
                        ? "border-white/50 text-white/90"
                        : "border-red-300 text-gray-600"
                    }`}
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
                    <div className="my-3 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <button
                        onClick={() => toggleVideo(videoId)}
                        className="flex items-center w-full gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-3 py-2 transition-colors">
                        <svg
                          className="w-4 h-4 fill-red-600"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span className="flex-1 text-left text-sm">
                          {children}
                        </span>
                        <span className="text-xs">
                          {isExpanded ? "Hide" : "Play"}
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
              {message}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
