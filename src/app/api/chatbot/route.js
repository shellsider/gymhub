import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyBCns8R8uqCoXfaD4ejT7ClWc9qDOFQ0jo');

/**
 * POST /api/chatbot
 * This route handles chatbot conversations using direct content generation
 * Expects: { message: string, history: Array<{role: string, content: string}> }
 * Returns: { data: string, history: Array<{role: string, content: string}> }
 */
export async function POST(req) {
    try {
        const { message, history = [] } = await req.json();

        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Prepare context from history
        let contextFromHistory = "";
        if (history.length > 0) {
            contextFromHistory = "Previous conversation:\n";
            history.forEach(msg => {
                const role = msg.role === "user" ? "User" : "Assistant";
                contextFromHistory += `${role}: ${msg.content}\n`;
            });
            contextFromHistory += "\n";
        }

        // Create a single prompt with context and current message
        const promptWithContext = `${contextFromHistory}You are a fitness assistant for GymHub, a fitness application. You specialize in providing information about workouts, exercise techniques, nutrition, diet plans, supplements, and general fitness advice. Be helpful, accurate, and supportive.

IMPORTANT: You must ONLY answer questions related to fitness, gym, workouts, nutrition, supplements, weight loss, muscle building, health, wellness, or physical training. If the user asks about unrelated topics like movies, politics, coding, games, or anything not fitness or health related, politely decline to answer and remind them that you're a dedicated fitness assistant that can only help with health and fitness topics. 

For example, if someone asks "What's the latest anime?" or "Help me with my homework", respond with: "I'm your GymHub fitness assistant and can only answer questions related to fitness, nutrition, and health. Feel free to ask me about workout routines, diet plans, or any fitness goals you have!"

Respond to the following message from the user: ${message}`;

        // Make a direct content generation call
        const result = await model.generateContent(promptWithContext);
        const response = result.response;
        const text = response.text();

        // Update history with the new message and response
        const updatedHistory = [
            ...history,
            { role: 'user', content: message },
            { role: 'assistant', content: text }
        ];

        return NextResponse.json({
            data: text,
            history: updatedHistory
        });
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return NextResponse.json(
            { error: "Failed to process chatbot request", details: error.message },
            { status: 500 }
        );
    }
} 