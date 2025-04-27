"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import ChatMessage from "@/components/chatbot/ChatMessage";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const messagesContainerRef = useRef(null);
  const titleInputRef = useRef(null);

  // Scroll chat window to bottom without affecting page scroll
  const scrollChatToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Focus on title input when editing
  useEffect(() => {
    if (editingTitleId && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [editingTitleId]);

  // Load conversations from localStorage on component mount
  useEffect(() => {
    const savedConversations = localStorage.getItem("gymhub-conversations");
    if (savedConversations) {
      const parsedConversations = JSON.parse(savedConversations);
      setConversations(parsedConversations);

      // If there's an active conversation ID in localStorage, load it
      const activeId = localStorage.getItem("gymhub-active-conversation");
      if (activeId && parsedConversations.find((c) => c.id === activeId)) {
        setActiveConversationId(activeId);
        const activeConvo = parsedConversations.find((c) => c.id === activeId);
        setMessages(activeConvo.messages);
        setHistory(activeConvo.history);
      }
    }
  }, []);

  // Save conversations to localStorage when they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(
        "gymhub-conversations",
        JSON.stringify(conversations)
      );
    }
  }, [conversations]);

  // Save active conversation ID to localStorage when it changes
  useEffect(() => {
    if (activeConversationId) {
      localStorage.setItem("gymhub-active-conversation", activeConversationId);
    }
  }, [activeConversationId]);

  useEffect(() => {
    // Only scroll the chat window when messages change
    scrollChatToBottom();
  }, [messages]);

  // Create a new conversation
  const createNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation = {
      id: newId,
      title: "New Conversation",
      lastUpdated: new Date().toISOString(),
      messages: [],
      history: [],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newId);
    setMessages([]);
    setHistory([]);
    setInput("");
  };

  // Load a conversation
  const loadConversation = (id) => {
    const conversation = conversations.find((c) => c.id === id);
    if (conversation) {
      setActiveConversationId(id);
      setMessages(conversation.messages);
      setHistory(conversation.history);
    }
  };

  // Update conversation title based on first message
  const updateConversationTitle = (id, userMessage, aiResponse) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === id) {
          // If this is the first message, use it as the title (truncated)
          const title =
            conv.messages.length === 0
              ? userMessage.substring(0, 30) +
                (userMessage.length > 30 ? "..." : "")
              : conv.title;

          return {
            ...conv,
            title,
            lastUpdated: new Date().toISOString(),
          };
        }
        return conv;
      })
    );
  };

  // Delete a conversation
  const deleteConversation = (id, e) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.id !== id));

    if (activeConversationId === id) {
      const remaining = conversations.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        loadConversation(remaining[0].id);
      } else {
        createNewConversation();
      }
    }
  };

  // Start editing a conversation title
  const startEditingTitle = (id, currentTitle, e) => {
    e.stopPropagation();
    setEditingTitleId(id);
    setNewTitle(currentTitle);
  };

  // Save edited conversation title
  const saveTitle = (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (newTitle.trim()) {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === id) {
            return {
              ...conv,
              title: newTitle.trim(),
            };
          }
          return conv;
        })
      );
    }

    setEditingTitleId(null);
    setNewTitle("");
  };

  // Cancel editing title
  const cancelEditing = (e) => {
    e.stopPropagation();
    setEditingTitleId(null);
    setNewTitle("");
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Create a new conversation if none is active
    if (!activeConversationId) {
      createNewConversation();
    }

    // Add user message to UI
    const updatedMessages = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(updatedMessages);

    // Update the conversation in state
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: updatedMessages,
            lastUpdated: new Date().toISOString(),
          };
        }
        return conv;
      })
    );

    try {
      // Call the chatbot API with the message and history
      const response = await axios.post("/api/chatbot", {
        message: userMessage,
        history: history,
      });

      const { data, history: newHistory } = response.data;

      // Update messages and history
      const messagesWithResponse = [
        ...updatedMessages,
        { role: "assistant", content: data },
      ];
      setMessages(messagesWithResponse);
      setHistory(newHistory);

      // Update the conversation in state
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversationId) {
            return {
              ...conv,
              messages: messagesWithResponse,
              history: newHistory,
              lastUpdated: new Date().toISOString(),
            };
          }
          return conv;
        })
      );

      // Update conversation title if this is the first message
      updateConversationTitle(activeConversationId, userMessage, data);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage = {
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your message. Please try again.",
      };

      const messagesWithError = [...updatedMessages, errorMessage];
      setMessages(messagesWithError);

      // Update the conversation in state with the error
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversationId) {
            return {
              ...conv,
              messages: messagesWithError,
              lastUpdated: new Date().toISOString(),
            };
          }
          return conv;
        })
      );
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Banner - Reduced height */}
      <div className="relative h-[25vh]">
        {/* Overlay with dark gradient for text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/features.png"
            alt="Chatbot"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center z-20 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            GymHub AI Chatbot
          </h1>
          <p className="text-gray-200 text-md text-center max-w-2xl">
            Chat with our AI assistant about all your fitness questions
          </p>
        </div>
      </div>

      {/* Chat Interface with Sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Professional heading above chat window */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Personal Fitness Assistant
          </h2>
          <p className="text-gray-600 text-sm">
            Ask questions about workouts, nutrition plans, supplements, or any
            fitness topic
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar for chat history */}
          <div
            className={`md:w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 ${
              showSidebar ? "block" : "hidden md:block"
            }`}>
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Chat History</h3>
              <button
                onClick={createNewConversation}
                className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                title="New Conversation">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto max-h-[500px]">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations yet
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {conversations.map((conv) => (
                    <li
                      key={conv.id}
                      onClick={() => loadConversation(conv.id)}
                      className={`p-3 hover:bg-gray-50 cursor-pointer ${
                        activeConversationId === conv.id ? "bg-gray-100" : ""
                      }`}>
                      <div className="flex justify-between items-start">
                        <div className="max-w-[80%]">
                          {editingTitleId === conv.id ? (
                            <form
                              onSubmit={(e) => saveTitle(conv.id, e)}
                              className="flex items-center">
                              <input
                                ref={titleInputRef}
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Enter title..."
                                onClick={(e) => e.stopPropagation()}
                              />
                              <button
                                type="submit"
                                className="ml-1 text-green-600 hover:text-green-800"
                                onClick={(e) => saveTitle(conv.id, e)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="ml-1 text-gray-500 hover:text-gray-700"
                                onClick={cancelEditing}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </form>
                          ) : (
                            <>
                              <p className="font-medium text-gray-800 truncate">
                                {conv.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(conv.lastUpdated)}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex items-center">
                          {editingTitleId !== conv.id && (
                            <button
                              onClick={(e) =>
                                startEditingTitle(conv.id, conv.title, e)
                              }
                              className="p-1 text-gray-400 hover:text-blue-500 transition-colors mr-1"
                              title="Rename conversation">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={(e) => deleteConversation(conv.id, e)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete conversation">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Mobile toggle for sidebar */}
          <button
            className="md:hidden bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-2 flex items-center justify-center"
            onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? "Hide Chat History" : "Show Chat History"}
          </button>

          {/* Chat window */}
          <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 relative">
            {/* Chat Messages Area - Using ref for controlled scrolling */}
            <div
              ref={messagesContainerRef}
              className="h-[400px] overflow-y-auto p-4 sm:p-6 scroll-smooth">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-gray-50 rounded-full p-5 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    Start a conversation
                  </h3>
                  <p className="text-gray-500 max-w-xs">
                    Type a message below to begin chatting with our fitness AI
                    assistant
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <ChatMessage
                    key={index}
                    message={msg.content}
                    isUser={msg.role === "user"}
                  />
                ))
              )}
              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Area */}
            <div className="border-t border-gray-200 p-3 sm:p-4 bg-gray-50">
              <form
                onSubmit={handleSendMessage}
                className="flex space-x-2 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your fitness question here..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    {loading ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    )}
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bot Capabilities Info - More compact */}
        <div className="mt-6 px-5 py-4 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            What can this chatbot help you with?
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-700 text-sm">
                Personalized workout advice
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-700 text-sm">
                Nutrition and diet plans
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-700 text-sm">
                Supplement recommendations
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-700 text-sm">
                Gym techniques and equipment
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
