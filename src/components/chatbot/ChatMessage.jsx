"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message, isUser }) {
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
              }}>
              {message}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
