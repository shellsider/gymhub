import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI('AIzaSyBCns8R8uqCoXfaD4ejT7ClWc9qDOFQ0jo');
const PIXABAY_API_KEY = '50072092-fc85aaf3b12fbda0b11769d6d';

/**
 * POST /api/diet-with-images
 * This route generates diet plans and enhances them with dish images
 * Expects: { formData: FormData }
 * Returns: { data: string }
 */
export async function POST(req) {
    try {
        const { formData } = await req.json();

        // 1. Get diet plan and dish array from Gemini
        const { dietPlan, dishArray } = await getDietPlanFromGemini(formData);

        console.log("Received dish array:", dishArray);

        // 2. Find images for each dish using Pixabay API
        const dishesWithImages = await findImagesForDishesPixabay(dishArray);

        console.log("Found images for dishes:", dishesWithImages.map(d => d.name));

        // 3. Enhance the diet plan with dish images
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
 * Returns both the diet plan and the array of dishes
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
    9. Return an array of the dishes like ['Tofu Scramble with Spinach and Whole-Wheat Toast', 'Lentil Soup with a Side Salad'] etc (this is an example)
    `;

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Make a direct content generation call
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract the dish array from the response
    let dishArray = [];
    try {
        // Look for array notation in the response
        const arrayMatch = text.match(/\[(.*?)\]/s);
        if (arrayMatch && arrayMatch[1]) {
            // Parse the array string into an actual array
            const arrayString = arrayMatch[1];
            // Split by commas and clean up each entry
            dishArray = arrayString.split(',')
                .map(item => {
                    // Remove quotes, extra spaces, and other non-alphanumeric chars except spaces
                    return item.replace(/['"]/g, '').trim();
                })
                .filter(item => item.length > 0); // Filter out empty entries
        } else {
            // Fallback: Extract dishes from markdown headings
            dishArray = extractDishesFromPlan(text);
        }
    } catch (error) {
        console.error("Error parsing dish array:", error);
        // Fallback to extracting dishes from the content
        dishArray = extractDishesFromPlan(text);
    }

    // Clean up the text
    let cleanedText = text;

    // Remove the array notation from the text
    cleanedText = cleanedText.replace(/\[.*?\]/s, '');

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

    // Trim extra whitespace caused by removals
    cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');
    cleanedText = cleanedText.trim();

    return {
        dietPlan: cleanedText,
        dishArray: dishArray
    };
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
 * Finds images for each dish using Pixabay API
 */
async function findImagesForDishesPixabay(dishes) {
    const dishesWithImages = [];

    for (const dish of dishes) {
        try {
            // Skip empty dishes
            if (!dish || dish.trim() === '') continue;

            console.log(`Searching for image for dish: ${dish}`);

            // Try multiple query variations
            const queryVariations = [
                dish.replace(/\s+/g, '+'),                  // Exact dish name
                `${dish.replace(/\s+/g, '+')}+food`,       // Dish name + food
                dish.split(' ').slice(0, 3).join('+'),      // First 3 words only
                dish.split(' ')[0] + '+dish'                // Just first word + dish
            ];

            let imageFound = false;

            // Try each query variation until we find an image
            for (const query of queryVariations) {
                if (imageFound) break;

                console.log(`Trying query: ${query}`);

                // Search using current query variation
                const response = await axios.get('https://pixabay.com/api/', {
                    params: {
                        key: PIXABAY_API_KEY,
                        q: query,
                        image_type: 'photo',
                        per_page: 3
                    }
                });

                if (response.data.hits && response.data.hits.length > 0) {
                    const image = response.data.hits[0]; // Get the first result

                    console.log(`Found image for "${dish}" using query "${query}"`);

                    dishesWithImages.push({
                        name: dish,
                        imageUrl: image.webformatURL,
                        thumbnailUrl: image.previewURL,
                        width: image.webformatWidth,
                        height: image.webformatHeight,
                        title: `${dish} - Photo by ${image.user}`,
                        source: `https://pixabay.com/users/${image.user}-${image.user_id}/`
                    });

                    imageFound = true;
                }

                // Add a small delay between queries to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            // If no image found with any variation
            if (!imageFound) {
                console.log(`No image found for "${dish}" after trying all variations`);
                dishesWithImages.push({
                    name: dish,
                    imageUrl: null
                });
            }
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

    // For each dish that has an image
    for (const dish of dishesWithImages) {
        if (!dish.imageUrl) continue; // Skip dishes without images

        try {
            // Escape special regex characters in dish name
            const escapedDishName = escapeRegExp(dish.name);

            // Create different regex patterns to match various heading formats
            const dishRegexes = [
                // Standard level 3 heading
                new RegExp(`(###\\s+${escapedDishName})([\\s\\n])`, 'gi'),

                // As part of a sentence
                new RegExp(`([\\s\\n])(${escapedDishName})([\\s\\n.,])`, 'gi'),

                // With parentheses (often for meal labels)
                new RegExp(`(${escapedDishName}\\s*\\([^)]+\\))`, 'gi')
            ];

            // Add the markdown image right after the dish name
            const imageHtml = `
$1

![${dish.name}](${dish.imageUrl})
*Photo by ${dish.title.split(' - Photo by ')[1] || 'Pixabay'}*
`;

            // Check each regex pattern to find matches
            let matchFound = false;

            for (const regex of dishRegexes) {
                if (enhancedPlan.match(regex)) {
                    console.log(`Found match for "${dish.name}" using regex pattern`);

                    if (regex.toString().includes('###')) {
                        // For headings, add image below
                        enhancedPlan = enhancedPlan.replace(regex, imageHtml);
                    } else {
                        // For inline mentions, don't modify
                        continue;
                    }

                    matchFound = true;
                    break;
                }
            }

            // If no matches found using regex patterns
            if (!matchFound) {
                console.log(`No exact match found for "${dish.name}", trying case-insensitive search`);

                // Create a simple case-insensitive search
                const lowerPlan = enhancedPlan.toLowerCase();
                const lowerDishName = dish.name.toLowerCase();

                if (lowerPlan.includes(lowerDishName)) {
                    // Find the position to insert the image
                    const headingRegex = new RegExp(`###[^#]*${escapedDishName}.*?\\n`, 'i');
                    const headingMatch = enhancedPlan.match(headingRegex);

                    if (headingMatch) {
                        const index = enhancedPlan.indexOf(headingMatch[0]) + headingMatch[0].length;
                        const beforeImage = enhancedPlan.substring(0, index);
                        const afterImage = enhancedPlan.substring(index);

                        // Insert the image at the appropriate position
                        enhancedPlan = beforeImage +
                            `\n![${dish.name}](${dish.imageUrl})\n*Photo by ${dish.title.split(' - Photo by ')[1] || 'Pixabay'}*\n\n` +
                            afterImage;

                        console.log(`Inserted image for "${dish.name}" using position-based approach`);
                    }
                }
            }
        } catch (error) {
            console.error(`Error enhancing plan with image for ${dish.name}:`, error);
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