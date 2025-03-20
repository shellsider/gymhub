import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyBCns8R8uqCoXfaD4ejT7ClWc9qDOFQ0jo');

/**
 * POST /api/gemini
 * Expects: { prompt: string }
 * Returns: { data: string }
 */
export async function POST(req) {
    try {
        const { prompt } = await req.json();
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);

        // Some libraries require you to await result.response.text()
        // The line below might differ if the library’s response shape is different
        const text = await result.response.text();

        return NextResponse.json({ data: text });
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
