import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI('AIzaSyBCns8R8uqCoXfaD4ejT7ClWc9qDOFQ0jo');
const GOOGLE_SEARCH_API_KEY = 'AIzaSyDiVxLSefklYp4Q3o100OSS1XoWoFATrvk';
const GOOGLE_SEARCH_ENGINE_ID = '87ef85f09bd824836';

/**
 * POST /api/diet-with-images
 * This route generates diet plans and enhances them with dish images
 * Expects: { formData: FormData }
 * Returns: { data: string }
 */
export async function POST(req) {
    try {
        const { formData } = await req.json();

        // 1. Get diet plan from Gemini
        const dietPlan = await getDietPlanFromGemini(formData);

        // 2. Extract dishes from the diet plan
        const dishes = extractDishesFromPlan(dietPlan);

        console.log("Extracted dishes:", dishes);

        // 3. Find images for each dish
        const dishesWithImages = await findImagesForDishes(dishes);

        console.log("Found images for dishes:", dishesWithImages.map(d => d.name));

        // 4. Enhance the diet plan with dish images
        const enhancedDietPlan = enhanceDietPlanWithImages(dietPlan, dishesWithImages);

        return NextResponse.json({ data: enhancedDietPlan });
    } catch (error) {
        console.error("Error processing diet plan with images:", error);
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

    return text;
}

/**
 * Extracts dish names from a diet plan
 */
function extractDishesFromPlan(plan) {
    // Regular expression to find dish names (Level 3 headings)
    const dishHeadingRegex = /###\s+(.*?)(\n|$)/g;

    // Find all matches
    const matches = Array.from(plan.matchAll(dishHeadingRegex));

    // Extract unique dish names
    const uniqueDishes = new Set();
    const dishes = [];

    for (const match of matches) {
        if (match[1]) {
            const dishName = match[1].trim();

            // Skip if it's not really a dish
            if (dishName.toLowerCase().includes('day') ||
                dishName.toLowerCase().includes('week') ||
                dishName.toLowerCase().includes('calorie') ||
                dishName.toLowerCase().includes('nutrient') ||
                dishName.toLowerCase().includes('tips') ||
                dishName.toLowerCase().includes('recommendations')) {
                continue;
            }

            // Only add unique dishes - we don't need images for the same dish multiple times
            if (!uniqueDishes.has(dishName.toLowerCase())) {
                uniqueDishes.add(dishName.toLowerCase());
                dishes.push(dishName);
            }
        }
    }

    return dishes;
}

/**
 * Finds images for each dish using Google Custom Search API
 */
async function findImagesForDishes(dishes) {
    const dishesWithImages = [];

    for (const dish of dishes) {
        try {
            // Search for food images of the dish
            const searchQuery = `${dish} food dish recipe`;
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: GOOGLE_SEARCH_API_KEY,
                    cx: GOOGLE_SEARCH_ENGINE_ID,
                    q: searchQuery,
                    searchType: 'image',
                    imgSize: 'medium',
                    imgType: 'photo',
                    num: 1
                }
            });

            if (response.data.items && response.data.items.length > 0) {
                const image = response.data.items[0];

                dishesWithImages.push({
                    name: dish,
                    imageUrl: image.link,
                    thumbnailUrl: image.image?.thumbnailLink || image.link,
                    width: image.image?.width || 300,
                    height: image.image?.height || 200,
                    title: image.title || dish,
                    source: image.displayLink || 'Image Source'
                });
            } else {
                // If no image found, add the dish without an image
                dishesWithImages.push({
                    name: dish,
                    imageUrl: null
                });
            }

            // Add a small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
            console.error(`Error fetching image for ${dish}:`, error);
            dishesWithImages.push({
                name: dish,
                imageUrl: null,
                error: error.message
            });
        }
    }

    return dishesWithImages;
}

/**
 * Enhances a diet plan with dish images
 */
function enhanceDietPlanWithImages(dietPlan, dishesWithImages) {
    let enhancedPlan = dietPlan;

    for (const dish of dishesWithImages) {
        if (dish.imageUrl) {
            // Create regex to match the dish heading
            const dishRegex = new RegExp(`(###\\s+${escapeRegExp(dish.name)})`, 'g');

            // Add the image HTML after the dish heading
            const imageHtml = `
$1

![${dish.name}](${dish.imageUrl})
*${dish.title}*

`;

            // Replace in the plan
            enhancedPlan = enhancedPlan.replace(dishRegex, imageHtml);
        }
    }

    return enhancedPlan;
}

/**
 * Escapes special characters in a string for use in a regex pattern
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
} 