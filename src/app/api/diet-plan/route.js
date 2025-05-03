import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyBCns8R8uqCoXfaD4ejT7ClWc9qDOFQ0jo');

/**
 * POST /api/diet-plan
 * This route generates diet plans without images
 * Expects: { formData: FormData }
 * Returns: { data: string }
 */
export async function POST(req) {
    try {
        const { formData } = await req.json();

        // Get diet plan from Gemini
        const dietPlan = await getDietPlanFromGemini(formData);

        return NextResponse.json({ data: dietPlan });
    } catch (error) {
        console.error("Error processing diet plan:", error);
        return NextResponse.json(
            { error: "Failed to process request", details: error.message },
            { status: 500 }
        );
    }
}

/**
 * Gets a diet plan from Gemini based on form data
 */
async function getDietPlanFromGemini(formData) {
    // Build a prompt for Gemini, referencing the user's choices
    const prompt = `Create a diet plan for a ${formData.age}-year-old ${formData.dietPreference
        } individual who is ${formData.height} cm tall, weighs ${formData.weight
        } kg, and wants to reach ${formData.targetWeight} kg in ${formData.duration
        } weeks. 
    
    They have a goal to ${formData.goal === "lose" ? "lose weight" : "gain weight"
        }, with an activity level of ${formData.activityLevel}, drinking ${formData.waterIntake
        } liters of water daily, allergies to ${formData.allergies || "none"
        }, and prefer ${formData.mealFrequency} meals per day. 
    
    IMPORTANT INSTRUCTIONS:
    1. Include daily calorie intake, hydration tips, and nutrient recommendations
    2. Format response with headings, bullet points, and line breaks
    3. For each meal, provide a specific dish name (not just "breakfast" or "lunch")
    4. Format each dish with a clear heading using markdown's ### heading style
    5. Make dish names specific and descriptive, like "Quinoa Salad with Avocado" instead of just "Salad"
    6. List ingredients for each dish
    7. Provide 7 days of meal plans with specific dishes for each day
    8. Include section headings for each day (# Day 1, # Day 2, etc.)
    `;

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Make a direct content generation call
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean up the text
    let cleanedText = text;

    // Remove programming statements like dishes.append() and print(dishes)
    cleanedText = cleanedText.replace(/dishes\.append\(['"](.*?)['"].*?\)/g, '');
    cleanedText = cleanedText.replace(/print\(dishes\)/g, '');

    // Remove any other Python code patterns
    cleanedText = cleanedText.replace(/for dish in dishes:.*$/gm, '');
    cleanedText = cleanedText.replace(/^dishes\s*=\s*\[\]/gm, '');
    cleanedText = cleanedText.replace(/^dishes\s*=\s*list\(\)/gm, '');

    // Additional general cleanup for any code-like syntax
    cleanedText = cleanedText.replace(/```python[\s\S]*?```/g, '');
    cleanedText = cleanedText.replace(/```[\s\S]*?```/g, '');

    // Remove array notation from the text
    cleanedText = cleanedText.replace(/\[.*?\]/s, '');

    // Trim extra whitespace caused by removals
    cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');
    cleanedText = cleanedText.trim();

    return cleanedText;
} 